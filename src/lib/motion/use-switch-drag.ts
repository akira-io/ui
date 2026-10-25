'use client';

import * as React from 'react';

import { swallowNextClick } from '@/lib/motion/swipe-guards';

const START_DISTANCE = 3;

export function useSwitchDrag(
    rootRef: React.RefObject<HTMLButtonElement | null>,
): void {
    React.useEffect(() => {
        const root = rootRef.current;

        if (!root) {
            return undefined;
        }

        let endGesture: (() => void) | null = null;

        const onPointerDown = (event: PointerEvent) => {
            if (event.button !== 0 || root.disabled) {
                return;
            }

            const pointer = event.pointerId;
            const startX = event.clientX;
            const box = root.getBoundingClientRect();
            const wasOn = root.dataset.state === 'checked';
            let dragging = false;

            root.setAttribute('data-pressed', '');

            const onMove = (move: PointerEvent) => {
                if (move.pointerId !== pointer) {
                    return;
                }

                if (
                    !dragging &&
                    Math.abs(move.clientX - startX) < START_DISTANCE
                ) {
                    return;
                }

                dragging = true;
                root.setAttribute('data-dragging', '');
                root.style.setProperty(
                    '--switch-drag',
                    `${Math.min(box.width, Math.max(0, move.clientX - box.left))}px`,
                );
            };

            const release = () => {
                window.removeEventListener('pointermove', onMove);
                window.removeEventListener('pointerup', onUp);
                window.removeEventListener('pointercancel', onUp);
                root.removeAttribute('data-pressed');
                root.removeAttribute('data-dragging');
                root.style.removeProperty('--switch-drag');
                endGesture = null;
            };

            const onUp = (end: PointerEvent) => {
                if (end.pointerId !== pointer) {
                    return;
                }

                release();

                if (!dragging) {
                    return;
                }

                if (end.clientX - box.left > box.width / 2 !== wasOn) {
                    root.click();
                }

                swallowNextClick();
            };

            endGesture = release;
            window.addEventListener('pointermove', onMove);
            window.addEventListener('pointerup', onUp);
            window.addEventListener('pointercancel', onUp);
        };

        root.addEventListener('pointerdown', onPointerDown);

        return () => {
            root.removeEventListener('pointerdown', onPointerDown);
            endGesture?.();
        };
    }, [rootRef]);
}
