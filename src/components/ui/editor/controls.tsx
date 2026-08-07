import {
    Bold,
    Code,
    Heading1,
    Heading2,
    Heading3,
    Heading4,
    Heading5,
    Heading6,
    Italic,
    List,
    ListOrdered,
    Quote,
    Redo2,
    Strikethrough,
    Undo2,
    type LucideIcon,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useEditorContext } from '@/components/ui/editor/context';
import { EditorControl } from '@/components/ui/editor/toolbar';

export type EditorMarkName = 'bold' | 'italic' | 'strike' | 'code';

const MARK_ICONS: Record<EditorMarkName, LucideIcon> = {
    bold: Bold,
    italic: Italic,
    strike: Strikethrough,
    code: Code,
};

export interface EditorMarkProps {
    mark: EditorMarkName;
    label?: string;
    className?: string;
}

export function EditorMark({ mark, label, className }: EditorMarkProps) {
    const { editor, labels } = useEditorContext();

    const names: Record<EditorMarkName, string> = {
        bold: labels.boldLabel,
        italic: labels.italicLabel,
        strike: labels.strikeLabel,
        code: labels.codeLabel,
    };

    return (
        <EditorControl
            label={label ?? names[mark]}
            icon={MARK_ICONS[mark]}
            pressed={editor.isActive(mark)}
            disabled={!editor.can().toggleMark(mark)}
            onActivate={() => editor.chain().focus().toggleMark(mark).run()}
            className={className}
        />
    );
}

const HEADING_ICONS: Record<number, LucideIcon> = {
    1: Heading1,
    2: Heading2,
    3: Heading3,
    4: Heading4,
    5: Heading5,
    6: Heading6,
};

export interface EditorHeadingProps {
    level: 1 | 2 | 3 | 4 | 5 | 6;
    label?: string;
    className?: string;
}

export function EditorHeading({ level, label, className }: EditorHeadingProps) {
    const { editor, labels } = useEditorContext();

    return (
        <EditorControl
            label={label ?? labels.headingLabel(level)}
            icon={HEADING_ICONS[level]}
            pressed={editor.isActive('heading', { level })}
            disabled={
                !editor.can().toggleNode('heading', 'paragraph', { level })
            }
            onActivate={() =>
                editor.chain().focus().toggleHeading({ level }).run()
            }
            className={className}
        />
    );
}

export type EditorListVariant = 'bullet' | 'ordered';

export interface EditorListProps {
    variant: EditorListVariant;
    label?: string;
    className?: string;
}

export function EditorList({ variant, label, className }: EditorListProps) {
    const { editor, labels } = useEditorContext();
    const name = variant === 'bullet' ? 'bulletList' : 'orderedList';

    return (
        <EditorControl
            label={
                label ??
                (variant === 'bullet'
                    ? labels.bulletListLabel
                    : labels.orderedListLabel)
            }
            icon={variant === 'bullet' ? List : ListOrdered}
            pressed={editor.isActive(name)}
            disabled={!editor.can().toggleList(name, 'listItem')}
            onActivate={() =>
                variant === 'bullet'
                    ? editor.chain().focus().toggleBulletList().run()
                    : editor.chain().focus().toggleOrderedList().run()
            }
            className={className}
        />
    );
}

export interface EditorBlockquoteProps {
    label?: string;
    className?: string;
}

export function EditorBlockquote({ label, className }: EditorBlockquoteProps) {
    const { editor, labels } = useEditorContext();

    return (
        <EditorControl
            label={label ?? labels.blockquoteLabel}
            icon={Quote}
            pressed={editor.isActive('blockquote')}
            disabled={!editor.can().toggleWrap('blockquote')}
            onActivate={() => editor.chain().focus().toggleBlockquote().run()}
            className={className}
        />
    );
}

export type EditorHistoryAction = 'undo' | 'redo';

export interface EditorHistoryProps {
    action: EditorHistoryAction;
    label?: string;
    className?: string;
}

export function EditorHistory({
    action,
    label,
    className,
}: EditorHistoryProps) {
    const { editor, labels, editable } = useEditorContext();
    const undoing = action === 'undo';
    const available = undoing ? editor.can().undo() : editor.can().redo();
    const Icon = undoing ? Undo2 : Redo2;

    return (
        <Button
            data-slot="editor-history"
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label={
                label ?? (undoing ? labels.undoLabel : labels.redoLabel)
            }
            title={label ?? (undoing ? labels.undoLabel : labels.redoLabel)}
            disabled={!available || !editable}
            onClick={() =>
                undoing
                    ? editor.chain().focus().undo().run()
                    : editor.chain().focus().redo().run()
            }
            className={className}
        >
            <Icon aria-hidden="true" />
        </Button>
    );
}
