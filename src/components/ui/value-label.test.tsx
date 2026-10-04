// @vitest-environment jsdom

import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { BarChart, type BarChartProps } from '@/components/ui/bar-chart';
import { LineChart } from '@/components/ui/line-chart';
import {
    hasLabelValue,
    LABEL_CHAR_WIDTH,
    LABEL_LINE_HEIGHT,
    labelFits,
    labelWidth,
} from '@/components/ui/value-label';

afterEach(cleanup);

const DIMENSION = { width: 600, height: 300 };

function labels(container: HTMLElement): string[] {
    return [...container.querySelectorAll('.recharts-label-list text')].map(
        (label) => label.textContent ?? '',
    );
}

function chart(props: BarChartProps): string[] {
    return labels(
        render(
            <BarChart
                locale="en-US"
                initialDimension={DIMENSION}
                valueLabels
                {...props}
            />,
        ).container,
    );
}

describe('the value labels of a stacked bar chart', () => {
    it('leave out a series that is zero on a row of a horizontal stack', () => {
        const printed = chart({
            data: [
                { method: 'Vinti4', passed: 120, failed: 0 },
                { method: 'Visa', passed: 80, failed: 40 },
            ],
            series: ['passed', 'failed'],
            xKey: 'method',
            horizontal: true,
            stacked: true,
        });

        expect(printed).toEqual(['120', '80', '40']);
        expect(printed).not.toContain('0');
    });

    it('leave out segments without a number', () => {
        const printed = chart({
            data: [
                { month: 'Jan', web: 100, mobile: null },
                { month: 'Feb', web: Number.NaN, mobile: 100 },
            ],
            series: ['web', 'mobile'],
            xKey: 'month',
            stacked: true,
        });

        expect(printed).toEqual(['100', '100']);
    });

    it('leave out a segment thinner than a line of text', () => {
        const printed = chart({
            data: [
                { month: 'Jan', web: 100, mobile: 80, kiosk: 3 },
                { month: 'Feb', web: 60, mobile: 40, kiosk: 2 },
            ],
            series: ['web', 'mobile', 'kiosk'],
            xKey: 'month',
            stacked: true,
        });

        expect(printed).toEqual(['100', '60', '80', '40']);
    });

    it('leave out a segment narrower than its text', () => {
        const printed = chart({
            data: [{ route: 'Praia', big: 100_000_000, small: 9_000_000 }],
            series: ['big', 'small'],
            xKey: 'route',
            horizontal: true,
            stacked: true,
            valueLabels: {},
        });

        expect(printed).toEqual(['100,000,000']);
    });

    it('print a segment wide enough for its text', () => {
        const printed = chart({
            data: [{ route: 'Praia', web: 500, mobile: 400 }],
            series: ['web', 'mobile'],
            xKey: 'route',
            horizontal: true,
            stacked: true,
        });

        expect(printed).toEqual(['500', '400']);
    });
});

describe('the value labels outside a stack', () => {
    it.each([
        { variant: 'bar', horizontal: false },
        { variant: 'lollipop', horizontal: false },
        { variant: 'lollipop', horizontal: true },
    ] as const)('leave out a $variant that is zero', (shape) => {
        const printed = chart({
            data: [
                { route: 'Praia', revenue: 12 },
                { route: 'Fogo', revenue: 0 },
                { route: 'Brava', revenue: 7 },
            ],
            series: ['revenue'],
            xKey: 'route',
            ...shape,
        });

        expect(printed).toEqual(['12', '7']);
    });

    it('leave out a point of a line that is zero', () => {
        const { container } = render(
            <LineChart
                data={[
                    { day: 'Mon', trips: 10 },
                    { day: 'Tue', trips: 0 },
                    { day: 'Wed', trips: 5 },
                ]}
                series={['trips']}
                xKey="day"
                locale="en-US"
                initialDimension={DIMENSION}
                valueLabels
            />,
        );

        expect(labels(container)).toEqual(['10', '5']);
    });
});

describe('the estimate of a value label', () => {
    it('grows with the number of characters', () => {
        expect(labelWidth('103 M')).toBe(5 * LABEL_CHAR_WIDTH);
    });

    it('accepts only numbers other than zero', () => {
        expect(
            [0, null, undefined, Number.NaN, 'x', 4, -2].map(hasLabelValue),
        ).toEqual([false, false, false, false, false, true, true]);
    });

    it('fits a segment as wide as its text and as tall as a line', () => {
        const width = labelWidth('400');

        expect(
            labelFits('400', { width, height: LABEL_LINE_HEIGHT }, 'segment'),
        ).toBe(true);
        expect(
            labelFits('400', { width: width - 1, height: 16 }, 'segment'),
        ).toBe(false);
        expect(
            labelFits(
                '400',
                { width, height: LABEL_LINE_HEIGHT - 1 },
                'segment',
            ),
        ).toBe(false);
    });
});
