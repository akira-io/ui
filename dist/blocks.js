'use client';

"use client";
import {
  Calendar,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  ConfirmDialog,
  FloatingSheet,
  FloatingSheetBody,
  FloatingSheetFooter,
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea
} from "./chunk-RHM4U7US.js";
import {
  CopyButton
} from "./chunk-4DMNLMQR.js";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "./chunk-VSDPJW6I.js";
import {
  Card
} from "./chunk-VLWHKRSD.js";
import {
  DEFAULT_TOUR_LABELS,
  LoginForm,
  LoginFormEmail,
  LoginFormPassword,
  LoginFormPreset,
  LoginFormProvider,
  LoginFormRemember,
  LoginFormRoot,
  LoginFormStatus,
  LoginFormSubmit,
  TourProvider,
  fieldError,
  loginFormLabels,
  resolveSteps,
  shouldStartTour,
  stepsForBreakpoint,
  useLoginFormContext,
  useTour,
  useTourController
} from "./chunk-ZWMYUOYI.js";
import {
  Alert,
  AlertDescription,
  FieldError
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
  resolveLink
} from "./chunk-VVBBKTC5.js";
import "./chunk-EXTOGROG.js";
import {
  Input,
  Separator
} from "./chunk-OTLBSTHU.js";
import {
  Button,
  Spinner,
  cn,
  compactRadius,
  controlRadius,
  elevatedSurface,
  focusRing,
  nestedSurfaceReset,
  recessedSurface
} from "./chunk-33SBGSQF.js";

