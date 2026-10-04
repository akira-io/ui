// @vitest-environment jsdom

import { act, cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { BarChart } from '@/components/ui/bar-chart';

import {
    bars,
    curvedElements,
    expectClippedAsAWhole,
    renderStack,
} from '../../../tests/helpers/stacked-bars';

afterEach(cleanup);

describe('a stacked bar drawn as one shape divided by color', () => {
    it.each([false, true])(
        'rounds only the shape of each bar, never a segment, sideways: %s',
        (horizontal) => {
            const container = renderStack({ horizontal });
            const found = bars(container);
            const curved = curvedElements(container);

            expect(found).toHaveLength(2);
            expect(
                container.querySelectorAll(
                    '.recharts-bar-stack-segment clipPath',
                ),
            ).toHaveLength(2);
            expect(curved).toHaveLength(2);
            expect(curved.every((shape) => shape.closest('clipPath'))).toBe(
                true,
            );
            expect(
                container.querySelectorAll('.recharts-bar-rectangle path'),
            ).toHaveLength(0);
            expectClippedAsAWhole(container, horizontal);
        },
    );

    it('paints every segment with crisp edges and no stroke', () => {
        const segments = [
            ...renderStack({}).querySelectorAll(
                '.recharts-bar-rectangle .recharts-rectangle',
            ),
        ];

        expect(segments).toHaveLength(6);
        expect(
            segments.every(
                (segment) =>
                    segment.getAttribute('shape-rendering') === 'crispEdges' &&
                    !segment.hasAttribute('stroke'),
            ),
        ).toBe(true);
    });

    it('draws the shape once when the first segment of a bar is zero', () => {
        const container = renderStack({
            data: [{ month: 'Jan', web: 0, mobile: 80, kiosk: 1 }],
        });

        expect(
            container.querySelectorAll('.recharts-bar-stack-segment clipPath'),
        ).toHaveLength(1);
        expectClippedAsAWhole(container, false);
    });

    it('still draws the shape when its first segment snaps to no pixel', () => {
        const container = renderStack({
            data: [{ month: 'Jan', web: 0.1, mobile: 80, kiosk: 1 }],
        });

        expect(
            container.querySelectorAll('.recharts-bar-stack-segment clipPath'),
        ).toHaveLength(1);
        expectClippedAsAWhole(container, false);
    });

    it('keeps the shapes of stacks whose names differ only by punctuation apart', () => {
        const container = renderStack({
            stacked: false,
            series: [
                { key: 'web', stackId: 'a.b' },
                { key: 'mobile', stackId: 'ab' },
            ],
        });
        const ids = [
            ...container.querySelectorAll(
                '.recharts-bar-stack-segment clipPath',
            ),
        ].map((clip) => clip.id);

        expect(ids).toHaveLength(4);
        expect(new Set(ids).size).toBe(4);
        expectClippedAsAWhole(container, false);
    });

    it('grows every segment with the animation instead of drawing its final length', async () => {
        vi.useFakeTimers({
            toFake: [
                'requestAnimationFrame',
                'cancelAnimationFrame',
                'performance',
            ],
        });

        try {
            const { container } = render(
                <BarChart
                    data={[{ month: 'Jan', web: 100, mobile: 80, kiosk: 3 }]}
                    series={['web', 'mobile', 'kiosk']}
                    xKey="month"
                    stacked
                    animate
                    initialDimension={{ width: 600, height: 300 }}
                />,
            );
            const heights = () =>
                [
                    ...container.querySelectorAll(
                        '.recharts-bar-rectangle .recharts-rectangle',
                    ),
                ].map((segment) => Number(segment.getAttribute('height')));

            await act(async () => {
                vi.advanceTimersByTime(200);
            });
            const midway = heights();

            await act(async () => {
                vi.advanceTimersByTime(2000);
            });
            const settled = heights();

            expect(settled).toHaveLength(3);
            expect(midway).toHaveLength(3);
            expect(midway[0]).toBeLessThan(settled[0]);
            expect(midway[1]).toBeLessThan(settled[1]);
        } finally {
            vi.useRealTimers();
        }
    });
});
