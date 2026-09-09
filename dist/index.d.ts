import * as React$1 from 'react';
import { ReactNode } from 'react';
import { ClassValue } from 'clsx';
import { F as FlatSurfaceProps, E as FloatingSheetLabels } from './context-CtZuzjaX.js';
export { G as Alert, H as AlertDescription, I as AlertLabels, J as AlertTitle, K as AppearanceToggle, L as AppearanceToggleLabels, M as AppearanceToggleProps, N as Combobox, O as ComboboxLabels, P as ComboboxOption, Q as ComboboxProps, R as ConfirmDialog, T as ConfirmDialogLabels, V as CopyButton, C as CopyButtonLabels, W as CopyButtonProps, X as DataTable, Y as DataTableFacetedFilterLabels, Z as DataTableFilter, _ as DataTableLabels, $ as DataTableRowAction, a0 as DataTableServerFilter, a1 as DatePicker, a2 as DatePickerLabels, a3 as DatePickerProps, a4 as DateRangeFilter, a5 as DateRangeFilterLabels, a6 as DateRangeFilterProps, a7 as Dropzone, a8 as DropzoneLabels, a9 as FacetedFilter, aa as PasswordInput, ab as PasswordInputLabels, ac as RowActionsMenu, ad as SAVED_DURATION, ae as SaveStatus, af as SaveStatusLabels, ag as SaveStatusProps, ah as SaveStatusState, ai as ServerFacetedFilter, S as SurfaceProps, U as UiLabelSections, w as UiLabels, x as UiLocaleProvider, aj as alertDefaultLabels, ak as appearanceToggleDefaultLabels, al as comboboxDefaultLabels, am as confirmDialogDefaultLabels, an as controlFill, ao as copyButtonLabels, ap as dataTableDefaultLabels, aq as dataTableFacetedFilterDefaultLabels, ar as datePickerDefaultLabels, as as dateRangeFilterDefaultLabels, at as dropzoneDefaultLabels, au as elevatedSurface, av as floatingSheetDefaultLabels, aw as focusRing, ax as menuHighlight, ay as nestedEdgeToEdge, az as nestedRadius, aA as nestedSurfaceReset, aB as passwordInputDefaultLabels, aC as recessedSurface, aD as saveStatusLabels, aE as surface, A as useUiLabels, B as useUiLocale } from './context-CtZuzjaX.js';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { S as SlotNameProps, I as IconComponent } from './types-CMZRvMV5.js';
export { C as Column, a as ColumnDef, F as FilterFn, b as LucideIcon, R as Row, T as TableInstance, U as UrlLike } from './types-CMZRvMV5.js';
import { AlertDialog as AlertDialog$1, AspectRatio as AspectRatio$1, Dialog as Dialog$1, ContextMenu as ContextMenu$1, HoverCard as HoverCard$1, Menubar as Menubar$1, Popover as Popover$1, Progress as Progress$1, RadioGroup as RadioGroup$1, Slider as Slider$1 } from 'radix-ui';
import { B as Button } from './input-R3dvXqSY.js';
export { a as ButtonProps, b as ButtonTone, I as Input, c as buttonVariants } from './input-R3dvXqSY.js';
import * as RechartsPrimitive from 'recharts';
import { TooltipValueType } from 'recharts';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import * as class_variance_authority_types from 'class-variance-authority/types';
import { VariantProps } from 'class-variance-authority';
import { DayPicker, DayButton } from 'react-day-picker';
import useEmblaCarousel, { UseEmblaCarouselType } from 'embla-carousel-react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';
import { Command as Command$1 } from 'cmdk';
import { Drawer as Drawer$1 } from 'vaul';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { LucideIcon } from 'lucide-react';
export { F as Field, a as FieldContextValue, b as FieldControl, c as FieldDescription, d as FieldGroup, e as FieldLabel, f as FieldLabels, g as FieldOrientation, L as Label, u as useField } from './field-C1TdmC2t.js';
import * as react_hook_form from 'react-hook-form';
import { FieldValues, FieldPath, ControllerProps } from 'react-hook-form';
import * as LabelPrimitive from '@radix-ui/react-label';
import * as input_otp from 'input-otp';
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';
import * as ResizablePrimitive from 'react-resizable-panels';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import * as SelectPrimitive from '@radix-ui/react-select';
export { S as Separator, a as Sidebar, b as SidebarContent, c as SidebarFooter, d as SidebarGroup, e as SidebarGroupAction, f as SidebarGroupContent, g as SidebarGroupLabel, h as SidebarHeader, i as SidebarInput, j as SidebarInset, k as SidebarMenu, l as SidebarMenuAction, m as SidebarMenuBadge, n as SidebarMenuButton, o as SidebarMenuItem, p as SidebarMenuSkeleton, q as SidebarMenuSub, r as SidebarMenuSubButton, s as SidebarMenuSubItem, t as SidebarProvider, u as SidebarRail, v as SidebarSeparator, w as SidebarTrigger, T as Tooltip, x as TooltipContent, y as TooltipProvider, z as TooltipTrigger, A as useSidebar } from './sidebar-CYd36Wyf.js';
import * as SheetPrimitive from '@radix-ui/react-dialog';
import { ToasterProps, toast as toast$1 } from 'sonner';
import * as SwitchPrimitives from '@radix-ui/react-switch';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import * as TogglePrimitive from '@radix-ui/react-toggle';
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import './types-DEJsTx8E.js';
import './json-viewer-Bssv9mTD.js';
import '@tanstack/react-table';
import 'react-dropzone';
import '@radix-ui/react-slot';
import '@radix-ui/react-separator';
import '@radix-ui/react-tooltip';

