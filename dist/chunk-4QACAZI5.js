import {
  useUiDateLocale,
  useUiLabels
} from "./chunk-DVCOHMNY.js";
import {
  FLOATING_SHEET_OFFSET_LIMIT,
  FloatingSheetEdgesContext,
  FloatingSheetReportEdgesContext,
  FloatingSheetStackContext,
  floatingSheetDefaultEdges,
  floatingSheetDefaultLabels,
  useFloatingSheetStack
} from "./chunk-EXTOGROG.js";
import {
  Button,
  buttonVariants
} from "./chunk-4MAAVDUX.js";
import {
  controlFill,
  elevatedSurface,
  fieldFocus,
  fieldSurface,
  focusRing,
  glassControl,
  modalSurface,
  nestedSurfaceReset,
  scrollEdgeTransition,
  scrollShadowFromBottom,
  scrollShadowFromTop
} from "./chunk-TA3IKSIJ.js";
import {
  cn
} from "./chunk-XN5WW7OR.js";

// src/components/ui/calendar.tsx
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from "lucide-react";
import * as React from "react";
import {
  DayPicker,
  defaultDateLib,
  getDefaultClassNames
} from "react-day-picker";
import { jsx } from "react/jsx-runtime";
function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  buttonVariant = "ghost",
  formatters,
  components,
  slotName = "calendar",
  locale,
  ...props
}) {
  const defaultClassNames = getDefaultClassNames();
  const dateLocale = useUiDateLocale();
  return /* @__PURE__ */ jsx(
    DayPicker,
    {
      locale: locale ?? dateLocale,
      showOutsideDays,
      className: cn(
        elevatedSurface,
        nestedSurfaceReset,
        "group/calendar p-4 [--cell-size:--spacing(8)] bg-card",
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className
      ),
      captionLayout,
      formatters: {
        formatMonthDropdown: (date, dateLib = defaultDateLib) => dateLib.format(date, "LLL"),
        ...formatters
      },
      classNames: {
        root: cn("w-fit", defaultClassNames.root),
        months: cn(
          "gap-4 md:flex-row relative flex flex-col",
          defaultClassNames.months
        ),
        month: cn(
          "gap-4 flex w-full flex-col",
          defaultClassNames.month
        ),
        nav: cn(
          "inset-x-0 top-0 gap-1 absolute flex w-full items-center justify-between",
          defaultClassNames.nav
        ),
        button_previous: cn(
          buttonVariants({ variant: buttonVariant }),
          "p-0 size-(--cell-size) select-none aria-disabled:opacity-50",
          defaultClassNames.button_previous
        ),
        button_next: cn(
          buttonVariants({ variant: buttonVariant }),
          "p-0 size-(--cell-size) select-none aria-disabled:opacity-50",
          defaultClassNames.button_next
        ),
        month_caption: cn(
          "flex h-(--cell-size) w-full items-center justify-center px-(--cell-size)",
          defaultClassNames.month_caption
        ),
        dropdowns: cn(
          "gap-1.5 text-sm font-medium flex h-(--cell-size) w-full items-center justify-center",
          defaultClassNames.dropdowns
        ),
        dropdown_root: cn(
          "shadow-xs rounded-xl relative border border-border has-focus:outline-1 has-focus:outline-offset-0 has-focus:outline-ring has-focus:outline-solid",
          defaultClassNames.dropdown_root
        ),
        dropdown: cn(
          "inset-0 absolute bg-popover opacity-0",
          defaultClassNames.dropdown
        ),
        caption_label: cn(
          "font-medium select-none",
          captionLayout === "label" ? "text-sm" : "h-8 gap-1 pr-1 pl-2 text-sm [&>svg]:size-3.5 rounded-xl flex items-center [&>svg]:text-muted-foreground",
          defaultClassNames.caption_label
        ),
        month_grid: cn(
          "w-full border-collapse",
          defaultClassNames.month_grid
        ),
        weekdays: cn("flex", defaultClassNames.weekdays),
        weekday: cn(
          "font-normal rounded-xl flex-1 text-[0.8rem] text-muted-foreground select-none",
          defaultClassNames.weekday
        ),
        week: cn("mt-2 flex w-full", defaultClassNames.week),
        week_number_header: cn(
          "w-(--cell-size) select-none",
          defaultClassNames.week_number_header
        ),
        week_number: cn(
          "text-[0.8rem] text-muted-foreground select-none",
          defaultClassNames.week_number
        ),
        day: cn(
          "group/day p-0 [&:last-child[data-selected=true]_button]:rounded-r-xl relative aspect-square h-full w-full text-center select-none",
          props.showWeekNumber ? "[&:nth-child(2)[data-selected=true]_button]:rounded-l-xl" : "[&:first-child[data-selected=true]_button]:rounded-l-xl",
          defaultClassNames.day
        ),
        range_start: cn(
          "rounded-l-xl bg-accent",
          defaultClassNames.range_start
        ),
        range_middle: cn(
          "rounded-none",
          defaultClassNames.range_middle
        ),
        range_end: cn(
          "rounded-r-xl bg-accent",
          defaultClassNames.range_end
        ),
        today: cn(
          "rounded-xl bg-accent text-accent-foreground data-[selected=true]:rounded-none",
          defaultClassNames.today
        ),
        outside: cn(
          "text-muted-foreground aria-selected:text-muted-foreground",
          defaultClassNames.outside
        ),
        disabled: cn(
          "text-muted-foreground opacity-50",
          defaultClassNames.disabled
        ),
        hidden: cn("invisible", defaultClassNames.hidden),
        ...classNames
      },
      components: {
        Root: ({ className: className2, rootRef, ...props2 }) => {
          return /* @__PURE__ */ jsx(
            "div",
            {
              ref: rootRef,
              className: cn(className2),
              ...props2,
              "data-slot": slotName
            }
          );
        },
        Chevron: ({ className: className2, orientation, ...props2 }) => {
          if (orientation === "left") {
            return /* @__PURE__ */ jsx(
              ChevronLeftIcon,
              {
                className: cn("size-4", className2),
                ...props2
              }
            );
          }
          if (orientation === "right") {
            return /* @__PURE__ */ jsx(
              ChevronRightIcon,
              {
                className: cn("size-4", className2),
                ...props2
              }
            );
          }
          return /* @__PURE__ */ jsx(
            ChevronDownIcon,
            {
              className: cn("size-4", className2),
              ...props2
            }
          );
        },
        DayButton: CalendarDayButton,
        WeekNumber: ({ children, ...props2 }) => {
          return /* @__PURE__ */ jsx("td", { ...props2, children: /* @__PURE__ */ jsx("div", { className: "flex size-(--cell-size) items-center justify-center text-center", children }) });
        },
        ...components
      },
      ...props
    }
  );
}
function CalendarDayButton({
  className,
  day,
  modifiers,
  ...props
}) {
  const defaultClassNames = getDefaultClassNames();
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);
  return /* @__PURE__ */ jsx(
    Button,
    {
      ref,
      variant: "ghost",
      size: "icon",
      "data-day": day.date.toLocaleDateString(),
      "data-selected-single": modifiers.selected && !modifiers.range_start && !modifiers.range_end && !modifiers.range_middle,
      "data-range-start": modifiers.range_start,
      "data-range-end": modifiers.range_end,
      "data-range-middle": modifiers.range_middle,
      className: cn(
        "gap-1 font-normal [&>span]:text-xs data-[range-end=true]:rounded-xl data-[range-end=true]:rounded-r-xl data-[range-start=true]:rounded-xl data-[range-start=true]:rounded-l-xl flex aspect-square size-auto w-full min-w-(--cell-size) flex-col leading-none group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-[3px] group-data-[focused=true]/day:ring-ring/50 data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground data-[range-middle=true]:rounded-none data-[range-middle=true]:bg-accent data-[range-middle=true]:text-accent-foreground data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground dark:hover:text-accent-foreground [&>span]:opacity-70",
        defaultClassNames.day,
        className
      ),
      ...props
    }
  );
}

