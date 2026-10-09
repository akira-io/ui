import type { CommandPaletteLabels } from '@/blocks/command-palette';
import type { DangerZoneLabels } from '@/blocks/danger-zone';
import type {
    DateFilterLabels,
    DateFilterOption,
} from '@/blocks/date-filter/types';
import type { FormOverlayLabels } from '@/blocks/form-overlay';
import type { LoginFormLabels } from '@/blocks/login-form/types';
import type { NotificationBellLabels } from '@/blocks/notification-bell';
import type { PasskeyLabels } from '@/blocks/passkeys/types';
import type { SettingsLabels } from '@/blocks/settings-page';
import type { TourLabels } from '@/blocks/tour/types';
import type { TwoFactorLabels } from '@/blocks/two-factor/types';
import type { AlertLabels } from '@/components/ui/alert';
import type { AppearanceToggleLabels } from '@/components/ui/appearance-toggle';
import type { BreadcrumbLabels } from '@/components/ui/breadcrumb';
import type { CarouselLabels } from '@/components/ui/carousel';
import type { CodeBlockLabels } from '@/components/ui/code-block';
import type { ComboboxLabels } from '@/components/ui/combobox';
import type { ConfirmDialogLabels } from '@/components/ui/confirm-dialog';
import type { CopyButtonLabels } from '@/components/ui/copy-button';
import type {
    DataTableFacetedFilterLabels,
    DataTableLabels,
} from '@/components/ui/data-table-labels';
import type { DatePickerLabels } from '@/components/ui/date-picker';
import type { DateRangeFilterLabels } from '@/components/ui/date-range-filter';
import type { DialogLabels } from '@/components/ui/dialog';
import type { DropzoneLabels } from '@/components/ui/dropzone';
import type { EditorLabels } from '@/components/ui/editor/labels';
import type { EmptyStateLabels } from '@/components/ui/empty-state';
import type { FieldLabels } from '@/components/ui/field';
import type { FloatingSheetLabels } from '@/components/ui/floating-sheet-context';
import type { JsonViewerLabels } from '@/components/ui/json-viewer';
import type { PaginationLabels } from '@/components/ui/pagination';
import type { PasswordInputLabels } from '@/components/ui/password-input';
import type { SaveStatusLabels } from '@/components/ui/save-status';
import type { SheetLabels } from '@/components/ui/sheet';
import type { SidebarLabels } from '@/components/ui/sidebar';
import type { SpinnerLabels } from '@/components/ui/spinner';
import type {
    DateTimePickerLabels,
    TimePickerLabels,
} from '@/components/ui/time-picker-labels';
import type { SettingsLayoutLabels } from '@/shells/settings-layout';
import type { UserMenuLabels } from '@/shells/user-menu-content';
import type { Locale } from 'date-fns';
import { createContext, useContext, type ReactNode } from 'react';

export interface UiLabelSections {
    alert: AlertLabels;
    appearanceToggle: AppearanceToggleLabels;
    breadcrumb: BreadcrumbLabels;
    carousel: CarouselLabels;
    codeBlock: CodeBlockLabels;
    combobox: ComboboxLabels;
    commandPalette: CommandPaletteLabels;
    confirmDialog: ConfirmDialogLabels;
    copyButton: CopyButtonLabels;
    dangerZone: DangerZoneLabels;
    dataTable: DataTableLabels;
    dataTableFacetedFilter: DataTableFacetedFilterLabels;
    dateFilter: DateFilterLabels;
    datePicker: DatePickerLabels;
    dateTimePicker: DateTimePickerLabels;
    dateRangeFilter: DateRangeFilterLabels;
    dialog: DialogLabels;
    dropzone: DropzoneLabels;
    editor: EditorLabels;
    emptyState: EmptyStateLabels;
    field: FieldLabels;
    floatingSheet: FloatingSheetLabels;
    formOverlay: FormOverlayLabels;
    jsonViewer: JsonViewerLabels;
    loginForm: LoginFormLabels;
    notificationBell: NotificationBellLabels;
    pagination: PaginationLabels;
    passkeys: PasskeyLabels;
    passwordInput: PasswordInputLabels;
    saveStatus: SaveStatusLabels;
    settings: SettingsLabels;
    settingsLayout: SettingsLayoutLabels;
    sheet: SheetLabels;
    sidebar: SidebarLabels;
    spinner: SpinnerLabels;
    timePicker: TimePickerLabels;
    tour: TourLabels;
    twoFactor: TwoFactorLabels;
    userMenu: UserMenuLabels;
}

export type UiLabels = {
    [Section in keyof UiLabelSections]?: Partial<UiLabelSections[Section]>;
} & {
    dateFilterPresets?: DateFilterOption[];
    dateFilterOperators?: DateFilterOption[];
    dateFilterUnits?: DateFilterOption[];
};

export type FullUiLabels = {
    [Section in keyof UiLabelSections]: UiLabelSections[Section];
} & {
    dateFilterPresets: DateFilterOption[];
    dateFilterOperators: DateFilterOption[];
    dateFilterUnits: DateFilterOption[];
};

const EMPTY: UiLabels = {};

const UiLocaleContext = createContext<UiLabels>(EMPTY);

const UiDateLocaleContext = createContext<Locale | undefined>(undefined);

export function UiLocaleProvider({
    labels,
    dateLocale,
    children,
}: {
    labels: UiLabels;
    dateLocale?: Locale;
    children: ReactNode;
}) {
    return (
        <UiLocaleContext.Provider value={labels}>
            <UiDateLocaleContext.Provider value={dateLocale}>
                {children}
            </UiDateLocaleContext.Provider>
        </UiLocaleContext.Provider>
    );
}

export function useUiLocale(): UiLabels {
    return useContext(UiLocaleContext);
}

export function useUiDateLocale(): Locale | undefined {
    return useContext(UiDateLocaleContext);
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
