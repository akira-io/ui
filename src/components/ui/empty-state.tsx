import { cn } from '@/lib/utils';
import type { SlotNameProps } from '@/types';
import { type LucideIcon, SearchX } from 'lucide-react';
import { type ReactNode } from 'react';

export interface EmptyStateLabels {
    title: string;
}

export const emptyStateLabels: EmptyStateLabels = {
    title: 'Nothing to show',
};

export interface EmptyStateProps {
    icon?: LucideIcon;
    title?: string;
    description?: string;
    actions?: ReactNode;
    compact?: boolean;
    className?: string;
}

export function EmptyState({
    icon: Icon = SearchX,
    title = emptyStateLabels.title,
    description,
    actions,
    compact = false,
    className,
    slotName = 'empty-state',
}: EmptyStateProps & SlotNameProps) {
    return (
        <div
            data-compact={compact || undefined}
            className={cn(
                'flex h-full w-full flex-col items-center justify-center text-center',
                compact ? 'gap-2 px-4 py-6' : 'gap-3 px-6 py-12',
                className,
            )}
            data-slot={slotName}
        >
            <span
                data-slot="empty-state-icon"
                className={cn(
                    'flex shrink-0 items-center justify-center rounded-full bg-surface-recessed text-muted-foreground',
                    compact ? 'size-8' : 'size-10',
                )}
            >
                <Icon className={compact ? 'size-4' : 'size-5'} />
            </span>
            <div
                className={cn(
                    'max-w-md flex flex-col',
                    compact ? 'gap-0.5' : 'gap-1',
                )}
            >
                <p
                    data-slot="empty-state-title"
                    className={cn(
                        'font-semibold text-foreground',
                        compact ? 'text-sm' : 'text-base',
                    )}
                >
                    {title}
                </p>
                {description && (
                    <p
                        data-slot="empty-state-description"
                        className="text-sm font-medium text-muted-foreground"
                    >
                        {description}
                    </p>
                )}
            </div>
            {actions && (
                <div
                    data-slot="empty-state-actions"
                    className={cn(
                        'gap-2 flex flex-wrap items-center justify-center',
                        compact ? 'mt-1' : 'mt-2',
                    )}
                >
                    {actions}
                </div>
            )}
        </div>
    );
}
