import { U as UrlLike, N as NavGroup, c as NavItem, d as SharedUser, L as LinkComponent, B as BreadcrumbItem, S as SlotNameProps } from './types-CMZRvMV5.js';
export { C as Column, a as ColumnDef, F as FilterFn, I as IconComponent, e as LinkProps, b as LucideIcon, R as Row, T as TableInstance } from './types-CMZRvMV5.js';
import * as React from 'react';
import { ReactNode, ComponentPropsWithoutRef, PropsWithChildren } from 'react';
import { d as SidebarGroup } from './sidebar-CYd36Wyf.js';
import '@tanstack/react-table';
import 'lucide-react';
import 'class-variance-authority/types';
import 'class-variance-authority';
import './input-R3dvXqSY.js';
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

interface AppSidebarProps {
    logo: ReactNode;
    logoHref: UrlLike;
    groups: NavGroup[];
    footerItems?: NavItem[];
    user: SharedUser;
    settingsHref: UrlLike;
    logoutHref: UrlLike;
    currentUrl?: string;
    linkComponent?: LinkComponent;
    collapsibleGroups?: boolean;
    collapsedGroups?: string[];
    onCollapsedChange?: (collapsedGroups: string[]) => void;
    onSettingsClick?: () => void;
    onLogout?: () => void;
}
declare function AppSidebar({ logo, logoHref, groups, footerItems, user, settingsHref, logoutHref, currentUrl, linkComponent, collapsibleGroups, collapsedGroups, onCollapsedChange, onSettingsClick, onLogout, }: AppSidebarProps): React.JSX.Element;

interface AppSidebarHeaderProps {
    breadcrumbs?: BreadcrumbItem[];
    linkComponent?: LinkComponent;
    onSearchClick?: () => void;
    searchLabel?: string;
}
declare function AppSidebarHeader({ breadcrumbs, linkComponent, onSearchClick, searchLabel, }: AppSidebarHeaderProps): React.JSX.Element;

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

declare function Breadcrumbs({ breadcrumbs, linkComponent, }: {
    breadcrumbs: BreadcrumbItem[];
    linkComponent?: LinkComponent;
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
    label?: string;
    currentUrl?: string;
    linkComponent?: LinkComponent;
    collapsible?: boolean;
    defaultOpen?: boolean;
    collapsedGroups?: string[];
    onCollapsedChange?: (collapsedGroups: string[]) => void;
}
declare function NavMain({ items, label, currentUrl, linkComponent, collapsible, defaultOpen, collapsedGroups, onCollapsedChange, }: NavMainProps): React.JSX.Element;

interface NavUserProps {
    user: SharedUser;
    settingsHref: UrlLike;
    logoutHref: UrlLike;
    linkComponent?: LinkComponent;
    onSettingsClick?: () => void;
    onLogout?: () => void;
}
declare function NavUser({ user, settingsHref, logoutHref, linkComponent, onSettingsClick, onLogout, }: NavUserProps): React.JSX.Element;

interface SettingsLayoutProps {
    items: NavItem[];
    linkComponent?: LinkComponent;
    currentPath?: string;
    title?: string;
    description?: string;
    wide?: boolean;
}
declare function SettingsLayout({ items, linkComponent, currentPath, title, description, wide, children, }: PropsWithChildren<SettingsLayoutProps>): React.JSX.Element;

declare function UserInfo({ user, showEmail, }: {
    user: SharedUser;
    showEmail?: boolean;
}): React.JSX.Element;

interface UserMenuContentProps {
    user: SharedUser;
    settingsHref: UrlLike;
    logoutHref: UrlLike;
    linkComponent?: LinkComponent;
    onSettingsClick?: () => void;
    onLogout?: () => void;
    settingsLabel?: string;
    logoutLabel?: string;
}
declare function UserMenuContent({ user, settingsHref, logoutHref, linkComponent, onSettingsClick, onLogout, settingsLabel, logoutLabel, }: UserMenuContentProps): React.JSX.Element;

export { AppContent, AppShell, AppSidebar, AppSidebarHeader, type Appearance, type AuthArrangement, AuthShell, AuthShellBody, type AuthShellBodyProps, AuthShellFooter, type AuthShellFooterProps, AuthShellHeading, type AuthShellHeadingProps, AuthShellLogo, type AuthShellLogoProps, AuthShellMain, type AuthShellMainProps, AuthShellPanel, type AuthShellPanelProps, type AuthShellProps, AuthShellRoot, type AuthShellRootProps, AuthShellSurface, type AuthShellSurfaceProps, BreadcrumbItem, Breadcrumbs, Heading, LinkComponent, NavFooter, NavGroup, NavItem, NavMain, type NavMainProps, NavUser, SIDEBAR_COLLAPSED_GROUPS_KEY, SettingsLayout, type SettingsLayoutProps, SharedUser, SlotNameProps, UrlLike, UserInfo, UserMenuContent, hrefToString, initializeTheme, useAppearance, useAuthArrangement, useCollapsedGroup, useInitials, useIsMobile };
