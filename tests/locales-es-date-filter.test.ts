import {
    DEFAULT_OPERATORS,
    DEFAULT_PRESETS,
    DEFAULT_UNITS,
} from '@/blocks/date-filter/types';
import {
    dateFilterLabelsEs,
    dateFilterOperatorsEs,
    dateFilterPresetsEs,
    dateFilterUnitsEs,
} from '@/locales/es';
import { describe, expect, it } from 'vitest';

describe('the spanish date filter labels', () => {
    it('carries every label the component takes', () => {
        expect(Object.keys(dateFilterLabelsEs).sort()).toEqual([
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
        expect(dateFilterLabelsEs.all).toBe('Todo el periodo');
    });
});

describe('the spanish date filter presets', () => {
    it('carries every preset the component ships', () => {
        expect(dateFilterPresetsEs.map((preset) => preset.value)).toEqual(
            DEFAULT_PRESETS.map((preset) => preset.value),
        );
    });

    it('translates the previous month preset', () => {
        expect(
            dateFilterPresetsEs.find(
                (preset) => preset.value === 'previous_month',
            )?.label,
        ).toBe('Mes anterior');
    });
});

describe('the spanish date filter operators', () => {
    it('carries every operator the component ships', () => {
        expect(dateFilterOperatorsEs.map((operator) => operator.value)).toEqual(
            DEFAULT_OPERATORS.map((operator) => operator.value),
        );
    });

    it('translates the between operator', () => {
        expect(
            dateFilterOperatorsEs.find(
                (operator) => operator.value === 'between',
            )?.label,
        ).toBe('Entre');
    });
});

describe('the spanish date filter units', () => {
    it('carries every unit the component ships', () => {
        expect(dateFilterUnitsEs.map((unit) => unit.value)).toEqual(
            DEFAULT_UNITS.map((unit) => unit.value),
        );
    });

    it('translates the month unit', () => {
        expect(
            dateFilterUnitsEs.find((unit) => unit.value === 'month')?.label,
        ).toBe('meses');
    });

    it('counts years as años', () => {
        expect(
            dateFilterUnitsEs.find((unit) => unit.value === 'year')?.label,
        ).toBe('años');
    });
});
