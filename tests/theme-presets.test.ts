import { readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { contrastRatio, parseOklch } from './helpers/color';
import { declarationsIn, readStylesheet } from './helpers/css';

const ALLOWED = ['--primary', '--primary-foreground'];

const presets = readdirSync(
    fileURLToPath(new URL('../themes', import.meta.url)),
)
    .filter((file) => file.endsWith('.css'))
    .map((file) => file.replace(/\.css$/, ''));

describe('themes directory', () => {
    it('ships at least the nosferry preset', () => {
        expect(presets).toContain('nosferry');
    });
});

describe.each(presets)('the %s preset', (brand) => {
    const css = readStylesheet(`themes/${brand}.css`);
    const light = declarationsIn(css, `[data-brand='${brand}']`);
    const dark = declarationsIn(css, `[data-brand='${brand}'].dark`);

    it('declares only the two brand tokens in light mode', () => {
        expect(Object.keys(light).sort()).toEqual(ALLOWED);
    });

    it('declares only the two brand tokens in dark mode', () => {
        expect(Object.keys(dark).sort()).toEqual(ALLOWED);
    });

    it('uses literal colors, never variables', () => {
        for (const value of [...Object.values(light), ...Object.values(dark)]) {
            expect(value.startsWith('oklch(')).toBe(true);
        }
    });

    it('clears WCAG AA in light mode', () => {
        expect(
            contrastRatio(
                parseOklch(light['--primary']),
                parseOklch(light['--primary-foreground']),
            ),
        ).toBeGreaterThanOrEqual(4.5);
    });

    it('clears WCAG AA in dark mode', () => {
        expect(
            contrastRatio(
                parseOklch(dark['--primary']),
                parseOklch(dark['--primary-foreground']),
            ),
        ).toBeGreaterThanOrEqual(4.5);
    });
});
