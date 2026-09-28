import {
    dateFilterOperatorsEs,
    dateFilterPresetsEs,
    dateFilterUnitsEs,
    esLabels,
} from '@/locales/es';
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

const shippedLocales = { fr: frLabels, es: esLabels };

describe('every shipped locale bundle', () => {
    it.each(Object.entries(shippedLocales))(
        '%s covers the exact same sections, so a component gaining a label cannot leave one locale behind',
        (_, labels) => {
            expect(Object.keys(labels).sort()).toEqual(
                Object.keys(ptLabels).sort(),
            );
        },
    );

    it.each(Object.entries(shippedLocales))(
        '%s covers the exact same keys inside every section',
        (_, labels) => {
            const keysOf = (bundle: object) =>
                Object.fromEntries(
                    Object.entries(bundle).map(([section, value]) => [
                        section,
                        Array.isArray(value)
                            ? value.map((option) => option.value)
                            : Object.keys(value).sort(),
                    ]),
                );

            expect(keysOf(labels)).toEqual(keysOf(ptLabels));
        },
    );

    it('covers the exact same date filter options, in the same order, for every locale', () => {
        for (const [presets, operators, units] of [
            [dateFilterPresetsFr, dateFilterOperatorsFr, dateFilterUnitsFr],
            [dateFilterPresetsEs, dateFilterOperatorsEs, dateFilterUnitsEs],
        ]) {
            expect(presets.map((preset) => preset.value)).toEqual(
                dateFilterPresetsPt.map((preset) => preset.value),
            );
            expect(operators.map((operator) => operator.value)).toEqual(
                dateFilterOperatorsPt.map((operator) => operator.value),
            );
            expect(units.map((unit) => unit.value)).toEqual(
                dateFilterUnitsPt.map((unit) => unit.value),
            );
        }
    });
});
