import {
  ConfirmDialog
} from "./chunk-EG2KRFSM.js";
import {
  Card
} from "./chunk-FHM5GJ2N.js";
import {
  FieldError
} from "./chunk-5NZLIF7G.js";
import {
  Label
} from "./chunk-RE7X3RE5.js";
import {
  Badge,
  EmptyState
} from "./chunk-SSMR2HNC.js";
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
  compactRadius,
  controlRadius,
  recessedSurface
} from "./chunk-TA3IKSIJ.js";
import {
  cn
} from "./chunk-XN5WW7OR.js";

// src/blocks/passkeys/device-name.ts
var BROWSERS = [
  [/Edg|Edge/, "Edge"],
  [/OPR|Opera|OPiOS/, "Opera"],
  [/Firefox|FxiOS/, "Firefox"],
  [/Chrome|CriOS/, "Chrome"],
  [/Safari/, "Safari"]
];
var SYSTEMS = [
  [/iPhone/, "iPhone"],
  [/iPad/, "iPad"],
  [/Android/, "Android"],
  [/Macintosh|Mac OS/, "Mac"],
  [/Windows/, "Windows"]
];
function firstMatch(userAgent, table) {
  return table.find(([pattern]) => pattern.test(userAgent))?.[1];
}
function suggestPasskeyName(userAgent, deviceName) {
  const browser = firstMatch(userAgent, BROWSERS);
  const system = firstMatch(userAgent, SYSTEMS);
  if (browser && system) {
    return deviceName(browser, system);
  }
  return browser ?? system ?? "";
}

// src/blocks/passkeys/types.ts
var passkeyLabels = {
  signInLabel: "Sign in with a passkey",
  signingInLabel: "Signing in",
  unsupportedLabel: "Passkeys are not supported in this browser.",
  addLabel: "Add passkey",
  nameLabel: "Passkey name",
  namePlaceholder: "For example MacBook Pro or iPhone",
  nameDescription: "A name helps you recognise this passkey later.",
  deviceNameLabel: (browser, system) => `${browser} on ${system}`,
  registerLabel: "Register passkey",
  registeringLabel: "Registering",
  cancelLabel: "Cancel",
  errorFallbackLabel: "That did not work. Try again.",
  createdLabel: (when) => `Added ${when}`,
  lastUsedLabel: (when) => `Last used ${when}`,
  deleteLabel: (name) => `Remove ${name}`,
  deleteTitle: "Remove passkey",
  deleteDescription: (name) => `You will no longer be able to sign in with "${name}".`,
  deleteConfirmLabel: "Remove passkey",
  deleteCancelLabel: "Cancel",
  emptyTitle: "No passkeys yet",
  emptyDescription: "Add a passkey to sign in without a password."
};

