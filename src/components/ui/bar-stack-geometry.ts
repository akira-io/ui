export type StackBox = { x: number; y: number; width: number; height: number };

type Datum = Readonly<Record<string, unknown>> | undefined;

type Span = { start: number; size: number };

function round(value: number): number {
    return Math.round(value * 10_000) / 10_000;
}

function pixelSpan(from: number, to: number): Span {
    const start = Math.round(Math.min(from, to));

    return { start, size: Math.round(Math.max(from, to)) - start };
}

function sideValues(
    datum: Datum,
    keys: readonly string[],
    negative: boolean,
): { key: string; value: number }[] {
    return keys
        .map((key) => ({ key, value: Number(datum?.[key]) }))
        .filter(
            ({ value }) => Number.isFinite(value) && value < 0 === negative,
        );
}

export function stackSideTotal(
    datum: Datum,
    keys: readonly string[],
    negative: boolean,
): number {
    return sideValues(datum, keys, negative).reduce(
        (sum, { value }) => sum + value,
        0,
    );
}

export function stackSideOwner(
    datum: Datum,
    keys: readonly string[],
    negative: boolean,
): string | undefined {
    return sideValues(datum, keys, negative).find(({ value }) => value !== 0)
        ?.key;
}

export function stackPixelBox(
    segment: StackBox,
    from: number,
    to: number,
    horizontal: boolean,
): StackBox {
    const along = pixelSpan(from, to);
    const across = horizontal
        ? pixelSpan(segment.y, segment.y + segment.height)
        : pixelSpan(segment.x, segment.x + segment.width);

    return horizontal
        ? {
              x: along.start,
              y: across.start,
              width: along.size,
              height: across.size,
          }
        : {
              x: across.start,
              y: along.start,
              width: across.size,
              height: along.size,
          };
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
