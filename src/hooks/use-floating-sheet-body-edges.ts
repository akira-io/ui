import * as React from 'react';

import {
    floatingSheetDefaultEdges,
    type FloatingSheetEdges,
} from '@/components/ui/floating-sheet-context';

export function useFloatingSheetBodyEdges(
    containerRef: React.RefObject<HTMLElement | null>,
    topSentinelRef: React.RefObject<HTMLElement | null>,
    bottomSentinelRef: React.RefObject<HTMLElement | null>,
    reportEdges: ((edges: FloatingSheetEdges) => void) | null,
): void {
    React.useEffect(() => {
        const container = containerRef.current;
        const topSentinel = topSentinelRef.current;
        const bottomSentinel = bottomSentinelRef.current;

        if (
            !reportEdges ||
            !container ||
            !topSentinel ||
            !bottomSentinel ||
            typeof IntersectionObserver === 'undefined'
        ) {
            return;
        }

        let edges = floatingSheetDefaultEdges;
        const edgeKeyByTarget = new Map<Element, keyof FloatingSheetEdges>([
            [topSentinel, 'top'],
            [bottomSentinel, 'bottom'],
        ]);

        const observer = new IntersectionObserver(
            (entries) => {
                const next = { ...edges };

                for (const entry of entries) {
                    const key = edgeKeyByTarget.get(entry.target);

                    if (!key) {
                        continue;
                    }

                    next[key] = entry.isIntersecting;
                }

                edges = next;
                reportEdges(next);
            },
            { root: container, threshold: 0 },
        );

        observer.observe(topSentinel);
        observer.observe(bottomSentinel);

        return () => {
            observer.disconnect();
            reportEdges(floatingSheetDefaultEdges);
        };
    }, [containerRef, topSentinelRef, bottomSentinelRef, reportEdges]);
}
