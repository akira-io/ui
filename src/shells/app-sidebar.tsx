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
import { hrefToString, resolveLink } from '@/lib/href';
import type {
    LinkComponent,
    NavGroup,
    NavItem,
    SharedUser,
    UrlLike,
} from '@/types';
import { NavFooter } from './nav-footer';
import { NavMain } from './nav-main';
import { NavUser } from './nav-user';

function mostSpecificActiveHref(
    groups: NavGroup[],
    currentUrl: string,
): string {
    let best = '';
    for (const group of groups) {
        for (const item of group.items) {
            const href = hrefToString(item.href);
            const matches =
                currentUrl === href || currentUrl.startsWith(`${href}/`);
            if (matches && href.length > best.length) {
                best = href;
            }
        }
    }
    return best;
}

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
}: AppSidebarProps) {
    const Link = resolveLink(linkComponent);
    const activeHref = mostSpecificActiveHref(groups, currentUrl);
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
                        <SidebarMenuButton asChild>
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
                />
            </SidebarFooter>
        </Sidebar>
    );
}
