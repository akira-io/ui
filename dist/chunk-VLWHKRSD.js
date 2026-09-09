import {
  cn,
  elevatedSurface,
  flatSurface,
  recessedSurface
} from "./chunk-33SBGSQF.js";

// src/components/ui/card.tsx
import { cva } from "class-variance-authority";
import { jsx } from "react/jsx-runtime";
var cardVariants = cva(
  `relative flex flex-col gap-6 overflow-hidden text-card-foreground ${elevatedSurface}`,
  {
    variants: {
      variant: {
        default: "bg-card",
        subtle: "border-border/60 bg-card/40",
        solid: "bg-card",
        outlined: `bg-card border border-border ${flatSurface}`
      },
      interactive: {
        true: "transition-colors duration-200 hover:border-foreground/20",
        false: ""
      },
      padding: { none: "py-0", sm: "py-4", md: "py-6", lg: "py-8" }
    },
    defaultVariants: {
      variant: "default",
      interactive: false,
      padding: "md"
    }
  }
);
function Card({
  className,
  variant,
  interactive,
  padding,
  inset = false,
  flat = false,
  slotName = "card",
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-inset": inset || void 0,
      "data-flat": flat || void 0,
      className: cn(
        cardVariants({ variant, interactive, padding }),
        flat && flatSurface,
        inset && recessedSurface,
        className
      ),
      ...props,
      "data-slot": slotName
    }
  );
}
function CardHeader({
  className,
  slotName = "card-header",
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn("gap-1.5 px-6 flex flex-col", className),
      ...props,
      "data-slot": slotName
    }
  );
}
function CardTitle({
  className,
  slotName = "card-title",
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn("font-semibold leading-none", className),
      ...props,
      "data-slot": slotName
    }
  );
}
function CardDescription({
  className,
  slotName = "card-description",
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn("text-sm text-muted-foreground", className),
      ...props,
      "data-slot": slotName
    }
  );
}
function CardContent({
  className,
  slotName = "card-content",
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn("px-6", className),
      ...props,
      "data-slot": slotName
    }
  );
}
function CardFooter({
  className,
  slotName = "card-footer",
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn("px-6 flex items-center", className),
      ...props,
      "data-slot": slotName
    }
  );
}

export {
  cardVariants,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
};
//# sourceMappingURL=chunk-VLWHKRSD.js.map