import * as React from 'react';

const OPENING_RELEASE_MS = 300;

function fromRealPointer(event: React.MouseEvent): boolean {
    const native = event.nativeEvent;

    return native instanceof PointerEvent
        ? native.pointerType !== ''
        : event.detail > 0;
}

export interface OpeningGuard {
    trackOpening: (node: HTMLDivElement | null) => void | (() => void);
    ignoreOpeningRelease: (event: React.MouseEvent) => void;
    markMoved: () => void;
    openedContent: () => HTMLDivElement | null;
}

export function useOpeningGuard(
    forwardedRef: React.Ref<HTMLDivElement> | undefined,
): OpeningGuard {
    const content = React.useRef<WeakRef<HTMLDivElement> | null>(null);
    const openedAt = React.useRef(0);
    const movedSinceOpening = React.useRef(false);

    const trackOpening = React.useCallback(
        (node: HTMLDivElement | null): void | (() => void) => {
            if (node && node !== content.current?.deref()) {
                openedAt.current = performance.now();
                movedSinceOpening.current = false;
                content.current = new WeakRef(node);
            }

            if (typeof forwardedRef === 'function') {
                return forwardedRef(node);
            }

            if (forwardedRef) {
                forwardedRef.current = node;
            }

            return undefined;
        },
        [forwardedRef],
    );

    const ignoreOpeningRelease = (event: React.MouseEvent) => {
        if (
            fromRealPointer(event) &&
            !movedSinceOpening.current &&
            performance.now() - openedAt.current < OPENING_RELEASE_MS
        ) {
            event.preventDefault();
            event.stopPropagation();
        }
    };

    return {
        trackOpening,
        ignoreOpeningRelease,
        markMoved: () => {
            movedSinceOpening.current = true;
        },
        openedContent: () => content.current?.deref() ?? null,
    };
}
