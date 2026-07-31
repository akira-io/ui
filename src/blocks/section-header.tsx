import { cn } from '@/lib/utils';
import { type ReactNode } from 'react';

export interface SectionHeaderProps {
    icon?: ReactNode;
    title: string;
    description?: string;
    control?: ReactNode;
    className?: string;
}

export function SectionHeader({
    icon,
    title,
    description,
    control,
    className,
}: SectionHeaderProps) {
    return (
        <div
            className={cn(
                'gap-4 sm:flex-row sm:items-center sm:justify-between flex flex-col',
                className,
            )}
        >
            <div className="gap-3 flex items-center">
                {icon}
                <div>
                    <h2 className="text-lg font-black text-zinc-900 dark:text-white">
                        {title}
                    </h2>
                    {description && (
                        <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                            {description}
                        </p>
                    )}
                </div>
            </div>
            {control}
        </div>
    );
}
