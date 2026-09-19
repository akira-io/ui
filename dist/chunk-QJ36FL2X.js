'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "./chunk-IGBMA6PI.js";
import {
  useSheetPortalContainer
} from "./chunk-EXTOGROG.js";
import {
  elevatedSurface,
  fieldFocus,
  fieldSurface,
  menuSurface,
  modalSurface,
  nestedSurfaceReset,
  panelSurface
} from "./chunk-TA3IKSIJ.js";
import {
  cn
} from "./chunk-XN5WW7OR.js";

// src/components/ui/command.tsx
import { Command as CommandPrimitive } from "cmdk";
import { SearchIcon, SearchXIcon } from "lucide-react";
import { jsx, jsxs } from "react/jsx-runtime";
function Command({
  className,
  slotName = "command",
  ...props
}) {
  return /* @__PURE__ */ jsx(
    CommandPrimitive,
    {
      className: cn(
        elevatedSurface,
        nestedSurfaceReset,
        "flex h-full w-full flex-col overflow-hidden bg-card text-card-foreground",
        className
      ),
      ...props,
      "data-slot": slotName
    }
  );
}
function CommandDialog({
  title = "Command Palette",
  description = "Search for a command to run...",
  children,
  className,
  hideCloseButton = true,
  ...props
}) {
  return /* @__PURE__ */ jsxs(Dialog, { ...props, children: [
    /* @__PURE__ */ jsxs(DialogHeader, { className: "sr-only", children: [
      /* @__PURE__ */ jsx(DialogTitle, { children: title }),
      /* @__PURE__ */ jsx(DialogDescription, { children: description })
    ] }),
    /* @__PURE__ */ jsx(
      DialogContent,
      {
        className: cn(
          `${modalSurface} gap-0 p-0 overflow-hidden`,
          className
        ),
        hideCloseButton,
        children: /* @__PURE__ */ jsx(Command, { className: "[&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-item]]:py-2.5 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5", children })
      }
    )
  ] });
}
function CommandInput({
  className,
  slotName = "command-input",
  ...props
}) {
  return /* @__PURE__ */ jsx("div", { className: "shrink-0 border-b border-border", children: /* @__PURE__ */ jsxs(
    "div",
    {
      "data-slot": "command-input-wrapper",
      className: cn(
        fieldSurface,
        "h-11 gap-3 px-4 m-3 flex items-center"
      ),
      children: [
        /* @__PURE__ */ jsx(SearchIcon, { className: "size-4 shrink-0 opacity-50" }),
        /* @__PURE__ */ jsx(
          CommandPrimitive.Input,
          {
            className: cn(
              "h-11 text-base sm:text-sm font-medium flex w-full bg-transparent outline-hidden placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
              className
            ),
            ...props,
            "data-slot": slotName
          }
        )
      ]
    }
  ) });
}
function CommandList({
  className,
  slotName = "command-list",
  ...props
}) {
  return /* @__PURE__ */ jsx(
    CommandPrimitive.List,
    {
      className: cn(
        "scroll-py-1 max-h-[300px] overflow-x-hidden overflow-y-auto",
        className
      ),
      ...props,
      "data-slot": slotName
    }
  );
}
function CommandEmpty({
  className,
  children,
  slotName = "command-empty",
  ...props
}) {
  return /* @__PURE__ */ jsxs(
    CommandPrimitive.Empty,
    {
      className: cn(
        "gap-3 px-6 py-10 flex flex-col items-center justify-center text-center",
        className
      ),
      ...props,
      "data-slot": slotName,
      children: [
        /* @__PURE__ */ jsx("span", { className: "size-10 flex items-center justify-center rounded-full bg-surface-recessed text-muted-foreground", children: /* @__PURE__ */ jsx(SearchXIcon, { className: "size-5" }) }),
        /* @__PURE__ */ jsx("span", { className: "text-sm text-muted-foreground", children })
      ]
    }
  );
}
function CommandGroup({
  className,
  slotName = "command-group",
  ...props
}) {
  return /* @__PURE__ */ jsx(
    CommandPrimitive.Group,
    {
      className: cn(
        "p-3 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium overflow-hidden text-foreground [&_[cmdk-group-heading]]:text-muted-foreground",
        className
      ),
      ...props,
      "data-slot": slotName
    }
  );
}
function CommandSeparator({
  className,
  slotName = "command-separator",
  ...props
}) {
  return /* @__PURE__ */ jsx(
    CommandPrimitive.Separator,
    {
      className: cn("mx-3 h-px bg-border", className),
      ...props,
      "data-slot": slotName
    }
  );
}
function CommandItem({
  className,
  slotName = "command-item",
  ...props
}) {
  return /* @__PURE__ */ jsx(
    CommandPrimitive.Item,
    {
      className: cn(
        "gap-2 px-2 py-1.5 text-sm [&_svg:not([class*='size-'])]:size-4 rounded-xl relative flex cursor-default items-center outline-hidden select-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='text-'])]:text-muted-foreground",
        className
      ),
      ...props,
      "data-slot": slotName
    }
  );
}
function CommandShortcut({
  className,
  slotName = "command-shortcut",
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "span",
    {
      className: cn(
        "text-xs tracking-widest ml-auto text-muted-foreground",
        className
      ),
      ...props,
      "data-slot": slotName
    }
  );
}

// src/components/ui/popover.tsx
import { Popover as PopoverPrimitive } from "radix-ui";
import * as React from "react";
import { jsx as jsx2 } from "react/jsx-runtime";
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
    return /* @__PURE__ */ jsx2(PopoverPrimitive.Portal, { container: portalContainer, children: /* @__PURE__ */ jsx2(
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
        "data-slot": slotName
      }
    ) });
  }
);
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

