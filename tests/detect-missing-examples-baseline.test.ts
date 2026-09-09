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

    it('keys every deliberately uncovered entry by group and slug', () => {
        siteRoot = mkdtempSync(join(tmpdir(), 'akira-site-'));
        mkdirSync(join(siteRoot, 'tests'), { recursive: true });
        writeFileSync(
            join(siteRoot, 'tests/uncovered-entries.json'),
            JSON.stringify({
                components: ['json-node'],
                blocks: ['form-overlay'],
                shells: [],
            }),
        );

        expect(readBaseline(siteRoot)).toEqual(
            new Set(['components/json-node', 'blocks/form-overlay']),
        );
    });

    it('treats a site without the baseline file as covering nothing', () => {
        siteRoot = mkdtempSync(join(tmpdir(), 'akira-site-'));

        expect(readBaseline(siteRoot)).toEqual(new Set());
    });

    it('refuses a group whose slugs are not an array', () => {
        siteRoot = mkdtempSync(join(tmpdir(), 'akira-site-'));
        mkdirSync(join(siteRoot, 'tests'), { recursive: true });
        writeFileSync(
            join(siteRoot, 'tests/uncovered-entries.json'),
            JSON.stringify({ components: 'json-node' }),
        );

        expect(() => readBaseline(siteRoot)).toThrow(
            '"components" must be an array',
        );
    });

    it('refuses a baseline that is not a map of groups', () => {
        siteRoot = mkdtempSync(join(tmpdir(), 'akira-site-'));
        mkdirSync(join(siteRoot, 'tests'), { recursive: true });
        writeFileSync(
            join(siteRoot, 'tests/uncovered-entries.json'),
            JSON.stringify(['components/json-node']),
        );

        expect(() => readBaseline(siteRoot)).toThrow(
            'must map a group to an array of slugs',
        );
    });
});
