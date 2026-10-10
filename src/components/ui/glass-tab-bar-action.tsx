'use client';

import { XIcon } from 'lucide-react';
import * as React from 'react';

import { useGlassTabBar } from '@/components/ui/glass-tab-bar-context';
import { focusRing, glassEdge } from '@/lib/language';
import { useMorphSize } from '@/lib/motion/use-morph-size';
import { cn } from '@/lib/utils';
import { useUiLabels } from '@/locales/context';
import type { SlotNameProps } from '@/types';

export interface GlassTabBarLabels {
    closeLabel: string;
}

export const glassTabBarDefaultLabels: GlassTabBarLabels = {
    closeLabel: 'Close',
};

const FOCUSABLE =
    'input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled]), button:not([disabled]), [href]';

export function GlassTabBarAction({
    icon,
    label,
    closeLabel,
    children,
    className,
    slotName = 'glass-tab-bar-action',
}: {
    icon: React.ReactNode;
    label: string;
    closeLabel?: string;
    children: (controls: { close: () => void }) => React.ReactNode;
    className?: string;
} & SlotNameProps) {
    const bar = useGlassTabBar();
    const labels = useUiLabels('glassTabBar', glassTabBarDefaultLabels, {
        closeLabel,
    });
    const surface = React.useRef<HTMLDivElement>(null);
    const content = React.useRef<HTMLDivElement>(null);
    const circle = React.useRef<HTMLButtonElement>(null);
    const body = React.useRef<HTMLDivElement>(null);
    const returnFocus = React.useRef(false);

    useMorphSize(surface, content, {
        step: bar.expanded ? 'open' : 'closed',
        radius: 'pill',
    });

    const close = React.useCallback(() => {
        returnFocus.current = true;
        bar.setExpanded(false);
    }, [bar]);

    React.useEffect(() => {
        if (bar.expanded) {
            body.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus();

            return;
        }

        if (returnFocus.current) {
            returnFocus.current = false;
            circle.current?.focus();
        }
    }, [bar.expanded]);

    return (
        <div
            ref={surface}
            onKeyDown={(event) => {
                if (event.key === 'Escape' && bar.expanded) {
                    event.preventDefault();
                    close();
                }
            }}
            className={cn(
                glassEdge,
                'pointer-events-auto overflow-hidden rounded-full bg-popover/70 shadow-(--glass-elevation)',
                className,
            )}
            data-slot={slotName}
        >
            <div ref={content} className="w-max">
                {bar.expanded ? (
                    <div className="gap-2 px-3 h-15 flex items-center">
                        <div ref={body} className="gap-2 flex items-center">
                            {children({ close })}
                        </div>
                        <button
                            type="button"
                            aria-label={labels.closeLabel}
                            onClick={close}
                            className={cn(
                                'size-9 flex items-center justify-center rounded-full text-muted-foreground hover:bg-accent',
                                focusRing,
                            )}
                        >
                            <XIcon className="size-4" />
                        </button>
                    </div>
                ) : (
                    <button
                        ref={circle}
                        type="button"
                        aria-label={label}
                        aria-expanded={false}
                        onClick={() => bar.setExpanded(true)}
                        className={cn(
                            'size-15 [&_svg]:size-5 flex items-center justify-center rounded-full text-foreground',
                            focusRing,
                        )}
                    >
                        <span aria-hidden="true">{icon}</span>
                    </button>
                )}
            </div>
        </div>
    );
}
