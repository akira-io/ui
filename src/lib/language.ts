export const surfaceRadius = 'rounded-3xl';

export const controlRadius = 'rounded-2xl';

export const compactRadius = 'rounded-xl';

export const glassEdge =
    'ring-1 ring-surface-ring backdrop-blur-2xl backdrop-saturate-150';

export const elevatedSurface = `${glassEdge} ${surfaceRadius} border-0 shadow-(--glass-elevation)`;

export const floatingSurface = `${glassEdge} border-0 bg-popover/85 text-popover-foreground shadow-(--glass-elevation)`;

export const modalSurface = `${floatingSurface} ${surfaceRadius}`;

export const panelSurface = `${floatingSurface} ${controlRadius}`;

export const menuSurface = `${panelSurface} bg-popover/80`;

export const recessedSurface = `${controlRadius} border-0 bg-surface-recessed/30 text-foreground shadow-none ring-0 backdrop-blur-none`;

export const nestedRadius = controlRadius;

export const nestedSurfaceReset =
    'nested-surface:border-0 nested-surface:ring-0 nested-surface:bg-transparent nested-surface:shadow-none nested-surface:backdrop-blur-none';

export const nestedEdgeToEdge = 'nested-surface:rounded-none';

export const glassControl =
    'ring-1 ring-surface-ring border-0 shadow-(--glass-shadow) backdrop-blur-md backdrop-saturate-150';

export const controlFill = 'bg-surface-control';

export const fieldSurface = `${glassControl} ${controlFill} ${controlRadius} text-foreground`;

export const focusRing =
    'outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50';

export const quietFocus =
    'focus-visible:ring-1 focus-visible:ring-surface-ring focus-visible:border-transparent focus:shadow-lg focus:shadow-black/10';

export const menuHighlight =
    'outline-hidden focus:bg-accent focus:text-accent-foreground';

export interface SurfaceProps {
    inset?: boolean;
}

export function surface(inset?: boolean | null): string {
    return inset ? `${elevatedSurface} ${recessedSurface}` : elevatedSurface;
}
