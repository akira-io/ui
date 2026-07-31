declare module '@inertiajs/react' {
    import type { ComponentType, ReactNode } from 'react';

    export const Link: ComponentType<{
        href: string | { url: string; method?: string };
        children?: ReactNode;
        [key: string]: unknown;
    }>;

    export function usePage<T = Record<string, unknown>>(): {
        url: string;
        component: string;
        props: T;
        version: string | null;
    };
}
