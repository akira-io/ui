import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { elevatedSurface } from '@/lib/language';
import { cn } from '@/lib/utils';
import type { SlotNameProps } from '@/types';

const alertVariants = cva(
    `${elevatedSurface} relative w-full px-5 py-4 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current`,
    {
        variants: {
            variant: {
                default: 'bg-card/60 text-card-foreground',
                destructive:
                    'border-destructive/30 bg-destructive/10 text-destructive [&>svg]:text-current *:data-[slot=alert-description]:text-destructive/80',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    },
);

function Alert({
    className,
    variant,
    slotName = 'alert',
    ...props
}: React.ComponentProps<'div'> &
    VariantProps<typeof alertVariants> &
    SlotNameProps) {
    return (
        <div
            role="alert"
            className={cn(alertVariants({ variant }), className)}
            {...props}
            data-slot={slotName}
        />
    );
}

function AlertTitle({
    className,
    slotName = 'alert-title',
    ...props
}: React.ComponentProps<'div'> & SlotNameProps) {
    return (
        <div
            className={cn(
                'min-h-4 font-medium tracking-tight col-start-2 line-clamp-1',
                className,
            )}
            {...props}
            data-slot={slotName}
        />
    );
}

function AlertDescription({
    className,
    slotName = 'alert-description',
    ...props
}: React.ComponentProps<'div'> & SlotNameProps) {
    return (
        <div
            className={cn(
                'gap-1 text-sm [&_p]:leading-relaxed col-start-2 grid justify-items-start text-muted-foreground',
                className,
            )}
            {...props}
            data-slot={slotName}
        />
    );
}

export { Alert, AlertDescription, AlertTitle };
