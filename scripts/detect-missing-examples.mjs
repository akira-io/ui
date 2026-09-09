#!/usr/bin/env node
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

export const ENTRIES = [
    {
        group: 'components',
        file: 'src/index.ts',
        prefix: '@/components/ui/',
        sourceDir: 'src/components/ui',
        specifier: '@akira-io/ui',
    },
    {
        group: 'components',
        file: 'src/editor.ts',
        prefix: '@/components/ui/',
        sourceDir: 'src/components/ui',
        specifier: '@akira-io/ui/editor',
    },
    {
        group: 'components',
        file: 'src/code.ts',
        prefix: '@/components/ui/',
        sourceDir: 'src/components/ui',
        specifier: '@akira-io/ui/code',
    },
    {
        group: 'blocks',
        file: 'src/blocks.ts',
        prefix: '@/blocks/',
        sourceDir: 'src/blocks',
        specifier: '@akira-io/ui/blocks',
    },
    {
        group: 'shells',
        file: 'src/shells.ts',
        prefix: '@/shells/',
        sourceDir: 'src/shells',
        specifier: '@akira-io/ui/shells',
    },
];

const ALIASED_SLUGS = new Set(['code-block', 'toast']);

const VALID_SLUG = /^[a-z][a-z0-9]*(-[a-z0-9]+)*$/;

const EXPORT_FROM = /\bexport\s+([^;]*?)\bfrom\s+'([^']+)'/g;

const BASELINE_FILE = 'tests/uncovered-entries.json';

function isTypeOnlyClause(clause) {
    const trimmed = clause.trim();

    if (/^type\b/.test(trimmed)) return true;

    const named = trimmed.match(/^\{([\s\S]*)\}$/);

    if (!named) return false;

    const specifiers = named[1]
        .split(',')
        .map((specifier) => specifier.trim())
        .filter(Boolean);

    return (
        specifiers.length > 0 &&
        specifiers.every((specifier) => /^type\b/.test(specifier))
    );
}

export function extractSlugs(sourceText, prefix) {
    const slugs = new Set();

    for (const [, clause, specifier] of sourceText.matchAll(EXPORT_FROM)) {
        if (!specifier.startsWith(prefix)) continue;
        if (isTypeOnlyClause(clause)) continue;

        slugs.add(specifier.slice(prefix.length).split('/')[0]);
    }

    return slugs;
}

export function readBaseline(siteRoot) {
    const path = join(siteRoot, BASELINE_FILE);

    if (!existsSync(path)) return new Set();

    const groups = JSON.parse(readFileSync(path, 'utf8'));
    const keys = new Set();

    for (const [group, slugs] of Object.entries(groups)) {
        for (const slug of slugs ?? []) keys.add(`${group}/${slug}`);
    }

    return keys;
}

function hasVisualSource(uiRoot, sourceDir, slug) {
    const filePath = join(uiRoot, sourceDir, `${slug}.tsx`);

    if (existsSync(filePath)) return true;

    const dirPath = join(uiRoot, sourceDir, slug);

    if (!existsSync(dirPath)) return false;

    return readdirSync(dirPath).some(
        (name) => name.endsWith('.tsx') && !name.endsWith('.test.tsx'),
    );
}

export function findMissingExamples(uiRoot, siteRoot) {
    const baseline = readBaseline(siteRoot);
    const missing = new Map();

    for (const entry of ENTRIES) {
        const sourceText = readFileSync(join(uiRoot, entry.file), 'utf8');

        for (const slug of extractSlugs(sourceText, entry.prefix)) {
            const key = `${entry.group}/${slug}`;

            if (!VALID_SLUG.test(slug)) continue;
            if (ALIASED_SLUGS.has(slug)) continue;
            if (baseline.has(key)) continue;
            if (!hasVisualSource(uiRoot, entry.sourceDir, slug)) continue;

            const demoDir = join(siteRoot, 'src/demos', entry.group, slug);

            if (!existsSync(demoDir)) {
                missing.set(key, {
                    group: entry.group,
                    slug,
                    specifier: entry.specifier,
                });
            }
        }
    }

    return [...missing.values()];
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
