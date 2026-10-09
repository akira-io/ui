'use client';

import {
    AnimatePresence,
    domAnimation,
    LazyMotion,
    m,
    useReducedMotion,
} from 'motion/react';
import * as React from 'react';

import {
    emptyStateScenes,
    type EmptyStateScene,
    type EmptyStateSceneTitleKey,
} from '@/components/ui/empty-state-scenes';
import { useMeasuredHeight } from '@/hooks/use-measured-height';
import { overlayTransition } from '@/lib/motion/tokens';
import { useStrokeDraw } from '@/lib/motion/use-stroke-draw';
import { cn } from '@/lib/utils';
import { useUiLabels } from '@/locales/context';
import type { SlotNameProps } from '@/types';
import { SearchX, type LucideIcon } from 'lucide-react';
import { type ReactNode } from 'react';

export type { EmptyStateScene } from '@/components/ui/empty-state-scenes';

export interface EmptyStateLabels extends Record<
    EmptyStateSceneTitleKey,
    string
> {
    title: string;
}

export const emptyStateLabels: EmptyStateLabels = {
    title: 'Nothing to show',
    noResultsTitle: 'No results',
    emptyTitle: 'Nothing here yet',
    offlineTitle: "You're offline",
    errorTitle: 'Something went wrong',
    caughtUpTitle: "You're all caught up",
    notFoundTitle: 'Not found',
};

export interface EmptyStateProps {
    scene?: EmptyStateScene;
    icon?: LucideIcon;
    title?: string;
    description?: string;
    actions?: ReactNode;
    compact?: boolean;
    className?: string;
}

function EmptyStateGlyph({
    icon: Icon,
    compact,
}: {
    icon: LucideIcon;
    compact: boolean;
}) {
    const ref = React.useRef<HTMLSpanElement>(null);

    useStrokeDraw(ref);

    return (
        <m.span
            ref={ref}
            className="flex"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
                opacity: 1,
                scale: 1,
                transition: overlayTransition.enter,
            }}
            exit={{
                opacity: 0,
                scale: 0.8,
                transition: overlayTransition.exit,
            }}
        >
            <Icon className={compact ? 'size-4' : 'size-5'} />
        </m.span>
    );
}

export function EmptyState({
    scene,
    icon,
    title,
    description,
    actions,
    compact = false,
    className,
    slotName = 'empty-state',
}: EmptyStateProps & SlotNameProps) {
    const labels = useUiLabels('emptyState', emptyStateLabels);
    const sceneEntry = scene ? emptyStateScenes[scene] : undefined;
    const Icon = icon ?? sceneEntry?.icon ?? SearchX;
    const heading =
        title ?? (sceneEntry ? labels[sceneEntry.titleKey] : labels.title);
    const textRef = React.useRef<HTMLDivElement>(null);
    const textHeight = useMeasuredHeight(textRef);
    const reduced = useReducedMotion() ?? false;

    return (
        <LazyMotion features={domAnimation}>
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
                    <AnimatePresence mode="wait" initial={false}>
                        <EmptyStateGlyph
                            key={scene ?? Icon.displayName ?? 'icon'}
                            icon={Icon}
                            compact={compact}
                        />
                    </AnimatePresence>
                </span>
                <m.div
                    className="max-w-md w-full overflow-hidden"
                    initial={false}
                    animate={{ height: textHeight ?? 'auto' }}
                    transition={
                        reduced ? { duration: 0 } : overlayTransition.enter
                    }
                >
                    <div
                        ref={textRef}
                        className={cn(
                            'flex flex-col',
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
                            {heading}
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
                </m.div>
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
        </LazyMotion>
    );
}
