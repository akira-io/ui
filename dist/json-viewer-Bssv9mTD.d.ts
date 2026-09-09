import * as React from 'react';
import { S as SlotNameProps } from './types-CMZRvMV5.js';

interface CodeBlockLabels {
    copyLabel: string;
    copiedLabel: string;
    expandLabel: string;
    collapseLabel: string;
}
declare const codeBlockLabels: CodeBlockLabels;
interface CodeBlockProps extends Omit<React.ComponentProps<'div'>, 'children'> {
    code: string;
    language?: string;
    html?: string;
    filename?: string;
    lineNumbers?: boolean;
    highlightLines?: string | number[];
    maxHeight?: number | string;
    copyLabel?: CodeBlockLabels['copyLabel'];
    copiedLabel?: CodeBlockLabels['copiedLabel'];
    expandLabel?: CodeBlockLabels['expandLabel'];
    collapseLabel?: CodeBlockLabels['collapseLabel'];
}
declare function CodeBlock({ code, language, html, filename, lineNumbers, highlightLines, maxHeight, copyLabel, copiedLabel, expandLabel, collapseLabel, className, slotName, ...props }: CodeBlockProps & SlotNameProps): React.JSX.Element;

interface JsonNodeLabels {
    expandLabel: string;
    collapseLabel: string;
    circularLabel: string;
    entriesLabel: (count: number) => string;
}

interface JsonViewerLabels extends JsonNodeLabels {
    copyLabel: string;
    copiedLabel: string;
}
declare const jsonViewerLabels: JsonViewerLabels;
interface JsonViewerProps extends Omit<React.ComponentProps<'div'>, 'children'> {
    value: unknown;
    initialDepth?: number;
    maxHeight?: number | string;
    copyLabel?: JsonViewerLabels['copyLabel'];
    copiedLabel?: JsonViewerLabels['copiedLabel'];
    expandLabel?: JsonViewerLabels['expandLabel'];
    collapseLabel?: JsonViewerLabels['collapseLabel'];
    circularLabel?: JsonViewerLabels['circularLabel'];
    entriesLabel?: JsonViewerLabels['entriesLabel'];
}
declare function JsonViewer({ value, initialDepth, maxHeight, copyLabel, copiedLabel, expandLabel, collapseLabel, circularLabel, entriesLabel, className, slotName, ...props }: JsonViewerProps & SlotNameProps): React.JSX.Element;

export { CodeBlock as C, JsonViewer as J, type CodeBlockLabels as a, type CodeBlockProps as b, type JsonViewerLabels as c, type JsonViewerProps as d, codeBlockLabels as e, jsonViewerLabels as j };
