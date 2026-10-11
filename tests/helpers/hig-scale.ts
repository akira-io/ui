const SPACING =
    /(?:^|[\s'"`{(!])((?:[^\s'"`]*:)?)(-?)(p|px|py|pt|pb|pl|pr|ps|pe|m|mx|my|mt|mb|ml|mr|ms|me|gap|gap-x|gap-y|space-x|space-y)-(\d+(?:\.\d+)?)(?=[\s'"`)}!]|$)/g;

const ICON_SELECTOR =
    /(\[&\S*?svg\S*?\]:(?:size|h|w)-(\d+(?:\.\d+)?))(?=[\s'"`)}!]|$)/g;

const ICON_COMPONENTS = ['Icon', '\\w+\\.(?:icon|Icon)'];

const ICON_CLASS = /(?<![\w-])(size|h|w)-(\d+(?:\.\d+)?)(?![\w.-])/g;

const LUCIDE_IMPORT = /import\s*\{([^}]*)\}\s*from\s*['"]lucide-react['"]/g;

const SPACING_ALLOWED = new Set(['0', '0.5']);

const ICON_ALLOWED = new Set(['2', '2.5']);

export interface ScaleViolations {
    spacing: string[];
    icon: string[];
}

function iconSizeAllowed(value: string): boolean {
    return ICON_ALLOWED.has(value) || Number(value) >= 6;
}

function lucideNames(source: string): string[] {
    return [...source.matchAll(LUCIDE_IMPORT)].flatMap(([, names]) =>
        names
            .split(',')
            .map(
                (name) =>
                    name
                        .trim()
                        .split(/\s+as\s+/)
                        .pop() ?? '',
            )
            .filter(Boolean),
    );
}

function iconElementViolations(source: string): string[] {
    const names = [...lucideNames(source), ...ICON_COMPONENTS];

    return names.flatMap((name) =>
        [
            ...source.matchAll(new RegExp(`<(${name})\\b(?:=>|[^>])*>`, 'g')),
        ].flatMap(([tag, element]) =>
            [...tag.matchAll(ICON_CLASS)]
                .filter(([, , value]) => !iconSizeAllowed(value))
                .map(([, utility, value]) => `${element} ${utility}-${value}`),
        ),
    );
}

export function scaleViolations(source: string): ScaleViolations {
    const spacing: string[] = [];

    for (const [, prefix, negative, utility, value] of source.matchAll(
        SPACING,
    )) {
        if (negative === '' && !SPACING_ALLOWED.has(value)) {
            spacing.push(`${prefix}${utility}-${value}`);
        }
    }

    const selectors = [...source.matchAll(ICON_SELECTOR)]
        .filter(([, , value]) => !iconSizeAllowed(value))
        .map(([, selector]) => selector);

    return { spacing, icon: [...selectors, ...iconElementViolations(source)] };
}
