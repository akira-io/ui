import * as React from 'react';

export function useMeasuredHeight(
    ref: React.RefObject<HTMLElement | null>,
): number | undefined {
    const [height, setHeight] = React.useState<number>();

    React.useLayoutEffect(() => {
        if (!ref.current || typeof ResizeObserver === 'undefined') {
            return undefined;
        }

        const observer = new ResizeObserver(([entry]) => {
            setHeight(entry?.contentRect.height);
        });

        observer.observe(ref.current);

        return () => observer.disconnect();
    }, [ref]);

    return height;
}
