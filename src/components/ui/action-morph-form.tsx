'use client';

import { ArrowLeftIcon } from 'lucide-react';
import * as React from 'react';

import type { ActionMorphActionProps } from '@/components/ui/action-morph-action';
import { focusRing } from '@/lib/language';
import { cn } from '@/lib/utils';
import type { SlotNameProps } from '@/types';

const FOCUSABLE =
    'input, select, textarea, button, [href], [tabindex]:not([tabindex="-1"])';

export function ActionMorphForm({
    action,
    backLabel,
    onComplete,
    onBack,
    slotName = 'action-morph-form',
}: {
    action: ActionMorphActionProps;
    backLabel: string;
    onComplete: () => void;
    onBack: () => void;
} & SlotNameProps) {
    const titleId = React.useId();
    const body = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        body.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus();
    }, []);

    return (
        <div
            role="dialog"
            aria-labelledby={titleId}
            className="w-80"
            data-slot={slotName}
        >
            <div className="gap-2 px-3 pt-3 flex items-center">
                <button
                    type="button"
                    aria-label={backLabel}
                    onClick={onBack}
                    className={cn(
                        'size-8 flex items-center justify-center rounded-full text-muted-foreground hover:bg-accent',
                        focusRing,
                    )}
                >
                    <ArrowLeftIcon className="size-4" />
                </button>
                <h2 id={titleId} className="text-sm font-semibold">
                    {action.label}
                </h2>
            </div>
            <div ref={body}>
                {action.children?.({ complete: onComplete, back: onBack })}
            </div>
        </div>
    );
}
