'use client';

import { XIcon } from 'lucide-react';
import { Dialog as DialogPrimitive } from 'radix-ui';
import * as React from 'react';

import {
    FloatingSheetEdgesContext,
    FloatingSheetReportEdgesContext,
    floatingSheetDefaultEdges,
    type FloatingSheetEdges,
} from '@/components/ui/floating-sheet-context';
import { useFloatingSheetBodyEdges } from '@/hooks/use-floating-sheet-body-edges';
import {
    glassBubble,
    glassPress,
    modalScrim,
    modalSurface,
    scrollEdgeTransition,
    scrollShadowFromBottom,
    scrollShadowFromTop,
} from '@/lib/language';
import { trackOrigin } from '@/lib/motion/origin-element';
import { OverlayBackdrop, OverlayPresence } from '@/lib/motion/overlay-motion';
import {
    OverlayOpenProvider,
    useOverlayForceMount,
    useOverlayState,
} from '@/lib/motion/overlay-state';
import { ZoomSurface } from '@/lib/motion/zoom-surface';
import { cn } from '@/lib/utils';
import { useUiLabels } from '@/locales/context';
import type { SlotNameProps } from '@/types';

export interface DialogLabels {
    closeLabel: string;
}

export const dialogDefaultLabels: DialogLabels = {
    closeLabel: 'Close',
};

function Dialog({
    open,
    defaultOpen,
    onOpenChange,
    slotName = 'dialog',
    ...props
}: React.ComponentProps<typeof DialogPrimitive.Root> & SlotNameProps) {
    const state = useOverlayState({ open, defaultOpen, onOpenChange });

    React.useEffect(() => trackOrigin(), []);

    return (
        <OverlayOpenProvider open={state.open}>
            <DialogPrimitive.Root {...props} {...state} data-slot={slotName} />
        </OverlayOpenProvider>
    );
}

function DialogTrigger({
    slotName = 'dialog-trigger',
    ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger> & SlotNameProps) {
    return <DialogPrimitive.Trigger {...props} data-slot={slotName} />;
}

function DialogPortal({
    slotName = 'dialog-portal',
    ...props
}: React.ComponentProps<typeof DialogPrimitive.Portal> & SlotNameProps) {
    return <DialogPrimitive.Portal {...props} data-slot={slotName} />;
}

function DialogClose({
    slotName = 'dialog-close',
    ...props
}: React.ComponentProps<typeof DialogPrimitive.Close> & SlotNameProps) {
    return <DialogPrimitive.Close {...props} data-slot={slotName} />;
}

function DialogOverlay({
    className,
    slotName = 'dialog-overlay',
    ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay> & SlotNameProps) {
    return (
        <DialogPrimitive.Overlay
            asChild
            className={cn(modalScrim, className)}
            {...props}
            data-slot={slotName}
        >
            <OverlayBackdrop />
        </DialogPrimitive.Overlay>
    );
}

interface DialogContentProps extends React.ComponentProps<
    typeof DialogPrimitive.Content
> {
    hideCloseButton?: boolean;
    closeLabel?: string;
}

function DialogContent({
    className,
    children,
    hideCloseButton = false,
    closeLabel,
    slotName = 'dialog-content',
    ...props
}: DialogContentProps & SlotNameProps) {
    const labels = useUiLabels('dialog', dialogDefaultLabels, { closeLabel });
    const forceMount = useOverlayForceMount();
    const [edges, setEdges] = React.useState<FloatingSheetEdges>(
        floatingSheetDefaultEdges,
    );

    return (
        <OverlayPresence>
            <DialogPortal forceMount={forceMount} slotName="dialog-portal">
                <DialogOverlay forceMount={forceMount} />
                <DialogPrimitive.Content
                    forceMount={forceMount}
                    asChild
                    className={cn(
                        `${modalSurface} gap-6 p-6 sm:w-full sm:max-w-lg fixed top-[50%] left-[50%] z-50 flex max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] flex-col overflow-hidden`,
                        className,
                    )}
                    {...props}
                    data-surface=""
                    data-slot={slotName}
                >
                    <ZoomSurface>
                        <FloatingSheetReportEdgesContext.Provider
                            value={setEdges}
                        >
                            <FloatingSheetEdgesContext.Provider value={edges}>
                                {children}
                            </FloatingSheetEdgesContext.Provider>
                        </FloatingSheetReportEdgesContext.Provider>
                        {!hideCloseButton && (
                            <DialogPrimitive.Close
                                className={`top-6 right-6 size-8 absolute z-50 flex items-center justify-center rounded-full pointer-coarse:size-target ${glassBubble} ${glassPress} text-muted-foreground hover:text-foreground disabled:pointer-events-none`}
                            >
                                <XIcon className="size-icon" />
                                <span className="sr-only">
                                    {labels.closeLabel}
                                </span>
                            </DialogPrimitive.Close>
                        )}
                    </ZoomSurface>
                </DialogPrimitive.Content>
            </DialogPortal>
        </OverlayPresence>
    );
}

function DialogHeader({
    className,
    slotName = 'dialog-header',
    ...props
}: React.ComponentProps<'div'> & SlotNameProps) {
    const edges = React.useContext(FloatingSheetEdgesContext);

    return (
        <div
            className={cn(
                'gap-2 p-6 md:p-8 relative z-10 flex flex-col text-center',
                scrollEdgeTransition,
                !edges.top && scrollShadowFromTop,
                className,
            )}
            {...props}
            data-slot={slotName}
        />
    );
}

function DialogBody({
    className,
    children,
    slotName = 'dialog-body',
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
            className={cn(
                'gap-4 px-6 md:px-8 min-h-0 flex flex-col overflow-y-auto',
                className,
            )}
            {...props}
            data-slot={slotName}
        >
            <div
                ref={topSentinelRef}
                aria-hidden="true"
                data-slot="dialog-top-sentinel"
                className="h-0"
            />
            {children}
            <div
                ref={bottomSentinelRef}
                aria-hidden="true"
                data-slot="dialog-bottom-sentinel"
                className="h-0"
            />
        </div>
    );
}

function DialogFooter({
    className,
    slotName = 'dialog-footer',
    ...props
}: React.ComponentProps<'div'> & SlotNameProps) {
    const edges = React.useContext(FloatingSheetEdgesContext);

    return (
        <div
            className={cn(
                'gap-3 p-6 md:p-8 sm:flex-row sm:justify-end relative z-10 flex flex-col-reverse',
                scrollEdgeTransition,
                !edges.bottom && scrollShadowFromBottom,
                className,
            )}
            {...props}
            data-slot={slotName}
        />
    );
}

function DialogTitle({
    className,
    slotName = 'dialog-title',
    ...props
}: React.ComponentProps<typeof DialogPrimitive.Title> & SlotNameProps) {
    return (
        <DialogPrimitive.Title
            className={cn(
                'text-2xl font-bold tracking-tight md:text-3xl text-foreground',
                className,
            )}
            {...props}
            data-slot={slotName}
        />
    );
}

function DialogDescription({
    className,
    slotName = 'dialog-description',
    ...props
}: React.ComponentProps<typeof DialogPrimitive.Description> & SlotNameProps) {
    return (
        <DialogPrimitive.Description
            className={cn(
                'text-base font-medium leading-relaxed text-muted-foreground',
                className,
            )}
            {...props}
            data-slot={slotName}
        />
    );
}

export {
    Dialog,
    DialogBody,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogOverlay,
    DialogPortal,
    DialogTitle,
    DialogTrigger,
};
