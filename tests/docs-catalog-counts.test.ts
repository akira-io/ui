import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const NUMBER_WORDS = [
    'zero',
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
    'ten',
    'eleven',
    'twelve',
    'thirteen',
    'fourteen',
    'fifteen',
    'sixteen',
    'seventeen',
    'eighteen',
    'nineteen',
    'twenty',
    'twenty-one',
    'twenty-two',
    'twenty-three',
    'twenty-four',
    'twenty-five',
    'twenty-six',
    'twenty-seven',
    'twenty-eight',
    'twenty-nine',
    'thirty',
];

const CATALOG_HEADER = /^\|\s*Component\s*\|\s*Preview\s*\|\s*$/;
const TABLE_DIVIDER = /^\|[\s:|-]+\|\s*$/;
const SECTION_HEADING = /^###\s+(.+?)\s+\((\d+)\)\s*$/;
const CATALOG_ROW = /^\|\s*`[^`]+`.*\|\s*$/;

function read(name: string): string {
    return readFileSync(
        fileURLToPath(new URL(`../docs/${name}`, import.meta.url)),
        'utf8',
    );
}

function wordToNumber(word: string): number {
    const index = NUMBER_WORDS.indexOf(word.toLowerCase());

    if (index < 0) {
        throw new Error(`unknown number word: ${word}`);
    }

    return index;
}

interface CatalogSection {
    title: string;
    stated: number;
    rows: number;
}

function readCatalogSections(source: string): CatalogSection[] {
    const sections: CatalogSection[] = [];
    const lines = source.split('\n');
    let inCatalogTable = false;

    for (const line of lines) {
        const heading = SECTION_HEADING.exec(line);

        if (heading) {
            inCatalogTable = false;
            sections.push({
                title: heading[1],
                stated: Number(heading[2]),
                rows: 0,
            });
            continue;
        }

        if (CATALOG_HEADER.test(line)) {
            inCatalogTable = true;
            continue;
        }

        if (!inCatalogTable) {
            continue;
        }

        if (TABLE_DIVIDER.test(line)) {
            continue;
        }

        if (!line.startsWith('|')) {
            inCatalogTable = false;
            continue;
        }

        if (CATALOG_ROW.test(line)) {
            sections[sections.length - 1].rows += 1;
        }
    }

    return sections;
}

function statedTotal(source: string): number {
    const match = /All (\d+) entries below share the same import/.exec(source);

    if (!match) {
        throw new Error('the components doc no longer states a total');
    }

    return Number(match[1]);
}

function blockModules(): string[] {
    const barrel = readFileSync(
        fileURLToPath(new URL('../src/blocks.ts', import.meta.url)),
        'utf8',
    );
    const modules = new Set<string>();

    for (const match of barrel.matchAll(/from '@\/blocks\/([\w-]+)'/g)) {
        modules.add(match[1]);
    }

    return [...modules].sort();
}

const components = read('03-components.md');
const blocks = read('08-blocks.md');
const index = read('00-index.md');

const sections = readCatalogSections(components);

describe('component catalog counts', () => {
    it('finds every catalog section', () => {
        expect(sections.map((section) => section.title)).toEqual([
            'Primitives & layout',
            'Forms',
            'Data',
            'Feedback & misc',
        ]);
    });

    it('reads a catalog table under every section, so a renamed header fails here first', () => {
        const empty = sections
            .filter((section) => section.rows === 0)
            .map((section) => section.title);

        expect(empty).toEqual([]);
    });

    it('counts only catalog rows, never prop table rows', () => {
        expect(components).toContain('| `icon` | `LucideIcon` | No |');
        expect(sections.reduce((sum, s) => sum + s.rows, 0)).toBeLessThan(
            components.split('\n').filter((line) => CATALOG_ROW.test(line))
                .length,
        );
    });

    it.each(readCatalogSections(components))(
        'states the row count of $title',
        ({ stated, rows }) => {
            expect(stated).toBe(rows);
        },
    );

    it('states a total equal to the sum of the sections', () => {
        expect(statedTotal(components)).toBe(
            sections.reduce((sum, section) => sum + section.rows, 0),
        );
    });
});

describe('blocks counts', () => {
    it('names every block module exported from the barrel', () => {
        const stated = /All ([a-z-]+) live in `src\/blocks\/`/.exec(blocks);

        expect(stated).not.toBeNull();
        expect(wordToNumber(stated![1])).toBe(blockModules().length);
    });
});

describe('documentation index counts', () => {
    it('restates the component total', () => {
        const stated = /the (\d+)-component catalog/.exec(index);

        expect(stated).not.toBeNull();
        expect(Number(stated![1])).toBe(statedTotal(components));
    });

    it('restates the block total', () => {
        const stated = /the ([a-z-]+) higher-level blocks/.exec(index);

        expect(stated).not.toBeNull();
        expect(wordToNumber(stated![1])).toBe(blockModules().length);
    });
});
