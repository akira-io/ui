import { EditorContent } from '@/components/ui/editor/content';
import {
    EditorBlockquote,
    EditorHeading,
    EditorHistory,
    EditorList,
    EditorMark,
} from '@/components/ui/editor/controls';
import { Editor, type EditorProps } from '@/components/ui/editor/editor';
import { EditorLink } from '@/components/ui/editor/link';
import { EditorToolbar } from '@/components/ui/editor/toolbar';
import { Separator } from '@/components/ui/separator';

type WithoutChildren<T> = T extends unknown ? Omit<T, 'children'> : never;

export type RichTextEditorProps = WithoutChildren<EditorProps>;

export function RichTextEditor(props: RichTextEditorProps) {
    return (
        <Editor {...props}>
            <EditorToolbar>
                <EditorMark mark="bold" />
                <EditorMark mark="italic" />
                <EditorMark mark="strike" />
                <Separator orientation="vertical" className="mx-1 h-6" />
                <EditorHeading level={2} />
                <EditorHeading level={3} />
                <Separator orientation="vertical" className="mx-1 h-6" />
                <EditorList variant="bullet" />
                <EditorList variant="ordered" />
                <EditorBlockquote />
                <EditorMark mark="code" />
                <EditorLink />
                <Separator orientation="vertical" className="mx-1 h-6" />
                <EditorHistory action="undo" />
                <EditorHistory action="redo" />
            </EditorToolbar>
            <EditorContent />
        </Editor>
    );
}
