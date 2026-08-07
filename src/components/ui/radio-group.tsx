import { CircleIcon } from 'lucide-react';
import { RadioGroup as RadioGroupPrimitive } from 'radix-ui';
import * as React from 'react';

import { focusRing } from '@/lib/language';
import { cn } from '@/lib/utils';
import type { SlotNameProps } from '@/types';

function RadioGroup({
    className,
    slotName = 'radio-group',
    ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root> & SlotNameProps) {
    return (
        <RadioGroupPrimitive.Root
            className={cn('gap-3 grid', className)}
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
                `size-5 shadow-xs aspect-square shrink-0 rounded-full border border-border text-primary transition-[color,box-shadow] disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 ${focusRing}`,
                className,
            )}
            {...props}
            data-slot={slotName}
        >
            <RadioGroupPrimitive.Indicator
                data-slot="radio-group-indicator"
                className="relative flex items-center justify-center"
            >
                <CircleIcon className="size-2.5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 fill-primary" />
            </RadioGroupPrimitive.Indicator>
        </RadioGroupPrimitive.Item>
    );
}

export { RadioGroup, RadioGroupItem };
