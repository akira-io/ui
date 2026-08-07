import * as React from 'react';

import { fieldSurface, focusRing } from '@/lib/language';
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
                `h-11 min-w-0 px-4 text-sm font-medium flex w-full transition-all placeholder:text-muted-foreground focus:bg-muted disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 ${fieldSurface} ${focusRing}`,
                className,
            )}
            {...props}
            data-slot={slotName}
        />
    );
}

export { Input };
