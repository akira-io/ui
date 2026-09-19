'use client';

"use client";
import {
  formatBytes
} from "./chunk-BW5T7MUK.js";
import {
  Calendar,
  CalendarDayButton,
  FloatingSheet,
  FloatingSheetBody,
  FloatingSheetFooter,
  FloatingSheetStack,
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea
} from "./chunk-4QACAZI5.js";
import {
  ConfirmDialog,
  confirmDialogDefaultLabels
} from "./chunk-EG2KRFSM.js";
import {
  CopyButton,
  copyButtonLabels
} from "./chunk-7G577OF7.js";
import {
  Toggle,
  hasNavigableScheme,
  normalizeUrl,
  toggleVariants
} from "./chunk-CHU6A563.js";
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
} from "./chunk-FHM5GJ2N.js";
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Checkbox,
  Field,
  FieldControl,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  PasswordInput,
  alertDefaultLabels,
  fieldLabels,
  passwordInputDefaultLabels
} from "./chunk-OTCRKFOC.js";
import {
  FieldError,
  useField
} from "./chunk-5NZLIF7G.js";
import {
  Label
} from "./chunk-RE7X3RE5.js";
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
} from "./chunk-E34J3A7S.js";
import {
  Separator
} from "./chunk-XTWKLSUN.js";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from "./chunk-KJRTDCLJ.js";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
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
  SelectValue
} from "./chunk-QJ36FL2X.js";
import {
  Badge,
  EmptyState,
  badgeVariants,
  emptyStateLabels
} from "./chunk-SSMR2HNC.js";
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
} from "./chunk-IGBMA6PI.js";
import {
  UiLocaleProvider,
  useUiDateLocale,
  useUiLabels,
  useUiLocale
} from "./chunk-DVCOHMNY.js";
import {
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
  DropdownMenuTrigger
} from "./chunk-QEUP7ONY.js";
import {
  floatingSheetDefaultLabels,
  useSheetPortalContainer
} from "./chunk-EXTOGROG.js";
import {
  Input
} from "./chunk-NE2SL5YQ.js";
import {
  Button,
  Spinner,
  buttonVariants,
  spinnerVariants
} from "./chunk-4MAAVDUX.js";
import {
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
  surface
} from "./chunk-TA3IKSIJ.js";
import {
  cn
} from "./chunk-XN5WW7OR.js";

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

// src/components/ui/aspect-ratio.tsx
import { AspectRatio as AspectRatioPrimitive } from "radix-ui";
import { jsx as jsx7 } from "react/jsx-runtime";
function AspectRatio({
  slotName = "aspect-ratio",
  ...props
}) {
  return /* @__PURE__ */ jsx7(AspectRatioPrimitive.Root, { ...props, "data-slot": slotName });
}

