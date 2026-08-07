import { XIcon } from 'lucide-react';
import { Dialog as DialogPrimitive } from 'radix-ui';
import * as React from 'react';

import { modalSurface } from '@/lib/language';
import { cn } from '@/lib/utils';
import type { SlotNameProps } from '@/types';

function Dialog({
    slotName = 'dialog',
    ...props
}: React.ComponentProps<typeof DialogPrimitive.Root> & SlotNameProps) {
    return <DialogPrimitive.Root {...props} data-slot={slotName} />;
}

function DialogTrigger({
    slotName = 'dialog-trigger',
    ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger> & SlotNameProps) {
    return <DialogPrimitive.Trigger {...props} data-slot={slotName} />;
}

function DialogPortal({
    slotName = 'dialog-portal',
    ...props
}: React.ComponentProps<typeof DialogPrimitive.Portal> & SlotNameProps) {
    return <DialogPrimitive.Portal {...props} data-slot={slotName} />;
}

function DialogClose({
    slotName = 'dialog-close',
    ...props
}: React.ComponentProps<typeof DialogPrimitive.Close> & SlotNameProps) {
    return <DialogPrimitive.Close {...props} data-slot={slotName} />;
}

function DialogOverlay({
    className,
    slotName = 'dialog-overlay',
    ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay> & SlotNameProps) {
    return (
        <DialogPrimitive.Overlay
            className={cn(
                'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 inset-0 bg-black/60 backdrop-blur-sm fixed z-50',
                className,
            )}
            {...props}
            data-slot={slotName}
        />
    );
}

interface DialogContentProps extends React.ComponentProps<
    typeof DialogPrimitive.Content
> {
    hideCloseButton?: boolean;
}

function DialogContent({
    className,
    children,
    hideCloseButton = false,
    slotName = 'dialog-content',
    ...props
}: DialogContentProps & SlotNameProps) {
    return (
        <DialogPortal slotName="dialog-portal">
            <DialogOverlay />
            <DialogPrimitive.Content
                className={cn(
                    `${modalSurface} data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 gap-6 p-6 sm:w-full sm:max-w-lg fixed top-[50%] left-[50%] z-50 grid w-[calc(100%-2rem)] max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] overflow-hidden duration-200`,
                    className,
                )}
                {...props}
                data-slot={slotName}
            >
                {children}
                {!hideCloseButton && (
                    <DialogPrimitive.Close className="top-6 right-6 h-10 w-10 shadow-xs absolute z-50 flex items-center justify-center rounded-full border border-border bg-muted text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
                        <XIcon className="h-5 w-5" />
                        <span className="sr-only">Close</span>
                    </DialogPrimitive.Close>
                )}
            </DialogPrimitive.Content>
        </DialogPortal>
    );
}

function DialogHeader({
    className,
    slotName = 'dialog-header',
    ...props
}: React.ComponentProps<'div'> & SlotNameProps) {
    return (
        <div
            className={cn(
                'gap-2 p-6 md:p-8 flex flex-col text-center',
                className,
            )}
            {...props}
            data-slot={slotName}
        />
    );
}

function DialogFooter({
    className,
    slotName = 'dialog-footer',
    ...props
}: React.ComponentProps<'div'> & SlotNameProps) {
    return (
        <div
            className={cn(
                'gap-3 p-6 md:p-8 sm:flex-row sm:justify-end flex flex-col-reverse border-t border-border',
                className,
            )}
            {...props}
            data-slot={slotName}
        />
    );
}

function DialogTitle({
    className,
    slotName = 'dialog-title',
    ...props
}: React.ComponentProps<typeof DialogPrimitive.Title> & SlotNameProps) {
    return (
        <DialogPrimitive.Title
            className={cn(
                'text-2xl font-bold tracking-tight md:text-3xl text-foreground',
                className,
            )}
            {...props}
            data-slot={slotName}
        />
    );
}

function DialogDescription({
    className,
    slotName = 'dialog-description',
    ...props
}: React.ComponentProps<typeof DialogPrimitive.Description> & SlotNameProps) {
    return (
        <DialogPrimitive.Description
            className={cn(
                'text-base font-medium leading-relaxed text-muted-foreground',
                className,
            )}
            {...props}
            data-slot={slotName}
        />
    );
}

export {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogOverlay,
    DialogPortal,
    DialogTitle,
    DialogTrigger,
};
