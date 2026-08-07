export interface EditorLabels {
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

export const editorLabels: EditorLabels = {
    toolbarLabel: 'Formatting',
    boldLabel: 'Bold',
    italicLabel: 'Italic',
    strikeLabel: 'Strikethrough',
    codeLabel: 'Code',
    headingLabel: (level) => `Heading ${level}`,
    bulletListLabel: 'Bullet list',
    orderedListLabel: 'Numbered list',
    blockquoteLabel: 'Quote',
    undoLabel: 'Undo',
    redoLabel: 'Redo',
    linkLabel: 'Link',
    linkDialogTitle: 'Link',
    linkDialogDescription: 'Point the selected text at an address.',
    linkUrlLabel: 'Address',
    linkUrlPlaceholder: 'https://example.com',
    linkApplyLabel: 'Apply',
    linkRemoveLabel: 'Remove',
    linkCancelLabel: 'Cancel',
};
