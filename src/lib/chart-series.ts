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
    variableKey: string;
    label: React.ReactNode;
    color: string;
    named: boolean;
    stackId?: string;
};

export type ChartDatum = Record<string, unknown>;

export function paletteColor(index: number): string {
    return CHART_PALETTE[index % CHART_PALETTE.length];
}

export function cssVariableKey(key: string): string {
    return key.replace(/[^A-Za-z0-9_-]/g, '-');
}

export function chartColorVariable(key: string): string {
    return `var(--color-${cssVariableKey(key)})`;
}

const UNSAFE_COLOR = /[<>{};@\\]/;

export function safeChartColor(color: string): string | null {
    return UNSAFE_COLOR.test(color) ? null : color;
}

export function uniqueVariableKeys(keys: readonly string[]): string[] {
    const taken = new Set<string>();

    return keys.map((key) => {
        const base = cssVariableKey(key);
        let candidate = base;
        let suffix = 2;

        while (taken.has(candidate)) {
            candidate = `${base}-${suffix}`;
            suffix += 1;
        }

        taken.add(candidate);

        return candidate;
    });
}

export function resolveChartSeries(
    series: readonly ChartSeriesInput[],
    config: ChartConfig = {},
): { series: ResolvedChartSeries[]; config: ChartConfig } {
    const items = series.map((entry) =>
        typeof entry === 'string' ? { key: entry } : entry,
    );
    const variableKeys = uniqueVariableKeys(items.map((item) => item.key));

    const resolved = items.map((item, index) => {
        const fromConfig = config[item.key];
        const named = item.color ?? fromConfig?.color;

        return {
            key: item.key,
            variableKey: variableKeys[index],
            label: item.label ?? fromConfig?.label ?? item.key,
            color: named ?? paletteColor(index),
            named: named !== undefined,
            stackId: item.stackId,
        };
    });

    const merged: ChartConfig = { ...config };

    for (const item of resolved) {
        const entry = config[item.key];
        const theme = item.named ? undefined : entry?.theme;
        const resolvedEntry = theme
            ? { icon: entry?.icon, label: item.label, theme }
            : { icon: entry?.icon, label: item.label, color: item.color };

        merged[item.variableKey] = resolvedEntry;
        merged[item.key] = resolvedEntry;
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
