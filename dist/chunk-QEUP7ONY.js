import {
  useSheetPortalContainer
} from "./chunk-EXTOGROG.js";
import {
  menuSurface
} from "./chunk-TA3IKSIJ.js";
import {
  cn
} from "./chunk-XN5WW7OR.js";

// src/components/ui/dropdown-menu.tsx
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react";
import { jsx, jsxs } from "react/jsx-runtime";
function DropdownMenu({
  modal = false,
  slotName = "dropdown-menu",
  ...props
}) {
  return /* @__PURE__ */ jsx(
    DropdownMenuPrimitive.Root,
    {
      modal,
      ...props,
      "data-slot": slotName
    }
  );
}
function DropdownMenuPortal({
  slotName = "dropdown-menu-portal",
  ...props
}) {
  return /* @__PURE__ */ jsx(DropdownMenuPrimitive.Portal, { ...props, "data-slot": slotName });
}
function DropdownMenuTrigger({
  slotName = "dropdown-menu-trigger",
  ...props
}) {
  return /* @__PURE__ */ jsx(DropdownMenuPrimitive.Trigger, { ...props, "data-slot": slotName });
}
function DropdownMenuContent({
  className,
  sideOffset = 4,
  slotName = "dropdown-menu-content",
  container,
  ...props
}) {
  const portalContainer = useSheetPortalContainer(container);
  return /* @__PURE__ */ jsx(DropdownMenuPrimitive.Portal, { container: portalContainer, children: /* @__PURE__ */ jsx(
    DropdownMenuPrimitive.Content,
    {
      sideOffset,
      className: cn(
        `${menuSurface} data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 p-1.5 z-50 min-w-[8rem] overflow-hidden`,
        className
      ),
      ...props,
      "data-slot": slotName
    }
  ) });
}
function DropdownMenuGroup({
  slotName = "dropdown-menu-group",
  ...props
}) {
  return /* @__PURE__ */ jsx(DropdownMenuPrimitive.Group, { ...props, "data-slot": slotName });
}
function DropdownMenuItem({
  className,
  inset,
  variant = "default",
  slotName = "dropdown-menu-item",
  ...props
}) {
  return /* @__PURE__ */ jsx(
    DropdownMenuPrimitive.Item,
    {
      "data-inset": inset,
      "data-variant": variant,
      className: cn(
        "font-medium gap-2 rounded-xl px-2 py-2 text-sm data-[inset]:pl-8 [&_svg:not([class*='size-'])]:size-5 focus:font-semibold relative flex cursor-default items-center outline-hidden transition-all select-none focus:bg-primary/10 focus:text-primary data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='text-'])]:text-muted-foreground data-[variant=destructive]:*:[svg]:!text-destructive",
        className
      ),
      ...props,
      "data-slot": slotName
    }
  );
}
function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  slotName = "dropdown-menu-checkbox-item",
  ...props
}) {
  return /* @__PURE__ */ jsxs(
    DropdownMenuPrimitive.CheckboxItem,
    {
      className: cn(
        "gap-2 py-1.5 pr-2 pl-8 text-sm [&_svg:not([class*='size-'])]:size-4 rounded-xl relative flex cursor-default items-center outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className
      ),
      checked,
      ...props,
      "data-slot": slotName,
      children: [
        /* @__PURE__ */ jsx("span", { className: "left-2 size-3.5 pointer-events-none absolute flex items-center justify-center", children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(CheckIcon, { className: "size-4" }) }) }),
        children
      ]
    }
  );
}
function DropdownMenuRadioGroup({
  slotName = "dropdown-menu-radio-group",
  ...props
}) {
  return /* @__PURE__ */ jsx(DropdownMenuPrimitive.RadioGroup, { ...props, "data-slot": slotName });
}
function DropdownMenuRadioItem({
  className,
  children,
  slotName = "dropdown-menu-radio-item",
  ...props
}) {
  return /* @__PURE__ */ jsxs(
    DropdownMenuPrimitive.RadioItem,
    {
      className: cn(
        "gap-2 py-1.5 pr-2 pl-8 text-sm [&_svg:not([class*='size-'])]:size-4 rounded-xl relative flex cursor-default items-center outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className
      ),
      ...props,
      "data-slot": slotName,
      children: [
        /* @__PURE__ */ jsx("span", { className: "left-2 size-3.5 pointer-events-none absolute flex items-center justify-center", children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(CircleIcon, { className: "size-2 fill-current" }) }) }),
        children
      ]
    }
  );
}
function DropdownMenuLabel({
  className,
  inset,
  slotName = "dropdown-menu-label",
  ...props
}) {
  return /* @__PURE__ */ jsx(
    DropdownMenuPrimitive.Label,
    {
      "data-inset": inset,
      className: cn(
        "px-2 py-2 text-xs font-medium tracking-wider data-[inset]:pl-8 text-muted-foreground uppercase",
        className
      ),
      ...props,
      "data-slot": slotName
    }
  );
}
function DropdownMenuSeparator({
  className,
  slotName = "dropdown-menu-separator",
  ...props
}) {
  return /* @__PURE__ */ jsx(
    DropdownMenuPrimitive.Separator,
    {
      className: cn("-mx-1 my-1 h-px bg-border", className),
      ...props,
      "data-slot": slotName
    }
  );
}
function DropdownMenuShortcut({
  className,
  slotName = "dropdown-menu-shortcut",
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
function DropdownMenuSub({
  slotName = "dropdown-menu-sub",
  ...props
}) {
  return /* @__PURE__ */ jsx(DropdownMenuPrimitive.Sub, { ...props, "data-slot": slotName });
}
function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  slotName = "dropdown-menu-sub-trigger",
  ...props
}) {
  return /* @__PURE__ */ jsxs(
    DropdownMenuPrimitive.SubTrigger,
    {
      "data-inset": inset,
      className: cn(
        "font-medium rounded-xl px-2 py-2 text-sm data-[inset]:pl-8 focus:font-semibold data-[state=open]:font-semibold flex cursor-default items-center outline-hidden transition-all select-none focus:bg-primary/10 focus:text-primary data-[state=open]:bg-primary/10 data-[state=open]:text-primary",
        className
      ),
      ...props,
      "data-slot": slotName,
      children: [
        children,
        /* @__PURE__ */ jsx(ChevronRightIcon, { className: "size-4 ml-auto" })
      ]
    }
  );
}
function DropdownMenuSubContent({
  className,
  slotName = "dropdown-menu-sub-content",
  ...props
}) {
  return /* @__PURE__ */ jsx(
    DropdownMenuPrimitive.SubContent,
    {
      className: cn(
        `${menuSurface} data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 p-1.5 z-50 min-w-[8rem] overflow-hidden`,
        className
      ),
      ...props,
      "data-slot": slotName
    }
  );
}

export {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent
};
//# sourceMappingURL=chunk-QEUP7ONY.js.map