import {
    compositionShareLabel,
    CompositionTrack,
    type CompositionPart,
} from '@/blocks/composition-bar';
import {
    resolveTrend,
    StatCardHeader,
    StatFigure,
} from '@/blocks/stat-card-parts';
import {
    elevatedSurface,
    recessedSurface,
    type SurfaceProps,
} from '@/lib/language';
import { cn } from '@/lib/utils';
import { useUiNumberLocale } from '@/locales/context';
import type { SlotNameProps } from '@/types';
import { type LucideIcon } from 'lucide-react';
import { type ReactNode } from 'react';

export type StatBreakdownPart = CompositionPart;

export interface StatBreakdownCardProps extends SurfaceProps {
    title: string;
    icon: LucideIcon;
    iconClassName?: string;
    value: ReactNode;
    secondaryValue?: ReactNode;
    total: number;
    parts: StatBreakdownPart[];
    breakdownLabel?: string;
    trend?: number;
    formatTrend?: (trend: number) => string;
    comparisonLabel?: string;
    className?: string;
}

export function StatBreakdownCard({
    title,
    icon,
    iconClassName = 'bg-muted text-muted-foreground',
    value,
    secondaryValue,
    total,
    parts,
    breakdownLabel,
    trend,
    formatTrend,
    comparisonLabel,
    inset = false,
    className,
    slotName = 'stat-breakdown-card',
}: StatBreakdownCardProps & SlotNameProps) {
    const locale = useUiNumberLocale();

    return (
        <div
            data-inset={inset || undefined}
            className={cn(
                elevatedSurface,
                'p-6 gap-4 min-w-0 flex h-full flex-col bg-card text-card-foreground',
                inset && recessedSurface,
                className,
            )}
            data-slot={slotName}
        >
            <StatCardHeader
                layout="inline"
                title={title}
                icon={icon}
                iconClassName={iconClassName}
                trend={resolveTrend(trend, locale, formatTrend)}
                comparisonLabel={comparisonLabel}
            />
            <div className="gap-6 lg:gap-10 lg:grid-cols-[minmax(10rem,auto)_1fr] lg:items-center grid">
                <div className="min-w-0">
                    <StatFigure value={value} secondaryValue={secondaryValue} />
                </div>
                <div className="gap-4 min-w-0 flex flex-col">
                    <CompositionTrack
                        parts={parts}
                        total={total}
                        label={breakdownLabel ?? title}
                    />
                    <div className="gap-4 sm:grid-cols-[repeat(auto-fit,minmax(8rem,1fr))] grid grid-cols-1">
                        {parts.map((part) => (
                            <div
                                key={part.id}
                                className="gap-1 min-w-0 flex flex-col"
                            >
                                <span className="gap-2 text-sm font-bold tracking-wider flex items-center break-words text-muted-foreground uppercase">
                                    <span
                                        className="size-2.5 shrink-0 rounded-md"
                                        style={{ backgroundColor: part.color }}
                                    />
                                    <span className="min-w-0 break-words">
                                        {part.label}
                                    </span>
                                </span>
                                <span className="text-xl font-bold break-words text-foreground tabular-nums">
                                    {part.display}{' '}
                                    <span className="text-xs font-medium text-muted-foreground">
                                        {compositionShareLabel(
                                            part,
                                            total,
                                            locale,
                                        )}
                                    </span>
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
