import {
  useSheetPortalContainer
} from "./chunk-EXTOGROG.js";
import {
  Input,
  Separator
} from "./chunk-OTLBSTHU.js";
import {
  Button,
  cn,
  floatingSurface,
  focusRing,
  menuSurface
} from "./chunk-33SBGSQF.js";

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

// src/components/ui/avatar.tsx
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { jsx as jsx2 } from "react/jsx-runtime";
function Avatar({
  className,
  slotName = "avatar",
  ...props
}) {
  return /* @__PURE__ */ jsx2(
    AvatarPrimitive.Root,
    {
      className: cn(
        "size-8 relative flex shrink-0 overflow-hidden rounded-full",
        className
      ),
      ...props,
      "data-slot": slotName
    }
  );
}
function AvatarImage({
  className,
  slotName = "avatar-image",
  ...props
}) {
  return /* @__PURE__ */ jsx2(
    AvatarPrimitive.Image,
    {
      className: cn("aspect-square size-full", className),
      ...props,
      "data-slot": slotName
    }
  );
}
function AvatarFallback({
  className,
  slotName = "avatar-fallback",
  ...props
}) {
  return /* @__PURE__ */ jsx2(
    AvatarPrimitive.Fallback,
    {
      className: cn(
        "flex size-full items-center justify-center rounded-full bg-muted",
        className
      ),
      ...props,
      "data-slot": slotName
    }
  );
}

// src/components/ui/breadcrumb.tsx
import { Slot } from "@radix-ui/react-slot";
import { ChevronRight, MoreHorizontal } from "lucide-react";
import { jsx as jsx3, jsxs as jsxs2 } from "react/jsx-runtime";
function Breadcrumb({
  slotName = "breadcrumb",
  ...props
}) {
  return /* @__PURE__ */ jsx3("nav", { "aria-label": "breadcrumb", ...props, "data-slot": slotName });
}
function BreadcrumbList({
  className,
  slotName = "breadcrumb-list",
  ...props
}) {
  return /* @__PURE__ */ jsx3(
    "ol",
    {
      className: cn(
        "gap-1.5 text-sm sm:gap-2.5 flex flex-wrap items-center break-words text-muted-foreground",
        className
      ),
      ...props,
      "data-slot": slotName
    }
  );
}
function BreadcrumbItem({
  className,
  slotName = "breadcrumb-item",
  ...props
}) {
  return /* @__PURE__ */ jsx3(
    "li",
    {
      className: cn("gap-1.5 inline-flex items-center", className),
      ...props,
      "data-slot": slotName
    }
  );
}
function BreadcrumbLink({
  asChild,
  className,
  slotName = "breadcrumb-link",
  ...props
}) {
  const Comp = asChild ? Slot : "a";
  return /* @__PURE__ */ jsx3(
    Comp,
    {
      className: cn("transition-colors hover:text-foreground", className),
      ...props,
      "data-slot": slotName
    }
  );
}
function BreadcrumbPage({
  className,
  slotName = "breadcrumb-page",
  ...props
}) {
  return /* @__PURE__ */ jsx3(
    "span",
    {
      role: "link",
      "aria-disabled": "true",
      "aria-current": "page",
      className: cn("font-semibold text-foreground", className),
      ...props,
      "data-slot": slotName
    }
  );
}
function BreadcrumbSeparator({
  children,
  className,
  slotName = "breadcrumb-separator",
  ...props
}) {
  return /* @__PURE__ */ jsx3(
    "li",
    {
      role: "presentation",
      "aria-hidden": "true",
      className: cn("[&>svg]:size-3.5", className),
      ...props,
      "data-slot": slotName,
      children: children ?? /* @__PURE__ */ jsx3(ChevronRight, {})
    }
  );
}
function BreadcrumbEllipsis({
  className,
  slotName = "breadcrumb-ellipsis",
  ...props
}) {
  return /* @__PURE__ */ jsxs2(
    "span",
    {
      role: "presentation",
      "aria-hidden": "true",
      className: cn(
        "size-9 rounded-xl flex items-center justify-center",
        className
      ),
      ...props,
      "data-slot": slotName,
      children: [
        /* @__PURE__ */ jsx3(MoreHorizontal, { className: "size-4" }),
        /* @__PURE__ */ jsx3("span", { className: "sr-only", children: "More" })
      ]
    }
  );
}