// src/components/ui/floating-sheet-stack.tsx
import * as DialogPrimitive from "@radix-ui/react-dialog";
import * as React2 from "react";
import { jsx as jsx2, jsxs } from "react/jsx-runtime";
function FloatingSheetStack({
  children,
  labels,
  slotName = "floating-sheet-stack"
}) {
  const { backLabel, closeLabel } = useUiLabels(
    "floatingSheet",
    floatingSheetDefaultLabels,
    labels
  );
  const [entries, setEntries] = React2.useState([]);
  const [container, setContainer] = React2.useState(null);
  const register = React2.useCallback((entry) => {
    setEntries(
      (current) => current.some((item) => item.id === entry.id) ? current.map((item) => item.id === entry.id ? entry : item) : [...current, entry]
    );
  }, []);
  const unregister = React2.useCallback((id) => {
    setEntries((current) => current.filter((item) => item.id !== id));
  }, []);
  const closeAll = React2.useCallback(() => {
    for (const entry of [...entries].reverse()) {
      entry.close();
    }
  }, [entries]);
  const value = React2.useMemo(
    () => ({
      labels: { backLabel, closeLabel },
      container,
      entries,
      register,
      unregister,
      closeAll
    }),
    [
      backLabel,
      closeLabel,
      container,
      entries,
      register,
      unregister,
      closeAll
    ]
  );
  const top = entries.at(-1);
  return /* @__PURE__ */ jsxs(FloatingSheetStackContext.Provider, { value, children: [
    children,
    /* @__PURE__ */ jsx2(
      DialogPrimitive.Root,
      {
        open: entries.length > 0,
        onOpenChange: (open) => {
          if (!open) {
            closeAll();
          }
        },
        children: /* @__PURE__ */ jsxs(DialogPrimitive.Portal, { children: [
          /* @__PURE__ */ jsx2(
            DialogPrimitive.Overlay,
            {
              "data-slot": "floating-sheet-overlay",
              className: "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 inset-0 bg-black/10 fixed z-50"
            }
          ),
          /* @__PURE__ */ jsxs(
            DialogPrimitive.Content,
            {
              "aria-describedby": void 0,
              onEscapeKeyDown: (event) => {
                event.preventDefault();
                if (!top?.persistent) {
                  top?.close();
                }
              },
              onInteractOutside: (event) => {
                if (top?.persistent) {
                  event.preventDefault();
                }
              },
              onOpenAutoFocus: (event) => event.preventDefault(),
              onCloseAutoFocus: (event) => event.preventDefault(),
              className: "inset-2 sm:inset-y-4 sm:right-4 sm:left-auto sm:w-[calc(100vw-2rem)] sm:max-w-lg sm:p-0 fixed z-50 p-[env(safe-area-inset-top)_env(safe-area-inset-right)_env(safe-area-inset-bottom)_env(safe-area-inset-left)] outline-none",
              "data-slot": slotName,
              children: [
                /* @__PURE__ */ jsx2(DialogPrimitive.Title, { className: "sr-only", children: top?.title }),
                /* @__PURE__ */ jsx2(
                  "div",
                  {
                    ref: setContainer,
                    "data-slot": "floating-sheet-panels",
                    className: "relative h-full w-full"
                  }
                )
              ]
            }
          )
        ] })
      }
    )
  ] });
}

