import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { renderBody } from '../scripts/report-missing-examples.mjs';
import { runReportCli } from './helpers/gh-stub';

const TITLE = 'Exports without a site example';
const AKIRA_MARK = {
    group: 'components',
    slug: 'akira-mark',
    specifier: '@akira-io/ui',
};

const ONE = JSON.stringify([AKIRA_MARK]);

describe('report-missing-examples CLI', () => {
    it('refuses a detector output that is not a JSON array', () => {
        const run = runReportCli({ missing: 'null' });

        expect(run.status).not.toBe(0);
        expect(run.stderr).toContain('the detector produced no JSON array');
        expect(run.calls).toEqual([]);
    });

    it('refuses to run without the repository it reports to', () => {
        const run = runReportCli({
            missing: '[]',
            env: { SITE_REPO: undefined },
        });

        expect(run.status).not.toBe(0);
        expect(run.stderr).toContain('SITE_REPO is required');
    });

    it('asks gh for open issues without touching the search index', () => {
        const run = runReportCli({ missing: '[]' });

        expect(run.status).toBe(0);
        expect(run.calls[0]).toEqual([
            'issue',
            'list',
            '--repo',
            'kidiatoliny/ui',
            '--state',
            'open',
            '--limit',
            '100',
            '--json',
            'number,title',
        ]);
    });

    it('fails loudly when gh cannot list the issues', () => {
        const run = runReportCli({ missing: ONE, fail: 'list' });

        expect(run.status).not.toBe(0);
        expect(run.calls).toHaveLength(1);
    });

    it('carries a multi-line body through to gh as one argument', () => {
        const run = runReportCli({ missing: ONE });
        const create = run.calls[1];
        const body = create.at(-1) as string;

        expect(create[1]).toBe('create');
        expect(body.split('\n').length).toBeGreaterThan(5);
        expect(body).toContain('- `components/akira-mark`');
    });

    it('reads back the block it wrote on the previous run', () => {
        const run = runReportCli({
            missing: ONE,
            openIssues: [{ number: 7, title: TITLE }],
            body: renderBody([AKIRA_MARK], 'https://example.test/run/1'),
        });

        expect(run.calls.map((call) => call[1])).toEqual(['list', 'view']);
        expect(run.stdout).toContain('has not changed');
    });

    it('never invokes git', () => {
        const source = readFileSync(
            new URL('../scripts/report-missing-examples.mjs', import.meta.url),
            'utf8',
        );

        expect(source).not.toMatch(/\bgit\b/);
        expect(source).not.toContain('automation/missing-examples');
    });
});
