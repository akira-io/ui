import {
    dateFilterOperatorsFr,
    dateFilterPresetsFr,
    dateFilterUnitsFr,
    frLabels,
} from '@/locales/fr';
import {
    dateFilterOperatorsPt,
    dateFilterPresetsPt,
    dateFilterUnitsPt,
    ptLabels,
} from '@/locales/pt';
import { describe, expect, it } from 'vitest';

describe('every shipped locale bundle', () => {
    it('covers the exact same sections, so a component gaining a label cannot leave one locale behind', () => {
        expect(Object.keys(frLabels).sort()).toEqual(
            Object.keys(ptLabels).sort(),
        );
    });

    it('covers the exact same date filter options, in the same order, for every locale', () => {
        expect(dateFilterPresetsFr.map((preset) => preset.value)).toEqual(
            dateFilterPresetsPt.map((preset) => preset.value),
        );
        expect(dateFilterOperatorsFr.map((operator) => operator.value)).toEqual(
            dateFilterOperatorsPt.map((operator) => operator.value),
        );
        expect(dateFilterUnitsFr.map((unit) => unit.value)).toEqual(
            dateFilterUnitsPt.map((unit) => unit.value),
        );
    });
});
