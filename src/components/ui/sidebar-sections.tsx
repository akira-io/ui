import { Slot } from '@radix-ui/react-slot';
import * as React from 'react';

import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import type { SlotNameProps } from '@/types';

function SidebarInput({
    className,
    slotName = 'sidebar-input',
    ...props
}: React.ComponentProps<typeof Input> & SlotNameProps) {
    return (
        <Input
            data-sidebar="input"
            className={cn('h-11 w-full bg-background shadow-none', className)}
            {...props}
            slotName={slotName}
        />
    );
}

function SidebarHeader({
    className,
    slotName = 'sidebar-header',
    ...props
}: React.ComponentProps<'div'> & SlotNameProps) {
    return (
        <div
            data-sidebar="header"
            className={cn(
                'gap-2 p-2 group-data-[collapsible=icon]:px-0 flex flex-col',
                className,
            )}
            {...props}
            data-slot={slotName}
        />
    );
}

function SidebarFooter({
    className,
    slotName = 'sidebar-footer',
    ...props
}: React.ComponentProps<'div'> & SlotNameProps) {
    return (
        <div
            data-sidebar="footer"
            className={cn(
                'gap-2 p-2 group-data-[collapsible=icon]:px-0 flex flex-col pb-[max(0.5rem,env(safe-area-inset-bottom))]',
                className,
            )}
            {...props}
            data-slot={slotName}
        />
    );
}

function SidebarSeparator({
    className,
    slotName = 'sidebar-separator',
    ...props
}: React.ComponentProps<typeof Separator> & SlotNameProps) {
    return (
        <Separator
            data-sidebar="separator"
            className={cn('mx-2 w-auto bg-sidebar-border', className)}
            {...props}
            slotName={slotName}
        />
    );
}

function SidebarContent({
    className,
    slotName = 'sidebar-content',
    ...props
}: React.ComponentProps<'div'> & SlotNameProps) {
    return (
        <div
            data-sidebar="content"
            className={cn(
                'min-h-0 gap-2 flex flex-1 flex-col overflow-auto group-data-[collapsible=icon]:overflow-hidden',
                className,
            )}
            {...props}
            data-slot={slotName}
        />
    );
}

function SidebarGroup({
    className,
    slotName = 'sidebar-group',
    ...props
}: React.ComponentProps<'div'> & SlotNameProps) {
    return (
        <div
            data-sidebar="group"
            className={cn(
                'min-w-0 p-2 group-data-[collapsible=icon]:px-0 relative flex w-full flex-col',
                className,
            )}
            {...props}
            data-slot={slotName}
        />
    );
}

function SidebarGroupLabel({
    className,
    asChild = false,
    slotName = 'sidebar-group-label',
    ...props
}: React.ComponentProps<'div'> & { asChild?: boolean } & SlotNameProps) {
    const Comp = asChild ? Slot : 'div';

    return (
        <Comp
            data-sidebar="group-label"
            className={cn(
                'h-8 rounded-xl px-2 text-xs font-medium tracking-wider [&>svg]:size-4 flex shrink-0 items-center text-sidebar-foreground/70 uppercase ring-sidebar-ring outline-hidden transition-[margin,opacity] duration-200 ease-linear focus-visible:outline-1 focus-visible:outline-offset-0 focus-visible:outline-ring focus-visible:outline-solid [&>svg]:shrink-0',
                'group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:pointer-events-none group-data-[collapsible=icon]:opacity-0 group-data-[collapsible=icon]:select-none',
                className,
            )}
            {...props}
            data-slot={slotName}
        />
    );
}

function SidebarGroupAction({
    className,
    asChild = false,
    slotName = 'sidebar-group-action',
    ...props
}: React.ComponentProps<'button'> & { asChild?: boolean } & SlotNameProps) {
    const Comp = asChild ? Slot : 'button';

    return (
        <Comp
            data-sidebar="group-action"
            className={cn(
                'top-3.5 right-3 w-5 p-0 [&>svg]:size-4 rounded-xl absolute flex aspect-square items-center justify-center text-sidebar-foreground ring-sidebar-ring outline-hidden transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:outline-1 focus-visible:outline-offset-0 focus-visible:outline-ring focus-visible:outline-solid [&>svg]:shrink-0',
                // Increases the hit area of the button on mobile.
                'after:-inset-2 md:after:hidden after:absolute',
                'group-data-[collapsible=icon]:hidden',
                className,
            )}
            {...props}
            data-slot={slotName}
        />
    );
}

function SidebarGroupContent({
    className,
    slotName = 'sidebar-group-content',
    ...props
}: React.ComponentProps<'div'> & SlotNameProps) {
    return (
        <div
            data-sidebar="group-content"
            className={cn('text-sm w-full', className)}
            {...props}
            data-slot={slotName}
        />
    );
}

export {
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupAction,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarInput,
    SidebarSeparator,
};
