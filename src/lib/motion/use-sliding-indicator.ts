'use client';

import { animate, useReducedMotion } from 'motion/react';
import * as React from 'react';

import { overlayTransition } from '@/lib/motion/tokens';

interface IndicatorFrame {
    x: number;
    y: number;
    width: number;
    height: number;
}

function offsetsToRoot(node: HTMLElement, stop: HTMLElement | null) {
    let x = 0;
    let y = 0;
    let current: HTMLElement | null = node;

    while (current && current !== stop) {
        x += current.offsetLeft;
        y += current.offsetTop;
        current = current.offsetParent as HTMLElement | null;
    }

    return { x, y, reached: current === stop };
}

function frameOf(target: HTMLElement, list: HTMLElement): IndicatorFrame {
    const within = offsetsToRoot(target, list);
    const size = { width: target.offsetWidth, height: target.offsetHeight };

    if (within.reached) {
        return { x: within.x, y: within.y, ...size };
    }

    const origin = offsetsToRoot(list, null);

    return {
        x: within.x - origin.x - list.clientLeft,
        y: within.y - origin.y - list.clientTop,
        ...size,
    };
}

function place(pill: HTMLElement, frame: IndicatorFrame, opacity: number) {
    pill.style.transform = `translateX(${frame.x}px) translateY(${frame.y}px)`;
    pill.style.width = `${frame.width}px`;
    pill.style.height = `${frame.height}px`;
    pill.style.opacity = String(opacity);
}

export function useSlidingIndicator(
    listRef: React.RefObject<HTMLElement | null>,
    indicatorRef: React.RefObject<HTMLElement | null>,
    selector: string,
    enabled = true,
): void {
    const reduced = useReducedMotion() ?? false;

    React.useLayoutEffect(() => {
        const list = listRef.current;
        const pill = indicatorRef.current;

        if (!list || !pill || !enabled) {
            return undefined;
        }

        let current: IndicatorFrame | null = null;
        let controls: ReturnType<typeof animate> | undefined;

        const follow = (snap = false) => {
            const target = list.querySelector<HTMLElement>(selector);

            controls?.stop();

            if (!target) {
                current = null;
                controls = animate(
                    pill,
                    { opacity: 0 },
                    { duration: reduced ? 0 : 0.15 },
                );

                return;
            }

            const next = frameOf(target, list);

            if (!current || reduced || snap) {
                current = next;
                place(pill, next, 1);

                return;
            }

            const from = current;

            current = next;
            controls = animate(
                pill,
                {
                    x: [from.x, next.x],
                    y: [from.y, next.y],
                    width: [from.width, next.width],
                    height: [from.height, next.height],
                    opacity: 1,
                },
                overlayTransition.enter,
            );
        };

        follow();

        const mutations = new MutationObserver(() => follow());

        mutations.observe(list, {
            subtree: true,
            attributes: true,
            attributeFilter: ['data-state'],
        });

        const resizes =
            typeof ResizeObserver === 'undefined'
                ? null
                : new ResizeObserver(() => follow(true));

        resizes?.observe(list);

        return () => {
            mutations.disconnect();
            resizes?.disconnect();
            controls?.stop();
        };
    }, [enabled, indicatorRef, listRef, reduced, selector]);
}
