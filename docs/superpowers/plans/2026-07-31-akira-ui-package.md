# Akira UI Package Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship `@akira-io/ui` 1.0.0: a public, open-source fork of `nosferry-ui` whose default palette is the Akira purple ramp and whose brand colors are swappable through `data-brand` CSS presets.

**Architecture:** A new repository copied from `nosferry-ui` with no git history. `theme.css` gains an eleven-step Akira ramp in the `@theme` block; the semantic tokens point at steps 600 and 400 instead of literals. Brand presets are small CSS files scoped to `[data-brand='<name>']`, shipped under `themes/`. Three vitest suites parse the shipped CSS and enforce the ramp, the contrast and the preset contract. Publishing moves from GitHub Packages to public npm with trusted publishing.

**Tech Stack:** TypeScript, React 19, Tailwind v4, tsup, vitest, bun, git-cliff, GitHub Actions.

This plan covers the package only. The preview site (`kidiatoliny/ui`) is a separate plan, written after this one lands, because its demos must be written against the real published surface.

Spec: `docs/superpowers/specs/2026-07-31-akira-ui-open-source-theming-design.md`.

## Global Constraints

- Package manager is bun. Never npm, pnpm or yarn for installs or scripts. Two exceptions, both about the registry rather than dependencies: `npm publish`, required for trusted publishing, and `npm pack --dry-run`, used to inspect what the published tarball would contain.
- Prettier config is fixed: 4-space indent, single quotes, semicolons, print width 80. Run `bun run format` before every commit.
- No narrative or explanatory comments in any file. Names carry the meaning. A CSS comment naming the Tailwind step a value came from (`/* red-600 */`) is allowed because the value alone cannot express it.
- TypeScript is fully typed. No `any`. Named exports only.
- Every color value in CSS is OKLCH with three space-separated components: `oklch(L C H)`.
- All paths in this plan are relative to the new `akira-ui` repository root unless stated otherwise.
- The package name is `@akira-io/ui`. The repository name is `akira-ui`. These differ on purpose.
- Brand ink is `oklch(0.161 0.027 294)`. Brand white is `oklch(0.985 0 0)`. Both appear verbatim many times; never round them differently.

---

### Task 1: Bootstrap the repository

**Files:**
- Create: the whole `akira-ui` tree, copied from `nosferry-ui`
- Modify: `package.json`, `cliff.toml`

**Interfaces:**
- Consumes: nothing
- Produces: a repo that installs, typechecks and builds under the name `@akira-io/ui` at version `1.0.0`

- [ ] **Step 1: Confirm the source is ready (STOP AND ASK)**

The user has an in-flight patch on `nosferry-ui`. Do not copy anything until they confirm it has landed. Ask:

> "Ready to copy the nosferry-ui tree into the new akira-ui repo. Is your patch landed, and is `main` the commit you want copied?"

Wait for an explicit yes. If they name a different branch or commit, copy that instead.

- [ ] **Step 2: Copy the tree without history**

```bash
cd ~/akira-io && cp -R nosferry-ui akira-ui && rm -rf akira-ui/.git akira-ui/node_modules akira-ui/dist akira-ui/CHANGELOG.md
```

- [ ] **Step 3: Start a fresh history**

```bash
cd ~/akira-io/akira-ui && git init -b main && git add -A && git commit -m "chore: import component library from nosferry-ui"
```

- [ ] **Step 4: Rename the package**

In `package.json`, replace the first four fields:

```json
{
  "name": "@akira-io/ui",
  "version": "1.0.0",
  "description": "Open-source React component library — the full shadcn/ui set on an OKLCH design-token system with swappable brand palettes.",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/akira-io/akira-ui.git"
  },
```

Replace the `publishConfig` block:

```json
  "publishConfig": {
    "access": "public"
  },
```

- [ ] **Step 5: Point git-cliff at the new repo**

In `cliff.toml`, change `repo = "nosferry-ui"` to `repo = "akira-ui"`.

- [ ] **Step 6: Install and verify the tree still builds**

```bash
cd ~/akira-io/akira-ui && bun install && bun run typecheck && bun run build && bun run test
```

Expected: install succeeds, typecheck silent, `dist/` written with `index.js`, `blocks.js`, `shells.js`, `inertia.js` and their `.d.ts`, two existing test files pass.

