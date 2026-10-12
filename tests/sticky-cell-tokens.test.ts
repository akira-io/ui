import { describe, expect, it } from 'vitest';
import { stickyLastCell, stickyLastCellShadow } from '../src/lib/language';
import { declarationsIn, readStylesheet } from './helpers/css';

const css = readStylesheet('theme.css');
const light = declarationsIn(css, ':root');
const dark = declarationsIn(css, '.dark');

const read = [
    ...`${stickyLastCell} ${stickyLastCellShadow}`.matchAll(/\(--([\w-]+)\)/g),
]
    .map((match) => `--${match[1]}`)
    .filter((token) => /^--(sticky|scroll)/.test(token));

describe('the tokens the pinned column reads', () => {
    it('reads its fill, the selected fill and one shadow', () => {
        expect(new Set(read)).toEqual(
            new Set([
                '--sticky-cell-fill',
                '--sticky-cell-selected',
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

    it('rests on the page background unless a surface sets its own fill', () => {
        expect(light['--sticky-cell-fill']).toBe('var(--background)');
        expect(dark['--sticky-cell-fill']).toBe('var(--background)');
    });

    it('matches the row fills TableRow and DataTable paint', () => {
        expect(light['--sticky-cell-selected']).toBe('var(--muted)');
    });

    it('casts the shadow towards the content it hides, in both modes', () => {
        expect(light['--scroll-shadow-start']).toContain('-8px 0');
        expect(dark['--scroll-shadow-start']).toContain('-8px 0');
    });
});

describe('a surface under a pinned column', () => {
    it('hands its own fill to the column, so the column belongs to the table', async () => {
        const { contentFill } = await import('../src/lib/language');

        expect(contentFill('grouped')).toContain(
            '[--sticky-cell-fill:var(--grouped-fill)]',
        );
        expect(contentFill('glass')).toContain(
            '[--sticky-cell-fill:var(--popover)]',
        );
    });
});
