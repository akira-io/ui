import * as React from 'react';
import { ReactNode } from 'react';
import { U as UrlLike, e as NavGroup, N as NavItem, b as SharedUser, L as LinkComponent, c as UserMenuItem, B as BreadcrumbItem } from './types-CTEMbVhK.js';
import { U as UserMenuLabels } from './user-menu-content-Bi8E7Kkf.js';

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
    userMenuLabels?: Partial<UserMenuLabels>;
    extraItems?: UserMenuItem[];
}
declare function AppSidebar({ logo, logoHref, groups, footerItems, user, settingsHref, logoutHref, currentUrl, linkComponent, collapsibleGroups, collapsedGroups, onCollapsedChange, onSettingsClick, onLogout, userMenuLabels, extraItems, }: AppSidebarProps): React.JSX.Element;

interface AppSidebarHeaderProps {
    actions?: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
    linkComponent?: LinkComponent;
    onSearchClick?: () => void;
    searchLabel?: string;
}
declare function AppSidebarHeader({ actions, breadcrumbs, linkComponent, onSearchClick, searchLabel, }: AppSidebarHeaderProps): React.JSX.Element;

export { type AppSidebarProps as A, type AppSidebarHeaderProps as a, AppSidebar as b, AppSidebarHeader as c };