- [ ] **Step 7: Commit**

```bash
git add package.json cliff.toml bun.lock && git commit -m "chore: rename package to @akira-io/ui"
```

---

### Task 2: Color and CSS test helpers

**Files:**
- Create: `tests/helpers/color.ts`
- Create: `tests/helpers/css.ts`
- Test: `tests/helpers/color.test.ts`
- Modify: `vitest.config.ts`

**Interfaces:**
- Consumes: nothing
- Produces:
  - `parseOklch(value: string): Oklch` where `Oklch = { l: number; c: number; h: number }`
  - `oklchToSrgb(color: Oklch): [number, number, number]`: gamma-encoded, unclamped
  - `isInGamut(rgb: [number, number, number]): boolean`
  - `toHex(color: Oklch): string`
  - `contrastRatio(a: Oklch, b: Oklch): number`
  - `readStylesheet(relativePath: string): string`
  - `declarationsIn(css: string, selector: string): Record<string, string>`
  - `resolveVar(value: string, scopes: Record<string, string>[]): string`

- [ ] **Step 1: Widen the vitest include**

`vitest.config.ts`, replace the `test` block:

```ts
    test: {
        include: ['src/**/*.test.ts', 'tests/**/*.test.ts'],
    },
```

- [ ] **Step 2: Write the failing helper test**

Create `tests/helpers/color.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import {
    contrastRatio,
    isInGamut,
    oklchToSrgb,
    parseOklch,
    toHex,
} from './color';

describe('parseOklch', () => {
    it('reads the three components', () => {
        expect(parseOklch('oklch(0.588 0.212 288)')).toEqual({
            l: 0.588,
            c: 0.212,
            h: 288,
        });
    });

    it('rejects anything that is not oklch', () => {
        expect(() => parseOklch('#7c5cf0')).toThrow('not an oklch value');
    });
});

describe('toHex', () => {
    it('converts the Akira brand purple', () => {
        expect(toHex(parseOklch('oklch(0.588 0.212 288)'))).toBe('#7c5cf0');
    });

    it('converts the brand ink', () => {
        expect(toHex(parseOklch('oklch(0.161 0.027 294)'))).toBe('#0e0b18');
    });
});

describe('isInGamut', () => {
    it('accepts a displayable color', () => {
        expect(isInGamut(oklchToSrgb(parseOklch('oklch(0.588 0.212 288)')))).toBe(
            true,
        );
    });

    it('rejects a chroma no display can render', () => {
        expect(isInGamut(oklchToSrgb(parseOklch('oklch(0.7 0.4 288)')))).toBe(
            false,
        );
    });
});

describe('contrastRatio', () => {
    it('is 21 for black on white', () => {
        expect(
            contrastRatio(parseOklch('oklch(1 0 0)'), parseOklch('oklch(0 0 0)')),
        ).toBeCloseTo(21, 4);
    });

    it('is symmetric', () => {
        const a = parseOklch('oklch(0.523 0.238 288)');
        const b = parseOklch('oklch(0.985 0 0)');
        expect(contrastRatio(a, b)).toBeCloseTo(contrastRatio(b, a), 10);
    });

    it('matches the verified Akira 600 on white', () => {
        expect(
            contrastRatio(
                parseOklch('oklch(0.523 0.238 288)'),
                parseOklch('oklch(0.985 0 0)'),
            ),
        ).toBeCloseTo(5.84, 2);
    });
});
```

- [ ] **Step 3: Run it to verify it fails**

Run: `bun run test -- tests/helpers/color.test.ts`
Expected: FAIL, cannot resolve `./color`.

- [ ] **Step 4: Write the color helper**

Create `tests/helpers/color.ts`:

