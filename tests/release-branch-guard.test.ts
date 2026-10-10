import { writeFileSync } from 'node:fs';
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
