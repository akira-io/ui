import { loginFormLabels } from '@/blocks/login-form/types';
import { twoFactorLabels } from '@/blocks/two-factor/types';
import {
    codeBlockLabelsFr,
    copyButtonLabelsFr,
    dangerZoneLabelsFr,
    dataTableLabelsFr,
    dateFilterLabelsFr,
    dateFilterPresetsFr,
    floatingSheetLabelsFr,
    formOverlayLabelsFr,
    frLabels,
    jsonViewerLabelsFr,
    loginFormLabelsFr,
    saveStatusLabelsFr,
    twoFactorLabelsFr,
} from '@/locales/fr';
import { describe, expect, it } from 'vitest';

describe('the french copy button labels', () => {
    it('carries every label the component takes', () => {
        expect(Object.keys(copyButtonLabelsFr).sort()).toEqual([
            'copiedLabel',
            'copyLabel',
        ]);
    });

    it('names the resting and acknowledged states in french', () => {
        expect(copyButtonLabelsFr.copyLabel).toBe('Copier');
        expect(copyButtonLabelsFr.copiedLabel).toBe('Copié');
    });
});

describe('the french code block labels', () => {
    it('carries every label the component takes', () => {
        expect(Object.keys(codeBlockLabelsFr).sort()).toEqual([
            'collapseLabel',
            'copiedLabel',
            'copyLabel',
            'expandLabel',
        ]);
    });

    it('names the expand and collapse controls in french', () => {
        expect(codeBlockLabelsFr.expandLabel).toBe('Développer');
        expect(codeBlockLabelsFr.collapseLabel).toBe('Réduire');
    });
});

describe('the french json viewer labels', () => {
    it('carries every label the component takes', () => {
        expect(Object.keys(jsonViewerLabelsFr).sort()).toEqual([
            'circularLabel',
            'collapseLabel',
            'copiedLabel',
            'copyLabel',
            'entriesLabel',
            'expandLabel',
        ]);
    });

    it('counts one entry and many entries in french', () => {
        expect(jsonViewerLabelsFr.entriesLabel(1)).toBe('1 entrée');
        expect(jsonViewerLabelsFr.entriesLabel(3)).toBe('3 entrées');
    });
});

describe('the french two factor labels', () => {
    it('carries every label the family takes', () => {
        expect(Object.keys(twoFactorLabelsFr).sort()).toEqual(
            Object.keys(twoFactorLabels).sort(),
        );
    });

    it('translates the setup title', () => {
        expect(twoFactorLabelsFr.setupTitle).toBe(
            'Authentification à deux facteurs',
        );
    });
});

describe('the french danger zone labels', () => {
    it('carries every label the block takes', () => {
        expect(Object.keys(dangerZoneLabelsFr).sort()).toEqual([
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
        expect(dangerZoneLabelsFr.requiredValueLabel).toBe(
            'Saisissez {{value}} pour confirmer',
        );
    });
});

describe('the french floating sheet labels', () => {
    it('carries every label the component takes', () => {
        expect(Object.keys(floatingSheetLabelsFr).sort()).toEqual([
            'backLabel',
            'closeLabel',
        ]);
    });

    it('names the back and close controls in french', () => {
        expect(floatingSheetLabelsFr.backLabel).toBe('Retour');
        expect(floatingSheetLabelsFr.closeLabel).toBe('Fermer');
    });
});

describe('the french save status labels', () => {
    it('carries every label the component takes', () => {
        expect(Object.keys(saveStatusLabelsFr).sort()).toEqual([
            'error',
            'idle',
            'saved',
            'saving',
        ]);
    });

    it('translates the resting and the saved messages', () => {
        expect(saveStatusLabelsFr.idle).toBe(
            'Les modifications sont enregistrées automatiquement',
        );
        expect(saveStatusLabelsFr.saved).toBe('Enregistré');
    });
});

describe('the french bundle the provider takes', () => {
    it('carries every section a localized component reads', () => {
        expect(Object.keys(frLabels).sort()).toEqual([
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
            'floatingSheet',
            'jsonViewer',
            'loginForm',
            'passwordInput',
            'saveStatus',
            'settings',
            'tour',
        ]);
    });

    it('points each section at the bundle the component already took', () => {
        expect(frLabels.dataTable).toBe(dataTableLabelsFr);
        expect(frLabels.dateFilter).toBe(dateFilterLabelsFr);
        expect(frLabels.dateFilterPresets).toBe(dateFilterPresetsFr);
        expect(frLabels.loginForm).toBe(loginFormLabelsFr);
    });
});

describe('the french login form labels', () => {
    it('carries every label the block takes', () => {
        expect(Object.keys(loginFormLabelsFr).sort()).toEqual(
            Object.keys(loginFormLabels).sort(),
        );
    });

    it('names the fields the way the product does', () => {
        expect(loginFormLabelsFr.emailLabel).toBe('Adresse e-mail');
        expect(loginFormLabelsFr.passwordLabel).toBe('Mot de passe');
        expect(loginFormLabelsFr.rememberLabel).toBe('Se souvenir de moi');
        expect(loginFormLabelsFr.submitLabel).toBe('Se connecter');
    });
});

describe('the french form overlay labels', () => {
    it('carries every label the block takes', () => {
        expect(Object.keys(formOverlayLabelsFr).sort()).toEqual([
            'cancelLabel',
            'saveLabel',
            'savingLabel',
        ]);
    });

    it('names the footer controls in french', () => {
        expect(formOverlayLabelsFr.cancelLabel).toBe('Annuler');
        expect(formOverlayLabelsFr.saveLabel).toBe('Enregistrer');
        expect(formOverlayLabelsFr.savingLabel).toBe('Enregistrement...');
    });
});