// src/components/ui/floating-sheet.tsx
import { ArrowLeftIcon, XIcon } from "lucide-react";
import * as React4 from "react";
import { createPortal } from "react-dom";

// src/hooks/use-floating-sheet-body-edges.ts
import * as React3 from "react";
function useFloatingSheetBodyEdges(containerRef, topSentinelRef, bottomSentinelRef, reportEdges) {
  React3.useEffect(() => {
    const container = containerRef.current;
    const topSentinel = topSentinelRef.current;
    const bottomSentinel = bottomSentinelRef.current;
    if (!reportEdges || !container || !topSentinel || !bottomSentinel || typeof IntersectionObserver === "undefined") {
      return;
    }
    let edges = floatingSheetDefaultEdges;
    const edgeKeyByTarget = /* @__PURE__ */ new Map([
      [topSentinel, "top"],
      [bottomSentinel, "bottom"]
    ]);
    const observer = new IntersectionObserver(
      (entries) => {
        const next = { ...edges };
        for (const entry of entries) {
          const key = edgeKeyByTarget.get(entry.target);
          if (!key) {
            continue;
          }
          next[key] = entry.isIntersecting;
        }
        edges = next;
        reportEdges(next);
      },
      { root: container, threshold: 0 }
    );
    observer.observe(topSentinel);
    observer.observe(bottomSentinel);
    return () => {
      observer.disconnect();
      reportEdges(floatingSheetDefaultEdges);
    };
  }, [containerRef, topSentinelRef, bottomSentinelRef, reportEdges]);
}

