import { LogOut, Settings } from 'lucide-react';

import {
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { resolveLink } from '@/lib/href';
import type { LinkComponent, SharedUser, UrlLike } from '@/types';
import { UserInfo } from './user-info';

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

export function UserMenuContent({
    user,
    settingsHref,
    logoutHref,
    linkComponent,
    onSettingsClick,
    onLogout,
    settingsLabel = 'Settings',
    logoutLabel = 'Log out',
}: UserMenuContentProps) {
    const Link = resolveLink(linkComponent);

    return (
        <>
            <DropdownMenuLabel className="p-0 font-normal">
                <div className="gap-2 px-1 py-1.5 text-sm flex items-center text-left">
                    <UserInfo user={user} showEmail={true} />
                </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                    <Link
                        className="block w-full"
                        href={settingsHref}
                        as="button"
                        prefetch
                        onClick={onSettingsClick}
                    >
                        <Settings className="mr-2" />
                        {settingsLabel}
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
                <Link
                    className="block w-full"
                    href={logoutHref}
                    as="button"
                    onClick={onLogout}
                    data-test="logout-button"
                >
                    <LogOut className="mr-2" />
                    {logoutLabel}
                </Link>
            </DropdownMenuItem>
        </>
    );
}
