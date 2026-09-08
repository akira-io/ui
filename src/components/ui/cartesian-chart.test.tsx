// @vitest-environment jsdom

import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { AreaChart } from '@/components/ui/area-chart';
import { BarChart } from '@/components/ui/bar-chart';
import { LineChart } from '@/components/ui/line-chart';

afterEach(cleanup);

const traffic = [
    { date: '2026-03-01T00:00:00Z', visitors: 267, signups: 40 },
    { date: '2026-03-02T00:00:00Z', visitors: 259, signups: 52 },
    { date: '2026-03-03T00:00:00Z', visitors: 312, signups: 61 },
];

function chartStyle(): string {
    return document.querySelector('style')?.innerHTML ?? '';
}

function ticks(container: HTMLElement, axis: 'x' | 'y'): string[] {
    return [
        ...container.querySelectorAll(`.recharts-${axis}Axis-tick-labels text`),
    ].map((tick) => tick.textContent ?? '');
}

describe('the series of a cartesian chart', () => {
    it('paint themselves from the palette when the config names no color', () => {
        render(
            <AreaChart
                data={traffic}
                series={['visitors', 'signups']}
                xKey="date"
            />,
        );

        expect(chartStyle()).toContain(
            '--color-visitors: var(--color-chart-1)',
        );
        expect(chartStyle()).toContain('--color-signups: var(--color-chart-2)');
    });

    it('survive a series key a custom property cannot spell', () => {
        const { container } = render(
            <LineChart
                data={[
                    { month: 'Jan', 'new signups': 12 },
                    { month: 'Feb', 'new signups': 18 },
                ]}
                series={['new signups']}
                xKey="month"
            />,
        );

        expect(chartStyle()).toContain(
            '--color-new-signups: var(--color-chart-1)',
        );
        expect(chartStyle()).not.toContain('--color-new signups');
        expect(
            container
                .querySelector('.recharts-line-curve')
                ?.getAttribute('stroke'),
        ).toBe('var(--color-new-signups)');
    });

    it('render one mark per series', () => {
        const { container } = render(
            <LineChart
                data={traffic}
                series={['visitors', 'signups']}
                xKey="date"
            />,
        );

        expect(container.querySelectorAll('.recharts-line')).toHaveLength(2);
    });

    it('stack onto one another when asked', () => {
        const { container } = render(
            <BarChart
                data={traffic}
                series={['visitors', 'signups']}
                xKey="date"
                stacked
            />,
        );

        const stacks = [
            ...container.querySelectorAll<SVGGElement>('.recharts-bar'),
        ];

        expect(stacks).toHaveLength(2);
    });
});

describe('the axes of a cartesian chart', () => {
    it('format the category axis with the Intl options they are given', () => {
        const { container } = render(
            <AreaChart
                data={traffic}
                series={['visitors']}
                xKey="date"
                xScale="time"
                xFormat={{ month: 'short', day: 'numeric', timeZone: 'UTC' }}
                locale="en-US"
            />,
        );

        expect(ticks(container, 'x')).toEqual(['Mar 1', 'Mar 2', 'Mar 3']);
    });

    it('format the value axis as numbers', () => {
        const { container } = render(
            <BarChart
                data={[
                    { month: 'January', revenue: 128000 },
                    { month: 'February', revenue: 96000 },
                ]}
                series={['revenue']}
                xKey="month"
                yFormat={{
                    style: 'currency',
                    currency: 'USD',
                    notation: 'compact',
                }}
                locale="en-US"
            />,
        );

        expect(ticks(container, 'y')).toContain('$140K');
    });

    it('can be turned off one at a time', () => {
        const { container } = render(
            <LineChart
                data={traffic}
                series={['visitors']}
                xKey="date"
                yAxis={false}
            />,
        );

        expect(container.querySelectorAll('.recharts-yAxis')).toHaveLength(0);
        expect(container.querySelectorAll('.recharts-xAxis')).toHaveLength(1);
    });

    it('swap roles when the chart runs horizontally', () => {
        const { container } = render(
            <BarChart
                data={traffic}
                series={['visitors']}
                xKey="date"
                horizontal
            />,
        );

        expect(ticks(container, 'y')).toEqual(traffic.map((day) => day.date));
        expect(ticks(container, 'x')[0]).toBe('0');
    });
});

describe('the chrome of a cartesian chart', () => {
    it('draws a grid by default and drops it on request', () => {
        const { container, rerender } = render(
            <LineChart data={traffic} series={['visitors']} xKey="date" />,
        );

        expect(
            container.querySelectorAll('.recharts-cartesian-grid'),
        ).toHaveLength(1);

        rerender(
            <LineChart
                data={traffic}
                series={['visitors']}
                xKey="date"
                grid={false}
            />,
        );

        expect(
            container.querySelectorAll('.recharts-cartesian-grid'),
        ).toHaveLength(0);
    });

    it('names its own slot', () => {
        render(<AreaChart data={traffic} series={['visitors']} xKey="date" />);

        expect(document.querySelector('[data-slot="area-chart"]')).toBeTruthy();
    });

    it('lets a caller rename that slot', () => {
        render(
            <BarChart
                data={traffic}
                series={['visitors']}
                xKey="date"
                slotName="traffic"
            />,
        );

        expect(document.querySelector('[data-slot="traffic"]')).toBeTruthy();
    });
});
