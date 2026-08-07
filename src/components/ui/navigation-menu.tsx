import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';
import { cva } from 'class-variance-authority';
import { ChevronDownIcon } from 'lucide-react';
import * as React from 'react';

import { panelSurface } from '@/lib/language';
import { cn } from '@/lib/utils';
import type { SlotNameProps } from '@/types';

function NavigationMenu({
    className,
    children,
    viewport = true,
    slotName = 'navigation-menu',
    ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Root> & {
    viewport?: boolean;
} & SlotNameProps) {
    return (
        <NavigationMenuPrimitive.Root
            data-viewport={viewport}
            className={cn(
                'group/navigation-menu relative flex max-w-max flex-1 items-center justify-center',
                className,
            )}
            {...props}
            data-slot={slotName}
        >
            {children}
            {viewport && <NavigationMenuViewport />}
        </NavigationMenuPrimitive.Root>
    );
}

function NavigationMenuList({
    className,
    slotName = 'navigation-menu-list',
    ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.List> & SlotNameProps) {
    return (
        <NavigationMenuPrimitive.List
            className={cn(
                'group gap-1 flex flex-1 list-none items-center justify-center',
                className,
            )}
            {...props}
            data-slot={slotName}
        />
    );
}

function NavigationMenuItem({
    className,
    slotName = 'navigation-menu-item',
    ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Item> & SlotNameProps) {
    return (
        <NavigationMenuPrimitive.Item
            className={cn('relative', className)}
            {...props}
            data-slot={slotName}
        />
    );
}

const navigationMenuTriggerStyle = cva(
    'group inline-flex h-11 w-max items-center justify-center rounded-xl bg-background px-4 text-sm font-medium data-[state=open]:font-semibold hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 data-[active=true]:bg-accent/50 data-[state=open]:bg-accent/50 data-[active=true]:text-accent-foreground transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50',
);

function NavigationMenuTrigger({
    className,
    children,
    slotName = 'navigation-menu-trigger',
    ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Trigger> &
    SlotNameProps) {
    return (
        <NavigationMenuPrimitive.Trigger
            className={cn(navigationMenuTriggerStyle(), 'group', className)}
            {...props}
            data-slot={slotName}
        >
            {children}{' '}
            <ChevronDownIcon
                className="ml-1 size-3 relative top-[1px] transition duration-300 group-data-[state=open]:rotate-180"
                aria-hidden="true"
            />
        </NavigationMenuPrimitive.Trigger>
    );
}

function NavigationMenuContent({
    className,
    slotName = 'navigation-menu-content',
    ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Content> &
    SlotNameProps) {
    return (
        <NavigationMenuPrimitive.Content
            className={cn(
                'data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 top-0 left-0 p-2 pr-2.5 md:absolute md:w-auto w-full',
                'group-data-[viewport=false]/navigation-menu:data-[state=open]:animate-in group-data-[viewport=false]/navigation-menu:data-[state=closed]:animate-out group-data-[viewport=false]/navigation-menu:data-[state=closed]:zoom-out-95 group-data-[viewport=false]/navigation-menu:data-[state=open]:zoom-in-95 group-data-[viewport=false]/navigation-menu:data-[state=open]:fade-in-0 group-data-[viewport=false]/navigation-menu:data-[state=closed]:fade-out-0 group-data-[viewport=false]/navigation-menu:mt-1.5 group-data-[viewport=false]/navigation-menu:shadow-2xl group-data-[viewport=false]/navigation-menu:backdrop-blur-xl group-data-[viewport=false]/navigation-menu:rounded-2xl group-data-[viewport=false]/navigation-menu:top-full group-data-[viewport=false]/navigation-menu:overflow-hidden group-data-[viewport=false]/navigation-menu:border group-data-[viewport=false]/navigation-menu:border-border group-data-[viewport=false]/navigation-menu:bg-popover/90 group-data-[viewport=false]/navigation-menu:text-popover-foreground group-data-[viewport=false]/navigation-menu:duration-200 **:data-[slot=navigation-menu-link]:focus:ring-0 **:data-[slot=navigation-menu-link]:focus:outline-none',
                className,
            )}
            {...props}
            data-slot={slotName}
        />
    );
}

function NavigationMenuViewport({
    className,
    slotName = 'navigation-menu-viewport',
    ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Viewport> &
    SlotNameProps) {
    return (
        <div
            className={cn(
                'left-0 absolute top-full isolate z-50 flex justify-center',
            )}
        >
            <NavigationMenuPrimitive.Viewport
                className={cn(
                    `${panelSurface} origin-top-center data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 mt-1.5 md:w-[var(--radix-navigation-menu-viewport-width)] relative h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden bg-popover/90`,
                    className,
                )}
                {...props}
                data-slot={slotName}
            />
        </div>
    );
}

function NavigationMenuLink({
    className,
    slotName = 'navigation-menu-link',
    ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Link> & SlotNameProps) {
    return (
        <NavigationMenuPrimitive.Link
            className={cn(
                "gap-1 p-2 text-sm [&_svg:not([class*='size-'])]:size-4 rounded-xl data-[active=true]:font-semibold flex flex-col transition-[color,box-shadow] outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 data-[active=true]:bg-accent/50 data-[active=true]:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground",
                className,
            )}
            {...props}
            data-slot={slotName}
        />
    );
}

function NavigationMenuIndicator({
    className,
    slotName = 'navigation-menu-indicator',
    ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Indicator> &
    SlotNameProps) {
    return (
        <NavigationMenuPrimitive.Indicator
            className={cn(
                'data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in h-1.5 top-full z-[1] flex items-end justify-center overflow-hidden',
                className,
            )}
            {...props}
            data-slot={slotName}
        >
            <div className="h-2 w-2 shadow-md rounded-tl-xs relative top-[60%] rotate-45 bg-border" />
        </NavigationMenuPrimitive.Indicator>
    );
}

export {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
    NavigationMenuViewport,
};
