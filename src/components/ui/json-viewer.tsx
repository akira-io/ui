import * as React from 'react';

import { CopyButton } from '@/components/ui/copy-button';
import { JsonNode, type JsonNodeLabels } from '@/components/ui/json-node';
import { stringifyJson } from '@/lib/json-value';
import { elevatedSurface, nestedSurfaceReset } from '@/lib/language';
import { cn } from '@/lib/utils';
import { useUiLabels } from '@/locales/context';
import type { SlotNameProps } from '@/types';

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
    copyLabel,
    copiedLabel,
    expandLabel,
    collapseLabel,
    circularLabel,
    entriesLabel,
    className,
    slotName = 'json-viewer',
    ...props
}: JsonViewerProps & SlotNameProps) {
    const text = useUiLabels('jsonViewer', jsonViewerLabels, {
        copyLabel,
        copiedLabel,
        expandLabel,
        collapseLabel,
        circularLabel,
        entriesLabel,
    });
    const labels = React.useMemo<JsonNodeLabels>(
        () => ({
            expandLabel: text.expandLabel,
            collapseLabel: text.collapseLabel,
            circularLabel: text.circularLabel,
            entriesLabel: text.entriesLabel,
        }),
        [
            text.expandLabel,
            text.collapseLabel,
            text.circularLabel,
            text.entriesLabel,
        ],
    );

    return (
        <div
            className={cn(
                elevatedSurface,
                nestedSurfaceReset,
                'relative overflow-hidden bg-card',
                className,
            )}
            {...props}
            data-slot={slotName}
        >
            <CopyButton
                value={stringifyJson(value)}
                copyLabel={text.copyLabel}
                copiedLabel={text.copiedLabel}
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
