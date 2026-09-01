import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const ci = readFileSync(
    new URL('../.github/workflows/ci.yml', import.meta.url),
    'utf8',
);

const release = readFileSync(
    new URL('../.github/workflows/release.yml', import.meta.url),
    'utf8',
);

const pinnedBunVersion = readFileSync(
    new URL('../.bun-version', import.meta.url),
    'utf8',
).trim();

describe('the pull request workflow', () => {
    it('runs on every pull request', () => {
        expect(ci).toContain('on:\n  pull_request:\n');
    });

    it('runs the suite, the typecheck and the format check', () => {
        expect(ci).toContain('- run: bun run test');
        expect(ci).toContain('- run: bun run typecheck');
        expect(ci).toContain('- run: bun run format:check');
    });

    it('installs from the lockfile, so a drifted lockfile fails the check', () => {
        expect(ci).toContain('- run: bun install --frozen-lockfile');
    });

    it('pins every action to a full-length commit sha', () => {
        const uses = [...ci.matchAll(/uses: (\S+)/g)].map(([, value]) => value);

        expect(uses.length).toBeGreaterThan(0);
        uses.forEach((value) => expect(value).toMatch(/^[^@]+@[0-9a-f]{40}$/));
    });
});

describe('the pinned bun version', () => {
    it('is a released version, not a floating tag', () => {
        expect(pinnedBunVersion).toMatch(/^\d+\.\d+\.\d+$/);
    });

    it('is the version both workflows install', () => {
        expect(ci).toContain('bun-version-file: .bun-version');
        expect(release).toContain('bun-version-file: .bun-version');
        expect(release).not.toContain('bun-version: latest');
    });
});
