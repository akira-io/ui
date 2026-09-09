import {
  cn,
  fieldFocus,
  fieldSurface
} from "./chunk-33SBGSQF.js";

// src/components/ui/input.tsx
import { jsx } from "react/jsx-runtime";
function Input({
  className,
  type,
  slotName = "input",
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "input",
    {
      type,
      className: cn(
        `h-11 min-w-0 px-4 font-medium flex w-full transition-all placeholder:text-muted-foreground focus:bg-muted disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 ${fieldSurface} ${fieldFocus}`,
        className
      ),
      ...props,
      "data-slot": slotName
    }
  );
}

// src/components/ui/separator.tsx
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { jsx as jsx2 } from "react/jsx-runtime";
function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  slotName = "separator-root",
  ...props
}) {
  return /* @__PURE__ */ jsx2(
    SeparatorPrimitive.Root,
    {
      decorative,
      orientation,
      className: cn(
        "shrink-0 bg-border data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className
      ),
      ...props,
      "data-slot": slotName
    }
  );
}

export {
  Input,
  Separator
};
//# sourceMappingURL=chunk-OTLBSTHU.js.map