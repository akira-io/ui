'use client';

import { AlertDialog as AlertDialogPrimitive } from 'radix-ui';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { modalSurface } from '@/lib/language';
import { trackOrigin } from '@/lib/motion/origin-element';
import { OverlayBackdrop, OverlayPresence } from '@/lib/motion/overlay-motion';
import {
    OverlayOpenProvider,
    useOverlayForceMount,
    useOverlayState,
} from '@/lib/motion/overlay-state';
import { ZoomSurface } from '@/lib/motion/zoom-surface';
import { cn } from '@/lib/utils';
import type { SlotNameProps } from '@/types';

function AlertDialog({
    open,
    defaultOpen,
    onOpenChange,
    slotName = 'alert-dialog',
    ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Root> & SlotNameProps) {
    const state = useOverlayState({ open, defaultOpen, onOpenChange });

    React.useEffect(() => trackOrigin(), []);

    return (
        <OverlayOpenProvider open={state.open}>
            <AlertDialogPrimitive.Root
                {...props}
                {...state}
                data-slot={slotName}
            />
        </OverlayOpenProvider>
    );
}

function AlertDialogTrigger({
    slotName = 'alert-dialog-trigger',
    ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Trigger> & SlotNameProps) {
    return <AlertDialogPrimitive.Trigger {...props} data-slot={slotName} />;
}

function AlertDialogPortal({
    slotName = 'alert-dialog-portal',
    ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Portal> & SlotNameProps) {
    return <AlertDialogPrimitive.Portal {...props} data-slot={slotName} />;
}

function AlertDialogOverlay({
    className,
    slotName = 'alert-dialog-overlay',
    ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Overlay> & SlotNameProps) {
    return (
        <AlertDialogPrimitive.Overlay
            asChild
            className={cn(
                'inset-0 bg-black/60 backdrop-blur-sm fixed z-50',
                className,
            )}
            {...props}
            data-slot={slotName}
        >
            <OverlayBackdrop />
        </AlertDialogPrimitive.Overlay>
    );
}

function AlertDialogContent({
    className,
    children,
    size = 'default',
    slotName = 'alert-dialog-content',
    ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Content> & {
    size?: 'default' | 'sm';
} & SlotNameProps) {
    const forceMount = useOverlayForceMount();

    return (
        <OverlayPresence>
            <AlertDialogPortal forceMount={forceMount}>
                <AlertDialogOverlay forceMount={forceMount} />
                <AlertDialogPrimitive.Content
                    forceMount={forceMount}
                    asChild
                    data-size={size}
                    className={cn(
                        `${modalSurface} group/alert-dialog-content gap-4 p-6 md:p-8 data-[size=sm]:max-w-xs data-[size=default]:sm:max-w-lg fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%]`,
                        className,
                    )}
                    {...props}
                    data-surface=""
                    data-slot={slotName}
                >
                    <ZoomSurface>{children}</ZoomSurface>
                </AlertDialogPrimitive.Content>
            </AlertDialogPortal>
        </OverlayPresence>
    );
}

function AlertDialogHeader({
    className,
    slotName = 'alert-dialog-header',
    ...props
}: React.ComponentProps<'div'> & SlotNameProps) {
    return (
        <div
            className={cn(
                'gap-1.5 has-data-[slot=alert-dialog-media]:gap-x-6 sm:group-data-[size=default]/alert-dialog-content:place-items-start sm:group-data-[size=default]/alert-dialog-content:text-left sm:group-data-[size=default]/alert-dialog-content:has-data-[slot=alert-dialog-media]:grid-rows-[auto_1fr] grid grid-rows-[auto_1fr] place-items-center text-center has-data-[slot=alert-dialog-media]:grid-rows-[auto_auto_1fr]',
                className,
            )}
            {...props}
            data-slot={slotName}
        />
    );
}

function AlertDialogFooter({
    className,
    slotName = 'alert-dialog-footer',
    ...props
}: React.ComponentProps<'div'> & SlotNameProps) {
    return (
        <div
            className={cn(
                'gap-2 sm:flex-row sm:justify-end flex flex-col-reverse group-data-[size=sm]/alert-dialog-content:grid group-data-[size=sm]/alert-dialog-content:grid-cols-2',
                className,
            )}
            {...props}
            data-slot={slotName}
        />
    );
}

function AlertDialogTitle({
    className,
    slotName = 'alert-dialog-title',
    ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Title> & SlotNameProps) {
    return (
        <AlertDialogPrimitive.Title
            className={cn(
                'text-lg font-semibold sm:group-data-[size=default]/alert-dialog-content:group-has-data-[slot=alert-dialog-media]/alert-dialog-content:col-start-2',
                className,
            )}
            {...props}
            data-slot={slotName}
        />
    );
}

function AlertDialogDescription({
    className,
    slotName = 'alert-dialog-description',
    ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Description> &
    SlotNameProps) {
    return (
        <AlertDialogPrimitive.Description
            className={cn('text-sm text-muted-foreground', className)}
            {...props}
            data-slot={slotName}
        />
    );
}

function AlertDialogMedia({
    className,
    slotName = 'alert-dialog-media',
    ...props
}: React.ComponentProps<'div'> & SlotNameProps) {
    return (
        <div
            className={cn(
                "mb-2 size-16 sm:group-data-[size=default]/alert-dialog-content:row-span-2 *:[svg:not([class*='size-'])]:size-8 rounded-2xl inline-flex items-center justify-center bg-muted",
                className,
            )}
            {...props}
            data-slot={slotName}
        />
    );
}

function AlertDialogAction({
    className,
    variant = 'default',
    size = 'default',
    slotName = 'alert-dialog-action',
    ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Action> &
    Pick<React.ComponentProps<typeof Button>, 'variant' | 'size'> &
    SlotNameProps) {
    return (
        <Button variant={variant} size={size} asChild>
            <AlertDialogPrimitive.Action
                className={cn(className)}
                {...props}
                data-slot={slotName}
            />
        </Button>
    );
}

function AlertDialogCancel({
    className,
    variant = 'outline',
    size = 'default',
    slotName = 'alert-dialog-cancel',
    ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Cancel> &
    Pick<React.ComponentProps<typeof Button>, 'variant' | 'size'> &
    SlotNameProps) {
    return (
        <Button variant={variant} size={size} asChild>
            <AlertDialogPrimitive.Cancel
                className={cn(className)}
                {...props}
                data-slot={slotName}
            />
        </Button>
    );
}

export {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogMedia,
    AlertDialogOverlay,
    AlertDialogPortal,
    AlertDialogTitle,
    AlertDialogTrigger,
};
