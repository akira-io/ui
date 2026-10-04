// @vitest-environment jsdom

import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { BarChart } from '@/components/ui/bar-chart';
import {
    bars,
    expectClippedAsAWhole,
    renderStack,
    segmentsOf,
    sides,
    thinTop,
} from '../../../tests/helpers/stacked-bars';

afterEach(cleanup);

describe('the outline of a stacked bar', () => {
    it('clips upright columns as a whole when the top segment is thinner than the radius', () => {
        const container = renderStack({});

        expect(segmentsOf(container)).toHaveLength(6);
        expect(bars(container)).toHaveLength(2);
        expectClippedAsAWhole(container, false);
    });

    it('clips sideways bars as a whole when the last segment is thinner than the radius', () => {
        const container = renderStack({ horizontal: true });

        expect(bars(container)).toHaveLength(2);
        expectClippedAsAWhole(container, true);
    });

    it('keeps most of the width of a 1 px top segment on 30 narrow columns', () => {
        const container = renderStack({
            data: Array.from({ length: 30 }, (_, day) => ({
                month: `${day + 1}`,
                web: 40000,
                mobile: 30000,
                kiosk: 400,
            })),
            initialDimension: { width: 720, height: 256 },
        });

        for (const { outline, segments } of bars(container)) {
            const top = segments.reduce((a, b) => (a.top < b.top ? a : b));
            const width = outline.box.right - outline.box.left;
            const depth =
                top.top - outline.box.top + (top.bottom - top.top) / 2;
            const r = outline.radius;
            const inset =
                depth >= r ? 0 : r - Math.sqrt(r * r - (r - depth) ** 2);

            expect(width).toBeGreaterThan(17);
            expect(top.bottom - top.top).toBeLessThanOrEqual(1.5);
            expect((width - 2 * inset) / width).toBeGreaterThanOrEqual(0.8);
        }
    });

    it('keeps the outline when both axes are hidden', () => {
        const container = renderStack({ xAxis: false, yAxis: false });

        expect(bars(container)).toHaveLength(2);
        expectClippedAsAWhole(container, false);
    });

    it('limits the radius to a sixth of a narrow bar', () => {
        const container = renderStack({ barSize: 10 });

        expectClippedAsAWhole(container, false);
        expect(bars(container).map(({ outline }) => outline.radius)).toEqual([
            1.6667, 1.6667,
        ]);
    });

    it('gives each side of a diverging bar its own outline', () => {
        const container = renderStack({
            data: sides,
            series: ['sales', 'refunds', 'tips'],
        });
        const found = bars(container);

        expect(found).toHaveLength(4);
        expectClippedAsAWhole(container, false);

        for (const month of [0, 1]) {
            const [above, below] = found
                .filter(
                    ({ outline }) =>
                        outline.box.left === found[month].outline.box.left,
                )
                .sort((a, b) => a.outline.box.top - b.outline.box.top);

            expect(above.outline.box.bottom).toBeCloseTo(
                below.outline.box.top,
                3,
            );
        }
    });

    it('never lays a segment of one side over the other', () => {
        const container = renderStack({
            data: sides,
            series: ['sales', 'refunds', 'tips'],
            horizontal: true,
        });

        for (const { segments } of bars(container)) {
            const ordered = [...segments].sort((a, b) => a.left - b.left);

            ordered.slice(1).forEach((segment, index) => {
                expect(segment.left).toBeGreaterThanOrEqual(
                    ordered[index].right - 0.001,
                );
            });
        }

        expectClippedAsAWhole(container, true);
    });

    it('outlines every named stack on its own', () => {
        const container = renderStack({
            stacked: false,
            series: [
                { key: 'web', stackId: 'online' },
                { key: 'mobile', stackId: 'online' },
                { key: 'kiosk', stackId: 'offline' },
            ],
        });

        expect(bars(container)).toHaveLength(4);
        expectClippedAsAWhole(container, false);
    });

    it('never shares a clip with another chart on the page', () => {
        const container = render(
            <>
                <BarChart
                    data={thinTop}
                    series={['web', 'mobile']}
                    xKey="month"
                    stacked
                />
                <BarChart
                    data={thinTop}
                    series={['web', 'mobile']}
                    xKey="month"
                    stacked
                />
            </>,
        ).container;
        const ids = [
            ...container.querySelectorAll(
                '.recharts-bar-stack-segment clipPath',
            ),
        ].map((clip) => clip.id);

        expect(new Set(ids).size).toBe(ids.length);
    });

    it('leaves every corner of a bar outside a stack arced, as before', () => {
        const container = renderStack({ stacked: false });

        expect(segmentsOf(container)).toHaveLength(6);
        expect(segmentsOf(container).every(({ arced }) => arced)).toBe(true);
        expect(
            container.querySelectorAll('.recharts-bar-stack-segment'),
        ).toHaveLength(0);
    });
});
