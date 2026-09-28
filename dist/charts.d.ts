import * as React from 'react';
import * as RechartsPrimitive from 'recharts';
import { TooltipValueType } from 'recharts';
import { S as SlotNameProps } from './types-r3VHXAG2.js';
import 'lucide-react';

declare const THEMES: {
    readonly light: "";
    readonly dark: ".dark";
};
type TooltipNameType = number | string;
type ChartConfig = Record<string, {
    label?: React.ReactNode;
    icon?: React.ComponentType;
} & ({
    color?: string;
    theme?: never;
} | {
    color?: never;
    theme: Record<keyof typeof THEMES, string>;
})>;
declare function ChartContainer({ id, className, children, config, initialDimension, slotName, ...props }: React.ComponentProps<'div'> & {
    config: ChartConfig;
    children: React.ComponentProps<typeof RechartsPrimitive.ResponsiveContainer>['children'];
    initialDimension?: {
        width: number;
        height: number;
    };
} & SlotNameProps): React.JSX.Element;
declare const ChartStyle: ({ id, config }: {
    id: string;
    config: ChartConfig;
}) => React.JSX.Element | null;
declare const ChartTooltip: typeof RechartsPrimitive.Tooltip;
declare function ChartTooltipContent({ active, payload, className, indicator, hideLabel, hideIndicator, label, labelFormatter, labelClassName, formatter, color, nameKey, labelKey, }: React.ComponentProps<typeof RechartsPrimitive.Tooltip> & React.ComponentProps<'div'> & {
    hideLabel?: boolean;
    hideIndicator?: boolean;
    indicator?: 'line' | 'dot' | 'dashed';
    nameKey?: string;
    labelKey?: string;
} & Omit<RechartsPrimitive.DefaultTooltipContentProps<TooltipValueType, TooltipNameType>, 'accessibilityLayer'>): React.JSX.Element | null;
declare const ChartLegend: React.MemoExoticComponent<(outsideProps: RechartsPrimitive.LegendProps) => React.ReactPortal | null>;
declare function ChartLegendContent({ className, hideIcon, payload, verticalAlign, nameKey, }: React.ComponentProps<'div'> & {
    hideIcon?: boolean;
    nameKey?: string;
} & RechartsPrimitive.DefaultLegendContentProps): React.JSX.Element | null;

declare const CHART_PALETTE: readonly ["var(--color-chart-1)", "var(--color-chart-2)", "var(--color-chart-3)", "var(--color-chart-4)", "var(--color-chart-5)", "var(--color-chart-6)", "var(--color-chart-7)", "var(--color-chart-8)"];
type ChartSeries = {
    key: string;
    label?: React.ReactNode;
    color?: string;
    stackId?: string;
};
type ChartSeriesInput = string | ChartSeries;
type ChartDatum = Record<string, unknown>;
declare function paletteColor(index: number): string;
declare function cssVariableKey(key: string): string;
declare function chartColorVariable(key: string): string;
type ChartScale = 'categorical' | 'linear' | 'time';
type ChartAxisFormat = Intl.NumberFormatOptions | Intl.DateTimeFormatOptions;

type ChartCurve = 'smooth' | 'linear' | 'step';
interface CartesianChartProps extends Omit<React.ComponentProps<typeof ChartContainer>, 'config' | 'children'> {
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
}

type AreaChartProps = Omit<CartesianChartProps, 'barSize' | 'barRadius' | 'horizontal'>;
declare function AreaChart({ slotName, ...props }: AreaChartProps): React.JSX.Element;

type BarChartProps = Omit<CartesianChartProps, 'curve' | 'dots'>;
declare function BarChart({ slotName, ...props }: BarChartProps): React.JSX.Element;

interface DonutChartProps extends Omit<React.ComponentProps<'div'>, 'children'>, SlotNameProps {
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
declare function DonutChart({ data, valueKey, labelKey, config, innerRadius, cornerRadius, paddingAngle, legend, legendValue, label, value, format, locale, tooltip, animate, className, children, slotName, ...props }: DonutChartProps): React.JSX.Element;

type LineChartProps = Omit<CartesianChartProps, 'barSize' | 'barRadius' | 'horizontal'>;
declare function LineChart({ slotName, ...props }: LineChartProps): React.JSX.Element;

export { AreaChart, type AreaChartProps, BarChart, type BarChartProps, CHART_PALETTE, type ChartAxisFormat, type ChartConfig, ChartContainer, type ChartCurve, type ChartDatum, ChartLegend, ChartLegendContent, type ChartScale, type ChartSeries, type ChartSeriesInput, ChartStyle, ChartTooltip, ChartTooltipContent, DonutChart, type DonutChartProps, LineChart, type LineChartProps, chartColorVariable, cssVariableKey, paletteColor };
