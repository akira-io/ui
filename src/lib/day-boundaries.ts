import type { Matcher } from 'react-day-picker';

export function dayBoundaries(
    minDate?: Date,
    maxDate?: Date,
    disabledDays?: (date: Date) => boolean,
): Matcher[] {
    const matchers: Matcher[] = [];

    if (minDate) {
        matchers.push({ before: minDate });
    }

    if (maxDate) {
        matchers.push({ after: maxDate });
    }

    if (disabledDays) {
        matchers.push(disabledDays);
    }

    return matchers;
}
