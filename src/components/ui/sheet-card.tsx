import * as React from 'react';

import { contentSurfaces, type ContentSurfaceProps } from '@/lib/language';
import { useContentSurface } from '@/lib/surface-context';
import { cn } from '@/lib/utils';
import type { SlotNameProps } from '@/types';

export interface SheetCardProps
    extends React.ComponentProps<'div'>, ContentSurfaceProps, SlotNameProps {}

function SheetCardSurface({
    className,
    surface,
    slotName,
    ...props
}: SheetCardProps) {
    return (
        <div
            className={cn(
                'flex flex-col',
                contentSurfaces[useContentSurface(surface)],
                className,
            )}
            {...props}
            data-slot={slotName}
        />
    );
}

export function SheetCard({
    slotName = 'sheet-card',
    ...props
}: SheetCardProps) {
    return <SheetCardSurface slotName={slotName} {...props} />;
}

export function FloatingSheetCard({
    slotName = 'floating-sheet-card',
    ...props
}: SheetCardProps) {
    return <SheetCardSurface slotName={slotName} {...props} />;
}
