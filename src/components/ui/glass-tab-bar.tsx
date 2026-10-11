'use client';

import * as React from 'react';

import {
    GlassTabBarContext,
    TAB_COUNT_WARNING,
} from '@/components/ui/glass-tab-bar-context';
import { useControllableState } from '@/hooks/use-controllable-state';
import { warnInDevelopment } from '@/lib/dev-warning';
import { controlLayer, glassEdge } from '@/lib/language';
import { useLensDrag } from '@/lib/motion/use-lens-drag';
import { useScrollCompact } from '@/lib/motion/use-scroll-compact';
import { useSlidingIndicator } from '@/lib/motion/use-sliding-indicator';
import { cn } from '@/lib/utils';
import type { SlotNameProps } from '@/types';

const ITEMS = '[data-slot="glass-tab-bar-item"]';

const KEY_STEPS: Record<string, (index: number, count: number) => number> = {
    ArrowRight: (index, count) => (index + 1) % count,
    ArrowLeft: (index, count) => (index - 1 + count) % count,
    Home: () => 0,
    End: (_index, count) => count - 1,
};

interface ItemProps {
    value?: string;
    children?: React.ReactNode;
}

function itemsOf(children: React.ReactNode): ItemProps[] {
    return React.Children.toArray(children).flatMap((child) => {
        if (!React.isValidElement<ItemProps>(child)) {
            return [];
        }

        return child.type === React.Fragment
            ? itemsOf(child.props.children)
            : [child.props];
    });
}

function focusableValue(items: ItemProps[], current: string): string {
    const values = items.flatMap((item) =>
        item.value === undefined ? [] : [item.value],
    );

    return values.includes(current) ? current : (values[0] ?? '');
}

function moveFocus(event: React.KeyboardEvent<HTMLElement>) {
    const step = KEY_STEPS[event.key];

    if (!step) {
        return;
    }

    const folded = event.currentTarget.closest('[data-expanded]') !== null;
    const items = [
        ...event.currentTarget.querySelectorAll<HTMLElement>(
            folded ? `${ITEMS}[data-state="active"]` : ITEMS,
        ),
    ];
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
    action,
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
    action?: React.ReactNode;
    compactOnScroll?: boolean;
} & SlotNameProps) {
    const [current, setCurrent] = useControllableState({
        value,
        defaultValue,
        onChange: onValueChange,
    });
    const bar = React.useRef<HTMLDivElement>(null);
    const lens = React.useRef<HTMLSpanElement>(null);
    const [expanded, setExpanded] = React.useState(false);
    const items = itemsOf(children);
    const focusValue = focusableValue(items, current);

    if (items.length > 5) {
        warnInDevelopment(TAB_COUNT_WARNING);
    }
    const context = React.useMemo(
        () => ({
            value: current,
            choose: setCurrent,
            focusValue,
            expanded,
            setExpanded,
        }),
        [current, setCurrent, focusValue, expanded],
    );

    useSlidingIndicator(
        bar,
        lens,
        '[data-slot="glass-tab-bar-item"][data-state="active"]',
    );
    useLensDrag(bar, lens, ITEMS);

    const compact = useScrollCompact(compactOnScroll);

    return (
        <nav
            aria-label={label}
            data-compact={compact || undefined}
            data-expanded={expanded || undefined}
            className={cn(
                'group/glass-tab-bar inset-x-0 pointer-events-none fixed bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 flex items-center justify-center gap-item',
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
                    controlLayer,
                    'pointer-events-auto relative isolate flex touch-pan-y items-center gap-tight rounded-full p-tight',
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
            <GlassTabBarContext.Provider value={context}>
                {action}
            </GlassTabBarContext.Provider>
        </nav>
    );
}

export {
    GlassTabBarAction,
    glassTabBarDefaultLabels,
    type GlassTabBarLabels,
} from '@/components/ui/glass-tab-bar-action';
export { GlassTabBarItem } from '@/components/ui/glass-tab-bar-item';
