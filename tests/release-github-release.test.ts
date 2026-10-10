import {
    chmodSync,
    existsSync,
    mkdirSync,
    readFileSync,
    writeFileSync,
} from 'node:fs';
import { join } from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import {
    createReleaseSandbox,
    type ReleaseSandbox,
} from './helpers/release-workflow';

const STEP = 'Create GitHub Release';

let sandbox: ReleaseSandbox;
let temp: string;
let ghLog: string;

function run(): ReturnType<ReleaseSandbox['runStep']> {
    return sandbox.runStep(STEP, 'v3.2.0', {
        env: {
            PATH: `${join(sandbox.root, 'bin')}:${process.env.PATH}`,
            RUNNER_TEMP: temp,
        },
    });
}

function ghCalls(): string[] {
    return existsSync(ghLog)
        ? readFileSync(ghLog, 'utf8').trim().split('\n')
        : [];
}

beforeEach(() => {
    sandbox = createReleaseSandbox();
    temp = join(sandbox.root, 'temp');
    ghLog = join(sandbox.root, 'gh.log');
    mkdirSync(temp);
    mkdirSync(join(sandbox.root, 'bin'));

    const gh = join(sandbox.root, 'bin', 'gh');

    writeFileSync(
        gh,
        [
            '#!/usr/bin/env bash',
            `echo "$*" >> "${ghLog}"`,
            `if [ "$2" = view ]; then [ -e "${join(sandbox.root, 'release-exists')}" ]; fi`,
        ].join('\n'),
    );
    chmodSync(gh, 0o755);
    writeFileSync(join(temp, 'release-notes.md'), '### Features\n');

    sandbox.cutRelease('3.2.0');
    sandbox.tagAndPush('v3.2.0');
    sandbox.checkoutTagInRunner('v3.2.0');
});

afterEach(() => {
    sandbox.dispose();
});

describe('the GitHub release step', () => {
    it('edits a release that already exists instead of deleting it', () => {
        writeFileSync(join(sandbox.root, 'release-exists'), '');

        const result = run();

        expect(result.status, result.stderr).toBe(0);
        expect(ghCalls().some((call) => call.includes(' delete '))).toBe(false);
        expect(ghCalls()).toContain(
            `release edit v3.2.0 --title v3.2.0 --notes-file ${join(temp, 'release-notes.md')} --latest`,
        );
    });

    it('creates the release when the tag has none yet', () => {
        const result = run();

        expect(result.status, result.stderr).toBe(0);
        expect(ghCalls()).toContain(
            `release create v3.2.0 --title v3.2.0 --notes-file ${join(temp, 'release-notes.md')} --latest`,
        );
    });

    it('refuses empty release notes before touching the release', () => {
        writeFileSync(join(sandbox.root, 'release-exists'), '');
        writeFileSync(join(temp, 'release-notes.md'), '');

        const result = run();

        expect(result.status).toBe(1);
        expect(result.stderr).toContain('release-notes.md is empty');
        expect(ghCalls()).toEqual([]);
    });
});
