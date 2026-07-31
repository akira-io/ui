export const glassEdge =
    'ring-1 ring-surface-ring backdrop-blur-2xl backdrop-saturate-150';

export const elevatedSurface = `${glassEdge} rounded-3xl border-0 shadow-(--glass-elevation)`;

export const floatingSurface = `${glassEdge} border-0 bg-popover/85 text-popover-foreground shadow-(--glass-elevation)`;

export const modalSurface = `${floatingSurface} rounded-2xl sm:rounded-[2.5rem]`;

export const panelSurface = `${floatingSurface} rounded-2xl`;

export const menuSurface = `${panelSurface} bg-popover/80`;

export const recessedSurface =
    'rounded-2xl border-0 bg-surface-recessed text-foreground shadow-none ring-0 backdrop-blur-none';

export const nestedRadius = 'rounded-2xl';

export const nestedSurfaceReset =
    'nested-surface:border-0 nested-surface:ring-0 nested-surface:bg-transparent nested-surface:shadow-none nested-surface:backdrop-blur-none';

export const glassControl =
    'ring-1 ring-surface-ring border-0 shadow-(--glass-shadow) backdrop-blur-md backdrop-saturate-150';

export const fieldSurface = `${glassControl} rounded-2xl bg-background/60 text-foreground`;

export const focusRing =
    'outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50';

export const menuHighlight =
    'outline-hidden focus:bg-accent focus:text-accent-foreground';

export interface SurfaceProps {
    inset?: boolean;
}

export function surface(inset?: boolean | null): string {
    return inset ? `${elevatedSurface} ${recessedSurface}` : elevatedSurface;
}
