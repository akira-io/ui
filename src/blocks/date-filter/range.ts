import {
    endOfDay,
    endOfMonth,
    endOfQuarter,
    endOfWeek,
    endOfYear,
    format,
    isSameYear,
    startOfDay,
    startOfMonth,
    startOfQuarter,
    startOfWeek,
    startOfYear,
    subDays,
    subMonths,
    subQuarters,
    subWeeks,
    subYears,
} from 'date-fns';
import { pt } from 'date-fns/locale';

import type { DateFilterUnit } from '@/blocks/date-filter/types';

const WEEK_OPTIONS = { weekStartsOn: 1 } as const;

const subtract: Record<DateFilterUnit, (date: Date, amount: number) => Date> = {
    day: subDays,
    week: subWeeks,
    month: subMonths,
    quarter: subQuarters,
    year: subYears,
};

const startOf: Record<DateFilterUnit, (date: Date) => Date> = {
    day: startOfDay,
    week: (date) => startOfWeek(date, WEEK_OPTIONS),
    month: startOfMonth,
    quarter: startOfQuarter,
    year: startOfYear,
};

const endOf: Record<DateFilterUnit, (date: Date) => Date> = {
    day: endOfDay,
    week: (date) => endOfWeek(date, WEEK_OPTIONS),
    month: endOfMonth,
    quarter: endOfQuarter,
    year: endOfYear,
};

export function resolveRelativeRange(
    unit: DateFilterUnit,
    amount: number,
    includeCurrent: boolean,
    now: Date = new Date(),
    offsetAmount = 0,
    offsetUnit?: DateFilterUnit,
): { start: Date; end: Date } | null {
    if (amount < 1 || offsetAmount < 0) {
        return null;
    }

    let anchor = includeCurrent ? now : subtract[unit](now, 1);

    if (offsetAmount > 0) {
        anchor = subtract[offsetUnit ?? unit](anchor, offsetAmount);
    }

    return {
        start: startOf[unit](subtract[unit](anchor, amount - 1)),
        end: endOf[unit](anchor),
    };
}

export function formatRangePreview(range: { start: Date; end: Date }): string {
    const sameYear = isSameYear(range.start, range.end);
    const startPattern = sameYear ? 'd MMM' : 'd MMM yyyy';

    return `${format(range.start, startPattern, { locale: pt })} - ${format(range.end, 'd MMM yyyy', { locale: pt })}`;
}
