import * as React from 'react';

import { CopyButton } from '@/components/ui/copy-button';
import { JsonNode, type JsonNodeLabels } from '@/components/ui/json-node';
import { stringifyJson } from '@/lib/json-value';
import { elevatedSurface, nestedSurfaceReset } from '@/lib/language';
import { cn } from '@/lib/utils';

export interface JsonViewerLabels extends JsonNodeLabels {
    copyLabel: string;
    copiedLabel: string;
}

export const jsonViewerLabels: JsonViewerLabels = {
    copyLabel: 'Copy',
    copiedLabel: 'Copied',
    expandLabel: 'Expand',
    collapseLabel: 'Collapse',
    circularLabel: 'Circular reference',
    entriesLabel: (count) => `${count} ${count === 1 ? 'entry' : 'entries'}`,
};

export interface JsonViewerProps extends Omit<
    React.ComponentProps<'div'>,
    'children'
> {
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

function JsonViewer({
    value,
    initialDepth = 1,
    maxHeight,
    copyLabel = jsonViewerLabels.copyLabel,
    copiedLabel = jsonViewerLabels.copiedLabel,
    expandLabel = jsonViewerLabels.expandLabel,
    collapseLabel = jsonViewerLabels.collapseLabel,
    circularLabel = jsonViewerLabels.circularLabel,
    entriesLabel = jsonViewerLabels.entriesLabel,
    className,
    ...props
}: JsonViewerProps) {
    const labels = React.useMemo<JsonNodeLabels>(
        () => ({ expandLabel, collapseLabel, circularLabel, entriesLabel }),
        [expandLabel, collapseLabel, circularLabel, entriesLabel],
    );

    return (
        <div
            data-slot="json-viewer"
            className={cn(
                elevatedSurface,
                nestedSurfaceReset,
                'relative overflow-hidden bg-card',
                className,
            )}
            {...props}
        >
            <CopyButton
                value={stringifyJson(value)}
                copyLabel={copyLabel}
                copiedLabel={copiedLabel}
                className="top-2 right-2 absolute z-10 text-muted-foreground"
            />
            <div
                data-slot="json-viewer-body"
                style={{ maxHeight }}
                className="p-4 pr-12 font-mono text-sm leading-6 overflow-auto rounded-[inherit]"
            >
                <JsonNode
                    value={value}
                    depth={0}
                    initialDepth={initialDepth}
                    ancestors={[]}
                    labels={labels}
                />
            </div>
        </div>
    );
}

export { JsonViewer };
