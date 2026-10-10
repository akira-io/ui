import {
  cn
} from "./chunk-XN5WW7OR.js";

// src/components/ui/field-context.ts
import * as React from "react";
var FieldContext = React.createContext(null);
function useOptionalField() {
  return React.useContext(FieldContext);
}
function useField() {
  const field = useOptionalField();
  if (!field) {
    throw new Error("Field parts must be rendered inside a Field.");
  }
  return field;
}

// src/components/ui/field-error.tsx
import { jsx } from "react/jsx-runtime";
function FieldError({
  message,
  className,
  slotName = "field-error",
  ...props
}) {
  const field = useOptionalField();
  if (!message) {
    return null;
  }
  return /* @__PURE__ */ jsx(
    "p",
    {
      id: field?.errorId,
      className: cn(
        "ml-1 text-xs font-medium text-destructive group-data-[orientation=horizontal]/field:col-span-2 group-data-[orientation=horizontal]/field:row-start-3",
        className
      ),
      ...props,
      "data-slot": slotName,
      children: message
    }
  );
}

export {
  FieldContext,
  useOptionalField,
  useField,
  FieldError
};
//# sourceMappingURL=chunk-I3CQ5BM3.js.map