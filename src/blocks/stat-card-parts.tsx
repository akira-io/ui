import { cn } from '@/lib/utils';
import {
    ArrowDownRight,
    ArrowRight,
    ArrowUpRight,
    type LucideIcon,
} from 'lucide-react';
import { type ReactNode } from 'react';

export type StatCardLayout = 'stacked' | 'inline';

type TrendTone = 'positive' | 'negative' | 'neutral';

export interface TrendDisplay {
    label: string;
    tone: TrendTone;
    icon: LucideIcon;
}

const trendToneClass: Record<TrendTone, string> = {
    positive: 'text-success',
    negative: 'text-destructive',
    neutral: 'text-muted-foreground',
};

const trendToneIcon: Record<TrendTone, LucideIcon> = {
    positive: ArrowUpRight,
    negative: ArrowDownRight,
    neutral: ArrowRight,
};

function defaultTrendLabel(trend: number): string {
    if (trend === 0) {
        return '0%';
    }

    return `${trend > 0 ? '+' : ''}${trend.toFixed(1)}%`;
}

function toneOf(trend: number): TrendTone {
    if (trend === 0) {
        return 'neutral';
    }

    return trend > 0 ? 'positive' : 'negative';
}

export function resolveTrend(
    trend?: number,
    formatTrend: (trend: number) => string = defaultTrendLabel,
): TrendDisplay | null {
    if (trend === null || trend === undefined || Number.isNaN(trend)) {
        return null;
    }

    const normalized = Math.abs(trend) < 0.05 ? 0 : trend;
    const tone = toneOf(normalized);

    return {
        label: formatTrend(normalized),
        tone,
        icon: trendToneIcon[tone],
    };
}

function StatTrend({
    trend,
    comparisonLabel,
}: {
    trend: TrendDisplay;
    comparisonLabel?: string;
}) {
    return (
        <div className="min-w-0 text-right">
            <span
                className={cn(
                    'text-sm font-semibold inline-flex items-center',
                    trendToneClass[trend.tone],
                )}
            >
                {trend.label}
                <trend.icon className="ml-1 size-4" />
            </span>
            {comparisonLabel && (
                <p className="mt-1 font-medium tracking-wider text-[10px] whitespace-nowrap text-muted-foreground uppercase">
                    {comparisonLabel}
                </p>
            )}
        </div>
    );
}

export interface StatCardHeaderProps {
    layout: StatCardLayout;
    title: string;
    icon: LucideIcon;
    iconClassName: string;
    trend: TrendDisplay | null;
    comparisonLabel?: string;
}

export function StatCardHeader({
    layout,
    title,
    icon: Icon,
    iconClassName,
    trend,
    comparisonLabel,
}: StatCardHeaderProps) {
    const trendNode = trend && (
        <StatTrend trend={trend} comparisonLabel={comparisonLabel} />
    );

    if (layout === 'inline') {
        return (
            <div className="gap-3 flex items-start justify-between">
                <div className="gap-3 min-w-0 flex items-center">
                    <div
                        className={cn(
                            'rounded-xl p-2.5 shrink-0',
                            iconClassName,
                        )}
                    >
                        <Icon className="size-5" />
                    </div>
                    <p className="text-sm font-bold tracking-wider break-words text-muted-foreground uppercase">
                        {title}
                    </p>
                </div>
                {trendNode}
            </div>
        );
    }

    return (
        <div className="mb-4 gap-4 flex items-start justify-between">
            <div className={cn('rounded-2xl p-3 shrink-0', iconClassName)}>
                <Icon className="size-6" />
            </div>
            {trendNode}
        </div>
    );
}

export function StatFigure({
    value,
    secondaryValue,
}: {
    value: ReactNode;
    secondaryValue?: ReactNode;
}) {
    const mirrorsValue = secondaryValue === value;

    return (
        <>
            <p className="text-3xl font-bold truncate text-foreground tabular-nums">
                {value}
            </p>
            {secondaryValue !== undefined && (
                <p
                    aria-hidden={mirrorsValue || undefined}
                    className={cn(
                        'mt-1 text-sm font-medium truncate text-muted-foreground tabular-nums',
                        mirrorsValue && 'invisible',
                    )}
                >
                    {secondaryValue}
                </p>
            )}
        </>
    );
}
