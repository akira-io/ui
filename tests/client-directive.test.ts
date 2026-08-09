import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const INTERACTIVE_ENTRIES = [
    'dist/index.js',
    'dist/code.js',
    'dist/blocks.js',
    'dist/editor.js',
    'dist/shells.js',
    'dist/inertia.js',
];

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

    it('does not carry the client directive into the pure-data locale bundle', () => {
        const path = resolve(root, 'dist/locales/pt.js');

        expect(readFileSync(path, 'utf8').startsWith(`'use client'`)).toBe(
            false,
        );
    });
});
