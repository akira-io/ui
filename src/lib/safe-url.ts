const STRIPPED_BY_THE_URL_PARSER = /[\t\n\r]/g;
const EDGE_C0_OR_SPACE = /^[\u0000-\u0020]+|[\u0000-\u0020]+$/g;
const SCHEME = /^([a-z][a-z0-9+.-]*):/i;

export const NAVIGABLE_SCHEMES = ['http', 'https', 'mailto', 'tel'];

export function normalizeUrl(url: string): string {
    return url
        .replace(STRIPPED_BY_THE_URL_PARSER, '')
        .replace(EDGE_C0_OR_SPACE, '');
}

export function hasNavigableScheme(url: string): boolean {
    const scheme = SCHEME.exec(normalizeUrl(url))?.[1]?.toLowerCase();

    return scheme === undefined || NAVIGABLE_SCHEMES.includes(scheme);
}
