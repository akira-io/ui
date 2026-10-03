import { LogOut, Settings } from 'lucide-react';

import {
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { hrefToString, resolveLink } from '@/lib/href';
import { hasNavigableScheme } from '@/lib/safe-url';
import { useUiLabels } from '@/locales/context';
import type { LinkComponent, SharedUser, UrlLike, UserMenuItem } from '@/types';
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
    extraItems?: UserMenuItem[];
}

function releasingPointerEvents(handler?: () => void): () => void {
    return () => {
        document.body.style.removeProperty('pointer-events');
        handler?.();
    };
}

function ExtraMenuItem({
    item,
    Link,
}: {
    item: UserMenuItem;
    Link: LinkComponent;
}) {
    const content = (
        <>
            {item.icon && <item.icon className="mr-2" />}
            {item.title}
        </>
    );

    return (
        <DropdownMenuItem asChild>
            {item.external ? (
                <a
                    className="block w-full"
                    href={hrefToString(item.href)}
                    target="_blank"
                    rel="noreferrer"
                    onClick={releasingPointerEvents()}
                >
                    {content}
                </a>
            ) : (
                <Link
                    className="block w-full"
                    href={item.href}
                    as="button"
                    prefetch
                    onClick={releasingPointerEvents()}
                >
                    {content}
                </Link>
            )}
        </DropdownMenuItem>
    );
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
    extraItems = [],
}: UserMenuContentProps) {
    const Link = resolveLink(linkComponent);
    const text = useUiLabels('userMenu', userMenuDefaultLabels, {
        ...labels,
        settingsLabel: settingsLabel ?? labels?.settingsLabel,
        logoutLabel: logoutLabel ?? labels?.logoutLabel,
    });
    const shown = extraItems.filter(
        (item) =>
            item.visible !== false &&
            hasNavigableScheme(hrefToString(item.href)),
    );
    const before = shown.filter((item) => item.position === 'before');
    const after = shown.filter((item) => item.position !== 'before');

    return (
        <>
            <DropdownMenuLabel className="p-0 font-normal">
                <div className="gap-2 px-1 py-1.5 text-sm flex items-center text-left">
                    <UserInfo user={user} showEmail={true} />
                </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
                {before.map((item, index) => (
                    <ExtraMenuItem
                        key={`before-${index}-${item.title}`}
                        item={item}
                        Link={Link}
                    />
                ))}
                <DropdownMenuItem asChild>
                    <Link
                        className="block w-full"
                        href={settingsHref}
                        as="button"
                        prefetch
                        onClick={releasingPointerEvents(onSettingsClick)}
                    >
                        <Settings className="mr-2" />
                        {text.settingsLabel}
                    </Link>
                </DropdownMenuItem>
                {after.map((item, index) => (
                    <ExtraMenuItem
                        key={`after-${index}-${item.title}`}
                        item={item}
                        Link={Link}
                    />
                ))}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
                <Link
                    className="block w-full"
                    href={logoutHref}
                    as="button"
                    onClick={releasingPointerEvents(onLogout)}
                    data-test="logout-button"
                >
                    <LogOut className="mr-2" />
                    {text.logoutLabel}
                </Link>
            </DropdownMenuItem>
        </>
    );
}
