// @vitest-environment jsdom

import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { BarChart } from '@/components/ui/bar-chart';
import { LineChart } from '@/components/ui/line-chart';

afterEach(cleanup);

const rates = [
    { week: 'W1', rate: 12 },
    { week: 'W2', rate: 31 },
    { week: 'W3', rate: 40 },
];

const longTail = [
    { day: 'Mon', hits: 1 },
    { day: 'Tue', hits: 10 },
    { day: 'Wed', hits: 100 },
    { day: 'Thu', hits: 1000 },
];

function ticks(container: HTMLElement, axis: 'x' | 'y'): string[] {
    return [
        ...container.querySelectorAll(`.recharts-${axis}Axis-tick-labels text`),
    ].map((tick) => tick.textContent ?? '');
}

function linePoints(container: HTMLElement): number[] {
    const path =
        container.querySelector('.recharts-line-curve')?.getAttribute('d') ??
        '';

    return [...path.matchAll(/[ML]([\d.]+),([\d.]+)/g)].map((match) =>
        Number(match[2]),
    );
}

function gaps(values: readonly number[]): number[] {
    return values.slice(1).map((value, index) => values[index] - value);
}

function referenceLines(container: HTMLElement) {
    return [
        ...container.querySelectorAll<SVGLineElement>(
            '.recharts-reference-line line',
        ),
    ];
}

describe('the value domain of a cartesian chart', () => {
    it('reaches the data maximum when no domain is given', () => {
        const { container } = render(
            <LineChart data={rates} series={['rate']} xKey="week" />,
        );

        expect(ticks(container, 'y').at(-1)).toBe('40');
    });

    it('is pinned to the bounds it is given', () => {
        const { container } = render(
            <LineChart
                data={rates}
                series={['rate']}
                xKey="week"
                yDomain={[0, 100]}
            />,
        );

        expect(ticks(container, 'y')[0]).toBe('0');
        expect(ticks(container, 'y').at(-1)).toBe('100');
    });

    it('lets one bound stay automatic', () => {
        const { container } = render(
            <BarChart
                data={rates}
                series={['rate']}
                xKey="week"
                yDomain={['auto', 200]}
                horizontal
            />,
        );

        expect(ticks(container, 'x').at(-1)).toBe('200');
    });
});

describe('the value scale of a cartesian chart', () => {
    it('spaces a long tail evenly on a log scale', () => {
        const { container } = render(
            <LineChart
                data={longTail}
                series={['hits']}
                xKey="day"
                curve="linear"
                yScale="log"
            />,
        );

        const [first, ...rest] = gaps(linePoints(container));

        for (const gap of rest) {
            expect(gap).toBeCloseTo(first, 5);
        }
    });

    it('stays linear by default', () => {
        const { container } = render(
            <LineChart
                data={longTail}
                series={['hits']}
                xKey="day"
                curve="linear"
            />,
        );

        const [first, , last] = gaps(linePoints(container));

        expect(last).toBeGreaterThan(first * 10);
    });

    it('starts a log scale above zero when the domain asks for zero', () => {
        const { container } = render(
            <LineChart
                data={longTail}
                series={['hits']}
                xKey="day"
                curve="linear"
                yScale="log"
                yDomain={[0, 'auto']}
            />,
        );

        expect(linePoints(container).every(Number.isFinite)).toBe(true);
        expect(ticks(container, 'y')).not.toContain('0');
    });
});

describe('the reference lines of a cartesian chart', () => {
    it('are absent by default', () => {
        const { container } = render(
            <LineChart data={rates} series={['rate']} xKey="week" />,
        );

        expect(referenceLines(container)).toHaveLength(0);
    });

    it('draw a labelled value line across the plot', () => {
        const { container } = render(
            <LineChart
                data={rates}
                series={['rate']}
                xKey="week"
                referenceLines={[{ y: 30, label: 'Target' }]}
            />,
        );

        const [line] = referenceLines(container);

        expect(line.getAttribute('y1')).toBe(line.getAttribute('y2'));
        expect(line.getAttribute('stroke-dasharray')).toBe('4 4');
        const label = container.querySelector('.recharts-label');

        expect(label?.textContent).toBe('Target');
        expect(label?.getAttribute('fill')).toBe('var(--muted-foreground)');
    });

    it('draw a category line at the category it names', () => {
        const { container } = render(
            <LineChart
                data={rates}
                series={['rate']}
                xKey="week"
                referenceLines={[{ x: 'W2' }]}
            />,
        );

        const [line] = referenceLines(container);

        expect(line.getAttribute('x1')).toBe(line.getAttribute('x2'));
    });

    it('widen the value domain to keep a line outside the data in view', () => {
        const { container } = render(
            <LineChart
                data={rates}
                series={['rate']}
                xKey="week"
                referenceLines={[{ y: -20 }]}
            />,
        );

        expect(referenceLines(container)).toHaveLength(1);
        expect(ticks(container, 'y')[0]).toBe('-20');
    });

    it('turn with the chart when it runs horizontally', () => {
        const { container } = render(
            <BarChart
                data={rates}
                series={['rate']}
                xKey="week"
                horizontal
                referenceLines={[{ y: 30 }, { x: 'W2' }]}
            />,
        );

        const [value, category] = referenceLines(container);

        expect(value.getAttribute('x1')).toBe(value.getAttribute('x2'));
        expect(category.getAttribute('y1')).toBe(category.getAttribute('y2'));
    });
});

describe('the stack of a bar chart with negative values', () => {
    const balance = [
        { month: 'Jan', income: 10, refunds: -4 },
        { month: 'Feb', income: 12, refunds: -6 },
    ];

    function topsFromZero(index: number) {
        const { container } = render(
            <BarChart
                data={balance}
                series={['income', 'refunds']}
                xKey="month"
                stacked
                referenceLines={[{ y: 0 }]}
            />,
        );

        const zero = Number(referenceLines(container)[0].getAttribute('y1'));
        const bars = container.querySelectorAll('.recharts-bar')[index];

        return [
            ...bars.querySelectorAll(
                '.recharts-bar-rectangle .recharts-rectangle',
            ),
        ].map((path) => Number(path.getAttribute('y')) - zero);
    }

    it('draws negative values below zero', () => {
        const tops = topsFromZero(1);

        expect(tops).toHaveLength(2);
        expect(tops.every((top) => top >= 0)).toBe(true);
    });

    it('keeps positive values above zero', () => {
        const tops = topsFromZero(0);

        expect(tops).toHaveLength(2);
        expect(tops.every((top) => top < 0)).toBe(true);
    });
});
