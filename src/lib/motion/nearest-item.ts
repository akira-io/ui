export function centerOf(item: HTMLElement): number {
    return item.offsetLeft + item.offsetWidth / 2;
}

export function nearestByCenter(
    items: HTMLElement[],
    center: number,
): HTMLElement | undefined {
    return items.reduce<HTMLElement | undefined>(
        (best, item) =>
            !best ||
            Math.abs(centerOf(item) - center) <
                Math.abs(centerOf(best) - center)
                ? item
                : best,
        undefined,
    );
}
