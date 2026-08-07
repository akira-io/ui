import * as React from 'react';
import { Drawer as DrawerPrimitive } from 'vaul';

import { floatingSurface } from '@/lib/language';
import { cn } from '@/lib/utils';
import type { SlotNameProps } from '@/types';

function Drawer({
    slotName = 'drawer',
    ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root> & SlotNameProps) {
    return <DrawerPrimitive.Root {...props} data-slot={slotName} />;
}

function DrawerTrigger({
    slotName = 'drawer-trigger',
    ...props
}: React.ComponentProps<typeof DrawerPrimitive.Trigger> & SlotNameProps) {
    return <DrawerPrimitive.Trigger {...props} data-slot={slotName} />;
}

function DrawerPortal({
    slotName = 'drawer-portal',
    ...props
}: React.ComponentProps<typeof DrawerPrimitive.Portal> & SlotNameProps) {
    return <DrawerPrimitive.Portal {...props} data-slot={slotName} />;
}

function DrawerClose({
    slotName = 'drawer-close',
    ...props
}: React.ComponentProps<typeof DrawerPrimitive.Close> & SlotNameProps) {
    return <DrawerPrimitive.Close {...props} data-slot={slotName} />;
}

function DrawerOverlay({
    className,
    slotName = 'drawer-overlay',
    ...props
}: React.ComponentProps<typeof DrawerPrimitive.Overlay> & SlotNameProps) {
    return (
        <DrawerPrimitive.Overlay
            className={cn(
                'inset-0 bg-black/60 backdrop-blur-sm data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0 fixed z-50',
                className,
            )}
            {...props}
            data-slot={slotName}
        />
    );
}

function DrawerContent({
    className,
    children,
    slotName = 'drawer-content',
    ...props
}: React.ComponentProps<typeof DrawerPrimitive.Content> & SlotNameProps) {
    return (
        <DrawerPortal slotName="drawer-portal">
            <DrawerOverlay />
            <DrawerPrimitive.Content
                className={cn(
                    `${floatingSurface} group/drawer-content fixed z-50 flex h-auto flex-col border-border`,
                    'data-[vaul-drawer-direction=top]:inset-x-0 data-[vaul-drawer-direction=top]:top-0 data-[vaul-drawer-direction=top]:mb-24 data-[vaul-drawer-direction=top]:rounded-b-3xl data-[vaul-drawer-direction=top]:max-h-[80vh] data-[vaul-drawer-direction=top]:border-b',
                    'data-[vaul-drawer-direction=bottom]:inset-x-0 data-[vaul-drawer-direction=bottom]:bottom-0 data-[vaul-drawer-direction=bottom]:mt-24 data-[vaul-drawer-direction=bottom]:rounded-t-3xl data-[vaul-drawer-direction=bottom]:max-h-[80vh] data-[vaul-drawer-direction=bottom]:border-t',
                    'data-[vaul-drawer-direction=right]:inset-y-0 data-[vaul-drawer-direction=right]:right-0 data-[vaul-drawer-direction=right]:sm:max-w-sm data-[vaul-drawer-direction=right]:rounded-l-3xl data-[vaul-drawer-direction=right]:w-3/4 data-[vaul-drawer-direction=right]:border-l',
                    'data-[vaul-drawer-direction=left]:inset-y-0 data-[vaul-drawer-direction=left]:left-0 data-[vaul-drawer-direction=left]:sm:max-w-sm data-[vaul-drawer-direction=left]:rounded-r-3xl data-[vaul-drawer-direction=left]:w-3/4 data-[vaul-drawer-direction=left]:border-r',
                    className,
                )}
                {...props}
                data-slot={slotName}
            >
                <div className="mt-4 h-2 mx-auto hidden w-[100px] shrink-0 rounded-full bg-muted group-data-[vaul-drawer-direction=bottom]/drawer-content:block" />
                {children}
            </DrawerPrimitive.Content>
        </DrawerPortal>
    );
}

function DrawerHeader({
    className,
    slotName = 'drawer-header',
    ...props
}: React.ComponentProps<'div'> & SlotNameProps) {
    return (
        <div
            className={cn(
                'gap-0.5 p-4 md:gap-1.5 md:text-left flex flex-col group-data-[vaul-drawer-direction=bottom]/drawer-content:text-center group-data-[vaul-drawer-direction=top]/drawer-content:text-center',
                className,
            )}
            {...props}
            data-slot={slotName}
        />
    );
}

function DrawerFooter({
    className,
    slotName = 'drawer-footer',
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

function DrawerTitle({
    className,
    slotName = 'drawer-title',
    ...props
}: React.ComponentProps<typeof DrawerPrimitive.Title> & SlotNameProps) {
    return (
        <DrawerPrimitive.Title
            className={cn('font-semibold text-foreground', className)}
            {...props}
            data-slot={slotName}
        />
    );
}

function DrawerDescription({
    className,
    slotName = 'drawer-description',
    ...props
}: React.ComponentProps<typeof DrawerPrimitive.Description> & SlotNameProps) {
    return (
        <DrawerPrimitive.Description
            className={cn('text-sm text-muted-foreground', className)}
            {...props}
            data-slot={slotName}
        />
    );
}

export {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerPortal,
    DrawerTitle,
    DrawerTrigger,
};
