import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { ChevronRightIcon } from 'lucide-react';
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

function DropdownMenuSub({
    open,
    defaultOpen,
    onOpenChange,
    slotName = 'dropdown-menu-sub',
    ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Sub> & SlotNameProps) {
    const state = useOverlayState({ open, defaultOpen, onOpenChange });

    return (
        <OverlayOpenProvider open={state.open}>
            <DropdownMenuPrimitive.Sub
                {...props}
                {...state}
                data-slot={slotName}
            />
        </OverlayOpenProvider>
    );
}

function DropdownMenuSubTrigger({
    className,
    inset,
    children,
    slotName = 'dropdown-menu-sub-trigger',
    ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean;
} & SlotNameProps) {
    return (
        <DropdownMenuPrimitive.SubTrigger
            data-inset={inset}
            className={cn(
                'font-medium rounded-xl px-2 py-2 text-sm data-[inset]:pl-8 focus:font-semibold data-[state=open]:font-semibold flex cursor-default items-center outline-hidden transition-all select-none focus:bg-primary/10 focus:text-primary data-[state=open]:bg-primary/10 data-[state=open]:text-primary',
                className,
            )}
            {...props}
            data-slot={slotName}
        >
            {children}
            <ChevronRightIcon className="size-4 ml-auto" />
        </DropdownMenuPrimitive.SubTrigger>
    );
}

function DropdownMenuSubContent({
    className,
    children,
    slotName = 'dropdown-menu-sub-content',
    container,
    ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubContent> &
    SlotNameProps & { container?: HTMLElement | null }) {
    const portalContainer = useSheetPortalContainer(container);
    const forceMount = useOverlayForceMount();

    return (
        <OverlayPresence>
            <DropdownMenuPrimitive.Portal
                container={portalContainer}
                forceMount={forceMount}
            >
                <DropdownMenuPrimitive.SubContent
                    forceMount={forceMount}
                    asChild
                    className={cn(
                        `${menuSurface} p-1.5 z-50 min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-hidden`,
                        className,
                    )}
                    {...props}
                    data-surface=""
                    data-slot={slotName}
                >
                    <OverlaySurface>{children}</OverlaySurface>
                </DropdownMenuPrimitive.SubContent>
            </DropdownMenuPrimitive.Portal>
        </OverlayPresence>
    );
}

export { DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger };
