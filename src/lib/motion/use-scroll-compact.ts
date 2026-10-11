'use client';

import * as React from 'react';

const THRESHOLD = 8;

export function nextCompact(
    compact: boolean,
    anchor: number,
    y: number,
): { compact: boolean; anchor: number } {
    if (y < THRESHOLD) {
        return { compact: false, anchor: y };
    }

    if (compact) {
        return anchor - y > THRESHOLD
            ? { compact: false, anchor: y }
            : { compact, anchor: Math.max(anchor, y) };
    }

    return y - anchor > THRESHOLD
        ? { compact: true, anchor: y }
        : { compact, anchor: Math.min(anchor, y) };
}

function contentOffset(target: EventTarget | null): number | null {
    if (!(target instanceof HTMLElement)) {
        return window.scrollY;
    }

    return target.dataset.slot === 'sidebar-inset' ? target.scrollTop : null;
}

export function useScrollCompact(enabled: boolean): boolean {
    const [compact, setCompact] = React.useState(false);

    React.useEffect(() => {
        if (!enabled) {
            setCompact(false);

            return undefined;
        }

        let state = { compact: false, anchor: window.scrollY };

        const onScroll = (event: Event) => {
            const y = contentOffset(event.target);

            if (y === null) {
                return;
            }

            state = nextCompact(state.compact, state.anchor, y);
            setCompact(state.compact);
        };

        window.addEventListener('scroll', onScroll, {
            capture: true,
            passive: true,
        });

        return () =>
            window.removeEventListener('scroll', onScroll, { capture: true });
    }, [enabled]);

    return compact;
}
