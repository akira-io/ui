import type { ChartDatum } from '@/lib/chart-series';

export type ChartValueScale = 'linear' | 'log';

export type ChartValueDomain = [number | 'auto', number | 'auto'];

function smallestPositive(
    data: readonly ChartDatum[],
    keys: readonly string[],
): number {
    const positives = data
        .flatMap((datum) => keys.map((key) => Number(datum[key])))
        .filter((value) => Number.isFinite(value) && value > 0);

    return positives.length > 0 ? Math.min(...positives) : 1;
}

export function valueDomain(
    domain: ChartValueDomain | undefined,
    scale: ChartValueScale,
    data: readonly ChartDatum[],
    keys: readonly string[],
): ChartValueDomain | undefined {
    if (scale !== 'log') {
        return domain;
    }

    const [min, max] = domain ?? ['auto', 'auto'];

    return [
        typeof min === 'number' && min > 0 ? min : smallestPositive(data, keys),
        max,
    ];
}
