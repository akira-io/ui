import * as TogglePrimitive from '@radix-ui/react-toggle';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { controlFill, focusRing, glassControl } from '@/lib/language';
import { cn } from '@/lib/utils';
import type { SlotNameProps } from '@/types';

const toggleVariants = cva(
    `inline-flex items-center justify-center gap-2 rounded-xl text-sm font-medium hover:bg-muted hover:text-muted-foreground disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:font-semibold data-[state=on]:text-accent-foreground [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 transition-[color,box-shadow] aria-invalid:ring-destructive/20 aria-invalid:border-destructive ${focusRing}`,
    {
        variants: {
            variant: {
                default: 'bg-transparent',
                outline: `${glassControl} ${controlFill} hover:bg-accent hover:text-accent-foreground`,
            },
            size: {
                default: 'h-11 px-4 min-w-11',
                sm: 'h-9 px-3 min-w-9',
                lg: 'h-12 px-6 min-w-12',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    },
);

function Toggle({
    className,
    variant,
    size,
    slotName = 'toggle',
    ...props
}: React.ComponentProps<typeof TogglePrimitive.Root> &
    VariantProps<typeof toggleVariants> &
    SlotNameProps) {
    return (
        <TogglePrimitive.Root
            className={cn(toggleVariants({ variant, size, className }))}
            {...props}
            data-slot={slotName}
        />
    );
}

export { Toggle, toggleVariants };
