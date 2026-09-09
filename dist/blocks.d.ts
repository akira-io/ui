import { D as DateFilterValue, a as DateFilterLabels, b as DateFilterOption, c as DateFilterUnit, C as CopyButtonLabels, S as SurfaceProps } from './context-CtZuzjaX.js';
export { d as CommandPalette, e as CommandPaletteGroup, f as CommandPaletteItem, g as CommandPaletteProps, h as DATE_FILTER_LABELS, i as DATE_FILTER_OPERATORS, j as DATE_FILTER_PRESETS, k as DATE_FILTER_UNITS, l as DateFilterMode, m as DateFilterOperator, n as SettingsEntry, o as SettingsEntryProps, p as SettingsGroup, q as SettingsGroupProps, r as SettingsLabels, s as SettingsPage, t as SettingsPageProps, u as SettingsSection, v as SettingsSectionProps, U as UiLabelSections, w as UiLabels, x as UiLocaleProvider, y as settingsLabels, z as useCommandPalette, A as useUiLabels, B as useUiLocale } from './context-CtZuzjaX.js';
import { F as FormOverlayIntent, a as FormOverlayLabels, T as TwoFactorLabelProps, b as TwoFactorCodeMode, c as TwoFactorQrProps } from './types-CfAUvz--.js';
export { D as DangerZone, d as DangerZoneAction, e as DangerZoneLabels, f as DangerZoneProps, g as FormOverlayActions, h as FormOverlayActionsProps, i as TwoFactorLabels, j as TwoFactorSetupStep, k as dangerZoneLabels, l as formOverlayDefaultLabels, t as twoFactorLabels } from './types-CfAUvz--.js';
import * as React from 'react';
import { ReactNode, PropsWithChildren, ReactElement, ComponentProps } from 'react';
import { S as SlotNameProps, L as LinkComponent, U as UrlLike } from './types-CMZRvMV5.js';
import { LucideIcon } from 'lucide-react';
import { L as LoginFormErrors, a as LoginFormLabels, T as TourStep, b as TourDefinition, c as TourBreakpoint, d as TourProgress, e as TourLabels } from './types-DEJsTx8E.js';
export { D as DEFAULT_TOUR_LABELS, f as TourOutcome, g as fieldError, l as loginFormLabels } from './types-DEJsTx8E.js';
import { B as Button } from './input-R3dvXqSY.js';
import 'class-variance-authority/types';
import 'class-variance-authority';
import './json-viewer-Bssv9mTD.js';
import '@tanstack/react-table';
import 'react-dropzone';

type DateFilterPanel = 'root' | 'fixed' | 'relative';
interface DateFilterContextValue {
    value: DateFilterValue;
    draft: DateFilterValue;
    labels: DateFilterLabels;
    presets: DateFilterOption[];
    operators: DateFilterOption[];
    units: DateFilterOption[];
    panel: DateFilterPanel;
    setDraft: (value: DateFilterValue) => void;
    openPanel: (panel: DateFilterPanel, seed: DateFilterValue) => void;
    backToRoot: () => void;
    commit: (value: DateFilterValue) => void;
}
declare function useDateFilter(): DateFilterContextValue;

interface DateFilterProps {
    value: DateFilterValue;
    onChange: (value: DateFilterValue) => void;
    presets?: DateFilterOption[];
    operators?: DateFilterOption[];
    units?: DateFilterOption[];
    labels?: Partial<DateFilterLabels>;
    children?: ReactNode;
}
declare function DateFilter({ value, onChange, presets, operators, units, labels, children, }: DateFilterProps): React.JSX.Element;
declare function DateFilterTrigger({ className, children, }: {
    className?: string;
    children?: ReactNode;
}): React.JSX.Element;
declare function DateFilterContent({ children, className, }: {
    children: ReactNode;
    className?: string;
}): React.JSX.Element;
declare function DateFilterItem({ active, onSelect, children, }: {
    active: boolean;
    onSelect: () => void;
    children: ReactNode;
}): React.JSX.Element;
declare function DateFilterSeparator(): React.JSX.Element;
declare function DateFilterAll({ children }: {
    children?: ReactNode;
}): React.JSX.Element;
declare function DateFilterPresets({ only }: {
    only?: string[];
}): React.JSX.Element;
declare function DateFilterFixed({ children }: {
    children?: ReactNode;
}): React.JSX.Element;
declare function DateFilterRelative({ children }: {
    children?: ReactNode;
}): React.JSX.Element;

