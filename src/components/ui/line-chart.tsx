'use client';

import {
    CartesianChart,
    type CartesianChartProps,
} from '@/components/ui/cartesian-chart';

export type LineChartProps = Omit<
    CartesianChartProps,
    'barSize' | 'barRadius' | 'horizontal'
>;

export function LineChart({
    slotName = 'line-chart',
    ...props
}: LineChartProps) {
    return <CartesianChart kind="line" slotName={slotName} {...props} />;
}
