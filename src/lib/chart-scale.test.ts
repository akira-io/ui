import { describe, expect, it } from 'vitest';

import {
    niceCeiling,
    niceTicks,
    symmetricReach,
    valueAxisScale,
} from '@/lib/chart-scale';

describe('niceCeiling', () => {
    it.each([
        [25296, 30000],
        [0.7, 1],
        [1, 1],
        [1.2, 1.5],
        [87, 100],
        [400, 400],
        [5.1, 10],
    ])('rounds %s up to %s', (value, nice) => {
        expect(niceCeiling(value)).toBe(nice);
    });

    it('rounds the reach of a negative value', () => {
        expect(niceCeiling(-25296)).toBe(30000);
    });

    it.each([0, Number.NaN, Number.POSITIVE_INFINITY])(
        'falls back to one for %s',
        (value) => {
            expect(niceCeiling(value)).toBe(1);
        },
    );
});

describe('niceTicks', () => {
    it('steps a symmetric domain through zero', () => {
        expect(niceTicks(-30000, 30000)).toEqual([
            -30000, -20000, -10000, 0, 10000, 20000, 30000,
        ]);
    });

    it('keeps zero in a domain that starts at it', () => {
        expect(niceTicks(0, 87)).toEqual([0, 20, 40, 60, 80]);
    });

    it('lands on both bounds when a nice step allows it', () => {
        expect(niceTicks(0, 100)).toEqual([0, 25, 50, 75, 100]);
        expect(niceTicks(-1, 1)).toEqual([-1, -0.5, 0, 0.5, 1]);
    });

    it('stays within a negative domain', () => {
        expect(niceTicks(-87, -3)).toEqual([-80, -60, -40, -20]);
    });

    it('writes no floating point noise', () => {
        expect(niceTicks(0, 0.3)).toEqual([0, 0.1, 0.2, 0.3]);
    });

    it('returns a single tick for an empty span and none for NaN', () => {
        expect(niceTicks(5, 5)).toEqual([5]);
        expect(niceTicks(Number.NaN, 1)).toEqual([]);
    });
});

describe('symmetricReach', () => {
    const rows = [
        { month: 'Jan', income: 10, refunds: -4, fees: -9 },
        { month: 'Feb', income: 25, refunds: -6, fees: -3 },
    ];

    it('takes the largest absolute value of each series', () => {
        expect(
            symmetricReach(rows, [
                { key: 'income' },
                { key: 'refunds' },
                { key: 'fees' },
            ]),
        ).toBe(25);
    });

    it('adds a stack up side by side', () => {
        expect(
            symmetricReach(rows, [
                { key: 'income', stack: 'flow' },
                { key: 'refunds', stack: 'flow' },
                { key: 'fees', stack: 'flow' },
            ]),
        ).toBe(25);
        expect(
            symmetricReach(rows, [
                { key: 'refunds', stack: 'out' },
                { key: 'fees', stack: 'out' },
            ]),
        ).toBe(13);
    });

    it('is zero without data', () => {
        expect(symmetricReach([], [{ key: 'income' }])).toBe(0);
    });
});

describe('valueAxisScale', () => {
    const rows = [{ day: 'Mon', value: -25296 }];
    const series = [{ key: 'value' }];

    it('mirrors the nice reach of the data', () => {
        expect(valueAxisScale('symmetric', 'linear', rows, series)).toEqual({
            domain: [-30000, 30000],
            ticks: [-30000, -20000, -10000, 0, 10000, 20000, 30000],
        });
    });

    it('gives an empty chart a sensible symmetric domain', () => {
        expect(valueAxisScale('symmetric', 'linear', [], series)).toEqual({
            domain: [-1, 1],
            ticks: [-1, -0.5, 0, 0.5, 1],
        });
    });

    it('leaves an automatic domain to recharts', () => {
        expect(valueAxisScale(undefined, 'linear', rows, series)).toEqual({
            domain: undefined,
            ticks: undefined,
        });
        expect(
            valueAxisScale(['auto', 'auto'], 'linear', rows, series).ticks,
        ).toBeUndefined();
        expect(
            valueAxisScale(['auto', 200], 'linear', rows, series).ticks,
        ).toBeUndefined();
    });

    it('leaves the ticks of a log scale alone', () => {
        expect(
            valueAxisScale([1, 1000], 'log', rows, series).ticks,
        ).toBeUndefined();
    });
});
