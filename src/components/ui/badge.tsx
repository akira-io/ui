import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { glassBubble } from '@/lib/language';
import { cn } from '@/lib/utils';
import type { SlotNameProps } from '@/types';

const badgeVariants = cva(
    'inline-flex items-center justify-center rounded-full px-2.5 py-1 text-xs font-semibold icon-weight-semibold w-fit whitespace-nowrap shrink-0 [&>svg]:size-icon-sm gap-1 [&>svg]:pointer-events-none focus-visible:outline-solid focus-visible:outline-1 focus-visible:outline-offset-0 focus-visible:outline-ring aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 transition-[color,box-shadow] overflow-hidden',
    {
        variants: {
            variant: {
                default: 'glass-prominent glass-edge',
                secondary: `${glassBubble} text-foreground`,
                destructive:
                    'glass-prominent glass-edge [--btn:var(--destructive)] focus-visible:outline-destructive',
                outline: `${glassBubble} text-foreground`,
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    },
);

function Badge({
    className,
    variant,
    asChild = false,
    slotName = 'badge',
    ...props
}: React.ComponentProps<'span'> &
    VariantProps<typeof badgeVariants> & {
        asChild?: boolean;
    } & SlotNameProps) {
    const Comp = asChild ? Slot : 'span';

    return (
        <Comp
            className={cn(badgeVariants({ variant }), className)}
            {...props}
            data-slot={slotName}
        />
    );
}

export { Badge, badgeVariants };
