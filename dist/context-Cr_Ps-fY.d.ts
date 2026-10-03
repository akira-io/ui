import * as React from 'react';
import { ReactNode, ComponentProps } from 'react';
import { LucideIcon } from 'lucide-react';
import { S as SlotNameProps, U as UrlLike, L as LinkComponent } from './types-BfBhSUho.js';
import { a as LoginFormLabels, e as TourLabels } from './types-DM84rPRO.js';
import { b as PasskeyLabels } from './types-ClE3iWNv.js';
import * as class_variance_authority_types from 'class-variance-authority/types';
import { VariantProps } from 'class-variance-authority';
import useEmblaCarousel, { UseEmblaCarouselType } from 'embla-carousel-react';
import { E as buttonVariants, b as ButtonTone, B as Button, a as ButtonProps, I as Input, m as SidebarLabels, U as UserMenuLabels } from './user-menu-content-BZo-aIv0.js';
import { a as CodeBlockLabels, c as JsonViewerLabels } from './json-viewer-PmG9RJo4.js';
import { a as DataTableLabels, D as DataTableFacetedFilterLabels } from './data-table-labels-xwJ69rBt.js';
import { Dialog as Dialog$1 } from 'radix-ui';
import { Accept, FileRejection } from 'react-dropzone';
import { E as EditorLabels } from './labels-CQD-C5kN.js';
import { Slot } from '@radix-ui/react-slot';
import * as LabelPrimitive from '@radix-ui/react-label';
import * as SheetPrimitive from '@radix-ui/react-dialog';
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

interface DangerZoneLabels {
    title: string;
    description: string;
    actionLabel: string;
    confirmTitle: string;
    confirmDescription: string;
    confirmText: string;
    cancelText: string;
    requiredValueLabel: string;
}
declare const dangerZoneLabels: DangerZoneLabels;
interface DangerZoneAction {
    id: string;
    title: string;
    description?: string;
    actionLabel?: string;
    confirmTitle?: string;
    confirmDescription?: string;
    confirmText?: string;
    cancelText?: string;
    requiredValue?: string;
    requiredValueLabel?: string;
    disabled?: boolean;
    onConfirm: () => void;
}
interface DangerZoneProps {
    title?: string;
    description?: string;
    actions: DangerZoneAction[];
    processing?: boolean;
    labels?: Partial<DangerZoneLabels>;
    footer?: ReactNode;
    className?: string;
}
declare function DangerZone({ title, description, actions, processing, labels, footer, className, slotName, }: DangerZoneProps & SlotNameProps): React.JSX.Element;

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

interface FormOverlayLabels {
    cancelLabel: string;
    saveLabel: string;
    savingLabel: string;
}
declare const formOverlayDefaultLabels: FormOverlayLabels;
type FormOverlayIntent = 'default' | 'destructive';
interface FormOverlayActionsProps {
    labels?: Partial<FormOverlayLabels>;
    processing?: boolean;
    intent?: FormOverlayIntent;
    submit?: boolean;
    className?: string;
    onCancel: () => void;
    onSave?: () => void;
}
declare function FormOverlayActions({ labels: overrides, processing, intent, submit, className, onCancel, onSave, slotName, }: FormOverlayActionsProps & SlotNameProps): React.JSX.Element;

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

interface BreadcrumbLabels {
    navigationLabel: string;
    moreLabel: string;
}
declare const breadcrumbDefaultLabels: BreadcrumbLabels;
declare function Breadcrumb({ slotName, ...props }: React.ComponentProps<'nav'> & SlotNameProps): React.JSX.Element;
declare function BreadcrumbList({ className, slotName, ...props }: React.ComponentProps<'ol'> & SlotNameProps): React.JSX.Element;
declare function BreadcrumbItem({ className, slotName, ...props }: React.ComponentProps<'li'> & SlotNameProps): React.JSX.Element;
declare function BreadcrumbLink({ asChild, className, slotName, ...props }: React.ComponentProps<'a'> & {
    asChild?: boolean;
} & SlotNameProps): React.JSX.Element;
declare function BreadcrumbPage({ className, slotName, ...props }: React.ComponentProps<'span'> & SlotNameProps): React.JSX.Element;
declare function BreadcrumbSeparator({ children, className, slotName, ...props }: React.ComponentProps<'li'> & SlotNameProps): React.JSX.Element;
declare function BreadcrumbEllipsis({ className, label, slotName, ...props }: React.ComponentProps<'span'> & {
    label?: string;
} & SlotNameProps): React.JSX.Element;

