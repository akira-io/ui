'use client';

import { CheckIcon } from 'lucide-react';
import { animate } from 'motion/react';
import * as React from 'react';

import { useStrokeDraw } from '@/lib/motion/use-stroke-draw';
import type { SlotNameProps } from '@/types';

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

function flattenFragments(children: React.ReactNode): React.ReactNode[] {
    return React.Children.toArray(children).flatMap((child) =>
        React.isValidElement<{ children?: React.ReactNode }>(child) &&
        child.type === React.Fragment
            ? flattenFragments(child.props.children)
            : [child],
    );
}

export function readActions(
    children: React.ReactNode,
): ActionMorphActionProps[] {
    return flattenFragments(children)
        .filter(React.isValidElement<ActionMorphActionProps>)
        .filter((child) => child.type === ActionMorphAction)
        .map((child) => child.props);
}

export function PendingMark() {
    return (
        <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
    );
}

export function useStepFade(
    ref: React.RefObject<HTMLElement | null>,
    step: string,
): void {
    const first = React.useRef(true);

    React.useLayoutEffect(() => {
        if (first.current || !ref.current) {
            first.current = false;

            return undefined;
        }

        const controls = animate(
            ref.current,
            { opacity: [0, 1] },
            { duration: 0.15, ease: 'easeOut' },
        );

        return () => controls.stop();
    }, [ref, step]);
}

export function DrawnCheck({ slotName = 'action-morph-check' }: SlotNameProps) {
    const ref = React.useRef<HTMLSpanElement>(null);

    useStrokeDraw(ref);

    return (
        <span ref={ref} className="flex" data-slot={slotName}>
            <CheckIcon className="size-4" />
        </span>
    );
}
