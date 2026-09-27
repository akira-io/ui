import { ReactNode, ReactElement, PropsWithChildren } from 'react';
import { a as LoginFormLabels, e as TourLabels } from './types-DM84rPRO.js';
import { U as UrlLike, N as NavGroup, b as NavItem, c as SharedUser, B as BreadcrumbItem, L as LinkComponent } from './types-r3VHXAG2.js';
import { A as AppSidebarHeaderProps } from './app-sidebar-header-DFGerzV8.js';
import 'lucide-react';

type TableFilterValue = string | string[] | number | null | undefined;
type TableFilterQuery = Record<string, string | string[]>;
interface TableFiltersVisitOptions {
    data: TableFilterQuery;
    only?: string[];
    preserveState: boolean;
    preserveScroll: boolean;
    replace: boolean;
    onCancelToken: (token: {
        cancel: () => void;
    }) => void;
}
interface TableFiltersRouter {
    visit: (url: string, options: TableFiltersVisitOptions) => void;
}
interface TableFiltersOptions {
    url: string;
    filters: Record<string, TableFilterValue>;
    only?: string[];
    searchKey?: string;
    pageKey?: string;
    debounce?: number;
}
interface TableFilters {
    search: string;
    setSearch: (value: string) => void;
    filterValues: Record<string, string[]>;
    setFilter: (key: string, values: string[]) => void;
    clearFilters: () => void;
    setPage: (pageIndex: number) => void;
    apply: (changes: Record<string, TableFilterValue>) => void;
}
type UseTableFilters = (options: TableFiltersOptions) => TableFilters;

declare const InertiaLink: LinkComponent;

declare const useTableFilters: UseTableFilters;
declare function useCurrentUrl(): string;
declare function AppSidebar(props: {
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
}): ReactElement;
declare function AppSidebarHeader(props: Omit<AppSidebarHeaderProps, 'linkComponent'>): ReactElement;
declare function Breadcrumbs(props: {
    breadcrumbs: BreadcrumbItem[];
}): ReactElement;
declare function NavMain(props: {
    items: NavItem[];
    label?: string;
    collapsible?: boolean;
    defaultOpen?: boolean;
    collapsedGroups?: string[];
    onCollapsedChange?: (collapsedGroups: string[]) => void;
}): ReactElement;
declare function SettingsLayout(props: PropsWithChildren<{
    items: NavItem[];
    title?: string;
    description?: string;
    wide?: boolean;
}>): ReactElement;
declare function InertiaLoginForm({ action, status, forgotPasswordHref, labels, className, slotName, }: {
    action: string;
    status?: string;
    forgotPasswordHref?: UrlLike;
    labels?: Partial<LoginFormLabels>;
    className?: string;
    slotName?: string;
}): ReactElement;
declare function InertiaTourProvider({ children, progressUrl, labels, }: PropsWithChildren<{
    progressUrl: (tour: string) => string;
    labels?: Partial<TourLabels>;
}>): ReactElement;

export { AppSidebar, AppSidebarHeader, Breadcrumbs, InertiaLink, InertiaLoginForm, InertiaTourProvider, NavMain, SettingsLayout, type TableFilterValue, type TableFilters, type TableFiltersOptions, type TableFiltersRouter, useCurrentUrl, useTableFilters };
