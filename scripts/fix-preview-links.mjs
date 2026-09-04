#!/usr/bin/env node
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';

const PENDING_ROW = /^(\| `([a-z0-9-]+)` \| )Pending( \|)$/gm;

export function refreshPreviewLinks(markdown, liveSlugs) {
    return markdown.replace(PENDING_ROW, (line, prefix, slug, suffix) => {
        if (!liveSlugs.has(slug)) return line;

        return `${prefix}https://ui.akira-io.com/components/${slug}/${suffix}`;
    });
}

export function liveComponentSlugs(demosDir) {
    return new Set(
        readdirSync(demosDir, { withFileTypes: true })
            .filter((entry) => entry.isDirectory())
            .map((entry) => entry.name),
    );
}

if (import.meta.url === `file://${process.argv[1]}`) {
    const [, , mdPath, demosDir] = process.argv;

    if (!mdPath || !demosDir) {
        console.error(
            'Usage: fix-preview-links.mjs <catalog.md> <demos/components dir>',
        );
        process.exit(1);
    }

    const markdown = readFileSync(mdPath, 'utf8');
    const updated = refreshPreviewLinks(markdown, liveComponentSlugs(demosDir));

    if (updated !== markdown) {
        writeFileSync(mdPath, updated);
    }
}
