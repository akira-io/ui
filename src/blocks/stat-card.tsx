import {
    elevatedSurface,
    recessedSurface,
    type SurfaceProps,
} from '@/lib/language';
import { cn } from '@/lib/utils';
import type { SlotNameProps } from '@/types';
import {
    ArrowDownRight,
    ArrowRight,
    ArrowUpRight,
    type LucideIcon,
} from 'lucide-react';
import { type ReactNode } from 'react';

type TrendTone = 'positive' | 'negative' | 'neutral';

interface TrendDisplay {
    label: string;
    tone: TrendTone;
    icon: LucideIcon;
}

function resolveTrend(trend?: number): TrendDisplay | null {
    if (trend === null || trend === undefined || Number.isNaN(trend)) {
        return null;
    }

    const normalized = Math.abs(trend) < 0.05 ? 0 : trend;

    if (normalized === 0) {
        return { label: '0%', tone: 'neutral', icon: ArrowRight };
    }

    if (normalized > 0) {
        return {
            label: `+${normalized.toFixed(1)}%`,
            tone: 'positive',
            icon: ArrowUpRight,
        };
    }

    return {
        label: `${normalized.toFixed(1)}%`,
        tone: 'negative',
        icon: ArrowDownRight,
    };
}

const trendToneClass: Record<TrendTone, string> = {
    positive: 'text-success',
    negative: 'text-destructive',
    neutral: 'text-muted-foreground',
};

export interface StatCardProps extends SurfaceProps {
    title: string;
    value: ReactNode;
    icon: LucideIcon;
    iconClassName?: string;
    trend?: number;
    comparisonLabel?: string;
    className?: string;
}

export function StatCard({
    title,
    value,
    icon: Icon,
    iconClassName = 'bg-muted text-muted-foreground',
    trend,
    comparisonLabel,
    inset = false,
    className,
    slotName = 'stat-card',
}: StatCardProps & SlotNameProps) {
    const resolvedTrend = resolveTrend(trend);

    return (
        <div
            data-inset={inset || undefined}
            className={cn(
                elevatedSurface,
                'p-6 min-w-0 flex h-full flex-col justify-between bg-card text-card-foreground',
                inset && recessedSurface,
                className,
            )}
            data-slot={slotName}
        >
            <div className="mb-4 gap-4 flex items-start justify-between">
                <div className={cn('rounded-2xl p-3 shrink-0', iconClassName)}>
                    <Icon className="size-6" />
                </div>
                {resolvedTrend && (
                    <div className="min-w-0 text-right">
                        <span
                            className={cn(
                                'text-sm font-semibold inline-flex items-center',
                                trendToneClass[resolvedTrend.tone],
                            )}
                        >
                            {resolvedTrend.label}
                            <resolvedTrend.icon className="ml-1 size-4" />
                        </span>
                        {comparisonLabel && (
                            <p className="mt-1 font-medium tracking-wider text-[10px] whitespace-nowrap text-muted-foreground uppercase">
                                {comparisonLabel}
                            </p>
                        )}
                    </div>
                )}
            </div>
            <div>
                <p className="mb-1 text-xs font-medium tracking-wider break-words text-muted-foreground uppercase">
                    {title}
                </p>
                <p className="text-3xl font-bold truncate text-foreground tabular-nums">
                    {value}
                </p>
            </div>
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
