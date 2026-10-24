import { Slider as SliderPrimitive } from 'radix-ui';
import * as React from 'react';

import { focusRing } from '@/lib/language';
import { cn } from '@/lib/utils';
import type { SlotNameProps } from '@/types';

function Slider({
    className,
    defaultValue,
    value,
    min = 0,
    max = 100,
    slotName = 'slider',
    onPointerDown,
    ...props
}: React.ComponentProps<typeof SliderPrimitive.Root> & SlotNameProps) {
    const _values = React.useMemo(
        () =>
            Array.isArray(value)
                ? value
                : Array.isArray(defaultValue)
                  ? defaultValue
                  : [min, max],
        [value, defaultValue, min, max],
    );

    const [dragging, setDragging] = React.useState(false);
    const unlistenRelease = React.useRef<(() => void) | null>(null);

    React.useEffect(() => () => unlistenRelease.current?.(), []);

    const startDrag = (event: React.PointerEvent<HTMLDivElement>) => {
        onPointerDown?.(event);
        setDragging(true);
        unlistenRelease.current?.();

        const unlisten = () => {
            window.removeEventListener('pointerup', stop);
            window.removeEventListener('pointercancel', stop);
            unlistenRelease.current = null;
        };
        const stop = () => {
            setDragging(false);
            unlisten();
        };

        unlistenRelease.current = unlisten;
        window.addEventListener('pointerup', stop);
        window.addEventListener('pointercancel', stop);
    };

    return (
        <SliderPrimitive.Root
            onPointerDown={startDrag}
            data-dragging={dragging || undefined}
            defaultValue={defaultValue}
            value={value}
            min={min}
            max={max}
            className={cn(
                'group/slider data-[orientation=vertical]:min-h-44 relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col',
                className,
            )}
            {...props}
            data-slot={slotName}
        >
            <SliderPrimitive.Track
                data-slot="slider-track"
                className={cn(
                    'data-[orientation=horizontal]:h-1.5 data-[orientation=vertical]:w-1.5 relative grow overflow-hidden rounded-full bg-muted-foreground/20 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full',
                )}
            >
                <SliderPrimitive.Range
                    data-slot="slider-range"
                    className={cn(
                        'absolute bg-primary data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full',
                    )}
                />
            </SliderPrimitive.Track>
            {Array.from({ length: _values.length }, (_, index) => (
                <SliderPrimitive.Thumb
                    data-slot="slider-thumb"
                    key={index}
                    className={cn(
                        'h-5 w-7 bg-white pointer-coarse:h-7 pointer-coarse:group-data-[dragging]/slider:h-9 block shrink-0 rounded-full shadow-[0_1px_3px_rgb(0_0_0/0.25)] transition-[width,height,background-color,box-shadow] duration-500 ease-spring group-data-[dragging]/slider:h-[26px] group-data-[dragging]/slider:w-[39px] group-data-[dragging]/slider:glass-thumb group-data-[dragging]/slider:duration-200 disabled:pointer-events-none disabled:opacity-50 motion-reduce:transition-colors pointer-coarse:w-[38px] pointer-coarse:group-data-[dragging]/slider:w-[53px]',
                        focusRing,
                    )}
                />
            ))}
        </SliderPrimitive.Root>
    );
}

export { Slider };
