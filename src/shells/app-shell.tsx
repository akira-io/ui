import * as React from 'react';

import { SidebarProvider } from '@/components/ui/sidebar';

interface AppShellProps {
    children: React.ReactNode;
    variant?: 'header' | 'sidebar';
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    defaultOpen?: boolean;
}

export function AppShell({
    children,
    variant = 'header',
    open,
    onOpenChange,
    defaultOpen = true,
}: AppShellProps) {
    if (variant === 'header') {
        return (
            <div className="flex min-h-screen w-full flex-col">{children}</div>
        );
    }

    return (
        <SidebarProvider
            open={open}
            onOpenChange={onOpenChange}
            defaultOpen={defaultOpen}
        >
            {children}
        </SidebarProvider>
    );
}
