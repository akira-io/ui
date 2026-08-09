import { ArrowLeftIcon, XIcon } from 'lucide-react';
import * as React from 'react';
import { createPortal } from 'react-dom';

import {
    FLOATING_SHEET_OFFSET_LIMIT,
    floatingSheetDefaultEdges,
    floatingSheetDefaultLabels,
    FloatingSheetEdgesContext,
    FloatingSheetReportEdgesContext,
    useFloatingSheetStack,
    type FloatingSheetEdges,
    type FloatingSheetLabels,
} from '@/components/ui/floating-sheet-context';
import { FloatingSheetStack } from '@/components/ui/floating-sheet-stack';
import { useFloatingSheetBodyEdges } from '@/hooks/use-floating-sheet-body-edges';
import {
    focusRing,
    modalSurface,
    scrollEdgeTransition,
    scrollShadowFromBottom,
    scrollShadowFromTop,
} from '@/lib/language';
import { cn } from '@/lib/utils';
import type { SlotNameProps } from '@/types';

function FloatingSheet({
    open,
    onOpenChange,
    title,
    description,
    persistent = false,
    className,
    children,
    slotName = 'floating-sheet',
    ...props
}: Omit<React.ComponentProps<'section'>, 'title'> & {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title: React.ReactNode;
    description?: React.ReactNode;
    persistent?: boolean;
} & SlotNameProps) {
    const { labels, container, entries, register, unregister, closeAll } =
        useFloatingSheetStack();
    const id = React.useId();
    const titleId = `${id}-title`;
    const descriptionId = `${id}-description`;
    const close = React.useCallback(() => onOpenChange(false), [onOpenChange]);
    const closeRef = React.useRef(close);
    const titleRef = React.useRef(title);
    const openerRef = React.useRef<Element | null>(null);
    const panelRef = React.useRef<HTMLElement | null>(null);
    const focusedRef = React.useRef(false);
    const [edges, setEdges] = React.useState<FloatingSheetEdges>(
        floatingSheetDefaultEdges,
    );

    React.useEffect(() => {
        closeRef.current = close;
        titleRef.current = title;
    });

    React.useEffect(() => {
        if (!open) {
            return;
        }

        register({
            id,
            title: titleRef.current,
            persistent,
            close: () => closeRef.current(),
        });
    }, [open, id, persistent, register]);

    React.useEffect(() => {
        if (!open) {
            return;
        }

        return () => unregister(id);
    }, [open, id, unregister]);

    const index = entries.findIndex((entry) => entry.id === id);
    const depth = index === -1 ? 0 : entries.length - 1 - index;
    const isTop = index !== -1 && depth === 0;

    React.useEffect(() => {
        if (open) {
            openerRef.current = document.activeElement;

            return;
        }

        const opener = openerRef.current;
        openerRef.current = null;

        if (opener instanceof HTMLElement && document.contains(opener)) {
            opener.focus();
        }
    }, [open]);

    React.useEffect(() => {
        if (!open) {
            focusedRef.current = false;

            return;
        }

        if (!isTop || focusedRef.current) {
            return;
        }

        focusedRef.current = true;

        const frame = requestAnimationFrame(() => panelRef.current?.focus());

        return () => cancelAnimationFrame(frame);
    }, [open, isTop]);

    if (!open || !container) {
        return null;
    }

    const offset = Math.min(depth, FLOATING_SHEET_OFFSET_LIMIT);

    return createPortal(
        <section
            ref={panelRef}
            data-depth={depth}
            role="dialog"
            aria-labelledby={titleId}
            aria-describedby={description ? descriptionId : undefined}
            tabIndex={-1}
            inert={!isTop}
            style={{
                transform: `translateX(-${offset * 26}px) scale(${1 - offset * 0.035})`,
                zIndex: index,
            }}
            className={cn(
                `${modalSurface} inset-0 ease-out absolute flex flex-col overflow-hidden transition-transform duration-300 outline-none`,
                depth > 0 && 'max-sm:hidden pointer-events-none',
                depth > FLOATING_SHEET_OFFSET_LIMIT && 'hidden',
                className,
            )}
            {...props}
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
                        onClick={close}
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

            <FloatingSheetReportEdgesContext.Provider value={setEdges}>
                <FloatingSheetEdgesContext.Provider value={edges}>
                    {children}
                </FloatingSheetEdgesContext.Provider>
            </FloatingSheetReportEdgesContext.Provider>

            <button
                type="button"
                data-slot="floating-sheet-close"
                aria-label={labels.closeLabel}
                onClick={closeAll}
                className={cn(
                    'top-4 right-4 size-9 shadow-xs absolute z-20 flex items-center justify-center rounded-full border border-border bg-muted text-muted-foreground transition-colors hover:bg-accent hover:text-foreground disabled:pointer-events-none',
                    focusRing,
                )}
            >
                <XIcon className="size-4" />
            </button>
        </section>,
        container,
    );
}

function FloatingSheetBody({
    className,
    slotName = 'floating-sheet-body',
    children,
    ...props
}: React.ComponentProps<'div'> & SlotNameProps) {
    const reportEdges = React.useContext(FloatingSheetReportEdgesContext);
    const containerRef = React.useRef<HTMLDivElement | null>(null);
    const topSentinelRef = React.useRef<HTMLDivElement | null>(null);
    const bottomSentinelRef = React.useRef<HTMLDivElement | null>(null);

    useFloatingSheetBodyEdges(
        containerRef,
        topSentinelRef,
        bottomSentinelRef,
        reportEdges,
    );

    return (
        <div
            ref={containerRef}
            className={cn('p-5 flex-1 overflow-y-auto', className)}
            {...props}
            data-slot={slotName}
        >
            <div
                ref={topSentinelRef}
                aria-hidden="true"
                data-slot="floating-sheet-top-sentinel"
                className="h-0"
            />
            {children}
            <div
                ref={bottomSentinelRef}
                aria-hidden="true"
                data-slot="floating-sheet-bottom-sentinel"
                className="h-0"
            />
        </div>
    );
}

function FloatingSheetFooter({
    className,
    slotName = 'floating-sheet-footer',
    ...props
}: React.ComponentProps<'div'> & SlotNameProps) {
    const edges = React.useContext(FloatingSheetEdgesContext);

    return (
        <div
            className={cn(
                'gap-2 p-5 relative z-10 mt-auto flex items-center justify-end',
                scrollEdgeTransition,
                !edges.bottom && scrollShadowFromBottom,
                className,
            )}
            {...props}
            data-slot={slotName}
        />
    );
}

export {
    FloatingSheet,
    FloatingSheetBody,
    floatingSheetDefaultLabels,
    FloatingSheetFooter,
    FloatingSheetStack,
    type FloatingSheetLabels,
};
