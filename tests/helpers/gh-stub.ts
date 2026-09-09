import { spawnSync } from 'node:child_process';
import {
    chmodSync,
    mkdirSync,
    mkdtempSync,
    readFileSync,
    writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const STUB = `#!/usr/bin/env bash
for argument in "$@"; do printf '%s\\036' "$argument" >> "$GH_LOG"; done
printf '\\035' >> "$GH_LOG"

if [ -n "\${GH_FAIL:-}" ] && [ "$2" = "$GH_FAIL" ]; then
    echo "gh: refusing $2" >&2
    exit 1
fi

case "$1 $2" in
"issue list") printf '%s' "$GH_OPEN_ISSUES" ;;
"issue view") printf '%s' "$GH_ISSUE_JSON" ;;
esac
`;

export type ReportRun = {
    status: number;
    stderr: string;
    stdout: string;
    calls: string[][];
};

export function runReportCli(options: {
    missing: string;
    openIssues?: unknown[];
    body?: string;
    fail?: string;
    env?: Record<string, string | undefined>;
}): ReportRun {
    const home = mkdtempSync(join(tmpdir(), 'gh-stub-'));
    const bin = join(home, 'bin');

    mkdirSync(bin, { recursive: true });
    writeFileSync(join(bin, 'gh'), STUB);
    chmodSync(join(bin, 'gh'), 0o755);

    const log = join(home, 'calls.txt');

    writeFileSync(log, '');

    const result = spawnSync(
        process.execPath,
        [
            new URL(
                '../../scripts/report-missing-examples.mjs',
                import.meta.url,
            ).pathname,
        ],
        {
            encoding: 'utf8',
            env: {
                PATH: `${bin}:${process.env.PATH}`,
                GH_LOG: log,
                GH_OPEN_ISSUES: JSON.stringify(options.openIssues ?? []),
                GH_ISSUE_JSON: JSON.stringify({ body: options.body ?? '' }),
                GH_FAIL: options.fail ?? '',
                SITE_REPO: 'kidiatoliny/ui',
                ISSUE_TITLE: 'Exports without a site example',
                MISSING: options.missing,
                RUN_URL: 'https://example.test/run/1',
                ...options.env,
            },
        },
    );

    const calls = readFileSync(log, 'utf8')
        .split('\u001d')
        .filter((entry) => entry.length > 0)
        .map((entry) => entry.split('\u001e').slice(0, -1));

    return {
        status: result.status ?? -1,
        stderr: result.stderr,
        stdout: result.stdout,
        calls,
    };
}
