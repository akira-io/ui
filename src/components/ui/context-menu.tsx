'use client';

import { CheckIcon, CircleIcon } from 'lucide-react';
import { ContextMenu as ContextMenuPrimitive } from 'radix-ui';
import * as React from 'react';

import { useSheetPortalContainer } from '@/hooks/use-sheet-portal-container';
import { menuSurface } from '@/lib/language';
import { OverlayPresence, OverlaySurface } from '@/lib/motion/overlay-motion';
import {
    OverlayOpenProvider,
    useOverlayForceMount,
    useOverlayState,
} from '@/lib/motion/overlay-state';
import { cn } from '@/lib/utils';
import type { SlotNameProps } from '@/types';

function ContextMenu({
    open,
    onOpenChange,
    slotName = 'context-menu',
    ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Root> & SlotNameProps) {
    const state = useOverlayState({ open, onOpenChange });

    return (
        <OverlayOpenProvider open={state.open}>
            <ContextMenuPrimitive.Root
                {...props}
                {...state}
                data-slot={slotName}
            />
        </OverlayOpenProvider>
    );
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

function ContextMenuRadioGroup({
    slotName = 'context-menu-radio-group',
    ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.RadioGroup> &
    SlotNameProps) {
    return <ContextMenuPrimitive.RadioGroup {...props} data-slot={slotName} />;
}

function ContextMenuContent({
    className,
    children,
    slotName = 'context-menu-content',
    container,
    ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Content> &
    SlotNameProps & { container?: HTMLElement | null }) {
    const portalContainer = useSheetPortalContainer(container);
    const forceMount = useOverlayForceMount();

    return (
        <OverlayPresence>
            <ContextMenuPrimitive.Portal
                container={portalContainer}
                forceMount={forceMount}
            >
                <ContextMenuPrimitive.Content
                    forceMount={forceMount}
                    asChild
                    className={cn(
                        `${menuSurface} p-1.5 z-50 max-h-(--radix-context-menu-content-available-height) min-w-[8rem] origin-(--radix-context-menu-content-transform-origin) overflow-x-hidden overflow-y-auto`,
                        className,
                    )}
                    {...props}
                    data-surface=""
                    data-slot={slotName}
                >
                    <OverlaySurface>{children}</OverlaySurface>
                </ContextMenuPrimitive.Content>
            </ContextMenuPrimitive.Portal>
        </OverlayPresence>
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
    ContextMenuTrigger,
};

export {
    ContextMenuSub,
    ContextMenuSubContent,
    ContextMenuSubTrigger,
} from '@/components/ui/context-menu-sub';
