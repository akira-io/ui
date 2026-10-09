'use client';

import {
    AnimatePresence,
    domAnimation,
    LazyMotion,
    m,
    useReducedMotion,
    type HTMLMotionProps,
    type Variants,
} from 'motion/react';
import * as React from 'react';

import {
    OverlayContentBoundary,
    useOverlayOpen,
} from '@/lib/motion/overlay-state';
import { overlayClosedScale, overlayTransition } from '@/lib/motion/tokens';

export function overlayVariants(reduced: boolean): Variants {
    if (reduced) {
        return {
            closed: { opacity: 0, transition: overlayTransition.reduced },
            open: { opacity: 1, transition: overlayTransition.reduced },
        };
    }

    return {
        closed: {
            opacity: 0,
            scale: overlayClosedScale,
            transition: overlayTransition.exit,
        },
        open: { opacity: 1, scale: 1, transition: overlayTransition.enter },
    };
}

export function OverlayPresence({ children }: { children: React.ReactNode }) {
    const open = useOverlayOpen();

    if (open === undefined) {
        return children;
    }

    return <AnimatePresence>{open ? children : null}</AnimatePresence>;
}

export const OverlaySurface = React.forwardRef<
    HTMLDivElement,
    Omit<HTMLMotionProps<'div'>, 'children'> & { children?: React.ReactNode }
>(function OverlaySurface({ children, ...props }, ref) {
    const reduced = useReducedMotion() ?? false;

    return (
        <LazyMotion features={domAnimation}>
            <m.div
                ref={ref}
                variants={overlayVariants(reduced)}
                initial="closed"
                animate="open"
                exit="closed"
                {...props}
            >
                <OverlayContentBoundary>{children}</OverlayContentBoundary>
            </m.div>
        </LazyMotion>
    );
});

export const OverlayBackdrop = React.forwardRef<
    HTMLDivElement,
    HTMLMotionProps<'div'>
>(function OverlayBackdrop(props, ref) {
    return (
        <LazyMotion features={domAnimation}>
            <m.div
                ref={ref}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.2 } }}
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
                {...props}
            />
        </LazyMotion>
    );
});
