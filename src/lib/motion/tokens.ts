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

export const slideTransition = {
    exit: { type: 'tween', duration: 0.22, ease: [0.4, 0, 1, 1] },
} satisfies Record<'exit', Transition>;

export const swipeThresholds = {
    start: 8,
    distance: 1 / 3,
    velocity: 500,
    resistance: 0.2,
    window: 100,
} as const;
