import {
    DEFAULT_OPERATORS,
    DEFAULT_PRESETS,
    DEFAULT_UNITS,
} from '@/blocks/date-filter/types';
import { loginFormLabels } from '@/blocks/login-form/types';
import { twoFactorLabels } from '@/blocks/two-factor/types';
import {
    alertLabelsPt,
    appearanceToggleLabelsPt,
    codeBlockLabelsPt,
    comboboxLabelsPt,
    commandPaletteLabelsPt,
    confirmDialogLabelsPt,
    copyButtonLabelsPt,
    dangerZoneLabelsPt,
    dataTableFacetedFilterLabelsPt,
    dataTableLabelsPt,
    dateFilterLabelsPt,
    dateFilterOperatorsPt,
    dateFilterPresetsPt,
    dateFilterUnitsPt,
    datePickerLabelsPt,
    dateRangeFilterLabelsPt,
    fieldLabelsPt,
    floatingSheetLabelsPt,
    formOverlayLabelsPt,
    jsonViewerLabelsPt,
    loginFormLabelsPt,
    passwordInputLabelsPt,
    ptLabels,
    saveStatusLabelsPt,
    tourLabelsPt,
    twoFactorLabelsPt,
} from '@/locales/pt';
import { describe, expect, it } from 'vitest';

describe('the portuguese alert labels', () => {
    it('carries every label the component takes', () => {
        expect(Object.keys(alertLabelsPt).sort()).toEqual([
            'infoLabel',
            'warningLabel',
        ]);
    });

    it('names the two severities without a colour word', () => {
        expect(alertLabelsPt.warningLabel).toBe('Aviso');
        expect(alertLabelsPt.infoLabel).toBe('Informação');
    });
});

describe('the portuguese appearance toggle labels', () => {
    it('carries every label the component takes', () => {
        expect(Object.keys(appearanceToggleLabelsPt).sort()).toEqual([
            'darkLabel',
            'groupLabel',
            'lightLabel',
            'systemLabel',
        ]);
    });

    it('translates the three appearance options', () => {
        expect(appearanceToggleLabelsPt.lightLabel).toBe('Claro');
        expect(appearanceToggleLabelsPt.darkLabel).toBe('Escuro');
        expect(appearanceToggleLabelsPt.systemLabel).toBe('Sistema');
    });
});

describe('the portuguese data table labels', () => {
    it('carries every label the component takes', () => {
        expect(Object.keys(dataTableLabelsPt).sort()).toEqual([
            'clearFiltersLabel',
            'createLabel',
            'emptyLabel',
            'noOptionsLabel',
            'paginationLabel',
            'searchPlaceholder',
            'totalLabel',
        ]);
    });

    it('builds the pagination label with both numbers', () => {
        expect(dataTableLabelsPt.paginationLabel(2, 7)).toBe('Página 2 de 7');
    });

    it('builds the total label with the registos word', () => {
        expect(dataTableLabelsPt.totalLabel(1000)).toBe(
            `${(1000).toLocaleString('pt-PT')} registos`,
        );
    });
});

describe('the portuguese date range filter labels', () => {
    it('carries every label the component takes', () => {
        expect(Object.keys(dateRangeFilterLabelsPt).sort()).toEqual([
            'dateFormat',
            'emptyLabel',
        ]);
    });

    it('keeps the day before the month, as Portuguese readers expect', () => {
        expect(dateRangeFilterLabelsPt.dateFormat).toBe('dd/MM/yy');
    });
});

describe('the portuguese date picker labels', () => {
    it('carries every label the component takes', () => {
        expect(Object.keys(datePickerLabelsPt).sort()).toEqual([
            'clearLabel',
            'dateFormat',
            'placeholder',
        ]);
    });

    it('keeps the day before the month, as Portuguese readers expect', () => {
        expect(datePickerLabelsPt.dateFormat).toBe('dd/MM/yy');
    });
});

describe('the portuguese combobox labels', () => {
    it('carries every label the component takes', () => {
        expect(Object.keys(comboboxLabelsPt).sort()).toEqual([
            'emptyText',
            'placeholder',
            'searchPlaceholder',
        ]);
    });

    it('translates the placeholder', () => {
        expect(comboboxLabelsPt.placeholder).toBe('Seleccione uma opção');
    });
});