// src/components/ui/carousel.tsx
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import * as React3 from "react";
import { jsx as jsx8, jsxs as jsxs4 } from "react/jsx-runtime";
var CarouselContext = React3.createContext(null);
function useCarousel() {
  const context = React3.useContext(CarouselContext);
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
  const [canScrollPrev, setCanScrollPrev] = React3.useState(false);
  const [canScrollNext, setCanScrollNext] = React3.useState(false);
  const onSelect = React3.useCallback((api2) => {
    if (!api2) return;
    setCanScrollPrev(api2.canScrollPrev());
    setCanScrollNext(api2.canScrollNext());
  }, []);
  const scrollPrev = React3.useCallback(() => {
    api?.scrollPrev();
  }, [api]);
  const scrollNext = React3.useCallback(() => {
    api?.scrollNext();
  }, [api]);
  const handleKeyDown = React3.useCallback(
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
  React3.useEffect(() => {
    if (!api || !setApi) return;
    setApi(api);
  }, [api, setApi]);
  React3.useEffect(() => {
    if (!api) return;
    onSelect(api);
    api.on("reInit", onSelect);
    api.on("select", onSelect);
    return () => {
      api?.off("select", onSelect);
    };
  }, [api, onSelect]);
  return /* @__PURE__ */ jsx8(
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
      children: /* @__PURE__ */ jsx8(
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
  return /* @__PURE__ */ jsx8(
    "div",
    {
      ref: carouselRef,
      className: cn(nestedRadius, "overflow-hidden"),
      "data-slot": slotName,
      children: /* @__PURE__ */ jsx8(
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
  return /* @__PURE__ */ jsx8(
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
  return /* @__PURE__ */ jsxs4(
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
        /* @__PURE__ */ jsx8(ArrowLeft, {}),
        /* @__PURE__ */ jsx8("span", { className: "sr-only", children: "Previous slide" })
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
  return /* @__PURE__ */ jsxs4(
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
        /* @__PURE__ */ jsx8(ArrowRight, {}),
        /* @__PURE__ */ jsx8("span", { className: "sr-only", children: "Next slide" })
      ]
    }
  );
}

// src/components/ui/combobox.tsx
import { Check, ChevronsUpDown } from "lucide-react";
import { useState as useState4 } from "react";
import { jsx as jsx9, jsxs as jsxs5 } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsxs5(Popover, { modal: true, open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsx9(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxs5(
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
          /* @__PURE__ */ jsx9(ChevronsUpDown, { className: "ml-2 h-4 w-4 shrink-0 opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ jsx9(
      PopoverContent,
      {
        className: "p-0 w-[var(--radix-popover-trigger-width)]",
        align: "start",
        children: /* @__PURE__ */ jsxs5(Command, { children: [
          /* @__PURE__ */ jsx9(
            CommandInput,
            {
              placeholder: labels.searchPlaceholder,
              className: "h-11"
            }
          ),
          /* @__PURE__ */ jsxs5(CommandList, { className: "max-h-[min(300px,var(--radix-popover-content-available-height))]", children: [
            /* @__PURE__ */ jsx9(CommandEmpty, { children: labels.emptyText }),
            /* @__PURE__ */ jsx9(CommandGroup, { children: options.map((option) => /* @__PURE__ */ jsxs5(
              CommandItem,
              {
                value: option.label,
                onSelect: () => {
                  onChange(option.value);
                  setOpen(false);
                },
                className: "h-11 rounded-xl",
                children: [
                  /* @__PURE__ */ jsx9(
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
import { jsx as jsx10, jsxs as jsxs6 } from "react/jsx-runtime";
function ContextMenu({
  slotName = "context-menu",
  ...props
}) {
  return /* @__PURE__ */ jsx10(ContextMenuPrimitive.Root, { ...props, "data-slot": slotName });
}
function ContextMenuTrigger({
  slotName = "context-menu-trigger",
  ...props
}) {
  return /* @__PURE__ */ jsx10(ContextMenuPrimitive.Trigger, { ...props, "data-slot": slotName });
}
function ContextMenuGroup({
  slotName = "context-menu-group",
  ...props
}) {
  return /* @__PURE__ */ jsx10(ContextMenuPrimitive.Group, { ...props, "data-slot": slotName });
}
function ContextMenuPortal({
  slotName = "context-menu-portal",
  ...props
}) {
  return /* @__PURE__ */ jsx10(ContextMenuPrimitive.Portal, { ...props, "data-slot": slotName });
}
function ContextMenuSub({
  slotName = "context-menu-sub",
  ...props
}) {
  return /* @__PURE__ */ jsx10(ContextMenuPrimitive.Sub, { ...props, "data-slot": slotName });
}
function ContextMenuRadioGroup({
  slotName = "context-menu-radio-group",
  ...props
}) {
  return /* @__PURE__ */ jsx10(ContextMenuPrimitive.RadioGroup, { ...props, "data-slot": slotName });
}
function ContextMenuSubTrigger({
  className,
  inset,
  children,
  slotName = "context-menu-sub-trigger",
  ...props
}) {
  return /* @__PURE__ */ jsxs6(
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
        /* @__PURE__ */ jsx10(ChevronRightIcon, { className: "ml-auto" })
      ]
    }
  );
}
function ContextMenuSubContent({
  className,
  slotName = "context-menu-sub-content",
  ...props
}) {
  return /* @__PURE__ */ jsx10(
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
  return /* @__PURE__ */ jsx10(ContextMenuPrimitive.Portal, { container: portalContainer, children: /* @__PURE__ */ jsx10(
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
  return /* @__PURE__ */ jsx10(
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
  return /* @__PURE__ */ jsxs6(
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
        /* @__PURE__ */ jsx10("span", { className: "left-2 size-3.5 pointer-events-none absolute flex items-center justify-center", children: /* @__PURE__ */ jsx10(ContextMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx10(CheckIcon, { className: "size-4" }) }) }),
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
  return /* @__PURE__ */ jsxs6(
    ContextMenuPrimitive.RadioItem,
    {
      className: cn(
        "gap-2 py-1.5 pr-2 pl-8 text-sm [&_svg:not([class*='size-'])]:size-4 rounded-xl relative flex cursor-default items-center outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className
      ),
      ...props,
      "data-slot": slotName,
      children: [
        /* @__PURE__ */ jsx10("span", { className: "left-2 size-3.5 pointer-events-none absolute flex items-center justify-center", children: /* @__PURE__ */ jsx10(ContextMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx10(CircleIcon, { className: "size-2 fill-current" }) }) }),
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
  return /* @__PURE__ */ jsx10(
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
  return /* @__PURE__ */ jsx10(
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
  return /* @__PURE__ */ jsx10(
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

// src/components/ui/calendar-popover.tsx
import { jsx as jsx11, jsxs as jsxs7 } from "react/jsx-runtime";
function CalendarPopover({
  open,
  onOpenChange,
  trigger,
  align = "start",
  className,
  children,
  slotName = "calendar-popover"
}) {
  return /* @__PURE__ */ jsxs7(Popover, { open, onOpenChange, children: [
    /* @__PURE__ */ jsx11(PopoverTrigger, { asChild: true, children: trigger }),
    /* @__PURE__ */ jsx11(
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
import { CalendarIcon, X } from "lucide-react";
import { useState as useState5 } from "react";
import { jsx as jsx12, jsxs as jsxs8 } from "react/jsx-runtime";
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
  const locale = useUiDateLocale();
  const [open, setOpen] = useState5(false);
  const [ownValue, setOwnValue] = useState5(defaultValue);
  const isControlled = "value" in props;
  const selected = isControlled ? value : ownValue;
  const showClear = clearable && !disabled && selected !== void 0;
  const label = selected ? formatDate?.(selected) ?? format(selected, labels.dateFormat, { locale }) : labels.placeholder;
  function commit(next) {
    if (!isControlled) {
      setOwnValue(next);
    }
    onChange?.(next);
  }
  return /* @__PURE__ */ jsxs8("div", { className: cn("relative w-full", className), "data-slot": slotName, children: [
    /* @__PURE__ */ jsx12(
      CalendarPopover,
      {
        open,
        onOpenChange: setOpen,
        trigger: /* @__PURE__ */ jsxs8(
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
              /* @__PURE__ */ jsx12(CalendarIcon, { className: "size-4 shrink-0 opacity-60" }),
              /* @__PURE__ */ jsx12(
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
        children: /* @__PURE__ */ jsx12(
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
    showClear && /* @__PURE__ */ jsx12(
      "button",
      {
        type: "button",
        "data-slot": "date-picker-clear",
        "aria-label": labels.clearLabel,
        onClick: () => commit(void 0),
        className: `size-7 rounded-xl right-2 absolute top-1/2 inline-flex -translate-y-1/2 cursor-pointer items-center justify-center text-muted-foreground hover:text-foreground ${focusRing}`,
        children: /* @__PURE__ */ jsx12(X, { className: "size-3.5" })
      }
    )
  ] });
}

// src/components/ui/date-range-filter.tsx
import { format as format2 } from "date-fns";
import { CalendarRange, X as X2 } from "lucide-react";
import { useState as useState6 } from "react";
import { jsx as jsx13, jsxs as jsxs9 } from "react/jsx-runtime";
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
  const locale = useUiDateLocale();
  const [open, setOpen] = useState6(false);
  const selected = from || to ? { from: parse(from), to: parse(to) } : void 0;
  const display = (value) => format2(parse(value), labels.dateFormat, { locale });
  const label = from ? to && to !== from ? `${display(from)} - ${display(to)}` : display(from) : labels.emptyLabel;
  return /* @__PURE__ */ jsx13(
    CalendarPopover,
    {
      open,
      onOpenChange: setOpen,
      align: "end",
      trigger: /* @__PURE__ */ jsxs9(
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
            /* @__PURE__ */ jsx13(CalendarRange, { className: "mr-2 size-4" }),
            label,
            (from || to) && /* @__PURE__ */ jsx13(
              "span",
              {
                role: "button",
                tabIndex: 0,
                onClick: (event) => {
                  event.stopPropagation();
                  onChange({ from: void 0, to: void 0 });
                },
                className: "ml-2 inline-flex",
                children: /* @__PURE__ */ jsx13(X2, { className: "size-3.5 opacity-60 hover:opacity-100" })
              }
            )
          ]
        }
      ),
      children: /* @__PURE__ */ jsx13(
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

// src/components/ui/drawer.tsx
import { Drawer as DrawerPrimitive } from "vaul";
import { jsx as jsx14, jsxs as jsxs10 } from "react/jsx-runtime";
function Drawer({
  slotName = "drawer",
  ...props
}) {
  return /* @__PURE__ */ jsx14(DrawerPrimitive.Root, { ...props, "data-slot": slotName });
}
function DrawerTrigger({
  slotName = "drawer-trigger",
  ...props
}) {
  return /* @__PURE__ */ jsx14(DrawerPrimitive.Trigger, { ...props, "data-slot": slotName });
}
function DrawerPortal({
  slotName = "drawer-portal",
  ...props
}) {
  return /* @__PURE__ */ jsx14(DrawerPrimitive.Portal, { ...props, "data-slot": slotName });
}
function DrawerClose({
  slotName = "drawer-close",
  ...props
}) {
  return /* @__PURE__ */ jsx14(DrawerPrimitive.Close, { ...props, "data-slot": slotName });
}
function DrawerOverlay({
  className,
  slotName = "drawer-overlay",
  ...props
}) {
  return /* @__PURE__ */ jsx14(
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
  return /* @__PURE__ */ jsxs10(DrawerPortal, { slotName: "drawer-portal", children: [
    /* @__PURE__ */ jsx14(DrawerOverlay, {}),
    /* @__PURE__ */ jsxs10(
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
          /* @__PURE__ */ jsx14("div", { className: "mt-4 h-2 mx-auto hidden w-[100px] shrink-0 rounded-full bg-muted group-data-[vaul-drawer-direction=bottom]/drawer-content:block" }),
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
  return /* @__PURE__ */ jsx14(
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
  return /* @__PURE__ */ jsx14(
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
  return /* @__PURE__ */ jsx14(
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
  return /* @__PURE__ */ jsx14(
    DrawerPrimitive.Description,
    {
      className: cn("text-sm text-muted-foreground", className),
      ...props,
      "data-slot": slotName
    }
  );
}

// src/components/ui/dropzone.tsx
import { Paperclip, UploadCloud, X as X3 } from "lucide-react";
import * as React4 from "react";
import {
  ErrorCode,
  useDropzone
} from "react-dropzone";

// src/components/ui/progress.tsx
import { Progress as ProgressPrimitive } from "radix-ui";
import { jsx as jsx15 } from "react/jsx-runtime";
function Progress({
  className,
  value,
  slotName = "progress",
  ...props
}) {
  return /* @__PURE__ */ jsx15(
    ProgressPrimitive.Root,
    {
      value,
      className: cn(
        "h-2 relative w-full overflow-hidden rounded-full bg-primary/20",
        className
      ),
      ...props,
      "data-slot": slotName,
      children: /* @__PURE__ */ jsx15(
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
import { Fragment, jsx as jsx16, jsxs as jsxs11 } from "react/jsx-runtime";
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
  const errorId = React4.useId();
  const [ownFiles, setOwnFiles] = React4.useState([]);
  const [rejected, setRejected] = React4.useState(null);
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
  return /* @__PURE__ */ jsxs11(
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
        /* @__PURE__ */ jsxs11(
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
              /* @__PURE__ */ jsx16("input", { ...getInputProps(), "data-slot": "dropzone-input" }),
              inviting && /* @__PURE__ */ jsxs11(Fragment, { children: [
                /* @__PURE__ */ jsx16(
                  UploadCloud,
                  {
                    "aria-hidden": "true",
                    className: "size-5 text-muted-foreground"
                  }
                ),
                /* @__PURE__ */ jsx16("p", { className: "text-sm font-medium text-foreground", children: isDragActive ? labels.activeLabel : labels.idleLabel }),
                /* @__PURE__ */ jsx16(
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
        chosen.length > 0 && /* @__PURE__ */ jsx16("ul", { className: "gap-2 flex flex-col", "data-slot": "dropzone-files", children: chosen.map((file) => /* @__PURE__ */ jsxs11(
          "li",
          {
            "data-slot": "dropzone-file",
            className: cn(
              compactRadius,
              "gap-2 px-3 py-2 flex items-center bg-muted"
            ),
            children: [
              /* @__PURE__ */ jsx16(
                Paperclip,
                {
                  "aria-hidden": "true",
                  className: "size-4 shrink-0 text-muted-foreground"
                }
              ),
              /* @__PURE__ */ jsx16("span", { className: "min-w-0 text-sm font-medium flex-1 truncate text-foreground", children: file.name }),
              /* @__PURE__ */ jsx16(
                "span",
                {
                  "data-slot": "dropzone-file-size",
                  className: "text-xs font-medium text-muted-foreground",
                  children: labels.sizeLabel(file.size)
                }
              ),
              /* @__PURE__ */ jsx16(
                Button,
                {
                  type: "button",
                  variant: "ghost",
                  size: "icon-sm",
                  slotName: "dropzone-remove",
                  "aria-label": labels.removeLabel,
                  disabled,
                  onClick: () => remove(file),
                  children: /* @__PURE__ */ jsx16(X3, { "aria-hidden": "true" })
                }
              )
            ]
          },
          `${file.name}-${file.size}-${file.lastModified}`
        )) }),
        progress !== void 0 && /* @__PURE__ */ jsx16(
          Progress,
          {
            value: progress,
            slotName: "dropzone-progress",
            "aria-label": labels.progressLabel(Math.round(progress))
          }
        ),
        /* @__PURE__ */ jsx16(
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

// src/components/ui/hover-card.tsx
import { HoverCard as HoverCardPrimitive } from "radix-ui";
import { jsx as jsx17 } from "react/jsx-runtime";
function HoverCard({
  slotName = "hover-card",
  ...props
}) {
  return /* @__PURE__ */ jsx17(HoverCardPrimitive.Root, { ...props, "data-slot": slotName });
}
function HoverCardTrigger({
  slotName = "hover-card-trigger",
  ...props
}) {
  return /* @__PURE__ */ jsx17(HoverCardPrimitive.Trigger, { ...props, "data-slot": slotName });
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
  return /* @__PURE__ */ jsx17(
    HoverCardPrimitive.Portal,
    {
      container: portalContainer,
      "data-slot": "hover-card-portal",
      children: /* @__PURE__ */ jsx17(
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

// src/components/ui/menubar.tsx
import { CheckIcon as CheckIcon2, ChevronRightIcon as ChevronRightIcon2, CircleIcon as CircleIcon2 } from "lucide-react";
import { Menubar as MenubarPrimitive2 } from "radix-ui";

// src/components/ui/menubar-portal.tsx
import { Menubar as MenubarPrimitive } from "radix-ui";
import { jsx as jsx18 } from "react/jsx-runtime";
function MenubarPortal({
  slotName = "menubar-portal",
  container,
  ...props
}) {
  const portalContainer = useSheetPortalContainer(container);
  return /* @__PURE__ */ jsx18(
    MenubarPrimitive.Portal,
    {
      container: portalContainer,
      ...props,
      "data-slot": slotName
    }
  );
}

// src/components/ui/menubar.tsx
import { jsx as jsx19, jsxs as jsxs12 } from "react/jsx-runtime";
function Menubar({
  className,
  slotName = "menubar",
  ...props
}) {
  return /* @__PURE__ */ jsx19(
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
  return /* @__PURE__ */ jsx19(MenubarPrimitive2.Menu, { ...props, "data-slot": slotName });
}
function MenubarGroup({
  slotName = "menubar-group",
  ...props
}) {
  return /* @__PURE__ */ jsx19(MenubarPrimitive2.Group, { ...props, "data-slot": slotName });
}
function MenubarRadioGroup({
  slotName = "menubar-radio-group",
  ...props
}) {
  return /* @__PURE__ */ jsx19(MenubarPrimitive2.RadioGroup, { ...props, "data-slot": slotName });
}
function MenubarTrigger({
  className,
  slotName = "menubar-trigger",
  ...props
}) {
  return /* @__PURE__ */ jsx19(
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
  return /* @__PURE__ */ jsx19(MenubarPortal, { children: /* @__PURE__ */ jsx19(
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
  return /* @__PURE__ */ jsx19(
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
  return /* @__PURE__ */ jsxs12(
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
        /* @__PURE__ */ jsx19("span", { className: "left-2 size-3.5 pointer-events-none absolute flex items-center justify-center", children: /* @__PURE__ */ jsx19(MenubarPrimitive2.ItemIndicator, { children: /* @__PURE__ */ jsx19(CheckIcon2, { className: "size-4" }) }) }),
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
  return /* @__PURE__ */ jsxs12(
    MenubarPrimitive2.RadioItem,
    {
      className: cn(
        "gap-2 rounded-xl py-1.5 pr-2 pl-8 text-sm [&_svg:not([class*='size-'])]:size-4 relative flex cursor-default items-center outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className
      ),
      ...props,
      "data-slot": slotName,
      children: [
        /* @__PURE__ */ jsx19("span", { className: "left-2 size-3.5 pointer-events-none absolute flex items-center justify-center", children: /* @__PURE__ */ jsx19(MenubarPrimitive2.ItemIndicator, { children: /* @__PURE__ */ jsx19(CircleIcon2, { className: "size-2 fill-current" }) }) }),
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
  return /* @__PURE__ */ jsx19(
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
  return /* @__PURE__ */ jsx19(
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
  return /* @__PURE__ */ jsx19(
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
  return /* @__PURE__ */ jsx19(MenubarPrimitive2.Sub, { ...props, "data-slot": slotName });
}
function MenubarSubTrigger({
  className,
  inset,
  children,
  slotName = "menubar-sub-trigger",
  ...props
}) {
  return /* @__PURE__ */ jsxs12(
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
        /* @__PURE__ */ jsx19(ChevronRightIcon2, { className: "h-4 w-4 ml-auto" })
      ]
    }
  );
}
function MenubarSubContent({
  className,
  slotName = "menubar-sub-content",
  ...props
}) {
  return /* @__PURE__ */ jsx19(
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
import { cva } from "class-variance-authority";
import { ChevronDownIcon } from "lucide-react";
import { jsx as jsx20, jsxs as jsxs13 } from "react/jsx-runtime";
function NavigationMenu({
  className,
  children,
  viewport = true,
  slotName = "navigation-menu",
  ...props
}) {
  return /* @__PURE__ */ jsxs13(
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
        viewport && /* @__PURE__ */ jsx20(NavigationMenuViewport, {})
      ]
    }
  );
}
function NavigationMenuList({
  className,
  slotName = "navigation-menu-list",
  ...props
}) {
  return /* @__PURE__ */ jsx20(
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
  return /* @__PURE__ */ jsx20(
    NavigationMenuPrimitive.Item,
    {
      className: cn("relative", className),
      ...props,
      "data-slot": slotName
    }
  );
}
var navigationMenuTriggerStyle = cva(
  "group inline-flex h-11 w-max items-center justify-center rounded-xl bg-background px-4 text-sm font-medium data-[state=open]:font-semibold hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 data-[active=true]:bg-accent/50 data-[state=open]:bg-accent/50 data-[active=true]:text-accent-foreground transition-[color,box-shadow] outline-none focus-visible:outline-solid focus-visible:outline-1 focus-visible:outline-offset-0 focus-visible:outline-ring"
);
function NavigationMenuTrigger({
  className,
  children,
  slotName = "navigation-menu-trigger",
  ...props
}) {
  return /* @__PURE__ */ jsxs13(
    NavigationMenuPrimitive.Trigger,
    {
      className: cn(navigationMenuTriggerStyle(), "group", className),
      ...props,
      "data-slot": slotName,
      children: [
        children,
        " ",
        /* @__PURE__ */ jsx20(
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
  return /* @__PURE__ */ jsx20(
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
  return /* @__PURE__ */ jsx20(
    "div",
    {
      className: cn(
        "left-0 absolute top-full isolate z-50 flex justify-center"
      ),
      children: /* @__PURE__ */ jsx20(
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
  return /* @__PURE__ */ jsx20(
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
  return /* @__PURE__ */ jsx20(
    NavigationMenuPrimitive.Indicator,
    {
      className: cn(
        "data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in h-1.5 top-full z-[1] flex items-end justify-center overflow-hidden",
        className
      ),
      ...props,
      "data-slot": slotName,
      children: /* @__PURE__ */ jsx20("div", { className: "h-2 w-2 shadow-md rounded-tl-xs relative top-[60%] rotate-45 bg-border" })
    }
  );
}

// src/components/ui/pagination.tsx
import {
  ChevronLeftIcon,
  ChevronRightIcon as ChevronRightIcon3,
  MoreHorizontalIcon
} from "lucide-react";
import { jsx as jsx21, jsxs as jsxs14 } from "react/jsx-runtime";
function Pagination({
  className,
  slotName = "pagination",
  ...props
}) {
  return /* @__PURE__ */ jsx21(
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
  return /* @__PURE__ */ jsx21(
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
  return /* @__PURE__ */ jsx21("li", { ...props, "data-slot": slotName });
}
function PaginationLink({
  className,
  isActive,
  size = "icon",
  slotName = "pagination-link",
  ...props
}) {
  return /* @__PURE__ */ jsx21(
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
  return /* @__PURE__ */ jsxs14(
    PaginationLink,
    {
      "aria-label": "Go to previous page",
      size: "default",
      className: cn("gap-1 px-2.5 sm:pl-2.5", className),
      ...props,
      children: [
        /* @__PURE__ */ jsx21(ChevronLeftIcon, {}),
        /* @__PURE__ */ jsx21("span", { className: "sm:block hidden", children: "Previous" })
      ]
    }
  );
}
function PaginationNext({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxs14(
    PaginationLink,
    {
      "aria-label": "Go to next page",
      size: "default",
      className: cn("gap-1 px-2.5 sm:pr-2.5", className),
      ...props,
      children: [
        /* @__PURE__ */ jsx21("span", { className: "sm:block hidden", children: "Next" }),
        /* @__PURE__ */ jsx21(ChevronRightIcon3, {})
      ]
    }
  );
}
function PaginationEllipsis({
  className,
  slotName = "pagination-ellipsis",
  ...props
}) {
  return /* @__PURE__ */ jsxs14(
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
        /* @__PURE__ */ jsx21(MoreHorizontalIcon, { className: "size-4" }),
        /* @__PURE__ */ jsx21("span", { className: "sr-only", children: "More pages" })
      ]
    }
  );
}

// src/components/ui/placeholder-pattern.tsx
import { useId as useId2 } from "react";
import { jsx as jsx22, jsxs as jsxs15 } from "react/jsx-runtime";
function PlaceholderPattern({
  className,
  slotName = "placeholder-pattern"
}) {
  const patternId = useId2();
  return /* @__PURE__ */ jsxs15("svg", { className, fill: "none", "data-slot": slotName, children: [
    /* @__PURE__ */ jsx22("defs", { children: /* @__PURE__ */ jsx22(
      "pattern",
      {
        id: patternId,
        x: "0",
        y: "0",
        width: "10",
        height: "10",
        patternUnits: "userSpaceOnUse",
        children: /* @__PURE__ */ jsx22(
          "path",
          {
            d: "M-3 13 15-5M-5 5l18-18M-1 21 17 3",
            stroke: "currentColor"
          }
        )
      }
    ) }),
    /* @__PURE__ */ jsx22(
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
import { jsx as jsx23 } from "react/jsx-runtime";
function RadioGroup({
  className,
  slotName = "radio-group",
  ...props
}) {
  return /* @__PURE__ */ jsx23(
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
  return /* @__PURE__ */ jsx23(
    RadioGroupPrimitive.Item,
    {
      className: cn(
        `size-5 shadow-xs aspect-square shrink-0 rounded-full border border-border text-primary transition-[color,box-shadow] disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 ${focusRing}`,
        className
      ),
      ...props,
      "data-slot": slotName,
      children: /* @__PURE__ */ jsx23(
        RadioGroupPrimitive.Indicator,
        {
          "data-slot": "radio-group-indicator",
          className: "relative flex items-center justify-center",
          children: /* @__PURE__ */ jsx23(CircleIcon3, { className: "size-2.5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 fill-primary" })
        }
      )
    }
  );
}

// src/components/ui/resizable.tsx
import * as ResizablePrimitive from "react-resizable-panels";
import { jsx as jsx24 } from "react/jsx-runtime";
function ResizablePanelGroup({
  className,
  slotName = "resizable-panel-group",
  ...props
}) {
  return /* @__PURE__ */ jsx24(
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
  return /* @__PURE__ */ jsx24(ResizablePrimitive.Panel, { ...props, "data-slot": slotName });
}
function ResizableHandle({
  withHandle,
  className,
  slotName = "resizable-handle",
  ...props
}) {
  return /* @__PURE__ */ jsx24(
    ResizablePrimitive.Separator,
    {
      className: cn(
        "after:inset-y-0 after:w-1 aria-[orientation=horizontal]:after:left-0 aria-[orientation=horizontal]:after:h-1 aria-[orientation=horizontal]:after:translate-x-0 relative flex w-px items-center justify-center bg-border after:absolute after:left-1/2 after:-translate-x-1/2 focus-visible:outline-1 focus-visible:outline-offset-0 focus-visible:outline-ring focus-visible:outline-solid aria-[orientation=horizontal]:h-px aria-[orientation=horizontal]:w-full aria-[orientation=horizontal]:after:w-full aria-[orientation=horizontal]:after:-translate-y-1/2 [&[aria-orientation=horizontal]>div]:rotate-90",
        className
      ),
      ...props,
      "data-slot": slotName,
      children: withHandle && /* @__PURE__ */ jsx24("div", { className: "h-8 w-1.5 z-10 rounded-full bg-muted-foreground/40 transition-colors group-hover:bg-muted-foreground/60" })
    }
  );
}

// src/components/ui/save-status.tsx
import { Check as Check2, TriangleAlert } from "lucide-react";
import * as React5 from "react";
import { jsx as jsx25, jsxs as jsxs16 } from "react/jsx-runtime";
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
  const [faded, setFaded] = React5.useState(false);
  React5.useEffect(() => {
    if (status !== "saved" || savedDuration <= 0) {
      setFaded(false);
      return;
    }
    setFaded(false);
    const timer = setTimeout(() => setFaded(true), savedDuration);
    return () => clearTimeout(timer);
  }, [status, savedDuration, message]);
  const hidden = status === "saved" && faded;
  return /* @__PURE__ */ jsxs16(
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
        status === "idle" && showIdle && /* @__PURE__ */ jsx25(
          "span",
          {
            "data-slot": "save-status-idle",
            className: "text-muted-foreground",
            children: text.idle
          }
        ),
        status === "saving" && /* @__PURE__ */ jsxs16(
          "span",
          {
            "data-slot": "save-status-saving",
            className: "gap-2 flex items-center text-muted-foreground",
            children: [
              /* @__PURE__ */ jsx25(Spinner, { size: "sm", label: "", "aria-hidden": "true" }),
              text.saving
            ]
          }
        ),
        status === "saved" && /* @__PURE__ */ jsxs16(
          "span",
          {
            "data-slot": "save-status-saved",
            className: "gap-2 flex items-center text-success",
            children: [
              /* @__PURE__ */ jsx25(Check2, { "aria-hidden": "true", className: "size-3.5" }),
              text.saved
            ]
          }
        ),
        status === "error" && /* @__PURE__ */ jsxs16(
          "span",
          {
            "data-slot": "save-status-error",
            className: "gap-2 flex items-center text-destructive",
            children: [
              /* @__PURE__ */ jsx25(TriangleAlert, { "aria-hidden": "true", className: "size-3.5" }),
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
import * as React6 from "react";
import { jsx as jsx26, jsxs as jsxs17 } from "react/jsx-runtime";
var ScrollArea = React6.forwardRef(({ className, children, slotName = "scroll-area", ...props }, ref) => /* @__PURE__ */ jsxs17(
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
      /* @__PURE__ */ jsx26(ScrollAreaPrimitive.Viewport, { className: "h-full w-full rounded-[inherit]", children }),
      /* @__PURE__ */ jsx26(ScrollBar, {}),
      /* @__PURE__ */ jsx26(ScrollAreaPrimitive.Corner, {})
    ]
  }
));
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;
var ScrollBar = React6.forwardRef(
  ({
    className,
    orientation = "vertical",
    slotName = "scroll-area-scrollbar",
    ...props
  }, ref) => /* @__PURE__ */ jsx26(
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
      children: /* @__PURE__ */ jsx26(ScrollAreaPrimitive.ScrollAreaThumb, { className: "relative flex-1 rounded-full bg-border" })
    }
  )
);
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;

// src/components/ui/slider.tsx
import { Slider as SliderPrimitive } from "radix-ui";
import * as React7 from "react";
import { jsx as jsx27, jsxs as jsxs18 } from "react/jsx-runtime";
function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  slotName = "slider",
  ...props
}) {
  const _values = React7.useMemo(
    () => Array.isArray(value) ? value : Array.isArray(defaultValue) ? defaultValue : [min, max],
    [value, defaultValue, min, max]
  );
  return /* @__PURE__ */ jsxs18(
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
        /* @__PURE__ */ jsx27(
          SliderPrimitive.Track,
          {
            "data-slot": "slider-track",
            className: cn(
              "data-[orientation=horizontal]:h-1.5 data-[orientation=vertical]:w-1.5 relative grow overflow-hidden rounded-full bg-muted data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full"
            ),
            children: /* @__PURE__ */ jsx27(
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
        Array.from({ length: _values.length }, (_, index) => /* @__PURE__ */ jsx27(
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
import { useEffect as useEffect4, useState as useState9 } from "react";
import { Toaster as Sonner } from "sonner";

// src/lib/toast-classes.ts
var base = "gap-1.5 px-3 h-8 text-xs font-semibold rounded-xl inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap transition-colors disabled:pointer-events-none disabled:opacity-50";
var toastActionClasses = `${base} bg-secondary text-secondary-foreground hover:bg-secondary/80`;
var toastCancelClasses = `${base} text-muted-foreground hover:text-foreground`;
var toastCloseClasses = "rounded-full border-border bg-popover text-muted-foreground transition-colors hover:text-foreground";

// src/components/ui/sonner.tsx
import { jsx as jsx28 } from "react/jsx-runtime";
function useDocumentScheme() {
  const [scheme, setScheme] = useState9("light");
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
  return /* @__PURE__ */ jsx28(
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
        success: /* @__PURE__ */ jsx28(CircleCheckIcon, { className: "size-4" }),
        info: /* @__PURE__ */ jsx28(InfoIcon, { className: "size-4" }),
        warning: /* @__PURE__ */ jsx28(TriangleAlertIcon, { className: "size-4" }),
        error: /* @__PURE__ */ jsx28(OctagonXIcon, { className: "size-4" }),
        loading: /* @__PURE__ */ jsx28(Loader2Icon, { className: "size-4 animate-spin" })
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
import { cva as cva2 } from "class-variance-authority";
import { jsx as jsx29, jsxs as jsxs19 } from "react/jsx-runtime";
var statusBadgeVariants = cva2("", {
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
  return /* @__PURE__ */ jsxs19(
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
        dot && /* @__PURE__ */ jsx29(
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
import { Slot } from "@radix-ui/react-slot";
import { cva as cva3 } from "class-variance-authority";
import { jsx as jsx30 } from "react/jsx-runtime";
var textLinkVariants = cva3(
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
  const Comp = asChild ? Slot : "a";
  return /* @__PURE__ */ jsx30(
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
import * as React8 from "react";
import { toast as sonner } from "sonner";
import { jsx as jsx31, jsxs as jsxs20 } from "react/jsx-runtime";
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
  const [pending, setPending] = React8.useState(false);
  const running = React8.useRef(false);
  const classes = cn(
    tone === "cancel" ? toastCancelClasses : toastActionClasses,
    className
  );
  if (href) {
    return /* @__PURE__ */ jsx31(
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
  return /* @__PURE__ */ jsxs20(
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
        pending && /* @__PURE__ */ jsx31("span", { "aria-hidden": "true", children: /* @__PURE__ */ jsx31(Spinner, { size: "sm", label: "", className: "size-3" }) }),
        label
      ]
    }
  );
}
function safeToastHref(href) {
  const normalized = normalizeUrl(href);
  return hasNavigableScheme(normalized) ? normalized : "#";
}
function namedTargetRel(target) {
  if (!target || target === "_self" || target === "_parent") {
    return void 0;
  }
  return target === "_top" ? void 0 : "noreferrer";
}
function isDescriptor(value) {
  return typeof value === "object" && value !== null && "label" in value && !React8.isValidElement(value);
}
function withActions(options) {
  const id = options?.id ?? `toast-${Math.random().toString(36).slice(2)}`;
  const render = (value, tone) => isDescriptor(value) ? /* @__PURE__ */ jsx31(ToastAction, { ...value, tone, toastId: id }) : value;
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
  AspectRatio,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Button,
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
  cn,
  comboboxDefaultLabels,
  confirmDialogDefaultLabels,
  controlFill,
  copyButtonLabels,
  datePickerDefaultLabels,
  dateRangeFilterDefaultLabels,
  dropzoneDefaultLabels,
  elevatedSurface,
  emptyStateLabels,
  fieldLabels,
  floatingSheetDefaultLabels,
  focusRing,
  menuHighlight,
  navigationMenuTriggerStyle,
  nestedEdgeToEdge,
  nestedRadius,
  nestedSurfaceReset,
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
  useSidebar,
  useUiDateLocale,
  useUiLabels,
  useUiLocale
};
//# sourceMappingURL=index.js.map