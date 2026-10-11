import { ErrorCode, type FileRejection } from 'react-dropzone';

import { formatBytes } from '@/lib/bytes';

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

export function rejectionMessage(
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
