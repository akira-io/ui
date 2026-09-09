// src/lib/utils.ts
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// src/lib/language.ts
var surfaceRadius = "rounded-3xl";
var controlRadius = "rounded-2xl";
var compactRadius = "rounded-xl";
var glassEdge = "ring-1 ring-surface-ring backdrop-blur-2xl backdrop-saturate-150";
var elevatedSurface = `${glassEdge} ${surfaceRadius} border-0 shadow-(--glass-elevation)`;
var floatingSurface = `${glassEdge} border-0 bg-popover/85 text-popover-foreground shadow-(--glass-elevation)`;
var modalSurface = `${floatingSurface} ${surfaceRadius}`;
var panelSurface = `${floatingSurface} ${controlRadius}`;
var menuSurface = `${panelSurface} bg-popover/80`;
var flatSurface = "shadow-none ring-0";
var recessedSurface = `${controlRadius} border-0 bg-surface-recessed/30 text-foreground shadow-none ring-0 backdrop-blur-none`;
var nestedRadius = controlRadius;
var nestedSurfaceReset = "nested-surface:border-0 nested-surface:ring-0 nested-surface:bg-transparent nested-surface:shadow-none nested-surface:backdrop-blur-none";
var nestedEdgeToEdge = "nested-surface:rounded-none";
var glassControl = "ring-1 ring-surface-ring border-0 shadow-(--glass-shadow) backdrop-blur-md backdrop-saturate-150";
var controlFill = "bg-surface-control";
var fieldText = "text-base sm:text-sm";
var fieldSurface = `${glassControl} ${controlFill} ${controlRadius} ${fieldText} text-foreground`;
var focusRing = "focus-visible:outline-solid focus-visible:outline-1 focus-visible:outline-offset-0 focus-visible:outline-ring";
var fieldFocus = `${focusRing} focus-visible:shadow-(--glass-elevation)`;
var menuHighlight = "outline-hidden focus:bg-accent focus:text-accent-foreground";
var scrollEdgeTransition = "transition-shadow duration-200 ease-out";
var scrollShadowFromTop = "shadow-(--scroll-shadow-top)";
var scrollShadowFromBottom = "shadow-(--scroll-shadow-bottom)";
function surface(inset) {
  return inset ? `${elevatedSurface} ${recessedSurface}` : elevatedSurface;
}

// src/components/ui/button-variants.ts
import { cva } from "class-variance-authority";
import * as React from "react";
var buttonVariants = cva(
  `inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-2xl text-sm font-semibold transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 aria-invalid:ring-destructive/20 aria-invalid:border-destructive ${focusRing}`,
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-xl hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98]",
        destructive: "bg-destructive text-destructive-foreground shadow-xs hover:bg-destructive/90 focus-visible:outline-destructive",
        outline: `${glassControl} ${controlFill} hover:bg-accent hover:text-accent-foreground`,
        secondary: `${glassControl} bg-secondary/80 text-secondary-foreground hover:bg-secondary`,
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-11 px-4 has-[>svg]:gap-3",
        sm: "h-9 rounded-xl px-3 has-[>svg]:gap-2.5",
        lg: "h-12 px-6 has-[>svg]:gap-4 text-base",
        icon: "size-11",
        "icon-sm": "size-9 rounded-xl",
        "icon-lg": "size-12"
      },
      toned: {
        true: "focus-visible:outline-(--btn)",
        false: ""
      }
    },
    compoundVariants: [
      {
        toned: true,
        variant: "default",
        class: "bg-(--btn) text-(--btn-foreground) hover:bg-[color-mix(in_oklab,var(--btn)_90%,transparent)]"
      },
      {
        toned: true,
        variant: "destructive",
        class: "bg-(--btn) text-(--btn-foreground) hover:bg-[color-mix(in_oklab,var(--btn)_90%,transparent)]"
      },
      {
        toned: true,
        variant: "outline",
        class: "bg-transparent text-(--btn) ring-[color-mix(in_oklab,var(--btn)_30%,transparent)] hover:bg-[color-mix(in_oklab,var(--btn)_10%,transparent)] hover:text-(--btn)"
      },
      {
        toned: true,
        variant: "secondary",
        class: "bg-[color-mix(in_oklab,var(--btn)_14%,transparent)] text-(--btn) hover:bg-[color-mix(in_oklab,var(--btn)_22%,transparent)]"
      },
      {
        toned: true,
        variant: "ghost",
        class: "text-(--btn) hover:bg-[color-mix(in_oklab,var(--btn)_12%,transparent)] hover:text-(--btn)"
      },
      {
        toned: true,
        variant: "link",
        class: "text-(--btn)"
      }
    ],
    defaultVariants: {
      variant: "default",
      size: "default",
      toned: false
    }
  }
);
var BUTTON_TONES = {
  primary: "primary",
  destructive: "destructive",
  success: "success",
  warning: "warning",
  info: "info"
};
function toneVariables(tone) {
  const token = BUTTON_TONES[tone];
  return {
    "--btn": `var(--${token})`,
    "--btn-foreground": `var(--${token}-foreground)`
  };
}
function spinnerSize(size) {
  if (size === "sm" || size === "icon-sm") return "sm";
  if (size === "lg" || size === "icon-lg") return "lg";
  return "default";
}
var ICON_PADDING = {
  default: { leading: "pl-3", trailing: "pr-2" },
  sm: { leading: "pl-2.5", trailing: "pr-1.5" },
  lg: { leading: "pl-4", trailing: "pr-3" },
  icon: { leading: "", trailing: "" },
  "icon-sm": { leading: "", trailing: "" },
  "icon-lg": { leading: "", trailing: "" }
};
function iconPadding(size, children) {
  const parts = React.Children.toArray(children).filter(
    (part) => typeof part !== "string" || part.trim() !== ""
  );
  if (parts.length < 2) {
    return "";
  }
  const edges = ICON_PADDING[size];
  return cn(
    React.isValidElement(parts[0]) && edges.leading,
    React.isValidElement(parts[parts.length - 1]) && edges.trailing
  );
}
function loadingPadding(size) {
  if (size === "sm") return "px-2.5";
  if (size === "lg") return "px-5";
  if (size === "default") return "px-3";
  return void 0;
}

