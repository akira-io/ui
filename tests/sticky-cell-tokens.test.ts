import { describe, expect, it } from 'vitest';
import { stickyLastCell, stickyLastCellShadow } from '../src/lib/language';
import { declarationsIn, readStylesheet } from './helpers/css';

const css = readStylesheet('theme.css');
const light = declarationsIn(css, ':root');
const dark = declarationsIn(css, '.dark');

const read = [
    ...`${stickyLastCell} ${stickyLastCellShadow}`.matchAll(/\(--([\w-]+)\)/g),
].map((match) => `--${match[1]}`);

describe('the tokens the pinned column reads', () => {
    it('reads four fills and one shadow, one per row state', () => {
        expect(new Set(read)).toEqual(
            new Set([
                '--sticky-cell',
                '--sticky-cell-hover',
                '--sticky-cell-selected',
                '--sticky-cell-active',
                '--scroll-shadow-start',
            ]),
        );
    });

    it.each(read)('declares %s in light mode', (token) => {
        expect(light[token]).toBeDefined();
    });

    it.each(read)('declares %s in dark mode', (token) => {
        expect(dark[token]).toBeDefined();
    });

    it('rests on the card fill, which is what the table paints behind it', () => {
        expect(light['--sticky-cell']).toBe('var(--card)');
        expect(dark['--sticky-cell']).toBe('var(--card)');
    });

    it('composites hover and active in sRGB, the space an alpha fill blends in', () => {
        expect(light['--sticky-cell-hover']).toBe(
            'color-mix(in srgb, var(--muted) 50%, var(--card))',
        );
        expect(light['--sticky-cell-active']).toBe(
            'color-mix(in srgb, var(--primary) 5%, var(--card))',
        );
    });

    it('matches the row fills TableRow and DataTable paint', () => {
        expect(light['--sticky-cell-selected']).toBe('var(--muted)');
    });

    it('casts the shadow towards the content it hides, in both modes', () => {
        expect(light['--scroll-shadow-start']).toContain('-8px 0');
        expect(dark['--scroll-shadow-start']).toContain('-8px 0');
    });
});
