import type * as React from 'react';

export function assignRefs<T>(
    ...refs: (React.Ref<T> | undefined)[]
): React.RefCallback<T> {
    return (node) => {
        const cleanups = refs.map((ref) => {
            if (typeof ref === 'function') {
                const cleanup = ref(node);

                return typeof cleanup === 'function'
                    ? cleanup
                    : () => ref(null);
            }

            if (ref) {
                (ref as React.MutableRefObject<T | null>).current = node;

                return () => {
                    (ref as React.MutableRefObject<T | null>).current = null;
                };
            }

            return undefined;
        });

        return () => cleanups.forEach((cleanup) => cleanup?.());
    };
}
