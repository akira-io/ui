import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const release = readFileSync(
    new URL('../.github/workflows/release.yml', import.meta.url),
    'utf8',
);

function job(name: string): string {
    const marker = `  ${name}:\n`;
    const start = release.indexOf(marker);

    expect(start, `missing job: ${name}`).toBeGreaterThanOrEqual(0);

    const rest = release.slice(start + marker.length);
    const next = rest.search(/\n {2}[a-z][a-z-]*:\n/);

    return next === -1
        ? release.slice(start)
        : release.slice(start, start + marker.length + next);
}

describe('the release workflow', () => {
    it('compares the tagged commit with the tip of the default branch', () => {
        const guard = job('guard');

        expect(guard).toContain('git rev-parse "origin/$DEFAULT_BRANCH"');
        expect(guard).toContain('TAGGED="$(git rev-parse HEAD)"');
        expect(guard).toContain('if [ "$TIP" != "$TAGGED" ]; then');
        expect(guard).toContain('exit 1');
    });

    it('publishes nothing until that comparison passes', () => {
        expect(job('publish')).toContain('needs: guard');
        expect(job('release')).toContain('needs: guard');
    });

    it('waits for a downloadable tarball, not for metadata', () => {
        const publish = job('publish');

        expect(publish).toContain('npm pack "@akira-io/ui@$VERSION"');
        expect(publish).not.toContain(
            'npm view "@akira-io/ui@$VERSION" version 2>/dev/null',
        );
    });

    it('tells the site only after the tarball is downloadable', () => {
        const dispatch = job('dispatch-site');

        expect(dispatch).toContain('needs: publish');
        expect(dispatch).toContain('event_type=ui-package-released');
    });
});
