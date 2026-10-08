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
  Icon,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarTrigger,
  useIsMobile,
  useSidebar
} from "./chunk-RDJSOLCI.js";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "./chunk-YN4JPUUI.js";
import {
  hrefToString,
  mostSpecificActiveHref,
  resolveLink
} from "./chunk-APUJ4CKT.js";
import {
  Separator,
  hasNavigableScheme
} from "./chunk-D73FKPPI.js";
import {
  Button,
  useUiLabels
} from "./chunk-LIFCF5RY.js";
import {
  compactRadius
} from "./chunk-H26GY6FP.js";
import {
  cn
} from "./chunk-XN5WW7OR.js";

// src/hooks/use-collapsed-groups.tsx
import { useCallback, useMemo, useSyncExternalStore } from "react";
var SIDEBAR_COLLAPSED_GROUPS_KEY = "akira-ui:collapsed-nav-groups";
var SIDEBAR_EXPANDED_GROUPS_KEY = "akira-ui:expanded-nav-groups";
var NOTHING_STORED = JSON.stringify([null, null]);
var listeners = /* @__PURE__ */ new Set();
var unsavedGroups = /* @__PURE__ */ new Map();
function readItem(key) {
  const unsaved = unsavedGroups.get(key);
  if (unsaved !== void 0) {
    return unsaved;
  }
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}
function writeItem(key, groups) {
  const value = JSON.stringify(groups);
  try {
    window.localStorage.setItem(key, value);
    unsavedGroups.delete(key);
  } catch {
    unsavedGroups.set(key, value);
  }
}
function parseGroups(raw) {
  if (raw === null) {
    return [];
  }
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter(
      (entry) => typeof entry === "string"
    ) : [];
  } catch {
    return [];
  }
}
function subscribe(listener) {
  listeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}
function getSnapshot() {
  return JSON.stringify([
    readItem(SIDEBAR_COLLAPSED_GROUPS_KEY),
    readItem(SIDEBAR_EXPANDED_GROUPS_KEY)
  ]);
}
function getServerSnapshot() {
  return NOTHING_STORED;
}
function withGroup(groups, group, present) {
  if (!present) {
    return groups.filter((entry) => entry !== group);
  }
  return groups.includes(group) ? groups : [...groups, group];
}
function storeGroup(group, open) {
  const collapsed = parseGroups(readItem(SIDEBAR_COLLAPSED_GROUPS_KEY));
  const expanded = parseGroups(readItem(SIDEBAR_EXPANDED_GROUPS_KEY));
  writeItem(SIDEBAR_COLLAPSED_GROUPS_KEY, withGroup(collapsed, group, !open));
  writeItem(SIDEBAR_EXPANDED_GROUPS_KEY, withGroup(expanded, group, open));
  listeners.forEach((listener) => listener());
}
function useCollapsedGroup({
  group,
  defaultOpen = true,
  collapsedGroups,
  onCollapsedChange
}) {
  const isControlled = collapsedGroups !== void 0 && onCollapsedChange !== void 0;
  const snapshot = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );
  const stored = useMemo(() => {
    const [collapsed, expanded] = JSON.parse(snapshot);
    return {
      collapsed: parseGroups(collapsed),
      expanded: parseGroups(expanded)
    };
  }, [snapshot]);
  const setOpen = useCallback(
    (open) => {
      if (isControlled) {
        onCollapsedChange(withGroup(collapsedGroups, group, !open));
        return;
      }
      storeGroup(group, open);
    },
    [collapsedGroups, group, isControlled, onCollapsedChange]
  );
  if (isControlled) {
    return { open: !collapsedGroups.includes(group), setOpen };
  }
  if (stored.collapsed.includes(group)) {
    return { open: false, setOpen };
  }
  if (stored.expanded.includes(group)) {
    return { open: true, setOpen };
  }
  return { open: defaultOpen, setOpen };
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
import { ChevronDown as ChevronDown2 } from "lucide-react";

