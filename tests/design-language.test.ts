import { readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const ALLOWED_RADII = [
    'rounded-none',
    'rounded-md',
    'rounded-xl',
    'rounded-2xl',
    'rounded-3xl',
    'rounded-full',
    'rounded-[inherit]',
];

const ALLOWED_WEIGHTS = [
    'font-normal',
    'font-medium',
    'font-semibold',
    'font-bold',
];

const RADIUS_PATTERN =
    /(?:^|[\s'"`])((?:[\w-]+(?:-\[[^\]]*\])?:)*rounded(?:-[trbl]{1,2})?(?:-(?:none|xs|sm|md|lg|xl|2xl|3xl|full|\[[^\]]+\]))?)/g;

const WEIGHT_PATTERN =
    /(?:^|[\s'"`])((?:[\w-]+(?:-\[[^\]]*\])?:)*font-(?:thin|extralight|light|normal|medium|semibold|bold|extrabold|black))/g;

const RING_PATTERN =
    /(?:^|[\s'"`])((?:[\w-]+(?:-\[[^\]]*\])?:)*(?:ring-\d+|ring-offset-\d+|ring-offset-[a-z]+))/g;

interface Exception {
    file: string;
    className: string;
    reason: string;
}

const EXCEPTIONS: Exception[] = [
    {
        file: 'src/components/ui/navigation-menu.tsx',
        className: 'rounded-tl-xs',
        reason: 'rotated 8px arrow tip, a shape rather than a surface corner',
    },
    {
        file: 'src/components/ui/tooltip.tsx',
        className: 'rounded-[2px]',
        reason: 'rotated 10px arrow tip, a shape rather than a surface corner',
    },
    {
        file: 'src/components/ui/chart.tsx',
        className: 'rounded-[2px]',
        reason: 'legend and tooltip color swatches, 10px marks not surfaces',
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

function baseUtility(className: string): string {
    const withoutVariants = className.slice(className.lastIndexOf(':') + 1);

    return withoutVariants.replace(/^rounded-([trbl]{1,2})-/, 'rounded-');
}

function isException(file: string, className: string): boolean {
    const utility = className.slice(className.lastIndexOf(':') + 1);

    return EXCEPTIONS.some(
        (entry) => entry.file === file && utility === entry.className,
    );
}

interface Violation {
    file: string;
    line: number;
    className: string;
}

function scan(pattern: RegExp, allow: (utility: string) => boolean) {
    const violations: Violation[] = [];

    for (const filePath of collectTsxFiles(srcDir)) {
        const relativePath = `src/${filePath.slice(srcDir.length + 1)}`;
        const lines = readFileSync(filePath, 'utf8').split('\n');

        lines.forEach((line, index) => {
            for (const match of line.matchAll(new RegExp(pattern))) {
                const className = match[1];

                if (
                    allow(baseUtility(className)) ||
                    isException(relativePath, className)
                ) {
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

function report(violations: Violation[]): string {
    return violations
        .map((v) => `${v.file}:${v.line} ${v.className}`)
        .join('\n');
}

const CLIP_PATTERN =
    /(?:^|[\s'"`])((?:[\w-]+(?:-\[[^\]]*\])?:)*overflow(?:-[xy])?-(?:hidden|auto|scroll|clip))/g;

const RADIUS_SOURCES = [
    'elevatedSurface',
    'recessedSurface',
    'nestedRadius',
    'modalSurface',
    'panelSurface',
    'menuSurface',
];

const CLIP_EXCEPTIONS: Exception[] = [
    {
        file: 'src/components/ui/accordion.tsx',
        className: 'overflow-hidden',
        reason: 'height animation clip on a panel inset by the root padding, so it has no corners of its own',
    },
    {
        file: 'src/components/ui/command.tsx',
        className: 'overflow-hidden',
        reason: 'group list section inset by its own padding inside the command surface, so it has no corners of its own',
    },
    {
        file: 'src/components/ui/command.tsx',
        className: 'overflow-x-hidden',
        reason: 'scroll region flush inside the command surface, which already clips on the surface radius',
    },
    {
        file: 'src/components/ui/command.tsx',
        className: 'overflow-y-auto',
        reason: 'scroll region flush inside the command surface, which already clips on the surface radius',
    },
    {
        file: 'src/components/ui/sidebar.tsx',
        className: 'overflow-auto',
        reason: 'full height page region rather than a floating panel, so it has square corners by design',
    },
    {
        file: 'src/components/ui/navigation-menu.tsx',
        className: 'overflow-hidden',
        reason: 'clips the rotated arrow tip, a shape rather than a surface corner',
    },
    {
        file: 'src/components/ui/sidebar.tsx',
        className: 'group-data-[collapsible=icon]:overflow-hidden',
        reason: 'full height page region rather than a floating panel, so it has square corners by design',
    },
];

const COMPOSER = /(?:^|[^\w$])(cn|cva|[A-Za-z]\w*Variants)$/;

function groupEnd(source: string, start: number): number {
    let depth = 0;

    for (let cursor = start; cursor < source.length; cursor += 1) {
        if (source[cursor] === '(') {
            depth += 1;
            continue;
        }

        if (source[cursor] !== ')') {
            continue;
        }

        depth -= 1;

        if (depth === 0) {
            return cursor + 1;
        }
    }

    return source.length;
}

function enclosingExpression(source: string, at: number): string {
    const open: number[] = [];
    let literal = 0;
    let quote = '';
    let index = 0;

    while (index < at) {
        const char = source[index];

        if (quote) {
            if (char === '\\') {
                index += 2;
                continue;
            }

            if (char === quote) {
                quote = '';
            }

            index += 1;
            continue;
        }

        if (char === "'" || char === '"' || char === '`') {
            quote = char;
            literal = index;
        }

        if (char === '(') {
            open.push(index);
        }

        if (char === ')') {
            open.pop();
        }

        index += 1;
    }

    for (let depth = open.length - 1; depth >= 0; depth -= 1) {
        const start = open[depth];

        if (COMPOSER.test(source.slice(0, start))) {
            return source.slice(start, groupEnd(source, start));
        }
    }

    return source.slice(literal, source.indexOf(quote || '"', at + 1) + 1);
}

function carriesRadius(expression: string): boolean {
    if (RADIUS_SOURCES.some((name) => expression.includes(name))) {
        return true;
    }

    for (const match of expression.matchAll(new RegExp(RADIUS_PATTERN))) {
        if (baseUtility(match[1]) !== 'rounded-none') {
            return true;
        }
    }

    return false;
}

function scanClips(): Violation[] {
    const violations: Violation[] = [];

    for (const filePath of collectTsxFiles(srcDir)) {
        const relativePath = `src/${filePath.slice(srcDir.length + 1)}`;
        const source = readFileSync(filePath, 'utf8');

        for (const match of source.matchAll(CLIP_PATTERN)) {
            const className = match[1];
            const at = match.index ?? 0;

            const excepted = CLIP_EXCEPTIONS.some(
                (entry) =>
                    entry.file === relativePath &&
                    entry.className === className,
            );

            if (excepted || carriesRadius(enclosingExpression(source, at))) {
                continue;
            }

            violations.push({
                file: relativePath,
                line: source.slice(0, at).split('\n').length,
                className,
            });
        }
    }

    return violations;
}

describe('design language', () => {
    it('draws every corner from the radius scale', () => {
        const violations = scan(RADIUS_PATTERN, (utility) =>
            ALLOWED_RADII.includes(utility),
        );

        expect(report(violations)).toBe('');
    });

    it('draws every weight from the four step scale', () => {
        const violations = scan(WEIGHT_PATTERN, (utility) =>
            ALLOWED_WEIGHTS.includes(utility),
        );

        expect(report(violations)).toBe('');
    });

    it('never invents a focus ring width or offset', () => {
        const violations = scan(
            RING_PATTERN,
            (utility) => utility === 'ring-0',
        );

        expect(report(violations)).toBe('');
    });

    it('gives every clip the radius of the surface it belongs to', () => {
        expect(report(scanClips())).toBe('');
    });

    it('states a reason for every clip exception', () => {
        for (const entry of CLIP_EXCEPTIONS) {
            expect(entry.reason.length).toBeGreaterThan(0);
            expect(
                readFileSync(
                    fileURLToPath(new URL(`../${entry.file}`, import.meta.url)),
                    'utf8',
                ),
            ).toContain(entry.className);
        }
    });

    it('states a reason for every shape exception', () => {
        for (const entry of EXCEPTIONS) {
            expect(entry.reason.length).toBeGreaterThan(0);
        }
    });
});
