import * as React from 'react';

import { focusRing } from '@/lib/language';
import { cn } from '@/lib/utils';

const Textarea = React.forwardRef<
    HTMLTextAreaElement,
    React.ComponentProps<'textarea'>
>(({ className, ...props }, ref) => {
    return (
        <textarea
            data-slot="textarea"
            className={cn(
                'rounded-2xl px-4 py-3 text-sm font-medium shadow-xs min-h-24 flex w-full resize-none border border-border bg-muted/40 text-foreground transition-[color,box-shadow] selection:bg-primary selection:text-primary-foreground placeholder:text-muted-foreground focus-visible:bg-muted disabled:cursor-not-allowed disabled:opacity-50',
                focusRing,
                'aria-invalid:border-destructive aria-invalid:ring-destructive/20',
                className,
            )}
            ref={ref}
            {...props}
        />
    );
});
Textarea.displayName = 'Textarea';

export { Textarea };
