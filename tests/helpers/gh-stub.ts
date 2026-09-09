import { spawnSync } from 'node:child_process';
import { chmodSync, mkdirSync, mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const STUB = `#!/usr/bin/env bash
{
    printf '=== call\\n'
    for argument in "$@"; do printf '%s\\n--\\n' "$argument"; done
} >> "$GH_LOG"

case "$1 $2" in
"issue list") printf '%s' "$GH_OPEN_ISSUE" ;;
"issue view") printf '%s' "$GH_ISSUE_BODY" ;;
esac
`;

export type GhCall = {
    command: string;
    args: string[];
};

export type ReportRun = {
    status: number;
    stderr: string;
    stdout: string;
    calls: GhCall[];
};

function parseCalls(log: string): GhCall[] {
    return log
        .split('=== call\n')
        .filter((entry) => entry.trim().length > 0)
        .map((entry) => {
            const args = entry
                .split('\n--\n')
                .slice(0, -1)
                .map((argument) => argument.replace(/\n$/, ''));

            return { command: args.slice(0, 2).join(' '), args };
        });
}

export function runReport(options: {
    missing: string;
    openIssue?: string;
    issueBody?: string;
}): ReportRun {
    const home = mkdtempSync(join(tmpdir(), 'gh-stub-'));
    const bin = join(home, 'bin');

    mkdirSync(bin, { recursive: true });
    writeFileSync(join(bin, 'gh'), STUB);
    chmodSync(join(bin, 'gh'), 0o755);

    const log = join(home, 'calls.txt');

    writeFileSync(log, '');

    const result = spawnSync(
        'bash',
        [
            new URL('../../scripts/report-missing-examples.sh', import.meta.url)
                .pathname,
        ],
        {
            encoding: 'utf8',
            env: {
                ...process.env,
                PATH: `${bin}:${process.env.PATH}`,
                GH_LOG: log,
                GH_OPEN_ISSUE: options.openIssue ?? '',
                GH_ISSUE_BODY: options.issueBody ?? '',
                SITE_REPO: 'kidiatoliny/ui',
                ISSUE_TITLE: 'Exports without a site example',
                MISSING: options.missing,
                RUN_URL: 'https://example.test/run/1',
            },
        },
    );

    return {
        status: result.status ?? -1,
        stderr: result.stderr,
        stdout: result.stdout,
        calls: parseCalls(spawnSync('cat', [log], { encoding: 'utf8' }).stdout),
    };
}

export function entry(group: string, slug: string, specifier: string) {
    return { group, slug, specifier };
}
