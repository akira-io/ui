'use client';

import * as React from 'react';

import { assignRefs } from '@/lib/motion/assign-refs';
import { takeOrigin } from '@/lib/motion/origin-element';
import { OverlayContentBoundary } from '@/lib/motion/overlay-state';
import { useZoomFromOrigin } from '@/lib/motion/use-zoom-from-origin';

export const ZoomSurface = React.forwardRef<
    HTMLDivElement,
    React.ComponentProps<'div'>
>(function ZoomSurface({ children, ...props }, forwardedRef) {
    const ref = React.useRef<HTMLDivElement>(null);
    const [origin] = React.useState(takeOrigin);
    const composedRef = React.useMemo(
        () => assignRefs(ref, forwardedRef),
        [forwardedRef],
    );

    useZoomFromOrigin(ref, origin);

    return (
        <div {...props} ref={composedRef}>
            <OverlayContentBoundary>{children}</OverlayContentBoundary>
        </div>
    );
});
