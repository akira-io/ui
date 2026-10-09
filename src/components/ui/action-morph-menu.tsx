'use client';

import * as React from 'react';

import { focusRing } from '@/lib/language';
import { cn } from '@/lib/utils';
import type { SlotNameProps } from '@/types';

import {
    PendingMark,
    type ActionMorphActionProps,
} from '@/components/ui/action-morph-action';

export function ActionMorphMenu({
    actions,
    pending,
    onChoose,
    slotName = 'action-morph-menu',
}: {
    actions: ActionMorphActionProps[];
    pending: string | null;
    onChoose: (id: string) => void;
} & SlotNameProps) {
    const items = React.useRef<(HTMLButtonElement | null)[]>([]);
    const [focusedIndex, setActive] = React.useState(0);
    const active = Math.min(focusedIndex, actions.length - 1);

    React.useEffect(() => {
        items.current[0]?.focus();
    }, []);

    const move = (event: React.KeyboardEvent, index: number) => {
        const last = actions.length - 1;
        const targets: Record<string, number> = {
            ArrowDown: index === last ? 0 : index + 1,
            ArrowUp: index === 0 ? last : index - 1,
            Home: 0,
            End: last,
        };
        const target = targets[event.key];

        if (target === undefined) {
            return;
        }

        event.preventDefault();
        setActive(target);
        items.current[target]?.focus();
    };

    return (
        <div
            role="menu"
            className="p-1.5 gap-0.5 flex flex-col"
            data-slot={slotName}
        >
            {actions.map((action, index) => (
                <button
                    key={action.id}
                    ref={(node) => {
                        items.current[index] = node;
                    }}
                    type="button"
                    role="menuitem"
                    tabIndex={index === active ? 0 : -1}
                    aria-disabled={pending !== null}
                    onKeyDown={(event) => move(event, index)}
                    onClick={() => pending === null && onChoose(action.id)}
                    className={cn(
                        'gap-3 h-10 px-3 text-sm font-medium rounded-2xl flex w-full items-center text-left whitespace-nowrap transition-colors hover:bg-accent aria-disabled:opacity-50',
                        focusRing,
                    )}
                >
                    <span
                        aria-hidden
                        className="size-4 flex shrink-0 items-center justify-center text-muted-foreground"
                    >
                        {pending === action.id ? <PendingMark /> : action.icon}
                    </span>
                    {action.label}
                </button>
            ))}
        </div>
    );
}
