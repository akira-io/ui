import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

import * as tokens from '../src/lib/motion/tokens';

function source(file: string): string {
    return readFileSync(resolve(process.cwd(), file), 'utf8');
}

describe('one timing for everything that opens and closes', () => {
    it('opens in 260ms and closes in 180ms', () => {
        expect(tokens.overlayOpenDuration).toBe(260);
        expect(tokens.overlayCloseDuration).toBe(180);
    });

    it('slides a sheet in and out on the same timing', () => {
        expect(tokens.slideTransition.enter).toMatchObject({
            duration: tokens.overlayOpenDuration / 1000,
        });
        expect(tokens.slideTransition.exit).toMatchObject({
            duration: tokens.overlayCloseDuration / 1000,
        });
    });

    it.each([
        ['src/lib/motion/morph-surface.tsx'],
        ['src/lib/motion/use-zoom-from-origin.ts'],
    ])('times %s with the shared tokens', (file) => {
        const text = source(file);

        expect(text).toContain('overlayOpenDuration');
        expect(text).toContain('overlayCloseDuration');
        expect(text).not.toMatch(
            /morphDuration|menuOpenDuration|menuCloseDuration/,
        );
    });

    it('slides a sheet in with the shared entrance', () => {
        expect(source('src/lib/motion/use-slide-from-side.ts')).toContain(
            'slideTransition.enter',
        );
    });
});
