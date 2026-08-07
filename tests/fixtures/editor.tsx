import type { Editor as TiptapEditor } from '@tiptap/core';
import { useEffect, useState, type ReactNode } from 'react';

import { EditorContent } from '@/components/ui/editor/content';
import { useEditorContext } from '@/components/ui/editor/context';
import { Editor } from '@/components/ui/editor/editor';
import { EditorToolbar } from '@/components/ui/editor/toolbar';

export function ExposeEditor({
    onReady,
}: {
    onReady: (editor: TiptapEditor) => void;
}) {
    const { editor } = useEditorContext();

    useEffect(() => {
        onReady(editor);
    }, [editor, onReady]);

    return null;
}

export interface ControlledEditorProps {
    initial?: string;
    disabled?: boolean;
    readOnly?: boolean;
    placeholder?: string;
    onValue?: (value: string) => void;
    onReady?: (editor: TiptapEditor) => void;
    children?: ReactNode;
}

export function ControlledEditor({
    initial = '<p>Draft</p>',
    disabled,
    readOnly,
    placeholder,
    onValue,
    onReady,
    children,
}: ControlledEditorProps) {
    const [value, setValue] = useState(initial);

    return (
        <Editor
            value={value}
            label="Body"
            placeholder={placeholder}
            disabled={disabled}
            readOnly={readOnly}
            onChange={(next) => {
                setValue(next);
                onValue?.(next);
            }}
        >
            {onReady && <ExposeEditor onReady={onReady} />}
            {children && <EditorToolbar>{children}</EditorToolbar>}
            <EditorContent />
        </Editor>
    );
}

export async function caretAtEnd(editor: TiptapEditor): Promise<void> {
    editor.commands.focus('end');

    await new Promise((resolve) => requestAnimationFrame(resolve));
}

export async function typeInto(
    user: { keyboard: (text: string) => Promise<void> },
    text: string,
): Promise<void> {
    for (const character of text) {
        await user.keyboard(character);
        await new Promise((resolve) => requestAnimationFrame(resolve));
    }
}

export function surface(): HTMLElement {
    const element = document.querySelector<HTMLElement>(
        '[data-slot="editor-surface"]',
    );

    if (element === null) {
        throw new Error('the editing surface never mounted');
    }

    return element;
}
