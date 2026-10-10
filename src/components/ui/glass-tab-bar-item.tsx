'use client';

import { Slot } from '@radix-ui/react-slot';
import * as React from 'react';

import { useGlassTabBar } from '@/components/ui/glass-tab-bar-context';
import { focusRing } from '@/lib/language';
import { cn } from '@/lib/utils';
import type { SlotNameProps } from '@/types';

export function GlassTabBarItem({
    value,
    icon,
    label,
    asChild = false,
    disabled = false,
    className,
    children,
    onClick,
    slotName = 'glass-tab-bar-item',
    ...props
}: Omit<React.ComponentProps<'button'>, 'value'> & {
    value: string;
    icon: React.ReactNode;
    label: string;
    asChild?: boolean;
} & SlotNameProps) {
    const bar = useGlassTabBar();
    const active = bar.value === value;
    const content = (
        <>
            <span
                aria-hidden="true"
                className="size-5 [&_svg]:size-5 flex items-center justify-center"
            >
                {icon}
            </span>
            <span
                data-slot="glass-tab-bar-label"
                className="font-medium max-h-4 group-data-[compact]/glass-tab-bar:max-h-0 text-[11px] leading-none whitespace-nowrap transition-[opacity,max-height] duration-300 group-data-[compact]/glass-tab-bar:opacity-0 motion-reduce:transition-none"
            >
                {label}
            </span>
        </>
    );
    const shared = {
        'aria-current': active ? ('page' as const) : undefined,
        'aria-disabled': disabled || undefined,
        'data-state': active ? 'active' : 'inactive',
        'data-value': value,
        'data-disabled': disabled || undefined,
        tabIndex: active ? 0 : -1,
        onClick: (event: React.MouseEvent<HTMLButtonElement>) => {
            onClick?.(event);

            if (disabled) {
                event.preventDefault();

                return;
            }

            if (!event.defaultPrevented) {
                bar.choose(value);
            }
        },
        className: cn(
            'gap-1 h-12 min-w-16 px-3 group-data-[compact]/glass-tab-bar:h-10 group-data-[compact]/glass-tab-bar:gap-0 flex flex-col items-center justify-center rounded-full text-muted-foreground transition-[height,gap,color] duration-300 data-[disabled]:opacity-50 data-[state=active]:text-foreground motion-reduce:transition-none',
            focusRing,
            className,
        ),
        ...props,
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
