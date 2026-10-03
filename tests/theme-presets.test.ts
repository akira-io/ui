import { readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { contrastRatio, parseOklch, toHex } from './helpers/color';
import { declarationsIn, readStylesheet } from './helpers/css';

const REQUIRED = ['--primary', '--primary-foreground'] as const;
const DESTRUCTIVE_PAIR = ['--destructive', '--destructive-foreground'] as const;
const CHART_PALETTE = Array.from(
    { length: 8 },
    (_, index) => `--chart-${index + 1}`,
);
const ALLOWED = new Set<string>([
    ...REQUIRED,
    ...DESTRUCTIVE_PAIR,
    ...CHART_PALETTE,
]);

function expectTokenContract(scope: Record<string, string>): void {
    expect(REQUIRED.filter((token) => !(token in scope))).toEqual([]);
    expect(Object.keys(scope).filter((token) => !ALLOWED.has(token))).toEqual(
        [],
    );

    const destructiveCount = DESTRUCTIVE_PAIR.filter(
        (token) => token in scope,
    ).length;
    expect([0, DESTRUCTIVE_PAIR.length]).toContain(destructiveCount);

    const chartCount = CHART_PALETTE.filter((token) => token in scope).length;
    expect([0, CHART_PALETTE.length]).toContain(chartCount);
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
    expect(CHART_PALETTE.every((token) => token in light)).toBe(
        CHART_PALETTE.every((token) => token in dark),
    );
}

const LARGE_TEXT_EXCEPTIONS = new Map<string, number>([
    ['nosferry.dark.--primary', 3],
]);

function expectReadablePair(
    scope: Record<string, string>,
    background: string,
    foreground: string,
    exceptionKey?: string,
): void {
    const floor =
        (exceptionKey ? LARGE_TEXT_EXCEPTIONS.get(exceptionKey) : undefined) ??
        4.5;

    expect(
        contrastRatio(
            parseOklch(scope[background]),
            parseOklch(scope[foreground]),
        ),
    ).toBeGreaterThanOrEqual(floor);
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

describe('the nosferry brand red', () => {
    const css = readStylesheet('themes/nosferry.css');
    const light = declarationsIn(css, "[data-brand='nosferry']");
    const dark = declarationsIn(css, "[data-brand='nosferry'].dark");

    it('stays one step apart across schemes, not three', () => {
        const distance =
            parseOklch(light['--primary']).l - parseOklch(dark['--primary']).l;

        expect(Math.abs(distance)).toBeLessThan(0.08);
    });

    it('carries white on the fill in both schemes', () => {
        expect(light['--primary-foreground']).toBe('oklch(0.985 0 0)');
        expect(dark['--primary-foreground']).toBe('oklch(0.985 0 0)');
    });

    it('clears the large-text floor on the dark fill, and is recorded as the exception it is', () => {
        const ratio = contrastRatio(
            parseOklch(dark['--primary']),
            parseOklch(dark['--primary-foreground']),
        );

        expect(ratio).toBeGreaterThanOrEqual(3);
        expect(ratio).toBeLessThan(4.5);
        expect(LARGE_TEXT_EXCEPTIONS.has('nosferry.dark.--primary')).toBe(true);
    });
});

describe('the nosferry chart palette', () => {
    const css = readStylesheet('themes/nosferry.css');
    const light = declarationsIn(css, "[data-brand='nosferry']");
    const dark = declarationsIn(css, "[data-brand='nosferry'].dark");

    const approved = {
        light: [
            ['oklch(0.575 0.163 255.532)', '#2a78d6'],
            ['oklch(0.671 0.175 40.642)', '#eb6834'],
            ['oklch(0.669 0.1408 162.1114)', '#1baf7a'],
            ['oklch(0.7644 0.1612 75.1159)', '#eda100'],
            ['oklch(0.716 0.141 357.389)', '#e87ba4'],
            ['oklch(0.529 0.18 142.495)', '#008300'],
            ['oklch(0.433 0.167 283.624)', '#4a3aa7'],
            ['oklch(0.623 0.191 24.912)', '#e34948'],
        ],
        dark: [
            ['oklch(0.622 0.161 255.053)', '#3987e5'],
            ['oklch(0.622 0.173 40.112)', '#d95926'],
            ['oklch(0.6212 0.1283 163.1147)', '#199e70'],
            ['oklch(0.67 0.143 73.227)', '#c98500'],
            ['oklch(0.622 0.171 0.838)', '#d55181'],
            ['oklch(0.529 0.18 142.495)', '#008300'],
            ['oklch(0.67 0.145 286.827)', '#9085e9'],
            ['oklch(0.669 0.159 22.307)', '#e66767'],
        ],
    } as const;

    for (const [mode, scope] of [
        ['light', light],
        ['dark', dark],
    ] as const) {
        it(`uses the approved report palette in ${mode} mode`, () => {
            expect(CHART_PALETTE.map((token) => scope[token])).toEqual(
                approved[mode].map(([value]) => value),
            );
        });

        it(`round-trips every ${mode} chart color to its approved hex`, () => {
            expect(
                CHART_PALETTE.map((token) => toHex(parseOklch(scope[token]))),
            ).toEqual(approved[mode].map(([, hex]) => hex));
        });
    }
});

describe('the chart palette token contract', () => {
    const primary = {
        '--primary': 'oklch(0.577 0.245 27.325)',
        '--primary-foreground': 'oklch(0.985 0 0)',
    };
    const palette = Object.fromEntries(
        CHART_PALETTE.map((token) => [token, 'oklch(0.6 0.15 250)']),
    );

    it('accepts the complete palette in both schemes', () => {
        expect(() =>
            expectPresetTokenContract(
                { ...primary, ...palette },
                { ...primary, ...palette },
            ),
        ).not.toThrow();
    });

    it('rejects a partial palette', () => {
        const partial = Object.fromEntries(
            CHART_PALETTE.slice(0, 5).map((token) => [token, palette[token]]),
        );

        expect(() =>
            expectPresetTokenContract(
                { ...primary, ...partial },
                { ...primary, ...partial },
            ),
        ).toThrow();
    });

    it('rejects a palette declared in only one scheme', () => {
        expect(() =>
            expectPresetTokenContract({ ...primary, ...palette }, primary),
        ).toThrow();
    });

    it('rejects a chart token beyond the eighth', () => {
        expect(() =>
            expectPresetTokenContract(
                { ...primary, ...palette, '--chart-9': 'oklch(0.6 0.15 250)' },
                { ...primary, ...palette },
            ),
        ).toThrow();
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

            expectReadablePair(
                scope,
                '--primary',
                '--primary-foreground',
                `${brand}.${mode}.--primary`,
            );

            if ('--destructive' in scope) {
                expectReadablePair(
                    scope,
                    '--destructive',
                    '--destructive-foreground',
                    `${brand}.${mode}.--destructive`,
                );
            }
        });
    }
});
