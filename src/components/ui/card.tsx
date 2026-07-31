import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import {
    elevatedSurface,
    recessedSurface,
    type SurfaceProps,
} from '@/lib/language';
import { cn } from '@/lib/utils';

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
    SurfaceProps;

function Card({
    className,
    variant,
    interactive,
    padding,
    inset = false,
    ...props
}: CardProps) {
    return (
        <div
            data-slot="card"
            data-inset={inset || undefined}
            className={cn(
                cardVariants({ variant, interactive, padding }),
                inset && recessedSurface,
                className,
            )}
            {...props}
        />
    );
}

function CardHeader({ className, ...props }: React.ComponentProps<'div'>) {
    return (
        <div
            data-slot="card-header"
            className={cn('gap-1.5 px-6 flex flex-col', className)}
            {...props}
        />
    );
}

function CardTitle({ className, ...props }: React.ComponentProps<'div'>) {
    return (
        <div
            data-slot="card-title"
            className={cn('font-semibold leading-none', className)}
            {...props}
        />
    );
}

function CardDescription({ className, ...props }: React.ComponentProps<'div'>) {
    return (
        <div
            data-slot="card-description"
            className={cn('text-sm text-muted-foreground', className)}
            {...props}
        />
    );
}

function CardContent({ className, ...props }: React.ComponentProps<'div'>) {
    return (
        <div
            data-slot="card-content"
            className={cn('px-6', className)}
            {...props}
        />
    );
}

function CardFooter({ className, ...props }: React.ComponentProps<'div'>) {
    return (
        <div
            data-slot="card-footer"
            className={cn('px-6 flex items-center', className)}
            {...props}
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
