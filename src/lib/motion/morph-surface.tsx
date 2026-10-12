'use client';

import { usePresence, useReducedMotion } from 'motion/react';
import * as React from 'react';

import { assignRefs } from '@/lib/motion/assign-refs';
import { OverlayContentBoundary } from '@/lib/motion/overlay-state';
import { exitEase, morphDuration, springEase } from '@/lib/motion/tokens';

const FADE_MS = 150;

export function triggerOf(element: HTMLElement): HTMLElement | null {
    const labelledBy = element.getAttribute('aria-labelledby');

    if (labelledBy) {
        return document.getElementById(labelledBy);
    }

    return element.id
        ? document.querySelector<HTMLElement>(
              `[aria-controls="${CSS.escape(element.id)}"]`,
          )
        : null;
}

function closedClip(element: HTMLElement): string | null {
    const trigger = triggerOf(element);

    if (!trigger) {
        return null;
    }

    const box = element.getBoundingClientRect();
    const button = trigger.getBoundingClientRect();
    const left = Math.max(0, button.left - box.left);
    const top = Math.max(0, button.top - box.top);
    const right = Math.max(0, box.right - button.right);
    const bottom = Math.max(0, box.bottom - button.bottom);

    return `inset(${top}px ${right}px ${bottom}px ${left}px round ${button.height / 2}px)`;
}

function openClip(element: HTMLElement): string {
    return `inset(0px 0px 0px 0px round ${getComputedStyle(element).borderTopLeftRadius})`;
}

function play(element: HTMLElement, growing: boolean): Animation {
    const closed = closedClip(element);

    if (!closed) {
        return element.animate([{ opacity: 0 }, { opacity: 1 }], {
            duration: FADE_MS,
            easing: 'ease-out',
            direction: growing ? 'normal' : 'reverse',
            fill: growing ? 'none' : 'forwards',
        });
    }

    return element.animate(
        [{ clipPath: closed }, { clipPath: openClip(element) }],
        {
            duration: morphDuration,
            easing: growing ? springEase : exitEase,
            direction: growing ? 'normal' : 'reverse',
            fill: growing ? 'backwards' : 'forwards',
        },
    );
}

export const MorphSurface = React.forwardRef<
    HTMLDivElement,
    React.ComponentProps<'div'>
>(function MorphSurface({ children, ...props }, forwardedRef) {
    const ref = React.useRef<HTMLDivElement>(null);
    const reduced = useReducedMotion() ?? false;
    const [isPresent, safeToRemove] = usePresence();
    const remove = React.useRef(safeToRemove);
    const composedRef = React.useMemo(
        () => assignRefs(ref, forwardedRef),
        [forwardedRef],
    );

    remove.current = safeToRemove;

    React.useLayoutEffect(() => {
        const element = ref.current;

        if (!element || typeof element.animate !== 'function') {
            if (isPresent) {
                return undefined;
            }

            const timer = setTimeout(() => remove.current?.(), FADE_MS);

            return () => clearTimeout(timer);
        }

        if (reduced) {
            const fade = element.animate([{ opacity: 0 }, { opacity: 1 }], {
                duration: FADE_MS,
                direction: isPresent ? 'normal' : 'reverse',
                fill: isPresent ? 'none' : 'forwards',
            });

            fade.onfinish = () => {
                if (!isPresent) {
                    remove.current?.();
                }
            };

            return () => fade.cancel();
        }

        let animation: Animation | undefined;
        const hide = isPresent
            ? element.animate([{ opacity: 0 }, { opacity: 0 }], {
                  duration: 1000,
              })
            : undefined;
        const frame = requestAnimationFrame(() => {
            hide?.cancel();
            animation = play(element, isPresent);
            animation.onfinish = () => {
                if (!isPresent) {
                    remove.current?.();
                }
            };
        });

        return () => {
            cancelAnimationFrame(frame);
            hide?.cancel();
            animation?.cancel();
        };
    }, [isPresent, reduced]);

    return (
        <div {...props} ref={composedRef} data-morph-surface="">
            <OverlayContentBoundary>{children}</OverlayContentBoundary>
        </div>
    );
});
