import {
  cn
} from "./chunk-XN5WW7OR.js";

// src/components/ui/separator.tsx
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { jsx } from "react/jsx-runtime";
function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  slotName = "separator-root",
  ...props
}) {
  return /* @__PURE__ */ jsx(
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
  Separator
};
//# sourceMappingURL=chunk-XTWKLSUN.js.map