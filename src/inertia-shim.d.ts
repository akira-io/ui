declare module '@inertiajs/react' {
    import type { ComponentType, ReactNode } from 'react';

    export const Link: ComponentType<{
        href: string | { url: string; method?: string };
        children?: ReactNode;
        [key: string]: unknown;
    }>;

    export const router: {
        visit: (
            url: string,
            options: {
                data?: Record<string, string | string[]>;
                only?: string[];
                preserveState?: boolean;
                preserveScroll?: boolean;
                replace?: boolean;
                onCancelToken?: (token: { cancel: () => void }) => void;
            },
        ) => void;
    };

    export function usePage<T = Record<string, unknown>>(): {
        url: string;
        component: string;
        props: T;
        version: string | null;
    };
}
