import * as React from 'react';
import { c as SharedUser, U as UrlLike, L as LinkComponent, d as UserMenuItem } from './types-Be72a3UT.js';

interface UserMenuLabels {
    settingsLabel: string;
    logoutLabel: string;
}
declare const userMenuDefaultLabels: UserMenuLabels;
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
declare function UserMenuContent({ user, settingsHref, logoutHref, linkComponent, onSettingsClick, onLogout, settingsLabel, logoutLabel, labels, extraItems, }: UserMenuContentProps): React.JSX.Element;

export { type UserMenuLabels as U, UserMenuContent as a, userMenuDefaultLabels as u };
