const listeners = new Set<() => void>();

let systemPrefersDark = false;

export function installMatchMedia(prefersDark = false) {
    systemPrefersDark = prefersDark;
    listeners.clear();

    window.matchMedia = ((query: string) => ({
        matches: query.includes('dark') && systemPrefersDark,
        media: query,
        onchange: null,
        addEventListener: (_: string, listener: () => void) => {
            listeners.add(listener);
        },
        removeEventListener: (_: string, listener: () => void) => {
            listeners.delete(listener);
        },
        addListener: () => {},
        removeListener: () => {},
        dispatchEvent: () => false,
    })) as unknown as typeof window.matchMedia;
}

export function changeSystemPreference(prefersDark: boolean) {
    systemPrefersDark = prefersDark;

    for (const listener of listeners) {
        listener();
    }
}
