import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import { findMissingExamples } from '../scripts/detect-missing-examples.mjs';

describe('findMissingExamples', () => {
    let uiRoot: string;
    let siteRoot: string;

    afterEach(() => {
        rmSync(uiRoot, { recursive: true, force: true });
        rmSync(siteRoot, { recursive: true, force: true });
    });

    function makeFixture() {
        uiRoot = mkdtempSync(join(tmpdir(), 'akira-ui-'));
        siteRoot = mkdtempSync(join(tmpdir(), 'akira-site-'));

        mkdirSync(join(uiRoot, 'src/components/ui'), { recursive: true });
        mkdirSync(join(uiRoot, 'src/blocks'), { recursive: true });
        mkdirSync(join(uiRoot, 'src/shells'), { recursive: true });

        writeFileSync(
            join(uiRoot, 'src/components/ui/button.tsx'),
            'export const Button = () => null;\n',
        );
        writeFileSync(
            join(uiRoot, 'src/components/ui/akira-mark.tsx'),
            'export const AkiraMark = () => null;\n',
        );
        writeFileSync(
            join(uiRoot, 'src/components/ui/cartesian-chart.tsx'),
            'export type ChartCurve = "linear";\n',
        );
        writeFileSync(
            join(uiRoot, 'src/components/ui/field-context.ts'),
            'export const useField = () => null;\n',
        );
        mkdirSync(join(uiRoot, 'src/components/ui/editor'), {
            recursive: true,
        });
        writeFileSync(
            join(uiRoot, 'src/components/ui/editor/rich-text-editor.tsx'),
            'export const RichTextEditor = () => null;\n',
        );
        writeFileSync(
            join(uiRoot, 'src/index.ts'),
            [
                "export * from '@/components/ui/button';",
                "export * from '@/components/ui/akira-mark';",
                "export type { ChartCurve } from '@/components/ui/cartesian-chart';",
                "export { useField } from '@/components/ui/field-context';",
            ].join('\n'),
        );
        writeFileSync(
            join(uiRoot, 'src/editor.ts'),
            "export { RichTextEditor } from '@/components/ui/editor/rich-text-editor';\n",
        );
        writeFileSync(join(uiRoot, 'src/code.ts'), '');
        writeFileSync(join(uiRoot, 'src/blocks.ts'), '');
        writeFileSync(join(uiRoot, 'src/shells.ts'), '');

        mkdirSync(join(siteRoot, 'src/demos/components/button'), {
            recursive: true,
        });
    }

    function writeBaseline(groups: Record<string, string[]>) {
        mkdirSync(join(siteRoot, 'tests'), { recursive: true });
        writeFileSync(
            join(siteRoot, 'tests/uncovered-entries.json'),
            JSON.stringify(groups),
        );
    }

    it('flags an exported component without a demo, skips a plain-.ts export', () => {
        makeFixture();

        expect(findMissingExamples(uiRoot, siteRoot)).toEqual([
            {
                group: 'components',
                slug: 'akira-mark',
                specifier: '@akira-io/ui',
            },
            {
                group: 'components',
                slug: 'editor',
                specifier: '@akira-io/ui/editor',
            },
        ]);
    });

    it('never flags a module the package exports only for its types', () => {
        makeFixture();

        const missing = findMissingExamples(uiRoot, siteRoot);

        expect(missing.some((entry) => entry.slug === 'cartesian-chart')).toBe(
            false,
        );
    });

    it('drops an entry the site records as deliberately uncovered', () => {
        makeFixture();
        writeBaseline({
            components: ['akira-mark'],
            blocks: [],
            shells: [],
        });

        expect(findMissingExamples(uiRoot, siteRoot)).toEqual([
            {
                group: 'components',
                slug: 'editor',
                specifier: '@akira-io/ui/editor',
            },
        ]);
    });

    it('keeps flagging an entry the baseline records under another group', () => {
        makeFixture();
        writeBaseline({ components: [], blocks: ['akira-mark'], shells: [] });

        expect(
            findMissingExamples(uiRoot, siteRoot).some(
                (entry) => entry.slug === 'akira-mark',
            ),
        ).toBe(true);
    });

    it('recognizes a component whose visual source is a directory of files', () => {
        makeFixture();

        const missing = findMissingExamples(uiRoot, siteRoot);

        expect(missing.some((entry) => entry.slug === 'editor')).toBe(true);
    });

    it('ignores a slug that would not be a valid JS identifier', () => {
        makeFixture();
        mkdirSync(join(siteRoot, 'src/demos/components/editor'), {
            recursive: true,
        });
        writeFileSync(
            join(uiRoot, 'src/components/ui/3d-card.tsx'),
            'export const ThreeDCard = () => null;\n',
        );
        writeFileSync(
            join(uiRoot, 'src/index.ts'),
            "export * from '@/components/ui/akira-mark';\nexport * from '@/components/ui/3d-card';\n",
        );

        const missing = findMissingExamples(uiRoot, siteRoot);

        expect(missing.some((entry) => entry.slug === '3d-card')).toBe(false);
        expect(missing).toEqual([
            {
                group: 'components',
                slug: 'akira-mark',
                specifier: '@akira-io/ui',
            },
        ]);
    });

    function addCodeFamily() {
        writeFileSync(
            join(uiRoot, 'src/components/ui/code.tsx'),
            'export const Code = () => null;\n',
        );
        writeFileSync(
            join(uiRoot, 'src/components/ui/code-block.tsx'),
            'export const CodeBlock = () => null;\n',
        );
        writeFileSync(
            join(uiRoot, 'src/code.ts'),
            [
                "export { Code } from '@/components/ui/code';",
                "export { CodeBlock } from '@/components/ui/code-block';",
            ].join('\n'),
        );
    }

    it('never flags code-block, which shares the code demo page', () => {
        makeFixture();
        addCodeFamily();
        mkdirSync(join(siteRoot, 'src/demos/components/editor'), {
            recursive: true,
        });
        mkdirSync(join(siteRoot, 'src/demos/components/code'), {
            recursive: true,
        });

        expect(findMissingExamples(uiRoot, siteRoot)).toEqual([
            {
                group: 'components',
                slug: 'akira-mark',
                specifier: '@akira-io/ui',
            },
        ]);
    });

    it('still flags code itself when its demo page is missing', () => {
        makeFixture();
        addCodeFamily();
        mkdirSync(join(siteRoot, 'src/demos/components/editor'), {
            recursive: true,
        });

        const missing = findMissingExamples(uiRoot, siteRoot);

        expect(missing.some((entry) => entry.slug === 'code')).toBe(true);
        expect(missing.some((entry) => entry.slug === 'code-block')).toBe(
            false,
        );
    });

    function addToastFamily() {
        writeFileSync(
            join(uiRoot, 'src/components/ui/sonner.tsx'),
            'export const Toaster = () => null;\n',
        );
        writeFileSync(
            join(uiRoot, 'src/components/ui/toast.tsx'),
            'export const toast = () => null;\n',
        );
        writeFileSync(
            join(uiRoot, 'src/index.ts'),
            [
                "export * from '@/components/ui/sonner';",
                "export * from '@/components/ui/toast';",
            ].join('\n'),
        );
    }

    it('never flags toast, which shares the sonner demo page', () => {
        makeFixture();
        addToastFamily();
        mkdirSync(join(siteRoot, 'src/demos/components/editor'), {
            recursive: true,
        });
        mkdirSync(join(siteRoot, 'src/demos/components/sonner'), {
            recursive: true,
        });

        expect(findMissingExamples(uiRoot, siteRoot)).toEqual([]);
    });

    it('still flags sonner itself when its demo page is missing', () => {
        makeFixture();
        addToastFamily();
        mkdirSync(join(siteRoot, 'src/demos/components/editor'), {
            recursive: true,
        });

        const missing = findMissingExamples(uiRoot, siteRoot);

        expect(missing.some((entry) => entry.slug === 'sonner')).toBe(true);
        expect(missing.some((entry) => entry.slug === 'toast')).toBe(false);
    });
});
