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

const SHELL_TAG = 'v3.2.0-"$(touch${IFS}pwned)"';
const SCRIPT_TAG =
    "v3.2.0-'+require('child_process').execSync('touch${IFS}pwned')+'";
const NOTES = [
    '### Bug Fixes',
    '',
    '- close the "$(touch${IFS}pwned)" dialog',
    'EOF',
    '- keep `touch pwned` in a code span',
].join('\n');

let sandbox: ReleaseSandbox;
let bin: string;
let temp: string;

function stub(name: string, script: string): void {
    const path = join(bin, name);

    writeFileSync(path, `#!/usr/bin/env bash\n${script}\n`);
    chmodSync(path, 0o755);
}

function stepEnv(): NodeJS.ProcessEnv {
    return {
        PATH: `${bin}:${process.env.PATH}`,
        RUNNER_TEMP: temp,
        GITHUB_OUTPUT: join(temp, 'github-output'),
    };
}

function readOutputs(): Record<string, string> {
    const lines = readFileSync(join(temp, 'github-output'), 'utf8').split('\n');
    const outputs: Record<string, string> = {};

    for (let index = 0; index < lines.length; index++) {
        const heredoc = /^([^=<]+)<<(.+)$/.exec(lines[index]);

        if (!heredoc) {
            continue;
        }

        const end = lines.indexOf(heredoc[2], index + 1);

        expect(end, `unterminated output: ${heredoc[1]}`).toBeGreaterThan(
            index,
        );
        outputs[heredoc[1]] = lines.slice(index + 1, end).join('\n');
        index = end;
    }

    return outputs;
}

function prepareTag(tag: string): void {
    sandbox.cutRelease('3.2.0');
    sandbox.tagAndPush(tag);
    sandbox.checkoutTagInRunner(tag);
}

beforeEach(() => {
    sandbox = createReleaseSandbox();
    bin = join(sandbox.root, 'bin');
    temp = join(sandbox.root, 'temp');
    mkdirSync(bin);
    mkdirSync(temp);
    writeFileSync(join(sandbox.root, 'notes.md'), `${NOTES}\n`);
    stub('git-cliff', `cat "${join(sandbox.root, 'notes.md')}"`);
    stub(
        'gh',
        `printf '%s\\n' "$@" >> "${join(sandbox.root, 'gh.log')}"\n[ "$2" = create ] || exit 1`,
    );
});

afterEach(() => {
    sandbox.dispose();
});

describe('a pre-release tag that carries shell syntax', () => {
    it('is committed as text, not run, by the changelog commit', () => {
        prepareTag(SHELL_TAG);
        writeFileSync(join(sandbox.runner, 'CHANGELOG.md'), '## [3.2.0]\n');

        const result = sandbox.runStep(
            'Commit CHANGELOG and version',
            SHELL_TAG,
        );

        expect(result.status, result.stderr).toBe(0);
        expect(existsSync(join(sandbox.runner, 'pwned'))).toBe(false);
        expect(
            sandbox.onRemote('log', '-1', '--format=%s', 'release/3.2.0'),
        ).toBe(`chore(release): ${SHELL_TAG}`);
    });

    it('names the GitHub release as text, not run', () => {
        prepareTag(SHELL_TAG);
        writeFileSync(join(temp, 'release-notes.md'), `${NOTES}\n`);

        const result = sandbox.runStep('Create GitHub Release', SHELL_TAG, {
            env: stepEnv(),
            expressions: { 'steps.notes.outputs.body': 'notes' },
        });

        expect(result.status, result.stderr).toBe(0);
        expect(existsSync(join(sandbox.runner, 'pwned'))).toBe(false);
        expect(readFileSync(join(sandbox.root, 'gh.log'), 'utf8')).toContain(
            `create\n${SHELL_TAG}\n--title\n${SHELL_TAG}\n`,
        );
    });
});

describe('a pre-release tag that carries JavaScript', () => {
    it('becomes the package version as text, not code', () => {
        prepareTag(SCRIPT_TAG);

        const result = sandbox.runStep('Sync version to tag', SCRIPT_TAG);

        expect(result.status, result.stderr).toBe(0);
        expect(existsSync(join(sandbox.runner, 'pwned'))).toBe(false);
        expect(
            JSON.parse(
                readFileSync(join(sandbox.runner, 'package.json'), 'utf8'),
            ).version,
        ).toBe(SCRIPT_TAG.slice(1));
    });
});

describe('release notes built from commit messages', () => {
    it('reach the step output whole, even past a line that reads EOF', () => {
        prepareTag('v3.2.0');

        const result = sandbox.runStep('Extract release notes', 'v3.2.0', {
            env: stepEnv(),
        });

        expect(result.status, result.stderr).toBe(0);
        expect(readOutputs().body).toBe(NOTES);
    });

    it('keep their last line apart from the delimiter when git-cliff omits the final newline', () => {
        prepareTag('v3.2.0');
        writeFileSync(join(sandbox.root, 'notes.md'), NOTES);

        const result = sandbox.runStep('Extract release notes', 'v3.2.0', {
            env: stepEnv(),
        });

        expect(result.status, result.stderr).toBe(0);
        expect(readOutputs().body).toBe(NOTES);
    });

    it('reach the GitHub release as a file, without passing through the shell', () => {
        prepareTag('v3.2.0');
        sandbox.runStep('Extract release notes', 'v3.2.0', {
            env: stepEnv(),
        });

        const result = sandbox.runStep('Create GitHub Release', 'v3.2.0', {
            env: stepEnv(),
            expressions: { 'steps.notes.outputs.body': readOutputs().body },
        });
        const log = readFileSync(join(sandbox.root, 'gh.log'), 'utf8');
        const notesFile = /\n--notes-file\n(.+)\n/.exec(log)?.[1] ?? '';

        expect(result.status, result.stderr).toBe(0);
        expect(existsSync(join(sandbox.runner, 'pwned'))).toBe(false);
        expect(log).not.toContain('\n--notes\n');
        expect(readFileSync(notesFile, 'utf8')).toBe(`${NOTES}\n`);
    });
});
