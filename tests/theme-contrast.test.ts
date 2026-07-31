import { describe, expect, it } from 'vitest';
import { contrastRatio, parseOklch } from './helpers/color';
import { declarationsIn, readStylesheet, resolveVar } from './helpers/css';

const css = readStylesheet('theme.css');
const theme = declarationsIn(css, '@theme');
const light = declarationsIn(css, ':root');
const dark = declarationsIn(css, '.dark');

function pair(scope: Record<string, string>): number {
    const scopes = [scope, theme, light];

    return contrastRatio(
        parseOklch(resolveVar(scope['--primary'], scopes)),
        parseOklch(resolveVar(scope['--primary-foreground'], scopes)),
    );
}

describe('the default palette', () => {
    it('uses ramp step 600 in light mode', () => {
        expect(light['--primary']).toBe('var(--color-akira-600)');
    });

    it('uses ramp step 400 in dark mode', () => {
        expect(dark['--primary']).toBe('var(--color-akira-400)');
    });

    it('clears WCAG AA in light mode', () => {
        expect(pair(light)).toBeGreaterThanOrEqual(4.5);
    });

    it('clears WCAG AA in dark mode', () => {
        expect(pair(dark)).toBeGreaterThanOrEqual(4.5);
    });
});

describe('derived tokens', () => {
    it('ties the focus ring to the brand', () => {
        expect(light['--ring']).toBe('var(--primary)');
    });

    it('ties the sidebar primary to the brand', () => {
        expect(light['--sidebar-primary']).toBe('var(--primary)');
        expect(light['--sidebar-primary-foreground']).toBe(
            'var(--primary-foreground)',
        );
    });
});

describe('success', () => {
    it('is readable in light mode', () => {
        expect(
            contrastRatio(
                parseOklch(light['--success']),
                parseOklch(light['--success-foreground']),
            ),
        ).toBeGreaterThanOrEqual(4.5);
    });

    it('is readable in dark mode', () => {
        expect(
            contrastRatio(
                parseOklch(dark['--success']),
                parseOklch(dark['--success-foreground']),
            ),
        ).toBeGreaterThanOrEqual(4.5);
    });
});

describe('destructive', () => {
    it('does not reuse the brand color', () => {
        expect(light['--destructive']).not.toBe(light['--primary']);
    });

    it('is readable in light mode', () => {
        expect(
            contrastRatio(
                parseOklch(light['--destructive']),
                parseOklch(light['--destructive-foreground']),
            ),
        ).toBeGreaterThanOrEqual(4.5);
    });

    it('is readable in dark mode', () => {
        expect(
            contrastRatio(
                parseOklch(dark['--destructive']),
                parseOklch(dark['--destructive-foreground']),
            ),
        ).toBeGreaterThanOrEqual(4.5);
    });
});
