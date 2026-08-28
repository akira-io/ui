'use client';

import { HoverCard as HoverCardPrimitive } from 'radix-ui';
import * as React from 'react';

import { useSheetPortalContainer } from '@/hooks/use-sheet-portal-container';
import { panelSurface } from '@/lib/language';
import { cn } from '@/lib/utils';
import type { SlotNameProps } from '@/types';

function HoverCard({
    slotName = 'hover-card',
    ...props
}: React.ComponentProps<typeof HoverCardPrimitive.Root> & SlotNameProps) {
    return <HoverCardPrimitive.Root {...props} data-slot={slotName} />;
}

function HoverCardTrigger({
    slotName = 'hover-card-trigger',
    ...props
}: React.ComponentProps<typeof HoverCardPrimitive.Trigger> & SlotNameProps) {
    return <HoverCardPrimitive.Trigger {...props} data-slot={slotName} />;
}

function HoverCardContent({
    className,
    align = 'center',
    sideOffset = 4,
    slotName = 'hover-card-content',
    container,
    ...props
}: React.ComponentProps<typeof HoverCardPrimitive.Content> &
    SlotNameProps & { container?: HTMLElement | null }) {
    const portalContainer = useSheetPortalContainer(container);

    return (
        <HoverCardPrimitive.Portal
            container={portalContainer}
            data-slot="hover-card-portal"
        >
            <HoverCardPrimitive.Content
                align={align}
                sideOffset={sideOffset}
                className={cn(
                    `${panelSurface} w-64 p-4 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 z-50 origin-(--radix-hover-card-content-transform-origin) bg-popover/90 outline-hidden`,
                    className,
                )}
                {...props}
                data-slot={slotName}
            />
        </HoverCardPrimitive.Portal>
    );
}

export { HoverCard, HoverCardContent, HoverCardTrigger };
