import {
    contentSurfaces,
    iconTile,
    type ContentSurfaceProps,
} from '@/lib/language';
import { cn } from '@/lib/utils';
import { type ReactNode } from 'react';

export interface SectionHeaderProps extends ContentSurfaceProps {
    icon?: ReactNode;
    iconClassName?: string;
    title: string;
    description?: string;
    control?: ReactNode;
    className?: string;
}

export function SectionHeader({
    icon,
    iconClassName,
    title,
    description,
    control,
    surface = 'grouped',
    className,
}: SectionHeaderProps) {
    return (
        <div
            className={cn(
                'gap-4 sm:flex-row sm:items-center sm:justify-between flex flex-col',
                contentSurfaces[surface],
                className,
            )}
        >
            <div className="gap-3 flex items-center">
                {icon && (
                    <span
                        data-slot="section-header-icon"
                        className={cn(
                            'size-11 flex shrink-0 items-center justify-center [&_svg:not([class*=size-])]:size-icon',
                            iconTile,
                            iconClassName,
                        )}
                    >
                        {icon}
                    </span>
                )}
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
