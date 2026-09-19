import {
  cn
} from "./chunk-XN5WW7OR.js";

// src/components/ui/label.tsx
import * as LabelPrimitive from "@radix-ui/react-label";
import { jsx } from "react/jsx-runtime";
function Label({
  className,
  slotName = "label",
  ...props
}) {
  return /* @__PURE__ */ jsx(
    LabelPrimitive.Root,
    {
      className: cn(
        "text-sm font-medium text-foreground select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      ),
      ...props,
      "data-slot": slotName
    }
  );
}

export {
  Label
};
//# sourceMappingURL=chunk-RE7X3RE5.js.map