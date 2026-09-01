import { readdirSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..');

const RELATIVE_SPECIFIER =
    /(?:\bfrom|\bimport)\s*\(?\s*["'](\.\.?\/[^"']+)["']/g;

function importGraph(
    base: string,
    entry: string,
    visited = new Set<string>(),
): string[] {
    if (visited.has(entry)) {
        return [...visited];
    }

    visited.add(entry);

    const content = readFileSync(resolve(base, entry), 'utf8');

    for (const [, specifier] of content.matchAll(RELATIVE_SPECIFIER)) {
        importGraph(base, join(dirname(entry), specifier), visited);
    }

    return [...visited];
}

function sourceFiles(directory: string): string[] {
    return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
        const path = join(directory, entry.name);

        if (entry.isDirectory()) {
            return sourceFiles(path);
        }

        return /\.tsx?$/.test(entry.name) ? [path] : [];
    });
}

function packageJson(): {
    dependencies: Record<string, string>;
    peerDependencies: Record<string, string>;
    peerDependenciesMeta: Record<string, { optional?: boolean }>;
    exports: Record<string, unknown>;
} {
    return JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf8'));
}

function tsupExternals(): string[] {
    const config = readFileSync(resolve(root, 'tsup.config.ts'), 'utf8');
    const block = config.match(/external:\s*\[([^\]]*)\]/);

    if (!block) {
        throw new Error('no external array in tsup.config.ts');
    }

    return [...block[1].matchAll(/'([^']+)'/g)].map((match) => match[1]);
}

const COMPOSED_BY_CONSUMERS = [
    'recharts',
    'react',
    'react-dom',
    'react-hook-form',
    '@tanstack/react-table',
];

const INSTALLED_ONLY_FOR_THE_EDITOR = [
    '@tiptap/core',
    '@tiptap/pm',
    '@tiptap/react',
    '@tiptap/starter-kit',
];

const OPTIONAL_FRAMEWORK_BINDINGS = ['@inertiajs/react'];

const TYPES_THE_API_EXPOSES = [
    'Column',
    'ColumnDef',
    'FilterFn',
    'LucideIcon',
    'Row',
    'TableInstance',
];

describe('theme coupling', () => {
    it('does not depend on next-themes', () => {
        const { dependencies, peerDependencies } = packageJson();

        expect(dependencies).not.toHaveProperty('next-themes');
        expect(peerDependencies).not.toHaveProperty('next-themes');
    });

    it('is not imported anywhere in the source', () => {
        const offenders = sourceFiles(resolve(root, 'src')).filter((path) =>
            readFileSync(path, 'utf8').includes('next-themes'),
        );

        expect(offenders).toEqual([]);
    });
});

describe('bundle boundaries', () => {
    it.each(COMPOSED_BY_CONSUMERS)('leaves %s to the consuming app', (name) => {
        expect(tsupExternals()).toContain(name);
    });

    it.each(COMPOSED_BY_CONSUMERS)('declares %s as a peer', (name) => {
        const { dependencies, peerDependencies } = packageJson();

        expect(peerDependencies).toHaveProperty(name);
        expect(dependencies).not.toHaveProperty(name);
    });

    it.each(INSTALLED_ONLY_FOR_THE_EDITOR)(
        'declares %s as an optional peer, so installing the package never pulls it in',
        (name) => {
            const { dependencies, peerDependencies, peerDependenciesMeta } =
                packageJson();

            expect(dependencies).not.toHaveProperty(name);
            expect(peerDependencies).toHaveProperty(name);
            expect(peerDependenciesMeta[name]?.optional).toBe(true);
            expect(tsupExternals()).toContain(name);
        },
    );

    it.each(['src/index.ts', 'src/blocks.ts', 'src/shells.ts'])(
        'keeps the editor out of %s, so a consumer who never imports it pays nothing',
        (entry) => {
            expect(readFileSync(resolve(root, entry), 'utf8')).not.toContain(
                'editor',
            );
        },
    );

    it.each(OPTIONAL_FRAMEWORK_BINDINGS)(
        'declares %s as an optional peer, so a Next or Astro app never installs it',
        (name) => {
            const { dependencies, peerDependencies, peerDependenciesMeta } =
                packageJson();

            expect(dependencies).not.toHaveProperty(name);
            expect(peerDependencies).toHaveProperty(name);
            expect(peerDependenciesMeta[name]?.optional).toBe(true);
            expect(tsupExternals()).toContain(name);
        },
    );

    it.each(['src/index.ts', 'src/blocks.ts', 'src/shells.ts'])(
        'keeps Inertia out of %s, so the blocks run under any framework',
        (entry) => {
            expect(readFileSync(resolve(root, entry), 'utf8')).not.toContain(
                '@inertiajs',
            );
        },
    );

    it.each(['dist/index.js', 'dist/blocks.js', 'dist/shells.js'])(
        'keeps Inertia out of the built %s and everything it transitively imports, so a transitive import cannot slip past the source-only check',
        (entry) => {
            const offenders = importGraph(root, entry).filter((file) =>
                readFileSync(resolve(root, file), 'utf8').includes(
                    '@inertiajs',
                ),
            );

            expect(offenders).toEqual([]);
        },
    );

    it('follows a bare side-effect import, a dynamic one and a parent-relative one, so a chunk that reaches Inertia through any of them is still caught', () => {
        const fixtures = resolve(root, 'tests/fixtures/import-graph');
        const graph = importGraph(fixtures, 'entry.js');

        expect(graph).toEqual([
            'entry.js',
            'nested/side-effect.js',
            'reaches-inertia.js',
            'lazily-imported.js',
        ]);
        expect(
            graph.filter((file) =>
                readFileSync(resolve(fixtures, file), 'utf8').includes(
                    '@inertiajs',
                ),
            ),
        ).toEqual(['reaches-inertia.js']);
    });

    it('never promises an Inertia range that predates the props src/inertia.ts passes', () => {
        const { peerDependencies } = packageJson();

        expect(peerDependencies['@inertiajs/react']).not.toMatch(/\^1\./);
        expect(peerDependencies['@inertiajs/react']).not.toMatch(
            /\^2\.1\.[01]\b/,
        );
        expect(peerDependencies['@inertiajs/react']).toBe('^2.1.2 || ^3.0.0');
    });

    it('never instantiates Inertia Form as a generic, since it is not one on the whole 2.x half of the promised peer range', () => {
        const code = readFileSync(resolve(root, 'src/inertia.ts'), 'utf8')
            .split('\n')
            .map((line) => line.replace(/\/\/.*$/, ''))
            .join('\n');

        expect(code).not.toMatch(/\bForm\s*<[^(]*>/);
    });

    it('ships the editor from its own subpath', () => {
        expect(packageJson().exports).toHaveProperty('./editor');
    });

    it.each(TYPES_THE_API_EXPOSES)(
        'exports %s, so a consumer never imports the library it comes from',
        (name) => {
            const entry = readFileSync(resolve(root, 'src/index.ts'), 'utf8');

            expect(entry).toMatch(new RegExp(`\\b${name}\\b`));
        },
    );
});
