import { createElement } from 'react';
import { ReferenceLine, XAxis, YAxis } from 'recharts';

import type { ChartValueDomain, ChartValueScale } from '@/lib/chart-scale';

export type ChartReferenceLine = {
    x?: number | string;
    y?: number;
    label?: string;
};

type Format = ((value: unknown) => string) | undefined;

const AXIS = { tickLine: false, axisLine: false, tickMargin: 8 } as const;

const REFERENCE_COLOR = 'var(--muted-foreground)';

export function categoryAxis(
    horizontal: boolean,
    xKey: string,
    format: Format,
) {
    const shared = {
        key: 'category',
        dataKey: xKey,
        type: 'category',
        tickFormatter: format,
        ...AXIS,
    } as const;

    if (horizontal) {
        return createElement(YAxis, { ...shared, width: 'auto' });
    }

    return createElement(XAxis, shared);
}

export function valueAxis(
    horizontal: boolean,
    format: Format,
    domain: ChartValueDomain | undefined,
    scale: ChartValueScale,
) {
    const shared = {
        key: 'value',
        type: 'number',
        tickFormatter: format,
        domain,
        scale: scale === 'log' ? 'log' : 'auto',
        ...AXIS,
    } as const;

    if (horizontal) {
        return createElement(XAxis, shared);
    }

    return createElement(YAxis, { ...shared, width: 'auto' });
}

export function referenceLines(
    lines: readonly ChartReferenceLine[],
    horizontal: boolean,
) {
    return lines.map((line, index) => {
        const valueLine = line.y !== undefined;
        const vertical = valueLine === horizontal;

        return createElement(ReferenceLine, {
            key: `reference-${index}`,
            x: horizontal ? line.y : line.x,
            y: horizontal ? line.x : line.y,
            stroke: REFERENCE_COLOR,
            strokeDasharray: '4 4',
            ifOverflow: valueLine ? 'extendDomain' : 'discard',
            label: line.label
                ? {
                      value: line.label,
                      position: vertical ? 'insideTopLeft' : 'insideTopRight',
                      fill: REFERENCE_COLOR,
                  }
                : undefined,
        });
    });
}
