import { useCallback, useEffect, useState } from 'react';

function scrollParent(element: HTMLElement): HTMLElement | Window {
    for (
        let parent = element.parentElement;
        parent;
        parent = parent.parentElement
    ) {
        if (/(auto|scroll)/.test(getComputedStyle(parent).overflowY)) {
            return parent;
        }
    }

    return window;
}

function offsetOf(target: HTMLElement | Window): number {
    return target === window
        ? window.scrollY
        : (target as HTMLElement).scrollTop;
}

export function useScrolledUnder<T extends HTMLElement>(): [
    (element: T | null) => void,
    boolean,
] {
    const [element, setElement] = useState<T | null>(null);
    const [scrolled, setScrolled] = useState(false);
    const ref = useCallback((node: T | null) => setElement(node), []);

    useEffect(() => {
        if (!element) {
            return;
        }

        const update = () => setScrolled(offsetOf(scrollParent(element)) > 0);

        update();
        window.addEventListener('scroll', update, {
            capture: true,
            passive: true,
        });
        window.addEventListener('resize', update);

        return () => {
            window.removeEventListener('scroll', update, { capture: true });
            window.removeEventListener('resize', update);
        };
    }, [element]);

    return [ref, scrolled];
}
