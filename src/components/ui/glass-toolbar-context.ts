import * as React from 'react';

interface GlassToolbarContextValue {
    focusKey: string | null;
    setFocusKey: (key: string) => void;
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
