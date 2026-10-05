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
import { hrefToString, mostSpecificActiveHref, resolveLink } from '@/lib/href';
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

export interface AppSidebarProps {
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

export function AppSidebar({
    logo,
    logoHref,
    groups,
    footerItems = [],
    user,
    settingsHref,
    logoutHref,
    currentUrl = '',
    linkComponent,
    collapsibleGroups = false,
    collapsedGroups,
    onCollapsedChange,
    onSettingsClick,
    onLogout,
    userMenuLabels,
    extraItems,
}: AppSidebarProps) {
    const Link = resolveLink(linkComponent);
    const activeHref = mostSpecificActiveHref(
        groups.flatMap((group) => group.items.map((item) => item.href)),
        currentUrl,
    );
    const resolvedGroups = groups.map((group) => ({
        ...group,
        items: group.items.map((item) => ({
            ...item,
            isActive: hrefToString(item.href) === activeHref,
        })),
    }));

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
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
                <NavUser
                    user={user}
                    settingsHref={settingsHref}
                    logoutHref={logoutHref}
                    linkComponent={linkComponent}
                    onSettingsClick={onSettingsClick}
                    onLogout={onLogout}
                    labels={userMenuLabels}
                    extraItems={extraItems}
                />
            </SidebarFooter>
        </Sidebar>
    );
}
