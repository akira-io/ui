'use client';

import {
    CartesianChart,
    type CartesianChartProps,
} from '@/components/ui/cartesian-chart';

export type BarChartProps = Omit<CartesianChartProps, 'curve' | 'dots'>;

export function BarChart({ slotName = 'bar-chart', ...props }: BarChartProps) {
    return <CartesianChart kind="bar" slotName={slotName} {...props} />;
}
