export const elevatedSurface =
    'rounded-3xl border border-border ring-1 ring-surface-ring shadow-2xl backdrop-blur-xl';

export const recessedSurface =
    'rounded-2xl border-0 bg-muted text-foreground shadow-none backdrop-blur-none';

export const nestedRadius = 'rounded-2xl';

export const nestedSurfaceReset =
    'nested-surface:border-0 nested-surface:bg-transparent nested-surface:shadow-none nested-surface:backdrop-blur-none';

export const fieldSurface =
    'rounded-2xl border border-border bg-muted/40 text-foreground shadow-xs';

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
