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
    const alpha = `--${name}-alpha`;
    const utility = () => blockAfter(glass, `@utility ${name} `);

    it('tints the popover color with its theme alpha', () => {
        expect(utility()).toContain(`calc(var(${alpha}) * 100%)`);
        expect(utility()).toContain('var(--popover)');
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
    const modes = [
        ['light', light, declarationsIn(glass, ':root')],
        [
            'dark',
            declarationsIn(theme, '.dark'),
            declarationsIn(glass, '.dark'),
        ],
    ] as const;
    const backdrops = [
        ['white', parseOklch('oklch(1 0 0)')],
        ['black', parseOklch('oklch(0 0 0)')],
    ] as const;

    for (const [mode, scope, alphas] of modes) {
        for (const alpha of ['--glass-bar-alpha', '--glass-panel-alpha']) {
            for (const [name, backdrop] of backdrops) {
                it(`stays readable on ${alpha} over ${name} in ${mode} mode`, () => {
                    const scopes = [scope, tokens, light];

                    expect(
                        tintContrast(
                            parseOklch(
                                resolveVar(
                                    scope['--popover-foreground'],
                                    scopes,
                                ),
                            ),
                            parseOklch(resolveVar(scope['--popover'], scopes)),
                            backdrop,
                            Number(alphas[alpha]),
                        ),
                    ).toBeGreaterThanOrEqual(4.5);
                });
            }
        }
    }
});
