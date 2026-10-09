// @vitest-environment jsdom

import { describe, expect, it } from 'vitest';

import { restingFrame, zoomFrame } from '@/lib/motion/use-zoom-from-origin';

const shape = (
    left: number,
    top: number,
    width: number,
    height: number,
    radius = 0,
) => ({ rect: { left, top, width, height } as DOMRect, radius });

const content = shape(300, 200, 400, 300, 24);

describe('zoomFrame', () => {
    it('sits on the origin, cut to its size and corners, fully opaque', () => {
        expect(zoomFrame(content, shape(0, 0, 40, 40, 8), false)).toEqual({
            x: 20 - 500,
            y: 20 - 350,
            scale: 1,
            opacity: 1,
            clipPath: 'inset(130px 180px 130px 180px round 8px)',
        });
    });

    it('never cuts deeper than the content when the origin is larger', () => {
        expect(zoomFrame(content, shape(0, 0, 600, 20), false).clipPath).toBe(
            'inset(140px 0px 140px 0px round 0px)',
        );
    });

    it('zooms from the centre without an origin', () => {
        expect(zoomFrame(content, null, false)).toEqual({
            ...restingFrame(content),
            scale: 0.9,
            opacity: 0,
        });
    });

    it('treats a zero sized origin as missing', () => {
        expect(zoomFrame(content, shape(0, 0, 0, 0), false).scale).toBe(0.9);
    });

    it('only fades under reduced motion', () => {
        expect(zoomFrame(content, shape(0, 0, 40, 40), true)).toEqual({
            ...restingFrame(content),
            opacity: 0,
        });
    });
});

describe('restingFrame', () => {
    it('rests uncut with the content corners', () => {
        expect(restingFrame(content).clipPath).toBe(
            'inset(0px 0px 0px 0px round 24px)',
        );
    });
});
