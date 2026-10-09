export type SheetSide = 'top' | 'right' | 'bottom' | 'left';

export type SlideAxis = 'x' | 'y';

const OFFSCREEN: Record<
    SheetSide,
    (rect: DOMRect, viewport: { width: number; height: number }) => number
> = {
    right: (rect, viewport) => viewport.width - rect.left,
    left: (rect) => -rect.right,
    bottom: (rect, viewport) => viewport.height - rect.top,
    top: (rect) => -rect.bottom,
};

export function sideAxis(side: SheetSide): SlideAxis {
    return side === 'left' || side === 'right' ? 'x' : 'y';
}

export function sideSign(side: SheetSide): 1 | -1 {
    return side === 'right' || side === 'bottom' ? 1 : -1;
}

export function offscreenDistance(
    rect: DOMRect,
    side: SheetSide,
    viewport: { width: number; height: number },
): number {
    return OFFSCREEN[side](rect, viewport);
}

export function axisTarget(
    axis: SlideAxis,
    value: number,
): { x: number } | { y: number } {
    return axis === 'x' ? { x: value } : { y: value };
}
