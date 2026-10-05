import { cva, type VariantProps } from 'class-variance-authority';
import { LoaderCircle } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/lib/utils';
import { useUiLabels } from '@/locales/context';
import type { SlotNameProps } from '@/types';

const spinnerVariants = cva('inline-flex shrink-0', {
    variants: {
        size: {
            sm: 'size-3.5',
            default: 'size-4',
            lg: 'size-5',
        },
    },
    defaultVariants: {
        size: 'default',
    },
});

export interface SpinnerLabels {
    label: string;
}

export const spinnerDefaultLabels: SpinnerLabels = {
    label: 'Loading',
};

interface SpinnerProps
    extends React.ComponentProps<'span'>, VariantProps<typeof spinnerVariants> {
    label?: string;
}

function Spinner({
    className,
    label,
    size = 'default',
    slotName = 'spinner',
    ...props
}: SpinnerProps & SlotNameProps) {
    const text = useUiLabels('spinner', spinnerDefaultLabels, { label });

    return (
        <span
            {...props}
            data-size={size}
            role="status"
            className={cn(spinnerVariants({ size }), className)}
            data-slot={slotName}
        >
            <LoaderCircle
                aria-hidden="true"
                className="animate-spin size-full text-current motion-reduce:animate-none"
            />
            <span className="sr-only">{text.label}</span>
        </span>
    );
}

export { Spinner, spinnerVariants, type SpinnerProps };
