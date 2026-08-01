'use client';

import { Command as CommandPrimitive } from 'cmdk';
import { SearchIcon, SearchXIcon } from 'lucide-react';
import * as React from 'react';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    elevatedSurface,
    fieldSurface,
    modalSurface,
    nestedSurfaceReset,
} from '@/lib/language';
import { cn } from '@/lib/utils';

function Command({
    className,
    ...props
}: React.ComponentProps<typeof CommandPrimitive>) {
    return (
        <CommandPrimitive
            data-slot="command"
            className={cn(
                elevatedSurface,
                nestedSurfaceReset,
                'flex h-full w-full flex-col overflow-hidden bg-card text-card-foreground',
                className,
            )}
            {...props}
        />
    );
}

function CommandDialog({
    title = 'Command Palette',
    description = 'Search for a command to run...',
    children,
    className,
    hideCloseButton = true,
    ...props
}: React.ComponentProps<typeof Dialog> & {
    title?: string;
    description?: string;
    className?: string;
    hideCloseButton?: boolean;
}) {
    return (
        <Dialog {...props}>
            <DialogHeader className="sr-only">
                <DialogTitle>{title}</DialogTitle>
                <DialogDescription>{description}</DialogDescription>
            </DialogHeader>
            <DialogContent
                className={cn(
                    `${modalSurface} gap-0 p-0 overflow-hidden`,
                    className,
                )}
                hideCloseButton={hideCloseButton}
            >
                <Command className="[&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-item]]:py-2.5 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
                    {children}
                </Command>
            </DialogContent>
        </Dialog>
    );
}

function CommandInput({
    className,
    ...props
}: React.ComponentProps<typeof CommandPrimitive.Input>) {
    return (
        <div className="shrink-0 border-b border-border">
            <div
                data-slot="command-input-wrapper"
                className={cn(
                    fieldSurface,
                    'h-11 gap-3 px-4 m-3 flex items-center',
                )}
            >
                <SearchIcon className="size-4 shrink-0 opacity-50" />
                <CommandPrimitive.Input
                    data-slot="command-input"
                    className={cn(
                        'h-11 text-sm font-medium flex w-full bg-transparent outline-hidden placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50',
                        className,
                    )}
                    {...props}
                />
            </div>
        </div>
    );
}

function CommandList({
    className,
    ...props
}: React.ComponentProps<typeof CommandPrimitive.List>) {
    return (
        <CommandPrimitive.List
            data-slot="command-list"
            className={cn(
                'scroll-py-1 max-h-[300px] overflow-x-hidden overflow-y-auto',
                className,
            )}
            {...props}
        />
    );
}

function CommandEmpty({
    className,
    children,
    ...props
}: React.ComponentProps<typeof CommandPrimitive.Empty>) {
    return (
        <CommandPrimitive.Empty
            data-slot="command-empty"
            className={cn(
                'gap-3 px-6 py-10 flex flex-col items-center justify-center text-center',
                className,
            )}
            {...props}
        >
            <span className="size-10 flex items-center justify-center rounded-full bg-surface-recessed text-muted-foreground">
                <SearchXIcon className="size-5" />
            </span>
            <span className="text-sm text-muted-foreground">{children}</span>
        </CommandPrimitive.Empty>
    );
}

function CommandGroup({
    className,
    ...props
}: React.ComponentProps<typeof CommandPrimitive.Group>) {
    return (
        <CommandPrimitive.Group
            data-slot="command-group"
            className={cn(
                'p-3 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium overflow-hidden text-foreground [&_[cmdk-group-heading]]:text-muted-foreground',
                className,
            )}
            {...props}
        />
    );
}

function CommandSeparator({
    className,
    ...props
}: React.ComponentProps<typeof CommandPrimitive.Separator>) {
    return (
        <CommandPrimitive.Separator
            data-slot="command-separator"
            className={cn('mx-3 h-px bg-border', className)}
            {...props}
        />
    );
}

function CommandItem({
    className,
    ...props
}: React.ComponentProps<typeof CommandPrimitive.Item>) {
    return (
        <CommandPrimitive.Item
            data-slot="command-item"
            className={cn(
                "gap-2 px-2 py-1.5 text-sm [&_svg:not([class*='size-'])]:size-4 rounded-xl relative flex cursor-default items-center outline-hidden select-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='text-'])]:text-muted-foreground",
                className,
            )}
            {...props}
        />
    );
}

function CommandShortcut({
    className,
    ...props
}: React.ComponentProps<'span'>) {
    return (
        <span
            data-slot="command-shortcut"
            className={cn(
                'text-xs tracking-widest ml-auto text-muted-foreground',
                className,
            )}
            {...props}
        />
    );
}

export {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
};
