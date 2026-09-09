import { describe, expect, it } from 'vitest';
import { extractSlugs } from '../scripts/detect-missing-examples.mjs';

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

    it('ignores a module exported only for its types', () => {
        const source = [
            "export type { ChartCurve } from '@/components/ui/cartesian-chart';",
            "export type * from '@/components/ui/chart-types';",
            "export { type Tone, type Variant } from '@/components/ui/button-types';",
        ].join('\n');

        expect(extractSlugs(source, '@/components/ui/')).toEqual(new Set());
    });

    it('keeps a module whose export mixes a type with a value', () => {
        const source = `export { Button, type Tone } from '@/components/ui/button';\n`;

        expect(extractSlugs(source, '@/components/ui/')).toEqual(
            new Set(['button']),
        );
    });

    it('reads the clause of each export instead of the one before it', () => {
        const source = [
            "export * from '@/components/ui/button';",
            "export type { ChartCurve } from '@/components/ui/cartesian-chart';",
        ].join('\n');

        expect(extractSlugs(source, '@/components/ui/')).toEqual(
            new Set(['button']),
        );
    });

    it('ignores an import, which is not part of the public surface', () => {
        const source = [
            "import { cn } from '@/components/ui/utils';",
            "export * from '@/components/ui/button';",
        ].join('\n');

        expect(extractSlugs(source, '@/components/ui/')).toEqual(
            new Set(['button']),
        );
    });

    it('keeps a statement whose clause carries a comment with a semicolon', () => {
        const source = [
            'export {',
            '    Foo, // TODO: drop; deprecated',
            "} from '@/components/ui/foo';",
            "export * from '@/components/ui/bar';",
        ].join('\n');

        expect(extractSlugs(source, '@/components/ui/')).toEqual(
            new Set(['foo', 'bar']),
        );
    });

    it('reads a type-only clause that spans several lines', () => {
        const source = [
            'export type {',
            '    ChartCurve,',
            '    ChartTone,',
            "} from '@/components/ui/cartesian-chart';",
        ].join('\n');

        expect(extractSlugs(source, '@/components/ui/')).toEqual(new Set());
    });

    it('keeps a module exported with an empty clause', () => {
        const source = "export {} from '@/components/ui/button';\n";

        expect(extractSlugs(source, '@/components/ui/')).toEqual(
            new Set(['button']),
        );
    });

    it('classifies a named clause whose types carry comments', () => {
        const source = [
            'export {',
            '    type Tone, // the palette role',
            '    type Variant,',
            "} from '@/components/ui/button-types';",
        ].join('\n');

        expect(extractSlugs(source, '@/components/ui/')).toEqual(new Set());
    });
});
