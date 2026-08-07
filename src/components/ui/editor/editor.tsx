import type { Extensions, JSONContent } from '@tiptap/core';
import { useEditor } from '@tiptap/react';
import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';

import {
    EditorContextProvider,
    type EditorContextValue,
} from '@/components/ui/editor/context';
import { defaultEditorExtensions } from '@/components/ui/editor/extensions';
import { editorLabels, type EditorLabels } from '@/components/ui/editor/labels';
import { fieldSurface, focusRing } from '@/lib/language';
import { cn } from '@/lib/utils';
import type { SlotNameProps } from '@/types';

export type EditorOutput = 'html' | 'json';

export type EditorDocument = string | JSONContent;

interface EditorSharedProps {
    extensions?: Extensions;
    labels?: EditorLabels;
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

const editorProse =
    'text-sm font-medium leading-relaxed [&_p]:my-2 [&_h1]:mt-4 [&_h1]:mb-2 [&_h1]:text-2xl [&_h1]:font-bold [&_h2]:mt-4 [&_h2]:mb-2 [&_h2]:text-xl [&_h2]:font-bold [&_h3]:mt-3 [&_h3]:mb-2 [&_h3]:text-lg [&_h3]:font-semibold [&_ul]:my-2 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:my-2 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:my-1 [&_blockquote]:my-3 [&_blockquote]:border-l-2 [&_blockquote]:border-border [&_blockquote]:pl-4 [&_blockquote]:text-muted-foreground [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4 [&_code]:rounded-md [&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-normal [&_pre]:my-3 [&_pre]:rounded-xl [&_pre]:bg-muted [&_pre]:p-4 [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_hr]:my-4 [&_hr]:border-border';

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
    labels = editorLabels,
    placeholder,
    label,
    disabled = false,
    readOnly = false,
    className,
    children,
    slotName = 'editor',
}: EditorProps & SlotNameProps) {
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
