'use client';

import { animate, usePresence, useReducedMotion } from 'motion/react';
import * as React from 'react';

import { overlayTransition } from '@/lib/motion/tokens';

export interface ZoomFrame {
    x: number;
    y: number;
    scale: number;
    opacity: number;
}

const RESTING: ZoomFrame = { x: 0, y: 0, scale: 1, opacity: 1 };

export function zoomFrame(
    content: DOMRect,
    origin: DOMRect | null,
    reduced: boolean,
): ZoomFrame {
    if (reduced) {
        return { x: 0, y: 0, scale: 1, opacity: 0 };
    }

    if (!origin || origin.width === 0 || content.width === 0) {
        return { x: 0, y: 0, scale: 0.9, opacity: 0 };
    }

    return {
        x: origin.left + origin.width / 2 - (content.left + content.width / 2),
        y: origin.top + origin.height / 2 - (content.top + content.height / 2),
        scale: Math.min(1, Math.max(0.05, origin.width / content.width)),
        opacity: 0,
    };
}

function frameFor(
    element: HTMLElement,
    origin: HTMLElement | null,
    reduced: boolean,
): ZoomFrame {
    return zoomFrame(
        element.getBoundingClientRect(),
        origin?.isConnected ? origin.getBoundingClientRect() : null,
        reduced,
    );
}

export function useZoomFromOrigin(
    ref: React.RefObject<HTMLElement | null>,
    origin: HTMLElement | null,
): void {
    const reduced = useReducedMotion() ?? false;
    const [isPresent, safeToRemove] = usePresence();

    React.useLayoutEffect(() => {
        const element = ref.current;

        if (!element) {
            return undefined;
        }

        const from = frameFor(element, origin, reduced);
        const movement = reduced
            ? overlayTransition.reduced
            : overlayTransition.enter;
        const controls = animate(
            element,
            {
                x: [from.x, RESTING.x],
                y: [from.y, RESTING.y],
                scale: [from.scale, RESTING.scale],
                opacity: [from.opacity, RESTING.opacity],
            },
            {
                x: movement,
                y: movement,
                scale: movement,
                opacity: { duration: 0.15, ease: 'easeOut' },
            },
        );

        return () => controls.stop();
    }, [origin, reduced, ref]);

    React.useEffect(() => {
        const element = ref.current;

        if (isPresent || !element) {
            return undefined;
        }

        const to = frameFor(element, origin, reduced);
        const controls = animate(
            element,
            { x: to.x, y: to.y, scale: to.scale, opacity: 0 },
            { duration: 0.2, ease: [0.4, 0, 1, 1] },
        );

        controls.then(() => safeToRemove?.());

        return () => controls.stop();
    }, [isPresent, origin, reduced, ref, safeToRemove]);
}
