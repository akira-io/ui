// @vitest-environment jsdom

import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { DonutChart } from '@/components/ui/donut-chart';
import { LineChart } from '@/components/ui/line-chart';

afterEach(cleanup);

const PALETTE_PAIR = ['var(--color-chart-1)', 'var(--color-chart-2)'];

function declaredColor(
    variable: string | null | undefined,
): string | undefined {
    const name = variable?.replace(/^var\(--color-(.+)\)$/, '$1');
    const [light] = (document.querySelector('style')?.innerHTML ?? '').split(
        '}',
    );

    return [...light.matchAll(new RegExp(`--color-${name}: ([^;]+);`, 'g'))].at(
        -1,
    )?.[1];
}

function paintedLines(container: HTMLElement): (string | undefined)[] {
    return [...container.querySelectorAll('.recharts-line-curve')].map(
        (curve) => declaredColor(curve.getAttribute('stroke')),
    );
}

const revenue = [
    { month: 'Jan', 'Revenue-2024': 10, 'Revenue 2024': 20 },
    { month: 'Feb', 'Revenue-2024': 12, 'Revenue 2024': 22 },
];

describe('two series whose keys sanitize to the same name', () => {
    it.each([
        [['Revenue-2024', 'Revenue 2024']],
        [['Revenue 2024', 'Revenue-2024']],
    ])('paint each series with its own color in the order %j', (series) => {
        const { container } = render(
            <LineChart data={revenue} series={series} xKey="month" />,
        );

        expect(paintedLines(container)).toEqual(PALETTE_PAIR);
    });

    it('keep their colors when the consumer config describes the alias', () => {
        const { container } = render(
            <LineChart
                data={revenue}
                series={['Revenue-2024', 'Revenue 2024']}
                config={{ 'Revenue 2024': { label: 'Receita' } }}
                xKey="month"
            />,
        );

        expect(paintedLines(container)).toEqual(PALETTE_PAIR);
    });
});

describe('two slices whose labels sanitize to the same name', () => {
    it.each([[['Q1 2024', 'Q1-2024']], [['Q1-2024', 'Q1 2024']]])(
        'paint each slice with its own color in the order %j',
        (labels) => {
            render(
                <DonutChart
                    data={labels.map((label) => ({ label, value: 10 }))}
                />,
            );

            const dots = document.querySelectorAll<HTMLElement>(
                '[data-slot="donut-chart-legend"] li span[aria-hidden]',
            );

            expect(
                [...dots].map((dot) =>
                    declaredColor(dot.style.backgroundColor),
                ),
            ).toEqual(PALETTE_PAIR);
        },
    );
});
