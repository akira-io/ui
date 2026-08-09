import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { SlotNameProps } from '@/types';
import { createContext, useContext, type ReactNode } from 'react';

export type AuthArrangement = 'centred' | 'split';

const ArrangementContext = createContext<AuthArrangement>('centred');

export function useAuthArrangement(): AuthArrangement {
    return useContext(ArrangementContext);
}

export interface AuthShellRootProps {
    arrangement?: AuthArrangement;
    appearanceControl?: ReactNode;
    children: ReactNode;
    className?: string;
}

export function AuthShellRoot({
    arrangement = 'centred',
    appearanceControl,
    children,
    className,
    slotName = 'auth-shell',
}: AuthShellRootProps & SlotNameProps) {
    const split = arrangement === 'split';

    return (
        <ArrangementContext.Provider value={arrangement}>
            <div
                data-arrangement={arrangement}
                className={cn(
                    'relative flex min-h-screen w-full',
                    split && 'lg:grid lg:grid-cols-2',
                    className,
                )}
                data-slot={slotName}
            >
                {children}

                {appearanceControl && (
                    <div
                        data-slot="auth-shell-appearance"
                        className="top-4 right-4 absolute"
                    >
                        {appearanceControl}
                    </div>
                )}
            </div>
        </ArrangementContext.Provider>
    );
}

export interface AuthShellMainProps {
    children: ReactNode;
}

export function AuthShellMain({
    children,
    slotName = 'auth-shell-main',
}: AuthShellMainProps & SlotNameProps) {
    return (
        <main
            data-slot={slotName}
            className="p-6 flex flex-1 items-center justify-center"
        >
            <div
                data-slot="auth-shell-form"
                className="gap-6 max-w-md flex w-full flex-col"
            >
                {children}
            </div>
        </main>
    );
}

export interface AuthShellPanelProps {
    decorative?: boolean;
    arrangement?: AuthArrangement;
    children: ReactNode;
}

export function AuthShellPanel({
    decorative = true,
    arrangement,
    children,
    slotName = 'auth-shell-panel',
}: AuthShellPanelProps & SlotNameProps) {
    const contextArrangement = useAuthArrangement();

    if ((arrangement ?? contextArrangement) !== 'split') {
        return null;
    }

    return (
        <aside
            data-slot={slotName}
            aria-hidden={decorative || undefined}
            className="p-10 lg:flex hidden flex-col justify-between bg-primary text-primary-foreground"
        >
            {children}
        </aside>
    );
}

export interface AuthShellSurfaceProps {
    children: ReactNode;
    className?: string;
}

export function AuthShellSurface({
    children,
    className,
    slotName = 'card',
}: AuthShellSurfaceProps & SlotNameProps) {
    return (
        <Card className={cn('p-6', className)} slotName={slotName}>
            {children}
        </Card>
    );
}

export interface AuthShellLogoProps {
    children: ReactNode;
}

export function AuthShellLogo({
    children,
    slotName = 'auth-shell-logo',
}: AuthShellLogoProps & SlotNameProps) {
    return (
        <div data-slot={slotName} className="flex justify-center">
            {children}
        </div>
    );
}

export interface AuthShellHeadingProps {
    title: string;
    description?: string;
    align?: 'start' | 'center';
}

export function AuthShellHeading({
    title,
    description,
    align = 'start',
    slotName = 'auth-shell-heading',
}: AuthShellHeadingProps & SlotNameProps) {
    return (
        <div
            data-slot={slotName}
            className={cn('space-y-2', align === 'center' && 'text-center')}
        >
            <h1 className="text-xl font-bold tracking-tight text-foreground">
                {title}
            </h1>
            {description && (
                <p className="text-sm font-medium text-muted-foreground">
                    {description}
                </p>
            )}
        </div>
    );
}

export interface AuthShellBodyProps {
    children: ReactNode;
}

export function AuthShellBody({
    children,
    slotName = 'auth-shell-body',
}: AuthShellBodyProps & SlotNameProps) {
    return <div data-slot={slotName}>{children}</div>;
}

export interface AuthShellFooterProps {
    children: ReactNode;
}

export function AuthShellFooter({
    children,
    slotName = 'auth-shell-footer',
}: AuthShellFooterProps & SlotNameProps) {
    return (
        <footer
            data-slot={slotName}
            className="gap-2 text-sm font-medium flex flex-wrap items-center justify-center text-muted-foreground"
        >
            {children}
        </footer>
    );
}

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
    slotName = 'auth-shell',
}: AuthShellProps & SlotNameProps) {
    const body = <AuthShellBody>{children}</AuthShellBody>;

    return (
        <AuthShellRoot
            arrangement={arrangement}
            appearanceControl={appearanceControl}
            className={className}
            slotName={slotName}
        >
            {panel && (
                <AuthShellPanel decorative={panelDecorative}>
                    {panel}
                </AuthShellPanel>
            )}
            <AuthShellMain>
                {logo && <AuthShellLogo>{logo}</AuthShellLogo>}
                <AuthShellHeading title={title} description={description} />
                {surface ? <AuthShellSurface>{body}</AuthShellSurface> : body}
                {footer && <AuthShellFooter>{footer}</AuthShellFooter>}
            </AuthShellMain>
        </AuthShellRoot>
    );
}
