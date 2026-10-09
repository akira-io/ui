// @vitest-environment jsdom

import { describe, expect, it } from 'vitest';

import { zoomFrame } from '@/lib/motion/use-zoom-from-origin';

const rect = (left: number, top: number, width: number, height: number) =>
    ({ left, top, width, height }) as DOMRect;

describe('zoomFrame', () => {
    it('starts on the centre of the origin at its width', () => {
        expect(
            zoomFrame(rect(300, 200, 400, 300), rect(0, 0, 40, 40), false),
        ).toEqual({ x: 20 - 500, y: 20 - 350, scale: 0.1, opacity: 0 });
    });

    it('zooms from the centre without an origin', () => {
        expect(zoomFrame(rect(300, 200, 400, 300), null, false)).toEqual({
            x: 0,
            y: 0,
            scale: 0.9,
            opacity: 0,
        });
    });

    it('treats a zero sized origin as missing', () => {
        expect(
            zoomFrame(rect(300, 200, 400, 300), rect(0, 0, 0, 0), false).scale,
        ).toBe(0.9);
    });

    it('only fades under reduced motion', () => {
        expect(
            zoomFrame(rect(300, 200, 400, 300), rect(0, 0, 40, 40), true),
        ).toEqual({ x: 0, y: 0, scale: 1, opacity: 0 });
    });

    it('never shrinks below a twentieth of the content', () => {
        expect(
            zoomFrame(rect(0, 0, 4000, 300), rect(0, 0, 10, 10), false).scale,
        ).toBe(0.05);
    });
});
