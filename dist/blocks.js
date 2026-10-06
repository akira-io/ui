'use client';

"use client";
import {
  PasskeyItem,
  PasskeyList,
  PasskeyRegisterButton,
  PasskeySignInButton,
  passkeyLabels,
  suggestPasskeyName
} from "./chunk-ELB2DNAD.js";
import {
  Calendar,
  FloatingSheet,
  FloatingSheetBody,
  FloatingSheetFooter,
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea
} from "./chunk-CBPSLJ3Y.js";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "./chunk-XDD4QNRA.js";
import {
  ConfirmDialog
} from "./chunk-X5GCJCSG.js";
import "./chunk-SETXGJEJ.js";
import {
  CopyButton
} from "./chunk-RKQEK3Y7.js";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "./chunk-JG5APUEJ.js";
import {
  Card
} from "./chunk-KAVNBSEA.js";
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
  NotificationBell,
  TourProvider,
  fieldError,
  loginFormLabels,
  messageList,
  notificationBellLabels,
  resolveSteps,
  shouldStartTour,
  stepsForBreakpoint,
  twoFactorLabels,
  useLoginFormContext,
  useTour,
  useTourController
} from "./chunk-LLFOJSNJ.js";
import {
  Alert,
  AlertDescription,
  Field,
  FieldControl,
  FieldDescription,
  FieldLabel,
  PasswordInput
} from "./chunk-67TTMCV4.js";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "./chunk-4SF3ZO5K.js";
import {
  FieldError
} from "./chunk-5NZLIF7G.js";
import "./chunk-HD6ICFDS.js";
import {
  Label
} from "./chunk-RE7X3RE5.js";
import {
  resolveLink
} from "./chunk-APUJ4CKT.js";
import {
  useSheetPortalContainer
} from "./chunk-EXTOGROG.js";
import {
  Separator
} from "./chunk-D73FKPPI.js";
import {
  Input
} from "./chunk-KKPB4LLT.js";
import {
  Button,
  Spinner,
  UiLocaleProvider,
  useUiDateLocale,
  useUiLabels,
  useUiLocale
} from "./chunk-LIFCF5RY.js";
import {
  stackCornerRadius
} from "./chunk-ZTUFU2VV.js";
import {
  compactRadius,
  controlRadius,
  elevatedSurface,
  fieldSurface,
  focusRing,
  menuSurface,
  nestedSurfaceReset,
  recessedSurface
} from "./chunk-H26GY6FP.js";
import {
  cn
} from "./chunk-XN5WW7OR.js";

// src/blocks/brand-logo.tsx
import { jsx, jsxs } from "react/jsx-runtime";
function BrandLogo({
  icon: Icon,
  name,
  className,
  slotName = "brand-logo"
}) {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      "data-slot": slotName,
      className: cn(
        "gap-3 min-w-0 group-data-[collapsible=icon]:gap-0 flex items-center",
        className
      ),
      children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            "data-slot": "brand-logo-mark",
            "aria-hidden": "true",
            className: cn(
              compactRadius,
              "size-10 shadow-lg flex aspect-square shrink-0 items-center justify-center bg-primary text-primary-foreground shadow-primary/20"
            ),
            children: /* @__PURE__ */ jsx(Icon, { className: "size-6 stroke-[2.5]" })
          }
        ),
        /* @__PURE__ */ jsx(
          "span",
          {
            "data-slot": "brand-logo-name",
            className: "text-xl font-bold tracking-tight truncate text-left text-foreground uppercase group-data-[collapsible=icon]:sr-only",
            children: name
          }
        )
      ]
    }
  );
}

