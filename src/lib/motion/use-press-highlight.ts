'use client';

import { animate, useReducedMotion } from 'motion/react';
import * as React from 'react';

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

function placeAt(highlight: HTMLElement, frame: ReturnType<typeof frameOf>) {
    highlight.style.transform = `translateX(${frame.x}px) translateY(${frame.y}px)`;
    highlight.style.width = `${frame.width}px`;
    highlight.style.height = `${frame.height}px`;
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
        let blockNativeClick = false;
        let hovered: HTMLElement | undefined;

        const hoverOn = (next: HTMLElement | undefined) => {
            if (next === hovered) {
                return;
            }

            const shown = hovered !== undefined;

            hovered?.removeAttribute('data-hovered');
            hovered = next;

            if (!next) {
                animate(highlight, { opacity: 0 }, { duration: 0.15 });

                return;
            }

            next.setAttribute('data-hovered', '');

            const frame = frameOf(next);

            if (!shown) {
                placeAt(highlight, frame);
                animate(highlight, { ...frame, opacity: 1 }, { duration: 0.1 });

                return;
            }

            animate(highlight, { ...frame, opacity: 1 }, glide);
        };

        const onHover = (event: PointerEvent) => {
            if (stopPress || event.pointerType !== 'mouse') {
                return;
            }

            hoverOn(
                underPointer(
                    group,
                    [...group.querySelectorAll<HTMLElement>(actionSelector)],
                    event,
                ),
            );
        };

        const onLeave = () => {
            if (!stopPress) {
                hoverOn(undefined);
            }
        };
        const glide = reduced ? { duration: 0 } : overlayTransition.enter;

        const onPointerDown = (event: PointerEvent) => {
            const start =
                event.target instanceof Element
                    ? event.target.closest<HTMLElement>(actionSelector)
                    : null;

            if (stopPress || event.button !== 0 || !start) {
                return;
            }

            blockNativeClick = false;
            hovered?.removeAttribute('data-hovered');
            hovered = undefined;

            const pointer = event.pointerId;
            const actions = () => [
                ...group.querySelectorAll<HTMLElement>(actionSelector),
            ];
            let current: HTMLElement | undefined = start;
            const startFrame = frameOf(start);

            placeAt(highlight, startFrame);
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
                    mark(underPointer(group, actions(), move));
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

                blockNativeClick = true;

                if (target && !target.hasAttribute('data-disabled')) {
                    target.click();
                }
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

        const onClick = (event: MouseEvent) => {
            if (blockNativeClick && event.detail > 0) {
                blockNativeClick = false;
                event.preventDefault();
                event.stopPropagation();
            }
        };

        group.addEventListener('pointerdown', onPointerDown);
        group.addEventListener('pointermove', onHover);
        group.addEventListener('pointerleave', onLeave);
        group.addEventListener('click', onClick, true);

        return () => {
            group.removeEventListener('pointerdown', onPointerDown);
            group.removeEventListener('pointermove', onHover);
            group.removeEventListener('pointerleave', onLeave);
            group.removeEventListener('click', onClick, true);
            stopPress?.();
        };
    }, [actionSelector, groupRef, highlightRef, reduced]);
}
