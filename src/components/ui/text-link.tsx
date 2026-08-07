import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { focusRing } from '@/lib/language';
import { cn } from '@/lib/utils';
import type { SlotNameProps } from '@/types';

const textLinkVariants = cva(
    `cursor-pointer rounded-xl underline decoration-border underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current ${focusRing}`,
    {
        variants: {
            variant: {
                default: 'text-foreground',
                muted: 'text-muted-foreground hover:text-foreground',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    },
);

interface TextLinkProps
    extends React.ComponentProps<'a'>, VariantProps<typeof textLinkVariants> {
    asChild?: boolean;
}

function TextLink({
    className,
    variant = 'default',
    asChild = false,
    slotName = 'text-link',
    ...props
}: TextLinkProps & SlotNameProps) {
    const Comp = asChild ? Slot : 'a';

    return (
        <Comp
            data-variant={variant}
            className={cn(textLinkVariants({ variant }), className)}
            {...props}
            data-slot={slotName}
        />
    );
}

export { TextLink, textLinkVariants, type TextLinkProps };
