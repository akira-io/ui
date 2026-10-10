import {
  useSheetPortalContainer
} from "./chunk-EXTOGROG.js";
import {
  panelSurface
} from "./chunk-H26GY6FP.js";
import {
  cn
} from "./chunk-XN5WW7OR.js";

// src/components/ui/popover.tsx
import { Popover as PopoverPrimitive } from "radix-ui";
import * as React from "react";
import { jsx } from "react/jsx-runtime";
var Popover = PopoverPrimitive.Root;
var PopoverTrigger = PopoverPrimitive.Trigger;
var PopoverAnchor = PopoverPrimitive.Anchor;
var PopoverContent = React.forwardRef(
  ({
    className,
    align = "center",
    sideOffset = 4,
    slotName = "popover-content",
    container,
    ...props
  }, ref) => {
    const portalContainer = useSheetPortalContainer(container);
    return /* @__PURE__ */ jsx(PopoverPrimitive.Portal, { container: portalContainer, children: /* @__PURE__ */ jsx(
      PopoverPrimitive.Content,
      {
        ref,
        align,
        sideOffset,
        className: cn(
          `${panelSurface} p-4 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-full origin-[--radix-popover-content-transform-origin] bg-popover/90 outline-none`,
          className
        ),
        ...props,
        "data-surface": "",
        "data-slot": slotName
      }
    ) });
  }
);
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export {
  Popover,
  PopoverTrigger,
  PopoverAnchor,
  PopoverContent
};
//# sourceMappingURL=chunk-4SF3ZO5K.js.map