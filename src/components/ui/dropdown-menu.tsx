import { CheckIcon, CircleIcon } from 'lucide-react';
import { DropdownMenu as DropdownMenuPrimitive } from 'radix-ui';
import * as React from 'react';

import { useSheetPortalContainer } from '@/hooks/use-sheet-portal-container';
import { menuSurface } from '@/lib/language';
import { MenuLens } from '@/lib/motion/menu-lens';
import { MorphSurface } from '@/lib/motion/morph-surface';
import { OverlayPresence } from '@/lib/motion/overlay-motion';
import {
    isOwnTriggerInteraction,
    OverlayOpenProvider,
    useOverlayForceMount,
    useOverlayState,
} from '@/lib/motion/overlay-state';
import { useOpeningGuard } from '@/lib/motion/use-opening-guard';
import { cn } from '@/lib/utils';
import type { SlotNameProps } from '@/types';

function DropdownMenu({
    modal = false,
    open,
    defaultOpen,
    onOpenChange,
    slotName = 'dropdown-menu',
    ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Root> & SlotNameProps) {
    const state = useOverlayState({ open, defaultOpen, onOpenChange });

    return (
        <OverlayOpenProvider open={state.open}>
            <DropdownMenuPrimitive.Root
                modal={modal}
                {...props}
                {...state}
                data-slot={slotName}
            />
        </OverlayOpenProvider>
    );
}

function DropdownMenuPortal({
    slotName = 'dropdown-menu-portal',
    ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Portal> & SlotNameProps) {
    return <DropdownMenuPrimitive.Portal {...props} data-slot={slotName} />;
}

function DropdownMenuTrigger({
    slotName = 'dropdown-menu-trigger',
    ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Trigger> & SlotNameProps) {
    return <DropdownMenuPrimitive.Trigger {...props} data-slot={slotName} />;
}

function DropdownMenuContent({
    className,
    children,
    sideOffset = 0,
    slotName = 'dropdown-menu-content',
    container,
    onInteractOutside,
    ref,
    ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Content> &
    SlotNameProps & { container?: HTMLElement | null }) {
    const portalContainer = useSheetPortalContainer(container);
    const forceMount = useOverlayForceMount();
    const guard = useOpeningGuard(ref);

    return (
        <OverlayPresence>
            <DropdownMenuPrimitive.Portal
                container={portalContainer}
                forceMount={forceMount}
            >
                <DropdownMenuPrimitive.Content
                    ref={guard.trackOpening}
                    sideOffset={sideOffset}
                    forceMount={forceMount}
                    asChild
                    className={cn(
                        `${menuSurface} p-1.5 relative isolate z-50 min-w-[max(8rem,var(--radix-dropdown-menu-trigger-width))] overflow-hidden data-[side=bottom]:-translate-y-(--radix-dropdown-menu-trigger-height) data-[side=top]:translate-y-(--radix-dropdown-menu-trigger-height)`,
                        className,
                    )}
                    {...props}
                    onPointerMoveCapture={guard.markMoved}
                    onPointerUpCapture={guard.ignoreOpeningRelease}
                    onClickCapture={guard.ignoreOpeningRelease}
                    onInteractOutside={(event) => {
                        if (
                            isOwnTriggerInteraction(
                                event,
                                guard.openedContent(),
                            )
                        ) {
                            event.preventDefault();
                        }

                        onInteractOutside?.(event);
                    }}
                    data-surface=""
                    data-slot={slotName}
                >
                    <MorphSurface data-menu-lens="">
                        <MenuLens />
                        {children}
                    </MorphSurface>
                </DropdownMenuPrimitive.Content>
            </DropdownMenuPrimitive.Portal>
        </OverlayPresence>
    );
}

function DropdownMenuGroup({
    slotName = 'dropdown-menu-group',
    ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Group> & SlotNameProps) {
    return <DropdownMenuPrimitive.Group {...props} data-slot={slotName} />;
}

function DropdownMenuItem({
    className,
    inset,
    variant = 'default',
    slotName = 'dropdown-menu-item',
    ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean;
    variant?: 'default' | 'destructive';
} & SlotNameProps) {
    return (
        <DropdownMenuPrimitive.Item
            data-inset={inset}
            data-variant={variant}
            className={cn(
                "font-medium gap-2 rounded-xl px-2 py-2 text-sm data-[inset]:pl-8 focus:font-semibold relative flex cursor-default items-center outline-hidden transition-all select-none icon-weight-medium focus:text-foreground focus:icon-weight-semibold data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-icon [&_svg:not([class*='text-'])]:text-muted-foreground data-[variant=destructive]:*:[svg]:!text-destructive",
                className,
            )}
            {...props}
            data-slot={slotName}
        />
    );
}

function DropdownMenuCheckboxItem({
    className,
    children,
    checked,
    slotName = 'dropdown-menu-checkbox-item',
    ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem> &
    SlotNameProps) {
    return (
        <DropdownMenuPrimitive.CheckboxItem
            className={cn(
                "gap-2 py-1.5 pr-2 pl-8 text-sm rounded-xl relative flex cursor-default items-center outline-hidden select-none focus:bg-(--glass-highlight) focus:text-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-icon",
                className,
            )}
            checked={checked}
            {...props}
            data-slot={slotName}
        >
            <span className="left-2 size-3.5 pointer-events-none absolute flex items-center justify-center">
                <DropdownMenuPrimitive.ItemIndicator>
                    <CheckIcon className="size-icon" />
                </DropdownMenuPrimitive.ItemIndicator>
            </span>
            {children}
        </DropdownMenuPrimitive.CheckboxItem>
    );
}

function DropdownMenuRadioGroup({
    slotName = 'dropdown-menu-radio-group',
    ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioGroup> &
    SlotNameProps) {
    return <DropdownMenuPrimitive.RadioGroup {...props} data-slot={slotName} />;
}

function DropdownMenuRadioItem({
    className,
    children,
    slotName = 'dropdown-menu-radio-item',
    ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioItem> &
    SlotNameProps) {
    return (
        <DropdownMenuPrimitive.RadioItem
            className={cn(
                "gap-2 py-1.5 pr-2 pl-8 text-sm rounded-xl relative flex cursor-default items-center outline-hidden select-none focus:bg-(--glass-highlight) focus:text-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-icon",
                className,
            )}
            {...props}
            data-slot={slotName}
        >
            <span className="left-2 size-3.5 pointer-events-none absolute flex items-center justify-center">
                <DropdownMenuPrimitive.ItemIndicator>
                    <CircleIcon className="size-2 fill-current" />
                </DropdownMenuPrimitive.ItemIndicator>
            </span>
            {children}
        </DropdownMenuPrimitive.RadioItem>
    );
}

function DropdownMenuLabel({
    className,
    inset,
    slotName = 'dropdown-menu-label',
    ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean;
} & SlotNameProps) {
    return (
        <DropdownMenuPrimitive.Label
            data-inset={inset}
            className={cn(
                'px-2 py-2 text-xs font-medium tracking-wider data-[inset]:pl-8 text-muted-foreground uppercase',
                className,
            )}
            {...props}
            data-slot={slotName}
        />
    );
}

function DropdownMenuSeparator({
    className,
    slotName = 'dropdown-menu-separator',
    ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Separator> &
    SlotNameProps) {
    return (
        <DropdownMenuPrimitive.Separator
            className={cn('-mx-1 my-1 h-px bg-border', className)}
            {...props}
            data-slot={slotName}
        />
    );
}

function DropdownMenuShortcut({
    className,
    slotName = 'dropdown-menu-shortcut',
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
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
};

export {
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
} from '@/components/ui/dropdown-menu-sub';
