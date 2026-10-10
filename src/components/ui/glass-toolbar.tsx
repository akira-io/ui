'use client';

import * as React from 'react';

import { GlassToolbarContext } from '@/components/ui/glass-toolbar-context';
import { glassEdge } from '@/lib/language';
import { usePressHighlight } from '@/lib/motion/use-press-highlight';
import { cn } from '@/lib/utils';
import type { SlotNameProps } from '@/types';

const ACTIONS = '[data-slot="glass-pill-action"]:not([data-disabled])';

const KEY_STEPS: Record<string, (index: number, count: number) => number> = {
    ArrowRight: (index, count) => (index + 1) % count,
    ArrowLeft: (index, count) => (index - 1 + count) % count,
    Home: () => 0,
    End: (_index, count) => count - 1,
};

export function GlassToolbar({
    label,
    floating = false,
    className,
    children,
    onKeyDown,
    slotName = 'glass-toolbar',
    ...props
}: React.ComponentProps<'div'> & {
    label: string;
    floating?: boolean;
} & SlotNameProps) {
    const root = React.useRef<HTMLDivElement>(null);
    const [focusKey, setFocusKey] = React.useState<string | null>(null);
    const release = React.useCallback((key: string) => {
        setFocusKey((current) => (current === key ? null : current));
    }, []);
    const context = React.useMemo(
        () => ({ focusKey, setFocusKey, release }),
        [focusKey, release],
    );

    React.useLayoutEffect(() => {
        const first = root.current?.querySelector<HTMLElement>(ACTIONS);
        const current = focusKey
            ? root.current?.querySelector(`${ACTIONS}[data-key="${focusKey}"]`)
            : null;

        if (!current && first?.dataset.key) {
            setFocusKey(first.dataset.key);
        }
    });

    const moveFocus = (event: React.KeyboardEvent<HTMLDivElement>) => {
        onKeyDown?.(event);

        const step = KEY_STEPS[event.key];

        if (!step || event.defaultPrevented) {
            return;
        }

        const actions = [
            ...event.currentTarget.querySelectorAll<HTMLElement>(ACTIONS),
        ];
        const index = actions.indexOf(document.activeElement as HTMLElement);
        const from = index < 0 && event.key === 'ArrowLeft' ? 0 : index;
        const next = actions[step(from, actions.length)];

        if (!next) {
            return;
        }

        event.preventDefault();
        setFocusKey(next.dataset.key ?? '');
        next.focus();
    };

    return (
        <div
            ref={root}
            role="toolbar"
            aria-label={label}
            onKeyDown={moveFocus}
            className={cn(
                'gap-2 flex items-center',
                floating &&
                    'inset-x-0 pointer-events-none fixed bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 justify-center',
                className,
            )}
            {...props}
            data-slot={slotName}
        >
            <GlassToolbarContext.Provider value={context}>
                {children}
            </GlassToolbarContext.Provider>
        </div>
    );
}

export function GlassPillGroup({
    className,
    children,
    slotName = 'glass-pill-group',
    ...props
}: React.ComponentProps<'div'> & SlotNameProps) {
    const group = React.useRef<HTMLDivElement>(null);
    const highlight = React.useRef<HTMLSpanElement>(null);

    usePressHighlight(group, highlight, ACTIONS);

    return (
        <div
            ref={group}
            className={cn(
                glassEdge,
                'gap-0.5 p-1 pointer-events-auto relative isolate flex touch-pan-y items-center rounded-full bg-popover/70 shadow-(--glass-elevation)',
                className,
            )}
            {...props}
            data-slot={slotName}
        >
            <span
                ref={highlight}
                aria-hidden="true"
                data-slot="glass-pill-highlight"
                className={cn(
                    glassEdge,
                    'top-0 left-0 shadow-sm absolute -z-10 rounded-full bg-background/70 opacity-0',
                )}
            />
            {children}
        </div>
    );
}

export { GlassPillAction } from '@/components/ui/glass-pill-action';
