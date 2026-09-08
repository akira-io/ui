'use client';

import {
    CartesianChart,
    type CartesianChartProps,
} from '@/components/ui/cartesian-chart';

export type LineChartProps = CartesianChartProps;

export function LineChart({
    slotName = 'line-chart',
    ...props
}: LineChartProps) {
    return <CartesianChart kind="line" slotName={slotName} {...props} />;
}
