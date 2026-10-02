import { LogOut, Settings } from 'lucide-react';

import {
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { resolveLink } from '@/lib/href';
import { useUiLabels } from '@/locales/context';
import type { LinkComponent, SharedUser, UrlLike } from '@/types';
import { UserInfo } from './user-info';

export interface UserMenuLabels {
    settingsLabel: string;
    logoutLabel: string;
}

export const userMenuDefaultLabels: UserMenuLabels = {
    settingsLabel: 'Settings',
    logoutLabel: 'Log out',
};

interface UserMenuContentProps {
    user: SharedUser;
    settingsHref: UrlLike;
    logoutHref: UrlLike;
    linkComponent?: LinkComponent;
    onSettingsClick?: () => void;
    onLogout?: () => void;
    settingsLabel?: string;
    logoutLabel?: string;
    labels?: Partial<UserMenuLabels>;
}

export function UserMenuContent({
    user,
    settingsHref,
    logoutHref,
    linkComponent,
    onSettingsClick,
    onLogout,
    settingsLabel,
    logoutLabel,
    labels,
}: UserMenuContentProps) {
    const Link = resolveLink(linkComponent);
    const text = useUiLabels('userMenu', userMenuDefaultLabels, {
        ...labels,
        settingsLabel: settingsLabel ?? labels?.settingsLabel,
        logoutLabel: logoutLabel ?? labels?.logoutLabel,
    });

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
                        {text.settingsLabel}
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
                    {text.logoutLabel}
                </Link>
            </DropdownMenuItem>
        </>
    );
}
