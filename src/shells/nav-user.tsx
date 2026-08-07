import { ChevronsUpDown } from 'lucide-react';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from '@/components/ui/sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import type { LinkComponent, SharedUser, UrlLike } from '@/types';
import { UserInfo } from './user-info';
import { UserMenuContent } from './user-menu-content';

interface NavUserProps {
    user: SharedUser;
    settingsHref: UrlLike;
    logoutHref: UrlLike;
    linkComponent?: LinkComponent;
    onSettingsClick?: () => void;
    onLogout?: () => void;
}

export function NavUser({
    user,
    settingsHref,
    logoutHref,
    linkComponent,
    onSettingsClick,
    onLogout,
}: NavUserProps) {
    const { state } = useSidebar();
    const isMobile = useIsMobile();

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            className="group group-data-[collapsible=icon]:p-0! text-sidebar-accent-foreground data-[state=open]:bg-sidebar-accent"
                            data-test="sidebar-menu-button"
                        >
                            <UserInfo user={user} />
                            <ChevronsUpDown
                                data-slot="nav-user-chevron"
                                className="size-4 ml-auto group-data-[collapsible=icon]:hidden"
                            />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="min-w-56 rounded-xl w-(--radix-dropdown-menu-trigger-width)"
                        align="end"
                        side={
                            isMobile
                                ? 'bottom'
                                : state === 'collapsed'
                                  ? 'left'
                                  : 'bottom'
                        }
                    >
                        <UserMenuContent
                            user={user}
                            settingsHref={settingsHref}
                            logoutHref={logoutHref}
                            linkComponent={linkComponent}
                            onSettingsClick={onSettingsClick}
                            onLogout={onLogout}
                        />
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}
