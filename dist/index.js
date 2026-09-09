'use client';

"use client";
import {
  Calendar,
  CalendarDayButton,
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
  ConfirmDialog,
  FloatingSheet,
  FloatingSheetBody,
  FloatingSheetFooter,
  FloatingSheetStack,
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea,
  confirmDialogDefaultLabels
} from "./chunk-RHM4U7US.js";
import {
  CopyButton,
  copyButtonLabels
} from "./chunk-4DMNLMQR.js";
import {
  Toggle,
  toggleVariants
} from "./chunk-GR67YVDF.js";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger
} from "./chunk-VSDPJW6I.js";
import {
  useAppearance
} from "./chunk-IQMRJXEO.js";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  cardVariants
} from "./chunk-VLWHKRSD.js";
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Checkbox,
  Field,
  FieldControl,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  PasswordInput,
  alertDefaultLabels,
  passwordInputDefaultLabels,
  useField
} from "./chunk-746HPI7F.js";
import {
  UiLocaleProvider,
  useUiLabels,
  useUiLocale
} from "./chunk-ZZDRO234.js";
import {
  Label
} from "./chunk-JKKXBCNI.js";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  Icon,
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  Skeleton,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  useSidebar
} from "./chunk-E64424RA.js";
import {
  floatingSheetDefaultLabels,
  useSheetPortalContainer
} from "./chunk-EXTOGROG.js";
import {
  Input,
  Separator
} from "./chunk-OTLBSTHU.js";
import {
  Button,
  Spinner,
  buttonVariants,
  cn,
  compactRadius,
  controlFill,
  elevatedSurface,
  fieldFocus,
  fieldSurface,
  flatSurface,
  floatingSurface,
  focusRing,
  menuHighlight,
  menuSurface,
  modalSurface,
  nestedEdgeToEdge,
  nestedRadius,
  nestedSurfaceReset,
  panelSurface,
  recessedSurface,
  spinnerVariants,
  surface
} from "./chunk-33SBGSQF.js";
import {
  formatBytes
} from "./chunk-BW5T7MUK.js";

// src/lib/chart-series.ts
var CHART_PALETTE = [
  "var(--color-chart-1)",
  "var(--color-chart-2)",
  "var(--color-chart-3)",
  "var(--color-chart-4)",
  "var(--color-chart-5)",
  "var(--color-chart-6)",
  "var(--color-chart-7)",
  "var(--color-chart-8)"
];
function paletteColor(index) {
  return CHART_PALETTE[index % CHART_PALETTE.length];
}
function cssVariableKey(key) {
  return key.replace(/[^A-Za-z0-9_-]/g, "-");
}
function chartColorVariable(key) {
  return `var(--color-${cssVariableKey(key)})`;
}
var UNSAFE_COLOR = /[<>{};@\\]/;
function safeChartColor(color) {
  return UNSAFE_COLOR.test(color) ? null : color;
}
function uniqueVariableKeys(keys) {
  const taken = /* @__PURE__ */ new Set();
  return keys.map((key) => {
    const base2 = cssVariableKey(key);
    let candidate = base2;
    let suffix = 2;
    while (taken.has(candidate)) {
      candidate = `${base2}-${suffix}`;
      suffix += 1;
    }
    taken.add(candidate);
    return candidate;
  });
}
function resolveChartSeries(series, config = {}) {
  const items = series.map(
    (entry) => typeof entry === "string" ? { key: entry } : entry
  );
  const variableKeys = uniqueVariableKeys(items.map((item) => item.key));
  const resolved = items.map((item, index) => {
    const fromConfig = config[item.key];
    const named = item.color ?? fromConfig?.color;
    return {
      key: item.key,
      variableKey: variableKeys[index],
      label: item.label ?? fromConfig?.label ?? item.key,
      color: named ?? paletteColor(index),
      named: named !== void 0,
      stackId: item.stackId
    };
  });
  const merged = { ...config };
  for (const item of resolved) {
    const entry = config[item.key];
    const theme = item.named ? void 0 : entry?.theme;
    const resolvedEntry = theme ? { icon: entry?.icon, label: item.label, theme } : { icon: entry?.icon, label: item.label, color: item.color };
    merged[item.variableKey] = resolvedEntry;
    merged[item.key] = resolvedEntry;
  }
  return { series: resolved, config: merged };
}
function numberFormatter(options, locale) {
  const format3 = new Intl.NumberFormat(locale, options);
  return (value) => {
    const numeric = typeof value === "number" ? value : Number(value);
    return Number.isFinite(numeric) ? format3.format(numeric) : String(value);
  };
}
function dateFormatter(options, locale) {
  const format3 = new Intl.DateTimeFormat(locale, options);
  return (value) => {
    const date = value instanceof Date ? value : new Date(value);
    return Number.isNaN(date.getTime()) ? String(value) : format3.format(date);
  };
}
function axisFormatter(scale, options, locale) {
  if (scale === "time") {
    return dateFormatter(options, locale);
  }
  if (scale === "linear") {
    return numberFormatter(options, locale);
  }
  return options ? numberFormatter(options, locale) : void 0;
}

// src/hooks/use-autosave.ts
import { useCallback, useEffect, useRef, useState } from "react";
var AUTOSAVE_DELAY = 700;
function shallowEqual(a, b) {
  if (Object.is(a, b)) {
    return true;
  }
  if (typeof a !== "object" || typeof b !== "object" || a === null || b === null) {
    return false;
  }
  const keys = Object.keys(a);
  if (keys.length !== Object.keys(b).length) {
    return false;
  }
  return keys.every(
    (key) => Object.is(
      a[key],
      b[key]
    )
  );
}
function messageOf(reason) {
  if (reason instanceof Error) {
    return reason.message;
  }
  return typeof reason === "string" ? reason : void 0;
}
function useAutosave(values, onSave, options = {}) {
  const { delay = AUTOSAVE_DELAY, enabled = true, isEqual } = options;
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(void 0);
  const latest = useRef(values);
  const dispatched = useRef(values);
  const timer = useRef(void 0);
  const issued = useRef(0);
  const settled = useRef(0);
  const mounted = useRef(true);
  const save = useRef(onSave);
  const equal = useRef(isEqual ?? shallowEqual);
  latest.current = values;
  save.current = onSave;
  equal.current = isEqual ?? shallowEqual;
  const run = useCallback(async () => {
    const payload = latest.current;
    const ticket = issued.current += 1;
    setStatus("saving");
    setError(void 0);
    try {
      await save.current(payload);
      if (ticket < settled.current || !mounted.current) {
        return;
      }
      settled.current = ticket;
      setStatus("saved");
    } catch (reason) {
      if (ticket < settled.current || !mounted.current) {
        return;
      }
      settled.current = ticket;
      setError(messageOf(reason));
      setStatus("error");
    }
  }, []);
  const flush = useCallback(() => {
    clearTimeout(timer.current);
    dispatched.current = latest.current;
    void run();
  }, [run]);
  const reset = useCallback(() => {
    clearTimeout(timer.current);
    dispatched.current = latest.current;
    setError(void 0);
    setStatus("idle");
  }, []);
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      clearTimeout(timer.current);
    };
  }, []);
  useEffect(() => {
    if (!enabled || equal.current(values, dispatched.current)) {
      return;
    }
    dispatched.current = values;
    clearTimeout(timer.current);
    timer.current = setTimeout(() => void run(), delay);
  }, [values, delay, enabled, run]);
  return { status, error, flush, reset };
}

// src/hooks/use-confirm-dialog.tsx
import { useState as useState2 } from "react";
import { jsx } from "react/jsx-runtime";
function useConfirmDialog() {
  const [isOpen, setIsOpen] = useState2(false);
  const [options, setOptions] = useState2({});
  const [onConfirmCallback, setOnConfirmCallback] = useState2(null);
  const [onCancelCallback, setOnCancelCallback] = useState2(null);
  const confirm = (onConfirm, confirmOptions, onCancel) => {
    setOptions(confirmOptions || {});
    setOnConfirmCallback(() => onConfirm);
    setOnCancelCallback(() => onCancel ?? null);
    setIsOpen(true);
  };
  const handleConfirm = () => {
    onConfirmCallback?.();
    setIsOpen(false);
  };
  const handleCancel = () => {
    onCancelCallback?.();
    setIsOpen(false);
  };
  const ConfirmDialogComponent = () => /* @__PURE__ */ jsx(
    ConfirmDialog,
    {
      open: isOpen,
      onOpenChange: setIsOpen,
      onConfirm: handleConfirm,
      onCancel: handleCancel,
      ...options
    }
  );
  return { confirm, ConfirmDialog: ConfirmDialogComponent };
}

