import * as TabsPrimitive from '@radix-ui/react-tabs';
import * as React from 'react';

import {
    elevatedSurface,
    focusRing,
    glassBubble,
    nestedSurfaceReset,
} from '@/lib/language';
import { assignRefs } from '@/lib/motion/assign-refs';
import { useLensDrag } from '@/lib/motion/use-lens-drag';
import { useSlidingIndicator } from '@/lib/motion/use-sliding-indicator';
import { cn } from '@/lib/utils';
import type { SlotNameProps } from '@/types';

const Tabs = React.forwardRef<
    React.ElementRef<typeof TabsPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root> & SlotNameProps
>(({ slotName = 'tabs', ...props }, ref) => (
    <TabsPrimitive.Root ref={ref} {...props} data-slot={slotName} />
));
Tabs.displayName = TabsPrimitive.Root.displayName;

const TabsList = React.forwardRef<
    React.ElementRef<typeof TabsPrimitive.List>,
    React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> & SlotNameProps
>(({ className, children, slotName = 'tabs-list', ...props }, ref) => {
    const list = React.useRef<HTMLDivElement>(null);
    const pill = React.useRef<HTMLSpanElement>(null);
    const composedRef = React.useMemo(() => assignRefs(list, ref), [ref]);

    useSlidingIndicator(list, pill, '[data-state="active"]');
    useLensDrag(list, pill, '[data-slot="tabs-trigger"]');

    return (
        <TabsPrimitive.List
            ref={composedRef}
            className={cn(
                'p-0.5 relative isolate inline-flex h-control touch-pan-y items-center justify-center rounded-full bg-muted text-muted-foreground',
                className,
            )}
            {...props}
            data-slot={slotName}
        >
            <span
                ref={pill}
                aria-hidden="true"
                data-slot="tabs-indicator"
                className={cn(
                    glassBubble,
                    'top-0 left-0 absolute -z-10 rounded-full transition-[scale] duration-500 ease-spring data-[dragging]:scale-x-110 data-[dragging]:scale-y-[1.18] data-[dragging]:duration-200 motion-reduce:transition-none',
                )}
            />
            {children}
        </TabsPrimitive.List>
    );
});
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
    React.ElementRef<typeof TabsPrimitive.Trigger>,
    React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> & SlotNameProps
>(({ className, slotName = 'tabs-trigger', ...props }, ref) => (
    <TabsPrimitive.Trigger
        ref={ref}
        className={cn(
            `font-normal data-[state=active]:font-semibold inline-flex h-full items-center justify-center gap-item rounded-full px-inset text-control whitespace-nowrap transition-all icon-weight-medium disabled:pointer-events-none disabled:opacity-50 data-[state=active]:text-foreground data-[state=active]:icon-weight-semibold [&_svg:not([class*='size-'])]:size-icon ${focusRing}`,
            className,
        )}
        {...props}
        data-slot={slotName}
    />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
    React.ElementRef<typeof TabsPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content> &
        SlotNameProps & { padding?: 'default' | 'none' }
>(
    (
        { className, padding = 'default', slotName = 'tabs-content', ...props },
        ref,
    ) => (
        <TabsPrimitive.Content
            ref={ref}
            className={cn(
                elevatedSurface,
                nestedSurfaceReset,
                `mt-2 ${focusRing}`,
                padding === 'none' ? '' : 'p-5',
                className,
            )}
            {...props}
            data-slot={slotName}
        />
    ),
);
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsContent, TabsList, TabsTrigger };
