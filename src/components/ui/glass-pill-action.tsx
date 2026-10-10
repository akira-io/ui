'use client';

import { Slot } from '@radix-ui/react-slot';
import * as React from 'react';

import { useGlassToolbar } from '@/components/ui/glass-toolbar-context';
import { focusRing } from '@/lib/language';
import { cn } from '@/lib/utils';
import type { SlotNameProps } from '@/types';

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
        <span
            aria-hidden="true"
            className="[&_svg]:size-5 flex items-center justify-center"
        >
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
            'size-11 flex shrink-0 items-center justify-center rounded-full text-foreground transition-colors select-none [-webkit-user-drag:none] data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
            focusRing,
            className,
        ),
        'data-slot': slotName,
    };

    if (asChild && React.isValidElement(children)) {
        return (
            <Slot {...shared}>
                {React.cloneElement(children, undefined, content)}
            </Slot>
        );
    }

    return (
        <button type="button" disabled={disabled} {...shared}>
            {content}
        </button>
    );
}