// src/components/ui/accordion.tsx
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import * as React from "react";
import { jsx as jsx2, jsxs } from "react/jsx-runtime";
function Accordion({
  className,
  slotName = "accordion",
  ...props
}) {
  return /* @__PURE__ */ jsx2(
    AccordionPrimitive.Root,
    {
      className: cn(elevatedSurface, "px-5 bg-card", className),
      ...props,
      "data-slot": slotName
    }
  );
}
var AccordionItem = React.forwardRef(({ className, slotName = "accordion-item", ...props }, ref) => /* @__PURE__ */ jsx2(
  AccordionPrimitive.Item,
  {
    ref,
    className: cn("border-b border-border last:border-b-0", className),
    ...props,
    "data-slot": slotName
  }
));
AccordionItem.displayName = "AccordionItem";
var AccordionTrigger = React.forwardRef(({ className, children, slotName = "accordion-trigger", ...props }, ref) => /* @__PURE__ */ jsx2(AccordionPrimitive.Header, { className: "flex", children: /* @__PURE__ */ jsxs(
  AccordionPrimitive.Trigger,
  {
    ref,
    className: cn(
      `text-base py-4 font-medium rounded-xl data-[state=open]:font-semibold flex flex-1 items-center justify-between transition-all [&[data-state=open]>svg]:rotate-180 ${focusRing}`,
      className
    ),
    ...props,
    "data-slot": slotName,
    children: [
      children,
      /* @__PURE__ */ jsx2(ChevronDown, { className: "h-4 w-4 shrink-0 transition-transform duration-200" })
    ]
  }
) }));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;
var AccordionContent = React.forwardRef(({ className, children, slotName = "accordion-content", ...props }, ref) => /* @__PURE__ */ jsx2(
  AccordionPrimitive.Content,
  {
    ref,
    className: "text-md data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden transition-all",
    ...props,
    "data-slot": slotName,
    children: /* @__PURE__ */ jsx2("div", { className: cn("pb-4 pt-0", className), children })
  }
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

// src/components/ui/akira-mark.tsx
import { jsx as jsx3 } from "react/jsx-runtime";
function AkiraMark({
  slotName = "akira-mark",
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  ...props
}) {
  const isLabelled = ariaLabel !== void 0 || ariaLabelledBy !== void 0;
  return /* @__PURE__ */ jsx3(
    "svg",
    {
      viewBox: "0 0 32.06 30.95",
      fill: "currentColor",
      xmlns: "http://www.w3.org/2000/svg",
      ...props,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      "aria-hidden": isLabelled ? void 0 : true,
      role: isLabelled ? "img" : void 0,
      "data-slot": slotName,
      children: /* @__PURE__ */ jsx3("path", { d: "M30.5,17.75,21.6,2.25h0a4.42,4.42,0,0,0-7.7,0L.4,25.85a3.29,3.29,0,0,0-.4,1.7A3.35,3.35,0,0,0,3.3,31a3.24,3.24,0,0,0,2.9-1.7l10.7-18.7a1,1,0,0,1,1.8,0l3.4,5.9a.88.88,0,0,1-.8,1.3H17.5a3.35,3.35,0,0,0-3.3,3.4h0a3.35,3.35,0,0,0,3.3,3.4H28.8a3.24,3.24,0,0,0,2.8-4.9Z" })
    }
  );
}

// src/components/ui/alert-dialog.tsx
import { AlertDialog as AlertDialogPrimitive } from "radix-ui";
import { jsx as jsx4, jsxs as jsxs2 } from "react/jsx-runtime";
function AlertDialog({
  slotName = "alert-dialog",
  ...props
}) {
  return /* @__PURE__ */ jsx4(AlertDialogPrimitive.Root, { ...props, "data-slot": slotName });
}
function AlertDialogTrigger({
  slotName = "alert-dialog-trigger",
  ...props
}) {
  return /* @__PURE__ */ jsx4(AlertDialogPrimitive.Trigger, { ...props, "data-slot": slotName });
}
function AlertDialogPortal({
  slotName = "alert-dialog-portal",
  ...props
}) {
  return /* @__PURE__ */ jsx4(AlertDialogPrimitive.Portal, { ...props, "data-slot": slotName });
}
function AlertDialogOverlay({
  className,
  slotName = "alert-dialog-overlay",
  ...props
}) {
  return /* @__PURE__ */ jsx4(
    AlertDialogPrimitive.Overlay,
    {
      className: cn(
        "inset-0 bg-black/60 backdrop-blur-sm data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0 fixed z-50",
        className
      ),
      ...props,
      "data-slot": slotName
    }
  );
}
function AlertDialogContent({
  className,
  size = "default",
  slotName = "alert-dialog-content",
  ...props
}) {
  return /* @__PURE__ */ jsxs2(AlertDialogPortal, { children: [
    /* @__PURE__ */ jsx4(AlertDialogOverlay, {}),
    /* @__PURE__ */ jsx4(
      AlertDialogPrimitive.Content,
      {
        "data-size": size,
        className: cn(
          `${modalSurface} group/alert-dialog-content gap-4 p-6 md:p-8 data-[size=sm]:max-w-xs data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[size=default]:sm:max-w-lg fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] duration-200`,
          className
        ),
        ...props,
        "data-slot": slotName
      }
    )
  ] });
}
function AlertDialogHeader({
  className,
  slotName = "alert-dialog-header",
  ...props
}) {
  return /* @__PURE__ */ jsx4(
    "div",
    {
      className: cn(
        "gap-1.5 has-data-[slot=alert-dialog-media]:gap-x-6 sm:group-data-[size=default]/alert-dialog-content:place-items-start sm:group-data-[size=default]/alert-dialog-content:text-left sm:group-data-[size=default]/alert-dialog-content:has-data-[slot=alert-dialog-media]:grid-rows-[auto_1fr] grid grid-rows-[auto_1fr] place-items-center text-center has-data-[slot=alert-dialog-media]:grid-rows-[auto_auto_1fr]",
        className
      ),
      ...props,
      "data-slot": slotName
    }
  );
}
function AlertDialogFooter({
  className,
  slotName = "alert-dialog-footer",
  ...props
}) {
  return /* @__PURE__ */ jsx4(
    "div",
    {
      className: cn(
        "gap-2 sm:flex-row sm:justify-end flex flex-col-reverse group-data-[size=sm]/alert-dialog-content:grid group-data-[size=sm]/alert-dialog-content:grid-cols-2",
        className
      ),
      ...props,
      "data-slot": slotName
    }
  );
}
function AlertDialogTitle({
  className,
  slotName = "alert-dialog-title",
  ...props
}) {
  return /* @__PURE__ */ jsx4(
    AlertDialogPrimitive.Title,
    {
      className: cn(
        "text-lg font-semibold sm:group-data-[size=default]/alert-dialog-content:group-has-data-[slot=alert-dialog-media]/alert-dialog-content:col-start-2",
        className
      ),
      ...props,
      "data-slot": slotName
    }
  );
}
function AlertDialogDescription({
  className,
  slotName = "alert-dialog-description",
  ...props
}) {
  return /* @__PURE__ */ jsx4(
    AlertDialogPrimitive.Description,
    {
      className: cn("text-sm text-muted-foreground", className),
      ...props,
      "data-slot": slotName
    }
  );
}
function AlertDialogMedia({
  className,
  slotName = "alert-dialog-media",
  ...props
}) {
  return /* @__PURE__ */ jsx4(
    "div",
    {
      className: cn(
        "mb-2 size-16 sm:group-data-[size=default]/alert-dialog-content:row-span-2 *:[svg:not([class*='size-'])]:size-8 rounded-2xl inline-flex items-center justify-center bg-muted",
        className
      ),
      ...props,
      "data-slot": slotName
    }
  );
}
function AlertDialogAction({
  className,
  variant: variant2 = "default",
  size = "default",
  slotName = "alert-dialog-action",
  ...props
}) {
  return /* @__PURE__ */ jsx4(Button, { variant: variant2, size, asChild: true, children: /* @__PURE__ */ jsx4(
    AlertDialogPrimitive.Action,
    {
      className: cn(className),
      ...props,
      "data-slot": slotName
    }
  ) });
}
function AlertDialogCancel({
  className,
  variant: variant2 = "outline",
  size = "default",
  slotName = "alert-dialog-cancel",
  ...props
}) {
  return /* @__PURE__ */ jsx4(Button, { variant: variant2, size, asChild: true, children: /* @__PURE__ */ jsx4(
    AlertDialogPrimitive.Cancel,
    {
      className: cn(className),
      ...props,
      "data-slot": slotName
    }
  ) });
}

// src/components/ui/appearance-toggle.tsx
import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react";

// src/components/ui/toggle-group.tsx
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import * as React2 from "react";
import { jsx as jsx5 } from "react/jsx-runtime";
var ToggleGroupContext = React2.createContext({
  size: "default",
  variant: "default"
});
function ToggleGroup({
  className,
  variant: variant2,
  size,
  children,
  slotName = "toggle-group",
  ...props
}) {
  return /* @__PURE__ */ jsx5(
    ToggleGroupPrimitive.Root,
    {
      "data-variant": variant2,
      "data-size": size,
      className: cn(
        "group/toggle-group data-[variant=outline]:shadow-xs rounded-2xl flex items-center",
        className
      ),
      ...props,
      "data-slot": slotName,
      children: /* @__PURE__ */ jsx5(ToggleGroupContext.Provider, { value: { variant: variant2, size }, children })
    }
  );
}
function ToggleGroupItem({
  className,
  children,
  variant: variant2,
  size,
  slotName = "toggle-group-item",
  ...props
}) {
  const context = React2.useContext(ToggleGroupContext);
  return /* @__PURE__ */ jsx5(
    ToggleGroupPrimitive.Item,
    {
      "data-variant": context.variant || variant2,
      "data-size": context.size || size,
      className: cn(
        toggleVariants({
          variant: context.variant || variant2,
          size: context.size || size
        }),
        "min-w-0 first:rounded-l-2xl last:rounded-r-2xl shrink-0 rounded-none shadow-none focus:z-10 focus-visible:z-10 data-[variant=outline]:border-l-0 data-[variant=outline]:first:border-l",
        className
      ),
      ...props,
      "data-slot": slotName,
      children
    }
  );
}

// src/components/ui/appearance-toggle.tsx
import { jsx as jsx6, jsxs as jsxs3 } from "react/jsx-runtime";
var appearanceToggleDefaultLabels = {
  groupLabel: "Appearance",
  lightLabel: "Light",
  darkLabel: "Dark",
  systemLabel: "System"
};
var OPTIONS = [
  { value: "light", icon: SunIcon, label: (labels) => labels.lightLabel },
  { value: "dark", icon: MoonIcon, label: (labels) => labels.darkLabel },
  {
    value: "system",
    icon: MonitorIcon,
    label: (labels) => labels.systemLabel
  }
];
function AppearanceToggle({
  className,
  variant: variant2 = "segmented",
  labels: labelOverrides,
  slotName = "appearance-toggle",
  ...props
}) {
  const labels = useUiLabels(
    "appearanceToggle",
    appearanceToggleDefaultLabels,
    labelOverrides
  );
  const { appearance, updateAppearance } = useAppearance();
  const current = OPTIONS.find((option) => option.value === appearance);
  const CurrentIcon = current?.icon ?? MonitorIcon;
  if (variant2 === "menu") {
    return /* @__PURE__ */ jsx6(
      "div",
      {
        "data-variant": "menu",
        className: cn("inline-flex", className),
        ...props,
        "data-slot": slotName,
        children: /* @__PURE__ */ jsxs3(DropdownMenu, { children: [
          /* @__PURE__ */ jsx6(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsx6(
            Button,
            {
              slotName: "appearance-toggle-trigger",
              variant: "ghost",
              size: "icon-sm",
              "aria-label": labels.groupLabel,
              children: /* @__PURE__ */ jsx6(CurrentIcon, { "aria-hidden": "true" })
            }
          ) }),
          /* @__PURE__ */ jsx6(DropdownMenuContent, { align: "end", children: /* @__PURE__ */ jsx6(
            DropdownMenuRadioGroup,
            {
              value: appearance,
              onValueChange: (value) => updateAppearance(value),
              children: OPTIONS.map((option) => /* @__PURE__ */ jsxs3(
                DropdownMenuRadioItem,
                {
                  slotName: "appearance-toggle-item",
                  value: option.value,
                  children: [
                    /* @__PURE__ */ jsx6(option.icon, { "aria-hidden": "true" }),
                    option.label(labels)
                  ]
                },
                option.value
              ))
            }
          ) })
        ] })
      }
    );
  }
  return /* @__PURE__ */ jsx6(
    "div",
    {
      "data-variant": "segmented",
      className: cn("inline-flex", className),
      ...props,
      "data-slot": slotName,
      children: /* @__PURE__ */ jsx6(
        ToggleGroup,
        {
          type: "single",
          size: "sm",
          value: appearance,
          "aria-label": labels.groupLabel,
          onValueChange: (value) => {
            if (value) {
              updateAppearance(value);
            }
          },
          children: OPTIONS.map((option) => /* @__PURE__ */ jsxs3(
            ToggleGroupItem,
            {
              slotName: "appearance-toggle-item",
              value: option.value,
              "aria-label": option.label(labels),
              children: [
                /* @__PURE__ */ jsx6(option.icon, { "aria-hidden": "true" }),
                /* @__PURE__ */ jsx6("span", { children: option.label(labels) })
              ]
            },
            option.value
          ))
        }
      )
    }
  );
}

// src/components/ui/cartesian-chart.tsx
import {
  Area,
  Bar,
  CartesianGrid,
  Line,
  AreaChart as RechartsAreaChart,
  BarChart as RechartsBarChart,
  LineChart as RechartsLineChart,
  XAxis,
  YAxis
} from "recharts";

// src/components/ui/chart.tsx
import * as React3 from "react";
import * as RechartsPrimitive from "recharts";
import { Fragment, jsx as jsx7, jsxs as jsxs4 } from "react/jsx-runtime";
var THEMES = { light: "", dark: ".dark" };
var INITIAL_DIMENSION = { width: 320, height: 200 };
var ChartContext = React3.createContext(null);
function useChart() {
  const context = React3.useContext(ChartContext);
  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />");
  }
  return context;
}
function ChartContainer({
  id,
  className,
  children,
  config,
  initialDimension = INITIAL_DIMENSION,
  slotName = "chart",
  ...props
}) {
  const uniqueId = React3.useId();
  const chartId = `chart-${id ?? uniqueId.replace(/:/g, "")}`;
  return /* @__PURE__ */ jsx7(ChartContext.Provider, { value: { config }, children: /* @__PURE__ */ jsxs4(
    "div",
    {
      "data-chart": chartId,
      className: cn(
        elevatedSurface,
        nestedSurfaceReset,
        "p-4 bg-card",
        "aspect-video text-xs flex justify-center [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-hidden [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector]:outline-hidden [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-surface]:outline-hidden",
        className
      ),
      ...props,
      "data-slot": slotName,
      children: [
        /* @__PURE__ */ jsx7(ChartStyle, { id: chartId, config }),
        /* @__PURE__ */ jsx7(
          RechartsPrimitive.ResponsiveContainer,
          {
            initialDimension,
            children
          }
        )
      ]
    }
  ) });
}
var ChartStyle = ({ id, config }) => {
  const colorConfig = Object.entries(config).filter(
    ([, config2]) => config2.theme ?? config2.color
  );
  if (!colorConfig.length) {
    return null;
  }
  return /* @__PURE__ */ jsx7(
    "style",
    {
      dangerouslySetInnerHTML: {
        __html: Object.entries(THEMES).map(
          ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig.map(([key, itemConfig]) => {
            const declared = itemConfig.theme?.[theme] ?? itemConfig.color;
            const color = declared ? safeChartColor(declared) : null;
            return color ? `  --color-${cssVariableKey(key)}: ${color};` : null;
          }).join("\n")}
}
`
        ).join("\n")
      }
    }
  );
};
var ChartTooltip = RechartsPrimitive.Tooltip;
function ChartTooltipContent({
  active,
  payload,
  className,
  indicator = "dot",
  hideLabel = false,
  hideIndicator = false,
  label,
  labelFormatter,
  labelClassName,
  formatter,
  color,
  nameKey,
  labelKey
}) {
  const { config } = useChart();
  const tooltipLabel = React3.useMemo(() => {
    if (hideLabel || !payload?.length) {
      return null;
    }
    const [item] = payload;
    const key = `${labelKey ?? item?.dataKey ?? item?.name ?? "value"}`;
    const itemConfig = getPayloadConfigFromPayload(config, item, key);
    const value = !labelKey && typeof label === "string" ? config[label]?.label ?? label : itemConfig?.label;
    if (labelFormatter) {
      return /* @__PURE__ */ jsx7("div", { className: cn("font-medium", labelClassName), children: labelFormatter(value, payload) });
    }
    if (!value) {
      return null;
    }
    return /* @__PURE__ */ jsx7("div", { className: cn("font-medium", labelClassName), children: value });
  }, [
    label,
    labelFormatter,
    payload,
    hideLabel,
    labelClassName,
    config,
    labelKey
  ]);
  if (!active || !payload?.length) {
    return null;
  }
  const nestLabel = payload.length === 1 && indicator !== "dot";
  return /* @__PURE__ */ jsxs4(
    "div",
    {
      className: cn(
        `${menuSurface} gap-1.5 px-3 py-2 text-xs grid min-w-[8rem] items-start`,
        className
      ),
      children: [
        !nestLabel ? tooltipLabel : null,
        /* @__PURE__ */ jsx7("div", { className: "gap-1.5 grid", children: payload.filter((item) => item.type !== "none").map((item, index) => {
          const key = `${nameKey ?? item.name ?? item.dataKey ?? "value"}`;
          const itemConfig = getPayloadConfigFromPayload(
            config,
            item,
            key
          );
          const indicatorColor = color ?? item.payload?.fill ?? item.color;
          return /* @__PURE__ */ jsx7(
            "div",
            {
              className: cn(
                "gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 flex w-full flex-wrap items-stretch [&>svg]:text-muted-foreground",
                indicator === "dot" && "items-center"
              ),
              children: formatter && item?.value !== void 0 && item.name ? formatter(
                item.value,
                item.name,
                item,
                index,
                item.payload
              ) : /* @__PURE__ */ jsxs4(Fragment, { children: [
                itemConfig?.icon ? /* @__PURE__ */ jsx7(itemConfig.icon, {}) : !hideIndicator && /* @__PURE__ */ jsx7(
                  "div",
                  {
                    className: cn(
                      "shrink-0 rounded-[2px] border-(--color-border) bg-(--color-bg)",
                      {
                        "h-2.5 w-2.5": indicator === "dot",
                        "w-1": indicator === "line",
                        "w-0 border-[1.5px] border-dashed bg-transparent": indicator === "dashed",
                        "my-0.5": nestLabel && indicator === "dashed"
                      }
                    ),
                    style: {
                      "--color-bg": indicatorColor,
                      "--color-border": indicatorColor
                    }
                  }
                ),
                /* @__PURE__ */ jsxs4(
                  "div",
                  {
                    className: cn(
                      "flex flex-1 justify-between leading-none",
                      nestLabel ? "items-end" : "items-center"
                    ),
                    children: [
                      /* @__PURE__ */ jsxs4("div", { className: "gap-1.5 grid", children: [
                        nestLabel ? tooltipLabel : null,
                        /* @__PURE__ */ jsx7("span", { className: "text-muted-foreground", children: itemConfig?.label ?? item.name })
                      ] }),
                      item.value != null && /* @__PURE__ */ jsx7("span", { className: "font-mono font-medium text-foreground tabular-nums", children: typeof item.value === "number" ? item.value.toLocaleString() : String(item.value) })
                    ]
                  }
                )
              ] })
            },
            index
          );
        }) })
      ]
    }
  );
}
var ChartLegend = RechartsPrimitive.Legend;
function ChartLegendContent({
  className,
  hideIcon = false,
  payload,
  verticalAlign = "bottom",
  nameKey
}) {
  const { config } = useChart();
  if (!payload?.length) {
    return null;
  }
  return /* @__PURE__ */ jsx7(
    "div",
    {
      className: cn(
        "gap-4 flex items-center justify-center",
        verticalAlign === "top" ? "pb-3" : "pt-3",
        className
      ),
      children: payload.filter((item) => item.type !== "none").map((item, index) => {
        const key = `${nameKey ?? item.dataKey ?? "value"}`;
        const itemConfig = getPayloadConfigFromPayload(
          config,
          item,
          key
        );
        return /* @__PURE__ */ jsxs4(
          "div",
          {
            className: cn(
              "gap-1.5 [&>svg]:h-3 [&>svg]:w-3 flex items-center [&>svg]:text-muted-foreground"
            ),
            children: [
              itemConfig?.icon && !hideIcon ? /* @__PURE__ */ jsx7(itemConfig.icon, {}) : /* @__PURE__ */ jsx7(
                "div",
                {
                  className: "h-2 w-2 shrink-0 rounded-[2px]",
                  style: {
                    backgroundColor: item.color
                  }
                }
              ),
              itemConfig?.label
            ]
          },
          index
        );
      })
    }
  );
}
function getPayloadConfigFromPayload(config, payload, key) {
  if (typeof payload !== "object" || payload === null) {
    return void 0;
  }
  const payloadPayload = "payload" in payload && typeof payload.payload === "object" && payload.payload !== null ? payload.payload : void 0;
  if (key in payload && typeof payload[key] === "string") {
    const configLabelKey = payload[key];
    return configLabelKey in config ? config[configLabelKey] : config[key];
  }
  if (payloadPayload && key in payloadPayload && typeof payloadPayload[key] === "string") {
    const configLabelKey = payloadPayload[key];
    return configLabelKey in config ? config[configLabelKey] : config[key];
  }
  return config[key];
}

// src/components/ui/cartesian-chart.tsx
import { jsx as jsx8, jsxs as jsxs5 } from "react/jsx-runtime";
var CURVE_TYPE = {
  smooth: "monotone",
  linear: "linear",
  step: "step"
};
var CHART_BY_KIND = {
  area: RechartsAreaChart,
  bar: RechartsBarChart,
  line: RechartsLineChart
};
var MARK_BY_KIND = {
  area: ({ dataKey, color, stackId, curveType, dots, animate }) => /* @__PURE__ */ jsx8(
    Area,
    {
      dataKey,
      type: curveType,
      stroke: color,
      strokeWidth: 2,
      fill: color,
      fillOpacity: 0.2,
      stackId,
      dot: dots,
      isAnimationActive: animate
    },
    dataKey
  ),
  bar: ({ dataKey, color, stackId, barSize, barRadius, animate }) => /* @__PURE__ */ jsx8(
    Bar,
    {
      dataKey,
      fill: color,
      radius: barRadius,
      barSize,
      stackId,
      isAnimationActive: animate
    },
    dataKey
  ),
  line: ({ dataKey, color, curveType, dots, animate }) => /* @__PURE__ */ jsx8(
    Line,
    {
      dataKey,
      type: curveType,
      stroke: color,
      strokeWidth: 2,
      dot: dots,
      isAnimationActive: animate
    },
    dataKey
  )
};
function CartesianChart({
  kind,
  data,
  series,
  xKey,
  config,
  curve = "smooth",
  stacked = false,
  grid = true,
  legend = false,
  tooltip = true,
  xAxis = true,
  yAxis = true,
  xScale = "categorical",
  xFormat,
  yFormat,
  locale,
  horizontal = false,
  barSize,
  barRadius = 8,
  dots = false,
  animate = false,
  slotName = "chart",
  ...props
}) {
  const { series: resolved, config: merged } = resolveChartSeries(
    series,
    config
  );
  const Chart = CHART_BY_KIND[kind];
  const curveType = CURVE_TYPE[curve];
  const formatCategory = axisFormatter(xScale, xFormat, locale);
  const formatValue = numberFormatter(yFormat, locale);
  const categoryAxis = /* @__PURE__ */ jsx8(
    XAxis,
    {
      dataKey: xKey,
      type: "category",
      tickLine: false,
      axisLine: false,
      tickMargin: 8,
      tickFormatter: formatCategory
    }
  );
  const valueAxis = /* @__PURE__ */ jsx8(
    YAxis,
    {
      type: "number",
      tickLine: false,
      axisLine: false,
      tickMargin: 8,
      width: "auto",
      tickFormatter: formatValue
    }
  );
  const swappedCategoryAxis = /* @__PURE__ */ jsx8(
    YAxis,
    {
      dataKey: xKey,
      type: "category",
      tickLine: false,
      axisLine: false,
      tickMargin: 8,
      width: "auto",
      tickFormatter: formatCategory
    }
  );
  const swappedValueAxis = /* @__PURE__ */ jsx8(
    XAxis,
    {
      type: "number",
      tickLine: false,
      axisLine: false,
      tickMargin: 8,
      tickFormatter: formatValue
    }
  );
  return /* @__PURE__ */ jsx8(ChartContainer, { config: merged, slotName, ...props, children: /* @__PURE__ */ jsxs5(
    Chart,
    {
      accessibilityLayer: true,
      data,
      layout: horizontal ? "vertical" : "horizontal",
      children: [
        grid && /* @__PURE__ */ jsx8(
          CartesianGrid,
          {
            horizontal: !horizontal,
            vertical: horizontal,
            strokeDasharray: "4 4"
          }
        ),
        xAxis && (horizontal ? swappedValueAxis : categoryAxis),
        yAxis && (horizontal ? swappedCategoryAxis : valueAxis),
        tooltip && /* @__PURE__ */ jsx8(
          ChartTooltip,
          {
            cursor: kind !== "bar",
            content: /* @__PURE__ */ jsx8(
              ChartTooltipContent,
              {
                labelFormatter: formatCategory ? (label) => formatCategory(label) : void 0
              }
            )
          }
        ),
        legend && /* @__PURE__ */ jsx8(ChartLegend, { content: /* @__PURE__ */ jsx8(ChartLegendContent, {}) }),
        resolved.map(
          (item) => MARK_BY_KIND[kind]({
            dataKey: item.key,
            color: chartColorVariable(item.variableKey),
            stackId: item.stackId ?? (stacked ? "stack" : void 0),
            curveType,
            barSize,
            barRadius,
            dots,
            animate
          })
        )
      ]
    }
  ) });
}

// src/components/ui/area-chart.tsx
import { jsx as jsx9 } from "react/jsx-runtime";
function AreaChart({
  slotName = "area-chart",
  ...props
}) {
  return /* @__PURE__ */ jsx9(CartesianChart, { kind: "area", slotName, ...props });
}

// src/components/ui/aspect-ratio.tsx
import { AspectRatio as AspectRatioPrimitive } from "radix-ui";
import { jsx as jsx10 } from "react/jsx-runtime";
function AspectRatio({
  slotName = "aspect-ratio",
  ...props
}) {
  return /* @__PURE__ */ jsx10(AspectRatioPrimitive.Root, { ...props, "data-slot": slotName });
}

// src/components/ui/badge.tsx
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { jsx as jsx11 } from "react/jsx-runtime";
var badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full border px-2.5 py-1 text-xs font-semibold w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:outline-solid focus-visible:outline-1 focus-visible:outline-offset-0 focus-visible:outline-ring aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary: "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive: "border-transparent bg-destructive text-destructive-foreground [a&]:hover:bg-destructive/90 focus-visible:outline-destructive",
        outline: "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({
  className,
  variant: variant2,
  asChild = false,
  slotName = "badge",
  ...props
}) {
  const Comp = asChild ? Slot : "span";
  return /* @__PURE__ */ jsx11(
    Comp,
    {
      className: cn(badgeVariants({ variant: variant2 }), className),
      ...props,
      "data-slot": slotName
    }
  );
}

// src/components/ui/bar-chart.tsx
import { jsx as jsx12 } from "react/jsx-runtime";
function BarChart({ slotName = "bar-chart", ...props }) {
  return /* @__PURE__ */ jsx12(CartesianChart, { kind: "bar", slotName, ...props });
}

// src/components/ui/carousel.tsx
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import * as React4 from "react";
import { jsx as jsx13, jsxs as jsxs6 } from "react/jsx-runtime";
var CarouselContext = React4.createContext(null);
function useCarousel() {
  const context = React4.useContext(CarouselContext);
  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }
  return context;
}
function Carousel({
  orientation = "horizontal",
  opts,
  setApi,
  plugins,
  className,
  children,
  slotName = "carousel",
  ...props
}) {
  const [carouselRef, api] = useEmblaCarousel(
    {
      ...opts,
      axis: orientation === "horizontal" ? "x" : "y"
    },
    plugins
  );
  const [canScrollPrev, setCanScrollPrev] = React4.useState(false);
  const [canScrollNext, setCanScrollNext] = React4.useState(false);
  const onSelect = React4.useCallback((api2) => {
    if (!api2) return;
    setCanScrollPrev(api2.canScrollPrev());
    setCanScrollNext(api2.canScrollNext());
  }, []);
  const scrollPrev = React4.useCallback(() => {
    api?.scrollPrev();
  }, [api]);
  const scrollNext = React4.useCallback(() => {
    api?.scrollNext();
  }, [api]);
  const handleKeyDown = React4.useCallback(
    (event) => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") {
        return;
      }
      event.preventDefault();
      if (event.key === "ArrowLeft") {
        scrollPrev();
        return;
      }
      scrollNext();
    },
    [scrollPrev, scrollNext]
  );
  React4.useEffect(() => {
    if (!api || !setApi) return;
    setApi(api);
  }, [api, setApi]);
  React4.useEffect(() => {
    if (!api) return;
    onSelect(api);
    api.on("reInit", onSelect);
    api.on("select", onSelect);
    return () => {
      api?.off("select", onSelect);
    };
  }, [api, onSelect]);
  return /* @__PURE__ */ jsx13(
    CarouselContext.Provider,
    {
      value: {
        carouselRef,
        api,
        opts,
        orientation: orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext
      },
      children: /* @__PURE__ */ jsx13(
        "div",
        {
          onKeyDownCapture: handleKeyDown,
          className: cn(
            elevatedSurface,
            nestedSurfaceReset,
            "p-4 relative bg-card",
            className
          ),
          role: "region",
          "aria-roledescription": "carousel",
          ...props,
          "data-slot": slotName,
          children
        }
      )
    }
  );
}
function CarouselContent({
  className,
  slotName = "carousel-content",
  ...props
}) {
  const { carouselRef, orientation } = useCarousel();
  return /* @__PURE__ */ jsx13(
    "div",
    {
      ref: carouselRef,
      className: cn(nestedRadius, "overflow-hidden"),
      "data-slot": slotName,
      children: /* @__PURE__ */ jsx13(
        "div",
        {
          className: cn(
            "flex",
            orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
            className
          ),
          ...props
        }
      )
    }
  );
}
function CarouselItem({
  className,
  slotName = "carousel-item",
  ...props
}) {
  const { orientation } = useCarousel();
  return /* @__PURE__ */ jsx13(
    "div",
    {
      role: "group",
      "aria-roledescription": "slide",
      className: cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        className
      ),
      ...props,
      "data-slot": slotName
    }
  );
}
function CarouselPrevious({
  className,
  variant: variant2 = "outline",
  size = "icon",
  slotName = "carousel-previous",
  ...props
}) {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel();
  return /* @__PURE__ */ jsxs6(
    Button,
    {
      variant: variant2,
      size,
      className: cn(
        "size-9 absolute rounded-full",
        orientation === "horizontal" ? "-left-12 top-1/2 -translate-y-1/2" : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      ),
      disabled: !canScrollPrev,
      onClick: scrollPrev,
      ...props,
      slotName,
      children: [
        /* @__PURE__ */ jsx13(ArrowLeft, {}),
        /* @__PURE__ */ jsx13("span", { className: "sr-only", children: "Previous slide" })
      ]
    }
  );
}
function CarouselNext({
  className,
  variant: variant2 = "outline",
  size = "icon",
  slotName = "carousel-next",
  ...props
}) {
  const { orientation, scrollNext, canScrollNext } = useCarousel();
  return /* @__PURE__ */ jsxs6(
    Button,
    {
      variant: variant2,
      size,
      className: cn(
        "size-9 absolute rounded-full",
        orientation === "horizontal" ? "-right-12 top-1/2 -translate-y-1/2" : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      ),
      disabled: !canScrollNext,
      onClick: scrollNext,
      ...props,
      slotName,
      children: [
        /* @__PURE__ */ jsx13(ArrowRight, {}),
        /* @__PURE__ */ jsx13("span", { className: "sr-only", children: "Next slide" })
      ]
    }
  );
}

// src/components/ui/combobox.tsx
import { Check, ChevronsUpDown } from "lucide-react";
import { useState as useState4 } from "react";
import { jsx as jsx14, jsxs as jsxs7 } from "react/jsx-runtime";
var comboboxDefaultLabels = {
  placeholder: "Select an option",
  searchPlaceholder: "Search...",
  emptyText: "No results."
};
function Combobox({
  value,
  options,
  onChange,
  placeholder,
  searchPlaceholder,
  emptyText,
  disabled = false,
  invalid = false,
  required,
  className,
  "aria-invalid": ariaInvalid,
  slotName = "combobox",
  ...trigger
}) {
  const labels = useUiLabels("combobox", comboboxDefaultLabels, {
    placeholder,
    searchPlaceholder,
    emptyText
  });
  const [open, setOpen] = useState4(false);
  const selected = options.find((option) => option.value === value);
  return /* @__PURE__ */ jsxs7(Popover, { modal: true, open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsx14(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxs7(
      Button,
      {
        variant: "outline",
        ...trigger,
        role: "combobox",
        "aria-expanded": open,
        "aria-required": required || void 0,
        "aria-invalid": ariaInvalid ?? (invalid || void 0),
        disabled,
        className: cn(
          "h-11 rounded-2xl w-full justify-between border-border bg-muted/40 hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50",
          fieldFocus,
          !selected && "text-muted-foreground",
          invalid && "border-destructive ring-destructive",
          className
        ),
        slotName,
        children: [
          selected ? selected.label : labels.placeholder,
          /* @__PURE__ */ jsx14(ChevronsUpDown, { className: "ml-2 h-4 w-4 shrink-0 opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ jsx14(
      PopoverContent,
      {
        className: "p-0 w-[var(--radix-popover-trigger-width)]",
        align: "start",
        children: /* @__PURE__ */ jsxs7(Command, { children: [
          /* @__PURE__ */ jsx14(
            CommandInput,
            {
              placeholder: labels.searchPlaceholder,
              className: "h-11"
            }
          ),
          /* @__PURE__ */ jsxs7(CommandList, { className: "max-h-[min(300px,var(--radix-popover-content-available-height))]", children: [
            /* @__PURE__ */ jsx14(CommandEmpty, { children: labels.emptyText }),
            /* @__PURE__ */ jsx14(CommandGroup, { children: options.map((option) => /* @__PURE__ */ jsxs7(
              CommandItem,
              {
                value: option.label,
                onSelect: () => {
                  onChange(option.value);
                  setOpen(false);
                },
                className: "h-11 rounded-xl",
                children: [
                  /* @__PURE__ */ jsx14(
                    Check,
                    {
                      className: cn(
                        "mr-2 h-4 w-4",
                        selected?.value === option.value ? "opacity-100" : "opacity-0"
                      )
                    }
                  ),
                  option.label
                ]
              },
              option.value
            )) })
          ] })
        ] })
      }
    )
  ] });
}

// src/components/ui/context-menu.tsx
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react";
import { ContextMenu as ContextMenuPrimitive } from "radix-ui";
import { jsx as jsx15, jsxs as jsxs8 } from "react/jsx-runtime";
function ContextMenu({
  slotName = "context-menu",
  ...props
}) {
  return /* @__PURE__ */ jsx15(ContextMenuPrimitive.Root, { ...props, "data-slot": slotName });
}
function ContextMenuTrigger({
  slotName = "context-menu-trigger",
  ...props
}) {
  return /* @__PURE__ */ jsx15(ContextMenuPrimitive.Trigger, { ...props, "data-slot": slotName });
}
function ContextMenuGroup({
  slotName = "context-menu-group",
  ...props
}) {
  return /* @__PURE__ */ jsx15(ContextMenuPrimitive.Group, { ...props, "data-slot": slotName });
}
function ContextMenuPortal({
  slotName = "context-menu-portal",
  ...props
}) {
  return /* @__PURE__ */ jsx15(ContextMenuPrimitive.Portal, { ...props, "data-slot": slotName });
}
function ContextMenuSub({
  slotName = "context-menu-sub",
  ...props
}) {
  return /* @__PURE__ */ jsx15(ContextMenuPrimitive.Sub, { ...props, "data-slot": slotName });
}
function ContextMenuRadioGroup({
  slotName = "context-menu-radio-group",
  ...props
}) {
  return /* @__PURE__ */ jsx15(ContextMenuPrimitive.RadioGroup, { ...props, "data-slot": slotName });
}
function ContextMenuSubTrigger({
  className,
  inset,
  children,
  slotName = "context-menu-sub-trigger",
  ...props
}) {
  return /* @__PURE__ */ jsxs8(
    ContextMenuPrimitive.SubTrigger,
    {
      "data-inset": inset,
      className: cn(
        "px-2 py-1.5 text-sm data-[inset]:pl-8 [&_svg:not([class*='size-'])]:size-4 rounded-xl flex cursor-default items-center outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='text-'])]:text-muted-foreground",
        className
      ),
      ...props,
      "data-slot": slotName,
      children: [
        children,
        /* @__PURE__ */ jsx15(ChevronRightIcon, { className: "ml-auto" })
      ]
    }
  );
}
function ContextMenuSubContent({
  className,
  slotName = "context-menu-sub-content",
  ...props
}) {
  return /* @__PURE__ */ jsx15(
    ContextMenuPrimitive.SubContent,
    {
      className: cn(
        `${menuSurface} p-1.5 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 z-50 min-w-[8rem] origin-(--radix-context-menu-content-transform-origin) overflow-hidden`,
        className
      ),
      ...props,
      "data-slot": slotName
    }
  );
}
function ContextMenuContent({
  className,
  slotName = "context-menu-content",
  container,
  ...props
}) {
  const portalContainer = useSheetPortalContainer(container);
  return /* @__PURE__ */ jsx15(ContextMenuPrimitive.Portal, { container: portalContainer, children: /* @__PURE__ */ jsx15(
    ContextMenuPrimitive.Content,
    {
      className: cn(
        `${menuSurface} p-1.5 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 z-50 max-h-(--radix-context-menu-content-available-height) min-w-[8rem] origin-(--radix-context-menu-content-transform-origin) overflow-x-hidden overflow-y-auto`,
        className
      ),
      ...props,
      "data-slot": slotName
    }
  ) });
}
function ContextMenuItem({
  className,
  inset,
  variant: variant2 = "default",
  slotName = "context-menu-item",
  ...props
}) {
  return /* @__PURE__ */ jsx15(
    ContextMenuPrimitive.Item,
    {
      "data-inset": inset,
      "data-variant": variant2,
      className: cn(
        "gap-2 px-2 py-1.5 text-sm data-[inset]:pl-8 [&_svg:not([class*='size-'])]:size-4 rounded-xl relative flex cursor-default items-center outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='text-'])]:text-muted-foreground data-[variant=destructive]:*:[svg]:text-destructive!",
        className
      ),
      ...props,
      "data-slot": slotName
    }
  );
}
function ContextMenuCheckboxItem({
  className,
  children,
  checked,
  slotName = "context-menu-checkbox-item",
  ...props
}) {
  return /* @__PURE__ */ jsxs8(
    ContextMenuPrimitive.CheckboxItem,
    {
      className: cn(
        "gap-2 py-1.5 pr-2 pl-8 text-sm [&_svg:not([class*='size-'])]:size-4 rounded-xl relative flex cursor-default items-center outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className
      ),
      checked,
      ...props,
      "data-slot": slotName,
      children: [
        /* @__PURE__ */ jsx15("span", { className: "left-2 size-3.5 pointer-events-none absolute flex items-center justify-center", children: /* @__PURE__ */ jsx15(ContextMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx15(CheckIcon, { className: "size-4" }) }) }),
        children
      ]
    }
  );
}
function ContextMenuRadioItem({
  className,
  children,
  slotName = "context-menu-radio-item",
  ...props
}) {
  return /* @__PURE__ */ jsxs8(
    ContextMenuPrimitive.RadioItem,
    {
      className: cn(
        "gap-2 py-1.5 pr-2 pl-8 text-sm [&_svg:not([class*='size-'])]:size-4 rounded-xl relative flex cursor-default items-center outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className
      ),
      ...props,
      "data-slot": slotName,
      children: [
        /* @__PURE__ */ jsx15("span", { className: "left-2 size-3.5 pointer-events-none absolute flex items-center justify-center", children: /* @__PURE__ */ jsx15(ContextMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx15(CircleIcon, { className: "size-2 fill-current" }) }) }),
        children
      ]
    }
  );
}
function ContextMenuLabel({
  className,
  inset,
  slotName = "context-menu-label",
  ...props
}) {
  return /* @__PURE__ */ jsx15(
    ContextMenuPrimitive.Label,
    {
      "data-inset": inset,
      className: cn(
        "px-2 py-1.5 text-sm font-medium data-[inset]:pl-8 text-foreground",
        className
      ),
      ...props,
      "data-slot": slotName
    }
  );
}
function ContextMenuSeparator({
  className,
  slotName = "context-menu-separator",
  ...props
}) {
  return /* @__PURE__ */ jsx15(
    ContextMenuPrimitive.Separator,
    {
      className: cn("-mx-1 my-1 h-px bg-border", className),
      ...props,
      "data-slot": slotName
    }
  );
}
function ContextMenuShortcut({
  className,
  slotName = "context-menu-shortcut",
  ...props
}) {
  return /* @__PURE__ */ jsx15(
    "span",
    {
      className: cn(
        "text-xs tracking-widest ml-auto text-muted-foreground",
        className
      ),
      ...props,
      "data-slot": slotName
    }
  );
}

// src/components/ui/data-table-faceted-filter.tsx
import { Check as Check2, PlusCircle } from "lucide-react";
import { jsx as jsx16, jsxs as jsxs9 } from "react/jsx-runtime";
var dataTableFacetedFilterDefaultLabels = {
  noOptionsLabel: "No options."
};
function FilterPopover({
  label,
  options,
  selected,
  onToggle,
  width,
  noOptionsLabel,
  slotName = "data-table-faceted-filter"
}) {
  return /* @__PURE__ */ jsxs9(Popover, { children: [
    /* @__PURE__ */ jsx16(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxs9(
      Button,
      {
        variant: "outline",
        className: "h-11 gap-3 has-[>svg]:px-3 rounded-2xl border-dashed border-border",
        slotName,
        children: [
          /* @__PURE__ */ jsx16(PlusCircle, { className: "size-4" }),
          label,
          selected.size > 0 && /* @__PURE__ */ jsx16(
            Badge,
            {
              variant: "secondary",
              className: "ml-2 px-2 rounded-full tabular-nums",
              children: selected.size
            }
          )
        ]
      }
    ) }),
    /* @__PURE__ */ jsx16(PopoverContent, { className: cn("p-0", width), align: "start", children: /* @__PURE__ */ jsx16(Command, { children: /* @__PURE__ */ jsxs9(CommandList, { children: [
      /* @__PURE__ */ jsx16(CommandEmpty, { children: noOptionsLabel }),
      /* @__PURE__ */ jsx16(CommandGroup, { children: options.map((option) => /* @__PURE__ */ jsxs9(
        CommandItem,
        {
          value: option.label,
          onSelect: () => onToggle(option.value),
          className: "h-10 rounded-xl",
          children: [
            /* @__PURE__ */ jsx16(
              "div",
              {
                className: cn(
                  "mr-2 size-4 flex items-center justify-center rounded-md border border-border",
                  selected.has(option.value) ? "bg-primary text-primary-foreground" : "opacity-50"
                ),
                children: selected.has(option.value) && /* @__PURE__ */ jsx16(Check2, { className: "size-3" })
              }
            ),
            option.label
          ]
        },
        option.value
      )) })
    ] }) }) })
  ] });
}
function FacetedFilter({
  column,
  filter,
  noOptionsLabel
}) {
  const labels = useUiLabels(
    "dataTableFacetedFilter",
    dataTableFacetedFilterDefaultLabels,
    { noOptionsLabel }
  );
  const selected = new Set(column?.getFilterValue() ?? []);
  const toggle = (value) => {
    const next = new Set(selected);
    if (next.has(value)) {
      next.delete(value);
    } else {
      next.add(value);
    }
    const arr = Array.from(next);
    column?.setFilterValue(arr.length ? arr : void 0);
  };
  return /* @__PURE__ */ jsx16(
    FilterPopover,
    {
      label: filter.label,
      options: filter.options,
      selected,
      onToggle: toggle,
      width: "w-[220px]",
      noOptionsLabel: labels.noOptionsLabel
    }
  );
}
function ServerFacetedFilter({
  filter,
  selected,
  onChange,
  noOptionsLabel
}) {
  const labels = useUiLabels(
    "dataTableFacetedFilter",
    dataTableFacetedFilterDefaultLabels,
    { noOptionsLabel }
  );
  const selectedSet = new Set(selected);
  const toggle = (value) => {
    const next = new Set(selectedSet);
    if (next.has(value)) {
      next.delete(value);
    } else {
      next.add(value);
    }
    onChange(Array.from(next));
  };
  return /* @__PURE__ */ jsx16(
    FilterPopover,
    {
      label: filter.label,
      options: filter.options,
      selected: selectedSet,
      onToggle: toggle,
      width: "w-[240px]",
      noOptionsLabel: labels.noOptionsLabel
    }
  );
}

// src/components/ui/data-table-row-actions.tsx
import { MoreVertical } from "lucide-react";
import { jsx as jsx17, jsxs as jsxs10 } from "react/jsx-runtime";
function RowActionsMenu({
  row,
  actions,
  slotName = "data-table-row-actions"
}) {
  const visible = actions.filter((action) => !action.hidden?.(row));
  if (visible.length === 0) {
    return null;
  }
  return /* @__PURE__ */ jsx17(
    "div",
    {
      className: "flex justify-end",
      onClick: (event) => event.stopPropagation(),
      "data-slot": slotName,
      children: /* @__PURE__ */ jsxs10(DropdownMenu, { children: [
        /* @__PURE__ */ jsx17(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsx17(
          Button,
          {
            variant: "ghost",
            size: "icon",
            className: "size-8 rounded-xl text-muted-foreground hover:text-foreground",
            children: /* @__PURE__ */ jsx17(MoreVertical, { className: "size-4" })
          }
        ) }),
        /* @__PURE__ */ jsx17(DropdownMenuContent, { align: "end", className: "rounded-2xl", children: visible.map((action) => /* @__PURE__ */ jsxs10(
          DropdownMenuItem,
          {
            onClick: () => action.onClick(row),
            className: action.variant === "destructive" ? "rounded-xl text-destructive focus:text-destructive" : "rounded-xl",
            children: [
              action.icon && /* @__PURE__ */ jsx17(action.icon, { className: "size-4" }),
              action.label
            ]
          },
          action.label
        )) })
      ] })
    }
  );
}

// src/components/ui/empty-state.tsx
import { SearchX } from "lucide-react";
import { jsx as jsx18, jsxs as jsxs11 } from "react/jsx-runtime";
var emptyStateLabels = {
  title: "Nothing to show"
};
function EmptyState({
  icon: Icon2 = SearchX,
  title = emptyStateLabels.title,
  description,
  actions,
  compact = false,
  className,
  slotName = "empty-state"
}) {
  return /* @__PURE__ */ jsxs11(
    "div",
    {
      "data-compact": compact || void 0,
      className: cn(
        "flex h-full w-full flex-col items-center justify-center text-center",
        compact ? "gap-2 px-4 py-6" : "gap-3 px-6 py-12",
        className
      ),
      "data-slot": slotName,
      children: [
        /* @__PURE__ */ jsx18(
          "span",
          {
            "data-slot": "empty-state-icon",
            className: cn(
              "flex shrink-0 items-center justify-center rounded-full bg-surface-recessed text-muted-foreground",
              compact ? "size-8" : "size-10"
            ),
            children: /* @__PURE__ */ jsx18(Icon2, { className: compact ? "size-4" : "size-5" })
          }
        ),
        /* @__PURE__ */ jsxs11(
          "div",
          {
            className: cn(
              "max-w-md flex flex-col",
              compact ? "gap-0.5" : "gap-1"
            ),
            children: [
              /* @__PURE__ */ jsx18(
                "p",
                {
                  "data-slot": "empty-state-title",
                  className: cn(
                    "font-semibold text-foreground",
                    compact ? "text-sm" : "text-base"
                  ),
                  children: title
                }
              ),
              description && /* @__PURE__ */ jsx18(
                "p",
                {
                  "data-slot": "empty-state-description",
                  className: "text-sm font-medium text-muted-foreground",
                  children: description
                }
              )
            ]
          }
        ),
        actions && /* @__PURE__ */ jsx18(
          "div",
          {
            "data-slot": "empty-state-actions",
            className: cn(
              "gap-2 flex flex-wrap items-center justify-center",
              compact ? "mt-1" : "mt-2"
            ),
            children: actions
          }
        )
      ]
    }
  );
}

// src/components/ui/table.tsx
import * as React5 from "react";
import { jsx as jsx19 } from "react/jsx-runtime";
var bleedEdges = "-mx-6 w-[calc(100%+3rem)] rounded-none bg-transparent shadow-none ring-0 backdrop-blur-none [&_td:first-child]:pl-6 [&_td:last-child]:pr-6 [&_th:first-child]:pl-6 [&_th:last-child]:pr-6";
var Table = React5.forwardRef(
  ({ className, bleed = false, slotName = "table-container", ...props }, ref) => /* @__PURE__ */ jsx19(
    "div",
    {
      className: cn(
        elevatedSurface,
        nestedSurfaceReset,
        nestedEdgeToEdge,
        "relative w-full overflow-hidden bg-card",
        bleed && bleedEdges
      ),
      "data-bleed": bleed || void 0,
      "data-slot": slotName,
      children: /* @__PURE__ */ jsx19(
        "div",
        {
          className: cn(
            nestedRadius,
            nestedSurfaceReset,
            nestedEdgeToEdge,
            "w-full overflow-x-auto",
            bleed && "rounded-none"
          ),
          children: /* @__PURE__ */ jsx19(
            "table",
            {
              ref,
              className: cn("text-sm w-full caption-bottom", className),
              ...props
            }
          )
        }
      )
    }
  )
);
Table.displayName = "Table";
var TableHeader = React5.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx19("thead", { ref, className: cn("[&_tr]:border-b", className), ...props }));
TableHeader.displayName = "TableHeader";
var TableBody = React5.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx19(
  "tbody",
  {
    ref,
    className: cn("[&_tr:last-child]:border-0", className),
    ...props
  }
));
TableBody.displayName = "TableBody";
var TableFooter = React5.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx19(
  "tfoot",
  {
    ref,
    className: cn(
      "font-medium border-t bg-muted/50 [&>tr]:last:border-b-0",
      className
    ),
    ...props
  }
));
TableFooter.displayName = "TableFooter";
var TableRow = React5.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx19(
  "tr",
  {
    ref,
    className: cn(
      "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
      className
    ),
    ...props
  }
));
TableRow.displayName = "TableRow";
var TableHead = React5.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx19(
  "th",
  {
    ref,
    className: cn(
      "h-11 px-4 text-xs font-medium tracking-wider [&:has([role=checkbox])]:pr-0 text-left align-middle text-muted-foreground uppercase",
      className
    ),
    ...props
  }
));
TableHead.displayName = "TableHead";
var TableCell = React5.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx19(
  "td",
  {
    ref,
    className: cn(
      "p-4 [&:has([role=checkbox])]:pr-0 align-middle",
      className
    ),
    ...props
  }
));
TableCell.displayName = "TableCell";
var TableCaption = React5.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx19(
  "caption",
  {
    ref,
    className: cn(
      "mt-4 px-4 pb-4 text-sm text-muted-foreground",
      className
    ),
    ...props
  }
));
TableCaption.displayName = "TableCaption";

// src/components/ui/data-table.tsx
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from "@tanstack/react-table";
import {
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Plus,
  Search,
  X
} from "lucide-react";
import { useMemo as useMemo2, useState as useState5 } from "react";
import { jsx as jsx20, jsxs as jsxs12 } from "react/jsx-runtime";
function pageRange(current, last) {
  if (last <= 7) {
    return Array.from({ length: last }, (_, i) => i + 1);
  }
  const pages = [1];
  const left = Math.max(2, current - 1);
  const right = Math.min(last - 1, current + 1);
  if (left > 2) pages.push("ellipsis");
  for (let i = left; i <= right; i++) pages.push(i);
  if (right < last - 1) pages.push("ellipsis");
  pages.push(last);
  return pages;
}
var dataTableDefaultLabels = {
  searchPlaceholder: "Search...",
  emptyLabel: "No results.",
  createLabel: "New",
  clearFiltersLabel: "Clear filters",
  paginationLabel: (page, pages) => `Page ${page} of ${pages}`,
  noOptionsLabel: "No options.",
  totalLabel: (total) => `${total.toLocaleString("en-US")} records`
};
function DataTable({
  columns,
  data,
  searchKey,
  searchPlaceholder,
  pageSize = 10,
  pageSizeOptions = [10, 25, 50, 100],
  onPageSizeChange,
  filters,
  serverFilters,
  filterValues,
  onFilterChange,
  canClearFilters,
  onClearFilters,
  toolbarExtra,
  toolbarAction,
  emptyLabel,
  clearFiltersLabel,
  paginationLabel,
  noOptionsLabel,
  totalLabel,
  renderRow,
  onRowClick,
  isRowActive,
  rowActions,
  searchValue,
  onSearchChange,
  manualPagination = false,
  pageCount,
  pageIndex = 0,
  total,
  onPageChange,
  onCreate,
  createLabel,
  flat = false,
  slotName = "data-table"
}) {
  const labels = useUiLabels("dataTable", dataTableDefaultLabels, {
    searchPlaceholder,
    emptyLabel,
    createLabel,
    clearFiltersLabel,
    paginationLabel,
    noOptionsLabel,
    totalLabel
  });
  const [sorting, setSorting] = useState5([]);
  const [globalFilter, setGlobalFilter] = useState5("");
  const [columnFilters, setColumnFilters] = useState5([]);
  const serverSearch = onSearchChange !== void 0;
  const tableColumns = useMemo2(() => {
    if (!rowActions || rowActions.length === 0) {
      return columns;
    }
    return [
      ...columns,
      {
        id: "__actions",
        header: "",
        enableSorting: false,
        cell: ({ row }) => /* @__PURE__ */ jsx20(RowActionsMenu, { row: row.original, actions: rowActions })
      }
    ];
  }, [columns, rowActions]);
  const table = useReactTable({
    data,
    columns: tableColumns,
    state: {
      sorting,
      columnFilters,
      ...serverSearch ? {} : { globalFilter }
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: serverSearch ? void 0 : setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    ...manualPagination ? { manualPagination: true, pageCount: pageCount ?? -1 } : { getPaginationRowModel: getPaginationRowModel() },
    initialState: { pagination: { pageSize } }
  });
  const hasServerSelection = serverFilters?.some(
    (filter) => (filterValues?.[filter.paramKey]?.length ?? 0) > 0
  ) ?? false;
  const hasToolbar = searchKey !== void 0 || filters && filters.length > 0 || serverFilters && serverFilters.length > 0 || onCreate !== void 0 || toolbarExtra !== void 0 || toolbarAction !== void 0;
  const showFooter = manualPagination || table.getPageCount() > 1;
  const currentPage = manualPagination ? pageIndex + 1 : table.getState().pagination.pageIndex + 1;
  const lastPage = manualPagination ? Math.max(1, pageCount ?? 1) : table.getPageCount();
  const canPrev = manualPagination ? pageIndex > 0 : table.getCanPreviousPage();
  const canNext = manualPagination ? pageIndex + 1 < (pageCount ?? 1) : table.getCanNextPage();
  const prev = () => manualPagination ? onPageChange?.(pageIndex - 1) : table.previousPage();
  const next = () => manualPagination ? onPageChange?.(pageIndex + 1) : table.nextPage();
  const goTo = (page) => manualPagination ? onPageChange?.(page - 1) : table.setPageIndex(page - 1);
  const activePageSize = manualPagination ? pageSize : table.getState().pagination.pageSize;
  const changePageSize = (size) => onPageSizeChange ? onPageSizeChange(size) : table.setPageSize(size);
  const sizeChoices = [.../* @__PURE__ */ new Set([...pageSizeOptions, activePageSize])].sort(
    (a, b) => a - b
  );
  return /* @__PURE__ */ jsxs12(
    "div",
    {
      "data-flat": flat || void 0,
      className: cn(
        elevatedSurface,
        "space-y-4 p-5 bg-card",
        flat && flatSurface
      ),
      "data-slot": slotName,
      children: [
        hasToolbar && /* @__PURE__ */ jsxs12("div", { className: "gap-2 flex flex-wrap items-center", children: [
          searchKey !== void 0 && /* @__PURE__ */ jsxs12("div", { className: "relative min-w-[200px] flex-1", children: [
            /* @__PURE__ */ jsx20(Search, { className: "left-4 size-4 pointer-events-none absolute top-1/2 z-10 -translate-y-1/2 text-muted-foreground" }),
            /* @__PURE__ */ jsx20(
              Input,
              {
                value: serverSearch ? searchValue ?? "" : globalFilter,
                onChange: (e) => serverSearch ? onSearchChange?.(e.target.value) : setGlobalFilter(e.target.value),
                placeholder: labels.searchPlaceholder,
                className: `h-11 rounded-2xl pl-11 font-medium border-none bg-muted/50 focus:bg-muted`
              }
            )
          ] }),
          filters?.map((filter) => /* @__PURE__ */ jsx20(
            FacetedFilter,
            {
              column: table.getColumn(filter.columnId),
              filter,
              noOptionsLabel: labels.noOptionsLabel
            },
            filter.columnId
          )),
          serverFilters?.map((filter) => /* @__PURE__ */ jsx20(
            ServerFacetedFilter,
            {
              filter,
              selected: filterValues?.[filter.paramKey] ?? [],
              onChange: (values) => onFilterChange?.(filter.paramKey, values),
              noOptionsLabel: labels.noOptionsLabel
            },
            filter.paramKey
          )),
          toolbarExtra,
          (columnFilters.length > 0 || hasServerSelection || canClearFilters && onClearFilters) && /* @__PURE__ */ jsxs12(
            Button,
            {
              variant: "ghost",
              onClick: () => {
                if (columnFilters.length > 0) {
                  table.resetColumnFilters();
                }
                if (hasServerSelection || canClearFilters) {
                  onClearFilters?.();
                }
              },
              className: "h-11 rounded-2xl",
              children: [
                labels.clearFiltersLabel,
                /* @__PURE__ */ jsx20(X, { className: "ml-1 size-4" })
              ]
            }
          ),
          onCreate && /* @__PURE__ */ jsx20(
            Button,
            {
              onClick: onCreate,
              "aria-label": labels.createLabel,
              size: "icon",
              className: "size-11 rounded-2xl shrink-0 cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90",
              children: /* @__PURE__ */ jsx20(Plus, { className: "size-5" })
            }
          ),
          toolbarAction && /* @__PURE__ */ jsx20("div", { className: "ml-auto", children: toolbarAction })
        ] }),
        /* @__PURE__ */ jsxs12(Table, { children: [
          /* @__PURE__ */ jsx20(TableHeader, { children: table.getHeaderGroups().map((headerGroup) => /* @__PURE__ */ jsx20(
            TableRow,
            {
              className: "hover:bg-transparent",
              children: headerGroup.headers.map((header) => /* @__PURE__ */ jsx20(
                TableHead,
                {
                  className: "h-11 px-4 font-medium tracking-wider text-[11px] text-muted-foreground uppercase",
                  children: header.isPlaceholder ? null : header.column.getCanSort() ? /* @__PURE__ */ jsxs12(
                    "button",
                    {
                      type: "button",
                      onClick: header.column.getToggleSortingHandler(),
                      className: "gap-1 inline-flex items-center transition-colors hover:text-foreground",
                      children: [
                        flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        ),
                        /* @__PURE__ */ jsx20(ArrowUpDown, { className: "size-3 opacity-50" })
                      ]
                    }
                  ) : flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )
                },
                header.id
              ))
            },
            headerGroup.id
          )) }),
          /* @__PURE__ */ jsx20(TableBody, { children: table.getRowModel().rows.length ? table.getRowModel().rows.map(
            (row) => renderRow ? renderRow(row) : /* @__PURE__ */ jsx20(
              TableRow,
              {
                onClick: onRowClick ? () => onRowClick(row.original) : void 0,
                "data-active": isRowActive?.(row.original) || void 0,
                className: cn(
                  "border-border transition-colors hover:bg-muted/50",
                  onRowClick && "cursor-pointer",
                  "data-[active=true]:bg-primary/5"
                ),
                children: row.getVisibleCells().map((cell) => /* @__PURE__ */ jsx20(
                  TableCell,
                  {
                    className: "px-4 py-3",
                    children: flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )
                  },
                  cell.id
                ))
              },
              row.id
            )
          ) : /* @__PURE__ */ jsx20(TableRow, { children: /* @__PURE__ */ jsx20(
            TableCell,
            {
              colSpan: tableColumns.length,
              className: "h-24 p-0",
              children: /* @__PURE__ */ jsx20(EmptyState, { compact: true, title: labels.emptyLabel })
            }
          ) }) })
        ] }),
        showFooter && /* @__PURE__ */ jsxs12("div", { className: "gap-3 pt-4 flex flex-wrap items-center justify-between border-t border-border", children: [
          /* @__PURE__ */ jsxs12("div", { className: "gap-3 flex items-center", children: [
            /* @__PURE__ */ jsxs12(
              Select,
              {
                value: String(activePageSize),
                onValueChange: (value) => changePageSize(Number(value)),
                children: [
                  /* @__PURE__ */ jsx20(SelectTrigger, { className: "h-9 rounded-xl w-[74px]", children: /* @__PURE__ */ jsx20("span", { children: activePageSize }) }),
                  /* @__PURE__ */ jsx20(SelectContent, { className: "rounded-xl", children: sizeChoices.map((size) => /* @__PURE__ */ jsx20(
                    SelectItem,
                    {
                      value: String(size),
                      className: "font-medium",
                      children: size
                    },
                    size
                  )) })
                ]
              }
            ),
            /* @__PURE__ */ jsxs12("span", { className: "text-xs font-medium text-muted-foreground", children: [
              labels.paginationLabel(currentPage, lastPage),
              total !== void 0 && ` \xB7 ${labels.totalLabel(total)}`
            ] })
          ] }),
          /* @__PURE__ */ jsxs12("div", { className: "gap-1.5 flex items-center", children: [
            /* @__PURE__ */ jsx20(
              Button,
              {
                variant: "outline",
                size: "icon",
                className: "size-9 rounded-xl",
                onClick: prev,
                disabled: !canPrev,
                children: /* @__PURE__ */ jsx20(ChevronLeft, { className: "size-4" })
              }
            ),
            pageRange(currentPage, lastPage).map(
              (page, index) => page === "ellipsis" ? /* @__PURE__ */ jsx20(
                "span",
                {
                  className: "px-1 text-sm font-medium text-muted-foreground",
                  children: "\u2026"
                },
                `ellipsis-${index}`
              ) : /* @__PURE__ */ jsx20(
                Button,
                {
                  variant: "outline",
                  onClick: () => goTo(page),
                  className: cn(
                    "h-9 min-w-9 rounded-xl px-2.5 tabular-nums",
                    page === currentPage && "border-primary bg-primary text-primary-foreground hover:bg-primary/90"
                  ),
                  children: page
                },
                page
              )
            ),
            /* @__PURE__ */ jsx20(
              Button,
              {
                variant: "outline",
                size: "icon",
                className: "size-9 rounded-xl",
                onClick: next,
                disabled: !canNext,
                children: /* @__PURE__ */ jsx20(ChevronRight, { className: "size-4" })
              }
            )
          ] })
        ] })
      ]
    }
  );
}

// src/components/ui/calendar-popover.tsx
import { jsx as jsx21, jsxs as jsxs13 } from "react/jsx-runtime";
function CalendarPopover({
  open,
  onOpenChange,
  trigger,
  align = "start",
  className,
  children,
  slotName = "calendar-popover"
}) {
  return /* @__PURE__ */ jsxs13(Popover, { open, onOpenChange, children: [
    /* @__PURE__ */ jsx21(PopoverTrigger, { asChild: true, children: trigger }),
    /* @__PURE__ */ jsx21(
      PopoverContent,
      {
        className: cn("p-2 w-auto", className),
        align,
        sideOffset: 4,
        collisionPadding: 16,
        slotName,
        children
      }
    )
  ] });
}

// src/components/ui/date-picker.tsx
import { format } from "date-fns";
import { CalendarIcon, X as X2 } from "lucide-react";
import { useState as useState6 } from "react";
import { jsx as jsx22, jsxs as jsxs14 } from "react/jsx-runtime";
var datePickerDefaultLabels = {
  placeholder: "Pick a date",
  dateFormat: "dd MMM yy",
  clearLabel: "Clear date"
};
var triggerClasses = `h-11 px-4 font-medium flex w-full cursor-pointer items-center gap-2 text-left transition-all disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 ${fieldSurface} ${fieldFocus}`;
function boundaries(minDate, maxDate, disabledDays) {
  const matchers = [];
  if (minDate) {
    matchers.push({ before: minDate });
  }
  if (maxDate) {
    matchers.push({ after: maxDate });
  }
  if (disabledDays) {
    matchers.push(disabledDays);
  }
  return matchers;
}
function DatePicker(props) {
  const {
    value,
    defaultValue,
    onChange,
    minDate,
    maxDate,
    disabledDays,
    disabled = false,
    clearable = true,
    invalid = false,
    required,
    formatDate,
    placeholder,
    dateFormat,
    clearLabel,
    className,
    "aria-invalid": ariaInvalid,
    slotName = "date-picker",
    ...trigger
  } = props;
  const labels = useUiLabels("datePicker", datePickerDefaultLabels, {
    placeholder,
    dateFormat,
    clearLabel
  });
  const [open, setOpen] = useState6(false);
  const [ownValue, setOwnValue] = useState6(defaultValue);
  const isControlled = "value" in props;
  const selected = isControlled ? value : ownValue;
  const showClear = clearable && !disabled && selected !== void 0;
  const label = selected ? formatDate?.(selected) ?? format(selected, labels.dateFormat) : labels.placeholder;
  function commit(next) {
    if (!isControlled) {
      setOwnValue(next);
    }
    onChange?.(next);
  }
  return /* @__PURE__ */ jsxs14("div", { className: cn("relative w-full", className), "data-slot": slotName, children: [
    /* @__PURE__ */ jsx22(
      CalendarPopover,
      {
        open,
        onOpenChange: setOpen,
        trigger: /* @__PURE__ */ jsxs14(
          "button",
          {
            ...trigger,
            type: "button",
            "data-slot": "date-picker-trigger",
            disabled,
            "aria-required": required || void 0,
            "aria-invalid": ariaInvalid ?? (invalid || void 0),
            className: cn(triggerClasses, showClear && "pr-11"),
            children: [
              /* @__PURE__ */ jsx22(CalendarIcon, { className: "size-4 shrink-0 opacity-60" }),
              /* @__PURE__ */ jsx22(
                "span",
                {
                  className: cn(
                    "truncate",
                    !selected && "text-muted-foreground"
                  ),
                  children: label
                }
              )
            ]
          }
        ),
        children: /* @__PURE__ */ jsx22(
          Calendar,
          {
            mode: "single",
            autoFocus: true,
            selected,
            defaultMonth: selected ?? minDate,
            startMonth: minDate,
            endMonth: maxDate,
            disabled: boundaries(minDate, maxDate, disabledDays),
            onSelect: (date) => {
              if (!date) {
                return;
              }
              commit(date);
              setOpen(false);
            },
            className: "rounded-2xl bg-transparent"
          }
        )
      }
    ),
    showClear && /* @__PURE__ */ jsx22(
      "button",
      {
        type: "button",
        "data-slot": "date-picker-clear",
        "aria-label": labels.clearLabel,
        onClick: () => commit(void 0),
        className: `size-7 rounded-xl right-2 absolute top-1/2 inline-flex -translate-y-1/2 cursor-pointer items-center justify-center text-muted-foreground hover:text-foreground ${focusRing}`,
        children: /* @__PURE__ */ jsx22(X2, { className: "size-3.5" })
      }
    )
  ] });
}

// src/components/ui/date-range-filter.tsx
import { format as format2 } from "date-fns";
import { CalendarRange, X as X3 } from "lucide-react";
import { useState as useState7 } from "react";
import { jsx as jsx23, jsxs as jsxs15 } from "react/jsx-runtime";
function parse(value) {
  return value ? /* @__PURE__ */ new Date(`${value}T00:00:00`) : void 0;
}
var dateRangeFilterDefaultLabels = {
  emptyLabel: "Date range",
  dateFormat: "dd MMM yy"
};
function DateRangeFilter({
  from,
  to,
  onChange,
  emptyLabel,
  dateFormat,
  className,
  slotName = "date-range-filter",
  ...trigger
}) {
  const labels = useUiLabels(
    "dateRangeFilter",
    dateRangeFilterDefaultLabels,
    { emptyLabel, dateFormat }
  );
  const [open, setOpen] = useState7(false);
  const selected = from || to ? { from: parse(from), to: parse(to) } : void 0;
  const label = from ? to && to !== from ? `${format2(parse(from), labels.dateFormat)} - ${format2(parse(to), labels.dateFormat)}` : format2(parse(from), labels.dateFormat) : labels.emptyLabel;
  return /* @__PURE__ */ jsx23(
    CalendarPopover,
    {
      open,
      onOpenChange: setOpen,
      align: "end",
      trigger: /* @__PURE__ */ jsxs15(
        Button,
        {
          variant: "outline",
          ...trigger,
          className: cn(
            "h-11 rounded-2xl cursor-pointer border-dashed border-border",
            className
          ),
          slotName,
          children: [
            /* @__PURE__ */ jsx23(CalendarRange, { className: "mr-2 size-4" }),
            label,
            (from || to) && /* @__PURE__ */ jsx23(
              "span",
              {
                role: "button",
                tabIndex: 0,
                onClick: (event) => {
                  event.stopPropagation();
                  onChange({ from: void 0, to: void 0 });
                },
                className: "ml-2 inline-flex",
                children: /* @__PURE__ */ jsx23(X3, { className: "size-3.5 opacity-60 hover:opacity-100" })
              }
            )
          ]
        }
      ),
      children: /* @__PURE__ */ jsx23(
        Calendar,
        {
          mode: "range",
          numberOfMonths: 2,
          defaultMonth: parse(from),
          selected,
          onSelect: (range) => onChange({
            from: range?.from ? format2(range.from, "yyyy-MM-dd") : void 0,
            to: range?.to ? format2(range.to, "yyyy-MM-dd") : void 0
          }),
          className: "rounded-2xl bg-transparent"
        }
      )
    }
  );
}

// src/components/ui/donut-chart.tsx
import * as React6 from "react";
import { Cell, Pie, PieChart } from "recharts";
import { Fragment as Fragment2, jsx as jsx24, jsxs as jsxs16 } from "react/jsx-runtime";
function DonutChart({
  data,
  valueKey = "value",
  labelKey = "label",
  config,
  innerRadius = "65%",
  cornerRadius = 6,
  paddingAngle = 2,
  legend = "right",
  legendValue = "percentage",
  label,
  value,
  format: format3,
  locale,
  tooltip = true,
  animate = false,
  className,
  children,
  slotName = "donut-chart",
  ...props
}) {
  const slices = React6.useMemo(
    () => data.map((datum) => ({
      key: String(datum[labelKey]),
      amount: Math.max(0, Number(datum[valueKey]) || 0)
    })),
    [data, labelKey, valueKey]
  );
  const { series: resolved, config: merged } = React6.useMemo(
    () => resolveChartSeries(
      slices.map((slice) => ({ key: slice.key })),
      config
    ),
    [slices, config]
  );
  const total = slices.reduce((sum, slice) => sum + slice.amount, 0);
  const formatValue = React6.useMemo(
    () => numberFormatter(format3, locale),
    [format3, locale]
  );
  const formatPercentage = React6.useMemo(
    () => numberFormatter(
      { style: "percent", maximumFractionDigits: 0 },
      locale
    ),
    [locale]
  );
  const chartData = React6.useMemo(
    () => slices.map((slice, index) => ({
      ...slice,
      key: resolved[index].variableKey,
      fill: chartColorVariable(resolved[index].variableKey)
    })),
    [slices, resolved]
  );
  const centerValue = value ?? formatValue(total);
  const chartId = `donut-${React6.useId().replace(/:/g, "")}`;
  return /* @__PURE__ */ jsxs16(
    "div",
    {
      className: cn(
        elevatedSurface,
        nestedSurfaceReset,
        "gap-6 p-4 flex items-center bg-card",
        legend === "bottom" && "flex-col",
        className
      ),
      "data-chart": `chart-${chartId}`,
      ...props,
      "data-slot": slotName,
      children: [
        /* @__PURE__ */ jsxs16(
          "div",
          {
            className: cn(
              "relative",
              legend === "bottom" ? "w-full" : "flex-1"
            ),
            "data-slot": "donut-chart-ring",
            children: [
              /* @__PURE__ */ jsx24(
                ChartContainer,
                {
                  id: chartId,
                  config: merged,
                  slotName: "donut-chart-canvas",
                  className: "p-0 aspect-square w-full border-0 bg-transparent shadow-none",
                  children: /* @__PURE__ */ jsxs16(PieChart, { children: [
                    tooltip && /* @__PURE__ */ jsx24(
                      ChartTooltip,
                      {
                        cursor: false,
                        content: /* @__PURE__ */ jsx24(
                          ChartTooltipContent,
                          {
                            nameKey: "key",
                            hideLabel: true
                          }
                        )
                      }
                    ),
                    /* @__PURE__ */ jsx24(
                      Pie,
                      {
                        data: chartData,
                        dataKey: "amount",
                        nameKey: "key",
                        innerRadius,
                        cornerRadius,
                        paddingAngle,
                        strokeWidth: 0,
                        isAnimationActive: animate,
                        children: chartData.map((slice) => /* @__PURE__ */ jsx24(Cell, { fill: slice.fill }, slice.key))
                      }
                    )
                  ] })
                }
              ),
              (label !== void 0 || value !== void 0 || children !== void 0) && /* @__PURE__ */ jsx24(
                "div",
                {
                  className: "gap-1 inset-0 pointer-events-none absolute flex flex-col items-center justify-center",
                  "data-slot": "donut-chart-center",
                  children: children ?? /* @__PURE__ */ jsxs16(Fragment2, { children: [
                    label && /* @__PURE__ */ jsx24("span", { className: "text-sm text-muted-foreground", children: label }),
                    /* @__PURE__ */ jsx24("span", { className: "text-2xl font-semibold text-foreground tabular-nums", children: centerValue })
                  ] })
                }
              )
            ]
          }
        ),
        legend !== false && /* @__PURE__ */ jsx24(
          "ul",
          {
            className: cn(
              "gap-3 text-sm flex flex-col",
              legend === "right" ? "min-w-40" : "w-full"
            ),
            "data-slot": "donut-chart-legend",
            children: resolved.map((item, index) => /* @__PURE__ */ jsxs16(
              "li",
              {
                className: "gap-3 flex items-center justify-between",
                children: [
                  /* @__PURE__ */ jsxs16("span", { className: "gap-2 flex items-center", children: [
                    /* @__PURE__ */ jsx24(
                      "span",
                      {
                        "aria-hidden": "true",
                        className: "size-2.5 shrink-0 rounded-full",
                        style: {
                          backgroundColor: chartColorVariable(
                            item.variableKey
                          )
                        }
                      }
                    ),
                    /* @__PURE__ */ jsx24("span", { className: "text-foreground", children: item.label })
                  ] }),
                  legendValue !== "none" && /* @__PURE__ */ jsx24("span", { className: "text-muted-foreground tabular-nums", children: legendValue === "percentage" ? formatPercentage(
                    total === 0 ? 0 : slices[index].amount / total
                  ) : formatValue(slices[index].amount) })
                ]
              },
              item.variableKey
            ))
          }
        )
      ]
    }
  );
}

// src/components/ui/drawer.tsx
import { Drawer as DrawerPrimitive } from "vaul";
import { jsx as jsx25, jsxs as jsxs17 } from "react/jsx-runtime";
function Drawer({
  slotName = "drawer",
  ...props
}) {
  return /* @__PURE__ */ jsx25(DrawerPrimitive.Root, { ...props, "data-slot": slotName });
}
function DrawerTrigger({
  slotName = "drawer-trigger",
  ...props
}) {
  return /* @__PURE__ */ jsx25(DrawerPrimitive.Trigger, { ...props, "data-slot": slotName });
}
function DrawerPortal({
  slotName = "drawer-portal",
  ...props
}) {
  return /* @__PURE__ */ jsx25(DrawerPrimitive.Portal, { ...props, "data-slot": slotName });
}
function DrawerClose({
  slotName = "drawer-close",
  ...props
}) {
  return /* @__PURE__ */ jsx25(DrawerPrimitive.Close, { ...props, "data-slot": slotName });
}
function DrawerOverlay({
  className,
  slotName = "drawer-overlay",
  ...props
}) {
  return /* @__PURE__ */ jsx25(
    DrawerPrimitive.Overlay,
    {
      className: cn(
        "inset-0 bg-black/60 backdrop-blur-sm data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0 fixed z-50",
        className
      ),
      ...props,
      "data-slot": slotName
    }
  );
}
function DrawerContent({
  className,
  children,
  slotName = "drawer-content",
  ...props
}) {
  return /* @__PURE__ */ jsxs17(DrawerPortal, { slotName: "drawer-portal", children: [
    /* @__PURE__ */ jsx25(DrawerOverlay, {}),
    /* @__PURE__ */ jsxs17(
      DrawerPrimitive.Content,
      {
        className: cn(
          `${floatingSurface} group/drawer-content fixed z-50 flex h-auto flex-col border-border`,
          "data-[vaul-drawer-direction=top]:inset-x-0 data-[vaul-drawer-direction=top]:top-0 data-[vaul-drawer-direction=top]:mb-24 data-[vaul-drawer-direction=top]:rounded-b-3xl data-[vaul-drawer-direction=top]:max-h-[80vh] data-[vaul-drawer-direction=top]:border-b",
          "data-[vaul-drawer-direction=bottom]:inset-x-0 data-[vaul-drawer-direction=bottom]:bottom-0 data-[vaul-drawer-direction=bottom]:mt-24 data-[vaul-drawer-direction=bottom]:rounded-t-3xl data-[vaul-drawer-direction=bottom]:max-h-[80vh] data-[vaul-drawer-direction=bottom]:border-t",
          "data-[vaul-drawer-direction=right]:inset-y-0 data-[vaul-drawer-direction=right]:right-0 data-[vaul-drawer-direction=right]:sm:max-w-sm data-[vaul-drawer-direction=right]:rounded-l-3xl data-[vaul-drawer-direction=right]:w-3/4 data-[vaul-drawer-direction=right]:border-l",
          "data-[vaul-drawer-direction=left]:inset-y-0 data-[vaul-drawer-direction=left]:left-0 data-[vaul-drawer-direction=left]:sm:max-w-sm data-[vaul-drawer-direction=left]:rounded-r-3xl data-[vaul-drawer-direction=left]:w-3/4 data-[vaul-drawer-direction=left]:border-r",
          className
        ),
        ...props,
        "data-slot": slotName,
        children: [
          /* @__PURE__ */ jsx25("div", { className: "mt-4 h-2 mx-auto hidden w-[100px] shrink-0 rounded-full bg-muted group-data-[vaul-drawer-direction=bottom]/drawer-content:block" }),
          children
        ]
      }
    )
  ] });
}
function DrawerHeader({
  className,
  slotName = "drawer-header",
  ...props
}) {
  return /* @__PURE__ */ jsx25(
    "div",
    {
      className: cn(
        "gap-0.5 p-4 md:gap-1.5 md:text-left flex flex-col group-data-[vaul-drawer-direction=bottom]/drawer-content:text-center group-data-[vaul-drawer-direction=top]/drawer-content:text-center",
        className
      ),
      ...props,
      "data-slot": slotName
    }
  );
}
function DrawerFooter({
  className,
  slotName = "drawer-footer",
  ...props
}) {
  return /* @__PURE__ */ jsx25(
    "div",
    {
      className: cn("gap-2 p-4 mt-auto flex flex-col", className),
      ...props,
      "data-slot": slotName
    }
  );
}
function DrawerTitle({
  className,
  slotName = "drawer-title",
  ...props
}) {
  return /* @__PURE__ */ jsx25(
    DrawerPrimitive.Title,
    {
      className: cn("font-semibold text-foreground", className),
      ...props,
      "data-slot": slotName
    }
  );
}
function DrawerDescription({
  className,
  slotName = "drawer-description",
  ...props
}) {
  return /* @__PURE__ */ jsx25(
    DrawerPrimitive.Description,
    {
      className: cn("text-sm text-muted-foreground", className),
      ...props,
      "data-slot": slotName
    }
  );
}

// src/components/ui/dropzone.tsx
import { Paperclip, UploadCloud, X as X4 } from "lucide-react";
import * as React7 from "react";
import {
  ErrorCode,
  useDropzone
} from "react-dropzone";

// src/components/ui/progress.tsx
import { Progress as ProgressPrimitive } from "radix-ui";
import { jsx as jsx26 } from "react/jsx-runtime";
function Progress({
  className,
  value,
  slotName = "progress",
  ...props
}) {
  return /* @__PURE__ */ jsx26(
    ProgressPrimitive.Root,
    {
      value,
      className: cn(
        "h-2 relative w-full overflow-hidden rounded-full bg-primary/20",
        className
      ),
      ...props,
      "data-slot": slotName,
      children: /* @__PURE__ */ jsx26(
        ProgressPrimitive.Indicator,
        {
          "data-slot": "progress-indicator",
          className: "h-full w-full flex-1 bg-primary transition-all",
          style: { transform: `translateX(-${100 - (value || 0)}%)` }
        }
      )
    }
  );
}

// src/components/ui/dropzone.tsx
import { Fragment as Fragment3, jsx as jsx27, jsxs as jsxs18 } from "react/jsx-runtime";
var dropzoneDefaultLabels = {
  idleLabel: "Drag a file here",
  activeLabel: "Drop to attach",
  triggerLabel: "Choose a file",
  removeLabel: "Remove file",
  sizeLabel: (bytes) => formatBytes(bytes),
  invalidTypeLabel: "That file type is not accepted.",
  tooLargeLabel: (maxSize) => `That file is larger than ${formatBytes(maxSize)}.`,
  tooManyFilesLabel: (maxFiles) => `Attach at most ${maxFiles} files.`,
  rejectedLabel: "That file was not accepted.",
  progressLabel: (percent) => `Uploading, ${percent}% done`
};
function rejectionMessage(rejection, labels, maxSize, maxFiles) {
  const codes = rejection.errors.map((error) => error.code);
  if (codes.includes(ErrorCode.FileInvalidType)) {
    return labels.invalidTypeLabel;
  }
  if (codes.includes(ErrorCode.FileTooLarge) && maxSize !== void 0) {
    return labels.tooLargeLabel(maxSize);
  }
  if (codes.includes(ErrorCode.TooManyFiles) && maxFiles !== void 0) {
    return labels.tooManyFilesLabel(maxFiles);
  }
  return labels.rejectedLabel;
}
function Dropzone({
  accept,
  maxSize,
  maxFiles,
  multiple = false,
  disabled = false,
  files,
  onFilesChange,
  onRejected,
  error,
  progress,
  flat = false,
  inset = false,
  className,
  idleLabel,
  activeLabel,
  triggerLabel,
  removeLabel,
  sizeLabel,
  invalidTypeLabel,
  tooLargeLabel,
  tooManyFilesLabel,
  rejectedLabel,
  progressLabel,
  slotName = "dropzone",
  ...props
}) {
  const labels = useUiLabels("dropzone", dropzoneDefaultLabels, {
    idleLabel,
    activeLabel,
    triggerLabel,
    removeLabel,
    sizeLabel,
    invalidTypeLabel,
    tooLargeLabel,
    tooManyFilesLabel,
    rejectedLabel,
    progressLabel
  });
  const errorId = React7.useId();
  const [ownFiles, setOwnFiles] = React7.useState([]);
  const [rejected, setRejected] = React7.useState(null);
  const chosen = files ?? ownFiles;
  const message = error ?? rejected ?? void 0;
  function publish(next) {
    if (files === void 0) {
      setOwnFiles(next);
    }
    onFilesChange?.(next);
  }
  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    accept,
    maxSize,
    maxFiles,
    multiple,
    disabled,
    onDrop: (accepted, rejections) => {
      setRejected(
        rejections.length > 0 ? rejectionMessage(rejections[0], labels, maxSize, maxFiles) : null
      );
      if (rejections.length > 0) {
        onRejected?.(rejections);
      }
      if (accepted.length === 0) {
        return;
      }
      publish(multiple ? [...chosen, ...accepted] : accepted.slice(0, 1));
    }
  });
  const inviting = multiple || chosen.length === 0;
  function remove(target) {
    setRejected(null);
    publish(chosen.filter((file) => file !== target));
  }
  return /* @__PURE__ */ jsxs18(
    "div",
    {
      className: cn(
        elevatedSurface,
        "gap-3 p-3 flex flex-col bg-card",
        flat && flatSurface,
        inset && recessedSurface,
        className
      ),
      ...props,
      "data-slot": slotName,
      children: [
        /* @__PURE__ */ jsxs18(
          "div",
          {
            ...getRootProps({
              "aria-invalid": message ? true : void 0,
              "aria-describedby": message ? errorId : void 0,
              "aria-disabled": disabled || void 0,
              "data-drag-active": isDragActive || void 0,
              "data-disabled": disabled || void 0,
              tabIndex: inviting ? 0 : -1,
              className: cn(
                "outline-hidden",
                inviting ? cn(
                  recessedSurface,
                  focusRing,
                  "gap-2 px-6 py-8 flex cursor-pointer flex-col items-center border border-dashed border-border text-center transition-colors",
                  isDragActive && "border-primary bg-primary/10",
                  message && "border-destructive",
                  disabled && "cursor-not-allowed opacity-50"
                ) : "contents"
              )
            }),
            "data-slot": "dropzone-area",
            children: [
              /* @__PURE__ */ jsx27("input", { ...getInputProps(), "data-slot": "dropzone-input" }),
              inviting && /* @__PURE__ */ jsxs18(Fragment3, { children: [
                /* @__PURE__ */ jsx27(
                  UploadCloud,
                  {
                    "aria-hidden": "true",
                    className: "size-5 text-muted-foreground"
                  }
                ),
                /* @__PURE__ */ jsx27("p", { className: "text-sm font-medium text-foreground", children: isDragActive ? labels.activeLabel : labels.idleLabel }),
                /* @__PURE__ */ jsx27(
                  Button,
                  {
                    type: "button",
                    variant: "outline",
                    size: "sm",
                    tabIndex: -1,
                    disabled,
                    slotName: "dropzone-trigger",
                    onClick: (event) => {
                      event.stopPropagation();
                      open();
                    },
                    children: labels.triggerLabel
                  }
                )
              ] })
            ]
          }
        ),
        chosen.length > 0 && /* @__PURE__ */ jsx27("ul", { className: "gap-2 flex flex-col", "data-slot": "dropzone-files", children: chosen.map((file) => /* @__PURE__ */ jsxs18(
          "li",
          {
            "data-slot": "dropzone-file",
            className: cn(
              compactRadius,
              "gap-2 px-3 py-2 flex items-center bg-muted"
            ),
            children: [
              /* @__PURE__ */ jsx27(
                Paperclip,
                {
                  "aria-hidden": "true",
                  className: "size-4 shrink-0 text-muted-foreground"
                }
              ),
              /* @__PURE__ */ jsx27("span", { className: "min-w-0 text-sm font-medium flex-1 truncate text-foreground", children: file.name }),
              /* @__PURE__ */ jsx27(
                "span",
                {
                  "data-slot": "dropzone-file-size",
                  className: "text-xs font-medium text-muted-foreground",
                  children: labels.sizeLabel(file.size)
                }
              ),
              /* @__PURE__ */ jsx27(
                Button,
                {
                  type: "button",
                  variant: "ghost",
                  size: "icon-sm",
                  slotName: "dropzone-remove",
                  "aria-label": labels.removeLabel,
                  disabled,
                  onClick: () => remove(file),
                  children: /* @__PURE__ */ jsx27(X4, { "aria-hidden": "true" })
                }
              )
            ]
          },
          `${file.name}-${file.size}-${file.lastModified}`
        )) }),
        progress !== void 0 && /* @__PURE__ */ jsx27(
          Progress,
          {
            value: progress,
            slotName: "dropzone-progress",
            "aria-label": labels.progressLabel(Math.round(progress))
          }
        ),
        /* @__PURE__ */ jsx27(
          FieldError,
          {
            id: errorId,
            message,
            slotName: "dropzone-error"
          }
        )
      ]
    }
  );
}

// src/components/ui/form.tsx
import { Slot as Slot2 } from "@radix-ui/react-slot";
import * as React8 from "react";
import {
  Controller,
  FormProvider,
  useFormContext
} from "react-hook-form";
import { jsx as jsx28 } from "react/jsx-runtime";
var Form = FormProvider;
var FormFieldContext = React8.createContext(
  {}
);
var FormField = ({
  ...props
}) => {
  return /* @__PURE__ */ jsx28(FormFieldContext.Provider, { value: { name: props.name }, children: /* @__PURE__ */ jsx28(Controller, { ...props }) });
};
var useFormField = () => {
  const fieldContext = React8.useContext(FormFieldContext);
  const itemContext = React8.useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();
  const fieldState = getFieldState(fieldContext.name, formState);
  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }
  const { id } = itemContext;
  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState
  };
};
var FormItemContext = React8.createContext(
  {}
);
var FormItem = React8.forwardRef(({ className, slotName = "form-item", ...props }, ref) => {
  const id = React8.useId();
  return /* @__PURE__ */ jsx28(FormItemContext.Provider, { value: { id }, children: /* @__PURE__ */ jsx28(
    "div",
    {
      ref,
      className: cn("space-y-2", className),
      ...props,
      "data-slot": slotName
    }
  ) });
});
FormItem.displayName = "FormItem";
var FormLabel = React8.forwardRef(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField();
  return /* @__PURE__ */ jsx28(
    Label,
    {
      ref,
      className: cn(error && "text-destructive", className),
      htmlFor: formItemId,
      ...props
    }
  );
});
FormLabel.displayName = "FormLabel";
var FormControl = React8.forwardRef(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField();
  return /* @__PURE__ */ jsx28(
    Slot2,
    {
      ref,
      id: formItemId,
      "aria-describedby": !error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`,
      "aria-invalid": !!error,
      ...props
    }
  );
});
FormControl.displayName = "FormControl";
var FormDescription = React8.forwardRef(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField();
  return /* @__PURE__ */ jsx28(
    "p",
    {
      ref,
      id: formDescriptionId,
      className: cn("text-[0.8rem] text-muted-foreground", className),
      ...props
    }
  );
});
FormDescription.displayName = "FormDescription";
var FormMessage = React8.forwardRef(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message ?? "") : children;
  if (!body) {
    return null;
  }
  return /* @__PURE__ */ jsx28(
    "p",
    {
      ref,
      id: formMessageId,
      className: cn(
        "font-medium text-[0.8rem] text-destructive",
        className
      ),
      ...props,
      children: body
    }
  );
});
FormMessage.displayName = "FormMessage";

