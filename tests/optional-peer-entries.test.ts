// @vitest-environment node

import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

import * as chartsEntry from '@/charts';
import * as dataTableEntry from '@/data-table';
import * as formEntry from '@/form';
import * as primitivesEntry from '@/index';

import { importGraph } from './helpers/import-graph';

const root = resolve(fileURLToPath(import.meta.url), '../..');

const OPTIONAL_PEERS = ['recharts', '@tanstack/react-table', 'react-hook-form'];

const ENTRIES_WITHOUT_OPTIONAL_PEERS = [
    'dist/index.js',
    'dist/blocks.js',
    'dist/shells.js',
    'dist/code.js',
    'dist/editor.js',
    'dist/inertia.js',
    'dist/locales/pt.js',
    'dist/locales/fr.js',
];

const ENTRY_OF_EACH_PEER = [
    ['recharts', 'dist/charts.js'],
    ['@tanstack/react-table', 'dist/data-table.js'],
    ['react-hook-form', 'dist/form.js'],
];

const MOVED_EXPORTS = {
    charts: [
        'AreaChart',
        'BarChart',
        'CHART_PALETTE',
        'ChartContainer',
        'ChartLegend',
        'ChartLegendContent',
        'ChartStyle',
        'ChartTooltip',
        'ChartTooltipContent',
        'DonutChart',
        'LineChart',
        'chartColorVariable',
        'cssVariableKey',
        'paletteColor',
    ],
    'data-table': [
        'DataTable',
        'FacetedFilter',
        'RowActionsMenu',
        'ServerFacetedFilter',
        'dataTableDefaultLabels',
        'dataTableFacetedFilterDefaultLabels',
    ],
    form: [
        'Form',
        'FormControl',
        'FormDescription',
        'FormField',
        'FormItem',
        'FormLabel',
        'FormMessage',
        'useFormField',
    ],
} as const;

const SUBPATH_ENTRIES = {
    charts: chartsEntry,
    'data-table': dataTableEntry,
    form: formEntry,
};

function importsPeer(file: string, peer: string): boolean {
    const escaped = peer.replace(/[/.]/g, '\\$&');

    return new RegExp(
        `(?:\\bfrom|\\bimport)\\s*\\(?\\s*["']${escaped}["']`,
    ).test(readFileSync(resolve(root, file), 'utf8'));
}

function packageExports(): Record<string, unknown> {
    return JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf8'))
        .exports;
}

describe('an optional peer', () => {
    it.each(
        ENTRIES_WITHOUT_OPTIONAL_PEERS.flatMap((entry) =>
            OPTIONAL_PEERS.map((peer) => [entry, peer]),
        ),
    )(
        'is never reached from %s, so importing it does not require %s',
        (entry, peer) => {
            const offenders = importGraph(root, entry).filter((file) =>
                importsPeer(file, peer),
            );

            expect(offenders).toEqual([]);
        },
    );

    it.each(
        ENTRIES_WITHOUT_OPTIONAL_PEERS.flatMap((entry) =>
            OPTIONAL_PEERS.map((peer) => [
                entry.replace(/\.js$/, '.d.ts'),
                peer,
            ]),
        ),
    )(
        'is never named by the declarations in %s, so type-checking it does not require %s',
        (declaration, peer) => {
            const offenders = importGraph(
                root,
                declaration,
                new Set(),
                (specifier) => specifier.replace(/\.js$/, '.d.ts'),
            ).filter((file) => importsPeer(file, peer));

            expect(offenders).toEqual([]);
        },
    );

    it.each(ENTRY_OF_EACH_PEER)(
        'is imported by the subpath that needs it: %s from %s',
        (peer, entry) => {
            expect(
                importGraph(root, entry).some((file) =>
                    importsPeer(file, peer),
                ),
            ).toBe(true);
        },
    );
});

describe.each(Object.keys(MOVED_EXPORTS) as (keyof typeof MOVED_EXPORTS)[])(
    'the %s subpath',
    (subpath) => {
        it('is published in package.json', () => {
            expect(packageExports()).toHaveProperty([`./${subpath}`], {
                types: `./dist/${subpath}.d.ts`,
                import: `./dist/${subpath}.js`,
            });
        });

        it.each(MOVED_EXPORTS[subpath])('exports %s', (name) => {
            expect(SUBPATH_ENTRIES[subpath]).toHaveProperty(name);
        });

        it.each(MOVED_EXPORTS[subpath])(
            'takes %s out of the root entry',
            (name) => {
                expect(primitivesEntry).not.toHaveProperty(name);
            },
        );
    },
);