// src/components/ui/floating-sheet.tsx
import { jsx as jsx3, jsxs as jsxs2 } from "react/jsx-runtime";
function FloatingSheet({
  open,
  onOpenChange,
  title,
  description,
  persistent = false,
  className,
  children,
  slotName = "floating-sheet",
  ...props
}) {
  const { labels, container, entries, register, unregister, closeAll } = useFloatingSheetStack();
  const id = React4.useId();
  const titleId = `${id}-title`;
  const descriptionId = `${id}-description`;
  const close = React4.useCallback(() => onOpenChange(false), [onOpenChange]);
  const closeRef = React4.useRef(close);
  const titleRef = React4.useRef(title);
  const openerRef = React4.useRef(null);
  const panelRef = React4.useRef(null);
  const focusedRef = React4.useRef(false);
  const [edges, setEdges] = React4.useState(
    floatingSheetDefaultEdges
  );
  React4.useEffect(() => {
    closeRef.current = close;
    titleRef.current = title;
  });
  React4.useEffect(() => {
    if (!open) {
      return;
    }
    register({
      id,
      title: titleRef.current,
      persistent,
      close: () => closeRef.current()
    });
  }, [open, id, persistent, register]);
  React4.useEffect(() => {
    if (!open) {
      return;
    }
    return () => unregister(id);
  }, [open, id, unregister]);
  const index = entries.findIndex((entry) => entry.id === id);
  const depth = index === -1 ? 0 : entries.length - 1 - index;
  const isTop = index !== -1 && depth === 0;
  React4.useEffect(() => {
    if (open) {
      openerRef.current = document.activeElement;
      return;
    }
    const opener = openerRef.current;
    openerRef.current = null;
    if (opener instanceof HTMLElement && document.contains(opener)) {
      opener.focus();
    }
  }, [open]);
  React4.useEffect(() => {
    if (!open) {
      focusedRef.current = false;
      return;
    }
    if (!isTop || focusedRef.current) {
      return;
    }
    focusedRef.current = true;
    const frame = requestAnimationFrame(() => panelRef.current?.focus());
    return () => cancelAnimationFrame(frame);
  }, [open, isTop]);
  if (!open || !container) {
    return null;
  }
  const offset = Math.min(depth, FLOATING_SHEET_OFFSET_LIMIT);
  return createPortal(
    /* @__PURE__ */ jsxs2(
      "section",
      {
        ref: panelRef,
        "data-depth": depth,
        role: "dialog",
        "aria-labelledby": titleId,
        "aria-describedby": description ? descriptionId : void 0,
        tabIndex: -1,
        inert: !isTop,
        style: {
          transform: `translateX(-${offset * 26}px) scale(${1 - offset * 0.035})`,
          zIndex: index
        },
        className: cn(
          `${modalSurface} inset-0 ease-out absolute flex flex-col overflow-hidden transition-transform duration-300 outline-none`,
          depth > 0 && "max-sm:hidden pointer-events-none",
          depth > FLOATING_SHEET_OFFSET_LIMIT && "hidden",
          className
        ),
        ...props,
        "data-slot": slotName,
        children: [
          /* @__PURE__ */ jsxs2(
            "header",
            {
              "data-slot": "floating-sheet-header",
              className: cn(
                "gap-1 p-5 relative z-10 flex flex-col",
                scrollEdgeTransition,
                !edges.top && scrollShadowFromTop
              ),
              children: [
                index > 0 ? /* @__PURE__ */ jsxs2(
                  "button",
                  {
                    type: "button",
                    "data-slot": "floating-sheet-back",
                    onClick: close,
                    className: cn(
                      "gap-2 h-8 -ml-2 px-2 text-sm font-medium inline-flex w-fit items-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground",
                      focusRing
                    ),
                    children: [
                      /* @__PURE__ */ jsx3(ArrowLeftIcon, { className: "size-4" }),
                      labels.backLabel
                    ]
                  }
                ) : null,
                /* @__PURE__ */ jsx3(
                  "h2",
                  {
                    id: titleId,
                    "data-slot": "floating-sheet-title",
                    className: "pr-10 text-lg font-semibold text-foreground",
                    children: title
                  }
                ),
                description ? /* @__PURE__ */ jsx3(
                  "p",
                  {
                    id: descriptionId,
                    "data-slot": "floating-sheet-description",
                    className: "text-sm text-muted-foreground",
                    children: description
                  }
                ) : null
              ]
            }
          ),
          /* @__PURE__ */ jsx3(FloatingSheetReportEdgesContext.Provider, { value: setEdges, children: /* @__PURE__ */ jsx3(FloatingSheetEdgesContext.Provider, { value: edges, children }) }),
          /* @__PURE__ */ jsx3(
            "button",
            {
              type: "button",
              "data-slot": "floating-sheet-close",
              "aria-label": labels.closeLabel,
              onClick: closeAll,
              className: cn(
                "top-4 right-4 size-9 shadow-xs absolute z-20 flex items-center justify-center rounded-full border border-border bg-muted text-muted-foreground transition-colors hover:bg-accent hover:text-foreground disabled:pointer-events-none",
                focusRing
              ),
              children: /* @__PURE__ */ jsx3(XIcon, { className: "size-4" })
            }
          )
        ]
      }
    ),
    container
  );
}
function FloatingSheetBody({
  className,
  slotName = "floating-sheet-body",
  children,
  ...props
}) {
  const reportEdges = React4.useContext(FloatingSheetReportEdgesContext);
  const containerRef = React4.useRef(null);
  const topSentinelRef = React4.useRef(null);
  const bottomSentinelRef = React4.useRef(null);
  useFloatingSheetBodyEdges(
    containerRef,
    topSentinelRef,
    bottomSentinelRef,
    reportEdges
  );
  return /* @__PURE__ */ jsxs2(
    "div",
    {
      ref: containerRef,
      className: cn("p-5 flex-1 overflow-y-auto", className),
      ...props,
      "data-slot": slotName,
      children: [
        /* @__PURE__ */ jsx3(
          "div",
          {
            ref: topSentinelRef,
            "aria-hidden": "true",
            "data-slot": "floating-sheet-top-sentinel",
            className: "h-0"
          }
        ),
        children,
        /* @__PURE__ */ jsx3(
          "div",
          {
            ref: bottomSentinelRef,
            "aria-hidden": "true",
            "data-slot": "floating-sheet-bottom-sentinel",
            className: "h-0"
          }
        )
      ]
    }
  );
}
function FloatingSheetFooter({
  className,
  slotName = "floating-sheet-footer",
  ...props
}) {
  const edges = React4.useContext(FloatingSheetEdgesContext);
  return /* @__PURE__ */ jsx3(
    "div",
    {
      className: cn(
        "gap-2 p-5 relative z-10 mt-auto flex items-center justify-end",
        scrollEdgeTransition,
        !edges.bottom && scrollShadowFromBottom,
        className
      ),
      ...props,
      "data-slot": slotName
    }
  );
}

