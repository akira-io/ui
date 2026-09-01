// @vitest-environment node

import { describe, expect, it } from 'vitest';

const blocksEntryExports = [
    'CommandPalette',
    'DATE_FILTER_LABELS',
    'DATE_FILTER_OPERATORS',
    'DATE_FILTER_PRESETS',
    'DATE_FILTER_UNITS',
    'DEFAULT_TOUR_LABELS',
    'DangerZone',
    'DateField',
    'DateFilter',
    'DateFilterAll',
    'DateFilterContent',
    'DateFilterFixed',
    'DateFilterItem',
    'DateFilterPresets',
    'DateFilterRelative',
    'DateFilterSeparator',
    'DateFilterTrigger',
    'DetailEditSheet',
    'FormDialog',
    'FormOverlayActions',
    'InfoField',
    'InfoFieldGroup',
    'LocalizedFields',
    'LoginForm',
    'LoginFormEmail',
    'LoginFormPassword',
    'LoginFormPreset',
    'LoginFormProvider',
    'LoginFormRemember',
    'LoginFormRoot',
    'LoginFormStatus',
    'LoginFormSubmit',
    'NumberField',
    'SectionHeader',
    'SelectField',
    'SettingsCard',
    'SettingsEntry',
    'SettingsField',
    'SettingsGroup',
    'SettingsPage',
    'SettingsPanel',
    'SettingsSection',
    'StatCard',
    'StatsGrid',
    'TextField',
    'ToggleRow',
    'TourProvider',
    'TwoFactorChallenge',
    'TwoFactorDisableButton',
    'TwoFactorRecoveryCodes',
    'TwoFactorScanStep',
    'TwoFactorSetupDialog',
    'TwoFactorVerifyForm',
    'UiLocaleProvider',
    'dangerZoneLabels',
    'decodeDateFilter',
    'encodeDateFilter',
    'fieldError',
    'formOverlayDefaultLabels',
    'formatRangePreview',
    'loginFormLabels',
    'resolveRelativeRange',
    'resolveSteps',
    'settingsLabels',
    'shouldStartTour',
    'stepsForBreakpoint',
    'summariseDateFilter',
    'twoFactorLabels',
    'useCommandPalette',
    'useDateFilter',
    'useLoginFormContext',
    'useTour',
    'useTourController',
    'useUiLabels',
    'useUiLocale',
];

describe('the primitives entry (@/index)', () => {
    it('still exports AkiraMark', async () => {
        const entry = await import('@/index');

        expect(entry).toHaveProperty('AkiraMark');
    });
});

describe('the blocks entry (@/blocks)', () => {
    it('still exports the login form namespace and preset', async () => {
        const entry = await import('@/blocks');

        expect(entry).toHaveProperty('LoginForm');
        expect(entry).toHaveProperty('LoginFormPreset');
    });

    it('exports exactly the pinned list, wildcard re-exports included', async () => {
        const entry = await import('@/blocks');

        expect(Object.keys(entry).sort()).toEqual(blocksEntryExports);
    });
});

describe('the shells entry (@/shells)', () => {
    it('still exports the whole AuthShell block', async () => {
        const entry = await import('@/shells');

        expect(entry).toHaveProperty('AuthShell');
        expect(entry).toHaveProperty('AuthShellRoot');
        expect(entry).toHaveProperty('AuthShellPanel');
        expect(entry).toHaveProperty('AuthShellSurface');
        expect(entry).toHaveProperty('AuthShellMain');
        expect(entry).toHaveProperty('AuthShellLogo');
        expect(entry).toHaveProperty('AuthShellHeading');
        expect(entry).toHaveProperty('AuthShellBody');
        expect(entry).toHaveProperty('AuthShellFooter');
        expect(entry).toHaveProperty('useAuthArrangement');
    });
});
