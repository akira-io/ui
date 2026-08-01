import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { controlFill, focusRing, glassControl } from '@/lib/language';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
    `inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-2xl text-sm font-semibold transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 aria-invalid:ring-destructive/20 aria-invalid:border-destructive ${focusRing}`,
    {
        variants: {
            variant: {
                default:
                    'bg-primary text-primary-foreground shadow-xl hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98]',
                destructive:
                    'bg-destructive text-destructive-foreground shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/40',
                outline: `${glassControl} ${controlFill} hover:bg-accent hover:text-accent-foreground`,
                secondary: `${glassControl} bg-secondary/80 text-secondary-foreground hover:bg-secondary`,
                ghost: 'hover:bg-accent hover:text-accent-foreground',
                link: 'text-primary underline-offset-4 hover:underline',
            },
            size: {
                default: 'h-11 px-4 has-[>svg]:px-3',
                sm: 'h-9 gap-1.5 rounded-xl px-3 has-[>svg]:px-2.5',
                lg: 'h-12 px-6 has-[>svg]:px-5 text-base',
                icon: 'size-11',
                'icon-sm': 'size-9 rounded-xl',
                'icon-lg': 'size-12',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    },
);

function Button({
    className,
    variant = 'default',
    size = 'default',
    asChild = false,
    ...props
}: React.ComponentProps<'button'> &
    VariantProps<typeof buttonVariants> & {
        asChild?: boolean;
    }) {
    const Comp = asChild ? Slot : 'button';

    return (
        <Comp
            data-slot="button"
            data-variant={variant}
            data-size={size}
            className={cn(buttonVariants({ variant, size, className }))}
            {...props}
        />
    );
}

export { Button, buttonVariants };
