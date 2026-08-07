import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { CheckIcon } from 'lucide-react';
import * as React from 'react';

import { focusRing } from '@/lib/language';
import { cn } from '@/lib/utils';
import type { SlotNameProps } from '@/types';

function Checkbox({
    className,
    slotName = 'checkbox',
    ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root> & SlotNameProps) {
    return (
        <CheckboxPrimitive.Root
            className={cn(
                `peer size-5 shadow-xs shrink-0 rounded-md border border-border transition-all disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground ${focusRing}`,
                className,
            )}
            {...props}
            data-slot={slotName}
        >
            <CheckboxPrimitive.Indicator
                data-slot="checkbox-indicator"
                className="flex items-center justify-center text-current transition-none"
            >
                <CheckIcon className="size-3.5" />
            </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>
    );
}

export { Checkbox };
