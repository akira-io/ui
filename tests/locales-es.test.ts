import {
    alertLabelsEs,
    appearanceToggleLabelsEs,
    comboboxLabelsEs,
    commandPaletteLabelsEs,
    confirmDialogLabelsEs,
    dataTableFacetedFilterLabelsEs,
    dataTableLabelsEs,
    datePickerLabelsEs,
    dateRangeFilterLabelsEs,
    dropzoneLabelsEs,
    fieldLabelsEs,
    passwordInputLabelsEs,
    tourLabelsEs,
} from '@/locales/es';
import { describe, expect, it } from 'vitest';

describe('the spanish alert labels', () => {
    it('carries every label the component takes', () => {
        expect(Object.keys(alertLabelsEs).sort()).toEqual([
            'infoLabel',
            'warningLabel',
        ]);
    });

    it('names the two severities without a colour word', () => {
        expect(alertLabelsEs.warningLabel).toBe('Advertencia');
        expect(alertLabelsEs.infoLabel).toBe('Información');
    });
});

describe('the spanish appearance toggle labels', () => {
    it('carries every label the component takes', () => {
        expect(Object.keys(appearanceToggleLabelsEs).sort()).toEqual([
            'darkLabel',
            'groupLabel',
            'lightLabel',
            'systemLabel',
        ]);
    });

    it('translates the three appearance options', () => {
        expect(appearanceToggleLabelsEs.lightLabel).toBe('Claro');
        expect(appearanceToggleLabelsEs.darkLabel).toBe('Oscuro');
        expect(appearanceToggleLabelsEs.systemLabel).toBe('Sistema');
    });
});

describe('the spanish data table labels', () => {
    it('carries every label the component takes', () => {
        expect(Object.keys(dataTableLabelsEs).sort()).toEqual([
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
        expect(dataTableLabelsEs.paginationLabel(2, 7)).toBe('Página 2 de 7');
    });

    it('builds the total label with the registros word', () => {
        expect(dataTableLabelsEs.totalLabel(1000)).toBe(
            `${(1000).toLocaleString('es-ES')} registros`,
        );
    });
});

describe('the spanish date range filter labels', () => {
    it('carries every label the component takes', () => {
        expect(Object.keys(dateRangeFilterLabelsEs).sort()).toEqual([
            'dateFormat',
            'emptyLabel',
        ]);
    });

    it('keeps the day before the month, as Spanish readers expect', () => {
        expect(dateRangeFilterLabelsEs.dateFormat).toBe('dd/MM/yy');
    });
});

describe('the spanish dropzone labels', () => {
    it('carries every label the component takes', () => {
        expect(Object.keys(dropzoneLabelsEs).sort()).toEqual([
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

    it('measures a file with a decimal comma, as Spanish readers expect', () => {
        expect(dropzoneLabelsEs.sizeLabel(1_500_000)).toBe('1,4 MB');
    });

    it('names the cap a rejected file broke', () => {
        expect(dropzoneLabelsEs.tooLargeLabel(5 * 1024 * 1024)).toContain(
            '5 MB',
        );
    });
});

describe('the spanish date picker labels', () => {
    it('carries every label the component takes', () => {
        expect(Object.keys(datePickerLabelsEs).sort()).toEqual([
            'clearLabel',
            'dateFormat',
            'placeholder',
        ]);
    });

    it('keeps the day before the month, as Spanish readers expect', () => {
        expect(datePickerLabelsEs.dateFormat).toBe('dd/MM/yy');
    });
});

describe('the spanish combobox labels', () => {
    it('carries every label the component takes', () => {
        expect(Object.keys(comboboxLabelsEs).sort()).toEqual([
            'emptyText',
            'placeholder',
            'searchPlaceholder',
        ]);
    });

    it('translates the placeholder', () => {
        expect(comboboxLabelsEs.placeholder).toBe('Selecciona una opción');
    });
});

describe('the spanish confirm dialog labels', () => {
    it('carries every label the component takes', () => {
        expect(Object.keys(confirmDialogLabelsEs).sort()).toEqual([
            'cancelText',
            'confirmText',
            'description',
            'title',
        ]);
    });

    it('translates the default title', () => {
        expect(confirmDialogLabelsEs.title).toBe('Confirmar acción');
    });
});

describe('the spanish field labels', () => {
    it('carries every label the component takes', () => {
        expect(Object.keys(fieldLabelsEs).sort()).toEqual(['requiredLabel']);
    });

    it('translates the required marker', () => {
        expect(fieldLabelsEs.requiredLabel).toBe('Obligatorio');
    });
});

describe('the spanish password input labels', () => {
    it('carries every label the component takes', () => {
        expect(Object.keys(passwordInputLabelsEs).sort()).toEqual([
            'hideLabel',
            'showLabel',
        ]);
    });

    it('names both reveal states in spanish', () => {
        expect(passwordInputLabelsEs.showLabel).toBe('Mostrar contraseña');
        expect(passwordInputLabelsEs.hideLabel).toBe('Ocultar contraseña');
    });
});

describe('the spanish data table faceted filter labels', () => {
    it('carries every label the component takes', () => {
        expect(Object.keys(dataTableFacetedFilterLabelsEs).sort()).toEqual([
            'noOptionsLabel',
        ]);
    });

    it('translates the empty message', () => {
        expect(dataTableFacetedFilterLabelsEs.noOptionsLabel).toBe(
            'No hay opciones.',
        );
    });
});

describe('the spanish command palette labels', () => {
    it('carries every label the component takes', () => {
        expect(Object.keys(commandPaletteLabelsEs).sort()).toEqual([
            'noResultsLabel',
            'placeholder',
        ]);
    });

    it('translates the empty state message', () => {
        expect(commandPaletteLabelsEs.noResultsLabel).toBe(
            'No se han encontrado resultados',
        );
    });
});

describe('the spanish tour labels', () => {
    it('carries every label the component takes', () => {
        expect(Object.keys(tourLabelsEs).sort()).toEqual([
            'done',
            'next',
            'previous',
            'progress',
        ]);
    });

    it('keeps the progress placeholders in place', () => {
        expect(tourLabelsEs.progress).toBe('{{current}} de {{total}}');
    });
});
