// @vitest-environment jsdom

import { act, cleanup, fireEvent, render } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { BarChart } from '@/components/ui/bar-chart';
import { DonutChart } from '@/components/ui/donut-chart';

afterEach(cleanup);

const CVE = {
    style: 'currency',
    currency: 'CVE',
    notation: 'compact',
    maximumFractionDigits: 1,
} as const satisfies Intl.NumberFormatOptions;

function plain(text: string | null | undefined): string {
    return (text ?? '').replace(/\s/g, ' ');
}

function tooltipValue(): string {
    return plain(
        document.querySelector('.recharts-tooltip-wrapper .font-mono')
            ?.textContent,
    );
}

describe('the tooltip of a chart with a compact value format', () => {
    it('prints the exact value while the axis stays compact', () => {
        const { container } = render(
            <BarChart
                data={[
                    { month: 'Jan', revenue: 98_000_000 },
                    { month: 'Feb', revenue: 102_600_000 },
                ]}
                series={['revenue']}
                xKey="month"
                yFormat={CVE}
                locale="pt-PT"
                initialDimension={{ width: 600, height: 300 }}
            />,
        );
        const surface = container.querySelector('.recharts-surface');

        act(() => {
            fireEvent.focus(surface as Element);
        });
        act(() => {
            fireEvent.keyDown(surface as Element, { key: 'ArrowRight' });
        });

        const ticks = [
            ...container.querySelectorAll('.recharts-yAxis-tick-labels text'),
        ].map((tick) => plain(tick.textContent));

        expect(ticks).toEqual([
            '0,0 CVE',
            '30,0 M CVE',
            '60,0 M CVE',
            '90,0 M CVE',
            '120,0 M CVE',
        ]);
        expect(tooltipValue()).toBe('102 600 000 CVE');
    });

    it('keeps a format named for the tooltip', () => {
        const { container } = render(
            <BarChart
                data={[
                    { month: 'Jan', revenue: 98_000_000 },
                    { month: 'Feb', revenue: 102_600_000 },
                ]}
                series={['revenue']}
                xKey="month"
                yFormat={CVE}
                tooltipFormat={CVE}
                locale="pt-PT"
            />,
        );
        const surface = container.querySelector('.recharts-surface');

        act(() => {
            fireEvent.focus(surface as Element);
        });
        act(() => {
            fireEvent.keyDown(surface as Element, { key: 'ArrowRight' });
        });

        expect(tooltipValue()).toBe('102,6 M CVE');
    });
});

describe('the tooltip of a donut chart with a compact format', () => {
    it('prints the exact slice value', () => {
        const { container } = render(
            <DonutChart
                data={[
                    { label: 'Praia', value: 102_600_000 },
                    { label: 'Fogo', value: 40_000_000 },
                ]}
                format={CVE}
                locale="pt-PT"
            />,
        );

        act(() => {
            fireEvent.mouseEnter(
                container.querySelector('.recharts-pie-sector') as Element,
            );
        });

        expect(tooltipValue()).toBe('102 600 000 CVE');
    });
});
