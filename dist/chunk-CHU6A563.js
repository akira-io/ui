import {
  controlFill,
  focusRing,
  glassControl
} from "./chunk-TA3IKSIJ.js";
import {
  cn
} from "./chunk-XN5WW7OR.js";

// src/components/ui/toggle.tsx
import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cva } from "class-variance-authority";
import { jsx } from "react/jsx-runtime";
var toggleVariants = cva(
  `inline-flex items-center justify-center gap-2 rounded-xl text-sm font-medium hover:bg-muted hover:text-muted-foreground disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:font-semibold data-[state=on]:text-accent-foreground [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 transition-[color,box-shadow] aria-invalid:ring-destructive/20 aria-invalid:border-destructive ${focusRing}`,
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline: `${glassControl} ${controlFill} hover:bg-accent hover:text-accent-foreground`
      },
      size: {
        default: "h-11 px-4 min-w-11",
        sm: "h-9 px-3 min-w-9",
        lg: "h-12 px-6 min-w-12"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function Toggle({
  className,
  variant,
  size,
  slotName = "toggle",
  ...props
}) {
  return /* @__PURE__ */ jsx(
    TogglePrimitive.Root,
    {
      className: cn(toggleVariants({ variant, size, className })),
      ...props,
      "data-slot": slotName
    }
  );
}

// src/lib/safe-url.ts
var STRIPPED_BY_THE_URL_PARSER = /[\t\n\r]/g;
var EDGE_C0_OR_SPACE = /^[\u0000-\u0020]+|[\u0000-\u0020]+$/g;
var SCHEME = /^([a-z][a-z0-9+.-]*):/i;
var NAVIGABLE_SCHEMES = ["http", "https", "mailto", "tel"];
function normalizeUrl(url) {
  return url.replace(STRIPPED_BY_THE_URL_PARSER, "").replace(EDGE_C0_OR_SPACE, "");
}
function hasNavigableScheme(url) {
  const scheme = SCHEME.exec(normalizeUrl(url))?.[1]?.toLowerCase();
  return scheme === void 0 || NAVIGABLE_SCHEMES.includes(scheme);
}

export {
  toggleVariants,
  Toggle,
  NAVIGABLE_SCHEMES,
  normalizeUrl,
  hasNavigableScheme
};
//# sourceMappingURL=chunk-CHU6A563.js.map