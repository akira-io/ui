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
            <div className={cn('p-2 rounded-xl bg-muted', iconClassName)}>
                <Icon className="size-5 text-muted-foreground" />
            </div>
            <div>
                <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
                    {label}
                </p>
                <p className="font-semibold">{value}</p>
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
