import * as React from 'react';
import {
    Rectangle,
    useXAxisScale,
    useYAxisScale,
    type BarShapeProps,
} from 'recharts';

import {
    stackCornerRadius,
    stackSideOutline,
    stackSideTotal,
} from '@/components/ui/bar-stack-geometry';

export type StackedBarOptions = {
    dataKey: string;
    stackKeys: readonly string[];
    radius: number;
    horizontal: boolean;
};

function StackedBarSegment({
    dataKey,
    stackKeys,
    radius,
    horizontal,
    ...segment
}: BarShapeProps & StackedBarOptions) {
    const clipId = `bar-stack-clip-${React.useId().replace(/[^\w-]/g, '')}`;
    const xScale = useXAxisScale();
    const yScale = useYAxisScale();
    const scale = horizontal ? xScale : yScale;
    const datum = segment.payload as Record<string, unknown> | undefined;
    const negative = Number(datum?.[dataKey]) < 0;
    const base = scale?.(0);
    const tip = scale?.(stackSideTotal(datum, stackKeys, negative));
    const rectangle = React.createElement(Rectangle, {
        ...segment,
        radius: 0,
    });

    if (segment.width === 0 || segment.height === 0) {
        return null;
    }

    if (
        base === undefined ||
        tip === undefined ||
        !Number.isFinite(base) ||
        !Number.isFinite(tip)
    ) {
        return rectangle;
    }

    const outline = stackSideOutline(segment, base, tip, horizontal);

    return React.createElement(
        'g',
        {
            className: 'recharts-bar-stack-segment',
            clipPath: `url(#${clipId})`,
        },
        React.createElement(
            'defs',
            null,
            React.createElement(
                'clipPath',
                { id: clipId },
                React.createElement('rect', {
                    ...outline,
                    rx: stackCornerRadius(outline, radius, horizontal),
                }),
            ),
        ),
        rectangle,
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
