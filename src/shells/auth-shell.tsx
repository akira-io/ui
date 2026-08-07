import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { type ReactNode } from 'react';

export type AuthArrangement = 'centred' | 'split';

export interface AuthShellProps {
    logo?: ReactNode;
    title: string;
    description?: string;
    arrangement?: AuthArrangement;
    panel?: ReactNode;
    panelDecorative?: boolean;
    footer?: ReactNode;
    appearanceControl?: ReactNode;
    surface?: boolean;
    children: ReactNode;
    className?: string;
}

export function AuthShell({
    logo,
    title,
    description,
    arrangement = 'centred',
    panel,
    panelDecorative = true,
    footer,
    appearanceControl,
    surface = true,
    children,
    className,
}: AuthShellProps) {
    const split = arrangement === 'split';

    const form = (
        <div
            data-slot="auth-shell-form"
            className="gap-6 max-w-md flex w-full flex-col"
        >
            {logo && (
                <div
                    data-slot="auth-shell-logo"
                    className="flex justify-center"
                >
                    {logo}
                </div>
            )}

            <div data-slot="auth-shell-heading" className="space-y-2">
                <h1 className="text-xl font-bold tracking-tight text-foreground">
                    {title}
                </h1>
                {description && (
                    <p className="text-sm font-medium text-muted-foreground">
                        {description}
                    </p>
                )}
            </div>

            {surface ? (
                <Card className="p-6">
                    <div data-slot="auth-shell-body">{children}</div>
                </Card>
            ) : (
                <div data-slot="auth-shell-body">{children}</div>
            )}

            {footer && (
                <footer
                    data-slot="auth-shell-footer"
                    className="gap-2 text-sm font-medium flex flex-wrap items-center justify-center text-muted-foreground"
                >
                    {footer}
                </footer>
            )}
        </div>
    );

    return (
        <div
            data-slot="auth-shell"
            data-arrangement={arrangement}
            className={cn(
                'relative flex min-h-screen w-full',
                split && 'lg:grid lg:grid-cols-2',
                className,
            )}
        >
            {split && panel && (
                <aside
                    data-slot="auth-shell-panel"
                    aria-hidden={panelDecorative || undefined}
                    className="p-10 lg:flex hidden flex-col justify-between bg-primary text-primary-foreground"
                >
                    {panel}
                </aside>
            )}

            <main
                data-slot="auth-shell-main"
                className="p-6 flex flex-1 items-center justify-center"
            >
                {form}
            </main>

            {appearanceControl && (
                <div
                    data-slot="auth-shell-appearance"
                    className="top-4 right-4 absolute"
                >
                    {appearanceControl}
                </div>
            )}
        </div>
    );
}
