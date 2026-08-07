import type { Editor as TiptapEditor } from '@tiptap/core';
import { createContext, useContext } from 'react';

import type { EditorLabels } from '@/components/ui/editor/labels';

export interface EditorContextValue {
    editor: TiptapEditor;
    labels: EditorLabels;
    editable: boolean;
    placeholder?: string;
}

const EditorContext = createContext<EditorContextValue | null>(null);

export const EditorContextProvider = EditorContext.Provider;

export function useEditorContext(): EditorContextValue {
    const context = useContext(EditorContext);

    if (context === null) {
        throw new Error('Editor parts must be used inside <Editor>.');
    }

    return context;
}