declare function decodeDateFilter(encoded: string | null | undefined): DateFilterValue;

declare function encodeDateFilter(filter: DateFilterValue): string | null;

declare function resolveRelativeRange(unit: DateFilterUnit, amount: number, includeCurrent: boolean, now?: Date, offsetAmount?: number, offsetUnit?: DateFilterUnit): {
    start: Date;
    end: Date;
} | null;
declare function formatRangePreview(range: {
    start: Date;
    end: Date;
}): string;

declare function summariseDateFilter(value: DateFilterValue, presets: DateFilterOption[], operators: DateFilterOption[], units: DateFilterOption[], labels: DateFilterLabels): string;

interface DetailEditSheetProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title: React.ReactNode;
    description?: React.ReactNode;
    processing?: boolean;
    intent?: FormOverlayIntent;
    labels?: FormOverlayLabels;
    className?: string;
    children: React.ReactNode;
    onSave: () => void;
    onCancel?: () => void;
}
declare function DetailEditSheet({ open, onOpenChange, title, description, processing, intent, labels, className, children, onSave, onCancel, slotName, }: DetailEditSheetProps & SlotNameProps): React.JSX.Element;

interface FormDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title: React.ReactNode;
    description?: React.ReactNode;
    processing?: boolean;
    intent?: FormOverlayIntent;
    labels?: FormOverlayLabels;
    className?: string;
    children: React.ReactNode;
    onSave: () => void;
    onCancel?: () => void;
}
declare function FormDialog({ open, onOpenChange, title, description, processing, intent, labels, className, children, onSave, onCancel, slotName, }: FormDialogProps & SlotNameProps): React.JSX.Element;

interface InfoFieldProps {
    icon: LucideIcon;
    label: string;
    value: ReactNode;
    copyable?: boolean;
    copyValue?: string;
    copyLabel?: CopyButtonLabels['copyLabel'];
    copiedLabel?: CopyButtonLabels['copiedLabel'];
    iconClassName?: string;
    className?: string;
}
declare function InfoField({ icon: Icon, label, value, copyable, copyValue, copyLabel, copiedLabel, iconClassName, className, slotName, }: InfoFieldProps & SlotNameProps): React.JSX.Element;
interface InfoFieldGroupProps {
    children: ReactNode;
    className?: string;
}
declare function InfoFieldGroup({ children, className }: InfoFieldGroupProps): React.JSX.Element;

interface LocalizedField {
    name: string;
    label: string;
    type?: 'text' | 'textarea';
    rows?: number;
}
interface LocalizedFieldsProps {
    locales: string[];
    localeLabels?: Record<string, string>;
    fields: LocalizedField[];
    values: Record<string, Record<string, string>>;
    onChange: (field: string, locale: string, value: string) => void;
    errors?: Record<string, string>;
    defaultLocale?: string;
    className?: string;
}
declare function LocalizedFields({ locales, localeLabels, fields, values, onChange, errors, defaultLocale, className, }: LocalizedFieldsProps): React.JSX.Element;

