import { createElement } from 'react';
import { XAxis, YAxis } from 'recharts';

type Format = ((value: unknown) => string) | undefined;

const AXIS = { tickLine: false, axisLine: false, tickMargin: 8 } as const;

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

export function valueAxis(horizontal: boolean, format: Format) {
    const shared = {
        key: 'value',
        type: 'number',
        tickFormatter: format,
        ...AXIS,
    } as const;

    if (horizontal) {
        return createElement(XAxis, shared);
    }

    return createElement(YAxis, { ...shared, width: 'auto' });
}
