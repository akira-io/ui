import {
  useUiLabels
} from "./chunk-ZZDRO234.js";
import {
  Button
} from "./chunk-33SBGSQF.js";

// src/components/ui/copy-button.tsx
import { Check, Copy } from "lucide-react";
import * as React from "react";
import { jsx, jsxs } from "react/jsx-runtime";
var copyButtonLabels = {
  copyLabel: "Copy",
  copiedLabel: "Copied"
};
async function writeToClipboard(value) {
  const clipboard = globalThis.navigator?.clipboard;
  if (typeof clipboard?.writeText !== "function") {
    throw new Error("The clipboard is not available in this context.");
  }
  await clipboard.writeText(value);
}
function CopyButton({
  value,
  copyLabel,
  copiedLabel,
  acknowledgementDuration = 2e3,
  onCopied,
  onCopyFailed,
  onClick,
  variant = "ghost",
  size = "icon-sm",
  tone,
  className,
  slotName = "copy-button",
  ...props
}) {
  const labels = useUiLabels("copyButton", copyButtonLabels, {
    copyLabel,
    copiedLabel
  });
  const [copied, setCopied] = React.useState(false);
  const timer = React.useRef(void 0);
  React.useEffect(() => () => clearTimeout(timer.current), []);
  async function copy(event) {
    onClick?.(event);
    try {
      await writeToClipboard(value);
    } catch (reason) {
      onCopyFailed?.(reason);
      return;
    }
    setCopied(true);
    onCopied?.(value);
    clearTimeout(timer.current);
    timer.current = setTimeout(
      () => setCopied(false),
      acknowledgementDuration
    );
  }
  return /* @__PURE__ */ jsx(
    Button,
    {
      asChild: true,
      variant,
      size,
      tone,
      className,
      children: /* @__PURE__ */ jsxs(
        "button",
        {
          ...props,
          type: "button",
          "data-copied": copied || void 0,
          "aria-label": copied ? labels.copiedLabel : labels.copyLabel,
          onClick: copy,
          "data-slot": slotName,
          children: [
            copied ? /* @__PURE__ */ jsx(Check, { "aria-hidden": "true" }) : /* @__PURE__ */ jsx(Copy, { "aria-hidden": "true" }),
            /* @__PURE__ */ jsx(
              "span",
              {
                "data-slot": "copy-button-status",
                role: "status",
                "aria-live": "polite",
                className: "sr-only",
                children: copied ? labels.copiedLabel : ""
              }
            )
          ]
        }
      )
    }
  );
}

export {
  copyButtonLabels,
  CopyButton
};
//# sourceMappingURL=chunk-4DMNLMQR.js.map