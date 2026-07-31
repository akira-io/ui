import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..');

function packageJson(): {
    dependencies: Record<string, string>;
    peerDependencies: Record<string, string>;
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
];

describe('bundle boundaries', () => {
    it.each(COMPOSED_BY_CONSUMERS)('leaves %s to the consuming app', (name) => {
        expect(tsupExternals()).toContain(name);
    });

    it.each(COMPOSED_BY_CONSUMERS)('declares %s as a peer', (name) => {
        const { dependencies, peerDependencies } = packageJson();

        expect(peerDependencies).toHaveProperty(name);
        expect(dependencies).not.toHaveProperty(name);
    });
});
