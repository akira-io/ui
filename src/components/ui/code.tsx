import * as React from 'react';

import { compactRadius, controlFill } from '@/lib/language';
import { cn } from '@/lib/utils';

function Code({ className, ...props }: React.ComponentProps<'code'>) {
    return (
        <code
            data-slot="code"
            className={cn(
                compactRadius,
                controlFill,
                'px-1.5 py-0.5 font-mono font-medium text-[0.875em] text-foreground',
                className,
            )}
            {...props}
        />
    );
}

export { Code };
