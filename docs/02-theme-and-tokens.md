# Theme & Tokens

All design tokens live in one file, `theme.css`, shipped by the package and imported once by the consuming
app. Every component reads these tokens; none of them hardcode a hex value for anything a brand should be
able to change.

## What `theme.css` contains

- `@import './root-background.css'`: paints the root element with `--background`, or with `--sidebar` while
  the page renders an inset sidebar, so the area macOS overscroll reveals matches what sits next to it. It
  stays outside any layer and uses `:root`, so it wins over an inline `html { background-color: ... }` in
  the app's document head.
- `@import './tour.css'`, `@import './glass.css'` and `@import './hig.css'`: the tour popover, the glass
  layers and fills, and the HIG spacing, control and icon tokens. Their tokens are listed below.
- `@custom-variant dark`: the dark-mode variant, keyed off a `.dark` class anywhere above the element.
- `@theme { ... }`: the Tailwind v4 theme block: the font stack, the radius scale, the eleven-step Akira
  ramp (`--color-akira-50` through `--color-akira-950`), and the `--color-*` mappings that expose every
  semantic token as a Tailwind utility (`bg-primary`, `text-muted-foreground`, and so on).
- `:root { ... }`: light-mode semantic token values.
- `.dark { ... }`: dark-mode semantic token values.
- A base layer applying the border color and background/foreground to `body`.
- `--ease-spring` in the theme block, `cubic-bezier(0.34, 1.56, 0.64, 1)`, exposed as the `ease-spring`
  utility. Controls use it to grow when pressed and to settle a dragged thumb or lens.

The `.driver-popover.akira-tour` rules that style the onboarding tour popover (the `Tour` block, driven by
`driver.js`) live in `tour.css`. They draw the popover on the same glass as every other popover.

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
| `--success` / `--success-foreground` | `oklch(0.508 0.118 165.612)` / `oklch(0.985 0 0)` | `oklch(0.765 0.177 163.223)` / `oklch(0.161 0.027 294)` | Positive states. Global; presets do not override it. |
| `--warning` / `--warning-foreground` | `oklch(0.54 0.115 70)` / `oklch(0.985 0 0)` | `oklch(0.79 0.15 80)` / `oklch(0.161 0.027 294)` | States that need attention but are not failures. Read by `StatusBadge`. |
| `--info` / `--info-foreground` | `oklch(0.52 0.17 258)` / `oklch(0.985 0 0)` | `oklch(0.72 0.14 255)` / `oklch(0.161 0.027 294)` | Neutral informational states, kept off the brand so a preset does not recolor them. Read by `StatusBadge`. |
| `--border` / `--input` | `oklch(0.922 0 0)` | `oklch(0.269 0 0)` | Dividers and input borders. |
| `--ring` | `var(--primary)` | `var(--primary)` | Focus ring. Derives from `--primary`, so it carries the brand color. |
| `--sidebar` / `--sidebar-foreground` | `oklch(0.985 0 0)` / `oklch(0.145 0 0)` | `oklch(0.205 0 0)` / `oklch(0.985 0 0)` | Sidebar surface and text. |
| `--sidebar-primary` | `var(--primary)` | `var(--primary)` | Sidebar's primary accent. Derives from `--primary`. |
| `--sidebar-primary-foreground` | `var(--primary-foreground)` | `var(--primary-foreground)` | Text on `--sidebar-primary`. Derives from `--primary-foreground`. |
| `--sidebar-accent` / `--sidebar-accent-foreground` | `oklch(0.97 0 0)` / `oklch(0.205 0 0)` | `oklch(0.269 0 0)` / `oklch(0.985 0 0)` | Sidebar hover/active surfaces. |
| `--sidebar-border` | `oklch(0.922 0 0)` | `oklch(0.269 0 0)` | Sidebar dividers. |
| `--sidebar-ring` | `oklch(0.87 0 0)` | `oklch(0.439 0 0)` | Sidebar focus ring. Independent gray, does not derive from `--primary`. |
| `--sticky-cell-fill` | `var(--background)` | `var(--background)` | Fill of a table's pinned last column once a column hides behind it. Every content surface sets it to its own fill: `var(--grouped-fill)` on the grouped surface, `var(--popover)` on glass. Hover and the active row layer the glass highlight and `--primary` at 5% over it, as they do on the row. |
| `--sticky-cell-selected` | `var(--muted)` | `var(--muted)` | Fill of the pinned cell on a selected row. |
| `--glass-content-elevation` | short contact shadow | deeper pair | The shadow of a glass card and of a content block on `surface="glass"`: the lit top edge and shaded bottom edge, then `0 1px 3px 0 oklch(0 0 0 / 0.06), 0 6px 16px -6px oklch(0 0 0 / 0.09)` (`0.3` and `0.35` in dark). Menus, popovers and sheets keep `--glass-elevation`. |
| `--scroll-shadow-start` | shadow pair | deeper pair | Shadow a pinned column casts leftwards over the columns hidden behind it, the horizontal counterpart of `--scroll-shadow-top` / `--scroll-shadow-bottom`. |
| `--radius` | `0.625rem` | same | Base radius; `--radius-sm` / `--radius-md` / `--radius-lg` derive from it. |

