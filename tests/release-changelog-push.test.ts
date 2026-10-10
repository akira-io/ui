import { execFileSync } from 'node:child_process';
import { chmodSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import {
    createReleaseSandbox,
    type ReleaseSandbox,
} from './helpers/release-workflow';

const STEP = 'Commit CHANGELOG and version';
const TOKEN = 'ghs_release_token';

let sandbox: ReleaseSandbox;
let gitLog: string;

function run(): ReturnType<ReleaseSandbox['runStep']> {
    return sandbox.runStep(STEP, 'v3.2.0', {
        env: {
            PATH: `${join(sandbox.root, 'bin')}:${process.env.PATH}`,
            GITHUB_TOKEN: TOKEN,
        },
    });
}

beforeEach(() => {
    sandbox = createReleaseSandbox();
    gitLog = join(sandbox.root, 'git.log');
    mkdirSync(join(sandbox.root, 'bin'));

    const realGit = execFileSync('which', ['git'], {
        encoding: 'utf8',
    }).trim();
    const git = join(sandbox.root, 'bin', 'git');

    writeFileSync(
        git,
        [
            '#!/usr/bin/env bash',
            `printf '%s\\n' "$*" >> "${gitLog}"`,
            `exec "${realGit}" "$@"`,
        ].join('\n'),
    );
    chmodSync(git, 0o755);

    sandbox.cutRelease('3.2.0');
    sandbox.tagAndPush('v3.2.0');
    sandbox.checkoutTagInRunner('v3.2.0');
    writeFileSync(join(sandbox.runner, 'CHANGELOG.md'), '## [3.2.0]\n');
});

afterEach(() => {
    sandbox.dispose();
});

describe('the changelog push', () => {
    it('authenticates with the token it is handed, not one the checkout left behind', () => {
        const header = Buffer.from(`x-access-token:${TOKEN}`).toString(
            'base64',
        );

        const result = run();
        const push = readFileSync(gitLog, 'utf8')
            .split('\n')
            .find((line) => /(^| )push /.test(line));

        expect(result.status, result.stderr).toBe(0);
        expect(push).toContain(`extraheader=AUTHORIZATION: basic ${header}`);
        expect(
            readFileSync(join(sandbox.runner, '.git', 'config'), 'utf8'),
        ).not.toContain(header);
        expect(
            sandbox.onRemote('log', '-1', '--format=%s', 'release/3.2.0'),
        ).toBe('chore(release): v3.2.0');
    });
});
