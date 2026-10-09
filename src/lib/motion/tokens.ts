import type { Transition } from 'motion/react';

export const overlayTransition = {
    enter: { type: 'spring', stiffness: 520, damping: 34, mass: 0.7 },
    exit: { type: 'spring', stiffness: 640, damping: 46, mass: 0.6 },
    reduced: { duration: 0.12, ease: 'easeOut' },
} satisfies Record<'enter' | 'exit' | 'reduced', Transition>;
