import { Paperclip, UploadCloud, X } from 'lucide-react';
import * as React from 'react';
import {
    ErrorCode,
    useDropzone,
    type Accept,
    type FileRejection,
} from 'react-dropzone';

import { Button } from '@/components/ui/button';
import { FieldError } from '@/components/ui/field-error';
import { Progress } from '@/components/ui/progress';
import { formatBytes } from '@/lib/bytes';
import {
    compactRadius,
    elevatedSurface,
    flatSurface,
    focusRing,
    recessedSurface,
    type FlatSurfaceProps,
} from '@/lib/language';
import { cn } from '@/lib/utils';
import { useUiLabels } from '@/locales/context';
import type { SlotNameProps } from '@/types';

export interface DropzoneLabels {
    idleLabel: string;
    activeLabel: string;
    triggerLabel: string;
    removeLabel: string;
    sizeLabel: (bytes: number) => string;
    invalidTypeLabel: string;
    tooLargeLabel: (maxSize: number) => string;
    tooManyFilesLabel: (maxFiles: number) => string;
    rejectedLabel: string;
    progressLabel: (percent: number) => string;
}

export const dropzoneDefaultLabels: DropzoneLabels = {
    idleLabel: 'Drag a file here',
    activeLabel: 'Drop to attach',
    triggerLabel: 'Choose a file',
    removeLabel: 'Remove file',
    sizeLabel: (bytes) => formatBytes(bytes),
    invalidTypeLabel: 'That file type is not accepted.',
    tooLargeLabel: (maxSize) =>
        `That file is larger than ${formatBytes(maxSize)}.`,
    tooManyFilesLabel: (maxFiles) => `Attach at most ${maxFiles} files.`,
    rejectedLabel: 'That file was not accepted.',
    progressLabel: (percent) => `Uploading, ${percent}% done`,
};

interface DropzoneProps
    extends
        Omit<React.ComponentProps<'div'>, 'onDrop' | 'children'>,
        FlatSurfaceProps {
    accept?: Accept;
    maxSize?: number;
    maxFiles?: number;
    multiple?: boolean;
    disabled?: boolean;
    files?: File[];
    onFilesChange?: (files: File[]) => void;
    onRejected?: (rejections: FileRejection[]) => void;
    error?: string;
    progress?: number;
    idleLabel?: DropzoneLabels['idleLabel'];
    activeLabel?: DropzoneLabels['activeLabel'];
    triggerLabel?: DropzoneLabels['triggerLabel'];
    removeLabel?: DropzoneLabels['removeLabel'];
    sizeLabel?: DropzoneLabels['sizeLabel'];
    invalidTypeLabel?: DropzoneLabels['invalidTypeLabel'];
    tooLargeLabel?: DropzoneLabels['tooLargeLabel'];
    tooManyFilesLabel?: DropzoneLabels['tooManyFilesLabel'];
    rejectedLabel?: DropzoneLabels['rejectedLabel'];
    progressLabel?: DropzoneLabels['progressLabel'];
}

function rejectionMessage(
    rejection: FileRejection,
    labels: DropzoneLabels,
    maxSize: number | undefined,
    maxFiles: number | undefined,
): string {
    const codes = rejection.errors.map((error) => error.code);

    if (codes.includes(ErrorCode.FileInvalidType)) {
        return labels.invalidTypeLabel;
    }

    if (codes.includes(ErrorCode.FileTooLarge) && maxSize !== undefined) {
        return labels.tooLargeLabel(maxSize);
    }

    if (codes.includes(ErrorCode.TooManyFiles) && maxFiles !== undefined) {
        return labels.tooManyFilesLabel(maxFiles);
    }

    return labels.rejectedLabel;
}

