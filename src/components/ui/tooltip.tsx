import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import * as React from 'react';

import { useSheetPortalContainer } from '@/hooks/use-sheet-portal-container';
import { OverlayPresence, OverlaySurface } from '@/lib/motion/overlay-motion';
import {
    OverlayOpenProvider,
    useOverlayForceMount,
    useOverlayState,
} from '@/lib/motion/overlay-state';
import { cn } from '@/lib/utils';
import type { SlotNameProps } from '@/types';

function TooltipProvider({
    delayDuration = 0,
    slotName = 'tooltip-provider',
    ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider> & SlotNameProps) {
    return (
        <TooltipPrimitive.Provider
            delayDuration={delayDuration}
            {...props}
            data-slot={slotName}
        />
    );
}

function Tooltip({
    open,
    defaultOpen,
    onOpenChange,
    slotName = 'tooltip',
    ...props
}: React.ComponentProps<typeof TooltipPrimitive.Root> & SlotNameProps) {
    const state = useOverlayState({ open, defaultOpen, onOpenChange });

    return (
        <TooltipProvider>
            <OverlayOpenProvider open={state.open}>
                <TooltipPrimitive.Root
                    {...props}
                    {...state}
                    data-slot={slotName}
                />
            </OverlayOpenProvider>
        </TooltipProvider>
    );
}

function TooltipTrigger({
    slotName = 'tooltip-trigger',
    ...props
}: React.ComponentProps<typeof TooltipPrimitive.Trigger> & SlotNameProps) {
    return <TooltipPrimitive.Trigger {...props} data-slot={slotName} />;
}

function TooltipContent({
    className,
    sideOffset = 4,
    children,
    slotName = 'tooltip-content',
    container,
    ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content> &
    SlotNameProps & { container?: HTMLElement | null }) {
    const portalContainer = useSheetPortalContainer(container);
    const forceMount = useOverlayForceMount();

    return (
        <OverlayPresence>
            <TooltipPrimitive.Portal
                container={portalContainer}
                forceMount={forceMount}
            >
                <TooltipPrimitive.Content
                    sideOffset={sideOffset}
                    forceMount={forceMount}
                    asChild
                    className={cn(
                        'max-w-sm px-3 py-1.5 text-xs shadow-2xl rounded-xl z-50 origin-(--radix-tooltip-content-transform-origin) bg-primary text-primary-foreground',
                        className,
                    )}
                    {...props}
                    data-slot={slotName}
                >
                    <OverlaySurface>
                        {children}
                        <TooltipPrimitive.Arrow className="size-2.5 z-50 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px] bg-primary fill-primary" />
                    </OverlaySurface>
                </TooltipPrimitive.Content>
            </TooltipPrimitive.Portal>
        </OverlayPresence>
    );
}

export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger };
