import type { ChartConfig } from '@/components/ui/chart';
import type * as React from 'react';

export const CHART_PALETTE = [
    'var(--color-chart-1)',
    'var(--color-chart-2)',
    'var(--color-chart-3)',
    'var(--color-chart-4)',
    'var(--color-chart-5)',
    'var(--color-chart-6)',
    'var(--color-chart-7)',
    'var(--color-chart-8)',
] as const;

export type ChartSeries = {
    key: string;
    label?: React.ReactNode;
    color?: string;
    stackId?: string;
};

export type ChartSeriesInput = string | ChartSeries;

export type ResolvedChartSeries = {
    key: string;
    label: React.ReactNode;
    color: string;
    stackId?: string;
};

export type ChartDatum = Record<string, unknown>;

export function paletteColor(index: number): string {
    return CHART_PALETTE[index % CHART_PALETTE.length];
}

export function resolveChartSeries(
    series: readonly ChartSeriesInput[],
    config: ChartConfig = {},
): { series: ResolvedChartSeries[]; config: ChartConfig } {
    const resolved = series.map((entry, index) => {
        const item = typeof entry === 'string' ? { key: entry } : entry;
        const fromConfig = config[item.key];

        return {
            key: item.key,
            label: item.label ?? fromConfig?.label ?? item.key,
            color: item.color ?? fromConfig?.color ?? paletteColor(index),
            stackId: item.stackId,
        };
    });

    const merged: ChartConfig = { ...config };

    for (const item of resolved) {
        merged[item.key] = {
            icon: config[item.key]?.icon,
            label: item.label,
            color: item.color,
        };
    }

    return { series: resolved, config: merged };
}

export function numberFormatter(
    options?: Intl.NumberFormatOptions,
    locale?: string,
): (value: unknown) => string {
    const format = new Intl.NumberFormat(locale, options);

    return (value) => {
        const numeric = typeof value === 'number' ? value : Number(value);

        return Number.isFinite(numeric)
            ? format.format(numeric)
            : String(value);
    };
}

export function dateFormatter(
    options?: Intl.DateTimeFormatOptions,
    locale?: string,
): (value: unknown) => string {
    const format = new Intl.DateTimeFormat(locale, options);

    return (value) => {
        const date =
            value instanceof Date ? value : new Date(value as string | number);

        return Number.isNaN(date.getTime())
            ? String(value)
            : format.format(date);
    };
}

export type ChartScale = 'categorical' | 'linear' | 'time';

export type ChartAxisFormat =
    | Intl.NumberFormatOptions
    | Intl.DateTimeFormatOptions;

export function axisFormatter(
    scale: ChartScale,
    options?: ChartAxisFormat,
    locale?: string,
): ((value: unknown) => string) | undefined {
    if (scale === 'time') {
        return dateFormatter(options as Intl.DateTimeFormatOptions, locale);
    }

    if (scale === 'linear') {
        return numberFormatter(options as Intl.NumberFormatOptions, locale);
    }

    return options
        ? numberFormatter(options as Intl.NumberFormatOptions, locale)
        : undefined;
}
