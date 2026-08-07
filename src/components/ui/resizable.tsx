'use client';

import * as ResizablePrimitive from 'react-resizable-panels';

import { elevatedSurface, nestedSurfaceReset } from '@/lib/language';
import { cn } from '@/lib/utils';
import type { SlotNameProps } from '@/types';

function ResizablePanelGroup({
    className,
    slotName = 'resizable-panel-group',
    ...props
}: ResizablePrimitive.GroupProps & SlotNameProps) {
    return (
        <ResizablePrimitive.Group
            className={cn(
                elevatedSurface,
                nestedSurfaceReset,
                'flex h-full w-full overflow-hidden bg-card aria-[orientation=vertical]:flex-col',
                className,
            )}
            {...props}
            data-slot={slotName}
        />
    );
}

function ResizablePanel({
    slotName = 'resizable-panel',
    ...props
}: ResizablePrimitive.PanelProps & SlotNameProps) {
    return <ResizablePrimitive.Panel {...props} data-slot={slotName} />;
}

function ResizableHandle({
    withHandle,
    className,
    slotName = 'resizable-handle',
    ...props
}: ResizablePrimitive.SeparatorProps & {
    withHandle?: boolean;
} & SlotNameProps) {
    return (
        <ResizablePrimitive.Separator
            className={cn(
                'after:inset-y-0 after:w-1 aria-[orientation=horizontal]:after:left-0 aria-[orientation=horizontal]:after:h-1 aria-[orientation=horizontal]:after:translate-x-0 relative flex w-px items-center justify-center bg-border after:absolute after:left-1/2 after:-translate-x-1/2 focus-visible:outline-1 focus-visible:outline-offset-0 focus-visible:outline-ring focus-visible:outline-solid aria-[orientation=horizontal]:h-px aria-[orientation=horizontal]:w-full aria-[orientation=horizontal]:after:w-full aria-[orientation=horizontal]:after:-translate-y-1/2 [&[aria-orientation=horizontal]>div]:rotate-90',
                className,
            )}
            {...props}
            data-slot={slotName}
        >
            {withHandle && (
                <div className="h-8 w-1.5 z-10 rounded-full bg-muted-foreground/40 transition-colors group-hover:bg-muted-foreground/60" />
            )}
        </ResizablePrimitive.Separator>
    );
}

export { ResizableHandle, ResizablePanel, ResizablePanelGroup };
