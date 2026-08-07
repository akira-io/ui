import * as React from 'react';

import { fieldFocus, fieldSurface } from '@/lib/language';
import { cn } from '@/lib/utils';
import type { SlotNameProps } from '@/types';

const Textarea = React.forwardRef<
    HTMLTextAreaElement,
    React.ComponentProps<'textarea'> & SlotNameProps
>(({ className, slotName = 'textarea', ...props }, ref) => {
    return (
        <textarea
            className={cn(
                fieldSurface,
                'px-4 py-3 text-sm font-medium min-h-24 flex w-full resize-none transition-[color,box-shadow] selection:bg-primary selection:text-primary-foreground placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50',
                fieldFocus,
                'aria-invalid:border-destructive aria-invalid:ring-destructive/20',
                className,
            )}
            ref={ref}
            {...props}
            data-slot={slotName}
        />
    );
});
Textarea.displayName = 'Textarea';

export { Textarea };
