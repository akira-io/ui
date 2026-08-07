import { ChevronRight } from 'lucide-react';
import * as React from 'react';

import { entriesOf, isBranch, jsonKind, type JsonKind } from '@/lib/json-value';
import { focusRing } from '@/lib/language';
import { cn } from '@/lib/utils';

const LEAF_CLASS: Record<JsonKind, string> = {
    string: 'text-success',
    number: 'text-primary',
    boolean: 'text-destructive',
    null: 'text-muted-foreground',
    object: 'text-foreground',
    array: 'text-foreground',
    unsupported: 'text-muted-foreground italic',
};

const BRACKETS: Record<'object' | 'array', [string, string]> = {
    object: ['{', '}'],
    array: ['[', ']'],
};

export interface JsonNodeLabels {
    expandLabel: string;
    collapseLabel: string;
    circularLabel: string;
    entriesLabel: (count: number) => string;
}

interface JsonNodeProps {
    name?: string;
    value: unknown;
    depth: number;
    initialDepth: number;
    ancestors: readonly object[];
    labels: JsonNodeLabels;
}

function leafText(value: unknown, kind: JsonKind): string {
    if (kind === 'string') {
        return `"${String(value)}"`;
    }

    if (kind === 'null') {
        return 'null';
    }

    return String(value);
}

function JsonKey({ name }: { name: string }) {
    return (
        <span
            data-slot="json-viewer-key"
            className="font-medium text-foreground"
        >
            {name}:
        </span>
    );
}

function JsonNode({
    name,
    value,
    depth,
    initialDepth,
    ancestors,
    labels,
}: JsonNodeProps) {
    const kind = jsonKind(value);
    const branch = isBranch(kind);
    const circular = branch && ancestors.includes(value as object);
    const [open, setOpen] = React.useState(depth < initialDepth);

    const entries = React.useMemo(
        () => (branch && !circular ? entriesOf(value) : []),
        [branch, circular, value],
    );
    const trail = React.useMemo(
        () => (branch ? [...ancestors, value as object] : ancestors),
        [branch, ancestors, value],
    );

    if (!branch || circular) {
        return (
            <div
                data-slot="json-viewer-node"
                className="gap-2 py-0.5 pl-5 flex"
            >
                {name !== undefined && <JsonKey name={name} />}
                {circular ? (
                    <span
                        data-slot="json-viewer-circular"
                        className="text-muted-foreground italic"
                    >
                        {labels.circularLabel}
                    </span>
                ) : (
                    <span
                        data-slot="json-viewer-value"
                        className={cn('break-all', LEAF_CLASS[kind])}
                    >
                        {leafText(value, kind)}
                    </span>
                )}
            </div>
        );
    }

    const [opening, closing] = BRACKETS[kind === 'array' ? 'array' : 'object'];

    return (
        <div data-slot="json-viewer-node">
            <button
                type="button"
                data-slot="json-viewer-toggle"
                aria-expanded={open}
                aria-label={open ? labels.collapseLabel : labels.expandLabel}
                onClick={() => setOpen((current) => !current)}
                className={cn(
                    'gap-2 rounded-xl py-0.5 flex w-full cursor-pointer items-center text-left hover:bg-accent',
                    focusRing,
                )}
            >
                <ChevronRight
                    aria-hidden="true"
                    className={cn(
                        'size-3.5 shrink-0 text-muted-foreground transition-transform',
                        open && 'rotate-90',
                    )}
                />
                {name !== undefined && <JsonKey name={name} />}
                <span className="text-muted-foreground">{opening}</span>
                {!open && (
                    <>
                        <span
                            data-slot="json-viewer-summary"
                            className="text-xs font-medium text-muted-foreground"
                        >
                            {labels.entriesLabel(entries.length)}
                        </span>
                        <span className="text-muted-foreground">{closing}</span>
                    </>
                )}
            </button>
            {open && (
                <div className="ml-1.5 pl-3 border-l border-border">
                    {entries.map(([key, item]) => (
                        <JsonNode
                            key={key}
                            name={key}
                            value={item}
                            depth={depth + 1}
                            initialDepth={initialDepth}
                            ancestors={trail}
                            labels={labels}
                        />
                    ))}
                    <div className="pl-5 text-muted-foreground">{closing}</div>
                </div>
            )}
        </div>
    );
}

export { JsonNode };
