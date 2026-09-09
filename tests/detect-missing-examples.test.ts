import { afterEach, describe, expect, it } from 'vitest';
import { findMissingExamples } from '../scripts/detect-missing-examples.mjs';
import {
    makeFixture,
    type MissingExamplesFixture,
} from './helpers/missing-examples-fixture';

describe('findMissingExamples', () => {
    let fixture: MissingExamplesFixture;

    afterEach(() => {
        fixture.remove();
    });

    function detect() {
        return findMissingExamples(fixture.uiRoot, fixture.siteRoot);
    }

    it('flags an exported component without a demo, skips a plain-.ts export', () => {
        fixture = makeFixture();

        expect(detect()).toEqual([
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
        fixture = makeFixture();

        expect(detect().some((item) => item.slug === 'cartesian-chart')).toBe(
            false,
        );
    });

    it('drops an entry the site records as deliberately uncovered', () => {
        fixture = makeFixture();
        fixture.writeBaseline({
            components: ['akira-mark'],
            blocks: [],
            shells: [],
        });

        expect(detect()).toEqual([
            {
                group: 'components',
                slug: 'editor',
                specifier: '@akira-io/ui/editor',
            },
        ]);
    });

    it('keeps flagging an entry the baseline records under another group', () => {
        fixture = makeFixture();
        fixture.writeBaseline({
            components: [],
            blocks: ['akira-mark'],
            shells: [],
        });

        expect(detect().some((item) => item.slug === 'akira-mark')).toBe(true);
    });

    it('recognizes a component whose visual source is a directory of files', () => {
        fixture = makeFixture();

        expect(detect().some((item) => item.slug === 'editor')).toBe(true);
    });

    it('ignores a slug that would not be a valid JS identifier', () => {
        fixture = makeFixture();
        fixture.makeDir('src/demos/components/editor');
        fixture.write(
            'src/components/ui/3d-card.tsx',
            'export const ThreeDCard = () => null;\n',
        );
        fixture.write(
            'src/index.ts',
            "export * from '@/components/ui/akira-mark';\nexport * from '@/components/ui/3d-card';\n",
        );

        expect(detect()).toEqual([
            {
                group: 'components',
                slug: 'akira-mark',
                specifier: '@akira-io/ui',
            },
        ]);
    });

    it('never flags code-block, which shares the code demo page', () => {
        fixture = makeFixture();
        fixture.addCodeFamily();
        fixture.makeDir('src/demos/components/editor');
        fixture.makeDir('src/demos/components/code');

        expect(detect()).toEqual([
            {
                group: 'components',
                slug: 'akira-mark',
                specifier: '@akira-io/ui',
            },
        ]);
    });

    it('still flags code itself when its demo page is missing', () => {
        fixture = makeFixture();
        fixture.addCodeFamily();
        fixture.makeDir('src/demos/components/editor');

        const missing = detect();

        expect(missing.some((item) => item.slug === 'code')).toBe(true);
        expect(missing.some((item) => item.slug === 'code-block')).toBe(false);
    });

    it('never flags toast, which shares the sonner demo page', () => {
        fixture = makeFixture();
        fixture.addToastFamily();
        fixture.makeDir('src/demos/components/editor');
        fixture.makeDir('src/demos/components/sonner');

        expect(detect()).toEqual([]);
    });

    it('still flags sonner itself when its demo page is missing', () => {
        fixture = makeFixture();
        fixture.addToastFamily();
        fixture.makeDir('src/demos/components/editor');

        const missing = detect();

        expect(missing.some((item) => item.slug === 'sonner')).toBe(true);
        expect(missing.some((item) => item.slug === 'toast')).toBe(false);
    });

    it('aliases toast only inside the components group', () => {
        fixture = makeFixture();
        fixture.write(
            'src/blocks/toast.tsx',
            'export const Toast = () => null;\n',
        );
        fixture.write('src/blocks.ts', "export * from '@/blocks/toast';\n");

        expect(
            detect().some(
                (item) => item.group === 'blocks' && item.slug === 'toast',
            ),
        ).toBe(true);
    });
});
