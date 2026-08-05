import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const syncDocsWorkflow = readFileSync(
    new URL('../.github/workflows/sync-docs-site.yml', import.meta.url),
    'utf8',
);
const releaseWorkflow = readFileSync(
    new URL('../.github/workflows/release.yml', import.meta.url),
    'utf8',
);

function requireStep(source: string, name: string) {
    const marker = `      - name: ${name}\n`;
    const start = source.indexOf(marker);
    expect(start, `missing workflow step: ${name}`).toBeGreaterThanOrEqual(0);
    const next = source.indexOf('\n      - name:', start + marker.length);
    return source.slice(start, next === -1 ? undefined : next);
}

function assertSafeDocsSiteWriter(source: string) {
    const checkout = requireStep(source, 'Checkout the site');
    expect(checkout).toContain('          ref: next');
    expect(checkout).toContain('          fetch-depth: 0');
    expect(checkout).not.toMatch(/\bref:\s*main\b/);

    const publish = requireStep(source, 'Publish the change');
    expect(publish).toContain('EXPECTED_NEXT="$(git rev-parse HEAD)"');
    expect(
        publish.match(
            /git fetch --no-tags origin "\+refs\/heads\/next:refs\/remotes\/origin\/next"/g,
        ),
    ).toHaveLength(2);
    expect(
        publish.match(/git rev-parse refs\/remotes\/origin\/next/g),
    ).toHaveLength(2);
    expect(
        publish.match(
            /if \[\[ "\$CURRENT_NEXT" != "\$EXPECTED_NEXT" \]\]; then/g,
        ),
    ).toHaveLength(2);
    expect(publish.match(/\n            exit 1/g)).toHaveLength(2);
    expect(publish).toContain(
        'git merge-base --is-ancestor "$EXPECTED_NEXT" HEAD',
    );
    expect(publish.match(/\bgit push\b/g)).toHaveLength(1);
    expect(publish).toContain('git push origin "HEAD:next"');
    expect(publish).not.toMatch(/git push[^\n]*(?:--force|\+HEAD|HEAD:main)/);
    expect(publish).not.toMatch(/git push[^\n]*\|\|\s*true/);
    expect(source).not.toContain('continue-on-error: true');
}

describe('package-to-site workflow writers', () => {
    it('writes synchronized docs only to an unchanged site next ref', () => {
        expect(() => assertSafeDocsSiteWriter(syncDocsWorkflow)).not.toThrow();
    });

    it.each<[string, (source: string) => string]>([
        [
            'site main checkout',
            (source) =>
                source.replace('          ref: next', '          ref: main'),
        ],
        [
            'site main push',
            (source) => source.replace('"HEAD:next"', '"HEAD:main"'),
        ],
        [
            'force push',
            (source) =>
                source.replace(
                    'git push origin "HEAD:next"',
                    'git push --force origin "HEAD:next"',
                ),
        ],
        [
            'hidden push failure',
            (source) =>
                source.replace(
                    'git push origin "HEAD:next"',
                    'git push origin "HEAD:next" || true',
                ),
        ],
        [
            'hidden race failure',
            (source) =>
                source.replace('            exit 1', '            true'),
        ],
    ])('rejects %s', (_name, mutate) => {
        expect(() =>
            assertSafeDocsSiteWriter(mutate(syncDocsWorkflow)),
        ).toThrow();
    });

    it('does not conceal release commit push failures', () => {
        expect(releaseWorkflow).not.toMatch(/git push[^\n]*\|\|\s*true/);
    });
});
