import { Slot } from '@radix-ui/react-slot';
import * as React from 'react';

import { cn } from '@/lib/utils';
import type { SlotNameProps } from '@/types';

function SidebarMenuSub({
    className,
    slotName = 'sidebar-menu-sub',
    ...props
}: React.ComponentProps<'ul'> & SlotNameProps) {
    return (
        <ul
            data-sidebar="menu-sub"
            className={cn(
                'mx-3.5 min-w-0 gap-1 px-2.5 py-0.5 flex translate-x-px flex-col border-l border-sidebar-border',
                'group-data-[collapsible=icon]:hidden',
                className,
            )}
            {...props}
            data-slot={slotName}
        />
    );
}

function SidebarMenuSubItem({
    className,
    slotName = 'sidebar-menu-sub-item',
    ...props
}: React.ComponentProps<'li'> & SlotNameProps) {
    return (
        <li
            data-sidebar="menu-sub-item"
            className={cn('group/menu-sub-item relative', className)}
            {...props}
            data-slot={slotName}
        />
    );
}

function SidebarMenuSubButton({
    asChild = false,
    size = 'md',
    isActive = false,
    className,
    slotName = 'sidebar-menu-sub-button',
    ...props
}: React.ComponentProps<'a'> & {
    asChild?: boolean;
    size?: 'sm' | 'md';
    isActive?: boolean;
} & SlotNameProps) {
    const Comp = asChild ? Slot : 'a';

    return (
        <Comp
            data-sidebar="menu-sub-button"
            data-size={size}
            data-active={isActive}
            className={cn(
                'h-9 min-w-0 gap-2 px-2 text-sm font-medium [&>svg]:size-4 rounded-xl flex -translate-x-px items-center overflow-hidden text-sidebar-foreground ring-sidebar-ring outline-hidden hover:bg-accent hover:text-accent-foreground focus-visible:outline-1 focus-visible:outline-offset-0 focus-visible:outline-ring focus-visible:outline-solid active:bg-accent disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:shrink-0 [&>svg]:text-current',
                'data-[active=true]:font-semibold data-[active=true]:bg-primary/10 data-[active=true]:text-primary',
                size === 'sm' && 'h-9 text-sm',
                size === 'md' && 'h-9 text-sm',
                'group-data-[collapsible=icon]:hidden',
                className,
            )}
            {...props}
            data-slot={slotName}
        />
    );
}

export { SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem };
