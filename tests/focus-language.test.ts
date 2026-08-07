import { readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

import { fieldFocus, focusRing } from '../src/lib/language';

const INDICATOR =
    /(?:^|[\s'"`])((?:focus|focus-visible|has-focus):(?:ring|border-ring|shadow)[\w./[\]-]*)/g;

const SUPPRESSIONS = ['focus:ring-0', 'focus-visible:ring-0'];

const srcDir = fileURLToPath(new URL('../src', import.meta.url));
const languageFile = `${srcDir}/lib/language.ts`;

function collectSourceFiles(dir: string): string[] {
    const files: string[] = [];

    for (const entry of readdirSync(dir, { withFileTypes: true })) {
        const entryPath = `${dir}/${entry.name}`;

        if (entry.isDirectory()) {
            files.push(...collectSourceFiles(entryPath));
            continue;
        }

        if (entry.isFile() && /\.tsx?$/.test(entryPath)) {
            files.push(entryPath);
        }
    }

    return files;
}

function competingDeclarations(): string[] {
    return collectSourceFiles(srcDir)
        .filter((path) => path !== languageFile && !/\.test\.tsx?$/.test(path))
        .flatMap((path) => {
            const source = readFileSync(path, 'utf8');

            return [...source.matchAll(INDICATOR)]
                .map((match) => match[1])
                .filter((utility) => !SUPPRESSIONS.includes(utility))
                .map(
                    (utility) => `${path.slice(srcDir.length + 1)}: ${utility}`,
                );
        });
}

describe('one focus treatment', () => {
    it('is declared nowhere but the language', () => {
        expect(competingDeclarations()).toEqual([]);
    });

    it('draws a one pixel edge in the ring token, fully opaque', () => {
        expect(focusRing).toContain('focus-visible:outline-1');
        expect(focusRing).toContain('focus-visible:outline-ring');
        expect(focusRing).not.toMatch(/outline-ring\/\d/);
    });

    it('pins the outline style, because controls carry outline-hidden', () => {
        expect(focusRing).toContain('focus-visible:outline-solid');
    });

    it('sits on the control edge rather than floating off it', () => {
        expect(focusRing).toContain('focus-visible:outline-offset-0');
    });

    it('uses outline so the ring and the shadow stop sharing box-shadow', () => {
        expect(focusRing).not.toMatch(/focus-visible:ring-/);
    });
});

describe('the two focus treatments', () => {
    it('share one edge, so a field and a button focus alike', () => {
        for (const utility of focusRing.split(' ')) {
            expect(fieldFocus).toContain(utility);
        }
    });

    it('lift a field on focus', () => {
        expect(fieldFocus).toContain(
            'focus-visible:shadow-(--glass-elevation)',
        );
    });

    it('never lift a button, which would read as pressed', () => {
        expect(focusRing).not.toContain('shadow');
    });
});

describe('the controls that carry outline-hidden', () => {
    it('still exist, so outline-solid is load bearing rather than defensive', () => {
        const carriers = collectSourceFiles(srcDir)
            .filter((path) => !/\.test\.tsx?$/.test(path))
            .filter((path) =>
                /(?:^|[\s'"`])outline-(?:hidden|none)(?:[\s'"`]|$)/.test(
                    readFileSync(path, 'utf8'),
                ),
            );

        expect(carriers.length).toBeGreaterThan(0);
    });
});
