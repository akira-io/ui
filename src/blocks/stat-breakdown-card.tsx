import { ShareTooltip } from '@/blocks/share-tooltip';
import {
    clampShare,
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
import type { SlotNameProps } from '@/types';
import { type LucideIcon } from 'lucide-react';
import { type ReactNode } from 'react';

export interface StatBreakdownPart {
    id: string;
    label: string;
    value: number;
    display: ReactNode;
    exactDisplay?: ReactNode;
    shareLabel?: string;
    color: string;
}

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

function shareOf(part: StatBreakdownPart, total: number): number {
    return total > 0 ? clampShare((part.value / total) * 100) : 0;
}

function shareLabelOf(part: StatBreakdownPart, total: number): string {
    return part.shareLabel ?? `${shareOf(part, total).toFixed(1)}%`;
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
                trend={resolveTrend(trend, formatTrend)}
                comparisonLabel={comparisonLabel}
            />
            <div className="gap-6 lg:gap-10 lg:grid-cols-[minmax(10rem,auto)_1fr] lg:items-center grid">
                <div className="min-w-0">
                    <StatFigure value={value} secondaryValue={secondaryValue} />
                </div>
                <div className="gap-4 min-w-0 flex flex-col">
                    <div
                        role="group"
                        aria-label={breakdownLabel ?? title}
                        className="h-3 flex overflow-hidden rounded-full bg-muted"
                    >
                        {parts.map((part) => (
                            <ShareTooltip
                                key={part.id}
                                label={part.label}
                                value={part.exactDisplay ?? part.display}
                                shareLabel={shareLabelOf(part, total)}
                                color={part.color}
                            >
                                <span
                                    tabIndex={0}
                                    aria-label={part.label}
                                    data-part-id={part.id}
                                    className="h-full outline-hidden hover:brightness-125 focus-visible:brightness-125"
                                    style={{
                                        width: `${shareOf(part, total)}%`,
                                        backgroundColor: part.color,
                                    }}
                                />
                            </ShareTooltip>
                        ))}
                    </div>
                    <div className="gap-4 sm:grid-cols-[repeat(auto-fit,minmax(8rem,1fr))] grid grid-cols-1">
                        {parts.map((part) => (
                            <div
                                key={part.id}
                                className="gap-1 min-w-0 flex flex-col"
                            >
                                <span className="gap-2 text-sm font-bold tracking-wider flex items-center text-muted-foreground uppercase">
                                    <span
                                        className="size-2.5 shrink-0 rounded-md"
                                        style={{ backgroundColor: part.color }}
                                    />
                                    {part.label}
                                </span>
                                <span className="text-xl font-bold text-foreground tabular-nums">
                                    {part.display}{' '}
                                    <span className="text-xs font-medium text-muted-foreground">
                                        {shareLabelOf(part, total)}
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
