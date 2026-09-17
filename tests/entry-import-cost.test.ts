import { readdirSync, readFileSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const root = fileURLToPath(new URL('..', import.meta.url));

const DYNAMIC_IMPORT = /\bimport\(\s*(['"`])([^'"`]+)\1/g;

function publicEntries(): Map<string, string> {
    const config = readFileSync(resolve(root, 'tsup.config.ts'), 'utf8');
    const block = config.match(/entry:\s*\{([^}]*)\}/);

    if (!block) {
        throw new Error('no entry map in tsup.config.ts');
    }

    return new Map(
        [...block[1].matchAll(/'(src\/(.+?))\.ts'/g)].map((match) => [
            resolve(root, match[1]),
            match[2],
        ]),
    );
}

const entries = publicEntries();

function resolveSpecifier(from: string, specifier: string): string | null {
    if (specifier.startsWith('@/')) {
        return resolve(root, 'src', specifier.slice(2));
    }

    if (specifier.startsWith('.')) {
        return resolve(dirname(from), specifier);
    }

    return null;
}

function dynamicallyImportedEntries(path: string): string[] {
    const content = readFileSync(path, 'utf8');
    const found: string[] = [];

    for (const [, , specifier] of content.matchAll(DYNAMIC_IMPORT)) {
        const target = resolveSpecifier(path, specifier);

        if (!target) {
            continue;
        }

        const entry = entries.get(target);

        if (entry) {
            found.push(entry);
        }
    }

    return found;
}

function filesUnder(directory: string, keep: RegExp): string[] {
    return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
        const path = join(directory, entry.name);

        if (entry.isDirectory()) {
            return entry.name === 'fixtures' ? [] : filesUnder(path, keep);
        }

        return keep.test(entry.name) ? [path] : [];
    });
}

const scanned = [
    ...filesUnder(resolve(root, 'src'), /\.test\.tsx?$/),
    ...filesUnder(resolve(root, 'tests'), /\.tsx?$/),
].filter((path) => !path.endsWith('global-setup.ts'));

describe('the public entries', () => {
    it.each([...entries.values()])(
        'never reach a test through a dynamic import, since the cold transform of the @/%s barrel lands on whichever test awaits it, inside the 5s timeout',
        (entry) => {
            const offenders = scanned
                .filter((path) =>
                    dynamicallyImportedEntries(path).includes(entry),
                )
                .map((path) => relative(root, path));

            expect(offenders).toEqual([]);
        },
    );

    it('are recognised behind an alias, a relative path, a template literal and a nested entry name, so rewriting the specifier is not a way around the rule', () => {
        const fixtures = resolve(root, 'tests/fixtures/dynamic-entry-import');
        const found = readdirSync(fixtures)
            .sort()
            .map((name) => [
                name,
                dynamicallyImportedEntries(join(fixtures, name)),
            ]);

        expect(found).toEqual([
            ['alias.ts', ['inertia']],
            ['nested-entry.ts', ['locales/fr']],
            ['relative.ts', ['inertia']],
            ['sibling-of-an-entry.ts', []],
            ['template-literal.ts', ['blocks']],
        ]);
    });
});
