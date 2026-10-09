import type { SlideAxis } from '@/lib/motion/side';

const FIELDS =
    'input, textarea, select, [contenteditable=""], [contenteditable="true"]';

function canScrollTowardsClose(
    element: Element,
    axis: SlideAxis,
    sign: 1 | -1,
): boolean {
    const style = getComputedStyle(element);
    const overflow = axis === 'x' ? style.overflowX : style.overflowY;

    if (!/(auto|scroll)/.test(overflow)) {
        return false;
    }

    const position = axis === 'x' ? element.scrollLeft : element.scrollTop;
    const room =
        axis === 'x'
            ? element.scrollWidth - element.clientWidth
            : element.scrollHeight - element.clientHeight;

    return sign > 0 ? position > 0 : position < room;
}

export function yieldsToContent(
    target: EventTarget | null,
    root: HTMLElement,
    axis: SlideAxis,
    sign: 1 | -1,
): boolean {
    if (!(target instanceof Element) || target.closest(FIELDS)) {
        return true;
    }

    for (
        let node: Element | null = target;
        node;
        node = node === root ? null : node.parentElement
    ) {
        if (canScrollTowardsClose(node, axis, sign)) {
            return true;
        }
    }

    return false;
}

export function swallowNextClick(): void {
    const swallow = (event: MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();
    };

    window.addEventListener('click', swallow, { capture: true, once: true });
    setTimeout(
        () => window.removeEventListener('click', swallow, { capture: true }),
        0,
    );
}
