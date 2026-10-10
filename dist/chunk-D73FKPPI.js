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
  Separator,
  NAVIGABLE_SCHEMES,
  normalizeUrl,
  hasNavigableScheme
};
//# sourceMappingURL=chunk-D73FKPPI.js.map