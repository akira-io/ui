import * as React from 'react';

import { focusRing } from '@/lib/language';
import { cn } from '@/lib/utils';

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
    return (
        <input
            type={type}
            data-slot="input"
            className={cn(
                `h-11 min-w-0 rounded-2xl px-4 text-sm font-medium flex w-full border border-border bg-muted/40 text-foreground transition-all placeholder:text-muted-foreground focus:bg-muted disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 ${focusRing}`,
                className,
            )}
            {...props}
        />
    );
}

export { Input };
