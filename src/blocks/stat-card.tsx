import { cn } from '@/lib/utils';
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
    neutral: 'text-zinc-500 dark:text-zinc-400',
};

export interface StatCardProps {
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
    iconClassName = 'bg-success text-success-foreground shadow-lg shadow-success/20',
    trend,
    comparisonLabel,
    className,
}: StatCardProps) {
    const resolvedTrend = resolveTrend(trend);

    return (
        <div
            className={cn(
                'border-zinc-200 bg-white/90 p-8 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-zinc-900/90 flex h-full flex-col justify-between rounded-[2.5rem] border',
                className,
            )}
        >
            <div className="mb-4 flex items-center justify-between">
                <div className={cn('rounded-2xl p-4', iconClassName)}>
                    <Icon className="size-6" />
                </div>
                {resolvedTrend && (
                    <div className="text-right">
                        <span
                            className={cn(
                                'text-sm font-black inline-flex items-center',
                                trendToneClass[resolvedTrend.tone],
                            )}
                        >
                            {resolvedTrend.label}
                            <resolvedTrend.icon className="ml-1 size-4" />
                        </span>
                        {comparisonLabel && (
                            <p className="mt-1 font-bold tracking-wider text-zinc-400 text-[10px] uppercase">
                                {comparisonLabel}
                            </p>
                        )}
                    </div>
                )}
            </div>
            <div>
                <p className="mb-1 text-sm font-bold tracking-wider text-zinc-400 uppercase">
                    {title}
                </p>
                <p className="text-3xl font-black text-zinc-900 dark:text-white tabular-nums">
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
                'gap-6 md:grid-cols-2 lg:grid-cols-4 grid grid-cols-1',
                className,
            )}
        >
            {children}
        </div>
    );
}
