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
                'px-4 py-3 text-sm font-medium min-h-24 flex w-full resize-none transition-[color,box-shadow] selection:bg-primary selection:text-primary-foreground placeholder:text-muted-foreground focus-visible:bg-muted disabled:cursor-not-allowed disabled:opacity-50',
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
