import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { resolveDistTag } from '../scripts/release-dist-tag.mjs';

const releaseWorkflow = readFileSync(
    new URL('../.github/workflows/release.yml', import.meta.url),
    'utf8',
);

describe('resolveDistTag', () => {
    it('uses latest for a stable release', () => {
        expect(resolveDistTag('1.1.0', '1.0.0')).toBe('latest');
    });

    it('uses beta without replacing an existing stable latest', () => {
        expect(resolveDistTag('1.1.0-beta.1', '1.0.0')).toBe('beta');
    });

    it('uses the first prerelease identifier as the dist-tag', () => {
        expect(resolveDistTag('2.0.0-rc.2', '1.0.0')).toBe('rc');
    });

    it('keeps latest for a release on the published major', () => {
        expect(resolveDistTag('2.2.0', '2.1.0')).toBe('latest');
    });

    it('keeps latest for a release on a higher major', () => {
        expect(resolveDistTag('3.0.0', '2.1.0')).toBe('latest');
    });

    it('tags a lower-major backport with its own line', () => {
        expect(resolveDistTag('1.3.2', '2.1.0')).toBe('v1');
    });

    it('tags a prerelease on a lower major with its prerelease identifier', () => {
        expect(resolveDistTag('1.3.2-beta.1', '2.1.0')).toBe('beta');
    });

    it('uses latest for the first-ever publish', () => {
        expect(resolveDistTag('1.0.0', '')).toBe('latest');
    });

    it('rejects a malformed published latest', () => {
        expect(() => resolveDistTag('1.3.2', 'not-a-version')).toThrow(
            /valid semantic version for the published latest/i,
        );
    });

    it.each(['1.1', 'v1.1.0', '1.1.0-', 'latest'])(
        'rejects invalid version %s',
        (version) => {
            expect(() => resolveDistTag(version, '1.0.0')).toThrow(
                /valid semantic version/i,
            );
        },
    );
});

describe('release workflow', () => {
    it('dispatches the released version only after publish succeeds', () => {
        expect(releaseWorkflow).toMatch(
            /\n  dispatch-site:\n    needs: publish\n/,
        );
        expect(releaseWorkflow).toContain('event_type=ui-package-released');
        expect(releaseWorkflow).toContain(
            'npm publish --provenance --access public --tag',
        );
    });

    it('pins git-cliff to an exact version in every job that installs it', () => {
        const installs = releaseWorkflow.match(/tool: git-cliff\S*/g) ?? [];

        expect(installs).toHaveLength(2);
        expect(
            installs.every((line) =>
                /^tool: git-cliff@\d+\.\d+\.\d+$/.test(line),
            ),
        ).toBe(true);
        expect(new Set(installs).size).toBe(1);
    });
});
