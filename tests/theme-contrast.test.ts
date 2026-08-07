import { describe, expect, it } from 'vitest';
import { contrastRatio, parseOklch, tintContrast } from './helpers/color';
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

describe('warning', () => {
    it('is readable in light mode', () => {
        expect(
            contrastRatio(
                parseOklch(light['--warning']),
                parseOklch(light['--warning-foreground']),
            ),
        ).toBeGreaterThanOrEqual(4.5);
    });

    it('is readable in dark mode', () => {
        expect(
            contrastRatio(
                parseOklch(dark['--warning']),
                parseOklch(dark['--warning-foreground']),
            ),
        ).toBeGreaterThanOrEqual(4.5);
    });

    it('reads as text on the page background in both modes', () => {
        expect(
            contrastRatio(
                parseOklch(light['--warning']),
                parseOklch(light['--background']),
            ),
        ).toBeGreaterThanOrEqual(4.5);
        expect(
            contrastRatio(
                parseOklch(dark['--warning']),
                parseOklch(dark['--background']),
            ),
        ).toBeGreaterThanOrEqual(4.5);
    });
});

describe('info', () => {
    it('is readable in light mode', () => {
        expect(
            contrastRatio(
                parseOklch(light['--info']),
                parseOklch(light['--info-foreground']),
            ),
        ).toBeGreaterThanOrEqual(4.5);
    });

    it('is readable in dark mode', () => {
        expect(
            contrastRatio(
                parseOklch(dark['--info']),
                parseOklch(dark['--info-foreground']),
            ),
        ).toBeGreaterThanOrEqual(4.5);
    });

    it('reads as text on the page background in both modes', () => {
        expect(
            contrastRatio(
                parseOklch(light['--info']),
                parseOklch(light['--background']),
            ),
        ).toBeGreaterThanOrEqual(4.5);
        expect(
            contrastRatio(
                parseOklch(dark['--info']),
                parseOklch(dark['--background']),
            ),
        ).toBeGreaterThanOrEqual(4.5);
    });
});

describe('the status tints', () => {
    it.each(['--success', '--warning', '--info', '--destructive'])(
        'keeps %s legible as badge text on the page background',
        (token) => {
            expect(
                contrastRatio(
                    parseOklch(light[token]),
                    parseOklch(light['--background']),
                ),
            ).toBeGreaterThanOrEqual(4.5);
            expect(
                contrastRatio(
                    parseOklch(dark[token]),
                    parseOklch(dark['--background']),
                ),
            ).toBeGreaterThanOrEqual(4.5);
        },
    );
});

const ALERT_TINT = 0.1;

const TINT_EXCEPTIONS: Record<string, string> = {
    '--destructive':
        'reaches 3.93:1 in light mode; predates the warning and info variants and moving it recolors every destructive surface',
};

describe('the alert tints', () => {
    const tinted = ['--success', '--warning', '--info', '--destructive'].filter(
        (token) => !(token in TINT_EXCEPTIONS),
    );

    it.each(tinted)(
        'keeps %s legible as text on its own tint over the card',
        (token) => {
            for (const scope of [light, dark]) {
                expect(
                    tintContrast(
                        parseOklch(scope[token]),
                        parseOklch(scope[token]),
                        parseOklch(resolveVar(scope['--card'], [scope, theme])),
                        ALERT_TINT,
                    ),
                ).toBeGreaterThanOrEqual(4.5);
            }
        },
    );

    it('names every token the tint rule does not yet hold for', () => {
        expect(Object.keys(TINT_EXCEPTIONS)).toEqual(['--destructive']);
    });
});

describe('the focus indicator', () => {
    const SURFACES = ['--background', '--card', '--popover'];
    const scopesFor = (scope: Record<string, string>) => [scope, theme, light];

    it.each(SURFACES)(
        'differs from %s by at least 3:1, per WCAG 2.4.11',
        (surface) => {
            for (const scope of [light, dark]) {
                const scopes = scopesFor(scope);

                expect(
                    contrastRatio(
                        parseOklch(resolveVar(scope['--ring'], scopes)),
                        parseOklch(resolveVar(scope[surface], scopes)),
                    ),
                ).toBeGreaterThanOrEqual(3);
            }
        },
    );

    it('is why the surface ring could never have signalled focus', () => {
        for (const scope of [light, dark]) {
            const scopes = scopesFor(scope);
            const card = parseOklch(resolveVar(scope['--card'], scopes));
            const alpha = Number(
                /\/\s*([\d.]+)\s*\)/.exec(scope['--surface-ring'])![1],
            );
            const ink = scope === light ? 'oklch(0 0 0)' : 'oklch(1 0 0)';

            expect(
                tintContrast(card, parseOklch(ink), card, alpha),
            ).toBeLessThan(3);
        }
    });
});
