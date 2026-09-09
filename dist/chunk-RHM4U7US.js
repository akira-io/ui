'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "./chunk-VSDPJW6I.js";
import {
  useUiLabels
} from "./chunk-ZZDRO234.js";
import {
  Label
} from "./chunk-JKKXBCNI.js";
import {
  FLOATING_SHEET_OFFSET_LIMIT,
  FloatingSheetEdgesContext,
  FloatingSheetReportEdgesContext,
  FloatingSheetStackContext,
  floatingSheetDefaultEdges,
  floatingSheetDefaultLabels,
  useFloatingSheetStack,
  useSheetPortalContainer
} from "./chunk-EXTOGROG.js";
import {
  Input
} from "./chunk-OTLBSTHU.js";
import {
  Button,
  buttonVariants,
  cn,
  controlFill,
  elevatedSurface,
  fieldFocus,
  fieldSurface,
  focusRing,
  glassControl,
  menuSurface,
  modalSurface,
  nestedSurfaceReset,
  panelSurface,
  scrollEdgeTransition,
  scrollShadowFromBottom,
  scrollShadowFromTop
} from "./chunk-33SBGSQF.js";

// src/components/ui/confirm-dialog.tsx
import { AlertCircle, ChevronRight } from "lucide-react";
import { useEffect, useId, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
var confirmDialogDefaultLabels = {
  title: "Confirm Action",
  description: "Are you sure you want to continue? This action cannot be undone.",
  confirmText: "Confirm",
  cancelText: "Cancel"
};
function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmText,
  cancelText,
  variant = "destructive",
  processing = false,
  requiredValue,
  requiredValueLabel = "Type {{value}} to confirm",
  onConfirm,
  onCancel,
  slotName = "confirm-dialog"
}) {
  const labels = useUiLabels("confirmDialog", confirmDialogDefaultLabels, {
    title,
    confirmText,
    cancelText
  });
  const resolvedDescription = description ?? labels.description;
  const inputId = useId();
  const [typedValue, setTypedValue] = useState("");
  const unlocked = requiredValue === void 0 || typedValue === requiredValue;
  useEffect(() => {
    if (!open) {
      setTypedValue("");
    }
  }, [open]);
  const handleConfirm = () => {
    if (processing || !unlocked) {
      return;
    }
    onConfirm();
    onOpenChange(false);
  };
  const handleCancel = () => {
    if (processing) {
      return;
    }
    onCancel?.();
    onOpenChange(false);
  };
  return /* @__PURE__ */ jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxs(DialogContent, { className: "max-w-md p-0", slotName, children: [
    /* @__PURE__ */ jsxs(DialogHeader, { className: "p-6 md:p-8", children: [
      /* @__PURE__ */ jsx("div", { className: "mb-6 flex justify-center", children: /* @__PURE__ */ jsx(
        "div",
        {
          className: cn(
            "size-16 rounded-3xl shadow-xl flex items-center justify-center",
            variant === "destructive" ? "bg-destructive text-destructive-foreground shadow-destructive/20" : "bg-primary text-primary-foreground shadow-primary/20"
          ),
          children: /* @__PURE__ */ jsx(AlertCircle, { className: "h-8 w-8" })
        }
      ) }),
      /* @__PURE__ */ jsx(DialogTitle, { children: labels.title }),
      /* @__PURE__ */ jsx(DialogDescription, { children: resolvedDescription })
    ] }),
    requiredValue !== void 0 && /* @__PURE__ */ jsxs(
      "div",
      {
        "data-slot": "confirm-dialog-gate",
        className: "gap-2 px-6 md:px-8 flex flex-col",
        children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: inputId, children: requiredValueLabel.replace(
            "{{value}}",
            requiredValue
          ) }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: inputId,
              value: typedValue,
              autoComplete: "off",
              disabled: processing,
              onChange: (event) => setTypedValue(event.target.value)
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsx(DialogFooter, { className: "p-6 md:p-8", children: /* @__PURE__ */ jsxs("div", { className: "gap-4 sm:grid-cols-2 grid w-full", children: [
      /* @__PURE__ */ jsx(
        Button,
        {
          type: "button",
          variant: "ghost",
          disabled: processing,
          onClick: handleCancel,
          className: "text-muted-foreground",
          children: labels.cancelText
        }
      ),
      /* @__PURE__ */ jsxs(
        Button,
        {
          variant,
          disabled: processing || !unlocked,
          onClick: handleConfirm,
          children: [
            labels.confirmText,
            /* @__PURE__ */ jsx(ChevronRight, { className: "ml-2 h-5 w-5" })
          ]
        }
      )
    ] }) })
  ] }) });
}

