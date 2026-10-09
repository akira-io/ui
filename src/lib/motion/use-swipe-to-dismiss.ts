'use client';

import { animate } from 'motion/react';
import * as React from 'react';

import {
    axisTarget,
    sideAxis,
    sideSign,
    type SheetSide,
    type SlideAxis,
} from '@/lib/motion/side';
import { overlayTransition, swipeThresholds } from '@/lib/motion/tokens';

export interface SwipeToDismissOptions {
    side: SheetSide;
    onDismiss: () => void;
    enabled?: boolean;
    dismissible?: boolean;
    rest?: number;
}

interface SwipeSample {
    offset: number;
    at: number;
}

const FIELDS =
    'input, textarea, select, [contenteditable=""], [contenteditable="true"]';

export function swipeOffset(
    delta: number,
    sign: 1 | -1,
    dismissible: boolean,
): number {
    return delta * sign > 0 && dismissible
        ? delta
        : delta * swipeThresholds.resistance;
}

export function shouldDismiss({
    offset,
    velocity,
    size,
    sign,
}: {
    offset: number;
    velocity: number;
    size: number;
    sign: 1 | -1;
}): boolean {
    return (
        offset * sign > size * swipeThresholds.distance ||
        velocity * sign > swipeThresholds.velocity
    );
}

function canScrollTowardsClose(
    element: HTMLElement,
    axis: SlideAxis,
    sign: 1 | -1,
): boolean {
    const style = getComputedStyle(element);
    const overflow = axis === 'x' ? style.overflowX : style.overflowY;

    if (!/(auto|scroll)/.test(overflow)) {
        return false;
    }

    const position = axis === 'x' ? element.scrollLeft : element.scrollTop;
    const room =
        axis === 'x'
            ? element.scrollWidth - element.clientWidth
            : element.scrollHeight - element.clientHeight;

    return sign > 0 ? position > 0 : position < room;
}

function yieldsToContent(
    target: EventTarget | null,
    root: HTMLElement,
    axis: SlideAxis,
    sign: 1 | -1,
): boolean {
    if (!(target instanceof HTMLElement) || target.closest(FIELDS)) {
        return true;
    }

    for (
        let node: HTMLElement | null = target;
        node;
        node = node === root ? null : node.parentElement
    ) {
        if (canScrollTowardsClose(node, axis, sign)) {
            return true;
        }
    }

    return false;
}

function swallowNextClick(): void {
    const swallow = (event: MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();
    };

    window.addEventListener('click', swallow, { capture: true, once: true });
    setTimeout(
        () => window.removeEventListener('click', swallow, { capture: true }),
        0,
    );
}

function releaseVelocity(samples: SwipeSample[]): number {
    const first = samples[0];
    const last = samples.at(-1);

    if (!first || !last || last.at === first.at) {
        return 0;
    }

    return ((last.offset - first.offset) / (last.at - first.at)) * 1000;
}

export function useSwipeToDismiss(
    ref: React.RefObject<HTMLElement | null>,
    {
        side,
        onDismiss,
        enabled = true,
        dismissible = true,
        rest = 0,
    }: SwipeToDismissOptions,
): void {
    const latest = React.useRef({ onDismiss, dismissible, rest });

    React.useLayoutEffect(() => {
        latest.current = { onDismiss, dismissible, rest };
    });

    React.useEffect(() => {
        const element = ref.current;

        if (!element || !enabled) {
            return undefined;
        }

        const axis = sideAxis(side);
        const sign = sideSign(side);
        const along = (event: PointerEvent) =>
            axis === 'x' ? event.clientX : event.clientY;
        const across = (event: PointerEvent) =>
            axis === 'x' ? event.clientY : event.clientX;
        let start: { along: number; across: number; id: number } | null = null;
        let dragging = false;
        let samples: SwipeSample[] = [];

        const settle = () =>
            animate(
                element,
                axisTarget(axis, latest.current.rest),
                overlayTransition.enter,
            );

        const onPointerDown = (event: PointerEvent) => {
            if (
                event.button !== 0 ||
                yieldsToContent(event.target, element, axis, sign)
            ) {
                return;
            }

            start = {
                along: along(event),
                across: across(event),
                id: event.pointerId,
            };
            dragging = false;
            samples = [];
        };

        const onPointerMove = (event: PointerEvent) => {
            if (!start || event.pointerId !== start.id) {
                return;
            }

            const delta = along(event) - start.along;
            const drift = across(event) - start.across;

            if (
                !dragging &&
                Math.max(Math.abs(delta), Math.abs(drift)) <
                    swipeThresholds.start
            ) {
                return;
            }

            if (!dragging && Math.abs(drift) > Math.abs(delta)) {
                start = null;

                return;
            }

            if (!dragging) {
                dragging = true;
                element.setPointerCapture?.(event.pointerId);
            }

            const offset = swipeOffset(delta, sign, latest.current.dismissible);
            const now = performance.now();

            samples = [
                ...samples.filter(
                    (sample) => now - sample.at <= swipeThresholds.window,
                ),
                { offset, at: now },
            ];
            animate(element, axisTarget(axis, latest.current.rest + offset), {
                duration: 0,
            });
        };

        const onPointerUp = (event: PointerEvent) => {
            if (!start || event.pointerId !== start.id) {
                return;
            }

            const wasDragging = dragging;

            start = null;
            dragging = false;

            if (!wasDragging) {
                return;
            }

            swallowNextClick();

            const rect = element.getBoundingClientRect();
            const closing = shouldDismiss({
                offset: samples.at(-1)?.offset ?? 0,
                velocity: releaseVelocity(samples),
                size: axis === 'x' ? rect.width : rect.height,
                sign,
            });

            if (closing && latest.current.dismissible) {
                latest.current.onDismiss();

                return;
            }

            settle();
        };

        const onPointerCancel = () => {
            if (dragging) {
                settle();
            }

            start = null;
            dragging = false;
        };

        element.style.touchAction = axis === 'x' ? 'pan-y' : 'pan-x';
        element.addEventListener('pointerdown', onPointerDown);
        element.addEventListener('pointermove', onPointerMove);
        element.addEventListener('pointerup', onPointerUp);
        element.addEventListener('pointercancel', onPointerCancel);

        return () => {
            element.style.touchAction = '';
            element.removeEventListener('pointerdown', onPointerDown);
            element.removeEventListener('pointermove', onPointerMove);
            element.removeEventListener('pointerup', onPointerUp);
            element.removeEventListener('pointercancel', onPointerCancel);
        };
    }, [enabled, ref, side]);
}
