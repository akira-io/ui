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
                'min-h-24 rounded-2xl flex w-full resize-none px-inset py-[calc((var(--control-h)-1lh)/2)] transition-shadow selection:bg-primary selection:text-primary-foreground placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50',
                fieldFocus,
                'aria-invalid:ring-[3px] aria-invalid:ring-destructive/20',
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
