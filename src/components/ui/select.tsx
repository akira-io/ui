import * as SelectPrimitive from '@radix-ui/react-select';
import {
    CheckIcon,
    ChevronDownIcon,
    ChevronsUpDownIcon,
    ChevronUpIcon,
} from 'lucide-react';
import * as React from 'react';

import { useSheetPortalContainer } from '@/hooks/use-sheet-portal-container';
import { fieldFocus, fieldSurface, menuSurface } from '@/lib/language';
import { OverlaySurface } from '@/lib/motion/overlay-motion';
import { cn } from '@/lib/utils';
import type { SlotNameProps } from '@/types';

function Select({
    slotName = 'select',
    ...props
}: React.ComponentProps<typeof SelectPrimitive.Root> & SlotNameProps) {
    return <SelectPrimitive.Root {...props} data-slot={slotName} />;
}

function SelectGroup({
    slotName = 'select-group',
    ...props
}: React.ComponentProps<typeof SelectPrimitive.Group> & SlotNameProps) {
    return <SelectPrimitive.Group {...props} data-slot={slotName} />;
}

function SelectValue({
    slotName = 'select-value',
    ...props
}: React.ComponentProps<typeof SelectPrimitive.Value> & SlotNameProps) {
    return <SelectPrimitive.Value {...props} data-slot={slotName} />;
}

function SelectTrigger({
    className,
    children,
    slotName = 'select-trigger',
    ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> & SlotNameProps) {
    return (
        <SelectPrimitive.Trigger
            className={cn(
                `${fieldSurface} flex h-control w-full items-center justify-between px-inset transition-shadow disabled:opacity-50 aria-invalid:ring-[3px] aria-invalid:ring-destructive/20 data-[placeholder]:text-muted-foreground *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-item [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-icon [&>span]:line-clamp-1 ${fieldFocus}`,
                className,
            )}
            {...props}
            data-slot={slotName}
        >
            {children}
            <SelectPrimitive.Icon asChild>
                <ChevronsUpDownIcon className="size-icon text-muted-foreground" />
            </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>
    );
}

function SelectContent({
    className,
    children,
    position = 'popper',
    slotName = 'select-content',
    container,
    ...props
}: React.ComponentProps<typeof SelectPrimitive.Content> &
    SlotNameProps & { container?: HTMLElement | null }) {
    const portalContainer = useSheetPortalContainer(container);

    return (
        <SelectPrimitive.Portal container={portalContainer}>
            <SelectPrimitive.Content
                asChild
                className={cn(
                    `${menuSurface} max-h-96 relative z-50 min-w-[8rem] overflow-hidden`,
                    position === 'popper'
                        ? 'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1 origin-(--radix-select-content-transform-origin)'
                        : 'origin-top',
                    className,
                )}
                position={position}
                {...props}
                data-surface=""
                data-slot={slotName}
            >
                <OverlaySurface>
                    <SelectScrollUpButton />
                    <SelectPrimitive.Viewport
                        className={cn(
                            'p-1',
                            position === 'popper' &&
                                'scroll-my-1 h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]',
                        )}
                    >
                        {children}
                    </SelectPrimitive.Viewport>
                    <SelectScrollDownButton />
                </OverlaySurface>
            </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
    );
}

function SelectLabel({
    className,
    slotName = 'select-label',
    ...props
}: React.ComponentProps<typeof SelectPrimitive.Label> & SlotNameProps) {
    return (
        <SelectPrimitive.Label
            className={cn(
                'px-2 py-1.5 text-xs font-medium tracking-wider text-muted-foreground uppercase',
                className,
            )}
            {...props}
            data-slot={slotName}
        />
    );
}

function SelectItem({
    className,
    children,
    slotName = 'select-item',
    ...props
}: React.ComponentProps<typeof SelectPrimitive.Item> & SlotNameProps) {
    return (
        <SelectPrimitive.Item
            className={cn(
                "gap-2 rounded-xl py-1.5 pr-8 pl-2 text-sm *:[span]:last:gap-2 focus:font-semibold relative flex w-full cursor-default items-center outline-hidden select-none focus:bg-accent focus:text-accent-foreground focus:icon-weight-semibold data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-icon [&_svg:not([class*='text-'])]:text-muted-foreground *:[span]:last:flex *:[span]:last:items-center",
                className,
            )}
            {...props}
            data-slot={slotName}
        >
            <span className="right-2 size-3.5 absolute flex items-center justify-center">
                <SelectPrimitive.ItemIndicator>
                    <CheckIcon className="size-icon" />
                </SelectPrimitive.ItemIndicator>
            </span>
            <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
        </SelectPrimitive.Item>
    );
}

function SelectSeparator({
    className,
    slotName = 'select-separator',
    ...props
}: React.ComponentProps<typeof SelectPrimitive.Separator> & SlotNameProps) {
    return (
        <SelectPrimitive.Separator
            className={cn(
                '-mx-1 my-1 pointer-events-none h-px bg-border',
                className,
            )}
            {...props}
            data-slot={slotName}
        />
    );
}

function SelectScrollUpButton({
    className,
    slotName = 'select-scroll-up-button',
    ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton> &
    SlotNameProps) {
    return (
        <SelectPrimitive.ScrollUpButton
            className={cn(
                'py-1 flex cursor-default items-center justify-center',
                className,
            )}
            {...props}
            data-slot={slotName}
        >
            <ChevronUpIcon className="size-icon" />
        </SelectPrimitive.ScrollUpButton>
    );
}

function SelectScrollDownButton({
    className,
    slotName = 'select-scroll-down-button',
    ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton> &
    SlotNameProps) {
    return (
        <SelectPrimitive.ScrollDownButton
            className={cn(
                'py-1 flex cursor-default items-center justify-center',
                className,
            )}
            {...props}
            data-slot={slotName}
        >
            <ChevronDownIcon className="size-icon" />
        </SelectPrimitive.ScrollDownButton>
    );
}

export {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectScrollDownButton,
    SelectScrollUpButton,
    SelectSeparator,
    SelectTrigger,
    SelectValue,
};
