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
});
