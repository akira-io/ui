import { readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const HUES = [
    'red',
    'rose',
    'orange',
    'amber',
    'yellow',
    'green',
    'emerald',
    'teal',
    'cyan',
    'sky',
    'blue',
    'indigo',
    'violet',
    'purple',
    'fuchsia',
    'pink',
];

const CLASS_PATTERN = new RegExp(
    `[a-zA-Z][\\w:\\[\\]='".!/-]*-(?:${HUES.join('|')})-\\d+(?:/\\d+)?`,
    'g',
);

const srcDir = fileURLToPath(new URL('../src', import.meta.url));

function collectTsxFiles(dir: string): string[] {
    const files: string[] = [];

    for (const entry of readdirSync(dir, { withFileTypes: true })) {
        const entryPath = `${dir}/${entry.name}`;

        if (entry.isDirectory()) {
            files.push(...collectTsxFiles(entryPath));
        } else if (entry.isFile() && entryPath.endsWith('.tsx')) {
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

    for (const filePath of collectTsxFiles(srcDir)) {
        const relativePath = `src/${filePath.slice(srcDir.length + 1)}`;
        const lines = readFileSync(filePath, 'utf8').split('\n');

        lines.forEach((line, index) => {
            const matches = line.match(CLASS_PATTERN);

            if (!matches) {
                return;
            }

            for (const className of matches) {
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

describe('brand literal color classes', () => {
    it('never hardcodes a Tailwind palette hue in a src component', () => {
        const violations = findViolations();

        if (violations.length > 0) {
            const report = violations
                .map((v) => `${v.file}:${v.line} ${v.className}`)
                .join('\n');

            throw new Error(
                `${violations.length} hardcoded palette class(es) found:\n${report}`,
            );
        }

        expect(violations).toEqual([]);
    });
});
