'use client';

import { ChevronRightIcon } from 'lucide-react';
import { ContextMenu as ContextMenuPrimitive } from 'radix-ui';
import * as React from 'react';

import { useSheetPortalContainer } from '@/hooks/use-sheet-portal-container';
import { menuSurface } from '@/lib/language';
import { OverlayPresence, OverlaySurface } from '@/lib/motion/overlay-motion';
import {
    OverlayOpenProvider,
    useOverlayForceMount,
    useOverlayState,
} from '@/lib/motion/overlay-state';
import { cn } from '@/lib/utils';
import type { SlotNameProps } from '@/types';

function ContextMenuSub({
    open,
    defaultOpen,
    onOpenChange,
    slotName = 'context-menu-sub',
    ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Sub> & SlotNameProps) {
    const state = useOverlayState({ open, defaultOpen, onOpenChange });

    return (
        <OverlayOpenProvider open={state.open}>
            <ContextMenuPrimitive.Sub
                {...props}
                {...state}
                data-slot={slotName}
            />
        </OverlayOpenProvider>
    );
}

function ContextMenuSubTrigger({
    className,
    inset,
    children,
    slotName = 'context-menu-sub-trigger',
    ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.SubTrigger> & {
    inset?: boolean;
} & SlotNameProps) {
    return (
        <ContextMenuPrimitive.SubTrigger
            data-inset={inset}
            className={cn(
                "px-2 py-1.5 text-sm data-[inset]:pl-8 [&_svg:not([class*='size-'])]:size-4 rounded-xl flex cursor-default items-center outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='text-'])]:text-muted-foreground",
                className,
            )}
            {...props}
            data-slot={slotName}
        >
            {children}
            <ChevronRightIcon className="ml-auto" />
        </ContextMenuPrimitive.SubTrigger>
    );
}

function ContextMenuSubContent({
    className,
    children,
    slotName = 'context-menu-sub-content',
    container,
    ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.SubContent> &
    SlotNameProps & { container?: HTMLElement | null }) {
    const portalContainer = useSheetPortalContainer(container);
    const forceMount = useOverlayForceMount();

    return (
        <OverlayPresence>
            <ContextMenuPrimitive.Portal
                container={portalContainer}
                forceMount={forceMount}
            >
                <ContextMenuPrimitive.SubContent
                    forceMount={forceMount}
                    asChild
                    className={cn(
                        `${menuSurface} p-1.5 z-50 min-w-[8rem] origin-(--radix-context-menu-content-transform-origin) overflow-hidden`,
                        className,
                    )}
                    {...props}
                    data-surface=""
                    data-slot={slotName}
                >
                    <OverlaySurface>{children}</OverlaySurface>
                </ContextMenuPrimitive.SubContent>
            </ContextMenuPrimitive.Portal>
        </OverlayPresence>
    );
}

export { ContextMenuSub, ContextMenuSubContent, ContextMenuSubTrigger };
