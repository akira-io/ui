import * as React from 'react';

import { cn } from '@/lib/utils';

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
    return (
        <input
            type={type}
            data-slot="input"
            className={cn(
                'h-14 min-w-0 rounded-2xl border-zinc-200 bg-white/50 px-6 py-3 text-lg font-medium text-zinc-900 placeholder:text-zinc-400 focus:bg-white dark:border-white/10 dark:bg-zinc-900/50 dark:text-white dark:placeholder:text-zinc-500 dark:focus:bg-zinc-900 flex w-full border transition-all outline-none focus:border-ring/50 disabled:pointer-events-none disabled:opacity-50',
                className,
            )}
            {...props}
        />
    );
}

export { Input };
