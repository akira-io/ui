import type { DateFilterValue } from '@/blocks/date-filter/types';

const RANGE_SEPARATOR = '~';

const RELATIVE_PREFIX = 'previous';

export function encodeDateFilter(filter: DateFilterValue): string | null {
    if (filter.mode === 'preset') {
        return filter.preset ?? null;
    }

    if (filter.mode === 'fixed') {
        return encodeFixed(filter);
    }

    if (filter.mode === 'relative') {
        return encodeRelative(filter);
    }

    return null;
}

function encodeFixed(filter: DateFilterValue): string | null {
    if (!filter.start) {
        return null;
    }

    if (filter.operator === 'before') {
        return `${RANGE_SEPARATOR}${filter.start}`;
    }

    if (filter.operator === 'after') {
        return `${filter.start}${RANGE_SEPARATOR}`;
    }

    if (filter.operator === 'on') {
        return filter.start;
    }

    return filter.end ? `${filter.start}${RANGE_SEPARATOR}${filter.end}` : null;
}

function encodeRelative(filter: DateFilterValue): string | null {
    if (!filter.unit || !filter.amount || filter.amount < 1) {
        return null;
    }

    let value = `${RELATIVE_PREFIX}:${filter.amount}:${filter.unit}`;

    if (filter.include_current) {
        value += ':current';
    }

    if (filter.offset_amount && filter.offset_amount > 0) {
        value += `:offset:${filter.offset_amount}:${filter.offset_unit ?? filter.unit}`;
    }

    return value;
}
