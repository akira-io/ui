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

        const target = scrollParent(element);
        const update = () => setScrolled(offsetOf(target) > 0);

        update();
        target.addEventListener('scroll', update, { passive: true });

        return () => target.removeEventListener('scroll', update);
    }, [element]);

    return [ref, scrolled];
}
