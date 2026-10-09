import { describe, expect, it } from 'vitest';

import {
    fillParts,
    isEmptyParts,
    partsOf,
    timeOf,
    typeDigit,
} from '@/lib/time-parts';

describe('typeDigit', () => {
    it('jumps on after an hour no second digit could follow', () => {
        expect(typeDigit('hour', 24, '', 3)).toEqual({
            value: 3,
            buffer: '',
            advance: true,
        });
    });

    it('waits for a second digit when one could follow', () => {
        expect(typeDigit('hour', 24, '', 1)).toEqual({
            value: 1,
            buffer: '1',
            advance: false,
        });
        expect(typeDigit('hour', 24, '1', 4)).toEqual({
            value: 14,
            buffer: '',
            advance: true,
        });
    });

    it('starts over when the pair would overflow', () => {
        expect(typeDigit('hour', 24, '2', 5)).toEqual({
            value: 5,
            buffer: '',
            advance: true,
        });
    });

    it('holds a leading zero on the twelve-hour clock without making it an hour', () => {
        expect(typeDigit('hour', 12, '', 0)).toEqual({
            value: undefined,
            buffer: '0',
            advance: false,
        });
        expect(typeDigit('hour', 12, '0', 9).value).toBe(9);
        expect(typeDigit('hour', 12, '', 2).advance).toBe(true);
    });

    it('jumps on after a minute digit above five', () => {
        expect(typeDigit('minute', 24, '', 6).advance).toBe(true);
        expect(typeDigit('minute', 24, '3', 0).value).toBe(30);
    });
});

describe('parts', () => {
    it('round-trips a time through the twelve-hour parts', () => {
        const time = { hour: 15, minute: 45, second: 0 };
        const parts = partsOf(time, 12);

        expect(parts).toEqual({ hour: 3, minute: 45, second: 0, period: 'pm' });
        expect(timeOf(parts, 12, false)).toEqual(time);
    });

    it('fills the units a draft is missing from midnight', () => {
        expect(fillParts({ hour: 2, period: 'pm' }, 12)).toEqual({
            hour: 14,
            minute: 0,
            second: 0,
        });
        expect(fillParts({ minute: 30 }, 24)).toEqual({
            hour: 0,
            minute: 30,
            second: 0,
        });
    });

    it('counts as empty only when every shown segment is', () => {
        expect(isEmptyParts({ second: 0 }, ['hour', 'minute'])).toBe(true);
        expect(isEmptyParts({ minute: 5 }, ['hour', 'minute'])).toBe(false);
    });

    it('has no time while a needed part is missing', () => {
        expect(timeOf({ hour: 3, minute: 45 }, 12, false)).toBeUndefined();
        expect(timeOf({ hour: 3 }, 24, false)).toBeUndefined();
        expect(timeOf({ hour: 3, minute: 4 }, 24, true)).toBeUndefined();
    });
});
