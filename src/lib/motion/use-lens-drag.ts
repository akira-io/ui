'use client';

import { animate, useReducedMotion } from 'motion/react';
import * as React from 'react';

import { swallowNextClick } from '@/lib/motion/swipe-guards';
import { overlayTransition, swipeThresholds } from '@/lib/motion/tokens';

const START_DISTANCE = 4;

function lensAxis(lens: HTMLElement, axis: 'X' | 'Y'): number {
    const translate = new RegExp(`translate${axis}\\((-?[\\d.]+)px\\)`).exec(
        lens.style.transform,
    );

    return translate ? Number(translate[1]) : 0;
}

function resist(position: number, min: number, max: number): number {
    if (position < min) {
        return min + (position - min) * swipeThresholds.resistance;
    }

    return position > max
        ? max + (position - max) * swipeThresholds.resistance
        : position;
}

function centerOf(item: HTMLElement): number {
    return item.offsetLeft + item.offsetWidth / 2;
}

function nearest(
    items: HTMLElement[],
    center: number,
): HTMLElement | undefined {
    return items.reduce<HTMLElement | undefined>(
        (best, item) =>
            !best ||
            Math.abs(centerOf(item) - center) <
                Math.abs(centerOf(best) - center)
                ? item
                : best,
        undefined,
    );
}

export function useLensDrag(
    trackRef: React.RefObject<HTMLElement | null>,
    lensRef: React.RefObject<HTMLElement | null>,
    itemSelector: string,
): void {
    const reduced = useReducedMotion() ?? false;

    React.useEffect(() => {
        const track = trackRef.current;
        const lens = lensRef.current;

        if (!track || !lens) {
            return undefined;
        }

        let stopDrag: (() => void) | null = null;
        let settleFrame = 0;
        const settle = reduced ? { duration: 0 } : overlayTransition.enter;

        const snapTo = (item: HTMLElement | null | undefined) => {
            if (item) {
                animate(
                    lens,
                    { x: item.offsetLeft, y: item.offsetTop },
                    settle,
                );
            }
        };

        const activeItem = () =>
            track.querySelector<HTMLElement>(
                `${itemSelector}[data-state="active"]`,
            );

        const onPointerDown = (event: PointerEvent) => {
            const target =
                event.target instanceof Element
                    ? event.target.closest<HTMLElement>(itemSelector)
                    : null;

            if (
                stopDrag ||
                event.button !== 0 ||
                target?.dataset.state !== 'active'
            ) {
                return;
            }

            const pointer = event.pointerId;
            const startX = event.clientX;
            const startOffset = lensAxis(lens, 'X');
            const row = lensAxis(lens, 'Y');
            const items = () => [
                ...track.querySelectorAll<HTMLElement>(itemSelector),
            ];
            let dragging = false;
            let hovered: HTMLElement | undefined;

            const mark = (next: HTMLElement | undefined) => {
                hovered?.removeAttribute('data-hovered');
                hovered = next;
                hovered?.setAttribute('data-hovered', '');
            };

            const onMove = (move: PointerEvent) => {
                const delta = move.clientX - startX;

                if (
                    move.pointerId !== pointer ||
                    (!dragging && Math.abs(delta) < START_DISTANCE)
                ) {
                    return;
                }

                dragging = true;

                const width = lens.offsetWidth || target.offsetWidth;
                const position = resist(
                    startOffset + delta,
                    0,
                    track.offsetWidth - width,
                );

                animate(lens, { x: position, y: row }, { duration: 0 });
                mark(nearest(items(), position + width / 2));
            };

            const finish = (choose: boolean) => (end: PointerEvent) => {
                if (end.pointerId !== pointer) {
                    return;
                }

                stopDrag?.();

                if (!dragging) {
                    return;
                }

                const destination = choose ? hovered : undefined;

                mark(undefined);
                snapTo(destination ?? activeItem());

                if (destination && destination.dataset.state !== 'active') {
                    destination.click();
                    settleFrame = requestAnimationFrame(() => {
                        if (destination.dataset.state !== 'active') {
                            snapTo(activeItem());
                        }
                    });
                }

                swallowNextClick();
            };

            const onUp = finish(true);
            const onCancel = finish(false);

            window.addEventListener('pointermove', onMove);
            window.addEventListener('pointerup', onUp);
            window.addEventListener('pointercancel', onCancel);
            stopDrag = () => {
                window.removeEventListener('pointermove', onMove);
                window.removeEventListener('pointerup', onUp);
                window.removeEventListener('pointercancel', onCancel);
                stopDrag = null;
            };
        };

        track.addEventListener('pointerdown', onPointerDown);

        return () => {
            track.removeEventListener('pointerdown', onPointerDown);
            cancelAnimationFrame(settleFrame);
            stopDrag?.();
        };
    }, [itemSelector, lensRef, reduced, trackRef]);
}