interface CarouselLabels {
    carouselLabel: string;
    slideLabel: string;
    previousLabel: string;
    nextLabel: string;
}
declare const carouselDefaultLabels: CarouselLabels;
type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];
type CarouselProps = {
    opts?: CarouselOptions;
    plugins?: CarouselPlugin;
    orientation?: 'horizontal' | 'vertical';
    setApi?: (api: CarouselApi) => void;
};
declare function Carousel({ orientation, opts, setApi, plugins, className, children, slotName, ...props }: React.ComponentProps<'div'> & CarouselProps & SlotNameProps): React.JSX.Element;
declare function CarouselContent({ className, slotName, ...props }: React.ComponentProps<'div'> & SlotNameProps): React.JSX.Element;
declare function CarouselItem({ className, slotName, ...props }: React.ComponentProps<'div'> & SlotNameProps): React.JSX.Element;
declare function CarouselPrevious({ className, variant, size, label, slotName, ...props }: React.ComponentProps<typeof Button> & {
    label?: string;
} & SlotNameProps): React.JSX.Element;
declare function CarouselNext({ className, variant, size, label, slotName, ...props }: React.ComponentProps<typeof Button> & {
    label?: string;
} & SlotNameProps): React.JSX.Element;

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

interface DialogLabels {
    closeLabel: string;
}
declare const dialogDefaultLabels: DialogLabels;
declare function Dialog({ slotName, ...props }: React.ComponentProps<typeof Dialog$1.Root> & SlotNameProps): React.JSX.Element;
declare function DialogTrigger({ slotName, ...props }: React.ComponentProps<typeof Dialog$1.Trigger> & SlotNameProps): React.JSX.Element;
declare function DialogPortal({ slotName, ...props }: React.ComponentProps<typeof Dialog$1.Portal> & SlotNameProps): React.JSX.Element;
declare function DialogClose({ slotName, ...props }: React.ComponentProps<typeof Dialog$1.Close> & SlotNameProps): React.JSX.Element;
declare function DialogOverlay({ className, slotName, ...props }: React.ComponentProps<typeof Dialog$1.Overlay> & SlotNameProps): React.JSX.Element;
interface DialogContentProps extends React.ComponentProps<typeof Dialog$1.Content> {
    hideCloseButton?: boolean;
    closeLabel?: string;
}
declare function DialogContent({ className, children, hideCloseButton, closeLabel, slotName, ...props }: DialogContentProps & SlotNameProps): React.JSX.Element;
declare function DialogHeader({ className, slotName, ...props }: React.ComponentProps<'div'> & SlotNameProps): React.JSX.Element;
declare function DialogFooter({ className, slotName, ...props }: React.ComponentProps<'div'> & SlotNameProps): React.JSX.Element;
declare function DialogTitle({ className, slotName, ...props }: React.ComponentProps<typeof Dialog$1.Title> & SlotNameProps): React.JSX.Element;
declare function DialogDescription({ className, slotName, ...props }: React.ComponentProps<typeof Dialog$1.Description> & SlotNameProps): React.JSX.Element;

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

interface EmptyStateLabels {
    title: string;
}
declare const emptyStateLabels: EmptyStateLabels;
interface EmptyStateProps {
    icon?: LucideIcon;
    title?: string;
    description?: string;
    actions?: ReactNode;
    compact?: boolean;
    className?: string;
}
declare function EmptyState({ icon: Icon, title, description, actions, compact, className, slotName, }: EmptyStateProps & SlotNameProps): React.JSX.Element;

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

