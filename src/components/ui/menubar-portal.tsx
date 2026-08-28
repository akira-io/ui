'use client';

import { Menubar as MenubarPrimitive } from 'radix-ui';
import * as React from 'react';

import { useSheetPortalContainer } from '@/hooks/use-sheet-portal-container';
import type { SlotNameProps } from '@/types';

export function MenubarPortal({
    slotName = 'menubar-portal',
    container,
    ...props
}: Omit<React.ComponentProps<typeof MenubarPrimitive.Portal>, 'container'> &
    SlotNameProps & { container?: HTMLElement | null }) {
    const portalContainer = useSheetPortalContainer(container);

    return (
        <MenubarPrimitive.Portal
            container={portalContainer}
            {...props}
            data-slot={slotName}
        />
    );
}
