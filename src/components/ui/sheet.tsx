import * as SheetPrimitive from '@radix-ui/react-dialog';
import { XIcon } from 'lucide-react';
import * as React from 'react';

import { floatingSurface, focusRing } from '@/lib/language';
import { cn } from '@/lib/utils';

function Sheet({
    preserveScroll = false,
    onOpenChange: onOpenChangeProp,
    ...props
}: React.ComponentProps<typeof SheetPrimitive.Root> & {
    preserveScroll?: boolean;
}) {
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
            data-slot="sheet"
            {...props}
            onOpenChange={onOpenChange}
        />
    );
}

function SheetTrigger({
    ...props
}: React.ComponentProps<typeof SheetPrimitive.Trigger>) {
    return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />;
}

function SheetClose({
    ...props
}: React.ComponentProps<typeof SheetPrimitive.Close>) {
    return <SheetPrimitive.Close data-slot="sheet-close" {...props} />;
}

function SheetPortal({
    ...props
}: React.ComponentProps<typeof SheetPrimitive.Portal>) {
    return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />;
}

function SheetOverlay({
    className,
    ...props
}: React.ComponentProps<typeof SheetPrimitive.Overlay>) {
    return (
        <SheetPrimitive.Overlay
            data-slot="sheet-overlay"
            className={cn(
                'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 inset-0 bg-black/60 backdrop-blur-sm fixed z-50',
                className,
            )}
            {...props}
        />
    );
}

function SheetContent({
    className,
    children,
    side = 'right',
    ...props
}: React.ComponentProps<typeof SheetPrimitive.Content> & {
    side?: 'top' | 'right' | 'bottom' | 'left';
}) {
    return (
        <SheetPortal>
            <SheetOverlay />
            <SheetPrimitive.Content
                data-slot="sheet-content"
                className={cn(
                    `${floatingSurface} data-[state=open]:animate-in data-[state=closed]:animate-out gap-4 ease-in-out fixed z-50 flex flex-col transition data-[state=closed]:duration-300 data-[state=open]:duration-500`,
                    side === 'right' &&
                        'data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 rounded-l-2xl sm:max-w-sm sm:rounded-l-[2.5rem] h-full w-3/4 border-l border-border',
                    side === 'left' &&
                        'data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 rounded-r-2xl sm:max-w-sm sm:rounded-r-[2.5rem] h-full w-3/4 border-r border-border',
                    side === 'top' &&
                        'data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 rounded-b-2xl sm:rounded-b-[2.5rem] h-auto border-b border-border',
                    side === 'bottom' &&
                        'data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 rounded-t-2xl sm:rounded-t-[2.5rem] h-auto border-t border-border',
                    className,
                )}
                {...props}
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

function SheetHeader({ className, ...props }: React.ComponentProps<'div'>) {
    return (
        <div
            data-slot="sheet-header"
            className={cn('gap-1.5 p-4 flex flex-col', className)}
            {...props}
        />
    );
}

function SheetFooter({ className, ...props }: React.ComponentProps<'div'>) {
    return (
        <div
            data-slot="sheet-footer"
            className={cn('gap-2 p-4 mt-auto flex flex-col', className)}
            {...props}
        />
    );
}

function SheetTitle({
    className,
    ...props
}: React.ComponentProps<typeof SheetPrimitive.Title>) {
    return (
        <SheetPrimitive.Title
            data-slot="sheet-title"
            className={cn('font-semibold text-foreground', className)}
            {...props}
        />
    );
}

function SheetDescription({
    className,
    ...props
}: React.ComponentProps<typeof SheetPrimitive.Description>) {
    return (
        <SheetPrimitive.Description
            data-slot="sheet-description"
            className={cn('text-sm text-muted-foreground', className)}
            {...props}
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
