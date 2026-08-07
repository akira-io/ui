import { CheckIcon, ChevronRightIcon, CircleIcon } from 'lucide-react';
import { Menubar as MenubarPrimitive } from 'radix-ui';
import * as React from 'react';

import { menuSurface } from '@/lib/language';
import { cn } from '@/lib/utils';
import type { SlotNameProps } from '@/types';

function Menubar({
    className,
    slotName = 'menubar',
    ...props
}: React.ComponentProps<typeof MenubarPrimitive.Root> & SlotNameProps) {
    return (
        <MenubarPrimitive.Root
            className={cn(
                'h-9 gap-1 p-1 shadow-sm backdrop-blur-xl rounded-2xl flex items-center border border-border bg-card/60',
                className,
            )}
            {...props}
            data-slot={slotName}
        />
    );
}

function MenubarMenu({
    slotName = 'menubar-menu',
    ...props
}: React.ComponentProps<typeof MenubarPrimitive.Menu> & SlotNameProps) {
    return <MenubarPrimitive.Menu {...props} data-slot={slotName} />;
}

function MenubarGroup({
    slotName = 'menubar-group',
    ...props
}: React.ComponentProps<typeof MenubarPrimitive.Group> & SlotNameProps) {
    return <MenubarPrimitive.Group {...props} data-slot={slotName} />;
}

function MenubarPortal({
    slotName = 'menubar-portal',
    ...props
}: React.ComponentProps<typeof MenubarPrimitive.Portal> & SlotNameProps) {
    return <MenubarPrimitive.Portal {...props} data-slot={slotName} />;
}

function MenubarRadioGroup({
    slotName = 'menubar-radio-group',
    ...props
}: React.ComponentProps<typeof MenubarPrimitive.RadioGroup> & SlotNameProps) {
    return <MenubarPrimitive.RadioGroup {...props} data-slot={slotName} />;
}

function MenubarTrigger({
    className,
    slotName = 'menubar-trigger',
    ...props
}: React.ComponentProps<typeof MenubarPrimitive.Trigger> & SlotNameProps) {
    return (
        <MenubarPrimitive.Trigger
            className={cn(
                'px-2 py-1 text-sm font-medium rounded-xl flex items-center outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground',
                className,
            )}
            {...props}
            data-slot={slotName}
        />
    );
}

function MenubarContent({
    className,
    align = 'start',
    alignOffset = -4,
    sideOffset = 8,
    slotName = 'menubar-content',
    ...props
}: React.ComponentProps<typeof MenubarPrimitive.Content> & SlotNameProps) {
    return (
        <MenubarPortal>
            <MenubarPrimitive.Content
                align={align}
                alignOffset={alignOffset}
                sideOffset={sideOffset}
                className={cn(
                    `${menuSurface} p-1.5 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 z-50 min-w-[12rem] origin-(--radix-menubar-content-transform-origin) overflow-hidden`,
                    className,
                )}
                {...props}
                data-slot={slotName}
            />
        </MenubarPortal>
    );
}

