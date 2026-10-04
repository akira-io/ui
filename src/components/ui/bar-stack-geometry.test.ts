import { describe, expect, it } from 'vitest';

import {
    stackCornerRadius,
    stackPixelBox,
    stackSideOffset,
    stackSideOwner,
    stackSideTotal,
} from '@/components/ui/bar-stack-geometry';

describe('the geometry of a stacked bar side', () => {
    it('adds only the values on the same side of zero', () => {
        const row = { sales: 60, refunds: -50, tips: 2, fees: -4, note: 'x' };
        const keys = ['sales', 'refunds', 'tips', 'fees', 'note'];

        expect(stackSideTotal(row, keys, false)).toBe(62);
        expect(stackSideTotal(row, keys, true)).toBe(-54);
    });

    it('offsets a segment by the values before it on its own side', () => {
        const row = { sales: 60, refunds: -50, tips: 2, fees: -4 };
        const keys = ['sales', 'refunds', 'tips', 'fees'];

        expect(stackSideOffset(row, keys, 'sales', false)).toBe(0);
        expect(stackSideOffset(row, keys, 'tips', false)).toBe(60);
        expect(stackSideOffset(row, keys, 'fees', true)).toBe(-50);
    });

    it('gives each side to its first non-zero segment', () => {
        const row = { web: 0, mobile: 4, refunds: -2 };
        const keys = ['web', 'mobile', 'refunds'];

        expect(stackSideOwner(row, keys, false)).toBe('mobile');
        expect(stackSideOwner(row, keys, true)).toBe('refunds');
        expect(stackSideOwner({ web: 0 }, ['web'], false)).toBeUndefined();
    });

    it('snaps both edges to whole pixels along and across the bar', () => {
        const segment = { x: 39.5333, y: 120, width: 164.4, height: -30 };

        expect(stackPixelBox(segment, 200.2, 80.6, false)).toEqual({
            x: 40,
            y: 81,
            width: 164,
            height: 119,
        });
        expect(
            stackPixelBox(
                { x: 10, y: 15.8, width: 30, height: 86 },
                532.5592,
                625.5752,
                true,
            ),
        ).toEqual({ x: 533, y: 16, width: 93, height: 86 });
    });

    it('limits the radius to a sixth of the thickness and half the length', () => {
        expect(
            stackCornerRadius({ x: 0, y: 0, width: 18, height: 100 }, 8, false),
        ).toBe(3);
        expect(
            stackCornerRadius({ x: 0, y: 0, width: 10, height: 100 }, 8, false),
        ).toBe(1.6667);
        expect(
            stackCornerRadius({ x: 0, y: 0, width: 100, height: 18 }, 8, true),
        ).toBe(3);
        expect(
            stackCornerRadius({ x: 0, y: 0, width: 64, height: 3 }, 8, false),
        ).toBe(1.5);
        expect(
            stackCornerRadius({ x: 0, y: 0, width: 3, height: 64 }, 8, true),
        ).toBe(1.5);
    });

    it('keeps the full radius on a thick, long bar', () => {
        expect(
            stackCornerRadius({ x: 0, y: 0, width: 64, height: 100 }, 8, false),
        ).toBe(8);
    });
});
