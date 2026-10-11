const warned = new Set<string>();

export function warnInDevelopment(message: string): void {
    if (process.env.NODE_ENV === 'production' || warned.has(message)) {
        return;
    }

    warned.add(message);
    console.warn(`[@akira-io/ui] ${message}`);
}

export function resetDevWarnings(): void {
    warned.clear();
}
