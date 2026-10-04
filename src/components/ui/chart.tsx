'use client';

import * as React from 'react';
import type { TooltipValueType } from 'recharts';
import * as RechartsPrimitive from 'recharts';

import { ChartContainer, ChartStyle } from '@/components/ui/chart-container';
import {
    getPayloadConfigFromPayload,
    useChart,
    type ChartConfig,
} from '@/components/ui/chart-context';
import { menuSurface } from '@/lib/language';
import { cn } from '@/lib/utils';
import type { SlotNameProps } from '@/types';

type TooltipNameType = number | string;

const ChartTooltip = RechartsPrimitive.Tooltip;

function ChartTooltipContent({
    active,
    payload,
    className,
    indicator = 'dot',
    hideLabel = false,
    hideIndicator = false,
    label,
    labelFormatter,
    labelClassName,
    formatter,
    color,
    nameKey,
    labelKey,
    valueFormatter,
    footer,
    slotName = 'chart-tooltip-content',
}: SlotNameProps &
    React.ComponentProps<typeof RechartsPrimitive.Tooltip> &
    React.ComponentProps<'div'> & {
        hideLabel?: boolean;
        hideIndicator?: boolean;
        indicator?: 'line' | 'dot' | 'dashed';
        nameKey?: string;
        labelKey?: string;
        valueFormatter?: (value: number) => React.ReactNode;
        footer?: React.ReactNode;
    } & Omit<
        RechartsPrimitive.DefaultTooltipContentProps<
            TooltipValueType,
            TooltipNameType
        >,
        'accessibilityLayer'
    >) {
    const { config } = useChart();

    const tooltipLabel = React.useMemo(() => {
        if (hideLabel || !payload?.length) {
            return null;
        }

        const [item] = payload;
        const key = `${labelKey ?? item?.dataKey ?? item?.name ?? 'value'}`;
        const itemConfig = getPayloadConfigFromPayload(config, item, key);
        const value =
            !labelKey &&
            (typeof label === 'string' || typeof label === 'number')
                ? (config[label]?.label ?? label)
                : itemConfig?.label;

        if (labelFormatter) {
            return (
                <div className={cn('font-medium', labelClassName)}>
                    {labelFormatter(value, payload)}
                </div>
            );
        }

        if (value == null || value === '') {
            return null;
        }

        return <div className={cn('font-medium', labelClassName)}>{value}</div>;
    }, [
        label,
        labelFormatter,
        payload,
        hideLabel,
        labelClassName,
        config,
        labelKey,
    ]);

    if (!active || !payload?.length) {
        return null;
    }

    const nestLabel = payload.length === 1 && indicator !== 'dot';

    return (
        <div
            className={cn(
                `${menuSurface} gap-1.5 px-3 py-2 text-xs grid min-w-[8rem] items-start`,
                className,
            )}
            data-slot={slotName}
        >
            {!nestLabel ? tooltipLabel : null}
            <div className="gap-1.5 grid">
                {payload
                    .filter((item) => item.type !== 'none')
                    .map((item, index) => {
                        const key = `${nameKey ?? item.name ?? item.dataKey ?? 'value'}`;
                        const itemConfig = getPayloadConfigFromPayload(
                            config,
                            item,
                            key,
                        );
                        const indicatorColor =
                            color ?? item.payload?.fill ?? item.color;

                        return (
                            <div
                                key={index}
                                className={cn(
                                    'gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 flex w-full flex-wrap items-stretch [&>svg]:text-muted-foreground',
                                    indicator === 'dot' && 'items-center',
                                )}
                            >
                                {formatter &&
                                item?.value !== undefined &&
                                item.name ? (
                                    formatter(
                                        item.value,
                                        item.name,
                                        item,
                                        index,
                                        item.payload,
                                    )
                                ) : (
                                    <>
                                        {itemConfig?.icon ? (
                                            <itemConfig.icon />
                                        ) : (
                                            !hideIndicator && (
                                                <div
                                                    className={cn(
                                                        'shrink-0 rounded-[2px] border-(--color-border) bg-(--color-bg)',
                                                        {
                                                            'h-2.5 w-2.5':
                                                                indicator ===
                                                                'dot',
                                                            'w-1':
                                                                indicator ===
                                                                'line',
                                                            'w-0 border-[1.5px] border-dashed bg-transparent':
                                                                indicator ===
                                                                'dashed',
                                                            'my-0.5':
                                                                nestLabel &&
                                                                indicator ===
                                                                    'dashed',
                                                        },
                                                    )}
                                                    style={
                                                        {
                                                            '--color-bg':
                                                                indicatorColor,
                                                            '--color-border':
                                                                indicatorColor,
                                                        } as React.CSSProperties
                                                    }
                                                />
                                            )
                                        )}
                                        <div
                                            className={cn(
                                                'flex flex-1 justify-between leading-none',
                                                nestLabel
                                                    ? 'items-end'
                                                    : 'items-center',
                                            )}
                                        >
                                            <div className="gap-1.5 grid">
                                                {nestLabel
                                                    ? tooltipLabel
                                                    : null}
                                                <span className="text-muted-foreground">
                                                    {itemConfig?.label ??
                                                        item.name}
                                                </span>
                                            </div>
                                            {item.value != null && (
                                                <span className="font-mono font-medium text-foreground tabular-nums">
                                                    {typeof item.value ===
                                                    'number'
                                                        ? (valueFormatter?.(
                                                              item.value,
                                                          ) ??
                                                          item.value.toLocaleString())
                                                        : String(item.value)}
                                                </span>
                                            )}
                                        </div>
                                    </>
                                )}
                            </div>
                        );
                    })}
            </div>
            {footer != null && (
                <div className="text-muted-foreground">{footer}</div>
            )}
        </div>
    );
}

const ChartLegend = RechartsPrimitive.Legend;

function ChartLegendContent({
    className,
    hideIcon = false,
    payload,
    verticalAlign = 'bottom',
    nameKey,
}: React.ComponentProps<'div'> & {
    hideIcon?: boolean;
    nameKey?: string;
} & RechartsPrimitive.DefaultLegendContentProps) {
    const { config } = useChart();

    if (!payload?.length) {
        return null;
    }

    return (
        <div
            className={cn(
                'gap-4 flex items-center justify-center',
                verticalAlign === 'top' ? 'pb-3' : 'pt-3',
                className,
            )}
        >
            {payload
                .filter((item) => item.type !== 'none')
                .map((item, index) => {
                    const key = `${nameKey ?? item.dataKey ?? 'value'}`;
                    const itemConfig = getPayloadConfigFromPayload(
                        config,
                        item,
                        key,
                    );

                    return (
                        <div
                            key={index}
                            className={cn(
                                'gap-1.5 [&>svg]:h-3 [&>svg]:w-3 flex items-center [&>svg]:text-muted-foreground',
                            )}
                        >
                            {itemConfig?.icon && !hideIcon ? (
                                <itemConfig.icon />
                            ) : (
                                <div
                                    className="h-2 w-2 shrink-0 rounded-[2px]"
                                    style={{
                                        backgroundColor: item.color,
                                    }}
                                />
                            )}
                            {itemConfig?.label}
                        </div>
                    );
                })}
        </div>
    );
}

export type { ChartConfig };

export {
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartStyle,
    ChartTooltip,
    ChartTooltipContent,
};
