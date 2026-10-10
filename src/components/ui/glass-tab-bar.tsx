'use client';

import * as React from 'react';

import { GlassTabBarContext } from '@/components/ui/glass-tab-bar-context';
import { useControllableState } from '@/hooks/use-controllable-state';
import { glassEdge } from '@/lib/language';
import { useSlidingIndicator } from '@/lib/motion/use-sliding-indicator';
import { cn } from '@/lib/utils';
import type { SlotNameProps } from '@/types';

const ITEMS = '[data-slot="glass-tab-bar-item"]:not([data-disabled])';

const KEY_STEPS: Record<string, (index: number, count: number) => number> = {
    ArrowRight: (index, count) => (index + 1) % count,
    ArrowLeft: (index, count) => (index - 1 + count) % count,
    Home: () => 0,
    End: (_index, count) => count - 1,
};

function moveFocus(event: React.KeyboardEvent<HTMLElement>) {
    const step = KEY_STEPS[event.key];

    if (!step) {
        return;
    }

    const items = [...event.currentTarget.querySelectorAll<HTMLElement>(ITEMS)];
    const index = items.indexOf(document.activeElement as HTMLElement);

    if (items.length === 0) {
        return;
    }

    event.preventDefault();
    items[step(Math.max(index, 0), items.length)]?.focus();
}

export function GlassTabBar({
    value,
    defaultValue = '',
    onValueChange,
    label,
    compactOnScroll = false,
    className,
    children,
    slotName = 'glass-tab-bar',
    ...props
}: Omit<React.ComponentProps<'nav'>, 'onChange'> & {
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    label: string;
    compactOnScroll?: boolean;
} & SlotNameProps) {
    const [current, setCurrent] = useControllableState({
        value,
        defaultValue,
        onChange: onValueChange,
    });
    const bar = React.useRef<HTMLDivElement>(null);
    const lens = React.useRef<HTMLSpanElement>(null);
    const context = React.useMemo(
        () => ({ value: current, choose: setCurrent }),
        [current, setCurrent],
    );

    useSlidingIndicator(
        bar,
        lens,
        '[data-slot="glass-tab-bar-item"][data-state="active"]',
    );

    return (
        <nav
            aria-label={label}
            data-compact-on-scroll={compactOnScroll || undefined}
            className={cn(
                'inset-x-0 pointer-events-none fixed bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 flex justify-center',
                className,
            )}
            {...props}
            data-slot={slotName}
        >
            <div
                ref={bar}
                onKeyDown={moveFocus}
                data-slot="glass-tab-bar-track"
                className={cn(
                    glassEdge,
                    'gap-1 p-1.5 pointer-events-auto relative isolate flex items-center rounded-full bg-popover/70 shadow-(--glass-elevation)',
                )}
            >
                <span
                    ref={lens}
                    aria-hidden="true"
                    data-slot="glass-tab-bar-lens"
                    className={cn(
                        glassEdge,
                        'top-0 left-0 shadow-sm absolute -z-10 rounded-full bg-background/70',
                    )}
                />
                <GlassTabBarContext.Provider value={context}>
                    {children}
                </GlassTabBarContext.Provider>
            </div>
        </nav>
    );
}

export { GlassTabBarItem } from '@/components/ui/glass-tab-bar-item';
