import {
    resolveTrend,
    StatCardHeader,
    StatFigure,
    StatShareBar,
    type StatCardLayout,
    type StatShare,
} from '@/blocks/stat-card-parts';
import {
    elevatedSurface,
    recessedSurface,
    type SurfaceProps,
} from '@/lib/language';
import { cn } from '@/lib/utils';
import type { SlotNameProps } from '@/types';
import { type LucideIcon } from 'lucide-react';
import { type ReactNode } from 'react';

export interface StatCardProps extends SurfaceProps {
    title: string;
    value: ReactNode;
    icon: LucideIcon;
    iconClassName?: string;
    trend?: number;
    formatTrend?: (trend: number) => string;
    comparisonLabel?: string;
    layout?: StatCardLayout;
    secondaryValue?: ReactNode;
    share?: StatShare;
    className?: string;
}

export function StatCard({
    title,
    value,
    icon,
    iconClassName = 'bg-muted text-muted-foreground',
    trend,
    formatTrend,
    comparisonLabel,
    layout = 'stacked',
    secondaryValue,
    share,
    inset = false,
    className,
    slotName = 'stat-card',
}: StatCardProps & SlotNameProps) {
    const inline = layout === 'inline';

    return (
        <div
            data-inset={inset || undefined}
            className={cn(
                elevatedSurface,
                'p-6 min-w-0 flex h-full flex-col justify-between bg-card text-card-foreground',
                inline && 'gap-4 justify-start',
                inset && recessedSurface,
                className,
            )}
            data-slot={slotName}
        >
            <StatCardHeader
                layout={layout}
                title={title}
                icon={icon}
                iconClassName={iconClassName}
                trend={resolveTrend(trend, formatTrend)}
                comparisonLabel={comparisonLabel}
            />
            <div>
                {!inline && (
                    <p className="mb-1 text-xs font-medium tracking-wider break-words text-muted-foreground uppercase">
                        {title}
                    </p>
                )}
                <StatFigure value={value} secondaryValue={secondaryValue} />
            </div>
            {share && (
                <StatShareBar
                    share={share}
                    title={title}
                    tooltipValue={secondaryValue ?? value}
                />
            )}
        </div>
    );
}

export interface StatsGridProps {
    children: ReactNode;
    className?: string;
}

export function StatsGrid({ children, className }: StatsGridProps) {
    return (
        <div
            className={cn(
                'gap-6 [&>*]:min-w-0 grid [grid-template-columns:repeat(auto-fit,minmax(18rem,1fr))]',
                className,
            )}
        >
            {children}
        </div>
    );
}

export type { StatCardLayout, StatShare } from '@/blocks/stat-card-parts';