```ts
export type Oklch = { l: number; c: number; h: number };

export function parseOklch(value: string): Oklch {
    const match = value
        .trim()
        .match(/^oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)\s*\)$/);

    if (!match) {
        throw new Error(`not an oklch value: ${value}`);
    }

    return { l: Number(match[1]), c: Number(match[2]), h: Number(match[3]) };
}

function toLinearSrgb({ l, c, h }: Oklch): [number, number, number] {
    const radians = (h * Math.PI) / 180;
    const a = c * Math.cos(radians);
    const b = c * Math.sin(radians);

    const long = (l + 0.3963377774 * a + 0.2158037573 * b) ** 3;
    const medium = (l - 0.1055613458 * a - 0.0638541728 * b) ** 3;
    const short = (l - 0.0894841775 * a - 1.291485548 * b) ** 3;

    return [
        4.0767416621 * long - 3.3077115913 * medium + 0.2309699292 * short,
        -1.2684380046 * long + 2.6097574011 * medium - 0.3413193965 * short,
        -0.0041960863 * long - 0.7034186147 * medium + 1.707614701 * short,
    ];
}

function encode(channel: number): number {
    const sign = channel < 0 ? -1 : 1;
    const magnitude = Math.abs(channel);

    return magnitude <= 0.0031308
        ? sign * 12.92 * magnitude
        : sign * (1.055 * magnitude ** (1 / 2.4) - 0.055);
}

export function oklchToSrgb(color: Oklch): [number, number, number] {
    const linear = toLinearSrgb(color);

    return [encode(linear[0]), encode(linear[1]), encode(linear[2])];
}

export function isInGamut(rgb: [number, number, number]): boolean {
    return rgb.every((channel) => channel >= -0.0005 && channel <= 1.0005);
}

export function toHex(color: Oklch): string {
    const channels = oklchToSrgb(color).map((channel) =>
        Math.round(Math.min(1, Math.max(0, channel)) * 255)
            .toString(16)
            .padStart(2, '0'),
    );

    return `#${channels.join('')}`;
}

