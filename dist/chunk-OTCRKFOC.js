import {
  FieldContext,
  FieldError,
  useField
} from "./chunk-5NZLIF7G.js";
import {
  Label
} from "./chunk-RE7X3RE5.js";
import {
  useUiLabels
} from "./chunk-DVCOHMNY.js";
import {
  Input
} from "./chunk-NE2SL5YQ.js";
import {
  Button
} from "./chunk-4MAAVDUX.js";
import {
  elevatedSurface,
  focusRing
} from "./chunk-TA3IKSIJ.js";
import {
  cn
} from "./chunk-XN5WW7OR.js";

// src/components/ui/alert.tsx
import { cva } from "class-variance-authority";
import { jsx } from "react/jsx-runtime";
var alertVariants = cva(
  `${elevatedSurface} relative w-full px-5 py-4 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current`,
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground",
        destructive: "border-destructive/30 bg-destructive/10 text-destructive [&>svg]:text-current *:data-[slot=alert-description]:text-destructive/80",
        warning: "ring-warning/20 bg-warning/10 text-warning *:data-[slot=alert-description]:text-warning/80",
        info: "ring-info/20 bg-info/10 text-info *:data-[slot=alert-description]:text-info/80"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
var alertDefaultLabels = {
  warningLabel: "Warning",
  infoLabel: "Information"
};
var SEVERITY_LABELS = {
  warning: "warningLabel",
  info: "infoLabel"
};
function Alert({
  className,
  variant,
  labels,
  slotName = "alert",
  ...props
}) {
  const resolved = useUiLabels("alert", alertDefaultLabels, labels);
  const severity = variant ? SEVERITY_LABELS[variant] : void 0;
  return /* @__PURE__ */ jsx(
    "div",
    {
      role: "alert",
      "aria-label": severity ? resolved[severity] : void 0,
      className: cn(alertVariants({ variant }), className),
      ...props,
      "data-slot": slotName
    }
  );
}
function AlertTitle({
  className,
  slotName = "alert-title",
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn(
        "min-h-4 font-medium tracking-tight col-start-2 line-clamp-1",
        className
      ),
      ...props,
      "data-slot": slotName
    }
  );
}
function AlertDescription({
  className,
  slotName = "alert-description",
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn(
        "gap-1 text-sm [&_p]:leading-relaxed col-start-2 grid justify-items-start text-muted-foreground",
        className
      ),
      ...props,
      "data-slot": slotName
    }
  );
}

// src/components/ui/checkbox.tsx
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon } from "lucide-react";
import { jsx as jsx2 } from "react/jsx-runtime";
function Checkbox({
  className,
  slotName = "checkbox",
  ...props
}) {
  return /* @__PURE__ */ jsx2(
    CheckboxPrimitive.Root,
    {
      className: cn(
        `peer size-5 shadow-xs shrink-0 rounded-md border border-border transition-all disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground ${focusRing}`,
        className
      ),
      ...props,
      "data-slot": slotName,
      children: /* @__PURE__ */ jsx2(
        CheckboxPrimitive.Indicator,
        {
          "data-slot": "checkbox-indicator",
          className: "flex items-center justify-center text-current transition-none",
          children: /* @__PURE__ */ jsx2(CheckIcon, { className: "size-3.5" })
        }
      )
    }
  );
}