// src/components/ui/hover-card.tsx
import { HoverCard as HoverCardPrimitive } from "radix-ui";
import { jsx as jsx29 } from "react/jsx-runtime";
function HoverCard({
  slotName = "hover-card",
  ...props
}) {
  return /* @__PURE__ */ jsx29(HoverCardPrimitive.Root, { ...props, "data-slot": slotName });
}
function HoverCardTrigger({
  slotName = "hover-card-trigger",
  ...props
}) {
  return /* @__PURE__ */ jsx29(HoverCardPrimitive.Trigger, { ...props, "data-slot": slotName });
}
function HoverCardContent({
  className,
  align = "center",
  sideOffset = 4,
  slotName = "hover-card-content",
  container,
  ...props
}) {
  const portalContainer = useSheetPortalContainer(container);
  return /* @__PURE__ */ jsx29(
    HoverCardPrimitive.Portal,
    {
      container: portalContainer,
      "data-slot": "hover-card-portal",
      children: /* @__PURE__ */ jsx29(
        HoverCardPrimitive.Content,
        {
          align,
          sideOffset,
          className: cn(
            `${panelSurface} w-64 p-4 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 z-50 origin-(--radix-hover-card-content-transform-origin) bg-popover/90 outline-hidden`,
            className
          ),
          ...props,
          "data-slot": slotName
        }
      )
    }
  );
}

