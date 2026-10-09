'use client';

import * as React from 'react';

import { useControllableState } from '@/hooks/use-controllable-state';

interface OverlayOpenProps {
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
}

const OverlayOpenContext = React.createContext<boolean | undefined>(undefined);

export function useOverlayState({
    open,
    defaultOpen = false,
    onOpenChange,
}: OverlayOpenProps): { open: boolean; onOpenChange: (open: boolean) => void } {
    const [current, setCurrent] = useControllableState({
        value: open,
        defaultValue: defaultOpen,
        onChange: onOpenChange,
    });

    return { open: current, onOpenChange: setCurrent };
}

export function OverlayOpenProvider({
    open,
    children,
}: {
    open: boolean;
    children: React.ReactNode;
}) {
    return (
        <OverlayOpenContext.Provider value={open}>
            {children}
        </OverlayOpenContext.Provider>
    );
}

export function OverlayContentBoundary({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <OverlayOpenContext.Provider value={undefined}>
            {children}
        </OverlayOpenContext.Provider>
    );
}

export function useOverlayOpen(): boolean | undefined {
    return React.useContext(OverlayOpenContext);
}

export function useOverlayForceMount(): true | undefined {
    return useOverlayOpen() === undefined ? undefined : true;
}

export function useClosingDismissGuard(): (event: Event) => void {
    const open = useOverlayOpen();
    const openRef = React.useRef(open);

    React.useLayoutEffect(() => {
        openRef.current = open;
    }, [open]);

    return React.useCallback((event: Event) => {
        if (openRef.current === false) {
            event.preventDefault();
        }
    }, []);
}

