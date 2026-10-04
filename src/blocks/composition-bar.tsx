import { ShareTooltip } from '@/blocks/share-tooltip';
import { clampShare } from '@/blocks/stat-card-parts';
import { useBarRadius } from '@/hooks/use-bar-radius';
import { cn } from '@/lib/utils';
import type { SlotNameProps } from '@/types';
import { useRef, type ReactNode } from 'react';

export interface CompositionPart {
    id: string;
    label: string;
    value: number;
    display: ReactNode;
    exactDisplay?: ReactNode;
    shareLabel?: string;
    color: string;
}

export function compositionTotal(parts: readonly CompositionPart[]): number {
    return parts.reduce((sum, part) => sum + Math.max(part.value, 0), 0);
}

export function compositionShare(part: CompositionPart, total: number): number {
    return total > 0 ? clampShare((part.value / total) * 100) : 0;
}

export function compositionShareLabel(
    part: CompositionPart,
    total: number,
): string {
    return part.shareLabel ?? `${compositionShare(part, total).toFixed(1)}%`;
}

const TRACK_MAX_RADIUS = 8;

const TRACK_FALLBACK_RADIUS = 2;

export interface CompositionTrackProps {
    parts: readonly CompositionPart[];
    total: number;
    label: string;
    className?: string;
}

export function CompositionTrack({
    parts,
    total,
    label,
    className,
}: CompositionTrackProps) {
    const trackRef = useRef<HTMLDivElement>(null);
    const radius =
        useBarRadius(trackRef, TRACK_MAX_RADIUS) ?? TRACK_FALLBACK_RADIUS;
    const overflowing = compositionTotal(parts) > total;

    return (
        <div
            ref={trackRef}
            role="group"
            aria-label={label}
            className={cn('h-3 flex overflow-hidden bg-muted', className)}
            style={{ borderRadius: radius }}
        >
            {parts.map((part) => (
                <ShareTooltip
                    key={part.id}
                    label={part.label}
                    value={part.exactDisplay ?? part.display}
                    shareLabel={compositionShareLabel(part, total)}
                    color={part.color}
                >
                    <span
                        role="img"
                        tabIndex={compositionShare(part, total) === 0 ? -1 : 0}
                        aria-label={`${part.label}, ${compositionShareLabel(part, total)}`}
                        data-part-id={part.id}
                        className={cn(
                            'h-full outline-hidden hover:brightness-125 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring focus-visible:outline-solid',
                            overflowing ? 'shrink-0' : 'shrink',
                            compositionShare(part, total) > 0 && 'min-w-px',
                        )}
                        style={{
                            width: `${compositionShare(part, total)}%`,
                            backgroundColor: part.color,
                        }}
                    />
                </ShareTooltip>
            ))}
        </div>
    );
}

export interface CompositionBarProps {
    parts: readonly CompositionPart[];
    label: string;
    total?: number;
    legend?: boolean;
    className?: string;
}

export function CompositionBar({
    parts,
    label,
    total = compositionTotal(parts),
    legend = true,
    className,
    slotName = 'composition-bar',
}: CompositionBarProps & SlotNameProps) {
    return (
        <div
            className={cn('gap-5 min-w-0 flex flex-col', className)}
            data-slot={slotName}
        >
            <CompositionTrack parts={parts} total={total} label={label} />
            {legend && (
                <ul aria-label={label} className="gap-2 flex flex-col">
                    {parts.map((part) => (
                        <li
                            key={part.id}
                            data-part-id={part.id}
                            className="gap-4 text-sm flex items-center justify-between"
                        >
                            <span className="gap-2 min-w-0 flex items-center">
                                <span
                                    aria-hidden
                                    className="size-2.5 shrink-0 rounded-md"
                                    style={{ backgroundColor: part.color }}
                                />
                                <span className="truncate">{part.label}</span>
                            </span>
                            <span className="gap-2 flex shrink-0 items-baseline tabular-nums">
                                <span className="font-medium text-foreground">
                                    {part.display}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                    {compositionShareLabel(part, total)}
                                </span>
                            </span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