// src/components/ui/field.tsx
import { Slot } from "@radix-ui/react-slot";
import * as React from "react";
import { Fragment, jsx as jsx3, jsxs } from "react/jsx-runtime";
var fieldLabels = {
  requiredLabel: "Required"
};
function Field({
  className,
  children,
  id,
  orientation = "vertical",
  error,
  invalid,
  required = false,
  slotName = "field",
  ...props
}) {
  const generatedId = React.useId();
  const fieldId = id ?? generatedId;
  const [hasDescription, setHasDescription] = React.useState(false);
  const isInvalid = invalid ?? Boolean(error);
  const field = React.useMemo(
    () => ({
      controlId: fieldId,
      descriptionId: `${fieldId}-description`,
      errorId: `${fieldId}-error`,
      orientation,
      invalid: isInvalid,
      required,
      hasDescription,
      setHasDescription
    }),
    [fieldId, orientation, isInvalid, required, hasDescription]
  );
  return /* @__PURE__ */ jsx3(FieldContext.Provider, { value: field, children: /* @__PURE__ */ jsxs(
    "div",
    {
      "data-orientation": orientation,
      "data-invalid": isInvalid ? "true" : void 0,
      className: cn(
        "group/field",
        orientation === "horizontal" ? "gap-x-4 gap-y-1 grid grid-cols-[1fr_auto] items-center" : "gap-2 flex flex-col",
        className
      ),
      ...props,
      "data-slot": slotName,
      children: [
        children,
        /* @__PURE__ */ jsx3(FieldError, { message: error })
      ]
    }
  ) });
}
function FieldGroup({
  className,
  slotName = "field-group",
  ...props
}) {
  return /* @__PURE__ */ jsx3(
    "div",
    {
      className: cn("gap-6 flex w-full flex-col", className),
      ...props,
      "data-slot": slotName
    }
  );
}
function FieldLabel({
  className,
  children,
  requiredLabel,
  slotName = "field-label",
  ...props
}) {
  const { controlId, invalid, required } = useField();
  const labels = useUiLabels("field", fieldLabels, { requiredLabel });
  return /* @__PURE__ */ jsxs(
    Label,
    {
      htmlFor: controlId,
      className: cn(
        "gap-1 flex items-center group-data-[orientation=horizontal]/field:col-start-1 group-data-[orientation=horizontal]/field:row-start-1",
        invalid && "text-destructive",
        className
      ),
      ...props,
      slotName,
      children: [
        children,
        required ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx3(
            "span",
            {
              "data-slot": "field-required",
              "aria-hidden": "true",
              className: "text-destructive",
              children: "*"
            }
          ),
          /* @__PURE__ */ jsx3("span", { className: "sr-only", children: labels.requiredLabel })
        ] }) : null
      ]
    }
  );
}
function FieldDescription({
  className,
  slotName = "field-description",
  ...props
}) {
  const { descriptionId, setHasDescription } = useField();
  React.useEffect(() => {
    setHasDescription(true);
    return () => setHasDescription(false);
  }, [setHasDescription]);
  return /* @__PURE__ */ jsx3(
    "p",
    {
      id: descriptionId,
      className: cn(
        "ml-1 text-xs font-medium text-muted-foreground group-data-[orientation=horizontal]/field:col-start-1 group-data-[orientation=horizontal]/field:row-start-2",
        className
      ),
      ...props,
      "data-slot": slotName
    }
  );
}
function FieldControl({
  className,
  ...props
}) {
  const {
    controlId,
    descriptionId,
    errorId,
    invalid,
    required,
    hasDescription
  } = useField();
  const requiredProps = required ? { required: true } : {};
  const describedBy = [
    hasDescription ? descriptionId : null,
    invalid ? errorId : null
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ jsx3(
    Slot,
    {
      "data-field-control": "true",
      id: controlId,
      "aria-describedby": describedBy || void 0,
      "aria-invalid": invalid ? true : void 0,
      ...requiredProps,
      className: cn(
        "group-data-[orientation=horizontal]/field:col-start-2 group-data-[orientation=horizontal]/field:row-span-2 group-data-[orientation=horizontal]/field:row-start-1 group-data-[orientation=horizontal]/field:justify-self-end",
        className
      ),
      ...props
    }
  );
}

// src/components/ui/password-input.tsx
import { Eye, EyeOff } from "lucide-react";
import * as React2 from "react";
import { jsx as jsx4, jsxs as jsxs2 } from "react/jsx-runtime";
var passwordInputDefaultLabels = {
  showLabel: "Show password",
  hideLabel: "Hide password"
};
function PasswordInput({
  className,
  revealable = true,
  showLabel,
  hideLabel,
  slotName = "password-input",
  ...props
}) {
  const labels = useUiLabels("passwordInput", passwordInputDefaultLabels, {
    showLabel,
    hideLabel
  });
  const [visible, setVisible] = React2.useState(false);
  return /* @__PURE__ */ jsxs2("div", { className: "relative w-full", "data-slot": slotName, children: [
    /* @__PURE__ */ jsx4(
      Input,
      {
        type: visible ? "text" : "password",
        className: cn(revealable && "pr-12", className),
        ...props
      }
    ),
    revealable ? /* @__PURE__ */ jsx4(
      Button,
      {
        type: "button",
        variant: "ghost",
        size: "icon-sm",
        slotName: "password-input-toggle",
        "aria-label": visible ? labels.hideLabel : labels.showLabel,
        "aria-pressed": visible,
        disabled: props.disabled,
        onMouseDown: (event) => event.preventDefault(),
        onClick: () => setVisible((current) => !current),
        className: "right-1 absolute top-1/2 -translate-y-1/2",
        children: visible ? /* @__PURE__ */ jsx4(EyeOff, { "aria-hidden": "true" }) : /* @__PURE__ */ jsx4(Eye, { "aria-hidden": "true" })
      }
    ) : null
  ] });
}

export {
  alertDefaultLabels,
  Alert,
  AlertTitle,
  AlertDescription,
  Checkbox,
  fieldLabels,
  Field,
  FieldGroup,
  FieldLabel,
  FieldDescription,
  FieldControl,
  passwordInputDefaultLabels,
  PasswordInput
};
//# sourceMappingURL=chunk-OTCRKFOC.js.map