function relativeLuminance(color: Oklch): number {
    const [r, g, b] = toLinearSrgb(color).map((channel) =>
        Math.min(1, Math.max(0, channel)),
    );

    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function contrastRatio(a: Oklch, b: Oklch): number {
    const [lighter, darker] = [relativeLuminance(a), relativeLuminance(b)].sort(
        (first, second) => second - first,
    );

    return (lighter + 0.05) / (darker + 0.05);
}
```

`encode` deliberately does not clamp: it preserves the sign and magnitude of an out-of-range channel so
`isInGamut` can see it. Clamping lives in `toHex` alone, since a hex string cannot express a color outside the
gamut. Clamping inside `oklchToSrgb` would make every color look displayable and the gamut test would never
fail.

- [ ] **Step 5: Run the test to verify it passes**

Run: `bun run test -- tests/helpers/color.test.ts`
Expected: PASS, 8 tests.

- [ ] **Step 6: Write the CSS helper**

Create `tests/helpers/css.ts`:

```ts
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

export function readStylesheet(relativePath: string): string {
    return readFileSync(
        fileURLToPath(new URL(`../../${relativePath}`, import.meta.url)),
        'utf8',
    );
}

export function declarationsIn(
    css: string,
    selector: string,
): Record<string, string> {
    const stripped = css.replace(/\/\*[\s\S]*?\*\//g, '');
    const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const block = stripped.match(
        new RegExp(`(?:^|[};])\\s*${escaped}\\s*\\{([^}]*)\\}`),
    );

    if (!block) {
        throw new Error(`selector not found: ${selector}`);
    }

    const declarations: Record<string, string> = {};

    for (const line of block[1].split(';')) {
        const [property, ...rest] = line.split(':');
        const value = rest.join(':').trim();

        if (property.trim().startsWith('--') && value) {
            declarations[property.trim()] = value;
        }
    }

    return declarations;
}

export function resolveVar(
    value: string,
    scopes: Record<string, string>[],
): string {
    const reference = value.trim().match(/^var\(\s*(--[\w-]+)\s*\)$/);

    if (!reference) {
        return value.trim();
    }

    for (const scope of scopes) {
        if (reference[1] in scope) {
            return resolveVar(scope[reference[1]], scopes);
        }
    }

    throw new Error(`unresolved variable: ${reference[1]}`);
}
```

Comments are stripped before parsing. Without that, the `/* red-600 */` marker in a preset falls between two
declarations and swallows the one that follows it. The block prefix accepts `;` as well as `}` and start of
string because `@theme` in `theme.css` follows the `@custom-variant` statement, which ends in a semicolon.

- [ ] **Step 7: Verify the helpers load against the current stylesheet**

Run:

```bash
bun run test
```

Expected: PASS. The CSS helper has no test of its own yet; Task 3 exercises it.

- [ ] **Step 8: Format and commit**

```bash
bun run format && git add tests vitest.config.ts && git commit -m "test: add OKLCH and stylesheet parsing helpers"
```

---

### Task 3: The Akira ramp

**Files:**
- Modify: `theme.css` (the `@theme` block, currently lines 3-40)
- Test: `tests/theme-ramp.test.ts`

**Interfaces:**
- Consumes: `parseOklch`, `oklchToSrgb`, `isInGamut`, `toHex` from `tests/helpers/color`; `readStylesheet`, `declarationsIn` from `tests/helpers/css`
- Produces: eleven `--color-akira-<step>` custom properties in the `@theme` block of `theme.css`

The ramp is Tailwind v4's `violet` lightness and chroma curve, hue fixed at 288, chroma scaled by 0.848, lightness shifted by −0.018, which places step 500 exactly on the Akira banner purple `#7c5cf0`.

- [ ] **Step 1: Write the failing ramp test**

Create `tests/theme-ramp.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { isInGamut, oklchToSrgb, parseOklch, toHex } from './helpers/color';
import { declarationsIn, readStylesheet } from './helpers/css';

const STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
const theme = declarationsIn(readStylesheet('theme.css'), '@theme');

describe('the akira ramp', () => {
    it('declares every step', () => {
        for (const step of STEPS) {
            expect(theme).toHaveProperty(`--color-akira-${step}`);
        }
    });

    it('places step 500 on the brand purple', () => {
        expect(toHex(parseOklch(theme['--color-akira-500']))).toBe('#7c5cf0');
    });

    it('darkens monotonically from 50 to 950', () => {
        const lightness = STEPS.map(
            (step) => parseOklch(theme[`--color-akira-${step}`]).l,
        );

        for (let index = 1; index < lightness.length; index += 1) {
            expect(lightness[index]).toBeLessThan(lightness[index - 1]);
        }
    });

    it('holds a single hue', () => {
        for (const step of STEPS) {
            expect(parseOklch(theme[`--color-akira-${step}`]).h).toBe(288);
        }
    });

    it('renders every step inside the sRGB gamut', () => {
        for (const step of STEPS) {
            const color = parseOklch(theme[`--color-akira-${step}`]);
            expect(isInGamut(oklchToSrgb(color))).toBe(true);
        }
    });
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `bun run test -- tests/theme-ramp.test.ts`
Expected: FAIL on the first test, `--color-akira-50` missing.

- [ ] **Step 3: Add the ramp to the `@theme` block**

In `theme.css`, insert immediately after the `--radius-sm` line and before `--color-background`:

```css
    --color-akira-50: oklch(0.951 0.014 288);
    --color-akira-100: oklch(0.925 0.025 288);
    --color-akira-200: oklch(0.876 0.048 288);
    --color-akira-300: oklch(0.793 0.094 288);
    --color-akira-400: oklch(0.684 0.155 288);
    --color-akira-500: oklch(0.588 0.212 288);
    --color-akira-600: oklch(0.523 0.238 288);
    --color-akira-700: oklch(0.473 0.229 288);
    --color-akira-800: oklch(0.414 0.197 288);
    --color-akira-900: oklch(0.362 0.16 288);
    --color-akira-950: oklch(0.265 0.12 288);

```

- [ ] **Step 4: Run the test to verify it passes**

Run: `bun run test -- tests/theme-ramp.test.ts`
Expected: PASS, 5 tests.

- [ ] **Step 5: Commit**

```bash
bun run format && git add theme.css tests/theme-ramp.test.ts && git commit -m "feat(theme): add the akira color ramp"
```

---

### Task 4: Semantic tokens on the 600/400 rule

**Files:**
- Modify: `theme.css` (`:root` block, currently lines 42-71; `.dark` block, currently lines 73-101)
- Test: `tests/theme-contrast.test.ts`

**Interfaces:**
- Consumes: the ramp from Task 3, `resolveVar` from `tests/helpers/css`
- Produces: `--primary`, `--primary-foreground`, `--ring`, `--sidebar-primary`, `--sidebar-primary-foreground` resolving to the ramp in both schemes

- [ ] **Step 1: Write the failing contrast test**

Create `tests/theme-contrast.test.ts`:

```ts
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
```

- [ ] **Step 2: Run it to verify it fails**

Run: `bun run test -- tests/theme-contrast.test.ts`
Expected: FAIL: `--primary` is a literal red, and the destructive light-mode test fails because `--destructive-foreground` currently equals `--destructive`.

- [ ] **Step 3: Rewrite the `:root` block**

In `theme.css`, replace the five affected declarations inside `:root`:

```css
    --primary: var(--color-akira-600);
    --primary-foreground: oklch(0.985 0 0);
```

```css
    --destructive: oklch(0.577 0.245 27.325);
    --destructive-foreground: oklch(0.985 0 0);
```

```css
    --ring: var(--primary);
```

```css
    --sidebar-primary: var(--primary);
    --sidebar-primary-foreground: var(--primary-foreground);
```

- [ ] **Step 4: Rewrite the `.dark` block**

```css
    --primary: var(--color-akira-400);
    --primary-foreground: oklch(0.161 0.027 294);
```

```css
    --destructive: oklch(0.704 0.191 22.216);
    --destructive-foreground: oklch(0.161 0.027 294);
```

```css
    --ring: var(--primary);
```

```css
    --sidebar-primary: var(--primary);
    --sidebar-primary-foreground: var(--primary-foreground);
```

- [ ] **Step 5: Run the test to verify it passes**

Run: `bun run test -- tests/theme-contrast.test.ts`
Expected: PASS, 9 tests. Light primary lands at 5.84:1 and dark at 6.54:1.

- [ ] **Step 6: Commit**

```bash
bun run format && git add theme.css tests/theme-contrast.test.ts && git commit -m "feat(theme): drive semantic tokens from the akira ramp"
```

---

### Task 5: Brand presets

**Files:**
- Create: `themes/nosferry.css`
- Modify: `package.json` (`exports`, `files`)
- Test: `tests/theme-presets.test.ts`

**Interfaces:**
- Consumes: helpers from Task 2
- Produces: `themes/<brand>.css` files importable as `@akira-io/ui/themes/<brand>.css`, each declaring exactly four custom properties under `[data-brand='<brand>']` and `[data-brand='<brand>'].dark`

- [ ] **Step 1: Write the failing preset test**

Create `tests/theme-presets.test.ts`:

```ts
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
```

- [ ] **Step 2: Run it to verify it fails**

Run: `bun run test -- tests/theme-presets.test.ts`
Expected: FAIL, `themes` directory does not exist.

- [ ] **Step 3: Write the NosFerry preset**

Create `themes/nosferry.css`:

```css
[data-brand='nosferry'] {
    --primary: oklch(0.577 0.245 27.325); /* red-600 */
    --primary-foreground: oklch(0.985 0 0);
}

[data-brand='nosferry'].dark {
    --primary: oklch(0.704 0.191 22.216); /* red-400 */
    --primary-foreground: oklch(0.161 0.027 294);
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `bun run test -- tests/theme-presets.test.ts`
Expected: PASS, 6 tests. Light mode lands at 4.56:1. It clears AA with little margin, which is expected for `red-600` on white and is why the threshold is a hard gate.

- [ ] **Step 5: Ship the directory in the package**

In `package.json`, add to `exports` after the `"./theme.css"` entry:

```json
    "./themes/*.css": "./themes/*.css"
```

and add `"themes"` to `files`:

```json
  "files": [
    "dist",
    "theme.css",
    "themes"
  ],
```

- [ ] **Step 6: Verify the package would ship it**

Run: `npm pack --dry-run`
Expected: the file list includes `themes/nosferry.css` and `theme.css`.

- [ ] **Step 7: Commit**

```bash
bun run format && git add themes package.json tests/theme-presets.test.ts && git commit -m "feat(theme): add data-brand presets with the nosferry palette"
```

---

### Task 6: Rename the tour popover class

**Files:**
- Modify: `src/blocks/tour/tour.tsx:122`
- Modify: `theme.css` (nine `.driver-popover.nosferry-tour` selectors, currently lines 113-164)

**Interfaces:**
- Consumes: nothing
- Produces: the popover class `akira-tour`

- [ ] **Step 1: Rename the class in the component**

`src/blocks/tour/tour.tsx`, line 122:

```tsx
                popoverClass: 'akira-tour',
```

- [ ] **Step 2: Rename every selector in the stylesheet**

```bash
cd ~/akira-io/akira-ui && sed -i '' 's/nosferry-tour/akira-tour/g' theme.css
```

- [ ] **Step 3: Verify nothing references the old name**

Run: `grep -ri nosferry src theme.css themes`
Expected: no output.

- [ ] **Step 4: Run the full suite**

Run: `bun run test && bun run typecheck`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
bun run format && git add src/blocks/tour/tour.tsx theme.css && git commit -m "feat(tour)!: rename the popover class to akira-tour"
```

---

### Task 7: Public npm release pipeline

**Files:**
- Modify: `.github/workflows/release.yml` (publish job, currently lines 82-109; Discord step, lines 67-80)

**Interfaces:**
- Consumes: `package.json` from Task 1
- Produces: a tag-driven workflow that publishes to public npm with provenance

- [ ] **Step 1: Give the publish job an OIDC identity**

In `.github/workflows/release.yml`, add to the `publish` job, directly under `runs-on`:

```yaml
    permissions:
      contents: read
      id-token: write
```

- [ ] **Step 2: Replace the GitHub Packages auth step**

Delete the whole `Configure GitHub Packages auth` step (the `.npmrc` heredoc and its `env` block) and put in its place:

```yaml
      - uses: actions/setup-node@49933ea5288caeca8642d1e84afbd3f7d6820020 # v4
        with:
          node-version: 22
          registry-url: https://registry.npmjs.org
```

- [ ] **Step 3: Publish with npm instead of bun**

Replace the final `- run: bun publish` with:

```yaml
      - run: npm install -g npm@latest
      - run: npm publish --provenance --access public
```

Build and typecheck stay on bun. npm is used only for the publish call, because trusted publishing needs npm 11.5 or newer to exchange the OIDC token.

- [ ] **Step 4: Rename the Discord identity**

In the `Send GitHub Release to Discord` step, change `username` and `footer_title` from `NosFerry UI` to `Akira UI`.

- [ ] **Step 5: Check the workflow parses**

Run: `bunx yaml-lint .github/workflows/release.yml`. If that binary is unavailable, run `node -e "const {readFileSync}=require('fs');console.log(readFileSync('.github/workflows/release.yml','utf8').split('\n').length+' lines')"` and read the diff carefully instead.
Expected: no parse error.

- [ ] **Step 6: Commit**

```bash
git add .github/workflows/release.yml && git commit -m "ci: publish to public npm with trusted publishing"
```

---

### Task 8: Open-source root files

**Files:**
- Modify: `README.md`
- Create: `CONTRIBUTING.md`
- Create: `SECURITY.md`
- Create: `assets/banner.svg`

**Interfaces:**
- Consumes: the package name and install command from Task 1
- Produces: the root files a public repo needs

- [ ] **Step 1: Generate the akira-family README and root files**

Invoke the `akira-readme` skill against this repository. It produces the banner, the badge row, the install section, the docs index, and the `CONTRIBUTING.md` and `SECURITY.md` templates. Keep `LICENSE` as it is (MIT, unchanged).

- [ ] **Step 2: Correct what the skill cannot know**

The README must state, in its own words:

- Install: `bun add @akira-io/ui`
- The default palette is Akira purple, and no configuration is required to get it.
- Brands are swapped by importing `@akira-io/ui/themes/<brand>.css` and setting `data-brand` on `<html>`.
- Link to `docs/00-index.md` and to the preview site once it exists.

- [ ] **Step 3: Verify no internal references survived**

Run: `grep -ril "nosferry" README.md CONTRIBUTING.md SECURITY.md`
Expected: no output, unless it is the NosFerry preset named as an example, which is fine.

- [ ] **Step 4: Commit**

```bash
git add README.md CONTRIBUTING.md SECURITY.md assets && git commit -m "docs: add open-source readme and community files"
```

---

### Task 9: Rewrite the reference docs

**Files:**
- Modify: `docs/00-index.md`, `docs/01-installation.md`, `docs/02-theme-and-tokens.md`, `docs/03-components.md`

**Interfaces:**
- Consumes: everything from Tasks 3-6
- Produces: the first four documentation pages, brand-neutral and public

Convention, unchanged from the existing tree: numeric prefix, kebab-case, numbered index with one-line descriptions, navigation footer on every page.

- [ ] **Step 1: Rewrite the index**

`docs/00-index.md`: replace the whole file. It introduces `@akira-io/ui` with no NosFerry framing, lists the nine pages with descriptions, and states the at-a-glance facts: public npm, bun, React 19 with Tailwind v4 and Radix, Akira purple by default with swappable brand presets, framework-agnostic core where only the shells need a router.

- [ ] **Step 2: Rewrite installation**

`docs/01-installation.md`: remove every `.npmrc`, GitHub token and `npm.pkg.github.com` reference. The page covers: `bun add @akira-io/ui`, importing `@akira-io/ui/theme.css` in the app stylesheet, the Tailwind v4 wiring, the peer dependencies, and the `data-brand` attribute with the note that omitting it means Akira.

- [ ] **Step 3: Rewrite theme and tokens**

`docs/02-theme-and-tokens.md`: replace the NosFerry-red token table. The page carries the full eleven-step ramp table with OKLCH values and hex, the 600/400 rule, the complete semantic token table, what derives from `--primary`, dark mode via the `dark` class and `useAppearance`, and an explicit statement of what a brand may override (`--primary`, `--primary-foreground`) and may not (everything else). Delete the `STYLE_GUIDE.md` reference at the end of the file; nothing outside the repo may be cited.

- [ ] **Step 4: Rewrite the component catalog**

`docs/03-components.md`: the 55 components with import paths, brand-neutral prose, and a link per component to its page on the preview site, marked as pending until that site exists.

- [ ] **Step 5: Verify every internal link resolves**

Run:

```bash
grep -oh "](0[0-9]-[a-z-]*\.md" docs/*.md | sort -u | sed 's/](//' | while read f; do test -f "docs/$f" || echo "broken: $f"; done
```

Expected: no output.

- [ ] **Step 6: Commit**

```bash
git add docs && git commit -m "docs: rewrite the index, installation, theme and component pages"
```

---

### Task 10: Rewrite the guides

**Files:**
- Modify: `docs/04-shells.md`, `docs/05-adoption-guide.md`, `docs/06-development.md`

**Interfaces:**
- Consumes: Task 9's conventions
- Produces: the shells, adoption and development pages

- [ ] **Step 1: Rewrite the shells page**

`docs/04-shells.md`: same substance, written for a reader who has never seen a NosFerry app. Every example uses a generic app.

- [ ] **Step 2: Rewrite the adoption guide**

`docs/05-adoption-guide.md`: adopting the library in any React app, plus a migration section for apps on `@akira-io/nosferry-ui`. The migration section leads with the attribute, because forgetting it is silent:

1. `bun remove @akira-io/nosferry-ui && bun add @akira-io/ui`, and drop the `@akira-io` GitHub Packages line from `.npmrc`.
2. Set `data-brand="nosferry"` on `<html>`. Without it the app renders purple and nothing warns you.
3. Import `@akira-io/ui/themes/nosferry.css` after `@akira-io/ui/theme.css`.
4. Update every import specifier.
5. Expect two visual changes: the focus ring now carries the brand color, and dark mode uses `red-400` instead of `red-600`.
6. If any app CSS targets `.nosferry-tour`, rename it to `.akira-tour`.

- [ ] **Step 3: Rewrite the development page**

`docs/06-development.md`: local setup with bun, the test suites and what each one guards, adding a component and the demo it must ship with on the site, `bun run format` before committing, the tag-driven release, and the trusted-publishing setup including the one-time manual publish.

- [ ] **Step 4: Commit**

```bash
git add docs && git commit -m "docs: rewrite the shells, adoption and development guides"
```

---

### Task 11: New documentation pages

**Files:**
- Create: `docs/07-theming.md`
- Create: `docs/08-blocks.md`
- Create: `docs/09-contributing.md`
- Modify: `docs/00-index.md` (contents list), `docs/06-development.md` (footer link)

**Interfaces:**
- Consumes: the ramp math from Task 3, the preset contract from Task 5
- Produces: the three pages the current tree lacks

- [ ] **Step 1: Write the theming page**

`docs/07-theming.md` is the deepest page in the tree. It must contain, in order:

1. The token model: palette (`--color-akira-*`) versus semantic tokens (`--primary` and friends), and why only the semantic layer is brand-dependent.
2. The 600/400 rule, with the measured contrast of the Akira pair in both schemes.
3. Building a ramp for a new brand, as a procedure someone can follow: pick the Tailwind ramp whose hue is nearest the brand color, keep its lightness and chroma curve, shift the hue to the brand hue, scale the chroma so step 500 lands on the brand color, then verify every step is in gamut. Show the Akira numbers as the worked example: violet curve, hue 288, chroma ×0.848, lightness −0.018.
4. Writing the preset: the exact four declarations, the `[data-brand='<name>']` and `[data-brand='<name>'].dark` selectors, the filename rule, and the import order.
5. Shipping it: in the package with a pull request, or in your own app's stylesheet under your own `data-brand` value.
6. What the tests check, so a contributor knows what will reject their preset before they open the pull request.
7. The warning that the banner purple, step 500, reaches only 4.32:1 on white and must not be used behind text.

- [ ] **Step 2: Write the blocks page**

`docs/08-blocks.md`: the eight blocks in `src/blocks`: command palette, date filter, info field, localized fields, section header, settings card, stat card, tour. Each with its purpose, import path, props, and the tour's `akira-tour` class for apps that restyle the popover.

- [ ] **Step 3: Write the contributing page**

`docs/09-contributing.md`: how to add a component, the requirement that it ships with a demo on the preview site, the comment policy, the formatting rules, the commit convention git-cliff parses, and what a review will check.

- [ ] **Step 4: Wire the new pages into the index**

Add entries 7, 8 and 9 to the contents list in `docs/00-index.md`, and fix the navigation footers so `06` points forward to `07` and each new page points back and forward correctly. `09` is the last page and has no next link.

- [ ] **Step 5: Verify every internal link resolves**

Run:

```bash
grep -oh "](0[0-9]-[a-z-]*\.md" docs/*.md | sort -u | sed 's/](//' | while read f; do test -f "docs/$f" || echo "broken: $f"; done
```

Expected: no output.

- [ ] **Step 6: Commit**

```bash
git add docs && git commit -m "docs: add the theming, blocks and contributing pages"
```

---

### Task 12: Release

**Files:**
- Modify: none. This task runs commands and stops for the user.

**Interfaces:**
- Consumes: everything above
- Produces: `@akira-io/ui@1.0.0` on npm and the `v1.0.0` GitHub release

- [ ] **Step 1: Run the full gate locally**

```bash
bun run format:check && bun run typecheck && bun run test && bun run build && npm pack --dry-run
```

Expected: all pass; the tarball lists `dist/`, `theme.css`, `themes/nosferry.css`, `README.md`, `LICENSE`.

- [ ] **Step 2: Push the repository (STOP AND ASK)**

The remote does not exist yet and creating it is the user's call. Ask them to confirm the repo should be created as public under the `akira-io` organization, then:

```bash
gh repo create akira-io/akira-ui --public --source . --remote origin --push
```

- [ ] **Step 3: Hold for the preview site**

The spec makes the site a release gate: the gallery is built against this local package and all 75 entries are reviewed in both brands and both color schemes before 1.0.0 reaches npm. Stop here and hand back. Steps 4 to 6 run only after that review.

- [ ] **Step 4: First publish, by the user**

Trusted publishing cannot bootstrap itself: the package must exist before the repository can be bound to it. The user runs, from the repo root:

```bash
npm publish --access public
```

- [ ] **Step 5: Bind trusted publishing**

The user, on npmjs.com: package settings, then the trusted publisher section, then GitHub Actions with owner `akira-io`, repository `akira-ui`, workflow `release.yml`.

- [ ] **Step 6: Tag the release**

```bash
git tag v1.0.0 && git push origin v1.0.0
```

Expected: the workflow generates `CHANGELOG.md` from the commit history, commits it back to `main`, creates the GitHub release, posts to Discord, and publishes with provenance. Confirm the npm page shows the provenance badge.

---

## What this plan does not cover

The preview site at `kidiatoliny/ui`: the landing page, the gallery of 75 entries, the demo files, the brand and color-scheme switcher, and the Vercel deployment. That is a separate plan, written once this package exists and its real surface can be read rather than assumed. Task 12 stops before publishing precisely so the site can act as the gate the spec describes.
