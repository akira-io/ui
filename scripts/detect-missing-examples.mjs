#!/usr/bin/env node
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import ts from 'typescript';

export const ENTRIES = [
    { file: 'src/index.ts', specifier: '@akira-io/ui' },
    { file: 'src/editor.ts', specifier: '@akira-io/ui/editor' },
    { file: 'src/code.ts', specifier: '@akira-io/ui/code' },
    { file: 'src/charts.ts', specifier: '@akira-io/ui/charts' },
    { file: 'src/data-table.ts', specifier: '@akira-io/ui/data-table' },
    { file: 'src/form.ts', specifier: '@akira-io/ui/form' },
    { file: 'src/blocks.ts', specifier: '@akira-io/ui/blocks' },
    { file: 'src/shells.ts', specifier: '@akira-io/ui/shells' },
];

const BASELINE_FILE = 'tests/uncovered-entries.json';

const SYMBOLS_KEY = 'symbols';

const DEMO_SOURCE = /\.(tsx?|astro|mdx?)$/;

export function isReportable(name) {
    if (/(Portal|Overlay)$/.test(name)) return false;
    if (/^use[A-Z0-9]/.test(name)) return true;

    return /^[A-Z][A-Za-z0-9]*$/.test(name) && /[a-z]/.test(name);
}

export function moduleOf(pathFromSrc) {
    const segments = pathFromSrc
        .split(sep)
        .join('/')
        .replace(/\.(tsx?|mjs|js)$/, '')
        .split('/');
    const [group, slug] =
        segments[0] === 'components' && segments[1] === 'ui'
            ? ['components', segments[2]]
            : [segments[0], segments[1]];

    return { group, slug: slug ?? group };
}

function isMap(value) {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function readBaseline(siteRoot) {
    const path = join(siteRoot, BASELINE_FILE);
    const baseline = { modules: new Set(), symbols: new Set() };

    if (!existsSync(path)) return baseline;

    const groups = JSON.parse(readFileSync(path, 'utf8'));

    if (!isMap(groups)) {
        throw new Error(
            `${BASELINE_FILE} must map a group to an array of slugs`,
        );
    }

    for (const [group, slugs] of Object.entries(groups)) {
        if (group === SYMBOLS_KEY) continue;

        if (!Array.isArray(slugs)) {
            throw new Error(`${BASELINE_FILE}: "${group}" must be an array`);
        }

        for (const slug of slugs) baseline.modules.add(`${group}/${slug}`);
    }

    const symbols = groups[SYMBOLS_KEY] ?? {};

    if (!isMap(symbols)) {
        throw new Error(
            `${BASELINE_FILE}: "${SYMBOLS_KEY}" must map a group/slug to an array of symbols`,
        );
    }

    for (const [module, names] of Object.entries(symbols)) {
        if (!Array.isArray(names)) {
            throw new Error(
                `${BASELINE_FILE}: "${SYMBOLS_KEY}.${module}" must be an array`,
            );
        }

        for (const name of names) baseline.symbols.add(`${module}:${name}`);
    }

    return baseline;
}

function createProgram(uiRoot) {
    const configPath = join(uiRoot, 'tsconfig.json');
    const config = ts.readConfigFile(configPath, ts.sys.readFile);

    if (config.error) {
        throw new Error(
            ts.flattenDiagnosticMessageText(config.error.messageText, '\n'),
        );
    }

    const { options } = ts.parseJsonConfigFileContent(
        config.config,
        ts.sys,
        uiRoot,
    );

    return ts.createProgram(
        ENTRIES.map((entry) => join(uiRoot, entry.file)),
        { ...options, noEmit: true },
    );
}

function resolveValue(checker, symbol) {
    let current = symbol;

    while (current.flags & ts.SymbolFlags.Alias) {
        if (
            current.declarations?.some(ts.isTypeOnlyImportOrExportDeclaration)
        ) {
            return null;
        }

        const next = checker.getImmediateAliasedSymbol(current);

        if (!next) return null;

        current = next;
    }

    return current.flags & ts.SymbolFlags.Value ? current : null;
}

export function exportedValues(uiRoot) {
    const program = createProgram(uiRoot);
    const checker = program.getTypeChecker();
    const srcRoot = join(uiRoot, 'src');
    const values = new Map();

    for (const entry of ENTRIES) {
        const source = program.getSourceFile(join(uiRoot, entry.file));
        const moduleSymbol = source && checker.getSymbolAtLocation(source);

        if (!moduleSymbol) continue;

        for (const exported of checker.getExportsOfModule(moduleSymbol)) {
            const target = resolveValue(checker, exported);
            const declaration = target?.declarations?.[0];

            if (!declaration) continue;

            const { group, slug } = moduleOf(
                relative(srcRoot, declaration.getSourceFile().fileName),
            );
            const key = `${group}/${slug}:${exported.name}`;

            if (values.has(key)) continue;

            values.set(key, {
                group,
                slug,
                symbol: exported.name,
                specifier: entry.specifier,
            });
        }
    }

    return [...values.values()];
}

export function readDemoSources(siteRoot) {
    const demos = join(siteRoot, 'src/demos');

    if (!existsSync(demos)) return '';

    return readdirSync(demos, { recursive: true })
        .filter((path) => DEMO_SOURCE.test(path))
        .map((path) => readFileSync(join(demos, path), 'utf8'))
        .join('\n');
}

function sortKey({ group, slug, symbol }) {
    return `${group}/${slug}:${symbol}`;
}

export function findMissingExamples(uiRoot, siteRoot) {
    const baseline = readBaseline(siteRoot);
    const demos = readDemoSources(siteRoot);

    return exportedValues(uiRoot)
        .filter(({ group, slug, symbol }) => {
            if (!isReportable(symbol)) return false;
            if (baseline.modules.has(`${group}/${slug}`)) return false;
            if (baseline.symbols.has(`${group}/${slug}:${symbol}`)) {
                return false;
            }

            return !new RegExp(`\\b${symbol}\\b`).test(demos);
        })
        .sort((left, right) => sortKey(left).localeCompare(sortKey(right)));
}

if (import.meta.url === `file://${process.argv[1]}`) {
    const [, , uiRoot, siteRoot] = process.argv;

    if (!uiRoot || !siteRoot) {
        console.error(
            'Usage: detect-missing-examples.mjs <akira-ui root> <site root>',
        );
        process.exit(1);
    }

    console.log(JSON.stringify(findMissingExamples(uiRoot, siteRoot)));
}
