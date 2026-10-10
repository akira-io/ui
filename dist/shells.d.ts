import { U as UrlLike, S as SlotNameProps, B as BreadcrumbItem, L as LinkComponent, N as NavItem, b as NavGroup, c as SharedUser, d as UserMenuItem } from './types-Be72a3UT.js';
export { I as IconComponent, e as LinkProps, a as LucideIcon } from './types-Be72a3UT.js';
import * as React from 'react';
import { ReactNode, ComponentPropsWithoutRef } from 'react';
export { c as AppSidebar, a as AppSidebarAccountProps, A as AppSidebarBaseProps, d as AppSidebarCollapsible, e as AppSidebarHeader, b as AppSidebarHeaderProps, f as AppSidebarProps, g as AppSidebarUserProps, h as AppSidebarWithoutUserProps } from './app-sidebar-header-DN8G2L_q.js';
import { f as SidebarGroup } from './settings-layout-RO7EhmRk.js';
export { J as SettingsLayout, H as SettingsLayoutLabels, K as SettingsLayoutProps, L as settingsLayoutDefaultLabels } from './settings-layout-RO7EhmRk.js';
import { U as UserMenuLabels } from './user-menu-content-Dv0YifkI.js';
export { a as UserMenuContent, u as userMenuDefaultLabels } from './user-menu-content-Dv0YifkI.js';
import 'lucide-react';
import 'class-variance-authority/types';
import 'class-variance-authority';
import '@radix-ui/react-separator';
import '@radix-ui/react-tooltip';

declare function hrefToString(href: UrlLike): string;

type Appearance = 'light' | 'dark' | 'system';
declare function initializeTheme(): void;
declare function useAppearance(): {
    readonly appearance: Appearance;
    readonly updateAppearance: (mode: Appearance) => void;
};

declare const SIDEBAR_COLLAPSED_GROUPS_KEY = "akira-ui:collapsed-nav-groups";
declare const SIDEBAR_EXPANDED_GROUPS_KEY = "akira-ui:expanded-nav-groups";
interface CollapsedGroupsOptions {
    group: string;
    defaultOpen?: boolean;
    collapsedGroups?: string[];
    onCollapsedChange?: (collapsedGroups: string[]) => void;
}
declare function useCollapsedGroup({ group, defaultOpen, collapsedGroups, onCollapsedChange, }: CollapsedGroupsOptions): {
    open: boolean;
    setOpen: (open: boolean) => void;
};

declare function useInitials(): (fullName: string) => string;

declare function useIsMobile(): boolean;

interface AppContentProps extends React.ComponentProps<'main'> {
    variant?: 'header' | 'sidebar';
}
declare function AppContent({ variant, children, ...props }: AppContentProps): React.JSX.Element;

interface AppShellProps {
    children: React.ReactNode;
    variant?: 'header' | 'sidebar';
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    defaultOpen?: boolean;
}
declare function AppShell({ children, variant, open, onOpenChange, defaultOpen, }: AppShellProps): React.JSX.Element;

