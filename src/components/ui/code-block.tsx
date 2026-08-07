import * as React from 'react';

import { Button } from '@/components/ui/button';
import { CodeBlockHeader } from '@/components/ui/code-block-header';
import { CopyButton } from '@/components/ui/copy-button';
import { useHighlightedCode } from '@/hooks/use-highlighted-code';
import {
    parseLineRanges,
    splitHighlightedLines,
    splitSourceLines,
} from '@/lib/code-lines';
import { elevatedSurface, nestedSurfaceReset } from '@/lib/language';
import { cn } from '@/lib/utils';

export interface CodeBlockLabels {
    copyLabel: string;
    copiedLabel: string;
    expandLabel: string;
    collapseLabel: string;
}

export interface CodeBlockProps extends Omit<
    React.ComponentProps<'div'>,
    'children'
> {
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

function CodeBlock({
    code,
    language,
    html,
    filename,
    lineNumbers = false,
    highlightLines,
    maxHeight,
    copyLabel = 'Copy',
    copiedLabel = 'Copied',
    expandLabel = 'Expand',
    collapseLabel = 'Collapse',
    className,
    ...props
}: CodeBlockProps) {
    const highlighted = useHighlightedCode(code, language, html);
    const lines = React.useMemo(() => splitSourceLines(code), [code]);
    const markup = React.useMemo(
        () =>
            highlighted === null ? null : splitHighlightedLines(highlighted),
        [highlighted],
    );
    const emphasised = React.useMemo(
        () => parseLineRanges(highlightLines),
        [highlightLines],
    );

    const bodyRef = React.useRef<HTMLDivElement>(null);
    const [expanded, setExpanded] = React.useState(false);
    const [clipped, setClipped] = React.useState(false);

    React.useEffect(() => {
        const body = bodyRef.current;

        if (!body || maxHeight === undefined || expanded) {
            return;
        }

        setClipped(body.scrollHeight > body.clientHeight + 1);
    }, [maxHeight, expanded, lines, markup]);

    return (
        <div
            data-slot="code-block"
            className={cn(
                elevatedSurface,
                nestedSurfaceReset,
                'relative overflow-hidden bg-card',
                className,
            )}
            {...props}
        >
            {filename === undefined ? (
                <CopyButton
                    value={code}
                    copyLabel={copyLabel}
                    copiedLabel={copiedLabel}
                    className="top-2 right-2 absolute z-10 text-muted-foreground"
                />
            ) : (
                <CodeBlockHeader
                    filename={filename}
                    language={language}
                    code={code}
                    copyLabel={copyLabel}
                    copiedLabel={copiedLabel}
                />
            )}
            <div
                ref={bodyRef}
                data-slot="code-block-body"
                style={{ maxHeight: expanded ? undefined : maxHeight }}
                className="py-4 font-mono text-sm leading-6 overflow-auto rounded-[inherit]"
            >
                <pre className="w-max min-w-full">
                    <code data-slot="code-block-code">
                        {lines.map((line, index) => (
                            <CodeBlockLine
                                key={index}
                                number={index + 1}
                                line={line}
                                markup={markup?.[index]}
                                lineNumbers={lineNumbers}
                                emphasised={emphasised.has(index + 1)}
                            />
                        ))}
                    </code>
                </pre>
            </div>
            {clipped && (
                <CodeBlockExpander
                    expanded={expanded}
                    expandLabel={expandLabel}
                    collapseLabel={collapseLabel}
                    onToggle={() => setExpanded((open) => !open)}
                />
            )}
        </div>
    );
}

interface CodeBlockLineProps {
    number: number;
    line: string;
    markup: string | undefined;
    lineNumbers: boolean;
    emphasised: boolean;
}

function CodeBlockLine({
    number,
    line,
    markup,
    lineNumbers,
    emphasised,
}: CodeBlockLineProps) {
    return (
        <span
            data-slot="code-block-line"
            data-highlighted={emphasised ? '' : undefined}
            className={cn(
                'min-h-6 px-4 grid w-full data-highlighted:bg-accent',
                lineNumbers ? 'grid-cols-[2.5rem_1fr]' : 'grid-cols-1',
            )}
        >
            {lineNumbers && (
                <span
                    data-slot="code-block-gutter"
                    aria-hidden="true"
                    className="pr-4 text-right text-muted-foreground select-none"
                >
                    {number}
                </span>
            )}
            {markup === undefined ? (
                <span data-slot="code-block-source">{line}</span>
            ) : (
                <span
                    data-slot="code-block-source"
                    dangerouslySetInnerHTML={{ __html: markup }}
                />
            )}
        </span>
    );
}

interface CodeBlockExpanderProps {
    expanded: boolean;
    expandLabel: string;
    collapseLabel: string;
    onToggle: () => void;
}

function CodeBlockExpander({
    expanded,
    expandLabel,
    collapseLabel,
    onToggle,
}: CodeBlockExpanderProps) {
    return (
        <div
            data-slot="code-block-expander"
            className="inset-x-0 bottom-0 pt-10 pb-2 absolute flex justify-center"
        >
            {!expanded && (
                <span
                    aria-hidden="true"
                    className="inset-0 pointer-events-none absolute bg-gradient-to-t from-card to-transparent"
                />
            )}
            <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={onToggle}
            >
                {expanded ? collapseLabel : expandLabel}
            </Button>
        </div>
    );
}

export { CodeBlock };
