'use client';

import * as React from 'react';

import type { ActionMorphActionProps } from '@/components/ui/action-morph-action';

export type ActionMorphStep = 'idle' | 'menu' | 'form' | 'done';

const DONE_MS = 1200;

export function useActionMorph(
    actions: ActionMorphActionProps[],
    trigger: React.RefObject<HTMLButtonElement | null>,
) {
    const [step, setStep] = React.useState<ActionMorphStep>('idle');
    const [pending, setPending] = React.useState<string | null>(null);
    const [chosen, setChosen] = React.useState<string | null>(null);
    const pendingRef = React.useRef<string | null>(null);
    const pressedInside = React.useRef(false);
    const focusedInside = React.useRef(false);
    const chosenAction = actions.find((action) => action.id === chosen);
    const single = actions.length === 1;
    const lostForm = step === 'form' && chosenAction === undefined;
    const open = step === 'menu' || (step === 'form' && !lostForm);

    const collapse = React.useCallback(
        (restoreFocus = true) => {
            if (pendingRef.current !== null) {
                return;
            }

            setStep('idle');
            setChosen(null);

            if (restoreFocus) {
                trigger.current?.focus();
            }
        },
        [trigger],
    );

    const finish = React.useCallback(() => {
        setChosen(null);
        setStep('done');
        trigger.current?.focus();
    }, [trigger]);

    const back = React.useCallback(() => {
        if (single) {
            collapse();

            return;
        }

        setChosen(null);
        setStep('menu');
    }, [collapse, single]);

    const choose = async (id: string) => {
        const action = actions.find((item) => item.id === id);

        if (pendingRef.current !== null || !action) {
            return;
        }

        if (action.children) {
            setChosen(id);
            setStep('form');

            return;
        }

        if (!action.onSelect) {
            return;
        }

        pendingRef.current = id;
        setPending(id);

        const succeeded = await Promise.resolve()
            .then(action.onSelect)
            .then(
                () => true,
                () => false,
            );

        pendingRef.current = null;
        setPending(null);

        if (succeeded) {
            finish();
        }
    };

    React.useEffect(() => {
        if (lostForm) {
            collapse();
        }
    }, [collapse, lostForm]);

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

        pressedInside.current = false;

        const onPointerDown = () => {
            if (!pressedInside.current) {
                collapse();
            }

            pressedInside.current = false;
        };

        document.addEventListener('pointerdown', onPointerDown);

        return () => document.removeEventListener('pointerdown', onPointerDown);
    }, [collapse, open]);

    const rootHandlers = {
        onPointerDownCapture: () => {
            pressedInside.current = true;
        },
        onFocusCapture: () => {
            focusedInside.current = true;
        },
        onBlurCapture: () => {
            focusedInside.current = false;
            window.setTimeout(() => {
                const leftForElsewhere =
                    document.hasFocus() &&
                    document.activeElement !== null &&
                    document.activeElement !== document.body;

                if (!focusedInside.current && leftForElsewhere && open) {
                    collapse(false);
                }
            }, 0);
        },
        onKeyDown: (event: React.KeyboardEvent<HTMLElement>) => {
            const inTree = event.currentTarget.contains(event.target as Node);

            if (event.key !== 'Escape' || !open || !inTree) {
                return;
            }

            event.preventDefault();

            if (step === 'form') {
                back();

                return;
            }

            collapse();
        },
    };

    return {
        step,
        open,
        openMenu: () => setStep('menu'),
        pending,
        chosenAction,
        single,
        choose,
        back,
        finish,
        rootHandlers,
    };
}
