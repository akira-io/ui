'use client';

import { Slot } from '@radix-ui/react-slot';
import * as React from 'react';

import {
    TAB_LABEL_WARNING,
    useGlassTabBar,
} from '@/components/ui/glass-tab-bar-context';
import { warnInDevelopment } from '@/lib/dev-warning';
import { focusRing } from '@/lib/language';
import { cn } from '@/lib/utils';
import type { SlotNameProps } from '@/types';

export function GlassTabBarItem({
    value,
    icon,
    label,
    asChild = false,
    className,
    children,
    onClick,
    onClickCapture,
    slotName = 'glass-tab-bar-item',
    ...props
}: Omit<React.ComponentProps<'button'>, 'value' | 'disabled'> & {
    value: string;
    icon: React.ReactNode;
    label: string;
    asChild?: boolean;
} & SlotNameProps) {
    const bar = useGlassTabBar();

    if (typeof label !== 'string' || label.trim() === '') {
        warnInDevelopment(TAB_LABEL_WARNING);
    }

    const active = bar.value === value;
    const content = (
        <>
            <span
                aria-hidden="true"
                className="size-5 flex items-center justify-center [&_svg]:size-icon"
            >
                {icon}
            </span>
            <span
                data-slot="glass-tab-bar-label"
                className="font-medium max-h-4 group-data-[compact]/glass-tab-bar:max-h-0 overflow-hidden text-[11px] leading-none whitespace-nowrap transition-[opacity,max-height] duration-300 group-data-[compact]/glass-tab-bar:opacity-0 motion-reduce:transition-none"
            >
                {label}
            </span>
        </>
    );
    const shared = {
        ...props,
        onClick,
        onClickCapture: (event: React.MouseEvent<HTMLButtonElement>) => {
            onClickCapture?.(event);

            if (event.defaultPrevented) {
                return;
            }

            bar.choose(value);
        },
        'aria-current': active ? ('page' as const) : undefined,
        'data-state': active ? 'active' : 'inactive',
        'data-value': value,
        tabIndex: bar.focusValue === value ? 0 : -1,
        className: cn(
            'h-12 min-w-16 group-data-[compact]/glass-tab-bar:h-10 group-data-[compact]/glass-tab-bar:gap-0 flex flex-col items-center justify-center gap-tight rounded-full px-item text-muted-foreground transition-[height,gap,color] duration-300 data-[state=active]:text-foreground group-data-[expanded]/glass-tab-bar:data-[state=inactive]:hidden motion-reduce:transition-none',
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
        <button type="button" {...shared}>
            {content}
        </button>
    );
}
