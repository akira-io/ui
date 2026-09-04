'use client';

import { Progress as ProgressPrimitive } from 'radix-ui';
import * as React from 'react';

import { cn } from '@/lib/utils';
import type { SlotNameProps } from '@/types';

function Progress({
    className,
    value,
    slotName = 'progress',
    ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root> & SlotNameProps) {
    return (
        <ProgressPrimitive.Root
            value={value}
            className={cn(
                'h-2 relative w-full overflow-hidden rounded-full bg-primary/20',
                className,
            )}
            {...props}
            data-slot={slotName}
        >
            <ProgressPrimitive.Indicator
                data-slot="progress-indicator"
                className="h-full w-full flex-1 bg-primary transition-all"
                style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
            />
        </ProgressPrimitive.Root>
    );
}

export { Progress };
