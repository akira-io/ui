import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import { type LucideIcon } from 'lucide-react';
import { type ReactNode } from 'react';

export interface SettingsCardProps {
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
    className,
}: SettingsCardProps) {
    return (
        <section
            className={cn(
                'space-y-5 rounded-3xl border-zinc-200 bg-white/90 p-6 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-zinc-900/90 border',
                className,
            )}
        >
            <div className="gap-4 sm:flex-row sm:items-center sm:justify-between flex flex-col">
                <div className="gap-3 flex items-center">
                    <div
                        className={cn(
                            'size-11 rounded-2xl flex items-center justify-center',
                            iconClassName ??
                                'bg-zinc-100 text-zinc-600 dark:bg-white/10 dark:text-zinc-300',
                        )}
                    >
                        <Icon className="size-5" />
                    </div>
                    <div>
                        <h2 className="text-lg font-black text-zinc-900 dark:text-white">
                            {title}
                        </h2>
                        <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                            {description}
                        </p>
                    </div>
                </div>
                {control}
            </div>
            {children}
        </section>
    );
}

export interface SettingsPanelProps {
    title?: string;
    description?: string;
    children: ReactNode;
    className?: string;
}

export function SettingsPanel({
    title,
    description,
    children,
    className,
}: SettingsPanelProps) {
    return (
        <div
            className={cn(
                'space-y-4 rounded-2xl border-zinc-200 bg-zinc-50/60 p-5 dark:border-white/10 dark:bg-white/5 border',
                className,
            )}
        >
            {(title || description) && (
                <div>
                    {title && (
                        <h3 className="text-sm font-black text-zinc-900 dark:text-white">
                            {title}
                        </h3>
                    )}
                    {description && (
                        <p className="mt-1 text-xs font-medium text-zinc-500 dark:text-zinc-400">
                            {description}
                        </p>
                    )}
                </div>
            )}
            {children}
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
        <div className="gap-4 py-1 flex items-center justify-between">
            <div className="space-y-0.5">
                <Label
                    htmlFor={id}
                    className="text-sm font-bold text-zinc-900 dark:text-white"
                >
                    {label}
                </Label>
                {description && (
                    <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
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
