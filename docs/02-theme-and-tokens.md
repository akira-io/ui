# Theme & Tokens

All design tokens live in one file, `theme.css`, shipped by the package and imported once by the consuming
app. Every component reads these tokens; none of them hardcode a hex value for anything a brand should be
able to change.

## What `theme.css` contains

- `@custom-variant dark`: the dark-mode variant, keyed off a `.dark` class anywhere above the element.
- `@theme { ... }`: the Tailwind v4 theme block: the font stack, the radius scale, the eleven-step Akira
  ramp (`--color-akira-50` through `--color-akira-950`), and the `--color-*` mappings that expose every
  semantic token as a Tailwind utility (`bg-primary`, `text-muted-foreground`, and so on).
- `:root { ... }`: light-mode semantic token values.
- `.dark { ... }`: dark-mode semantic token values.
- A base layer applying the border color and background/foreground to `body`.
- A `.driver-popover.akira-tour` block: styles the onboarding tour popover (the `Tour` block, driven by
  `driver.js`) with the same tokens, so it matches whatever brand is active.

## The Akira ramp

`--color-akira-50` through `--color-akira-950` is an eleven-step OKLCH ramp at a fixed hue (288) with
lightness falling and chroma rising toward the middle of the scale, the same shape as a Tailwind color ramp.
It is not itself a semantic token: nothing renders `bg-akira-600` directly. It exists so the semantic layer
(`--primary` in particular) has a specific step to point at.

| Step | OKLCH | Hex |
| --- | --- | --- |
| 50 | `oklch(0.951 0.014 288)` | `#eeeef8` |
| 100 | `oklch(0.925 0.025 288)` | `#e5e4f7` |
| 200 | `oklch(0.876 0.048 288)` | `#d4d2f5` |
| 300 | `oklch(0.793 0.094 288)` | `#b8b2f5` |
| 400 | `oklch(0.684 0.155 288)` | `#9687f3` |
| 500 | `oklch(0.588 0.212 288)` | `#7c5cf0` |
| 600 | `oklch(0.523 0.238 288)` | `#6c3ce7` |
| 700 | `oklch(0.473 0.229 288)` | `#5f2dd1` |
| 800 | `oklch(0.414 0.197 288)` | `#4e26ad` |
| 900 | `oklch(0.362 0.16 288)` | `#3f238a` |
| 950 | `oklch(0.265 0.12 288)` | `#26125a` |

Hex values are the sRGB rendering of the OKLCH value, useful for design tools that do not accept OKLCH
directly; the OKLCH value is the one actually shipped.

## The 600/400 rule

`--primary` does not point at the ramp's step 500 (the color most people would call "the" brand purple).
It points at step 600 in light mode and step 400 in dark mode:

```css
:root {
    --primary: var(--color-akira-600);
    --primary-foreground: oklch(0.985 0 0);
}
.dark {
    --primary: var(--color-akira-400);
    --primary-foreground: oklch(0.161 0.027 294);
}
```

Step 600 on a near-white foreground measures 5.84:1 contrast; step 400 on the dark foreground (the near-black
ink `oklch(0.161 0.027 294)`) measures 6.54:1. Both clear WCAG AA (4.5:1) for normal text with margin, which
step 500 alone does not reliably do across both color schemes. A brand preset that only sets `--primary` and
`--primary-foreground` inherits this rule: pick your ramp's step 600 for light and step 400 for dark, or
verify your own pair against the same 4.5:1 threshold.

## Semantic token reference