interface PaginationLabels {
    navigationLabel: string;
    previousLabel: string;
    previousPageLabel: string;
    nextLabel: string;
    nextPageLabel: string;
    morePagesLabel: string;
}
declare const paginationDefaultLabels: PaginationLabels;
declare function Pagination({ className, slotName, ...props }: React.ComponentProps<'nav'> & SlotNameProps): React.JSX.Element;
declare function PaginationContent({ className, slotName, ...props }: React.ComponentProps<'ul'> & SlotNameProps): React.JSX.Element;
declare function PaginationItem({ slotName, ...props }: React.ComponentProps<'li'> & SlotNameProps): React.JSX.Element;
type PaginationLinkProps = {
    isActive?: boolean;
} & Pick<React.ComponentProps<typeof Button>, 'size'> & React.ComponentProps<'a'>;
declare function PaginationLink({ className, isActive, size, slotName, ...props }: PaginationLinkProps & SlotNameProps): React.JSX.Element;
declare function PaginationPrevious({ className, label, ...props }: React.ComponentProps<typeof PaginationLink> & {
    label?: string;
}): React.JSX.Element;
declare function PaginationNext({ className, label, ...props }: React.ComponentProps<typeof PaginationLink> & {
    label?: string;
}): React.JSX.Element;
declare function PaginationEllipsis({ className, label, slotName, ...props }: React.ComponentProps<'span'> & {
    label?: string;
} & SlotNameProps): React.JSX.Element;

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

interface SheetLabels {
    closeLabel: string;
}
declare const sheetDefaultLabels: SheetLabels;
declare function Sheet({ preserveScroll, onOpenChange: onOpenChangeProp, slotName, ...props }: React.ComponentProps<typeof SheetPrimitive.Root> & {
    preserveScroll?: boolean;
} & SlotNameProps): React.JSX.Element;
declare function SheetTrigger({ slotName, ...props }: React.ComponentProps<typeof SheetPrimitive.Trigger> & SlotNameProps): React.JSX.Element;
declare function SheetClose({ slotName, ...props }: React.ComponentProps<typeof SheetPrimitive.Close> & SlotNameProps): React.JSX.Element;
declare function SheetContent({ className, children, side, closeLabel, slotName, ...props }: React.ComponentProps<typeof SheetPrimitive.Content> & {
    side?: 'top' | 'right' | 'bottom' | 'left';
    closeLabel?: string;
} & SlotNameProps): React.JSX.Element;
declare function SheetHeader({ className, slotName, ...props }: React.ComponentProps<'div'> & SlotNameProps): React.JSX.Element;
declare function SheetFooter({ className, slotName, ...props }: React.ComponentProps<'div'> & SlotNameProps): React.JSX.Element;
declare function SheetTitle({ className, slotName, ...props }: React.ComponentProps<typeof SheetPrimitive.Title> & SlotNameProps): React.JSX.Element;
declare function SheetDescription({ className, slotName, ...props }: React.ComponentProps<typeof SheetPrimitive.Description> & SlotNameProps): React.JSX.Element;