// src/lib/nav-groups.ts
function groupKey(parentKey, label) {
  return parentKey === "" ? label : `${parentKey}/${label}`;
}
function collectItems(group) {
  return [
    ...group.items,
    ...(group.groups ?? []).flatMap((subgroup) => collectItems(subgroup))
  ];
}
function markActiveItems(groups, activeHref) {
  return groups.map((group) => ({
    ...group,
    items: group.items.map((item) => ({
      ...item,
      isActive: activeHref !== "" && hrefToString(item.href) === activeHref
    })),
    groups: group.groups && markActiveItems(group.groups, activeHref)
  }));
}

// src/shells/nav-main-item.tsx
import { Fragment, jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var BADGE_CEILING = 99;
function badgeContent(badge) {
  if (typeof badge === "number") {
    if (!Number.isFinite(badge) || badge < 1) {
      return null;
    }
    return badge > BADGE_CEILING ? `${BADGE_CEILING}+` : String(Math.trunc(badge));
  }
  if (typeof badge === "string") {
    return badge.trim() === "" ? null : badge;
  }
  if (typeof badge === "boolean" || badge === null || badge === void 0) {
    return null;
  }
  if (Array.isArray(badge) && badge.length === 0) {
    return null;
  }
  return badge;
}
function tooltipText(item, badge) {
  if (badge === null) {
    return item.title;
  }
  const suffix = item.badgeLabel ?? (typeof badge === "string" ? badge : void 0);
  return suffix ? `${item.title} (${suffix})` : item.title;
}
function NavMainItem({
  item,
  isActive,
  linkComponent
}) {
  const Link = resolveLink(linkComponent);
  const badge = badgeContent(item.badge);
  return /* @__PURE__ */ jsxs2(SidebarMenuItem, { children: [
    /* @__PURE__ */ jsx2(
      SidebarMenuButton,
      {
        asChild: true,
        isActive,
        tooltip: { children: tooltipText(item, badge) },
        className: badge === null ? void 0 : "pr-10 group-data-[collapsible=icon]:pr-2.5!",
        children: /* @__PURE__ */ jsxs2(
          Link,
          {
            href: item.href,
            prefetch: true,
            "aria-label": badge !== null && item.badgeLabel ? `${item.title}, ${item.badgeLabel}` : void 0,
            children: [
              item.icon && /* @__PURE__ */ jsx2(item.icon, {}),
              /* @__PURE__ */ jsx2("span", { children: item.title })
            ]
          }
        )
      }
    ),
    badge !== null && /* @__PURE__ */ jsxs2(Fragment, { children: [
      /* @__PURE__ */ jsx2(
        SidebarMenuBadge,
        {
          "aria-hidden": item.badgeLabel ? true : void 0,
          className: "top-1/2! -translate-y-1/2! bg-primary text-primary-foreground peer-hover/menu-button:text-primary-foreground peer-data-[active=true]/menu-button:text-primary-foreground",
          children: badge
        }
      ),
      /* @__PURE__ */ jsx2(
        "span",
        {
          "data-slot": "nav-badge-dot",
          "aria-hidden": true,
          className: "top-1 right-1 size-2 pointer-events-none absolute hidden rounded-full bg-primary group-data-[collapsible=icon]:block"
        }
      )
    ] })
  ] });
}

// src/shells/nav-sub-group.tsx
import { ChevronDown } from "lucide-react";
import { Fragment as Fragment2, jsx as jsx3, jsxs as jsxs3 } from "react/jsx-runtime";
function NavSubGroup({
  group,
  parentKey,
  isItemActive: isItemActive2,
  collapsible,
  linkComponent,
  collapsedGroups,
  onCollapsedChange
}) {
  const label = group.label ?? "";
  const key = label === "" ? parentKey : groupKey(parentKey, label);
  const { open, setOpen } = useCollapsedGroup({
    group: key,
    defaultOpen: group.defaultOpen ?? true,
    collapsedGroups,
    onCollapsedChange
  });
  const holdsCurrentRoute = collectItems(group).some(isItemActive2);
  const expanded = open || holdsCurrentRoute;
  const menu = /* @__PURE__ */ jsxs3(SidebarMenuSub, { children: [
    group.items.map((item, index) => /* @__PURE__ */ jsx3(
      SidebarMenuSubItem,
      {
        children: /* @__PURE__ */ jsx3(
          NavSubGroupLink,
          {
            item,
            isActive: isItemActive2(item),
            linkComponent
          }
        )
      },
      `${hrefToString(item.href)}:${item.title}:${index}`
    )),
    (group.groups ?? []).map((subgroup, index) => /* @__PURE__ */ jsx3(
      NavSubGroup,
      {
        group: subgroup,
        parentKey: key,
        isItemActive: isItemActive2,
        collapsible,
        linkComponent,
        collapsedGroups,
        onCollapsedChange
      },
      `${subgroup.label ?? ""}:${index}`
    ))
  ] });
  if (label === "") {
    return /* @__PURE__ */ jsx3(SidebarMenuItem, { children: menu });
  }
  if (!collapsible) {
    return /* @__PURE__ */ jsxs3(SidebarMenuItem, { children: [
      /* @__PURE__ */ jsx3(
        "div",
        {
          "data-slot": "nav-sub-group-label",
          className: "h-9 px-2.5 text-sm font-medium flex items-center text-sidebar-foreground/70",
          children: label
        }
      ),
      menu
    ] });
  }
  return /* @__PURE__ */ jsx3(SidebarMenuItem, { children: /* @__PURE__ */ jsxs3(Collapsible, { open: expanded, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsx3(CollapsibleTrigger, { asChild: true, children: /* @__PURE__ */ jsxs3(SidebarMenuButton, { className: "justify-between", children: [
      /* @__PURE__ */ jsx3("span", { children: label }),
      /* @__PURE__ */ jsx3(
        ChevronDown,
        {
          className: cn(
            "size-4 transition-transform",
            !expanded && "-rotate-90"
          )
        }
      )
    ] }) }),
    /* @__PURE__ */ jsx3(CollapsibleContent, { children: menu })
  ] }) });
}
function NavSubGroupLink({
  item,
  isActive,
  linkComponent
}) {
  const Link = resolveLink(linkComponent);
  const badge = badgeContent(item.badge);
  return /* @__PURE__ */ jsxs3(Fragment2, { children: [
    /* @__PURE__ */ jsx3(
      SidebarMenuSubButton,
      {
        asChild: true,
        isActive,
        className: badge === null ? void 0 : "pr-9",
        children: /* @__PURE__ */ jsxs3(
          Link,
          {
            href: item.href,
            prefetch: true,
            "aria-label": badge !== null && item.badgeLabel ? `${item.title}, ${item.badgeLabel}` : void 0,
            children: [
              item.icon && /* @__PURE__ */ jsx3(item.icon, {}),
              /* @__PURE__ */ jsx3("span", { children: item.title })
            ]
          }
        )
      }
    ),
    badge !== null && /* @__PURE__ */ jsx3(
      "span",
      {
        "data-slot": "nav-sub-badge",
        "aria-hidden": item.badgeLabel ? true : void 0,
        className: "right-1 min-w-5 px-1 h-5 text-xs font-medium pointer-events-none absolute top-1/2 flex -translate-y-1/2 items-center justify-center rounded-md bg-primary text-primary-foreground tabular-nums",
        children: badge
      }
    )
  ] });
}

