'use client';

import { animate } from 'motion/react';
import * as React from 'react';

import {
    axisTarget,
    sideAxis,
    sideSign,
    type SheetSide,
} from '@/lib/motion/side';
import { swallowNextClick, yieldsToContent } from '@/lib/motion/swipe-guards';
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
                start ||
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

            if ((event.buttons & 1) === 0) {
                onPointerCancel();

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
                velocity: releaseVelocity(
                    samples.filter(
                        (sample) =>
                            performance.now() - sample.at <=
                            swipeThresholds.window,
                    ),
                ),
                size: axis === 'x' ? rect.width : rect.height,
                sign,
            });

            if (closing && latest.current.dismissible) {
                latest.current.onDismiss();

                return;
            }

            settle();
        };

        const onPointerCancel = (event?: PointerEvent) => {
            if (event && start && event.pointerId !== start.id) {
                return;
            }

            if (dragging) {
                settle();
            }

            start = null;
            dragging = false;
        };

        element.style.touchAction = axis === 'x' ? 'pan-y' : 'pan-x';
        element.addEventListener('pointerdown', onPointerDown);
        element.addEventListener('pointermove', onPointerMove);
        window.addEventListener('pointerup', onPointerUp, true);
        window.addEventListener('pointercancel', onPointerCancel, true);

        return () => {
            element.style.touchAction = '';
            element.removeEventListener('pointerdown', onPointerDown);
            element.removeEventListener('pointermove', onPointerMove);
            window.removeEventListener('pointerup', onPointerUp, true);
            window.removeEventListener('pointercancel', onPointerCancel, true);
        };
    }, [enabled, ref, side]);
}
