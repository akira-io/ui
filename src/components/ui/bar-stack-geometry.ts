export type StackBox = { x: number; y: number; width: number; height: number };

function round(value: number): number {
    return Math.round(value * 10_000) / 10_000;
}

function normalize({ x, y, width, height }: StackBox): StackBox {
    return {
        x: Math.min(x, x + width),
        y: Math.min(y, y + height),
        width: Math.abs(width),
        height: Math.abs(height),
    };
}

export function stackSideTotal(
    datum: Readonly<Record<string, unknown>> | undefined,
    keys: readonly string[],
    negative: boolean,
): number {
    return keys
        .map((key) => Number(datum?.[key]))
        .filter((value) => Number.isFinite(value) && value < 0 === negative)
        .reduce((sum, value) => sum + value, 0);
}

export function stackSideOutline(
    segment: StackBox,
    base: number,
    tip: number,
    horizontal: boolean,
): StackBox {
    const bar = normalize(segment);
    const start = round(Math.min(base, tip));
    const length = round(Math.abs(tip - base));

    return horizontal
        ? { x: start, y: bar.y, width: length, height: bar.height }
        : { x: bar.x, y: start, width: bar.width, height: length };
}

export function stackCornerRadius(
    box: StackBox,
    radius: number,
    horizontal: boolean,
): number {
    const thickness = horizontal ? box.height : box.width;
    const length = horizontal ? box.width : box.height;

    return round(Math.max(0, Math.min(radius, thickness / 6, length / 2)));
}
