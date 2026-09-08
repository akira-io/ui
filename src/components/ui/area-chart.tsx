'use client';

import {
    CartesianChart,
    type CartesianChartProps,
} from '@/components/ui/cartesian-chart';

export type AreaChartProps = Omit<
    CartesianChartProps,
    'barSize' | 'barRadius' | 'horizontal'
>;

export function AreaChart({
    slotName = 'area-chart',
    ...props
}: AreaChartProps) {
    return <CartesianChart kind="area" slotName={slotName} {...props} />;
}
