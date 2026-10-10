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

export function useScrollCompact(enabled: boolean): boolean {
    const [compact, setCompact] = React.useState(false);

    React.useEffect(() => {
        if (!enabled) {
            setCompact(false);

            return undefined;
        }

        let state = { compact: false, anchor: window.scrollY };

        const onScroll = () => {
            state = nextCompact(state.compact, state.anchor, window.scrollY);
            setCompact(state.compact);
        };

        window.addEventListener('scroll', onScroll, { passive: true });

        return () => window.removeEventListener('scroll', onScroll);
    }, [enabled]);

    return compact;
}
