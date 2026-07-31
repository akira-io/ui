import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const cardVariants = cva(
    'relative flex flex-col gap-6 overflow-hidden rounded-3xl border text-card-foreground shadow-2xl backdrop-blur-xl',
    {
        variants: {
            variant: {
                default:
                    'border-zinc-200 bg-white/60 dark:border-white/10 dark:bg-zinc-900/60',
                subtle: 'border-zinc-200/70 bg-white/40 dark:border-white/10 dark:bg-zinc-900/40',
                solid: 'border-zinc-200 bg-white dark:border-white/10 dark:bg-zinc-900',
            },
            interactive: {
                true: 'transition-colors duration-200 hover:border-zinc-300 dark:hover:border-white/20',
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
    VariantProps<typeof cardVariants>;

function Card({
    className,
    variant,
    interactive,
    padding,
    ...props
}: CardProps) {
    return (
        <div
            data-slot="card"
            className={cn(
                cardVariants({ variant, interactive, padding }),
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
