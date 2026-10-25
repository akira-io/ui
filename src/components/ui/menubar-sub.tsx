import { ChevronRightIcon } from 'lucide-react';
import { Menubar as MenubarPrimitive } from 'radix-ui';
import * as React from 'react';

import { MenubarPortal } from '@/components/ui/menubar-portal';
import { menuSurface } from '@/lib/language';
import { MenuLens } from '@/lib/motion/menu-lens';
import { OverlayPresence, OverlaySurface } from '@/lib/motion/overlay-motion';
import {
    OverlayOpenProvider,
    useOverlayForceMount,
    useOverlayState,
} from '@/lib/motion/overlay-state';
import { cn } from '@/lib/utils';
import type { SlotNameProps } from '@/types';

function MenubarSub({
    open,
    defaultOpen,
    onOpenChange,
    slotName = 'menubar-sub',
    ...props
}: React.ComponentProps<typeof MenubarPrimitive.Sub> & SlotNameProps) {
    const state = useOverlayState({ open, defaultOpen, onOpenChange });

    return (
        <OverlayOpenProvider open={state.open}>
            <MenubarPrimitive.Sub {...props} {...state} data-slot={slotName} />
        </OverlayOpenProvider>
    );
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
                'px-2 py-1.5 text-sm data-[inset]:pl-8 rounded-xl flex cursor-default items-center outline-none select-none focus:bg-(--glass-highlight) focus:text-foreground data-[state=open]:bg-(--glass-highlight) data-[state=open]:text-foreground',
                className,
            )}
            {...props}
            data-slot={slotName}
        >
            {children}
            <ChevronRightIcon className="ml-auto size-icon" />
        </MenubarPrimitive.SubTrigger>
    );
}

function MenubarSubContent({
    className,
    children,
    slotName = 'menubar-sub-content',
    container,
    ...props
}: React.ComponentProps<typeof MenubarPrimitive.SubContent> &
    SlotNameProps & { container?: HTMLElement | null }) {
    const forceMount = useOverlayForceMount();

    return (
        <OverlayPresence>
            <MenubarPortal container={container} forceMount={forceMount}>
                <MenubarPrimitive.SubContent
                    forceMount={forceMount}
                    asChild
                    className={cn(
                        `${menuSurface} p-1.5 relative isolate z-50 min-w-[8rem] origin-(--radix-menubar-content-transform-origin) overflow-hidden`,
                        className,
                    )}
                    {...props}
                    data-surface=""
                    data-slot={slotName}
                >
                    <OverlaySurface data-menu-lens="">
                        <MenuLens />
                        {children}
                    </OverlaySurface>
                </MenubarPrimitive.SubContent>
            </MenubarPortal>
        </OverlayPresence>
    );
}

export { MenubarSub, MenubarSubContent, MenubarSubTrigger };
