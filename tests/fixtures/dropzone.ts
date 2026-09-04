export function droppedFile(name: string, type: string, size = 1024): File {
    const file = new File(['x'], name, { type });

    Object.defineProperty(file, 'size', { value: size });

    return file;
}

export function dragging(files: File[]) {
    return {
        dataTransfer: {
            files,
            items: files.map((file) => ({
                kind: 'file',
                type: file.type,
                getAsFile: () => file,
            })),
            types: ['Files'],
        },
    };
}
