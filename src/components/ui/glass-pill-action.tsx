'use client';

import { Slot as SlotPrimitive } from 'radix-ui';
import * as React from 'react';

import { useGlassToolbar } from '@/components/ui/glass-toolbar-context';
import { focusRing } from '@/lib/language';
import { cn } from '@/lib/utils';
import type { SlotNameProps } from '@/types';

const ACTION_SIZES = {
    default: 'size-9 [&_svg]:size-icon',
    md: 'size-8 [&_svg]:size-[1.125em]',
    sm: 'size-7 [&_svg]:size-icon-sm',
};

export function GlassPillAction({
    icon,
    label,
    asChild = false,
    disabled = false,
    className,
    children,
    onFocus,
    slotName = 'glass-pill-action',
    ...props
}: React.ComponentProps<'button'> & {
    icon: React.ReactNode;
    label: string;
    asChild?: boolean;
} & SlotNameProps) {
    const toolbar = useGlassToolbar();
    const key = React.useId();
    const { release } = toolbar;

    React.useEffect(() => {
        if (disabled) {
            release(key);
        }
    }, [disabled, key, release]);

    React.useEffect(() => () => release(key), [key, release]);
    const content = (
        <span aria-hidden="true" className="flex items-center justify-center">
            {icon}
        </span>
    );
    const shared = {
        ...props,
        onFocus: (event: React.FocusEvent<HTMLButtonElement>) => {
            onFocus?.(event);
            toolbar.setFocusKey(key);
        },
        'aria-label': label,
        draggable: false,
        'aria-disabled': disabled || undefined,
        'data-key': key,
        'data-disabled': disabled || undefined,
        tabIndex: toolbar.focusKey === key && !disabled ? 0 : -1,
        className: cn(
            ACTION_SIZES[toolbar.size],
            'pointer-coarse:size-11 flex shrink-0 items-center justify-center rounded-full text-foreground transition-[scale,color] duration-500 ease-spring select-none [-webkit-user-drag:none] aria-pressed:text-primary data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[pressed]:scale-[1.18] data-[pressed]:duration-200 motion-reduce:data-[pressed]:scale-100 pointer-coarse:[&_svg]:size-icon-lg',
            focusRing,
            className,
        ),
        'data-slot': slotName,
    };

    if (asChild && React.isValidElement(children)) {
        return (
            <SlotPrimitive.Slot {...shared}>
                {React.cloneElement(children, undefined, content)}
            </SlotPrimitive.Slot>
        );
    }

    return (
        <button type="button" disabled={disabled} {...shared}>
            {content}
        </button>
    );
}
