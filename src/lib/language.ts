export const surfaceRadius = 'rounded-3xl';

export const controlRadius = 'rounded-2xl';

export const compactRadius = 'rounded-xl';

export const glassEdge = 'ring-1 ring-surface-ring';

export const elevatedSurface = `glass-panel glass-edge ring-1 ring-(color:--glass-button-ring) ${surfaceRadius} border-0 shadow-(--glass-elevation)`;

export const floatingSurface = `glass-panel glass-edge ring-1 ring-(color:--glass-button-ring) border-0 text-popover-foreground shadow-(--glass-elevation)`;

export const controlLayer = `glass-bar glass-edge ring-1 ring-(color:--glass-button-ring) border-0 shadow-(--glass-elevation)`;

export const glassBubble = 'glass-button glass-edge';

export const glassPress =
    'transition-[scale,filter] duration-500 ease-spring active:duration-200 active:scale-[1.06] active:brightness-110 motion-reduce:active:scale-100';

export const solidPress =
    'transition-[filter] duration-150 active:brightness-[0.88] dark:active:brightness-[1.2]';

export const modalSurface = `${floatingSurface} ${surfaceRadius}`;

export const modalScrim = 'inset-0 bg-black/10 fixed z-50';

export const panelSurface = `${floatingSurface} ${controlRadius}`;

export const menuSurface = panelSurface;

export const flatSurface = 'shadow-none ring-0';

export const recessedSurface = `border-0 bg-transparent text-foreground shadow-none ring-0 backdrop-blur-none [box-shadow:none]`;

export const nestedRadius = controlRadius;

export const nestedSurfaceReset =
    'nested-surface:border-0 nested-surface:ring-0 nested-surface:bg-transparent nested-surface:shadow-none nested-surface:backdrop-blur-none nested-surface:[backdrop-filter:none] nested-surface:[box-shadow:none]';

export const nestedEdgeToEdge = 'nested-surface:rounded-none';

export const glassControl =
    'ring-1 ring-surface-ring border-0 shadow-(--glass-shadow)';

export const controlFill = 'bg-surface-control';

export const fieldText = 'text-control';

export const fieldSurface = `bg-muted dark:glass-button dark:glass-edge text-foreground rounded-full border-0 ${fieldText} font-normal`;

export const focusRing =
    'focus-visible:outline-solid focus-visible:outline-1 focus-visible:outline-offset-0 focus-visible:outline-ring';

export const fieldFocus =
    'outline-hidden focus-visible:ring-[3px] focus-visible:ring-primary/45';

export const menuHighlight =
    'outline-hidden focus:bg-(--glass-highlight) focus:text-foreground';

export const glassHighlight = 'bg-(--glass-highlight)';

export const glassSelected = 'glass-prominent glass-edge';

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
