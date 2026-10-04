// @vitest-environment jsdom

import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { AreaChart } from '@/components/ui/area-chart';
import { BarChart } from '@/components/ui/bar-chart';
import { LineChart } from '@/components/ui/line-chart';
import { CHART_PALETTE } from '@/lib/chart-series';

afterEach(cleanup);

const ranking = [
    { route: 'Praia - Fogo', revenue: 12_500 },
    { route: 'Praia - Brava', revenue: 8_200 },
    { route: 'Fogo - Brava', revenue: 4_750 },
];

function labels(container: HTMLElement): string[] {
    return [...container.querySelectorAll('.recharts-label-list text')].map(
        (label) => label.textContent ?? '',
    );
}

function lollipops(container: HTMLElement) {
    return [...container.querySelectorAll('.recharts-lollipop')].map(
        (lollipop) => ({
            stem: lollipop.querySelector('line'),
            head: lollipop.querySelector('circle'),
        }),
    );
}

describe('the value labels of a cartesian chart', () => {
    it('are absent by default', () => {
        const { container } = render(
            <BarChart data={ranking} series={['revenue']} xKey="route" />,
        );

        expect(labels(container)).toEqual([]);
    });

    it('print each bar value with the value format of the chart', () => {
        const { container } = render(
            <BarChart
                data={ranking}
                series={['revenue']}
                xKey="route"
                yFormat={{ notation: 'compact' }}
                locale="en-US"
                valueLabels
            />,
        );

        expect(labels(container)).toEqual(['13K', '8.2K', '4.8K']);
    });

    it('take a format of their own', () => {
        const { container } = render(
            <BarChart
                data={ranking}
                series={['revenue']}
                xKey="route"
                locale="pt-PT"
                horizontal
                valueLabels={{ style: 'currency', currency: 'EUR' }}
            />,
        );

        expect(labels(container)).toEqual(
            ranking.map(({ revenue }) =>
                new Intl.NumberFormat('pt-PT', {
                    style: 'currency',
                    currency: 'EUR',
                }).format(revenue),
            ),
        );
    });

    it('print each point of a line in a short compact notation', () => {
        const { container } = render(
            <LineChart
                data={ranking}
                series={['revenue']}
                xKey="route"
                locale="en-US"
                valueLabels
            />,
        );

        expect(labels(container)).toEqual(['13K', '8.2K', '4.8K']);
    });
});

describe('a lollipop bar chart', () => {
    it('draws a stem and a head instead of a bar', () => {
        const { container } = render(
            <BarChart
                data={ranking}
                series={['revenue']}
                xKey="route"
                variant="lollipop"
            />,
        );

        const marks = lollipops(container);

        expect(marks).toHaveLength(3);
        expect(
            container.querySelectorAll('.recharts-bar-rectangle path'),
        ).toHaveLength(0);
        expect(marks[0].stem?.getAttribute('x1')).toBe(
            marks[0].stem?.getAttribute('x2'),
        );
        expect(marks[0].head?.getAttribute('cy')).toBe(
            marks[0].stem?.getAttribute('y2'),
        );
    });

    it('lays its stems sideways when the chart runs horizontally', () => {
        const { container } = render(
            <BarChart
                data={ranking}
                series={['revenue']}
                xKey="route"
                variant="lollipop"
                horizontal
            />,
        );

        const [{ stem, head }] = lollipops(container);

        expect(stem?.getAttribute('y1')).toBe(stem?.getAttribute('y2'));
        expect(head?.getAttribute('cx')).toBe(stem?.getAttribute('x2'));
    });

    it('paints each lollipop with its category color', () => {
        const { container } = render(
            <BarChart
                data={ranking}
                series={['revenue']}
                xKey="route"
                variant="lollipop"
                colorBy="category"
            />,
        );

        expect(
            lollipops(container).map(({ stem, head }) => [
                stem?.getAttribute('stroke'),
                head?.getAttribute('fill'),
            ]),
        ).toEqual(CHART_PALETTE.slice(0, 3).map((color) => [color, color]));
    });

    it('draws plain bars by default', () => {
        const { container } = render(
            <BarChart data={ranking} series={['revenue']} xKey="route" />,
        );

        expect(lollipops(container)).toHaveLength(0);
    });
});

describe('the fill of an area chart', () => {
    it('is a flat tint of the series color by default', () => {
        const { container } = render(
            <AreaChart data={ranking} series={['revenue']} xKey="route" />,
        );

        const area = container.querySelector('.recharts-area-area');

        expect(area?.getAttribute('fill')).toBe('var(--color-revenue)');
        expect(area?.getAttribute('fill-opacity')).toBe('0.2');
        expect(container.querySelectorAll('linearGradient')).toHaveLength(0);
    });

    it('fades from the series color when asked for a gradient', () => {
        const { container } = render(
            <AreaChart
                data={ranking}
                series={['revenue']}
                xKey="route"
                fill="gradient"
            />,
        );

        const gradient = container.querySelector('linearGradient');
        const stops = [...(gradient?.querySelectorAll('stop') ?? [])];

        expect(
            container
                .querySelector('.recharts-area-area')
                ?.getAttribute('fill'),
        ).toBe(`url(#${gradient?.id})`);
        expect(stops.map((stop) => stop.getAttribute('stop-color'))).toEqual([
            'var(--color-revenue)',
            'var(--color-revenue)',
        ]);
    });

    it('keeps the gradients of two charts apart', () => {
        const { container } = render(
            <>
                <AreaChart
                    data={ranking}
                    series={['revenue']}
                    xKey="route"
                    fill="gradient"
                />
                <AreaChart
                    data={ranking}
                    series={['revenue']}
                    xKey="route"
                    fill="gradient"
                />
            </>,
        );

        const ids = [...container.querySelectorAll('linearGradient')].map(
            (gradient) => gradient.id,
        );

        expect(new Set(ids).size).toBe(2);
    });
});
