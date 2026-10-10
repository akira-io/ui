import { ClassValue } from 'clsx';
import { Q as FlatSurfaceProps, R as DateTimePickerLabels, T as FloatingSheetLabels, V as TimePickerLabels } from './context-6qxTv7h-.js';
export { W as Alert, X as AlertDescription, Y as AlertLabels, Z as AlertTitle, _ as AppearanceToggle, $ as AppearanceToggleLabels, a0 as AppearanceToggleProps, a1 as Breadcrumb, a2 as BreadcrumbEllipsis, a3 as BreadcrumbItem, a4 as BreadcrumbLabels, a5 as BreadcrumbLink, a6 as BreadcrumbList, a7 as BreadcrumbPage, a8 as BreadcrumbSeparator, a9 as Carousel, aa as CarouselApi, ab as CarouselContent, ac as CarouselItem, ad as CarouselLabels, ae as CarouselNext, af as CarouselPrevious, ag as Combobox, ah as ComboboxLabels, ai as ComboboxOption, aj as ComboboxProps, ak as Command, al as CommandDialog, am as CommandEmpty, an as CommandGroup, ao as CommandInput, ap as CommandItem, aq as CommandList, ar as CommandSeparator, as as CommandShortcut, at as ConfirmDialog, au as ConfirmDialogLabels, av as ConfirmDialogProps, aw as CopyButton, C as CopyButtonLabels, ax as CopyButtonProps, ay as DatePicker, az as DatePickerLabels, aA as DatePickerProps, aB as DateRangeFilter, aC as DateRangeFilterLabels, aD as DateRangeFilterProps, aE as Dialog, aF as DialogClose, aG as DialogContent, aH as DialogDescription, aI as DialogFooter, aJ as DialogHeader, aK as DialogLabels, aL as DialogOverlay, aM as DialogPortal, aN as DialogTitle, aO as DialogTrigger, aP as Dropzone, aQ as DropzoneLabels, aR as DropzoneProps, aS as EmptyState, aT as EmptyStateLabels, aU as EmptyStateProps, aV as Field, aW as FieldContextValue, aX as FieldControl, aY as FieldDescription, aZ as FieldGroup, a_ as FieldLabel, a$ as FieldLabels, b0 as FieldOrientation, b1 as FieldProps, b2 as Label, b3 as Pagination, b4 as PaginationContent, b5 as PaginationEllipsis, b6 as PaginationItem, b7 as PaginationLabels, b8 as PaginationLink, b9 as PaginationNext, ba as PaginationPrevious, bb as PasswordInput, bc as PasswordInputLabels, bd as PasswordInputProps, be as SAVED_DURATION, bf as SaveStatus, bg as SaveStatusLabels, bh as SaveStatusProps, bi as SaveStatusState, bj as Sheet, bk as SheetClose, bl as SheetContent, bm as SheetDescription, bn as SheetFooter, bo as SheetHeader, bp as SheetLabels, bq as SheetTitle, br as SheetTrigger, bs as Spinner, bt as SpinnerLabels, bu as SpinnerProps, S as SurfaceProps, U as UiLabelSections, G as UiLabels, H as UiLocaleProvider, bv as alertDefaultLabels, bw as appearanceToggleDefaultLabels, bx as breadcrumbDefaultLabels, by as carouselDefaultLabels, bz as comboboxDefaultLabels, bA as confirmDialogDefaultLabels, bB as controlFill, bC as copyButtonLabels, bD as datePickerDefaultLabels, bE as dateRangeFilterDefaultLabels, bF as dateTimePickerDefaultLabels, bG as dialogDefaultLabels, bH as dropzoneDefaultLabels, bI as elevatedSurface, bJ as emptyStateLabels, bK as fieldLabels, bL as floatingSheetDefaultLabels, bM as focusRing, bN as menuHighlight, bO as nestedEdgeToEdge, bP as nestedRadius, bQ as nestedSurfaceReset, bR as paginationDefaultLabels, bS as passwordInputDefaultLabels, bT as recessedSurface, bU as saveStatusLabels, bV as sheetDefaultLabels, bW as spinnerDefaultLabels, bX as spinnerVariants, bY as surface, bZ as timePickerDefaultLabels, b_ as useField, M as useUiDateLocale, N as useUiLabels, O as useUiLocale, P as useUiNumberLocale } from './context-6qxTv7h-.js';
import * as React$1 from 'react';
import { ReactNode, ComponentProps } from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { S as SlotNameProps, I as IconComponent } from './types-Be72a3UT.js';
export { a as LucideIcon, U as UrlLike } from './types-Be72a3UT.js';
import { AlertDialog as AlertDialog$1, AspectRatio as AspectRatio$1, ContextMenu as ContextMenu$1, HoverCard as HoverCard$1, Menubar as Menubar$1, Popover as Popover$1, Progress as Progress$1, RadioGroup as RadioGroup$1, Slider as Slider$1 } from 'radix-ui';
import { B as Button } from './settings-layout-RO7EhmRk.js';
export { a as ButtonProps, b as ButtonTone, I as Input, S as Separator, c as Sidebar, d as SidebarContent, e as SidebarFooter, f as SidebarGroup, g as SidebarGroupAction, h as SidebarGroupContent, i as SidebarGroupLabel, j as SidebarHeader, k as SidebarInput, l as SidebarInset, m as SidebarLabels, n as SidebarMenu, o as SidebarMenuAction, p as SidebarMenuBadge, q as SidebarMenuButton, r as SidebarMenuItem, s as SidebarMenuSkeleton, t as SidebarMenuSub, u as SidebarMenuSubButton, v as SidebarMenuSubItem, w as SidebarProvider, x as SidebarRail, y as SidebarSeparator, z as SidebarTrigger, T as Tooltip, A as TooltipContent, C as TooltipProvider, D as TooltipTrigger, E as buttonVariants, F as sidebarDefaultLabels, G as useSidebar } from './settings-layout-RO7EhmRk.js';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import * as class_variance_authority_types from 'class-variance-authority/types';
import { VariantProps } from 'class-variance-authority';
import { DayPicker, DayButton } from 'react-day-picker';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';
import { Drawer as Drawer$1 } from 'vaul';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import * as input_otp from 'input-otp';
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';
import * as ResizablePrimitive from 'react-resizable-panels';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import * as SelectPrimitive from '@radix-ui/react-select';
import { ToasterProps, toast as toast$1 } from 'sonner';
import * as SwitchPrimitives from '@radix-ui/react-switch';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import * as TogglePrimitive from '@radix-ui/react-toggle';
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import 'lucide-react';
import './types-0apg3aE-.js';
import './types-ClE3iWNv.js';
import 'embla-carousel-react';
import './json-viewer-NgFIbdeW.js';
import 'cmdk';
import './data-table-labels-xwJ69rBt.js';
import 'react-dropzone';
import './labels-CQD-C5kN.js';
import '@radix-ui/react-slot';
import '@radix-ui/react-label';
import '@radix-ui/react-dialog';
import './user-menu-content-Dv0YifkI.js';
import 'date-fns';
import '@radix-ui/react-separator';
import '@radix-ui/react-tooltip';

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

