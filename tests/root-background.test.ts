import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

import { declarationsIn, readStylesheet, unlayeredRules } from './helpers/css';
import { INSET_SIDEBAR } from './helpers/inset-sidebar';

const STYLESHEET = 'root-background.css';

const rules = unlayeredRules(readStylesheet(STYLESHEET));
const theme = readStylesheet('theme.css');
const packageFiles: string[] = JSON.parse(
    readFileSync(new URL('../package.json', import.meta.url), 'utf8'),
).files;
const distBranchFiles = readFileSync(
    new URL('../.github/workflows/dist-branch.yml', import.meta.url),
    'utf8',
)
    .match(/git add --force (.*)/)?.[1]
    .split(/\s+/);

function backgroundOf(selector: string): string | undefined {
    return rules
        .filter((rule) => rule.selector === selector)
        .map((rule) => rule.body.match(/background-color:\s*([^;]+)/)?.[1])
        .find(Boolean)
        ?.trim();
}

describe('the root background overscroll reveals', () => {
    it('paints the root with the page background, outside any layer', () => {
        expect(backgroundOf(':root')).toBe('var(--background)');
    });

    it('paints the root with the sidebar fill behind an inset sidebar', () => {
        expect(backgroundOf(`:root:has(${INSET_SIDEBAR})`)).toBe(
            'var(--sidebar)',
        );
    });

    it('reaches the app through theme.css, unlayered', () => {
        expect(theme.split('\n')[0]).toBe(`@import './${STYLESHEET}';`);
    });

    it.each([':root', '.dark'])('paints with tokens %s declares', (scope) => {
        const tokens = declarationsIn(theme, scope);

        expect(tokens['--background']).toBeDefined();
        expect(tokens['--sidebar']).toBeDefined();
    });

    it('ships in the npm package', () => {
        expect(packageFiles).toContain(STYLESHEET);
    });

    it('ships on the main-dist branch a lockfile can pin', () => {
        expect(distBranchFiles).toContain(STYLESHEET);
    });
});
