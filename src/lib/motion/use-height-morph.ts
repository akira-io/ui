'use client';

import { animate, useReducedMotion } from 'motion/react';
import * as React from 'react';

import { overlayTransition } from '@/lib/motion/tokens';

function release(element: HTMLElement) {
    element.style.height = '';
    element.style.overflow = '';
}

export function useHeightMorph(
    ref: React.RefObject<HTMLElement | null>,
    loading: boolean,
): void {
    const reduced = useReducedMotion() ?? false;
    const loadingHeight = React.useRef<number | null>(null);

    React.useLayoutEffect(() => {
        const element = ref.current;

        if (!element) {
            return undefined;
        }

        if (loading) {
            release(element);
            loadingHeight.current = element.getBoundingClientRect().height;

            return undefined;
        }

        const from = loadingHeight.current;
        const to = element.getBoundingClientRect().height;

        loadingHeight.current = null;

        if (reduced || from === null || from === to) {
            return undefined;
        }

        element.style.overflow = 'hidden';

        const controls = animate(
            element,
            { height: [`${from}px`, `${to}px`] },
            { ...overlayTransition.enter, onComplete: () => release(element) },
        );

        return () => {
            controls.stop();
            release(element);
        };
    }, [loading, reduced, ref]);
}