interface UiLabelSections {
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
    pagination: PaginationLabels;
    passkeys: PasskeyLabels;
    passwordInput: PasswordInputLabels;
    saveStatus: SaveStatusLabels;
    settings: SettingsLabels;
    sheet: SheetLabels;
    sidebar: SidebarLabels;
    tour: TourLabels;
    twoFactor: TwoFactorLabels;
    userMenu: UserMenuLabels;
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

export { AlertDescription as $, type SettingsLabels as A, SettingsPage as B, type CopyButtonLabels as C, type DateFilterValue as D, type SettingsPageProps as E, type FormOverlayIntent as F, SettingsSection as G, type SettingsSectionProps as H, type TwoFactorLabels as I, type TwoFactorSetupStep as J, type UiLabels as K, UiLocaleProvider as L, dangerZoneLabels as M, formOverlayDefaultLabels as N, settingsLabels as O, twoFactorLabels as P, useCommandPalette as Q, useUiDateLocale as R, type SurfaceProps as S, type TwoFactorLabelProps as T, type UiLabelSections as U, useUiLabels as V, useUiLocale as W, type FlatSurfaceProps as X, Dialog as Y, type FloatingSheetLabels as Z, Alert as _, type DateFilterLabels as a, PaginationEllipsis as a$, type AlertLabels as a0, AlertTitle as a1, AppearanceToggle as a2, type AppearanceToggleLabels as a3, type AppearanceToggleProps as a4, Breadcrumb as a5, BreadcrumbEllipsis as a6, BreadcrumbItem as a7, type BreadcrumbLabels as a8, BreadcrumbLink as a9, DialogContent as aA, DialogDescription as aB, DialogFooter as aC, DialogHeader as aD, type DialogLabels as aE, DialogOverlay as aF, DialogPortal as aG, DialogTitle as aH, DialogTrigger as aI, Dropzone as aJ, type DropzoneLabels as aK, type DropzoneProps as aL, EmptyState as aM, type EmptyStateLabels as aN, type EmptyStateProps as aO, Field as aP, type FieldContextValue as aQ, FieldControl as aR, FieldDescription as aS, FieldGroup as aT, FieldLabel as aU, type FieldLabels as aV, type FieldOrientation as aW, type FieldProps as aX, Label as aY, Pagination as aZ, PaginationContent as a_, BreadcrumbList as aa, BreadcrumbPage as ab, BreadcrumbSeparator as ac, Carousel as ad, type CarouselApi as ae, CarouselContent as af, CarouselItem as ag, type CarouselLabels as ah, CarouselNext as ai, CarouselPrevious as aj, Combobox as ak, type ComboboxLabels as al, type ComboboxOption as am, type ComboboxProps as an, ConfirmDialog as ao, type ConfirmDialogLabels as ap, type ConfirmDialogProps as aq, CopyButton as ar, type CopyButtonProps as as, DatePicker as at, type DatePickerLabels as au, type DatePickerProps as av, DateRangeFilter as aw, type DateRangeFilterLabels as ax, type DateRangeFilterProps as ay, DialogClose as az, type DateFilterOption as b, PaginationItem as b0, type PaginationLabels as b1, PaginationLink as b2, PaginationNext as b3, PaginationPrevious as b4, PasswordInput as b5, type PasswordInputLabels as b6, type PasswordInputProps as b7, SAVED_DURATION as b8, SaveStatus as b9, fieldLabels as bA, floatingSheetDefaultLabels as bB, focusRing as bC, menuHighlight as bD, nestedEdgeToEdge as bE, nestedRadius as bF, nestedSurfaceReset as bG, paginationDefaultLabels as bH, passwordInputDefaultLabels as bI, recessedSurface as bJ, saveStatusLabels as bK, sheetDefaultLabels as bL, surface as bM, useField as bN, type CommandPaletteLabels as bO, type FullUiLabels as bP, type SaveStatusLabels as ba, type SaveStatusProps as bb, type SaveStatusState as bc, Sheet as bd, SheetClose as be, SheetContent as bf, SheetDescription as bg, SheetFooter as bh, SheetHeader as bi, type SheetLabels as bj, SheetTitle as bk, SheetTrigger as bl, alertDefaultLabels as bm, appearanceToggleDefaultLabels as bn, breadcrumbDefaultLabels as bo, carouselDefaultLabels as bp, comboboxDefaultLabels as bq, confirmDialogDefaultLabels as br, controlFill as bs, copyButtonLabels as bt, datePickerDefaultLabels as bu, dateRangeFilterDefaultLabels as bv, dialogDefaultLabels as bw, dropzoneDefaultLabels as bx, elevatedSurface as by, emptyStateLabels as bz, type DateFilterUnit as c, type FormOverlayLabels as d, type TwoFactorCodeMode as e, type TwoFactorQrProps as f, CommandPalette as g, type CommandPaletteGroup as h, type CommandPaletteItem as i, type CommandPaletteProps as j, DEFAULT_LABELS as k, DEFAULT_OPERATORS as l, DEFAULT_PRESETS as m, DEFAULT_UNITS as n, DangerZone as o, type DangerZoneAction as p, type DangerZoneLabels as q, type DangerZoneProps as r, type DateFilterMode as s, type DateFilterOperator as t, FormOverlayActions as u, type FormOverlayActionsProps as v, SettingsEntry as w, type SettingsEntryProps as x, SettingsGroup as y, type SettingsGroupProps as z };