declare function Calendar({ className, classNames, showOutsideDays, captionLayout, buttonVariant, formatters, components, slotName, locale, ...props }: React$1.ComponentProps<typeof DayPicker> & {
    buttonVariant?: React$1.ComponentProps<typeof Button>['variant'];
} & SlotNameProps): React$1.JSX.Element;
declare function CalendarDayButton({ className, day, modifiers, ...props }: React$1.ComponentProps<typeof DayButton>): React$1.JSX.Element;

declare const cardVariants: (props?: ({
    variant?: "default" | "subtle" | "solid" | "outlined" | null | undefined;
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

declare function Checkbox({ className, slotName, ...props }: React$1.ComponentProps<typeof CheckboxPrimitive.Root> & SlotNameProps): React$1.JSX.Element;

declare function Collapsible({ slotName, ...props }: React.ComponentProps<typeof CollapsiblePrimitive.Root> & SlotNameProps): React$1.JSX.Element;
declare function CollapsibleTrigger({ slotName, ...props }: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleTrigger> & SlotNameProps): React$1.JSX.Element;
declare function CollapsibleContent({ slotName, ...props }: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleContent> & SlotNameProps): React$1.JSX.Element;

declare function ContextMenu({ slotName, ...props }: React$1.ComponentProps<typeof ContextMenu$1.Root> & SlotNameProps): React$1.JSX.Element;
declare function ContextMenuTrigger({ slotName, ...props }: React$1.ComponentProps<typeof ContextMenu$1.Trigger> & SlotNameProps): React$1.JSX.Element;
declare function ContextMenuGroup({ slotName, ...props }: React$1.ComponentProps<typeof ContextMenu$1.Group> & SlotNameProps): React$1.JSX.Element;
declare function ContextMenuPortal({ slotName, ...props }: React$1.ComponentProps<typeof ContextMenu$1.Portal> & SlotNameProps): React$1.JSX.Element;
declare function ContextMenuSub({ slotName, ...props }: React$1.ComponentProps<typeof ContextMenu$1.Sub> & SlotNameProps): React$1.JSX.Element;
declare function ContextMenuRadioGroup({ slotName, ...props }: React$1.ComponentProps<typeof ContextMenu$1.RadioGroup> & SlotNameProps): React$1.JSX.Element;
declare function ContextMenuSubTrigger({ className, inset, children, slotName, ...props }: React$1.ComponentProps<typeof ContextMenu$1.SubTrigger> & {
    inset?: boolean;
} & SlotNameProps): React$1.JSX.Element;
declare function ContextMenuSubContent({ className, slotName, container, ...props }: React$1.ComponentProps<typeof ContextMenu$1.SubContent> & SlotNameProps & {
    container?: HTMLElement | null;
}): React$1.JSX.Element;
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

type HourCycle = 12 | 24;

type DateTimePickerTriggerProps = Omit<ComponentProps<'button'>, 'value' | 'defaultValue' | 'onChange' | 'type' | 'children'>;
interface DateTimePickerProps extends Partial<DateTimePickerLabels>, DateTimePickerTriggerProps {
    value?: Date;
    defaultValue?: Date;
    onChange?: (value: Date | undefined) => void;
    minDate?: Date;
    maxDate?: Date;
    disabledDays?: (date: Date) => boolean;
    withSeconds?: boolean;
    hourCycle?: HourCycle;
    minuteStep?: number;
    clearable?: boolean;
    invalid?: boolean;
    required?: boolean;
    name?: string;
    formatDateTime?: (value: Date) => string;
}
declare function DateTimePicker(props: DateTimePickerProps & SlotNameProps): React$1.JSX.Element;

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
declare function DropdownMenuSubContent({ className, slotName, container, ...props }: React$1.ComponentProps<typeof DropdownMenuPrimitive.SubContent> & SlotNameProps & {
    container?: HTMLElement | null;
}): React$1.JSX.Element;

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

declare const InputOTP: React$1.ForwardRefExoticComponent<(Omit<Omit<React$1.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange" | "maxLength" | "textAlign" | "onComplete" | "pushPasswordManagerStrategy" | "pasteTransformer" | "containerClassName" | "noScriptCSSFallback"> & {
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
} & React$1.RefAttributes<HTMLInputElement>, "ref"> | Omit<Omit<React$1.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange" | "maxLength" | "textAlign" | "onComplete" | "pushPasswordManagerStrategy" | "pasteTransformer" | "containerClassName" | "noScriptCSSFallback"> & {
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
declare function MenubarSubContent({ className, slotName, container, ...props }: React$1.ComponentProps<typeof Menubar$1.SubContent> & SlotNameProps & {
    container?: HTMLElement | null;
}): React$1.JSX.Element;

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

declare function Skeleton({ className, slotName, ...props }: React.ComponentProps<'div'> & SlotNameProps): React$1.JSX.Element;

declare function Slider({ className, defaultValue, value, min, max, slotName, ...props }: React$1.ComponentProps<typeof Slider$1.Root> & SlotNameProps): React$1.JSX.Element;

declare const Toaster: ({ theme, closeButton, toastOptions, ...props }: ToasterProps) => React$1.JSX.Element;

declare const statusBadgeVariants: (props?: ({
    status?: "warning" | "info" | "success" | "neutral" | "danger" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type StatusBadgeStatus = NonNullable<VariantProps<typeof statusBadgeVariants>['status']>;
interface StatusBadgeProps extends Omit<React$1.ComponentProps<typeof Badge>, 'variant'>, VariantProps<typeof statusBadgeVariants> {
    dot?: boolean;
}
declare function StatusBadge({ className, status, dot, children, slotName, ...props }: StatusBadgeProps & SlotNameProps): React$1.JSX.Element;

declare const Switch: React$1.ForwardRefExoticComponent<Omit<SwitchPrimitives.SwitchProps & React$1.RefAttributes<HTMLButtonElement>, "ref"> & SlotNameProps & React$1.RefAttributes<HTMLButtonElement>>;

interface TableProps extends React$1.HTMLAttributes<HTMLTableElement>, SlotNameProps {
    bleed?: boolean;
    scrollRef?: React$1.Ref<HTMLDivElement>;
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

type TimePickerGroupProps = Omit<ComponentProps<'div'>, 'onChange' | 'defaultValue' | 'children' | 'role'>;
interface TimePickerProps extends Partial<TimePickerLabels>, TimePickerGroupProps {
    value?: string;
    defaultValue?: string;
    onChange?: (value: string | undefined) => void;
    withSeconds?: boolean;
    hourCycle?: HourCycle;
    minuteStep?: number;
    minTime?: string;
    maxTime?: string;
    clearable?: boolean;
    invalid?: boolean;
    required?: boolean;
    disabled?: boolean;
    name?: string;
}
declare function TimePicker(props: TimePickerProps & SlotNameProps): React$1.JSX.Element;

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
    size?: "default" | "sm" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
declare function Toggle({ className, variant, size, slotName, ...props }: React$1.ComponentProps<typeof TogglePrimitive.Root> & VariantProps<typeof toggleVariants> & SlotNameProps): React$1.JSX.Element;

declare function ToggleGroup({ className, variant, size, children, slotName, ...props }: React$1.ComponentProps<typeof ToggleGroupPrimitive.Root> & VariantProps<typeof toggleVariants> & SlotNameProps): React$1.JSX.Element;
declare function ToggleGroupItem({ className, children, variant, size, slotName, ...props }: React$1.ComponentProps<typeof ToggleGroupPrimitive.Item> & VariantProps<typeof toggleVariants> & SlotNameProps): React$1.JSX.Element;

export { AUTOSAVE_DELAY, Accordion, AccordionContent, AccordionItem, AccordionTrigger, AkiraMark, type AkiraMarkProps, AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogMedia, AlertDialogOverlay, AlertDialogPortal, AlertDialogTitle, AlertDialogTrigger, AspectRatio, type AutosaveStatus, Avatar, AvatarFallback, AvatarImage, Badge, Button, Calendar, CalendarDayButton, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Checkbox, Collapsible, CollapsibleContent, CollapsibleTrigger, ContextMenu, ContextMenuCheckboxItem, ContextMenuContent, ContextMenuGroup, ContextMenuItem, ContextMenuLabel, ContextMenuPortal, ContextMenuRadioGroup, ContextMenuRadioItem, ContextMenuSeparator, ContextMenuShortcut, ContextMenuSub, ContextMenuSubContent, ContextMenuSubTrigger, ContextMenuTrigger, DateTimePicker, DateTimePickerLabels, type DateTimePickerProps, Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerPortal, DrawerTitle, DrawerTrigger, DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger, FieldError, FloatingSheet, FloatingSheetBody, FloatingSheetFooter, FloatingSheetLabels, FloatingSheetStack, HoverCard, HoverCardContent, HoverCardTrigger, Icon, IconComponent, InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot, Menubar, MenubarCheckboxItem, MenubarContent, MenubarGroup, MenubarItem, MenubarLabel, MenubarMenu, MenubarPortal, MenubarRadioGroup, MenubarRadioItem, MenubarSeparator, MenubarShortcut, MenubarSub, MenubarSubContent, MenubarSubTrigger, MenubarTrigger, NavigationMenu, NavigationMenuContent, NavigationMenuIndicator, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, NavigationMenuViewport, PlaceholderPattern, Popover, PopoverAnchor, PopoverContent, PopoverTrigger, Progress, RadioGroup, RadioGroupItem, ResizableHandle, ResizablePanel, ResizablePanelGroup, ScrollArea, ScrollBar, Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectScrollDownButton, SelectScrollUpButton, SelectSeparator, SelectTrigger, SelectValue, Skeleton, Slider, SlotNameProps, StatusBadge, type StatusBadgeProps, type StatusBadgeStatus, Switch, Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, type TableProps, TableRow, Tabs, TabsContent, TabsList, TabsTrigger, TextLink, type TextLinkProps, Textarea, TimePicker, TimePickerLabels, type TimePickerProps, type ToastActionDescriptor, type ToastOptions, Toaster, Toggle, ToggleGroup, ToggleGroupItem, type UseAutosaveOptions, type UseAutosaveResult, type UseConfirmDialogOptions, badgeVariants, cardVariants, cn, navigationMenuTriggerStyle, statusBadgeVariants, textLinkVariants, toast, toggleVariants, useAutosave, useConfirmDialog };
