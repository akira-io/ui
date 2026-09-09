import * as React from 'react';
import { ReactNode, ComponentProps } from 'react';
import { LucideIcon } from 'lucide-react';
import { a as LoginFormLabels, e as TourLabels } from './types-DEJsTx8E.js';
import { S as SlotNameProps, U as UrlLike, L as LinkComponent, I as IconComponent } from './types-CMZRvMV5.js';
import * as class_variance_authority_types from 'class-variance-authority/types';
import { VariantProps } from 'class-variance-authority';
import { a as CodeBlockLabels, c as JsonViewerLabels } from './json-viewer-Bssv9mTD.js';
import { c as buttonVariants, b as ButtonTone, a as ButtonProps, I as Input } from './input-R3dvXqSY.js';
import { Column, ColumnDef, Row } from '@tanstack/react-table';
import { Accept, FileRejection } from 'react-dropzone';

interface CommandPaletteItem {
    id: string;
    label: string;
    icon?: LucideIcon;
    value?: string;
    hint?: string;
}
interface CommandPaletteGroup {
    heading: string;
    items: CommandPaletteItem[];
}
interface CommandPaletteLabels {
    placeholder: string;
    noResultsLabel: string;
}
interface CommandPaletteProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    groups: CommandPaletteGroup[];
    onSelect: (item: CommandPaletteItem) => void;
    query?: string;
    onQueryChange?: (query: string) => void;
    placeholder?: CommandPaletteLabels['placeholder'];
    noResultsLabel?: CommandPaletteLabels['noResultsLabel'];
    emptyState?: ReactNode;
    className?: string;
}
declare function CommandPalette({ open, onOpenChange, groups, onSelect, query, onQueryChange, placeholder, noResultsLabel, emptyState, className, }: CommandPaletteProps): React.JSX.Element;
declare function useCommandPalette(initialOpen?: boolean): {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    toggle: () => void;
};

type DateFilterMode = 'all' | 'preset' | 'fixed' | 'relative';
type DateFilterOperator = 'between' | 'before' | 'on' | 'after';
type DateFilterUnit = 'day' | 'week' | 'month' | 'quarter' | 'year';
interface DateFilterValue {
    mode: DateFilterMode;
    preset?: string;
    operator?: DateFilterOperator;
    start?: string;
    end?: string;
    unit?: DateFilterUnit;
    amount?: number;
    include_current?: boolean;
    offset_amount?: number;
    offset_unit?: DateFilterUnit;
}
interface DateFilterOption {
    value: string;
    label: string;
}
interface DateFilterLabels {
    all: string;
    fixed: string;
    relative: string;
    relativeTitle: string;
    apply: string;
    back: string;
    latest: string;
    ago: string;
    includeCurrent: string;
    startingAgo: string;
    removeOffset: string;
    fallback: string;
}
declare const DEFAULT_PRESETS: DateFilterOption[];
declare const DEFAULT_OPERATORS: DateFilterOption[];
declare const DEFAULT_UNITS: DateFilterOption[];
declare const DEFAULT_LABELS: DateFilterLabels;

interface CopyButtonLabels {
    copyLabel: string;
    copiedLabel: string;
}
declare const copyButtonLabels: CopyButtonLabels;
interface CopyButtonProps extends Omit<React.ComponentProps<'button'>, 'value' | 'onCopy' | 'onError'>, Omit<VariantProps<typeof buttonVariants>, 'toned'> {
    value: string;
    tone?: ButtonTone;
    copyLabel?: CopyButtonLabels['copyLabel'];
    copiedLabel?: CopyButtonLabels['copiedLabel'];
    acknowledgementDuration?: number;
    onCopied?: (value: string) => void;
    onCopyFailed?: (reason: unknown) => void;
}
declare function CopyButton({ value, copyLabel, copiedLabel, acknowledgementDuration, onCopied, onCopyFailed, onClick, variant, size, tone, className, slotName, ...props }: CopyButtonProps & SlotNameProps): React.JSX.Element;

declare const elevatedSurface = "ring-1 ring-surface-ring backdrop-blur-2xl backdrop-saturate-150 rounded-3xl border-0 shadow-(--glass-elevation)";
declare const recessedSurface = "rounded-2xl border-0 bg-surface-recessed/30 text-foreground shadow-none ring-0 backdrop-blur-none";
declare const nestedRadius = "rounded-2xl";
declare const nestedSurfaceReset = "nested-surface:border-0 nested-surface:ring-0 nested-surface:bg-transparent nested-surface:shadow-none nested-surface:backdrop-blur-none";
declare const nestedEdgeToEdge = "nested-surface:rounded-none";
declare const controlFill = "bg-surface-control";
declare const focusRing = "focus-visible:outline-solid focus-visible:outline-1 focus-visible:outline-offset-0 focus-visible:outline-ring";
declare const menuHighlight = "outline-hidden focus:bg-accent focus:text-accent-foreground";
interface SurfaceProps {
    inset?: boolean;
}
interface FlatSurfaceProps extends SurfaceProps {
    flat?: boolean;
}
declare function surface(inset?: boolean | null): string;

