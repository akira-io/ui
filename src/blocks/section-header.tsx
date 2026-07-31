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
                    <h2 className="text-lg font-bold text-foreground">
                        {title}
                    </h2>
                    {description && (
                        <p className="text-sm font-medium text-muted-foreground">
                            {description}
                        </p>
                    )}
                </div>
            </div>
            {control}
        </div>
    );
}
