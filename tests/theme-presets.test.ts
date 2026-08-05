import { readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { contrastRatio, parseOklch } from './helpers/color';
import { declarationsIn, readStylesheet } from './helpers/css';

const REQUIRED = ['--primary', '--primary-foreground'] as const;
const DESTRUCTIVE_PAIR = ['--destructive', '--destructive-foreground'] as const;
const ALLOWED = new Set<string>([...REQUIRED, ...DESTRUCTIVE_PAIR]);

function expectTokenContract(scope: Record<string, string>): void {
    expect(REQUIRED.filter((token) => !(token in scope))).toEqual([]);
    expect(Object.keys(scope).filter((token) => !ALLOWED.has(token))).toEqual(
        [],
    );

    const destructiveCount = DESTRUCTIVE_PAIR.filter(
        (token) => token in scope,
    ).length;
    expect([0, DESTRUCTIVE_PAIR.length]).toContain(destructiveCount);
}

function expectPresetTokenContract(
    light: Record<string, string>,
    dark: Record<string, string>,
): void {
    expectTokenContract(light);
    expectTokenContract(dark);
    expect(DESTRUCTIVE_PAIR.every((token) => token in light)).toBe(
        DESTRUCTIVE_PAIR.every((token) => token in dark),
    );
}

function expectReadablePair(
    scope: Record<string, string>,
    background: string,
    foreground: string,
): void {
    expect(
        contrastRatio(
            parseOklch(scope[background]),
            parseOklch(scope[foreground]),
        ),
    ).toBeGreaterThanOrEqual(4.5);
}

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

describe('the nosferry destructive palette', () => {
    const css = readStylesheet('themes/nosferry.css');
    const light = declarationsIn(css, "[data-brand='nosferry']");
    const dark = declarationsIn(css, "[data-brand='nosferry'].dark");

    it('uses the approved vermillion pair in light mode', () => {
        expect(light['--destructive']).toBe('oklch(0.565 0.21 34)');
        expect(light['--destructive-foreground']).toBe('oklch(0.985 0 0)');
    });

    it('uses the approved vermillion pair in dark mode', () => {
        expect(dark['--destructive']).toBe('oklch(0.72 0.18 38)');
        expect(dark['--destructive-foreground']).toBe('oklch(0.161 0.027 294)');
    });
});

describe('the cross-scheme destructive token contract', () => {
    it('rejects a destructive pair that is declared in only one scheme', () => {
        const light = {
            '--primary': 'oklch(0.577 0.245 27.325)',
            '--primary-foreground': 'oklch(0.985 0 0)',
            '--destructive': 'oklch(0.565 0.21 34)',
            '--destructive-foreground': 'oklch(0.985 0 0)',
        };
        const dark = {
            '--primary': 'oklch(0.704 0.191 22.216)',
            '--primary-foreground': 'oklch(0.161 0.027 294)',
        };

        expect(() => expectPresetTokenContract(light, dark)).toThrow();
    });
});

describe.each(presets)('the %s preset', (brand) => {
    const css = readStylesheet(`themes/${brand}.css`);
    const light = declarationsIn(css, `[data-brand='${brand}']`);
    const dark = declarationsIn(css, `[data-brand='${brand}'].dark`);

    it('follows the token contract across light and dark modes', () => {
        expectPresetTokenContract(light, dark);
    });

    for (const [mode, scope] of [
        ['light', light],
        ['dark', dark],
    ] as const) {
        it(`follows the token contract in ${mode} mode`, () => {
            for (const value of Object.values(scope)) {
                expect(value.startsWith('oklch(')).toBe(true);
            }

            expectReadablePair(scope, '--primary', '--primary-foreground');

            if ('--destructive' in scope) {
                expectReadablePair(
                    scope,
                    '--destructive',
                    '--destructive-foreground',
                );
            }
        });
    }
});
