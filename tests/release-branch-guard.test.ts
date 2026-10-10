import { execFileSync, spawnSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

const release = readFileSync(
    new URL('../.github/workflows/release.yml', import.meta.url),
    'utf8',
);

function runScript(stepName: string): string {
    const marker = `      - name: ${stepName}\n        run: |\n`;
    const start = release.indexOf(marker);

    expect(start, `missing step: ${stepName}`).toBeGreaterThanOrEqual(0);

    const body: string[] = [];

    for (const line of release.slice(start + marker.length).split('\n')) {
        if (line.trim() !== '' && !line.startsWith('          ')) {
            break;
        }

        body.push(line.slice(10));
    }

    return body.join('\n');
}

let sandbox: string;
let remote: string;
let maintainer: string;
let runner: string;
let gitEnv: NodeJS.ProcessEnv;

function git(cwd: string, ...args: string[]): string {
    return execFileSync('git', args, {
        cwd,
        env: gitEnv,
        encoding: 'utf8',
    }).trim();
}

function commitFile(path: string, content: string, message: string): void {
    writeFileSync(join(maintainer, path), content);
    git(maintainer, 'add', path);
    git(maintainer, 'commit', '-q', '-m', message);
}

function checkoutTagInRunner(tag: string): void {
    git(sandbox, 'clone', '-q', remote, 'runner');
    git(runner, 'checkout', '-q', tag);
}

function runStep(stepName: string, tag: string) {
    const script = runScript(stepName).replaceAll(
        '${{ github.ref_name }}',
        tag,
    );

    return spawnSync(
        'bash',
        ['--noprofile', '--norc', '-eo', 'pipefail', '-c', script],
        {
            cwd: runner,
            env: {
                ...gitEnv,
                GITHUB_REF_NAME: tag,
                GITHUB_ACTOR: 'release-bot',
            },
            encoding: 'utf8',
        },
    );
}

function cutRelease(version: string): void {
    git(maintainer, 'checkout', '-q', '-b', `release/${version}`, 'main');
    commitFile(
        'package.json',
        `{"version":"${version}"}\n`,
        `chore(release): v${version}`,
    );
    git(maintainer, 'push', '-q', 'origin', `release/${version}`);
}

beforeEach(() => {
    sandbox = mkdtempSync(join(tmpdir(), 'release-guard-'));
    remote = join(sandbox, 'remote.git');
    maintainer = join(sandbox, 'maintainer');
    runner = join(sandbox, 'runner');
    const globalConfig = join(sandbox, 'gitconfig');
    writeFileSync(
        globalConfig,
        '[user]\n\tname = Maintainer\n\temail = maintainer@example.test\n',
    );
    gitEnv = {
        ...process.env,
        GIT_CONFIG_GLOBAL: globalConfig,
        GIT_CONFIG_NOSYSTEM: '1',
    };

    git(sandbox, 'init', '-q', '--bare', '-b', 'main', remote);
    git(sandbox, 'init', '-q', '-b', 'main', maintainer);
    git(maintainer, 'remote', 'add', 'origin', remote);
    commitFile(
        'package.json',
        '{"version":"3.1.0"}\n',
        'chore(release): v3.1.0',
    );
    git(maintainer, 'push', '-q', 'origin', 'main');
});

afterEach(() => {
    rmSync(sandbox, { recursive: true, force: true });
});

describe('the release branch guard, run against a real remote', () => {
    const guard = 'Refuse a tag that is not the tip of its release branch';

    it('passes a tag on the tip of release/X.Y.Z', () => {
        cutRelease('3.2.0');
        git(maintainer, 'tag', 'v3.2.0');
        git(maintainer, 'push', '-q', 'origin', 'v3.2.0');
        checkoutTagInRunner('v3.2.0');

        expect(runStep(guard, 'v3.2.0').status).toBe(0);
    });

    it('sends a pre-release tag to the release branch of its stable version', () => {
        cutRelease('3.2.0');
        git(maintainer, 'tag', 'v3.2.0-rc.1');
        git(maintainer, 'push', '-q', 'origin', 'v3.2.0-rc.1');
        checkoutTagInRunner('v3.2.0-rc.1');

        expect(runStep(guard, 'v3.2.0-rc.1').status).toBe(0);
    });

    it('refuses a tag the release branch has moved past', () => {
        cutRelease('3.2.0');
        git(maintainer, 'tag', 'v3.2.0');
        git(maintainer, 'push', '-q', 'origin', 'v3.2.0');
        commitFile('later.txt', 'later\n', 'fix(blocks): land after the tag');
        git(maintainer, 'push', '-q', 'origin', 'release/3.2.0');
        checkoutTagInRunner('v3.2.0');

        const result = runStep(guard, 'v3.2.0');

        expect(result.status).toBe(1);
        expect(result.stderr).toContain('but release/3.2.0 is at');
    });

    it('refuses a tag on main when no release branch was cut', () => {
        git(maintainer, 'tag', 'v3.2.0');
        git(maintainer, 'push', '-q', 'origin', 'v3.2.0');
        checkoutTagInRunner('v3.2.0');

        const result = runStep(guard, 'v3.2.0');

        expect(result.status).toBe(1);
        expect(result.stderr).toContain(
            'v3.2.0 has no release/3.2.0 to be cut from.',
        );
    });

    it('does not take a branch that only ends in release/X.Y.Z for the release branch', () => {
        git(maintainer, 'checkout', '-q', '-b', 'backup/release/3.2.0');
        git(maintainer, 'push', '-q', 'origin', 'backup/release/3.2.0');
        git(maintainer, 'tag', 'v3.2.0');
        git(maintainer, 'push', '-q', 'origin', 'v3.2.0');
        checkoutTagInRunner('v3.2.0');

        const result = runStep(guard, 'v3.2.0');

        expect(result.status).toBe(1);
        expect(result.stderr).toContain('has no release/3.2.0 to be cut from.');
    });
});

describe('the changelog commit, run against a real remote', () => {
    it('lands on release/X.Y.Z and leaves main alone', () => {
        cutRelease('3.2.0');
        git(maintainer, 'tag', 'v3.2.0');
        git(maintainer, 'push', '-q', 'origin', 'v3.2.0');
        const mainBefore = git(remote, 'rev-parse', 'main');
        checkoutTagInRunner('v3.2.0');
        writeFileSync(join(runner, 'CHANGELOG.md'), '## [3.2.0]\n');

        const result = runStep('Commit CHANGELOG and version', 'v3.2.0');

        expect(result.status, result.stderr).toBe(0);
        expect(git(remote, 'log', '-1', '--format=%s', 'release/3.2.0')).toBe(
            'chore(release): v3.2.0',
        );
        expect(git(remote, 'rev-parse', 'release/3.2.0^')).toBe(
            git(remote, 'rev-parse', 'v3.2.0^{commit}'),
        );
        expect(git(remote, 'show', 'release/3.2.0:CHANGELOG.md')).toBe(
            '## [3.2.0]',
        );
        expect(git(remote, 'rev-parse', 'main')).toBe(mainBefore);
    });
});
