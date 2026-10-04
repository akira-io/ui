import { describe, expect, it } from 'vitest';

import { dateFormatter, defaultTimeFormat } from '@/lib/chart-dates';
import { axisFormatter } from '@/lib/chart-series';

const fifthOfJanuary = new Date(2026, 0, 5);
const firstOfJanuary = new Date(2026, 0, 1);
const firstOfFebruary = new Date(2026, 1, 1);

describe('the default format of a time axis', () => {
    it('names the month and the year when every date opens a month', () => {
        expect(defaultTimeFormat([firstOfJanuary, firstOfFebruary])).toEqual({
            month: 'short',
            year: 'numeric',
        });
    });

    it('names the day and the month when any date falls inside a month', () => {
        expect(defaultTimeFormat([firstOfJanuary, fifthOfJanuary])).toEqual({
            day: 'numeric',
            month: 'short',
        });
    });

    it('accepts timestamps and ignores values that are not dates', () => {
        expect(
            defaultTimeFormat([firstOfJanuary.getTime(), 'not a date']),
        ).toEqual({ month: 'short', year: 'numeric' });
    });

    it('falls back to the day and the month when nothing reads as a date', () => {
        expect(defaultTimeFormat([])).toEqual({
            day: 'numeric',
            month: 'short',
        });
    });
});

describe('a date formatter with an abbreviated month', () => {
    it('spells the month in pt-PT instead of numbering it', () => {
        const dayMonth = dateFormatter(
            { day: 'numeric', month: 'short' },
            'pt-PT',
        );
        const monthYear = dateFormatter(
            { month: 'short', year: 'numeric' },
            'pt-PT',
        );

        expect(dayMonth(fifthOfJanuary)).toBe('5 jan');
        expect(monthYear(fifthOfJanuary)).toBe('jan 2026');
    });

    it('keeps the order and spelling of a locale that already names the month', () => {
        expect(
            dateFormatter(
                { day: 'numeric', month: 'short' },
                'en-US',
            )(fifthOfJanuary),
        ).toBe('Jan 5');
        expect(
            dateFormatter(
                { month: 'short', year: 'numeric' },
                'en-US',
            )(fifthOfJanuary),
        ).toBe('Jan 2026');
    });

    it('leaves a value that is not a date as it was', () => {
        expect(dateFormatter({ month: 'short' }, 'pt-PT')('soon')).toBe('soon');
    });
});

describe('the formatter of a time axis', () => {
    it('picks the abbreviated default from the values it will format', () => {
        const format = axisFormatter('time', undefined, 'pt-PT', [
            firstOfJanuary.getTime(),
            firstOfFebruary.getTime(),
        ]);

        expect(format?.(firstOfFebruary.getTime())).toBe('fev 2026');
    });

    it('still honours the options it is given', () => {
        const format = axisFormatter('time', { year: 'numeric' }, 'pt-PT', [
            fifthOfJanuary,
        ]);

        expect(format?.(fifthOfJanuary)).toBe('2026');
    });
});
