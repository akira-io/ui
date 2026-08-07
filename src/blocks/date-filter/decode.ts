import type {
    DateFilterUnit,
    DateFilterValue,
} from '@/blocks/date-filter/types';

const RANGE_SEPARATOR = '~';

const RELATIVE_PREFIX = 'previous';

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

const UNITS: DateFilterUnit[] = ['day', 'week', 'month', 'quarter', 'year'];

const ALL: DateFilterValue = { mode: 'all' };

export function decodeDateFilter(
    encoded: string | null | undefined,
): DateFilterValue {
    if (!encoded) {
        return ALL;
    }

    if (encoded.startsWith(`${RELATIVE_PREFIX}:`)) {
        return decodeRelative(encoded);
    }

    if (encoded.includes(RANGE_SEPARATOR)) {
        return decodeFixedRange(encoded);
    }

    if (ISO_DATE.test(encoded)) {
        return isDate(encoded)
            ? { mode: 'fixed', operator: 'on', start: encoded }
            : ALL;
    }

    return { mode: 'preset', preset: encoded };
}

function decodeFixedRange(encoded: string): DateFilterValue {
    const parts = encoded.split(RANGE_SEPARATOR);

    if (parts.length !== 2) {
        return ALL;
    }

    const [start, end] = parts;

    if (start && end) {
        return isDate(start) && isDate(end)
            ? { mode: 'fixed', operator: 'between', start, end }
            : ALL;
    }

    if (start) {
        return isDate(start)
            ? { mode: 'fixed', operator: 'after', start }
            : ALL;
    }

    if (end) {
        return isDate(end)
            ? { mode: 'fixed', operator: 'before', start: end }
            : ALL;
    }

    return ALL;
}

function decodeRelative(encoded: string): DateFilterValue {
    const [, rawAmount, rawUnit, ...rest] = encoded.split(':');
    const amount = Number(rawAmount);
    const unit = toUnit(rawUnit);

    if (!unit || !Number.isInteger(amount) || amount < 1) {
        return ALL;
    }

    const value: DateFilterValue = { mode: 'relative', amount, unit };
    const tail = [...rest];

    if (tail[0] === 'current') {
        value.include_current = true;
        tail.shift();
    }

    if (tail.length === 0) {
        return value;
    }

    if (tail.length !== 3 || tail[0] !== 'offset') {
        return ALL;
    }

    const offsetAmount = Number(tail[1]);
    const offsetUnit = toUnit(tail[2]);

    if (!offsetUnit || !Number.isInteger(offsetAmount) || offsetAmount < 1) {
        return ALL;
    }

    value.offset_amount = offsetAmount;
    value.offset_unit = offsetUnit;

    return value;
}

function toUnit(value: string | undefined): DateFilterUnit | null {
    return UNITS.find((unit) => unit === value) ?? null;
}

function isDate(value: string): boolean {
    if (!ISO_DATE.test(value)) {
        return false;
    }

    const [year, month, day] = value.split('-').map(Number);
    const date = new Date(Date.UTC(year, month - 1, day));

    return (
        date.getUTCFullYear() === year &&
        date.getUTCMonth() === month - 1 &&
        date.getUTCDate() === day
    );
}
