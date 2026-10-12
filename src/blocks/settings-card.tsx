import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
    type ContentSurfaceProps,
    type SurfaceProps,
    contentSurface,
    iconTile,
} from '@/lib/language';
import { useContentSurface } from '@/lib/surface-context';
import { cn } from '@/lib/utils';
import type { SlotNameProps } from '@/types';
import { type LucideIcon } from 'lucide-react';
import { type ReactNode } from 'react';

export interface SettingsCardProps extends SurfaceProps, ContentSurfaceProps {
    icon: LucideIcon;
    iconClassName?: string;
    title: string;
    description: string;
    control?: ReactNode;
    children: ReactNode;
    className?: string;
}

export function SettingsCard({
    icon: Icon,
    iconClassName,
    title,
    description,
    control,
    children,
    inset,
    surface,
    className,
    slotName = 'settings-card',
}: SettingsCardProps & SlotNameProps) {
    return (
        <section
            data-inset={inset || undefined}
            className={cn(
                contentSurface(useContentSurface(surface, inset)),
                'space-y-5 p-inset text-card-foreground',
                className,
            )}
            data-slot={slotName}
        >
            <div className="gap-4 sm:flex-row sm:items-center sm:justify-between flex flex-col">
                <div className="gap-3 flex items-center">
                    <div
                        className={cn(
                            'size-11 flex items-center justify-center',
                            iconTile,
                            iconClassName,
                        )}
                    >
                        <Icon className="size-icon" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-foreground">
                            {title}
                        </h2>
                        <p className="text-sm font-medium text-muted-foreground">
                            {description}
                        </p>
                    </div>
                </div>
                {control}
            </div>
            <div
                data-slot="settings-card-rows"
                className="flex flex-col divide-y divide-(--hairline) [&>[data-slot=settings-panel]]:py-row"
            >
                {children}
            </div>
        </section>
    );
}

export interface SettingsPanelProps extends SurfaceProps, ContentSurfaceProps {
    title?: string;
    description?: string;
    children: ReactNode;
    className?: string;
}

export function SettingsPanel({
    title,
    description,
    children,
    inset = true,
    surface,
    className,
    slotName = 'settings-panel',
}: SettingsPanelProps & SlotNameProps) {
    return (
        <div
            data-inset={inset || undefined}
            className={cn(
                contentSurface(useContentSurface(surface, inset)),
                'space-y-4 text-card-foreground',
                className,
            )}
            data-slot={slotName}
        >
            {(title || description) && (
                <div>
                    {title && (
                        <h3 className="text-sm font-semibold text-foreground">
                            {title}
                        </h3>
                    )}
                    {description && (
                        <p className="mt-1 text-xs font-medium text-muted-foreground">
                            {description}
                        </p>
                    )}
                </div>
            )}
            <div
                data-slot="settings-panel-rows"
                className="flex flex-col divide-y divide-(--hairline)"
            >
                {children}
            </div>
        </div>
    );
}

export interface ToggleRowProps {
    id: string;
    label: string;
    description?: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
    disabled?: boolean;
}

export function ToggleRow({
    id,
    label,
    description,
    checked,
    onChange,
    disabled,
}: ToggleRowProps) {
    return (
        <div
            data-slot="settings-toggle-row"
            className="gap-4 flex items-center justify-between py-item"
        >
            <div className="space-y-0.5">
                <Label
                    htmlFor={id}
                    className="text-sm font-medium text-foreground"
                >
                    {label}
                </Label>
                {description && (
                    <p className="text-xs font-medium text-muted-foreground">
                        {description}
                    </p>
                )}
            </div>
            <Switch
                id={id}
                checked={checked}
                onCheckedChange={onChange}
                disabled={disabled}
            />
        </div>
    );
}