// src/blocks/command-palette.tsx
import { useCallback, useEffect, useState } from "react";
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsxs2(
    CommandDialog,
    {
      open,
      onOpenChange,
      className,
      children: [
        /* @__PURE__ */ jsx2(
          CommandInput,
          {
            placeholder: labels.placeholder,
            value: query,
            onValueChange: onQueryChange
          }
        ),
        /* @__PURE__ */ jsxs2(CommandList, { className: "max-h-[360px]", children: [
          /* @__PURE__ */ jsx2(CommandEmpty, { children: resolvedEmptyState }),
          groups.map((group) => /* @__PURE__ */ jsx2(CommandGroup, { heading: group.heading, children: group.items.map((item) => /* @__PURE__ */ jsxs2(
            CommandItem,
            {
              value: item.value ?? item.label,
              onSelect: () => onSelect(item),
              children: [
                item.icon && /* @__PURE__ */ jsx2(item.icon, { className: "mr-2 size-4" }),
                /* @__PURE__ */ jsx2("span", { className: "font-medium", children: item.label }),
                item.hint && /* @__PURE__ */ jsx2("span", { className: "text-xs ml-auto text-muted-foreground", children: item.hint })
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

// src/blocks/share-tooltip.tsx
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { jsx as jsx3, jsxs as jsxs3 } from "react/jsx-runtime";
function ShareTooltip({
  label,
  value,
  shareLabel,
  color,
  children
}) {
  const container = useSheetPortalContainer();
  return /* @__PURE__ */ jsx3(TooltipPrimitive.Provider, { delayDuration: 0, children: /* @__PURE__ */ jsxs3(TooltipPrimitive.Root, { children: [
    /* @__PURE__ */ jsx3(TooltipPrimitive.Trigger, { asChild: true, children }),
    /* @__PURE__ */ jsx3(TooltipPrimitive.Portal, { container, children: /* @__PURE__ */ jsxs3(
      TooltipPrimitive.Content,
      {
        sideOffset: 4,
        className: cn(
          menuSurface,
          "gap-1.5 px-3 py-2 text-xs min-w-36 z-50 grid"
        ),
        children: [
          /* @__PURE__ */ jsx3("span", { className: "font-medium", children: label }),
          /* @__PURE__ */ jsxs3("span", { className: "gap-3 flex items-center justify-between", children: [
            /* @__PURE__ */ jsxs3("span", { className: "gap-1.5 flex items-center text-muted-foreground", children: [
              /* @__PURE__ */ jsx3(
                "span",
                {
                  className: "size-2.5 shrink-0 rounded-md",
                  style: { backgroundColor: color }
                }
              ),
              shareLabel
            ] }),
            /* @__PURE__ */ jsx3("span", { className: "font-mono font-medium text-foreground tabular-nums", children: value })
          ] })
        ]
      }
    ) })
  ] }) });
}

// src/blocks/stat-card-parts.tsx
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight
} from "lucide-react";
import { Fragment, jsx as jsx4, jsxs as jsxs4 } from "react/jsx-runtime";
var trendToneClass = {
  positive: "text-success",
  negative: "text-destructive",
  neutral: "text-muted-foreground"
};
var trendToneIcon = {
  positive: ArrowUpRight,
  negative: ArrowDownRight,
  neutral: ArrowRight
};
function defaultTrendLabel(trend) {
  if (trend === 0) {
    return "0%";
  }
  return `${trend > 0 ? "+" : ""}${trend.toFixed(1)}%`;
}
function toneOf(trend) {
  if (trend === 0) {
    return "neutral";
  }
  return trend > 0 ? "positive" : "negative";
}
function resolveTrend(trend, formatTrend = defaultTrendLabel) {
  if (trend === null || trend === void 0 || Number.isNaN(trend)) {
    return null;
  }
  const normalized = Math.abs(trend) < 0.05 ? 0 : trend;
  const tone = toneOf(normalized);
  return {
    label: formatTrend(normalized),
    tone,
    icon: trendToneIcon[tone]
  };
}
function StatTrend({
  trend,
  comparisonLabel
}) {
  return /* @__PURE__ */ jsxs4("div", { className: "min-w-0 text-right", children: [
    /* @__PURE__ */ jsxs4(
      "span",
      {
        className: cn(
          "text-sm font-semibold inline-flex items-center",
          trendToneClass[trend.tone]
        ),
        children: [
          trend.label,
          /* @__PURE__ */ jsx4(trend.icon, { className: "ml-1 size-4" })
        ]
      }
    ),
    comparisonLabel && /* @__PURE__ */ jsx4("p", { className: "mt-1 font-medium tracking-wider text-[10px] whitespace-nowrap text-muted-foreground uppercase", children: comparisonLabel })
  ] });
}
function StatCardHeader({
  layout,
  title,
  icon: Icon,
  iconClassName,
  trend,
  comparisonLabel
}) {
  const trendNode = trend && /* @__PURE__ */ jsx4(StatTrend, { trend, comparisonLabel });
  if (layout === "inline") {
    return /* @__PURE__ */ jsxs4("div", { className: "gap-3 flex items-start justify-between", children: [
      /* @__PURE__ */ jsxs4("div", { className: "gap-3 min-w-0 flex items-center", children: [
        /* @__PURE__ */ jsx4(
          "div",
          {
            className: cn(
              "rounded-xl p-2.5 shrink-0",
              iconClassName
            ),
            children: /* @__PURE__ */ jsx4(Icon, { className: "size-5" })
          }
        ),
        /* @__PURE__ */ jsx4("p", { className: "text-sm font-bold tracking-wider break-words text-muted-foreground uppercase", children: title })
      ] }),
      trendNode
    ] });
  }
  return /* @__PURE__ */ jsxs4("div", { className: "mb-4 gap-4 flex items-start justify-between", children: [
    /* @__PURE__ */ jsx4("div", { className: cn("rounded-2xl p-3 shrink-0", iconClassName), children: /* @__PURE__ */ jsx4(Icon, { className: "size-6" }) }),
    trendNode
  ] });
}
function hasSecondaryValue(value) {
  return value !== void 0 && value !== null && value !== false;
}
function StatFigure({
  value,
  secondaryValue
}) {
  const mirrorsValue = secondaryValue === value;
  return /* @__PURE__ */ jsxs4(Fragment, { children: [
    /* @__PURE__ */ jsx4("p", { className: "text-3xl font-bold truncate text-foreground tabular-nums", children: value }),
    hasSecondaryValue(secondaryValue) && /* @__PURE__ */ jsx4(
      "p",
      {
        "aria-hidden": mirrorsValue || void 0,
        className: cn(
          "mt-1 text-sm font-medium truncate text-muted-foreground tabular-nums",
          mirrorsValue && "invisible"
        ),
        children: secondaryValue
      }
    )
  ] });
}
function clampShare(value) {
  if (Number.isNaN(value)) {
    return 0;
  }
  return Math.min(Math.max(value, 0), 100);
}
function StatShareBar({
  share,
  title,
  tooltipValue
}) {
  const width = clampShare(share.value);
  const color = share.color ?? "var(--chart-1)";
  return /* @__PURE__ */ jsxs4("div", { className: "gap-2 mt-auto flex flex-col", children: [
    /* @__PURE__ */ jsx4(
      ShareTooltip,
      {
        label: title,
        value: tooltipValue,
        shareLabel: share.label ?? `${width.toFixed(1)}%`,
        color,
        children: /* @__PURE__ */ jsx4(
          "div",
          {
            role: "meter",
            tabIndex: 0,
            "aria-label": title,
            "aria-valuemin": 0,
            "aria-valuemax": 100,
            "aria-valuenow": Math.round(width),
            "aria-valuetext": share.label,
            className: cn(
              "h-2 overflow-hidden rounded-full bg-muted",
              focusRing
            ),
            children: /* @__PURE__ */ jsx4(
              "span",
              {
                className: "block h-full rounded-full",
                style: { width: `${width}%`, backgroundColor: color }
              }
            )
          }
        )
      }
    ),
    share.hint && /* @__PURE__ */ jsx4("p", { className: "text-xs font-medium text-muted-foreground", children: share.hint })
  ] });
}

// src/hooks/use-bar-radius.ts
import * as React from "react";
function useBarRadius(barRef, maxRadius) {
  const [radius, setRadius] = React.useState();
  React.useEffect(() => {
    const bar = barRef.current;
    if (!bar) {
      return;
    }
    const measure = () => {
      const { width, height } = bar.getBoundingClientRect();
      setRadius(
        width > 0 && height > 0 ? stackCornerRadius(
          { x: 0, y: 0, width, height },
          maxRadius,
          true
        ) : void 0
      );
    };
    measure();
    const observer = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(measure);
    observer?.observe(bar);
    return () => observer?.disconnect();
  }, [barRef, maxRadius]);
  return radius;
}

// src/blocks/composition-bar.tsx
import { useRef } from "react";
import { jsx as jsx5, jsxs as jsxs5 } from "react/jsx-runtime";
function compositionTotal(parts) {
  return parts.reduce((sum, part) => sum + Math.max(part.value, 0), 0);
}
function compositionShare(part, total) {
  return total > 0 ? clampShare(part.value / total * 100) : 0;
}
function compositionShareLabel(part, total) {
  return part.shareLabel ?? `${compositionShare(part, total).toFixed(1)}%`;
}
var TRACK_MAX_RADIUS = 8;
var TRACK_FALLBACK_RADIUS = 2;
function CompositionTrack({
  parts,
  total,
  label,
  className
}) {
  const trackRef = useRef(null);
  const radius = useBarRadius(trackRef, TRACK_MAX_RADIUS) ?? TRACK_FALLBACK_RADIUS;
  const overflowing = compositionTotal(parts) > total;
  return /* @__PURE__ */ jsx5(
    "div",
    {
      ref: trackRef,
      role: "group",
      "aria-label": label,
      className: cn("h-3 flex overflow-hidden bg-muted", className),
      style: { borderRadius: radius },
      children: parts.map((part) => /* @__PURE__ */ jsx5(
        ShareTooltip,
        {
          label: part.label,
          value: part.exactDisplay ?? part.display,
          shareLabel: compositionShareLabel(part, total),
          color: part.color,
          children: /* @__PURE__ */ jsx5(
            "span",
            {
              role: "img",
              tabIndex: compositionShare(part, total) === 0 ? -1 : 0,
              "aria-label": `${part.label}, ${compositionShareLabel(part, total)}`,
              "data-part-id": part.id,
              className: cn(
                "h-full outline-hidden hover:brightness-125 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring focus-visible:outline-solid",
                overflowing ? "shrink-0" : "shrink",
                compositionShare(part, total) > 0 && "min-w-px"
              ),
              style: {
                width: `${compositionShare(part, total)}%`,
                backgroundColor: part.color
              }
            }
          )
        },
        part.id
      ))
    }
  );
}
function CompositionBar({
  parts,
  label,
  total = compositionTotal(parts),
  legend = true,
  className,
  slotName = "composition-bar"
}) {
  return /* @__PURE__ */ jsxs5(
    "div",
    {
      className: cn("gap-5 min-w-0 flex flex-col", className),
      "data-slot": slotName,
      children: [
        /* @__PURE__ */ jsx5(CompositionTrack, { parts, total, label }),
        legend && /* @__PURE__ */ jsx5("ul", { "aria-label": label, className: "gap-2 flex flex-col", children: parts.map((part) => /* @__PURE__ */ jsxs5(
          "li",
          {
            "data-part-id": part.id,
            className: "gap-4 text-sm flex items-center justify-between",
            children: [
              /* @__PURE__ */ jsxs5("span", { className: "gap-2 min-w-0 flex items-center", children: [
                /* @__PURE__ */ jsx5(
                  "span",
                  {
                    "aria-hidden": true,
                    className: "size-2.5 shrink-0 rounded-md",
                    style: { backgroundColor: part.color }
                  }
                ),
                /* @__PURE__ */ jsx5("span", { className: "truncate", children: part.label })
              ] }),
              /* @__PURE__ */ jsxs5("span", { className: "gap-2 flex shrink-0 items-baseline tabular-nums", children: [
                /* @__PURE__ */ jsx5("span", { className: "font-medium text-foreground", children: part.display }),
                /* @__PURE__ */ jsx5("span", { className: "text-xs text-muted-foreground", children: compositionShareLabel(part, total) })
              ] })
            ]
          },
          part.id
        )) })
      ]
    }
  );
}

// src/blocks/danger-zone.tsx
import { TriangleAlert } from "lucide-react";
import { useEffect as useEffect3, useId, useRef as useRef2, useState as useState3 } from "react";
import { jsx as jsx6, jsxs as jsxs6 } from "react/jsx-runtime";
var dangerZoneLabels = {
  title: "Danger zone",
  description: "These actions are permanent and cannot be undone.",
  actionLabel: "Delete",
  confirmTitle: "Confirm Action",
  confirmDescription: "Are you sure you want to continue? This action cannot be undone.",
  confirmText: "Confirm",
  cancelText: "Cancel",
  requiredValueLabel: "Type {{value}} to confirm",
  passwordLabel: "Current password",
  passwordPlaceholder: "Password"
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
  const copy = useUiLabels("dangerZone", dangerZoneLabels, labels);
  const [activeId, setActiveId] = useState3(null);
  const active = actions.find((action) => action.id === activeId) ?? null;
  const requirePassword = active?.requirePassword === true;
  const [password, setPassword] = useState3("");
  const [pending, setPending] = useState3(false);
  const [failure, setFailure] = useState3(null);
  const passwordRef = useRef2(null);
  const passwordId = useId();
  const passwordErrorId = useId();
  const passwordError = failure ?? active?.error;
  useEffect3(() => {
    if (requirePassword && !pending && passwordError) {
      passwordRef.current?.focus();
    }
  }, [requirePassword, pending, passwordError]);
  const close = () => {
    setActiveId(null);
    setPassword("");
    setFailure(null);
  };
  const confirmWithPassword = async (action) => {
    if (pending || processing || password === "") {
      return;
    }
    setPending(true);
    setFailure(null);
    try {
      await action.onConfirm(password);
      close();
    } catch (error) {
      setFailure(error instanceof Error ? error.message : "");
    } finally {
      setPending(false);
    }
  };
  const confirm = () => {
    if (!active) {
      return;
    }
    if (active.requirePassword) {
      void confirmWithPassword(active);
      return;
    }
    void active.onConfirm();
  };
  return /* @__PURE__ */ jsxs6(
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
        /* @__PURE__ */ jsxs6("div", { "data-slot": "danger-zone-header", className: "gap-3 flex", children: [
          /* @__PURE__ */ jsx6("span", { className: "size-11 rounded-2xl flex shrink-0 items-center justify-center bg-destructive/10 text-destructive", children: /* @__PURE__ */ jsx6(TriangleAlert, { className: "size-5" }) }),
          /* @__PURE__ */ jsxs6("div", { children: [
            /* @__PURE__ */ jsx6("h2", { className: "text-lg font-bold text-destructive", children: title ?? copy.title }),
            /* @__PURE__ */ jsx6("p", { className: "text-sm font-medium text-muted-foreground", children: description ?? copy.description })
          ] })
        ] }),
        /* @__PURE__ */ jsx6("ul", { "data-slot": "danger-zone-actions", className: "gap-4 flex flex-col", children: actions.map((action) => /* @__PURE__ */ jsxs6(
          "li",
          {
            "data-slot": "danger-zone-action",
            "data-action-id": action.id,
            className: "gap-4 sm:flex-row sm:items-center sm:justify-between flex flex-col",
            children: [
              /* @__PURE__ */ jsxs6("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsx6("p", { className: "text-sm font-semibold text-foreground", children: action.title }),
                action.description && /* @__PURE__ */ jsx6("p", { className: "text-sm font-medium text-muted-foreground", children: action.description })
              ] }),
              /* @__PURE__ */ jsx6(
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
        /* @__PURE__ */ jsx6(
          ConfirmDialog,
          {
            open: active !== null,
            onOpenChange: (open) => {
              if (!open && !pending) {
                close();
              }
            },
            variant: "destructive",
            processing: processing || pending,
            closeOnConfirm: !requirePassword,
            confirmDisabled: requirePassword && password === "",
            title: active?.confirmTitle ?? copy.confirmTitle,
            description: active?.confirmDescription ?? copy.confirmDescription,
            confirmText: active?.confirmText ?? copy.confirmText,
            cancelText: active?.cancelText ?? copy.cancelText,
            requiredValue: active?.requiredValue,
            requiredValueLabel: active?.requiredValueLabel ?? copy.requiredValueLabel,
            onConfirm: confirm,
            children: requirePassword && /* @__PURE__ */ jsxs6(
              "div",
              {
                "data-slot": "danger-zone-password",
                className: "gap-2 px-6 md:px-8 flex flex-col",
                children: [
                  /* @__PURE__ */ jsx6(Label, { htmlFor: passwordId, children: copy.passwordLabel }),
                  /* @__PURE__ */ jsx6(
                    PasswordInput,
                    {
                      ref: passwordRef,
                      id: passwordId,
                      name: "password",
                      value: password,
                      placeholder: copy.passwordPlaceholder,
                      autoComplete: "current-password",
                      disabled: processing || pending,
                      "aria-invalid": passwordError ? true : void 0,
                      "aria-describedby": passwordError ? passwordErrorId : void 0,
                      onChange: (event) => {
                        setPassword(event.target.value);
                        setFailure(null);
                      },
                      onKeyDown: (event) => {
                        if (event.key === "Enter") {
                          event.preventDefault();
                          confirm();
                        }
                      }
                    }
                  ),
                  /* @__PURE__ */ jsx6(
                    FieldError,
                    {
                      id: passwordErrorId,
                      message: passwordError
                    }
                  )
                ]
              }
            )
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
import { pt as pt3 } from "date-fns/locale";
import { CalendarDays as CalendarDays2 } from "lucide-react";
import { useState as useState4 } from "react";

// src/blocks/date-filter/fixed-panel.tsx
import { format } from "date-fns";
import { ChevronLeft } from "lucide-react";
import { jsx as jsx7, jsxs as jsxs7 } from "react/jsx-runtime";
var CALENDAR_START = new Date(2020, 0, 1);
var CALENDAR_END = new Date((/* @__PURE__ */ new Date()).getFullYear() + 1, 11, 31);
var toDate = (value) => value ? /* @__PURE__ */ new Date(`${value}T00:00:00`) : void 0;
var toIso = (value) => value ? format(value, "yyyy-MM-dd") : void 0;
function DateFilterFixedPanel() {
  const {
    draft,
    operators,
    labels,
    dateLocale,
    setDraft,
    backToRoot,
    commit
  } = useDateFilter();
  const operator = draft.operator ?? "between";
  const isRange = operator === "between";
  const canApply = Boolean(draft.start) && (!isRange || Boolean(draft.end));
  return /* @__PURE__ */ jsxs7("div", { className: "w-auto", children: [
    /* @__PURE__ */ jsxs7("div", { className: "gap-1 px-2 py-2 flex items-center border-b", children: [
      /* @__PURE__ */ jsx7(
        Button,
        {
          variant: "ghost",
          size: "icon",
          onClick: backToRoot,
          "aria-label": labels.back,
          children: /* @__PURE__ */ jsx7(ChevronLeft, { className: "size-4" })
        }
      ),
      operators.map((item) => /* @__PURE__ */ jsx7(
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
    /* @__PURE__ */ jsx7("div", { className: "p-3", children: isRange ? /* @__PURE__ */ jsx7(
      Calendar,
      {
        mode: "range",
        numberOfMonths: 2,
        locale: dateLocale,
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
    ) : /* @__PURE__ */ jsx7(
      Calendar,
      {
        mode: "single",
        locale: dateLocale,
        captionLayout: "dropdown",
        startMonth: CALENDAR_START,
        endMonth: CALENDAR_END,
        defaultMonth: toDate(draft.start),
        selected: toDate(draft.start),
        onSelect: (date) => setDraft({ ...draft, start: toIso(date) })
      }
    ) }),
    /* @__PURE__ */ jsx7("div", { className: "px-3 py-2 flex justify-end border-t", children: /* @__PURE__ */ jsx7(Button, { disabled: !canApply, onClick: () => commit(draft), children: labels.apply }) })
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
import { pt } from "date-fns/locale";
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
function formatRangePreview(range, locale = pt) {
  const sameYear = isSameYear(range.start, range.end);
  const startPattern = sameYear ? "d MMM" : "d MMM yyyy";
  return `${format2(range.start, startPattern, { locale })} - ${format2(range.end, "d MMM yyyy", { locale })}`;
}

// src/blocks/date-filter/relative-panel.tsx
import { jsx as jsx8, jsxs as jsxs8 } from "react/jsx-runtime";
function DateFilterRelativePanel() {
  const { draft, units, labels, setDraft, backToRoot, commit } = useDateFilter();
  const hasOffset = (draft.offset_amount ?? 0) > 0;
  return /* @__PURE__ */ jsxs8("div", { className: "w-96", children: [
    /* @__PURE__ */ jsxs8("div", { className: "gap-2 px-2 py-2 flex items-center border-b", children: [
      /* @__PURE__ */ jsx8(
        Button,
        {
          variant: "ghost",
          size: "icon",
          onClick: backToRoot,
          "aria-label": labels.back,
          children: /* @__PURE__ */ jsx8(ChevronLeft2, { className: "size-4" })
        }
      ),
      /* @__PURE__ */ jsx8("span", { className: "text-sm font-medium", children: labels.relativeTitle })
    ] }),
    /* @__PURE__ */ jsxs8("div", { className: "gap-3 p-3 flex flex-col", children: [
      /* @__PURE__ */ jsxs8("div", { className: "gap-2 flex items-center", children: [
        /* @__PURE__ */ jsx8("span", { className: "text-sm", children: labels.latest }),
        /* @__PURE__ */ jsx8(
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
        /* @__PURE__ */ jsxs8(
          Select,
          {
            value: draft.unit ?? "month",
            onValueChange: (unit) => setDraft({ ...draft, unit }),
            children: [
              /* @__PURE__ */ jsx8(SelectTrigger, { className: "flex-1", children: /* @__PURE__ */ jsx8(SelectValue, {}) }),
              /* @__PURE__ */ jsx8(SelectContent, { children: units.map((unit) => /* @__PURE__ */ jsx8(SelectItem, { value: unit.value, children: unit.label }, unit.value)) })
            ]
          }
        ),
        !hasOffset && /* @__PURE__ */ jsx8(
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
            children: /* @__PURE__ */ jsx8(ArrowLeftToLine, { className: "size-4" })
          }
        )
      ] }),
      hasOffset && /* @__PURE__ */ jsxs8("div", { className: "gap-2 flex items-center", children: [
        /* @__PURE__ */ jsx8("span", { className: "text-sm", children: labels.startingAgo }),
        /* @__PURE__ */ jsx8(
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
        /* @__PURE__ */ jsxs8(
          Select,
          {
            value: draft.offset_unit ?? draft.unit ?? "month",
            onValueChange: (unit) => setDraft({
              ...draft,
              offset_unit: unit
            }),
            children: [
              /* @__PURE__ */ jsx8(SelectTrigger, { className: "flex-1", children: /* @__PURE__ */ jsx8(SelectValue, {}) }),
              /* @__PURE__ */ jsx8(SelectContent, { children: units.map((unit) => /* @__PURE__ */ jsx8(
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
        /* @__PURE__ */ jsx8(
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
            children: /* @__PURE__ */ jsx8(X, { className: "size-4" })
          }
        )
      ] }),
      /* @__PURE__ */ jsxs8("label", { className: "text-sm flex items-center justify-between", children: [
        labels.includeCurrent,
        /* @__PURE__ */ jsx8(
          Switch,
          {
            checked: draft.include_current ?? false,
            onCheckedChange: (checked) => setDraft({ ...draft, include_current: checked })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs8("div", { className: "gap-3 px-3 py-2 flex items-center justify-between border-t", children: [
      /* @__PURE__ */ jsx8(RangePreview, { draft }),
      /* @__PURE__ */ jsx8(
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
  const { dateLocale } = useDateFilter();
  const range = resolveRelativeRange(
    draft.unit ?? "month",
    draft.amount ?? 0,
    draft.include_current ?? false,
    /* @__PURE__ */ new Date(),
    draft.offset_amount ?? 0,
    draft.offset_unit
  );
  if (!range) {
    return /* @__PURE__ */ jsx8("span", {});
  }
  return /* @__PURE__ */ jsxs8("span", { className: "gap-2 text-sm flex items-center text-muted-foreground", children: [
    /* @__PURE__ */ jsx8(CalendarDays, { className: "size-4" }),
    formatRangePreview(range, dateLocale)
  ] });
}

// src/blocks/date-filter/summarise.ts
import { format as format3 } from "date-fns";
import { pt as pt2 } from "date-fns/locale";
var readable = (locale, value) => value ? format3(/* @__PURE__ */ new Date(`${value}T00:00:00`), "PPP", { locale }) : "";
function summariseDateFilter(value, presets, operators, units, labels, locale = pt2) {
  if (value.mode === "preset") {
    return presets.find((preset) => preset.value === value.preset)?.label ?? labels.fallback;
  }
  if (value.mode === "fixed") {
    const operator = operators.find((item) => item.value === value.operator)?.label ?? "";
    return value.operator === "between" ? `${readable(locale, value.start)} - ${readable(locale, value.end)}` : `${operator} ${readable(locale, value.start)}`;
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
import { Fragment as Fragment2, jsx as jsx9, jsxs as jsxs9 } from "react/jsx-runtime";
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
  const dateLocale = useUiDateLocale() ?? pt3;
  const resolvedLabels = useUiLabels("dateFilter", DEFAULT_LABELS, labels);
  const [open, setOpen] = useState4(false);
  const [panel, setPanel] = useState4("root");
  const [draft, setDraft] = useState4(value);
  const context = {
    value,
    draft,
    labels: resolvedLabels,
    dateLocale,
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
  return /* @__PURE__ */ jsx9(DateFilterProvider, { value: context, children: /* @__PURE__ */ jsx9(
    Popover,
    {
      open,
      onOpenChange: (next) => {
        setOpen(next);
        if (!next) {
          setPanel("root");
        }
      },
      children: children ?? /* @__PURE__ */ jsxs9(Fragment2, { children: [
        /* @__PURE__ */ jsx9(DateFilterTrigger, {}),
        /* @__PURE__ */ jsxs9(DateFilterContent, { children: [
          /* @__PURE__ */ jsx9(DateFilterAll, {}),
          /* @__PURE__ */ jsx9(DateFilterSeparator, {}),
          /* @__PURE__ */ jsx9(DateFilterPresets, {}),
          /* @__PURE__ */ jsx9(DateFilterSeparator, {}),
          /* @__PURE__ */ jsx9(DateFilterFixed, {}),
          /* @__PURE__ */ jsx9(DateFilterRelative, {})
        ] })
      ] })
    }
  ) });
}
function DateFilterTrigger({
  className,
  children
}) {
  const { value, presets, operators, units, labels, dateLocale } = useDateFilter();
  return /* @__PURE__ */ jsx9(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxs9(
    Button,
    {
      variant: "outline",
      className: cn("gap-2 justify-start", className),
      children: [
        /* @__PURE__ */ jsx9(CalendarDays2, { className: "size-4" }),
        children ?? summariseDateFilter(
          value,
          presets,
          operators,
          units,
          labels,
          dateLocale
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
  return /* @__PURE__ */ jsxs9(PopoverContent, { align: "start", className: cn("p-0 w-auto", className), children: [
    panel === "root" && /* @__PURE__ */ jsx9("div", { className: "w-64 py-2 flex flex-col", children }),
    panel === "fixed" && /* @__PURE__ */ jsx9(DateFilterFixedPanel, {}),
    panel === "relative" && /* @__PURE__ */ jsx9(DateFilterRelativePanel, {})
  ] });
}
function DateFilterItem({
  active,
  onSelect,
  children
}) {
  return /* @__PURE__ */ jsx9(
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
  return /* @__PURE__ */ jsx9("div", { "data-slot": "date-filter-separator", className: "mx-1 my-2 border-t" });
}
function DateFilterAll({ children }) {
  const { value, labels, commit } = useDateFilter();
  return /* @__PURE__ */ jsx9(
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
  return /* @__PURE__ */ jsx9(Fragment2, { children: visible.map((preset) => /* @__PURE__ */ jsx9(
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
  return /* @__PURE__ */ jsx9(
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
  return /* @__PURE__ */ jsx9(
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
import { jsx as jsx10, jsxs as jsxs10 } from "react/jsx-runtime";
var formOverlayDefaultLabels = {
  cancelLabel: "Cancel",
  saveLabel: "Save",
  savingLabel: "Saving..."
};
function FormOverlayActions({
  labels: overrides,
  processing = false,
  intent = "default",
  submit = false,
  className,
  onCancel,
  onSave,
  slotName = "form-overlay-actions"
}) {
  const labels = useUiLabels(
    "formOverlay",
    formOverlayDefaultLabels,
    overrides
  );
  return /* @__PURE__ */ jsxs10(
    "div",
    {
      className: cn("gap-2 flex items-center justify-end", className),
      "data-slot": slotName,
      children: [
        /* @__PURE__ */ jsx10(
          Button,
          {
            type: "button",
            variant: "ghost",
            disabled: processing,
            onClick: onCancel,
            children: labels.cancelLabel
          }
        ),
        /* @__PURE__ */ jsx10(
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
import { jsx as jsx11, jsxs as jsxs11 } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsx11(
    FloatingSheet,
    {
      open,
      onOpenChange,
      title,
      description,
      persistent: true,
      className,
      children: /* @__PURE__ */ jsxs11(
        "form",
        {
          onSubmit: handleSubmit,
          className: "min-h-0 flex flex-1 flex-col",
          "data-slot": slotName,
          children: [
            /* @__PURE__ */ jsx11(FloatingSheetBody, { children }),
            /* @__PURE__ */ jsx11(Separator, {}),
            /* @__PURE__ */ jsx11(FloatingSheetFooter, { children: /* @__PURE__ */ jsx11(
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
import { jsx as jsx12, jsxs as jsxs12 } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsx12(
    Dialog,
    {
      open,
      onOpenChange: (next) => {
        if (processing && !next) {
          return;
        }
        onOpenChange(next);
      },
      children: /* @__PURE__ */ jsx12(
        DialogContent,
        {
          ...description ? {} : { "aria-describedby": void 0 },
          className: cn("gap-0 p-0", className),
          onEscapeKeyDown: blockWhileProcessing,
          onInteractOutside: blockWhileProcessing,
          slotName,
          children: /* @__PURE__ */ jsxs12(
            "form",
            {
              "data-slot": "form-dialog-form",
              onSubmit: handleSubmit,
              className: "grid max-h-[calc(100dvh-8rem)] grid-rows-[auto_minmax(0,1fr)_auto]",
              children: [
                /* @__PURE__ */ jsxs12(DialogHeader, { className: "text-left", children: [
                  /* @__PURE__ */ jsx12(DialogTitle, { children: title }),
                  description ? /* @__PURE__ */ jsx12(DialogDescription, { children: description }) : null
                ] }),
                /* @__PURE__ */ jsx12(
                  "div",
                  {
                    "data-slot": "form-dialog-body",
                    className: "gap-4 px-6 pb-6 md:px-8 flex flex-col overflow-y-auto",
                    children
                  }
                ),
                /* @__PURE__ */ jsx12(DialogFooter, { children: /* @__PURE__ */ jsx12(
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
import { jsx as jsx13, jsxs as jsxs13 } from "react/jsx-runtime";
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
  copyPlacement = "label",
  iconClassName,
  className,
  slotName = "info-field"
}) {
  const text = copyableText(value, copyValue);
  const control = copyable && text !== "" && /* @__PURE__ */ jsx13(
    CopyButton,
    {
      value: text,
      copyLabel,
      copiedLabel,
      className: copyPlacement === "label" ? "size-5 [&_svg:not([class*='size-'])]:size-3 rounded-md text-muted-foreground" : void 0
    }
  );
  const onLabelRow = copyPlacement === "label";
  return /* @__PURE__ */ jsxs13(
    "div",
    {
      className: cn("gap-3 flex items-center", className),
      "data-slot": slotName,
      children: [
        /* @__PURE__ */ jsx13("div", { className: cn("p-2 rounded-xl bg-muted", iconClassName), children: /* @__PURE__ */ jsx13(Icon, { className: "size-5 text-muted-foreground" }) }),
        /* @__PURE__ */ jsxs13("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxs13("div", { className: "gap-1 flex items-center", children: [
            /* @__PURE__ */ jsx13(
              "p",
              {
                "data-slot": "info-field-label",
                className: "text-xs font-medium tracking-wider text-muted-foreground uppercase",
                children: label
              }
            ),
            onLabelRow && control
          ] }),
          /* @__PURE__ */ jsxs13(
            "p",
            {
              "data-slot": "info-field-value",
              className: cn(
                "font-semibold",
                onLabelRow ? "truncate" : "gap-1 flex items-center"
              ),
              children: [
                value,
                !onLabelRow && control
              ]
            }
          )
        ] })
      ]
    }
  );
}
function InfoFieldGroup({ children, className }) {
  return /* @__PURE__ */ jsx13("div", { className: cn("space-y-4", className), children });
}

// src/blocks/localized-fields.tsx
import { jsx as jsx14, jsxs as jsxs14 } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsxs14(
    Tabs,
    {
      defaultValue: defaultLocale ?? locales[0],
      className: cn("w-full", className),
      children: [
        /* @__PURE__ */ jsx14(TabsList, { className: "mb-4 rounded-2xl p-1.5 flex h-auto w-full justify-start overflow-x-auto bg-muted", children: locales.map((locale) => /* @__PURE__ */ jsx14(
          TabsTrigger,
          {
            value: locale,
            className: "px-4 font-medium h-8 rounded-xl",
            children: localeLabels?.[locale] ?? locale.toUpperCase()
          },
          locale
        )) }),
        locales.map((locale) => /* @__PURE__ */ jsx14(TabsContent, { value: locale, className: "mt-0", children: /* @__PURE__ */ jsx14("div", { className: "gap-4 lg:grid-cols-2 grid", children: fields.map((field) => {
          const fieldId = `${field.name}-${locale}`;
          const error = errors?.[`${field.name}.${locale}`];
          const value = values[field.name]?.[locale] ?? "";
          return /* @__PURE__ */ jsxs14("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx14(Label, { htmlFor: fieldId, children: field.label }),
            field.type === "textarea" ? /* @__PURE__ */ jsx14(
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
            ) : /* @__PURE__ */ jsx14(
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
            error && /* @__PURE__ */ jsx14("p", { className: "text-xs font-medium text-destructive", children: error })
          ] }, field.name);
        }) }) }, locale))
      ]
    }
  );
}

// src/blocks/section-header.tsx
import { jsx as jsx15, jsxs as jsxs15 } from "react/jsx-runtime";
function SectionHeader({
  icon,
  title,
  description,
  control,
  className
}) {
  return /* @__PURE__ */ jsxs15(
    "div",
    {
      className: cn(
        "gap-4 sm:flex-row sm:items-center sm:justify-between flex flex-col",
        className
      ),
      children: [
        /* @__PURE__ */ jsxs15("div", { className: "gap-3 flex items-center", children: [
          icon,
          /* @__PURE__ */ jsxs15("div", { children: [
            /* @__PURE__ */ jsx15("h2", { className: "text-lg font-bold text-foreground", children: title }),
            description && /* @__PURE__ */ jsx15("p", { className: "text-sm font-medium text-muted-foreground", children: description })
          ] })
        ] }),
        control
      ]
    }
  );
}

// src/blocks/settings-card.tsx
import { jsx as jsx16, jsxs as jsxs16 } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsxs16(
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
        /* @__PURE__ */ jsxs16("div", { className: "gap-4 sm:flex-row sm:items-center sm:justify-between flex flex-col", children: [
          /* @__PURE__ */ jsxs16("div", { className: "gap-3 flex items-center", children: [
            /* @__PURE__ */ jsx16(
              "div",
              {
                className: cn(
                  "size-11 rounded-2xl flex items-center justify-center",
                  iconClassName ?? "bg-muted text-muted-foreground"
                ),
                children: /* @__PURE__ */ jsx16(Icon, { className: "size-5" })
              }
            ),
            /* @__PURE__ */ jsxs16("div", { children: [
              /* @__PURE__ */ jsx16("h2", { className: "text-lg font-bold text-foreground", children: title }),
              /* @__PURE__ */ jsx16("p", { className: "text-sm font-medium text-muted-foreground", children: description })
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
  return /* @__PURE__ */ jsxs16(
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
        (title || description) && /* @__PURE__ */ jsxs16("div", { children: [
          title && /* @__PURE__ */ jsx16("h3", { className: "text-sm font-semibold text-foreground", children: title }),
          description && /* @__PURE__ */ jsx16("p", { className: "mt-1 text-xs font-medium text-muted-foreground", children: description })
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
  return /* @__PURE__ */ jsxs16("div", { className: "gap-4 py-1 flex items-center justify-between", children: [
    /* @__PURE__ */ jsxs16("div", { className: "space-y-0.5", children: [
      /* @__PURE__ */ jsx16(
        Label,
        {
          htmlFor: id,
          className: "text-sm font-medium text-foreground",
          children: label
        }
      ),
      description && /* @__PURE__ */ jsx16("p", { className: "text-xs font-medium text-muted-foreground", children: description })
    ] }),
    /* @__PURE__ */ jsx16(
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
import { useId as useId2 } from "react";
import { jsx as jsx17, jsxs as jsxs17 } from "react/jsx-runtime";
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
  const generated = useId2();
  const fieldId = id ?? generated;
  return /* @__PURE__ */ jsxs17(
    "div",
    {
      "data-invalid": error ? true : void 0,
      className: cn("space-y-2 py-1", className),
      "data-slot": slotName,
      children: [
        /* @__PURE__ */ jsxs17(Label, { htmlFor: fieldId, children: [
          label,
          required && /* @__PURE__ */ jsx17(
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
        description && /* @__PURE__ */ jsx17(
          "p",
          {
            "data-slot": "settings-field-description",
            className: "text-xs font-medium text-muted-foreground",
            children: description
          }
        ),
        /* @__PURE__ */ jsx17(FieldError, { message: error })
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
  return /* @__PURE__ */ jsx17(SettingsField, { ...field, children: (fieldId) => /* @__PURE__ */ jsx17(
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
  return /* @__PURE__ */ jsx17(SettingsField, { ...field, children: (fieldId) => /* @__PURE__ */ jsx17(
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
  return /* @__PURE__ */ jsx17(SettingsField, { ...field, children: (fieldId) => /* @__PURE__ */ jsx17(
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
  return /* @__PURE__ */ jsx17(SettingsField, { ...field, children: (fieldId) => /* @__PURE__ */ jsxs17(
    Select,
    {
      value,
      onValueChange: onChange,
      disabled,
      children: [
        /* @__PURE__ */ jsx17(
          SelectTrigger,
          {
            id: fieldId,
            slotName,
            "aria-invalid": field.error ? true : void 0,
            children: /* @__PURE__ */ jsx17(SelectValue, { placeholder })
          }
        ),
        /* @__PURE__ */ jsx17(SelectContent, { children: options.map((option) => /* @__PURE__ */ jsx17(
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
import { jsx as jsx18, jsxs as jsxs18 } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsx18(SettingsLinkContext.Provider, { value: linkComponent, children: /* @__PURE__ */ jsxs18(
    "div",
    {
      className: cn(
        "gap-8 max-w-4xl mx-auto flex w-full flex-col",
        className
      ),
      "data-slot": slotName,
      children: [
        title && /* @__PURE__ */ jsx18(
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
  return /* @__PURE__ */ jsxs18(
    "section",
    {
      className: cn(
        "gap-6 mx-auto flex w-full flex-col",
        wide ? "max-w-4xl" : "max-w-2xl",
        className
      ),
      "data-slot": slotName,
      children: [
        backHref && /* @__PURE__ */ jsxs18(
          Link,
          {
            "data-slot": "settings-section-back",
            href: backHref,
            className: "gap-2 text-sm font-medium inline-flex w-fit items-center text-muted-foreground transition-colors hover:text-foreground",
            children: [
              /* @__PURE__ */ jsx18(ArrowLeft, { className: "size-4" }),
              labels.back
            ]
          }
        ),
        title && /* @__PURE__ */ jsx18(
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
  return /* @__PURE__ */ jsxs18(
    "div",
    {
      className: cn("gap-3 flex flex-col", className),
      "data-slot": slotName,
      children: [
        label && /* @__PURE__ */ jsx18("p", { className: "font-bold tracking-widest text-[11px] text-muted-foreground uppercase", children: label }),
        /* @__PURE__ */ jsx18(
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
  const card = /* @__PURE__ */ jsxs18(
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
        /* @__PURE__ */ jsx18(
          "span",
          {
            className: cn(
              "size-11 flex shrink-0 items-center justify-center rounded-full",
              iconClassName ?? "bg-primary/10 text-primary"
            ),
            children: /* @__PURE__ */ jsx18(Icon, { className: "size-5" })
          }
        ),
        /* @__PURE__ */ jsxs18("span", { className: "min-w-0 flex flex-1 flex-col", children: [
          /* @__PURE__ */ jsxs18("span", { className: "gap-2 flex items-center", children: [
            /* @__PURE__ */ jsx18("span", { className: "font-bold text-foreground", children: title }),
            badge
          ] }),
          description && /* @__PURE__ */ jsx18("span", { className: "text-sm font-medium text-muted-foreground", children: description })
        ] }),
        /* @__PURE__ */ jsx18(ChevronRight, { className: "size-4 shrink-0 text-muted-foreground" })
      ]
    }
  );
  if (disabled) {
    return /* @__PURE__ */ jsx18("div", { "data-disabled": "true", "aria-disabled": "true", "data-slot": slotName, children: card });
  }
  return /* @__PURE__ */ jsx18(
    Link,
    {
      href,
      className: cn(compactRadius, focusRing),
      "data-slot": slotName,
      children: card
    }
  );
}

// src/blocks/stat-breakdown-card.tsx
import { jsx as jsx19, jsxs as jsxs19 } from "react/jsx-runtime";
function StatBreakdownCard({
  title,
  icon,
  iconClassName = "bg-muted text-muted-foreground",
  value,
  secondaryValue,
  total,
  parts,
  breakdownLabel,
  trend,
  formatTrend,
  comparisonLabel,
  inset = false,
  className,
  slotName = "stat-breakdown-card"
}) {
  return /* @__PURE__ */ jsxs19(
    "div",
    {
      "data-inset": inset || void 0,
      className: cn(
        elevatedSurface,
        "p-6 gap-4 min-w-0 flex h-full flex-col bg-card text-card-foreground",
        inset && recessedSurface,
        className
      ),
      "data-slot": slotName,
      children: [
        /* @__PURE__ */ jsx19(
          StatCardHeader,
          {
            layout: "inline",
            title,
            icon,
            iconClassName,
            trend: resolveTrend(trend, formatTrend),
            comparisonLabel
          }
        ),
        /* @__PURE__ */ jsxs19("div", { className: "gap-6 lg:gap-10 lg:grid-cols-[minmax(10rem,auto)_1fr] lg:items-center grid", children: [
          /* @__PURE__ */ jsx19("div", { className: "min-w-0", children: /* @__PURE__ */ jsx19(StatFigure, { value, secondaryValue }) }),
          /* @__PURE__ */ jsxs19("div", { className: "gap-4 min-w-0 flex flex-col", children: [
            /* @__PURE__ */ jsx19(
              CompositionTrack,
              {
                parts,
                total,
                label: breakdownLabel ?? title
              }
            ),
            /* @__PURE__ */ jsx19("div", { className: "gap-4 sm:grid-cols-[repeat(auto-fit,minmax(8rem,1fr))] grid grid-cols-1", children: parts.map((part) => /* @__PURE__ */ jsxs19(
              "div",
              {
                className: "gap-1 min-w-0 flex flex-col",
                children: [
                  /* @__PURE__ */ jsxs19("span", { className: "gap-2 text-sm font-bold tracking-wider flex items-center break-words text-muted-foreground uppercase", children: [
                    /* @__PURE__ */ jsx19(
                      "span",
                      {
                        className: "size-2.5 shrink-0 rounded-md",
                        style: { backgroundColor: part.color }
                      }
                    ),
                    /* @__PURE__ */ jsx19("span", { className: "min-w-0 break-words", children: part.label })
                  ] }),
                  /* @__PURE__ */ jsxs19("span", { className: "text-xl font-bold break-words text-foreground tabular-nums", children: [
                    part.display,
                    " ",
                    /* @__PURE__ */ jsx19("span", { className: "text-xs font-medium text-muted-foreground", children: compositionShareLabel(part, total) })
                  ] })
                ]
              },
              part.id
            )) })
          ] })
        ] })
      ]
    }
  );
}

// src/blocks/stat-card.tsx
import { jsx as jsx20, jsxs as jsxs20 } from "react/jsx-runtime";
function StatCard({
  title,
  value,
  icon,
  iconClassName = "bg-muted text-muted-foreground",
  trend,
  formatTrend,
  comparisonLabel,
  layout = "stacked",
  secondaryValue,
  share,
  inset = false,
  className,
  slotName = "stat-card"
}) {
  const inline = layout === "inline";
  return /* @__PURE__ */ jsxs20(
    "div",
    {
      "data-inset": inset || void 0,
      className: cn(
        elevatedSurface,
        "p-6 min-w-0 flex h-full flex-col justify-between bg-card text-card-foreground",
        inline && "gap-4 justify-start",
        inset && recessedSurface,
        className
      ),
      "data-slot": slotName,
      children: [
        /* @__PURE__ */ jsx20(
          StatCardHeader,
          {
            layout,
            title,
            icon,
            iconClassName,
            trend: resolveTrend(trend, formatTrend),
            comparisonLabel
          }
        ),
        /* @__PURE__ */ jsxs20("div", { children: [
          !inline && /* @__PURE__ */ jsx20("p", { className: "mb-1 text-xs font-medium tracking-wider break-words text-muted-foreground uppercase", children: title }),
          /* @__PURE__ */ jsx20(StatFigure, { value, secondaryValue })
        ] }),
        share && /* @__PURE__ */ jsx20(
          StatShareBar,
          {
            share,
            title,
            tooltipValue: hasSecondaryValue(secondaryValue) ? secondaryValue : value
          }
        )
      ]
    }
  );
}
function StatsGrid({ children, className }) {
  return /* @__PURE__ */ jsx20(
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

// src/blocks/two-factor/verify-form.tsx
import { AlertCircle } from "lucide-react";
import { useId as useId3, useState as useState5 } from "react";
import { jsx as jsx21, jsxs as jsxs21 } from "react/jsx-runtime";
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
  onModeChange,
  slotName = "two-factor-verify-form"
}) {
  const text = useUiLabels("twoFactor", twoFactorLabels, labels);
  const fieldId = useId3();
  const [mode, setMode] = useState5("code");
  const [value, setValue] = useState5("");
  const [pending, setPending] = useState5(false);
  const [failure, setFailure] = useState5(null);
  const [dismissedErrors, setDismissedErrors] = useState5(null);
  const errorMessages = messageList(errors);
  const errorsKey = errorMessages.join("\n");
  if (dismissedErrors !== null && dismissedErrors !== errorsKey) {
    setDismissedErrors(null);
  }
  const messages = [
    ...errorsKey === dismissedErrors ? [] : errorMessages,
    ...messageList(failure)
  ];
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
      setDismissedErrors(null);
    }
  };
  const switchMode = () => {
    const next = mode === "code" ? "recovery" : "code";
    setMode(next);
    setValue("");
    setFailure(null);
    setDismissedErrors(errorsKey);
    onModeChange?.(next);
  };
  return /* @__PURE__ */ jsxs21(
    "form",
    {
      "data-mode": mode,
      "data-pending": pending || void 0,
      onSubmit: handleSubmit,
      className: cn("gap-5 flex w-full flex-col", className),
      "data-slot": slotName,
      children: [
        /* @__PURE__ */ jsxs21(
          "div",
          {
            "data-slot": "two-factor-code-field",
            className: "gap-2 flex flex-col text-center",
            children: [
              /* @__PURE__ */ jsx21(Label, { htmlFor: fieldId, children: mode === "code" ? text.codeLabel : text.recoveryCodeLabel }),
              mode === "code" ? /* @__PURE__ */ jsx21(
                InputOTP,
                {
                  id: fieldId,
                  "data-slot": "two-factor-code-input",
                  containerClassName: "justify-center",
                  maxLength: length,
                  value,
                  autoFocus,
                  disabled: pending,
                  onChange: setValue,
                  "aria-label": text.codeLabel,
                  children: /* @__PURE__ */ jsx21(InputOTPGroup, { children: Array.from({ length }, (_, index) => /* @__PURE__ */ jsx21(InputOTPSlot, { index }, index)) })
                }
              ) : /* @__PURE__ */ jsx21(
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
            ]
          }
        ),
        messages.length > 0 && /* @__PURE__ */ jsxs21(Alert, { variant: "destructive", slotName: "two-factor-error", children: [
          /* @__PURE__ */ jsx21(AlertCircle, {}),
          /* @__PURE__ */ jsx21(AlertDescription, { children: messages.map((message) => /* @__PURE__ */ jsx21("p", { children: message }, message)) })
        ] }),
        /* @__PURE__ */ jsxs21("div", { className: "gap-3 flex flex-col", children: [
          /* @__PURE__ */ jsx21(
            Button,
            {
              type: "submit",
              loading: pending,
              loadingLabel: text.verifyingLabel,
              disabled: !complete,
              children: submitLabel ?? text.verifyLabel
            }
          ),
          allowRecoveryCode && /* @__PURE__ */ jsx21(
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
import { useState as useState6 } from "react";
import { jsx as jsx22, jsxs as jsxs22 } from "react/jsx-runtime";
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
  const text = useUiLabels("twoFactor", twoFactorLabels, labels);
  const [mode, setMode] = useState6("code");
  return /* @__PURE__ */ jsxs22(
    "section",
    {
      className: cn("gap-6 flex w-full flex-col", className),
      "data-slot": slotName,
      children: [
        /* @__PURE__ */ jsxs22(
          "div",
          {
            "data-slot": "two-factor-challenge-header",
            className: "gap-2 flex flex-col text-center",
            children: [
              /* @__PURE__ */ jsx22("h2", { className: "text-2xl font-bold tracking-tight text-foreground", children: title ?? text.challengeTitle }),
              /* @__PURE__ */ jsx22("p", { className: "text-sm font-medium text-muted-foreground", children: description ?? (mode === "recovery" ? text.recoveryChallengeDescription : text.challengeDescription) })
            ]
          }
        ),
        /* @__PURE__ */ jsx22(
          TwoFactorVerifyForm,
          {
            autoFocus: true,
            allowRecoveryCode,
            errors,
            labels,
            footer,
            onSubmit,
            onModeChange: setMode
          }
        )
      ]
    }
  );
}

// src/blocks/two-factor/disable-button.tsx
import { ShieldOff } from "lucide-react";
import { useState as useState7 } from "react";
import { jsx as jsx23, jsxs as jsxs23 } from "react/jsx-runtime";
function TwoFactorDisableButton({
  onDisable,
  disabled = false,
  variant = "destructive",
  size = "default",
  labels,
  className,
  slotName = "two-factor-disable"
}) {
  const text = useUiLabels("twoFactor", twoFactorLabels, labels);
  const [open, setOpen] = useState7(false);
  const [processing, setProcessing] = useState7(false);
  const handleConfirm = async () => {
    setProcessing(true);
    try {
      await onDisable();
    } finally {
      setProcessing(false);
    }
  };
  return /* @__PURE__ */ jsxs23(
    "span",
    {
      "data-open": open || void 0,
      className: cn("inline-flex", className),
      "data-slot": slotName,
      children: [
        /* @__PURE__ */ jsxs23(
          Button,
          {
            type: "button",
            variant,
            size,
            disabled: disabled || processing,
            onClick: () => setOpen(true),
            children: [
              /* @__PURE__ */ jsx23(ShieldOff, {}),
              text.disableLabel
            ]
          }
        ),
        /* @__PURE__ */ jsx23(
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

// src/blocks/two-factor/enable-button.tsx
import { ShieldCheck } from "lucide-react";
import { jsx as jsx24, jsxs as jsxs24 } from "react/jsx-runtime";
function TwoFactorEnableButton({
  onEnable,
  processing = false,
  labels,
  className,
  slotName = "two-factor-enable"
}) {
  const text = useUiLabels("twoFactor", twoFactorLabels, labels);
  return /* @__PURE__ */ jsxs24(
    Button,
    {
      type: "button",
      loading: processing,
      onClick: onEnable,
      className,
      slotName,
      children: [
        /* @__PURE__ */ jsx24(ShieldCheck, {}),
        text.enableLabel
      ]
    }
  );
}

// src/blocks/two-factor/recovery-codes.tsx
import { Eye, EyeOff, RefreshCw } from "lucide-react";
import { useState as useState8 } from "react";
import { jsx as jsx25, jsxs as jsxs25 } from "react/jsx-runtime";
function TwoFactorRecoveryCodes({
  codes,
  defaultRevealed = false,
  onRegenerate,
  showHeading = true,
  labels,
  className,
  slotName = "two-factor-recovery-codes"
}) {
  const text = useUiLabels("twoFactor", twoFactorLabels, labels);
  const [revealed, setRevealed] = useState8(defaultRevealed);
  const [copyFailed, setCopyFailed] = useState8(false);
  const [regenerating, setRegenerating] = useState8(false);
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
  return /* @__PURE__ */ jsxs25(
    "div",
    {
      "data-revealed": revealed || void 0,
      className: cn("gap-4 flex w-full flex-col", className),
      "data-slot": slotName,
      children: [
        showHeading && /* @__PURE__ */ jsxs25("div", { className: "gap-1 flex flex-col", children: [
          /* @__PURE__ */ jsx25("p", { className: "text-sm font-semibold text-foreground", children: text.recoveryTitle }),
          /* @__PURE__ */ jsxs25("p", { className: "text-xs font-medium text-muted-foreground", children: [
            text.recoveryDescription,
            " ",
            text.recoveryWarning
          ] })
        ] }),
        revealed && /* @__PURE__ */ jsx25(
          "ul",
          {
            "data-slot": "two-factor-recovery-list",
            className: cn(
              recessedSurface,
              "gap-2 p-4 sm:grid-cols-2 grid"
            ),
            children: codes.map((code) => /* @__PURE__ */ jsx25(
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
        /* @__PURE__ */ jsxs25(
          "div",
          {
            "data-slot": "two-factor-recovery-actions",
            className: "gap-2 flex flex-wrap items-center justify-center",
            children: [
              /* @__PURE__ */ jsxs25(
                Button,
                {
                  type: "button",
                  variant: "ghost",
                  size: "sm",
                  "aria-pressed": revealed,
                  onClick: () => setRevealed(!revealed),
                  children: [
                    revealed ? /* @__PURE__ */ jsx25(EyeOff, {}) : /* @__PURE__ */ jsx25(Eye, {}),
                    revealed ? text.hideLabel : text.revealLabel
                  ]
                }
              ),
              /* @__PURE__ */ jsx25(
                CopyButton,
                {
                  value: codes.join("\n"),
                  copyLabel: text.copyLabel,
                  copiedLabel: text.copiedLabel,
                  onCopied: () => setCopyFailed(false),
                  onCopyFailed: () => setCopyFailed(true)
                }
              ),
              onRegenerate && /* @__PURE__ */ jsxs25(
                Button,
                {
                  type: "button",
                  variant: "outline",
                  size: "sm",
                  loading: regenerating,
                  loadingLabel: text.regenerateLabel,
                  onClick: handleRegenerate,
                  children: [
                    /* @__PURE__ */ jsx25(RefreshCw, {}),
                    text.regenerateLabel
                  ]
                }
              )
            ]
          }
        ),
        copyFailed && /* @__PURE__ */ jsx25(
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
import { useId as useId4, useState as useState9 } from "react";
import { jsx as jsx26, jsxs as jsxs26 } from "react/jsx-runtime";
var qrFrame = cn(
  controlRadius,
  "size-44 p-3 bg-white flex shrink-0 items-center justify-center [&_:is(svg,img,canvas)]:h-auto [&_:is(svg,img,canvas)]:max-h-full [&_:is(svg,img,canvas)]:max-w-full"
);
function TwoFactorScanStep({
  qrCode,
  qrCodeSvg,
  manualSetupKey,
  labels,
  className,
  slotName = "two-factor-scan-step"
}) {
  const text = useUiLabels("twoFactor", twoFactorLabels, labels);
  const [revealed, setRevealed] = useState9(false);
  const keyLabelId = useId4();
  const qrContent = qrCode ?? (qrCodeSvg ? /* @__PURE__ */ jsx26(
    "div",
    {
      "data-slot": "two-factor-qr-markup",
      className: "flex size-full items-center justify-center",
      dangerouslySetInnerHTML: { __html: qrCodeSvg }
    }
  ) : null);
  return /* @__PURE__ */ jsxs26(
    "div",
    {
      className: cn("gap-5 flex w-full flex-col", className),
      "data-slot": slotName,
      children: [
        /* @__PURE__ */ jsx26(
          "div",
          {
            "data-slot": "two-factor-qr",
            className: cn(
              recessedSurface,
              "p-4 flex items-center justify-center"
            ),
            children: qrContent ? /* @__PURE__ */ jsx26("div", { "data-slot": "two-factor-qr-frame", className: qrFrame, children: qrContent }) : /* @__PURE__ */ jsx26("p", { className: "text-sm font-medium text-muted-foreground", children: text.qrFallbackLabel })
          }
        ),
        manualSetupKey && /* @__PURE__ */ jsxs26(Field, { slotName: "two-factor-setup-key", children: [
          /* @__PURE__ */ jsx26(FieldLabel, { id: keyLabelId, children: text.manualKeyLabel }),
          /* @__PURE__ */ jsx26(FieldDescription, { children: text.manualKeyDescription }),
          /* @__PURE__ */ jsx26(FieldControl, { role: "group", "aria-labelledby": keyLabelId, children: /* @__PURE__ */ jsxs26(
            "div",
            {
              "data-slot": "two-factor-setup-key-field",
              className: cn(
                fieldSurface,
                "min-h-11 py-1 pl-4 pr-1 gap-1 flex w-full items-center"
              ),
              children: [
                /* @__PURE__ */ jsx26(
                  "code",
                  {
                    "data-slot": "two-factor-setup-key-value",
                    className: cn(
                      "min-w-0 font-medium font-mono flex-1",
                      revealed ? "break-all" : "truncate"
                    ),
                    children: revealed ? manualSetupKey : "\u2022".repeat(manualSetupKey.length)
                  }
                ),
                /* @__PURE__ */ jsx26(
                  Button,
                  {
                    type: "button",
                    variant: "ghost",
                    size: "icon-sm",
                    "aria-pressed": revealed,
                    "aria-label": revealed ? text.manualKeyHideLabel : text.manualKeyRevealLabel,
                    onClick: () => setRevealed(!revealed),
                    children: revealed ? /* @__PURE__ */ jsx26(EyeOff2, {}) : /* @__PURE__ */ jsx26(Eye2, {})
                  }
                ),
                /* @__PURE__ */ jsx26(
                  CopyButton,
                  {
                    value: manualSetupKey,
                    copyLabel: text.copyLabel,
                    copiedLabel: text.copiedLabel
                  }
                )
              ]
            }
          ) })
        ] })
      ]
    }
  );
}

// src/blocks/two-factor/setup-dialog.tsx
import { useEffect as useEffect4, useRef as useRef3, useState as useState10 } from "react";
import { jsx as jsx27, jsxs as jsxs27 } from "react/jsx-runtime";
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
  const text = useUiLabels("twoFactor", twoFactorLabels, labels);
  const [step, setStep] = useState10(
    enabled ? "recovery" : "scan"
  );
  const requestSetupData = useRef3(onRequestSetupData);
  const openedBefore = useRef3(false);
  useEffect4(() => {
    requestSetupData.current = onRequestSetupData;
  }, [onRequestSetupData]);
  useEffect4(() => {
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
  const action = {
    pending: null,
    scan: ready ? { label: text.continueLabel, onClick: () => setStep("confirm") } : null,
    confirm: null,
    recovery: { label: text.doneLabel, onClick: finish }
  }[step];
  return /* @__PURE__ */ jsx27(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxs27(
    DialogContent,
    {
      "data-step": step,
      className: cn(
        "max-w-md p-0 gap-0 flex max-h-[calc(100dvh-2rem)] flex-col",
        className
      ),
      slotName,
      children: [
        /* @__PURE__ */ jsxs27(DialogHeader, { className: "shrink-0", children: [
          /* @__PURE__ */ jsx27(DialogTitle, { children: heading }),
          /* @__PURE__ */ jsx27(DialogDescription, { children: description })
        ] }),
        /* @__PURE__ */ jsxs27(
          "div",
          {
            "data-slot": "two-factor-setup-body",
            className: cn(
              "gap-5 px-6 md:px-8 min-h-0 flex flex-1 flex-col overflow-y-auto",
              action ? "pb-5" : "pb-6 md:pb-8"
            ),
            children: [
              step === "scan" && (ready ? /* @__PURE__ */ jsx27(
                TwoFactorScanStep,
                {
                  qrCode,
                  qrCodeSvg,
                  manualSetupKey,
                  labels
                }
              ) : /* @__PURE__ */ jsxs27(
                "div",
                {
                  "data-slot": "two-factor-pending",
                  className: "gap-3 py-6 text-sm font-medium flex items-center justify-center text-muted-foreground",
                  children: [
                    /* @__PURE__ */ jsx27(Spinner, { label: text.pendingLabel }),
                    text.pendingLabel
                  ]
                }
              )),
              step === "confirm" && /* @__PURE__ */ jsx27(
                TwoFactorVerifyForm,
                {
                  autoFocus: true,
                  errors,
                  labels,
                  onSubmit: handleConfirm,
                  footer: /* @__PURE__ */ jsx27(
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
              step === "recovery" && /* @__PURE__ */ jsx27(
                TwoFactorRecoveryCodes,
                {
                  codes,
                  defaultRevealed: true,
                  showHeading: false,
                  labels,
                  onRegenerate: onRegenerateRecoveryCodes
                }
              )
            ]
          }
        ),
        action && /* @__PURE__ */ jsx27(
          "div",
          {
            "data-slot": "two-factor-setup-footer",
            className: "px-6 pb-6 md:px-8 md:pb-8 flex shrink-0 flex-col",
            children: /* @__PURE__ */ jsx27(Button, { type: "button", onClick: action.onClick, children: action.label })
          }
        )
      ]
    }
  ) });
}
export {
  BrandLogo,
  CommandPalette,
  CompositionBar,
  CompositionTrack,
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
  NotificationBell,
  NumberField,
  PasskeyItem,
  PasskeyList,
  PasskeyRegisterButton,
  PasskeySignInButton,
  SectionHeader,
  SelectField,
  SettingsCard,
  SettingsEntry,
  SettingsField,
  SettingsGroup,
  SettingsPage,
  SettingsPanel,
  SettingsSection,
  StatBreakdownCard,
  StatCard,
  StatsGrid,
  TextField,
  ToggleRow,
  TourProvider,
  TwoFactorChallenge,
  TwoFactorDisableButton,
  TwoFactorEnableButton,
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
  notificationBellLabels,
  passkeyLabels,
  resolveRelativeRange,
  resolveSteps,
  settingsLabels,
  shouldStartTour,
  stepsForBreakpoint,
  suggestPasskeyName,
  summariseDateFilter,
  twoFactorLabels,
  useCommandPalette,
  useDateFilter,
  useLoginFormContext,
  useTour,
  useTourController,
  useUiDateLocale,
  useUiLabels,
  useUiLocale
};
//# sourceMappingURL=blocks.js.map