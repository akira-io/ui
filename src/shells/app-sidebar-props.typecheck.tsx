import {
    AppSidebar as InertiaAppSidebar,
    NavMain as InertiaNavMain,
} from '@/inertia';

import { AppSidebar } from './app-sidebar';

const user = { name: 'Ana', email: 'ana@example.test' };
const groups = [{ items: [] }];

export function AppSidebarPropsContract() {
    return (
        <>
            <AppSidebar logo={null} logoHref="/" groups={groups} />
            <AppSidebar
                logo={null}
                logoHref="/"
                groups={groups}
                user={user}
                settingsHref="/settings"
                logoutHref="/logout"
            />
            {/* @ts-expect-error a user needs settingsHref and logoutHref */}
            <AppSidebar logo={null} logoHref="/" groups={groups} user={user} />
            {/* @ts-expect-error settingsHref needs a user */}
            <AppSidebar
                logo={null}
                logoHref="/"
                groups={groups}
                settingsHref="/s"
            />
            <InertiaAppSidebar logo={null} logoHref="/" groups={groups} />
            <InertiaAppSidebar
                logo={null}
                logoHref="/"
                groups={groups}
                user={user}
                settingsHref="/settings"
                logoutHref="/logout"
            />
            {/* @ts-expect-error a user needs settingsHref and logoutHref */}
            <InertiaAppSidebar
                logo={null}
                logoHref="/"
                groups={groups}
                user={user}
            />
            <InertiaNavMain
                items={[]}
                groups={[{ label: 'Forms', items: [] }]}
                iconRail={false}
            />
            {/* @ts-expect-error settingsHref needs a user */}
            <InertiaAppSidebar
                logo={null}
                logoHref="/"
                groups={groups}
                settingsHref="/s"
            />
            {/* @ts-expect-error onLogout belongs to the user menu */}
            <AppSidebar
                logo={null}
                logoHref="/"
                groups={groups}
                onLogout={() => {}}
            />
            <AppSidebar
                logo={null}
                logoHref="/"
                groups={groups}
                // @ts-expect-error collapsible takes icon, offcanvas or none
                collapsible="rail"
            />
        </>
    );
}