// src/components/ui/line-chart.tsx
import { jsx as jsx30 } from "react/jsx-runtime";
function LineChart({
  slotName = "line-chart",
  ...props
}) {
  return /* @__PURE__ */ jsx30(CartesianChart, { kind: "line", slotName, ...props });
}

// src/components/ui/menubar.tsx
import { CheckIcon as CheckIcon2, ChevronRightIcon as ChevronRightIcon2, CircleIcon as CircleIcon2 } from "lucide-react";
import { Menubar as MenubarPrimitive2 } from "radix-ui";

// src/components/ui/menubar-portal.tsx
import { Menubar as MenubarPrimitive } from "radix-ui";
import { jsx as jsx31 } from "react/jsx-runtime";
function MenubarPortal({
  slotName = "menubar-portal",
  container,
  ...props
}) {
  const portalContainer = useSheetPortalContainer(container);
  return /* @__PURE__ */ jsx31(
    MenubarPrimitive.Portal,
    {
      container: portalContainer,
      ...props,
      "data-slot": slotName
    }
  );
}

// src/components/ui/menubar.tsx
import { jsx as jsx32, jsxs as jsxs19 } from "react/jsx-runtime";
function Menubar({
  className,
  slotName = "menubar",
  ...props
}) {
  return /* @__PURE__ */ jsx32(
    MenubarPrimitive2.Root,
    {
      className: cn(
        "h-9 gap-1 p-1 shadow-sm backdrop-blur-xl rounded-2xl flex items-center border border-border bg-card",
        className
      ),
      ...props,
      "data-slot": slotName
    }
  );
}
function MenubarMenu({
  slotName = "menubar-menu",
  ...props
}) {
  return /* @__PURE__ */ jsx32(MenubarPrimitive2.Menu, { ...props, "data-slot": slotName });
}
function MenubarGroup({
  slotName = "menubar-group",
  ...props
}) {
  return /* @__PURE__ */ jsx32(MenubarPrimitive2.Group, { ...props, "data-slot": slotName });
}
function MenubarRadioGroup({
  slotName = "menubar-radio-group",
  ...props
}) {
  return /* @__PURE__ */ jsx32(MenubarPrimitive2.RadioGroup, { ...props, "data-slot": slotName });
}
function MenubarTrigger({
  className,
  slotName = "menubar-trigger",
  ...props
}) {
  return /* @__PURE__ */ jsx32(
    MenubarPrimitive2.Trigger,
    {
      className: cn(
        "px-2 py-1 text-sm font-medium rounded-xl flex items-center outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
        className
      ),
      ...props,
      "data-slot": slotName
    }
  );
}
function MenubarContent({
  className,
  align = "start",
  alignOffset = -4,
  sideOffset = 8,
  slotName = "menubar-content",
  ...props
}) {
  return /* @__PURE__ */ jsx32(MenubarPortal, { children: /* @__PURE__ */ jsx32(
    MenubarPrimitive2.Content,
    {
      align,
      alignOffset,
      sideOffset,
      className: cn(
        `${menuSurface} p-1.5 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 z-50 min-w-[12rem] origin-(--radix-menubar-content-transform-origin) overflow-hidden`,
        className
      ),
      ...props,
      "data-slot": slotName
    }
  ) });
}
function MenubarItem({
  className,
  inset,
  variant: variant2 = "default",
  slotName = "menubar-item",
  ...props
}) {
  return /* @__PURE__ */ jsx32(
    MenubarPrimitive2.Item,
    {
      "data-inset": inset,
      "data-variant": variant2,
      className: cn(
        "gap-2 px-2 py-1.5 text-sm data-[inset]:pl-8 [&_svg:not([class*='size-'])]:size-4 rounded-xl relative flex cursor-default items-center outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='text-'])]:text-muted-foreground data-[variant=destructive]:*:[svg]:text-destructive!",
        className
      ),
      ...props,
      "data-slot": slotName
    }
  );
}
function MenubarCheckboxItem({
  className,
  children,
  checked,
  slotName = "menubar-checkbox-item",
  ...props
}) {
  return /* @__PURE__ */ jsxs19(
    MenubarPrimitive2.CheckboxItem,
    {
      className: cn(
        "gap-2 rounded-xl py-1.5 pr-2 pl-8 text-sm [&_svg:not([class*='size-'])]:size-4 relative flex cursor-default items-center outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className
      ),
      checked,
      ...props,
      "data-slot": slotName,
      children: [
        /* @__PURE__ */ jsx32("span", { className: "left-2 size-3.5 pointer-events-none absolute flex items-center justify-center", children: /* @__PURE__ */ jsx32(MenubarPrimitive2.ItemIndicator, { children: /* @__PURE__ */ jsx32(CheckIcon2, { className: "size-4" }) }) }),
        children
      ]
    }
  );
}
function MenubarRadioItem({
  className,
  children,
  slotName = "menubar-radio-item",
  ...props
}) {
  return /* @__PURE__ */ jsxs19(
    MenubarPrimitive2.RadioItem,
    {
      className: cn(
        "gap-2 rounded-xl py-1.5 pr-2 pl-8 text-sm [&_svg:not([class*='size-'])]:size-4 relative flex cursor-default items-center outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className
      ),
      ...props,
      "data-slot": slotName,
      children: [
        /* @__PURE__ */ jsx32("span", { className: "left-2 size-3.5 pointer-events-none absolute flex items-center justify-center", children: /* @__PURE__ */ jsx32(MenubarPrimitive2.ItemIndicator, { children: /* @__PURE__ */ jsx32(CircleIcon2, { className: "size-2 fill-current" }) }) }),
        children
      ]
    }
  );
}
function MenubarLabel({
  className,
  inset,
  slotName = "menubar-label",
  ...props
}) {
  return /* @__PURE__ */ jsx32(
    MenubarPrimitive2.Label,
    {
      "data-inset": inset,
      className: cn(
        "px-2 py-1.5 text-sm font-medium data-[inset]:pl-8",
        className
      ),
      ...props,
      "data-slot": slotName
    }
  );
}
function MenubarSeparator({
  className,
  slotName = "menubar-separator",
  ...props
}) {
  return /* @__PURE__ */ jsx32(
    MenubarPrimitive2.Separator,
    {
      className: cn("-mx-1 my-1 h-px bg-border", className),
      ...props,
      "data-slot": slotName
    }
  );
}
function MenubarShortcut({
  className,
  slotName = "menubar-shortcut",
  ...props
}) {
  return /* @__PURE__ */ jsx32(
    "span",
    {
      className: cn(
        "text-xs tracking-widest ml-auto text-muted-foreground",
        className
      ),
      ...props,
      "data-slot": slotName
    }
  );
}
function MenubarSub({
  slotName = "menubar-sub",
  ...props
}) {
  return /* @__PURE__ */ jsx32(MenubarPrimitive2.Sub, { ...props, "data-slot": slotName });
}
function MenubarSubTrigger({
  className,
  inset,
  children,
  slotName = "menubar-sub-trigger",
  ...props
}) {
  return /* @__PURE__ */ jsxs19(
    MenubarPrimitive2.SubTrigger,
    {
      "data-inset": inset,
      className: cn(
        "px-2 py-1.5 text-sm data-[inset]:pl-8 rounded-xl flex cursor-default items-center outline-none select-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
        className
      ),
      ...props,
      "data-slot": slotName,
      children: [
        children,
        /* @__PURE__ */ jsx32(ChevronRightIcon2, { className: "h-4 w-4 ml-auto" })
      ]
    }
  );
}
function MenubarSubContent({
  className,
  slotName = "menubar-sub-content",
  ...props
}) {
  return /* @__PURE__ */ jsx32(
    MenubarPrimitive2.SubContent,
    {
      className: cn(
        `${menuSurface} p-1.5 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 z-50 min-w-[8rem] origin-(--radix-menubar-content-transform-origin) overflow-hidden`,
        className
      ),
      ...props,
      "data-slot": slotName
    }
  );
}

