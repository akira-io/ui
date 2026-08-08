import * as TabsPrimitive from '@radix-ui/react-tabs';
import * as React from 'react';

import { elevatedSurface, focusRing, nestedSurfaceReset } from '@/lib/language';
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
>(({ className, slotName = 'tabs-list', ...props }, ref) => (
    <TabsPrimitive.List
        ref={ref}
        className={cn(
            'h-11 p-1.5 rounded-2xl inline-flex items-center justify-center bg-muted text-muted-foreground',
            className,
        )}
        {...props}
        data-slot={slotName}
    />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
    React.ElementRef<typeof TabsPrimitive.Trigger>,
    React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> & SlotNameProps
>(({ className, slotName = 'tabs-trigger', ...props }, ref) => (
    <TabsPrimitive.Trigger
        ref={ref}
        className={cn(
            `px-4 text-sm font-medium data-[state=active]:shadow-sm h-8 rounded-xl data-[state=active]:font-semibold inline-flex items-center justify-center whitespace-nowrap transition-all disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-tab-active data-[state=active]:text-foreground ${focusRing}`,
            className,
        )}
        {...props}
        data-slot={slotName}
    />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
    React.ElementRef<typeof TabsPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content> & SlotNameProps
>(({ className, slotName = 'tabs-content', ...props }, ref) => (
    <TabsPrimitive.Content
        ref={ref}
        className={cn(
            elevatedSurface,
            nestedSurfaceReset,
            `mt-2 p-5 bg-card ${focusRing}`,
            className,
        )}
        {...props}
        data-slot={slotName}
    />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsContent, TabsList, TabsTrigger };