// src/shells/nav-main.tsx
import { jsx as jsx4, jsxs as jsxs4 } from "react/jsx-runtime";
function isItemActive(item, activeHref) {
  if (item.isActive !== void 0) {
    return item.isActive;
  }
  return activeHref !== "" && hrefToString(item.href) === activeHref;
}
function NavMain({
  items = [],
  groups = [],
  label,
  iconRail = true,
  currentUrl = "",
  linkComponent,
  collapsible = false,
  defaultOpen = true,
  collapsedGroups,
  onCollapsedChange
}) {
  const { state, isMobile } = useSidebar();
  const allItems = collectItems({ items, groups });
  const activeHref = currentUrl ? mostSpecificActiveHref(
    allItems.filter((item) => item.isActive === void 0).map((item) => item.href),
    currentUrl
  ) : "";
  const isActive = (item) => isItemActive(item, activeHref);
  const holdsCurrentRoute = allItems.some(isActive);
  const { open, setOpen } = useCollapsedGroup({
    group: label ?? "",
    defaultOpen,
    collapsedGroups,
    onCollapsedChange
  });
  const showsIconsOnly = iconRail && state === "collapsed" && !isMobile;
  const expanded = open || holdsCurrentRoute || showsIconsOnly;
  const railItems = showsIconsOnly ? allItems : items;
  const menu = /* @__PURE__ */ jsxs4(SidebarMenu, { children: [
    railItems.map((item, index) => /* @__PURE__ */ jsx4(
      NavMainItem,
      {
        item,
        isActive: isActive(item),
        linkComponent
      },
      `${hrefToString(item.href)}:${item.title}:${index}`
    )),
    !showsIconsOnly && groups.map((group, index) => /* @__PURE__ */ jsx4(
      NavSubGroup,
      {
        group,
        parentKey: label ?? "",
        isItemActive: isActive,
        collapsible,
        linkComponent,
        collapsedGroups,
        onCollapsedChange
      },
      `${group.label ?? ""}:${index}`
    ))
  ] });
  if (!collapsible || !label) {
    return /* @__PURE__ */ jsxs4(SidebarGroup, { className: "px-2 py-0", children: [
      label && /* @__PURE__ */ jsx4(SidebarGroupLabel, { children: label }),
      menu
    ] });
  }
  return /* @__PURE__ */ jsx4(SidebarGroup, { className: "px-2 py-0", children: /* @__PURE__ */ jsxs4(
    Collapsible,
    {
      open: expanded,
      onOpenChange: showsIconsOnly ? void 0 : setOpen,
      children: [
        /* @__PURE__ */ jsx4(CollapsibleTrigger, { asChild: true, children: /* @__PURE__ */ jsx4(SidebarGroupLabel, { asChild: true, children: /* @__PURE__ */ jsxs4(
          "button",
          {
            type: "button",
            tabIndex: showsIconsOnly ? -1 : void 0,
            className: "w-full cursor-pointer justify-between text-left",
            children: [
              label,
              /* @__PURE__ */ jsx4(
                ChevronDown2,
                {
                  className: cn(
                    "size-4 transition-transform",
                    !expanded && "-rotate-90"
                  )
                }
              )
            ]
          }
        ) }) }),
        /* @__PURE__ */ jsx4(CollapsibleContent, { children: menu })
      ]
    }
  ) });
}

