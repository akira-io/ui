import * as React from 'react';

export type GlassToolbarSize = 'sm' | 'md' | 'default';

interface GlassToolbarContextValue {
    size: GlassToolbarSize;
    focusKey: string | null;
    setFocusKey: (key: string) => void;
    release: (key: string) => void;
}

export const GlassToolbarContext =
    React.createContext<GlassToolbarContextValue | null>(null);

export function useGlassToolbar(): GlassToolbarContextValue {
    const context = React.useContext(GlassToolbarContext);

    if (!context) {
        throw new Error(
            'GlassPillAction must be rendered inside a GlassToolbar.',
        );
    }

    return context;
}
