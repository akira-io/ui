import { ArrowLeftIcon, XIcon } from 'lucide-react';
import * as React from 'react';

import {
    FLOATING_SHEET_OFFSET_LIMIT,
    FloatingSheetEdgesContext,
    FloatingSheetReportEdgesContext,
    type FloatingSheetEdges,
    type FloatingSheetLabels,
} from '@/components/ui/floating-sheet-context';
import {
    focusRing,
    modalSurface,
    scrollEdgeTransition,
    scrollShadowFromTop,
} from '@/lib/language';
import { assignRefs } from '@/lib/motion/assign-refs';
import { useSlideFromSide } from '@/lib/motion/use-slide-from-side';
import { useSwipeToDismiss } from '@/lib/motion/use-swipe-to-dismiss';
import { cn } from '@/lib/utils';
import type { SlotNameProps } from '@/types';

export interface FloatingSheetPanelProps
    extends Omit<React.ComponentProps<'section'>, 'title'>, SlotNameProps {
    depth: number;
    index: number;
    isTop: boolean;
    persistent: boolean;
    titleId: string;
    descriptionId: string;
    title: React.ReactNode;
    description?: React.ReactNode;
    labels: FloatingSheetLabels;
    edges: FloatingSheetEdges;
    onEdgesChange: (edges: FloatingSheetEdges) => void;
    onClose: () => void;
    onCloseAll: () => void;
}

export const FloatingSheetPanel = React.forwardRef<
    HTMLElement,
    FloatingSheetPanelProps
>(function FloatingSheetPanel(
    {
        depth,
        index,
        isTop,
        persistent,
        titleId,
        descriptionId,
        title,
        description,
        labels,
        edges,
        onEdgesChange,
        onClose,
        onCloseAll,
        slotName = 'floating-sheet',
        className,
        children,
        ...props
    },
    forwardedRef,
) {
    const ref = React.useRef<HTMLElement>(null);
    const composedRef = React.useMemo(
        () => assignRefs(ref, forwardedRef),
        [forwardedRef],
    );
    const offset = Math.min(depth, FLOATING_SHEET_OFFSET_LIMIT);

    useSlideFromSide(ref, 'right', {
        offset: -offset * 26,
        scale: 1 - offset * 0.035,
    });
    useSwipeToDismiss(ref, {
        side: 'right',
        enabled: isTop,
        dismissible: !persistent,
        onDismiss: onClose,
    });

    return (
        <section
            ref={composedRef}
            data-depth={depth}
            role="dialog"
            aria-labelledby={titleId}
            aria-describedby={description ? descriptionId : undefined}
            tabIndex={-1}
            inert={!isTop}
            style={{ zIndex: index }}
            className={cn(
                `${modalSurface} inset-0 absolute flex flex-col overflow-hidden outline-none`,
                depth > 0 && 'max-sm:hidden pointer-events-none',
                depth > FLOATING_SHEET_OFFSET_LIMIT && 'hidden',
                className,
            )}
            {...props}
            data-surface=""
            data-slot={slotName}
        >
            <header
                data-slot="floating-sheet-header"
                className={cn(
                    'gap-1 p-5 relative z-10 flex flex-col',
                    scrollEdgeTransition,
                    !edges.top && scrollShadowFromTop,
                )}
            >
                {index > 0 ? (
                    <button
                        type="button"
                        data-slot="floating-sheet-back"
                        onClick={onClose}
                        className={cn(
                            'gap-2 h-8 -ml-2 px-2 text-sm font-medium inline-flex w-fit items-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground',
                            focusRing,
                        )}
                    >
                        <ArrowLeftIcon className="size-4" />
                        {labels.backLabel}
                    </button>
                ) : null}

                <h2
                    id={titleId}
                    data-slot="floating-sheet-title"
                    className="pr-10 text-lg font-semibold text-foreground"
                >
                    {title}
                </h2>

                {description ? (
                    <p
                        id={descriptionId}
                        data-slot="floating-sheet-description"
                        className="text-sm text-muted-foreground"
                    >
                        {description}
                    </p>
                ) : null}
            </header>

            <FloatingSheetReportEdgesContext.Provider value={onEdgesChange}>
                <FloatingSheetEdgesContext.Provider value={edges}>
                    {children}
                </FloatingSheetEdgesContext.Provider>
            </FloatingSheetReportEdgesContext.Provider>

            <button
                type="button"
                data-slot="floating-sheet-close"
                aria-label={labels.closeLabel}
                onClick={onCloseAll}
                className={cn(
                    'top-4 right-4 size-9 shadow-xs absolute z-20 flex items-center justify-center rounded-full border border-border bg-muted text-muted-foreground transition-colors hover:bg-accent hover:text-foreground disabled:pointer-events-none',
                    focusRing,
                )}
            >
                <XIcon className="size-4" />
            </button>
        </section>
    );
});
