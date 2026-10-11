import { Paperclip, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import type { DropzoneLabels } from '@/components/ui/dropzone-labels';
import { compactRadius } from '@/lib/language';
import { cn } from '@/lib/utils';
import type { SlotNameProps } from '@/types';

interface DropzoneFileListProps {
    files: File[];
    labels: DropzoneLabels;
    disabled: boolean;
    onRemove: (file: File) => void;
}

export function DropzoneFileList({
    files,
    labels,
    disabled,
    onRemove,
    slotName = 'dropzone-files',
}: DropzoneFileListProps & SlotNameProps) {
    return (
        <ul className="gap-2 flex flex-col" data-slot={slotName}>
            {files.map((file) => (
                <li
                    key={`${file.name}-${file.size}-${file.lastModified}`}
                    data-slot="dropzone-file"
                    className={cn(
                        compactRadius,
                        'gap-2 px-3 py-2 flex items-center bg-muted',
                    )}
                >
                    <Paperclip
                        aria-hidden="true"
                        className="size-4 shrink-0 text-muted-foreground"
                    />
                    <span className="min-w-0 text-sm font-medium flex-1 truncate text-foreground">
                        {file.name}
                    </span>
                    <span
                        data-slot="dropzone-file-size"
                        className="text-xs font-medium text-muted-foreground"
                    >
                        {labels.sizeLabel(file.size)}
                    </span>
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        slotName="dropzone-remove"
                        aria-label={labels.removeLabel}
                        disabled={disabled}
                        onClick={() => onRemove(file)}
                    >
                        <X aria-hidden="true" />
                    </Button>
                </li>
            ))}
        </ul>
    );
}
