import { readdirSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..');

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
