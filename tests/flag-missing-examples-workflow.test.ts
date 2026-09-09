import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const workflow = readFileSync(
    new URL('../.github/workflows/flag-missing-examples.yml', import.meta.url),
    'utf8',
);

describe('flag-missing-examples workflow', () => {
    it('never writes to the site repository', () => {
        expect(workflow).not.toMatch(/\bgit push\b/);
        expect(workflow).not.toMatch(/\bgit commit\b/);
        expect(workflow).not.toMatch(/\bgit checkout -B\b/);
        expect(workflow).not.toMatch(/\bgh pr\b/);
        expect(workflow).not.toContain('automation/missing-examples');
        expect(workflow).toContain('permissions:\n  contents: read\n');
    });

    it('reads the site next ref without keeping its credentials', () => {
        expect(workflow).toContain('          repository: kidiatoliny/ui');
        expect(workflow).toContain('          ref: next');
        expect(workflow).toContain('          persist-credentials: false');
    });

    it('runs the detector over the package and the checked-out site', () => {
        expect(workflow).toContain(
            'node scripts/detect-missing-examples.mjs . site',
        );
    });

    it('reuses the open issue instead of opening one per push', () => {
        expect(workflow).toContain(
            'gh issue list --repo "$SITE_REPO" --state open',
        );
        expect(workflow).toContain('--search "$ISSUE_TITLE in:title"');
        expect(workflow).toContain(
            'gh issue edit "$NUMBER" --repo "$SITE_REPO"',
        );
        expect(workflow).toContain(
            'gh issue comment "$NUMBER" --repo "$SITE_REPO"',
        );
    });

    it('stays silent when the list has not changed', () => {
        expect(workflow).toContain(
            'if [ "$RECORDED" = "$(printf \'%s\' "$MISSING" | tr -d \'[:space:]\')" ]; then',
        );
    });

    it('opens the issue on the site, assigned and labelled', () => {
        expect(workflow).toContain('gh issue create --repo "$SITE_REPO"');
        expect(workflow).toContain('--label documentation');
        expect(workflow).toContain('--assignee kidiatoliny');
    });

    it('closes the issue once nothing is missing', () => {
        expect(workflow).toContain('if [ "$MISSING" = \'[]\' ]; then');
        expect(workflow).toContain(
            'gh issue close "$NUMBER" --repo "$SITE_REPO"',
        );
    });
});
