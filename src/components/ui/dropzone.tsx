import { UploadCloud } from 'lucide-react';
import * as React from 'react';
import { useDropzone, type Accept, type FileRejection } from 'react-dropzone';

import { Button } from '@/components/ui/button';
import { DropzoneFileList } from '@/components/ui/dropzone-file-list';
import {
    dropzoneDefaultLabels,
    rejectionMessage,
    type DropzoneLabels,
} from '@/components/ui/dropzone-labels';
import { FieldError } from '@/components/ui/field-error';
import { Progress } from '@/components/ui/progress';
import {
    contentFill,
    flatSurface,
    focusRing,
    recessedSurface,
    type ContentSurfaceProps,
    type FlatSurfaceProps,
} from '@/lib/language';
import { cn } from '@/lib/utils';
import { useUiLabels } from '@/locales/context';
import type { SlotNameProps } from '@/types';

export {
    dropzoneDefaultLabels,
    type DropzoneLabels,
} from '@/components/ui/dropzone-labels';

export interface DropzoneProps
    extends
        Omit<React.ComponentProps<'div'>, 'onDrop' | 'children'>,
        FlatSurfaceProps,
        ContentSurfaceProps {
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
    surface,
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

    const inviting = multiple || chosen.length === 0;

    function remove(target: File): void {
        setRejected(null);
        publish(chosen.filter((file) => file !== target));
    }

    return (
        <div
            className={cn(
                contentFill(surface, inset),
                'gap-3 p-3 flex flex-col',
                flat && flatSurface,
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
                    tabIndex: inviting ? 0 : -1,
                    className: cn(
                        'outline-hidden',
                        inviting
                            ? cn(
                                  recessedSurface,
                                  focusRing,
                                  'gap-2 px-6 py-8 flex cursor-pointer flex-col items-center border border-dashed border-border text-center transition-colors',
                                  isDragActive &&
                                      'border-primary bg-primary/10',
                                  message && 'border-destructive',
                                  disabled && 'cursor-not-allowed opacity-50',
                              )
                            : 'contents',
                    ),
                })}
                data-slot="dropzone-area"
            >
                <input {...getInputProps()} data-slot="dropzone-input" />
                {inviting && (
                    <>
                        <UploadCloud
                            aria-hidden="true"
                            className="size-icon-lg text-muted-foreground"
                        />
                        <p className="text-sm font-medium text-foreground">
                            {isDragActive
                                ? labels.activeLabel
                                : labels.idleLabel}
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
                    </>
                )}
            </div>

            {chosen.length > 0 && (
                <DropzoneFileList
                    files={chosen}
                    labels={labels}
                    disabled={disabled}
                    onRemove={remove}
                />
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
