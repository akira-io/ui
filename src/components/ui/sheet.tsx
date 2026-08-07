import * as SheetPrimitive from '@radix-ui/react-dialog';
import { XIcon } from 'lucide-react';
import * as React from 'react';

import { floatingSurface, focusRing } from '@/lib/language';
import { cn } from '@/lib/utils';
import type { SlotNameProps } from '@/types';

function Sheet({
    preserveScroll = false,
    onOpenChange: onOpenChangeProp,
    slotName = 'sheet',
    ...props
}: React.ComponentProps<typeof SheetPrimitive.Root> & {
    preserveScroll?: boolean;
} & SlotNameProps) {
    const scrollPosition = React.useRef(0);

    const onOpenChange = (open: boolean) => {
        if (preserveScroll) {
            if (open) {
                scrollPosition.current = window.scrollY;
            } else {
                setTimeout(() => {
                    window.scrollTo(0, scrollPosition.current);
                }, 0);
            }
        }

        onOpenChangeProp?.(open);
    };

    return (
        <SheetPrimitive.Root
            {...props}
            onOpenChange={onOpenChange}
            data-slot={slotName}
        />
    );
}

function SheetTrigger({
    slotName = 'sheet-trigger',
    ...props
}: React.ComponentProps<typeof SheetPrimitive.Trigger> & SlotNameProps) {
    return <SheetPrimitive.Trigger {...props} data-slot={slotName} />;
}

function SheetClose({
    slotName = 'sheet-close',
    ...props
}: React.ComponentProps<typeof SheetPrimitive.Close> & SlotNameProps) {
    return <SheetPrimitive.Close {...props} data-slot={slotName} />;
}

function SheetPortal({
    slotName = 'sheet-portal',
    ...props
}: React.ComponentProps<typeof SheetPrimitive.Portal> & SlotNameProps) {
    return <SheetPrimitive.Portal {...props} data-slot={slotName} />;
}

function SheetOverlay({
    className,
    slotName = 'sheet-overlay',
    ...props
}: React.ComponentProps<typeof SheetPrimitive.Overlay> & SlotNameProps) {
    return (
        <SheetPrimitive.Overlay
            className={cn(
                'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 inset-0 bg-black/60 backdrop-blur-sm fixed z-50',
                className,
            )}
            {...props}
            data-slot={slotName}
        />
    );
}

function SheetContent({
    className,
    children,
    side = 'right',
    slotName = 'sheet-content',
    ...props
}: React.ComponentProps<typeof SheetPrimitive.Content> & {
    side?: 'top' | 'right' | 'bottom' | 'left';
} & SlotNameProps) {
    return (
        <SheetPortal>
            <SheetOverlay />
            <SheetPrimitive.Content
                className={cn(
                    `${floatingSurface} data-[state=open]:animate-in data-[state=closed]:animate-out gap-4 ease-in-out fixed z-50 flex flex-col transition data-[state=closed]:duration-300 data-[state=open]:duration-500`,
                    side === 'right' &&
                        'data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 sm:max-w-sm rounded-l-3xl h-full w-3/4 border-l border-border',
                    side === 'left' &&
                        'data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 sm:max-w-sm rounded-r-3xl h-full w-3/4 border-r border-border',
                    side === 'top' &&
                        'data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 rounded-b-3xl h-auto border-b border-border',
                    side === 'bottom' &&
                        'data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 rounded-t-3xl h-auto border-t border-border',
                    className,
                )}
                {...props}
                data-slot={slotName}
            >
                {children}
                <SheetPrimitive.Close
                    className={cn(
                        'top-4 right-4 size-9 shadow-xs absolute flex items-center justify-center rounded-full border border-border bg-muted text-muted-foreground transition-colors hover:bg-accent hover:text-foreground disabled:pointer-events-none',
                        focusRing,
                    )}
                >
                    <XIcon className="size-4" />
                    <span className="sr-only">Close</span>
                </SheetPrimitive.Close>
            </SheetPrimitive.Content>
        </SheetPortal>
    );
}

function SheetHeader({
    className,
    slotName = 'sheet-header',
    ...props
}: React.ComponentProps<'div'> & SlotNameProps) {
    return (
        <div
            className={cn('gap-1.5 p-4 flex flex-col', className)}
            {...props}
            data-slot={slotName}
        />
    );
}

function SheetFooter({
    className,
    slotName = 'sheet-footer',
    ...props
}: React.ComponentProps<'div'> & SlotNameProps) {
    return (
        <div
            className={cn('gap-2 p-4 mt-auto flex flex-col', className)}
            {...props}
            data-slot={slotName}
        />
    );
}

function SheetTitle({
    className,
    slotName = 'sheet-title',
    ...props
}: React.ComponentProps<typeof SheetPrimitive.Title> & SlotNameProps) {
    return (
        <SheetPrimitive.Title
            className={cn('font-semibold text-foreground', className)}
            {...props}
            data-slot={slotName}
        />
    );
}

function SheetDescription({
    className,
    slotName = 'sheet-description',
    ...props
}: React.ComponentProps<typeof SheetPrimitive.Description> & SlotNameProps) {
    return (
        <SheetPrimitive.Description
            className={cn('text-sm text-muted-foreground', className)}
            {...props}
            data-slot={slotName}
        />
    );
}

export {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
};
