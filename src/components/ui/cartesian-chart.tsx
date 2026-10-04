'use client';

import * as React from 'react';
import {
    CartesianGrid,
    AreaChart as RechartsAreaChart,
    BarChart as RechartsBarChart,
    LineChart as RechartsLineChart,
} from 'recharts';

import { useBarStacks, type StackableProps } from '@/components/ui/bar-stack';
import { categoryAxis, valueAxis } from '@/components/ui/cartesian-axes';
import {
    CURVE_TYPE,
    MARK_BY_KIND,
    type CartesianKind,
    type ChartCurve,
} from '@/components/ui/cartesian-marks';
import {
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    type ChartConfig,
} from '@/components/ui/chart';
import {
    ChartCategoryLegend,
    ChartCategoryTooltipContent,
} from '@/components/ui/chart-category';
import {
    axisFormatter,
    categoryColors,
    chartColorVariable,
    numberFormatter,
    resolveChartSeries,
    type ChartAxisFormat,
    type ChartColorBy,
    type ChartDatum,
    type ChartScale,
    type ChartSeriesInput,
} from '@/lib/chart-series';

export type { ChartCurve };

export interface CartesianChartProps extends Omit<
    React.ComponentProps<typeof ChartContainer>,
    'config' | 'children'
> {
    data: readonly ChartDatum[];
    series: readonly ChartSeriesInput[];
    xKey: string;
    config?: ChartConfig;
    curve?: ChartCurve;
    stacked?: boolean;
    grid?: boolean;
    legend?: boolean;
    tooltip?: boolean;
    xAxis?: boolean;
    yAxis?: boolean;
    xScale?: ChartScale;
    xFormat?: ChartAxisFormat;
    yFormat?: Intl.NumberFormatOptions;
    locale?: string;
    horizontal?: boolean;
    barSize?: number;
    barRadius?: number;
    dots?: boolean;
    animate?: boolean;
    colorBy?: ChartColorBy;
    tooltipFormat?: Intl.NumberFormatOptions;
}

const CHART_BY_KIND = {
    area: RechartsAreaChart,
    bar: RechartsBarChart,
    line: RechartsLineChart,
} as const;

export function CartesianChart({
    kind,
    data,
    series,
    xKey,
    config,
    curve = 'smooth',
    stacked = false,
    grid = true,
    legend = false,
    tooltip = true,
    xAxis = true,
    yAxis = true,
    xScale = 'categorical',
    xFormat,
    yFormat,
    locale,
    horizontal = false,
    barSize,
    barRadius = 8,
    dots = false,
    animate = false,
    colorBy = 'series',
    tooltipFormat,
    slotName = 'chart',
    ...props
}: CartesianChartProps & { kind: CartesianKind }) {
    const { series: resolved, config: merged } = resolveChartSeries(
        series,
        config,
    );

    const Chart = CHART_BY_KIND[kind];
    const formatCategory = axisFormatter(
        xScale,
        xFormat,
        locale,
        data.map((datum) => datum[xKey]),
    );
    const formatValue = numberFormatter(yFormat, locale);
    const formatTooltip = numberFormatter(tooltipFormat ?? yFormat, locale);
    const cellColors =
        kind === 'bar' ? categoryColors(data, colorBy) : undefined;
    const marks = useBarStacks(
        resolved.map(
            (item) =>
                MARK_BY_KIND[kind]({
                    dataKey: item.key,
                    color: chartColorVariable(item.variableKey),
                    stackId: item.stackId ?? (stacked ? 'stack' : undefined),
                    curveType: CURVE_TYPE[curve],
                    barSize,
                    barRadius,
                    dots,
                    animate,
                    cellColors,
                }) as React.ReactElement<StackableProps>,
        ),
        barRadius,
    );

    return (
        <ChartContainer config={merged} slotName={slotName} {...props}>
            <Chart
                accessibilityLayer
                data={data as ChartDatum[]}
                layout={horizontal ? 'vertical' : 'horizontal'}
            >
                {grid && (
                    <CartesianGrid
                        horizontal={!horizontal}
                        vertical={horizontal}
                        strokeDasharray="4 4"
                    />
                )}
                {(horizontal ? yAxis : xAxis) &&
                    categoryAxis(horizontal, xKey, formatCategory)}
                {(horizontal ? xAxis : yAxis) &&
                    valueAxis(horizontal, formatValue)}
                {tooltip && (
                    <ChartTooltip
                        cursor={kind !== 'bar'}
                        content={
                            <ChartCategoryTooltipContent
                                data={data}
                                colors={cellColors}
                                valueFormatter={formatTooltip}
                                labelFormatter={
                                    formatCategory
                                        ? (label) => formatCategory(label)
                                        : undefined
                                }
                            />
                        }
                    />
                )}
                {legend && (
                    <ChartLegend
                        content={
                            cellColors ? (
                                <ChartCategoryLegend
                                    data={data}
                                    xKey={xKey}
                                    colors={cellColors}
                                    format={formatCategory}
                                />
                            ) : (
                                <ChartLegendContent />
                            )
                        }
                    />
                )}
                {marks}
            </Chart>
        </ChartContainer>
    );
}
