import { Popover as PopoverPrimitive } from 'radix-ui';
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

function Popover({
    open,
    defaultOpen,
    onOpenChange,
    ...props
}: React.ComponentProps<typeof PopoverPrimitive.Root>) {
    const state = useOverlayState({ open, defaultOpen, onOpenChange });

    return (
        <OverlayOpenProvider open={state.open}>
            <PopoverPrimitive.Root {...props} {...state} />
        </OverlayOpenProvider>
    );
}

const PopoverTrigger = PopoverPrimitive.Trigger;

const PopoverAnchor = PopoverPrimitive.Anchor;

const PopoverContent = React.forwardRef<
    React.ElementRef<typeof PopoverPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> &
        SlotNameProps & { container?: HTMLElement | null }
>(
    (
        {
            className,
            children,
            align = 'center',
            sideOffset = 4,
            slotName = 'popover-content',
            container,
            ...props
        },
        ref,
    ) => {
        const portalContainer = useSheetPortalContainer(container);
        const forceMount = useOverlayForceMount();

        return (
            <OverlayPresence>
                <PopoverPrimitive.Portal
                    container={portalContainer}
                    forceMount={forceMount}
                >
                    <PopoverPrimitive.Content
                        ref={ref}
                        align={align}
                        sideOffset={sideOffset}
                        forceMount={forceMount}
                        asChild
                        className={cn(
                            `${panelSurface} p-4 z-50 w-full origin-(--radix-popover-content-transform-origin) bg-popover/90 outline-none`,
                            className,
                        )}
                        {...props}
                        data-surface=""
                        data-slot={slotName}
                    >
                        <OverlaySurface>{children}</OverlaySurface>
                    </PopoverPrimitive.Content>
                </PopoverPrimitive.Portal>
            </OverlayPresence>
        );
    },
);
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export { Popover, PopoverAnchor, PopoverContent, PopoverTrigger };
