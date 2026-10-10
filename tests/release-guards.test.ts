import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const release = readFileSync(
    new URL('../.github/workflows/release.yml', import.meta.url),
    'utf8',
);

function job(name: string): string {
    const marker = `  ${name}:\n`;
    const start = release.indexOf(marker);

    expect(start, `missing job: ${name}`).toBeGreaterThanOrEqual(0);

    const rest = release.slice(start + marker.length);
    const next = rest.search(/\n {2}[a-z][a-z-]*:\n/);

    return next === -1
        ? release.slice(start)
        : release.slice(start, start + marker.length + next);
}

describe('the release workflow', () => {
    it('compares the tagged commit with the tip of its release branch, so nothing merged to main after the cut ships', () => {
        const guard = job('guard');

        expect(guard).toContain('RELEASE_BRANCH="release/${TAG_VERSION%%-*}"');
        expect(guard).toContain(
            'git ls-remote --exit-code origin "refs/heads/$RELEASE_BRANCH"',
        );
        expect(guard).toContain('git rev-parse "origin/$RELEASE_BRANCH"');
        expect(guard).toContain('TAGGED="$(git rev-parse HEAD)"');
        expect(guard).toContain('if [ "$TIP" != "$TAGGED" ]; then');
        expect(guard).not.toContain('DEFAULT_BRANCH');
        expect(guard).toContain('exit 1');
    });

    it('commits the changelog to the release branch, leaving main to the release pull request', () => {
        const release = job('release');

        expect(release).toContain(
            'RELEASE_BRANCH="release/${TAG_VERSION%%-*}"',
        );
        expect(release).toContain(
            'git push origin "HEAD:refs/heads/${RELEASE_BRANCH}"',
        );
        expect(release).not.toContain('DEFAULT_BRANCH');
    });

    it('publishes nothing until that comparison passes', () => {
        expect(job('publish')).toContain('needs: guard');
        expect(job('release')).toContain('needs: guard');
    });

    it('waits for a downloadable tarball, not for metadata', () => {
        const publish = job('publish');

        expect(publish).toContain('npm pack "@akira-io/ui@$VERSION"');
        expect(publish).not.toContain(
            'npm view "@akira-io/ui@$VERSION" version 2>/dev/null',
        );
    });

    it('tells the site only after the tarball is downloadable', () => {
        const dispatch = job('dispatch-site');

        expect(dispatch).toContain('needs: publish');
        expect(dispatch).toContain('event_type=ui-package-released');
    });
});

describe('the tag-matches-commits guard', () => {
    it('installs git-cliff in the guard job before computing the bumped version', () => {
        const guard = job('guard');
        const installIndex = guard.indexOf('uses: taiki-e/install-action');
        const verifyIndex = guard.indexOf(
            'Verify tag matches the version computed from commits',
        );

        expect(installIndex).toBeGreaterThanOrEqual(0);
        expect(verifyIndex).toBeGreaterThan(installIndex);
    });

    it('deletes the local tag ref before asking git-cliff for the bumped version, or --bumped-version just echoes the pushed tag back', () => {
        const guard = job('guard');
        const deleteIndex = guard.indexOf('git tag -d "$TAG_VERSION"');
        const bumpedVersionIndex = guard.indexOf('--bumped-version');

        expect(deleteIndex).toBeGreaterThanOrEqual(0);
        expect(bumpedVersionIndex).toBeGreaterThan(deleteIndex);
    });

    it('rejects a tag that does not match the version git-cliff computes from the commits', () => {
        const guard = job('guard');

        expect(guard).toContain(
            'BUMPED_VERSION="$(git-cliff --config cliff.toml --bumped-version)"',
        );
        expect(guard).toContain('if [ "$BUMPED_VERSION" != "$TAG_VERSION" ]');
        expect(guard).toContain('exit 1');
    });

    it('skips the guard for a pre-release tag', () => {
        const guard = job('guard');
        const stepIndex = guard.indexOf(
            'Verify tag matches the version computed from commits',
        );
        const nextStepIndex = guard.indexOf('\n      - name:', stepIndex + 1);
        const step = guard.slice(
            stepIndex,
            nextStepIndex === -1 ? undefined : nextStepIndex,
        );

        expect(step).toContain("if: ${{ !contains(github.ref_name, '-') }}");
    });
});

describe('the tag-matches-package guard', () => {
    it('reads the version package.json carries at the tagged commit', () => {
        const guard = job('guard');

        expect(guard).toContain(
            'PACKAGE_VERSION="$(node -p "require(\'./package.json\').version")"',
        );
        expect(guard).toContain('TAG_VERSION="${GITHUB_REF_NAME#v}"');
    });

    it('rejects a tag whose version package.json does not carry, pre-releases included', () => {
        const guard = job('guard');
        const stepIndex = guard.indexOf(
            'Refuse a tag whose version package.json does not carry',
        );
        const nextStepIndex = guard.indexOf('\n      - name:', stepIndex + 1);
        const step = guard.slice(
            stepIndex,
            nextStepIndex === -1 ? undefined : nextStepIndex,
        );

        expect(stepIndex).toBeGreaterThanOrEqual(0);
        expect(step).toContain(
            'if [ "$PACKAGE_VERSION" != "$TAG_VERSION" ]; then',
        );
        expect(step).toContain('exit 1');
        expect(step).not.toContain('if: ');
    });
});

describe('the shell the release workflow runs', () => {
    it('receives tags, versions and notes through the environment, never interpolated into a script', () => {
        const lines = release.split('\n');
        const interpolated: string[] = [];

        lines.forEach((line, index) => {
            const run = /^(\s*)(?:- )?run: ?(.*)$/.exec(line);

            if (!run) {
                return;
            }

            const indent = run[1].length;
            const script = [run[2]];

            for (const next of lines.slice(index + 1)) {
                if (next.trim() !== '' && next.search(/\S/) <= indent) {
                    break;
                }

                script.push(next);
            }

            interpolated.push(
                ...script.filter((scriptLine) => scriptLine.includes('${{')),
            );
        });

        expect(interpolated).toEqual([]);
    });

    it('reads the tag version from the environment when it writes package.json', () => {
        const sync = release
            .split('\n')
            .filter((line) => line.includes("require('./package.json')"))
            .filter((line) => line.includes('node -e'));

        expect(sync).toHaveLength(2);

        for (const line of sync) {
            expect(line).toContain('p.version=process.env.VERSION');
        }
    });
});
