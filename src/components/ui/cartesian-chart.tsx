'use client';

import * as React from 'react';
import {
    CartesianGrid,
    AreaChart as RechartsAreaChart,
    BarChart as RechartsBarChart,
    LineChart as RechartsLineChart,
} from 'recharts';

import { useBarStacks, type StackableProps } from '@/components/ui/bar-stack';
import {
    categoryAxis,
    referenceLines as renderReferenceLines,
    valueAxis,
    type ChartReferenceLine,
} from '@/components/ui/cartesian-axes';
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
    valueDomain,
    type ChartValueDomain,
    type ChartValueScale,
} from '@/lib/chart-scale';
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

export type { ChartCurve, ChartReferenceLine };

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
    tooltipDetail?: (datum: ChartDatum) => React.ReactNode;
    yDomain?: ChartValueDomain;
    yScale?: ChartValueScale;
    referenceLines?: readonly ChartReferenceLine[];
    stackOffset?: 'sign';
}

const CHART_BY_KIND = {
    area: RechartsAreaChart,
    bar: RechartsBarChart,
    line: RechartsLineChart,
} as const;

const NO_REFERENCE_LINES: readonly ChartReferenceLine[] = [];

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
    tooltipDetail,
    yDomain,
    yScale = 'linear',
    referenceLines = NO_REFERENCE_LINES,
    stackOffset,
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
    const domain = valueDomain(
        yDomain,
        yScale,
        data,
        resolved.map((item) => item.key),
    );
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
                stackOffset={kind === 'bar' ? stackOffset : undefined}
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
                    valueAxis(horizontal, formatValue, domain, yScale)}
                {tooltip && (
                    <ChartTooltip
                        cursor={kind !== 'bar'}
                        content={
                            <ChartCategoryTooltipContent
                                data={data}
                                colors={cellColors}
                                detail={tooltipDetail}
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
                {renderReferenceLines(referenceLines, horizontal)}
            </Chart>
        </ChartContainer>
    );
}
