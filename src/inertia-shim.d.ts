declare module '@inertiajs/react' {
    import type { ComponentType, ReactNode } from 'react';

    export const Link: ComponentType<{
        href: string | { url: string; method?: string };
        children?: ReactNode;
        [key: string]: unknown;
    }>;

    export const router: {
        post(
            url: string,
            data?: Record<string, unknown>,
            options?: Record<string, unknown>,
        ): void;
    };

    export function usePage<T = Record<string, unknown>>(): {
        url: string;
        component: string;
        props: T;
        version: string | null;
    };
}
