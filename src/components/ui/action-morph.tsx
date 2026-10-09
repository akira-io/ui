'use client';

import * as React from 'react';

import {
    DrawnCheck,
    PendingMark,
    readActions,
    useStepFade,
} from '@/components/ui/action-morph-action';
import { ActionMorphForm } from '@/components/ui/action-morph-form';
import { ActionMorphMenu } from '@/components/ui/action-morph-menu';
import { useActionMorph } from '@/components/ui/use-action-morph';
import { floatingSurface, focusRing, surfaceRadius } from '@/lib/language';
import { useMorphSize } from '@/lib/motion/use-morph-size';
import { cn } from '@/lib/utils';
import { useUiLabels } from '@/locales/context';
import type { SlotNameProps } from '@/types';

export interface ActionMorphLabels {
    backLabel: string;
    closeLabel: string;
    doneLabel: string;
}

export {
    ActionMorphAction,
    type ActionMorphActionProps,
    type ActionMorphFormControls,
} from '@/components/ui/action-morph-action';

export const actionMorphDefaultLabels: ActionMorphLabels = {
    backLabel: 'Back',
    closeLabel: 'Close',
    doneLabel: 'Done',
};

const ANCHORS = {
    top: 'bottom-0',
    bottom: 'top-0',
    start: 'left-0',
    end: 'right-0',
} as const;

export function ActionMorph({
    label,
    icon,
    side = 'bottom',
    align = 'end',
    labels: labelOverrides,
    className,
    children,
    slotName = 'action-morph',
}: {
    label: string;
    icon: React.ReactNode;
    side?: 'top' | 'bottom';
    align?: 'start' | 'end';
    labels?: Partial<ActionMorphLabels>;
    className?: string;
    children: React.ReactNode;
} & SlotNameProps) {
    const labels = useUiLabels(
        'actionMorph',
        actionMorphDefaultLabels,
        labelOverrides,
    );
    const actions = readActions(children);
    const root = React.useRef<HTMLDivElement>(null);
    const surface = React.useRef<HTMLDivElement>(null);
    const content = React.useRef<HTMLDivElement>(null);
    const trigger = React.useRef<HTMLButtonElement>(null);
    const morph = useActionMorph(actions, trigger);
    const { step, open, pending, chosenAction, single } = morph;
    const stepKey = `${step}:${chosenAction?.id ?? ''}`;
    const direct = single && !actions[0]?.children;

    useMorphSize(surface, content, {
        step: stepKey,
        radius: open ? 'content' : 'pill',
    });
    useStepFade(content, stepKey);

    const face = (
        <>
            <span
                aria-hidden
                className="size-4 flex items-center justify-center"
            >
                {step === 'done' ? <DrawnCheck /> : null}
                {step !== 'done' && pending !== null ? <PendingMark /> : null}
                {step !== 'done' && pending === null ? icon : null}
            </span>
            {label}
        </>
    );
    const faceClasses =
        'gap-2 h-10 px-4 text-sm font-medium inline-flex items-center whitespace-nowrap';

    return (
        <div
            ref={root}
            className={cn('relative inline-flex', className)}
            {...morph.rootHandlers}
            data-slot={slotName}
        >
            <button
                ref={trigger}
                type="button"
                aria-expanded={direct ? undefined : open}
                aria-haspopup={direct ? undefined : single ? 'dialog' : 'menu'}
                aria-busy={pending !== null || undefined}
                onClick={() => {
                    if (single && actions[0]) {
                        void morph.choose(actions[0].id);

                        return;
                    }

                    morph.openMenu();
                }}
                className={cn(
                    faceClasses,
                    'rounded-full bg-primary text-primary-foreground',
                    focusRing,
                )}
            >
                {face}
            </button>
            <div
                ref={surface}
                aria-hidden={!open}
                className={cn(
                    `${floatingSurface} absolute z-40 overflow-hidden transition-opacity`,
                    ANCHORS[side],
                    ANCHORS[align],
                    open
                        ? 'opacity-100 duration-100'
                        : 'pointer-events-none opacity-0 delay-200 duration-150',
                )}
                data-slot="action-morph-surface"
            >
                <div
                    ref={content}
                    className={cn('max-w-80 w-max', open && surfaceRadius)}
                >
                    {step === 'form' && chosenAction ? (
                        <ActionMorphForm
                            action={chosenAction}
                            backLabel={
                                single ? labels.closeLabel : labels.backLabel
                            }
                            onComplete={morph.finish}
                            onBack={morph.back}
                        />
                    ) : null}
                    {step === 'menu' ? (
                        <ActionMorphMenu
                            actions={actions}
                            pending={pending}
                            onChoose={(id) => void morph.choose(id)}
                        />
                    ) : null}
                    {open ? null : (
                        <span aria-hidden className={faceClasses}>
                            {face}
                        </span>
                    )}
                </div>
            </div>
            <span role="status" aria-live="polite" className="sr-only">
                {step === 'done' ? labels.doneLabel : ''}
            </span>
        </div>
    );
}
