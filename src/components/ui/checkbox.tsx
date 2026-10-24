import { Checkbox as CheckboxPrimitive } from 'radix-ui';
import * as React from 'react';

import { focusRing, glassBubble } from '@/lib/language';
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
                `group/checkbox peer size-4 shrink-0 rounded-[4px] pointer-coarse:size-[22px] ${glassBubble} transition-colors disabled:opacity-50 aria-invalid:ring-[3px] aria-invalid:ring-destructive/20 data-[state=checked]:glass-prominent data-[state=indeterminate]:glass-prominent ${focusRing}`,
                className,
            )}
            {...props}
            data-slot={slotName}
        >
            <CheckboxPrimitive.Indicator
                forceMount
                data-slot="checkbox-indicator"
                className="flex items-center justify-center"
            >
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={3}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="size-3/4"
                    aria-hidden="true"
                >
                    <path
                        data-slot="checkbox-check"
                        d="M5 12.5 10 17.5 19 7"
                        pathLength={1}
                        className="transition-[stroke-dashoffset] duration-[220ms] ease-[cubic-bezier(0.2,0,0,1)] [stroke-dasharray:1] [stroke-dashoffset:1] group-data-[state=checked]/checkbox:[stroke-dashoffset:0] motion-reduce:transition-none"
                    />
                    <path
                        data-slot="checkbox-dash"
                        d="M6 12h12"
                        pathLength={1}
                        className="transition-[stroke-dashoffset] duration-[220ms] ease-[cubic-bezier(0.2,0,0,1)] [stroke-dasharray:1] [stroke-dashoffset:1] group-data-[state=indeterminate]/checkbox:[stroke-dashoffset:0] motion-reduce:transition-none"
                    />
                </svg>
            </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>
    );
}

export { Checkbox };