// src/blocks/command-palette.tsx
import { useCallback, useEffect, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
var commandPaletteDefaultLabels = {
  placeholder: "Search...",
  noResultsLabel: "No results found"
};
function CommandPalette({
  open,
  onOpenChange,
  groups,
  onSelect,
  query,
  onQueryChange,
  placeholder,
  noResultsLabel,
  emptyState,
  className
}) {
  const labels = useUiLabels("commandPalette", commandPaletteDefaultLabels, {
    placeholder,
    noResultsLabel
  });
  const resolvedEmptyState = emptyState ?? labels.noResultsLabel;
  return /* @__PURE__ */ jsxs(
    CommandDialog,
    {
      open,
      onOpenChange,
      className,
      children: [
        /* @__PURE__ */ jsx(
          CommandInput,
          {
            placeholder: labels.placeholder,
            value: query,
            onValueChange: onQueryChange
          }
        ),
        /* @__PURE__ */ jsxs(CommandList, { className: "max-h-[360px]", children: [
          /* @__PURE__ */ jsx(CommandEmpty, { children: resolvedEmptyState }),
          groups.map((group) => /* @__PURE__ */ jsx(CommandGroup, { heading: group.heading, children: group.items.map((item) => /* @__PURE__ */ jsxs(
            CommandItem,
            {
              value: item.value ?? item.label,
              onSelect: () => onSelect(item),
              children: [
                item.icon && /* @__PURE__ */ jsx(item.icon, { className: "mr-2 size-4" }),
                /* @__PURE__ */ jsx("span", { className: "font-medium", children: item.label }),
                item.hint && /* @__PURE__ */ jsx("span", { className: "text-xs ml-auto text-muted-foreground", children: item.hint })
              ]
            },
            item.id
          )) }, group.heading))
        ] })
      ]
    }
  );
}
function useCommandPalette(initialOpen = false) {
  const [open, setOpen] = useState(initialOpen);
  const toggle = useCallback(() => setOpen((previous) => !previous), []);
  useEffect(() => {
    const handler = (event) => {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        toggle();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [toggle]);
  return { open, setOpen, toggle };
}

// src/blocks/danger-zone.tsx
import { TriangleAlert } from "lucide-react";
import { useState as useState2 } from "react";
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var dangerZoneLabels = {
  title: "Danger zone",
  description: "These actions are permanent and cannot be undone.",
  actionLabel: "Delete",
  confirmTitle: "Confirm Action",
  confirmDescription: "Are you sure you want to continue? This action cannot be undone.",
  confirmText: "Confirm",
  cancelText: "Cancel",
  requiredValueLabel: "Type {{value}} to confirm"
};
function DangerZone({
  title,
  description,
  actions,
  processing = false,
  labels,
  footer,
  className,
  slotName = "danger-zone"
}) {
  const copy = { ...dangerZoneLabels, ...labels };
  const [activeId, setActiveId] = useState2(null);
  const active = actions.find((action) => action.id === activeId) ?? null;
  return /* @__PURE__ */ jsxs2(
    "section",
    {
      className: cn(
        elevatedSurface,
        nestedSurfaceReset,
        "gap-6 p-6 flex flex-col bg-destructive/5 ring-destructive/30",
        className
      ),
      "data-slot": slotName,
      children: [
        /* @__PURE__ */ jsxs2("div", { "data-slot": "danger-zone-header", className: "gap-3 flex", children: [
          /* @__PURE__ */ jsx2("span", { className: "size-11 rounded-2xl flex shrink-0 items-center justify-center bg-destructive/10 text-destructive", children: /* @__PURE__ */ jsx2(TriangleAlert, { className: "size-5" }) }),
          /* @__PURE__ */ jsxs2("div", { children: [
            /* @__PURE__ */ jsx2("h2", { className: "text-lg font-bold text-destructive", children: title ?? copy.title }),
            /* @__PURE__ */ jsx2("p", { className: "text-sm font-medium text-muted-foreground", children: description ?? copy.description })
          ] })
        ] }),
        /* @__PURE__ */ jsx2("ul", { "data-slot": "danger-zone-actions", className: "gap-4 flex flex-col", children: actions.map((action) => /* @__PURE__ */ jsxs2(
          "li",
          {
            "data-slot": "danger-zone-action",
            "data-action-id": action.id,
            className: "gap-4 sm:flex-row sm:items-center sm:justify-between flex flex-col",
            children: [
              /* @__PURE__ */ jsxs2("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsx2("p", { className: "text-sm font-semibold text-foreground", children: action.title }),
                action.description && /* @__PURE__ */ jsx2("p", { className: "text-sm font-medium text-muted-foreground", children: action.description })
              ] }),
              /* @__PURE__ */ jsx2(
                Button,
                {
                  type: "button",
                  variant: "destructive",
                  disabled: processing || action.disabled,
                  onClick: () => setActiveId(action.id),
                  className: "sm:w-auto w-full",
                  children: action.actionLabel ?? copy.actionLabel
                }
              )
            ]
          },
          action.id
        )) }),
        footer,
        /* @__PURE__ */ jsx2(
          ConfirmDialog,
          {
            open: active !== null,
            onOpenChange: (open) => {
              if (!open) {
                setActiveId(null);
              }
            },
            variant: "destructive",
            processing,
            title: active?.confirmTitle ?? copy.confirmTitle,
            description: active?.confirmDescription ?? copy.confirmDescription,
            confirmText: active?.confirmText ?? copy.confirmText,
            cancelText: active?.cancelText ?? copy.cancelText,
            requiredValue: active?.requiredValue,
            requiredValueLabel: active?.requiredValueLabel ?? copy.requiredValueLabel,
            onConfirm: () => active?.onConfirm()
          }
        )
      ]
    }
  );
}

// src/blocks/date-filter/context.tsx
import { createContext, useContext } from "react";
var DateFilterContext = createContext(null);
var DateFilterProvider = DateFilterContext.Provider;
function useDateFilter() {
  const context = useContext(DateFilterContext);
  if (context === null) {
    throw new Error("DateFilter parts must be used inside <DateFilter>.");
  }
  return context;
}

// src/blocks/date-filter/date-filter.tsx
import { CalendarDays as CalendarDays2 } from "lucide-react";
import { useState as useState3 } from "react";

// src/blocks/date-filter/fixed-panel.tsx
import { format } from "date-fns";
import { pt } from "date-fns/locale";
import { ChevronLeft } from "lucide-react";
import { jsx as jsx3, jsxs as jsxs3 } from "react/jsx-runtime";
var CALENDAR_START = new Date(2020, 0, 1);
var CALENDAR_END = new Date((/* @__PURE__ */ new Date()).getFullYear() + 1, 11, 31);
var toDate = (value) => value ? /* @__PURE__ */ new Date(`${value}T00:00:00`) : void 0;
var toIso = (value) => value ? format(value, "yyyy-MM-dd") : void 0;
function DateFilterFixedPanel() {
  const { draft, operators, labels, setDraft, backToRoot, commit } = useDateFilter();
  const operator = draft.operator ?? "between";
  const isRange = operator === "between";
  const canApply = Boolean(draft.start) && (!isRange || Boolean(draft.end));
  return /* @__PURE__ */ jsxs3("div", { className: "w-auto", children: [
    /* @__PURE__ */ jsxs3("div", { className: "gap-1 px-2 py-2 flex items-center border-b", children: [
      /* @__PURE__ */ jsx3(
        Button,
        {
          variant: "ghost",
          size: "icon",
          onClick: backToRoot,
          "aria-label": labels.back,
          children: /* @__PURE__ */ jsx3(ChevronLeft, { className: "size-4" })
        }
      ),
      operators.map((item) => /* @__PURE__ */ jsx3(
        "button",
        {
          type: "button",
          onClick: () => setDraft({
            ...draft,
            operator: item.value
          }),
          className: cn(
            "px-3 py-1.5 text-sm font-medium rounded-xl cursor-pointer transition-colors",
            operator === item.value ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
          ),
          children: item.label
        },
        item.value
      ))
    ] }),
    /* @__PURE__ */ jsx3("div", { className: "p-3", children: isRange ? /* @__PURE__ */ jsx3(
      Calendar,
      {
        mode: "range",
        numberOfMonths: 2,
        locale: pt,
        captionLayout: "dropdown",
        startMonth: CALENDAR_START,
        endMonth: CALENDAR_END,
        defaultMonth: toDate(draft.start),
        selected: {
          from: toDate(draft.start),
          to: toDate(draft.end)
        },
        onSelect: (range) => setDraft({
          ...draft,
          start: toIso(range?.from),
          end: toIso(range?.to)
        })
      }
    ) : /* @__PURE__ */ jsx3(
      Calendar,
      {
        mode: "single",
        locale: pt,
        captionLayout: "dropdown",
        startMonth: CALENDAR_START,
        endMonth: CALENDAR_END,
        defaultMonth: toDate(draft.start),
        selected: toDate(draft.start),
        onSelect: (date) => setDraft({ ...draft, start: toIso(date) })
      }
    ) }),
    /* @__PURE__ */ jsx3("div", { className: "px-3 py-2 flex justify-end border-t", children: /* @__PURE__ */ jsx3(Button, { disabled: !canApply, onClick: () => commit(draft), children: labels.apply }) })
  ] });
}

// src/blocks/date-filter/relative-panel.tsx
import { ArrowLeftToLine, CalendarDays, ChevronLeft as ChevronLeft2, X } from "lucide-react";

// src/blocks/date-filter/range.ts
import {
  endOfDay,
  endOfMonth,
  endOfQuarter,
  endOfWeek,
  endOfYear,
  format as format2,
  isSameYear,
  startOfDay,
  startOfMonth,
  startOfQuarter,
  startOfWeek,
  startOfYear,
  subDays,
  subMonths,
  subQuarters,
  subWeeks,
  subYears
} from "date-fns";
import { pt as pt2 } from "date-fns/locale";
var WEEK_OPTIONS = { weekStartsOn: 1 };
var subtract = {
  day: subDays,
  week: subWeeks,
  month: subMonths,
  quarter: subQuarters,
  year: subYears
};
var startOf = {
  day: startOfDay,
  week: (date) => startOfWeek(date, WEEK_OPTIONS),
  month: startOfMonth,
  quarter: startOfQuarter,
  year: startOfYear
};
var endOf = {
  day: endOfDay,
  week: (date) => endOfWeek(date, WEEK_OPTIONS),
  month: endOfMonth,
  quarter: endOfQuarter,
  year: endOfYear
};
function resolveRelativeRange(unit, amount, includeCurrent, now = /* @__PURE__ */ new Date(), offsetAmount = 0, offsetUnit) {
  if (amount < 1 || offsetAmount < 0) {
    return null;
  }
  let anchor = includeCurrent ? now : subtract[unit](now, 1);
  if (offsetAmount > 0) {
    anchor = subtract[offsetUnit ?? unit](anchor, offsetAmount);
  }
  return {
    start: startOf[unit](subtract[unit](anchor, amount - 1)),
    end: endOf[unit](anchor)
  };
}
function formatRangePreview(range) {
  const sameYear = isSameYear(range.start, range.end);
  const startPattern = sameYear ? "d MMM" : "d MMM yyyy";
  return `${format2(range.start, startPattern, { locale: pt2 })} - ${format2(range.end, "d MMM yyyy", { locale: pt2 })}`;
}

// src/blocks/date-filter/relative-panel.tsx
import { jsx as jsx4, jsxs as jsxs4 } from "react/jsx-runtime";
function DateFilterRelativePanel() {
  const { draft, units, labels, setDraft, backToRoot, commit } = useDateFilter();
  const hasOffset = (draft.offset_amount ?? 0) > 0;
  return /* @__PURE__ */ jsxs4("div", { className: "w-96", children: [
    /* @__PURE__ */ jsxs4("div", { className: "gap-2 px-2 py-2 flex items-center border-b", children: [
      /* @__PURE__ */ jsx4(
        Button,
        {
          variant: "ghost",
          size: "icon",
          onClick: backToRoot,
          "aria-label": labels.back,
          children: /* @__PURE__ */ jsx4(ChevronLeft2, { className: "size-4" })
        }
      ),
      /* @__PURE__ */ jsx4("span", { className: "text-sm font-medium", children: labels.relativeTitle })
    ] }),
    /* @__PURE__ */ jsxs4("div", { className: "gap-3 p-3 flex flex-col", children: [
      /* @__PURE__ */ jsxs4("div", { className: "gap-2 flex items-center", children: [
        /* @__PURE__ */ jsx4("span", { className: "text-sm", children: labels.latest }),
        /* @__PURE__ */ jsx4(
          Input,
          {
            type: "number",
            min: 1,
            max: 120,
            value: draft.amount ?? 1,
            onChange: (event) => setDraft({
              ...draft,
              amount: Number(event.target.value)
            }),
            className: "w-20"
          }
        ),
        /* @__PURE__ */ jsxs4(
          Select,
          {
            value: draft.unit ?? "month",
            onValueChange: (unit) => setDraft({ ...draft, unit }),
            children: [
              /* @__PURE__ */ jsx4(SelectTrigger, { className: "flex-1", children: /* @__PURE__ */ jsx4(SelectValue, {}) }),
              /* @__PURE__ */ jsx4(SelectContent, { children: units.map((unit) => /* @__PURE__ */ jsx4(SelectItem, { value: unit.value, children: unit.label }, unit.value)) })
            ]
          }
        ),
        !hasOffset && /* @__PURE__ */ jsx4(
          Button,
          {
            variant: "ghost",
            size: "icon",
            "aria-label": labels.startingAgo,
            title: labels.startingAgo,
            onClick: () => setDraft({
              ...draft,
              offset_amount: 1,
              offset_unit: draft.unit ?? "month"
            }),
            children: /* @__PURE__ */ jsx4(ArrowLeftToLine, { className: "size-4" })
          }
        )
      ] }),
      hasOffset && /* @__PURE__ */ jsxs4("div", { className: "gap-2 flex items-center", children: [
        /* @__PURE__ */ jsx4("span", { className: "text-sm", children: labels.startingAgo }),
        /* @__PURE__ */ jsx4(
          Input,
          {
            type: "number",
            min: 1,
            max: 120,
            value: draft.offset_amount ?? 1,
            onChange: (event) => setDraft({
              ...draft,
              offset_amount: Number(event.target.value)
            }),
            className: "w-20"
          }
        ),
        /* @__PURE__ */ jsxs4(
          Select,
          {
            value: draft.offset_unit ?? draft.unit ?? "month",
            onValueChange: (unit) => setDraft({
              ...draft,
              offset_unit: unit
            }),
            children: [
              /* @__PURE__ */ jsx4(SelectTrigger, { className: "flex-1", children: /* @__PURE__ */ jsx4(SelectValue, {}) }),
              /* @__PURE__ */ jsx4(SelectContent, { children: units.map((unit) => /* @__PURE__ */ jsx4(
                SelectItem,
                {
                  value: unit.value,
                  children: unit.label
                },
                unit.value
              )) })
            ]
          }
        ),
        /* @__PURE__ */ jsx4(
          Button,
          {
            variant: "ghost",
            size: "icon",
            "aria-label": labels.removeOffset,
            onClick: () => setDraft({
              ...draft,
              offset_amount: void 0,
              offset_unit: void 0
            }),
            children: /* @__PURE__ */ jsx4(X, { className: "size-4" })
          }
        )
      ] }),
      /* @__PURE__ */ jsxs4("label", { className: "text-sm flex items-center justify-between", children: [
        labels.includeCurrent,
        /* @__PURE__ */ jsx4(
          Switch,
          {
            checked: draft.include_current ?? false,
            onCheckedChange: (checked) => setDraft({ ...draft, include_current: checked })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs4("div", { className: "gap-3 px-3 py-2 flex items-center justify-between border-t", children: [
      /* @__PURE__ */ jsx4(RangePreview, { draft }),
      /* @__PURE__ */ jsx4(
        Button,
        {
          disabled: !draft.unit || !draft.amount || draft.amount < 1,
          onClick: () => commit(draft),
          children: labels.apply
        }
      )
    ] })
  ] });
}
function RangePreview({ draft }) {
  const range = resolveRelativeRange(
    draft.unit ?? "month",
    draft.amount ?? 0,
    draft.include_current ?? false,
    /* @__PURE__ */ new Date(),
    draft.offset_amount ?? 0,
    draft.offset_unit
  );
  if (!range) {
    return /* @__PURE__ */ jsx4("span", {});
  }
  return /* @__PURE__ */ jsxs4("span", { className: "gap-2 text-sm flex items-center text-muted-foreground", children: [
    /* @__PURE__ */ jsx4(CalendarDays, { className: "size-4" }),
    formatRangePreview(range)
  ] });
}

// src/blocks/date-filter/summarise.ts
import { format as format3 } from "date-fns";
import { pt as pt3 } from "date-fns/locale";
var readable = (value) => value ? format3(/* @__PURE__ */ new Date(`${value}T00:00:00`), "d 'de' MMMM 'de' yyyy", {
  locale: pt3
}) : "";
function summariseDateFilter(value, presets, operators, units, labels) {
  if (value.mode === "preset") {
    return presets.find((preset) => preset.value === value.preset)?.label ?? labels.fallback;
  }
  if (value.mode === "fixed") {
    const operator = operators.find((item) => item.value === value.operator)?.label ?? "";
    return value.operator === "between" ? `${readable(value.start)} - ${readable(value.end)}` : `${operator} ${readable(value.start)}`;
  }
  if (value.mode === "relative") {
    const unitLabel = (unit) => units.find((item) => item.value === unit)?.label ?? "";
    const base = `${labels.latest} ${value.amount ?? 1} ${unitLabel(value.unit)}`;
    return (value.offset_amount ?? 0) > 0 ? `${base}, ${labels.ago} ${value.offset_amount} ${unitLabel(value.offset_unit ?? value.unit)}` : base;
  }
  return labels.all;
}

// src/blocks/date-filter/types.ts
var DEFAULT_PRESETS = [
  { value: "today", label: "Today" },
  { value: "yesterday", label: "Yesterday" },
  { value: "previous_week", label: "Previous week" },
  { value: "previous_7_days", label: "Last 7 days" },
  { value: "previous_30_days", label: "Last 30 days" },
  { value: "previous_month", label: "Previous month" },
  { value: "previous_3_months", label: "Last 3 months" },
  { value: "previous_12_months", label: "Last 12 months" }
];
var DEFAULT_OPERATORS = [
  { value: "between", label: "Between" },
  { value: "before", label: "Before" },
  { value: "on", label: "On" },
  { value: "after", label: "After" }
];
var DEFAULT_UNITS = [
  { value: "day", label: "days" },
  { value: "week", label: "weeks" },
  { value: "month", label: "months" },
  { value: "quarter", label: "quarters" },
  { value: "year", label: "years" }
];
var DEFAULT_LABELS = {
  all: "All time",
  fixed: "Fixed range...",
  relative: "Relative range...",
  relativeTitle: "Relative range",
  apply: "Apply filter",
  back: "Back",
  latest: "Last",
  ago: "offset",
  includeCurrent: "Include current period",
  startingAgo: "Starting",
  removeOffset: "Remove offset",
  fallback: "Date"
};

// src/blocks/date-filter/date-filter.tsx
import { Fragment, jsx as jsx5, jsxs as jsxs5 } from "react/jsx-runtime";
function DateFilter({
  value,
  onChange,
  presets,
  operators,
  units,
  labels,
  children
}) {
  const locale = useUiLocale();
  const resolvedLabels = useUiLabels("dateFilter", DEFAULT_LABELS, labels);
  const [open, setOpen] = useState3(false);
  const [panel, setPanel] = useState3("root");
  const [draft, setDraft] = useState3(value);
  const context = {
    value,
    draft,
    labels: resolvedLabels,
    presets: presets ?? locale.dateFilterPresets ?? DEFAULT_PRESETS,
    operators: operators ?? locale.dateFilterOperators ?? DEFAULT_OPERATORS,
    units: units ?? locale.dateFilterUnits ?? DEFAULT_UNITS,
    panel,
    setDraft,
    openPanel: (next, seed) => {
      setDraft(seed);
      setPanel(next);
    },
    backToRoot: () => setPanel("root"),
    commit: (next) => {
      onChange(next);
      setOpen(false);
      setPanel("root");
    }
  };
  return /* @__PURE__ */ jsx5(DateFilterProvider, { value: context, children: /* @__PURE__ */ jsx5(
    Popover,
    {
      open,
      onOpenChange: (next) => {
        setOpen(next);
        if (!next) {
          setPanel("root");
        }
      },
      children: children ?? /* @__PURE__ */ jsxs5(Fragment, { children: [
        /* @__PURE__ */ jsx5(DateFilterTrigger, {}),
        /* @__PURE__ */ jsxs5(DateFilterContent, { children: [
          /* @__PURE__ */ jsx5(DateFilterAll, {}),
          /* @__PURE__ */ jsx5(DateFilterSeparator, {}),
          /* @__PURE__ */ jsx5(DateFilterPresets, {}),
          /* @__PURE__ */ jsx5(DateFilterSeparator, {}),
          /* @__PURE__ */ jsx5(DateFilterFixed, {}),
          /* @__PURE__ */ jsx5(DateFilterRelative, {})
        ] })
      ] })
    }
  ) });
}
function DateFilterTrigger({
  className,
  children
}) {
  const { value, presets, operators, units, labels } = useDateFilter();
  return /* @__PURE__ */ jsx5(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxs5(
    Button,
    {
      variant: "outline",
      className: cn("gap-2 justify-start", className),
      children: [
        /* @__PURE__ */ jsx5(CalendarDays2, { className: "size-4" }),
        children ?? summariseDateFilter(
          value,
          presets,
          operators,
          units,
          labels
        )
      ]
    }
  ) });
}
function DateFilterContent({
  children,
  className
}) {
  const { panel } = useDateFilter();
  return /* @__PURE__ */ jsxs5(PopoverContent, { align: "start", className: cn("p-0 w-auto", className), children: [
    panel === "root" && /* @__PURE__ */ jsx5("div", { className: "w-64 py-2 flex flex-col", children }),
    panel === "fixed" && /* @__PURE__ */ jsx5(DateFilterFixedPanel, {}),
    panel === "relative" && /* @__PURE__ */ jsx5(DateFilterRelativePanel, {})
  ] });
}
function DateFilterItem({
  active,
  onSelect,
  children
}) {
  return /* @__PURE__ */ jsx5(
    "button",
    {
      type: "button",
      onClick: onSelect,
      "data-slot": "date-filter-item",
      className: cn(
        `mx-1 px-2 py-2 ${compactRadius} text-sm font-medium cursor-pointer text-left transition-colors`,
        active ? "bg-accent text-accent-foreground" : "text-foreground hover:bg-accent/50"
      ),
      children
    }
  );
}
function DateFilterSeparator() {
  return /* @__PURE__ */ jsx5("div", { "data-slot": "date-filter-separator", className: "mx-1 my-2 border-t" });
}
function DateFilterAll({ children }) {
  const { value, labels, commit } = useDateFilter();
  return /* @__PURE__ */ jsx5(
    DateFilterItem,
    {
      active: value.mode === "all",
      onSelect: () => commit({ mode: "all" }),
      children: children ?? labels.all
    }
  );
}
function DateFilterPresets({ only }) {
  const { value, presets, commit } = useDateFilter();
  const visible = only ? presets.filter((preset) => only.includes(preset.value)) : presets;
  return /* @__PURE__ */ jsx5(Fragment, { children: visible.map((preset) => /* @__PURE__ */ jsx5(
    DateFilterItem,
    {
      active: value.mode === "preset" && value.preset === preset.value,
      onSelect: () => commit({ mode: "preset", preset: preset.value }),
      children: preset.label
    },
    preset.value
  )) });
}
function DateFilterFixed({ children }) {
  const { value, labels, openPanel } = useDateFilter();
  return /* @__PURE__ */ jsx5(
    DateFilterItem,
    {
      active: value.mode === "fixed",
      onSelect: () => openPanel("fixed", {
        mode: "fixed",
        operator: value.operator ?? "between",
        start: value.start,
        end: value.end
      }),
      children: children ?? labels.fixed
    }
  );
}
function DateFilterRelative({ children }) {
  const { value, labels, openPanel } = useDateFilter();
  return /* @__PURE__ */ jsx5(
    DateFilterItem,
    {
      active: value.mode === "relative",
      onSelect: () => openPanel("relative", {
        mode: "relative",
        unit: value.unit ?? "month",
        amount: value.amount ?? 3,
        include_current: value.include_current ?? false
      }),
      children: children ?? labels.relative
    }
  );
}

// src/blocks/date-filter/decode.ts
var RANGE_SEPARATOR = "~";
var RELATIVE_PREFIX = "previous";
var ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
var UNITS = ["day", "week", "month", "quarter", "year"];
var ALL = { mode: "all" };
function decodeDateFilter(encoded) {
  if (!encoded) {
    return ALL;
  }
  if (encoded.startsWith(`${RELATIVE_PREFIX}:`)) {
    return decodeRelative(encoded);
  }
  if (encoded.includes(RANGE_SEPARATOR)) {
    return decodeFixedRange(encoded);
  }
  if (ISO_DATE.test(encoded)) {
    return isDate(encoded) ? { mode: "fixed", operator: "on", start: encoded } : ALL;
  }
  return { mode: "preset", preset: encoded };
}
function decodeFixedRange(encoded) {
  const parts = encoded.split(RANGE_SEPARATOR);
  if (parts.length !== 2) {
    return ALL;
  }
  const [start, end] = parts;
  if (start && end) {
    return isDate(start) && isDate(end) ? { mode: "fixed", operator: "between", start, end } : ALL;
  }
  if (start) {
    return isDate(start) ? { mode: "fixed", operator: "after", start } : ALL;
  }
  if (end) {
    return isDate(end) ? { mode: "fixed", operator: "before", start: end } : ALL;
  }
  return ALL;
}
function decodeRelative(encoded) {
  const [, rawAmount, rawUnit, ...rest] = encoded.split(":");
  const amount = Number(rawAmount);
  const unit = toUnit(rawUnit);
  if (!unit || !Number.isInteger(amount) || amount < 1) {
    return ALL;
  }
  const value = { mode: "relative", amount, unit };
  const tail = [...rest];
  if (tail[0] === "current") {
    value.include_current = true;
    tail.shift();
  }
  if (tail.length === 0) {
    return value;
  }
  if (tail.length !== 3 || tail[0] !== "offset") {
    return ALL;
  }
  const offsetAmount = Number(tail[1]);
  const offsetUnit = toUnit(tail[2]);
  if (!offsetUnit || !Number.isInteger(offsetAmount) || offsetAmount < 1) {
    return ALL;
  }
  value.offset_amount = offsetAmount;
  value.offset_unit = offsetUnit;
  return value;
}
function toUnit(value) {
  return UNITS.find((unit) => unit === value) ?? null;
}
function isDate(value) {
  if (!ISO_DATE.test(value)) {
    return false;
  }
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day;
}

// src/blocks/date-filter/encode.ts
var RANGE_SEPARATOR2 = "~";
var RELATIVE_PREFIX2 = "previous";
function encodeDateFilter(filter) {
  if (filter.mode === "preset") {
    return filter.preset ?? null;
  }
  if (filter.mode === "fixed") {
    return encodeFixed(filter);
  }
  if (filter.mode === "relative") {
    return encodeRelative(filter);
  }
  return null;
}
function encodeFixed(filter) {
  if (!filter.start) {
    return null;
  }
  if (filter.operator === "before") {
    return `${RANGE_SEPARATOR2}${filter.start}`;
  }
  if (filter.operator === "after") {
    return `${filter.start}${RANGE_SEPARATOR2}`;
  }
  if (filter.operator === "on") {
    return filter.start;
  }
  return filter.end ? `${filter.start}${RANGE_SEPARATOR2}${filter.end}` : null;
}
function encodeRelative(filter) {
  if (!filter.unit || !filter.amount || filter.amount < 1) {
    return null;
  }
  let value = `${RELATIVE_PREFIX2}:${filter.amount}:${filter.unit}`;
  if (filter.include_current) {
    value += ":current";
  }
  if (filter.offset_amount && filter.offset_amount > 0) {
    value += `:offset:${filter.offset_amount}:${filter.offset_unit ?? filter.unit}`;
  }
  return value;
}

// src/blocks/form-overlay.tsx
import { jsx as jsx6, jsxs as jsxs6 } from "react/jsx-runtime";
var formOverlayDefaultLabels = {
  cancelLabel: "Cancel",
  saveLabel: "Save",
  savingLabel: "Saving..."
};
function FormOverlayActions({
  labels = formOverlayDefaultLabels,
  processing = false,
  intent = "default",
  submit = false,
  className,
  onCancel,
  onSave,
  slotName = "form-overlay-actions"
}) {
  return /* @__PURE__ */ jsxs6(
    "div",
    {
      className: cn("gap-2 flex items-center justify-end", className),
      "data-slot": slotName,
      children: [
        /* @__PURE__ */ jsx6(
          Button,
          {
            type: "button",
            variant: "ghost",
            disabled: processing,
            onClick: onCancel,
            children: labels.cancelLabel
          }
        ),
        /* @__PURE__ */ jsx6(
          Button,
          {
            type: submit ? "submit" : "button",
            "aria-label": processing ? labels.savingLabel : void 0,
            variant: intent,
            loading: processing,
            loadingLabel: labels.savingLabel,
            onClick: onSave,
            children: processing ? labels.savingLabel : labels.saveLabel
          }
        )
      ]
    }
  );
}

// src/blocks/detail-edit-sheet.tsx
import { jsx as jsx7, jsxs as jsxs7 } from "react/jsx-runtime";
function DetailEditSheet({
  open,
  onOpenChange,
  title,
  description,
  processing = false,
  intent,
  labels,
  className,
  children,
  onSave,
  onCancel,
  slotName = "detail-edit-sheet"
}) {
  const handleSubmit = (event) => {
    event.preventDefault();
    if (processing) {
      return;
    }
    onSave();
  };
  const handleCancel = () => {
    if (processing) {
      return;
    }
    onCancel?.();
    onOpenChange(false);
  };
  return /* @__PURE__ */ jsx7(
    FloatingSheet,
    {
      open,
      onOpenChange,
      title,
      description,
      persistent: true,
      className,
      children: /* @__PURE__ */ jsxs7(
        "form",
        {
          onSubmit: handleSubmit,
          className: "min-h-0 flex flex-1 flex-col",
          "data-slot": slotName,
          children: [
            /* @__PURE__ */ jsx7(FloatingSheetBody, { children }),
            /* @__PURE__ */ jsx7(Separator, {}),
            /* @__PURE__ */ jsx7(FloatingSheetFooter, { children: /* @__PURE__ */ jsx7(
              FormOverlayActions,
              {
                submit: true,
                labels,
                processing,
                intent,
                onCancel: handleCancel
              }
            ) })
          ]
        }
      )
    }
  );
}

// src/blocks/form-dialog.tsx
import { jsx as jsx8, jsxs as jsxs8 } from "react/jsx-runtime";
function FormDialog({
  open,
  onOpenChange,
  title,
  description,
  processing = false,
  intent,
  labels,
  className,
  children,
  onSave,
  onCancel,
  slotName = "form-dialog"
}) {
  const handleSubmit = (event) => {
    event.preventDefault();
    if (processing) {
      return;
    }
    onSave();
  };
  const handleCancel = () => {
    if (processing) {
      return;
    }
    onCancel?.();
    onOpenChange(false);
  };
  const blockWhileProcessing = (event) => {
    if (processing) {
      event.preventDefault();
    }
  };
  return /* @__PURE__ */ jsx8(
    Dialog,
    {
      open,
      onOpenChange: (next) => {
        if (processing && !next) {
          return;
        }
        onOpenChange(next);
      },
      children: /* @__PURE__ */ jsx8(
        DialogContent,
        {
          ...description ? {} : { "aria-describedby": void 0 },
          className: cn("gap-0 p-0", className),
          onEscapeKeyDown: blockWhileProcessing,
          onInteractOutside: blockWhileProcessing,
          slotName,
          children: /* @__PURE__ */ jsxs8(
            "form",
            {
              "data-slot": "form-dialog-form",
              onSubmit: handleSubmit,
              className: "grid max-h-[calc(100dvh-8rem)] grid-rows-[auto_minmax(0,1fr)_auto]",
              children: [
                /* @__PURE__ */ jsxs8(DialogHeader, { className: "text-left", children: [
                  /* @__PURE__ */ jsx8(DialogTitle, { children: title }),
                  description ? /* @__PURE__ */ jsx8(DialogDescription, { children: description }) : null
                ] }),
                /* @__PURE__ */ jsx8(
                  "div",
                  {
                    "data-slot": "form-dialog-body",
                    className: "gap-4 px-6 pb-6 md:px-8 flex flex-col overflow-y-auto",
                    children
                  }
                ),
                /* @__PURE__ */ jsx8(DialogFooter, { children: /* @__PURE__ */ jsx8(
                  FormOverlayActions,
                  {
                    submit: true,
                    labels,
                    processing,
                    intent,
                    onCancel: handleCancel,
                    className: "w-full"
                  }
                ) })
              ]
            }
          )
        }
      )
    }
  );
}

// src/blocks/info-field.tsx
import { jsx as jsx9, jsxs as jsxs9 } from "react/jsx-runtime";
function copyableText(value, copyValue) {
  if (copyValue !== void 0) {
    return copyValue.trim();
  }
  if (typeof value === "string" || typeof value === "number") {
    return String(value).trim();
  }
  return "";
}
function InfoField({
  icon: Icon,
  label,
  value,
  copyable = false,
  copyValue,
  copyLabel,
  copiedLabel,
  iconClassName,
  className,
  slotName = "info-field"
}) {
  const text = copyableText(value, copyValue);
  return /* @__PURE__ */ jsxs9(
    "div",
    {
      className: cn("gap-3 flex items-center", className),
      "data-slot": slotName,
      children: [
        /* @__PURE__ */ jsx9("div", { className: cn("p-2 rounded-xl bg-muted", iconClassName), children: /* @__PURE__ */ jsx9(Icon, { className: "size-5 text-muted-foreground" }) }),
        /* @__PURE__ */ jsxs9("div", { children: [
          /* @__PURE__ */ jsx9(
            "p",
            {
              "data-slot": "info-field-label",
              className: "text-xs font-medium tracking-wider text-muted-foreground uppercase",
              children: label
            }
          ),
          /* @__PURE__ */ jsxs9(
            "p",
            {
              "data-slot": "info-field-value",
              className: "gap-1 font-semibold flex items-center",
              children: [
                value,
                copyable && text !== "" && /* @__PURE__ */ jsx9(
                  CopyButton,
                  {
                    value: text,
                    copyLabel,
                    copiedLabel
                  }
                )
              ]
            }
          )
        ] })
      ]
    }
  );
}
function InfoFieldGroup({ children, className }) {
  return /* @__PURE__ */ jsx9("div", { className: cn("space-y-4", className), children });
}

// src/blocks/localized-fields.tsx
import { jsx as jsx10, jsxs as jsxs10 } from "react/jsx-runtime";
function LocalizedFields({
  locales,
  localeLabels,
  fields,
  values,
  onChange,
  errors,
  defaultLocale,
  className
}) {
  return /* @__PURE__ */ jsxs10(
    Tabs,
    {
      defaultValue: defaultLocale ?? locales[0],
      className: cn("w-full", className),
      children: [
        /* @__PURE__ */ jsx10(TabsList, { className: "mb-4 rounded-2xl p-1.5 flex h-auto w-full justify-start overflow-x-auto bg-muted", children: locales.map((locale) => /* @__PURE__ */ jsx10(
          TabsTrigger,
          {
            value: locale,
            className: "px-4 font-medium h-8 rounded-xl",
            children: localeLabels?.[locale] ?? locale.toUpperCase()
          },
          locale
        )) }),
        locales.map((locale) => /* @__PURE__ */ jsx10(TabsContent, { value: locale, className: "mt-0", children: /* @__PURE__ */ jsx10("div", { className: "gap-4 lg:grid-cols-2 grid", children: fields.map((field) => {
          const fieldId = `${field.name}-${locale}`;
          const error = errors?.[`${field.name}.${locale}`];
          const value = values[field.name]?.[locale] ?? "";
          return /* @__PURE__ */ jsxs10("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx10(Label, { htmlFor: fieldId, children: field.label }),
            field.type === "textarea" ? /* @__PURE__ */ jsx10(
              Textarea,
              {
                id: fieldId,
                rows: field.rows ?? 4,
                value,
                onChange: (event) => onChange(
                  field.name,
                  locale,
                  event.target.value
                )
              }
            ) : /* @__PURE__ */ jsx10(
              Input,
              {
                id: fieldId,
                value,
                onChange: (event) => onChange(
                  field.name,
                  locale,
                  event.target.value
                )
              }
            ),
            error && /* @__PURE__ */ jsx10("p", { className: "text-xs font-medium text-destructive", children: error })
          ] }, field.name);
        }) }) }, locale))
      ]
    }
  );
}

// src/blocks/section-header.tsx
import { jsx as jsx11, jsxs as jsxs11 } from "react/jsx-runtime";
function SectionHeader({
  icon,
  title,
  description,
  control,
  className
}) {
  return /* @__PURE__ */ jsxs11(
    "div",
    {
      className: cn(
        "gap-4 sm:flex-row sm:items-center sm:justify-between flex flex-col",
        className
      ),
      children: [
        /* @__PURE__ */ jsxs11("div", { className: "gap-3 flex items-center", children: [
          icon,
          /* @__PURE__ */ jsxs11("div", { children: [
            /* @__PURE__ */ jsx11("h2", { className: "text-lg font-bold text-foreground", children: title }),
            description && /* @__PURE__ */ jsx11("p", { className: "text-sm font-medium text-muted-foreground", children: description })
          ] })
        ] }),
        control
      ]
    }
  );
}

// src/blocks/settings-card.tsx
import { jsx as jsx12, jsxs as jsxs12 } from "react/jsx-runtime";
function SettingsCard({
  icon: Icon,
  iconClassName,
  title,
  description,
  control,
  children,
  inset = false,
  className,
  slotName = "settings-card"
}) {
  return /* @__PURE__ */ jsxs12(
    "section",
    {
      "data-inset": inset || void 0,
      className: cn(
        elevatedSurface,
        "space-y-5 p-6 bg-card text-card-foreground",
        inset && recessedSurface,
        className
      ),
      "data-slot": slotName,
      children: [
        /* @__PURE__ */ jsxs12("div", { className: "gap-4 sm:flex-row sm:items-center sm:justify-between flex flex-col", children: [
          /* @__PURE__ */ jsxs12("div", { className: "gap-3 flex items-center", children: [
            /* @__PURE__ */ jsx12(
              "div",
              {
                className: cn(
                  "size-11 rounded-2xl flex items-center justify-center",
                  iconClassName ?? "bg-muted text-muted-foreground"
                ),
                children: /* @__PURE__ */ jsx12(Icon, { className: "size-5" })
              }
            ),
            /* @__PURE__ */ jsxs12("div", { children: [
              /* @__PURE__ */ jsx12("h2", { className: "text-lg font-bold text-foreground", children: title }),
              /* @__PURE__ */ jsx12("p", { className: "text-sm font-medium text-muted-foreground", children: description })
            ] })
          ] }),
          control
        ] }),
        children
      ]
    }
  );
}
function SettingsPanel({
  title,
  description,
  children,
  inset = true,
  className,
  slotName = "settings-panel"
}) {
  return /* @__PURE__ */ jsxs12(
    "div",
    {
      "data-inset": inset || void 0,
      className: cn(
        elevatedSurface,
        "space-y-4 p-5 bg-card text-card-foreground",
        inset && recessedSurface,
        className
      ),
      "data-slot": slotName,
      children: [
        (title || description) && /* @__PURE__ */ jsxs12("div", { children: [
          title && /* @__PURE__ */ jsx12("h3", { className: "text-sm font-semibold text-foreground", children: title }),
          description && /* @__PURE__ */ jsx12("p", { className: "mt-1 text-xs font-medium text-muted-foreground", children: description })
        ] }),
        children
      ]
    }
  );
}
function ToggleRow({
  id,
  label,
  description,
  checked,
  onChange,
  disabled
}) {
  return /* @__PURE__ */ jsxs12("div", { className: "gap-4 py-1 flex items-center justify-between", children: [
    /* @__PURE__ */ jsxs12("div", { className: "space-y-0.5", children: [
      /* @__PURE__ */ jsx12(
        Label,
        {
          htmlFor: id,
          className: "text-sm font-medium text-foreground",
          children: label
        }
      ),
      description && /* @__PURE__ */ jsx12("p", { className: "text-xs font-medium text-muted-foreground", children: description })
    ] }),
    /* @__PURE__ */ jsx12(
      Switch,
      {
        id,
        checked,
        onCheckedChange: onChange,
        disabled
      }
    )
  ] });
}

// src/blocks/settings-fields.tsx
import { useId } from "react";
import { jsx as jsx13, jsxs as jsxs13 } from "react/jsx-runtime";
function SettingsField({
  id,
  label,
  description,
  error,
  required,
  className,
  children,
  slotName = "settings-field"
}) {
  const generated = useId();
  const fieldId = id ?? generated;
  return /* @__PURE__ */ jsxs13(
    "div",
    {
      "data-invalid": error ? true : void 0,
      className: cn("space-y-2 py-1", className),
      "data-slot": slotName,
      children: [
        /* @__PURE__ */ jsxs13(Label, { htmlFor: fieldId, children: [
          label,
          required && /* @__PURE__ */ jsx13(
            "span",
            {
              "data-slot": "settings-field-required",
              "aria-hidden": "true",
              className: "text-destructive",
              children: "*"
            }
          )
        ] }),
        children(fieldId),
        description && /* @__PURE__ */ jsx13(
          "p",
          {
            "data-slot": "settings-field-description",
            className: "text-xs font-medium text-muted-foreground",
            children: description
          }
        ),
        /* @__PURE__ */ jsx13(FieldError, { message: error })
      ]
    }
  );
}
function TextField({
  type = "text",
  value,
  onChange,
  disabled,
  placeholder,
  slotName = "text-field",
  ...field
}) {
  return /* @__PURE__ */ jsx13(SettingsField, { ...field, children: (fieldId) => /* @__PURE__ */ jsx13(
    Input,
    {
      id: fieldId,
      type,
      value,
      disabled,
      placeholder,
      "aria-invalid": field.error ? true : void 0,
      slotName,
      onChange: (event) => onChange(event.target.value)
    }
  ) });
}
function NumberField({
  value,
  onChange,
  disabled,
  placeholder,
  min,
  max,
  step,
  slotName = "number-field",
  ...field
}) {
  return /* @__PURE__ */ jsx13(SettingsField, { ...field, children: (fieldId) => /* @__PURE__ */ jsx13(
    Input,
    {
      id: fieldId,
      type: "number",
      inputMode: "decimal",
      value: value === "" ? "" : String(value),
      min,
      max,
      step,
      disabled,
      placeholder,
      "aria-invalid": field.error ? true : void 0,
      slotName,
      onChange: (event) => onChange(
        event.target.value === "" ? "" : event.target.valueAsNumber
      )
    }
  ) });
}
function DateField({
  value,
  onChange,
  disabled,
  min,
  max,
  slotName = "date-field",
  ...field
}) {
  return /* @__PURE__ */ jsx13(SettingsField, { ...field, children: (fieldId) => /* @__PURE__ */ jsx13(
    Input,
    {
      id: fieldId,
      type: "date",
      value,
      min,
      max,
      disabled,
      "aria-invalid": field.error ? true : void 0,
      slotName,
      onChange: (event) => onChange(event.target.value)
    }
  ) });
}
function SelectField({
  value,
  onChange,
  options,
  disabled,
  placeholder,
  slotName = "select-field",
  ...field
}) {
  return /* @__PURE__ */ jsx13(SettingsField, { ...field, children: (fieldId) => /* @__PURE__ */ jsxs13(
    Select,
    {
      value,
      onValueChange: onChange,
      disabled,
      children: [
        /* @__PURE__ */ jsx13(
          SelectTrigger,
          {
            id: fieldId,
            slotName,
            "aria-invalid": field.error ? true : void 0,
            children: /* @__PURE__ */ jsx13(SelectValue, { placeholder })
          }
        ),
        /* @__PURE__ */ jsx13(SelectContent, { children: options.map((option) => /* @__PURE__ */ jsx13(
          SelectItem,
          {
            value: option.value,
            disabled: option.disabled,
            children: option.label
          },
          option.value
        )) })
      ]
    }
  ) });
}

// src/blocks/settings-page.tsx
import { ArrowLeft, ChevronRight } from "lucide-react";
import { createContext as createContext2, useContext as useContext2 } from "react";
import { jsx as jsx14, jsxs as jsxs14 } from "react/jsx-runtime";
var SettingsLinkContext = createContext2(void 0);
function SettingsPage({
  title,
  description,
  control,
  linkComponent,
  children,
  className,
  slotName = "settings-page"
}) {
  return /* @__PURE__ */ jsx14(SettingsLinkContext.Provider, { value: linkComponent, children: /* @__PURE__ */ jsxs14(
    "div",
    {
      className: cn(
        "gap-8 max-w-4xl mx-auto flex w-full flex-col",
        className
      ),
      "data-slot": slotName,
      children: [
        title && /* @__PURE__ */ jsx14(
          SectionHeader,
          {
            title,
            description,
            control
          }
        ),
        children
      ]
    }
  ) });
}
var settingsLabels = {
  back: "Back"
};
function SettingsSection({
  title,
  description,
  control,
  backHref = "/settings",
  backLabel,
  wide = false,
  linkComponent,
  children,
  className,
  slotName = "settings-section"
}) {
  const labels = useUiLabels("settings", settingsLabels, {
    back: backLabel
  });
  const contextLink = useContext2(SettingsLinkContext);
  const Link = resolveLink(linkComponent ?? contextLink);
  return /* @__PURE__ */ jsxs14(
    "section",
    {
      className: cn(
        "gap-6 mx-auto flex w-full flex-col",
        wide ? "max-w-4xl" : "max-w-2xl",
        className
      ),
      "data-slot": slotName,
      children: [
        backHref && /* @__PURE__ */ jsxs14(
          Link,
          {
            "data-slot": "settings-section-back",
            href: backHref,
            className: "gap-2 text-sm font-medium inline-flex w-fit items-center text-muted-foreground transition-colors hover:text-foreground",
            children: [
              /* @__PURE__ */ jsx14(ArrowLeft, { className: "size-4" }),
              labels.back
            ]
          }
        ),
        title && /* @__PURE__ */ jsx14(
          SectionHeader,
          {
            title,
            description,
            control
          }
        ),
        children
      ]
    }
  );
}
function SettingsGroup({
  label,
  columns = 2,
  children,
  className,
  slotName = "settings-group"
}) {
  return /* @__PURE__ */ jsxs14(
    "div",
    {
      className: cn("gap-3 flex flex-col", className),
      "data-slot": slotName,
      children: [
        label && /* @__PURE__ */ jsx14("p", { className: "font-bold tracking-widest text-[11px] text-muted-foreground uppercase", children: label }),
        /* @__PURE__ */ jsx14(
          "div",
          {
            "data-slot": "settings-group-grid",
            className: cn(
              "gap-4 grid grid-cols-1",
              columns === 2 && "md:grid-cols-2"
            ),
            children
          }
        )
      ]
    }
  );
}
function SettingsEntry({
  icon: Icon,
  iconClassName,
  title,
  description,
  href,
  badge,
  disabled = false,
  linkComponent,
  className,
  slotName = "settings-entry"
}) {
  const contextLink = useContext2(SettingsLinkContext);
  const Link = resolveLink(linkComponent ?? contextLink);
  const card = /* @__PURE__ */ jsxs14(
    Card,
    {
      interactive: !disabled,
      padding: "none",
      "data-disabled": disabled || void 0,
      className: cn(
        "gap-4 p-5 flex h-full flex-row items-center",
        disabled && "opacity-60",
        className
      ),
      children: [
        /* @__PURE__ */ jsx14(
          "span",
          {
            className: cn(
              "size-11 flex shrink-0 items-center justify-center rounded-full",
              iconClassName ?? "bg-primary/10 text-primary"
            ),
            children: /* @__PURE__ */ jsx14(Icon, { className: "size-5" })
          }
        ),
        /* @__PURE__ */ jsxs14("span", { className: "min-w-0 flex flex-1 flex-col", children: [
          /* @__PURE__ */ jsxs14("span", { className: "gap-2 flex items-center", children: [
            /* @__PURE__ */ jsx14("span", { className: "font-bold text-foreground", children: title }),
            badge
          ] }),
          description && /* @__PURE__ */ jsx14("span", { className: "text-sm font-medium text-muted-foreground", children: description })
        ] }),
        /* @__PURE__ */ jsx14(ChevronRight, { className: "size-4 shrink-0 text-muted-foreground" })
      ]
    }
  );
  if (disabled) {
    return /* @__PURE__ */ jsx14("div", { "data-disabled": "true", "aria-disabled": "true", "data-slot": slotName, children: card });
  }
  return /* @__PURE__ */ jsx14(
    Link,
    {
      href,
      className: cn(compactRadius, focusRing),
      "data-slot": slotName,
      children: card
    }
  );
}

// src/blocks/stat-card.tsx
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight
} from "lucide-react";
import { jsx as jsx15, jsxs as jsxs15 } from "react/jsx-runtime";
function resolveTrend(trend) {
  if (trend === null || trend === void 0 || Number.isNaN(trend)) {
    return null;
  }
  const normalized = Math.abs(trend) < 0.05 ? 0 : trend;
  if (normalized === 0) {
    return { label: "0%", tone: "neutral", icon: ArrowRight };
  }
  if (normalized > 0) {
    return {
      label: `+${normalized.toFixed(1)}%`,
      tone: "positive",
      icon: ArrowUpRight
    };
  }
  return {
    label: `${normalized.toFixed(1)}%`,
    tone: "negative",
    icon: ArrowDownRight
  };
}
var trendToneClass = {
  positive: "text-success",
  negative: "text-destructive",
  neutral: "text-muted-foreground"
};
function StatCard({
  title,
  value,
  icon: Icon,
  iconClassName = "bg-muted text-muted-foreground",
  trend,
  comparisonLabel,
  inset = false,
  className,
  slotName = "stat-card"
}) {
  const resolvedTrend = resolveTrend(trend);
  return /* @__PURE__ */ jsxs15(
    "div",
    {
      "data-inset": inset || void 0,
      className: cn(
        elevatedSurface,
        "p-6 min-w-0 flex h-full flex-col justify-between bg-card text-card-foreground",
        inset && recessedSurface,
        className
      ),
      "data-slot": slotName,
      children: [
        /* @__PURE__ */ jsxs15("div", { className: "mb-4 gap-4 flex items-start justify-between", children: [
          /* @__PURE__ */ jsx15("div", { className: cn("rounded-2xl p-3 shrink-0", iconClassName), children: /* @__PURE__ */ jsx15(Icon, { className: "size-6" }) }),
          resolvedTrend && /* @__PURE__ */ jsxs15("div", { className: "min-w-0 text-right", children: [
            /* @__PURE__ */ jsxs15(
              "span",
              {
                className: cn(
                  "text-sm font-semibold inline-flex items-center",
                  trendToneClass[resolvedTrend.tone]
                ),
                children: [
                  resolvedTrend.label,
                  /* @__PURE__ */ jsx15(resolvedTrend.icon, { className: "ml-1 size-4" })
                ]
              }
            ),
            comparisonLabel && /* @__PURE__ */ jsx15("p", { className: "mt-1 font-medium tracking-wider text-[10px] whitespace-nowrap text-muted-foreground uppercase", children: comparisonLabel })
          ] })
        ] }),
        /* @__PURE__ */ jsxs15("div", { children: [
          /* @__PURE__ */ jsx15("p", { className: "mb-1 text-xs font-medium tracking-wider break-words text-muted-foreground uppercase", children: title }),
          /* @__PURE__ */ jsx15("p", { className: "text-3xl font-bold truncate text-foreground tabular-nums", children: value })
        ] })
      ]
    }
  );
}
function StatsGrid({ children, className }) {
  return /* @__PURE__ */ jsx15(
    "div",
    {
      className: cn(
        "gap-6 [&>*]:min-w-0 grid [grid-template-columns:repeat(auto-fit,minmax(18rem,1fr))]",
        className
      ),
      children
    }
  );
}

// src/blocks/two-factor/types.ts
var twoFactorLabels = {
  setupTitle: "Two-factor authentication",
  setupDescription: "Add a second step to your sign in with an authenticator app.",
  pendingLabel: "Preparing your setup key",
  scanTitle: "Scan the code",
  scanDescription: "Open your authenticator app and scan the code below to add this account.",
  qrFallbackLabel: "The QR code is not available yet.",
  manualKeyLabel: "Setup key",
  manualKeyDescription: "Enter this key by hand if your app cannot scan the code.",
  manualKeyRevealLabel: "Show setup key",
  manualKeyHideLabel: "Hide setup key",
  continueLabel: "Continue",
  confirmTitle: "Confirm the code",
  confirmDescription: "Enter the six digit code your authenticator app is showing.",
  codeLabel: "Authentication code",
  recoveryCodeLabel: "Recovery code",
  recoveryCodePlaceholder: "Enter a recovery code",
  useRecoveryCodeLabel: "Use a recovery code",
  useCodeLabel: "Use an authentication code",
  verifyLabel: "Verify",
  verifyingLabel: "Verifying",
  errorFallbackLabel: "That did not work. Try again.",
  cancelLabel: "Cancel",
  challengeTitle: "Two-factor confirmation",
  challengeDescription: "Confirm access to your account with the code from your authenticator app.",
  recoveryTitle: "Recovery codes",
  recoveryDescription: "Store these codes somewhere safe. Each one signs you in once if you lose your device.",
  recoveryWarning: "They are shown once and cannot be read again afterwards.",
  revealLabel: "Show codes",
  hideLabel: "Hide codes",
  copyLabel: "Copy",
  copiedLabel: "Copied",
  copyFailedLabel: "Copying is unavailable here. Select the codes manually.",
  regenerateLabel: "Regenerate codes",
  doneLabel: "Done",
  disableLabel: "Disable two-factor authentication",
  disableTitle: "Disable two-factor authentication",
  disableDescription: "Your account will be protected by your password alone. Recovery codes stop working.",
  disableConfirmLabel: "Disable",
  disableCancelLabel: "Keep it on"
};
function resolveLabels(labels) {
  return labels ? { ...twoFactorLabels, ...labels } : twoFactorLabels;
}
function messageList(errors) {
  if (!errors) {
    return [];
  }
  return (Array.isArray(errors) ? errors : [errors]).filter(
    (message) => message.length > 0
  );
}

// src/blocks/two-factor/verify-form.tsx
import { AlertCircle } from "lucide-react";
import { useId as useId2, useState as useState4 } from "react";
import { jsx as jsx16, jsxs as jsxs16 } from "react/jsx-runtime";
function errorMessage(reason, fallback) {
  return reason instanceof Error && reason.message ? reason.message : fallback;
}
function TwoFactorVerifyForm({
  onSubmit,
  errors,
  allowRecoveryCode = false,
  length = 6,
  autoFocus = false,
  submitLabel,
  footer,
  labels,
  className,
  slotName = "two-factor-verify-form"
}) {
  const text = resolveLabels(labels);
  const fieldId = useId2();
  const [mode, setMode] = useState4("code");
  const [value, setValue] = useState4("");
  const [pending, setPending] = useState4(false);
  const [failure, setFailure] = useState4(null);
  const messages = [...messageList(errors), ...messageList(failure)];
  const complete = mode === "code" ? value.length === length : value.length > 0;
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (pending || !complete) {
      return;
    }
    setFailure(null);
    setPending(true);
    try {
      await onSubmit(value, mode);
    } catch (reason) {
      setFailure(errorMessage(reason, text.errorFallbackLabel));
    } finally {
      setPending(false);
    }
  };
  const switchMode = () => {
    setMode(mode === "code" ? "recovery" : "code");
    setValue("");
    setFailure(null);
  };
  return /* @__PURE__ */ jsxs16(
    "form",
    {
      "data-mode": mode,
      "data-pending": pending || void 0,
      onSubmit: handleSubmit,
      className: cn("gap-5 flex w-full flex-col", className),
      "data-slot": slotName,
      children: [
        /* @__PURE__ */ jsxs16("div", { className: "gap-2 flex flex-col", children: [
          /* @__PURE__ */ jsx16(Label, { htmlFor: fieldId, children: mode === "code" ? text.codeLabel : text.recoveryCodeLabel }),
          mode === "code" ? /* @__PURE__ */ jsx16(
            InputOTP,
            {
              id: fieldId,
              "data-slot": "two-factor-code-input",
              maxLength: length,
              value,
              autoFocus,
              disabled: pending,
              onChange: setValue,
              "aria-label": text.codeLabel,
              children: /* @__PURE__ */ jsx16(InputOTPGroup, { children: Array.from({ length }, (_, index) => /* @__PURE__ */ jsx16(InputOTPSlot, { index }, index)) })
            }
          ) : /* @__PURE__ */ jsx16(
            Input,
            {
              id: fieldId,
              slotName: "two-factor-recovery-input",
              value,
              autoComplete: "one-time-code",
              spellCheck: false,
              disabled: pending,
              placeholder: text.recoveryCodePlaceholder,
              "aria-label": text.recoveryCodeLabel,
              onChange: (event) => setValue(event.target.value)
            }
          )
        ] }),
        messages.length > 0 && /* @__PURE__ */ jsxs16(Alert, { variant: "destructive", slotName: "two-factor-error", children: [
          /* @__PURE__ */ jsx16(AlertCircle, {}),
          /* @__PURE__ */ jsx16(AlertDescription, { children: messages.map((message) => /* @__PURE__ */ jsx16("p", { children: message }, message)) })
        ] }),
        /* @__PURE__ */ jsxs16("div", { className: "gap-3 flex flex-col", children: [
          /* @__PURE__ */ jsx16(
            Button,
            {
              type: "submit",
              loading: pending,
              loadingLabel: text.verifyingLabel,
              disabled: !complete,
              children: submitLabel ?? text.verifyLabel
            }
          ),
          allowRecoveryCode && /* @__PURE__ */ jsx16(
            Button,
            {
              type: "button",
              variant: "ghost",
              size: "sm",
              disabled: pending,
              onClick: switchMode,
              children: mode === "code" ? text.useRecoveryCodeLabel : text.useCodeLabel
            }
          ),
          footer
        ] })
      ]
    }
  );
}

// src/blocks/two-factor/challenge.tsx
import { jsx as jsx17, jsxs as jsxs17 } from "react/jsx-runtime";
function TwoFactorChallenge({
  onSubmit,
  errors,
  allowRecoveryCode = true,
  title,
  description,
  footer,
  labels,
  className,
  slotName = "two-factor-challenge"
}) {
  const text = resolveLabels(labels);
  return /* @__PURE__ */ jsxs17(
    "section",
    {
      className: cn("gap-6 flex w-full flex-col", className),
      "data-slot": slotName,
      children: [
        /* @__PURE__ */ jsxs17("div", { className: "gap-2 flex flex-col", children: [
          /* @__PURE__ */ jsx17("h2", { className: "text-2xl font-bold tracking-tight text-foreground", children: title ?? text.challengeTitle }),
          /* @__PURE__ */ jsx17("p", { className: "text-sm font-medium text-muted-foreground", children: description ?? text.challengeDescription })
        ] }),
        /* @__PURE__ */ jsx17(
          TwoFactorVerifyForm,
          {
            autoFocus: true,
            allowRecoveryCode,
            errors,
            labels,
            footer,
            onSubmit
          }
        )
      ]
    }
  );
}

// src/blocks/two-factor/disable-button.tsx
import { ShieldOff } from "lucide-react";
import { useState as useState5 } from "react";
import { jsx as jsx18, jsxs as jsxs18 } from "react/jsx-runtime";
function TwoFactorDisableButton({
  onDisable,
  disabled = false,
  variant = "destructive",
  size = "default",
  labels,
  className,
  slotName = "two-factor-disable"
}) {
  const text = resolveLabels(labels);
  const [open, setOpen] = useState5(false);
  const [processing, setProcessing] = useState5(false);
  const handleConfirm = async () => {
    setProcessing(true);
    try {
      await onDisable();
    } finally {
      setProcessing(false);
    }
  };
  return /* @__PURE__ */ jsxs18(
    "span",
    {
      "data-open": open || void 0,
      className: cn("inline-flex", className),
      "data-slot": slotName,
      children: [
        /* @__PURE__ */ jsxs18(
          Button,
          {
            type: "button",
            variant,
            size,
            disabled: disabled || processing,
            onClick: () => setOpen(true),
            children: [
              /* @__PURE__ */ jsx18(ShieldOff, {}),
              text.disableLabel
            ]
          }
        ),
        /* @__PURE__ */ jsx18(
          ConfirmDialog,
          {
            open,
            onOpenChange: setOpen,
            title: text.disableTitle,
            description: text.disableDescription,
            confirmText: text.disableConfirmLabel,
            cancelText: text.disableCancelLabel,
            processing,
            onConfirm: handleConfirm
          }
        )
      ]
    }
  );
}

// src/blocks/two-factor/recovery-codes.tsx
import { Eye, EyeOff, RefreshCw } from "lucide-react";
import { useState as useState6 } from "react";
import { jsx as jsx19, jsxs as jsxs19 } from "react/jsx-runtime";
function TwoFactorRecoveryCodes({
  codes,
  defaultRevealed = false,
  onRegenerate,
  showHeading = true,
  labels,
  className,
  slotName = "two-factor-recovery-codes"
}) {
  const text = resolveLabels(labels);
  const [revealed, setRevealed] = useState6(defaultRevealed);
  const [copyFailed, setCopyFailed] = useState6(false);
  const [regenerating, setRegenerating] = useState6(false);
  const handleRegenerate = async () => {
    if (!onRegenerate || regenerating) {
      return;
    }
    setRegenerating(true);
    try {
      await onRegenerate();
    } finally {
      setRegenerating(false);
    }
  };
  return /* @__PURE__ */ jsxs19(
    "div",
    {
      "data-revealed": revealed || void 0,
      className: cn("gap-4 flex w-full flex-col", className),
      "data-slot": slotName,
      children: [
        showHeading && /* @__PURE__ */ jsxs19("div", { className: "gap-1 flex flex-col", children: [
          /* @__PURE__ */ jsx19("p", { className: "text-sm font-semibold text-foreground", children: text.recoveryTitle }),
          /* @__PURE__ */ jsxs19("p", { className: "text-xs font-medium text-muted-foreground", children: [
            text.recoveryDescription,
            " ",
            text.recoveryWarning
          ] })
        ] }),
        revealed && /* @__PURE__ */ jsx19(
          "ul",
          {
            "data-slot": "two-factor-recovery-list",
            className: cn(
              recessedSurface,
              "gap-2 p-4 sm:grid-cols-2 grid"
            ),
            children: codes.map((code) => /* @__PURE__ */ jsx19(
              "li",
              {
                "data-slot": "two-factor-recovery-code",
                className: cn(
                  compactRadius,
                  "px-2 py-1 text-sm font-medium font-mono break-all text-foreground"
                ),
                children: code
              },
              code
            ))
          }
        ),
        /* @__PURE__ */ jsxs19("div", { className: "gap-2 flex flex-wrap items-center", children: [
          /* @__PURE__ */ jsxs19(
            Button,
            {
              type: "button",
              variant: "ghost",
              size: "sm",
              "aria-pressed": revealed,
              onClick: () => setRevealed(!revealed),
              children: [
                revealed ? /* @__PURE__ */ jsx19(EyeOff, {}) : /* @__PURE__ */ jsx19(Eye, {}),
                revealed ? text.hideLabel : text.revealLabel
              ]
            }
          ),
          /* @__PURE__ */ jsx19(
            CopyButton,
            {
              value: codes.join("\n"),
              copyLabel: text.copyLabel,
              copiedLabel: text.copiedLabel,
              onCopied: () => setCopyFailed(false),
              onCopyFailed: () => setCopyFailed(true)
            }
          ),
          onRegenerate && /* @__PURE__ */ jsxs19(
            Button,
            {
              type: "button",
              variant: "outline",
              size: "sm",
              loading: regenerating,
              loadingLabel: text.regenerateLabel,
              onClick: handleRegenerate,
              children: [
                /* @__PURE__ */ jsx19(RefreshCw, {}),
                text.regenerateLabel
              ]
            }
          )
        ] }),
        copyFailed && /* @__PURE__ */ jsx19(
          "p",
          {
            "data-slot": "two-factor-copy-failed",
            className: "text-xs font-medium text-muted-foreground",
            children: text.copyFailedLabel
          }
        )
      ]
    }
  );
}

// src/blocks/two-factor/scan-step.tsx
import { Eye as Eye2, EyeOff as EyeOff2 } from "lucide-react";
import { useState as useState7 } from "react";
import { jsx as jsx20, jsxs as jsxs20 } from "react/jsx-runtime";
function TwoFactorScanStep({
  qrCode,
  qrCodeSvg,
  manualSetupKey,
  labels,
  className,
  slotName = "two-factor-scan-step"
}) {
  const text = resolveLabels(labels);
  const [revealed, setRevealed] = useState7(false);
  return /* @__PURE__ */ jsxs20(
    "div",
    {
      className: cn("gap-5 flex w-full flex-col", className),
      "data-slot": slotName,
      children: [
        /* @__PURE__ */ jsx20(
          "div",
          {
            "data-slot": "two-factor-qr",
            className: cn(
              recessedSurface,
              "p-4 flex items-center justify-center [&_svg]:size-full [&_svg]:h-auto"
            ),
            children: qrCode ?? (qrCodeSvg ? /* @__PURE__ */ jsx20(
              "div",
              {
                "data-slot": "two-factor-qr-markup",
                className: cn(controlRadius, "p-3 bg-card"),
                dangerouslySetInnerHTML: { __html: qrCodeSvg }
              }
            ) : /* @__PURE__ */ jsx20("p", { className: "text-sm font-medium text-muted-foreground", children: text.qrFallbackLabel }))
          }
        ),
        manualSetupKey && /* @__PURE__ */ jsxs20(
          "div",
          {
            "data-slot": "two-factor-setup-key",
            className: "gap-2 flex flex-col",
            children: [
              /* @__PURE__ */ jsx20("p", { className: "text-sm font-semibold text-foreground", children: text.manualKeyLabel }),
              /* @__PURE__ */ jsx20("p", { className: "text-xs font-medium text-muted-foreground", children: text.manualKeyDescription }),
              /* @__PURE__ */ jsxs20("div", { className: "gap-2 flex flex-wrap items-center", children: [
                /* @__PURE__ */ jsx20(
                  "code",
                  {
                    "data-slot": "two-factor-setup-key-value",
                    className: cn(
                      compactRadius,
                      "px-3 py-2 text-sm font-medium font-mono bg-muted break-all text-foreground"
                    ),
                    children: revealed ? manualSetupKey : "\u2022".repeat(manualSetupKey.length)
                  }
                ),
                /* @__PURE__ */ jsxs20(
                  Button,
                  {
                    type: "button",
                    variant: "ghost",
                    size: "sm",
                    "aria-pressed": revealed,
                    onClick: () => setRevealed(!revealed),
                    children: [
                      revealed ? /* @__PURE__ */ jsx20(EyeOff2, {}) : /* @__PURE__ */ jsx20(Eye2, {}),
                      revealed ? text.manualKeyHideLabel : text.manualKeyRevealLabel
                    ]
                  }
                ),
                /* @__PURE__ */ jsx20(
                  CopyButton,
                  {
                    value: manualSetupKey,
                    copyLabel: text.copyLabel,
                    copiedLabel: text.copiedLabel
                  }
                )
              ] })
            ]
          }
        )
      ]
    }
  );
}

// src/blocks/two-factor/setup-dialog.tsx
import { useEffect as useEffect2, useRef, useState as useState8 } from "react";
import { Fragment as Fragment2, jsx as jsx21, jsxs as jsxs21 } from "react/jsx-runtime";
function TwoFactorSetupDialog({
  open,
  onOpenChange,
  enabled = false,
  qrCode,
  qrCodeSvg,
  manualSetupKey,
  recoveryCodes,
  errors,
  onConfirm,
  onRequestSetupData,
  onRegenerateRecoveryCodes,
  onCompleted,
  labels,
  className,
  slotName = "two-factor-setup-dialog"
}) {
  const text = resolveLabels(labels);
  const [step, setStep] = useState8(
    enabled ? "recovery" : "scan"
  );
  const requestSetupData = useRef(onRequestSetupData);
  const openedBefore = useRef(false);
  useEffect2(() => {
    requestSetupData.current = onRequestSetupData;
  }, [onRequestSetupData]);
  useEffect2(() => {
    if (!open) {
      openedBefore.current = false;
      return;
    }
    if (openedBefore.current) {
      return;
    }
    openedBefore.current = true;
    setStep(enabled ? "recovery" : "scan");
    if (!enabled) {
      void requestSetupData.current?.();
    }
  }, [open, enabled]);
  const ready = Boolean(qrCode || qrCodeSvg || manualSetupKey);
  const codes = recoveryCodes ?? [];
  const handleConfirm = async (code) => {
    await onConfirm(code);
    setStep("recovery");
  };
  const finish = () => {
    onOpenChange(false);
    onCompleted?.();
  };
  const heading = {
    pending: text.setupTitle,
    scan: text.scanTitle,
    confirm: text.confirmTitle,
    recovery: text.recoveryTitle
  }[step];
  const description = {
    pending: text.setupDescription,
    scan: text.scanDescription,
    confirm: text.confirmDescription,
    recovery: `${text.recoveryDescription} ${text.recoveryWarning}`
  }[step];
  return /* @__PURE__ */ jsx21(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxs21(
    DialogContent,
    {
      "data-step": step,
      className: cn("max-w-md p-0", className),
      slotName,
      children: [
        /* @__PURE__ */ jsxs21(DialogHeader, { className: "p-6 md:p-8", children: [
          /* @__PURE__ */ jsx21(DialogTitle, { children: heading }),
          /* @__PURE__ */ jsx21(DialogDescription, { children: description })
        ] }),
        /* @__PURE__ */ jsxs21("div", { className: "gap-5 p-6 md:p-8 pt-0 md:pt-0 flex flex-col", children: [
          step === "scan" && (ready ? /* @__PURE__ */ jsxs21(Fragment2, { children: [
            /* @__PURE__ */ jsx21(
              TwoFactorScanStep,
              {
                qrCode,
                qrCodeSvg,
                manualSetupKey,
                labels
              }
            ),
            /* @__PURE__ */ jsx21(
              Button,
              {
                type: "button",
                onClick: () => setStep("confirm"),
                children: text.continueLabel
              }
            )
          ] }) : /* @__PURE__ */ jsxs21(
            "div",
            {
              "data-slot": "two-factor-pending",
              className: "gap-3 py-6 text-sm font-medium flex items-center justify-center text-muted-foreground",
              children: [
                /* @__PURE__ */ jsx21(Spinner, { label: text.pendingLabel }),
                text.pendingLabel
              ]
            }
          )),
          step === "confirm" && /* @__PURE__ */ jsx21(
            TwoFactorVerifyForm,
            {
              autoFocus: true,
              errors,
              labels,
              onSubmit: handleConfirm,
              footer: /* @__PURE__ */ jsx21(
                Button,
                {
                  type: "button",
                  variant: "ghost",
                  size: "sm",
                  onClick: () => setStep("scan"),
                  children: text.cancelLabel
                }
              )
            }
          ),
          step === "recovery" && /* @__PURE__ */ jsxs21(Fragment2, { children: [
            /* @__PURE__ */ jsx21(
              TwoFactorRecoveryCodes,
              {
                codes,
                defaultRevealed: true,
                showHeading: false,
                labels,
                onRegenerate: onRegenerateRecoveryCodes
              }
            ),
            /* @__PURE__ */ jsx21(Button, { type: "button", onClick: finish, children: text.doneLabel })
          ] })
        ] })
      ]
    }
  ) });
}
export {
  CommandPalette,
  DEFAULT_LABELS as DATE_FILTER_LABELS,
  DEFAULT_OPERATORS as DATE_FILTER_OPERATORS,
  DEFAULT_PRESETS as DATE_FILTER_PRESETS,
  DEFAULT_UNITS as DATE_FILTER_UNITS,
  DEFAULT_TOUR_LABELS,
  DangerZone,
  DateField,
  DateFilter,
  DateFilterAll,
  DateFilterContent,
  DateFilterFixed,
  DateFilterItem,
  DateFilterPresets,
  DateFilterRelative,
  DateFilterSeparator,
  DateFilterTrigger,
  DetailEditSheet,
  FormDialog,
  FormOverlayActions,
  InfoField,
  InfoFieldGroup,
  LocalizedFields,
  LoginForm,
  LoginFormEmail,
  LoginFormPassword,
  LoginFormPreset,
  LoginFormProvider,
  LoginFormRemember,
  LoginFormRoot,
  LoginFormStatus,
  LoginFormSubmit,
  NumberField,
  SectionHeader,
  SelectField,
  SettingsCard,
  SettingsEntry,
  SettingsField,
  SettingsGroup,
  SettingsPage,
  SettingsPanel,
  SettingsSection,
  StatCard,
  StatsGrid,
  TextField,
  ToggleRow,
  TourProvider,
  TwoFactorChallenge,
  TwoFactorDisableButton,
  TwoFactorRecoveryCodes,
  TwoFactorScanStep,
  TwoFactorSetupDialog,
  TwoFactorVerifyForm,
  UiLocaleProvider,
  dangerZoneLabels,
  decodeDateFilter,
  encodeDateFilter,
  fieldError,
  formOverlayDefaultLabels,
  formatRangePreview,
  loginFormLabels,
  resolveRelativeRange,
  resolveSteps,
  settingsLabels,
  shouldStartTour,
  stepsForBreakpoint,
  summariseDateFilter,
  twoFactorLabels,
  useCommandPalette,
  useDateFilter,
  useLoginFormContext,
  useTour,
  useTourController,
  useUiLabels,
  useUiLocale
};
//# sourceMappingURL=blocks.js.map