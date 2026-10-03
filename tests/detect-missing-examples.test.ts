import { rmSync } from 'node:fs';
import { join } from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import { findMissingExamples } from '../scripts/detect-missing-examples.mjs';
import {
    makeFixture,
    type MissingExamplesFixture,
} from './helpers/missing-examples-fixture';

const AKIRA_MARK = {
    group: 'components',
    slug: 'akira-mark',
    symbol: 'AkiraMark',
    specifier: '@akira-io/ui',
};
const USE_FIELD = {
    group: 'components',
    slug: 'field-context',
    symbol: 'useField',
    specifier: '@akira-io/ui',
};
const RICH_TEXT_EDITOR = {
    group: 'components',
    slug: 'editor',
    symbol: 'RichTextEditor',
    specifier: '@akira-io/ui/editor',
};

describe('findMissingExamples', () => {
    let fixture: MissingExamplesFixture;

    afterEach(() => {
        fixture.remove();
    });

    function detect() {
        return findMissingExamples(fixture.uiRoot, fixture.siteRoot);
    }

    function symbols() {
        return detect().map((item) => item.symbol);
    }

    it('flags every exported component and hook that no demo references', () => {
        fixture = makeFixture();

        expect(detect()).toEqual([AKIRA_MARK, RICH_TEXT_EDITOR, USE_FIELD]);
    });

    it('follows export * through a nested barrel down to the declaring file', () => {
        fixture = makeFixture();
        fixture.write(
            'src/components/ui/menu/item.tsx',
            'export const MenuItem = () => null;\n',
        );
        fixture.write(
            'src/components/ui/menu/index.ts',
            "export * from './item';\n",
        );
        fixture.write(
            'src/index.ts',
            "export * from '@/components/ui/menu';\n",
        );

        expect(detect()).toEqual([
            RICH_TEXT_EDITOR,
            {
                group: 'components',
                slug: 'menu',
                symbol: 'MenuItem',
                specifier: '@akira-io/ui',
            },
        ]);
    });

    it('ignores exports that only carry types, even when they name a value', () => {
        fixture = makeFixture();
        fixture.write(
            'src/components/ui/secret.tsx',
            'export const Secret = () => null;\nexport const Hidden = () => null;\n',
        );
        fixture.write(
            'src/index.ts',
            [
                "export type { ChartCurve } from '@/components/ui/cartesian-chart';",
                "export type { Secret } from '@/components/ui/secret';",
                "export { type Hidden } from '@/components/ui/secret';",
            ].join('\n'),
        );

        expect(symbols()).toEqual(['RichTextEditor']);
    });

    it('ignores a type-only export that reaches the entry through export *', () => {
        fixture = makeFixture();
        fixture.write(
            'src/components/ui/secret.tsx',
            'export const Secret = () => null;\n',
        );
        fixture.write(
            'src/components/ui/vault/index.ts',
            "export type { Secret } from '@/components/ui/secret';\n",
        );
        fixture.write(
            'src/index.ts',
            "export * from '@/components/ui/vault';\n",
        );

        expect(symbols()).toEqual(['RichTextEditor']);
    });

    it('fails loudly when the package tsconfig cannot be read', () => {
        fixture = makeFixture();
        fixture.write('tsconfig.json', '{ "compilerOptions": ');

        expect(detect).toThrow();
    });

    it('counts a symbol referenced only in the demo of another module', () => {
        fixture = makeFixture();
        fixture.writeDemo(
            'components/button/with-mark.tsx',
            "import { AkiraMark, Button } from '@akira-io/ui';\n",
        );

        expect(symbols()).not.toContain('AkiraMark');
    });

    it('reads astro and mdx demos but nothing outside src/demos', () => {
        fixture = makeFixture();
        fixture.writeDemo('components/editor/page.mdx', '<AkiraMark />\n');
        fixture.writeDemo('components/field/usage.astro', 'useField()\n');
        fixture.writeDemo('components/field/notes.md', 'RichTextEditor\n');
        fixture.writeDemo('../pages/editor.tsx', 'Button\n');
        fixture.writeDemo('components/button/basic.tsx', '');

        expect(symbols()).toEqual(['Button']);
    });

    it('skips a directory whose name looks like a demo source', () => {
        fixture = makeFixture();
        fixture.writeDemo('components/shared.astro/mark.tsx', 'AkiraMark\n');

        expect(symbols()).not.toContain('AkiraMark');
    });

    it('matches whole identifiers, not a longer name that contains one', () => {
        fixture = makeFixture();
        fixture.writeDemo('components/button/logo.tsx', 'AkiraMarkLogo\n');

        expect(symbols()).toContain('AkiraMark');
    });

    it('never reports portals, overlays, constants or camelCase helpers', () => {
        fixture = makeFixture();
        fixture.write(
            'src/components/ui/dialog.tsx',
            [
                'export const DialogPortal = () => null;',
                'export const DialogOverlay = () => null;',
                'export const DIALOG_DELAY = 200;',
                'export const dialogLabels = {};',
                'export const Dialog = () => null;',
            ].join('\n'),
        );
        fixture.write(
            'src/index.ts',
            "export * from '@/components/ui/dialog';\n",
        );

        expect(symbols()).toEqual(['Dialog', 'RichTextEditor']);
    });

    it('reports a re-export under the name the package publishes', () => {
        fixture = makeFixture();
        fixture.write(
            'src/hooks/use-thing.ts',
            'export const useInternalThing = () => null;\n',
        );
        fixture.write(
            'src/index.ts',
            "export { useInternalThing as useThing } from '@/hooks/use-thing';\n",
        );

        expect(detect()).toContainEqual({
            group: 'hooks',
            slug: 'use-thing',
            symbol: 'useThing',
            specifier: '@akira-io/ui',
        });
    });

    it('reports a symbol shared by two entries once, under the first entry', () => {
        fixture = makeFixture();
        fixture.write(
            'src/blocks.ts',
            "export { useField } from '@/components/ui/field-context';\n",
        );

        expect(detect().filter((item) => item.symbol === 'useField')).toEqual([
            USE_FIELD,
        ]);
    });

    it('drops a whole module the baseline records by slug', () => {
        fixture = makeFixture();
        fixture.writeBaseline({ components: ['akira-mark', 'editor'] });

        expect(detect()).toEqual([USE_FIELD]);
    });

    it('drops only the symbols the baseline records under "symbols"', () => {
        fixture = makeFixture();
        fixture.write(
            'src/components/ui/akira-mark.tsx',
            'export const AkiraMark = () => null;\nexport const AkiraGlyph = () => null;\n',
        );
        fixture.writeBaseline({
            components: [],
            symbols: { 'components/akira-mark': ['AkiraGlyph'] },
        });

        expect(symbols()).toEqual(['AkiraMark', 'RichTextEditor', 'useField']);
    });

    it('keeps flagging a module the baseline records under another group', () => {
        fixture = makeFixture();
        fixture.writeBaseline({
            blocks: ['akira-mark'],
            symbols: { 'blocks/akira-mark': ['AkiraMark'] },
        });

        expect(symbols()).toContain('AkiraMark');
    });

    it('flags everything when the site has no demos at all', () => {
        fixture = makeFixture();
        rmSync(join(fixture.siteRoot, 'src/demos'), { recursive: true });

        expect(symbols()).toContain('Button');
    });
});