describe('the portuguese confirm dialog labels', () => {
    it('carries every label the component takes', () => {
        expect(Object.keys(confirmDialogLabelsPt).sort()).toEqual([
            'cancelText',
            'confirmText',
            'description',
            'title',
        ]);
    });

    it('translates the default title', () => {
        expect(confirmDialogLabelsPt.title).toBe('Confirmar Ação');
    });
});

describe('the portuguese field labels', () => {
    it('carries every label the component takes', () => {
        expect(Object.keys(fieldLabelsPt).sort()).toEqual(['requiredLabel']);
    });

    it('translates the required marker', () => {
        expect(fieldLabelsPt.requiredLabel).toBe('Obrigatório');
    });
});

describe('the portuguese password input labels', () => {
    it('carries every label the component takes', () => {
        expect(Object.keys(passwordInputLabelsPt).sort()).toEqual([
            'hideLabel',
            'showLabel',
        ]);
    });

    it('names both reveal states in portuguese', () => {
        expect(passwordInputLabelsPt.showLabel).toBe('Mostrar palavra-passe');
        expect(passwordInputLabelsPt.hideLabel).toBe('Ocultar palavra-passe');
    });
});

describe('the portuguese data table faceted filter labels', () => {
    it('carries every label the component takes', () => {
        expect(Object.keys(dataTableFacetedFilterLabelsPt).sort()).toEqual([
            'noOptionsLabel',
        ]);
    });

    it('translates the empty message', () => {
        expect(dataTableFacetedFilterLabelsPt.noOptionsLabel).toBe(
            'Sem opções.',
        );
    });
});

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

describe('the portuguese copy button labels', () => {
    it('carries every label the component takes', () => {
        expect(Object.keys(copyButtonLabelsPt).sort()).toEqual([
            'copiedLabel',
            'copyLabel',
        ]);
    });

    it('names the resting and acknowledged states in portuguese', () => {
        expect(copyButtonLabelsPt.copyLabel).toBe('Copiar');
        expect(copyButtonLabelsPt.copiedLabel).toBe('Copiado');
    });
});

describe('the portuguese code block labels', () => {
    it('carries every label the component takes', () => {
        expect(Object.keys(codeBlockLabelsPt).sort()).toEqual([
            'collapseLabel',
            'copiedLabel',
            'copyLabel',
            'expandLabel',
        ]);
    });

    it('names the expand and collapse controls in portuguese', () => {
        expect(codeBlockLabelsPt.expandLabel).toBe('Expandir');
        expect(codeBlockLabelsPt.collapseLabel).toBe('Recolher');
    });
});

describe('the portuguese json viewer labels', () => {
    it('carries every label the component takes', () => {
        expect(Object.keys(jsonViewerLabelsPt).sort()).toEqual([
            'circularLabel',
            'collapseLabel',
            'copiedLabel',
            'copyLabel',
            'entriesLabel',
            'expandLabel',
        ]);
    });

    it('counts one entry and many entries in portuguese', () => {
        expect(jsonViewerLabelsPt.entriesLabel(1)).toBe('1 entrada');
        expect(jsonViewerLabelsPt.entriesLabel(3)).toBe('3 entradas');
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

describe('the portuguese floating sheet labels', () => {
    it('carries every label the component takes', () => {
        expect(Object.keys(floatingSheetLabelsPt).sort()).toEqual([
            'backLabel',
            'closeLabel',
        ]);
    });

    it('names the back and close controls in portuguese', () => {
        expect(floatingSheetLabelsPt.backLabel).toBe('Voltar');
        expect(floatingSheetLabelsPt.closeLabel).toBe('Fechar');
    });
});

describe('the portuguese save status labels', () => {
    it('carries every label the component takes', () => {
        expect(Object.keys(saveStatusLabelsPt).sort()).toEqual([
            'error',
            'idle',
            'saved',
            'saving',
        ]);
    });

    it('translates the resting and the saved messages', () => {
        expect(saveStatusLabelsPt.idle).toBe(
            'As alterações são guardadas automaticamente',
        );
        expect(saveStatusLabelsPt.saved).toBe('Guardado');
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
            'floatingSheet',
            'jsonViewer',
            'passwordInput',
            'saveStatus',
            'settings',
            'tour',
        ]);
    });

    it('points each section at the bundle the component already took', () => {
        expect(ptLabels.dataTable).toBe(dataTableLabelsPt);
        expect(ptLabels.dateFilter).toBe(dateFilterLabelsPt);
        expect(ptLabels.dateFilterPresets).toBe(dateFilterPresetsPt);
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
