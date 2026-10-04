'use client';

import * as React from 'react';
import * as RechartsPrimitive from 'recharts';

import {
    ChartContext,
    THEMES,
    type ChartConfig,
} from '@/components/ui/chart-context';
import { chartStyleDeclarations } from '@/lib/chart-series';
import { elevatedSurface, nestedSurfaceReset } from '@/lib/language';
import { cn } from '@/lib/utils';
import type { SlotNameProps } from '@/types';

const INITIAL_DIMENSION = { width: 320, height: 200 } as const;

export function ChartContainer({
    id,
    className,
    children,
    config,
    initialDimension = INITIAL_DIMENSION,
    slotName = 'chart',
    ...props
}: React.ComponentProps<'div'> & {
    config: ChartConfig;
    children: React.ComponentProps<
        typeof RechartsPrimitive.ResponsiveContainer
    >['children'];
    initialDimension?: {
        width: number;
        height: number;
    };
} & SlotNameProps) {
    const uniqueId = React.useId();
    const chartId = `chart-${id ?? uniqueId.replace(/:/g, '')}`;

    return (
        <ChartContext.Provider value={{ config }}>
            <div
                data-chart={chartId}
                className={cn(
                    elevatedSurface,
                    nestedSurfaceReset,
                    'p-4 bg-card',
                    "aspect-video text-xs flex justify-center [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-hidden [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector]:outline-hidden [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-surface]:outline-hidden",
                    className,
                )}
                {...props}
                data-slot={slotName}
            >
                <ChartStyle id={chartId} config={config} />
                <RechartsPrimitive.ResponsiveContainer
                    initialDimension={initialDimension}
                >
                    {children}
                </RechartsPrimitive.ResponsiveContainer>
            </div>
        </ChartContext.Provider>
    );
}

export const ChartStyle = ({
    id,
    config,
}: {
    id: string;
    config: ChartConfig;
}) => {
    const colorConfig = Object.entries(config).filter(
        ([, config]) => config.theme ?? config.color,
    );

    if (!colorConfig.length) {
        return null;
    }

    return (
        <style
            dangerouslySetInnerHTML={{
                __html: Object.entries(THEMES)
                    .map(
                        ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${chartStyleDeclarations(config, theme as keyof typeof THEMES).join('\n')}
}
`,
                    )
                    .join('\n'),
            }}
        />
    );
};
