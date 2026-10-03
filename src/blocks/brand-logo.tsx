import { compactRadius } from '@/lib/language';
import { cn } from '@/lib/utils';
import type { IconComponent, SlotNameProps } from '@/types';

export interface BrandLogoProps {
    icon: IconComponent;
    name: string;
    className?: string;
}

export function BrandLogo({
    icon: Icon,
    name,
    className,
    slotName = 'brand-logo',
}: BrandLogoProps & SlotNameProps) {
    return (
        <div
            data-slot={slotName}
            className={cn(
                'gap-3 min-w-0 group-data-[collapsible=icon]:gap-0 flex items-center',
                className,
            )}
        >
            <div
                data-slot="brand-logo-mark"
                aria-hidden="true"
                className={cn(
                    compactRadius,
                    'size-10 shadow-lg flex aspect-square shrink-0 items-center justify-center bg-primary text-primary-foreground shadow-primary/20',
                )}
            >
                <Icon className="size-6 stroke-[2.5]" />
            </div>
            <span
                data-slot="brand-logo-name"
                className="text-xl font-bold tracking-tight truncate text-left text-foreground uppercase group-data-[collapsible=icon]:sr-only"
            >
                {name}
            </span>
        </div>
    );
}