interface LoginFormRootProps {
    errors?: LoginFormErrors;
    processing?: boolean;
    linkComponent?: LinkComponent;
    labels?: Partial<LoginFormLabels>;
    children: ReactNode;
    className?: string;
}
declare function LoginFormRoot({ errors, processing, linkComponent, labels, children, className, slotName, }: LoginFormRootProps & SlotNameProps): React.JSX.Element;
interface LoginFormStatusProps {
    message?: string;
}
declare function LoginFormStatus({ message, slotName, }: LoginFormStatusProps & SlotNameProps): React.JSX.Element | null;
interface LoginFormEmailProps {
    id?: string;
    name?: string;
    label?: string;
    placeholder?: string;
    error?: string;
    tabIndex?: number;
    autoFocus?: boolean;
    required?: boolean;
}
declare function LoginFormEmail({ id, name, label, placeholder, error, tabIndex, autoFocus, required, slotName, }: LoginFormEmailProps & SlotNameProps): React.JSX.Element;
interface LoginFormPasswordProps {
    id?: string;
    name?: string;
    label?: string;
    placeholder?: string;
    error?: string;
    tabIndex?: number;
    autoFocus?: boolean;
    required?: boolean;
    forgotPasswordHref?: UrlLike;
    forgotPasswordLabel?: string;
    linkComponent?: LinkComponent;
}
declare function LoginFormPassword({ id, name, label, placeholder, error, tabIndex, autoFocus, required, forgotPasswordHref, forgotPasswordLabel, linkComponent, slotName, }: LoginFormPasswordProps & SlotNameProps): React.JSX.Element;
interface LoginFormRememberProps {
    id?: string;
    name?: string;
    label?: string;
    tabIndex?: number;
}
declare function LoginFormRemember({ id, name, label, tabIndex, slotName, }: LoginFormRememberProps & SlotNameProps): React.JSX.Element;
interface LoginFormSubmitProps {
    label?: string;
    submittingLabel?: string;
    processing?: boolean;
    tabIndex?: number;
}
declare function LoginFormSubmit({ label, submittingLabel, processing, tabIndex, slotName, }: LoginFormSubmitProps & SlotNameProps): React.JSX.Element;

interface LoginFormContextValue {
    errors: LoginFormErrors;
    processing: boolean;
    linkComponent?: LinkComponent;
    labels?: Partial<LoginFormLabels>;
}
declare function useLoginFormContext(): LoginFormContextValue & {
    labels: LoginFormLabels;
};
declare function LoginFormProvider({ errors, processing, linkComponent, labels, children, }: {
    errors?: LoginFormErrors;
    processing?: boolean;
    linkComponent?: LinkComponent;
    labels?: Partial<LoginFormLabels>;
    children: ReactNode;
}): React.JSX.Element;

interface LoginFormPresetProps {
    errors?: LoginFormErrors;
    processing?: boolean;
    linkComponent?: LinkComponent;
    labels?: Partial<LoginFormLabels>;
    status?: string;
    forgotPasswordHref?: UrlLike;
    className?: string;
}
declare function LoginFormPreset({ errors, processing, linkComponent, labels, status, forgotPasswordHref, className, slotName, }: LoginFormPresetProps & SlotNameProps): React.JSX.Element;

declare const LoginForm: {
    Root: typeof LoginFormRoot;
    Status: typeof LoginFormStatus;
    Email: typeof LoginFormEmail;
    Password: typeof LoginFormPassword;
    Remember: typeof LoginFormRemember;
    Submit: typeof LoginFormSubmit;
};

interface SectionHeaderProps {
    icon?: ReactNode;
    title: string;
    description?: string;
    control?: ReactNode;
    className?: string;
}
declare function SectionHeader({ icon, title, description, control, className, }: SectionHeaderProps): React.JSX.Element;

interface SettingsCardProps extends SurfaceProps {
    icon: LucideIcon;
    iconClassName?: string;
    title: string;
    description: string;
    control?: ReactNode;
    children: ReactNode;
    className?: string;
}
declare function SettingsCard({ icon: Icon, iconClassName, title, description, control, children, inset, className, slotName, }: SettingsCardProps & SlotNameProps): React.JSX.Element;
interface SettingsPanelProps extends SurfaceProps {
    title?: string;
    description?: string;
    children: ReactNode;
    className?: string;
}
declare function SettingsPanel({ title, description, children, inset, className, slotName, }: SettingsPanelProps & SlotNameProps): React.JSX.Element;
interface ToggleRowProps {
    id: string;
    label: string;
    description?: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
    disabled?: boolean;
}
declare function ToggleRow({ id, label, description, checked, onChange, disabled, }: ToggleRowProps): React.JSX.Element;

