export const SIDEBAR_COOKIE_NAME = 'sidebar_state';

export function readSidebarState(
    cookieHeader?: string | null,
): boolean | undefined {
    if (!cookieHeader) {
        return undefined;
    }

    for (const pair of cookieHeader.split(';')) {
        const separator = pair.indexOf('=');

        if (separator === -1) {
            continue;
        }

        if (pair.slice(0, separator).trim() !== SIDEBAR_COOKIE_NAME) {
            continue;
        }

        const value = pair.slice(separator + 1).trim();

        if (value === 'true') {
            return true;
        }

        if (value === 'false') {
            return false;
        }
    }

    return undefined;
}
