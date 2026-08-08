export { hrefToString } from '@/lib/href';
export * from '@/types';

export {
    initializeTheme,
    useAppearance,
    type Appearance,
} from '@/hooks/use-appearance';
export {
    SIDEBAR_COLLAPSED_GROUPS_KEY,
    useCollapsedGroup,
} from '@/hooks/use-collapsed-groups';
export { useInitials } from '@/hooks/use-initials';
export { useIsMobile } from '@/hooks/use-mobile';

export { AppContent } from '@/shells/app-content';
export { AppShell } from '@/shells/app-shell';
export { AppSidebar } from '@/shells/app-sidebar';
export { AppSidebarHeader } from '@/shells/app-sidebar-header';
export {
    AuthShell,
    AuthShellBody,
    AuthShellFooter,
    AuthShellHeading,
    AuthShellLogo,
    AuthShellMain,
    AuthShellPanel,
    AuthShellRoot,
    AuthShellSurface,
    useAuthArrangement,
    type AuthArrangement,
    type AuthShellBodyProps,
    type AuthShellFooterProps,
    type AuthShellHeadingProps,
    type AuthShellLogoProps,
    type AuthShellMainProps,
    type AuthShellPanelProps,
    type AuthShellProps,
    type AuthShellRootProps,
    type AuthShellSurfaceProps,
} from '@/shells/auth-shell';
export { Breadcrumbs } from '@/shells/breadcrumbs';
export { Heading } from '@/shells/heading';
export { NavFooter } from '@/shells/nav-footer';
export { NavMain, type NavMainProps } from '@/shells/nav-main';
export { NavUser } from '@/shells/nav-user';
export {
    SettingsLayout,
    type SettingsLayoutProps,
} from '@/shells/settings-layout';
export { UserInfo } from '@/shells/user-info';
export { UserMenuContent } from '@/shells/user-menu-content';
