import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const SURFACE_SOURCES = [
    'elevatedSurface',
    'floatingSurface',
    'modalSurface',
    'panelSurface',
    'menuSurface',
    'recessedSurface',
];

const SURFACE_CLASS =
    /(?:^|[\s'"`])(bg-card|bg-popover|shadow-|ring-1|rounded-(?:xl|2xl|3xl)|backdrop-blur|p-\d)/;

interface Primitive {
    file: string;
    component: string;
}

const BEHAVIOUR_PRIMITIVES: Primitive[] = [
    { file: 'src/components/ui/collapsible.tsx', component: 'Collapsible' },
];

function componentBody(source: string, component: string): string {
    const start = source.indexOf(`function ${component}(`);
    const next = source.indexOf('\nfunction ', start + 1);

    return source.slice(start, next === -1 ? source.length : next);
}

describe('behaviour primitives', () => {
    it.each(BEHAVIOUR_PRIMITIVES)(
        '$component carries no surface of its own',
        ({ file, component }) => {
            const source = readFileSync(
                fileURLToPath(new URL(`../${file}`, import.meta.url)),
                'utf8',
            );
            const body = componentBody(source, component);

            expect(body).not.toMatch(SURFACE_CLASS);
            for (const name of SURFACE_SOURCES) {
                expect(body).not.toContain(name);
            }
        },
    );

    it.each(BEHAVIOUR_PRIMITIVES)(
        '$component is not undone by the shells that compose it',
        ({ component }) => {
            const shell = readFileSync(
                fileURLToPath(
                    new URL('../src/shells/nav-main.tsx', import.meta.url),
                ),
                'utf8',
            );
            const usage = shell.slice(shell.indexOf(`<${component} `));

            expect(usage.slice(0, usage.indexOf('>'))).not.toMatch(
                /bg-transparent|shadow-none|ring-0|rounded-none/,
            );
        },
    );
});
