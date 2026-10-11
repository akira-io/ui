import * as React from 'react';

import { fieldFocus, fieldSurface } from '@/lib/language';
import { cn } from '@/lib/utils';
import type { SlotNameProps } from '@/types';

function Input({
    className,
    type,
    slotName = 'input',
    ...props
}: React.ComponentProps<'input'> & SlotNameProps) {
    return (
        <input
            type={type}
            className={cn(
                `min-w-0 flex h-control w-full px-inset transition-shadow placeholder:text-muted-foreground disabled:pointer-events-none disabled:opacity-50 aria-invalid:ring-[3px] aria-invalid:ring-destructive/20 ${fieldSurface} ${fieldFocus}`,
                className,
            )}
            {...props}
            data-slot={slotName}
        />
    );
}

export { Input };
