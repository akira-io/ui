'use client';

import { CheckIcon } from 'lucide-react';
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

export function readActions(
    children: React.ReactNode,
): ActionMorphActionProps[] {
    return React.Children.toArray(children)
        .filter(React.isValidElement<ActionMorphActionProps>)
        .filter((child) => child.type === ActionMorphAction)
        .map((child) => child.props);
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
