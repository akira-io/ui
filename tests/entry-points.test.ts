// @vitest-environment node

import { describe, expect, it } from 'vitest';

import * as blocksEntry from '@/blocks';
import * as primitivesEntry from '@/index';
import * as shellsEntry from '@/shells';

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
    it('still exports AkiraMark', () => {
        expect(primitivesEntry).toHaveProperty('AkiraMark');
    });
});

describe('the blocks entry (@/blocks)', () => {
    it('still exports the login form namespace and preset', () => {
        expect(blocksEntry).toHaveProperty('LoginForm');
        expect(blocksEntry).toHaveProperty('LoginFormPreset');
    });

    it('exports exactly the pinned list, wildcard re-exports included', () => {
        expect(Object.keys(blocksEntry).sort()).toEqual(blocksEntryExports);
    });
});

describe('the shells entry (@/shells)', () => {
    it('still exports the whole AuthShell block', () => {
        expect(shellsEntry).toHaveProperty('AuthShell');
        expect(shellsEntry).toHaveProperty('AuthShellRoot');
        expect(shellsEntry).toHaveProperty('AuthShellPanel');
        expect(shellsEntry).toHaveProperty('AuthShellSurface');
        expect(shellsEntry).toHaveProperty('AuthShellMain');
        expect(shellsEntry).toHaveProperty('AuthShellLogo');
        expect(shellsEntry).toHaveProperty('AuthShellHeading');
        expect(shellsEntry).toHaveProperty('AuthShellBody');
        expect(shellsEntry).toHaveProperty('AuthShellFooter');
        expect(shellsEntry).toHaveProperty('useAuthArrangement');
    });
});
