// @vitest-environment jsdom

import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { AreaChart } from '@/components/ui/area-chart';
import { BarChart } from '@/components/ui/bar-chart';
import { LineChart } from '@/components/ui/line-chart';

afterEach(cleanup);

const fares = [
    { route: 'Praia - Fogo', tariff: 1200, ownFees: 300, thirdPartyFees: 4 },
    { route: 'Praia - Brava', tariff: 900, ownFees: 250, thirdPartyFees: 2 },
];

const series = [
    { key: 'tariff', label: 'Tarifa' },
    { key: 'ownFees', label: 'Taxas próprias' },
    { key: 'thirdPartyFees', label: 'Taxas de terceiros' },
];

const labels = ['Tarifa', 'Taxas próprias', 'Taxas de terceiros'];

const DIMENSION = { width: 600, height: 300 };

function legendLabels(container: HTMLElement): string[] {
    return [
        ...container.querySelectorAll('.recharts-legend-wrapper > div > div'),
    ].map((entry) => entry.textContent ?? '');
}

function drawnKeys(container: HTMLElement): string[] {
    return [...container.querySelectorAll('.recharts-bar')].map(
        (bar) =>
            bar
                .querySelector('rect[fill^="var(--color-"]')
                ?.getAttribute('fill')
                ?.replace(/^var\(--color-(.+)\)$/, '$1') ?? '',
    );
}

describe('the legend of a chart with several series', () => {
    it.each([
        { name: 'upright', horizontal: false, stacked: false },
        { name: 'upright stacked', horizontal: false, stacked: true },
        { name: 'sideways', horizontal: true, stacked: false },
        { name: 'sideways stacked', horizontal: true, stacked: true },
    ])('follows the order of the series on $name bars', (layout) => {
        const { container } = render(
            <BarChart
                data={fares}
                series={series}
                xKey="route"
                legend
                initialDimension={DIMENSION}
                horizontal={layout.horizontal}
                stacked={layout.stacked}
            />,
        );

        expect(legendLabels(container)).toEqual(labels);
    });

    it('keeps drawing the stacked bars in the order of the series', () => {
        const { container } = render(
            <BarChart
                data={fares}
                series={series}
                xKey="route"
                legend
                horizontal
                stacked
                initialDimension={DIMENSION}
            />,
        );

        expect(drawnKeys(container)).toEqual([
            'tariff',
            'ownFees',
            'thirdPartyFees',
        ]);
    });

    it('follows the order of the series on stacked areas and on lines', () => {
        const area = render(
            <AreaChart
                data={fares}
                series={series}
                xKey="route"
                legend
                stacked
                initialDimension={DIMENSION}
            />,
        );

        expect(legendLabels(area.container)).toEqual(labels);

        cleanup();

        const line = render(
            <LineChart
                data={fares}
                series={series}
                xKey="route"
                legend
                initialDimension={DIMENSION}
            />,
        );

        expect(legendLabels(line.container)).toEqual(labels);
    });

    it('follows the series order when a series is added later', () => {
        const { container, rerender } = render(
            <BarChart
                data={fares}
                series={[series[0], series[2]]}
                xKey="route"
                legend
                horizontal
                stacked
                initialDimension={DIMENSION}
            />,
        );

        rerender(
            <BarChart
                data={fares}
                series={series}
                xKey="route"
                legend
                horizontal
                stacked
                initialDimension={DIMENSION}
            />,
        );

        expect(legendLabels(container)).toEqual(labels);
    });
});
