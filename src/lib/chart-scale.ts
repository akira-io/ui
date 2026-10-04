import type { ChartDatum } from '@/lib/chart-series';

export type ChartValueScale = 'linear' | 'log';

export type ChartValueBounds = [number | 'auto', number | 'auto'];

export type ChartValueDomain = ChartValueBounds | 'symmetric';

export type ChartValueSeries = { key: string; stack?: string };

export type ChartValueAxis = {
    domain: ChartValueBounds | undefined;
    ticks: number[] | undefined;
};

const CEILING_MANTISSAS = [1, 1.5, 2, 3, 4, 5, 10] as const;

const STEP_MANTISSAS = [1, 2, 2.5, 5] as const;

const TICK_COUNT = 5;

function magnitude(value: number): number {
    return 10 ** Math.floor(Math.log10(value));
}

function rounded(value: number): number {
    return Number(value.toPrecision(12));
}

export function niceCeiling(value: number): number {
    const reach = Math.abs(value);

    if (!Number.isFinite(reach) || reach === 0) {
        return 1;
    }

    const power = magnitude(reach);
    const mantissa = CEILING_MANTISSAS.find(
        (candidate) => candidate * power >= rounded(reach),
    );

    return rounded((mantissa ?? 10) * power);
}

function ticksWithStep(min: number, max: number, step: number): number[] {
    const first = Math.ceil(rounded(min / step));
    const last = Math.floor(rounded(max / step));

    return Array.from({ length: last - first + 1 }, (_, index) =>
        rounded((first + index) * step),
    );
}

function tickScore(
    ticks: readonly number[],
    min: number,
    max: number,
    count: number,
): number {
    const bounded = ticks[0] === min && ticks.at(-1) === max;

    return Math.abs(ticks.length - count) + (bounded ? 0 : 1);
}

export function niceTicks(
    min: number,
    max: number,
    count: number = TICK_COUNT,
): number[] {
    if (!Number.isFinite(min) || !Number.isFinite(max)) {
        return [];
    }

    if (max <= min) {
        return [min];
    }

    const power = magnitude((max - min) / Math.max(count - 1, 1));
    const candidates = [power / 10, power, power * 10]
        .flatMap((scale) =>
            STEP_MANTISSAS.map((mantissa) => rounded(mantissa * scale)),
        )
        .map((step) => ticksWithStep(min, max, step))
        .filter((ticks) => ticks.length > 1);

    return candidates.reduce(
        (best, ticks) =>
            tickScore(ticks, min, max, count) <=
            tickScore(best, min, max, count)
                ? ticks
                : best,
        [min, max],
    );
}

function values(datum: ChartDatum, keys: readonly string[]): number[] {
    return keys
        .map((key) => Number(datum[key]))
        .filter((value) => Number.isFinite(value));
}

function stackKeys(series: readonly ChartValueSeries[]): string[][] {
    const stacks = new Map<string, string[]>();

    series.forEach((item, index) => {
        const id = item.stack ?? `series-${index}`;

        stacks.set(id, [...(stacks.get(id) ?? []), item.key]);
    });

    return [...stacks.values()];
}

function sideSums(row: readonly number[]): number[] {
    const sum = (sign: (value: number) => boolean) =>
        row.filter(sign).reduce((total, value) => total + value, 0);

    return [sum((value) => value > 0), sum((value) => value < 0)];
}

export function symmetricReach(
    data: readonly ChartDatum[],
    series: readonly ChartValueSeries[],
): number {
    const stacks = stackKeys(series);
    const reaches = data.flatMap((datum) =>
        stacks.flatMap((keys) => sideSums(values(datum, keys))),
    );

    return Math.max(0, ...reaches.map(Math.abs));
}

function smallestPositive(
    data: readonly ChartDatum[],
    keys: readonly string[],
): number {
    const positives = data
        .flatMap((datum) => values(datum, keys))
        .filter((value) => value > 0);

    return positives.length > 0 ? Math.min(...positives) : 1;
}

function valueDomain(
    domain: ChartValueDomain | undefined,
    scale: ChartValueScale,
    data: readonly ChartDatum[],
    series: readonly ChartValueSeries[],
): ChartValueBounds | undefined {
    const bounds =
        domain === 'symmetric' && scale === 'log' ? undefined : domain;

    if (bounds === 'symmetric') {
        const reach = niceCeiling(symmetricReach(data, series));

        return [-reach, reach];
    }

    if (scale !== 'log') {
        return bounds;
    }

    const [min, max] = bounds ?? ['auto', 'auto'];
    const keys = series.map((item) => item.key);

    return [
        typeof min === 'number' && min > 0 ? min : smallestPositive(data, keys),
        max,
    ];
}

export function valueAxisScale(
    domain: ChartValueDomain | undefined,
    scale: ChartValueScale,
    data: readonly ChartDatum[],
    series: readonly ChartValueSeries[],
): ChartValueAxis {
    const bounds = valueDomain(domain, scale, data, series);

    if (scale === 'log' || bounds === undefined) {
        return { domain: bounds, ticks: undefined };
    }

    const [min, max] = bounds;

    if (typeof min !== 'number' || typeof max !== 'number') {
        return { domain: bounds, ticks: undefined };
    }

    return { domain: bounds, ticks: niceTicks(min, max) };
}
