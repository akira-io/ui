import { describe, expect, it } from 'vitest';

import { exactFormat } from '@/lib/chart-number-format';

describe('the exact version of a value format', () => {
    it('is absent when the chart names no value format', () => {
        expect(exactFormat()).toBeUndefined();
    });

    it('drops the compact notation and the decimals of a currency', () => {
        expect(
            exactFormat({
                style: 'currency',
                currency: 'CVE',
                currencyDisplay: 'code',
                notation: 'compact',
                compactDisplay: 'short',
                maximumFractionDigits: 1,
            }),
        ).toEqual({
            style: 'currency',
            currency: 'CVE',
            currencyDisplay: 'code',
            unit: undefined,
            unitDisplay: undefined,
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        });
    });

    it('prints a count without decimals', () => {
        const options = exactFormat({ notation: 'compact' });

        expect(
            new Intl.NumberFormat('en-US', options).format(375_044_357.4),
        ).toBe('375,044,357');
    });

    it('keeps the decimals of a percent', () => {
        expect(
            exactFormat({ style: 'percent', maximumFractionDigits: 1 }),
        ).toMatchObject({ style: 'percent', maximumFractionDigits: 1 });
        expect(
            exactFormat({
                style: 'unit',
                unit: 'percent',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            }),
        ).toMatchObject({
            unit: 'percent',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    });
});
