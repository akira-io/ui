import * as React from 'react';

import { cn } from '@/lib/utils';

const Textarea = React.forwardRef<
    HTMLTextAreaElement,
    React.ComponentProps<'textarea'>
>(({ className, ...props }, ref) => {
    return (
        <textarea
            data-slot="textarea"
            className={cn(
                'rounded-2xl bg-zinc-50 px-4 py-3 text-base font-medium text-black shadow-xs placeholder:text-zinc-400 focus:border-red-500/50 focus:ring-red-500/20 focus-visible:bg-white md:text-sm dark:bg-white/5 dark:text-white dark:placeholder:text-white/20 dark:focus-visible:bg-white/10 flex min-h-[80px] w-full resize-none border border-transparent transition-[color,box-shadow] outline-none selection:bg-primary selection:text-primary-foreground focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50',
                'focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50',
                'aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40',
                className,
            )}
            ref={ref}
            {...props}
        />
    );
});
Textarea.displayName = 'Textarea';

export { Textarea };
