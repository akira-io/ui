import { cva, type VariantProps } from 'class-variance-authority';
import { LoaderCircle } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/lib/utils';

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

interface SpinnerProps
    extends React.ComponentProps<'span'>, VariantProps<typeof spinnerVariants> {
    label?: string;
}

function Spinner({
    className,
    label = 'Loading',
    size = 'default',
    ...props
}: SpinnerProps) {
    return (
        <span
            {...props}
            data-slot="spinner"
            data-size={size}
            role="status"
            className={cn(spinnerVariants({ size }), className)}
        >
            <LoaderCircle
                aria-hidden="true"
                className="animate-spin size-full text-current motion-reduce:animate-none"
            />
            <span className="sr-only">{label}</span>
        </span>
    );
}

export { Spinner, spinnerVariants, type SpinnerProps };
