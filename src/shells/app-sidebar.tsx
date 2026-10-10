import { type ReactNode } from 'react';

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { mostSpecificActiveHref, resolveLink } from '@/lib/href';
import { collectItems, markActiveItems } from '@/lib/nav-groups';
import type {
    LinkComponent,
    NavGroup,
    NavItem,
    SharedUser,
    UrlLike,
    UserMenuItem,
} from '@/types';
import { NavFooter } from './nav-footer';
import { NavMain } from './nav-main';
import { NavUser } from './nav-user';
import type { UserMenuLabels } from './user-menu-content';

export type AppSidebarCollapsible = 'icon' | 'offcanvas' | 'none';

export interface AppSidebarBaseProps {
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

export interface AppSidebarUserProps {
    user: SharedUser;
    settingsHref: UrlLike;
    logoutHref: UrlLike;
    onSettingsClick?: () => void;
    onLogout?: () => void;
    userMenuLabels?: Partial<UserMenuLabels>;
    extraItems?: UserMenuItem[];
}

export type AppSidebarWithoutUserProps = {
    [Key in keyof AppSidebarUserProps]?: undefined;
};

export type AppSidebarAccountProps =
    | AppSidebarUserProps
    | AppSidebarWithoutUserProps;

export type AppSidebarProps = AppSidebarBaseProps & AppSidebarAccountProps;

export function AppSidebar(props: AppSidebarProps) {
    const {
        logo,
        logoHref,
        groups,
        footerItems = [],
        footer,
        currentUrl = '',
        linkComponent,
        collapsibleGroups = false,
        collapsedGroups,
        onCollapsedChange,
        collapsible = 'icon',
    } = props;
    const Link = resolveLink(linkComponent);
    const activeHref = mostSpecificActiveHref(
        groups.flatMap((group) => collectItems(group).map((item) => item.href)),
        currentUrl,
    );
    const resolvedGroups = markActiveItems(groups, activeHref);

    return (
        <Sidebar collapsible={collapsible} variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            size="lg"
                            asChild
                            className="group-data-[collapsible=icon]:p-0!"
                        >
                            <Link href={logoHref} prefetch>
                                {logo}
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                {resolvedGroups.map((group, index) => (
                    <NavMain
                        key={group.label ?? index}
                        items={group.items}
                        groups={group.groups}
                        iconRail={collapsible === 'icon'}
                        defaultOpen={group.defaultOpen ?? true}
                        label={group.label ?? ''}
                        currentUrl={currentUrl}
                        linkComponent={linkComponent}
                        collapsible={collapsibleGroups}
                        collapsedGroups={collapsedGroups}
                        onCollapsedChange={onCollapsedChange}
                    />
                ))}
            </SidebarContent>

            <SidebarFooter>
                {footerItems.length > 0 && (
                    <NavFooter items={footerItems} className="mt-auto" />
                )}
                {footer}
                {props.user != null && (
                    <NavUser
                        user={props.user}
                        settingsHref={props.settingsHref}
                        logoutHref={props.logoutHref}
                        linkComponent={linkComponent}
                        onSettingsClick={props.onSettingsClick}
                        onLogout={props.onLogout}
                        labels={props.userMenuLabels}
                        extraItems={props.extraItems}
                    />
                )}
            </SidebarFooter>
        </Sidebar>
    );
}
