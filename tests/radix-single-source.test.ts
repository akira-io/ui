import { readdirSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

function sources(dir: string): string[] {
    return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
        const path = resolve(dir, entry.name);

        if (entry.isDirectory()) {
            return sources(path);
        }

        return /\.tsx?$/.test(entry.name) ? [path] : [];
    });
}

describe('the Radix primitives', () => {
    it('all come from the radix-ui package, so a menu inside a dialog shares its focus scope', () => {
        const strays = sources(resolve(process.cwd(), 'src')).filter((file) =>
            /from '@radix-ui\//.test(readFileSync(file, 'utf8')),
        );

        expect(strays).toEqual([]);
    });

    it('depends on no standalone @radix-ui package next to radix-ui', () => {
        const manifest = JSON.parse(
            readFileSync(resolve(process.cwd(), 'package.json'), 'utf8'),
        ) as Record<string, Record<string, string> | undefined>;
        const names = ['dependencies', 'peerDependencies', 'devDependencies']
            .flatMap((field) => Object.keys(manifest[field] ?? {}))
            .filter((name) => name.startsWith('@radix-ui/'));

        expect(names).toEqual([]);
    });
});