// src/components/ui/navigation-menu.tsx
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { cva as cva2 } from "class-variance-authority";
import { ChevronDownIcon } from "lucide-react";
import { jsx as jsx33, jsxs as jsxs20 } from "react/jsx-runtime";
function NavigationMenu({
  className,
  children,
  viewport = true,
  slotName = "navigation-menu",
  ...props
}) {
  return /* @__PURE__ */ jsxs20(
    NavigationMenuPrimitive.Root,
    {
      "data-viewport": viewport,
      className: cn(
        "group/navigation-menu relative flex max-w-max flex-1 items-center justify-center",
        className
      ),
      ...props,
      "data-slot": slotName,
      children: [
        children,
        viewport && /* @__PURE__ */ jsx33(NavigationMenuViewport, {})
      ]
    }
  );
}
function NavigationMenuList({
  className,
  slotName = "navigation-menu-list",
  ...props
}) {
  return /* @__PURE__ */ jsx33(
    NavigationMenuPrimitive.List,
    {
      className: cn(
        "group gap-1 flex flex-1 list-none items-center justify-center",
        className
      ),
      ...props,
      "data-slot": slotName
    }
  );
}
function NavigationMenuItem({
  className,
  slotName = "navigation-menu-item",
  ...props
}) {
  return /* @__PURE__ */ jsx33(
    NavigationMenuPrimitive.Item,
    {
      className: cn("relative", className),
      ...props,
      "data-slot": slotName
    }
  );
}
var navigationMenuTriggerStyle = cva2(
  "group inline-flex h-11 w-max items-center justify-center rounded-xl bg-background px-4 text-sm font-medium data-[state=open]:font-semibold hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 data-[active=true]:bg-accent/50 data-[state=open]:bg-accent/50 data-[active=true]:text-accent-foreground transition-[color,box-shadow] outline-none focus-visible:outline-solid focus-visible:outline-1 focus-visible:outline-offset-0 focus-visible:outline-ring"
);
function NavigationMenuTrigger({
  className,
  children,
  slotName = "navigation-menu-trigger",
  ...props
}) {
  return /* @__PURE__ */ jsxs20(
    NavigationMenuPrimitive.Trigger,
    {
      className: cn(navigationMenuTriggerStyle(), "group", className),
      ...props,
      "data-slot": slotName,
      children: [
        children,
        " ",
        /* @__PURE__ */ jsx33(
          ChevronDownIcon,
          {
            className: "ml-1 size-3 relative top-[1px] transition duration-300 group-data-[state=open]:rotate-180",
            "aria-hidden": "true"
          }
        )
      ]
    }
  );
}
function NavigationMenuContent({
  className,
  slotName = "navigation-menu-content",
  ...props
}) {
  return /* @__PURE__ */ jsx33(
    NavigationMenuPrimitive.Content,
    {
      className: cn(
        "data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 top-0 left-0 p-2 pr-2.5 md:absolute md:w-auto w-full",
        "group-data-[viewport=false]/navigation-menu:data-[state=open]:animate-in group-data-[viewport=false]/navigation-menu:data-[state=closed]:animate-out group-data-[viewport=false]/navigation-menu:data-[state=closed]:zoom-out-95 group-data-[viewport=false]/navigation-menu:data-[state=open]:zoom-in-95 group-data-[viewport=false]/navigation-menu:data-[state=open]:fade-in-0 group-data-[viewport=false]/navigation-menu:data-[state=closed]:fade-out-0 group-data-[viewport=false]/navigation-menu:mt-1.5 group-data-[viewport=false]/navigation-menu:shadow-2xl group-data-[viewport=false]/navigation-menu:backdrop-blur-xl group-data-[viewport=false]/navigation-menu:rounded-2xl group-data-[viewport=false]/navigation-menu:top-full group-data-[viewport=false]/navigation-menu:overflow-hidden group-data-[viewport=false]/navigation-menu:border group-data-[viewport=false]/navigation-menu:border-border group-data-[viewport=false]/navigation-menu:bg-popover/90 group-data-[viewport=false]/navigation-menu:text-popover-foreground group-data-[viewport=false]/navigation-menu:duration-200 **:data-[slot=navigation-menu-link]:focus:ring-0 **:data-[slot=navigation-menu-link]:focus:outline-none",
        className
      ),
      ...props,
      "data-slot": slotName
    }
  );
}
function NavigationMenuViewport({
  className,
  slotName = "navigation-menu-viewport",
  ...props
}) {
  return /* @__PURE__ */ jsx33(
    "div",
    {
      className: cn(
        "left-0 absolute top-full isolate z-50 flex justify-center"
      ),
      children: /* @__PURE__ */ jsx33(
        NavigationMenuPrimitive.Viewport,
        {
          className: cn(
            `${panelSurface} origin-top-center data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 mt-1.5 md:w-[var(--radix-navigation-menu-viewport-width)] relative h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden bg-popover/90`,
            className
          ),
          ...props,
          "data-slot": slotName
        }
      )
    }
  );
}
function NavigationMenuLink({
  className,
  slotName = "navigation-menu-link",
  ...props
}) {
  return /* @__PURE__ */ jsx33(
    NavigationMenuPrimitive.Link,
    {
      className: cn(
        "gap-1 p-2 text-sm [&_svg:not([class*='size-'])]:size-4 rounded-xl data-[active=true]:font-semibold flex flex-col transition-[color,box-shadow] outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:outline-1 focus-visible:outline-offset-0 focus-visible:outline-ring focus-visible:outline-solid data-[active=true]:bg-accent/50 data-[active=true]:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground",
        className
      ),
      ...props,
      "data-slot": slotName
    }
  );
}
function NavigationMenuIndicator({
  className,
  slotName = "navigation-menu-indicator",
  ...props
}) {
  return /* @__PURE__ */ jsx33(
    NavigationMenuPrimitive.Indicator,
    {
      className: cn(
        "data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in h-1.5 top-full z-[1] flex items-end justify-center overflow-hidden",
        className
      ),
      ...props,
      "data-slot": slotName,
      children: /* @__PURE__ */ jsx33("div", { className: "h-2 w-2 shadow-md rounded-tl-xs relative top-[60%] rotate-45 bg-border" })
    }
  );
}

