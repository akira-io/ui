import * as React from 'react';

import { stackCornerRadius } from '@/components/ui/bar-stack-geometry';

export function useBarRadius(
    barRef: React.RefObject<HTMLElement | null>,
    maxRadius: number,
): number | undefined {
    const [radius, setRadius] = React.useState<number>();

    React.useEffect(() => {
        const bar = barRef.current;

        if (!bar) {
            return;
        }

        const measure = () => {
            const { width, height } = bar.getBoundingClientRect();

            setRadius(
                width > 0 && height > 0
                    ? stackCornerRadius(
                          { x: 0, y: 0, width, height },
                          maxRadius,
                          true,
                      )
                    : undefined,
            );
        };

        measure();

        const observer =
            typeof ResizeObserver === 'undefined'
                ? null
                : new ResizeObserver(measure);

        observer?.observe(bar);

        return () => observer?.disconnect();
    }, [barRef, maxRadius]);

    return radius;
}
