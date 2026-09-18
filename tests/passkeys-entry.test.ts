import { readdirSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const root = resolve(fileURLToPath(import.meta.url), '../..');

const PASSKEY_CLIENT = '@laravel/passkeys';

const BINDING = 'src/inertia-passkeys.ts';

function sourceFiles(directory: string): string[] {
    return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
        const path = join(directory, entry.name);

        if (entry.isDirectory()) {
            return sourceFiles(path);
        }

        return /\.tsx?$/.test(entry.name) && !/\.test\.tsx?$/.test(entry.name)
            ? [path]
            : [];
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

describe('the passkey client', () => {
    it('is an optional peer, so an app without passkeys never installs it', () => {
        const { dependencies, peerDependencies, peerDependenciesMeta } =
            packageJson();

        expect(dependencies).not.toHaveProperty(PASSKEY_CLIENT);
        expect(peerDependencies).toHaveProperty(PASSKEY_CLIENT);
        expect(peerDependenciesMeta[PASSKEY_CLIENT]?.optional).toBe(true);
    });

    it('is left to the consuming app by the build', () => {
        expect(readFileSync(resolve(root, 'tsup.config.ts'), 'utf8')).toContain(
            `'${PASSKEY_CLIENT}'`,
        );
    });

    it('is imported by the passkey binding alone, and nothing imports the binding', () => {
        const offenders = sourceFiles(resolve(root, 'src'))
            .map((path) => path.slice(root.length + 1))
            .filter((path) => path !== BINDING)
            .filter((path) => {
                const source = readFileSync(resolve(root, path), 'utf8');

                return (
                    source.includes(`'${PASSKEY_CLIENT}`) ||
                    source.includes("'@/inertia-passkeys'")
                );
            });

        expect(offenders).toEqual([]);
    });

    it('ships the binding from its own subpath', () => {
        expect(packageJson().exports).toHaveProperty(['./inertia/passkeys'], {
            types: './dist/inertia-passkeys.d.ts',
            import: './dist/inertia-passkeys.js',
        });
    });

    it('keeps the client directive on the built binding', () => {
        expect(
            readFileSync(resolve(root, 'dist/inertia-passkeys.js'), 'utf8'),
        ).toMatch(/^'use client'/);
    });
});