// src/components/ui/pagination.tsx
import {
  ChevronLeftIcon,
  ChevronRightIcon as ChevronRightIcon3,
  MoreHorizontalIcon
} from "lucide-react";
import { jsx as jsx34, jsxs as jsxs21 } from "react/jsx-runtime";
function Pagination({
  className,
  slotName = "pagination",
  ...props
}) {
  return /* @__PURE__ */ jsx34(
    "nav",
    {
      role: "navigation",
      "aria-label": "pagination",
      className: cn("mx-auto flex w-full justify-center", className),
      ...props,
      "data-slot": slotName
    }
  );
}
function PaginationContent({
  className,
  slotName = "pagination-content",
  ...props
}) {
  return /* @__PURE__ */ jsx34(
    "ul",
    {
      className: cn("gap-1 flex flex-row items-center", className),
      ...props,
      "data-slot": slotName
    }
  );
}
function PaginationItem({
  slotName = "pagination-item",
  ...props
}) {
  return /* @__PURE__ */ jsx34("li", { ...props, "data-slot": slotName });
}
function PaginationLink({
  className,
  isActive,
  size = "icon",
  slotName = "pagination-link",
  ...props
}) {
  return /* @__PURE__ */ jsx34(
    "a",
    {
      "aria-current": isActive ? "page" : void 0,
      "data-active": isActive,
      className: cn(
        buttonVariants({
          variant: isActive ? "outline" : "ghost",
          size
        }),
        className
      ),
      ...props,
      "data-slot": slotName
    }
  );
}
function PaginationPrevious({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxs21(
    PaginationLink,
    {
      "aria-label": "Go to previous page",
      size: "default",
      className: cn("gap-1 px-2.5 sm:pl-2.5", className),
      ...props,
      children: [
        /* @__PURE__ */ jsx34(ChevronLeftIcon, {}),
        /* @__PURE__ */ jsx34("span", { className: "sm:block hidden", children: "Previous" })
      ]
    }
  );
}
function PaginationNext({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxs21(
    PaginationLink,
    {
      "aria-label": "Go to next page",
      size: "default",
      className: cn("gap-1 px-2.5 sm:pr-2.5", className),
      ...props,
      children: [
        /* @__PURE__ */ jsx34("span", { className: "sm:block hidden", children: "Next" }),
        /* @__PURE__ */ jsx34(ChevronRightIcon3, {})
      ]
    }
  );
}
function PaginationEllipsis({
  className,
  slotName = "pagination-ellipsis",
  ...props
}) {
  return /* @__PURE__ */ jsxs21(
    "span",
    {
      "aria-hidden": true,
      className: cn(
        "size-9 rounded-xl flex items-center justify-center",
        className
      ),
      ...props,
      "data-slot": slotName,
      children: [
        /* @__PURE__ */ jsx34(MoreHorizontalIcon, { className: "size-4" }),
        /* @__PURE__ */ jsx34("span", { className: "sr-only", children: "More pages" })
      ]
    }
  );
}

// src/components/ui/placeholder-pattern.tsx
import { useId as useId5 } from "react";
import { jsx as jsx35, jsxs as jsxs22 } from "react/jsx-runtime";
function PlaceholderPattern({
  className,
  slotName = "placeholder-pattern"
}) {
  const patternId = useId5();
  return /* @__PURE__ */ jsxs22("svg", { className, fill: "none", "data-slot": slotName, children: [
    /* @__PURE__ */ jsx35("defs", { children: /* @__PURE__ */ jsx35(
      "pattern",
      {
        id: patternId,
        x: "0",
        y: "0",
        width: "10",
        height: "10",
        patternUnits: "userSpaceOnUse",
        children: /* @__PURE__ */ jsx35(
          "path",
          {
            d: "M-3 13 15-5M-5 5l18-18M-1 21 17 3",
            stroke: "currentColor"
          }
        )
      }
    ) }),
    /* @__PURE__ */ jsx35(
      "rect",
      {
        stroke: "none",
        fill: `url(#${patternId})`,
        width: "100%",
        height: "100%"
      }
    )
  ] });
}

// src/components/ui/radio-group.tsx
import { CircleIcon as CircleIcon3 } from "lucide-react";
import { RadioGroup as RadioGroupPrimitive } from "radix-ui";
import { jsx as jsx36 } from "react/jsx-runtime";
function RadioGroup({
  className,
  slotName = "radio-group",
  ...props
}) {
  return /* @__PURE__ */ jsx36(
    RadioGroupPrimitive.Root,
    {
      className: cn("gap-3 grid", className),
      ...props,
      "data-slot": slotName
    }
  );
}
function RadioGroupItem({
  className,
  slotName = "radio-group-item",
  ...props
}) {
  return /* @__PURE__ */ jsx36(
    RadioGroupPrimitive.Item,
    {
      className: cn(
        `size-5 shadow-xs aspect-square shrink-0 rounded-full border border-border text-primary transition-[color,box-shadow] disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 ${focusRing}`,
        className
      ),
      ...props,
      "data-slot": slotName,
      children: /* @__PURE__ */ jsx36(
        RadioGroupPrimitive.Indicator,
        {
          "data-slot": "radio-group-indicator",
          className: "relative flex items-center justify-center",
          children: /* @__PURE__ */ jsx36(CircleIcon3, { className: "size-2.5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 fill-primary" })
        }
      )
    }
  );
}

// src/components/ui/resizable.tsx
import * as ResizablePrimitive from "react-resizable-panels";
import { jsx as jsx37 } from "react/jsx-runtime";
function ResizablePanelGroup({
  className,
  slotName = "resizable-panel-group",
  ...props
}) {
  return /* @__PURE__ */ jsx37(
    ResizablePrimitive.Group,
    {
      className: cn(
        elevatedSurface,
        nestedSurfaceReset,
        "flex h-full w-full overflow-hidden bg-card aria-[orientation=vertical]:flex-col",
        className
      ),
      ...props,
      "data-slot": slotName
    }
  );
}
function ResizablePanel({
  slotName = "resizable-panel",
  ...props
}) {
  return /* @__PURE__ */ jsx37(ResizablePrimitive.Panel, { ...props, "data-slot": slotName });
}
function ResizableHandle({
  withHandle,
  className,
  slotName = "resizable-handle",
  ...props
}) {
  return /* @__PURE__ */ jsx37(
    ResizablePrimitive.Separator,
    {
      className: cn(
        "after:inset-y-0 after:w-1 aria-[orientation=horizontal]:after:left-0 aria-[orientation=horizontal]:after:h-1 aria-[orientation=horizontal]:after:translate-x-0 relative flex w-px items-center justify-center bg-border after:absolute after:left-1/2 after:-translate-x-1/2 focus-visible:outline-1 focus-visible:outline-offset-0 focus-visible:outline-ring focus-visible:outline-solid aria-[orientation=horizontal]:h-px aria-[orientation=horizontal]:w-full aria-[orientation=horizontal]:after:w-full aria-[orientation=horizontal]:after:-translate-y-1/2 [&[aria-orientation=horizontal]>div]:rotate-90",
        className
      ),
      ...props,
      "data-slot": slotName,
      children: withHandle && /* @__PURE__ */ jsx37("div", { className: "h-8 w-1.5 z-10 rounded-full bg-muted-foreground/40 transition-colors group-hover:bg-muted-foreground/60" })
    }
  );
}

// src/components/ui/save-status.tsx
import { Check as Check3, TriangleAlert } from "lucide-react";
import * as React9 from "react";
import { jsx as jsx38, jsxs as jsxs23 } from "react/jsx-runtime";
var saveStatusLabels = {
  error: "Your changes could not be saved",
  idle: "Changes are saved automatically",
  saved: "Saved",
  saving: "Saving"
};
var SAVED_DURATION = 2e3;
function SaveStatus({
  status,
  message,
  showIdle = false,
  savedDuration = SAVED_DURATION,
  labels,
  className,
  slotName = "save-status",
  ...props
}) {
  const text = useUiLabels("saveStatus", saveStatusLabels, labels);
  const [faded, setFaded] = React9.useState(false);
  React9.useEffect(() => {
    if (status !== "saved" || savedDuration <= 0) {
      setFaded(false);
      return;
    }
    setFaded(false);
    const timer = setTimeout(() => setFaded(true), savedDuration);
    return () => clearTimeout(timer);
  }, [status, savedDuration, message]);
  const hidden = status === "saved" && faded;
  return /* @__PURE__ */ jsxs23(
    "div",
    {
      ...props,
      "data-state": status,
      "data-faded": hidden || void 0,
      role: "status",
      "aria-live": "polite",
      "aria-hidden": hidden || void 0,
      className: cn(
        "gap-2 text-xs font-medium min-h-5 flex items-center transition-opacity duration-300",
        hidden ? "opacity-0" : "opacity-100",
        className
      ),
      "data-slot": slotName,
      children: [
        status === "idle" && showIdle && /* @__PURE__ */ jsx38(
          "span",
          {
            "data-slot": "save-status-idle",
            className: "text-muted-foreground",
            children: text.idle
          }
        ),
        status === "saving" && /* @__PURE__ */ jsxs23(
          "span",
          {
            "data-slot": "save-status-saving",
            className: "gap-2 flex items-center text-muted-foreground",
            children: [
              /* @__PURE__ */ jsx38(Spinner, { size: "sm", label: "", "aria-hidden": "true" }),
              text.saving
            ]
          }
        ),
        status === "saved" && /* @__PURE__ */ jsxs23(
          "span",
          {
            "data-slot": "save-status-saved",
            className: "gap-2 flex items-center text-success",
            children: [
              /* @__PURE__ */ jsx38(Check3, { "aria-hidden": "true", className: "size-3.5" }),
              text.saved
            ]
          }
        ),
        status === "error" && /* @__PURE__ */ jsxs23(
          "span",
          {
            "data-slot": "save-status-error",
            className: "gap-2 flex items-center text-destructive",
            children: [
              /* @__PURE__ */ jsx38(TriangleAlert, { "aria-hidden": "true", className: "size-3.5" }),
              message ?? text.error
            ]
          }
        )
      ]
    }
  );
}

// src/components/ui/scroll-area.tsx
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import * as React10 from "react";
import { jsx as jsx39, jsxs as jsxs24 } from "react/jsx-runtime";
var ScrollArea = React10.forwardRef(({ className, children, slotName = "scroll-area", ...props }, ref) => /* @__PURE__ */ jsxs24(
  ScrollAreaPrimitive.Root,
  {
    ref,
    className: cn(
      elevatedSurface,
      nestedSurfaceReset,
      nestedEdgeToEdge,
      "relative overflow-hidden bg-card",
      className
    ),
    ...props,
    "data-slot": slotName,
    children: [
      /* @__PURE__ */ jsx39(ScrollAreaPrimitive.Viewport, { className: "h-full w-full rounded-[inherit]", children }),
      /* @__PURE__ */ jsx39(ScrollBar, {}),
      /* @__PURE__ */ jsx39(ScrollAreaPrimitive.Corner, {})
    ]
  }
));
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;
var ScrollBar = React10.forwardRef(
  ({
    className,
    orientation = "vertical",
    slotName = "scroll-area-scrollbar",
    ...props
  }, ref) => /* @__PURE__ */ jsx39(
    ScrollAreaPrimitive.ScrollAreaScrollbar,
    {
      ref,
      orientation,
      className: cn(
        "flex touch-none transition-colors select-none",
        orientation === "vertical" && "w-2.5 h-full border-l border-l-transparent p-[1px]",
        orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent p-[1px]",
        className
      ),
      ...props,
      "data-slot": slotName,
      children: /* @__PURE__ */ jsx39(ScrollAreaPrimitive.ScrollAreaThumb, { className: "relative flex-1 rounded-full bg-border" })
    }
  )
);
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;

// src/components/ui/slider.tsx
import { Slider as SliderPrimitive } from "radix-ui";
import * as React11 from "react";
import { jsx as jsx40, jsxs as jsxs25 } from "react/jsx-runtime";
function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  slotName = "slider",
  ...props
}) {
  const _values = React11.useMemo(
    () => Array.isArray(value) ? value : Array.isArray(defaultValue) ? defaultValue : [min, max],
    [value, defaultValue, min, max]
  );
  return /* @__PURE__ */ jsxs25(
    SliderPrimitive.Root,
    {
      defaultValue,
      value,
      min,
      max,
      className: cn(
        "data-[orientation=vertical]:min-h-44 relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
        className
      ),
      ...props,
      "data-slot": slotName,
      children: [
        /* @__PURE__ */ jsx40(
          SliderPrimitive.Track,
          {
            "data-slot": "slider-track",
            className: cn(
              "data-[orientation=horizontal]:h-1.5 data-[orientation=vertical]:w-1.5 relative grow overflow-hidden rounded-full bg-muted data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full"
            ),
            children: /* @__PURE__ */ jsx40(
              SliderPrimitive.Range,
              {
                "data-slot": "slider-range",
                className: cn(
                  "absolute bg-primary data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full"
                )
              }
            )
          }
        ),
        Array.from({ length: _values.length }, (_, index) => /* @__PURE__ */ jsx40(
          SliderPrimitive.Thumb,
          {
            "data-slot": "slider-thumb",
            className: cn(
              "size-5 shadow-sm block shrink-0 rounded-full border border-primary bg-background transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-50",
              focusRing
            )
          },
          index
        ))
      ]
    }
  );
}

