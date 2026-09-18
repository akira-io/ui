import { readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';

const RELATIVE_SPECIFIER =
    /(?:\bfrom|\bimport)\s*\(?\s*["'](\.\.?\/[^"']+)["']/g;

export function importGraph(
    base: string,
    entry: string,
    visited = new Set<string>(),
    toFile: (specifier: string) => string = (specifier) => specifier,
): string[] {
    if (visited.has(entry)) {
        return [...visited];
    }

    visited.add(entry);

    const content = readFileSync(resolve(base, entry), 'utf8');

    for (const [, specifier] of content.matchAll(RELATIVE_SPECIFIER)) {
        importGraph(
            base,
            join(dirname(entry), toFile(specifier)),
            visited,
            toFile,
        );
    }

    return [...visited];
}
