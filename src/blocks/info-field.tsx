import { cn } from '@/lib/utils';
import { type LucideIcon } from 'lucide-react';
import { type ReactNode } from 'react';

export interface InfoFieldProps {
    icon: LucideIcon;
    label: string;
    value: ReactNode;
    iconClassName?: string;
    className?: string;
}

export function InfoField({
    icon: Icon,
    label,
    value,
    iconClassName,
    className,
}: InfoFieldProps) {
    return (
        <div className={cn('gap-3 flex items-center', className)}>
            <div
                className={cn(
                    'bg-zinc-100 p-2 dark:bg-white/5 rounded-lg',
                    iconClassName,
                )}
            >
                <Icon className="size-5 text-zinc-500" />
            </div>
            <div>
                <p className="text-xs font-bold tracking-wider text-zinc-400 uppercase">
                    {label}
                </p>
                <p className="font-bold">{value}</p>
            </div>
        </div>
    );
}

export interface InfoFieldGroupProps {
    children: ReactNode;
    className?: string;
}

export function InfoFieldGroup({ children, className }: InfoFieldGroupProps) {
    return <div className={cn('space-y-4', className)}>{children}</div>;
}
