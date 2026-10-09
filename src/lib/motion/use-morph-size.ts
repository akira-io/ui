'use client';

import { animate, useReducedMotion } from 'motion/react';
import * as React from 'react';

import { overlayTransition } from '@/lib/motion/tokens';

export interface MorphSizeOptions {
    step: string;
    radius: number | 'pill';
}

function frameFor(content: HTMLElement, radius: MorphSizeOptions['radius']) {
    const { width, height } = content.getBoundingClientRect();

    return {
        width,
        height,
        borderRadius: radius === 'pill' ? height / 2 : radius,
    };
}

function place(surface: HTMLElement, frame: ReturnType<typeof frameFor>) {
    surface.style.width = `${frame.width}px`;
    surface.style.height = `${frame.height}px`;
    surface.style.borderRadius = `${frame.borderRadius}px`;
}

export function useMorphSize(
    surfaceRef: React.RefObject<HTMLElement | null>,
    contentRef: React.RefObject<HTMLElement | null>,
    { step, radius }: MorphSizeOptions,
): void {
    const reduced = useReducedMotion() ?? false;
    const placed = React.useRef(false);

    React.useLayoutEffect(() => {
        const surface = surfaceRef.current;
        const content = contentRef.current;

        if (!surface || !content) {
            return undefined;
        }

        let controls: ReturnType<typeof animate> | undefined;

        const fit = () => {
            const frame = frameFor(content, radius);

            controls?.stop();

            if (!placed.current || reduced) {
                placed.current = true;
                place(surface, frame);

                return;
            }

            controls = animate(surface, frame, overlayTransition.enter);
        };

        fit();

        if (typeof ResizeObserver === 'undefined') {
            return () => controls?.stop();
        }

        const observer = new ResizeObserver(() => fit());

        observer.observe(content);

        return () => {
            observer.disconnect();
            controls?.stop();
        };
    }, [contentRef, radius, reduced, step, surfaceRef]);
}
