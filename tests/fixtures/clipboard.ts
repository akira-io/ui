export interface ClipboardStub {
    writes: string[];
    restore: () => void;
}

export interface ClipboardStubOptions {
    unavailable?: boolean;
    rejectWith?: unknown;
}

export function stubClipboard(
    options: ClipboardStubOptions = {},
): ClipboardStub {
    const writes: string[] = [];
    const writeText = (value: string): Promise<void> => {
        if ('rejectWith' in options) {
            return Promise.reject(options.rejectWith);
        }

        writes.push(value);

        return Promise.resolve();
    };

    Object.defineProperty(globalThis.navigator, 'clipboard', {
        configurable: true,
        writable: true,
        value: options.unavailable ? undefined : { writeText },
    });

    return {
        writes,
        restore: () => {
            Reflect.deleteProperty(globalThis.navigator, 'clipboard');
        },
    };
}
