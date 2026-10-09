'use client';

import { useIsPresent } from 'motion/react';
import * as React from 'react';

import { assignRefs } from '@/lib/motion/assign-refs';
import { OverlayContentBoundary } from '@/lib/motion/overlay-state';
import type { SheetSide } from '@/lib/motion/side';
import {
    useSlideFromSide,
    type SlideRest,
} from '@/lib/motion/use-slide-from-side';
import { useSwipeToDismiss } from '@/lib/motion/use-swipe-to-dismiss';

export const SlideSurface = React.forwardRef<
    HTMLDivElement,
    React.ComponentProps<'div'> & {
        side: SheetSide;
        onDismiss?: () => void;
        dismissible?: boolean;
        rest?: SlideRest;
    }
>(function SlideSurface(
    { side, onDismiss, dismissible = true, rest, children, ...props },
    forwardedRef,
) {
    const ref = React.useRef<HTMLDivElement>(null);
    const composedRef = React.useMemo(
        () => assignRefs(ref, forwardedRef),
        [forwardedRef],
    );

    const isPresent = useIsPresent();

    useSlideFromSide(ref, side, rest);
    useSwipeToDismiss(ref, {
        side,
        onDismiss: onDismiss ?? (() => undefined),
        enabled: onDismiss !== undefined && isPresent,
        dismissible,
        rest: rest?.offset,
    });

    return (
        <div {...props} ref={composedRef}>
            <OverlayContentBoundary>{children}</OverlayContentBoundary>
        </div>
    );
});
