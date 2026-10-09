import { AnimatePresence } from 'motion/react';
import * as React from 'react';
import { createPortal } from 'react-dom';

import {
    floatingSheetDefaultEdges,
    floatingSheetDefaultLabels,
    FloatingSheetEdgesContext,
    FloatingSheetReportEdgesContext,
    useFloatingSheetStack,
    type FloatingSheetEdges,
    type FloatingSheetLabels,
} from '@/components/ui/floating-sheet-context';
import { FloatingSheetPanel } from '@/components/ui/floating-sheet-panel';
import { FloatingSheetStack } from '@/components/ui/floating-sheet-stack';
import { useFloatingSheetBodyEdges } from '@/hooks/use-floating-sheet-body-edges';
import { scrollEdgeTransition, scrollShadowFromBottom } from '@/lib/language';
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
    const close = React.useCallback(() => onOpenChange(false), [onOpenChange]);
    const closeRef = React.useRef(close);
    const titleRef = React.useRef(title);
    const openerRef = React.useRef<Element | null>(null);
    const panelRef = React.useRef<HTMLElement | null>(null);
    const focusedRef = React.useRef(false);
    const lastIndexRef = React.useRef(0);
    const [present, setPresent] = React.useState(open);
    const [edges, setEdges] = React.useState<FloatingSheetEdges>(
        floatingSheetDefaultEdges,
    );

    if (open && !present) {
        setPresent(true);
    }

    React.useEffect(() => {
        closeRef.current = close;
        titleRef.current = title;
    });

    React.useEffect(() => {
        if (!present) {
            return;
        }

        register({
            id,
            title: titleRef.current,
            persistent,
            leaving: !open,
            close: () => closeRef.current(),
        });
    }, [open, present, id, persistent, register]);

    React.useEffect(() => {
        if (!present) {
            return;
        }

        return () => unregister(id);
    }, [present, id, unregister]);

    const live = entries.filter((entry) => !entry.leaving);
    const liveIndex = live.findIndex((entry) => entry.id === id);
    const depth = liveIndex === -1 ? 0 : live.length - 1 - liveIndex;
    const isTop = liveIndex !== -1 && depth === 0;
    const index = liveIndex === -1 ? lastIndexRef.current : liveIndex;

    React.useEffect(() => {
        lastIndexRef.current = index;
    }, [index]);

    React.useEffect(() => {
        if (open) {
            openerRef.current = document.activeElement;
        }
    }, [open]);

    React.useEffect(() => {
        if (present) {
            return;
        }

        const opener = openerRef.current;
        openerRef.current = null;

        if (opener instanceof HTMLElement && document.contains(opener)) {
            opener.focus();
        }
    }, [present]);

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

    if (!present || !container) {
        return null;
    }

    return createPortal(
        <AnimatePresence
            onExitComplete={() => {
                unregister(id);
                setPresent(false);
            }}
        >
            {open ? (
                <FloatingSheetPanel
                    key="panel"
                    ref={panelRef}
                    depth={depth}
                    index={index}
                    isTop={isTop}
                    persistent={persistent}
                    titleId={`${id}-title`}
                    descriptionId={`${id}-description`}
                    title={title}
                    description={description}
                    labels={labels}
                    edges={edges}
                    onEdgesChange={setEdges}
                    onClose={close}
                    onCloseAll={closeAll}
                    slotName={slotName}
                    className={className}
                    {...props}
                >
                    {children}
                </FloatingSheetPanel>
            ) : null}
        </AnimatePresence>,
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
