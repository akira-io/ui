import * as React from 'react';

export interface FloatingSheetLabels {
    backLabel: string;
    closeLabel: string;
}

export const floatingSheetDefaultLabels: FloatingSheetLabels = {
    backLabel: 'Back',
    closeLabel: 'Close',
};

export const FLOATING_SHEET_OFFSET_LIMIT = 3;

export interface FloatingSheetStackEntry {
    id: string;
    title: React.ReactNode;
    persistent: boolean;
    close: () => void;
}

export interface FloatingSheetStackContextValue {
    labels: FloatingSheetLabels;
    container: HTMLElement | null;
    entries: FloatingSheetStackEntry[];
    register: (entry: FloatingSheetStackEntry) => void;
    unregister: (id: string) => void;
    closeAll: () => void;
}

export const FloatingSheetStackContext =
    React.createContext<FloatingSheetStackContextValue | null>(null);

export function useFloatingSheetStack(): FloatingSheetStackContextValue {
    const context = React.useContext(FloatingSheetStackContext);

    if (!context) {
        throw new Error(
            'FloatingSheet must be rendered inside a FloatingSheetStack.',
        );
    }

    return context;
}
