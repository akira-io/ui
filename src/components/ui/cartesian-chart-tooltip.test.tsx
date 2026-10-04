// @vitest-environment jsdom

import { act, cleanup, fireEvent, render } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { AreaChart } from '@/components/ui/area-chart';
import { BarChart } from '@/components/ui/bar-chart';
import { LineChart } from '@/components/ui/line-chart';

afterEach(cleanup);

const vulnerabilities = [
    { month: 'January', total: 120_400_000 },
    { month: 'February', total: 375_044_357 },
];

const days = [
    { date: new Date(2026, 0, 2).getTime(), visitors: 267 },
    { date: new Date(2026, 0, 5).getTime(), visitors: 312 },
    { date: new Date(2026, 0, 9).getTime(), visitors: 198 },
];

function hoverSecondPoint(container: HTMLElement): HTMLElement | null {
    const surface = container.querySelector('.recharts-surface');

    act(() => {
        fireEvent.focus(surface as Element);
    });
    act(() => {
        fireEvent.keyDown(surface as Element, { key: 'ArrowRight' });
    });

    return document.querySelector<HTMLElement>('.recharts-tooltip-wrapper');
}

function tooltipValue(tooltip: HTMLElement | null): string {
    return tooltip?.querySelector('.font-mono')?.textContent ?? '';
}

describe('the values in a chart tooltip', () => {
    it('follow the value format and locale of the chart', () => {
        const { container } = render(
            <BarChart
                data={vulnerabilities}
                series={['total']}
                xKey="month"
                yFormat={{ notation: 'compact' }}
                locale="en-US"
            />,
        );

        expect(tooltipValue(hoverSecondPoint(container))).toBe('375M');
    });

    it('use the locale even when the chart names no value format', () => {
        const { container } = render(
            <LineChart
                data={vulnerabilities}
                series={['total']}
                xKey="month"
                locale="pt-PT"
            />,
        );

        expect(tooltipValue(hoverSecondPoint(container))).toBe(
            new Intl.NumberFormat('pt-PT').format(375_044_357),
        );
    });

    it('take a format of their own over the axis format', () => {
        const { container } = render(
            <AreaChart
                data={vulnerabilities}
                series={['total']}
                xKey="month"
                yFormat={{ notation: 'compact' }}
                tooltipFormat={{ style: 'currency', currency: 'EUR' }}
                locale="en-US"
            />,
        );

        expect(tooltipValue(hoverSecondPoint(container))).toBe(
            '€375,044,357.00',
        );
    });
});

describe('the label of a chart tooltip on a time axis', () => {
    it('shows the date of a numeric timestamp, not the series name', () => {
        const { container } = render(
            <LineChart
                data={days}
                series={['visitors']}
                xKey="date"
                xScale="time"
                locale="pt-PT"
            />,
        );

        const label =
            hoverSecondPoint(container)?.querySelector('.font-medium');

        expect(label?.textContent).toBe('5 jan');
    });

    it('keeps the category as the label of a categorical chart', () => {
        const { container } = render(
            <BarChart data={vulnerabilities} series={['total']} xKey="month" />,
        );

        expect(
            hoverSecondPoint(container)?.querySelector('.font-medium')
                ?.textContent,
        ).toBe('February');
    });
});