Use the tokens through Tailwind classes (`bg-primary`, `text-muted-foreground`, `border-border`,
`bg-sidebar`) rather than hardcoding a color.

## Glass, field and grouped tokens

`glass.css` declares the fills of the glass controls, the text fields and the grouped content surface.
Components read them through arbitrary values such as `bg-(--grouped-fill)` and `border-(--hairline)`.

| Token | Light | Dark | Role |
| --- | --- | --- | --- |
| `--glass-button-tint` | `rgb(255 255 255 / 0.6)` | `rgb(255 255 255 / 0.09)` | The fill of `glass-button`, `glass-bar` and `glass-panel`. |
| `--glass-button-ring` | `rgb(0 0 0 / 0.05)` | `rgb(255 255 255 / 0.15)` | The one pixel outline of a glass control. |
| `--glass-button-shadow` | `0 1px 2px rgb(0 0 0 / 0.12)` | `0 1px 2px rgb(0 0 0 / 0.3)` | The drop shadow under a glass control. |
| `--glass-edge-light` | `inset 0 1px 0 rgb(255 255 255 / 0.9)` | `inset 0 1px 0 rgb(255 255 255 / 0.22)` | The lit top edge `glass-edge` draws. |
| `--glass-edge-dark` | `inset 0 -1px 0 rgb(0 0 0 / 0.04)` | `inset 0 -1px 0 rgb(255 255 255 / 0.05)` | The shaded bottom edge `glass-edge` draws. |
| `--glass-highlight` | `rgb(0 0 0 / 0.05)` | `rgb(255 255 255 / 0.1)` | The hover, focus and active tint of rows, menu items, ghost buttons and striped table rows. |
| `--field-fill` | `rgb(118 118 128 / 0.12)` | not redefined | The gray fill of a text field in light mode. In dark mode fields draw `glass-button` instead. |
| `--hairline` | `color-mix(in oklab, var(--foreground) 10%, transparent)` | `color-mix(in oklab, var(--foreground) 14%, transparent)` | The line that parts table rows, the pagination and every grouped list. It shows on any surface, glass included. |
| `--grouped-fill` | `color-mix(in oklab, var(--foreground) 4%, var(--background))` | `color-mix(in oklab, var(--foreground) 7%, var(--background))` | The solid gray of the grouped content surface. See [Content surfaces](03-components.md#content-surfaces). |

`--glass-bar-alpha` (`0.7`) and `--glass-panel-alpha` (`0.85`) are still declared. Only `glass-sidebar` reads
`--glass-panel-alpha`; `glass-bar` and `glass-panel` take `--glass-button-tint`.

The same file adds these utilities:

| Utility | What it draws |
| --- | --- |
| `glass-button` | The glass of every control: `--glass-button-tint` with a 40px blur, the lit edges, the ring and the drop shadow. Opaque on `--popover` under reduced transparency or without backdrop blur. |
| `glass-prominent` | The tinted glass of a default button, a checked checkbox or radio, and the selected item: `--btn` (or `--primary`) at 85% with its foreground. Opaque under reduced transparency. |
| `glass-edge` | The lit top edge and shaded bottom edge alone, composed with the ring and shadow utilities rather than replacing them. |
| `glass-thumb` | The clear glass of a switch thumb while it is held and of a slider thumb while it is dragged. White under reduced transparency. |
| `icon-tile-shape` | The corner of an icon tile: a `26%` radius, or a `40%` squircle where the browser supports `corner-shape`. |

## Control and row tokens

`hig.css` adds three tokens next to the spacing scale described in the
[HIG Style Guide](12-hig-style-guide.md#3-tokens). The touch values apply under `@media (pointer: coarse)`.

| Token | Classes | Pointer | Touch | Role |
| --- | --- | --- | --- | --- |
| `--control-h` | `h-control`, `size-control`, `min-w-control` | `40px` | `44px` | The height of a button, a text field, a select trigger, a toggle and a tab list. |
| `--control-text` | `text-control` | `14px` | `16px` | The text size of a control, with a line height of `1.25`. 16px on touch keeps iOS from zooming into a focused field. |
| `--space-row` | `p-row`, `ps-row`, `py-row` | `12px` | `12px` | The padding of a row in a grouped list: grouped field rows, settings card rows and passkey rows. |

## The chart palette

`--chart-1` through `--chart-8` are the series colors. They are their own scale, not derived from `--primary`,
because a chart needs colors that stay apart from one another rather than colors that agree with the brand:
eight OKLCH hues within a narrow band of lightness, lifted in dark mode the way every other token is. The
band is not flat, and `--chart-6` sits at the top of it, so a series that lands there reads slightly
brighter than its neighbours.

| Token | Light | Dark |
| --- | --- | --- |
| `--chart-1` | `oklch(0.588 0.212 288)` | `oklch(0.684 0.155 288)` |
| `--chart-2` | `oklch(0.605 0.19 258)` | `oklch(0.702 0.145 258)` |
| `--chart-3` | `oklch(0.648 0.145 225)` | `oklch(0.745 0.118 225)` |
| `--chart-4` | `oklch(0.638 0.122 188)` | `oklch(0.735 0.1 188)` |
| `--chart-5` | `oklch(0.648 0.148 152)` | `oklch(0.745 0.125 152)` |
| `--chart-6` | `oklch(0.723 0.148 85)` | `oklch(0.805 0.128 85)` |
| `--chart-7` | `oklch(0.652 0.175 46)` | `oklch(0.745 0.148 46)` |
| `--chart-8` | `oklch(0.612 0.208 12)` | `oklch(0.712 0.175 12)` |

A brand preset may replace them, but only as a whole: all eight tokens, in both the light and the dark
selector, as literal OKLCH. `themes/nosferry.css` does, so a NosFerry chart no longer opens on the Akira
violet. The chart components assign them in order to any series that names no color of its own, so two
charts on the same page use the same color for the first series without sharing a constant. A chart that needs a specific
color states it in its `ChartConfig`; see [Components](03-components.md).

## What a brand preset may override

A brand preset must set the primary pair, `--primary` and `--primary-foreground`, scoped under
`[data-brand='<name>']` for light mode and `[data-brand='<name>'].dark` for dark mode. It may also set the
complete destructive pair, `--destructive` and `--destructive-foreground`, in both schemes, and the
complete chart palette, `--chart-1` through `--chart-8`, in both schemes. Brand presets always override the
primary pair and may optionally override the complete destructive pair and the complete chart palette.

This is not a style guideline; it is enforced by `tests/theme-presets.test.ts` against every file in
`themes/`. For each preset the suite checks:

- **Only the allowed tokens appear** under each selector. The required primary pair is always present; the
  destructive pair is optional, but it is all-or-nothing in each scheme and must appear in both schemes when
  present. The chart palette follows the same rule: all eight `--chart-*` tokens or none, in both schemes
  or neither. Any other custom property fails the test.
- **Values are literal `oklch(...)` colors**, never a `var()` reference. A preset cannot point at another
  token; it has to state its own color.
- **Pairs clear WCAG AA** (contrast ratio of 4.5:1 or higher): the required primary pair in both the light
  and dark blocks, plus the destructive pair in both blocks whenever it is present.
- **The `themes/` directory ships at least the `nosferry` preset**, so the mechanism itself always has a
  working example to test against.

Chart colors are graphical objects rather than text, so the suite holds them to no contrast floor; check
them against `--background` yourself, aiming for the 3:1 of WCAG 1.4.11.

`themes/nosferry.css` is that example: twenty-four declarations across its two selectors: the primary and
destructive foreground/background pairs and the eight chart colors for light, and the same complete set for
dark. Its values are literal OKLCH, each chart color annotated with the hex it was converted from.

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
