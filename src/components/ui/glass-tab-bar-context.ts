import * as React from 'react';

interface GlassTabBarContextValue {
    value: string;
    choose: (value: string) => void;
    expanded: boolean;
    setExpanded: (expanded: boolean) => void;
}

export const GlassTabBarContext =
    React.createContext<GlassTabBarContextValue | null>(null);

export function useGlassTabBar(): GlassTabBarContextValue {
    const context = React.useContext(GlassTabBarContext);

    if (!context) {
        throw new Error(
            'GlassTabBarItem must be rendered inside a GlassTabBar.',
        );
    }

    return context;
}
