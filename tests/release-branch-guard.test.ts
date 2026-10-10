import { rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import {
    createReleaseSandbox,
    type ReleaseSandbox,
} from './helpers/release-workflow';

let sandbox: ReleaseSandbox;

beforeEach(() => {
    sandbox = createReleaseSandbox();
});

afterEach(() => {
    sandbox.dispose();
});

function commitChangelog(tag: string): void {
    sandbox.commitFile(
        'CHANGELOG.md',
        `## [${tag}]\n`,
        `chore(release): ${tag}`,
    );
    sandbox.pushBranch(`release/${tag.slice(1)}`);
}

describe('the release branch guard, run against a real remote', () => {
    const guard = 'Refuse a tag that is not the tip of its release branch';

    it('passes a tag on the tip of release/X.Y.Z', () => {
        sandbox.cutRelease('3.2.0');
        sandbox.tagAndPush('v3.2.0');
        sandbox.checkoutTagInRunner('v3.2.0');

        expect(sandbox.runStep(guard, 'v3.2.0').status).toBe(0);
    });

    it('sends a pre-release tag to the release branch of its stable version', () => {
        sandbox.cutRelease('3.2.0');
        sandbox.tagAndPush('v3.2.0-rc.1');
        sandbox.checkoutTagInRunner('v3.2.0-rc.1');

        expect(sandbox.runStep(guard, 'v3.2.0-rc.1').status).toBe(0);
    });

    it('refuses a tag the release branch has moved past', () => {
        sandbox.cutRelease('3.2.0');
        sandbox.tagAndPush('v3.2.0');
        sandbox.commitFile(
            'later.txt',
            'later\n',
            'fix(blocks): land after the tag',
        );
        sandbox.pushBranch('release/3.2.0');
        sandbox.checkoutTagInRunner('v3.2.0');

        const result = sandbox.runStep(guard, 'v3.2.0');

        expect(result.status).toBe(1);
        expect(result.stderr).toContain('but release/3.2.0 is at');
    });

    it('passes a re-run once the release job has committed the changelog', () => {
        sandbox.cutRelease('3.2.0');
        sandbox.tagAndPush('v3.2.0');
        commitChangelog('v3.2.0');
        sandbox.checkoutTagInRunner('v3.2.0');

        const result = sandbox.runStep(guard, 'v3.2.0');

        expect(result.status, result.stderr).toBe(0);
    });

    it('passes a re-run whose changelog commit also reformats package.json around the same version', () => {
        sandbox.cutRelease('3.2.0');
        sandbox.tagAndPush('v3.2.0');
        writeFileSync(join(sandbox.maintainer, 'CHANGELOG.md'), '## [3.2.0]\n');
        sandbox.git(sandbox.maintainer, 'add', 'CHANGELOG.md');
        sandbox.commitFile(
            'package.json',
            `${JSON.stringify({ version: '3.2.0' }, null, 2)}\n`,
            'chore(release): v3.2.0',
        );
        sandbox.pushBranch('release/3.2.0');
        sandbox.checkoutTagInRunner('v3.2.0');

        const result = sandbox.runStep(guard, 'v3.2.0');

        expect(result.status, result.stderr).toBe(0);
    });

    it('refuses a changelog commit that does not sit directly on the tag', () => {
        sandbox.cutRelease('3.2.0');
        sandbox.tagAndPush('v3.2.0');
        sandbox.commitFile(
            'CHANGELOG.md',
            '## draft\n',
            'docs(changelog): draft the notes',
        );
        commitChangelog('v3.2.0');
        sandbox.checkoutTagInRunner('v3.2.0');

        const result = sandbox.runStep(guard, 'v3.2.0');

        expect(result.status).toBe(1);
        expect(result.stderr).toContain('but release/3.2.0 is at');
    });

    it('refuses a commit on the tag that only touches the changelog but is not the release commit', () => {
        sandbox.cutRelease('3.2.0');
        sandbox.tagAndPush('v3.2.0');
        sandbox.commitFile(
            'CHANGELOG.md',
            '## [3.2.0]\n',
            'docs(changelog): rewrite the notes',
        );
        sandbox.pushBranch('release/3.2.0');
        sandbox.checkoutTagInRunner('v3.2.0');

        const result = sandbox.runStep(guard, 'v3.2.0');

        expect(result.status).toBe(1);
        expect(result.stderr).toContain('but release/3.2.0 is at');
    });

    it('refuses a changelog commit that also changes another file', () => {
        sandbox.cutRelease('3.2.0');
        sandbox.tagAndPush('v3.2.0');
        writeFileSync(join(sandbox.maintainer, 'later.txt'), 'later\n');
        sandbox.git(sandbox.maintainer, 'add', 'later.txt');
        commitChangelog('v3.2.0');
        sandbox.checkoutTagInRunner('v3.2.0');

        const result = sandbox.runStep(guard, 'v3.2.0');

        expect(result.status).toBe(1);
        expect(result.stderr).toContain('but release/3.2.0 is at');
    });

    it('refuses a changelog commit that changes package.json beyond its version', () => {
        sandbox.cutRelease('3.2.0');
        sandbox.tagAndPush('v3.2.0');
        sandbox.commitFile(
            'package.json',
            '{"version":"3.2.0","scripts":{"postinstall":"curl evil"}}\n',
            'chore(release): v3.2.0',
        );
        sandbox.pushBranch('release/3.2.0');
        sandbox.checkoutTagInRunner('v3.2.0');

        const result = sandbox.runStep(guard, 'v3.2.0');

        expect(result.status).toBe(1);
        expect(result.stderr).toContain('but release/3.2.0 is at');
    });

    it('refuses a branch that moved on after the changelog commit', () => {
        sandbox.cutRelease('3.2.0');
        sandbox.tagAndPush('v3.2.0');
        commitChangelog('v3.2.0');
        sandbox.commitFile(
            'later.txt',
            'later\n',
            'fix(blocks): land after the changelog',
        );
        sandbox.pushBranch('release/3.2.0');
        sandbox.checkoutTagInRunner('v3.2.0');

        const result = sandbox.runStep(guard, 'v3.2.0');

        expect(result.status).toBe(1);
        expect(result.stderr).toContain('but release/3.2.0 is at');
    });

    it('refuses a tag on main when no release branch was cut', () => {
        sandbox.tagAndPush('v3.2.0');
        sandbox.checkoutTagInRunner('v3.2.0');

        const result = sandbox.runStep(guard, 'v3.2.0');

        expect(result.status).toBe(1);
        expect(result.stderr).toContain(
            'v3.2.0 has no release/3.2.0 to be cut from.',
        );
    });

    it('does not take a branch that only ends in release/X.Y.Z for the release branch', () => {
        sandbox.git(
            sandbox.maintainer,
            'checkout',
            '-q',
            '-b',
            'backup/release/3.2.0',
        );
        sandbox.pushBranch('backup/release/3.2.0');
        sandbox.tagAndPush('v3.2.0');
        sandbox.checkoutTagInRunner('v3.2.0');

        const result = sandbox.runStep(guard, 'v3.2.0');

        expect(result.status).toBe(1);
        expect(result.stderr).toContain('has no release/3.2.0 to be cut from.');
    });
});

describe('the changelog commit, run against a real remote', () => {
    const step = 'Commit CHANGELOG and version';

    let run = 0;

    function rerunInFreshRunner(changelog: string) {
        const date = `2026-10-1${run++}T12:00:00Z`;

        rmSync(sandbox.runner, { recursive: true, force: true });
        sandbox.checkoutTagInRunner('v3.2.0');
        writeFileSync(join(sandbox.runner, 'CHANGELOG.md'), changelog);

        return sandbox.runStep(step, 'v3.2.0', {
            env: { GIT_AUTHOR_DATE: date, GIT_COMMITTER_DATE: date },
        });
    }

    it('pushes nothing on a re-run when the release branch already carries that changelog', () => {
        sandbox.cutRelease('3.2.0');
        sandbox.tagAndPush('v3.2.0');
        expect(rerunInFreshRunner('## [3.2.0]\n').status).toBe(0);
        const branchAfterFirstRun = sandbox.onRemote(
            'rev-parse',
            'release/3.2.0',
        );

        const result = rerunInFreshRunner('## [3.2.0]\n');

        expect(result.status, result.stderr).toBe(0);
        expect(sandbox.onRemote('rev-parse', 'release/3.2.0')).toBe(
            branchAfterFirstRun,
        );
    });

    it('fails a re-run whose changelog differs from the one already on the branch', () => {
        sandbox.cutRelease('3.2.0');
        sandbox.tagAndPush('v3.2.0');
        rerunInFreshRunner('## [3.2.0]\n');

        const result = rerunInFreshRunner('## [3.2.0] rewritten\n');

        expect(result.status).not.toBe(0);
        expect(sandbox.onRemote('show', 'release/3.2.0:CHANGELOG.md')).toBe(
            '## [3.2.0]',
        );
    });

    it('lands on release/X.Y.Z and leaves main alone', () => {
        sandbox.cutRelease('3.2.0');
        sandbox.tagAndPush('v3.2.0');
        const mainBefore = sandbox.onRemote('rev-parse', 'main');
        sandbox.checkoutTagInRunner('v3.2.0');
        writeFileSync(join(sandbox.runner, 'CHANGELOG.md'), '## [3.2.0]\n');

        const result = sandbox.runStep(
            'Commit CHANGELOG and version',
            'v3.2.0',
        );

        expect(result.status, result.stderr).toBe(0);
        expect(
            sandbox.onRemote('log', '-1', '--format=%s', 'release/3.2.0'),
        ).toBe('chore(release): v3.2.0');
        expect(sandbox.onRemote('rev-parse', 'release/3.2.0^')).toBe(
            sandbox.onRemote('rev-parse', 'v3.2.0^{commit}'),
        );
        expect(sandbox.onRemote('show', 'release/3.2.0:CHANGELOG.md')).toBe(
            '## [3.2.0]',
        );
        expect(sandbox.onRemote('rev-parse', 'main')).toBe(mainBefore);
    });
});
