const SPACING =
    /(?:^|[\s'"`{(])((?:[^\s'"`]*:)?)(-?)(p|px|py|pt|pb|pl|pr|ps|pe|m|mx|my|mt|mb|ml|mr|ms|me|gap|gap-x|gap-y|space-x|space-y)-(\d+(?:\.\d+)?)(?=[\s'"`)}!]|$)/g;

const ICON = /(\[&\S*?svg\S*?\]:size-\d+(?:\.\d+)?)(?=[\s'"`)}!]|$)/g;

const ALLOWED = new Set(['0', '0.5']);

export function scaleViolations(source: string): string[] {
    const found: string[] = [];

    for (const [, prefix, negative, utility, value] of source.matchAll(
        SPACING,
    )) {
        if (negative === '' && !ALLOWED.has(value)) {
            found.push(`${prefix}${utility}-${value}`);
        }
    }

    for (const [, icon] of source.matchAll(ICON)) {
        found.push(icon);
    }

    return found;
}
