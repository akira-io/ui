import { Link, router, usePage } from '@inertiajs/react';
import {
    createElement,
    type PropsWithChildren,
    type ReactElement,
    type ReactNode,
} from 'react';

import {
    TourProvider as BaseTourProvider,
    type TourLabels,
    type TourProgress,
} from '@/blocks/tour';
import {
    createTableFiltersHook,
    type TableFilters,
    type TableFiltersOptions,
    type TableFiltersRouter,
    type TableFilterValue,
} from '@/inertia-table-filters';
import { recordTourProgress } from '@/inertia-tour-progress';
import { AppSidebar as BaseAppSidebar } from '@/shells/app-sidebar';
import { AppSidebarHeader as BaseAppSidebarHeader } from '@/shells/app-sidebar-header';
import { Breadcrumbs as BaseBreadcrumbs } from '@/shells/breadcrumbs';
import { NavMain as BaseNavMain } from '@/shells/nav-main';
import { SettingsLayout as BaseSettingsLayout } from '@/shells/settings-layout';
import type {
    BreadcrumbItem,
    LinkComponent,
    NavGroup,
    NavItem,
    SharedUser,
    UrlLike,
} from '@/types';

export const InertiaLink = Link as unknown as LinkComponent;

export type {
    TableFilters,
    TableFiltersOptions,
    TableFiltersRouter,
    TableFilterValue,
};

export const useTableFilters = createTableFiltersHook(router);

export function useCurrentUrl(): string {
    return usePage().url;
}

export function AppSidebar(props: {
    logo: ReactNode;
    logoHref: UrlLike;
    groups: NavGroup[];
    footerItems?: NavItem[];
    user: SharedUser;
    settingsHref: UrlLike;
    logoutHref: UrlLike;
    collapsibleGroups?: boolean;
    collapsedGroups?: string[];
    onCollapsedChange?: (collapsedGroups: string[]) => void;
    onSettingsClick?: () => void;
    onLogout?: () => void;
}): ReactElement {
    return createElement(BaseAppSidebar, {
        ...props,
        currentUrl: usePage().url,
        linkComponent: InertiaLink,
    });
}

export function AppSidebarHeader(props: {
    breadcrumbs?: BreadcrumbItem[];
    onSearchClick?: () => void;
    searchLabel?: string;
}): ReactElement {
    return createElement(BaseAppSidebarHeader, {
        ...props,
        linkComponent: InertiaLink,
    });
}

export function Breadcrumbs(props: {
    breadcrumbs: BreadcrumbItem[];
}): ReactElement {
    return createElement(BaseBreadcrumbs, {
        ...props,
        linkComponent: InertiaLink,
    });
}

export function NavMain(props: {
    items: NavItem[];
    label?: string;
    collapsible?: boolean;
    defaultOpen?: boolean;
    collapsedGroups?: string[];
    onCollapsedChange?: (collapsedGroups: string[]) => void;
}): ReactElement {
    return createElement(BaseNavMain, {
        ...props,
        currentUrl: usePage().url,
        linkComponent: InertiaLink,
    });
}

export function SettingsLayout(
    props: PropsWithChildren<{
        items: NavItem[];
        title?: string;
        description?: string;
        wide?: boolean;
    }>,
): ReactElement {
    return createElement(BaseSettingsLayout, {
        ...props,
        currentPath: usePage().url,
        linkComponent: InertiaLink,
    });
}

export function InertiaTourProvider({
    children,
    progressUrl,
    labels,
}: PropsWithChildren<{
    progressUrl: (tour: string) => string;
    labels?: Partial<TourLabels>;
}>): ReactElement {
    const seen = (usePage().props.tours ?? {}) as Record<string, number>;

    return createElement(BaseTourProvider, {
        seen,
        labels,
        children,
        onProgress: (progress: TourProgress) =>
            recordTourProgress(progressUrl(progress.tour), progress),
    });
}
