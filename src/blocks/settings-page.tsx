import { SectionHeader } from '@/blocks/section-header';
import { Card } from '@/components/ui/card';
import { resolveLink } from '@/lib/href';
import { compactRadius } from '@/lib/language';
import { cn } from '@/lib/utils';
import type { LinkComponent, UrlLike } from '@/types';
import { ArrowLeft, ChevronRight, type LucideIcon } from 'lucide-react';
import { createContext, useContext, type ReactNode } from 'react';

const SettingsLinkContext = createContext<LinkComponent | undefined>(undefined);

export interface SettingsPageProps {
    title?: string;
    description?: string;
    control?: ReactNode;
    linkComponent?: LinkComponent;
    children: ReactNode;
    className?: string;
}

export function SettingsPage({
    title,
    description,
    control,
    linkComponent,
    children,
    className,
}: SettingsPageProps) {
    return (
        <SettingsLinkContext.Provider value={linkComponent}>
            <div
                data-slot="settings-page"
                className={cn(
                    'gap-8 max-w-4xl mx-auto flex w-full flex-col',
                    className,
                )}
            >
                {title && (
                    <SectionHeader
                        title={title}
                        description={description}
                        control={control}
                    />
                )}
                {children}
            </div>
        </SettingsLinkContext.Provider>
    );
}

export interface SettingsLabels {
    back: string;
}

export const settingsLabels: SettingsLabels = {
    back: 'Back',
};

export interface SettingsSectionProps {
    title?: string;
    description?: string;
    control?: ReactNode;
    backHref?: UrlLike | null;
    backLabel?: string;
    wide?: boolean;
    linkComponent?: LinkComponent;
    children: ReactNode;
    className?: string;
}

export function SettingsSection({
    title,
    description,
    control,
    backHref = '/settings',
    backLabel = settingsLabels.back,
    wide = false,
    linkComponent,
    children,
    className,
}: SettingsSectionProps) {
    const contextLink = useContext(SettingsLinkContext);
    const Link = resolveLink(linkComponent ?? contextLink);

    return (
        <section
            data-slot="settings-section"
            className={cn(
                'gap-6 mx-auto flex w-full flex-col',
                wide ? 'max-w-4xl' : 'max-w-2xl',
                className,
            )}
        >
            {backHref && (
                <Link
                    data-slot="settings-section-back"
                    href={backHref}
                    className="gap-2 text-sm font-medium inline-flex w-fit items-center text-muted-foreground transition-colors hover:text-foreground"
                >
                    <ArrowLeft className="size-4" />
                    {backLabel}
                </Link>
            )}

            {title && (
                <SectionHeader
                    title={title}
                    description={description}
                    control={control}
                />
            )}

            {children}
        </section>
    );
}

export interface SettingsGroupProps {
    label?: string;
    columns?: 1 | 2;
    children: ReactNode;
    className?: string;
}

export function SettingsGroup({
    label,
    columns = 2,
    children,
    className,
}: SettingsGroupProps) {
    return (
        <div
            data-slot="settings-group"
            className={cn('gap-3 flex flex-col', className)}
        >
            {label && (
                <p className="font-bold tracking-widest text-[11px] text-muted-foreground uppercase">
                    {label}
                </p>
            )}
            <div
                data-slot="settings-group-grid"
                className={cn(
                    'gap-4 grid grid-cols-1',
                    columns === 2 && 'md:grid-cols-2',
                )}
            >
                {children}
            </div>
        </div>
    );
}

export interface SettingsEntryProps {
    icon: LucideIcon;
    iconClassName?: string;
    title: string;
    description?: string;
    href: UrlLike;
    badge?: ReactNode;
    disabled?: boolean;
    linkComponent?: LinkComponent;
    className?: string;
}

export function SettingsEntry({
    icon: Icon,
    iconClassName,
    title,
    description,
    href,
    badge,
    disabled = false,
    linkComponent,
    className,
}: SettingsEntryProps) {
    const contextLink = useContext(SettingsLinkContext);
    const Link = resolveLink(linkComponent ?? contextLink);

    const card = (
        <Card
            interactive={!disabled}
            padding="none"
            data-disabled={disabled || undefined}
            className={cn(
                'gap-4 p-5 flex h-full flex-row items-center',
                disabled && 'opacity-60',
                className,
            )}
        >
            <span
                className={cn(
                    'size-11 flex shrink-0 items-center justify-center rounded-full',
                    iconClassName ?? 'bg-primary/10 text-primary',
                )}
            >
                <Icon className="size-5" />
            </span>

            <span className="min-w-0 flex flex-1 flex-col">
                <span className="gap-2 flex items-center">
                    <span className="font-bold text-foreground">{title}</span>
                    {badge}
                </span>
                {description && (
                    <span className="text-sm font-medium text-muted-foreground">
                        {description}
                    </span>
                )}
            </span>

            <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
        </Card>
    );

    if (disabled) {
        return (
            <div
                data-slot="settings-entry"
                data-disabled="true"
                aria-disabled="true"
            >
                {card}
            </div>
        );
    }

    return (
        <Link
            data-slot="settings-entry"
            href={href}
            className={cn(
                compactRadius,
                'outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50',
            )}
        >
            {card}
        </Link>
    );
}
