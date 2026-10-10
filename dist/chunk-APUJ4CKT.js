// src/lib/href.ts
import { createElement } from "react";
function hrefToString(href) {
  return typeof href === "string" ? href : href.url;
}
function pathOfHref(href) {
  const url = typeof href === "string" ? href : hrefToString(href);
  return url.split("?")[0].split("#")[0];
}
function mostSpecificActiveHref(hrefs, currentUrl) {
  const currentPath = pathOfHref(currentUrl);
  let best = "";
  let bestLength = 0;
  for (const candidate of hrefs) {
    const href = hrefToString(candidate);
    const path = pathOfHref(href);
    const matches = currentPath === path || currentPath.startsWith(`${path}/`);
    if (matches && path.length > bestLength) {
      best = href;
      bestLength = path.length;
    }
  }
  return best;
}
var DefaultLink = ({
  href,
  children,
  prefetch: _prefetch,
  as: _as,
  ...props
}) => {
  return createElement("a", { href: hrefToString(href), ...props }, children);
};
function resolveLink(linkComponent) {
  return linkComponent ?? DefaultLink;
}

export {
  hrefToString,
  mostSpecificActiveHref,
  resolveLink
};
//# sourceMappingURL=chunk-APUJ4CKT.js.map