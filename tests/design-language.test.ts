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
    'rounded-[2.5rem]',
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

    it('states a reason for every shape exception', () => {
        for (const entry of EXCEPTIONS) {
            expect(entry.reason.length).toBeGreaterThan(0);
        }
    });
});
