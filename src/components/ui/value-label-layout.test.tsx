// @vitest-environment jsdom

import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { BarChart } from '@/components/ui/bar-chart';
import { labelReach, labelWidth } from '@/components/ui/value-label';
import { compactFormat } from '@/lib/chart-number-format';

afterEach(cleanup);

const DIMENSION = { width: 600, height: 300 };

const CVE = {
    style: 'currency',
    currency: 'CVE',
    notation: 'compact',
    maximumFractionDigits: 1,
} as const satisfies Intl.NumberFormatOptions;

type Span = { start: number; end: number };

function hours(count: number) {
    return Array.from({ length: count }, (_, hour) => ({
        hour: `${hour}h`,
        revenue: 102_600_000 - hour * 1_000_000,
    }));
}

function plain(text: string | null): string {
    return (text ?? '').replace(/\s/g, ' ');
}

function labelSpans(container: HTMLElement): Span[] {
    return [...container.querySelectorAll('.recharts-label-list text')].map(
        (label) => {
            const center = Number(label.getAttribute('x'));
            const half = labelWidth(label.textContent ?? '') / 2;

            return { start: center - half, end: center + half };
        },
    );
}

function barSpans(container: HTMLElement): Span[] {
    return [...container.querySelectorAll('.recharts-bar-rectangle path')].map(
        (bar) => {
            const start = Number(bar.getAttribute('x'));

            return {
                start,
                end: start + Number(bar.getAttribute('width')),
            };
        },
    );
}

function columns(count: number) {
    return render(
        <BarChart
            data={hours(count)}
            series={['revenue']}
            xKey="hour"
            locale="pt-PT"
            yFormat={CVE}
            initialDimension={DIMENSION}
            valueLabels
        />,
    ).container;
}

describe('the default format of value labels', () => {
    it('is short and compact, without the currency of the axis', () => {
        const container = columns(1);

        expect(
            [...container.querySelectorAll('.recharts-label-list text')].map(
                (label) => plain(label.textContent),
            ),
        ).toEqual(['103 M']);
    });

    it('keeps a percent or a unit and drops a currency', () => {
        expect(compactFormat(CVE)).toEqual({
            notation: 'compact',
            compactDisplay: 'short',
        });
        expect(compactFormat({ style: 'percent' })).toMatchObject({
            style: 'percent',
            notation: 'compact',
        });
        expect(
            compactFormat({ style: 'unit', unit: 'kilometer' }),
        ).toMatchObject({ style: 'unit', unit: 'kilometer' });
    });
});

describe('the value labels of narrow columns', () => {
    it('stay within their own column, so neighbours never overlap', () => {
        const container = columns(12);
        const bars = barSpans(container);
        const spans = labelSpans(container);

        expect(spans.length).toBeGreaterThan(0);

        for (const span of spans) {
            expect(
                bars.some(
                    (bar) => bar.start <= span.start && span.end <= bar.end,
                ),
            ).toBe(true);
        }

        const sorted = [...spans].sort((a, b) => a.start - b.start);

        sorted.slice(1).forEach((span, index) => {
            expect(span.start).toBeGreaterThanOrEqual(sorted[index].end);
        });
    });

    it('are left out when the text is wider than the column', () => {
        expect(labelSpans(columns(40))).toEqual([]);
    });
});

describe('the value labels of horizontal bars', () => {
    it('reserve room on the right for the longest label', () => {
        const { container } = render(
            <BarChart
                data={[
                    { route: 'Praia', revenue: 386_800_000 },
                    { route: 'Fogo', revenue: 120_000_000 },
                ]}
                series={['revenue']}
                xKey="route"
                locale="pt-PT"
                horizontal
                initialDimension={DIMENSION}
                valueLabels={CVE}
            />,
        );
        const printed = [
            ...container.querySelectorAll('.recharts-label-list text'),
        ];

        expect(printed.map((label) => plain(label.textContent))).toEqual([
            '386,8 M CVE',
            '120,0 M CVE',
        ]);

        for (const label of printed) {
            expect(
                Number(label.getAttribute('x')) +
                    labelWidth(label.textContent ?? ''),
            ).toBeLessThanOrEqual(DIMENSION.width);
        }
    });

    it('measure that room from the widest label and its offset', () => {
        expect(
            labelReach(
                [{ trips: 4 }, { trips: 1_250 }, { trips: 0 }],
                ['trips'],
                String,
                6,
            ),
        ).toBe(Math.ceil(6 + labelWidth('1250')));
    });
});
