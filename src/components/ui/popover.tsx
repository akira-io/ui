import { Popover as PopoverPrimitive } from 'radix-ui';
import * as React from 'react';

import { useSheetPortalContainer } from '@/hooks/use-sheet-portal-container';
import { panelSurface } from '@/lib/language';
import { cn } from '@/lib/utils';
import type { SlotNameProps } from '@/types';

const Popover = PopoverPrimitive.Root;

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
            align = 'center',
            sideOffset = 4,
            slotName = 'popover-content',
            container,
            ...props
        },
        ref,
    ) => {
        const portalContainer = useSheetPortalContainer(container);

        return (
            <PopoverPrimitive.Portal container={portalContainer}>
                <PopoverPrimitive.Content
                    ref={ref}
                    align={align}
                    sideOffset={sideOffset}
                    className={cn(
                        `${panelSurface} p-4 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-full origin-[--radix-popover-content-transform-origin] bg-popover/90 outline-none`,
                        className,
                    )}
                    {...props}
                    data-slot={slotName}
                />
            </PopoverPrimitive.Portal>
        );
    },
);
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export { Popover, PopoverAnchor, PopoverContent, PopoverTrigger };
