'use client';

import { Form, Link, router, usePage, usePoll } from '@inertiajs/react';
import {
    createElement,
    useEffect,
    useRef,
    type ComponentProps,
    type ComponentType,
    type PropsWithChildren,
    type ReactElement,
    type ReactNode,
} from 'react';

import { LoginFormPreset, type LoginFormLabels } from '@/blocks/login-form';
import {
    NotificationBell as BaseNotificationBell,
    type NotificationBellProps,
} from '@/blocks/notification-bell';
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
import {
    AppSidebar as BaseAppSidebar,
    type AppSidebarAccountProps,
    type AppSidebarBaseProps,
} from '@/shells/app-sidebar';
import {
    AppSidebarHeader as BaseAppSidebarHeader,
    type AppSidebarHeaderProps,
} from '@/shells/app-sidebar-header';
import { Breadcrumbs as BaseBreadcrumbs } from '@/shells/breadcrumbs';
import { NavMain as BaseNavMain } from '@/shells/nav-main';
import { SettingsLayout as BaseSettingsLayout } from '@/shells/settings-layout';
import type {
    BreadcrumbItem,
    LinkComponent,
    NavGroup,
    NavItem,
    UrlLike,
} from '@/types';
export {
    useFortifyTwoFactor,
    type FortifyTwoFactor,
    type FortifyTwoFactorSetupDialogProps,
    type FortifyTwoFactorUrls,
    type UseFortifyTwoFactorOptions,
} from '@/inertia-two-factor';

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

export function AppSidebar(
    props: Omit<AppSidebarBaseProps, 'currentUrl' | 'linkComponent'> &
        AppSidebarAccountProps,
): ReactElement {
    return createElement(BaseAppSidebar, {
        ...props,
        currentUrl: usePage().url,
        linkComponent: InertiaLink,
    });
}

export function AppSidebarHeader(
    props: Omit<AppSidebarHeaderProps, 'linkComponent'>,
): ReactElement {
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
    groups?: NavGroup[];
    label?: string;
    iconRail?: boolean;
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

interface LoginPostFormRenderProps {
    processing: boolean;
    errors: Partial<Record<'email' | 'password' | 'remember', string>>;
}

interface LoginPostFormProps extends Pick<
    ComponentProps<typeof Form>,
    'action' | 'method' | 'className'
> {
    resetOnSuccess: string[];
    'data-slot': string;
    children: (props: LoginPostFormRenderProps) => ReactNode;
}

const LoginPostForm: ComponentType<LoginPostFormProps> = Form;

export function InertiaLoginForm({
    action,
    status,
    forgotPasswordHref,
    labels,
    className,
    slotName = 'inertia-login-form',
}: {
    action: string;
    status?: string;
    forgotPasswordHref?: UrlLike;
    labels?: Partial<LoginFormLabels>;
    className?: string;
    slotName?: string;
}): ReactElement {
    return createElement(LoginPostForm, {
        action,
        method: 'post',
        resetOnSuccess: ['password'],
        className,
        'data-slot': slotName,
        children: ({ processing, errors }) =>
            createElement(LoginFormPreset, {
                errors,
                processing,
                status,
                forgotPasswordHref,
                labels,
                linkComponent: InertiaLink,
            }),
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

export interface InertiaNotificationBellPoll {
    interval: number;
    only?: string[];
    active: boolean;
}

export interface InertiaNotificationBellProps extends Omit<
    NotificationBellProps,
    'linkComponent'
> {
    poll?: InertiaNotificationBellPoll;
}

export function InertiaNotificationBell({
    poll,
    ...props
}: InertiaNotificationBellProps): ReactElement {
    const controls = usePoll(
        poll?.interval ?? 0,
        poll?.only ? { only: poll.only } : {},
        { autoStart: false },
    );
    const poller = useRef(controls);
    const active = poll?.active === true;

    useEffect(() => {
        if (!active) {
            return;
        }

        const current = poller.current;

        current.start();

        return () => {
            current.stop();
        };
    }, [active]);

    return createElement(BaseNotificationBell, {
        ...props,
        linkComponent: InertiaLink,
    });
}
