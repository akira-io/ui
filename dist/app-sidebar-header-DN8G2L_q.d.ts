import * as React from 'react';
import { ReactNode } from 'react';
import { U as UrlLike, b as NavGroup, N as NavItem, L as LinkComponent, c as SharedUser, d as UserMenuItem, B as BreadcrumbItem } from './types-Be72a3UT.js';
import { U as UserMenuLabels } from './user-menu-content-Dv0YifkI.js';

type AppSidebarCollapsible = 'icon' | 'offcanvas' | 'none';
interface AppSidebarBaseProps {
    logo: ReactNode;
    logoHref: UrlLike;
    groups: NavGroup[];
    footerItems?: NavItem[];
    footer?: ReactNode;
    currentUrl?: string;
    linkComponent?: LinkComponent;
    collapsibleGroups?: boolean;
    collapsedGroups?: string[];
    onCollapsedChange?: (collapsedGroups: string[]) => void;
    collapsible?: AppSidebarCollapsible;
}
interface AppSidebarUserProps {
    user: SharedUser;
    settingsHref: UrlLike;
    logoutHref: UrlLike;
    onSettingsClick?: () => void;
    onLogout?: () => void;
    userMenuLabels?: Partial<UserMenuLabels>;
    extraItems?: UserMenuItem[];
}
type AppSidebarWithoutUserProps = {
    [Key in keyof AppSidebarUserProps]?: undefined;
};
type AppSidebarAccountProps = AppSidebarUserProps | AppSidebarWithoutUserProps;
type AppSidebarProps = AppSidebarBaseProps & AppSidebarAccountProps;
declare function AppSidebar(props: AppSidebarProps): React.JSX.Element;

interface AppSidebarHeaderProps {
    actions?: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
    linkComponent?: LinkComponent;
    onSearchClick?: () => void;
    searchLabel?: string;
}
declare function AppSidebarHeader({ actions, breadcrumbs, linkComponent, onSearchClick, searchLabel, }: AppSidebarHeaderProps): React.JSX.Element;

export { type AppSidebarBaseProps as A, type AppSidebarAccountProps as a, type AppSidebarHeaderProps as b, AppSidebar as c, type AppSidebarCollapsible as d, AppSidebarHeader as e, type AppSidebarProps as f, type AppSidebarUserProps as g, type AppSidebarWithoutUserProps as h };
