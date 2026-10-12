import { describe, expect, it } from 'vitest';
import { parseOklch, tintContrast } from './helpers/color';
import { declarationsIn, readStylesheet, resolveVar } from './helpers/css';

const strip = (source: string) => source.replace(/\/\*[\s\S]*?\*\//g, '');
const glass = strip(readStylesheet('glass.css'));
const theme = readStylesheet('theme.css');

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

it('is imported by the theme', () => {
    expect(theme).toContain("@import './glass.css';");
});

describe.each(['glass-bar', 'glass-panel'])('the %s utility', (name) => {
    const utility = () => blockAfter(glass, `@utility ${name} `);

    it('takes the tint of the approved glass, white at 60% in light and 9% in dark', () => {
        expect(utility()).toContain('var(--glass-button-tint)');
        expect(utility()).toMatch(/blur\(40px\) saturate\(1\.5\)/);
    });

    it('blurs what lies behind it', () => {
        expect(utility()).toMatch(/backdrop-filter:\s*blur\(/);
    });

    it('turns opaque and stops blurring when transparency is reduced', () => {
        const reduced = blockAfter(
            utility(),
            '@media (prefers-reduced-transparency: reduce)',
        );

        expect(reduced).toMatch(/background-color:\s*var\(--popover\)/);
        expect(reduced).toMatch(/backdrop-filter:\s*none/);
    });

    it('turns opaque where the browser cannot blur', () => {
        const unsupported = blockAfter(
            utility(),
            '@supports not (backdrop-filter: blur(1px))',
        );

        expect(unsupported).toMatch(/background-color:\s*var\(--popover\)/);
    });
});

describe('text over the glass', () => {
    const tokens = declarationsIn(theme, '@theme');
    const light = declarationsIn(theme, ':root');
    const white = parseOklch('oklch(1 0 0)');
    const modes = [
        ['light', light, 0.6],
        ['dark', declarationsIn(theme, '.dark'), 0.09],
    ] as const;

    it.each(modes)(
        'stays readable over the page in %s mode',
        (_mode, scope, alpha) => {
            const scopes = [scope, tokens, light];

            expect(
                tintContrast(
                    parseOklch(
                        resolveVar(scope['--popover-foreground'], scopes),
                    ),
                    white,
                    parseOklch(resolveVar(scope['--background'], scopes)),
                    alpha,
                ),
            ).toBeGreaterThanOrEqual(4.5);
        },
    );

    it.each([
        [':root', 'rgb(255 255 255 / 0.6)'],
        ['.dark', 'rgb(255 255 255 / 0.09)'],
    ])('sets the tint in %s', (selector, tint) => {
        expect(declarationsIn(glass, selector)['--glass-button-tint']).toBe(
            tint,
        );
    });
});

describe('the glass-sidebar utility', () => {
    const utility = () => blockAfter(glass, '@utility glass-sidebar ');

    it('tints the sidebar color with the panel alpha', () => {
        expect(utility()).toContain('var(--sidebar)');
        expect(utility()).toContain('calc(var(--glass-panel-alpha) * 100%)');
        expect(utility()).toMatch(/backdrop-filter:\s*blur\(/);
    });

    it('turns into the solid sidebar when transparency is reduced or blur is missing', () => {
        const reduced = blockAfter(
            utility(),
            '@media (prefers-reduced-transparency: reduce)',
        );
        const unsupported = blockAfter(
            utility(),
            '@supports not (backdrop-filter: blur(1px))',
        );

        expect(reduced).toMatch(/background-color:\s*var\(--sidebar\)/);
        expect(reduced).toMatch(/backdrop-filter:\s*none/);
        expect(unsupported).toMatch(/background-color:\s*var\(--sidebar\)/);
    });
});

describe('sidebar text over the sidebar glass', () => {
    const tokens = declarationsIn(theme, '@theme');
    const light = declarationsIn(theme, ':root');
    const modes = [
        ['light', light, declarationsIn(glass, ':root')],
        [
            'dark',
            declarationsIn(theme, '.dark'),
            declarationsIn(glass, '.dark'),
        ],
    ] as const;

    for (const [mode, scope, alphas] of modes) {
        for (const [name, backdrop] of [
            ['white', parseOklch('oklch(1 0 0)')],
            ['black', parseOklch('oklch(0 0 0)')],
        ] as const) {
            it(`stays readable over ${name} in ${mode} mode`, () => {
                const scopes = [scope, tokens, light];

                expect(
                    tintContrast(
                        parseOklch(
                            resolveVar(scope['--sidebar-foreground'], scopes),
                        ),
                        parseOklch(resolveVar(scope['--sidebar'], scopes)),
                        backdrop,
                        Number(alphas['--glass-panel-alpha']),
                    ),
                ).toBeGreaterThanOrEqual(4.5);
            });
        }
    }
});

describe.each(['glass-edge', 'glass-button', 'glass-prominent', 'glass-thumb'])(
    'the %s utility',
    (name) => {
        it('exists', () => {
            expect(glass).toContain(`@utility ${name} `);
        });
    },
);

describe('the lit edge', () => {
    it('lights the top edge in both themes', () => {
        expect(blockAfter(glass, '@utility glass-edge ')).toContain(
            'var(--glass-edge-light)',
        );
        expect(declarationsIn(glass, ':root')['--glass-edge-light']).toBe(
            'inset 0 1px 0 rgb(255 255 255 / 0.9)',
        );
        expect(declarationsIn(glass, '.dark')['--glass-edge-light']).toBe(
            'inset 0 1px 0 rgb(255 255 255 / 0.22)',
        );
    });
});

describe('the button glass', () => {
    it('keeps its shadow to one pixel', () => {
        const shadow = declarationsIn(glass, ':root')['--glass-button-shadow'];

        expect(shadow).toBe('0 1px 2px rgb(0 0 0 / 0.12)');
        expect(declarationsIn(glass, '.dark')['--glass-button-shadow']).toBe(
            '0 1px 2px rgb(0 0 0 / 0.3)',
        );
    });

    it.each(['glass-button', 'glass-prominent', 'glass-thumb'])(
        'turns %s opaque when transparency is reduced',
        (name) => {
            expect(
                blockAfter(
                    blockAfter(glass, `@utility ${name} `),
                    '@media (prefers-reduced-transparency: reduce)',
                ),
            ).toMatch(/backdrop-filter:\s*none/);
        },
    );
});

describe('the glass shadows', () => {
    it.each(['glass-button', 'glass-prominent'])(
        '%s hands its edge and shadow to the shared stack, so glass-edge keeps them',
        (name) => {
            const utility = blockAfter(glass, `@utility ${name} `);

            expect(utility).toContain('--tw-inset-shadow:');
            expect(utility).toContain('--tw-shadow:');
            expect(utility).toContain('var(--tw-shadow, 0 0 #0000)');
        },
    );
});

describe('the glass highlight', () => {
    it('tints a hovered or focused row in both themes', () => {
        expect(declarationsIn(glass, ':root')['--glass-highlight']).toBe(
            'rgb(0 0 0 / 0.05)',
        );
        expect(declarationsIn(glass, '.dark')['--glass-highlight']).toBe(
            'rgb(255 255 255 / 0.1)',
        );
    });
});
