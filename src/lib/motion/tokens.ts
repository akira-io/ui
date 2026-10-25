import type { Transition } from 'motion/react';

export const overlayClosedScale = 0.9;

export const overlayTransition = {
    enter: { type: 'spring', stiffness: 420, damping: 34, mass: 0.8 },
    exit: { type: 'tween', duration: 0.15, ease: [0.4, 0, 1, 1] },
    reduced: { duration: 0.12, ease: 'easeOut' },
} satisfies Record<'enter' | 'exit' | 'reduced', Transition>;

export const drawTransition = {
    duration: 0.4,
    ease: 'easeOut',
} satisfies Transition;

export const drawStagger = 0.06;

export const overlayOpenDuration = 260;

export const overlayCloseDuration = 180;

export const slideTransition = {
    enter: {
        type: 'spring',
        duration: overlayOpenDuration / 1000,
        bounce: 0.15,
    },
    exit: {
        type: 'tween',
        duration: overlayCloseDuration / 1000,
        ease: [0.4, 0, 1, 1],
    },
} satisfies Record<'enter' | 'exit', Transition>;

export const swipeThresholds = {
    start: 8,
    distance: 1 / 3,
    velocity: 500,
    resistance: 0.2,
    window: 100,
} as const;

export const stackCloseStagger = 120;

export const slotStagger = 0.06;

export const slotStaggerColumns = 4;

export const springEase = 'cubic-bezier(0.34, 1.56, 0.64, 1)';

export const exitEase = 'cubic-bezier(0.4, 0, 1, 1)';
