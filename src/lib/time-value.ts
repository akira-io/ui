export type HourCycle = 12 | 24;

export type Period = 'am' | 'pm';

export type TimeUnit = 'hour' | 'minute' | 'second';

export interface TimeOfDay {
    hour: number;
    minute: number;
    second: number;
}

export interface TimeBounds {
    min?: TimeOfDay;
    max?: TimeOfDay;
}

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

export const MIDNIGHT: TimeOfDay = { hour: 0, minute: 0, second: 0 };

const LAST_SECOND_OF_DAY = 86_399;

const TIME_PATTERN = /^(\d{2}):(\d{2})(?::(\d{2}))?$/;

export function padUnit(value: number): string {
    return String(value).padStart(2, '0');
}

export function parseTime(value: string | undefined): TimeOfDay | undefined {
    const match = value ? TIME_PATTERN.exec(value) : null;

    if (!match) {
        return undefined;
    }

    const time = {
        hour: Number(match[1]),
        minute: Number(match[2]),
        second: Number(match[3] ?? 0),
    };

    if (time.hour > 23 || time.minute > 59 || time.second > 59) {
        return undefined;
    }

    return time;
}

export function formatTime(time: TimeOfDay, withSeconds: boolean): string {
    const base = `${padUnit(time.hour)}:${padUnit(time.minute)}`;

    return withSeconds ? `${base}:${padUnit(time.second)}` : base;
}

export function secondsOf(time: TimeOfDay): number {
    return time.hour * 3600 + time.minute * 60 + time.second;
}

function fromSeconds(total: number): TimeOfDay {
    return {
        hour: Math.floor(total / 3600),
        minute: Math.floor((total % 3600) / 60),
        second: total % 60,
    };
}

export function sameTime(
    a: TimeOfDay | undefined,
    b: TimeOfDay | undefined,
): boolean {
    if (!a || !b) {
        return a === b;
    }

    return secondsOf(a) === secondsOf(b);
}

export function resolveBounds(min?: string, max?: string): TimeBounds {
    const lower = parseTime(min);
    const upper = parseTime(max);

    if (lower && upper && secondsOf(lower) > secondsOf(upper)) {
        return {};
    }

    return { min: lower, max: upper };
}

function lowerOf(bounds: TimeBounds): number {
    return bounds.min ? secondsOf(bounds.min) : 0;
}

function upperOf(bounds: TimeBounds): number {
    return bounds.max ? secondsOf(bounds.max) : LAST_SECOND_OF_DAY;
}

export function isWithin(time: TimeOfDay, bounds: TimeBounds): boolean {
    const seconds = secondsOf(time);

    return seconds >= lowerOf(bounds) && seconds <= upperOf(bounds);
}

export function clampTime(time: TimeOfDay, bounds: TimeBounds): TimeOfDay {
    const seconds = secondsOf(time);

    return fromSeconds(
        Math.min(Math.max(seconds, lowerOf(bounds)), upperOf(bounds)),
    );
}

export function rangeAllowed(
    start: number,
    end: number,
    bounds: TimeBounds,
): boolean {
    return end >= lowerOf(bounds) && start <= upperOf(bounds);
}

export function to12h(hour: number): { hour: number; period: Period } {
    return {
        hour: hour % 12 === 0 ? 12 : hour % 12,
        period: hour < 12 ? 'am' : 'pm',
    };
}

export function to24h(hour: number, period: Period): number {
    return (hour % 12) + (period === 'pm' ? 12 : 0);
}

export function hourOptions(cycle: HourCycle): number[] {
    if (cycle === 12) {
        return [12, ...Array.from({ length: 11 }, (_, index) => index + 1)];
    }

    return Array.from({ length: 24 }, (_, index) => index);
}

export function unitOptions(step: number): number[] {
    const size = Math.max(1, Math.floor(step));

    return Array.from(
        { length: Math.ceil(60 / size) },
        (_, index) => index * size,
    );
}

export function cycleOption(
    options: number[],
    current: number | undefined,
    direction: 1 | -1,
): number {
    const first = options[0];
    const last = options[options.length - 1];

    if (current === undefined) {
        return direction === 1 ? first : last;
    }

    const index = options.indexOf(current);

    if (index !== -1) {
        return options[(index + direction + options.length) % options.length];
    }

    const next =
        direction === 1
            ? options.find((option) => option > current)
            : [...options].reverse().find((option) => option < current);

    return next ?? (direction === 1 ? first : last);
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

export function isEmptyParts(
    parts: TimeParts,
    kinds: (keyof TimeParts)[],
): boolean {
    return kinds.every((kind) => parts[kind] === undefined);
}

export function resolveHourCycle(localeCode?: string): HourCycle {
    const { hourCycle } = new Intl.DateTimeFormat(localeCode ?? 'en-US', {
        hour: 'numeric',
    }).resolvedOptions();

    return hourCycle === 'h11' || hourCycle === 'h12' ? 12 : 24;
}

export function timeOfDate(date: Date): TimeOfDay {
    return {
        hour: date.getHours(),
        minute: date.getMinutes(),
        second: date.getSeconds(),
    };
}

export function withTime(date: Date, time: TimeOfDay): Date {
    return new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        time.hour,
        time.minute,
        time.second,
    );
}
