import {
  useUiLabels
} from "./chunk-LIFCF5RY.js";
import {
  cn
} from "./chunk-XN5WW7OR.js";

// src/components/ui/empty-state.tsx
import { SearchX } from "lucide-react";
import { jsx, jsxs } from "react/jsx-runtime";
var emptyStateLabels = {
  title: "Nothing to show"
};
function EmptyState({
  icon: Icon = SearchX,
  title,
  description,
  actions,
  compact = false,
  className,
  slotName = "empty-state"
}) {
  const labels = useUiLabels("emptyState", emptyStateLabels, { title });
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
        /* @__PURE__ */ jsx(
          "span",
          {
            "data-slot": "empty-state-icon",
            className: cn(
              "flex shrink-0 items-center justify-center rounded-full bg-surface-recessed text-muted-foreground",
              compact ? "size-8" : "size-10"
            ),
            children: /* @__PURE__ */ jsx(Icon, { className: compact ? "size-4" : "size-5" })
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
              /* @__PURE__ */ jsx(
                "p",
                {
                  "data-slot": "empty-state-title",
                  className: cn(
                    "font-semibold text-foreground",
                    compact ? "text-sm" : "text-base"
                  ),
                  children: labels.title
                }
              ),
              description && /* @__PURE__ */ jsx(
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
        actions && /* @__PURE__ */ jsx(
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
  emptyStateLabels,
  EmptyState
};
//# sourceMappingURL=chunk-SETXGJEJ.js.map