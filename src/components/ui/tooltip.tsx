import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import * as React from 'react';

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
    slotName = 'tooltip',
    ...props
}: React.ComponentProps<typeof TooltipPrimitive.Root> & SlotNameProps) {
    return (
        <TooltipProvider>
            <TooltipPrimitive.Root {...props} data-slot={slotName} />
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
    ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content> & SlotNameProps) {
    return (
        <TooltipPrimitive.Portal>
            <TooltipPrimitive.Content
                sideOffset={sideOffset}
                className={cn(
                    'animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 max-w-sm px-3 py-1.5 text-xs shadow-2xl rounded-xl z-50 bg-primary text-primary-foreground',
                    className,
                )}
                {...props}
                data-slot={slotName}
            >
                {children}
                <TooltipPrimitive.Arrow className="size-2.5 z-50 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px] bg-primary fill-primary" />
            </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
    );
}

export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger };
