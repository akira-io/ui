import {
  cn
} from "./chunk-XN5WW7OR.js";

// src/components/ui/badge.tsx
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { jsx } from "react/jsx-runtime";
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
  variant,
  asChild = false,
  slotName = "badge",
  ...props
}) {
  const Comp = asChild ? Slot : "span";
  return /* @__PURE__ */ jsx(
    Comp,
    {
      className: cn(badgeVariants({ variant }), className),
      ...props,
      "data-slot": slotName
    }
  );
}

// src/components/ui/empty-state.tsx
import { SearchX } from "lucide-react";
import { jsx as jsx2, jsxs } from "react/jsx-runtime";
var emptyStateLabels = {
  title: "Nothing to show"
};
function EmptyState({
  icon: Icon = SearchX,
  title = emptyStateLabels.title,
  description,
  actions,
  compact = false,
  className,
  slotName = "empty-state"
}) {
  return /* @__PURE__ */ jsxs(
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
        /* @__PURE__ */ jsx2(
          "span",
          {
            "data-slot": "empty-state-icon",
            className: cn(
              "flex shrink-0 items-center justify-center rounded-full bg-surface-recessed text-muted-foreground",
              compact ? "size-8" : "size-10"
            ),
            children: /* @__PURE__ */ jsx2(Icon, { className: compact ? "size-4" : "size-5" })
          }
        ),
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: cn(
              "max-w-md flex flex-col",
              compact ? "gap-0.5" : "gap-1"
            ),
            children: [
              /* @__PURE__ */ jsx2(
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
              description && /* @__PURE__ */ jsx2(
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
        actions && /* @__PURE__ */ jsx2(
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

export {
  badgeVariants,
  Badge,
  emptyStateLabels,
  EmptyState
};
//# sourceMappingURL=chunk-SSMR2HNC.js.map