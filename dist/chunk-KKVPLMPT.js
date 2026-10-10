// src/lib/sidebar-cookie.ts
var SIDEBAR_COOKIE_NAME = "sidebar_state";
function readSidebarState(cookieHeader) {
  if (!cookieHeader) {
    return void 0;
  }
  for (const pair of cookieHeader.split(";")) {
    const separator = pair.indexOf("=");
    if (separator === -1) {
      continue;
    }
    if (pair.slice(0, separator).trim() !== SIDEBAR_COOKIE_NAME) {
      continue;
    }
    const value = pair.slice(separator + 1).trim();
    if (value === "true") {
      return true;
    }
    if (value === "false") {
      return false;
    }
  }
  return void 0;
}

export {
  SIDEBAR_COOKIE_NAME,
  readSidebarState
};
//# sourceMappingURL=chunk-KKVPLMPT.js.map