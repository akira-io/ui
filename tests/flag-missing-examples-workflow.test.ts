import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const workflowUrl = new URL(
    '../.github/workflows/flag-missing-examples.yml',
    import.meta.url,
);
const workflow = readFileSync(workflowUrl, 'utf8');
const report = readFileSync(
    new URL('../scripts/report-missing-examples.mjs', import.meta.url),
    'utf8',
);

function step(name: string) {
    const start = workflow.indexOf(`      - name: ${name}\n`);

    expect(start, `missing workflow step: ${name}`).toBeGreaterThanOrEqual(0);

    const next = workflow.indexOf('\n      - ', start + 1);

    return workflow.slice(start, next === -1 ? undefined : next);
}

describe('flag-missing-examples workflow', () => {
    it('never writes to the site repository, in the workflow or the script it runs', () => {
        for (const source of [workflow, report]) {
            expect(source).not.toMatch(/\bgit\b/);
            expect(source).not.toMatch(/'(pr|repo|api)'|\bgh (pr|repo|api)\b/);
            expect(source).not.toContain('automation/missing-examples');
        }
    });

    it('grants no write permission anywhere in the file', () => {
        expect(workflow).not.toMatch(
            /\b(contents|issues|pull-requests): write/,
        );
    });

    it('reads the site next ref without keeping its credentials', () => {
        const checkout = step('Checkout the site');

        expect(checkout).toContain('repository: kidiatoliny/ui');
        expect(checkout).toContain('ref: next');
        expect(checkout).toContain('persist-credentials: false');
    });

    it('refuses a detector run that produced no JSON array', () => {
        const detect = step('Detect exports without a demo');

        expect(detect).toContain('set -euo pipefail');
        expect(detect).toContain("'['*']') ;;");
        expect(detect).toContain('exit 1');
    });

    it('carries the detector output into the reporting step', () => {
        const detect = step('Detect exports without a demo');
        const id = detect.match(/^\s+id: (\S+)$/m)?.[1];

        expect(id).toBeDefined();
        expect(step('Report the list on the site issue')).toContain(
            `steps.${id}.outputs.missing`,
        );
    });

    it('delegates the issue handling to the tested script', () => {
        expect(step('Report the list on the site issue')).toContain(
            'node scripts/report-missing-examples.mjs',
        );
    });
});