export function Dropzone({
    accept,
    maxSize,
    maxFiles,
    multiple = false,
    disabled = false,
    files,
    onFilesChange,
    onRejected,
    error,
    progress,
    flat = false,
    inset = false,
    className,
    idleLabel,
    activeLabel,
    triggerLabel,
    removeLabel,
    sizeLabel,
    invalidTypeLabel,
    tooLargeLabel,
    tooManyFilesLabel,
    rejectedLabel,
    progressLabel,
    slotName = 'dropzone',
    ...props
}: DropzoneProps & SlotNameProps) {
    const labels = useUiLabels('dropzone', dropzoneDefaultLabels, {
        idleLabel,
        activeLabel,
        triggerLabel,
        removeLabel,
        sizeLabel,
        invalidTypeLabel,
        tooLargeLabel,
        tooManyFilesLabel,
        rejectedLabel,
        progressLabel,
    });

    const errorId = React.useId();
    const [ownFiles, setOwnFiles] = React.useState<File[]>([]);
    const [rejected, setRejected] = React.useState<string | null>(null);

    const chosen = files ?? ownFiles;
    const message = error ?? rejected ?? undefined;

    function publish(next: File[]): void {
        if (files === undefined) {
            setOwnFiles(next);
        }

        onFilesChange?.(next);
    }

    const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
        accept,
        maxSize,
        maxFiles,
        multiple,
        disabled,
        onDrop: (accepted: File[], rejections: FileRejection[]) => {
            setRejected(
                rejections.length > 0
                    ? rejectionMessage(rejections[0], labels, maxSize, maxFiles)
                    : null,
            );

            if (rejections.length > 0) {
                onRejected?.(rejections);
            }

            if (accepted.length === 0) {
                return;
            }

            publish(multiple ? [...chosen, ...accepted] : accepted.slice(0, 1));
        },
    });

    function remove(target: File): void {
        setRejected(null);
        publish(chosen.filter((file) => file !== target));
    }

    return (
        <div
            className={cn(
                elevatedSurface,
                'gap-3 p-3 flex flex-col bg-card',
                flat && flatSurface,
                inset && recessedSurface,
                className,
            )}
            {...props}
            data-slot={slotName}
        >
            <div
                {...getRootProps({
                    'aria-invalid': message ? true : undefined,
                    'aria-describedby': message ? errorId : undefined,
                    'aria-disabled': disabled || undefined,
                    'data-drag-active': isDragActive || undefined,
                    'data-disabled': disabled || undefined,
                    className: cn(
                        recessedSurface,
                        focusRing,
                        'gap-2 px-6 py-8 flex cursor-pointer flex-col items-center border border-dashed border-border text-center outline-hidden transition-colors',
                        isDragActive && 'border-primary bg-primary/10',
                        message && 'border-destructive',
                        disabled && 'cursor-not-allowed opacity-50',
                    ),
                })}
                data-slot="dropzone-area"
            >
                <input {...getInputProps()} data-slot="dropzone-input" />
                <UploadCloud
                    aria-hidden="true"
                    className="size-5 text-muted-foreground"
                />
                <p className="text-sm font-medium text-foreground">
                    {isDragActive ? labels.activeLabel : labels.idleLabel}
                </p>
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    tabIndex={-1}
                    disabled={disabled}
                    slotName="dropzone-trigger"
                    onClick={(event) => {
                        event.stopPropagation();
                        open();
                    }}
                >
                    {labels.triggerLabel}
                </Button>
            </div>

            {chosen.length > 0 && (
                <ul className="gap-2 flex flex-col" data-slot="dropzone-files">
                    {chosen.map((file) => (
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
                                onClick={() => remove(file)}
                            >
                                <X aria-hidden="true" />
                            </Button>
                        </li>
                    ))}
                </ul>
            )}

            {progress !== undefined && (
                <Progress
                    value={progress}
                    slotName="dropzone-progress"
                    aria-label={labels.progressLabel(Math.round(progress))}
                />
            )}

            <FieldError
                id={errorId}
                message={message}
                slotName="dropzone-error"
            />
        </div>
    );
}
