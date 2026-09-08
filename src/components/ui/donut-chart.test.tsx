// @vitest-environment jsdom

import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { DonutChart } from '@/components/ui/donut-chart';

afterEach(cleanup);

const revenue = [
    { label: 'Subscriptions', value: 48 },
    { label: 'Services', value: 24 },
    { label: 'Training', value: 16 },
    { label: 'Licenses', value: 12 },
];

function legendRows(): HTMLElement[] {
    return [
        ...document.querySelectorAll<HTMLElement>(
            '[data-slot="donut-chart-legend"] li',
        ),
    ];
}

function chartStyle(): string {
    return document.querySelector('style')?.innerHTML ?? '';
}

function legendDots(): HTMLElement[] {
    return [
        ...document.querySelectorAll<HTMLElement>(
            '[data-slot="donut-chart-legend"] li span[aria-hidden]',
        ),
    ];
}

describe('a donut chart with a legend', () => {
    it('lists every slice with its share of the total', () => {
        render(<DonutChart data={revenue} locale="en-US" />);

        const rows = legendRows();

        expect(rows).toHaveLength(4);
        expect(rows[0].textContent).toBe('Subscriptions48%');
        expect(rows[3].textContent).toBe('Licenses12%');
    });

    it('shows raw values instead when asked', () => {
        render(
            <DonutChart data={revenue} legendValue="value" locale="en-US" />,
        );

        expect(legendRows()[0].textContent).toBe('Subscriptions48');
    });

    it('drops the legend entirely when it is turned off', () => {
        render(<DonutChart data={revenue} legend={false} />);

        expect(
            document.querySelector('[data-slot="donut-chart-legend"]'),
        ).toBeNull();
    });
});

describe('the center of a donut chart', () => {
    it('sums the slices when no value is given', () => {
        render(
            <DonutChart
                data={revenue}
                label="Total revenue"
                locale="en-US"
                format={{ style: 'currency', currency: 'USD' }}
            />,
        );

        expect(screen.getByText('Total revenue')).toBeTruthy();
        expect(screen.getByText('$100.00')).toBeTruthy();
    });

    it('prefers the value the caller passes', () => {
        render(<DonutChart data={revenue} label="Total" value="$128k" />);

        expect(screen.getByText('$128k')).toBeTruthy();
    });

    it('stays empty when there is nothing to say', () => {
        render(<DonutChart data={revenue} />);

        expect(
            document.querySelector('[data-slot="donut-chart-center"]'),
        ).toBeNull();
    });
});

describe('slice colors', () => {
    it('fall back to the palette in order', () => {
        render(<DonutChart data={revenue} />);

        expect(chartStyle()).toContain(
            '--color-Subscriptions: var(--color-chart-1)',
        );
        expect(chartStyle()).toContain(
            '--color-Services: var(--color-chart-2)',
        );
    });

    it('honour the config when it names one', () => {
        render(
            <DonutChart
                data={revenue}
                config={{ Services: { color: 'oklch(0.6 0.2 30)' } }}
            />,
        );

        expect(chartStyle()).toContain('--color-Services: oklch(0.6 0.2 30)');
    });

    it('reach the slice and its legend through the same variable', () => {
        render(<DonutChart data={revenue} />);

        expect(legendDots()[0].style.backgroundColor).toBe(
            'var(--color-Subscriptions)',
        );
        expect(chartStyle()).toContain('--color-Subscriptions:');
    });

    it('survive a label a custom property cannot spell', () => {
        render(
            <DonutChart
                data={[
                    { label: 'Support plans', value: 60 },
                    { label: 'Services', value: 40 },
                ]}
            />,
        );

        expect(chartStyle()).toContain(
            '--color-Support-plans: var(--color-chart-1)',
        );
        expect(chartStyle()).not.toContain('--color-Support plans');
        expect(legendDots()[0].style.backgroundColor).toBe(
            'var(--color-Support-plans)',
        );
    });
});
