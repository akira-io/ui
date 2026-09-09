import {
  cn,
  modalSurface
} from "./chunk-33SBGSQF.js";

// src/components/ui/dialog.tsx
import { XIcon } from "lucide-react";
import { Dialog as DialogPrimitive } from "radix-ui";
import { jsx, jsxs } from "react/jsx-runtime";
function Dialog({
  slotName = "dialog",
  ...props
}) {
  return /* @__PURE__ */ jsx(DialogPrimitive.Root, { ...props, "data-slot": slotName });
}
function DialogTrigger({
  slotName = "dialog-trigger",
  ...props
}) {
  return /* @__PURE__ */ jsx(DialogPrimitive.Trigger, { ...props, "data-slot": slotName });
}
function DialogPortal({
  slotName = "dialog-portal",
  ...props
}) {
  return /* @__PURE__ */ jsx(DialogPrimitive.Portal, { ...props, "data-slot": slotName });
}
function DialogClose({
  slotName = "dialog-close",
  ...props
}) {
  return /* @__PURE__ */ jsx(DialogPrimitive.Close, { ...props, "data-slot": slotName });
}
function DialogOverlay({
  className,
  slotName = "dialog-overlay",
  ...props
}) {
  return /* @__PURE__ */ jsx(
    DialogPrimitive.Overlay,
    {
      className: cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 inset-0 bg-black/60 backdrop-blur-sm fixed z-50",
        className
      ),
      ...props,
      "data-slot": slotName
    }
  );
}
function DialogContent({
  className,
  children,
  hideCloseButton = false,
  slotName = "dialog-content",
  ...props
}) {
  return /* @__PURE__ */ jsxs(DialogPortal, { slotName: "dialog-portal", children: [
    /* @__PURE__ */ jsx(DialogOverlay, {}),
    /* @__PURE__ */ jsxs(
      DialogPrimitive.Content,
      {
        className: cn(
          `${modalSurface} data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 gap-6 p-6 sm:w-full sm:max-w-lg fixed top-[50%] left-[50%] z-50 grid w-[calc(100%-2rem)] max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] overflow-hidden duration-200`,
          className
        ),
        ...props,
        "data-slot": slotName,
        children: [
          children,
          !hideCloseButton && /* @__PURE__ */ jsxs(DialogPrimitive.Close, { className: "top-6 right-6 h-10 w-10 shadow-xs absolute z-50 flex items-center justify-center rounded-full border border-border bg-muted text-muted-foreground transition-colors hover:bg-accent hover:text-foreground", children: [
            /* @__PURE__ */ jsx(XIcon, { className: "h-5 w-5" }),
            /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close" })
          ] })
        ]
      }
    )
  ] });
}
function DialogHeader({
  className,
  slotName = "dialog-header",
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn(
        "gap-2 p-6 md:p-8 flex flex-col text-center",
        className
      ),
      ...props,
      "data-slot": slotName
    }
  );
}
function DialogFooter({
  className,
  slotName = "dialog-footer",
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn(
        "gap-3 p-6 md:p-8 sm:flex-row sm:justify-end flex flex-col-reverse border-t border-border",
        className
      ),
      ...props,
      "data-slot": slotName
    }
  );
}
function DialogTitle({
  className,
  slotName = "dialog-title",
  ...props
}) {
  return /* @__PURE__ */ jsx(
    DialogPrimitive.Title,
    {
      className: cn(
        "text-2xl font-bold tracking-tight md:text-3xl text-foreground",
        className
      ),
      ...props,
      "data-slot": slotName
    }
  );
}
function DialogDescription({
  className,
  slotName = "dialog-description",
  ...props
}) {
  return /* @__PURE__ */ jsx(
    DialogPrimitive.Description,
    {
      className: cn(
        "text-base font-medium leading-relaxed text-muted-foreground",
        className
      ),
      ...props,
      "data-slot": slotName
    }
  );
}

export {
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogClose,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription
};
//# sourceMappingURL=chunk-VSDPJW6I.js.map