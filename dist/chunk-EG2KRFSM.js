import {
  Label
} from "./chunk-RE7X3RE5.js";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "./chunk-IGBMA6PI.js";
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
  cn
} from "./chunk-XN5WW7OR.js";

// src/components/ui/confirm-dialog.tsx
import { AlertCircle, ChevronRight } from "lucide-react";
import { useEffect, useId, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
var confirmDialogDefaultLabels = {
  title: "Confirm Action",
  description: "Are you sure you want to continue? This action cannot be undone.",
  confirmText: "Confirm",
  cancelText: "Cancel"
};
function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmText,
  cancelText,
  variant = "destructive",
  processing = false,
  requiredValue,
  requiredValueLabel = "Type {{value}} to confirm",
  onConfirm,
  onCancel,
  slotName = "confirm-dialog"
}) {
  const labels = useUiLabels("confirmDialog", confirmDialogDefaultLabels, {
    title,
    confirmText,
    cancelText
  });
  const resolvedDescription = description ?? labels.description;
  const inputId = useId();
  const [typedValue, setTypedValue] = useState("");
  const unlocked = requiredValue === void 0 || typedValue === requiredValue;
  useEffect(() => {
    if (!open) {
      setTypedValue("");
    }
  }, [open]);
  const handleConfirm = () => {
    if (processing || !unlocked) {
      return;
    }
    onConfirm();
    onOpenChange(false);
  };
  const handleCancel = () => {
    if (processing) {
      return;
    }
    onCancel?.();
    onOpenChange(false);
  };
  return /* @__PURE__ */ jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxs(DialogContent, { className: "max-w-md p-0", slotName, children: [
    /* @__PURE__ */ jsxs(DialogHeader, { className: "p-6 md:p-8", children: [
      /* @__PURE__ */ jsx("div", { className: "mb-6 flex justify-center", children: /* @__PURE__ */ jsx(
        "div",
        {
          className: cn(
            "size-16 rounded-3xl shadow-xl flex items-center justify-center",
            variant === "destructive" ? "bg-destructive text-destructive-foreground shadow-destructive/20" : "bg-primary text-primary-foreground shadow-primary/20"
          ),
          children: /* @__PURE__ */ jsx(AlertCircle, { className: "h-8 w-8" })
        }
      ) }),
      /* @__PURE__ */ jsx(DialogTitle, { children: labels.title }),
      /* @__PURE__ */ jsx(DialogDescription, { children: resolvedDescription })
    ] }),
    requiredValue !== void 0 && /* @__PURE__ */ jsxs(
      "div",
      {
        "data-slot": "confirm-dialog-gate",
        className: "gap-2 px-6 md:px-8 flex flex-col",
        children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: inputId, children: requiredValueLabel.replace(
            "{{value}}",
            requiredValue
          ) }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: inputId,
              value: typedValue,
              autoComplete: "off",
              disabled: processing,
              onChange: (event) => setTypedValue(event.target.value)
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsx(DialogFooter, { className: "p-6 md:p-8", children: /* @__PURE__ */ jsxs("div", { className: "gap-4 sm:grid-cols-2 grid w-full", children: [
      /* @__PURE__ */ jsx(
        Button,
        {
          type: "button",
          variant: "ghost",
          disabled: processing,
          onClick: handleCancel,
          className: "text-muted-foreground",
          children: labels.cancelText
        }
      ),
      /* @__PURE__ */ jsxs(
        Button,
        {
          variant,
          disabled: processing || !unlocked,
          onClick: handleConfirm,
          children: [
            labels.confirmText,
            /* @__PURE__ */ jsx(ChevronRight, { className: "ml-2 h-5 w-5" })
          ]
        }
      )
    ] }) })
  ] }) });
}

export {
  confirmDialogDefaultLabels,
  ConfirmDialog
};
//# sourceMappingURL=chunk-EG2KRFSM.js.map