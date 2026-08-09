import type { CommandPaletteLabels } from '@/blocks/command-palette';
import type {
    DateFilterLabels,
    DateFilterOption,
} from '@/blocks/date-filter/types';
import type { LoginFormLabels } from '@/blocks/login-form/types';
import type { SettingsLabels } from '@/blocks/settings-page';
import type { TourLabels } from '@/blocks/tour/types';
import type { AlertLabels } from '@/components/ui/alert';
import type { AppearanceToggleLabels } from '@/components/ui/appearance-toggle';
import type { CodeBlockLabels } from '@/components/ui/code-block';
import type { ComboboxLabels } from '@/components/ui/combobox';
import type { ConfirmDialogLabels } from '@/components/ui/confirm-dialog';
import type { CopyButtonLabels } from '@/components/ui/copy-button';
import type { DataTableLabels } from '@/components/ui/data-table';
import type { DataTableFacetedFilterLabels } from '@/components/ui/data-table-faceted-filter';
import type { DatePickerLabels } from '@/components/ui/date-picker';
import type { DateRangeFilterLabels } from '@/components/ui/date-range-filter';
import type { FloatingSheetLabels } from '@/components/ui/floating-sheet-context';
import type { JsonViewerLabels } from '@/components/ui/json-viewer';
import type { PasswordInputLabels } from '@/components/ui/password-input';
import type { SaveStatusLabels } from '@/components/ui/save-status';
import { createContext, useContext, type ReactNode } from 'react';

export interface UiLabelSections {
    alert: AlertLabels;
    appearanceToggle: AppearanceToggleLabels;
    codeBlock: CodeBlockLabels;
    combobox: ComboboxLabels;
    commandPalette: CommandPaletteLabels;
    confirmDialog: ConfirmDialogLabels;
    copyButton: CopyButtonLabels;
    dataTable: DataTableLabels;
    dataTableFacetedFilter: DataTableFacetedFilterLabels;
    dateFilter: DateFilterLabels;
    datePicker: DatePickerLabels;
    dateRangeFilter: DateRangeFilterLabels;
    floatingSheet: FloatingSheetLabels;
    jsonViewer: JsonViewerLabels;
    loginForm: LoginFormLabels;
    passwordInput: PasswordInputLabels;
    saveStatus: SaveStatusLabels;
    settings: SettingsLabels;
    tour: TourLabels;
}

export type UiLabels = {
    [Section in keyof UiLabelSections]?: Partial<UiLabelSections[Section]>;
} & {
    dateFilterPresets?: DateFilterOption[];
    dateFilterOperators?: DateFilterOption[];
    dateFilterUnits?: DateFilterOption[];
};

const EMPTY: UiLabels = {};

const UiLocaleContext = createContext<UiLabels>(EMPTY);

export function UiLocaleProvider({
    labels,
    children,
}: {
    labels: UiLabels;
    children: ReactNode;
}) {
    return (
        <UiLocaleContext.Provider value={labels}>
            {children}
        </UiLocaleContext.Provider>
    );
}

export function useUiLocale(): UiLabels {
    return useContext(UiLocaleContext);
}

function defined(source: object | undefined): Record<string, unknown> {
    if (!source) {
        return {};
    }

    return Object.fromEntries(
        Object.entries(source).filter(([, value]) => value !== undefined),
    );
}

export function useUiLabels<Section extends keyof UiLabelSections>(
    section: Section,
    defaults: UiLabelSections[Section],
    overrides?: Partial<UiLabelSections[Section]>,
): UiLabelSections[Section] {
    const locale = useUiLocale();

    return {
        ...defaults,
        ...defined(locale[section]),
        ...defined(overrides),
    } as UiLabelSections[Section];
}
