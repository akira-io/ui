import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import { type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { toggleVariants } from '@/components/ui/toggle';
import { useSlidingIndicator } from '@/lib/motion/use-sliding-indicator';
import { cn } from '@/lib/utils';
import type { SlotNameProps } from '@/types';

const ToggleGroupContext = React.createContext<
    VariantProps<typeof toggleVariants> & { single?: boolean }
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
    const root = React.useRef<HTMLDivElement>(null);
    const pill = React.useRef<HTMLSpanElement>(null);
    const single = props.type === 'single';

    useSlidingIndicator(root, pill, '[data-state="on"]', single);

    return (
        <ToggleGroupPrimitive.Root
            ref={root}
            data-variant={variant}
            data-size={size}
            className={cn(
                'group/toggle-group data-[variant=outline]:shadow-xs rounded-2xl relative isolate flex items-center',
                className,
            )}
            {...props}
            data-slot={slotName}
        >
            {single ? (
                <span
                    ref={pill}
                    aria-hidden="true"
                    data-slot="toggle-group-indicator"
                    className="top-0 left-0 rounded-xl absolute -z-10 bg-accent"
                />
            ) : null}
            <ToggleGroupContext.Provider value={{ variant, size, single }}>
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
                context.single && 'data-[state=on]:bg-transparent',
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
