import { describe, expect, it } from 'vitest';

import {
    clampTime,
    cycleOption,
    formatTime,
    hourOptions,
    isWithin,
    parseTime,
    rangeAllowed,
    resolveBounds,
    resolveHourCycle,
    timeOfDate,
    to12h,
    to24h,
    unitOptions,
    withTime,
} from '@/lib/time-value';

describe('parseTime', () => {
    it.each([
        ['14:30', { hour: 14, minute: 30, second: 0 }],
        ['00:00:59', { hour: 0, minute: 0, second: 59 }],
    ])('reads %s', (text, expected) => {
        expect(parseTime(text)).toEqual(expected);
    });

    it.each(['24:00', '12:60', '9:30', '12:30:61', 'noon', '', undefined])(
        'treats %s as no time at all',
        (text) => {
            expect(parseTime(text)).toBeUndefined();
        },
    );
});

describe('formatTime', () => {
    it('pads every unit and leaves the seconds out unless asked', () => {
        const time = { hour: 7, minute: 5, second: 9 };

        expect(formatTime(time, false)).toBe('07:05');
        expect(formatTime(time, true)).toBe('07:05:09');
    });
});

describe('the twelve-hour clock', () => {
    it.each([
        [0, 12, 'am'],
        [11, 11, 'am'],
        [12, 12, 'pm'],
        [23, 11, 'pm'],
    ] as const)(
        'shows %i as %i %s and reads it back',
        (hour24, hour12, period) => {
            expect(to12h(hour24)).toEqual({ hour: hour12, period });
            expect(to24h(hour12, period)).toBe(hour24);
        },
    );

    it('starts the hour column at twelve', () => {
        expect(hourOptions(12)).toEqual([
            12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
        ]);
        expect(hourOptions(24)).toHaveLength(24);
    });
});

describe('steps', () => {
    it('offers the minutes a step lands on', () => {
        expect(unitOptions(15)).toEqual([0, 15, 30, 45]);
        expect(unitOptions(0)).toHaveLength(60);
    });

    it('wraps past either end', () => {
        expect(cycleOption([0, 15, 30, 45], 45, 1)).toBe(0);
        expect(cycleOption([0, 15, 30, 45], 0, -1)).toBe(45);
    });

    it('starts an empty unit at the end the arrow points from', () => {
        expect(cycleOption([0, 15, 30, 45], undefined, 1)).toBe(0);
        expect(cycleOption([0, 15, 30, 45], undefined, -1)).toBe(45);
    });

    it('moves a value off the step onto the next one in that direction', () => {
        expect(cycleOption([0, 15, 30, 45], 20, 1)).toBe(30);
        expect(cycleOption([0, 15, 30, 45], 20, -1)).toBe(15);
    });
});

describe('bounds', () => {
    const office = resolveBounds('09:00', '17:00');

    it('keeps a time inside them and pulls one outside to the nearest edge', () => {
        expect(isWithin({ hour: 12, minute: 0, second: 0 }, office)).toBe(true);
        expect(clampTime({ hour: 7, minute: 0, second: 0 }, office)).toEqual({
            hour: 9,
            minute: 0,
            second: 0,
        });
        expect(clampTime({ hour: 18, minute: 0, second: 0 }, office)).toEqual({
            hour: 17,
            minute: 0,
            second: 0,
        });
    });

    it('ignores bounds whose start comes after their end', () => {
        expect(resolveBounds('17:00', '09:00')).toEqual({});
    });

    it('ignores a bound it cannot read', () => {
        expect(resolveBounds('soon', '17:00').min).toBeUndefined();
    });

    it('allows a range that touches the bounds anywhere', () => {
        expect(rangeAllowed(8 * 3600, 8 * 3600 + 3599, office)).toBe(false);
        expect(rangeAllowed(9 * 3600, 9 * 3600 + 3599, office)).toBe(true);
        expect(rangeAllowed(17 * 3600, 17 * 3600 + 3599, office)).toBe(true);
    });
});

describe('resolveHourCycle', () => {
    it('reads the clock a locale uses', () => {
        expect(resolveHourCycle('en-US')).toBe(12);
        expect(resolveHourCycle('pt')).toBe(24);
        expect(resolveHourCycle(undefined)).toBe(12);
    });
});

describe('dates', () => {
    it('reads the time off a date and puts one on it without moving the day', () => {
        const day = new Date(2026, 9, 8, 6, 0, 0);

        expect(timeOfDate(day)).toEqual({ hour: 6, minute: 0, second: 0 });
        expect(withTime(day, { hour: 14, minute: 30, second: 5 })).toEqual(
            new Date(2026, 9, 8, 14, 30, 5),
        );
    });
});
