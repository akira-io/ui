'use client';

import { animate, usePresence, useReducedMotion } from 'motion/react';
import * as React from 'react';

import { overlayTransition } from '@/lib/motion/tokens';

export interface ZoomShape {
    rect: DOMRect;
    radius: number;
}

export interface ZoomFrame {
    x: number;
    y: number;
    scale: number;
    opacity: number;
    clipPath: string;
}

function insetClip(vertical: number, horizontal: number, radius: number) {
    return `inset(${vertical}px ${horizontal}px ${vertical}px ${horizontal}px round ${radius}px)`;
}

export function restingFrame(content: ZoomShape): ZoomFrame {
    return {
        x: 0,
        y: 0,
        scale: 1,
        opacity: 1,
        clipPath: insetClip(0, 0, content.radius),
    };
}

export function zoomFrame(
    content: ZoomShape,
    origin: ZoomShape | null,
    reduced: boolean,
): ZoomFrame {
    const resting = restingFrame(content);

    if (reduced) {
        return { ...resting, opacity: 0 };
    }

    if (!origin || origin.rect.width === 0 || content.rect.width === 0) {
        return { ...resting, scale: 0.9, opacity: 0 };
    }

    const from = origin.rect;
    const to = content.rect;

    return {
        x: from.left + from.width / 2 - (to.left + to.width / 2),
        y: from.top + from.height / 2 - (to.top + to.height / 2),
        scale: 1,
        opacity: 1,
        clipPath: insetClip(
            Math.max(0, (to.height - from.height) / 2),
            Math.max(0, (to.width - from.width) / 2),
            origin.radius,
        ),
    };
}

function shapeOf(element: HTMLElement): ZoomShape {
    return {
        rect: element.getBoundingClientRect(),
        radius: parseFloat(getComputedStyle(element).borderTopLeftRadius) || 0,
    };
}

function framesFor(
    element: HTMLElement,
    origin: HTMLElement | null,
    reduced: boolean,
): { from: ZoomFrame; resting: ZoomFrame } {
    const { transform, clipPath } = element.style;

    element.style.transform = 'none';
    element.style.clipPath = '';

    const content = shapeOf(element);

    element.style.transform = transform;
    element.style.clipPath = clipPath;

    return {
        from: zoomFrame(
            content,
            origin?.isConnected ? shapeOf(origin) : null,
            reduced,
        ),
        resting: restingFrame(content),
    };
}

function applyFrame(element: HTMLElement, frame: ZoomFrame): void {
    element.style.transform = `translateX(${frame.x}px) translateY(${frame.y}px) scale(${frame.scale})`;
    element.style.opacity = String(frame.opacity);
    element.style.clipPath = frame.clipPath;
}

export function useZoomFromOrigin(
    ref: React.RefObject<HTMLElement | null>,
    origin: HTMLElement | null,
): void {
    const reduced = useReducedMotion() ?? false;
    const [isPresent, safeToRemove] = usePresence();
    const leaving = React.useRef(false);

    React.useLayoutEffect(() => {
        const element = ref.current;

        if (!element || !isPresent) {
            return undefined;
        }

        const { from, resting } = framesFor(element, origin, reduced);
        const returning = leaving.current;
        const movement = reduced
            ? overlayTransition.reduced
            : overlayTransition.enter;
        const towards = <T>(start: T, end: T): T | T[] =>
            returning ? end : [start, end];

        leaving.current = false;

        if (!returning) {
            applyFrame(element, from);
        }

        const controls = animate(
            element,
            {
                x: towards(from.x, resting.x),
                y: towards(from.y, resting.y),
                scale: towards(from.scale, resting.scale),
                opacity: towards(from.opacity, resting.opacity),
                clipPath: towards(from.clipPath, resting.clipPath),
            },
            {
                x: movement,
                y: movement,
                scale: movement,
                clipPath: movement,
                opacity: { duration: 0.15, ease: 'easeOut' },
            },
        );

        controls.then(() => {
            element.style.clipPath = '';
        });

        return () => controls.stop();
    }, [isPresent, origin, reduced, ref]);

    React.useEffect(() => {
        const element = ref.current;

        if (isPresent || !element) {
            return undefined;
        }

        leaving.current = true;

        const { from: to } = framesFor(element, origin, reduced);
        const controls = animate(
            element,
            {
                x: to.x,
                y: to.y,
                scale: to.scale,
                clipPath: to.clipPath,
                opacity: [null, to.opacity, 0],
            },
            {
                duration: 0.2,
                ease: [0.4, 0, 1, 1],
                opacity: { duration: 0.2, times: [0, 0.7, 1] },
            },
        );

        controls.then(() => safeToRemove?.());

        return () => controls.stop();
    }, [isPresent, origin, reduced, ref, safeToRemove]);
}
