'use client';

import { CheckIcon } from 'lucide-react';
import * as React from 'react';

import { ActionMorphMenu } from '@/components/ui/action-morph-menu';
import { floatingSurface, focusRing } from '@/lib/language';
import { useMorphSize } from '@/lib/motion/use-morph-size';
import { useStrokeDraw } from '@/lib/motion/use-stroke-draw';
import { cn } from '@/lib/utils';
import { useUiLabels } from '@/locales/context';
import type { SlotNameProps } from '@/types';

export interface ActionMorphLabels {
    backLabel: string;
    closeLabel: string;
    doneLabel: string;
}

export const actionMorphDefaultLabels: ActionMorphLabels = {
    backLabel: 'Back',
    closeLabel: 'Close',
    doneLabel: 'Done',
};

export interface ActionMorphFormControls {
    complete: () => void;
    back: () => void;
}

export interface ActionMorphActionProps {
    id: string;
    label: string;
    icon?: React.ReactNode;
    onSelect?: () => void | Promise<void>;
    children?: (controls: ActionMorphFormControls) => React.ReactNode;
}

export function ActionMorphAction(_props: ActionMorphActionProps): null {
    return null;
}

type ActionMorphStep = 'idle' | 'menu' | 'form' | 'done';

const ANCHORS = {
    top: 'bottom-0',
    bottom: 'top-0',
    start: 'left-0',
    end: 'right-0',
} as const;

const DONE_MS = 1200;

function readActions(children: React.ReactNode): ActionMorphActionProps[] {
    return React.Children.toArray(children)
        .filter(React.isValidElement<ActionMorphActionProps>)
        .filter((child) => child.type === ActionMorphAction)
        .map((child) => child.props);
}

function DrawnCheck() {
    const ref = React.useRef<HTMLSpanElement>(null);

    useStrokeDraw(ref);

    return (
        <span ref={ref} className="flex">
            <CheckIcon className="size-4" />
        </span>
    );
}

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
    const [step, setStep] = React.useState<ActionMorphStep>('idle');
    const [pending, setPending] = React.useState<string | null>(null);
    const root = React.useRef<HTMLDivElement>(null);
    const surface = React.useRef<HTMLDivElement>(null);
    const content = React.useRef<HTMLDivElement>(null);
    const trigger = React.useRef<HTMLButtonElement>(null);
    const open = step === 'menu';

    useMorphSize(surface, content, {
        step,
        radius: step === 'idle' || step === 'done' ? 'pill' : 24,
    });

    const collapse = React.useCallback(() => {
        if (pending !== null) {
            return;
        }

        setStep('idle');
        trigger.current?.focus();
    }, [pending]);

    const choose = async (id: string) => {
        const action = actions.find((item) => item.id === id);

        if (!action?.onSelect) {
            return;
        }

        setPending(id);

        const succeeded = await Promise.resolve()
            .then(action.onSelect)
            .then(
                () => true,
                () => false,
            );

        setPending(null);

        if (succeeded) {
            setStep('done');
        }
    };

    React.useEffect(() => {
        if (step !== 'done') {
            return undefined;
        }

        const timer = window.setTimeout(() => setStep('idle'), DONE_MS);

        return () => window.clearTimeout(timer);
    }, [step]);

    React.useEffect(() => {
        if (!open) {
            return undefined;
        }

        const onPointerDown = (event: PointerEvent) => {
            if (!root.current?.contains(event.target as Node)) {
                collapse();
            }
        };

        document.addEventListener('pointerdown', onPointerDown);

        return () => document.removeEventListener('pointerdown', onPointerDown);
    }, [collapse, open]);

    const face = (
        <>
            <span
                aria-hidden
                className="size-4 flex items-center justify-center"
            >
                {step === 'done' ? <DrawnCheck /> : icon}
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
            onKeyDown={(event) => {
                if (event.key === 'Escape' && open) {
                    event.preventDefault();
                    collapse();
                }
            }}
            data-slot={slotName}
        >
            <button
                ref={trigger}
                type="button"
                aria-expanded={open}
                aria-haspopup="menu"
                onClick={() => setStep('menu')}
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
            >
                <div ref={content} className="max-w-80 w-max">
                    {open ? (
                        <ActionMorphMenu
                            actions={actions}
                            pending={pending}
                            onChoose={(id) => void choose(id)}
                        />
                    ) : (
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
