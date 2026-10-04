// @vitest-environment jsdom

import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { BarChart } from '@/components/ui/bar-chart';
import { LineChart } from '@/components/ui/line-chart';

afterEach(cleanup);

const DIMENSION = { width: 600, height: 300 };

const balance = [
    { month: 'Jan', balance: 25296 },
    { month: 'Feb', balance: -11800 },
    { month: 'Mar', balance: 4200 },
];

const flows = [
    { month: 'Jan', income: 30, bonus: 25, refunds: -40, fees: -30 },
    { month: 'Feb', income: 10, bonus: 5, refunds: -10, fees: -5 },
];

function ticks(container: HTMLElement, axis: 'x' | 'y'): number[] {
    return [
        ...container.querySelectorAll(`.recharts-${axis}Axis-tick-labels text`),
    ].map((tick) => Number(tick.textContent?.replace(/[^\d.-]/g, '')));
}

describe('a symmetric value domain', () => {
    it('mirrors the nice reach of the data around zero', () => {
        const { container } = render(
            <BarChart
                data={balance}
                series={['balance']}
                xKey="month"
                yDomain="symmetric"
                initialDimension={DIMENSION}
            />,
        );

        expect(ticks(container, 'y')).toEqual([
            -30000, -20000, -10000, 0, 10000, 20000, 30000,
        ]);
    });

    it('runs along the bottom of a horizontal chart', () => {
        const { container } = render(
            <BarChart
                data={balance}
                series={['balance']}
                xKey="month"
                yDomain="symmetric"
                horizontal
                initialDimension={DIMENSION}
            />,
        );
        const values = ticks(container, 'x');

        expect(values[0]).toBe(-30000);
        expect(values.at(-1)).toBe(30000);
        expect(values).toContain(0);
    });

    it('reaches the sum of each side of a diverging stack', () => {
        const { container } = render(
            <BarChart
                data={flows}
                series={['income', 'bonus', 'refunds', 'fees']}
                xKey="month"
                stacked
                yDomain="symmetric"
                initialDimension={DIMENSION}
            />,
        );

        expect(ticks(container, 'y')).toEqual([-100, -50, 0, 50, 100]);
    });

    it('reaches the largest series value on a line', () => {
        const { container } = render(
            <LineChart
                data={flows}
                series={['income', 'refunds']}
                xKey="month"
                yDomain="symmetric"
                initialDimension={DIMENSION}
            />,
        );

        expect(ticks(container, 'y')).toEqual([-40, -20, 0, 20, 40]);
    });
});

describe('a numeric value domain', () => {
    it('puts nice ticks from zero on the bounds it is given', () => {
        const { container } = render(
            <BarChart
                data={[
                    { week: 'W1', rate: 12 },
                    { week: 'W2', rate: 61 },
                ]}
                series={['rate']}
                xKey="week"
                yDomain={[0, 87]}
                initialDimension={DIMENSION}
            />,
        );

        expect(ticks(container, 'y')).toEqual([0, 20, 40, 60, 80]);
    });
});
