'use client';

import * as ResizablePrimitive from 'react-resizable-panels';

import { elevatedSurface, nestedSurfaceReset } from '@/lib/language';
import { cn } from '@/lib/utils';

function ResizablePanelGroup({
    className,
    ...props
}: ResizablePrimitive.GroupProps) {
    return (
        <ResizablePrimitive.Group
            data-slot="resizable-panel-group"
            className={cn(
                elevatedSurface,
                nestedSurfaceReset,
                'flex h-full w-full overflow-hidden bg-card aria-[orientation=vertical]:flex-col',
                className,
            )}
            {...props}
        />
    );
}

function ResizablePanel({ ...props }: ResizablePrimitive.PanelProps) {
    return <ResizablePrimitive.Panel data-slot="resizable-panel" {...props} />;
}

function ResizableHandle({
    withHandle,
    className,
    ...props
}: ResizablePrimitive.SeparatorProps & {
    withHandle?: boolean;
}) {
    return (
        <ResizablePrimitive.Separator
            data-slot="resizable-handle"
            className={cn(
                'after:inset-y-0 after:w-1 aria-[orientation=horizontal]:after:left-0 aria-[orientation=horizontal]:after:h-1 aria-[orientation=horizontal]:after:translate-x-0 relative flex w-px items-center justify-center bg-border after:absolute after:left-1/2 after:-translate-x-1/2 focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none aria-[orientation=horizontal]:h-px aria-[orientation=horizontal]:w-full aria-[orientation=horizontal]:after:w-full aria-[orientation=horizontal]:after:-translate-y-1/2 [&[aria-orientation=horizontal]>div]:rotate-90',
                className,
            )}
            {...props}
        >
            {withHandle && (
                <div className="h-8 w-1.5 z-10 rounded-full bg-muted-foreground/40 transition-colors group-hover:bg-muted-foreground/60" />
            )}
        </ResizablePrimitive.Separator>
    );
}

export { ResizableHandle, ResizablePanel, ResizablePanelGroup };