// src/components/ui/spinner.tsx
import { cva as cva2 } from "class-variance-authority";
import { LoaderCircle } from "lucide-react";
import { jsx, jsxs } from "react/jsx-runtime";
var spinnerVariants = cva2("inline-flex shrink-0", {
  variants: {
    size: {
      sm: "size-3.5",
      default: "size-4",
      lg: "size-5"
    }
  },
  defaultVariants: {
    size: "default"
  }
});
function Spinner({
  className,
  label = "Loading",
  size = "default",
  slotName = "spinner",
  ...props
}) {
  return /* @__PURE__ */ jsxs(
    "span",
    {
      ...props,
      "data-size": size,
      role: "status",
      className: cn(spinnerVariants({ size }), className),
      "data-slot": slotName,
      children: [
        /* @__PURE__ */ jsx(
          LoaderCircle,
          {
            "aria-hidden": "true",
            className: "animate-spin size-full text-current motion-reduce:animate-none"
          }
        ),
        /* @__PURE__ */ jsx("span", { className: "sr-only", children: label })
      ]
    }
  );
}

// src/components/ui/button.tsx
import { Slot } from "@radix-ui/react-slot";
import * as React2 from "react";
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
function Button({
  className,
  variant = "default",
  size = "default",
  tone,
  style,
  asChild = false,
  loading,
  loadingLabel = "Loading",
  slotName = "button",
  disabled,
  children,
  onClick,
  ...props
}) {
  const isLoading = loading === true;
  const hasLoadingState = loading !== void 0;
  const resolvedSize = size ?? "default";
  const baseClasses = buttonVariants({
    variant,
    size: resolvedSize,
    toned: tone !== void 0
  });
  const styles = tone ? { ...toneVariables(tone), ...style } : style;
  const classes = cn(
    baseClasses,
    iconPadding(resolvedSize, children),
    className
  );
  const loadingClasses = cn(
    baseClasses,
    loadingPadding(resolvedSize),
    className
  );
  if (asChild) {
    const Comp = asChild ? Slot : "button";
    const mappedSpinnerSize2 = spinnerSize(resolvedSize);
    const slottedChild = React2.isValidElement(children) ? children : void 0;
    const items2 = React2.Children.toArray(slottedChild?.props.children);
    const first2 = items2[0];
    const iconOnly2 = resolvedSize.startsWith("icon");
    const hasLeadingVisual2 = React2.isValidElement(first2) && (items2.length > 1 || iconOnly2);
    const leadingVisual2 = hasLeadingVisual2 ? first2 : void 0;
    const label2 = hasLeadingVisual2 ? items2.slice(1) : items2;
    const slottedChildren = hasLoadingState && slottedChild ? React2.cloneElement(
      slottedChild,
      isLoading ? {
        onClick(event) {
          event.preventDefault();
          event.stopPropagation();
        }
      } : void 0,
      /* @__PURE__ */ jsxs2(
        "span",
        {
          "data-slot": "button-content",
          className: "inline-flex items-center gap-[inherit]",
          children: [
            /* @__PURE__ */ jsx2(
              "span",
              {
                "data-slot": "button-leading",
                className: cn(
                  "inline-grid shrink-0 place-items-center",
                  spinnerVariants({ size: mappedSpinnerSize2 })
                ),
                children: isLoading ? /* @__PURE__ */ jsx2(
                  Spinner,
                  {
                    size: mappedSpinnerSize2,
                    label: loadingLabel,
                    className: "size-full"
                  }
                ) : leadingVisual2
              }
            ),
            /* @__PURE__ */ jsx2("span", { "data-slot": "button-label", children: label2 }),
            !hasLeadingVisual2 && !iconOnly2 && /* @__PURE__ */ jsx2(
              "span",
              {
                "aria-hidden": "true",
                "data-slot": "button-balance",
                className: spinnerVariants({
                  size: mappedSpinnerSize2
                })
              }
            )
          ]
        }
      )
    ) : children;
    return /* @__PURE__ */ jsx2(
      Comp,
      {
        ...props,
        "data-slot": slotName,
        "data-variant": variant,
        "data-tone": tone,
        style: styles,
        "data-size": resolvedSize,
        "data-loading": isLoading || void 0,
        className: hasLoadingState ? loadingClasses : classes,
        disabled: disabled || isLoading,
        "aria-busy": isLoading ? true : props["aria-busy"],
        "aria-disabled": isLoading ? true : props["aria-disabled"],
        onClick: isLoading ? void 0 : onClick,
        children: slottedChildren
      }
    );
  }
  if (loading === void 0) {
    return /* @__PURE__ */ jsx2(
      "button",
      {
        ...props,
        "data-slot": slotName,
        "data-variant": variant,
        "data-tone": tone,
        style: styles,
        "data-size": resolvedSize,
        className: classes,
        disabled,
        onClick,
        children
      }
    );
  }
  const items = React2.Children.toArray(children);
  const first = items[0];
  const iconOnly = resolvedSize.startsWith("icon");
  const hasLeadingVisual = React2.isValidElement(first) && (items.length > 1 || iconOnly);
  const leadingVisual = hasLeadingVisual ? first : void 0;
  const label = hasLeadingVisual ? items.slice(1) : items;
  const mappedSpinnerSize = spinnerSize(resolvedSize);
  return /* @__PURE__ */ jsx2(
    "button",
    {
      ...props,
      "data-slot": slotName,
      "data-variant": variant,
      "data-tone": tone,
      style: styles,
      "data-size": resolvedSize,
      "data-loading": isLoading || void 0,
      className: loadingClasses,
      disabled: disabled || isLoading,
      "aria-busy": isLoading ? true : props["aria-busy"],
      onClick,
      children: /* @__PURE__ */ jsxs2(
        "span",
        {
          "data-slot": "button-content",
          className: "inline-flex items-center gap-[inherit]",
          children: [
            /* @__PURE__ */ jsx2(
              "span",
              {
                "data-slot": "button-leading",
                className: cn(
                  "inline-grid shrink-0 place-items-center",
                  spinnerVariants({ size: mappedSpinnerSize })
                ),
                children: isLoading ? /* @__PURE__ */ jsx2(
                  Spinner,
                  {
                    size: mappedSpinnerSize,
                    label: loadingLabel,
                    className: "size-full"
                  }
                ) : leadingVisual
              }
            ),
            /* @__PURE__ */ jsx2("span", { "data-slot": "button-label", children: label }),
            !hasLeadingVisual && !iconOnly && /* @__PURE__ */ jsx2(
              "span",
              {
                "aria-hidden": "true",
                "data-slot": "button-balance",
                className: spinnerVariants({
                  size: mappedSpinnerSize
                })
              }
            )
          ]
        }
      )
    }
  );
}

export {
  cn,
  controlRadius,
  compactRadius,
  elevatedSurface,
  floatingSurface,
  modalSurface,
  panelSurface,
  menuSurface,
  flatSurface,
  recessedSurface,
  nestedRadius,
  nestedSurfaceReset,
  nestedEdgeToEdge,
  glassControl,
  controlFill,
  fieldSurface,
  focusRing,
  fieldFocus,
  menuHighlight,
  scrollEdgeTransition,
  scrollShadowFromTop,
  scrollShadowFromBottom,
  surface,
  buttonVariants,
  spinnerVariants,
  Spinner,
  Button
};
//# sourceMappingURL=chunk-33SBGSQF.js.map