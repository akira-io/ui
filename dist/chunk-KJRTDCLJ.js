import {
  elevatedSurface,
  nestedEdgeToEdge,
  nestedRadius,
  nestedSurfaceReset
} from "./chunk-TA3IKSIJ.js";
import {
  cn
} from "./chunk-XN5WW7OR.js";

// src/components/ui/table.tsx
import * as React from "react";
import { jsx } from "react/jsx-runtime";
var bleedEdges = "-mx-6 w-[calc(100%+3rem)] rounded-none bg-transparent shadow-none ring-0 backdrop-blur-none [&_td:first-child]:pl-6 [&_td:last-child]:pr-6 [&_th:first-child]:pl-6 [&_th:last-child]:pr-6";
var Table = React.forwardRef(
  ({ className, bleed = false, slotName = "table-container", ...props }, ref) => /* @__PURE__ */ jsx(
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
      children: /* @__PURE__ */ jsx(
        "div",
        {
          className: cn(
            nestedRadius,
            nestedSurfaceReset,
            nestedEdgeToEdge,
            "w-full overflow-x-auto",
            bleed && "rounded-none"
          ),
          children: /* @__PURE__ */ jsx(
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
var TableHeader = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("thead", { ref, className: cn("[&_tr]:border-b", className), ...props }));
TableHeader.displayName = "TableHeader";
var TableBody = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "tbody",
  {
    ref,
    className: cn("[&_tr:last-child]:border-0", className),
    ...props
  }
));
TableBody.displayName = "TableBody";
var TableFooter = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
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
var TableRow = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
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
var TableHead = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
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
var TableCell = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
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
var TableCaption = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
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

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption
};
//# sourceMappingURL=chunk-KJRTDCLJ.js.map