function MenubarItem({
    className,
    inset,
    variant = 'default',
    slotName = 'menubar-item',
    ...props
}: React.ComponentProps<typeof MenubarPrimitive.Item> & {
    inset?: boolean;
    variant?: 'default' | 'destructive';
} & SlotNameProps) {
    return (
        <MenubarPrimitive.Item
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

function MenubarCheckboxItem({
    className,
    children,
    checked,
    slotName = 'menubar-checkbox-item',
    ...props
}: React.ComponentProps<typeof MenubarPrimitive.CheckboxItem> & SlotNameProps) {
    return (
        <MenubarPrimitive.CheckboxItem
            className={cn(
                "gap-2 rounded-xl py-1.5 pr-2 pl-8 text-sm [&_svg:not([class*='size-'])]:size-4 relative flex cursor-default items-center outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
                className,
            )}
            checked={checked}
            {...props}
            data-slot={slotName}
        >
            <span className="left-2 size-3.5 pointer-events-none absolute flex items-center justify-center">
                <MenubarPrimitive.ItemIndicator>
                    <CheckIcon className="size-4" />
                </MenubarPrimitive.ItemIndicator>
            </span>
            {children}
        </MenubarPrimitive.CheckboxItem>
    );
}

function MenubarRadioItem({
    className,
    children,
    slotName = 'menubar-radio-item',
    ...props
}: React.ComponentProps<typeof MenubarPrimitive.RadioItem> & SlotNameProps) {
    return (
        <MenubarPrimitive.RadioItem
            className={cn(
                "gap-2 rounded-xl py-1.5 pr-2 pl-8 text-sm [&_svg:not([class*='size-'])]:size-4 relative flex cursor-default items-center outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
                className,
            )}
            {...props}
            data-slot={slotName}
        >
            <span className="left-2 size-3.5 pointer-events-none absolute flex items-center justify-center">
                <MenubarPrimitive.ItemIndicator>
                    <CircleIcon className="size-2 fill-current" />
                </MenubarPrimitive.ItemIndicator>
            </span>
            {children}
        </MenubarPrimitive.RadioItem>
    );
}

function MenubarLabel({
    className,
    inset,
    slotName = 'menubar-label',
    ...props
}: React.ComponentProps<typeof MenubarPrimitive.Label> & {
    inset?: boolean;
} & SlotNameProps) {
    return (
        <MenubarPrimitive.Label
            data-inset={inset}
            className={cn(
                'px-2 py-1.5 text-sm font-medium data-[inset]:pl-8',
                className,
            )}
            {...props}
            data-slot={slotName}
        />
    );
}

function MenubarSeparator({
    className,
    slotName = 'menubar-separator',
    ...props
}: React.ComponentProps<typeof MenubarPrimitive.Separator> & SlotNameProps) {
    return (
        <MenubarPrimitive.Separator
            className={cn('-mx-1 my-1 h-px bg-border', className)}
            {...props}
            data-slot={slotName}
        />
    );
}

function MenubarShortcut({
    className,
    slotName = 'menubar-shortcut',
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

function MenubarSub({
    slotName = 'menubar-sub',
    ...props
}: React.ComponentProps<typeof MenubarPrimitive.Sub> & SlotNameProps) {
    return <MenubarPrimitive.Sub {...props} data-slot={slotName} />;
}

function MenubarSubTrigger({
    className,
    inset,
    children,
    slotName = 'menubar-sub-trigger',
    ...props
}: React.ComponentProps<typeof MenubarPrimitive.SubTrigger> & {
    inset?: boolean;
} & SlotNameProps) {
    return (
        <MenubarPrimitive.SubTrigger
            data-inset={inset}
            className={cn(
                'px-2 py-1.5 text-sm data-[inset]:pl-8 rounded-xl flex cursor-default items-center outline-none select-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground',
                className,
            )}
            {...props}
            data-slot={slotName}
        >
            {children}
            <ChevronRightIcon className="h-4 w-4 ml-auto" />
        </MenubarPrimitive.SubTrigger>
    );
}

function MenubarSubContent({
    className,
    slotName = 'menubar-sub-content',
    ...props
}: React.ComponentProps<typeof MenubarPrimitive.SubContent> & SlotNameProps) {
    return (
        <MenubarPrimitive.SubContent
            className={cn(
                `${menuSurface} p-1.5 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 z-50 min-w-[8rem] origin-(--radix-menubar-content-transform-origin) overflow-hidden`,
                className,
            )}
            {...props}
            data-slot={slotName}
        />
    );
}

export {
    Menubar,
    MenubarCheckboxItem,
    MenubarContent,
    MenubarGroup,
    MenubarItem,
    MenubarLabel,
    MenubarMenu,
    MenubarPortal,
    MenubarRadioGroup,
    MenubarRadioItem,
    MenubarSeparator,
    MenubarShortcut,
    MenubarSub,
    MenubarSubContent,
    MenubarSubTrigger,
    MenubarTrigger,
};
