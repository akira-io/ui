'use client';

import type * as React from 'react';

import { ChartTooltipContent } from '@/components/ui/chart';
import { paintByCategory, type ChartDatum } from '@/lib/chart-series';
import { cn } from '@/lib/utils';
import type { SlotNameProps } from '@/types';

export function ChartCategoryLegend({
    data,
    xKey,
    colors,
    format,
    verticalAlign = 'bottom',
    className,
    slotName = 'chart-category-legend',
}: SlotNameProps & {
    data: readonly ChartDatum[];
    xKey: string;
    colors: readonly string[];
    format?: (value: unknown) => string;
    verticalAlign?: 'top' | 'middle' | 'bottom';
    className?: string;
}) {
    if (!data.length) {
        return null;
    }

    return (
        <ul
            className={cn(
                'gap-x-4 gap-y-1.5 flex flex-wrap items-center justify-center',
                verticalAlign === 'top' ? 'pb-3' : 'pt-3',
                className,
            )}
            data-slot={slotName}
        >
            {data.map((datum, index) => (
                <li key={index} className="gap-1.5 flex items-center">
                    <span
                        aria-hidden
                        className="size-2 shrink-0 rounded-full"
                        style={{ backgroundColor: colors[index] }}
                    />
                    {format ? format(datum[xKey]) : String(datum[xKey] ?? '')}
                </li>
            ))}
        </ul>
    );
}

export function ChartCategoryTooltipContent({
    data,
    colors,
    payload,
    ...props
}: React.ComponentProps<typeof ChartTooltipContent> & {
    data: readonly ChartDatum[];
    colors?: readonly string[];
}) {
    return (
        <ChartTooltipContent
            {...props}
            payload={
                colors && payload
                    ? paintByCategory(payload, data, colors)
                    : payload
            }
        />
    );
}
