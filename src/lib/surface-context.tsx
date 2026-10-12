'use client';

import * as React from 'react';

import type { ContentSurface } from '@/lib/language';

const SurfaceContext = React.createContext<ContentSurface | undefined>(
    undefined,
);

export function SurfaceProvider({
    surface,
    children,
}: {
    surface?: ContentSurface;
    children: React.ReactNode;
}) {
    return (
        <SurfaceContext.Provider value={surface}>
            {children}
        </SurfaceContext.Provider>
    );
}

export function useContentSurface(
    surface?: ContentSurface,
    inset?: boolean,
): ContentSurface {
    const global = React.useContext(SurfaceContext);

    return surface ?? (inset ? 'none' : (global ?? 'grouped'));
}
