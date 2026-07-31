import { readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const ELEVATION_CLASSES = ['shadow-2xl', 'backdrop-blur-xl'];

interface Allowed {
    file: string;
    reason: string;
}

const ALLOW_LIST: Allowed[] = [
    {
        file: 'src/components/ui/menubar.tsx',
        reason: 'the bar is a control strip anchored in the page, not a layer floating over it',
    },
    {
        file: 'src/components/ui/navigation-menu.tsx',
        reason: 'the viewport=false variant needs a group- prefix on every class, which an interpolated string cannot carry',
    },
    {
        file: 'src/components/ui/sonner.tsx',
        reason: 'the surface is applied through a descendant selector onto nodes the toaster owns',
    },
    {
        file: 'src/components/ui/tooltip.tsx',
        reason: 'a tooltip is filled with the primary color and is the one surface that does not read as a panel',
    },
];

const srcDir = fileURLToPath(new URL('../src', import.meta.url));
const languageFile = 'src/lib/language.ts';

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

interface Violation {
    file: string;
    line: number;
    className: string;
}

function findViolations(): Violation[] {
    const violations: Violation[] = [];
    const allowed = new Set(ALLOW_LIST.map((entry) => entry.file));

    for (const filePath of collectSourceFiles(srcDir)) {
        const relativePath = `src/${filePath.slice(srcDir.length + 1)}`;

        if (relativePath === languageFile || allowed.has(relativePath)) {
            continue;
        }

        readFileSync(filePath, 'utf8')
            .split('\n')
            .forEach((line, index) => {
                for (const className of ELEVATION_CLASSES) {
                    if (!line.includes(className)) {
                        continue;
                    }

                    violations.push({
                        file: relativePath,
                        line: index + 1,
                        className,
                    });
                }
            });
    }

    return violations;
}

describe('surface composition', () => {
    it('never hand-draws an elevated surface outside the language module', () => {
        const violations = findViolations();

        if (violations.length > 0) {
            const report = violations
                .map((v) => `${v.file}:${v.line} ${v.className}`)
                .join('\n');

            throw new Error(
                `${violations.length} hand-drawn elevation(s) found. Compose from src/lib/language.ts instead:\n${report}`,
            );
        }

        expect(violations).toEqual([]);
    });

    it('states a reason for every file allowed to draw its own elevation', () => {
        for (const entry of ALLOW_LIST) {
            expect(entry.reason.length).toBeGreaterThan(0);
        }
    });

    it('keeps the allow list free of files that no longer draw elevation', () => {
        for (const entry of ALLOW_LIST) {
            const source = readFileSync(
                fileURLToPath(new URL(`../${entry.file}`, import.meta.url)),
                'utf8',
            );

            expect(
                ELEVATION_CLASSES.some((className) =>
                    source.includes(className),
                ),
            ).toBe(true);
        }
    });

    it('gives every floating surface the ring that separates it from the page', () => {
        const language = readFileSync(
            fileURLToPath(new URL(`../${languageFile}`, import.meta.url)),
            'utf8',
        );

        for (const name of [
            'elevatedSurface',
            'floatingSurface',
            'modalSurface',
            'panelSurface',
            'menuSurface',
        ]) {
            const declaration = language.match(
                new RegExp(`export const ${name} =([^;]*);`),
            );

            expect(declaration?.[1]).toBeDefined();
            expect(declaration?.[1]).toMatch(
                /glassEdge|floatingSurface|panelSurface/,
            );
        }
    });
});
