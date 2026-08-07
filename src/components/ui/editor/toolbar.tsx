import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';

import { useEditorContext } from '@/components/ui/editor/context';
import { Toggle } from '@/components/ui/toggle';
import { cn } from '@/lib/utils';

export interface EditorToolbarProps {
    children: ReactNode;
    className?: string;
}

export function EditorToolbar({ children, className }: EditorToolbarProps) {
    const { labels } = useEditorContext();

    return (
        <div
            data-slot="editor-toolbar"
            role="toolbar"
            aria-label={labels.toolbarLabel}
            aria-orientation="horizontal"
            className={cn('gap-1 flex flex-wrap items-center', className)}
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
}: EditorControlProps) {
    const { editable } = useEditorContext();

    return (
        <Toggle
            data-slot="editor-control"
            size="sm"
            aria-label={label}
            title={label}
            pressed={pressed}
            disabled={disabled || !editable}
            onPressedChange={onActivate}
            className={className}
        >
            <Icon aria-hidden="true" />
        </Toggle>
    );
}
