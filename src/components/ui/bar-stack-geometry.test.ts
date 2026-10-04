import { describe, expect, it } from 'vitest';

import {
    stackCornerRadius,
    stackSideOutline,
    stackSideTotal,
} from '@/components/ui/bar-stack-geometry';

describe('the geometry of a stacked bar side', () => {
    it('adds only the values on the same side of zero', () => {
        const row = { sales: 60, refunds: -50, tips: 2, fees: -4, note: 'x' };
        const keys = ['sales', 'refunds', 'tips', 'fees', 'note'];

        expect(stackSideTotal(row, keys, false)).toBe(62);
        expect(stackSideTotal(row, keys, true)).toBe(-54);
    });

    it('spans the whole side along the value axis and the segment across it', () => {
        const segment = { x: 40, y: 120, width: 20, height: -30 };

        expect(stackSideOutline(segment, 200, 80, false)).toEqual({
            x: 40,
            y: 80,
            width: 20,
            height: 120,
        });
        expect(stackSideOutline(segment, 10, 130, true)).toEqual({
            x: 10,
            y: 90,
            width: 120,
            height: 30,
        });
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
