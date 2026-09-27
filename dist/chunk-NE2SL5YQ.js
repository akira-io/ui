import {
  fieldFocus,
  fieldSurface
} from "./chunk-TA3IKSIJ.js";
import {
  cn
} from "./chunk-XN5WW7OR.js";

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

export {
  Input
};
//# sourceMappingURL=chunk-NE2SL5YQ.js.map