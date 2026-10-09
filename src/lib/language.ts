export const surfaceRadius = 'rounded-3xl';

export const controlRadius = 'rounded-2xl';

export const compactRadius = 'rounded-xl';

export const glassEdge =
    'ring-1 ring-surface-ring backdrop-blur-2xl backdrop-saturate-150';

export const elevatedSurface = `${glassEdge} ${surfaceRadius} border-0 shadow-(--glass-elevation)`;

export const floatingSurface = `${glassEdge} border-0 bg-popover/85 text-popover-foreground shadow-(--glass-elevation)`;

export const modalSurface = `${floatingSurface} ${surfaceRadius}`;

export const modalScrim = 'inset-0 bg-black/10 fixed z-50';

export const panelSurface = `${floatingSurface} ${controlRadius}`;

export const menuSurface = `${panelSurface} bg-popover/80`;

export const flatSurface = 'shadow-none ring-0';

export const recessedSurface = `${controlRadius} border-0 bg-surface-recessed/30 text-foreground shadow-none ring-0 backdrop-blur-none`;

export const nestedRadius = controlRadius;

export const nestedSurfaceReset =
    'nested-surface:border-0 nested-surface:ring-0 nested-surface:bg-transparent nested-surface:shadow-none nested-surface:backdrop-blur-none';

export const nestedEdgeToEdge = 'nested-surface:rounded-none';

export const glassControl =
    'ring-1 ring-surface-ring border-0 shadow-(--glass-shadow) backdrop-blur-md backdrop-saturate-150';

export const controlFill = 'bg-surface-control';

export const fieldText = 'text-base sm:text-sm';

export const fieldSurface = `${glassControl} ${controlFill} ${controlRadius} ${fieldText} text-foreground`;

export const focusRing =
    'focus-visible:outline-solid focus-visible:outline-1 focus-visible:outline-offset-0 focus-visible:outline-ring';

export const fieldFocus = `${focusRing} focus-visible:shadow-(--glass-elevation)`;

export const menuHighlight =
    'outline-hidden focus:bg-accent focus:text-accent-foreground';

export const scrollEdgeTransition = 'transition-shadow duration-200 ease-out';

export const scrollShadowFromTop = 'shadow-(--scroll-shadow-top)';

export const scrollShadowFromBottom = 'shadow-(--scroll-shadow-bottom)';

export const stickyLastCell = [
    '[&_:is(th,td):last-child:not([colspan])]:sticky',
    '[&_:is(th,td):last-child:not([colspan])]:end-0',
    '[&_:is(th,td):last-child:not([colspan])]:z-[1]',
    '[&_:is(th,td):last-child:not([colspan])]:bg-(--sticky-cell)',
    '[&_:is(th,td):last-child:not([colspan])]:transition-[background-color,box-shadow]',
    '[&_tr:hover>td:last-child:not([colspan])]:bg-(--sticky-cell-hover)',
    '[&_tr[data-state=selected]>td:last-child:not([colspan])]:bg-(--sticky-cell-selected)',
    '[&_tr[data-active=true]>td:last-child:not([colspan])]:bg-(--sticky-cell-active)',
].join(' ');

export const stickyLastCellShadow =
    '[&_:is(th,td):last-child:not([colspan])]:shadow-(--scroll-shadow-start)';

export const truncatedCell = [
    '[&_:is(th,td):not(:last-child)]:max-w-72',
    '[&_:is(th,td):not(:last-child)]:truncate',
].join(' ');

export interface SurfaceProps {
    inset?: boolean;
}

export interface FlatSurfaceProps extends SurfaceProps {
    flat?: boolean;
}

export function surface(inset?: boolean | null): string {
    return inset ? `${elevatedSurface} ${recessedSurface}` : elevatedSurface;
}