// src/shells/user-info.tsx
import { Fragment as Fragment3, jsx as jsx5, jsxs as jsxs5 } from "react/jsx-runtime";
function UserInfo({
  user,
  showEmail = false
}) {
  const getInitials = useInitials();
  return /* @__PURE__ */ jsxs5(Fragment3, { children: [
    /* @__PURE__ */ jsxs5(
      Avatar,
      {
        className: cn(
          compactRadius,
          "group-data-[collapsible=icon]:size-10"
        ),
        children: [
          /* @__PURE__ */ jsx5(AvatarImage, { src: user.avatar, alt: user.name }),
          /* @__PURE__ */ jsx5(
            AvatarFallback,
            {
              className: cn(compactRadius, "bg-muted text-foreground"),
              children: getInitials(user.name)
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxs5(
      "div",
      {
        "data-slot": "user-info-identity",
        className: "text-sm leading-tight grid flex-1 text-left group-data-[collapsible=icon]:hidden",
        children: [
          /* @__PURE__ */ jsx5("span", { className: "font-medium truncate", children: user.name }),
          showEmail && /* @__PURE__ */ jsx5("span", { className: "text-xs truncate text-muted-foreground", children: user.email })
        ]
      }
    )
  ] });
}

// src/shells/user-menu-content.tsx
import { LogOut, Settings } from "lucide-react";
import { Fragment as Fragment4, jsx as jsx6, jsxs as jsxs6 } from "react/jsx-runtime";
var userMenuDefaultLabels = {
  settingsLabel: "Settings",
  logoutLabel: "Log out"
};
function releasingPointerEvents(handler) {
  return () => {
    document.body.style.removeProperty("pointer-events");
    handler?.();
  };
}
function ExtraMenuItem({
  item,
  Link
}) {
  const content = /* @__PURE__ */ jsxs6(Fragment4, { children: [
    item.icon && /* @__PURE__ */ jsx6(item.icon, { className: "mr-2" }),
    item.title
  ] });
  return /* @__PURE__ */ jsx6(DropdownMenuItem, { asChild: true, children: item.external ? /* @__PURE__ */ jsx6(
    "a",
    {
      className: "block w-full",
      href: hrefToString(item.href),
      target: "_blank",
      rel: "noreferrer",
      onClick: releasingPointerEvents(),
      children: content
    }
  ) : /* @__PURE__ */ jsx6(
    Link,
    {
      className: "block w-full",
      href: item.href,
      as: "button",
      prefetch: true,
      onClick: releasingPointerEvents(),
      children: content
    }
  ) });
}
function UserMenuContent({
  user,
  settingsHref,
  logoutHref,
  linkComponent,
  onSettingsClick,
  onLogout,
  settingsLabel,
  logoutLabel,
  labels,
  extraItems = []
}) {
  const Link = resolveLink(linkComponent);
  const text = useUiLabels("userMenu", userMenuDefaultLabels, {
    ...labels,
    settingsLabel: settingsLabel ?? labels?.settingsLabel,
    logoutLabel: logoutLabel ?? labels?.logoutLabel
  });
  const shown = extraItems.filter(
    (item) => item.visible !== false && hasNavigableScheme(hrefToString(item.href))
  );
  const before = shown.filter((item) => item.position === "before");
  const after = shown.filter((item) => item.position !== "before");
  return /* @__PURE__ */ jsxs6(Fragment4, { children: [
    /* @__PURE__ */ jsx6(DropdownMenuLabel, { className: "p-0 font-normal", children: /* @__PURE__ */ jsx6("div", { className: "gap-2 px-1 py-1.5 text-sm flex items-center text-left", children: /* @__PURE__ */ jsx6(UserInfo, { user, showEmail: true }) }) }),
    /* @__PURE__ */ jsx6(DropdownMenuSeparator, {}),
    /* @__PURE__ */ jsxs6(DropdownMenuGroup, { children: [
      before.map((item, index) => /* @__PURE__ */ jsx6(
        ExtraMenuItem,
        {
          item,
          Link
        },
        `before-${index}-${item.title}`
      )),
      /* @__PURE__ */ jsx6(DropdownMenuItem, { asChild: true, children: /* @__PURE__ */ jsxs6(
        Link,
        {
          className: "block w-full",
          href: settingsHref,
          as: "button",
          prefetch: true,
          onClick: releasingPointerEvents(onSettingsClick),
          children: [
            /* @__PURE__ */ jsx6(Settings, { className: "mr-2" }),
            text.settingsLabel
          ]
        }
      ) }),
      after.map((item, index) => /* @__PURE__ */ jsx6(
        ExtraMenuItem,
        {
          item,
          Link
        },
        `after-${index}-${item.title}`
      ))
    ] }),
    /* @__PURE__ */ jsx6(DropdownMenuSeparator, {}),
    /* @__PURE__ */ jsx6(DropdownMenuItem, { asChild: true, children: /* @__PURE__ */ jsxs6(
      Link,
      {
        className: "block w-full",
        href: logoutHref,
        as: "button",
        onClick: releasingPointerEvents(onLogout),
        "data-test": "logout-button",
        children: [
          /* @__PURE__ */ jsx6(LogOut, { className: "mr-2" }),
          text.logoutLabel
        ]
      }
    ) })
  ] });
}

// src/shells/nav-user.tsx
import { ChevronsUpDown } from "lucide-react";
import { jsx as jsx7, jsxs as jsxs7 } from "react/jsx-runtime";
function NavUser({
  user,
  settingsHref,
  logoutHref,
  linkComponent,
  onSettingsClick,
  onLogout,
  labels,
  extraItems
}) {
  const { state } = useSidebar();
  const isMobile = useIsMobile();
  return /* @__PURE__ */ jsx7(SidebarMenu, { children: /* @__PURE__ */ jsx7(SidebarMenuItem, { children: /* @__PURE__ */ jsxs7(DropdownMenu, { children: [
    /* @__PURE__ */ jsx7(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxs7(
      SidebarMenuButton,
      {
        className: "group group-data-[collapsible=icon]:p-0! cursor-pointer bg-sidebar-accent text-sidebar-accent-foreground hover:bg-sidebar-accent-hover data-[state=open]:bg-sidebar-accent-hover",
        "data-test": "sidebar-menu-button",
        children: [
          /* @__PURE__ */ jsx7(UserInfo, { user }),
          /* @__PURE__ */ jsx7(
            ChevronsUpDown,
            {
              "data-slot": "nav-user-chevron",
              className: "size-4 ml-auto group-data-[collapsible=icon]:hidden"
            }
          )
        ]
      }
    ) }),
    /* @__PURE__ */ jsx7(
      DropdownMenuContent,
      {
        className: "min-w-56 rounded-xl w-(--radix-dropdown-menu-trigger-width)",
        align: "end",
        side: isMobile ? "bottom" : state === "collapsed" ? "left" : "bottom",
        children: /* @__PURE__ */ jsx7(
          UserMenuContent,
          {
            user,
            settingsHref,
            logoutHref,
            linkComponent,
            onSettingsClick,
            onLogout,
            labels,
            extraItems
          }
        )
      }
    )
  ] }) }) });
}

// src/shells/app-sidebar.tsx
import { jsx as jsx8, jsxs as jsxs8 } from "react/jsx-runtime";
function AppSidebar(props) {
  const {
    logo,
    logoHref,
    groups,
    footerItems = [],
    footer,
    currentUrl = "",
    linkComponent,
    collapsibleGroups = false,
    collapsedGroups,
    onCollapsedChange,
    collapsible = "icon"
  } = props;
  const Link = resolveLink(linkComponent);
  const activeHref = mostSpecificActiveHref(
    groups.flatMap((group) => collectItems(group).map((item) => item.href)),
    currentUrl
  );
  const resolvedGroups = markActiveItems(groups, activeHref);
  return /* @__PURE__ */ jsxs8(Sidebar, { collapsible, variant: "inset", children: [
    /* @__PURE__ */ jsx8(SidebarHeader, { children: /* @__PURE__ */ jsx8(SidebarMenu, { children: /* @__PURE__ */ jsx8(SidebarMenuItem, { children: /* @__PURE__ */ jsx8(
      SidebarMenuButton,
      {
        asChild: true,
        className: "group-data-[collapsible=icon]:p-0!",
        children: /* @__PURE__ */ jsx8(Link, { href: logoHref, prefetch: true, children: logo })
      }
    ) }) }) }),
    /* @__PURE__ */ jsx8(SidebarContent, { children: resolvedGroups.map((group, index) => /* @__PURE__ */ jsx8(
      NavMain,
      {
        items: group.items,
        groups: group.groups,
        iconRail: collapsible === "icon",
        defaultOpen: group.defaultOpen ?? true,
        label: group.label ?? "",
        currentUrl,
        linkComponent,
        collapsible: collapsibleGroups,
        collapsedGroups,
        onCollapsedChange
      },
      group.label ?? index
    )) }),
    /* @__PURE__ */ jsxs8(SidebarFooter, { children: [
      footerItems.length > 0 && /* @__PURE__ */ jsx8(NavFooter, { items: footerItems, className: "mt-auto" }),
      footer,
      props.user != null && /* @__PURE__ */ jsx8(
        NavUser,
        {
          user: props.user,
          settingsHref: props.settingsHref,
          logoutHref: props.logoutHref,
          linkComponent,
          onSettingsClick: props.onSettingsClick,
          onLogout: props.onLogout,
          labels: props.userMenuLabels,
          extraItems: props.extraItems
        }
      )
    ] })
  ] });
}

// src/shells/breadcrumbs.tsx
import { Fragment as Fragment5 } from "react";
import { jsx as jsx9, jsxs as jsxs9 } from "react/jsx-runtime";
function Breadcrumbs({
  breadcrumbs,
  linkComponent,
  collapseBelowSm = false
}) {
  const Link = resolveLink(linkComponent);
  if (breadcrumbs.length === 0) {
    return null;
  }
  const truncate = collapseBelowSm ? "truncate" : void 0;
  const hiddenBelowSm = collapseBelowSm && "sm:inline-flex hidden";
  return /* @__PURE__ */ jsx9(Breadcrumb, { className: collapseBelowSm ? "min-w-0" : void 0, children: /* @__PURE__ */ jsx9(
    BreadcrumbList,
    {
      className: cn(collapseBelowSm && "min-w-0 flex-nowrap"),
      children: breadcrumbs.map((item, index) => {
        const isLast = index === breadcrumbs.length - 1;
        const fullTitle = collapseBelowSm ? item.title : void 0;
        return /* @__PURE__ */ jsxs9(Fragment5, { children: [
          /* @__PURE__ */ jsx9(
            BreadcrumbItem,
            {
              className: cn(
                collapseBelowSm && "min-w-0",
                !isLast && hiddenBelowSm
              ),
              children: isLast ? /* @__PURE__ */ jsx9(
                BreadcrumbPage,
                {
                  className: truncate,
                  title: fullTitle,
                  children: item.title
                }
              ) : /* @__PURE__ */ jsx9(BreadcrumbLink, { asChild: true, children: /* @__PURE__ */ jsx9(
                Link,
                {
                  href: item.href,
                  className: truncate,
                  title: fullTitle,
                  children: item.title
                }
              ) })
            }
          ),
          !isLast && /* @__PURE__ */ jsx9(
            BreadcrumbSeparator,
            {
              className: cn(hiddenBelowSm)
            }
          )
        ] }, index);
      })
    }
  ) });
}

// src/shells/app-sidebar-header.tsx
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { jsx as jsx10, jsxs as jsxs10 } from "react/jsx-runtime";
function AppSidebarHeader({
  actions,
  breadcrumbs = [],
  linkComponent,
  onSearchClick,
  searchLabel = "Search..."
}) {
  const [modifier, setModifier] = useState("Ctrl");
  useEffect(() => {
    const platform = navigator.userAgent;
    setModifier(/Mac|iPhone|iPad|iPod/.test(platform) ? "\u2318" : "Ctrl");
  }, []);
  return /* @__PURE__ */ jsxs10("header", { className: "h-16 gap-2 px-6 group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-4 flex shrink-0 items-center border-b border-sidebar-border/50 transition-[width,height] ease-linear", children: [
    /* @__PURE__ */ jsxs10("div", { className: "min-w-0 gap-2 flex items-center", children: [
      /* @__PURE__ */ jsx10(SidebarTrigger, { className: "-ml-1" }),
      /* @__PURE__ */ jsx10(
        Breadcrumbs,
        {
          breadcrumbs,
          linkComponent,
          collapseBelowSm: true
        }
      )
    ] }),
    onSearchClick && /* @__PURE__ */ jsxs10(
      "button",
      {
        type: "button",
        onClick: onSearchClick,
        "aria-label": searchLabel,
        className: "h-9 w-9 gap-2 rounded-xl text-sm sm:w-56 sm:justify-start sm:px-3 ml-auto flex shrink-0 items-center justify-center border border-border/60 bg-muted/30 text-muted-foreground transition-colors hover:bg-muted/50",
        children: [
          /* @__PURE__ */ jsx10(Search, { className: "size-4" }),
          /* @__PURE__ */ jsx10("span", { className: "sm:inline hidden", children: searchLabel }),
          /* @__PURE__ */ jsxs10("kbd", { className: "gap-0.5 px-1.5 py-0.5 font-semibold rounded-xl sm:inline-flex ml-auto hidden items-center border border-border/60 bg-background font-sans text-[10px] text-muted-foreground", children: [
            /* @__PURE__ */ jsx10("span", { children: modifier }),
            /* @__PURE__ */ jsx10("span", { children: "K" })
          ] })
        ]
      }
    ),
    actions ? /* @__PURE__ */ jsx10(
      "div",
      {
        "data-slot": "app-sidebar-header-actions",
        className: cn(
          "gap-2 flex items-center",
          !onSearchClick && "ml-auto"
        ),
        children: actions
      }
    ) : null
  ] });
}

// src/shells/heading.tsx
import { jsx as jsx11, jsxs as jsxs11 } from "react/jsx-runtime";
function Heading({
  title,
  description
}) {
  return /* @__PURE__ */ jsxs11("div", { className: "mb-8 space-y-0.5", children: [
    /* @__PURE__ */ jsx11("h2", { className: "text-xl font-semibold tracking-tight", children: title }),
    description && /* @__PURE__ */ jsx11("p", { className: "text-sm text-muted-foreground", children: description })
  ] });
}

// src/shells/settings-layout.tsx
import { jsx as jsx12, jsxs as jsxs12 } from "react/jsx-runtime";
var settingsLayoutDefaultLabels = {
  title: "Settings",
  description: "Manage your profile and account settings"
};
function SettingsLayout({
  items,
  linkComponent,
  currentPath,
  title,
  description,
  wide = false,
  children
}) {
  const Link = resolveLink(linkComponent);
  const text = useUiLabels("settingsLayout", settingsLayoutDefaultLabels, {
    title,
    description
  });
  const activePath = currentPath ?? (typeof window === "undefined" ? "" : window.location.pathname);
  return /* @__PURE__ */ jsxs12("div", { className: "px-4 py-6", children: [
    /* @__PURE__ */ jsx12(Heading, { title: text.title, description: text.description }),
    /* @__PURE__ */ jsxs12("div", { className: "lg:flex-row lg:space-x-12 flex flex-col", children: [
      /* @__PURE__ */ jsx12("aside", { className: "max-w-xl lg:w-48 w-full", children: /* @__PURE__ */ jsx12("nav", { className: "space-y-1 space-x-0 flex flex-col", children: items.map((item, index) => {
        const href = hrefToString(item.href);
        return /* @__PURE__ */ jsx12(
          Button,
          {
            size: "sm",
            variant: "ghost",
            asChild: true,
            className: cn("w-full justify-start", {
              "bg-muted": activePath === href
            }),
            children: /* @__PURE__ */ jsxs12(Link, { href: item.href, children: [
              item.icon && /* @__PURE__ */ jsx12(item.icon, { className: "h-4 w-4" }),
              item.title
            ] })
          },
          `${href}-${index}`
        );
      }) }) }),
      /* @__PURE__ */ jsx12(Separator, { className: "my-6 lg:hidden" }),
      /* @__PURE__ */ jsx12(
        "div",
        {
          className: cn(
            wide ? "min-w-0 flex-1" : "md:max-w-2xl flex-1"
          ),
          children: /* @__PURE__ */ jsx12(
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
  SIDEBAR_EXPANDED_GROUPS_KEY,
  useCollapsedGroup,
  useInitials,
  NavFooter,
  NavMain,
  UserInfo,
  userMenuDefaultLabels,
  UserMenuContent,
  NavUser,
  AppSidebar,
  Breadcrumbs,
  AppSidebarHeader,
  Heading,
  settingsLayoutDefaultLabels,
  SettingsLayout
};
//# sourceMappingURL=chunk-3QGYW4PV.js.map