import { describe, expect, it } from 'vitest';
import { declarationsIn, readStylesheet } from './helpers/css';

const strip = (source: string) => source.replace(/\/\*[\s\S]*?\*\//g, '');
const hig = strip(readStylesheet('hig.css'));

function blockAfter(source: string, marker: string): string {
    const start = source.indexOf(marker);

    expect(start).toBeGreaterThanOrEqual(0);

    let depth = 0;

    for (
        let index = source.indexOf('{', start);
        index < source.length;
        index++
    ) {
        depth += source[index] === '{' ? 1 : 0;
        depth -= source[index] === '}' ? 1 : 0;

        if (depth === 0) {
            return source.slice(start, index + 1);
        }
    }

    return '';
}

describe('the HIG tokens', () => {
    it('is imported by the theme', () => {
        expect(readStylesheet('theme.css')).toContain("@import './hig.css';");
    });

    it('sets the desktop scale on the root', () => {
        expect(declarationsIn(hig, ':root')).toMatchObject({
            '--space-tight': '4px',
            '--space-item': '8px',
            '--space-group': '20px',
            '--space-inset': '20px',
            '--target-min': '28px',
            '--icon-sm': '1em',
            '--icon': '1.25em',
            '--icon-lg': '1.5em',
            '--icon-stroke': '1.75',
        });
    });

    it('moves to the touch scale on a coarse pointer', () => {
        const touch = blockAfter(hig, '@media (pointer: coarse)');

        expect(touch).toMatch(/--space-group:\s*24px/);
        expect(touch).toMatch(/--space-inset:\s*16px/);
        expect(touch).toMatch(/--target-min:\s*44px/);
    });

    it('hands the spacing to Tailwind through the variables', () => {
        expect(declarationsIn(hig, '@theme inline')).toMatchObject({
            '--spacing-tight': 'var(--space-tight)',
            '--spacing-item': 'var(--space-item)',
            '--spacing-group': 'var(--space-group)',
            '--spacing-inset': 'var(--space-inset)',
            '--spacing-target': 'var(--target-min)',
        });
    });

    it.each([
        ['size-icon-sm', '--icon-sm'],
        ['size-icon', '--icon'],
        ['size-icon-lg', '--icon-lg'],
    ])('sizes %s from %s', (name, variable) => {
        const utility = blockAfter(hig, `@utility ${name} `);

        expect(utility).toContain(`width: var(${variable})`);
        expect(utility).toContain(`height: var(${variable})`);
    });

    it('draws the icon stroke from the variable', () => {
        expect(blockAfter(hig, '@utility stroke-icon ')).toContain(
            'stroke-width: var(--icon-stroke)',
        );
    });

    it('draws the icons inside the components with the stroke variable, behind any utility', () => {
        const base = blockAfter(hig, '@layer base');

        expect(base).toContain('[data-slot] svg.lucide');
        expect(base).toContain('stroke-width: var(--icon-stroke)');
    });

    it.each([
        ['icon-weight-medium', '2'],
        ['icon-weight-semibold', '2.25'],
    ])('sets %s to a %s stroke', (name, value) => {
        expect(blockAfter(hig, `@utility ${name} `)).toMatch(
            new RegExp(`--icon-stroke:\\s*${value.replace('.', '\\.')};`),
        );
    });
});
