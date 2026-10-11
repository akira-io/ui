import * as TogglePrimitive from '@radix-ui/react-toggle';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import {
    controlFill,
    focusRing,
    glassBubble,
    glassControl,
    glassPress,
    solidPress,
} from '@/lib/language';
import { cn } from '@/lib/utils';
import type { SlotNameProps } from '@/types';

const toggleVariants = cva(
    `inline-flex h-control min-w-control items-center justify-center gap-item rounded-full px-inset text-control font-normal disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-icon [&_svg]:shrink-0 aria-invalid:ring-[3px] aria-invalid:ring-destructive/20 data-[state=on]:text-primary ${focusRing}`,
    {
        variants: {
            variant: {
                default: '',
                outline: `${glassControl} ${controlFill}`,
            },
            material: {
                glass: `${glassBubble} ${glassPress}`,
                solid: `${solidPress} data-[state=on]:bg-muted`,
            },
            size: {
                default: '',
                sm: 'h-8 min-w-8 pointer-coarse:h-target pointer-coarse:min-w-target',
                lg: 'h-12 min-w-12',
            },
        },
        defaultVariants: {
            variant: 'default',
            material: 'glass',
            size: 'default',
        },
    },
);

function isIconOnly(children: React.ReactNode): boolean {
    const parts = React.Children.toArray(children);

    return (
        parts.length > 0 &&
        parts.every(
            (part) =>
                React.isValidElement(part) && part.type !== React.Fragment,
        )
    );
}

const iconOnly = 'size-control px-0';

function Toggle({
    className,
    variant,
    material,
    size,
    slotName = 'toggle',
    children,
    ...props
}: React.ComponentProps<typeof TogglePrimitive.Root> &
    VariantProps<typeof toggleVariants> &
    SlotNameProps) {
    return (
        <TogglePrimitive.Root
            className={cn(
                toggleVariants({ variant, material, size }),
                isIconOnly(children) && iconOnly,
                className,
            )}
            {...props}
            data-slot={slotName}
        >
            {children}
        </TogglePrimitive.Root>
    );
}

export { iconOnly, isIconOnly, Toggle, toggleVariants };
