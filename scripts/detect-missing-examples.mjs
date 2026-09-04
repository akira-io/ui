#!/usr/bin/env node
import {
    existsSync,
    mkdirSync,
    readdirSync,
    readFileSync,
    writeFileSync,
} from 'node:fs';
import { join } from 'node:path';

export const ENTRIES = [
    {
        group: 'components',
        file: 'src/index.ts',
        prefix: '@/components/ui/',
        sourceDir: 'src/components/ui',
    },
    {
        group: 'components',
        file: 'src/editor.ts',
        prefix: '@/components/ui/',
        sourceDir: 'src/components/ui',
    },
    {
        group: 'blocks',
        file: 'src/blocks.ts',
        prefix: '@/blocks/',
        sourceDir: 'src/blocks',
    },
    {
        group: 'shells',
        file: 'src/shells.ts',
        prefix: '@/shells/',
        sourceDir: 'src/shells',
    },
];

export const GROUP_SPECIFIER = {
    components: '@akira-io/ui',
    blocks: '@akira-io/ui/blocks',
    shells: '@akira-io/ui/shells',
};

export function extractSlugs(sourceText, prefix) {
    const slugs = new Set();

    for (const match of sourceText.matchAll(/from '([^']+)'/g)) {
        const specifier = match[1];

        if (!specifier.startsWith(prefix)) continue;

        slugs.add(specifier.slice(prefix.length).split('/')[0]);
    }

    return slugs;
}

export function toPascalCase(slug) {
    return slug.replace(/(^|-)([a-z])/g, (_match, _boundary, letter) =>
        letter.toUpperCase(),
    );
}

export function stubSource(slug, specifier) {
    const component = toPascalCase(slug);

    return (
        `// TODO: replace with a real ${slug} example\n` +
        `import { ${component} } from '${specifier}';\n\n` +
        `export default function Default() {\n    return <${component} />;\n}\n`
    );
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
    const missing = new Map();

    for (const entry of ENTRIES) {
        const sourceText = readFileSync(join(uiRoot, entry.file), 'utf8');

        for (const slug of extractSlugs(sourceText, entry.prefix)) {
            if (!hasVisualSource(uiRoot, entry.sourceDir, slug)) continue;

            const demoDir = join(siteRoot, 'src/demos', entry.group, slug);

            if (!existsSync(demoDir)) {
                missing.set(`${entry.group}/${slug}`, {
                    group: entry.group,
                    slug,
                });
            }
        }
    }

    return [...missing.values()];
}

export function scaffoldStubs(siteRoot, missing) {
    for (const { group, slug } of missing) {
        const dir = join(siteRoot, 'src/demos', group, slug);

        mkdirSync(dir, { recursive: true });
        writeFileSync(
            join(dir, 'default.tsx'),
            stubSource(slug, GROUP_SPECIFIER[group]),
        );
    }
}

if (import.meta.url === `file://${process.argv[1]}`) {
    const [, , uiRoot, siteRoot] = process.argv;

    if (!uiRoot || !siteRoot) {
        console.error(
            'Usage: detect-missing-examples.mjs <akira-ui root> <site root>',
        );
        process.exit(1);
    }

    const missing = findMissingExamples(uiRoot, siteRoot);

    scaffoldStubs(siteRoot, missing);
    console.log(JSON.stringify(missing));
}
