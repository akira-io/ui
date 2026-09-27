// src/lib/language.ts
var surfaceRadius = "rounded-3xl";
var controlRadius = "rounded-2xl";
var compactRadius = "rounded-xl";
var glassEdge = "ring-1 ring-surface-ring backdrop-blur-2xl backdrop-saturate-150";
var elevatedSurface = `${glassEdge} ${surfaceRadius} border-0 shadow-(--glass-elevation)`;
var floatingSurface = `${glassEdge} border-0 bg-popover/85 text-popover-foreground shadow-(--glass-elevation)`;
var modalSurface = `${floatingSurface} ${surfaceRadius}`;
var panelSurface = `${floatingSurface} ${controlRadius}`;
var menuSurface = `${panelSurface} bg-popover/80`;
var flatSurface = "shadow-none ring-0";
var recessedSurface = `${controlRadius} border-0 bg-surface-recessed/30 text-foreground shadow-none ring-0 backdrop-blur-none`;
var nestedRadius = controlRadius;
var nestedSurfaceReset = "nested-surface:border-0 nested-surface:ring-0 nested-surface:bg-transparent nested-surface:shadow-none nested-surface:backdrop-blur-none";
var nestedEdgeToEdge = "nested-surface:rounded-none";
var glassControl = "ring-1 ring-surface-ring border-0 shadow-(--glass-shadow) backdrop-blur-md backdrop-saturate-150";
var controlFill = "bg-surface-control";
var fieldText = "text-base sm:text-sm";
var fieldSurface = `${glassControl} ${controlFill} ${controlRadius} ${fieldText} text-foreground`;
var focusRing = "focus-visible:outline-solid focus-visible:outline-1 focus-visible:outline-offset-0 focus-visible:outline-ring";
var fieldFocus = `${focusRing} focus-visible:shadow-(--glass-elevation)`;
var menuHighlight = "outline-hidden focus:bg-accent focus:text-accent-foreground";
var scrollEdgeTransition = "transition-shadow duration-200 ease-out";
var scrollShadowFromTop = "shadow-(--scroll-shadow-top)";
var scrollShadowFromBottom = "shadow-(--scroll-shadow-bottom)";
function surface(inset) {
  return inset ? `${elevatedSurface} ${recessedSurface}` : elevatedSurface;
}

export {
  controlRadius,
  compactRadius,
  elevatedSurface,
  floatingSurface,
  modalSurface,
  panelSurface,
  menuSurface,
  flatSurface,
  recessedSurface,
  nestedRadius,
  nestedSurfaceReset,
  nestedEdgeToEdge,
  glassControl,
  controlFill,
  fieldSurface,
  focusRing,
  fieldFocus,
  menuHighlight,
  scrollEdgeTransition,
  scrollShadowFromTop,
  scrollShadowFromBottom,
  surface
};
//# sourceMappingURL=chunk-TA3IKSIJ.js.map