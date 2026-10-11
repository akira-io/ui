import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import { type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { iconOnly, isIconOnly, toggleVariants } from '@/components/ui/toggle';
import { glassBubble } from '@/lib/language';
import { assignRefs } from '@/lib/motion/assign-refs';
import { useLensDrag } from '@/lib/motion/use-lens-drag';
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
    ref,
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
    const composedRef = React.useMemo(() => assignRefs(root, ref), [ref]);
    const single = props.type === 'single' && variant !== 'outline';

    useSlidingIndicator(root, pill, '[data-state="on"]', single);
    useLensDrag(root, pill, '[data-slot="toggle-group-item"]', 'on');

    return (
        <ToggleGroupPrimitive.Root
            ref={composedRef}
            data-variant={variant}
            data-size={size}
            className={cn(
                'group/toggle-group data-[variant=outline]:shadow-xs relative isolate flex items-center rounded-full',
                single ? 'p-0.5 touch-pan-y bg-muted' : 'gap-tight',
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
                    className={cn(
                        glassBubble,
                        'top-0 left-0 absolute -z-10 rounded-full transition-[scale] duration-500 ease-spring data-[dragging]:scale-x-110 data-[dragging]:scale-y-[1.18] data-[dragging]:duration-200 motion-reduce:transition-none',
                    )}
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
    material,
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
                    material: context.single ? 'solid' : material,
                    size: context.size || size,
                }),
                !context.single && isIconOnly(children) && iconOnly,
                context.single &&
                    'data-[state=on]:font-semibold active:brightness-100 data-[state=off]:text-muted-foreground data-[state=on]:bg-transparent data-[state=on]:text-foreground',
                'shrink-0 focus:z-10 focus-visible:z-10 data-[variant=outline]:border-l-0 data-[variant=outline]:first-of-type:border-l',
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