declare const spinnerVariants: (props?: ({
    size?: "sm" | "default" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface SpinnerProps extends React$1.ComponentProps<'span'>, VariantProps<typeof spinnerVariants> {
    label?: string;
}
declare function Spinner({ className, label, size, slotName, ...props }: SpinnerProps & SlotNameProps): React$1.JSX.Element;

declare const THEMES: {
    readonly light: "";
    readonly dark: ".dark";
};
type TooltipNameType = number | string;
type ChartConfig = Record<string, {
    label?: React$1.ReactNode;
    icon?: React$1.ComponentType;
} & ({
    color?: string;
    theme?: never;
} | {
    color?: never;
    theme: Record<keyof typeof THEMES, string>;
})>;
declare function ChartContainer({ id, className, children, config, initialDimension, slotName, ...props }: React$1.ComponentProps<'div'> & {
    config: ChartConfig;
    children: React$1.ComponentProps<typeof RechartsPrimitive.ResponsiveContainer>['children'];
    initialDimension?: {
        width: number;
        height: number;
    };
} & SlotNameProps): React$1.JSX.Element;
declare const ChartStyle: ({ id, config }: {
    id: string;
    config: ChartConfig;
}) => React$1.JSX.Element | null;
declare const ChartTooltip: typeof RechartsPrimitive.Tooltip;
declare function ChartTooltipContent({ active, payload, className, indicator, hideLabel, hideIndicator, label, labelFormatter, labelClassName, formatter, color, nameKey, labelKey, }: React$1.ComponentProps<typeof RechartsPrimitive.Tooltip> & React$1.ComponentProps<'div'> & {
    hideLabel?: boolean;
    hideIndicator?: boolean;
    indicator?: 'line' | 'dot' | 'dashed';
    nameKey?: string;
    labelKey?: string;
} & Omit<RechartsPrimitive.DefaultTooltipContentProps<TooltipValueType, TooltipNameType>, 'accessibilityLayer'>): React$1.JSX.Element | null;
declare const ChartLegend: React$1.MemoExoticComponent<(outsideProps: RechartsPrimitive.LegendProps) => React$1.ReactPortal | null>;
declare function ChartLegendContent({ className, hideIcon, payload, verticalAlign, nameKey, }: React$1.ComponentProps<'div'> & {
    hideIcon?: boolean;
    nameKey?: string;
} & RechartsPrimitive.DefaultLegendContentProps): React$1.JSX.Element | null;

declare const CHART_PALETTE: readonly ["var(--color-chart-1)", "var(--color-chart-2)", "var(--color-chart-3)", "var(--color-chart-4)", "var(--color-chart-5)", "var(--color-chart-6)", "var(--color-chart-7)", "var(--color-chart-8)"];
type ChartSeries = {
    key: string;
    label?: React$1.ReactNode;
    color?: string;
    stackId?: string;
};
type ChartSeriesInput = string | ChartSeries;
type ChartDatum = Record<string, unknown>;
declare function paletteColor(index: number): string;
declare function cssVariableKey(key: string): string;
declare function chartColorVariable(key: string): string;
type ChartScale = 'categorical' | 'linear' | 'time';
type ChartAxisFormat = Intl.NumberFormatOptions | Intl.DateTimeFormatOptions;

declare function cn(...inputs: ClassValue[]): string;

type AutosaveStatus = 'idle' | 'saving' | 'saved' | 'error';
declare const AUTOSAVE_DELAY = 700;
interface UseAutosaveOptions<T> {
    delay?: number;
    enabled?: boolean;
    isEqual?: (a: T, b: T) => boolean;
}
interface UseAutosaveResult {
    status: AutosaveStatus;
    error?: string;
    flush: () => void;
    reset: () => void;
}
declare function useAutosave<T>(values: T, onSave: (values: T) => void | Promise<void>, options?: UseAutosaveOptions<T>): UseAutosaveResult;

interface UseConfirmDialogOptions {
    title?: string;
    description?: string | ReactNode;
    confirmText?: string;
    cancelText?: string;
    variant?: 'destructive' | 'default';
}
declare function useConfirmDialog(): {
    confirm: (onConfirm: () => void, confirmOptions?: UseConfirmDialogOptions, onCancel?: () => void) => void;
    ConfirmDialog: () => React$1.JSX.Element;
};

declare function Accordion({ className, slotName, ...props }: React$1.ComponentProps<typeof AccordionPrimitive.Root> & SlotNameProps): React$1.JSX.Element;
declare const AccordionItem: React$1.ForwardRefExoticComponent<Omit<AccordionPrimitive.AccordionItemProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & SlotNameProps & React$1.RefAttributes<HTMLDivElement>>;
declare const AccordionTrigger: React$1.ForwardRefExoticComponent<Omit<AccordionPrimitive.AccordionTriggerProps & React$1.RefAttributes<HTMLButtonElement>, "ref"> & SlotNameProps & React$1.RefAttributes<HTMLButtonElement>>;
declare const AccordionContent: React$1.ForwardRefExoticComponent<Omit<AccordionPrimitive.AccordionContentProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & SlotNameProps & React$1.RefAttributes<HTMLDivElement>>;

type AkiraMarkProps = React$1.SVGProps<SVGSVGElement>;
declare function AkiraMark({ slotName, 'aria-label': ariaLabel, 'aria-labelledby': ariaLabelledBy, ...props }: AkiraMarkProps & SlotNameProps): React$1.JSX.Element;

declare function AlertDialog({ slotName, ...props }: React$1.ComponentProps<typeof AlertDialog$1.Root> & SlotNameProps): React$1.JSX.Element;
declare function AlertDialogTrigger({ slotName, ...props }: React$1.ComponentProps<typeof AlertDialog$1.Trigger> & SlotNameProps): React$1.JSX.Element;
declare function AlertDialogPortal({ slotName, ...props }: React$1.ComponentProps<typeof AlertDialog$1.Portal> & SlotNameProps): React$1.JSX.Element;
declare function AlertDialogOverlay({ className, slotName, ...props }: React$1.ComponentProps<typeof AlertDialog$1.Overlay> & SlotNameProps): React$1.JSX.Element;
declare function AlertDialogContent({ className, size, slotName, ...props }: React$1.ComponentProps<typeof AlertDialog$1.Content> & {
    size?: 'default' | 'sm';
} & SlotNameProps): React$1.JSX.Element;
declare function AlertDialogHeader({ className, slotName, ...props }: React$1.ComponentProps<'div'> & SlotNameProps): React$1.JSX.Element;
declare function AlertDialogFooter({ className, slotName, ...props }: React$1.ComponentProps<'div'> & SlotNameProps): React$1.JSX.Element;
declare function AlertDialogTitle({ className, slotName, ...props }: React$1.ComponentProps<typeof AlertDialog$1.Title> & SlotNameProps): React$1.JSX.Element;
declare function AlertDialogDescription({ className, slotName, ...props }: React$1.ComponentProps<typeof AlertDialog$1.Description> & SlotNameProps): React$1.JSX.Element;
declare function AlertDialogMedia({ className, slotName, ...props }: React$1.ComponentProps<'div'> & SlotNameProps): React$1.JSX.Element;
declare function AlertDialogAction({ className, variant, size, slotName, ...props }: React$1.ComponentProps<typeof AlertDialog$1.Action> & Pick<React$1.ComponentProps<typeof Button>, 'variant' | 'size'> & SlotNameProps): React$1.JSX.Element;
declare function AlertDialogCancel({ className, variant, size, slotName, ...props }: React$1.ComponentProps<typeof AlertDialog$1.Cancel> & Pick<React$1.ComponentProps<typeof Button>, 'variant' | 'size'> & SlotNameProps): React$1.JSX.Element;

type ChartCurve = 'smooth' | 'linear' | 'step';
interface CartesianChartProps extends Omit<React$1.ComponentProps<typeof ChartContainer>, 'config' | 'children'> {
    data: readonly ChartDatum[];
    series: readonly ChartSeriesInput[];
    xKey: string;
    config?: ChartConfig;
    curve?: ChartCurve;
    stacked?: boolean;
    grid?: boolean;
    legend?: boolean;
    tooltip?: boolean;
    xAxis?: boolean;
    yAxis?: boolean;
    xScale?: ChartScale;
    xFormat?: ChartAxisFormat;
    yFormat?: Intl.NumberFormatOptions;
    locale?: string;
    horizontal?: boolean;
    barSize?: number;
    barRadius?: number;
    dots?: boolean;
    animate?: boolean;
}

type AreaChartProps = Omit<CartesianChartProps, 'barSize' | 'barRadius' | 'horizontal'>;
declare function AreaChart({ slotName, ...props }: AreaChartProps): React$1.JSX.Element;

declare function AspectRatio({ slotName, ...props }: React.ComponentProps<typeof AspectRatio$1.Root> & SlotNameProps): React$1.JSX.Element;

declare function Avatar({ className, slotName, ...props }: React$1.ComponentProps<typeof AvatarPrimitive.Root> & SlotNameProps): React$1.JSX.Element;
declare function AvatarImage({ className, slotName, ...props }: React$1.ComponentProps<typeof AvatarPrimitive.Image> & SlotNameProps): React$1.JSX.Element;
declare function AvatarFallback({ className, slotName, ...props }: React$1.ComponentProps<typeof AvatarPrimitive.Fallback> & SlotNameProps): React$1.JSX.Element;

declare const badgeVariants: (props?: ({
    variant?: "default" | "destructive" | "outline" | "secondary" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
declare function Badge({ className, variant, asChild, slotName, ...props }: React$1.ComponentProps<'span'> & VariantProps<typeof badgeVariants> & {
    asChild?: boolean;
} & SlotNameProps): React$1.JSX.Element;

type BarChartProps = Omit<CartesianChartProps, 'curve' | 'dots'>;
declare function BarChart({ slotName, ...props }: BarChartProps): React$1.JSX.Element;

declare function Breadcrumb({ slotName, ...props }: React$1.ComponentProps<'nav'> & SlotNameProps): React$1.JSX.Element;
declare function BreadcrumbList({ className, slotName, ...props }: React$1.ComponentProps<'ol'> & SlotNameProps): React$1.JSX.Element;
declare function BreadcrumbItem({ className, slotName, ...props }: React$1.ComponentProps<'li'> & SlotNameProps): React$1.JSX.Element;
declare function BreadcrumbLink({ asChild, className, slotName, ...props }: React$1.ComponentProps<'a'> & {
    asChild?: boolean;
} & SlotNameProps): React$1.JSX.Element;
declare function BreadcrumbPage({ className, slotName, ...props }: React$1.ComponentProps<'span'> & SlotNameProps): React$1.JSX.Element;
declare function BreadcrumbSeparator({ children, className, slotName, ...props }: React$1.ComponentProps<'li'> & SlotNameProps): React$1.JSX.Element;
declare function BreadcrumbEllipsis({ className, slotName, ...props }: React$1.ComponentProps<'span'> & SlotNameProps): React$1.JSX.Element;

declare function Calendar({ className, classNames, showOutsideDays, captionLayout, buttonVariant, formatters, components, slotName, ...props }: React$1.ComponentProps<typeof DayPicker> & {
    buttonVariant?: React$1.ComponentProps<typeof Button>['variant'];
} & SlotNameProps): React$1.JSX.Element;
declare function CalendarDayButton({ className, day, modifiers, ...props }: React$1.ComponentProps<typeof DayButton>): React$1.JSX.Element;

declare const cardVariants: (props?: ({
    variant?: "default" | "solid" | "subtle" | "outlined" | null | undefined;
    interactive?: boolean | null | undefined;
    padding?: "none" | "sm" | "lg" | "md" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type CardProps = React$1.ComponentProps<'div'> & VariantProps<typeof cardVariants> & FlatSurfaceProps;
declare function Card({ className, variant, interactive, padding, inset, flat, slotName, ...props }: CardProps & SlotNameProps): React$1.JSX.Element;
declare function CardHeader({ className, slotName, ...props }: React$1.ComponentProps<'div'> & SlotNameProps): React$1.JSX.Element;
declare function CardTitle({ className, slotName, ...props }: React$1.ComponentProps<'div'> & SlotNameProps): React$1.JSX.Element;
declare function CardDescription({ className, slotName, ...props }: React$1.ComponentProps<'div'> & SlotNameProps): React$1.JSX.Element;
declare function CardContent({ className, slotName, ...props }: React$1.ComponentProps<'div'> & SlotNameProps): React$1.JSX.Element;
declare function CardFooter({ className, slotName, ...props }: React$1.ComponentProps<'div'> & SlotNameProps): React$1.JSX.Element;

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
declare function Carousel({ orientation, opts, setApi, plugins, className, children, slotName, ...props }: React$1.ComponentProps<'div'> & CarouselProps & SlotNameProps): React$1.JSX.Element;
declare function CarouselContent({ className, slotName, ...props }: React$1.ComponentProps<'div'> & SlotNameProps): React$1.JSX.Element;
declare function CarouselItem({ className, slotName, ...props }: React$1.ComponentProps<'div'> & SlotNameProps): React$1.JSX.Element;
declare function CarouselPrevious({ className, variant, size, slotName, ...props }: React$1.ComponentProps<typeof Button> & SlotNameProps): React$1.JSX.Element;
declare function CarouselNext({ className, variant, size, slotName, ...props }: React$1.ComponentProps<typeof Button> & SlotNameProps): React$1.JSX.Element;

declare function Checkbox({ className, slotName, ...props }: React$1.ComponentProps<typeof CheckboxPrimitive.Root> & SlotNameProps): React$1.JSX.Element;

declare function Collapsible({ slotName, ...props }: React.ComponentProps<typeof CollapsiblePrimitive.Root> & SlotNameProps): React$1.JSX.Element;
declare function CollapsibleTrigger({ slotName, ...props }: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleTrigger> & SlotNameProps): React$1.JSX.Element;
declare function CollapsibleContent({ slotName, ...props }: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleContent> & SlotNameProps): React$1.JSX.Element;

declare function Dialog({ slotName, ...props }: React$1.ComponentProps<typeof Dialog$1.Root> & SlotNameProps): React$1.JSX.Element;
declare function DialogTrigger({ slotName, ...props }: React$1.ComponentProps<typeof Dialog$1.Trigger> & SlotNameProps): React$1.JSX.Element;
declare function DialogPortal({ slotName, ...props }: React$1.ComponentProps<typeof Dialog$1.Portal> & SlotNameProps): React$1.JSX.Element;
declare function DialogClose({ slotName, ...props }: React$1.ComponentProps<typeof Dialog$1.Close> & SlotNameProps): React$1.JSX.Element;
declare function DialogOverlay({ className, slotName, ...props }: React$1.ComponentProps<typeof Dialog$1.Overlay> & SlotNameProps): React$1.JSX.Element;
interface DialogContentProps extends React$1.ComponentProps<typeof Dialog$1.Content> {
    hideCloseButton?: boolean;
}
declare function DialogContent({ className, children, hideCloseButton, slotName, ...props }: DialogContentProps & SlotNameProps): React$1.JSX.Element;
declare function DialogHeader({ className, slotName, ...props }: React$1.ComponentProps<'div'> & SlotNameProps): React$1.JSX.Element;
declare function DialogFooter({ className, slotName, ...props }: React$1.ComponentProps<'div'> & SlotNameProps): React$1.JSX.Element;
declare function DialogTitle({ className, slotName, ...props }: React$1.ComponentProps<typeof Dialog$1.Title> & SlotNameProps): React$1.JSX.Element;
declare function DialogDescription({ className, slotName, ...props }: React$1.ComponentProps<typeof Dialog$1.Description> & SlotNameProps): React$1.JSX.Element;

declare function Command({ className, slotName, ...props }: React$1.ComponentProps<typeof Command$1> & SlotNameProps): React$1.JSX.Element;
declare function CommandDialog({ title, description, children, className, hideCloseButton, ...props }: React$1.ComponentProps<typeof Dialog> & {
    title?: string;
    description?: string;
    className?: string;
    hideCloseButton?: boolean;
}): React$1.JSX.Element;
declare function CommandInput({ className, slotName, ...props }: React$1.ComponentProps<typeof Command$1.Input> & SlotNameProps): React$1.JSX.Element;
declare function CommandList({ className, slotName, ...props }: React$1.ComponentProps<typeof Command$1.List> & SlotNameProps): React$1.JSX.Element;
declare function CommandEmpty({ className, children, slotName, ...props }: React$1.ComponentProps<typeof Command$1.Empty> & SlotNameProps): React$1.JSX.Element;
declare function CommandGroup({ className, slotName, ...props }: React$1.ComponentProps<typeof Command$1.Group> & SlotNameProps): React$1.JSX.Element;
declare function CommandSeparator({ className, slotName, ...props }: React$1.ComponentProps<typeof Command$1.Separator> & SlotNameProps): React$1.JSX.Element;
declare function CommandItem({ className, slotName, ...props }: React$1.ComponentProps<typeof Command$1.Item> & SlotNameProps): React$1.JSX.Element;
declare function CommandShortcut({ className, slotName, ...props }: React$1.ComponentProps<'span'> & SlotNameProps): React$1.JSX.Element;

declare function ContextMenu({ slotName, ...props }: React$1.ComponentProps<typeof ContextMenu$1.Root> & SlotNameProps): React$1.JSX.Element;
declare function ContextMenuTrigger({ slotName, ...props }: React$1.ComponentProps<typeof ContextMenu$1.Trigger> & SlotNameProps): React$1.JSX.Element;
declare function ContextMenuGroup({ slotName, ...props }: React$1.ComponentProps<typeof ContextMenu$1.Group> & SlotNameProps): React$1.JSX.Element;
declare function ContextMenuPortal({ slotName, ...props }: React$1.ComponentProps<typeof ContextMenu$1.Portal> & SlotNameProps): React$1.JSX.Element;
declare function ContextMenuSub({ slotName, ...props }: React$1.ComponentProps<typeof ContextMenu$1.Sub> & SlotNameProps): React$1.JSX.Element;
declare function ContextMenuRadioGroup({ slotName, ...props }: React$1.ComponentProps<typeof ContextMenu$1.RadioGroup> & SlotNameProps): React$1.JSX.Element;
declare function ContextMenuSubTrigger({ className, inset, children, slotName, ...props }: React$1.ComponentProps<typeof ContextMenu$1.SubTrigger> & {
    inset?: boolean;
} & SlotNameProps): React$1.JSX.Element;
declare function ContextMenuSubContent({ className, slotName, ...props }: React$1.ComponentProps<typeof ContextMenu$1.SubContent> & SlotNameProps): React$1.JSX.Element;
declare function ContextMenuContent({ className, slotName, container, ...props }: React$1.ComponentProps<typeof ContextMenu$1.Content> & SlotNameProps & {
    container?: HTMLElement | null;
}): React$1.JSX.Element;
declare function ContextMenuItem({ className, inset, variant, slotName, ...props }: React$1.ComponentProps<typeof ContextMenu$1.Item> & {
    inset?: boolean;
    variant?: 'default' | 'destructive';
} & SlotNameProps): React$1.JSX.Element;
declare function ContextMenuCheckboxItem({ className, children, checked, slotName, ...props }: React$1.ComponentProps<typeof ContextMenu$1.CheckboxItem> & SlotNameProps): React$1.JSX.Element;
declare function ContextMenuRadioItem({ className, children, slotName, ...props }: React$1.ComponentProps<typeof ContextMenu$1.RadioItem> & SlotNameProps): React$1.JSX.Element;
declare function ContextMenuLabel({ className, inset, slotName, ...props }: React$1.ComponentProps<typeof ContextMenu$1.Label> & {
    inset?: boolean;
} & SlotNameProps): React$1.JSX.Element;
declare function ContextMenuSeparator({ className, slotName, ...props }: React$1.ComponentProps<typeof ContextMenu$1.Separator> & SlotNameProps): React$1.JSX.Element;
declare function ContextMenuShortcut({ className, slotName, ...props }: React$1.ComponentProps<'span'> & SlotNameProps): React$1.JSX.Element;

interface DonutChartProps extends Omit<React$1.ComponentProps<'div'>, 'children'>, SlotNameProps {
    data: readonly ChartDatum[];
    valueKey?: string;
    labelKey?: string;
    config?: ChartConfig;
    innerRadius?: number | string;
    cornerRadius?: number;
    paddingAngle?: number;
    legend?: false | 'right' | 'bottom';
    legendValue?: 'percentage' | 'value' | 'none';
    label?: React$1.ReactNode;
    value?: React$1.ReactNode;
    format?: Intl.NumberFormatOptions;
    locale?: string;
    tooltip?: boolean;
    animate?: boolean;
    children?: React$1.ReactNode;
}
declare function DonutChart({ data, valueKey, labelKey, config, innerRadius, cornerRadius, paddingAngle, legend, legendValue, label, value, format, locale, tooltip, animate, className, children, slotName, ...props }: DonutChartProps): React$1.JSX.Element;

declare function Drawer({ slotName, ...props }: React$1.ComponentProps<typeof Drawer$1.Root> & SlotNameProps): React$1.JSX.Element;
declare function DrawerTrigger({ slotName, ...props }: React$1.ComponentProps<typeof Drawer$1.Trigger> & SlotNameProps): React$1.JSX.Element;
declare function DrawerPortal({ slotName, ...props }: React$1.ComponentProps<typeof Drawer$1.Portal> & SlotNameProps): React$1.JSX.Element;
declare function DrawerClose({ slotName, ...props }: React$1.ComponentProps<typeof Drawer$1.Close> & SlotNameProps): React$1.JSX.Element;
declare function DrawerOverlay({ className, slotName, ...props }: React$1.ComponentProps<typeof Drawer$1.Overlay> & SlotNameProps): React$1.JSX.Element;
declare function DrawerContent({ className, children, slotName, ...props }: React$1.ComponentProps<typeof Drawer$1.Content> & SlotNameProps): React$1.JSX.Element;
declare function DrawerHeader({ className, slotName, ...props }: React$1.ComponentProps<'div'> & SlotNameProps): React$1.JSX.Element;
declare function DrawerFooter({ className, slotName, ...props }: React$1.ComponentProps<'div'> & SlotNameProps): React$1.JSX.Element;
declare function DrawerTitle({ className, slotName, ...props }: React$1.ComponentProps<typeof Drawer$1.Title> & SlotNameProps): React$1.JSX.Element;
declare function DrawerDescription({ className, slotName, ...props }: React$1.ComponentProps<typeof Drawer$1.Description> & SlotNameProps): React$1.JSX.Element;

declare function DropdownMenu({ modal, slotName, ...props }: React$1.ComponentProps<typeof DropdownMenuPrimitive.Root> & SlotNameProps): React$1.JSX.Element;
declare function DropdownMenuPortal({ slotName, ...props }: React$1.ComponentProps<typeof DropdownMenuPrimitive.Portal> & SlotNameProps): React$1.JSX.Element;
declare function DropdownMenuTrigger({ slotName, ...props }: React$1.ComponentProps<typeof DropdownMenuPrimitive.Trigger> & SlotNameProps): React$1.JSX.Element;
declare function DropdownMenuContent({ className, sideOffset, slotName, container, ...props }: React$1.ComponentProps<typeof DropdownMenuPrimitive.Content> & SlotNameProps & {
    container?: HTMLElement | null;
}): React$1.JSX.Element;
declare function DropdownMenuGroup({ slotName, ...props }: React$1.ComponentProps<typeof DropdownMenuPrimitive.Group> & SlotNameProps): React$1.JSX.Element;
declare function DropdownMenuItem({ className, inset, variant, slotName, ...props }: React$1.ComponentProps<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean;
    variant?: 'default' | 'destructive';
} & SlotNameProps): React$1.JSX.Element;
declare function DropdownMenuCheckboxItem({ className, children, checked, slotName, ...props }: React$1.ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem> & SlotNameProps): React$1.JSX.Element;
declare function DropdownMenuRadioGroup({ slotName, ...props }: React$1.ComponentProps<typeof DropdownMenuPrimitive.RadioGroup> & SlotNameProps): React$1.JSX.Element;
declare function DropdownMenuRadioItem({ className, children, slotName, ...props }: React$1.ComponentProps<typeof DropdownMenuPrimitive.RadioItem> & SlotNameProps): React$1.JSX.Element;
declare function DropdownMenuLabel({ className, inset, slotName, ...props }: React$1.ComponentProps<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean;
} & SlotNameProps): React$1.JSX.Element;
declare function DropdownMenuSeparator({ className, slotName, ...props }: React$1.ComponentProps<typeof DropdownMenuPrimitive.Separator> & SlotNameProps): React$1.JSX.Element;
declare function DropdownMenuShortcut({ className, slotName, ...props }: React$1.ComponentProps<'span'> & SlotNameProps): React$1.JSX.Element;
declare function DropdownMenuSub({ slotName, ...props }: React$1.ComponentProps<typeof DropdownMenuPrimitive.Sub> & SlotNameProps): React$1.JSX.Element;
declare function DropdownMenuSubTrigger({ className, inset, children, slotName, ...props }: React$1.ComponentProps<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean;
} & SlotNameProps): React$1.JSX.Element;
declare function DropdownMenuSubContent({ className, slotName, ...props }: React$1.ComponentProps<typeof DropdownMenuPrimitive.SubContent> & SlotNameProps): React$1.JSX.Element;

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
declare function EmptyState({ icon: Icon, title, description, actions, compact, className, slotName, }: EmptyStateProps & SlotNameProps): React$1.JSX.Element;

interface FieldErrorProps extends React$1.ComponentProps<'p'> {
    message?: string;
}
declare function FieldError({ message, className, slotName, ...props }: FieldErrorProps & SlotNameProps): React$1.JSX.Element | null;

declare function FloatingSheetStack({ children, labels, slotName, }: {
    children: React$1.ReactNode;
    labels?: Partial<FloatingSheetLabels>;
} & SlotNameProps): React$1.JSX.Element;

declare function FloatingSheet({ open, onOpenChange, title, description, persistent, className, children, slotName, ...props }: Omit<React$1.ComponentProps<'section'>, 'title'> & {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title: React$1.ReactNode;
    description?: React$1.ReactNode;
    persistent?: boolean;
} & SlotNameProps): React$1.ReactPortal | null;
declare function FloatingSheetBody({ className, slotName, children, ...props }: React$1.ComponentProps<'div'> & SlotNameProps): React$1.JSX.Element;
declare function FloatingSheetFooter({ className, slotName, ...props }: React$1.ComponentProps<'div'> & SlotNameProps): React$1.JSX.Element;

declare const Form: <TFieldValues extends FieldValues, TContext = any, TTransformedValues = TFieldValues>({ children, watch, getValues, getFieldState, setError, clearErrors, setValue, setValues, trigger, formState, resetField, reset, handleSubmit, unregister, control, register, setFocus, subscribe, }: react_hook_form.FormProviderProps<TFieldValues, TContext, TTransformedValues>) => React$1.JSX.Element;
declare const FormField: <TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>({ ...props }: ControllerProps<TFieldValues, TName>) => React$1.JSX.Element;
declare const useFormField: () => {
    invalid: boolean;
    isDirty: boolean;
    isTouched: boolean;
    isValidating: boolean;
    error?: react_hook_form.FieldError;
    id: string;
    name: string;
    formItemId: string;
    formDescriptionId: string;
    formMessageId: string;
};
declare const FormItem: React$1.ForwardRefExoticComponent<React$1.HTMLAttributes<HTMLDivElement> & SlotNameProps & React$1.RefAttributes<HTMLDivElement>>;
declare const FormLabel: React$1.ForwardRefExoticComponent<Omit<LabelPrimitive.LabelProps & React$1.RefAttributes<HTMLLabelElement>, "ref"> & React$1.RefAttributes<HTMLLabelElement>>;
declare const FormControl: React$1.ForwardRefExoticComponent<Omit<React$1.HTMLAttributes<HTMLElement> & {
    children?: React$1.ReactNode;
} & React$1.RefAttributes<HTMLElement>, "ref"> & React$1.RefAttributes<HTMLElement>>;
declare const FormDescription: React$1.ForwardRefExoticComponent<React$1.HTMLAttributes<HTMLParagraphElement> & React$1.RefAttributes<HTMLParagraphElement>>;
declare const FormMessage: React$1.ForwardRefExoticComponent<React$1.HTMLAttributes<HTMLParagraphElement> & React$1.RefAttributes<HTMLParagraphElement>>;

declare function HoverCard({ slotName, ...props }: React$1.ComponentProps<typeof HoverCard$1.Root> & SlotNameProps): React$1.JSX.Element;
declare function HoverCardTrigger({ slotName, ...props }: React$1.ComponentProps<typeof HoverCard$1.Trigger> & SlotNameProps): React$1.JSX.Element;
declare function HoverCardContent({ className, align, sideOffset, slotName, container, ...props }: React$1.ComponentProps<typeof HoverCard$1.Content> & SlotNameProps & {
    container?: HTMLElement | null;
}): React$1.JSX.Element;

interface IconProps {
    iconNode?: IconComponent | null;
    className?: string;
}
declare function Icon({ iconNode: IconComponent, className }: IconProps): React$1.JSX.Element | null;

declare const InputOTP: React$1.ForwardRefExoticComponent<(Omit<Omit<React$1.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value" | "maxLength" | "textAlign" | "onComplete" | "pushPasswordManagerStrategy" | "pasteTransformer" | "containerClassName" | "noScriptCSSFallback"> & {
    value?: string;
    onChange?: (newValue: string) => unknown;
    maxLength: number;
    textAlign?: "left" | "center" | "right";
    onComplete?: (...args: any[]) => unknown;
    pushPasswordManagerStrategy?: "increase-width" | "none";
    pasteTransformer?: (pasted: string) => string;
    containerClassName?: string;
    noScriptCSSFallback?: string | null;
} & {
    render: (props: input_otp.RenderProps) => React$1.ReactNode;
    children?: never;
} & React$1.RefAttributes<HTMLInputElement>, "ref"> | Omit<Omit<React$1.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value" | "maxLength" | "textAlign" | "onComplete" | "pushPasswordManagerStrategy" | "pasteTransformer" | "containerClassName" | "noScriptCSSFallback"> & {
    value?: string;
    onChange?: (newValue: string) => unknown;
    maxLength: number;
    textAlign?: "left" | "center" | "right";
    onComplete?: (...args: any[]) => unknown;
    pushPasswordManagerStrategy?: "increase-width" | "none";
    pasteTransformer?: (pasted: string) => string;
    containerClassName?: string;
    noScriptCSSFallback?: string | null;
} & {
    render?: never;
    children: React$1.ReactNode;
} & React$1.RefAttributes<HTMLInputElement>, "ref">) & React$1.RefAttributes<HTMLInputElement>>;
declare const InputOTPGroup: React$1.ForwardRefExoticComponent<Omit<React$1.DetailedHTMLProps<React$1.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
declare const InputOTPSlot: React$1.ForwardRefExoticComponent<Omit<React$1.DetailedHTMLProps<React$1.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & {
    index: number;
} & SlotNameProps & React$1.RefAttributes<HTMLDivElement>>;
declare const InputOTPSeparator: React$1.ForwardRefExoticComponent<Omit<React$1.DetailedHTMLProps<React$1.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;

type LineChartProps = Omit<CartesianChartProps, 'barSize' | 'barRadius' | 'horizontal'>;
declare function LineChart({ slotName, ...props }: LineChartProps): React$1.JSX.Element;

declare function MenubarPortal({ slotName, container, ...props }: Omit<React$1.ComponentProps<typeof Menubar$1.Portal>, 'container'> & SlotNameProps & {
    container?: HTMLElement | null;
}): React$1.JSX.Element;

declare function Menubar({ className, slotName, ...props }: React$1.ComponentProps<typeof Menubar$1.Root> & SlotNameProps): React$1.JSX.Element;
declare function MenubarMenu({ slotName, ...props }: React$1.ComponentProps<typeof Menubar$1.Menu> & SlotNameProps): React$1.JSX.Element;
declare function MenubarGroup({ slotName, ...props }: React$1.ComponentProps<typeof Menubar$1.Group> & SlotNameProps): React$1.JSX.Element;
declare function MenubarRadioGroup({ slotName, ...props }: React$1.ComponentProps<typeof Menubar$1.RadioGroup> & SlotNameProps): React$1.JSX.Element;
declare function MenubarTrigger({ className, slotName, ...props }: React$1.ComponentProps<typeof Menubar$1.Trigger> & SlotNameProps): React$1.JSX.Element;
declare function MenubarContent({ className, align, alignOffset, sideOffset, slotName, ...props }: React$1.ComponentProps<typeof Menubar$1.Content> & SlotNameProps): React$1.JSX.Element;
declare function MenubarItem({ className, inset, variant, slotName, ...props }: React$1.ComponentProps<typeof Menubar$1.Item> & {
    inset?: boolean;
    variant?: 'default' | 'destructive';
} & SlotNameProps): React$1.JSX.Element;
declare function MenubarCheckboxItem({ className, children, checked, slotName, ...props }: React$1.ComponentProps<typeof Menubar$1.CheckboxItem> & SlotNameProps): React$1.JSX.Element;
declare function MenubarRadioItem({ className, children, slotName, ...props }: React$1.ComponentProps<typeof Menubar$1.RadioItem> & SlotNameProps): React$1.JSX.Element;
declare function MenubarLabel({ className, inset, slotName, ...props }: React$1.ComponentProps<typeof Menubar$1.Label> & {
    inset?: boolean;
} & SlotNameProps): React$1.JSX.Element;
declare function MenubarSeparator({ className, slotName, ...props }: React$1.ComponentProps<typeof Menubar$1.Separator> & SlotNameProps): React$1.JSX.Element;
declare function MenubarShortcut({ className, slotName, ...props }: React$1.ComponentProps<'span'> & SlotNameProps): React$1.JSX.Element;
declare function MenubarSub({ slotName, ...props }: React$1.ComponentProps<typeof Menubar$1.Sub> & SlotNameProps): React$1.JSX.Element;
declare function MenubarSubTrigger({ className, inset, children, slotName, ...props }: React$1.ComponentProps<typeof Menubar$1.SubTrigger> & {
    inset?: boolean;
} & SlotNameProps): React$1.JSX.Element;
declare function MenubarSubContent({ className, slotName, ...props }: React$1.ComponentProps<typeof Menubar$1.SubContent> & SlotNameProps): React$1.JSX.Element;

declare function NavigationMenu({ className, children, viewport, slotName, ...props }: React$1.ComponentProps<typeof NavigationMenuPrimitive.Root> & {
    viewport?: boolean;
} & SlotNameProps): React$1.JSX.Element;
declare function NavigationMenuList({ className, slotName, ...props }: React$1.ComponentProps<typeof NavigationMenuPrimitive.List> & SlotNameProps): React$1.JSX.Element;
declare function NavigationMenuItem({ className, slotName, ...props }: React$1.ComponentProps<typeof NavigationMenuPrimitive.Item> & SlotNameProps): React$1.JSX.Element;
declare const navigationMenuTriggerStyle: (props?: class_variance_authority_types.ClassProp | undefined) => string;
declare function NavigationMenuTrigger({ className, children, slotName, ...props }: React$1.ComponentProps<typeof NavigationMenuPrimitive.Trigger> & SlotNameProps): React$1.JSX.Element;
declare function NavigationMenuContent({ className, slotName, ...props }: React$1.ComponentProps<typeof NavigationMenuPrimitive.Content> & SlotNameProps): React$1.JSX.Element;
declare function NavigationMenuViewport({ className, slotName, ...props }: React$1.ComponentProps<typeof NavigationMenuPrimitive.Viewport> & SlotNameProps): React$1.JSX.Element;
declare function NavigationMenuLink({ className, slotName, ...props }: React$1.ComponentProps<typeof NavigationMenuPrimitive.Link> & SlotNameProps): React$1.JSX.Element;
declare function NavigationMenuIndicator({ className, slotName, ...props }: React$1.ComponentProps<typeof NavigationMenuPrimitive.Indicator> & SlotNameProps): React$1.JSX.Element;

declare function Pagination({ className, slotName, ...props }: React$1.ComponentProps<'nav'> & SlotNameProps): React$1.JSX.Element;
declare function PaginationContent({ className, slotName, ...props }: React$1.ComponentProps<'ul'> & SlotNameProps): React$1.JSX.Element;
declare function PaginationItem({ slotName, ...props }: React$1.ComponentProps<'li'> & SlotNameProps): React$1.JSX.Element;
type PaginationLinkProps = {
    isActive?: boolean;
} & Pick<React$1.ComponentProps<typeof Button>, 'size'> & React$1.ComponentProps<'a'>;
declare function PaginationLink({ className, isActive, size, slotName, ...props }: PaginationLinkProps & SlotNameProps): React$1.JSX.Element;
declare function PaginationPrevious({ className, ...props }: React$1.ComponentProps<typeof PaginationLink>): React$1.JSX.Element;
declare function PaginationNext({ className, ...props }: React$1.ComponentProps<typeof PaginationLink>): React$1.JSX.Element;
declare function PaginationEllipsis({ className, slotName, ...props }: React$1.ComponentProps<'span'> & SlotNameProps): React$1.JSX.Element;

interface PlaceholderPatternProps {
    className?: string;
}
declare function PlaceholderPattern({ className, slotName, }: PlaceholderPatternProps & SlotNameProps): React$1.JSX.Element;

declare const Popover: React$1.FC<Popover$1.PopoverProps>;
declare const PopoverTrigger: React$1.ForwardRefExoticComponent<Popover$1.PopoverTriggerProps & React$1.RefAttributes<HTMLButtonElement>>;
declare const PopoverAnchor: React$1.ForwardRefExoticComponent<Popover$1.PopoverAnchorProps & React$1.RefAttributes<HTMLDivElement>>;
declare const PopoverContent: React$1.ForwardRefExoticComponent<Omit<Popover$1.PopoverContentProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & SlotNameProps & {
    container?: HTMLElement | null;
} & React$1.RefAttributes<HTMLDivElement>>;

declare function Progress({ className, value, slotName, ...props }: React$1.ComponentProps<typeof Progress$1.Root> & SlotNameProps): React$1.JSX.Element;

declare function RadioGroup({ className, slotName, ...props }: React$1.ComponentProps<typeof RadioGroup$1.Root> & SlotNameProps): React$1.JSX.Element;
declare function RadioGroupItem({ className, slotName, ...props }: React$1.ComponentProps<typeof RadioGroup$1.Item> & SlotNameProps): React$1.JSX.Element;

declare function ResizablePanelGroup({ className, slotName, ...props }: ResizablePrimitive.GroupProps & SlotNameProps): React$1.JSX.Element;
declare function ResizablePanel({ slotName, ...props }: ResizablePrimitive.PanelProps & SlotNameProps): React$1.JSX.Element;
declare function ResizableHandle({ withHandle, className, slotName, ...props }: ResizablePrimitive.SeparatorProps & {
    withHandle?: boolean;
} & SlotNameProps): React$1.JSX.Element;

declare const ScrollArea: React$1.ForwardRefExoticComponent<Omit<ScrollAreaPrimitive.ScrollAreaProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & SlotNameProps & React$1.RefAttributes<HTMLDivElement>>;
declare const ScrollBar: React$1.ForwardRefExoticComponent<Omit<ScrollAreaPrimitive.ScrollAreaScrollbarProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & SlotNameProps & React$1.RefAttributes<HTMLDivElement>>;

declare function Select({ slotName, ...props }: React$1.ComponentProps<typeof SelectPrimitive.Root> & SlotNameProps): React$1.JSX.Element;
declare function SelectGroup({ slotName, ...props }: React$1.ComponentProps<typeof SelectPrimitive.Group> & SlotNameProps): React$1.JSX.Element;
declare function SelectValue({ slotName, ...props }: React$1.ComponentProps<typeof SelectPrimitive.Value> & SlotNameProps): React$1.JSX.Element;
declare function SelectTrigger({ className, children, slotName, ...props }: React$1.ComponentProps<typeof SelectPrimitive.Trigger> & SlotNameProps): React$1.JSX.Element;
declare function SelectContent({ className, children, position, slotName, container, ...props }: React$1.ComponentProps<typeof SelectPrimitive.Content> & SlotNameProps & {
    container?: HTMLElement | null;
}): React$1.JSX.Element;
declare function SelectLabel({ className, slotName, ...props }: React$1.ComponentProps<typeof SelectPrimitive.Label> & SlotNameProps): React$1.JSX.Element;
declare function SelectItem({ className, children, slotName, ...props }: React$1.ComponentProps<typeof SelectPrimitive.Item> & SlotNameProps): React$1.JSX.Element;
declare function SelectSeparator({ className, slotName, ...props }: React$1.ComponentProps<typeof SelectPrimitive.Separator> & SlotNameProps): React$1.JSX.Element;
declare function SelectScrollUpButton({ className, slotName, ...props }: React$1.ComponentProps<typeof SelectPrimitive.ScrollUpButton> & SlotNameProps): React$1.JSX.Element;
declare function SelectScrollDownButton({ className, slotName, ...props }: React$1.ComponentProps<typeof SelectPrimitive.ScrollDownButton> & SlotNameProps): React$1.JSX.Element;

declare function Sheet({ preserveScroll, onOpenChange: onOpenChangeProp, slotName, ...props }: React$1.ComponentProps<typeof SheetPrimitive.Root> & {
    preserveScroll?: boolean;
} & SlotNameProps): React$1.JSX.Element;
declare function SheetTrigger({ slotName, ...props }: React$1.ComponentProps<typeof SheetPrimitive.Trigger> & SlotNameProps): React$1.JSX.Element;
declare function SheetClose({ slotName, ...props }: React$1.ComponentProps<typeof SheetPrimitive.Close> & SlotNameProps): React$1.JSX.Element;
declare function SheetContent({ className, children, side, slotName, ...props }: React$1.ComponentProps<typeof SheetPrimitive.Content> & {
    side?: 'top' | 'right' | 'bottom' | 'left';
} & SlotNameProps): React$1.JSX.Element;
declare function SheetHeader({ className, slotName, ...props }: React$1.ComponentProps<'div'> & SlotNameProps): React$1.JSX.Element;
declare function SheetFooter({ className, slotName, ...props }: React$1.ComponentProps<'div'> & SlotNameProps): React$1.JSX.Element;
declare function SheetTitle({ className, slotName, ...props }: React$1.ComponentProps<typeof SheetPrimitive.Title> & SlotNameProps): React$1.JSX.Element;
declare function SheetDescription({ className, slotName, ...props }: React$1.ComponentProps<typeof SheetPrimitive.Description> & SlotNameProps): React$1.JSX.Element;

declare function Skeleton({ className, slotName, ...props }: React.ComponentProps<'div'> & SlotNameProps): React$1.JSX.Element;

declare function Slider({ className, defaultValue, value, min, max, slotName, ...props }: React$1.ComponentProps<typeof Slider$1.Root> & SlotNameProps): React$1.JSX.Element;

declare const Toaster: ({ theme, closeButton, toastOptions, ...props }: ToasterProps) => React$1.JSX.Element;

declare const statusBadgeVariants: (props?: ({
    status?: "success" | "warning" | "info" | "neutral" | "danger" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type StatusBadgeStatus = NonNullable<VariantProps<typeof statusBadgeVariants>['status']>;
interface StatusBadgeProps extends Omit<React$1.ComponentProps<typeof Badge>, 'variant'>, VariantProps<typeof statusBadgeVariants> {
    dot?: boolean;
}
declare function StatusBadge({ className, status, dot, children, slotName, ...props }: StatusBadgeProps & SlotNameProps): React$1.JSX.Element;

declare const Switch: React$1.ForwardRefExoticComponent<Omit<SwitchPrimitives.SwitchProps & React$1.RefAttributes<HTMLButtonElement>, "ref"> & SlotNameProps & React$1.RefAttributes<HTMLButtonElement>>;

interface TableProps extends React$1.HTMLAttributes<HTMLTableElement>, SlotNameProps {
    bleed?: boolean;
}
declare const Table: React$1.ForwardRefExoticComponent<TableProps & React$1.RefAttributes<HTMLTableElement>>;
declare const TableHeader: React$1.ForwardRefExoticComponent<React$1.HTMLAttributes<HTMLTableSectionElement> & React$1.RefAttributes<HTMLTableSectionElement>>;
declare const TableBody: React$1.ForwardRefExoticComponent<React$1.HTMLAttributes<HTMLTableSectionElement> & React$1.RefAttributes<HTMLTableSectionElement>>;
declare const TableFooter: React$1.ForwardRefExoticComponent<React$1.HTMLAttributes<HTMLTableSectionElement> & React$1.RefAttributes<HTMLTableSectionElement>>;
declare const TableRow: React$1.ForwardRefExoticComponent<React$1.HTMLAttributes<HTMLTableRowElement> & React$1.RefAttributes<HTMLTableRowElement>>;
declare const TableHead: React$1.ForwardRefExoticComponent<React$1.ThHTMLAttributes<HTMLTableCellElement> & React$1.RefAttributes<HTMLTableCellElement>>;
declare const TableCell: React$1.ForwardRefExoticComponent<React$1.TdHTMLAttributes<HTMLTableCellElement> & React$1.RefAttributes<HTMLTableCellElement>>;
declare const TableCaption: React$1.ForwardRefExoticComponent<React$1.HTMLAttributes<HTMLTableCaptionElement> & React$1.RefAttributes<HTMLTableCaptionElement>>;

declare const Tabs: React$1.ForwardRefExoticComponent<Omit<TabsPrimitive.TabsProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & SlotNameProps & React$1.RefAttributes<HTMLDivElement>>;
declare const TabsList: React$1.ForwardRefExoticComponent<Omit<TabsPrimitive.TabsListProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & SlotNameProps & React$1.RefAttributes<HTMLDivElement>>;
declare const TabsTrigger: React$1.ForwardRefExoticComponent<Omit<TabsPrimitive.TabsTriggerProps & React$1.RefAttributes<HTMLButtonElement>, "ref"> & SlotNameProps & React$1.RefAttributes<HTMLButtonElement>>;
declare const TabsContent: React$1.ForwardRefExoticComponent<Omit<TabsPrimitive.TabsContentProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & SlotNameProps & {
    padding?: "default" | "none";
} & React$1.RefAttributes<HTMLDivElement>>;

declare const textLinkVariants: (props?: ({
    variant?: "default" | "muted" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface TextLinkProps extends React$1.ComponentProps<'a'>, VariantProps<typeof textLinkVariants> {
    asChild?: boolean;
}
declare function TextLink({ className, variant, asChild, slotName, ...props }: TextLinkProps & SlotNameProps): React$1.JSX.Element;

declare const Textarea: React$1.ForwardRefExoticComponent<Omit<React$1.ClassAttributes<HTMLTextAreaElement> & React$1.TextareaHTMLAttributes<HTMLTextAreaElement> & SlotNameProps, "ref"> & React$1.RefAttributes<HTMLTextAreaElement>>;

type ToastId = number | string;
interface ToastActionDescriptor {
    label: React$1.ReactNode;
    onClick?: (event: React$1.MouseEvent<HTMLElement>) => unknown;
    onError?: (error: unknown) => void;
    href?: string;
    target?: React$1.HTMLAttributeAnchorTarget;
    rel?: string;
    dismiss?: boolean;
    className?: string;
}
type SonnerOptions = Parameters<typeof toast$1>[1];
type ToastOptions = Omit<NonNullable<SonnerOptions>, 'action' | 'cancel'> & {
    action?: ToastActionDescriptor | React$1.ReactNode;
    cancel?: ToastActionDescriptor | React$1.ReactNode;
};
type Message = Parameters<typeof toast$1>[0];
type Variant = 'success' | 'info' | 'warning' | 'error' | 'loading' | 'message';
type ToastFn = (message: Message, options?: ToastOptions) => ToastId;
type Toast = ToastFn & Omit<typeof toast$1, Variant> & {
    [Name in Variant]: ToastFn;
};
declare const toast: Toast;

declare const toggleVariants: (props?: ({
    variant?: "default" | "outline" | null | undefined;
    size?: "sm" | "default" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
declare function Toggle({ className, variant, size, slotName, ...props }: React$1.ComponentProps<typeof TogglePrimitive.Root> & VariantProps<typeof toggleVariants> & SlotNameProps): React$1.JSX.Element;

declare function ToggleGroup({ className, variant, size, children, slotName, ...props }: React$1.ComponentProps<typeof ToggleGroupPrimitive.Root> & VariantProps<typeof toggleVariants> & SlotNameProps): React$1.JSX.Element;
declare function ToggleGroupItem({ className, children, variant, size, slotName, ...props }: React$1.ComponentProps<typeof ToggleGroupPrimitive.Item> & VariantProps<typeof toggleVariants> & SlotNameProps): React$1.JSX.Element;

export { AUTOSAVE_DELAY, Accordion, AccordionContent, AccordionItem, AccordionTrigger, AkiraMark, type AkiraMarkProps, AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogMedia, AlertDialogOverlay, AlertDialogPortal, AlertDialogTitle, AlertDialogTrigger, AreaChart, type AreaChartProps, AspectRatio, type AutosaveStatus, Avatar, AvatarFallback, AvatarImage, Badge, BarChart, type BarChartProps, Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, Button, CHART_PALETTE, Calendar, CalendarDayButton, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Carousel, type CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type ChartAxisFormat, type ChartConfig, ChartContainer, type ChartCurve, type ChartDatum, ChartLegend, ChartLegendContent, type ChartScale, type ChartSeries, type ChartSeriesInput, ChartStyle, ChartTooltip, ChartTooltipContent, Checkbox, Collapsible, CollapsibleContent, CollapsibleTrigger, Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut, ContextMenu, ContextMenuCheckboxItem, ContextMenuContent, ContextMenuGroup, ContextMenuItem, ContextMenuLabel, ContextMenuPortal, ContextMenuRadioGroup, ContextMenuRadioItem, ContextMenuSeparator, ContextMenuShortcut, ContextMenuSub, ContextMenuSubContent, ContextMenuSubTrigger, ContextMenuTrigger, Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger, DonutChart, type DonutChartProps, Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerPortal, DrawerTitle, DrawerTrigger, DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger, EmptyState, type EmptyStateLabels, type EmptyStateProps, FieldError, FloatingSheet, FloatingSheetBody, FloatingSheetFooter, FloatingSheetLabels, FloatingSheetStack, Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, HoverCard, HoverCardContent, HoverCardTrigger, Icon, IconComponent, InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot, LineChart, type LineChartProps, Menubar, MenubarCheckboxItem, MenubarContent, MenubarGroup, MenubarItem, MenubarLabel, MenubarMenu, MenubarPortal, MenubarRadioGroup, MenubarRadioItem, MenubarSeparator, MenubarShortcut, MenubarSub, MenubarSubContent, MenubarSubTrigger, MenubarTrigger, NavigationMenu, NavigationMenuContent, NavigationMenuIndicator, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, NavigationMenuViewport, Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, PlaceholderPattern, Popover, PopoverAnchor, PopoverContent, PopoverTrigger, Progress, RadioGroup, RadioGroupItem, ResizableHandle, ResizablePanel, ResizablePanelGroup, ScrollArea, ScrollBar, Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectScrollDownButton, SelectScrollUpButton, SelectSeparator, SelectTrigger, SelectValue, Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger, Skeleton, Slider, SlotNameProps, Spinner, type SpinnerProps, StatusBadge, type StatusBadgeProps, type StatusBadgeStatus, Switch, Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, type TableProps, TableRow, Tabs, TabsContent, TabsList, TabsTrigger, TextLink, type TextLinkProps, Textarea, type ToastActionDescriptor, type ToastOptions, Toaster, Toggle, ToggleGroup, ToggleGroupItem, type UseAutosaveOptions, type UseAutosaveResult, type UseConfirmDialogOptions, badgeVariants, cardVariants, chartColorVariable, cn, cssVariableKey, emptyStateLabels, navigationMenuTriggerStyle, paletteColor, spinnerVariants, statusBadgeVariants, textLinkVariants, toast, toggleVariants, useAutosave, useConfirmDialog, useFormField };
