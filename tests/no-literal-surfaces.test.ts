import { readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const PROPERTIES = [
    'bg',
    'text',
    'border',
    'ring',
    'fill',
    'stroke',
    'divide',
    'outline',
    'shadow',
    'accent',
    'placeholder',
    'caret',
    'decoration',
    'from',
    'via',
    'to',
];

const NEUTRALS = ['zinc', 'neutral', 'gray', 'slate', 'stone'];

const CLASS_PATTERN = new RegExp(
    `(?:^|[\\s'"\`])((?:[\\w-]+(?:-\\[[^\\]]*\\])?:)*(?:${PROPERTIES.join('|')})-(?:white|black|(?:${NEUTRALS.join('|')})-\\d+)(?:/\\d+)?)`,
    'g',
);

interface Allowed {
    file: string;
    className: string;
    reason: string;
}

const ALLOW_LIST: Allowed[] = [
    {
        file: 'src/components/ui/dialog.tsx',
        className: 'bg-black/60',
        reason: 'modal scrim is a fixed black veil, not a themed surface',
    },
    {
        file: 'src/components/ui/sheet.tsx',
        className: 'bg-black/60',
        reason: 'modal scrim is a fixed black veil, not a themed surface',
    },
    {
        file: 'src/components/ui/alert-dialog.tsx',
        className: 'bg-black/60',
        reason: 'modal scrim is a fixed black veil, not a themed surface',
    },
    {
        file: 'src/components/ui/drawer.tsx',
        className: 'bg-black/60',
        reason: 'modal scrim is a fixed black veil, not a themed surface',
    },
];

const srcDir = fileURLToPath(new URL('../src', import.meta.url));

function collectTsxFiles(dir: string): string[] {
    const files: string[] = [];

    for (const entry of readdirSync(dir, { withFileTypes: true })) {
        const entryPath = `${dir}/${entry.name}`;

        if (entry.isDirectory()) {
            files.push(...collectTsxFiles(entryPath));
            continue;
        }

        if (entry.isFile() && entryPath.endsWith('.tsx')) {
            files.push(entryPath);
        }
    }

    return files;
}

function isAllowed(file: string, className: string): boolean {
    return ALLOW_LIST.some(
        (entry) => entry.file === file && entry.className === className,
    );
}

interface Violation {
    file: string;
    line: number;
    className: string;
}

function findViolations(): Violation[] {
    const violations: Violation[] = [];

    for (const filePath of collectTsxFiles(srcDir)) {
        const relativePath = `src/${filePath.slice(srcDir.length + 1)}`;
        const lines = readFileSync(filePath, 'utf8').split('\n');

        lines.forEach((line, index) => {
            for (const match of line.matchAll(CLASS_PATTERN)) {
                const className = match[1];

                if (isAllowed(relativePath, className)) {
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

describe('literal surface colors', () => {
    it('never paints a surface with a literal color instead of a token', () => {
        const violations = findViolations();

        if (violations.length > 0) {
            const report = violations
                .map((v) => `${v.file}:${v.line} ${v.className}`)
                .join('\n');

            throw new Error(
                `${violations.length} literal surface class(es) found:\n${report}`,
            );
        }

        expect(violations).toEqual([]);
    });

    it('states a reason for every allowed literal', () => {
        for (const entry of ALLOW_LIST) {
            expect(entry.reason.length).toBeGreaterThan(0);
        }
    });

    it('keeps the allow list free of entries that no longer apply', () => {
        for (const entry of ALLOW_LIST) {
            const filePath = fileURLToPath(
                new URL(`../${entry.file}`, import.meta.url),
            );

            expect(readFileSync(filePath, 'utf8')).toContain(entry.className);
        }
    });
});
