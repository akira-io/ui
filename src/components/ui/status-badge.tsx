import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const statusBadgeVariants = cva('', {
    variants: {
        status: {
            neutral: 'border-border bg-muted text-muted-foreground',
            info: 'border-info/20 bg-info/10 text-info',
            success: 'border-success/20 bg-success/10 text-success',
            warning: 'border-warning/20 bg-warning/10 text-warning',
            danger: 'border-destructive/20 bg-destructive/10 text-destructive',
        },
    },
    defaultVariants: {
        status: 'neutral',
    },
});

type StatusBadgeStatus = NonNullable<
    VariantProps<typeof statusBadgeVariants>['status']
>;

interface StatusBadgeProps
    extends
        Omit<React.ComponentProps<typeof Badge>, 'variant'>,
        VariantProps<typeof statusBadgeVariants> {
    dot?: boolean;
}

function StatusBadge({
    className,
    status = 'neutral',
    dot = false,
    children,
    ...props
}: StatusBadgeProps) {
    const resolvedStatus: StatusBadgeStatus = status ?? 'neutral';

    return (
        <Badge
            variant="outline"
            data-slot="status-badge"
            data-status={resolvedStatus}
            className={cn(
                statusBadgeVariants({ status: resolvedStatus }),
                className,
            )}
            {...props}
        >
            {dot && (
                <span
                    aria-hidden="true"
                    data-slot="status-badge-dot"
                    className="size-1.5 shrink-0 rounded-full bg-current"
                />
            )}
            {children}
        </Badge>
    );
}

export {
    StatusBadge,
    statusBadgeVariants,
    type StatusBadgeProps,
    type StatusBadgeStatus,
};
