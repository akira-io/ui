// @vitest-environment jsdom

import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { BarChart } from '@/components/ui/bar-chart';

afterEach(cleanup);

const routes = [
    { route: 'Praia', tickets: 900 },
    { route: 'Fogo', tickets: 100 },
    { route: 'Brava', tickets: 400 },
];

const DIMENSION = { width: 600, height: 300 };

function lengths(container: HTMLElement, attribute: 'width' | 'height') {
    return [...container.querySelectorAll('.recharts-bar-rectangle path')].map(
        (path) => Math.abs(Number(path.getAttribute(attribute))),
    );
}

describe('a bar chart with its value axis hidden', () => {
    it('sizes sideways bars by their values', () => {
        const { container } = render(
            <BarChart
                data={routes}
                series={['tickets']}
                xKey="route"
                horizontal
                xAxis={false}
                initialDimension={DIMENSION}
            />,
        );
        const [praia, fogo, brava] = lengths(container, 'width');

        expect(fogo).toBeGreaterThan(0);
        expect(praia).toBeGreaterThan(brava);
        expect(brava).toBeGreaterThan(fogo);
        expect(praia / fogo).toBeCloseTo(9, 1);
        expect(container.querySelector('.recharts-xAxis-tick-labels')).toBe(
            null,
        );
    });

    it('sizes upright bars by their values', () => {
        const { container } = render(
            <BarChart
                data={routes}
                series={['tickets']}
                xKey="route"
                yAxis={false}
                initialDimension={DIMENSION}
            />,
        );
        const [praia, fogo, brava] = lengths(container, 'height');

        expect(fogo).toBeGreaterThan(0);
        expect(praia).toBeGreaterThan(brava);
        expect(brava).toBeGreaterThan(fogo);
        expect(praia / fogo).toBeCloseTo(9, 1);
        expect(container.querySelector('.recharts-yAxis-tick-labels')).toBe(
            null,
        );
    });

    it('keeps the bounds it is given', () => {
        const heights = [true, false].map((yAxis) => {
            const { container } = render(
                <BarChart
                    data={routes}
                    series={['tickets']}
                    xKey="route"
                    yAxis={yAxis}
                    yDomain={[0, 1800]}
                    initialDimension={DIMENSION}
                />,
            );
            const measured = lengths(container, 'height');

            cleanup();

            return measured;
        });

        expect(heights[1]).toEqual(heights[0]);
    });

    it('keeps one bar per category when the category axis is hidden', () => {
        const { container } = render(
            <BarChart
                data={routes}
                series={['tickets']}
                xKey="route"
                horizontal
                yAxis={false}
                initialDimension={DIMENSION}
            />,
        );
        const [praia, fogo, brava] = lengths(container, 'width');

        expect(praia / fogo).toBeCloseTo(9, 1);
        expect(brava / fogo).toBeCloseTo(4, 1);
        expect(container.querySelector('.recharts-yAxis-tick-labels')).toBe(
            null,
        );
    });
});
