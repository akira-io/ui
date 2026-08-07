import * as SeparatorPrimitive from '@radix-ui/react-separator';
import * as React from 'react';

import { cn } from '@/lib/utils';
import type { SlotNameProps } from '@/types';

function Separator({
    className,
    orientation = 'horizontal',
    decorative = true,
    slotName = 'separator-root',
    ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root> & SlotNameProps) {
    return (
        <SeparatorPrimitive.Root
            decorative={decorative}
            orientation={orientation}
            className={cn(
                'shrink-0 bg-border data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px',
                className,
            )}
            {...props}
            data-slot={slotName}
        />
    );
}

export { Separator };
