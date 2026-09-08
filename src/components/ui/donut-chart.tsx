'use client';

import * as React from 'react';
import { Cell, Pie, PieChart } from 'recharts';

import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from '@/components/ui/chart';
import {
    chartColorVariable,
    numberFormatter,
    resolveChartSeries,
    type ChartDatum,
} from '@/lib/chart-series';
import { elevatedSurface, nestedSurfaceReset } from '@/lib/language';
import { cn } from '@/lib/utils';
import type { SlotNameProps } from '@/types';

export interface DonutChartProps
    extends Omit<React.ComponentProps<'div'>, 'children'>, SlotNameProps {
    data: readonly ChartDatum[];
    valueKey?: string;
    labelKey?: string;
    config?: ChartConfig;
    innerRadius?: number | string;
    cornerRadius?: number;
    paddingAngle?: number;
    legend?: false | 'right' | 'bottom';
    legendValue?: 'percentage' | 'value' | 'none';
    label?: React.ReactNode;
    value?: React.ReactNode;
    format?: Intl.NumberFormatOptions;
    locale?: string;
    tooltip?: boolean;
    animate?: boolean;
    children?: React.ReactNode;
}

export function DonutChart({
    data,
    valueKey = 'value',
    labelKey = 'label',
    config,
    innerRadius = '65%',
    cornerRadius = 6,
    paddingAngle = 2,
    legend = 'right',
    legendValue = 'percentage',
    label,
    value,
    format,
    locale,
    tooltip = true,
    animate = false,
    className,
    children,
    slotName = 'donut-chart',
    ...props
}: DonutChartProps) {
    const slices = data.map((datum) => ({
        key: String(datum[labelKey]),
        amount: Number(datum[valueKey]) || 0,
    }));

    const { series: resolved, config: merged } = resolveChartSeries(
        slices.map((slice) => ({ key: slice.key })),
        config,
    );

    const total = slices.reduce((sum, slice) => sum + slice.amount, 0);
    const formatValue = numberFormatter(format, locale);
    const formatPercentage = numberFormatter(
        { style: 'percent', maximumFractionDigits: 0 },
        locale,
    );

    const chartData = slices.map((slice, index) => ({
        ...slice,
        fill: chartColorVariable(resolved[index].key),
    }));

    const centerValue = value ?? formatValue(total);
    const chartId = `donut-${React.useId().replace(/:/g, '')}`;

    return (
        <div
            className={cn(
                elevatedSurface,
                nestedSurfaceReset,
                'gap-6 p-4 flex items-center bg-card',
                legend === 'bottom' && 'flex-col',
                className,
            )}
            data-chart={`chart-${chartId}`}
            {...props}
            data-slot={slotName}
        >
            <div className="relative flex-1">
                <ChartContainer
                    id={chartId}
                    config={merged}
                    slotName="donut-chart-canvas"
                    className="p-0 aspect-square w-full border-0 bg-transparent shadow-none"
                >
                    <PieChart>
                        {tooltip && (
                            <ChartTooltip
                                cursor={false}
                                content={
                                    <ChartTooltipContent
                                        nameKey="key"
                                        hideLabel
                                    />
                                }
                            />
                        )}
                        <Pie
                            data={chartData}
                            dataKey="amount"
                            nameKey="key"
                            innerRadius={innerRadius}
                            cornerRadius={cornerRadius}
                            paddingAngle={paddingAngle}
                            strokeWidth={0}
                            isAnimationActive={animate}
                        >
                            {chartData.map((slice) => (
                                <Cell key={slice.key} fill={slice.fill} />
                            ))}
                        </Pie>
                    </PieChart>
                </ChartContainer>
                {(label || value || children) && (
                    <div
                        className="gap-1 inset-0 pointer-events-none absolute flex flex-col items-center justify-center"
                        data-slot="donut-chart-center"
                    >
                        {children ?? (
                            <>
                                {label && (
                                    <span className="text-sm text-muted-foreground">
                                        {label}
                                    </span>
                                )}
                                <span className="text-2xl font-semibold text-foreground tabular-nums">
                                    {centerValue}
                                </span>
                            </>
                        )}
                    </div>
                )}
            </div>
            {legend !== false && (
                <ul
                    className={cn(
                        'gap-3 text-sm flex flex-col',
                        legend === 'right' ? 'min-w-40' : 'w-full',
                    )}
                    data-slot="donut-chart-legend"
                >
                    {resolved.map((item, index) => (
                        <li
                            key={item.key}
                            className="gap-3 flex items-center justify-between"
                        >
                            <span className="gap-2 flex items-center">
                                <span
                                    aria-hidden="true"
                                    className="size-2.5 shrink-0 rounded-full"
                                    style={{
                                        backgroundColor: chartColorVariable(
                                            item.key,
                                        ),
                                    }}
                                />
                                <span className="text-foreground">
                                    {item.label}
                                </span>
                            </span>
                            {legendValue !== 'none' && (
                                <span className="text-muted-foreground tabular-nums">
                                    {legendValue === 'percentage'
                                        ? formatPercentage(
                                              total === 0
                                                  ? 0
                                                  : slices[index].amount /
                                                        total,
                                          )
                                        : formatValue(slices[index].amount)}
                                </span>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
