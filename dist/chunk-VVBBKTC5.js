// src/lib/href.ts
import { createElement } from "react";
function hrefToString(href) {
  return typeof href === "string" ? href : href.url;
}
function pathOfHref(href) {
  const url = typeof href === "string" ? href : hrefToString(href);
  return url.split("?")[0].split("#")[0];
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
  pathOfHref,
  resolveLink
};
//# sourceMappingURL=chunk-VVBBKTC5.js.map