interface SettingsPageProps {
    title?: string;
    description?: string;
    control?: ReactNode;
    linkComponent?: LinkComponent;
    children: ReactNode;
    className?: string;
}
declare function SettingsPage({ title, description, control, linkComponent, children, className, slotName, }: SettingsPageProps & SlotNameProps): React.JSX.Element;
interface SettingsLabels {
    back: string;
}
declare const settingsLabels: SettingsLabels;
interface SettingsSectionProps {
    title?: string;
    description?: string;
    control?: ReactNode;
    backHref?: UrlLike | null;
    backLabel?: string;
    wide?: boolean;
    linkComponent?: LinkComponent;
    children: ReactNode;
    className?: string;
}
declare function SettingsSection({ title, description, control, backHref, backLabel, wide, linkComponent, children, className, slotName, }: SettingsSectionProps & SlotNameProps): React.JSX.Element;
interface SettingsGroupProps {
    label?: string;
    columns?: 1 | 2;
    children: ReactNode;
    className?: string;
}
declare function SettingsGroup({ label, columns, children, className, slotName, }: SettingsGroupProps & SlotNameProps): React.JSX.Element;
interface SettingsEntryProps {
    icon: LucideIcon;
    iconClassName?: string;
    title: string;
    description?: string;
    href: UrlLike;
    badge?: ReactNode;
    disabled?: boolean;
    linkComponent?: LinkComponent;
    className?: string;
}
declare function SettingsEntry({ icon: Icon, iconClassName, title, description, href, badge, disabled, linkComponent, className, slotName, }: SettingsEntryProps & SlotNameProps): React.JSX.Element;