// src/components/ui/input-otp.tsx
import { OTPInput, OTPInputContext } from "input-otp";
import { Minus } from "lucide-react";
import * as React5 from "react";
import { jsx as jsx4, jsxs as jsxs3 } from "react/jsx-runtime";
var InputOTP = React5.forwardRef(({ className, containerClassName, ...props }, ref) => /* @__PURE__ */ jsx4(
  OTPInput,
  {
    ref,
    containerClassName: cn(
      "gap-2 flex items-center has-[:disabled]:opacity-50",
      containerClassName
    ),
    className: cn("disabled:cursor-not-allowed", className),
    ...props
  }
));
InputOTP.displayName = "InputOTP";
var InputOTPGroup = React5.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx4("div", { ref, className: cn("flex items-center", className), ...props }));
InputOTPGroup.displayName = "InputOTPGroup";
var InputOTPSlot = React5.forwardRef(({ index, className, slotName = "input-otp-slot", ...props }, ref) => {
  const inputOTPContext = React5.useContext(OTPInputContext);
  const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index];
  return /* @__PURE__ */ jsxs3(
    "div",
    {
      ref,
      className: cn(
        glassControl,
        controlFill,
        "size-11 text-base sm:text-sm font-medium first:rounded-l-2xl last:rounded-r-2xl relative flex items-center justify-center rounded-none transition-all",
        isActive && "z-10 ring-[3px] ring-ring/50",
        className
      ),
      ...props,
      "data-slot": slotName,
      children: [
        char,
        hasFakeCaret && /* @__PURE__ */ jsx4("div", { className: "inset-0 pointer-events-none absolute flex items-center justify-center", children: /* @__PURE__ */ jsx4("div", { className: "h-4 animate-caret-blink w-px bg-foreground duration-1000" }) })
      ]
    }
  );
});
InputOTPSlot.displayName = "InputOTPSlot";
var InputOTPSeparator = React5.forwardRef(({ ...props }, ref) => /* @__PURE__ */ jsx4("div", { ref, role: "separator", ...props, children: /* @__PURE__ */ jsx4(Minus, {}) }));
InputOTPSeparator.displayName = "InputOTPSeparator";

