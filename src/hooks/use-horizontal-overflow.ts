import * as React from 'react';

export function useHorizontalOverflow(
    containerRef: React.RefObject<HTMLElement | null>,
): boolean {
    const [hasContentAfter, setHasContentAfter] = React.useState(false);

    React.useEffect(() => {
        const container = containerRef.current;

        if (!container) {
            return;
        }

        const measure = () => {
            const hidden =
                container.scrollWidth -
                container.clientWidth -
                Math.abs(container.scrollLeft);

            setHasContentAfter(hidden > 1);
        };

        measure();
        container.addEventListener('scroll', measure, { passive: true });

        const observer =
            typeof ResizeObserver === 'undefined'
                ? null
                : new ResizeObserver(measure);

        if (observer) {
            observer.observe(container);

            for (const child of Array.from(container.children)) {
                observer.observe(child);
            }
        }

        return () => {
            container.removeEventListener('scroll', measure);
            observer?.disconnect();
            setHasContentAfter(false);
        };
    }, [containerRef]);

    return hasContentAfter;
}
