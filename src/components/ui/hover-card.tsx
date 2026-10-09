'use client';

import { HoverCard as HoverCardPrimitive } from 'radix-ui';
import * as React from 'react';

import { useSheetPortalContainer } from '@/hooks/use-sheet-portal-container';
import { panelSurface } from '@/lib/language';
import { OverlayPresence, OverlaySurface } from '@/lib/motion/overlay-motion';
import {
    OverlayOpenProvider,
    useOverlayForceMount,
    useOverlayState,
} from '@/lib/motion/overlay-state';
import { cn } from '@/lib/utils';
import type { SlotNameProps } from '@/types';

function HoverCard({
    open,
    defaultOpen,
    onOpenChange,
    slotName = 'hover-card',
    ...props
}: React.ComponentProps<typeof HoverCardPrimitive.Root> & SlotNameProps) {
    const state = useOverlayState({ open, defaultOpen, onOpenChange });

    return (
        <OverlayOpenProvider open={state.open}>
            <HoverCardPrimitive.Root
                {...props}
                {...state}
                data-slot={slotName}
            />
        </OverlayOpenProvider>
    );
}

function HoverCardTrigger({
    slotName = 'hover-card-trigger',
    ...props
}: React.ComponentProps<typeof HoverCardPrimitive.Trigger> & SlotNameProps) {
    return <HoverCardPrimitive.Trigger {...props} data-slot={slotName} />;
}

function HoverCardContent({
    className,
    children,
    align = 'center',
    sideOffset = 4,
    slotName = 'hover-card-content',
    container,
    ...props
}: React.ComponentProps<typeof HoverCardPrimitive.Content> &
    SlotNameProps & { container?: HTMLElement | null }) {
    const portalContainer = useSheetPortalContainer(container);
    const forceMount = useOverlayForceMount();

    return (
        <OverlayPresence>
            <HoverCardPrimitive.Portal
                container={portalContainer}
                forceMount={forceMount}
                data-slot="hover-card-portal"
            >
                <HoverCardPrimitive.Content
                    align={align}
                    sideOffset={sideOffset}
                    forceMount={forceMount}
                    asChild
                    className={cn(
                        `${panelSurface} w-64 p-4 z-50 origin-(--radix-hover-card-content-transform-origin) bg-popover/90 outline-hidden`,
                        className,
                    )}
                    {...props}
                    data-surface=""
                    data-slot={slotName}
                >
                    <OverlaySurface>{children}</OverlaySurface>
                </HoverCardPrimitive.Content>
            </HoverCardPrimitive.Portal>
        </OverlayPresence>
    );
}

export { HoverCard, HoverCardContent, HoverCardTrigger };
