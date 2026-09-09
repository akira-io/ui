'use client';

"use client";
import {
  initializeTheme,
  useAppearance
} from "./chunk-IQMRJXEO.js";
import {
  Card
} from "./chunk-VLWHKRSD.js";
import {
  AppSidebar,
  AppSidebarHeader,
  Breadcrumbs,
  Heading,
  NavFooter,
  NavMain,
  NavUser,
  SIDEBAR_COLLAPSED_GROUPS_KEY,
  SettingsLayout,
  UserInfo,
  UserMenuContent,
  useCollapsedGroup,
  useInitials
} from "./chunk-HVFTKGOV.js";
import {
  SidebarInset,
  SidebarProvider,
  useIsMobile
} from "./chunk-E64424RA.js";
import {
  hrefToString
} from "./chunk-VVBBKTC5.js";
import "./chunk-EXTOGROG.js";
import "./chunk-OTLBSTHU.js";
import {
  cn
} from "./chunk-33SBGSQF.js";

// src/shells/app-content.tsx
import { jsx } from "react/jsx-runtime";
function AppContent({
  variant = "header",
  children,
  ...props
}) {
  if (variant === "sidebar") {
    return /* @__PURE__ */ jsx(SidebarInset, { ...props, children });
  }
  return /* @__PURE__ */ jsx(
    "main",
    {
      className: "max-w-7xl gap-4 rounded-xl mx-auto flex h-full w-full flex-1 flex-col",
      ...props,
      children
    }
  );
}

// src/shells/app-shell.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
function AppShell({
  children,
  variant = "header",
  open,
  onOpenChange,
  defaultOpen = true
}) {
  if (variant === "header") {
    return /* @__PURE__ */ jsx2("div", { className: "flex min-h-screen w-full flex-col", children });
  }
  return /* @__PURE__ */ jsx2(
    SidebarProvider,
    {
      open,
      onOpenChange,
      defaultOpen,
      children
    }
  );
}

// src/shells/auth-shell.tsx
import { createContext, useContext } from "react";
import { jsx as jsx3, jsxs } from "react/jsx-runtime";
var ArrangementContext = createContext("centred");
function useAuthArrangement() {
  return useContext(ArrangementContext);
}
function AuthShellRoot({
  arrangement = "centred",
  appearanceControl,
  children,
  className,
  slotName = "auth-shell"
}) {
  const split = arrangement === "split";
  return /* @__PURE__ */ jsx3(ArrangementContext.Provider, { value: arrangement, children: /* @__PURE__ */ jsxs(
    "div",
    {
      "data-arrangement": arrangement,
      className: cn(
        "relative flex min-h-screen w-full",
        split && "lg:grid lg:grid-cols-2",
        className
      ),
      "data-slot": slotName,
      children: [
        children,
        appearanceControl && /* @__PURE__ */ jsx3(
          "div",
          {
            "data-slot": "auth-shell-appearance",
            className: "top-4 right-4 absolute",
            children: appearanceControl
          }
        )
      ]
    }
  ) });
}
function AuthShellMain({
  children,
  slotName = "auth-shell-main"
}) {
  return /* @__PURE__ */ jsx3(
    "main",
    {
      "data-slot": slotName,
      className: "p-6 flex flex-1 items-center justify-center",
      children: /* @__PURE__ */ jsx3(
        "div",
        {
          "data-slot": "auth-shell-form",
          className: "gap-6 max-w-md flex w-full flex-col",
          children
        }
      )
    }
  );
}
function AuthShellPanel({
  decorative = true,
  arrangement,
  children,
  slotName = "auth-shell-panel"
}) {
  const contextArrangement = useAuthArrangement();
  if ((arrangement ?? contextArrangement) !== "split") {
    return null;
  }
  return /* @__PURE__ */ jsx3(
    "aside",
    {
      "data-slot": slotName,
      "aria-hidden": decorative || void 0,
      className: "p-10 lg:flex hidden flex-col justify-between bg-primary text-primary-foreground",
      children
    }
  );
}
function AuthShellSurface({
  children,
  className,
  slotName = "card"
}) {
  return /* @__PURE__ */ jsx3(Card, { className: cn("p-6", className), slotName, children });
}
function AuthShellLogo({
  children,
  slotName = "auth-shell-logo"
}) {
  return /* @__PURE__ */ jsx3("div", { "data-slot": slotName, className: "flex justify-center", children });
}
function AuthShellHeading({
  title,
  description,
  align = "start",
  slotName = "auth-shell-heading"
}) {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      "data-slot": slotName,
      className: cn("space-y-2", align === "center" && "text-center"),
      children: [
        /* @__PURE__ */ jsx3("h1", { className: "text-xl font-bold tracking-tight text-foreground", children: title }),
        description && /* @__PURE__ */ jsx3("p", { className: "text-sm font-medium text-muted-foreground", children: description })
      ]
    }
  );
}
function AuthShellBody({
  children,
  slotName = "auth-shell-body"
}) {
  return /* @__PURE__ */ jsx3("div", { "data-slot": slotName, children });
}
function AuthShellFooter({
  children,
  slotName = "auth-shell-footer"
}) {
  return /* @__PURE__ */ jsx3(
    "footer",
    {
      "data-slot": slotName,
      className: "gap-2 text-sm font-medium flex flex-wrap items-center justify-center text-muted-foreground",
      children
    }
  );
}
function AuthShell({
  logo,
  title,
  description,
  arrangement = "centred",
  panel,
  panelDecorative = true,
  footer,
  appearanceControl,
  surface = true,
  children,
  className,
  slotName = "auth-shell"
}) {
  const body = /* @__PURE__ */ jsx3(AuthShellBody, { children });
  return /* @__PURE__ */ jsxs(
    AuthShellRoot,
    {
      arrangement,
      appearanceControl,
      className,
      slotName,
      children: [
        panel && /* @__PURE__ */ jsx3(AuthShellPanel, { decorative: panelDecorative, children: panel }),
        /* @__PURE__ */ jsxs(AuthShellMain, { children: [
          logo && /* @__PURE__ */ jsx3(AuthShellLogo, { children: logo }),
          /* @__PURE__ */ jsx3(AuthShellHeading, { title, description }),
          surface ? /* @__PURE__ */ jsx3(AuthShellSurface, { children: body }) : body,
          footer && /* @__PURE__ */ jsx3(AuthShellFooter, { children: footer })
        ] })
      ]
    }
  );
}
export {
  AppContent,
  AppShell,
  AppSidebar,
  AppSidebarHeader,
  AuthShell,
  AuthShellBody,
  AuthShellFooter,
  AuthShellHeading,
  AuthShellLogo,
  AuthShellMain,
  AuthShellPanel,
  AuthShellRoot,
  AuthShellSurface,
  Breadcrumbs,
  Heading,
  NavFooter,
  NavMain,
  NavUser,
  SIDEBAR_COLLAPSED_GROUPS_KEY,
  SettingsLayout,
  UserInfo,
  UserMenuContent,
  hrefToString,
  initializeTheme,
  useAppearance,
  useAuthArrangement,
  useCollapsedGroup,
  useInitials,
  useIsMobile
};
//# sourceMappingURL=shells.js.map