// src/components/ui/sonner.tsx
import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon
} from "lucide-react";
import { useEffect as useEffect4, useState as useState10 } from "react";
import { Toaster as Sonner } from "sonner";

// src/lib/toast-classes.ts
var base = "gap-1.5 px-3 h-8 text-xs font-semibold rounded-xl inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap transition-colors disabled:pointer-events-none disabled:opacity-50";
var toastActionClasses = `${base} bg-secondary text-secondary-foreground hover:bg-secondary/80`;
var toastCancelClasses = `${base} text-muted-foreground hover:text-foreground`;
var toastCloseClasses = "rounded-full border-border bg-popover text-muted-foreground transition-colors hover:text-foreground";

// src/components/ui/sonner.tsx
import { jsx as jsx41 } from "react/jsx-runtime";
function useDocumentScheme() {
  const [scheme, setScheme] = useState10("light");
  useEffect4(() => {
    const root = document.documentElement;
    const read = () => setScheme(root.classList.contains("dark") ? "dark" : "light");
    read();
    const observer = new MutationObserver(read);
    observer.observe(root, {
      attributes: true,
      attributeFilter: ["class"]
    });
    return () => observer.disconnect();
  }, []);
  return scheme;
}
var Toaster = ({
  theme,
  closeButton = true,
  toastOptions,
  ...props
}) => {
  const scheme = useDocumentScheme();
  return /* @__PURE__ */ jsx41(
    Sonner,
    {
      theme: theme ?? scheme,
      closeButton,
      toastOptions: {
        ...toastOptions,
        classNames: {
          actionButton: toastActionClasses,
          cancelButton: toastCancelClasses,
          closeButton: toastCloseClasses,
          ...toastOptions?.classNames
        }
      },
      className: "toaster group [&_[data-sonner-toast]]:shadow-2xl [&_[data-sonner-toast]]:backdrop-blur-xl",
      icons: {
        success: /* @__PURE__ */ jsx41(CircleCheckIcon, { className: "size-4" }),
        info: /* @__PURE__ */ jsx41(InfoIcon, { className: "size-4" }),
        warning: /* @__PURE__ */ jsx41(TriangleAlertIcon, { className: "size-4" }),
        error: /* @__PURE__ */ jsx41(OctagonXIcon, { className: "size-4" }),
        loading: /* @__PURE__ */ jsx41(Loader2Icon, { className: "size-4 animate-spin" })
      },
      style: {
        "--normal-bg": "color-mix(in oklab, var(--popover) 90%, transparent)",
        "--normal-text": "var(--popover-foreground)",
        "--normal-border": "var(--border)",
        "--border-radius": "1rem"
      },
      ...props
    }
  );
};

