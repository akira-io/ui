import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import { readBaseline } from '../scripts/detect-missing-examples.mjs';

describe('readBaseline', () => {
    let siteRoot: string;

    afterEach(() => {
        rmSync(siteRoot, { recursive: true, force: true });
    });

    function withBaseline(contents: unknown) {
        siteRoot = mkdtempSync(join(tmpdir(), 'akira-site-'));
        mkdirSync(join(siteRoot, 'tests'), { recursive: true });
        writeFileSync(
            join(siteRoot, 'tests/uncovered-entries.json'),
            JSON.stringify(contents),
        );

        return () => readBaseline(siteRoot);
    }

    it('keys every deliberately uncovered module by group and slug', () => {
        const read = withBaseline({
            components: ['json-node'],
            blocks: ['form-overlay'],
            shells: [],
        });

        expect(read()).toEqual({
            modules: new Set(['components/json-node', 'blocks/form-overlay']),
            symbols: new Set(),
        });
    });

    it('keys every deliberately uncovered symbol by its module', () => {
        const read = withBaseline({
            components: [],
            symbols: {
                'components/sidebar': ['SidebarRail', 'SidebarInput'],
                'hooks/use-mobile': ['useIsMobile'],
            },
        });

        expect(read()).toEqual({
            modules: new Set(),
            symbols: new Set([
                'components/sidebar:SidebarRail',
                'components/sidebar:SidebarInput',
                'hooks/use-mobile:useIsMobile',
            ]),
        });
    });

    it('treats a site without the baseline file as covering nothing', () => {
        siteRoot = mkdtempSync(join(tmpdir(), 'akira-site-'));

        expect(readBaseline(siteRoot)).toEqual({
            modules: new Set(),
            symbols: new Set(),
        });
    });

    it('refuses a group whose slugs are not an array', () => {
        const read = withBaseline({ components: 'json-node' });

        expect(read).toThrow('"components" must be an array');
    });

    it('refuses a baseline that is not a map of groups', () => {
        const read = withBaseline(['components/json-node']);

        expect(read).toThrow('must map a group to an array of slugs');
    });

    it('refuses symbols that are not a map of modules', () => {
        const read = withBaseline({ symbols: ['SidebarRail'] });

        expect(read).toThrow('"symbols" must map a group/slug');
    });

    it('refuses a module whose symbols are not an array', () => {
        const read = withBaseline({
            symbols: { 'components/sidebar': 'SidebarRail' },
        });

        expect(read).toThrow('"symbols.components/sidebar" must be an array');
    });
});
