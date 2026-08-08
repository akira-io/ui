declare module '@inertiajs/react' {
    import type { ComponentType, ReactNode } from 'react';

    export const Link: ComponentType<{
        href: string | { url: string; method?: string };
        children?: ReactNode;
        [key: string]: unknown;
    }>;

    export interface FormSlotProps {
        errors: Record<string, string>;
        hasErrors: boolean;
        processing: boolean;
        progress: { percentage: number } | null;
        wasSuccessful: boolean;
        recentlySuccessful: boolean;
        setError: (field: string, value: string) => void;
        clearErrors: (...fields: string[]) => void;
        resetAndClearErrors: (...fields: string[]) => void;
        defaults: () => void;
        isDirty: boolean;
        reset: (...fields: string[]) => void;
        submit: () => void;
    }

    export const Form: ComponentType<{
        action: string;
        method?: string;
        resetOnSuccess?: boolean | string[];
        children?: (props: FormSlotProps) => ReactNode;
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
