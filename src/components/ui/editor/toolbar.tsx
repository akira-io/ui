import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';

import { useEditorContext } from '@/components/ui/editor/context';
import { Toggle } from '@/components/ui/toggle';
import { cn } from '@/lib/utils';
import type { SlotNameProps } from '@/types';

export interface EditorToolbarProps {
    children: ReactNode;
    className?: string;
}

export function EditorToolbar({
    children,
    className,
    slotName = 'editor-toolbar',
}: EditorToolbarProps & SlotNameProps) {
    const { labels } = useEditorContext();

    return (
        <div
            role="toolbar"
            aria-label={labels.toolbarLabel}
            aria-orientation="horizontal"
            className={cn('gap-1 flex flex-wrap items-center', className)}
            data-slot={slotName}
        >
            {children}
        </div>
    );
}

export interface EditorControlProps {
    label: string;
    icon: LucideIcon;
    pressed?: boolean;
    disabled?: boolean;
    onActivate: () => void;
    className?: string;
}

export function EditorControl({
    label,
    icon: Icon,
    pressed = false,
    disabled = false,
    onActivate,
    className,
    slotName = 'editor-control',
}: EditorControlProps & SlotNameProps) {
    const { editable } = useEditorContext();

    return (
        <Toggle
            size="sm"
            aria-label={label}
            title={label}
            pressed={pressed}
            disabled={disabled || !editable}
            onPressedChange={onActivate}
            className={className}
            slotName={slotName}
        >
            <Icon aria-hidden="true" />
        </Toggle>
    );
}
