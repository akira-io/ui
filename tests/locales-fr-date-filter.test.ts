import {
    DEFAULT_OPERATORS,
    DEFAULT_PRESETS,
    DEFAULT_UNITS,
} from '@/blocks/date-filter/types';
import {
    dateFilterLabelsFr,
    dateFilterOperatorsFr,
    dateFilterPresetsFr,
    dateFilterUnitsFr,
} from '@/locales/fr';
import { describe, expect, it } from 'vitest';

describe('the french date filter labels', () => {
    it('carries every label the component takes', () => {
        expect(Object.keys(dateFilterLabelsFr).sort()).toEqual([
            'ago',
            'all',
            'apply',
            'back',
            'fallback',
            'fixed',
            'includeCurrent',
            'latest',
            'relative',
            'relativeTitle',
            'removeOffset',
            'startingAgo',
        ]);
    });

    it('translates the all time label', () => {
        expect(dateFilterLabelsFr.all).toBe('Toute la période');
    });
});

describe('the french date filter presets', () => {
    it('carries every preset the component ships', () => {
        expect(dateFilterPresetsFr.map((preset) => preset.value)).toEqual(
            DEFAULT_PRESETS.map((preset) => preset.value),
        );
    });

    it('translates the previous month preset', () => {
        expect(
            dateFilterPresetsFr.find(
                (preset) => preset.value === 'previous_month',
            )?.label,
        ).toBe('Mois précédent');
    });
});

describe('the french date filter operators', () => {
    it('carries every operator the component ships', () => {
        expect(dateFilterOperatorsFr.map((operator) => operator.value)).toEqual(
            DEFAULT_OPERATORS.map((operator) => operator.value),
        );
    });

    it('translates the between operator', () => {
        expect(
            dateFilterOperatorsFr.find(
                (operator) => operator.value === 'between',
            )?.label,
        ).toBe('Entre');
    });
});

describe('the french date filter units', () => {
    it('carries every unit the component ships', () => {
        expect(dateFilterUnitsFr.map((unit) => unit.value)).toEqual(
            DEFAULT_UNITS.map((unit) => unit.value),
        );
    });

    it('translates the month unit', () => {
        expect(
            dateFilterUnitsFr.find((unit) => unit.value === 'month')?.label,
        ).toBe('mois');
    });

    it('counts years as ans, the counted form rather than the durative années', () => {
        expect(
            dateFilterUnitsFr.find((unit) => unit.value === 'year')?.label,
        ).toBe('ans');
    });
});
