import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

import * as serverEntry from '@/shells-server';

const root = resolve(fileURLToPath(import.meta.url), '../..');

describe('the shells server entry', () => {
    it('ships from its own subpath', () => {
        const { exports } = JSON.parse(
            readFileSync(resolve(root, 'package.json'), 'utf8'),
        );

        expect(exports).toHaveProperty(['./shells/server'], {
            types: './dist/shells-server.d.ts',
            import: './dist/shells-server.js',
        });
    });

    it('stays callable from React Server Components, chunks included', () => {
        const entry = readFileSync(
            resolve(root, 'dist/shells-server.js'),
            'utf8',
        );
        const chunks = [
            ...entry.matchAll(/(?:from|import)\s*\(?\s*['"]\.\/([^'"]+)['"]/g),
        ].map((match) => match[1]);
        const clientDirective = /^\s*['"]use client['"]/;

        expect(chunks.length).toBeGreaterThan(0);
        expect(entry).not.toMatch(clientDirective);
        chunks.forEach((chunk) => {
            expect(
                readFileSync(resolve(root, 'dist', chunk), 'utf8'),
                chunk,
            ).not.toMatch(clientDirective);
        });
    });

    it('exposes the cookie reader', () => {
        expect(serverEntry.readSidebarState('sidebar_state=false')).toBe(false);
        expect(serverEntry.SIDEBAR_COOKIE_NAME).toBe('sidebar_state');
    });
});
