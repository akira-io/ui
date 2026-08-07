import { EditorContent as TiptapContent } from '@tiptap/react';

import { useEditorContext } from '@/components/ui/editor/context';
import { cn } from '@/lib/utils';
import type { SlotNameProps } from '@/types';

export interface EditorContentProps {
    className?: string;
}

export function EditorContent({
    className,
    slotName = 'editor-content',
}: EditorContentProps & SlotNameProps) {
    const { editor, placeholder } = useEditorContext();

    return (
        <div
            data-placeholder={placeholder}
            data-empty={editor.isEmpty ? '' : undefined}
            className={cn(
                'data-empty:before:top-3 data-empty:before:left-4 data-empty:before:text-sm data-empty:before:font-medium relative w-full data-empty:before:pointer-events-none data-empty:before:absolute data-empty:before:text-muted-foreground data-empty:before:content-[attr(data-placeholder)]',
                className,
            )}
            data-slot={slotName}
        >
            <TiptapContent editor={editor} />
        </div>
    );
}
