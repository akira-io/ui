import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Icon,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useIsMobile,
  useSidebar
} from "./chunk-E64424RA.js";
import {
  hrefToString,
  pathOfHref,
  resolveLink
} from "./chunk-VVBBKTC5.js";
import {
  Separator
} from "./chunk-OTLBSTHU.js";
import {
  Button,
  cn,
  compactRadius
} from "./chunk-33SBGSQF.js";

// src/hooks/use-collapsed-groups.tsx
import { useCallback, useState } from "react";
var SIDEBAR_COLLAPSED_GROUPS_KEY = "akira-ui:collapsed-nav-groups";
function readCollapsedGroups() {
  if (typeof window === "undefined") {
    return null;
  }
  try {
    const raw = window.localStorage.getItem(SIDEBAR_COLLAPSED_GROUPS_KEY);
    if (raw === null) {
      return null;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter(
      (entry) => typeof entry === "string"
    ) : null;
  } catch {
    return null;
  }
}
function writeCollapsedGroups(groups) {
  if (typeof window === "undefined") {
    return;
  }
  try {
    window.localStorage.setItem(
      SIDEBAR_COLLAPSED_GROUPS_KEY,
      JSON.stringify(groups)
    );
  } catch {
    return;
  }
}
function withGroup(groups, group, collapsed) {
  if (!collapsed) {
    return groups.filter((entry) => entry !== group);
  }
  return groups.includes(group) ? groups : [...groups, group];
}
function useCollapsedGroup({
  group,
  defaultOpen = true,
  collapsedGroups,
  onCollapsedChange
}) {
  const isControlled = collapsedGroups !== void 0 && onCollapsedChange !== void 0;
  const [storedGroups, setStoredGroups] = useState(
    () => readCollapsedGroups() ?? (defaultOpen ? [] : [group])
  );
  const setOpen = useCallback(
    (open) => {
      if (isControlled) {
        onCollapsedChange(withGroup(collapsedGroups, group, !open));
        return;
      }
      const next = withGroup(
        readCollapsedGroups() ?? storedGroups,
        group,
        !open
      );
      setStoredGroups(next);
      writeCollapsedGroups(next);
    },
    [collapsedGroups, group, isControlled, onCollapsedChange, storedGroups]
  );
  const source = isControlled ? collapsedGroups : storedGroups;
  return { open: !source.includes(group), setOpen };
}

// src/hooks/use-initials.tsx
import { useCallback as useCallback2 } from "react";
function useInitials() {
  return useCallback2((fullName) => {
    const names = fullName.trim().split(" ");
    if (names.length === 0) return "";
    if (names.length === 1) return names[0].charAt(0).toUpperCase();
    const firstInitial = names[0].charAt(0);
    const lastInitial = names[names.length - 1].charAt(0);
    return `${firstInitial}${lastInitial}`.toUpperCase();
  }, []);
}

// src/shells/nav-footer.tsx
import { jsx, jsxs } from "react/jsx-runtime";
function NavFooter({
  items,
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    SidebarGroup,
    {
      ...props,
      className: `group-data-[collapsible=icon]:p-0 ${className || ""}`,
      children: /* @__PURE__ */ jsx(SidebarGroupContent, { children: /* @__PURE__ */ jsx(SidebarMenu, { children: items.map((item) => /* @__PURE__ */ jsx(SidebarMenuItem, { children: /* @__PURE__ */ jsx(
        SidebarMenuButton,
        {
          asChild: true,
          className: "text-muted-foreground hover:text-foreground",
          children: /* @__PURE__ */ jsxs(
            "a",
            {
              href: hrefToString(item.href),
              target: "_blank",
              rel: "noopener noreferrer",
              children: [
                item.icon && /* @__PURE__ */ jsx(
                  Icon,
                  {
                    iconNode: item.icon,
                    className: "h-5 w-5"
                  }
                ),
                /* @__PURE__ */ jsx("span", { children: item.title })
              ]
            }
          )
        }
      ) }, item.title)) }) })
    }
  );
}

// src/shells/nav-main.tsx
import { ChevronDown } from "lucide-react";
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
function isItemActive(item, currentUrl) {
  if (item.isActive !== void 0) {
    return item.isActive;
  }
  if (!currentUrl) {
    return false;
  }
  const currentPath = pathOfHref(currentUrl);
  const path = pathOfHref(item.href);
  return currentPath === path || currentPath.startsWith(`${path}/`);
}
function NavMain({
  items = [],
  label = "Platform",
  currentUrl = "",
  linkComponent,
  collapsible = false,
  defaultOpen = true,
  collapsedGroups,
  onCollapsedChange
}) {
  const Link = resolveLink(linkComponent);
  const holdsCurrentRoute = items.some(
    (item) => isItemActive(item, currentUrl)
  );
  const { open, setOpen } = useCollapsedGroup({
    group: label,
    defaultOpen,
    collapsedGroups,
    onCollapsedChange
  });
  const expanded = open || holdsCurrentRoute;
  const menu = /* @__PURE__ */ jsx2(SidebarMenu, { children: items.map((item) => /* @__PURE__ */ jsx2(SidebarMenuItem, { children: /* @__PURE__ */ jsx2(
    SidebarMenuButton,
    {
      asChild: true,
      isActive: isItemActive(item, currentUrl),
      tooltip: { children: item.title },
      children: /* @__PURE__ */ jsxs2(Link, { href: item.href, prefetch: true, children: [
        item.icon && /* @__PURE__ */ jsx2(item.icon, {}),
        /* @__PURE__ */ jsx2("span", { children: item.title })
      ] })
    }
  ) }, item.title)) });
  if (!collapsible || !label) {
    return /* @__PURE__ */ jsxs2(SidebarGroup, { className: "px-2 py-0", children: [
      label && /* @__PURE__ */ jsx2(SidebarGroupLabel, { children: label }),
      menu
    ] });
  }
  return /* @__PURE__ */ jsx2(SidebarGroup, { className: "px-2 py-0", children: /* @__PURE__ */ jsxs2(Collapsible, { open: expanded, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsx2(CollapsibleTrigger, { asChild: true, children: /* @__PURE__ */ jsxs2(SidebarGroupLabel, { className: "w-full cursor-pointer justify-between", children: [
      label,
      /* @__PURE__ */ jsx2(
        ChevronDown,
        {
          className: cn(
            "size-4 transition-transform",
            !expanded && "-rotate-90"
          )
        }
      )
    ] }) }),
    /* @__PURE__ */ jsx2(CollapsibleContent, { children: menu })
  ] }) });
}