// src/components/ui/collapsible.tsx
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import { jsx as jsx4 } from "react/jsx-runtime";
function Collapsible({
  slotName = "collapsible",
  ...props
}) {
  return /* @__PURE__ */ jsx4(CollapsiblePrimitive.Root, { ...props, "data-slot": slotName });
}
function CollapsibleTrigger2({
  slotName = "collapsible-trigger",
  ...props
}) {
  return /* @__PURE__ */ jsx4(
    CollapsiblePrimitive.CollapsibleTrigger,
    {
      ...props,
      "data-slot": slotName
    }
  );
}
function CollapsibleContent2({
  slotName = "collapsible-content",
  ...props
}) {
  return /* @__PURE__ */ jsx4(
    CollapsiblePrimitive.CollapsibleContent,
    {
      ...props,
      "data-slot": slotName
    }
  );
}

// src/components/ui/icon.tsx
import { jsx as jsx5 } from "react/jsx-runtime";
function Icon({ iconNode: IconComponent, className }) {
  if (!IconComponent) {
    return null;
  }
  return /* @__PURE__ */ jsx5(IconComponent, { className });
}

// src/components/ui/sheet.tsx
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { XIcon } from "lucide-react";
import * as React from "react";
import { jsx as jsx6, jsxs as jsxs3 } from "react/jsx-runtime";
function Sheet({
  preserveScroll = false,
  onOpenChange: onOpenChangeProp,
  slotName = "sheet",
  ...props
}) {
  const scrollPosition = React.useRef(0);
  const onOpenChange = (open) => {
    if (preserveScroll) {
      if (open) {
        scrollPosition.current = window.scrollY;
      } else {
        setTimeout(() => {
          window.scrollTo(0, scrollPosition.current);
        }, 0);
      }
    }
    onOpenChangeProp?.(open);
  };
  return /* @__PURE__ */ jsx6(
    SheetPrimitive.Root,
    {
      ...props,
      onOpenChange,
      "data-slot": slotName
    }
  );
}
function SheetTrigger({
  slotName = "sheet-trigger",
  ...props
}) {
  return /* @__PURE__ */ jsx6(SheetPrimitive.Trigger, { ...props, "data-slot": slotName });
}
function SheetClose({
  slotName = "sheet-close",
  ...props
}) {
  return /* @__PURE__ */ jsx6(SheetPrimitive.Close, { ...props, "data-slot": slotName });
}
function SheetPortal({
  slotName = "sheet-portal",
  ...props
}) {
  return /* @__PURE__ */ jsx6(SheetPrimitive.Portal, { ...props, "data-slot": slotName });
}
function SheetOverlay({
  className,
  slotName = "sheet-overlay",
  ...props
}) {
  return /* @__PURE__ */ jsx6(
    SheetPrimitive.Overlay,
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
function SheetContent({
  className,
  children,
  side = "right",
  slotName = "sheet-content",
  ...props
}) {
  return /* @__PURE__ */ jsxs3(SheetPortal, { children: [
    /* @__PURE__ */ jsx6(SheetOverlay, {}),
    /* @__PURE__ */ jsxs3(
      SheetPrimitive.Content,
      {
        className: cn(
          `${floatingSurface} data-[state=open]:animate-in data-[state=closed]:animate-out gap-4 ease-in-out fixed z-50 flex flex-col transition data-[state=closed]:duration-300 data-[state=open]:duration-500`,
          side === "right" && "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 sm:max-w-sm rounded-l-3xl h-full w-3/4 border-l border-border",
          side === "left" && "data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 sm:max-w-sm rounded-r-3xl h-full w-3/4 border-r border-border",
          side === "top" && "data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 rounded-b-3xl h-auto border-b border-border",
          side === "bottom" && "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 rounded-t-3xl h-auto border-t border-border",
          className
        ),
        ...props,
        "data-slot": slotName,
        children: [
          children,
          /* @__PURE__ */ jsxs3(
            SheetPrimitive.Close,
            {
              className: cn(
                "top-4 right-4 size-9 shadow-xs absolute flex items-center justify-center rounded-full border border-border bg-muted text-muted-foreground transition-colors hover:bg-accent hover:text-foreground disabled:pointer-events-none",
                focusRing
              ),
              children: [
                /* @__PURE__ */ jsx6(XIcon, { className: "size-4" }),
                /* @__PURE__ */ jsx6("span", { className: "sr-only", children: "Close" })
              ]
            }
          )
        ]
      }
    )
  ] });
}
function SheetHeader({
  className,
  slotName = "sheet-header",
  ...props
}) {
  return /* @__PURE__ */ jsx6(
    "div",
    {
      className: cn("gap-1.5 p-4 flex flex-col", className),
      ...props,
      "data-slot": slotName
    }
  );
}
function SheetFooter({
  className,
  slotName = "sheet-footer",
  ...props
}) {
  return /* @__PURE__ */ jsx6(
    "div",
    {
      className: cn("gap-2 p-4 mt-auto flex flex-col", className),
      ...props,
      "data-slot": slotName
    }
  );
}
function SheetTitle({
  className,
  slotName = "sheet-title",
  ...props
}) {
  return /* @__PURE__ */ jsx6(
    SheetPrimitive.Title,
    {
      className: cn("font-semibold text-foreground", className),
      ...props,
      "data-slot": slotName
    }
  );
}
function SheetDescription({
  className,
  slotName = "sheet-description",
  ...props
}) {
  return /* @__PURE__ */ jsx6(
    SheetPrimitive.Description,
    {
      className: cn("text-sm text-muted-foreground", className),
      ...props,
      "data-slot": slotName
    }
  );
}

// src/components/ui/skeleton.tsx
import { jsx as jsx7 } from "react/jsx-runtime";
function Skeleton({
  className,
  slotName = "skeleton",
  ...props
}) {
  return /* @__PURE__ */ jsx7(
    "div",
    {
      className: cn("animate-pulse rounded-xl bg-muted", className),
      ...props,
      "data-slot": slotName
    }
  );
}

// src/components/ui/tooltip.tsx
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { jsx as jsx8, jsxs as jsxs4 } from "react/jsx-runtime";
function TooltipProvider({
  delayDuration = 0,
  slotName = "tooltip-provider",
  ...props
}) {
  return /* @__PURE__ */ jsx8(
    TooltipPrimitive.Provider,
    {
      delayDuration,
      ...props,
      "data-slot": slotName
    }
  );
}
function Tooltip({
  slotName = "tooltip",
  ...props
}) {
  return /* @__PURE__ */ jsx8(TooltipProvider, { children: /* @__PURE__ */ jsx8(TooltipPrimitive.Root, { ...props, "data-slot": slotName }) });
}
function TooltipTrigger({
  slotName = "tooltip-trigger",
  ...props
}) {
  return /* @__PURE__ */ jsx8(TooltipPrimitive.Trigger, { ...props, "data-slot": slotName });
}
function TooltipContent({
  className,
  sideOffset = 4,
  children,
  slotName = "tooltip-content",
  container,
  ...props
}) {
  const portalContainer = useSheetPortalContainer(container);
  return /* @__PURE__ */ jsx8(TooltipPrimitive.Portal, { container: portalContainer, children: /* @__PURE__ */ jsxs4(
    TooltipPrimitive.Content,
    {
      sideOffset,
      className: cn(
        "animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 max-w-sm px-3 py-1.5 text-xs shadow-2xl rounded-xl z-50 bg-primary text-primary-foreground",
        className
      ),
      ...props,
      "data-slot": slotName,
      children: [
        children,
        /* @__PURE__ */ jsx8(TooltipPrimitive.Arrow, { className: "size-2.5 z-50 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px] bg-primary fill-primary" })
      ]
    }
  ) });
}

// src/hooks/use-mobile.tsx
import { useEffect, useState } from "react";
var MOBILE_BREAKPOINT = 768;
function useIsMobile() {
  const [isMobile, setIsMobile] = useState();
  useEffect(() => {
    const mql = window.matchMedia(
      `(max-width: ${MOBILE_BREAKPOINT - 1}px)`
    );
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []);
  return !!isMobile;
}

// src/components/ui/sidebar.tsx
import { Slot as Slot2 } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { PanelLeftIcon } from "lucide-react";
import * as React2 from "react";
import { jsx as jsx9, jsxs as jsxs5 } from "react/jsx-runtime";
var SIDEBAR_COOKIE_NAME = "sidebar_state";
var SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
var SIDEBAR_WIDTH = "16rem";
var SIDEBAR_WIDTH_MOBILE = "18rem";
var SIDEBAR_WIDTH_ICON = "3rem";
var SIDEBAR_KEYBOARD_SHORTCUT = "b";
var SidebarContext = React2.createContext(null);
function useSidebar() {
  const context = React2.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.");
  }
  return context;
}
function SidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  className,
  style,
  children,
  slotName = "sidebar-wrapper",
  ...props
}) {
  const isMobile = useIsMobile();
  const [openMobile, setOpenMobile] = React2.useState(false);
  const [_open, _setOpen] = React2.useState(defaultOpen);
  const open = openProp ?? _open;
  const setOpen = React2.useCallback(
    (value) => {
      const openState = typeof value === "function" ? value(open) : value;
      if (setOpenProp) {
        setOpenProp(openState);
      } else {
        _setOpen(openState);
      }
      document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
    },
    [setOpenProp, open]
  );
  const toggleSidebar = React2.useCallback(() => {
    return isMobile ? setOpenMobile((open2) => !open2) : setOpen((open2) => !open2);
  }, [isMobile, setOpen, setOpenMobile]);
  React2.useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        toggleSidebar();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleSidebar]);
  const state = open ? "expanded" : "collapsed";
  const contextValue = React2.useMemo(
    () => ({
      state,
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar
    }),
    [
      state,
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar
    ]
  );
  return /* @__PURE__ */ jsx9(SidebarContext.Provider, { value: contextValue, children: /* @__PURE__ */ jsx9(TooltipProvider, { delayDuration: 0, children: /* @__PURE__ */ jsx9(
    "div",
    {
      style: {
        "--sidebar-width": SIDEBAR_WIDTH,
        "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
        ...style
      },
      className: cn(
        "group/sidebar-wrapper flex min-h-svh w-full has-data-[variant=inset]:bg-sidebar",
        className
      ),
      ...props,
      "data-slot": slotName,
      children
    }
  ) }) });
}
function Sidebar({
  side = "left",
  variant = "sidebar",
  collapsible = "offcanvas",
  className,
  children,
  slotName = "sidebar",
  ...props
}) {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar();
  if (collapsible === "none") {
    return /* @__PURE__ */ jsx9(
      "div",
      {
        className: cn(
          "flex h-full w-(--sidebar-width) flex-col bg-sidebar text-sidebar-foreground",
          className
        ),
        ...props,
        "data-slot": slotName,
        children
      }
    );
  }
  if (isMobile) {
    return /* @__PURE__ */ jsxs5(
      Sheet,
      {
        open: openMobile,
        onOpenChange: setOpenMobile,
        ...props,
        preserveScroll: true,
        children: [
          /* @__PURE__ */ jsxs5(SheetHeader, { className: "sr-only", children: [
            /* @__PURE__ */ jsx9(SheetTitle, { children: "Sidebar" }),
            /* @__PURE__ */ jsx9(SheetDescription, { children: "Displays the mobile sidebar." })
          ] }),
          /* @__PURE__ */ jsx9(
            SheetContent,
            {
              "data-sidebar": "sidebar",
              "data-mobile": "true",
              className: "p-0 w-(--sidebar-width) rounded-none bg-sidebar text-sidebar-foreground [&>button]:hidden",
              style: {
                "--sidebar-width": SIDEBAR_WIDTH_MOBILE
              },
              side,
              slotName,
              children: /* @__PURE__ */ jsx9("div", { className: "flex h-full w-full flex-col", children })
            }
          )
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxs5(
    "div",
    {
      className: "group peer md:block hidden text-sidebar-foreground",
      "data-state": state,
      "data-collapsible": state === "collapsed" ? collapsible : "",
      "data-variant": variant,
      "data-side": side,
      "data-slot": slotName,
      children: [
        /* @__PURE__ */ jsx9(
          "div",
          {
            className: cn(
              "relative h-svh w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear",
              "group-data-[collapsible=offcanvas]:w-0",
              "group-data-[side=right]:rotate-180",
              variant === "floating" || variant === "inset" ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]" : "group-data-[collapsible=icon]:w-(--sidebar-width-icon)"
            )
          }
        ),
        /* @__PURE__ */ jsx9(
          "div",
          {
            className: cn(
              "inset-y-0 md:flex fixed z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear",
              side === "left" ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]" : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
              // Adjust the padding for floating and inset variants.
              variant === "floating" || variant === "inset" ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]" : "group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l",
              className
            ),
            ...props,
            children: /* @__PURE__ */ jsx9(
              "div",
              {
                "data-sidebar": "sidebar",
                className: "group-data-[variant=floating]:shadow-sm group-data-[variant=floating]:rounded-2xl flex h-full w-full flex-col bg-sidebar group-data-[variant=floating]:border group-data-[variant=floating]:border-sidebar-border",
                children
              }
            )
          }
        )
      ]
    }
  );
}
function SidebarTrigger({
  className,
  onClick,
  slotName = "sidebar-trigger",
  ...props
}) {
  const { toggleSidebar } = useSidebar();
  return /* @__PURE__ */ jsxs5(
    Button,
    {
      "data-sidebar": "trigger",
      variant: "ghost",
      size: "icon",
      className: cn("h-7 w-7", className),
      onClick: (event) => {
        onClick?.(event);
        toggleSidebar();
      },
      ...props,
      slotName,
      children: [
        /* @__PURE__ */ jsx9(PanelLeftIcon, {}),
        /* @__PURE__ */ jsx9("span", { className: "sr-only", children: "Toggle Sidebar" })
      ]
    }
  );
}
function SidebarRail({
  className,
  slotName = "sidebar-rail",
  ...props
}) {
  const { toggleSidebar } = useSidebar();
  return /* @__PURE__ */ jsx9(
    "button",
    {
      "data-sidebar": "rail",
      "aria-label": "Toggle Sidebar",
      tabIndex: -1,
      onClick: toggleSidebar,
      title: "Toggle Sidebar",
      className: cn(
        "inset-y-0 w-4 group-data-[side=left]:-right-4 group-data-[side=right]:left-0 after:inset-y-0 sm:flex absolute z-20 hidden -translate-x-1/2 transition-all ease-linear after:absolute after:left-1/2 after:w-[2px] hover:after:bg-sidebar-border",
        "in-data-[side=left]:cursor-w-resize in-data-[side=right]:cursor-e-resize",
        "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize",
        "group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full hover:group-data-[collapsible=offcanvas]:bg-sidebar",
        "[[data-side=left][data-collapsible=offcanvas]_&]:-right-2",
        "[[data-side=right][data-collapsible=offcanvas]_&]:-left-2",
        className
      ),
      ...props,
      "data-slot": slotName
    }
  );
}
function SidebarInset({
  className,
  slotName = "sidebar-inset",
  ...props
}) {
  return /* @__PURE__ */ jsx9(
    "main",
    {
      className: cn(
        "relative flex min-h-svh max-w-full flex-1 flex-col bg-background",
        "peer-data-[variant=inset]:min-h-[calc(100svh-(--spacing(4)))] md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-0",
        className
      ),
      ...props,
      "data-slot": slotName
    }
  );
}
function SidebarInput({
  className,
  slotName = "sidebar-input",
  ...props
}) {
  return /* @__PURE__ */ jsx9(
    Input,
    {
      "data-sidebar": "input",
      className: cn("h-11 w-full bg-background shadow-none", className),
      ...props,
      slotName
    }
  );
}
function SidebarHeader({
  className,
  slotName = "sidebar-header",
  ...props
}) {
  return /* @__PURE__ */ jsx9(
    "div",
    {
      "data-sidebar": "header",
      className: cn(
        "gap-2 p-2 group-data-[collapsible=icon]:px-0 flex flex-col",
        className
      ),
      ...props,
      "data-slot": slotName
    }
  );
}
function SidebarFooter({
  className,
  slotName = "sidebar-footer",
  ...props
}) {
  return /* @__PURE__ */ jsx9(
    "div",
    {
      "data-sidebar": "footer",
      className: cn(
        "gap-2 p-2 group-data-[collapsible=icon]:px-0 flex flex-col pb-[max(0.5rem,env(safe-area-inset-bottom))]",
        className
      ),
      ...props,
      "data-slot": slotName
    }
  );
}
function SidebarSeparator({
  className,
  slotName = "sidebar-separator",
  ...props
}) {
  return /* @__PURE__ */ jsx9(
    Separator,
    {
      "data-sidebar": "separator",
      className: cn("mx-2 w-auto bg-sidebar-border", className),
      ...props,
      slotName
    }
  );
}
function SidebarContent({
  className,
  slotName = "sidebar-content",
  ...props
}) {
  return /* @__PURE__ */ jsx9(
    "div",
    {
      "data-sidebar": "content",
      className: cn(
        "min-h-0 gap-2 flex flex-1 flex-col overflow-auto group-data-[collapsible=icon]:overflow-hidden",
        className
      ),
      ...props,
      "data-slot": slotName
    }
  );
}
function SidebarGroup({
  className,
  slotName = "sidebar-group",
  ...props
}) {
  return /* @__PURE__ */ jsx9(
    "div",
    {
      "data-sidebar": "group",
      className: cn(
        "min-w-0 p-2 group-data-[collapsible=icon]:px-0 relative flex w-full flex-col",
        className
      ),
      ...props,
      "data-slot": slotName
    }
  );
}
function SidebarGroupLabel({
  className,
  asChild = false,
  slotName = "sidebar-group-label",
  ...props
}) {
  const Comp = asChild ? Slot2 : "div";
  return /* @__PURE__ */ jsx9(
    Comp,
    {
      "data-sidebar": "group-label",
      className: cn(
        "h-8 rounded-xl px-2 text-xs font-medium tracking-wider [&>svg]:size-4 flex shrink-0 items-center text-sidebar-foreground/70 uppercase ring-sidebar-ring outline-hidden transition-[margin,opacity] duration-200 ease-linear focus-visible:outline-1 focus-visible:outline-offset-0 focus-visible:outline-ring focus-visible:outline-solid [&>svg]:shrink-0",
        "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:pointer-events-none group-data-[collapsible=icon]:opacity-0 group-data-[collapsible=icon]:select-none",
        className
      ),
      ...props,
      "data-slot": slotName
    }
  );
}
function SidebarGroupAction({
  className,
  asChild = false,
  slotName = "sidebar-group-action",
  ...props
}) {
  const Comp = asChild ? Slot2 : "button";
  return /* @__PURE__ */ jsx9(
    Comp,
    {
      "data-sidebar": "group-action",
      className: cn(
        "top-3.5 right-3 w-5 p-0 [&>svg]:size-4 rounded-xl absolute flex aspect-square items-center justify-center text-sidebar-foreground ring-sidebar-ring outline-hidden transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:outline-1 focus-visible:outline-offset-0 focus-visible:outline-ring focus-visible:outline-solid [&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "after:-inset-2 md:after:hidden after:absolute",
        "group-data-[collapsible=icon]:hidden",
        className
      ),
      ...props,
      "data-slot": slotName
    }
  );
}
function SidebarGroupContent({
  className,
  slotName = "sidebar-group-content",
  ...props
}) {
  return /* @__PURE__ */ jsx9(
    "div",
    {
      "data-sidebar": "group-content",
      className: cn("text-sm w-full", className),
      ...props,
      "data-slot": slotName
    }
  );
}
function SidebarMenu({
  className,
  slotName = "sidebar-menu",
  ...props
}) {
  return /* @__PURE__ */ jsx9(
    "ul",
    {
      "data-sidebar": "menu",
      className: cn(
        "min-w-0 gap-1 flex w-full flex-col group-data-[collapsible=icon]:items-center",
        className
      ),
      ...props,
      "data-slot": slotName
    }
  );
}
function SidebarMenuItem({
  className,
  slotName = "sidebar-menu-item",
  ...props
}) {
  return /* @__PURE__ */ jsx9(
    "li",
    {
      "data-sidebar": "menu-item",
      className: cn("group/menu-item relative", className),
      ...props,
      "data-slot": slotName
    }
  );
}
var sidebarMenuButtonVariants = cva(
  "peer/menu-button flex w-full items-center gap-3 overflow-hidden rounded-xl p-2.5 text-left text-sm font-medium outline-hidden ring-sidebar-ring transition-all hover:bg-accent hover:text-accent-foreground focus-visible:outline-solid focus-visible:outline-1 focus-visible:outline-offset-0 focus-visible:outline-ring active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 group-has-data-[sidebar=menu-action]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-primary/10 data-[active=true]:font-semibold data-[active=true]:text-primary group-data-[collapsible=icon]:size-10! group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:gap-0 group-data-[collapsible=icon]:p-2.5! [&>span:last-child]:truncate group-data-[collapsible=icon]:[&>span:last-child]:hidden [&>svg]:size-5 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        outline: "bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]"
      },
      size: {
        default: "h-11 text-sm",
        sm: "h-9 text-sm",
        lg: "h-14 text-sm"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function SidebarMenuButton({
  asChild = false,
  isActive = false,
  variant = "default",
  size = "default",
  tooltip,
  className,
  slotName = "sidebar-menu-button",
  ...props
}) {
  const Comp = asChild ? Slot2 : "button";
  const { isMobile, state } = useSidebar();
  const button = /* @__PURE__ */ jsx9(
    Comp,
    {
      "data-sidebar": "menu-button",
      "data-size": size,
      "data-active": isActive,
      className: cn(
        sidebarMenuButtonVariants({ variant, size }),
        className
      ),
      ...props,
      "data-slot": slotName
    }
  );
  if (!tooltip) {
    return button;
  }
  if (typeof tooltip === "string") {
    tooltip = {
      children: tooltip
    };
  }
  return /* @__PURE__ */ jsxs5(Tooltip, { children: [
    /* @__PURE__ */ jsx9(TooltipTrigger, { asChild: true, children: button }),
    /* @__PURE__ */ jsx9(
      TooltipContent,
      {
        side: "right",
        align: "center",
        hidden: state !== "collapsed" || isMobile,
        ...tooltip
      }
    )
  ] });
}
function SidebarMenuAction({
  className,
  asChild = false,
  showOnHover = false,
  slotName = "sidebar-menu-action",
  ...props
}) {
  const Comp = asChild ? Slot2 : "button";
  return /* @__PURE__ */ jsx9(
    Comp,
    {
      "data-sidebar": "menu-action",
      className: cn(
        "top-1.5 right-1 w-5 p-0 [&>svg]:size-4 rounded-xl absolute flex aspect-square items-center justify-center text-sidebar-foreground ring-sidebar-ring outline-hidden transition-transform peer-hover/menu-button:text-sidebar-accent-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:outline-1 focus-visible:outline-offset-0 focus-visible:outline-ring focus-visible:outline-solid [&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "after:-inset-2 md:after:hidden after:absolute",
        "peer-data-[size=sm]/menu-button:top-1",
        "peer-data-[size=default]/menu-button:top-1.5",
        "peer-data-[size=lg]/menu-button:top-2.5",
        "group-data-[collapsible=icon]:hidden",
        showOnHover && "md:opacity-0 group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 peer-data-[active=true]/menu-button:text-sidebar-accent-foreground data-[state=open]:opacity-100",
        className
      ),
      ...props,
      "data-slot": slotName
    }
  );
}
function SidebarMenuBadge({
  className,
  slotName = "sidebar-menu-badge",
  ...props
}) {
  return /* @__PURE__ */ jsx9(
    "div",
    {
      "data-sidebar": "menu-badge",
      className: cn(
        "right-1 h-5 min-w-5 px-1 text-xs font-medium rounded-xl pointer-events-none absolute flex items-center justify-center text-sidebar-foreground tabular-nums select-none",
        "peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[active=true]/menu-button:text-sidebar-accent-foreground",
        "peer-data-[size=sm]/menu-button:top-1",
        "peer-data-[size=default]/menu-button:top-1.5",
        "peer-data-[size=lg]/menu-button:top-2.5",
        "group-data-[collapsible=icon]:hidden",
        className
      ),
      ...props,
      "data-slot": slotName
    }
  );
}
function SidebarMenuSkeleton({
  className,
  showIcon = false,
  slotName = "sidebar-menu-skeleton",
  ...props
}) {
  const width = React2.useMemo(() => {
    return `${Math.floor(Math.random() * 40) + 50}%`;
  }, []);
  return /* @__PURE__ */ jsxs5(
    "div",
    {
      "data-sidebar": "menu-skeleton",
      className: cn(
        "h-8 gap-2 px-2 rounded-xl flex items-center",
        className
      ),
      ...props,
      "data-slot": slotName,
      children: [
        showIcon && /* @__PURE__ */ jsx9(
          Skeleton,
          {
            className: "size-4 rounded-xl",
            "data-sidebar": "menu-skeleton-icon"
          }
        ),
        /* @__PURE__ */ jsx9(
          Skeleton,
          {
            className: "h-4 max-w-(--skeleton-width) flex-1",
            "data-sidebar": "menu-skeleton-text",
            style: {
              "--skeleton-width": width
            }
          }
        )
      ]
    }
  );
}
function SidebarMenuSub({
  className,
  slotName = "sidebar-menu-sub",
  ...props
}) {
  return /* @__PURE__ */ jsx9(
    "ul",
    {
      "data-sidebar": "menu-sub",
      className: cn(
        "mx-3.5 min-w-0 gap-1 px-2.5 py-0.5 flex translate-x-px flex-col border-l border-sidebar-border",
        "group-data-[collapsible=icon]:hidden",
        className
      ),
      ...props,
      "data-slot": slotName
    }
  );
}
function SidebarMenuSubItem({
  className,
  slotName = "sidebar-menu-sub-item",
  ...props
}) {
  return /* @__PURE__ */ jsx9(
    "li",
    {
      "data-sidebar": "menu-sub-item",
      className: cn("group/menu-sub-item relative", className),
      ...props,
      "data-slot": slotName
    }
  );
}
function SidebarMenuSubButton({
  asChild = false,
  size = "md",
  isActive = false,
  className,
  slotName = "sidebar-menu-sub-button",
  ...props
}) {
  const Comp = asChild ? Slot2 : "a";
  return /* @__PURE__ */ jsx9(
    Comp,
    {
      "data-sidebar": "menu-sub-button",
      "data-size": size,
      "data-active": isActive,
      className: cn(
        "h-9 min-w-0 gap-2 px-2 text-sm font-medium [&>svg]:size-4 rounded-xl flex -translate-x-px items-center overflow-hidden text-sidebar-foreground ring-sidebar-ring outline-hidden hover:bg-accent hover:text-accent-foreground focus-visible:outline-1 focus-visible:outline-offset-0 focus-visible:outline-ring focus-visible:outline-solid active:bg-accent disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:shrink-0 [&>svg]:text-current",
        "data-[active=true]:font-semibold data-[active=true]:bg-primary/10 data-[active=true]:text-primary",
        size === "sm" && "h-9 text-sm",
        size === "md" && "h-9 text-sm",
        "group-data-[collapsible=icon]:hidden",
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
  DropdownMenuSubContent,
  Avatar,
  AvatarImage,
  AvatarFallback,
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
  Collapsible,
  CollapsibleTrigger2 as CollapsibleTrigger,
  CollapsibleContent2 as CollapsibleContent,
  Icon,
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
  Skeleton,
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  useIsMobile,
  useSidebar,
  SidebarProvider,
  Sidebar,
  SidebarTrigger,
  SidebarRail,
  SidebarInset,
  SidebarInput,
  SidebarHeader,
  SidebarFooter,
  SidebarSeparator,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton
};
//# sourceMappingURL=chunk-E64424RA.js.map