import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const cliffToml = readFileSync(
    new URL('../cliff.toml', import.meta.url),
    'utf8',
);

describe('cliff.toml', () => {
    it('protects breaking commits from being folded into their conventional group', () => {
        expect(cliffToml).toContain('protect_breaking_commits = true');
    });

    it('gives a breaking commit its own changelog group, ahead of the catch-all parser', () => {
        const breakingIndex = cliffToml.indexOf('field = "breaking"');
        const catchAllIndex = cliffToml.indexOf('message = ".*"');

        expect(breakingIndex).toBeGreaterThanOrEqual(0);
        expect(cliffToml).toContain('group = "<!-- 0 -->Breaking Changes"');
        expect(catchAllIndex).toBeGreaterThan(breakingIndex);
    });
});