// src/blocks/passkeys/item.tsx
import { KeyRound, Trash2 } from "lucide-react";
import { useState } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
function PasskeyItem({
  passkey,
  onDelete,
  labels,
  className,
  slotName = "passkey-item"
}) {
  const text = useUiLabels("passkeys", passkeyLabels, labels);
  const [open, setOpen] = useState(false);
  const [processing, setProcessing] = useState(false);
  const handleConfirm = async () => {
    setProcessing(true);
    try {
      await onDelete(passkey);
      setOpen(false);
    } catch {
      setOpen(true);
    } finally {
      setProcessing(false);
    }
  };
  return /* @__PURE__ */ jsxs(
    "li",
    {
      className: cn(
        compactRadius,
        "gap-3 px-3 py-3 flex items-center justify-between",
        className
      ),
      "data-slot": slotName,
      children: [
        /* @__PURE__ */ jsxs("div", { className: "gap-3 min-w-0 flex items-center", children: [
          /* @__PURE__ */ jsx("span", { className: "size-11 flex shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary", children: /* @__PURE__ */ jsx(KeyRound, { className: "size-5" }) }),
          /* @__PURE__ */ jsxs("div", { className: "gap-0.5 min-w-0 flex flex-col", children: [
            /* @__PURE__ */ jsxs("div", { className: "gap-2 flex flex-wrap items-center", children: [
              /* @__PURE__ */ jsx("p", { className: "font-bold truncate text-foreground", children: passkey.name }),
              passkey.authenticator ? /* @__PURE__ */ jsx(Badge, { variant: "outline", children: passkey.authenticator }) : null
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "text-sm font-medium text-muted-foreground", children: [
              text.createdLabel(passkey.createdAt),
              passkey.lastUsedAt ? /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx("span", { "aria-hidden": "true", className: "mx-1.5", children: "\xB7" }),
                text.lastUsedLabel(passkey.lastUsedAt)
              ] }) : null
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx(
          Button,
          {
            type: "button",
            variant: "ghost",
            size: "icon",
            className: "text-destructive hover:bg-destructive/10 hover:text-destructive",
            "aria-label": text.deleteLabel(passkey.name),
            onClick: () => setOpen(true),
            children: /* @__PURE__ */ jsx(Trash2, {})
          }
        ),
        /* @__PURE__ */ jsx(
          ConfirmDialog,
          {
            open,
            onOpenChange: setOpen,
            title: text.deleteTitle,
            description: text.deleteDescription(passkey.name),
            confirmText: text.deleteConfirmLabel,
            cancelText: text.deleteCancelLabel,
            processing,
            onConfirm: handleConfirm
          }
        )
      ]
    }
  );
}

// src/blocks/passkeys/list.tsx
import { KeyRound as KeyRound2 } from "lucide-react";
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
function PasskeyList({
  passkeys,
  onDelete,
  children,
  labels,
  className,
  slotName = "passkey-list"
}) {
  const text = useUiLabels("passkeys", passkeyLabels, labels);
  return /* @__PURE__ */ jsxs2(
    "div",
    {
      className: cn("gap-4 flex flex-col", className),
      "data-slot": slotName,
      children: [
        passkeys.length > 0 ? /* @__PURE__ */ jsx2(Card, { padding: "none", slotName: `${slotName}-frame`, children: /* @__PURE__ */ jsx2("ul", { className: "gap-1 p-2 flex flex-col", children: passkeys.map((passkey) => /* @__PURE__ */ jsx2(
          PasskeyItem,
          {
            passkey,
            onDelete,
            labels
          },
          passkey.id
        )) }) }) : /* @__PURE__ */ jsx2(
          "div",
          {
            className: cn(
              controlRadius,
              "border border-dashed border-border"
            ),
            "data-slot": `${slotName}-frame`,
            children: /* @__PURE__ */ jsx2(
              EmptyState,
              {
                icon: KeyRound2,
                title: text.emptyTitle,
                description: text.emptyDescription,
                className: "py-10"
              }
            )
          }
        ),
        children
      ]
    }
  );
}

// src/blocks/passkeys/register-button.tsx
import { Plus } from "lucide-react";
import { useId, useState as useState2 } from "react";
import { jsx as jsx3, jsxs as jsxs3 } from "react/jsx-runtime";
function browserUserAgent() {
  return typeof navigator === "undefined" ? "" : navigator.userAgent;
}
function PasskeyRegisterButton({
  onRegister,
  supported = true,
  processing = false,
  error,
  defaultName,
  labels,
  className,
  slotName = "passkey-register"
}) {
  const text = useUiLabels("passkeys", passkeyLabels, labels);
  const inputId = useId();
  const [open, setOpen] = useState2(false);
  const [name, setName] = useState2("");
  const [running, setRunning] = useState2(false);
  const [failed, setFailed] = useState2(false);
  if (!supported) {
    return /* @__PURE__ */ jsx3(
      "p",
      {
        className: cn(
          "text-sm font-medium text-muted-foreground",
          className
        ),
        "data-slot": slotName,
        children: text.unsupportedLabel
      }
    );
  }
  const busy = processing || running;
  const trimmed = name.trim();
  const message = error ?? (failed ? text.errorFallbackLabel : null);
  const openForm = () => {
    setName(
      defaultName ?? suggestPasskeyName(browserUserAgent(), text.deviceNameLabel)
    );
    setFailed(false);
    setOpen(true);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!trimmed) {
      return;
    }
    setRunning(true);
    setFailed(false);
    try {
      await onRegister(trimmed);
      setOpen(false);
    } catch {
      setFailed(true);
    } finally {
      setRunning(false);
    }
  };
  if (!open) {
    return /* @__PURE__ */ jsx3("div", { className, "data-slot": slotName, children: /* @__PURE__ */ jsxs3(Button, { type: "button", variant: "outline", onClick: openForm, children: [
      /* @__PURE__ */ jsx3(Plus, {}),
      text.addLabel
    ] }) });
  }
  return /* @__PURE__ */ jsxs3(
    "form",
    {
      onSubmit: handleSubmit,
      className: cn(
        recessedSurface,
        "gap-4 p-4 flex flex-col",
        className
      ),
      "data-slot": slotName,
      "data-open": true,
      children: [
        /* @__PURE__ */ jsxs3("div", { className: "gap-2 flex flex-col", children: [
          /* @__PURE__ */ jsx3(Label, { htmlFor: inputId, children: text.nameLabel }),
          /* @__PURE__ */ jsx3(
            Input,
            {
              id: inputId,
              value: name,
              onChange: (event) => setName(event.target.value),
              placeholder: text.namePlaceholder,
              autoFocus: true
            }
          ),
          /* @__PURE__ */ jsx3("p", { className: "text-xs font-medium text-muted-foreground", children: text.nameDescription })
        ] }),
        message ? /* @__PURE__ */ jsx3(FieldError, { message, className: "ml-0" }) : null,
        /* @__PURE__ */ jsxs3("div", { className: "gap-2 flex flex-wrap items-center", children: [
          /* @__PURE__ */ jsx3(
            Button,
            {
              type: "submit",
              loading: busy,
              loadingLabel: text.registeringLabel,
              disabled: busy || !trimmed,
              children: text.registerLabel
            }
          ),
          /* @__PURE__ */ jsx3(
            Button,
            {
              type: "button",
              variant: "ghost",
              onClick: () => setOpen(false),
              children: text.cancelLabel
            }
          )
        ] })
      ]
    }
  );
}

// src/blocks/passkeys/sign-in-button.tsx
import { KeyRound as KeyRound3 } from "lucide-react";
import { useState as useState3 } from "react";
import { jsx as jsx4, jsxs as jsxs4 } from "react/jsx-runtime";
function PasskeySignInButton({
  onSignIn,
  supported = true,
  processing = false,
  error,
  labels,
  className,
  slotName = "passkey-sign-in"
}) {
  const text = useUiLabels("passkeys", passkeyLabels, labels);
  const [running, setRunning] = useState3(false);
  if (!supported) {
    return null;
  }
  const busy = processing || running;
  const handleClick = async () => {
    setRunning(true);
    try {
      await onSignIn();
    } finally {
      setRunning(false);
    }
  };
  return /* @__PURE__ */ jsxs4(
    "div",
    {
      className: cn("gap-2 flex flex-col", className),
      "data-slot": slotName,
      children: [
        /* @__PURE__ */ jsxs4(
          Button,
          {
            type: "button",
            variant: "outline",
            className: "w-full",
            loading: busy,
            loadingLabel: text.signingInLabel,
            disabled: busy,
            onClick: handleClick,
            children: [
              /* @__PURE__ */ jsx4(KeyRound3, {}),
              text.signInLabel
            ]
          }
        ),
        error ? /* @__PURE__ */ jsx4(FieldError, { message: error, className: "ml-0 text-center" }) : null
      ]
    }
  );
}

export {
  suggestPasskeyName,
  passkeyLabels,
  PasskeyItem,
  PasskeyList,
  PasskeyRegisterButton,
  PasskeySignInButton
};
//# sourceMappingURL=chunk-LDFF7IB7.js.map