'use client';

import { animate, usePresence, useReducedMotion } from 'motion/react';
import * as React from 'react';

import {
    axisTarget,
    offscreenDistance,
    sideAxis,
    type SheetSide,
    type SlideAxis,
} from '@/lib/motion/side';
import { overlayTransition, slideTransition } from '@/lib/motion/tokens';

export interface SlideRest {
    offset: number;
    scale: number;
}

const RESTING: SlideRest = { offset: 0, scale: 1 };

function distanceOffScreen(element: HTMLElement, side: SheetSide): number {
    const { transform } = element.style;

    element.style.transform = 'none';

    const rect = element.getBoundingClientRect();

    element.style.transform = transform;

    return offscreenDistance(rect, side, {
        width: window.innerWidth,
        height: window.innerHeight,
    });
}

function currentOffset(element: HTMLElement, axis: SlideAxis): number {
    const translate = new RegExp(
        `translate${axis.toUpperCase()}\\((-?[\\d.]+)px\\)`,
    ).exec(element.style.transform);

    return translate ? Number(translate[1]) : 0;
}

export function useSlideFromSide(
    ref: React.RefObject<HTMLElement | null>,
    side: SheetSide,
    rest: SlideRest = RESTING,
): void {
    const reduced = useReducedMotion() ?? false;
    const [isPresent, safeToRemove] = usePresence();
    const settled = React.useRef(false);
    const leaving = React.useRef(false);
    const enteringTowards = React.useRef<string | null>(null);

    React.useLayoutEffect(() => {
        const element = ref.current;

        if (!element || !isPresent) {
            return undefined;
        }

        const axis = sideAxis(side);
        const resting = { ...axisTarget(axis, rest.offset), scale: rest.scale };
        const restKey = `${rest.offset}:${rest.scale}`;
        const entering =
            !settled.current &&
            !leaving.current &&
            (enteringTowards.current === null ||
                enteringTowards.current === restKey);

        enteringTowards.current = entering ? restKey : '';

        leaving.current = false;

        if (reduced) {
            if (entering) {
                element.style.opacity = '0';
            }

            const controls = animate(
                element,
                { ...resting, opacity: 1 },
                overlayTransition.reduced,
            );

            controls.then(() => {
                settled.current = true;
            });

            return () => controls.stop();
        }

        const from = entering
            ? distanceOffScreen(element, side)
            : currentOffset(element, axis);

        if (entering) {
            element.style.transform =
                axis === 'x'
                    ? `translateX(${from}px)`
                    : `translateY(${from}px)`;
        }

        const controls = animate(
            element,
            {
                ...(axis === 'x'
                    ? { x: [from, rest.offset] }
                    : { y: [from, rest.offset] }),
                scale: rest.scale,
            },
            overlayTransition.enter,
        );

        controls.then(() => {
            settled.current = true;
        });

        return () => controls.stop();
    }, [isPresent, reduced, ref, rest.offset, rest.scale, side]);

    React.useEffect(() => {
        const element = ref.current;

        if (isPresent || !element) {
            return undefined;
        }

        leaving.current = true;

        const controls = reduced
            ? animate(element, { opacity: 0 }, overlayTransition.reduced)
            : animate(
                  element,
                  axisTarget(sideAxis(side), distanceOffScreen(element, side)),
                  slideTransition.exit,
              );

        controls.then(() => safeToRemove?.());

        return () => controls.stop();
    }, [isPresent, reduced, ref, safeToRemove, side]);
}
