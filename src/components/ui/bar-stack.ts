import * as React from 'react';
import {
    Rectangle,
    useXAxisScale,
    useYAxisScale,
    type BarShapeProps,
} from 'recharts';

import {
    stackCornerRadius,
    stackPixelBox,
    stackSideOwner,
    stackSideTotal,
} from '@/components/ui/bar-stack-geometry';

export type StackedBarOptions = {
    dataKey: string;
    stackKeys: readonly string[];
    radius: number;
    horizontal: boolean;
    clipId: string;
};

function StackedBarSegment({
    dataKey,
    stackKeys,
    radius,
    horizontal,
    clipId,
    ...segment
}: BarShapeProps & StackedBarOptions) {
    const xScale = useXAxisScale();
    const yScale = useYAxisScale();
    const scale = horizontal ? xScale : yScale;
    const datum = segment.payload as Record<string, unknown> | undefined;
    const value = Number(datum?.[dataKey]);
    const negative = value < 0;
    const ends = [0, stackSideTotal(datum, stackKeys, negative)].map((point) =>
        scale?.(point),
    );

    if (segment.width === 0 || segment.height === 0) {
        return null;
    }

    if (!ends.every((end) => end !== undefined && Number.isFinite(end))) {
        return React.createElement(Rectangle, { ...segment, radius: 0 });
    }

    const [base, tip] = ends as number[];
    const from = horizontal ? segment.x : segment.y;
    const length = horizontal ? segment.width : segment.height;
    const shape = stackPixelBox(segment, base, tip, horizontal);
    const box = stackPixelBox(segment, from, from + length, horizontal);
    const id = `${clipId}-${segment.index}-${negative ? 'below' : 'above'}`;
    const owner = stackSideOwner(datum, stackKeys, negative) === dataKey;
    const empty = box.width === 0 || box.height === 0;

    if (empty && !owner) {
        return null;
    }

    return React.createElement(
        'g',
        { className: 'recharts-bar-stack-segment', clipPath: `url(#${id})` },
        owner &&
            React.createElement(
                'defs',
                null,
                React.createElement(
                    'clipPath',
                    { id, clipPathUnits: 'userSpaceOnUse' },
                    React.createElement('rect', {
                        ...shape,
                        rx: stackCornerRadius(shape, radius, horizontal),
                    }),
                ),
            ),
        !empty &&
            React.createElement('rect', {
                ...box,
                fill: segment.fill,
                className: 'recharts-rectangle',
                shapeRendering: 'crispEdges',
            }),
    );
}

export function stackedBarShape(options: StackedBarOptions) {
    return function StackedBarShape(segment: BarShapeProps) {
        return React.createElement(StackedBarSegment, {
            ...segment,
            ...options,
        });
    };
}
