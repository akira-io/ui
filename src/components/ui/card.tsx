import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import {
    elevatedSurface,
    flatSurface,
    nestedSurfaceTint,
    recessedSurface,
    type FlatSurfaceProps,
} from '@/lib/language';
import { cn } from '@/lib/utils';
import type { SlotNameProps } from '@/types';

const cardVariants = cva(
    `relative flex flex-col gap-group overflow-hidden text-card-foreground ${elevatedSurface} ${nestedSurfaceTint}`,
    {
        variants: {
            variant: {
                default: '',
                subtle: 'bg-(--glass-highlight) backdrop-blur-none',
                solid: '',
                outlined: `border border-(--glass-button-ring) ${flatSurface}`,
            },
            interactive: {
                true: 'transition-colors duration-200 hover:border-foreground/20',
                false: '',
            },
            padding: {
                none: 'py-0',
                sm: 'py-[calc(var(--space-inset)*0.5)]',
                md: 'py-inset',
                lg: 'py-[calc(var(--space-inset)*1.5)]',
            },
        },
        defaultVariants: {
            variant: 'default',
            interactive: false,
            padding: 'md',
        },
    },
);

type CardProps = React.ComponentProps<'div'> &
    VariantProps<typeof cardVariants> &
    FlatSurfaceProps;

function Card({
    className,
    variant,
    interactive,
    padding,
    inset = false,
    flat = false,
    slotName = 'card',
    ...props
}: CardProps & SlotNameProps) {
    return (
        <div
            data-inset={inset || undefined}
            data-flat={flat || undefined}
            className={cn(
                cardVariants({ variant, interactive, padding }),
                flat && flatSurface,
                inset && recessedSurface,
                className,
            )}
            {...props}
            data-surface=""
            data-slot={slotName}
        />
    );
}

function CardHeader({
    className,
    slotName = 'card-header',
    ...props
}: React.ComponentProps<'div'> & SlotNameProps) {
    return (
        <div
            className={cn('flex flex-col gap-tight px-inset', className)}
            {...props}
            data-slot={slotName}
        />
    );
}

function CardTitle({
    className,
    slotName = 'card-title',
    ...props
}: React.ComponentProps<'div'> & SlotNameProps) {
    return (
        <div
            className={cn('font-semibold leading-none', className)}
            {...props}
            data-slot={slotName}
        />
    );
}

function CardDescription({
    className,
    slotName = 'card-description',
    ...props
}: React.ComponentProps<'div'> & SlotNameProps) {
    return (
        <div
            className={cn('text-sm text-muted-foreground', className)}
            {...props}
            data-slot={slotName}
        />
    );
}

function CardContent({
    className,
    slotName = 'card-content',
    ...props
}: React.ComponentProps<'div'> & SlotNameProps) {
    return (
        <div
            className={cn('px-inset', className)}
            {...props}
            data-slot={slotName}
        />
    );
}

function CardFooter({
    className,
    slotName = 'card-footer',
    ...props
}: React.ComponentProps<'div'> & SlotNameProps) {
    return (
        <div
            className={cn('flex items-center px-inset', className)}
            {...props}
            data-slot={slotName}
        />
    );
}

export {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
    cardVariants,
};
