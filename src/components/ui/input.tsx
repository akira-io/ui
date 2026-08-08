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
                `h-11 min-w-0 px-4 font-medium flex w-full transition-all placeholder:text-muted-foreground focus:bg-muted disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 ${fieldSurface} ${fieldFocus}`,
                className,
            )}
            {...props}
            data-slot={slotName}
        />
    );
}

export { Input };
