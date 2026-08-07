import * as React from 'react';

import { compactRadius, controlFill } from '@/lib/language';
import { cn } from '@/lib/utils';
import type { SlotNameProps } from '@/types';

function Code({
    className,
    slotName = 'code',
    ...props
}: React.ComponentProps<'code'> & SlotNameProps) {
    return (
        <code
            className={cn(
                compactRadius,
                controlFill,
                'px-1.5 py-0.5 font-mono font-medium text-[0.875em] text-foreground',
                className,
            )}
            {...props}
            data-slot={slotName}
        />
    );
}

export { Code };
