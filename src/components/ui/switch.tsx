import * as SwitchPrimitives from '@radix-ui/react-switch';
import * as React from 'react';

import { focusRing } from '@/lib/language';
import { cn } from '@/lib/utils';
import type { SlotNameProps } from '@/types';

const Switch = React.forwardRef<
    React.ElementRef<typeof SwitchPrimitives.Root>,
    React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> & SlotNameProps
>(({ className, slotName = 'switch', ...props }, ref) => (
    <SwitchPrimitives.Root
        className={cn(
            `peer h-6 w-11 shadow-sm inline-flex shrink-0 cursor-pointer items-center rounded-full border border-transparent transition-colors disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input ${focusRing}`,
            className,
        )}
        {...props}
        ref={ref}
        data-slot={slotName}
    >
        <SwitchPrimitives.Thumb
            data-slot="switch-thumb"
            className={cn(
                'size-5 shadow-lg data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0 pointer-events-none block rounded-full bg-background ring-0 transition-transform',
            )}
        />
    </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
