import type { Extensions, JSONContent } from '@tiptap/core';
import { useEditor } from '@tiptap/react';
import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';

import {
    EditorContextProvider,
    type EditorContextValue,
} from '@/components/ui/editor/context';
import { defaultEditorExtensions } from '@/components/ui/editor/extensions';
import { editorLabels, type EditorLabels } from '@/components/ui/editor/labels';
import { editorProse } from '@/components/ui/editor/prose';
import { fieldSurface, focusRing } from '@/lib/language';
import { cn } from '@/lib/utils';
import { useUiLabels } from '@/locales/context';
import type { SlotNameProps } from '@/types';

export type EditorOutput = 'html' | 'json';

export type EditorDocument = string | JSONContent;

interface EditorSharedProps {
    extensions?: Extensions;
    labels?: Partial<EditorLabels>;
    placeholder?: string;
    label?: string;
    disabled?: boolean;
    readOnly?: boolean;
    className?: string;
    children: ReactNode;
}

export type EditorProps = EditorSharedProps &
    (
        | {
              output?: 'html';
              value: string;
              onChange: (value: string) => void;
          }
        | {
              output: 'json';
              value: JSONContent;
              onChange: (value: JSONContent) => void;
          }
    );

const editingSurface = `${fieldSurface} ${focusRing} ${editorProse} min-h-32 w-full px-4 py-3 selection:bg-primary selection:text-primary-foreground`;

function read(
    editor: { getHTML: () => string; getJSON: () => JSONContent },
    output: EditorOutput,
): EditorDocument {
    return output === 'json' ? editor.getJSON() : editor.getHTML();
}

function isSameDocument(left: EditorDocument, right: EditorDocument): boolean {
    if (typeof left === 'string' && typeof right === 'string') {
        return left === right;
    }

    return JSON.stringify(left) === JSON.stringify(right);
}

export function Editor({
    value,
    onChange,
    output = 'html',
    extensions,
    labels: overrides,
    placeholder,
    label,
    disabled = false,
    readOnly = false,
    className,
    children,
    slotName = 'editor',
}: EditorProps & SlotNameProps) {
    const labels = useUiLabels('editor', editorLabels, overrides);
    const [revision, setRevision] = useState(0);
    const editable = !disabled && !readOnly;
    const emit = useRef(onChange as (next: EditorDocument) => void);
    emit.current = onChange as (next: EditorDocument) => void;
    const emitted = useRef<EditorDocument | null>(null);

    const extensionSet = useMemo(
        () => extensions ?? defaultEditorExtensions(),
        [extensions],
    );

    const editor = useEditor(
        {
            extensions: extensionSet,
            content: value,
            editable,
            immediatelyRender: false,
            editorProps: {
                attributes: {
                    'data-slot': 'editor-surface',
                    role: 'textbox',
                    'aria-multiline': 'true',
                    ...(label === undefined ? {} : { 'aria-label': label }),
                    class: editingSurface,
                },
            },
            onUpdate: ({ editor: instance }) => {
                const next = read(instance, output);

                emitted.current = next;
                emit.current(next);
            },
        },
        [extensionSet],
    );

    useEffect(() => {
        if (editor === null) {
            return;
        }

        const rerender = () => setRevision((revision) => revision + 1);

        editor.on('transaction', rerender);

        return () => {
            editor.off('transaction', rerender);
        };
    }, [editor]);

    useEffect(() => {
        editor?.setEditable(editable, false);
    }, [editor, editable]);

    useEffect(() => {
        if (editor === null) {
            return;
        }

        const echoed =
            emitted.current !== null && isSameDocument(emitted.current, value);

        if (echoed || isSameDocument(read(editor, output), value)) {
            return;
        }

        emitted.current = null;
        editor.commands.setContent(value, { emitUpdate: false });
    }, [editor, value, output]);

    const context = useMemo<EditorContextValue | null>(
        () =>
            editor === null ? null : { editor, labels, editable, placeholder },
        [editor, labels, editable, placeholder, revision],
    );

    if (context === null) {
        return null;
    }

    return (
        <EditorContextProvider value={context}>
            <div
                data-disabled={disabled ? '' : undefined}
                data-readonly={readOnly ? '' : undefined}
                className={cn(
                    'gap-2 flex w-full flex-col data-disabled:opacity-50',
                    className,
                )}
                data-slot={slotName}
            >
                {children}
            </div>
        </EditorContextProvider>
    );
}
