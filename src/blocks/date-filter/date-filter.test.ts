import { format } from 'date-fns';
import { describe, expect, it } from 'vitest';

import { encodeDateFilter } from '@/blocks/date-filter/encode';
import {
    formatRangePreview,
    resolveRelativeRange,
} from '@/blocks/date-filter/range';
import { summariseDateFilter } from '@/blocks/date-filter/summarise';
import {
    DEFAULT_LABELS,
    DEFAULT_OPERATORS,
    DEFAULT_PRESETS,
    DEFAULT_UNITS,
} from '@/blocks/date-filter/types';

const iso = (date: Date) => format(date, 'yyyy-MM-dd');

describe('encodeDateFilter', () => {
    it('returns null for every period', () => {
        expect(encodeDateFilter({ mode: 'all' })).toBeNull();
    });

    it('returns the preset key', () => {
        expect(
            encodeDateFilter({ mode: 'preset', preset: 'previous_7_days' }),
        ).toBe('previous_7_days');
    });

    it('encodes each fixed operator', () => {
        const start = '2026-01-01';
        const end = '2026-03-31';

        expect(
            encodeDateFilter({
                mode: 'fixed',
                operator: 'between',
                start,
                end,
            }),
        ).toBe('2026-01-01~2026-03-31');
        expect(encodeDateFilter({ mode: 'fixed', operator: 'on', start })).toBe(
            start,
        );
        expect(
            encodeDateFilter({ mode: 'fixed', operator: 'before', start }),
        ).toBe('~2026-01-01');
        expect(
            encodeDateFilter({ mode: 'fixed', operator: 'after', start }),
        ).toBe('2026-01-01~');
    });

    it('rejects an incomplete fixed range', () => {
        expect(
            encodeDateFilter({
                mode: 'fixed',
                operator: 'between',
                start: '2026-01-01',
            }),
        ).toBeNull();
        expect(encodeDateFilter({ mode: 'fixed', operator: 'on' })).toBeNull();
    });

    it('encodes relative ranges with the current period and the offset', () => {
        expect(
            encodeDateFilter({ mode: 'relative', amount: 3, unit: 'month' }),
        ).toBe('previous:3:month');
        expect(
            encodeDateFilter({
                mode: 'relative',
                amount: 3,
                unit: 'month',
                include_current: true,
            }),
        ).toBe('previous:3:month:current');
        expect(
            encodeDateFilter({
                mode: 'relative',
                amount: 2,
                unit: 'week',
                offset_amount: 1,
                offset_unit: 'month',
            }),
        ).toBe('previous:2:week:offset:1:month');
    });

    it('falls back to the range unit when the offset has none', () => {
        expect(
            encodeDateFilter({
                mode: 'relative',
                amount: 2,
                unit: 'week',
                offset_amount: 1,
            }),
        ).toBe('previous:2:week:offset:1:week');
    });

    it('rejects a relative range without an amount', () => {
        expect(
            encodeDateFilter({ mode: 'relative', unit: 'month', amount: 0 }),
        ).toBeNull();
    });
});

describe('resolveRelativeRange', () => {
    const now = new Date(2026, 6, 15);

    it('excludes the current period by default', () => {
        const range = resolveRelativeRange('month', 3, false, now);

        expect(iso(range!.start)).toBe('2026-04-01');
        expect(iso(range!.end)).toBe('2026-06-30');
    });

    it('includes the current period when asked', () => {
        const range = resolveRelativeRange('month', 3, true, now);

        expect(iso(range!.start)).toBe('2026-05-01');
        expect(iso(range!.end)).toBe('2026-07-31');
    });

    it('shifts the anchor back by the offset', () => {
        const range = resolveRelativeRange('month', 1, false, now, 2, 'month');

        expect(iso(range!.start)).toBe('2026-04-01');
        expect(iso(range!.end)).toBe('2026-04-30');
    });

    it('starts weeks on monday', () => {
        const range = resolveRelativeRange('week', 1, false, now);

        expect(iso(range!.start)).toBe('2026-07-06');
        expect(iso(range!.end)).toBe('2026-07-12');
    });

    it('returns null for an amount below one', () => {
        expect(resolveRelativeRange('month', 0, false, now)).toBeNull();
    });
});

describe('formatRangePreview', () => {
    it('drops the year on the start when both ends share it', () => {
        expect(
            formatRangePreview({
                start: new Date(2026, 0, 1),
                end: new Date(2026, 2, 31),
            }),
        ).toBe('1 jan - 31 mar 2026');
    });

    it('keeps both years when they differ', () => {
        expect(
            formatRangePreview({
                start: new Date(2025, 11, 1),
                end: new Date(2026, 0, 31),
            }),
        ).toBe('1 dez 2025 - 31 jan 2026');
    });
});

describe('summariseDateFilter', () => {
    const summarise = (value: Parameters<typeof summariseDateFilter>[0]) =>
        summariseDateFilter(
            value,
            DEFAULT_PRESETS,
            DEFAULT_OPERATORS,
            DEFAULT_UNITS,
            DEFAULT_LABELS,
        );

    it('names every period', () => {
        expect(summarise({ mode: 'all' })).toBe('Todo o período');
    });

    it('names the preset', () => {
        expect(summarise({ mode: 'preset', preset: 'previous_month' })).toBe(
            'Mês anterior',
        );
    });

    it('falls back when the preset is unknown', () => {
        expect(summarise({ mode: 'preset', preset: 'nope' })).toBe('Data');
    });

    it('reads a fixed range and a fixed operator', () => {
        expect(
            summarise({
                mode: 'fixed',
                operator: 'between',
                start: '2026-01-01',
                end: '2026-03-31',
            }),
        ).toBe('1 de janeiro de 2026 - 31 de março de 2026');
        expect(
            summarise({
                mode: 'fixed',
                operator: 'before',
                start: '2026-01-01',
            }),
        ).toBe('Antes de 1 de janeiro de 2026');
    });

    it('reads a relative range with and without the offset', () => {
        expect(summarise({ mode: 'relative', amount: 3, unit: 'month' })).toBe(
            'Últimos 3 meses',
        );
        expect(
            summarise({
                mode: 'relative',
                amount: 3,
                unit: 'month',
                offset_amount: 2,
                offset_unit: 'week',
            }),
        ).toBe('Últimos 3 meses, há 2 semanas');
    });

    it('honours overridden labels', () => {
        expect(
            summariseDateFilter(
                { mode: 'all' },
                DEFAULT_PRESETS,
                DEFAULT_OPERATORS,
                DEFAULT_UNITS,
                { ...DEFAULT_LABELS, all: 'Sempre' },
            ),
        ).toBe('Sempre');
    });
});
