import {
    CircleCheckIcon,
    InfoIcon,
    Loader2Icon,
    OctagonXIcon,
    TriangleAlertIcon,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Toaster as Sonner, type ToasterProps } from 'sonner';

import {
    toastActionClasses,
    toastCancelClasses,
    toastCloseClasses,
} from '@/lib/toast-classes';

function useDocumentScheme(): 'light' | 'dark' {
    const [scheme, setScheme] = useState<'light' | 'dark'>('light');

    useEffect(() => {
        const root = document.documentElement;
        const read = () =>
            setScheme(root.classList.contains('dark') ? 'dark' : 'light');

        read();

        const observer = new MutationObserver(read);
        observer.observe(root, {
            attributes: true,
            attributeFilter: ['class'],
        });

        return () => observer.disconnect();
    }, []);

    return scheme;
}

const Toaster = ({
    theme,
    closeButton = true,
    toastOptions,
    ...props
}: ToasterProps) => {
    const scheme = useDocumentScheme();

    return (
        <Sonner
            theme={theme ?? scheme}
            closeButton={closeButton}
            toastOptions={{
                ...toastOptions,
                classNames: {
                    content: 'flex-1',
                    actionButton: toastActionClasses,
                    cancelButton: toastCancelClasses,
                    closeButton: toastCloseClasses,
                    ...toastOptions?.classNames,
                },
            }}
            className="toaster group [&_[data-sonner-toast]]:glass-panel [&_[data-sonner-toast]]:shadow-(--glass-elevation) [&_[data-sonner-toast]]:glass-edge"
            icons={{
                success: <CircleCheckIcon className="size-icon text-success" />,
                info: <InfoIcon className="size-icon text-info" />,
                warning: (
                    <TriangleAlertIcon className="size-icon text-warning" />
                ),
                error: <OctagonXIcon className="size-icon text-destructive" />,
                loading: <Loader2Icon className="animate-spin size-icon" />,
            }}
            style={
                {
                    '--normal-bg': 'var(--glass-button-tint)',
                    '--normal-text': 'var(--popover-foreground)',
                    '--normal-border': 'var(--glass-button-ring)',
                    '--border-radius': '1rem',
                } as React.CSSProperties
            }
            {...props}
        />
    );
};

export { Toaster };
