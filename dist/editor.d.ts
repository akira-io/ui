import * as React from 'react';
import { ReactNode } from 'react';
import { S as SlotNameProps } from './types-CMZRvMV5.js';
import { Editor as Editor$1, Extensions, JSONContent } from '@tiptap/core';
import { LucideIcon } from 'lucide-react';
import '@tanstack/react-table';

interface EditorContentProps {
    className?: string;
}
declare function EditorContent({ className, slotName, }: EditorContentProps & SlotNameProps): React.JSX.Element;

interface EditorLabels {
    toolbarLabel: string;
    boldLabel: string;
    italicLabel: string;
    strikeLabel: string;
    codeLabel: string;
    headingLabel: (level: number) => string;
    bulletListLabel: string;
    orderedListLabel: string;
    blockquoteLabel: string;
    undoLabel: string;
    redoLabel: string;
    linkLabel: string;
    linkDialogTitle: string;
    linkDialogDescription: string;
    linkUrlLabel: string;
    linkUrlPlaceholder: string;
    linkApplyLabel: string;
    linkRemoveLabel: string;
    linkCancelLabel: string;
}
declare const editorLabels: EditorLabels;

interface EditorContextValue {
    editor: Editor$1;
    labels: EditorLabels;
    editable: boolean;
    placeholder?: string;
}
declare function useEditorContext(): EditorContextValue;

type EditorMarkName = 'bold' | 'italic' | 'strike' | 'code';
interface EditorMarkProps {
    mark: EditorMarkName;
    label?: string;
    className?: string;
}
declare function EditorMark({ mark, label, className }: EditorMarkProps): React.JSX.Element;
interface EditorHeadingProps {
    level: 1 | 2 | 3 | 4 | 5 | 6;
    label?: string;
    className?: string;
}
declare function EditorHeading({ level, label, className }: EditorHeadingProps): React.JSX.Element;
type EditorListVariant = 'bullet' | 'ordered';
interface EditorListProps {
    variant: EditorListVariant;
    label?: string;
    className?: string;
}
declare function EditorList({ variant, label, className }: EditorListProps): React.JSX.Element;
interface EditorBlockquoteProps {
    label?: string;
    className?: string;
}
declare function EditorBlockquote({ label, className }: EditorBlockquoteProps): React.JSX.Element;
type EditorHistoryAction = 'undo' | 'redo';
interface EditorHistoryProps {
    action: EditorHistoryAction;
    label?: string;
    className?: string;
}
declare function EditorHistory({ action, label, className, slotName, }: EditorHistoryProps & SlotNameProps): React.JSX.Element;

type EditorOutput = 'html' | 'json';
type EditorDocument = string | JSONContent;
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
type EditorProps = EditorSharedProps & ({
    output?: 'html';
    value: string;
    onChange: (value: string) => void;
} | {
    output: 'json';
    value: JSONContent;
    onChange: (value: JSONContent) => void;
});
declare function Editor({ value, onChange, output, extensions, labels, placeholder, label, disabled, readOnly, className, children, slotName, }: EditorProps & SlotNameProps): React.JSX.Element | null;

declare function isSafeEditorUrl(url: string): boolean;
declare function defaultEditorExtensions(): Extensions;

interface EditorLinkProps {
    label?: string;
    className?: string;
}
declare function EditorLink({ label, className, slotName, }: EditorLinkProps & SlotNameProps): React.JSX.Element;

type WithoutChildren<T> = T extends unknown ? Omit<T, 'children'> : never;
type RichTextEditorProps = WithoutChildren<EditorProps>;
declare function RichTextEditor(props: RichTextEditorProps): React.JSX.Element;

interface EditorToolbarProps {
    children: ReactNode;
    className?: string;
}
declare function EditorToolbar({ children, className, slotName, }: EditorToolbarProps & SlotNameProps): React.JSX.Element;
interface EditorControlProps {
    label: string;
    icon: LucideIcon;
    pressed?: boolean;
    disabled?: boolean;
    onActivate: () => void;
    className?: string;
}
declare function EditorControl({ label, icon: Icon, pressed, disabled, onActivate, className, slotName, }: EditorControlProps & SlotNameProps): React.JSX.Element;

export { Editor, EditorBlockquote, type EditorBlockquoteProps, EditorContent, type EditorContentProps, type EditorContextValue, EditorControl, type EditorControlProps, type EditorDocument, EditorHeading, type EditorHeadingProps, EditorHistory, type EditorHistoryAction, type EditorHistoryProps, type EditorLabels, EditorLink, type EditorLinkProps, EditorList, type EditorListProps, type EditorListVariant, EditorMark, type EditorMarkName, type EditorMarkProps, type EditorOutput, type EditorProps, EditorToolbar, type EditorToolbarProps, RichTextEditor, type RichTextEditorProps, defaultEditorExtensions, editorLabels, isSafeEditorUrl, useEditorContext };
