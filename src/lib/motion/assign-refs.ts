import type * as React from 'react';

export function assignRefs<T>(
    ...refs: (React.Ref<T> | undefined)[]
): React.RefCallback<T> {
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
