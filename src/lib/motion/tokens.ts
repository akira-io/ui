import type { Transition } from 'motion/react';

export const overlayClosedScale = 0.9;

export const overlayTransition = {
    enter: { type: 'spring', stiffness: 420, damping: 34, mass: 0.8 },
    exit: { type: 'tween', duration: 0.15, ease: [0.4, 0, 1, 1] },
    reduced: { duration: 0.12, ease: 'easeOut' },
} satisfies Record<'enter' | 'exit' | 'reduced', Transition>;