type AuthArrangement = 'centred' | 'split';
declare function useAuthArrangement(): AuthArrangement;
interface AuthShellRootProps {
    arrangement?: AuthArrangement;
    appearanceControl?: ReactNode;
    children: ReactNode;
    className?: string;
}
declare function AuthShellRoot({ arrangement, appearanceControl, children, className, slotName, }: AuthShellRootProps & SlotNameProps): React.JSX.Element;
interface AuthShellMainProps {
    children: ReactNode;
}
declare function AuthShellMain({ children, slotName, }: AuthShellMainProps & SlotNameProps): React.JSX.Element;
interface AuthShellPanelProps {
    decorative?: boolean;
    arrangement?: AuthArrangement;
    children: ReactNode;
}
declare function AuthShellPanel({ decorative, arrangement, children, slotName, }: AuthShellPanelProps & SlotNameProps): React.JSX.Element | null;
interface AuthShellSurfaceProps {
    children: ReactNode;
    className?: string;
}
declare function AuthShellSurface({ children, className, slotName, }: AuthShellSurfaceProps & SlotNameProps): React.JSX.Element;
interface AuthShellLogoProps {
    children: ReactNode;
}
declare function AuthShellLogo({ children, slotName, }: AuthShellLogoProps & SlotNameProps): React.JSX.Element;
interface AuthShellHeadingProps {
    title: string;
    description?: string;
    align?: 'start' | 'center';
}
declare function AuthShellHeading({ title, description, align, slotName, }: AuthShellHeadingProps & SlotNameProps): React.JSX.Element;
interface AuthShellBodyProps {
    children: ReactNode;
}
declare function AuthShellBody({ children, slotName, }: AuthShellBodyProps & SlotNameProps): React.JSX.Element;
interface AuthShellFooterProps {
    children: ReactNode;
}
declare function AuthShellFooter({ children, slotName, }: AuthShellFooterProps & SlotNameProps): React.JSX.Element;
interface AuthShellProps {
    logo?: ReactNode;
    title: string;
    description?: string;
    arrangement?: AuthArrangement;
    panel?: ReactNode;
    panelDecorative?: boolean;
    footer?: ReactNode;
    appearanceControl?: ReactNode;
    surface?: boolean;
    children: ReactNode;
    className?: string;
}
declare function AuthShell({ logo, title, description, arrangement, panel, panelDecorative, footer, appearanceControl, surface, children, className, slotName, }: AuthShellProps & SlotNameProps): React.JSX.Element;

declare function Breadcrumbs({ breadcrumbs, linkComponent, collapseBelowSm, }: {
    breadcrumbs: BreadcrumbItem[];
    linkComponent?: LinkComponent;
    collapseBelowSm?: boolean;
}): React.JSX.Element | null;

declare function Heading({ title, description, }: {
    title: string;
    description?: string;
}): React.JSX.Element;

declare function NavFooter({ items, className, ...props }: ComponentPropsWithoutRef<typeof SidebarGroup> & {
    items: NavItem[];
}): React.JSX.Element;

interface NavMainProps {
    items: NavItem[];
    groups?: NavGroup[];
    label?: string;
    iconRail?: boolean;
    currentUrl?: string;
    linkComponent?: LinkComponent;
    collapsible?: boolean;
    defaultOpen?: boolean;
    collapsedGroups?: string[];
    onCollapsedChange?: (collapsedGroups: string[]) => void;
}
declare function NavMain({ items, groups, label, iconRail, currentUrl, linkComponent, collapsible, defaultOpen, collapsedGroups, onCollapsedChange, }: NavMainProps): React.JSX.Element;

interface NavUserProps {
    user: SharedUser;
    settingsHref: UrlLike;
    logoutHref: UrlLike;
    linkComponent?: LinkComponent;
    onSettingsClick?: () => void;
    onLogout?: () => void;
    labels?: Partial<UserMenuLabels>;
    extraItems?: UserMenuItem[];
}
declare function NavUser({ user, settingsHref, logoutHref, linkComponent, onSettingsClick, onLogout, labels, extraItems, }: NavUserProps): React.JSX.Element;

declare function UserInfo({ user, showEmail, }: {
    user: SharedUser;
    showEmail?: boolean;
}): React.JSX.Element;

export { AppContent, type AppContentProps, AppShell, type AppShellProps, type Appearance, type AuthArrangement, AuthShell, AuthShellBody, type AuthShellBodyProps, AuthShellFooter, type AuthShellFooterProps, AuthShellHeading, type AuthShellHeadingProps, AuthShellLogo, type AuthShellLogoProps, AuthShellMain, type AuthShellMainProps, AuthShellPanel, type AuthShellPanelProps, type AuthShellProps, AuthShellRoot, type AuthShellRootProps, AuthShellSurface, type AuthShellSurfaceProps, BreadcrumbItem, Breadcrumbs, Heading, LinkComponent, NavFooter, NavGroup, NavItem, NavMain, type NavMainProps, NavUser, SIDEBAR_COLLAPSED_GROUPS_KEY, SIDEBAR_EXPANDED_GROUPS_KEY, SharedUser, SlotNameProps, UrlLike, UserInfo, UserMenuItem, UserMenuLabels, hrefToString, initializeTheme, useAppearance, useAuthArrangement, useCollapsedGroup, useInitials, useIsMobile };
