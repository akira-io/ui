const warned = new Set<string>();

function isProduction(): boolean {
    try {
        return process.env.NODE_ENV === 'production';
    } catch {
        return false;
    }
}

export function warnInDevelopment(message: string): void {
    if (isProduction() || warned.has(message)) {
        return;
    }

    warned.add(message);
    console.warn(`[@akira-io/ui] ${message}`);
}

export function resetDevWarnings(): void {
    warned.clear();
}
