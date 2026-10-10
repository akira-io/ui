'use client';

import { animate } from 'motion/react';
import * as React from 'react';

import { swallowNextClick } from '@/lib/motion/swipe-guards';
import { overlayTransition, swipeThresholds } from '@/lib/motion/tokens';

const START_DISTANCE = 4;

function lensOffset(lens: HTMLElement): number {
    const translate = /translateX\((-?[\d.]+)px\)/.exec(lens.style.transform);

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

function nearest(
    items: HTMLElement[],
    center: number,
): HTMLElement | undefined {
    return items.reduce<HTMLElement | undefined>((best, item) => {
        const distance = Math.abs(
            item.offsetLeft + item.offsetWidth / 2 - center,
        );
        const bestDistance = best
            ? Math.abs(best.offsetLeft + best.offsetWidth / 2 - center)
            : Infinity;

        return distance < bestDistance ? item : best;
    }, undefined);
}

export function useLensDrag(
    trackRef: React.RefObject<HTMLElement | null>,
    lensRef: React.RefObject<HTMLElement | null>,
    itemSelector: string,
): void {
    React.useEffect(() => {
        const track = trackRef.current;
        const lens = lensRef.current;

        if (!track || !lens) {
            return undefined;
        }

        let stopDrag: (() => void) | null = null;

        const onPointerDown = (event: PointerEvent) => {
            const target =
                event.target instanceof Element
                    ? event.target.closest<HTMLElement>(itemSelector)
                    : null;

            if (event.button !== 0 || target?.dataset.state !== 'active') {
                return;
            }

            const startX = event.clientX;
            const startOffset = lensOffset(lens);
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

                if (!dragging && Math.abs(delta) < START_DISTANCE) {
                    return;
                }

                dragging = true;

                const width = lens.offsetWidth || target.offsetWidth;
                const position = resist(
                    startOffset + delta,
                    0,
                    track.offsetWidth - width,
                );

                animate(lens, { x: position }, { duration: 0 });
                mark(nearest(items(), position + width / 2));
            };

            const finish = (choose: boolean) => {
                stopDrag?.();

                if (!dragging) {
                    return;
                }

                const destination = hovered;

                mark(undefined);

                if (destination && choose) {
                    animate(
                        lens,
                        { x: destination.offsetLeft },
                        overlayTransition.enter,
                    );

                    if (destination.dataset.state !== 'active') {
                        destination.click();
                    }
                }

                swallowNextClick();
            };

            const onUp = () => finish(true);
            const onCancel = () => finish(false);

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
            stopDrag?.();
        };
    }, [itemSelector, lensRef, trackRef]);
}
