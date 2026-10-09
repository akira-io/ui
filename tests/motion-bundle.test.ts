import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const dist = fileURLToPath(new URL('../dist', import.meta.url));

const bundles = readdirSync(dist, { recursive: true, encoding: 'utf8' })
    .filter((file) => file.endsWith('.js'))
    .map((file) => ({ file, source: readFileSync(join(dist, file), 'utf8') }));

describe('the motion bundle', () => {
    it('imports motion from the package instead of inlining it', () => {
        const importers = bundles.filter(({ source }) =>
            /from ['"]motion\/react['"]/.test(source),
        );

        expect(importers.length).toBeGreaterThan(0);
        expect(
            bundles.filter(({ source }) =>
                source.includes('MotionGlobalConfig ='),
            ),
        ).toEqual([]);
    });

    it.each(bundles)(
        '$file never pulls the layout features of domMax',
        ({ source }) => {
            expect(source).not.toMatch(/\bdomMax\b/);
        },
    );
});
