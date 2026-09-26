import * as React from 'react';
import { ReactNode, ComponentProps } from 'react';
import { LucideIcon } from 'lucide-react';
import { a as LoginFormLabels, e as TourLabels } from './types-DM84rPRO.js';
import { b as PasskeyLabels } from './types-ClE3iWNv.js';
import { S as SlotNameProps, U as UrlLike, L as LinkComponent } from './types-r3VHXAG2.js';
import * as class_variance_authority_types from 'class-variance-authority/types';
import { VariantProps } from 'class-variance-authority';
import { a as CodeBlockLabels, c as JsonViewerLabels } from './json-viewer-ggvFCn43.js';
import { c as buttonVariants, b as ButtonTone, a as ButtonProps, I as Input } from './input-DSoCkkZx.js';
import { a as DataTableLabels, D as DataTableFacetedFilterLabels } from './data-table-labels-xwJ69rBt.js';
import { Accept, FileRejection } from 'react-dropzone';
import { Slot } from '@radix-ui/react-slot';
import * as LabelPrimitive from '@radix-ui/react-label';
import { Locale } from 'date-fns';

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

type TwoFactorSetupStep = 'pending' | 'scan' | 'confirm' | 'recovery';
type TwoFactorCodeMode = 'code' | 'recovery';
interface TwoFactorLabels {
    setupTitle: string;
    setupDescription: string;
    pendingLabel: string;
    scanTitle: string;
    scanDescription: string;
    qrFallbackLabel: string;
    manualKeyLabel: string;
    manualKeyDescription: string;
    manualKeyRevealLabel: string;
    manualKeyHideLabel: string;
    continueLabel: string;
    confirmTitle: string;
    confirmDescription: string;
    codeLabel: string;
    recoveryCodeLabel: string;
    recoveryCodePlaceholder: string;
    useRecoveryCodeLabel: string;
    useCodeLabel: string;
    verifyLabel: string;
    verifyingLabel: string;
    errorFallbackLabel: string;
    cancelLabel: string;
    challengeTitle: string;
    challengeDescription: string;
    recoveryTitle: string;
    recoveryDescription: string;
    recoveryWarning: string;
    revealLabel: string;
    hideLabel: string;
    copyLabel: string;
    copiedLabel: string;
    copyFailedLabel: string;
    regenerateLabel: string;
    doneLabel: string;
    disableLabel: string;
    disableTitle: string;
    disableDescription: string;
    disableConfirmLabel: string;
    disableCancelLabel: string;
}
declare const twoFactorLabels: TwoFactorLabels;
interface TwoFactorLabelProps {
    labels?: Partial<TwoFactorLabels>;
}
interface TwoFactorQrProps {
    qrCode?: ReactNode;
    qrCodeSvg?: string;
}

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

type FieldOrientation = 'vertical' | 'horizontal';
interface FieldContextValue {
    controlId: string;
    descriptionId: string;
    errorId: string;
    orientation: FieldOrientation;
    invalid: boolean;
    required: boolean;
    hasDescription: boolean;
    setHasDescription: (present: boolean) => void;
}
declare function useField(): FieldContextValue;

declare function Label({ className, slotName, ...props }: React.ComponentProps<typeof LabelPrimitive.Root> & SlotNameProps): React.JSX.Element;