| Token | Light | Dark | Role |
| --- | --- | --- | --- |
| `--background` | `oklch(1 0 0)` | `oklch(0.145 0 0)` | Page surface. |
| `--foreground` | `oklch(0.145 0 0)` | `oklch(0.985 0 0)` | Page text. |
| `--card` / `--card-foreground` | `oklch(1 0 0)` / `oklch(0.145 0 0)` | `oklch(0.145 0 0)` / `oklch(0.985 0 0)` | Raised card surface and its text. |
| `--popover` / `--popover-foreground` | same as card | same as card | Popovers, dropdowns, tooltips. |
| `--primary` | `var(--color-akira-600)` | `var(--color-akira-400)` | The brand color. Part of the required pair every preset changes. |
| `--primary-foreground` | `oklch(0.985 0 0)` | `oklch(0.161 0.027 294)` | Text/icons on `--primary`. The other required preset token. |
| `--secondary` / `--secondary-foreground` | `oklch(0.97 0 0)` / `oklch(0.205 0 0)` | `oklch(0.269 0 0)` / `oklch(0.985 0 0)` | Secondary surfaces and buttons. |
| `--muted` / `--muted-foreground` | `oklch(0.97 0 0)` / `oklch(0.556 0 0)` | `oklch(0.269 0 0)` / `oklch(0.708 0 0)` | De-emphasized surfaces and text. |
| `--accent` / `--accent-foreground` | `oklch(0.97 0 0)` / `oklch(0.205 0 0)` | `oklch(0.269 0 0)` / `oklch(0.985 0 0)` | Hover/active surfaces. |
| `--destructive` / `--destructive-foreground` | `oklch(0.577 0.245 27.325)` / `oklch(0.985 0 0)` | `oklch(0.704 0.191 22.216)` / `oklch(0.161 0.027 294)` | Dangerous actions. Global by default; a preset may override only the complete foreground/background pair. |
| `--border` / `--input` | `oklch(0.922 0 0)` | `oklch(0.269 0 0)` | Dividers and input borders. |
| `--ring` | `var(--primary)` | `var(--primary)` | Focus ring. Derives from `--primary`, so it carries the brand color. |
| `--sidebar` / `--sidebar-foreground` | `oklch(0.985 0 0)` / `oklch(0.145 0 0)` | `oklch(0.205 0 0)` / `oklch(0.985 0 0)` | Sidebar surface and text. |
| `--sidebar-primary` | `var(--primary)` | `var(--primary)` | Sidebar's primary accent. Derives from `--primary`. |
| `--sidebar-primary-foreground` | `var(--primary-foreground)` | `var(--primary-foreground)` | Text on `--sidebar-primary`. Derives from `--primary-foreground`. |
| `--sidebar-accent` / `--sidebar-accent-foreground` | `oklch(0.97 0 0)` / `oklch(0.205 0 0)` | `oklch(0.269 0 0)` / `oklch(0.985 0 0)` | Sidebar hover/active surfaces. |
| `--sidebar-border` | `oklch(0.922 0 0)` | `oklch(0.269 0 0)` | Sidebar dividers. |
| `--sidebar-ring` | `oklch(0.87 0 0)` | `oklch(0.439 0 0)` | Sidebar focus ring. Independent gray, does not derive from `--primary`. |
| `--radius` | `0.625rem` | same | Base radius; `--radius-sm` / `--radius-md` / `--radius-lg` derive from it. |

Use the tokens through Tailwind classes (`bg-primary`, `text-muted-foreground`, `border-border`,
`bg-sidebar`) rather than hardcoding a color.

## What a brand preset may override

A brand preset must set the primary pair, `--primary` and `--primary-foreground`, scoped under
`[data-brand='<name>']` for light mode and `[data-brand='<name>'].dark` for dark mode. It may also set the
complete destructive pair, `--destructive` and `--destructive-foreground`, in both schemes. Brand presets
always override the primary pair and may optionally override the complete destructive pair.

This is not a style guideline; it is enforced by `tests/theme-presets.test.ts` against every file in
`themes/`. For each preset the suite checks:

- **Only the allowed tokens appear** under each selector. The required primary pair is always present; the
  destructive pair is optional, but it is all-or-nothing in each scheme and must appear in both schemes when
  present. Any other custom property fails the test.
- **Values are literal `oklch(...)` colors**, never a `var()` reference. A preset cannot point at another
  token; it has to state its own color.
- **Pairs clear WCAG AA** (contrast ratio of 4.5:1 or higher): the required primary pair in both the light
  and dark blocks, plus the destructive pair in both blocks whenever it is present.
- **The `themes/` directory ships at least the `nosferry` preset**, so the mechanism itself always has a
  working example to test against.

`themes/nosferry.css` is that example: eight declarations total across its two selectors: the primary and
destructive foreground/background pairs for light, and the same complete pairs for dark. Its values are
literal OKLCH.

## Dark mode

Dark mode is the `dark` class on `<html>`. The `useAppearance` hook and `initializeTheme` helper, exported
from `@akira-io/ui/shells`, manage this with three states, `light | dark | system`, persisting the choice to
`localStorage` and a cookie (for server-rendered apps that need the class before hydration).

```tsx
import { useAppearance } from '@akira-io/ui/shells';

const { appearance, updateAppearance } = useAppearance();
updateAppearance('dark');
```

## Changing a token

Edit `theme.css` in the library, bump the version, and publish. Consuming apps pick up the change on their
next update to the package; because every app reads the same file, the change lands everywhere at once, with
no per-app edits.

---

[← Installation](01-installation.md) · Next: [Components →](03-components.md)
