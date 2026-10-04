'use client';

import {
    CartesianChart,
    type CartesianChartProps,
} from '@/components/ui/cartesian-chart';

export type LineChartProps = Omit<
    CartesianChartProps,
    | 'barSize'
    | 'barRadius'
    | 'horizontal'
    | 'colorBy'
    | 'fill'
    | 'stackOffset'
    | 'variant'
>;

export function LineChart({
    slotName = 'line-chart',
    ...props
}: LineChartProps) {
    return <CartesianChart kind="line" slotName={slotName} {...props} />;
}
