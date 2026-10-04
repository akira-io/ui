import { ReactElement, PropsWithChildren } from 'react';
import { j as TwoFactorLabels, a as LoginFormLabels, e as TourLabels } from './types-DTvU__TK.js';
import { U as UrlLike, B as BreadcrumbItem, L as LinkComponent, N as NavItem } from './types-CTEMbVhK.js';
import { A as AppSidebarProps, a as AppSidebarHeaderProps } from './app-sidebar-header-D1k8jiTz.js';
import { a as TwoFactorSetupDialogProps } from './setup-dialog-h3oqap-w.js';
import 'lucide-react';
import './user-menu-content-Bi8E7Kkf.js';

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

interface FortifyTwoFactorUrls {
    qrCode: UrlLike;
    secretKey: UrlLike;
    recoveryCodes: UrlLike;
    enable: UrlLike;
    confirm: UrlLike;
    regenerateRecoveryCodes: UrlLike;
    disable: UrlLike;
}
interface UseFortifyTwoFactorOptions {
    urls: FortifyTwoFactorUrls;
    enabled: boolean;
    labels?: Partial<TwoFactorLabels>;
}
type FortifyTwoFactorSetupDialogProps = Required<Pick<TwoFactorSetupDialogProps, 'open' | 'onOpenChange' | 'enabled' | 'manualSetupKey' | 'recoveryCodes' | 'errors' | 'onConfirm' | 'onRequestSetupData' | 'onRegenerateRecoveryCodes' | 'onCompleted'>> & Pick<TwoFactorSetupDialogProps, 'qrCodeSvg' | 'labels'>;
interface FortifyTwoFactor {
    qrCodeSvg: string | undefined;
    manualSetupKey: string | null;
    recoveryCodes: string[];
    errors: string[];
    enabling: boolean;
    setupOpen: boolean;
    setSetupOpen: (open: boolean) => void;
    enable: () => void;
    confirm: (code: string) => Promise<void>;
    regenerate: () => Promise<void>;
    disable: () => Promise<void>;
    fetchSetupData: () => Promise<void>;
    fetchRecoveryCodes: () => Promise<void>;
    clearSetupData: () => void;
    setupDialogProps: FortifyTwoFactorSetupDialogProps;
}

declare function useFortifyTwoFactor({ urls, enabled, labels, }: UseFortifyTwoFactorOptions): FortifyTwoFactor;

declare const InertiaLink: LinkComponent;

declare const useTableFilters: UseTableFilters;
declare function useCurrentUrl(): string;
declare function AppSidebar(props: Omit<AppSidebarProps, 'currentUrl' | 'linkComponent'>): ReactElement;
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

export { AppSidebar, AppSidebarHeader, Breadcrumbs, type FortifyTwoFactor, type FortifyTwoFactorSetupDialogProps, type FortifyTwoFactorUrls, InertiaLink, InertiaLoginForm, InertiaTourProvider, NavMain, SettingsLayout, type TableFilterValue, type TableFilters, type TableFiltersOptions, type TableFiltersRouter, type UseFortifyTwoFactorOptions, useCurrentUrl, useFortifyTwoFactor, useTableFilters };
