import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const workflow = readFileSync(
    new URL('../.github/workflows/dist-branch.yml', import.meta.url),
    'utf8',
);

const release = readFileSync(
    new URL('../.github/workflows/release.yml', import.meta.url),
    'utf8',
);

function step(name: string): string {
    const start = workflow.indexOf(`- name: ${name}`);

    expect(start, `missing step: ${name}`).toBeGreaterThanOrEqual(0);

    const next = workflow.indexOf('\n      - ', start + 1);

    return next === -1 ? workflow.slice(start) : workflow.slice(start, next);
}

describe('the pinnable dist build', () => {
    it('tags each build after main of the commit it was built from', () => {
        const tag = step('Tag the build so a lockfile can pin it');

        expect(tag).toContain('TAG="dist-${GITHUB_SHA:0:7}"');
        expect(tag).toContain('git tag "$TAG"');
        expect(tag).toContain('git push origin "refs/tags/$TAG"');
    });

    it('never moves a tag a lockfile may already pin', () => {
        const tag = step('Tag the build so a lockfile can pin it');

        const guard = tag.indexOf(
            'if git ls-remote --exit-code --tags origin "refs/tags/$TAG" >/dev/null; then',
        );
        const leave = tag.indexOf('exit 0', guard);
        const create = tag.indexOf('git tag "$TAG"');

        expect(guard).toBeGreaterThanOrEqual(0);
        expect(leave).toBeGreaterThan(guard);
        expect(create).toBeGreaterThan(leave);
        expect(tag).not.toContain('--force');
    });

    it('tags only after main-dist carries the build', () => {
        expect(
            workflow.indexOf('- name: Tag the build so a lockfile can pin it'),
        ).toBeGreaterThan(
            workflow.indexOf('- name: Force-push the built tree to main-dist'),
        );
    });

    it('names tags the release workflow does not publish', () => {
        expect(release).toContain('- "v[0-9]+.[0-9]+.[0-9]+"');
        expect(release).not.toMatch(/-\s*"dist-/);
    });
});