// src/components/ui/status-badge.tsx
import { cva as cva3 } from "class-variance-authority";
import { jsx as jsx42, jsxs as jsxs26 } from "react/jsx-runtime";
var statusBadgeVariants = cva3("", {
  variants: {
    status: {
      neutral: "border-border bg-muted text-muted-foreground",
      info: "border-info/20 bg-info/10 text-info",
      success: "border-success/20 bg-success/10 text-success",
      warning: "border-warning/20 bg-warning/10 text-warning",
      danger: "border-destructive/20 bg-destructive/10 text-destructive"
    }
  },
  defaultVariants: {
    status: "neutral"
  }
});
function StatusBadge({
  className,
  status = "neutral",
  dot = false,
  children,
  slotName = "status-badge",
  ...props
}) {
  const resolvedStatus = status ?? "neutral";
  return /* @__PURE__ */ jsxs26(
    Badge,
    {
      variant: "outline",
      "data-status": resolvedStatus,
      className: cn(
        statusBadgeVariants({ status: resolvedStatus }),
        className
      ),
      ...props,
      slotName,
      children: [
        dot && /* @__PURE__ */ jsx42(
          "span",
          {
            "aria-hidden": "true",
            "data-slot": "status-badge-dot",
            className: "size-1.5 shrink-0 rounded-full bg-current"
          }
        ),
        children
      ]
    }
  );
}

// src/components/ui/text-link.tsx
import { Slot as Slot3 } from "@radix-ui/react-slot";
import { cva as cva4 } from "class-variance-authority";
import { jsx as jsx43 } from "react/jsx-runtime";
var textLinkVariants = cva4(
  `cursor-pointer rounded-xl underline decoration-border underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current ${focusRing}`,
  {
    variants: {
      variant: {
        default: "text-foreground",
        muted: "text-muted-foreground hover:text-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function TextLink({
  className,
  variant: variant2 = "default",
  asChild = false,
  slotName = "text-link",
  ...props
}) {
  const Comp = asChild ? Slot3 : "a";
  return /* @__PURE__ */ jsx43(
    Comp,
    {
      "data-variant": variant2,
      className: cn(textLinkVariants({ variant: variant2 }), className),
      ...props,
      "data-slot": slotName
    }
  );
}

// src/components/ui/toast.tsx
import * as React12 from "react";
import { toast as sonner } from "sonner";
import { jsx as jsx44, jsxs as jsxs27 } from "react/jsx-runtime";
function ToastAction({
  label,
  onClick,
  onError,
  href,
  target,
  rel,
  dismiss = true,
  className,
  toastId,
  tone,
  slotName = "toast-action",
  ...props
}) {
  const [pending, setPending] = React12.useState(false);
  const running = React12.useRef(false);
  const classes = cn(
    tone === "cancel" ? toastCancelClasses : toastActionClasses,
    className
  );
  if (href) {
    return /* @__PURE__ */ jsx44(
      "a",
      {
        href: safeToastHref(href),
        target,
        rel: rel ?? namedTargetRel(target),
        className: classes,
        onClick: (event) => {
          onClick?.(event);
          if (dismiss) {
            sonner.dismiss(toastId);
          }
        },
        ...props,
        "data-slot": slotName,
        children: label
      }
    );
  }
  return /* @__PURE__ */ jsxs27(
    "button",
    {
      type: "button",
      disabled: pending,
      "aria-busy": pending || void 0,
      className: classes,
      onClick: async (event) => {
        if (running.current) {
          return;
        }
        running.current = true;
        try {
          const result = onClick?.(event);
          if (result instanceof Promise) {
            setPending(true);
            await result;
          }
          if (dismiss) {
            sonner.dismiss(toastId);
          }
        } catch (error) {
          onError?.(error);
        } finally {
          running.current = false;
          setPending(false);
        }
      },
      ...props,
      "data-slot": slotName,
      children: [
        pending && /* @__PURE__ */ jsx44("span", { "aria-hidden": "true", children: /* @__PURE__ */ jsx44(Spinner, { size: "sm", label: "", className: "size-3" }) }),
        label
      ]
    }
  );
}
var SCHEME = /^([a-z][a-z0-9+.-]*):/i;
var NAVIGABLE_SCHEMES = /* @__PURE__ */ new Set(["http", "https", "mailto", "tel"]);
function safeToastHref(href) {
  const scheme = SCHEME.exec(href.trim());
  if (!scheme) {
    return href;
  }
  return NAVIGABLE_SCHEMES.has(scheme[1].toLowerCase()) ? href : "#";
}
function namedTargetRel(target) {
  if (!target || target === "_self" || target === "_parent") {
    return void 0;
  }
  return target === "_top" ? void 0 : "noreferrer";
}
function isDescriptor(value) {
  return typeof value === "object" && value !== null && "label" in value && !React12.isValidElement(value);
}
function withActions(options) {
  const id = options?.id ?? `toast-${Math.random().toString(36).slice(2)}`;
  const render = (value, tone) => isDescriptor(value) ? /* @__PURE__ */ jsx44(ToastAction, { ...value, tone, toastId: id }) : value;
  return {
    ...options,
    id,
    action: options?.action ? render(options.action, "action") : void 0,
    cancel: options?.cancel ? render(options.cancel, "cancel") : void 0
  };
}
function variant(name) {
  return (message, options) => sonner[name](message, withActions(options));
}
var toast = Object.assign(
  (message, options) => sonner(message, withActions(options)),
  sonner,
  {
    success: variant("success"),
    info: variant("info"),
    warning: variant("warning"),
    error: variant("error"),
    loading: variant("loading"),
    message: variant("message")
  }
);
export {
  AUTOSAVE_DELAY,
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  AkiraMark,
  Alert,
  AlertDescription,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertTitle,
  AppearanceToggle,
  AreaChart,
  AspectRatio,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  BarChart,
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Button,
  CHART_PALETTE,
  Calendar,
  CalendarDayButton,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
  Checkbox,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Combobox,
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
  ConfirmDialog,
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuPortal,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
  CopyButton,
  DataTable,
  DatePicker,
  DateRangeFilter,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
  DonutChart,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  Dropzone,
  EmptyState,
  FacetedFilter,
  Field,
  FieldControl,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FloatingSheet,
  FloatingSheetBody,
  FloatingSheetFooter,
  FloatingSheetStack,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  Icon,
  Input,
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
  Label,
  LineChart,
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarPortal,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PasswordInput,
  PlaceholderPattern,
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverTrigger,
  Progress,
  RadioGroup,
  RadioGroupItem,
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
  RowActionsMenu,
  SAVED_DURATION,
  SaveStatus,
  ScrollArea,
  ScrollBar,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  Separator,
  ServerFacetedFilter,
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  Skeleton,
  Slider,
  Spinner,
  StatusBadge,
  Switch,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  TextLink,
  Textarea,
  Toaster,
  Toggle,
  ToggleGroup,
  ToggleGroupItem,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  UiLocaleProvider,
  alertDefaultLabels,
  appearanceToggleDefaultLabels,
  badgeVariants,
  buttonVariants,
  cardVariants,
  chartColorVariable,
  cn,
  comboboxDefaultLabels,
  confirmDialogDefaultLabels,
  controlFill,
  copyButtonLabels,
  cssVariableKey,
  dataTableDefaultLabels,
  dataTableFacetedFilterDefaultLabels,
  datePickerDefaultLabels,
  dateRangeFilterDefaultLabels,
  dropzoneDefaultLabels,
  elevatedSurface,
  emptyStateLabels,
  floatingSheetDefaultLabels,
  focusRing,
  menuHighlight,
  navigationMenuTriggerStyle,
  nestedEdgeToEdge,
  nestedRadius,
  nestedSurfaceReset,
  paletteColor,
  passwordInputDefaultLabels,
  recessedSurface,
  saveStatusLabels,
  spinnerVariants,
  statusBadgeVariants,
  surface,
  textLinkVariants,
  toast,
  toggleVariants,
  useAutosave,
  useConfirmDialog,
  useField,
  useFormField,
  useSidebar,
  useUiLabels,
  useUiLocale
};
//# sourceMappingURL=index.js.map