interface SettingsFieldProps {
    id?: string;
    label: ReactNode;
    description?: string;
    error?: string;
    required?: boolean;
    className?: string;
    children: (fieldId: string) => ReactNode;
}
declare function SettingsField({ id, label, description, error, required, className, children, slotName, }: SettingsFieldProps & SlotNameProps): React.JSX.Element;
interface ControlProps<T> {
    id?: string;
    label: ReactNode;
    description?: string;
    error?: string;
    required?: boolean;
    disabled?: boolean;
    placeholder?: string;
    value: T;
    onChange: (value: T) => void;
    className?: string;
}
type TextFieldProps = ControlProps<string> & {
    type?: 'text' | 'email' | 'url' | 'tel' | 'password';
};
declare function TextField({ type, value, onChange, disabled, placeholder, slotName, ...field }: TextFieldProps & SlotNameProps): React.JSX.Element;
type NumberFieldProps = ControlProps<number | ''> & {
    min?: number;
    max?: number;
    step?: number;
};
declare function NumberField({ value, onChange, disabled, placeholder, min, max, step, slotName, ...field }: NumberFieldProps & SlotNameProps): React.JSX.Element;
type DateFieldProps = ControlProps<string> & {
    min?: string;
    max?: string;
};
declare function DateField({ value, onChange, disabled, min, max, slotName, ...field }: DateFieldProps & SlotNameProps): React.JSX.Element;
interface SelectFieldOption {
    value: string;
    label: string;
    disabled?: boolean;
}
type SelectFieldProps = ControlProps<string> & {
    options: SelectFieldOption[];
};
declare function SelectField({ value, onChange, options, disabled, placeholder, slotName, ...field }: SelectFieldProps & SlotNameProps): React.JSX.Element;

interface StatCardProps extends SurfaceProps {
    title: string;
    value: ReactNode;
    icon: LucideIcon;
    iconClassName?: string;
    trend?: number;
    comparisonLabel?: string;
    className?: string;
}
declare function StatCard({ title, value, icon: Icon, iconClassName, trend, comparisonLabel, inset, className, slotName, }: StatCardProps & SlotNameProps): React.JSX.Element;
interface StatsGridProps {
    children: ReactNode;
    className?: string;
}
declare function StatsGrid({ children, className }: StatsGridProps): React.JSX.Element;

declare function stepsForBreakpoint(steps: TourStep[], breakpoint: TourBreakpoint): TourStep[];
declare function resolveSteps(steps: TourStep[], isPresent: (target: string) => boolean): TourStep[];
declare function shouldStartTour(input: {
    definition: TourDefinition;
    seen: Record<string, number>;
    resolvedStepCount: number;
    force?: boolean;
}): boolean;

interface TourControllerValue {
    startTour: (definition: TourDefinition, options?: {
        force?: boolean;
    }) => void;
}
declare function TourProvider({ children, seen, onProgress, labels, }: PropsWithChildren<{
    seen: Record<string, number>;
    onProgress: (progress: TourProgress) => void;
    labels?: Partial<TourLabels>;
}>): ReactElement;
declare function useTourController(): TourControllerValue;
declare function useTour(definition: TourDefinition, options?: {
    enabled?: boolean;
}): {
    restart: () => void;
};

interface TwoFactorChallengeProps extends TwoFactorLabelProps {
    onSubmit: (code: string, mode: TwoFactorCodeMode) => void | Promise<void>;
    errors?: string | string[] | null;
    allowRecoveryCode?: boolean;
    title?: string;
    description?: string;
    footer?: ReactNode;
    className?: string;
}
declare function TwoFactorChallenge({ onSubmit, errors, allowRecoveryCode, title, description, footer, labels, className, slotName, }: TwoFactorChallengeProps & SlotNameProps): React.JSX.Element;

interface TwoFactorDisableButtonProps extends TwoFactorLabelProps {
    onDisable: () => void | Promise<void>;
    disabled?: boolean;
    variant?: ComponentProps<typeof Button>['variant'];
    size?: ComponentProps<typeof Button>['size'];
    className?: string;
}
declare function TwoFactorDisableButton({ onDisable, disabled, variant, size, labels, className, slotName, }: TwoFactorDisableButtonProps & SlotNameProps): React.JSX.Element;

interface TwoFactorRecoveryCodesProps extends TwoFactorLabelProps {
    codes: string[];
    defaultRevealed?: boolean;
    onRegenerate?: () => void | Promise<void>;
    showHeading?: boolean;
    className?: string;
}
declare function TwoFactorRecoveryCodes({ codes, defaultRevealed, onRegenerate, showHeading, labels, className, slotName, }: TwoFactorRecoveryCodesProps & SlotNameProps): React.JSX.Element;

