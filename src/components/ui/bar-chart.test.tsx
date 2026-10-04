// @vitest-environment jsdom

import { act, cleanup, fireEvent, render } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { BarChart } from '@/components/ui/bar-chart';
import { CHART_PALETTE } from '@/lib/chart-series';

afterEach(cleanup);

const routes = [
    { route: 'Praia - Fogo', value: 120 },
    { route: 'Praia - Brava', value: -40 },
    { route: 'Fogo - Brava', value: 75 },
];

const bySign = (datum: Record<string, unknown>) =>
    Number(datum.value) < 0 ? 'var(--destructive)' : 'var(--chart-1)';

function barFills(container: HTMLElement): (string | null)[] {
    return [
        ...container.querySelectorAll(
            '.recharts-bar-rectangle .recharts-rectangle',
        ),
    ].map((bar) => bar.getAttribute('fill'));
}

function legendEntries(): { label: string; color: string }[] {
    return [
        ...document.querySelectorAll<HTMLLIElement>(
            '[data-slot="chart-category-legend"] li',
        ),
    ].map((entry) => ({
        label: entry.textContent ?? '',
        color:
            entry.querySelector<HTMLElement>('span[aria-hidden]')?.style
                .backgroundColor ?? '',
    }));
}

describe('a bar chart colored by series', () => {
    it('paints every bar of a series in that series color, as before', () => {
        const { container } = render(
            <BarChart data={routes} series={['value']} xKey="route" />,
        );

        expect(barFills(container)).toEqual([
            'var(--color-value)',
            'var(--color-value)',
            'var(--color-value)',
        ]);
    });

    it('keeps the series legend', () => {
        const { container } = render(
            <BarChart data={routes} series={['value']} xKey="route" legend />,
        );

        expect(legendEntries()).toEqual([]);
        expect(container.textContent).toContain('value');
    });
});

describe('a bar chart colored by category', () => {
    it('gives each bar the next palette color in row order', () => {
        const { container } = render(
            <BarChart
                data={routes}
                series={['value']}
                xKey="route"
                colorBy="category"
            />,
        );

        expect(barFills(container)).toEqual(CHART_PALETTE.slice(0, 3));
    });

    it('keeps the row colors when the bars run sideways', () => {
        const { container } = render(
            <BarChart
                data={routes}
                series={['value']}
                xKey="route"
                colorBy="category"
                horizontal
            />,
        );

        expect(barFills(container)).toEqual(CHART_PALETTE.slice(0, 3));
    });

    it('lists the categories in the legend with their colors', () => {
        render(
            <BarChart
                data={routes}
                series={['value']}
                xKey="route"
                colorBy="category"
                legend
            />,
        );

        expect(legendEntries()).toEqual(
            routes.map((row, index) => ({
                label: row.route,
                color: CHART_PALETTE[index],
            })),
        );
    });

    it('formats the legend labels like the category axis', () => {
        render(
            <BarChart
                data={[
                    { hour: 7, value: 3 },
                    { hour: 9, value: 5 },
                ]}
                series={['value']}
                xKey="hour"
                xFormat={{ minimumIntegerDigits: 2 }}
                locale="en-US"
                colorBy="category"
                legend
            />,
        );

        expect(legendEntries().map((entry) => entry.label)).toEqual([
            '07',
            '09',
        ]);
    });

    it('paints every series of a row in that row color', () => {
        const { container } = render(
            <BarChart
                data={[
                    { route: 'Praia - Fogo', towards: 120, away: 30 },
                    { route: 'Praia - Brava', towards: 60, away: 40 },
                ]}
                series={['towards', 'away']}
                xKey="route"
                stacked
                colorBy="category"
            />,
        );

        expect(barFills(container)).toEqual([
            CHART_PALETTE[0],
            CHART_PALETTE[1],
            CHART_PALETTE[0],
            CHART_PALETTE[1],
        ]);
    });
});

describe('a bar chart colored by a function', () => {
    it('paints each bar with the color the function picks for its row', () => {
        const { container } = render(
            <BarChart
                data={routes}
                series={['value']}
                xKey="route"
                colorBy={bySign}
            />,
        );

        expect(barFills(container)).toEqual([
            'var(--chart-1)',
            'var(--destructive)',
            'var(--chart-1)',
        ]);
    });

    it('shows the color of the hovered bar in the tooltip', () => {
        const { container } = render(
            <BarChart
                data={routes}
                series={['value']}
                xKey="route"
                colorBy={bySign}
            />,
        );

        const surface = container.querySelector('.recharts-surface');

        act(() => {
            fireEvent.focus(surface as Element);
        });
        act(() => {
            fireEvent.keyDown(surface as Element, { key: 'ArrowRight' });
        });

        const indicator = document.querySelector<HTMLElement>(
            '.recharts-tooltip-wrapper [style*="--color-bg"]',
        );

        expect(indicator?.style.getPropertyValue('--color-bg')).toBe(
            'var(--destructive)',
        );
    });
});
