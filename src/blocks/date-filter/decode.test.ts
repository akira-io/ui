import { describe, expect, it } from 'vitest';

import { decodeDateFilter } from '@/blocks/date-filter/decode';
import { encodeDateFilter } from '@/blocks/date-filter/encode';
import type { DateFilterValue } from '@/blocks/date-filter/types';

const roundTrips: DateFilterValue[] = [
    { mode: 'all' },
    { mode: 'preset', preset: 'today' },
    { mode: 'preset', preset: 'previous_7_days' },
    { mode: 'preset', preset: 'previous_12_months' },
    { mode: 'fixed', operator: 'on', start: '2026-01-01' },
    { mode: 'fixed', operator: 'before', start: '2026-01-01' },
    { mode: 'fixed', operator: 'after', start: '2026-01-01' },
    {
        mode: 'fixed',
        operator: 'between',
        start: '2026-01-01',
        end: '2026-03-31',
    },
    { mode: 'relative', amount: 3, unit: 'day' },
    { mode: 'relative', amount: 1, unit: 'week' },
    { mode: 'relative', amount: 3, unit: 'month', include_current: true },
    { mode: 'relative', amount: 2, unit: 'quarter' },
    { mode: 'relative', amount: 5, unit: 'year', include_current: true },
    {
        mode: 'relative',
        amount: 2,
        unit: 'week',
        offset_amount: 1,
        offset_unit: 'month',
    },
    {
        mode: 'relative',
        amount: 4,
        unit: 'day',
        include_current: true,
        offset_amount: 2,
        offset_unit: 'day',
    },
];

describe('decodeDateFilter', () => {
    it.each(roundTrips)('reads back %j', (value) => {
        expect(decodeDateFilter(encodeDateFilter(value))).toEqual(value);
    });

    it.each(roundTrips)('re-encodes %j to the same string', (value) => {
        const encoded = encodeDateFilter(value);

        expect(encodeDateFilter(decodeDateFilter(encoded))).toBe(encoded);
    });

    it('names the offset unit the encoder inferred from the range unit', () => {
        expect(
            decodeDateFilter(
                encodeDateFilter({
                    mode: 'relative',
                    amount: 2,
                    unit: 'week',
                    offset_amount: 1,
                }),
            ),
        ).toEqual({
            mode: 'relative',
            amount: 2,
            unit: 'week',
            offset_amount: 1,
            offset_unit: 'week',
        });
    });

    it.each([null, undefined, ''])(
        'reads %j as the unfiltered state',
        (encoded) => {
            expect(decodeDateFilter(encoded)).toEqual({ mode: 'all' });
        },
    );

    it.each([
        'previous:x:month',
        'previous:0:month',
        'previous:2:fortnight',
        'previous:2:month:whatever',
        'previous:2:month:offset:0:day',
        'previous:2:month:offset:1',
        '~',
        '2026-01-01~2026-03-31~2026-06-30',
        '2026-13-01~2026-03-31',
        '2026-02-30',
        '~2026-99-01',
    ])('falls back to the unfiltered state for %s', (encoded) => {
        expect(decodeDateFilter(encoded)).toEqual({ mode: 'all' });
    });

    it('treats an unknown plain token as a preset key', () => {
        expect(decodeDateFilter('fiscal_year')).toEqual({
            mode: 'preset',
            preset: 'fiscal_year',
        });
    });
});
