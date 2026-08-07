import * as LabelPrimitive from '@radix-ui/react-label';
import * as React from 'react';

import { cn } from '@/lib/utils';
import type { SlotNameProps } from '@/types';

function Label({
    className,
    slotName = 'label',
    ...props
}: React.ComponentProps<typeof LabelPrimitive.Root> & SlotNameProps) {
    return (
        <LabelPrimitive.Root
            className={cn(
                'text-sm font-medium text-foreground select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
                className,
            )}
            {...props}
            data-slot={slotName}
        />
    );
}

export { Label };
