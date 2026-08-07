import { FileCode } from 'lucide-react';

import { CopyButton, type CopyButtonLabels } from '@/components/ui/copy-button';
import type { SlotNameProps } from '@/types';

interface CodeBlockHeaderProps {
    filename: string;
    language?: string;
    code: string;
    copyLabel: CopyButtonLabels['copyLabel'];
    copiedLabel: CopyButtonLabels['copiedLabel'];
}

function CodeBlockHeader({
    filename,
    language,
    code,
    copyLabel,
    copiedLabel,
    slotName = 'code-block-header',
}: CodeBlockHeaderProps & SlotNameProps) {
    return (
        <div
            className="gap-2 px-4 py-2 flex items-center border-b border-border"
            data-slot={slotName}
        >
            <FileCode className="size-4 shrink-0 text-muted-foreground" />
            <span
                data-slot="code-block-filename"
                className="text-sm font-medium truncate text-foreground"
            >
                {filename}
            </span>
            {language !== undefined && (
                <span
                    data-slot="code-block-language"
                    className="text-xs font-medium tracking-wide text-muted-foreground uppercase"
                >
                    {language}
                </span>
            )}
            <CopyButton
                value={code}
                copyLabel={copyLabel}
                copiedLabel={copiedLabel}
                className="ml-auto text-muted-foreground"
            />
        </div>
    );
}

export { CodeBlockHeader };
