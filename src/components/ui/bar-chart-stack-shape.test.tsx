// @vitest-environment jsdom

import { cleanup } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

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
});
