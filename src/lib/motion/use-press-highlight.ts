'use client';

import { animate, useReducedMotion } from 'motion/react';
import * as React from 'react';

import { swallowNextClick } from '@/lib/motion/swipe-guards';
import { overlayTransition } from '@/lib/motion/tokens';

const VERTICAL_SLACK = 24;

function frameOf(action: HTMLElement) {
    return {
        x: action.offsetLeft,
        y: action.offsetTop,
        width: action.offsetWidth,
        height: action.offsetHeight,
    };
}

function underPointer(
    group: HTMLElement,
    actions: HTMLElement[],
    event: PointerEvent,
): HTMLElement | undefined {
    const box = group.getBoundingClientRect();
    const inside =
        event.clientX >= box.left &&
        event.clientX <= box.right &&
        event.clientY >= box.top - VERTICAL_SLACK &&
        event.clientY <= box.bottom + VERTICAL_SLACK;

    if (!inside) {
        return undefined;
    }

    const x = event.clientX - box.left;

    return actions.reduce<HTMLElement | undefined>((best, action) => {
        const distance = Math.abs(
            action.offsetLeft + action.offsetWidth / 2 - x,
        );
        const bestDistance = best
            ? Math.abs(best.offsetLeft + best.offsetWidth / 2 - x)
            : Infinity;

        return distance < bestDistance ? action : best;
    }, undefined);
}

export function usePressHighlight(
    groupRef: React.RefObject<HTMLElement | null>,
    highlightRef: React.RefObject<HTMLElement | null>,
    actionSelector: string,
): void {
    const reduced = useReducedMotion() ?? false;

    React.useEffect(() => {
        const group = groupRef.current;
        const highlight = highlightRef.current;

        if (!group || !highlight) {
            return undefined;
        }

        let stopPress: (() => void) | null = null;
        const glide = reduced ? { duration: 0 } : overlayTransition.enter;

        const onPointerDown = (event: PointerEvent) => {
            const start =
                event.target instanceof Element
                    ? event.target.closest<HTMLElement>(actionSelector)
                    : null;

            if (stopPress || event.button !== 0 || !start) {
                return;
            }

            const pointer = event.pointerId;
            const actions = [
                ...group.querySelectorAll<HTMLElement>(actionSelector),
            ];
            let current: HTMLElement | undefined = start;
            const startFrame = frameOf(start);

            highlight.style.transform = `translateX(${startFrame.x}px) translateY(${startFrame.y}px)`;
            highlight.style.width = `${startFrame.width}px`;
            highlight.style.height = `${startFrame.height}px`;
            animate(
                highlight,
                { x: startFrame.x, y: startFrame.y, opacity: 1 },
                { duration: 0.1 },
            );
            start.setAttribute('data-pressed', '');

            const mark = (next: HTMLElement | undefined) => {
                if (next === current) {
                    return;
                }

                current?.removeAttribute('data-pressed');
                current = next;

                if (!next) {
                    animate(highlight, { opacity: 0 }, { duration: 0.1 });

                    return;
                }

                next.setAttribute('data-pressed', '');
                animate(highlight, { ...frameOf(next), opacity: 1 }, glide);
            };

            const onMove = (move: PointerEvent) => {
                if (move.pointerId === pointer) {
                    mark(underPointer(group, actions, move));
                }
            };

            const finish = (run: boolean) => (end: PointerEvent) => {
                if (end.pointerId !== pointer) {
                    return;
                }

                stopPress?.();

                const target = run ? current : undefined;

                current?.removeAttribute('data-pressed');
                animate(highlight, { opacity: 0 }, { duration: 0.1 });

                if (target === start) {
                    return;
                }

                target?.click();
                swallowNextClick();
            };

            const onUp = finish(true);
            const onCancel = finish(false);

            window.addEventListener('pointermove', onMove);
            window.addEventListener('pointerup', onUp);
            window.addEventListener('pointercancel', onCancel);
            stopPress = () => {
                window.removeEventListener('pointermove', onMove);
                window.removeEventListener('pointerup', onUp);
                window.removeEventListener('pointercancel', onCancel);
                stopPress = null;
            };
        };

        group.addEventListener('pointerdown', onPointerDown);

        return () => {
            group.removeEventListener('pointerdown', onPointerDown);
            stopPress?.();
        };
    }, [actionSelector, groupRef, highlightRef, reduced]);
}
