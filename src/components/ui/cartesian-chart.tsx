'use client';

import * as React from 'react';
import {
    Area,
    Bar,
    CartesianGrid,
    Line,
    AreaChart as RechartsAreaChart,
    BarChart as RechartsBarChart,
    LineChart as RechartsLineChart,
    XAxis,
    YAxis,
} from 'recharts';

import {
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from '@/components/ui/chart';
import {
    axisFormatter,
    chartColorVariable,
    numberFormatter,
    resolveChartSeries,
    type ChartAxisFormat,
    type ChartDatum,
    type ChartScale,
    type ChartSeriesInput,
} from '@/lib/chart-series';

type CartesianKind = 'area' | 'bar' | 'line';

export type ChartCurve = 'smooth' | 'linear' | 'step';

const CURVE_TYPE = {
    smooth: 'monotone',
    linear: 'linear',
    step: 'step',
} as const;

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
}

const CHART_BY_KIND = {
    area: RechartsAreaChart,
    bar: RechartsBarChart,
    line: RechartsLineChart,
} as const;

type MarkProps = {
    dataKey: string;
    color: string;
    stackId?: string;
    curveType: (typeof CURVE_TYPE)[ChartCurve];
    barSize?: number;
    barRadius: number;
    dots: boolean;
};

const MARK_BY_KIND: Record<
    CartesianKind,
    (props: MarkProps) => React.ReactElement
> = {
    area: ({ dataKey, color, stackId, curveType, dots }) => (
        <Area
            key={dataKey}
            dataKey={dataKey}
            type={curveType}
            stroke={color}
            strokeWidth={2}
            fill={color}
            fillOpacity={0.2}
            stackId={stackId}
            dot={dots}
        />
    ),
    bar: ({ dataKey, color, stackId, barSize, barRadius }) => (
        <Bar
            key={dataKey}
            dataKey={dataKey}
            fill={color}
            radius={barRadius}
            barSize={barSize}
            stackId={stackId}
        />
    ),
    line: ({ dataKey, color, curveType, dots }) => (
        <Line
            key={dataKey}
            dataKey={dataKey}
            type={curveType}
            stroke={color}
            strokeWidth={2}
            dot={dots}
        />
    ),
};

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
    slotName = 'chart',
    ...props
}: CartesianChartProps & { kind: CartesianKind }) {
    const { series: resolved, config: merged } = resolveChartSeries(
        series,
        config,
    );

    const Chart = CHART_BY_KIND[kind];
    const curveType = CURVE_TYPE[curve];
    const formatCategory = axisFormatter(xScale, xFormat, locale);
    const formatValue = numberFormatter(yFormat, locale);

    const categoryAxis = (
        <XAxis
            dataKey={xKey}
            type="category"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={formatCategory}
        />
    );

    const valueAxis = (
        <YAxis
            type="number"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            width="auto"
            tickFormatter={formatValue}
        />
    );

    const swappedCategoryAxis = (
        <YAxis
            dataKey={xKey}
            type="category"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            width="auto"
            tickFormatter={formatCategory}
        />
    );

    const swappedValueAxis = (
        <XAxis
            type="number"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={formatValue}
        />
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
                {xAxis && (horizontal ? swappedValueAxis : categoryAxis)}
                {yAxis && (horizontal ? swappedCategoryAxis : valueAxis)}
                {tooltip && (
                    <ChartTooltip
                        cursor={kind !== 'bar'}
                        content={
                            <ChartTooltipContent
                                labelFormatter={
                                    formatCategory
                                        ? (label) => formatCategory(label)
                                        : undefined
                                }
                            />
                        }
                    />
                )}
                {legend && <ChartLegend content={<ChartLegendContent />} />}
                {resolved.map((item) =>
                    MARK_BY_KIND[kind]({
                        dataKey: item.key,
                        color: chartColorVariable(item.key),
                        stackId:
                            item.stackId ?? (stacked ? 'stack' : undefined),
                        curveType,
                        barSize,
                        barRadius,
                        dots,
                    }),
                )}
            </Chart>
        </ChartContainer>
    );
}
