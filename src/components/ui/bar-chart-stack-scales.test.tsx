// @vitest-environment jsdom

import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { BarChart } from '@/components/ui/bar-chart';

afterEach(cleanup);

const channels = [
    { month: 'Jan', web: 100, mobile: 80, kiosk: 3 },
    { month: 'Feb', web: 60, mobile: 40, kiosk: 2 },
];

const DIMENSION = { width: 600, height: 300 };

function segments(container: HTMLElement): Element[] {
    return [...container.querySelectorAll('.recharts-bar-rectangle path')];
}

function attributesWithNaN(container: HTMLElement): string[] {
    return [...container.querySelectorAll('svg *')].flatMap((element) =>
        [...element.attributes]
            .filter((attribute) => attribute.value.includes('NaN'))
            .map((attribute) => `${element.tagName}.${attribute.name}`),
    );
}

describe('a stacked bar on another scale', () => {
    it.each([false, true])(
        'writes no NaN into the svg on a log scale, sideways: %s',
        (horizontal) => {
            const { container } = render(
                <BarChart
                    data={channels}
                    series={['web', 'mobile', 'kiosk']}
                    xKey="month"
                    stacked
                    horizontal={horizontal}
                    yScale="log"
                    initialDimension={DIMENSION}
                />,
            );

            expect(
                container.querySelectorAll('.recharts-bar-rectangle'),
            ).toHaveLength(6);
            expect(attributesWithNaN(container)).toEqual([]);
        },
    );

    it('keeps the category colors and the clip when colored by category', () => {
        const { container } = render(
            <BarChart
                data={channels}
                series={['web', 'mobile']}
                xKey="month"
                stacked
                colorBy="category"
                initialDimension={DIMENSION}
            />,
        );
        const fills = segments(container).map((path) =>
            path.getAttribute('fill'),
        );

        expect(fills).toHaveLength(4);
        expect(fills[0]).toBe(fills[2]);
        expect(fills[1]).toBe(fills[3]);
        expect(fills[0]).not.toBe(fills[1]);
        expect(
            container.querySelectorAll(
                '.recharts-bar-stack-segment[clip-path] clipPath rect',
            ),
        ).toHaveLength(4);
    });
});
