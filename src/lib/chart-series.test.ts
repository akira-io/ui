import { describe, expect, it } from 'vitest';

import {
    CHART_PALETTE,
    axisFormatter,
    numberFormatter,
    resolveChartSeries,
} from '@/lib/chart-series';

describe('series without colors', () => {
    it('take the palette in order, so two charts side by side agree', () => {
        const { series } = resolveChartSeries(['visitors', 'signups']);

        expect(series.map((item) => item.color)).toEqual([
            CHART_PALETTE[0],
            CHART_PALETTE[1],
        ]);
    });

    it('wrap around once the palette runs out', () => {
        const keys = Array.from({ length: 9 }, (_, index) => `s${index}`);
        const { series } = resolveChartSeries(keys);

        expect(series[8].color).toBe(CHART_PALETTE[0]);
    });

    it('label themselves with their key', () => {
        const { series } = resolveChartSeries(['visitors']);

        expect(series[0].label).toBe('visitors');
    });
});

describe('a series the config describes', () => {
    it('keeps the color and label the config gives it', () => {
        const { series, config } = resolveChartSeries(['visitors'], {
            visitors: { label: 'Visitors', color: 'oklch(0.5 0.1 200)' },
        });

        expect(series[0].color).toBe('oklch(0.5 0.1 200)');
        expect(series[0].label).toBe('Visitors');
        expect(config.visitors?.color).toBe('oklch(0.5 0.1 200)');
    });

    it('is overridden by a color passed on the series itself', () => {
        const { series } = resolveChartSeries(
            [{ key: 'visitors', color: 'red' }],
            { visitors: { color: 'blue' } },
        );

        expect(series[0].color).toBe('red');
    });

    it('leaves the untouched config entries alone', () => {
        const { config } = resolveChartSeries(['visitors'], {
            other: { label: 'Other', color: 'green' },
        });

        expect(config.other).toEqual({ label: 'Other', color: 'green' });
    });
});

describe('formatting', () => {
    it('formats numbers with the Intl options it is given', () => {
        const format = numberFormatter(
            { style: 'currency', currency: 'USD', maximumFractionDigits: 0 },
            'en-US',
        );

        expect(format(1280)).toBe('$1,280');
    });

    it('leaves a value it cannot read as a number alone', () => {
        expect(numberFormatter(undefined, 'en-US')('n/a')).toBe('n/a');
    });

    it('formats a time axis as a date', () => {
        const format = axisFormatter(
            'time',
            { month: 'short', day: 'numeric', timeZone: 'UTC' },
            'en-US',
        );

        expect(format?.('2026-03-14T00:00:00Z')).toBe('Mar 14');
    });

    it('leaves a categorical axis unformatted unless asked', () => {
        expect(axisFormatter('categorical')).toBeUndefined();
    });
});