interface TwoFactorScanStepProps extends TwoFactorLabelProps, TwoFactorQrProps {
    manualSetupKey?: string | null;
    className?: string;
}
declare function TwoFactorScanStep({ qrCode, qrCodeSvg, manualSetupKey, labels, className, slotName, }: TwoFactorScanStepProps & SlotNameProps): React.JSX.Element;

interface TwoFactorSetupDialogProps extends TwoFactorLabelProps, TwoFactorQrProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    enabled?: boolean;
    manualSetupKey?: string | null;
    recoveryCodes?: string[];
    errors?: string | string[] | null;
    onConfirm: (code: string) => void | Promise<void>;
    onRequestSetupData?: () => void | Promise<void>;
    onRegenerateRecoveryCodes?: () => void | Promise<void>;
    onCompleted?: () => void;
    className?: string;
}
declare function TwoFactorSetupDialog({ open, onOpenChange, enabled, qrCode, qrCodeSvg, manualSetupKey, recoveryCodes, errors, onConfirm, onRequestSetupData, onRegenerateRecoveryCodes, onCompleted, labels, className, slotName, }: TwoFactorSetupDialogProps & SlotNameProps): React.JSX.Element;

interface TwoFactorVerifyFormProps extends TwoFactorLabelProps {
    onSubmit: (code: string, mode: TwoFactorCodeMode) => void | Promise<void>;
    errors?: string | string[] | null;
    allowRecoveryCode?: boolean;
    length?: number;
    autoFocus?: boolean;
    submitLabel?: string;
    footer?: ReactNode;
    className?: string;
}
declare function TwoFactorVerifyForm({ onSubmit, errors, allowRecoveryCode, length, autoFocus, submitLabel, footer, labels, className, slotName, }: TwoFactorVerifyFormProps & SlotNameProps): React.JSX.Element;

export { DateField, type DateFieldProps, DateFilter, DateFilterAll, DateFilterContent, type DateFilterContextValue, DateFilterFixed, DateFilterItem, DateFilterLabels, DateFilterOption, type DateFilterPanel, DateFilterPresets, type DateFilterProps, DateFilterRelative, DateFilterSeparator, DateFilterTrigger, DateFilterUnit, DateFilterValue, DetailEditSheet, type DetailEditSheetProps, FormDialog, type FormDialogProps, FormOverlayIntent, FormOverlayLabels, InfoField, InfoFieldGroup, type InfoFieldGroupProps, type InfoFieldProps, type LocalizedField, LocalizedFields, type LocalizedFieldsProps, LoginForm, type LoginFormContextValue, LoginFormEmail, type LoginFormEmailProps, LoginFormErrors, LoginFormLabels, LoginFormPassword, type LoginFormPasswordProps, LoginFormPreset, type LoginFormPresetProps, LoginFormProvider, LoginFormRemember, type LoginFormRememberProps, LoginFormRoot, type LoginFormRootProps, LoginFormStatus, type LoginFormStatusProps, LoginFormSubmit, type LoginFormSubmitProps, NumberField, type NumberFieldProps, SectionHeader, type SectionHeaderProps, SelectField, type SelectFieldOption, type SelectFieldProps, SettingsCard, type SettingsCardProps, SettingsField, type SettingsFieldProps, SettingsPanel, type SettingsPanelProps, StatCard, type StatCardProps, StatsGrid, type StatsGridProps, TextField, type TextFieldProps, ToggleRow, type ToggleRowProps, TourBreakpoint, TourDefinition, TourLabels, TourProgress, TourProvider, TourStep, TwoFactorChallenge, type TwoFactorChallengeProps, TwoFactorCodeMode, TwoFactorDisableButton, type TwoFactorDisableButtonProps, TwoFactorLabelProps, TwoFactorQrProps, TwoFactorRecoveryCodes, type TwoFactorRecoveryCodesProps, TwoFactorScanStep, type TwoFactorScanStepProps, TwoFactorSetupDialog, type TwoFactorSetupDialogProps, TwoFactorVerifyForm, type TwoFactorVerifyFormProps, decodeDateFilter, encodeDateFilter, formatRangePreview, resolveRelativeRange, resolveSteps, shouldStartTour, stepsForBreakpoint, summariseDateFilter, useDateFilter, useLoginFormContext, useTour, useTourController };
