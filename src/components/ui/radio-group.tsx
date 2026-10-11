import { RadioGroup as RadioGroupPrimitive } from 'radix-ui';
import * as React from 'react';

import { focusRing, glassBubble } from '@/lib/language';
import { cn } from '@/lib/utils';
import type { SlotNameProps } from '@/types';

function RadioGroup({
    className,
    slotName = 'radio-group',
    ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root> & SlotNameProps) {
    return (
        <RadioGroupPrimitive.Root
            className={cn('grid gap-item', className)}
            {...props}
            data-slot={slotName}
        />
    );
}

function RadioGroupItem({
    className,
    slotName = 'radio-group-item',
    ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item> & SlotNameProps) {
    return (
        <RadioGroupPrimitive.Item
            className={cn(
                `size-4 aspect-square shrink-0 rounded-full pointer-coarse:size-[22px] ${glassBubble} transition-colors disabled:opacity-50 aria-invalid:ring-[3px] aria-invalid:ring-destructive/20 data-[state=checked]:glass-prominent ${focusRing}`,
                className,
            )}
            {...props}
            data-slot={slotName}
        >
            <RadioGroupPrimitive.Indicator
                data-slot="radio-group-indicator"
                className="flex size-full items-center justify-center"
            >
                <span
                    data-slot="radio-group-dot"
                    className="size-2/5 rounded-full bg-primary-foreground"
                />
            </RadioGroupPrimitive.Indicator>
        </RadioGroupPrimitive.Item>
    );
}

export { RadioGroup, RadioGroupItem };
