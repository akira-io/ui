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

export { type EditorLabels as E, editorLabels as e };
