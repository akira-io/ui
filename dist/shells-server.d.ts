declare const SIDEBAR_COOKIE_NAME = "sidebar_state";
declare function readSidebarState(cookieHeader?: string | null): boolean | undefined;

export { SIDEBAR_COOKIE_NAME, readSidebarState };
