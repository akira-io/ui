import {
    to12h,
    to24h,
    type HourCycle,
    type Period,
    type TimeOfDay,
} from '@/lib/time-value';

export type TimeUnit = 'hour' | 'minute' | 'second';

export interface TimeParts {
    hour?: number;
    minute?: number;
    second?: number;
    period?: Period;
}

export interface DigitResult {
    value: number | undefined;
    buffer: string;
    advance: boolean;
}

function unitRange(unit: TimeUnit, cycle: HourCycle): [number, number] {
    if (unit !== 'hour') {
        return [0, 59];
    }

    return cycle === 12 ? [1, 12] : [0, 23];
}

export function typeDigit(
    unit: TimeUnit,
    cycle: HourCycle,
    buffer: string,
    digit: number,
): DigitResult {
    const [min, max] = unitRange(unit, cycle);

    if (buffer !== '') {
        const combined = Number(buffer) * 10 + digit;

        if (combined >= min && combined <= max) {
            return { value: combined, buffer: '', advance: true };
        }
    }

    if (digit > Math.floor(max / 10)) {
        return { value: digit, buffer: '', advance: true };
    }

    return {
        value: digit >= min ? digit : undefined,
        buffer: String(digit),
        advance: false,
    };
}

export function partsOf(
    time: TimeOfDay | undefined,
    cycle: HourCycle,
): TimeParts {
    if (!time) {
        return {};
    }

    if (cycle === 24) {
        return { hour: time.hour, minute: time.minute, second: time.second };
    }

    const { hour, period } = to12h(time.hour);

    return { hour, minute: time.minute, second: time.second, period };
}

export function timeOf(
    parts: TimeParts,
    cycle: HourCycle,
    withSeconds: boolean,
): TimeOfDay | undefined {
    const { hour, minute, second, period } = parts;

    if (hour === undefined || minute === undefined) {
        return undefined;
    }

    if (withSeconds && second === undefined) {
        return undefined;
    }

    if (cycle === 12 && period === undefined) {
        return undefined;
    }

    return {
        hour: cycle === 12 && period ? to24h(hour, period) : hour,
        minute,
        second: withSeconds ? (second ?? 0) : 0,
    };
}

export function fillParts(parts: TimeParts, cycle: HourCycle): TimeOfDay {
    const hour = parts.hour ?? 0;

    return {
        hour: cycle === 12 ? to24h(hour, parts.period ?? 'am') : hour,
        minute: parts.minute ?? 0,
        second: parts.second ?? 0,
    };
}

export function isEmptyParts(
    parts: TimeParts,
    kinds: (keyof TimeParts)[],
): boolean {
    return kinds.every((kind) => parts[kind] === undefined);
}
