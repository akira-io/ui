import {
    mkdirSync,
    mkdtempSync,
    readFileSync,
    rmSync,
    writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import {
    extractSlugs,
    findMissingExamples,
    scaffoldStubs,
    stubSource,
    toPascalCase,
} from '../scripts/detect-missing-examples.mjs';

describe('extractSlugs', () => {
    it('collects the first path segment after the prefix', () => {
        const source = `export * from '@/components/ui/accordion';\nexport { Field } from '@/components/ui/field-context';\n`;

        expect(extractSlugs(source, '@/components/ui/')).toEqual(
            new Set(['accordion', 'field-context']),
        );
    });

    it('flattens a component whose export path has nested files', () => {
        const source = `export { Editor } from '@/components/ui/editor/editor';\n`;

        expect(extractSlugs(source, '@/components/ui/')).toEqual(
            new Set(['editor']),
        );
    });

    it('ignores exports outside the given prefix', () => {
        const source = `export { useField } from '@/hooks/use-field';\n`;

        expect(extractSlugs(source, '@/components/ui/')).toEqual(new Set());
    });
});

describe('toPascalCase', () => {
    it('capitalizes each kebab-case segment', () => {
        expect(toPascalCase('akira-mark')).toBe('AkiraMark');
        expect(toPascalCase('form-overlay')).toBe('FormOverlay');
        expect(toPascalCase('button')).toBe('Button');
    });
});

describe('stubSource', () => {
    it('renders a TODO stub that imports the component from its specifier', () => {
        const source = stubSource('akira-mark', '@akira-io/ui');

        expect(source).toContain(
            '// TODO: replace with a real akira-mark example',
        );
        expect(source).toContain("import { AkiraMark } from '@akira-io/ui';");
        expect(source).toContain('return <AkiraMark />;');
    });
});

describe('findMissingExamples / scaffoldStubs', () => {
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

    it('recognizes a component whose visual source is a directory of files', () => {
        makeFixture();

        const missing = findMissingExamples(uiRoot, siteRoot);

        expect(missing.some((entry) => entry.slug === 'editor')).toBe(true);
    });

    it("scaffolds a stub file using each entry's own package specifier", () => {
        makeFixture();

        const missing = findMissingExamples(uiRoot, siteRoot);
        scaffoldStubs(siteRoot, missing);

        expect(findMissingExamples(uiRoot, siteRoot)).toEqual([]);

        const editorStub = join(
            siteRoot,
            'src/demos/components/editor/default.tsx',
        );
        expect(readFileSync(editorStub, 'utf8')).toContain(
            "from '@akira-io/ui/editor'",
        );
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
});
