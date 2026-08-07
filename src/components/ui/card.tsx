import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import {
    elevatedSurface,
    flatSurface,
    recessedSurface,
    type FlatSurfaceProps,
} from '@/lib/language';
import { cn } from '@/lib/utils';
import type { SlotNameProps } from '@/types';

const cardVariants = cva(
    `relative flex flex-col gap-6 overflow-hidden text-card-foreground ${elevatedSurface}`,
    {
        variants: {
            variant: {
                default: 'bg-card/60',
                subtle: 'border-border/60 bg-card/40',
                solid: 'bg-card',
            },
            interactive: {
                true: 'transition-colors duration-200 hover:border-foreground/20',
                false: '',
            },
            padding: { none: 'py-0', sm: 'py-4', md: 'py-6', lg: 'py-8' },
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
            className={cn('gap-1.5 px-6 flex flex-col', className)}
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
            className={cn('px-6', className)}
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
            className={cn('px-6 flex items-center', className)}
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
