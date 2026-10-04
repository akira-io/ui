import * as React from 'react';
import * as RechartsPrimitive from 'recharts';
import { TooltipValueType } from 'recharts';
import { S as SlotNameProps } from './types-CTEMbVhK.js';
import 'lucide-react';

declare const THEMES: {
    readonly light: "";
    readonly dark: ".dark";
};
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
declare const ChartStyle: ({ id, config, }: {
    id: string;
    config: ChartConfig;
}) => React.JSX.Element | null;

type TooltipNameType = number | string;
declare const ChartTooltip: typeof RechartsPrimitive.Tooltip;
declare function ChartTooltipContent({ active, payload, className, indicator, hideLabel, hideIndicator, label, labelFormatter, labelClassName, formatter, color, nameKey, labelKey, valueFormatter, footer, slotName, }: SlotNameProps & React.ComponentProps<typeof RechartsPrimitive.Tooltip> & React.ComponentProps<'div'> & {
    hideLabel?: boolean;
    hideIndicator?: boolean;
    indicator?: 'line' | 'dot' | 'dashed';
    nameKey?: string;
    labelKey?: string;
    valueFormatter?: (value: number) => React.ReactNode;
    footer?: React.ReactNode;
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
type ChartColorBy = 'series' | 'category' | ((datum: ChartDatum, index: number) => string);
declare function paletteColor(index: number): string;
declare function cssVariableKey(key: string): string;
declare function chartColorVariable(key: string): string;
type ChartScale = 'categorical' | 'linear' | 'time';
type ChartAxisFormat = Intl.NumberFormatOptions | Intl.DateTimeFormatOptions;

type ChartValueScale = 'linear' | 'log';
type ChartValueDomain = [number | 'auto', number | 'auto'];

type ChartReferenceLine = {
    x?: number | string;
    y?: number;
    label?: string;
};

type ChartCurve = 'smooth' | 'linear' | 'step';
type ChartBarVariant = 'bar' | 'lollipop';
type ChartAreaFill = 'solid' | 'gradient';

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
    colorBy?: ChartColorBy;
    tooltipFormat?: Intl.NumberFormatOptions;
    tooltipDetail?: (datum: ChartDatum) => React.ReactNode;
    yDomain?: ChartValueDomain;
    yScale?: ChartValueScale;
    referenceLines?: readonly ChartReferenceLine[];
    stackOffset?: 'sign';
    valueLabels?: boolean | Intl.NumberFormatOptions;
    variant?: ChartBarVariant;
    fill?: ChartAreaFill;
}

type AreaChartProps = Omit<CartesianChartProps, 'barSize' | 'barRadius' | 'horizontal' | 'colorBy' | 'stackOffset' | 'variant' | 'valueLabels'>;
declare function AreaChart({ slotName, ...props }: AreaChartProps): React.JSX.Element;

type BarChartProps = Omit<CartesianChartProps, 'curve' | 'dots' | 'fill'>;
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

type LineChartProps = Omit<CartesianChartProps, 'barSize' | 'barRadius' | 'horizontal' | 'colorBy' | 'fill' | 'stackOffset' | 'variant'>;
declare function LineChart({ slotName, ...props }: LineChartProps): React.JSX.Element;

export { AreaChart, type AreaChartProps, BarChart, type BarChartProps, CHART_PALETTE, type ChartAreaFill, type ChartAxisFormat, type ChartBarVariant, type ChartColorBy, type ChartConfig, ChartContainer, type ChartCurve, type ChartDatum, ChartLegend, ChartLegendContent, type ChartReferenceLine, type ChartScale, type ChartSeries, type ChartSeriesInput, ChartStyle, ChartTooltip, ChartTooltipContent, type ChartValueDomain, type ChartValueScale, DonutChart, type DonutChartProps, LineChart, type LineChartProps, chartColorVariable, cssVariableKey, paletteColor };
