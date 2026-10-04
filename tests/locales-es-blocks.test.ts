import { loginFormLabels } from '@/blocks/login-form/types';
import { notificationBellLabels } from '@/blocks/notification-bell';
import { twoFactorLabels } from '@/blocks/two-factor/types';
import {
    codeBlockLabelsEs,
    copyButtonLabelsEs,
    dangerZoneLabelsEs,
    dataTableLabelsEs,
    dateFilterLabelsEs,
    dateFilterPresetsEs,
    esLabels,
    fieldLabelsEs,
    floatingSheetLabelsEs,
    formOverlayLabelsEs,
    jsonViewerLabelsEs,
    loginFormLabelsEs,
    notificationBellLabelsEs,
    saveStatusLabelsEs,
    twoFactorLabelsEs,
} from '@/locales/es';
import { describe, expect, it } from 'vitest';

describe('the spanish copy button labels', () => {
    it('carries every label the component takes', () => {
        expect(Object.keys(copyButtonLabelsEs).sort()).toEqual([
            'copiedLabel',
            'copyLabel',
        ]);
    });

    it('names the resting and acknowledged states in spanish', () => {
        expect(copyButtonLabelsEs.copyLabel).toBe('Copiar');
        expect(copyButtonLabelsEs.copiedLabel).toBe('Copiado');
    });
});

describe('the spanish code block labels', () => {
    it('carries every label the component takes', () => {
        expect(Object.keys(codeBlockLabelsEs).sort()).toEqual([
            'collapseLabel',
            'copiedLabel',
            'copyLabel',
            'expandLabel',
        ]);
    });

    it('names the expand and collapse controls in spanish', () => {
        expect(codeBlockLabelsEs.expandLabel).toBe('Expandir');
        expect(codeBlockLabelsEs.collapseLabel).toBe('Contraer');
    });
});

describe('the spanish json viewer labels', () => {
    it('carries every label the component takes', () => {
        expect(Object.keys(jsonViewerLabelsEs).sort()).toEqual([
            'circularLabel',
            'collapseLabel',
            'copiedLabel',
            'copyLabel',
            'entriesLabel',
            'expandLabel',
        ]);
    });

    it('counts one entry and many entries in spanish', () => {
        expect(jsonViewerLabelsEs.entriesLabel(1)).toBe('1 entrada');
        expect(jsonViewerLabelsEs.entriesLabel(3)).toBe('3 entradas');
    });
});

describe('the spanish two factor labels', () => {
    it('carries every label the family takes', () => {
        expect(Object.keys(twoFactorLabelsEs).sort()).toEqual(
            Object.keys(twoFactorLabels).sort(),
        );
    });

    it('translates the setup title', () => {
        expect(twoFactorLabelsEs.setupTitle).toBe('Autenticación en dos pasos');
    });
});

describe('the spanish danger zone labels', () => {
    it('carries every label the block takes', () => {
        expect(Object.keys(dangerZoneLabelsEs).sort()).toEqual([
            'actionLabel',
            'cancelText',
            'confirmDescription',
            'confirmText',
            'confirmTitle',
            'description',
            'passwordLabel',
            'passwordPlaceholder',
            'requiredValueLabel',
            'title',
        ]);
    });

    it('keeps the typed value placeholder in place', () => {
        expect(dangerZoneLabelsEs.requiredValueLabel).toBe(
            'Escribe {{value}} para confirmar',
        );
    });
});

describe('the spanish floating sheet labels', () => {
    it('carries every label the component takes', () => {
        expect(Object.keys(floatingSheetLabelsEs).sort()).toEqual([
            'backLabel',
            'closeLabel',
        ]);
    });

    it('names the back and close controls in spanish', () => {
        expect(floatingSheetLabelsEs.backLabel).toBe('Volver');
        expect(floatingSheetLabelsEs.closeLabel).toBe('Cerrar');
    });
});

describe('the spanish save status labels', () => {
    it('carries every label the component takes', () => {
        expect(Object.keys(saveStatusLabelsEs).sort()).toEqual([
            'error',
            'idle',
            'saved',
            'saving',
        ]);
    });

    it('translates the resting and the saved messages', () => {
        expect(saveStatusLabelsEs.idle).toBe(
            'Los cambios se guardan automáticamente',
        );
        expect(saveStatusLabelsEs.saved).toBe('Guardado');
    });
});

describe('the spanish bundle the provider takes', () => {
    it('carries every section a localized component reads', () => {
        expect(Object.keys(esLabels).sort()).toEqual([
            'alert',
            'appearanceToggle',
            'breadcrumb',
            'carousel',
            'codeBlock',
            'combobox',
            'commandPalette',
            'confirmDialog',
            'copyButton',
            'dangerZone',
            'dataTable',
            'dataTableFacetedFilter',
            'dateFilter',
            'dateFilterOperators',
            'dateFilterPresets',
            'dateFilterUnits',
            'datePicker',
            'dateRangeFilter',
            'dialog',
            'dropzone',
            'editor',
            'emptyState',
            'field',
            'floatingSheet',
            'formOverlay',
            'jsonViewer',
            'loginForm',
            'notificationBell',
            'pagination',
            'passkeys',
            'passwordInput',
            'saveStatus',
            'settings',
            'settingsLayout',
            'sheet',
            'sidebar',
            'tour',
            'twoFactor',
            'userMenu',
        ]);
    });

    it('points each section at the bundle the component already took', () => {
        expect(esLabels.dataTable).toBe(dataTableLabelsEs);
        expect(esLabels.dateFilter).toBe(dateFilterLabelsEs);
        expect(esLabels.dateFilterPresets).toBe(dateFilterPresetsEs);
        expect(esLabels.loginForm).toBe(loginFormLabelsEs);
        expect(esLabels.field).toBe(fieldLabelsEs);
    });
});

describe('the spanish login form labels', () => {
    it('carries every label the block takes', () => {
        expect(Object.keys(loginFormLabelsEs).sort()).toEqual(
            Object.keys(loginFormLabels).sort(),
        );
    });

    it('names the fields the way the product does', () => {
        expect(loginFormLabelsEs.emailLabel).toBe('Correo electrónico');
        expect(loginFormLabelsEs.passwordLabel).toBe('Contraseña');
        expect(loginFormLabelsEs.rememberLabel).toBe('Recordarme');
        expect(loginFormLabelsEs.submitLabel).toBe('Iniciar sesión');
    });
});

describe('the spanish form overlay labels', () => {
    it('carries every label the block takes', () => {
        expect(Object.keys(formOverlayLabelsEs).sort()).toEqual([
            'cancelLabel',
            'saveLabel',
            'savingLabel',
        ]);
    });

    it('names the footer controls in spanish', () => {
        expect(formOverlayLabelsEs.cancelLabel).toBe('Cancelar');
        expect(formOverlayLabelsEs.saveLabel).toBe('Guardar');
        expect(formOverlayLabelsEs.savingLabel).toBe('Guardando...');
    });
});
describe('the spanish notification bell labels', () => {
    it('carries every label the block takes', () => {
        expect(Object.keys(notificationBellLabelsEs).sort()).toEqual(
            Object.keys(notificationBellLabels).sort(),
        );
    });

    it('keeps the unread count placeholder in place', () => {
        expect(notificationBellLabelsEs.unreadLabel).toContain('{{count}}');
    });
});
