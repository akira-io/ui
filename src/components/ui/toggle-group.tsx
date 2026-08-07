import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import { type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { toggleVariants } from '@/components/ui/toggle';
import { cn } from '@/lib/utils';
import type { SlotNameProps } from '@/types';

const ToggleGroupContext = React.createContext<
    VariantProps<typeof toggleVariants>
>({
    size: 'default',
    variant: 'default',
});

function ToggleGroup({
    className,
    variant,
    size,
    children,
    slotName = 'toggle-group',
    ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Root> &
    VariantProps<typeof toggleVariants> &
    SlotNameProps) {
    return (
        <ToggleGroupPrimitive.Root
            data-variant={variant}
            data-size={size}
            className={cn(
                'group/toggle-group data-[variant=outline]:shadow-xs rounded-2xl flex items-center',
                className,
            )}
            {...props}
            data-slot={slotName}
        >
            <ToggleGroupContext.Provider value={{ variant, size }}>
                {children}
            </ToggleGroupContext.Provider>
        </ToggleGroupPrimitive.Root>
    );
}

function ToggleGroupItem({
    className,
    children,
    variant,
    size,
    slotName = 'toggle-group-item',
    ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Item> &
    VariantProps<typeof toggleVariants> &
    SlotNameProps) {
    const context = React.useContext(ToggleGroupContext);

    return (
        <ToggleGroupPrimitive.Item
            data-variant={context.variant || variant}
            data-size={context.size || size}
            className={cn(
                toggleVariants({
                    variant: context.variant || variant,
                    size: context.size || size,
                }),
                'min-w-0 first:rounded-l-2xl last:rounded-r-2xl shrink-0 rounded-none shadow-none focus:z-10 focus-visible:z-10 data-[variant=outline]:border-l-0 data-[variant=outline]:first:border-l',
                className,
            )}
            {...props}
            data-slot={slotName}
        >
            {children}
        </ToggleGroupPrimitive.Item>
    );
}

export { ToggleGroup, ToggleGroupItem };