// src/components/ui/calendar.tsx
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from "lucide-react";
import * as React from "react";
import {
  DayPicker,
  getDefaultClassNames
} from "react-day-picker";
import { jsx as jsx2 } from "react/jsx-runtime";
function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  buttonVariant = "ghost",
  formatters,
  components,
  slotName = "calendar",
  ...props
}) {
  const defaultClassNames = getDefaultClassNames();
  return /* @__PURE__ */ jsx2(
    DayPicker,
    {
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
        formatMonthDropdown: (date) => date.toLocaleString("default", { month: "short" }),
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
          return /* @__PURE__ */ jsx2(
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
            return /* @__PURE__ */ jsx2(
              ChevronLeftIcon,
              {
                className: cn("size-4", className2),
                ...props2
              }
            );
          }
          if (orientation === "right") {
            return /* @__PURE__ */ jsx2(
              ChevronRightIcon,
              {
                className: cn("size-4", className2),
                ...props2
              }
            );
          }
          return /* @__PURE__ */ jsx2(
            ChevronDownIcon,
            {
              className: cn("size-4", className2),
              ...props2
            }
          );
        },
        DayButton: CalendarDayButton,
        WeekNumber: ({ children, ...props2 }) => {
          return /* @__PURE__ */ jsx2("td", { ...props2, children: /* @__PURE__ */ jsx2("div", { className: "flex size-(--cell-size) items-center justify-center text-center", children }) });
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
  return /* @__PURE__ */ jsx2(
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

// src/components/ui/command.tsx
import { Command as CommandPrimitive } from "cmdk";
import { SearchIcon, SearchXIcon } from "lucide-react";
import { jsx as jsx3, jsxs as jsxs2 } from "react/jsx-runtime";
function Command({
  className,
  slotName = "command",
  ...props
}) {
  return /* @__PURE__ */ jsx3(
    CommandPrimitive,
    {
      className: cn(
        elevatedSurface,
        nestedSurfaceReset,
        "flex h-full w-full flex-col overflow-hidden bg-card text-card-foreground",
        className
      ),
      ...props,
      "data-slot": slotName
    }
  );
}
function CommandDialog({
  title = "Command Palette",
  description = "Search for a command to run...",
  children,
  className,
  hideCloseButton = true,
  ...props
}) {
  return /* @__PURE__ */ jsxs2(Dialog, { ...props, children: [
    /* @__PURE__ */ jsxs2(DialogHeader, { className: "sr-only", children: [
      /* @__PURE__ */ jsx3(DialogTitle, { children: title }),
      /* @__PURE__ */ jsx3(DialogDescription, { children: description })
    ] }),
    /* @__PURE__ */ jsx3(
      DialogContent,
      {
        className: cn(
          `${modalSurface} gap-0 p-0 overflow-hidden`,
          className
        ),
        hideCloseButton,
        children: /* @__PURE__ */ jsx3(Command, { className: "[&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-item]]:py-2.5 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5", children })
      }
    )
  ] });
}
function CommandInput({
  className,
  slotName = "command-input",
  ...props
}) {
  return /* @__PURE__ */ jsx3("div", { className: "shrink-0 border-b border-border", children: /* @__PURE__ */ jsxs2(
    "div",
    {
      "data-slot": "command-input-wrapper",
      className: cn(
        fieldSurface,
        "h-11 gap-3 px-4 m-3 flex items-center"
      ),
      children: [
        /* @__PURE__ */ jsx3(SearchIcon, { className: "size-4 shrink-0 opacity-50" }),
        /* @__PURE__ */ jsx3(
          CommandPrimitive.Input,
          {
            className: cn(
              "h-11 text-base sm:text-sm font-medium flex w-full bg-transparent outline-hidden placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
              className
            ),
            ...props,
            "data-slot": slotName
          }
        )
      ]
    }
  ) });
}
function CommandList({
  className,
  slotName = "command-list",
  ...props
}) {
  return /* @__PURE__ */ jsx3(
    CommandPrimitive.List,
    {
      className: cn(
        "scroll-py-1 max-h-[300px] overflow-x-hidden overflow-y-auto",
        className
      ),
      ...props,
      "data-slot": slotName
    }
  );
}
function CommandEmpty({
  className,
  children,
  slotName = "command-empty",
  ...props
}) {
  return /* @__PURE__ */ jsxs2(
    CommandPrimitive.Empty,
    {
      className: cn(
        "gap-3 px-6 py-10 flex flex-col items-center justify-center text-center",
        className
      ),
      ...props,
      "data-slot": slotName,
      children: [
        /* @__PURE__ */ jsx3("span", { className: "size-10 flex items-center justify-center rounded-full bg-surface-recessed text-muted-foreground", children: /* @__PURE__ */ jsx3(SearchXIcon, { className: "size-5" }) }),
        /* @__PURE__ */ jsx3("span", { className: "text-sm text-muted-foreground", children })
      ]
    }
  );
}
function CommandGroup({
  className,
  slotName = "command-group",
  ...props
}) {
  return /* @__PURE__ */ jsx3(
    CommandPrimitive.Group,
    {
      className: cn(
        "p-3 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium overflow-hidden text-foreground [&_[cmdk-group-heading]]:text-muted-foreground",
        className
      ),
      ...props,
      "data-slot": slotName
    }
  );
}
function CommandSeparator({
  className,
  slotName = "command-separator",
  ...props
}) {
  return /* @__PURE__ */ jsx3(
    CommandPrimitive.Separator,
    {
      className: cn("mx-3 h-px bg-border", className),
      ...props,
      "data-slot": slotName
    }
  );
}
function CommandItem({
  className,
  slotName = "command-item",
  ...props
}) {
  return /* @__PURE__ */ jsx3(
    CommandPrimitive.Item,
    {
      className: cn(
        "gap-2 px-2 py-1.5 text-sm [&_svg:not([class*='size-'])]:size-4 rounded-xl relative flex cursor-default items-center outline-hidden select-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='text-'])]:text-muted-foreground",
        className
      ),
      ...props,
      "data-slot": slotName
    }
  );
}
function CommandShortcut({
  className,
  slotName = "command-shortcut",
  ...props
}) {
  return /* @__PURE__ */ jsx3(
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

// src/components/ui/popover.tsx
import { Popover as PopoverPrimitive } from "radix-ui";
import * as React2 from "react";
import { jsx as jsx4 } from "react/jsx-runtime";
var Popover = PopoverPrimitive.Root;
var PopoverTrigger = PopoverPrimitive.Trigger;
var PopoverAnchor = PopoverPrimitive.Anchor;
var PopoverContent = React2.forwardRef(
  ({
    className,
    align = "center",
    sideOffset = 4,
    slotName = "popover-content",
    container,
    ...props
  }, ref) => {
    const portalContainer = useSheetPortalContainer(container);
    return /* @__PURE__ */ jsx4(PopoverPrimitive.Portal, { container: portalContainer, children: /* @__PURE__ */ jsx4(
      PopoverPrimitive.Content,
      {
        ref,
        align,
        sideOffset,
        className: cn(
          `${panelSurface} p-4 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-full origin-[--radix-popover-content-transform-origin] bg-popover/90 outline-none`,
          className
        ),
        ...props,
        "data-slot": slotName
      }
    ) });
  }
);
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

// src/components/ui/select.tsx
import * as SelectPrimitive from "@radix-ui/react-select";
import { CheckIcon, ChevronDownIcon as ChevronDownIcon2, ChevronUpIcon } from "lucide-react";
import { jsx as jsx5, jsxs as jsxs3 } from "react/jsx-runtime";
function Select({
  slotName = "select",
  ...props
}) {
  return /* @__PURE__ */ jsx5(SelectPrimitive.Root, { ...props, "data-slot": slotName });
}
function SelectGroup({
  slotName = "select-group",
  ...props
}) {
  return /* @__PURE__ */ jsx5(SelectPrimitive.Group, { ...props, "data-slot": slotName });
}
function SelectValue({
  slotName = "select-value",
  ...props
}) {
  return /* @__PURE__ */ jsx5(SelectPrimitive.Value, { ...props, "data-slot": slotName });
}
function SelectTrigger({
  className,
  children,
  slotName = "select-trigger",
  ...props
}) {
  return /* @__PURE__ */ jsxs3(
    SelectPrimitive.Trigger,
    {
      className: cn(
        `${fieldSurface} h-11 px-4 font-medium *:data-[slot=select-value]:gap-2 [&_svg:not([class*='size-'])]:size-4 flex w-full items-center justify-between transition-[color,box-shadow] disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 data-[placeholder]:text-muted-foreground *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center [&_svg]:pointer-events-none [&_svg]:shrink-0 [&>span]:line-clamp-1 ${fieldFocus}`,
        className
      ),
      ...props,
      "data-slot": slotName,
      children: [
        children,
        /* @__PURE__ */ jsx5(SelectPrimitive.Icon, { asChild: true, children: /* @__PURE__ */ jsx5(ChevronDownIcon2, { className: "size-4 opacity-50" }) })
      ]
    }
  );
}
function SelectContent({
  className,
  children,
  position = "popper",
  slotName = "select-content",
  container,
  ...props
}) {
  const portalContainer = useSheetPortalContainer(container);
  return /* @__PURE__ */ jsx5(SelectPrimitive.Portal, { container: portalContainer, children: /* @__PURE__ */ jsxs3(
    SelectPrimitive.Content,
    {
      className: cn(
        `${menuSurface} max-h-96 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 relative z-50 min-w-[8rem] overflow-hidden bg-popover/95`,
        position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className
      ),
      position,
      ...props,
      "data-slot": slotName,
      children: [
        /* @__PURE__ */ jsx5(SelectScrollUpButton, {}),
        /* @__PURE__ */ jsx5(
          SelectPrimitive.Viewport,
          {
            className: cn(
              "p-1",
              position === "popper" && "scroll-my-1 h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
            ),
            children
          }
        ),
        /* @__PURE__ */ jsx5(SelectScrollDownButton, {})
      ]
    }
  ) });
}
function SelectLabel({
  className,
  slotName = "select-label",
  ...props
}) {
  return /* @__PURE__ */ jsx5(
    SelectPrimitive.Label,
    {
      className: cn(
        "px-2 py-1.5 text-xs font-medium tracking-wider text-muted-foreground uppercase",
        className
      ),
      ...props,
      "data-slot": slotName
    }
  );
}
function SelectItem({
  className,
  children,
  slotName = "select-item",
  ...props
}) {
  return /* @__PURE__ */ jsxs3(
    SelectPrimitive.Item,
    {
      className: cn(
        "gap-2 rounded-xl py-1.5 pr-8 pl-2 text-sm [&_svg:not([class*='size-'])]:size-4 *:[span]:last:gap-2 focus:font-semibold relative flex w-full cursor-default items-center outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='text-'])]:text-muted-foreground *:[span]:last:flex *:[span]:last:items-center",
        className
      ),
      ...props,
      "data-slot": slotName,
      children: [
        /* @__PURE__ */ jsx5("span", { className: "right-2 size-3.5 absolute flex items-center justify-center", children: /* @__PURE__ */ jsx5(SelectPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx5(CheckIcon, { className: "size-4" }) }) }),
        /* @__PURE__ */ jsx5(SelectPrimitive.ItemText, { children })
      ]
    }
  );
}
function SelectSeparator({
  className,
  slotName = "select-separator",
  ...props
}) {
  return /* @__PURE__ */ jsx5(
    SelectPrimitive.Separator,
    {
      className: cn(
        "-mx-1 my-1 pointer-events-none h-px bg-border",
        className
      ),
      ...props,
      "data-slot": slotName
    }
  );
}
function SelectScrollUpButton({
  className,
  slotName = "select-scroll-up-button",
  ...props
}) {
  return /* @__PURE__ */ jsx5(
    SelectPrimitive.ScrollUpButton,
    {
      className: cn(
        "py-1 flex cursor-default items-center justify-center",
        className
      ),
      ...props,
      "data-slot": slotName,
      children: /* @__PURE__ */ jsx5(ChevronUpIcon, { className: "size-4" })
    }
  );
}
function SelectScrollDownButton({
  className,
  slotName = "select-scroll-down-button",
  ...props
}) {
  return /* @__PURE__ */ jsx5(
    SelectPrimitive.ScrollDownButton,
    {
      className: cn(
        "py-1 flex cursor-default items-center justify-center",
        className
      ),
      ...props,
      "data-slot": slotName,
      children: /* @__PURE__ */ jsx5(ChevronDownIcon2, { className: "size-4" })
    }
  );
}

// src/components/ui/floating-sheet-stack.tsx
import * as DialogPrimitive from "@radix-ui/react-dialog";
import * as React3 from "react";
import { jsx as jsx6, jsxs as jsxs4 } from "react/jsx-runtime";
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
  const [entries, setEntries] = React3.useState([]);
  const [container, setContainer] = React3.useState(null);
  const register = React3.useCallback((entry) => {
    setEntries(
      (current) => current.some((item) => item.id === entry.id) ? current.map((item) => item.id === entry.id ? entry : item) : [...current, entry]
    );
  }, []);
  const unregister = React3.useCallback((id) => {
    setEntries((current) => current.filter((item) => item.id !== id));
  }, []);
  const closeAll = React3.useCallback(() => {
    for (const entry of [...entries].reverse()) {
      entry.close();
    }
  }, [entries]);
  const value = React3.useMemo(
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
  return /* @__PURE__ */ jsxs4(FloatingSheetStackContext.Provider, { value, children: [
    children,
    /* @__PURE__ */ jsx6(
      DialogPrimitive.Root,
      {
        open: entries.length > 0,
        onOpenChange: (open) => {
          if (!open) {
            closeAll();
          }
        },
        children: /* @__PURE__ */ jsxs4(DialogPrimitive.Portal, { children: [
          /* @__PURE__ */ jsx6(
            DialogPrimitive.Overlay,
            {
              "data-slot": "floating-sheet-overlay",
              className: "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 inset-0 bg-black/10 fixed z-50"
            }
          ),
          /* @__PURE__ */ jsxs4(
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
                /* @__PURE__ */ jsx6(DialogPrimitive.Title, { className: "sr-only", children: top?.title }),
                /* @__PURE__ */ jsx6(
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
import * as React5 from "react";
import { createPortal } from "react-dom";

// src/hooks/use-floating-sheet-body-edges.ts
import * as React4 from "react";
function useFloatingSheetBodyEdges(containerRef, topSentinelRef, bottomSentinelRef, reportEdges) {
  React4.useEffect(() => {
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
import { jsx as jsx7, jsxs as jsxs5 } from "react/jsx-runtime";
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
  const id = React5.useId();
  const titleId = `${id}-title`;
  const descriptionId = `${id}-description`;
  const close = React5.useCallback(() => onOpenChange(false), [onOpenChange]);
  const closeRef = React5.useRef(close);
  const titleRef = React5.useRef(title);
  const openerRef = React5.useRef(null);
  const panelRef = React5.useRef(null);
  const focusedRef = React5.useRef(false);
  const [edges, setEdges] = React5.useState(
    floatingSheetDefaultEdges
  );
  React5.useEffect(() => {
    closeRef.current = close;
    titleRef.current = title;
  });
  React5.useEffect(() => {
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
  React5.useEffect(() => {
    if (!open) {
      return;
    }
    return () => unregister(id);
  }, [open, id, unregister]);
  const index = entries.findIndex((entry) => entry.id === id);
  const depth = index === -1 ? 0 : entries.length - 1 - index;
  const isTop = index !== -1 && depth === 0;
  React5.useEffect(() => {
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
  React5.useEffect(() => {
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
    /* @__PURE__ */ jsxs5(
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
          /* @__PURE__ */ jsxs5(
            "header",
            {
              "data-slot": "floating-sheet-header",
              className: cn(
                "gap-1 p-5 relative z-10 flex flex-col",
                scrollEdgeTransition,
                !edges.top && scrollShadowFromTop
              ),
              children: [
                index > 0 ? /* @__PURE__ */ jsxs5(
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
                      /* @__PURE__ */ jsx7(ArrowLeftIcon, { className: "size-4" }),
                      labels.backLabel
                    ]
                  }
                ) : null,
                /* @__PURE__ */ jsx7(
                  "h2",
                  {
                    id: titleId,
                    "data-slot": "floating-sheet-title",
                    className: "pr-10 text-lg font-semibold text-foreground",
                    children: title
                  }
                ),
                description ? /* @__PURE__ */ jsx7(
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
          /* @__PURE__ */ jsx7(FloatingSheetReportEdgesContext.Provider, { value: setEdges, children: /* @__PURE__ */ jsx7(FloatingSheetEdgesContext.Provider, { value: edges, children }) }),
          /* @__PURE__ */ jsx7(
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
              children: /* @__PURE__ */ jsx7(XIcon, { className: "size-4" })
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
  const reportEdges = React5.useContext(FloatingSheetReportEdgesContext);
  const containerRef = React5.useRef(null);
  const topSentinelRef = React5.useRef(null);
  const bottomSentinelRef = React5.useRef(null);
  useFloatingSheetBodyEdges(
    containerRef,
    topSentinelRef,
    bottomSentinelRef,
    reportEdges
  );
  return /* @__PURE__ */ jsxs5(
    "div",
    {
      ref: containerRef,
      className: cn("p-5 flex-1 overflow-y-auto", className),
      ...props,
      "data-slot": slotName,
      children: [
        /* @__PURE__ */ jsx7(
          "div",
          {
            ref: topSentinelRef,
            "aria-hidden": "true",
            "data-slot": "floating-sheet-top-sentinel",
            className: "h-0"
          }
        ),
        children,
        /* @__PURE__ */ jsx7(
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
  const edges = React5.useContext(FloatingSheetEdgesContext);
  return /* @__PURE__ */ jsx7(
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
import * as React6 from "react";
import { jsx as jsx8, jsxs as jsxs6 } from "react/jsx-runtime";
var InputOTP = React6.forwardRef(({ className, containerClassName, ...props }, ref) => /* @__PURE__ */ jsx8(
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
var InputOTPGroup = React6.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx8("div", { ref, className: cn("flex items-center", className), ...props }));
InputOTPGroup.displayName = "InputOTPGroup";
var InputOTPSlot = React6.forwardRef(({ index, className, slotName = "input-otp-slot", ...props }, ref) => {
  const inputOTPContext = React6.useContext(OTPInputContext);
  const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index];
  return /* @__PURE__ */ jsxs6(
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
        hasFakeCaret && /* @__PURE__ */ jsx8("div", { className: "inset-0 pointer-events-none absolute flex items-center justify-center", children: /* @__PURE__ */ jsx8("div", { className: "h-4 animate-caret-blink w-px bg-foreground duration-1000" }) })
      ]
    }
  );
});
InputOTPSlot.displayName = "InputOTPSlot";
var InputOTPSeparator = React6.forwardRef(({ ...props }, ref) => /* @__PURE__ */ jsx8("div", { ref, role: "separator", ...props, children: /* @__PURE__ */ jsx8(Minus, {}) }));
InputOTPSeparator.displayName = "InputOTPSeparator";

// src/components/ui/switch.tsx
import * as SwitchPrimitives from "@radix-ui/react-switch";
import * as React7 from "react";
import { jsx as jsx9 } from "react/jsx-runtime";
var Switch = React7.forwardRef(({ className, slotName = "switch", ...props }, ref) => /* @__PURE__ */ jsx9(
  SwitchPrimitives.Root,
  {
    className: cn(
      `peer h-6 w-11 shadow-sm inline-flex shrink-0 cursor-pointer items-center rounded-full border border-transparent transition-colors disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input ${focusRing}`,
      className
    ),
    ...props,
    ref,
    "data-slot": slotName,
    children: /* @__PURE__ */ jsx9(
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
import * as React8 from "react";
import { jsx as jsx10 } from "react/jsx-runtime";
var Tabs = React8.forwardRef(({ slotName = "tabs", ...props }, ref) => /* @__PURE__ */ jsx10(TabsPrimitive.Root, { ref, ...props, "data-slot": slotName }));
Tabs.displayName = TabsPrimitive.Root.displayName;
var TabsList = React8.forwardRef(({ className, slotName = "tabs-list", ...props }, ref) => /* @__PURE__ */ jsx10(
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
var TabsTrigger = React8.forwardRef(({ className, slotName = "tabs-trigger", ...props }, ref) => /* @__PURE__ */ jsx10(
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
var TabsContent = React8.forwardRef(
  ({ className, padding = "default", slotName = "tabs-content", ...props }, ref) => /* @__PURE__ */ jsx10(
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
import * as React9 from "react";
import { jsx as jsx11 } from "react/jsx-runtime";
var Textarea = React9.forwardRef(({ className, slotName = "textarea", ...props }, ref) => {
  return /* @__PURE__ */ jsx11(
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
  confirmDialogDefaultLabels,
  ConfirmDialog,
  Calendar,
  CalendarDayButton,
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandSeparator,
  CommandItem,
  CommandShortcut,
  Popover,
  PopoverTrigger,
  PopoverAnchor,
  PopoverContent,
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
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
//# sourceMappingURL=chunk-RHM4U7US.js.map