import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import * as React from 'react';

import {
    elevatedSurface,
    nestedEdgeToEdge,
    nestedSurfaceReset,
} from '@/lib/language';
import { cn } from '@/lib/utils';
import type { SlotNameProps } from '@/types';

const ScrollArea = React.forwardRef<
    React.ElementRef<typeof ScrollAreaPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root> &
        SlotNameProps
>(({ className, children, slotName = 'scroll-area', ...props }, ref) => (
    <ScrollAreaPrimitive.Root
        ref={ref}
        className={cn(
            elevatedSurface,
            nestedSurfaceReset,
            nestedEdgeToEdge,
            'relative overflow-hidden bg-card',
            className,
        )}
        {...props}
        data-slot={slotName}
    >
        <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit]">
            {children}
        </ScrollAreaPrimitive.Viewport>
        <ScrollBar />
        <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
));
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;

const ScrollBar = React.forwardRef<
    React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
    React.ComponentPropsWithoutRef<
        typeof ScrollAreaPrimitive.ScrollAreaScrollbar
    > &
        SlotNameProps
>(
    (
        {
            className,
            orientation = 'vertical',
            slotName = 'scroll-area-scrollbar',
            ...props
        },
        ref,
    ) => (
        <ScrollAreaPrimitive.ScrollAreaScrollbar
            ref={ref}
            orientation={orientation}
            className={cn(
                'flex touch-none transition-colors select-none',
                orientation === 'vertical' &&
                    'w-2.5 h-full border-l border-l-transparent p-[1px]',
                orientation === 'horizontal' &&
                    'h-2.5 flex-col border-t border-t-transparent p-[1px]',
                className,
            )}
            {...props}
            data-slot={slotName}
        >
            <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-full bg-border" />
        </ScrollAreaPrimitive.ScrollAreaScrollbar>
    ),
);
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;

export { ScrollArea, ScrollBar };
