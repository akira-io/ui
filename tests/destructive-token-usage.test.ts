import { readdirSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const here = dirname(fileURLToPath(import.meta.url));
const srcDir = resolve(here, '../src');

function sourceFiles(directory: string): string[] {
    return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
        const path = join(directory, entry.name);

        if (entry.isDirectory()) {
            return sourceFiles(path);
        }

        return entry.name.endsWith('.tsx') ? [path] : [];
    });
}

function offendingLines(path: string): string[] {
    return readFileSync(path, 'utf8')
        .split('\n')
        .filter(
            (line) =>
                line.includes('destructive-foreground') &&
                !line.includes('bg-destructive'),
        )
        .map((line) => `${path.slice(srcDir.length + 1)}: ${line.trim()}`);
}

describe('destructive token usage', () => {
    it('never places the destructive foreground on a surface that is not destructive', () => {
        const offenders = sourceFiles(srcDir).flatMap(offendingLines);

        expect(offenders).toEqual([]);
    });
});
