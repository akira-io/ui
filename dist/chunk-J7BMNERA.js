// src/lib/safe-url.ts
var STRIPPED_BY_THE_URL_PARSER = /[\t\n\r]/g;
var EDGE_C0_OR_SPACE = /^[\u0000-\u0020]+|[\u0000-\u0020]+$/g;
var SCHEME = /^([a-z][a-z0-9+.-]*):/i;
var NAVIGABLE_SCHEMES = ["http", "https", "mailto", "tel"];
function normalizeUrl(url) {
  return url.replace(STRIPPED_BY_THE_URL_PARSER, "").replace(EDGE_C0_OR_SPACE, "");
}
function hasNavigableScheme(url) {
  const scheme = SCHEME.exec(normalizeUrl(url))?.[1]?.toLowerCase();
  return scheme === void 0 || NAVIGABLE_SCHEMES.includes(scheme);
}

export {
  NAVIGABLE_SCHEMES,
  normalizeUrl,
  hasNavigableScheme
};
//# sourceMappingURL=chunk-J7BMNERA.js.map