// src/shells/user-info.tsx
import { Fragment, jsx as jsx3, jsxs as jsxs3 } from "react/jsx-runtime";
function UserInfo({
  user,
  showEmail = false
}) {
  const getInitials = useInitials();
  return /* @__PURE__ */ jsxs3(Fragment, { children: [
    /* @__PURE__ */ jsxs3(
      Avatar,
      {
        className: cn(
          compactRadius,
          "group-data-[collapsible=icon]:size-10"
        ),
        children: [
          /* @__PURE__ */ jsx3(AvatarImage, { src: user.avatar, alt: user.name }),
          /* @__PURE__ */ jsx3(
            AvatarFallback,
            {
              className: cn(compactRadius, "bg-muted text-foreground"),
              children: getInitials(user.name)
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxs3(
      "div",
      {
        "data-slot": "user-info-identity",
        className: "text-sm leading-tight grid flex-1 text-left group-data-[collapsible=icon]:hidden",
        children: [
          /* @__PURE__ */ jsx3("span", { className: "font-medium truncate", children: user.name }),
          showEmail && /* @__PURE__ */ jsx3("span", { className: "text-xs truncate text-muted-foreground", children: user.email })
        ]
      }
    )
  ] });
}

// src/shells/user-menu-content.tsx
import { LogOut, Settings } from "lucide-react";
import { Fragment as Fragment2, jsx as jsx4, jsxs as jsxs4 } from "react/jsx-runtime";
function UserMenuContent({
  user,
  settingsHref,
  logoutHref,
  linkComponent,
  onSettingsClick,
  onLogout,
  settingsLabel = "Settings",
  logoutLabel = "Log out"
}) {
  const Link = resolveLink(linkComponent);
  return /* @__PURE__ */ jsxs4(Fragment2, { children: [
    /* @__PURE__ */ jsx4(DropdownMenuLabel, { className: "p-0 font-normal", children: /* @__PURE__ */ jsx4("div", { className: "gap-2 px-1 py-1.5 text-sm flex items-center text-left", children: /* @__PURE__ */ jsx4(UserInfo, { user, showEmail: true }) }) }),
    /* @__PURE__ */ jsx4(DropdownMenuSeparator, {}),
    /* @__PURE__ */ jsx4(DropdownMenuGroup, { children: /* @__PURE__ */ jsx4(DropdownMenuItem, { asChild: true, children: /* @__PURE__ */ jsxs4(
      Link,
      {
        className: "block w-full",
        href: settingsHref,
        as: "button",
        prefetch: true,
        onClick: onSettingsClick,
        children: [
          /* @__PURE__ */ jsx4(Settings, { className: "mr-2" }),
          settingsLabel
        ]
      }
    ) }) }),
    /* @__PURE__ */ jsx4(DropdownMenuSeparator, {}),
    /* @__PURE__ */ jsx4(DropdownMenuItem, { asChild: true, children: /* @__PURE__ */ jsxs4(
      Link,
      {
        className: "block w-full",
        href: logoutHref,
        as: "button",
        onClick: onLogout,
        "data-test": "logout-button",
        children: [
          /* @__PURE__ */ jsx4(LogOut, { className: "mr-2" }),
          logoutLabel
        ]
      }
    ) })
  ] });
}

// src/shells/nav-user.tsx
import { ChevronsUpDown } from "lucide-react";
import { jsx as jsx5, jsxs as jsxs5 } from "react/jsx-runtime";
function NavUser({
  user,
  settingsHref,
  logoutHref,
  linkComponent,
  onSettingsClick,
  onLogout
}) {
  const { state } = useSidebar();
  const isMobile = useIsMobile();
  return /* @__PURE__ */ jsx5(SidebarMenu, { children: /* @__PURE__ */ jsx5(SidebarMenuItem, { children: /* @__PURE__ */ jsxs5(DropdownMenu, { children: [
    /* @__PURE__ */ jsx5(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxs5(
      SidebarMenuButton,
      {
        className: "group group-data-[collapsible=icon]:p-0! cursor-pointer bg-sidebar-accent text-sidebar-accent-foreground hover:bg-sidebar-accent-hover data-[state=open]:bg-sidebar-accent-hover",
        "data-test": "sidebar-menu-button",
        children: [
          /* @__PURE__ */ jsx5(UserInfo, { user }),
          /* @__PURE__ */ jsx5(
            ChevronsUpDown,
            {
              "data-slot": "nav-user-chevron",
              className: "size-4 ml-auto group-data-[collapsible=icon]:hidden"
            }
          )
        ]
      }
    ) }),
    /* @__PURE__ */ jsx5(
      DropdownMenuContent,
      {
        className: "min-w-56 rounded-xl w-(--radix-dropdown-menu-trigger-width)",
        align: "end",
        side: isMobile ? "bottom" : state === "collapsed" ? "left" : "bottom",
        children: /* @__PURE__ */ jsx5(
          UserMenuContent,
          {
            user,
            settingsHref,
            logoutHref,
            linkComponent,
            onSettingsClick,
            onLogout
          }
        )
      }
    )
  ] }) }) });
}

// src/shells/app-sidebar.tsx
import { jsx as jsx6, jsxs as jsxs6 } from "react/jsx-runtime";
function mostSpecificActiveHref(groups, currentUrl) {
  const currentPath = pathOfHref(currentUrl);
  let best = "";
  for (const group of groups) {
    for (const item of group.items) {
      const href = hrefToString(item.href);
      const path = pathOfHref(href);
      const matches = currentPath === path || currentPath.startsWith(`${path}/`);
      if (matches && path.length > best.length) {
        best = href;
      }
    }
  }
  return best;
}
function AppSidebar({
  logo,
  logoHref,
  groups,
  footerItems = [],
  user,
  settingsHref,
  logoutHref,
  currentUrl = "",
  linkComponent,
  collapsibleGroups = false,
  collapsedGroups,
  onCollapsedChange,
  onSettingsClick,
  onLogout
}) {
  const Link = resolveLink(linkComponent);
  const activeHref = mostSpecificActiveHref(groups, currentUrl);
  const resolvedGroups = groups.map((group) => ({
    ...group,
    items: group.items.map((item) => ({
      ...item,
      isActive: hrefToString(item.href) === activeHref
    }))
  }));
  return /* @__PURE__ */ jsxs6(Sidebar, { collapsible: "icon", variant: "inset", children: [
    /* @__PURE__ */ jsx6(SidebarHeader, { children: /* @__PURE__ */ jsx6(SidebarMenu, { children: /* @__PURE__ */ jsx6(SidebarMenuItem, { children: /* @__PURE__ */ jsx6(SidebarMenuButton, { asChild: true, children: /* @__PURE__ */ jsx6(Link, { href: logoHref, prefetch: true, children: logo }) }) }) }) }),
    /* @__PURE__ */ jsx6(SidebarContent, { children: resolvedGroups.map((group, index) => /* @__PURE__ */ jsx6(
      NavMain,
      {
        items: group.items,
        label: group.label ?? "",
        currentUrl,
        linkComponent,
        collapsible: collapsibleGroups,
        collapsedGroups,
        onCollapsedChange
      },
      group.label ?? index
    )) }),
    /* @__PURE__ */ jsxs6(SidebarFooter, { children: [
      footerItems.length > 0 && /* @__PURE__ */ jsx6(NavFooter, { items: footerItems, className: "mt-auto" }),
      /* @__PURE__ */ jsx6(
        NavUser,
        {
          user,
          settingsHref,
          logoutHref,
          linkComponent,
          onSettingsClick,
          onLogout
        }
      )
    ] })
  ] });
}

// src/shells/breadcrumbs.tsx
import { Fragment as Fragment3 } from "react";
import { jsx as jsx7, jsxs as jsxs7 } from "react/jsx-runtime";
function Breadcrumbs({
  breadcrumbs,
  linkComponent
}) {
  const Link = resolveLink(linkComponent);
  if (breadcrumbs.length === 0) {
    return null;
  }
  return /* @__PURE__ */ jsx7(Breadcrumb, { children: /* @__PURE__ */ jsx7(BreadcrumbList, { children: breadcrumbs.map((item, index) => {
    const isLast = index === breadcrumbs.length - 1;
    return /* @__PURE__ */ jsxs7(Fragment3, { children: [
      /* @__PURE__ */ jsx7(BreadcrumbItem, { children: isLast ? /* @__PURE__ */ jsx7(BreadcrumbPage, { children: item.title }) : /* @__PURE__ */ jsx7(BreadcrumbLink, { asChild: true, children: /* @__PURE__ */ jsx7(Link, { href: item.href, children: item.title }) }) }),
      !isLast && /* @__PURE__ */ jsx7(BreadcrumbSeparator, {})
    ] }, index);
  }) }) });
}

// src/shells/app-sidebar-header.tsx
import { Search } from "lucide-react";
import { useEffect, useState as useState2 } from "react";
import { jsx as jsx8, jsxs as jsxs8 } from "react/jsx-runtime";
function AppSidebarHeader({
  breadcrumbs = [],
  linkComponent,
  onSearchClick,
  searchLabel = "Search..."
}) {
  const [modifier, setModifier] = useState2("Ctrl");
  useEffect(() => {
    const platform = navigator.userAgent;
    setModifier(/Mac|iPhone|iPad|iPod/.test(platform) ? "\u2318" : "Ctrl");
  }, []);
  return /* @__PURE__ */ jsxs8("header", { className: "h-16 gap-2 px-6 group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-4 flex shrink-0 items-center border-b border-sidebar-border/50 transition-[width,height] ease-linear", children: [
    /* @__PURE__ */ jsxs8("div", { className: "gap-2 flex items-center", children: [
      /* @__PURE__ */ jsx8(SidebarTrigger, { className: "-ml-1" }),
      /* @__PURE__ */ jsx8(
        Breadcrumbs,
        {
          breadcrumbs,
          linkComponent
        }
      )
    ] }),
    onSearchClick && /* @__PURE__ */ jsxs8(
      "button",
      {
        type: "button",
        onClick: onSearchClick,
        className: "h-9 w-56 gap-2 rounded-xl px-3 text-sm ml-auto flex items-center border border-border/60 bg-muted/30 text-muted-foreground transition-colors hover:bg-muted/50",
        children: [
          /* @__PURE__ */ jsx8(Search, { className: "size-4" }),
          /* @__PURE__ */ jsx8("span", { children: searchLabel }),
          /* @__PURE__ */ jsxs8("kbd", { className: "gap-0.5 px-1.5 py-0.5 font-semibold rounded-xl ml-auto inline-flex items-center border border-border/60 bg-background font-sans text-[10px] text-muted-foreground", children: [
            /* @__PURE__ */ jsx8("span", { children: modifier }),
            /* @__PURE__ */ jsx8("span", { children: "K" })
          ] })
        ]
      }
    )
  ] });
}

// src/shells/heading.tsx
import { jsx as jsx9, jsxs as jsxs9 } from "react/jsx-runtime";
function Heading({
  title,
  description
}) {
  return /* @__PURE__ */ jsxs9("div", { className: "mb-8 space-y-0.5", children: [
    /* @__PURE__ */ jsx9("h2", { className: "text-xl font-semibold tracking-tight", children: title }),
    description && /* @__PURE__ */ jsx9("p", { className: "text-sm text-muted-foreground", children: description })
  ] });
}

// src/shells/settings-layout.tsx
import { jsx as jsx10, jsxs as jsxs10 } from "react/jsx-runtime";
function SettingsLayout({
  items,
  linkComponent,
  currentPath,
  title = "Settings",
  description = "Manage your profile and account settings",
  wide = false,
  children
}) {
  const Link = resolveLink(linkComponent);
  const activePath = currentPath ?? (typeof window === "undefined" ? "" : window.location.pathname);
  return /* @__PURE__ */ jsxs10("div", { className: "px-4 py-6", children: [
    /* @__PURE__ */ jsx10(Heading, { title, description }),
    /* @__PURE__ */ jsxs10("div", { className: "lg:flex-row lg:space-x-12 flex flex-col", children: [
      /* @__PURE__ */ jsx10("aside", { className: "max-w-xl lg:w-48 w-full", children: /* @__PURE__ */ jsx10("nav", { className: "space-y-1 space-x-0 flex flex-col", children: items.map((item, index) => {
        const href = hrefToString(item.href);
        return /* @__PURE__ */ jsx10(
          Button,
          {
            size: "sm",
            variant: "ghost",
            asChild: true,
            className: cn("w-full justify-start", {
              "bg-muted": activePath === href
            }),
            children: /* @__PURE__ */ jsxs10(Link, { href: item.href, children: [
              item.icon && /* @__PURE__ */ jsx10(item.icon, { className: "h-4 w-4" }),
              item.title
            ] })
          },
          `${href}-${index}`
        );
      }) }) }),
      /* @__PURE__ */ jsx10(Separator, { className: "my-6 lg:hidden" }),
      /* @__PURE__ */ jsx10(
        "div",
        {
          className: cn(
            wide ? "min-w-0 flex-1" : "md:max-w-2xl flex-1"
          ),
          children: /* @__PURE__ */ jsx10(
            "section",
            {
              className: cn(
                "space-y-12",
                wide ? "max-w-5xl" : "max-w-xl"
              ),
              children
            }
          )
        }
      )
    ] })
  ] });
}

export {
  SIDEBAR_COLLAPSED_GROUPS_KEY,
  useCollapsedGroup,
  useInitials,
  NavFooter,
  NavMain,
  UserInfo,
  UserMenuContent,
  NavUser,
  AppSidebar,
  Breadcrumbs,
  AppSidebarHeader,
  Heading,
  SettingsLayout
};
//# sourceMappingURL=chunk-HVFTKGOV.js.map