// src/components/ui/select.tsx
import * as SelectPrimitive from "@radix-ui/react-select";
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { jsx as jsx3, jsxs as jsxs2 } from "react/jsx-runtime";
function Select({
  slotName = "select",
  ...props
}) {
  return /* @__PURE__ */ jsx3(SelectPrimitive.Root, { ...props, "data-slot": slotName });
}
function SelectGroup({
  slotName = "select-group",
  ...props
}) {
  return /* @__PURE__ */ jsx3(SelectPrimitive.Group, { ...props, "data-slot": slotName });
}
function SelectValue({
  slotName = "select-value",
  ...props
}) {
  return /* @__PURE__ */ jsx3(SelectPrimitive.Value, { ...props, "data-slot": slotName });
}
function SelectTrigger({
  className,
  children,
  slotName = "select-trigger",
  ...props
}) {
  return /* @__PURE__ */ jsxs2(
    SelectPrimitive.Trigger,
    {
      className: cn(
        `${fieldSurface} h-11 px-4 font-medium *:data-[slot=select-value]:gap-2 [&_svg:not([class*='size-'])]:size-4 flex w-full items-center justify-between transition-[color,box-shadow] disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 data-[placeholder]:text-muted-foreground *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center [&_svg]:pointer-events-none [&_svg]:shrink-0 [&>span]:line-clamp-1 ${fieldFocus}`,
        className
      ),
      ...props,
      "data-slot": slotName,
      children: [
        children,
        /* @__PURE__ */ jsx3(SelectPrimitive.Icon, { asChild: true, children: /* @__PURE__ */ jsx3(ChevronDownIcon, { className: "size-4 opacity-50" }) })
      ]
    }
  );
}
function SelectContent({
  className,
  children,
  position = "popper",
  slotName = "select-content",
  container,
  ...props
}) {
  const portalContainer = useSheetPortalContainer(container);
  return /* @__PURE__ */ jsx3(SelectPrimitive.Portal, { container: portalContainer, children: /* @__PURE__ */ jsxs2(
    SelectPrimitive.Content,
    {
      className: cn(
        `${menuSurface} max-h-96 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 relative z-50 min-w-[8rem] overflow-hidden bg-popover/95`,
        position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className
      ),
      position,
      ...props,
      "data-slot": slotName,
      children: [
        /* @__PURE__ */ jsx3(SelectScrollUpButton, {}),
        /* @__PURE__ */ jsx3(
          SelectPrimitive.Viewport,
          {
            className: cn(
              "p-1",
              position === "popper" && "scroll-my-1 h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
            ),
            children
          }
        ),
        /* @__PURE__ */ jsx3(SelectScrollDownButton, {})
      ]
    }
  ) });
}
function SelectLabel({
  className,
  slotName = "select-label",
  ...props
}) {
  return /* @__PURE__ */ jsx3(
    SelectPrimitive.Label,
    {
      className: cn(
        "px-2 py-1.5 text-xs font-medium tracking-wider text-muted-foreground uppercase",
        className
      ),
      ...props,
      "data-slot": slotName
    }
  );
}
function SelectItem({
  className,
  children,
  slotName = "select-item",
  ...props
}) {
  return /* @__PURE__ */ jsxs2(
    SelectPrimitive.Item,
    {
      className: cn(
        "gap-2 rounded-xl py-1.5 pr-8 pl-2 text-sm [&_svg:not([class*='size-'])]:size-4 *:[span]:last:gap-2 focus:font-semibold relative flex w-full cursor-default items-center outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='text-'])]:text-muted-foreground *:[span]:last:flex *:[span]:last:items-center",
        className
      ),
      ...props,
      "data-slot": slotName,
      children: [
        /* @__PURE__ */ jsx3("span", { className: "right-2 size-3.5 absolute flex items-center justify-center", children: /* @__PURE__ */ jsx3(SelectPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx3(CheckIcon, { className: "size-4" }) }) }),
        /* @__PURE__ */ jsx3(SelectPrimitive.ItemText, { children })
      ]
    }
  );
}
function SelectSeparator({
  className,
  slotName = "select-separator",
  ...props
}) {
  return /* @__PURE__ */ jsx3(
    SelectPrimitive.Separator,
    {
      className: cn(
        "-mx-1 my-1 pointer-events-none h-px bg-border",
        className
      ),
      ...props,
      "data-slot": slotName
    }
  );
}
function SelectScrollUpButton({
  className,
  slotName = "select-scroll-up-button",
  ...props
}) {
  return /* @__PURE__ */ jsx3(
    SelectPrimitive.ScrollUpButton,
    {
      className: cn(
        "py-1 flex cursor-default items-center justify-center",
        className
      ),
      ...props,
      "data-slot": slotName,
      children: /* @__PURE__ */ jsx3(ChevronUpIcon, { className: "size-4" })
    }
  );
}
function SelectScrollDownButton({
  className,
  slotName = "select-scroll-down-button",
  ...props
}) {
  return /* @__PURE__ */ jsx3(
    SelectPrimitive.ScrollDownButton,
    {
      className: cn(
        "py-1 flex cursor-default items-center justify-center",
        className
      ),
      ...props,
      "data-slot": slotName,
      children: /* @__PURE__ */ jsx3(ChevronDownIcon, { className: "size-4" })
    }
  );
}

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandSeparator,
  CommandItem,
  CommandShortcut,
  Popover,
  PopoverTrigger,
  PopoverAnchor,
  PopoverContent,
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton
};
//# sourceMappingURL=chunk-QJ36FL2X.js.map