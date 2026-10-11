import * as React from 'react';

export const TAB_COUNT_WARNING =
    'A tab bar holds five tabs at most (Apple HIG, Tab bars). Move the rest into a sidebar.';

export const TAB_LABEL_WARNING =
    'Every tab needs a short visible label (Apple HIG, Tab bars).';

interface GlassTabBarContextValue {
    value: string;
    choose: (value: string) => void;
    focusValue: string;
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
