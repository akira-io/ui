import { execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { beforeAll, describe, expect, it } from 'vitest';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const INTERACTIVE_ENTRIES = [
    'dist/index.js',
    'dist/code.js',
    'dist/blocks.js',
    'dist/editor.js',
    'dist/shells.js',
    'dist/inertia.js',
];

beforeAll(() => {
    execSync('bun run build', { cwd: root, stdio: 'inherit' });
});

describe('the client directive', () => {
    it.each(INTERACTIVE_ENTRIES)(
        'survives the build in %s, so the Next App Router can render it',
        (entry) => {
            const path = resolve(root, entry);

            expect(readFileSync(path, 'utf8').startsWith(`'use client'`)).toBe(
                true,
            );
        },
    );
});
