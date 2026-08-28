'use client';

import { CheckIcon, ChevronRightIcon, CircleIcon } from 'lucide-react';
import { ContextMenu as ContextMenuPrimitive } from 'radix-ui';
import * as React from 'react';

import { useSheetPortalContainer } from '@/hooks/use-sheet-portal-container';
import { menuSurface } from '@/lib/language';
import { cn } from '@/lib/utils';
import type { SlotNameProps } from '@/types';

function ContextMenu({
    slotName = 'context-menu',
    ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Root> & SlotNameProps) {
    return <ContextMenuPrimitive.Root {...props} data-slot={slotName} />;
}

function ContextMenuTrigger({
    slotName = 'context-menu-trigger',
    ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Trigger> & SlotNameProps) {
    return <ContextMenuPrimitive.Trigger {...props} data-slot={slotName} />;
}

function ContextMenuGroup({
    slotName = 'context-menu-group',
    ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Group> & SlotNameProps) {
    return <ContextMenuPrimitive.Group {...props} data-slot={slotName} />;
}

function ContextMenuPortal({
    slotName = 'context-menu-portal',
    ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Portal> & SlotNameProps) {
    return <ContextMenuPrimitive.Portal {...props} data-slot={slotName} />;
}

function ContextMenuSub({
    slotName = 'context-menu-sub',
    ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Sub> & SlotNameProps) {
    return <ContextMenuPrimitive.Sub {...props} data-slot={slotName} />;
}

function ContextMenuRadioGroup({
    slotName = 'context-menu-radio-group',
    ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.RadioGroup> &
    SlotNameProps) {
    return <ContextMenuPrimitive.RadioGroup {...props} data-slot={slotName} />;
}

function ContextMenuSubTrigger({
    className,
    inset,
    children,
    slotName = 'context-menu-sub-trigger',
    ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.SubTrigger> & {
    inset?: boolean;
} & SlotNameProps) {
    return (
        <ContextMenuPrimitive.SubTrigger
            data-inset={inset}
            className={cn(
                "px-2 py-1.5 text-sm data-[inset]:pl-8 [&_svg:not([class*='size-'])]:size-4 rounded-xl flex cursor-default items-center outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='text-'])]:text-muted-foreground",
                className,
            )}
            {...props}
            data-slot={slotName}
        >
            {children}
            <ChevronRightIcon className="ml-auto" />
        </ContextMenuPrimitive.SubTrigger>
    );
}

function ContextMenuSubContent({
    className,
    slotName = 'context-menu-sub-content',
    ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.SubContent> &
    SlotNameProps) {
    return (
        <ContextMenuPrimitive.SubContent
            className={cn(
                `${menuSurface} p-1.5 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 z-50 min-w-[8rem] origin-(--radix-context-menu-content-transform-origin) overflow-hidden`,
                className,
            )}
            {...props}
            data-slot={slotName}
        />
    );
}

function ContextMenuContent({
    className,
    slotName = 'context-menu-content',
    container,
    ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Content> &
    SlotNameProps & { container?: HTMLElement | null }) {
    const portalContainer = useSheetPortalContainer(container);

    return (
        <ContextMenuPrimitive.Portal container={portalContainer}>
            <ContextMenuPrimitive.Content
                className={cn(
                    `${menuSurface} p-1.5 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 z-50 max-h-(--radix-context-menu-content-available-height) min-w-[8rem] origin-(--radix-context-menu-content-transform-origin) overflow-x-hidden overflow-y-auto`,
                    className,
                )}
                {...props}
                data-slot={slotName}
            />
        </ContextMenuPrimitive.Portal>
    );
}

function ContextMenuItem({
    className,
    inset,
    variant = 'default',
    slotName = 'context-menu-item',
    ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Item> & {
    inset?: boolean;
    variant?: 'default' | 'destructive';
} & SlotNameProps) {
    return (
        <ContextMenuPrimitive.Item
            data-inset={inset}
            data-variant={variant}
            className={cn(
                "gap-2 px-2 py-1.5 text-sm data-[inset]:pl-8 [&_svg:not([class*='size-'])]:size-4 rounded-xl relative flex cursor-default items-center outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='text-'])]:text-muted-foreground data-[variant=destructive]:*:[svg]:text-destructive!",
                className,
            )}
            {...props}
            data-slot={slotName}
        />
    );
}

function ContextMenuCheckboxItem({
    className,
    children,
    checked,
    slotName = 'context-menu-checkbox-item',
    ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.CheckboxItem> &
    SlotNameProps) {
    return (
        <ContextMenuPrimitive.CheckboxItem
            className={cn(
                "gap-2 py-1.5 pr-2 pl-8 text-sm [&_svg:not([class*='size-'])]:size-4 rounded-xl relative flex cursor-default items-center outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
                className,
            )}
            checked={checked}
            {...props}
            data-slot={slotName}
        >
            <span className="left-2 size-3.5 pointer-events-none absolute flex items-center justify-center">
                <ContextMenuPrimitive.ItemIndicator>
                    <CheckIcon className="size-4" />
                </ContextMenuPrimitive.ItemIndicator>
            </span>
            {children}
        </ContextMenuPrimitive.CheckboxItem>
    );
}

function ContextMenuRadioItem({
    className,
    children,
    slotName = 'context-menu-radio-item',
    ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.RadioItem> &
    SlotNameProps) {
    return (
        <ContextMenuPrimitive.RadioItem
            className={cn(
                "gap-2 py-1.5 pr-2 pl-8 text-sm [&_svg:not([class*='size-'])]:size-4 rounded-xl relative flex cursor-default items-center outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
                className,
            )}
            {...props}
            data-slot={slotName}
        >
            <span className="left-2 size-3.5 pointer-events-none absolute flex items-center justify-center">
                <ContextMenuPrimitive.ItemIndicator>
                    <CircleIcon className="size-2 fill-current" />
                </ContextMenuPrimitive.ItemIndicator>
            </span>
            {children}
        </ContextMenuPrimitive.RadioItem>
    );
}

function ContextMenuLabel({
    className,
    inset,
    slotName = 'context-menu-label',
    ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Label> & {
    inset?: boolean;
} & SlotNameProps) {
    return (
        <ContextMenuPrimitive.Label
            data-inset={inset}
            className={cn(
                'px-2 py-1.5 text-sm font-medium data-[inset]:pl-8 text-foreground',
                className,
            )}
            {...props}
            data-slot={slotName}
        />
    );
}

function ContextMenuSeparator({
    className,
    slotName = 'context-menu-separator',
    ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Separator> &
    SlotNameProps) {
    return (
        <ContextMenuPrimitive.Separator
            className={cn('-mx-1 my-1 h-px bg-border', className)}
            {...props}
            data-slot={slotName}
        />
    );
}

function ContextMenuShortcut({
    className,
    slotName = 'context-menu-shortcut',
    ...props
}: React.ComponentProps<'span'> & SlotNameProps) {
    return (
        <span
            className={cn(
                'text-xs tracking-widest ml-auto text-muted-foreground',
                className,
            )}
            {...props}
            data-slot={slotName}
        />
    );
}

export {
    ContextMenu,
    ContextMenuCheckboxItem,
    ContextMenuContent,
    ContextMenuGroup,
    ContextMenuItem,
    ContextMenuLabel,
    ContextMenuPortal,
    ContextMenuRadioGroup,
    ContextMenuRadioItem,
    ContextMenuSeparator,
    ContextMenuShortcut,
    ContextMenuSub,
    ContextMenuSubContent,
    ContextMenuSubTrigger,
    ContextMenuTrigger,
};
