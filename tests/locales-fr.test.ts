import {
    alertLabelsFr,
    appearanceToggleLabelsFr,
    comboboxLabelsFr,
    commandPaletteLabelsFr,
    confirmDialogLabelsFr,
    dataTableFacetedFilterLabelsFr,
    dataTableLabelsFr,
    datePickerLabelsFr,
    dateRangeFilterLabelsFr,
    dropzoneLabelsFr,
    fieldLabelsFr,
    passwordInputLabelsFr,
    tourLabelsFr,
} from '@/locales/fr';
import { describe, expect, it } from 'vitest';

describe('the french alert labels', () => {
    it('carries every label the component takes', () => {
        expect(Object.keys(alertLabelsFr).sort()).toEqual([
            'infoLabel',
            'warningLabel',
        ]);
    });

    it('names the two severities without a colour word', () => {
        expect(alertLabelsFr.warningLabel).toBe('Avertissement');
        expect(alertLabelsFr.infoLabel).toBe('Information');
    });
});

describe('the french appearance toggle labels', () => {
    it('carries every label the component takes', () => {
        expect(Object.keys(appearanceToggleLabelsFr).sort()).toEqual([
            'darkLabel',
            'groupLabel',
            'lightLabel',
            'systemLabel',
        ]);
    });

    it('translates the three appearance options', () => {
        expect(appearanceToggleLabelsFr.lightLabel).toBe('Clair');
        expect(appearanceToggleLabelsFr.darkLabel).toBe('Sombre');
        expect(appearanceToggleLabelsFr.systemLabel).toBe('Système');
    });
});

describe('the french data table labels', () => {
    it('carries every label the component takes', () => {
        expect(Object.keys(dataTableLabelsFr).sort()).toEqual([
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
        expect(dataTableLabelsFr.paginationLabel(2, 7)).toBe('Page 2 sur 7');
    });

    it('builds the total label with the enregistrements word', () => {
        expect(dataTableLabelsFr.totalLabel(1000)).toBe(
            `${(1000).toLocaleString('fr-FR')} enregistrements`,
        );
    });
});

describe('the french date range filter labels', () => {
    it('carries every label the component takes', () => {
        expect(Object.keys(dateRangeFilterLabelsFr).sort()).toEqual([
            'dateFormat',
            'emptyLabel',
        ]);
    });

    it('keeps the day before the month, as French readers expect', () => {
        expect(dateRangeFilterLabelsFr.dateFormat).toBe('dd/MM/yy');
    });
});

describe('the french dropzone labels', () => {
    it('carries every label the component takes', () => {
        expect(Object.keys(dropzoneLabelsFr).sort()).toEqual([
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

    it('measures a file with a decimal comma, as French readers expect', () => {
        expect(dropzoneLabelsFr.sizeLabel(1_500_000)).toBe('1,4 MB');
    });

    it('names the cap a rejected file broke', () => {
        expect(dropzoneLabelsFr.tooLargeLabel(5 * 1024 * 1024)).toContain(
            '5 MB',
        );
    });
});

describe('the french date picker labels', () => {
    it('carries every label the component takes', () => {
        expect(Object.keys(datePickerLabelsFr).sort()).toEqual([
            'clearLabel',
            'dateFormat',
            'placeholder',
        ]);
    });

    it('keeps the day before the month, as French readers expect', () => {
        expect(datePickerLabelsFr.dateFormat).toBe('dd/MM/yy');
    });
});

describe('the french combobox labels', () => {
    it('carries every label the component takes', () => {
        expect(Object.keys(comboboxLabelsFr).sort()).toEqual([
            'emptyText',
            'placeholder',
            'searchPlaceholder',
        ]);
    });

    it('translates the placeholder', () => {
        expect(comboboxLabelsFr.placeholder).toBe('Sélectionnez une option');
    });
});

describe('the french confirm dialog labels', () => {
    it('carries every label the component takes', () => {
        expect(Object.keys(confirmDialogLabelsFr).sort()).toEqual([
            'cancelText',
            'confirmText',
            'description',
            'title',
        ]);
    });

    it('translates the default title', () => {
        expect(confirmDialogLabelsFr.title).toBe("Confirmer l'action");
    });
});

describe('the french field labels', () => {
    it('carries every label the component takes', () => {
        expect(Object.keys(fieldLabelsFr).sort()).toEqual(['requiredLabel']);
    });

    it('translates the required marker', () => {
        expect(fieldLabelsFr.requiredLabel).toBe('Obligatoire');
    });
});

describe('the french password input labels', () => {
    it('carries every label the component takes', () => {
        expect(Object.keys(passwordInputLabelsFr).sort()).toEqual([
            'hideLabel',
            'showLabel',
        ]);
    });

    it('names both reveal states in french', () => {
        expect(passwordInputLabelsFr.showLabel).toBe(
            'Afficher le mot de passe',
        );
        expect(passwordInputLabelsFr.hideLabel).toBe('Masquer le mot de passe');
    });
});

describe('the french data table faceted filter labels', () => {
    it('carries every label the component takes', () => {
        expect(Object.keys(dataTableFacetedFilterLabelsFr).sort()).toEqual([
            'noOptionsLabel',
        ]);
    });

    it('translates the empty message', () => {
        expect(dataTableFacetedFilterLabelsFr.noOptionsLabel).toBe(
            'Aucune option.',
        );
    });
});

describe('the french command palette labels', () => {
    it('carries every label the component takes', () => {
        expect(Object.keys(commandPaletteLabelsFr).sort()).toEqual([
            'noResultsLabel',
            'placeholder',
        ]);
    });

    it('translates the empty state message', () => {
        expect(commandPaletteLabelsFr.noResultsLabel).toBe(
            'Aucun résultat trouvé',
        );
    });
});

describe('the french tour labels', () => {
    it('carries every label the component takes', () => {
        expect(Object.keys(tourLabelsFr).sort()).toEqual([
            'done',
            'next',
            'previous',
            'progress',
        ]);
    });

    it('keeps the progress placeholders in place', () => {
        expect(tourLabelsFr.progress).toBe('{{current}} sur {{total}}');
    });
});