declare const alertVariants: (props?: ({
    variant?: "default" | "destructive" | "warning" | "info" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface AlertLabels {
    warningLabel: string;
    infoLabel: string;
}
declare const alertDefaultLabels: AlertLabels;
declare function Alert({ className, variant, labels, slotName, ...props }: React.ComponentProps<'div'> & VariantProps<typeof alertVariants> & SlotNameProps & {
    labels?: Partial<AlertLabels>;
}): React.JSX.Element;
declare function AlertTitle({ className, slotName, ...props }: React.ComponentProps<'div'> & SlotNameProps): React.JSX.Element;
declare function AlertDescription({ className, slotName, ...props }: React.ComponentProps<'div'> & SlotNameProps): React.JSX.Element;

interface AppearanceToggleLabels {
    groupLabel: string;
    lightLabel: string;
    darkLabel: string;
    systemLabel: string;
}
declare const appearanceToggleDefaultLabels: AppearanceToggleLabels;
interface AppearanceToggleProps extends React.ComponentProps<'div'> {
    variant?: 'segmented' | 'menu';
    labels?: Partial<AppearanceToggleLabels>;
}
declare function AppearanceToggle({ className, variant, labels: labelOverrides, slotName, ...props }: AppearanceToggleProps & SlotNameProps): React.JSX.Element;

interface ComboboxOption {
    value: string;
    label: string;
}
interface ComboboxLabels {
    placeholder: string;
    searchPlaceholder: string;
    emptyText: string;
}
declare const comboboxDefaultLabels: ComboboxLabels;
interface ComboboxProps extends Omit<ButtonProps, 'value' | 'onChange' | 'children' | 'slotName'> {
    value: string;
    options: ComboboxOption[];
    onChange: (value: string) => void;
    placeholder?: ComboboxLabels['placeholder'];
    searchPlaceholder?: ComboboxLabels['searchPlaceholder'];
    emptyText?: ComboboxLabels['emptyText'];
    invalid?: boolean;
    required?: boolean;
}
declare function Combobox({ value, options, onChange, placeholder, searchPlaceholder, emptyText, disabled, invalid, required, className, 'aria-invalid': ariaInvalid, slotName, ...trigger }: ComboboxProps & SlotNameProps): React.JSX.Element;

interface ConfirmDialogLabels {
    title: string;
    description: string;
    confirmText: string;
    cancelText: string;
}
declare const confirmDialogDefaultLabels: ConfirmDialogLabels;
interface ConfirmDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title?: ConfirmDialogLabels['title'];
    description?: ConfirmDialogLabels['description'] | ReactNode;
    confirmText?: ConfirmDialogLabels['confirmText'];
    cancelText?: ConfirmDialogLabels['cancelText'];
    variant?: 'destructive' | 'default';
    processing?: boolean;
    requiredValue?: string;
    requiredValueLabel?: string;
    onConfirm: () => void;
    onCancel?: () => void;
}
declare function ConfirmDialog({ open, onOpenChange, title, description, confirmText, cancelText, variant, processing, requiredValue, requiredValueLabel, onConfirm, onCancel, slotName, }: ConfirmDialogProps & SlotNameProps): React.JSX.Element;

interface DataTableFilter {
    columnId: string;
    label: string;
    options: {
        label: string;
        value: string;
    }[];
}
interface DataTableServerFilter {
    paramKey: string;
    label: string;
    options: {
        label: string;
        value: string;
    }[];
}
interface DataTableFacetedFilterLabels {
    noOptionsLabel: string;
}
declare const dataTableFacetedFilterDefaultLabels: DataTableFacetedFilterLabels;
declare function FacetedFilter<TData>({ column, filter, noOptionsLabel, }: {
    column?: Column<TData, unknown>;
    filter: DataTableFilter;
    noOptionsLabel?: DataTableFacetedFilterLabels['noOptionsLabel'];
}): React.JSX.Element;
declare function ServerFacetedFilter({ filter, selected, onChange, noOptionsLabel, }: {
    filter: DataTableServerFilter;
    selected: string[];
    onChange: (values: string[]) => void;
    noOptionsLabel?: DataTableFacetedFilterLabels['noOptionsLabel'];
}): React.JSX.Element;

interface DataTableRowAction<TData> {
    label: string;
    icon?: IconComponent;
    variant?: 'default' | 'destructive';
    hidden?: (row: TData) => boolean;
    onClick: (row: TData) => void;
}
declare function RowActionsMenu<TData>({ row, actions, slotName, }: {
    row: TData;
    actions: DataTableRowAction<TData>[];
} & SlotNameProps): React.JSX.Element | null;

interface DataTableLabels {
    searchPlaceholder: string;
    emptyLabel: string;
    createLabel: string;
    clearFiltersLabel: string;
    paginationLabel: (page: number, pages: number) => string;
    noOptionsLabel: string;
    totalLabel: (total: number) => string;
}
declare const dataTableDefaultLabels: DataTableLabels;
interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    searchPlaceholder?: DataTableLabels['searchPlaceholder'];
    emptyLabel?: DataTableLabels['emptyLabel'];
    createLabel?: DataTableLabels['createLabel'];
    clearFiltersLabel?: DataTableLabels['clearFiltersLabel'];
    paginationLabel?: DataTableLabels['paginationLabel'];
    noOptionsLabel?: DataTableLabels['noOptionsLabel'];
    totalLabel?: DataTableLabels['totalLabel'];
    searchKey?: string;
    pageSize?: number;
    pageSizeOptions?: number[];
    onPageSizeChange?: (size: number) => void;
    filters?: DataTableFilter[];
    serverFilters?: DataTableServerFilter[];
    filterValues?: Record<string, string[]>;
    onFilterChange?: (paramKey: string, values: string[]) => void;
    canClearFilters?: boolean;
    onClearFilters?: () => void;
    toolbarExtra?: ReactNode;
    toolbarAction?: ReactNode;
    renderRow?: (row: Row<TData>) => ReactNode;
    onRowClick?: (row: TData) => void;
    isRowActive?: (row: TData) => boolean;
    rowActions?: DataTableRowAction<TData>[];
    flat?: boolean;
    searchValue?: string;
    onSearchChange?: (value: string) => void;
    manualPagination?: boolean;
    pageCount?: number;
    pageIndex?: number;
    total?: number;
    onPageChange?: (pageIndex: number) => void;
    onCreate?: () => void;
}
declare function DataTable<TData, TValue>({ columns, data, searchKey, searchPlaceholder, pageSize, pageSizeOptions, onPageSizeChange, filters, serverFilters, filterValues, onFilterChange, canClearFilters, onClearFilters, toolbarExtra, toolbarAction, emptyLabel, clearFiltersLabel, paginationLabel, noOptionsLabel, totalLabel, renderRow, onRowClick, isRowActive, rowActions, searchValue, onSearchChange, manualPagination, pageCount, pageIndex, total, onPageChange, onCreate, createLabel, flat, slotName, }: DataTableProps<TData, TValue> & SlotNameProps): React.JSX.Element;

interface DatePickerLabels {
    placeholder: string;
    dateFormat: string;
    clearLabel: string;
}
declare const datePickerDefaultLabels: DatePickerLabels;
type DatePickerTriggerProps = Omit<ComponentProps<'button'>, 'value' | 'defaultValue' | 'onChange' | 'type' | 'children'>;
interface DatePickerProps extends Partial<DatePickerLabels>, DatePickerTriggerProps {
    value?: Date;
    defaultValue?: Date;
    onChange?: (value: Date | undefined) => void;
    minDate?: Date;
    maxDate?: Date;
    disabledDays?: (date: Date) => boolean;
    clearable?: boolean;
    invalid?: boolean;
    required?: boolean;
    formatDate?: (value: Date) => string;
}
declare function DatePicker(props: DatePickerProps & SlotNameProps): React.JSX.Element;

interface DateRangeFilterLabels {
    emptyLabel: string;
    dateFormat: string;
}
declare const dateRangeFilterDefaultLabels: DateRangeFilterLabels;
interface DateRangeFilterProps extends Partial<DateRangeFilterLabels>, Omit<ButtonProps, 'onChange' | 'children' | 'value' | 'slotName'> {
    from?: string;
    to?: string;
    onChange: (range: {
        from?: string;
        to?: string;
    }) => void;
}
declare function DateRangeFilter({ from, to, onChange, emptyLabel, dateFormat, className, slotName, ...trigger }: DateRangeFilterProps & SlotNameProps): React.JSX.Element;

interface DropzoneLabels {
    idleLabel: string;
    activeLabel: string;
    triggerLabel: string;
    removeLabel: string;
    sizeLabel: (bytes: number) => string;
    invalidTypeLabel: string;
    tooLargeLabel: (maxSize: number) => string;
    tooManyFilesLabel: (maxFiles: number) => string;
    rejectedLabel: string;
    progressLabel: (percent: number) => string;
}
declare const dropzoneDefaultLabels: DropzoneLabels;
interface DropzoneProps extends Omit<React.ComponentProps<'div'>, 'onDrop' | 'children'>, FlatSurfaceProps {
    accept?: Accept;
    maxSize?: number;
    maxFiles?: number;
    multiple?: boolean;
    disabled?: boolean;
    files?: File[];
    onFilesChange?: (files: File[]) => void;
    onRejected?: (rejections: FileRejection[]) => void;
    error?: string;
    progress?: number;
    idleLabel?: DropzoneLabels['idleLabel'];
    activeLabel?: DropzoneLabels['activeLabel'];
    triggerLabel?: DropzoneLabels['triggerLabel'];
    removeLabel?: DropzoneLabels['removeLabel'];
    sizeLabel?: DropzoneLabels['sizeLabel'];
    invalidTypeLabel?: DropzoneLabels['invalidTypeLabel'];
    tooLargeLabel?: DropzoneLabels['tooLargeLabel'];
    tooManyFilesLabel?: DropzoneLabels['tooManyFilesLabel'];
    rejectedLabel?: DropzoneLabels['rejectedLabel'];
    progressLabel?: DropzoneLabels['progressLabel'];
}
declare function Dropzone({ accept, maxSize, maxFiles, multiple, disabled, files, onFilesChange, onRejected, error, progress, flat, inset, className, idleLabel, activeLabel, triggerLabel, removeLabel, sizeLabel, invalidTypeLabel, tooLargeLabel, tooManyFilesLabel, rejectedLabel, progressLabel, slotName, ...props }: DropzoneProps & SlotNameProps): React.JSX.Element;

interface FloatingSheetLabels {
    backLabel: string;
    closeLabel: string;
}
declare const floatingSheetDefaultLabels: FloatingSheetLabels;

interface PasswordInputLabels {
    showLabel: string;
    hideLabel: string;
}
declare const passwordInputDefaultLabels: PasswordInputLabels;
interface PasswordInputProps extends Omit<React.ComponentProps<typeof Input>, 'type'> {
    revealable?: boolean;
    showLabel?: PasswordInputLabels['showLabel'];
    hideLabel?: PasswordInputLabels['hideLabel'];
}
declare function PasswordInput({ className, revealable, showLabel, hideLabel, slotName, ...props }: PasswordInputProps & SlotNameProps): React.JSX.Element;

type SaveStatusState = 'idle' | 'saving' | 'saved' | 'error';
interface SaveStatusLabels {
    error: string;
    idle: string;
    saved: string;
    saving: string;
}
declare const saveStatusLabels: SaveStatusLabels;
declare const SAVED_DURATION = 2000;
interface SaveStatusProps extends React.ComponentProps<'div'> {
    status: SaveStatusState;
    message?: string;
    showIdle?: boolean;
    savedDuration?: number;
    labels?: Partial<SaveStatusLabels>;
}
declare function SaveStatus({ status, message, showIdle, savedDuration, labels, className, slotName, ...props }: SaveStatusProps & SlotNameProps): React.JSX.Element;

interface UiLabelSections {
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
    dropzone: DropzoneLabels;
    floatingSheet: FloatingSheetLabels;
    jsonViewer: JsonViewerLabels;
    loginForm: LoginFormLabels;
    passwordInput: PasswordInputLabels;
    saveStatus: SaveStatusLabels;
    settings: SettingsLabels;
    tour: TourLabels;
}
type UiLabels = {
    [Section in keyof UiLabelSections]?: Partial<UiLabelSections[Section]>;
} & {
    dateFilterPresets?: DateFilterOption[];
    dateFilterOperators?: DateFilterOption[];
    dateFilterUnits?: DateFilterOption[];
};
type FullUiLabels = {
    [Section in keyof UiLabelSections]: UiLabelSections[Section];
} & {
    dateFilterPresets: DateFilterOption[];
    dateFilterOperators: DateFilterOption[];
    dateFilterUnits: DateFilterOption[];
};
declare function UiLocaleProvider({ labels, children, }: {
    labels: UiLabels;
    children: ReactNode;
}): React.JSX.Element;
declare function useUiLocale(): UiLabels;
declare function useUiLabels<Section extends keyof UiLabelSections>(section: Section, defaults: UiLabelSections[Section], overrides?: Partial<UiLabelSections[Section]>): UiLabelSections[Section];

export { type DataTableRowAction as $, useUiLabels as A, useUiLocale as B, type CopyButtonLabels as C, type DateFilterValue as D, type FloatingSheetLabels as E, type FlatSurfaceProps as F, Alert as G, AlertDescription as H, type AlertLabels as I, AlertTitle as J, AppearanceToggle as K, type AppearanceToggleLabels as L, type AppearanceToggleProps as M, Combobox as N, type ComboboxLabels as O, type ComboboxOption as P, type ComboboxProps as Q, ConfirmDialog as R, type SurfaceProps as S, type ConfirmDialogLabels as T, type UiLabelSections as U, CopyButton as V, type CopyButtonProps as W, DataTable as X, type DataTableFacetedFilterLabels as Y, type DataTableFilter as Z, type DataTableLabels as _, type DateFilterLabels as a, type DataTableServerFilter as a0, DatePicker as a1, type DatePickerLabels as a2, type DatePickerProps as a3, DateRangeFilter as a4, type DateRangeFilterLabels as a5, type DateRangeFilterProps as a6, Dropzone as a7, type DropzoneLabels as a8, FacetedFilter as a9, nestedSurfaceReset as aA, passwordInputDefaultLabels as aB, recessedSurface as aC, saveStatusLabels as aD, surface as aE, type CommandPaletteLabels as aF, type FullUiLabels as aG, PasswordInput as aa, type PasswordInputLabels as ab, RowActionsMenu as ac, SAVED_DURATION as ad, SaveStatus as ae, type SaveStatusLabels as af, type SaveStatusProps as ag, type SaveStatusState as ah, ServerFacetedFilter as ai, alertDefaultLabels as aj, appearanceToggleDefaultLabels as ak, comboboxDefaultLabels as al, confirmDialogDefaultLabels as am, controlFill as an, copyButtonLabels as ao, dataTableDefaultLabels as ap, dataTableFacetedFilterDefaultLabels as aq, datePickerDefaultLabels as ar, dateRangeFilterDefaultLabels as as, dropzoneDefaultLabels as at, elevatedSurface as au, floatingSheetDefaultLabels as av, focusRing as aw, menuHighlight as ax, nestedEdgeToEdge as ay, nestedRadius as az, type DateFilterOption as b, type DateFilterUnit as c, CommandPalette as d, type CommandPaletteGroup as e, type CommandPaletteItem as f, type CommandPaletteProps as g, DEFAULT_LABELS as h, DEFAULT_OPERATORS as i, DEFAULT_PRESETS as j, DEFAULT_UNITS as k, type DateFilterMode as l, type DateFilterOperator as m, SettingsEntry as n, type SettingsEntryProps as o, SettingsGroup as p, type SettingsGroupProps as q, type SettingsLabels as r, SettingsPage as s, type SettingsPageProps as t, SettingsSection as u, type SettingsSectionProps as v, type UiLabels as w, UiLocaleProvider as x, settingsLabels as y, useCommandPalette as z };