// src/components/ui/switch.tsx
import * as SwitchPrimitives from "@radix-ui/react-switch";
import * as React6 from "react";
import { jsx as jsx5 } from "react/jsx-runtime";
var Switch = React6.forwardRef(({ className, slotName = "switch", ...props }, ref) => /* @__PURE__ */ jsx5(
  SwitchPrimitives.Root,
  {
    className: cn(
      `peer h-6 w-11 shadow-sm inline-flex shrink-0 cursor-pointer items-center rounded-full border border-transparent transition-colors disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input ${focusRing}`,
      className
    ),
    ...props,
    ref,
    "data-slot": slotName,
    children: /* @__PURE__ */ jsx5(
      SwitchPrimitives.Thumb,
      {
        "data-slot": "switch-thumb",
        className: cn(
          "size-5 shadow-lg data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0 pointer-events-none block rounded-full bg-background ring-0 transition-transform"
        )
      }
    )
  }
));
Switch.displayName = SwitchPrimitives.Root.displayName;

// src/components/ui/tabs.tsx
import * as TabsPrimitive from "@radix-ui/react-tabs";
import * as React7 from "react";
import { jsx as jsx6 } from "react/jsx-runtime";
var Tabs = React7.forwardRef(({ slotName = "tabs", ...props }, ref) => /* @__PURE__ */ jsx6(TabsPrimitive.Root, { ref, ...props, "data-slot": slotName }));
Tabs.displayName = TabsPrimitive.Root.displayName;
var TabsList = React7.forwardRef(({ className, slotName = "tabs-list", ...props }, ref) => /* @__PURE__ */ jsx6(
  TabsPrimitive.List,
  {
    ref,
    className: cn(
      "h-11 p-1.5 rounded-2xl inline-flex items-center justify-center bg-muted text-muted-foreground",
      className
    ),
    ...props,
    "data-slot": slotName
  }
));
TabsList.displayName = TabsPrimitive.List.displayName;
var TabsTrigger = React7.forwardRef(({ className, slotName = "tabs-trigger", ...props }, ref) => /* @__PURE__ */ jsx6(
  TabsPrimitive.Trigger,
  {
    ref,
    className: cn(
      `px-4 text-sm font-medium data-[state=active]:shadow-sm h-8 rounded-xl data-[state=active]:font-semibold inline-flex items-center justify-center whitespace-nowrap transition-all disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-tab-active data-[state=active]:text-foreground ${focusRing}`,
      className
    ),
    ...props,
    "data-slot": slotName
  }
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;
var TabsContent = React7.forwardRef(
  ({ className, padding = "default", slotName = "tabs-content", ...props }, ref) => /* @__PURE__ */ jsx6(
    TabsPrimitive.Content,
    {
      ref,
      className: cn(
        elevatedSurface,
        nestedSurfaceReset,
        `mt-2 bg-card ${focusRing}`,
        padding === "none" ? "" : "p-5",
        className
      ),
      ...props,
      "data-slot": slotName
    }
  )
);
TabsContent.displayName = TabsPrimitive.Content.displayName;

// src/components/ui/textarea.tsx
import * as React8 from "react";
import { jsx as jsx7 } from "react/jsx-runtime";
var Textarea = React8.forwardRef(({ className, slotName = "textarea", ...props }, ref) => {
  return /* @__PURE__ */ jsx7(
    "textarea",
    {
      className: cn(
        fieldSurface,
        "px-4 py-3 font-medium min-h-24 flex w-full resize-none transition-[color,box-shadow] selection:bg-primary selection:text-primary-foreground placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
        fieldFocus,
        "aria-invalid:border-destructive aria-invalid:ring-destructive/20",
        className
      ),
      ref,
      ...props,
      "data-slot": slotName
    }
  );
});
Textarea.displayName = "Textarea";

export {
  Calendar,
  CalendarDayButton,
  FloatingSheetStack,
  FloatingSheet,
  FloatingSheetBody,
  FloatingSheetFooter,
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
  Switch,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Textarea
};
//# sourceMappingURL=chunk-4QACAZI5.js.map