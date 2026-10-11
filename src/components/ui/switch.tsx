import * as SwitchPrimitives from '@radix-ui/react-switch';
import * as React from 'react';

import { focusRing } from '@/lib/language';
import { assignRefs } from '@/lib/motion/assign-refs';
import { useSwitchDrag } from '@/lib/motion/use-switch-drag';
import { cn } from '@/lib/utils';
import type { SlotNameProps } from '@/types';

const track = [
    'group/switch peer relative inline-flex h-[18px] w-8 shrink-0 touch-none items-center rounded-full transition-colors duration-200',
    'pointer-coarse:h-[31px] pointer-coarse:w-[51px]',
    '[--inner:28px] [--thumb-w:14px] [--thumb-h:14px]',
    'pointer-coarse:[--inner:47px] pointer-coarse:[--thumb-w:27px] pointer-coarse:[--thumb-h:27px]',
    'data-[pressed]:[--thumb-w:18px] data-[pressed]:[--thumb-h:16px]',
    'pointer-coarse:data-[pressed]:[--thumb-w:35px] pointer-coarse:data-[pressed]:[--thumb-h:31px]',
    'data-[state=checked]:bg-primary data-[state=unchecked]:bg-muted-foreground/25',
    'disabled:opacity-50 aria-invalid:ring-[3px] aria-invalid:ring-destructive/20',
].join(' ');

const thumb = [
    'pointer-events-none absolute top-1/2 left-0.5 block h-(--thumb-h) w-(--thumb-w) -translate-y-1/2 rounded-full bg-white shadow-[0_1px_3px_rgb(0_0_0/0.25)]',
    'transition-[translate,width,height,background-color,box-shadow] duration-500 ease-spring',
    'group-data-[state=checked]/switch:translate-x-[calc(var(--inner)_-_var(--thumb-w))]',
    'group-data-[pressed]/switch:glass-thumb group-data-[pressed]/switch:duration-200',
    'group-data-[dragging]/switch:translate-x-[clamp(0px,calc(var(--switch-drag)_-_var(--thumb-w)/2),calc(var(--inner)_-_var(--thumb-w)))]',
    'motion-reduce:transition-colors',
].join(' ');

const Switch = React.forwardRef<
    React.ElementRef<typeof SwitchPrimitives.Root>,
    React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> & SlotNameProps
>(({ className, slotName = 'switch', ...props }, ref) => {
    const rootRef = React.useRef<HTMLButtonElement>(null);
    const composedRef = React.useMemo(() => assignRefs(rootRef, ref), [ref]);

    useSwitchDrag(rootRef);

    return (
        <SwitchPrimitives.Root
            className={cn(track, focusRing, className)}
            {...props}
            ref={composedRef}
            data-slot={slotName}
        >
            <SwitchPrimitives.Thumb
                data-slot="switch-thumb"
                className={thumb}
            />
        </SwitchPrimitives.Root>
    );
});
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
