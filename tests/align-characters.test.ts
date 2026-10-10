import { describe, expect, it } from 'vitest';

import {
    alignCharacters,
    columnDelays,
    slotStagger,
} from '../src/lib/motion/align-characters';

describe('alignCharacters', () => {
    it('pairs two values of the same length column by column', () => {
        expect(alignCharacters('12', '19')).toEqual([
            { key: 'c1', previous: '1', next: '1', digit: true },
            { key: 'c0', previous: '2', next: '9', digit: true },
        ]);
    });

    it('adds a column on the left when the value grows', () => {
        expect(
            alignCharacters('99', '100').map((column) => column.key),
        ).toEqual(['c2', 'c1', 'c0']);
        expect(alignCharacters('99', '100')[0]).toEqual({
            key: 'c2',
            previous: undefined,
            next: '1',
            digit: true,
        });
    });

    it('drops the leftmost column when the value shrinks', () => {
        expect(alignCharacters('100', '99')).toEqual([
            { key: 'c1', previous: '0', next: '9', digit: true },
            { key: 'c0', previous: '0', next: '9', digit: true },
        ]);
    });

    it('treats signs, separators and letters as plain characters', () => {
        expect(
            alignCharacters('-3.50', '-3.75').map((column) => column.digit),
        ).toEqual([false, true, false, true, true]);
    });

    it('turns digits into a plain character', () => {
        expect(alignCharacters('12', '—')).toEqual([
            { key: 'c0', previous: '2', next: '—', digit: false },
        ]);
    });

    it('keeps a character built from several code points in one column', () => {
        expect(
            alignCharacters('1', 'e\u0301🇵🇹1').map((column) => column.next),
        ).toEqual(['e\u0301', '🇵🇹', '1']);
    });

    it('draws no column for an empty value', () => {
        expect(alignCharacters('5', '')).toEqual([]);
    });
});

describe('columnDelays', () => {
    it('starts the changed columns from the left, one stagger apart', () => {
        expect(columnDelays(alignCharacters('128', '935'))).toEqual([
            0,
            slotStagger,
            slotStagger * 2,
        ]);
    });

    it('does not count a column that keeps its character', () => {
        expect(columnDelays(alignCharacters('128', '139'))).toEqual([
            0,
            0,
            slotStagger,
        ]);
    });

    it('stops growing the delay after a few columns', () => {
        const delays = columnDelays(
            alignCharacters('1111111111', '9999999999'),
        );

        expect(Math.max(...delays)).toBe(slotStagger * 4);
    });
});
