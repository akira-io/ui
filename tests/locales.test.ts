import {
    alertLabelsPt,
    appearanceToggleLabelsPt,
    codeBlockLabelsPt,
    comboboxLabelsPt,
    confirmDialogLabelsPt,
    copyButtonLabelsPt,
    dataTableFacetedFilterLabelsPt,
    dataTableLabelsPt,
    datePickerLabelsPt,
    dateRangeFilterLabelsPt,
    dropzoneLabelsPt,
    fieldLabelsPt,
    floatingSheetLabelsPt,
    jsonViewerLabelsPt,
    passwordInputLabelsPt,
    saveStatusLabelsPt,
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
describe('the portuguese dropzone labels', () => {
    it('carries every label the component takes', () => {
        expect(Object.keys(dropzoneLabelsPt).sort()).toEqual([
            'activeLabel',
            'idleLabel',
            'invalidTypeLabel',
            'progressLabel',
            'rejectedLabel',
            'removeLabel',
            'sizeLabel',
            'tooLargeLabel',
            'tooManyFilesLabel',
            'triggerLabel',
        ]);
    });

    it('measures a file with a decimal comma, as Portuguese readers expect', () => {
        expect(dropzoneLabelsPt.sizeLabel(1_500_000)).toBe('1,4 MB');
    });

    it('names the cap a rejected file broke', () => {
        expect(dropzoneLabelsPt.tooLargeLabel(5 * 1024 * 1024)).toContain(
            '5 MB',
        );
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
