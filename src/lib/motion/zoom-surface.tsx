'use client';

import * as React from 'react';

import { takeOrigin } from '@/lib/motion/origin-element';
import { useZoomFromOrigin } from '@/lib/motion/use-zoom-from-origin';

function assignRefs<T>(...refs: React.Ref<T>[]): React.RefCallback<T> {
    return (node) => {
        refs.forEach((ref) => {
            if (typeof ref === 'function') {
                ref(node);
                return;
            }

            if (ref) {
                (ref as React.MutableRefObject<T | null>).current = node;
            }
        });
    };
}

export const ZoomSurface = React.forwardRef<
    HTMLDivElement,
    React.ComponentProps<'div'>
>(function ZoomSurface(props, forwardedRef) {
    const ref = React.useRef<HTMLDivElement>(null);
    const [origin] = React.useState(takeOrigin);

    useZoomFromOrigin(ref, origin);

    return <div {...props} ref={assignRefs(ref, forwardedRef)} />;
});
