import * as SheetPrimitive from '@radix-ui/react-dialog';
import { XIcon } from 'lucide-react';
import * as React from 'react';

import { floatingSurface, focusRing, modalScrim } from '@/lib/language';
import { OverlayBackdrop, OverlayPresence } from '@/lib/motion/overlay-motion';
import {
    OverlayOpenProvider,
    useOverlayForceMount,
    useOverlayState,
} from '@/lib/motion/overlay-state';
import { SlideSurface } from '@/lib/motion/slide-surface';
import { cn } from '@/lib/utils';
import { useUiLabels } from '@/locales/context';
import type { SlotNameProps } from '@/types';

export interface SheetLabels {
    closeLabel: string;
}

export const sheetDefaultLabels: SheetLabels = {
    closeLabel: 'Close',
};

const SheetDismissContext = React.createContext<(() => void) | undefined>(
    undefined,
);

function Sheet({
    open,
    defaultOpen,
    preserveScroll = false,
    onOpenChange: onOpenChangeProp,
    slotName = 'sheet',
    ...props
}: React.ComponentProps<typeof SheetPrimitive.Root> & {
    preserveScroll?: boolean;
} & SlotNameProps) {
    const scrollPosition = React.useRef(0);
    const state = useOverlayState({
        open,
        defaultOpen,
        onOpenChange: onOpenChangeProp,
    });

    const onOpenChange = (next: boolean) => {
        if (preserveScroll && next) {
            scrollPosition.current = window.scrollY;
        }

        if (preserveScroll && !next) {
            setTimeout(() => {
                window.scrollTo(0, scrollPosition.current);
            }, 0);
        }

        state.onOpenChange(next);
    };

    return (
        <OverlayOpenProvider open={state.open}>
            <SheetDismissContext.Provider value={() => onOpenChange(false)}>
                <SheetPrimitive.Root
                    {...props}
                    open={state.open}
                    onOpenChange={onOpenChange}
                    data-slot={slotName}
                />
            </SheetDismissContext.Provider>
        </OverlayOpenProvider>
    );
}

function SheetTrigger({
    slotName = 'sheet-trigger',
    ...props
}: React.ComponentProps<typeof SheetPrimitive.Trigger> & SlotNameProps) {
    return <SheetPrimitive.Trigger {...props} data-slot={slotName} />;
}

function SheetClose({
    slotName = 'sheet-close',
    ...props
}: React.ComponentProps<typeof SheetPrimitive.Close> & SlotNameProps) {
    return <SheetPrimitive.Close {...props} data-slot={slotName} />;
}

function SheetPortal({
    slotName = 'sheet-portal',
    ...props
}: React.ComponentProps<typeof SheetPrimitive.Portal> & SlotNameProps) {
    return <SheetPrimitive.Portal {...props} data-slot={slotName} />;
}

function SheetOverlay({
    className,
    slotName = 'sheet-overlay',
    ...props
}: React.ComponentProps<typeof SheetPrimitive.Overlay> & SlotNameProps) {
    return (
        <SheetPrimitive.Overlay
            asChild
            className={cn(modalScrim, className)}
            {...props}
            data-slot={slotName}
        >
            <OverlayBackdrop />
        </SheetPrimitive.Overlay>
    );
}

function SheetContent({
    className,
    children,
    side = 'right',
    closeLabel,
    slotName = 'sheet-content',
    ...props
}: React.ComponentProps<typeof SheetPrimitive.Content> & {
    side?: 'top' | 'right' | 'bottom' | 'left';
    closeLabel?: string;
} & SlotNameProps) {
    const labels = useUiLabels('sheet', sheetDefaultLabels, { closeLabel });
    const forceMount = useOverlayForceMount();
    const dismiss = React.useContext(SheetDismissContext);

    return (
        <OverlayPresence>
            <SheetPortal forceMount={forceMount}>
                <SheetOverlay forceMount={forceMount} />
                <SheetPrimitive.Content
                    forceMount={forceMount}
                    asChild
                    className={cn(
                        `${floatingSurface} gap-4 fixed z-50 flex flex-col`,
                        side === 'right' &&
                            'inset-y-0 right-0 sm:max-w-sm rounded-l-3xl h-full w-3/4 border-l border-border',
                        side === 'left' &&
                            'inset-y-0 left-0 sm:max-w-sm rounded-r-3xl h-full w-3/4 border-r border-border',
                        side === 'top' &&
                            'inset-x-0 top-0 rounded-b-3xl h-auto border-b border-border',
                        side === 'bottom' &&
                            'inset-x-0 bottom-0 rounded-t-3xl h-auto border-t border-border',
                        className,
                    )}
                    {...props}
                    data-surface=""
                    data-slot={slotName}
                >
                    <SlideSurface side={side} onDismiss={dismiss}>
                        {children}
                        <SheetPrimitive.Close
                            className={cn(
                                'top-4 right-4 size-9 shadow-xs absolute flex items-center justify-center rounded-full border border-border bg-muted text-muted-foreground transition-colors hover:bg-accent hover:text-foreground disabled:pointer-events-none',
                                focusRing,
                            )}
                        >
                            <XIcon className="size-4" />
                            <span className="sr-only">{labels.closeLabel}</span>
                        </SheetPrimitive.Close>
                    </SlideSurface>
                </SheetPrimitive.Content>
            </SheetPortal>
        </OverlayPresence>
    );
}

function SheetHeader({
    className,
    slotName = 'sheet-header',
    ...props
}: React.ComponentProps<'div'> & SlotNameProps) {
    return (
        <div
            className={cn('gap-1.5 p-4 flex flex-col', className)}
            {...props}
            data-slot={slotName}
        />
    );
}

function SheetFooter({
    className,
    slotName = 'sheet-footer',
    ...props
}: React.ComponentProps<'div'> & SlotNameProps) {
    return (
        <div
            className={cn('gap-2 p-4 mt-auto flex flex-col', className)}
            {...props}
            data-slot={slotName}
        />
    );
}

function SheetTitle({
    className,
    slotName = 'sheet-title',
    ...props
}: React.ComponentProps<typeof SheetPrimitive.Title> & SlotNameProps) {
    return (
        <SheetPrimitive.Title
            className={cn('font-semibold text-foreground', className)}
            {...props}
            data-slot={slotName}
        />
    );
}

function SheetDescription({
    className,
    slotName = 'sheet-description',
    ...props
}: React.ComponentProps<typeof SheetPrimitive.Description> & SlotNameProps) {
    return (
        <SheetPrimitive.Description
            className={cn('text-sm text-muted-foreground', className)}
            {...props}
            data-slot={slotName}
        />
    );
}

export {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
};
