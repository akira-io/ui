import {
    DEFAULT_OPERATORS,
    DEFAULT_PRESETS,
    DEFAULT_UNITS,
} from '@/blocks/date-filter/types';
import { loginFormLabels } from '@/blocks/login-form/types';
import { twoFactorLabels } from '@/blocks/two-factor/types';
import {
    commandPaletteLabelsPt,
    dangerZoneLabelsPt,
    dataTableLabelsPt,
    dateFilterLabelsPt,
    dateFilterOperatorsPt,
    dateFilterPresetsPt,
    dateFilterUnitsPt,
    fieldLabelsPt,
    formOverlayLabelsPt,
    loginFormLabelsPt,
    ptLabels,
    tourLabelsPt,
    twoFactorLabelsPt,
} from '@/locales/pt';
import { describe, expect, it } from 'vitest';

describe('the portuguese command palette labels', () => {
    it('carries every label the component takes', () => {
        expect(Object.keys(commandPaletteLabelsPt).sort()).toEqual([
            'noResultsLabel',
            'placeholder',
        ]);
    });

    it('translates the empty state message', () => {
        expect(commandPaletteLabelsPt.noResultsLabel).toBe(
            'Nenhum resultado encontrado',
        );
    });
});
describe('the portuguese tour labels', () => {
    it('carries every label the component takes', () => {
        expect(Object.keys(tourLabelsPt).sort()).toEqual([
            'done',
            'next',
            'previous',
            'progress',
        ]);
    });

    it('keeps the progress placeholders in place', () => {
        expect(tourLabelsPt.progress).toBe('{{current}} de {{total}}');
    });
});
describe('the portuguese date filter labels', () => {
    it('carries every label the component takes', () => {
        expect(Object.keys(dateFilterLabelsPt).sort()).toEqual([
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
        expect(dateFilterLabelsPt.all).toBe('Todo o período');
    });
});
describe('the portuguese date filter presets', () => {
    it('carries every preset the component ships', () => {
        expect(dateFilterPresetsPt.map((preset) => preset.value)).toEqual(
            DEFAULT_PRESETS.map((preset) => preset.value),
        );
    });

    it('translates the previous month preset', () => {
        expect(
            dateFilterPresetsPt.find(
                (preset) => preset.value === 'previous_month',
            )?.label,
        ).toBe('Mês anterior');
    });
});
describe('the portuguese date filter operators', () => {
    it('carries every operator the component ships', () => {
        expect(dateFilterOperatorsPt.map((operator) => operator.value)).toEqual(
            DEFAULT_OPERATORS.map((operator) => operator.value),
        );
    });

    it('translates the between operator', () => {
        expect(
            dateFilterOperatorsPt.find(
                (operator) => operator.value === 'between',
            )?.label,
        ).toBe('Entre');
    });
});
describe('the portuguese date filter units', () => {
    it('carries every unit the component ships', () => {
        expect(dateFilterUnitsPt.map((unit) => unit.value)).toEqual(
            DEFAULT_UNITS.map((unit) => unit.value),
        );
    });

    it('translates the month unit', () => {
        expect(
            dateFilterUnitsPt.find((unit) => unit.value === 'month')?.label,
        ).toBe('meses');
    });
});
describe('the portuguese two factor labels', () => {
    it('carries every label the family takes', () => {
        expect(Object.keys(twoFactorLabelsPt).sort()).toEqual(
            Object.keys(twoFactorLabels).sort(),
        );
    });

    it('translates the setup title', () => {
        expect(twoFactorLabelsPt.setupTitle).toBe(
            'Autenticação de dois fatores',
        );
    });
});
describe('the portuguese danger zone labels', () => {
    it('carries every label the block takes', () => {
        expect(Object.keys(dangerZoneLabelsPt).sort()).toEqual([
            'actionLabel',
            'cancelText',
            'confirmDescription',
            'confirmText',
            'confirmTitle',
            'description',
            'requiredValueLabel',
            'title',
        ]);
    });

    it('keeps the typed value placeholder in place', () => {
        expect(dangerZoneLabelsPt.requiredValueLabel).toBe(
            'Escreva {{value}} para confirmar',
        );
    });
});
describe('the portuguese login form labels', () => {
    it('carries every label the block takes', () => {
        expect(Object.keys(loginFormLabelsPt).sort()).toEqual(
            Object.keys(loginFormLabels).sort(),
        );
    });

    it('names the fields the way the product does', () => {
        expect(loginFormLabelsPt.emailLabel).toBe('Endereço de email');
        expect(loginFormLabelsPt.passwordLabel).toBe('Palavra-passe');
        expect(loginFormLabelsPt.rememberLabel).toBe('Manter sessão iniciada');
        expect(loginFormLabelsPt.submitLabel).toBe('Entrar');
    });
});
describe('the portuguese form overlay labels', () => {
    it('carries every label the block takes', () => {
        expect(Object.keys(formOverlayLabelsPt).sort()).toEqual([
            'cancelLabel',
            'saveLabel',
            'savingLabel',
        ]);
    });

    it('names the footer controls in portuguese', () => {
        expect(formOverlayLabelsPt.cancelLabel).toBe('Cancelar');
        expect(formOverlayLabelsPt.saveLabel).toBe('Guardar');
        expect(formOverlayLabelsPt.savingLabel).toBe('A guardar...');
    });
});

describe('the portuguese bundle the provider takes', () => {
    it('carries every section a localized component reads', () => {
        expect(Object.keys(ptLabels).sort()).toEqual([
            'alert',
            'appearanceToggle',
            'codeBlock',
            'combobox',
            'commandPalette',
            'confirmDialog',
            'copyButton',
            'dataTable',
            'dataTableFacetedFilter',
            'dateFilter',
            'dateFilterOperators',
            'dateFilterPresets',
            'dateFilterUnits',
            'datePicker',
            'dateRangeFilter',
            'dropzone',
            'field',
            'floatingSheet',
            'jsonViewer',
            'loginForm',
            'passkeys',
            'passwordInput',
            'saveStatus',
            'settings',
            'tour',
            'twoFactor',
        ]);
    });

    it('points each section at the bundle the component already took', () => {
        expect(ptLabels.dataTable).toBe(dataTableLabelsPt);
        expect(ptLabels.dateFilter).toBe(dateFilterLabelsPt);
        expect(ptLabels.dateFilterPresets).toBe(dateFilterPresetsPt);
        expect(ptLabels.loginForm).toBe(loginFormLabelsPt);
        expect(ptLabels.field).toBe(fieldLabelsPt);
    });
});