interface FieldLabels {
    requiredLabel: string;
}
declare const fieldLabels: FieldLabels;
interface FieldProps extends React.ComponentProps<'div'> {
    orientation?: FieldOrientation;
    error?: string;
    invalid?: boolean;
    required?: boolean;
}
declare function Field({ className, children, id, orientation, error, invalid, required, slotName, ...props }: FieldProps & SlotNameProps): React.JSX.Element;
declare function FieldGroup({ className, slotName, ...props }: React.ComponentProps<'div'> & SlotNameProps): React.JSX.Element;
interface FieldLabelProps extends React.ComponentProps<typeof Label> {
    requiredLabel?: FieldLabels['requiredLabel'];
}
declare function FieldLabel({ className, children, requiredLabel, slotName, ...props }: FieldLabelProps & SlotNameProps): React.JSX.Element;
declare function FieldDescription({ className, slotName, ...props }: React.ComponentProps<'p'> & SlotNameProps): React.JSX.Element;
declare function FieldControl({ className, ...props }: React.ComponentProps<typeof Slot>): React.JSX.Element;

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
    field: FieldLabels;
    floatingSheet: FloatingSheetLabels;
    jsonViewer: JsonViewerLabels;
    loginForm: LoginFormLabels;
    passkeys: PasskeyLabels;
    passwordInput: PasswordInputLabels;
    saveStatus: SaveStatusLabels;
    settings: SettingsLabels;
    tour: TourLabels;
    twoFactor: TwoFactorLabels;
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
declare function UiLocaleProvider({ labels, dateLocale, children, }: {
    labels: UiLabels;
    dateLocale?: Locale;
    children: ReactNode;
}): React.JSX.Element;
declare function useUiLocale(): UiLabels;
declare function useUiDateLocale(): Locale | undefined;
declare function useUiLabels<Section extends keyof UiLabelSections>(section: Section, defaults: UiLabelSections[Section], overrides?: Partial<UiLabelSections[Section]>): UiLabelSections[Section];

export { type ConfirmDialogLabels as $, type UiLabels as A, UiLocaleProvider as B, type CopyButtonLabels as C, type DateFilterValue as D, settingsLabels as E, twoFactorLabels as F, useCommandPalette as G, useUiDateLocale as H, useUiLabels as I, useUiLocale as J, type FlatSurfaceProps as K, type FloatingSheetLabels as L, Alert as M, AlertDescription as N, type AlertLabels as O, AlertTitle as P, AppearanceToggle as Q, type AppearanceToggleLabels as R, type SurfaceProps as S, type TwoFactorLabelProps as T, type UiLabelSections as U, type AppearanceToggleProps as V, Combobox as W, type ComboboxLabels as X, type ComboboxOption as Y, type ComboboxProps as Z, ConfirmDialog as _, type DateFilterLabels as a, CopyButton as a0, type CopyButtonProps as a1, DatePicker as a2, type DatePickerLabels as a3, type DatePickerProps as a4, DateRangeFilter as a5, type DateRangeFilterLabels as a6, type DateRangeFilterProps as a7, Dropzone as a8, type DropzoneLabels as a9, fieldLabels as aA, floatingSheetDefaultLabels as aB, focusRing as aC, menuHighlight as aD, nestedEdgeToEdge as aE, nestedRadius as aF, nestedSurfaceReset as aG, passwordInputDefaultLabels as aH, recessedSurface as aI, saveStatusLabels as aJ, surface as aK, useField as aL, type CommandPaletteLabels as aM, type FullUiLabels as aN, Field as aa, type FieldContextValue as ab, FieldControl as ac, FieldDescription as ad, FieldGroup as ae, FieldLabel as af, type FieldLabels as ag, type FieldOrientation as ah, Label as ai, PasswordInput as aj, type PasswordInputLabels as ak, SAVED_DURATION as al, SaveStatus as am, type SaveStatusLabels as an, type SaveStatusProps as ao, type SaveStatusState as ap, alertDefaultLabels as aq, appearanceToggleDefaultLabels as ar, comboboxDefaultLabels as as, confirmDialogDefaultLabels as at, controlFill as au, copyButtonLabels as av, datePickerDefaultLabels as aw, dateRangeFilterDefaultLabels as ax, dropzoneDefaultLabels as ay, elevatedSurface as az, type DateFilterOption as b, type DateFilterUnit as c, type TwoFactorCodeMode as d, type TwoFactorQrProps as e, CommandPalette as f, type CommandPaletteGroup as g, type CommandPaletteItem as h, type CommandPaletteProps as i, DEFAULT_LABELS as j, DEFAULT_OPERATORS as k, DEFAULT_PRESETS as l, DEFAULT_UNITS as m, type DateFilterMode as n, type DateFilterOperator as o, SettingsEntry as p, type SettingsEntryProps as q, SettingsGroup as r, type SettingsGroupProps as s, type SettingsLabels as t, SettingsPage as u, type SettingsPageProps as v, SettingsSection as w, type SettingsSectionProps as x, type TwoFactorLabels as y, type TwoFactorSetupStep as z };
