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
});
