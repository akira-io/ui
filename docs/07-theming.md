# Theming

This page is the deep version of [Theme & Tokens](02-theme-and-tokens.md). That page documents what the
tokens are; this one documents how to build a new brand from scratch, so you can ship your own preset
without asking anyone.

## 1. Two layers of color

`theme.css` carries two distinct kinds of custom property, and only one of them is brand-dependent.

- **The palette** (`--color-akira-50` through `--color-akira-950`): an eleven-step OKLCH ramp at a fixed
  hue. Nothing in the component set renders `bg-akira-600` directly; the ramp exists purely so the semantic
  layer has specific steps to point at. It is fixed for the whole package, brand preset or not.
- **The semantic tokens** (`--primary`, `--background`, `--border`, and the rest): what every component
  actually reads (`bg-primary`, `border-border`, `text-muted-foreground`). Every preset changes the required
  primary pair, `--primary` and `--primary-foreground`, and may add the complete destructive pair,
  `--destructive` and `--destructive-foreground`, in both schemes. The destructive pair remains global by
  default; every other semantic token, including success, is fixed across presets.

A brand preset therefore never touches the palette. It sets the required primary pair and may set the
complete destructive pair; the palette stays exactly as shipped so the rest of the design stays put while
the brand color changes underneath it.

## 2. The visual language

### The line this package draws

**The consumer controls where things sit. The library controls how they look.** Spacing, width, grid
placement, alignment and position belong to the page: pass `className="col-span-2 mt-8 w-full"` to anything
here and it will work, because that is your side of the line. Colour, radius, weight, elevation, focus and
control height belong to the package. If a consumer has to decide appearance too, they should have installed
shadcn/ui directly and kept editing it, and that is exactly the problem this package exists to solve.

Two consequences:

- **Components do not expose appearance props.** `variant="destructive"` is fine, because it says what the
  thing *is*, and the package decides what that looks like. A prop that sets a radius, a shadow or a colour
  is the library handing back the one decision it exists to make.
- **Layout classes from a caller are legitimate** and must keep working. Nothing here defends against them.

Everything below is what the package decides, so a contributor does not have to guess.

### Surfaces

Every surface is one language. There is no second, flatter set. A card, an overlay, a menu, a popover, an
alert and a calendar all follow the same five rules, and a pull request that adds a `rounded-lg` opaque panel
next to them will be rejected.

| Property | Rule |
| --- | --- |
| Fill | The component's own token at an opacity, never a literal. Overlays sit at `bg-popover/95`, menus and popovers at `bg-popover/90`, cards at `bg-card/60`. |
| Blur | `backdrop-blur-xl` on every elevated surface. The translucency is meaningless without it. |
| Border | `border-border`, one pixel. Never `border-zinc-*`, never `border-white/10`, never `border-2`. |
| Radius | From the radius scale below. |
| Shadow | `shadow-2xl`. Cards and overlays carry the same depth. |

Two things follow and are worth stating outright.

**No `dark:` colour overrides.** `dark:bg-zinc-900/95` next to `bg-white/95` looks correct today by luck of
two branches, and it ignores the token system entirely: changing `--card` or `--popover` reaches neither of
them, and a brand preset reaches neither of them. The token already carries its dark value. A `dark:` class
on a themed surface is a bug, not a refinement.

**The modal scrim is the one exception.** `bg-black/60 backdrop-blur-sm` behind a dialog, sheet, alert dialog
or drawer is a fixed black veil rather than a themed surface, and it is the only literal colour the package
allows. It is listed explicitly in `tests/no-literal-surfaces.test.ts`, which fails on any literal not on
that list.

### Radius: five steps and a rule for each

| Step | Where it lands |
| --- | --- |
| `rounded-full` | Anything circular or pill shaped: avatars, badges, the switch, the radio, slider parts, progress, close buttons, scrollbars. |
| `rounded-md` | Indicators smaller than 24px, where every step below is too round to read as a square. Only the checkbox and the faceted filter's check box. |
| `rounded-xl` | Items *inside* a surface, and compact controls: menu items, tab triggers, sidebar rows, toggles, small buttons, tooltips. |
| `rounded-2xl` | Standalone controls and floating panels: buttons, inputs, textareas, select triggers, popovers, dropdowns, menus, command, tab bars. |
| `rounded-3xl` | Content surfaces: cards, alerts, stat cards, settings cards, the standalone calendar. |
| `sm:rounded-[2.5rem]` | Modal overlays once the viewport clears `sm`: dialog, alert dialog, sheet, drawer, command dialog. Never on its own; always the `sm:` step above `rounded-2xl`. |

`rounded-none` is not a step; it is the joining rule for segmented controls, where the middle of a group has
no corners of its own. A recessed surface takes one step down from the elevated surface it sits in.

`tests/design-language.test.ts` fails on any other radius. Genuine shapes rather than surfaces, the two
rotated arrow tips and the chart's colour swatches, sit in that file's exception list with a reason.

### Corners: a radius and its clip travel together

A radius is only half of a corner. The other half is what happens to the children that reach it, and it is
the half people forget. Read it in both directions:

- **A surface with a radius whose children paint their own background must clip them, on that radius.** A
  table row, a resizable pane, a scroll region: each paints to its own square edges and will paint straight
  over the curve, leaving four dark notches where the corner should be. `Table` is the worked example. Its
  outer element owns the surface and the clip; a plain inner element owns the horizontal scroll, so each
  element has one job.
- **A clip must carry the radius of the surface it belongs to.** An `overflow-hidden` with no radius cuts a
  rounded child square, and the child's shadow spills into the corner and stops dead. `CarouselContent` is
  the worked example: Embla needs the viewport to clip, so the clip takes `nestedRadius`, one step down from
  the carousel's own `rounded-3xl`.
- **If a child's shadow is meant to be visible, clipping is the wrong tool and spacing is the right one.**
  `DataTable`, `Tabs`, `Chart` and `Calendar` hold their children off the corner with padding
  and never clip at all.
- **A behaviour primitive paints nothing.** `Collapsible` only opens and closes; it carries no surface,
  padding or background, so it can wrap a sidebar group as readily as a card. A collapsible that should
  look like a card is composed: `<Card><Collapsible>...</Collapsible></Card>`.
  `tests/behaviour-primitives.test.ts` keeps that true.

`nestedRadius` in `src/lib/language.ts` is the radius a clip takes when it sits inside an elevated surface.
It is the same step as `recessedSurface`, named separately because a clip is not a surface and paints
nothing.

The second direction is machine checkable and `tests/design-language.test.ts` checks it: any expression that
sets an overflow utility must also carry a radius, either literally or through one of the language's
radius-bearing constants. Clips that genuinely have no corners of their own, the accordion's height
animation and the sidebar's page region, sit in that file's clip exception list with a reason. The first
direction is not checkable from source, because the children that paint a background are supplied by the
consumer, so it stays a written rule.

### Weight: four steps, and weight means something

| Step | What it marks |
| --- | --- |
| `font-normal` | Body copy, table cells, calendar days. |
| `font-medium` | The resting state of anything interactive, and every eyebrow or label. This is the default; most text in the package is this weight. |
| `font-semibold` | State. The active tab, the current sidebar item, the highlighted menu item, the pressed toggle, and the label on a button. |
| `font-bold` | Headings that lead a surface: a dialog title, a section header, the number on a stat card. |

`font-black` is not in the scale and no component uses it. When every row of a fifty six item sidebar is bold,
weight carries no information; the point of the scale is that going up a step means something changed.

### Control height and padding

One rhythm, so a form built from these components does not step up and down.

| Size | Height | Horizontal padding | Icon-only |
| --- | --- | --- | --- |
| `sm` | `h-9` | `px-3` | `size-9` |
| default | `h-11` | `px-4` | `size-11` |
| `lg` | `h-12` | `px-6` | `size-12` |

`Button`, `Toggle`, `Input`, `Textarea`, `SelectTrigger`, `Combobox`, the sidebar menu button and the data
table toolbar all sit on it. Text is `text-sm` at every size except `lg`, which is `text-base`.

### Focus

Every focusable thing carries the same edge, and it is written once. There are two treatments because a
field and a button want different weight, and they share their ring so the two never disagree:

```ts
export const focusRing =
    'focus-visible:outline-solid focus-visible:outline-1 focus-visible:outline-offset-0 focus-visible:outline-ring';

export const fieldFocus = `${focusRing} focus-visible:shadow-(--glass-elevation)`;
```

A 1px opaque edge in `--ring`. Import one of them from `@akira-io/ui` and compose it; do not restate a
width, a colour or an offset. Fields take `fieldFocus` and lift on focus; buttons take `focusRing` and do
not, because a button that grows a shadow reads as pressed. `tests/focus-language.test.ts` fails if any
component declares a focus ring of its own.

The edge is an `outline`, not a `ring`, and that is deliberate. Tailwind's `ring-*` compiles to
`box-shadow`, so a ring and a shadow are the same property and whichever is written last silently erases
the other. That is a real defect rather than a hypothetical one: it removed the data table search field's
shadow the first time this ring was applied. `outline` is a separate property, so the two compose and a
consumer overriding one cannot destroy the other. Outlines follow `border-radius` on every browser in
Tailwind v4's support baseline, so the corners come along.

One trap comes with it. Both `outline-none` and `outline-hidden` set `--tw-outline-style: none`, and
`outline-1` compiles to `outline-style: var(--tw-outline-style)`, so a control carrying either of them
would silently lose its focus outline. That is why `focus-visible:outline-solid` is part of the treatment
rather than decoration, and several controls in this package do carry `outline-hidden`.

The focused state must differ from the unfocused state by at least 3:1, per WCAG 2.4.11, and
`tests/theme-contrast.test.ts` asserts it against the page, the card and the popover in both schemes.
`--ring` clears it at roughly 6:1. This is also what retired the earlier `quietFocus`: it drew its
indicator in `--surface-ring`, black at 3.5%, which measures 1.08:1 against the card. It signalled focus
with a shadow alone, and a shadow has no measurable contrast and disappears under forced colours.

Menus are the one place that looks different, and it is not a focus ring: `menuHighlight` moves a background
rather than drawing a ring, because a menu's keyboard highlight follows the pointer through a list rather
than announcing where tab focus landed.

### Nesting: two levels, never three

Surfaces get nested. A panel holds a settings group; a card holds a summary block. Without a rule this
produces boxes inside boxes, each with its own border and its own shadow.

- An **elevated** surface carries its own fill, a border, a shadow and the large radius.
- A **recessed** surface, nested inside an elevated one, carries `bg-muted`, no border of its own, no shadow
  of its own, and one radius step down.
- Two levels. There is no third.

Both levels are defined once, in `src/lib/language.ts`, as `elevatedSurface` and `recessedSurface`. Any
component that paints a card composes them rather than restating the class string.

Every component that renders an elevated surface takes a boolean `inset` prop to select the recessed level:
`Card`, `StatCard`, `SettingsCard`, and `SettingsPanel`, which defaults to `inset` because it exists to sit
inside a `SettingsCard`.

```tsx
<Card>
    <Card inset>
</Card>

<StatCard inset title="Active" value={12} icon={Users} />
```

It is a boolean rather than an enum on purpose. The rule is two levels and never three, and a boolean cannot
express a third, so the type carries the rule instead of the documentation carrying it. It is deliberately
not a fourth value on `Card`'s `variant`: that axis holds opacity steps of the same elevated surface, and
folding hierarchy into it would make a recessed subtle card impossible to express.

### Containers own their surface, and stand down inside one

Anything that groups content owns an elevated surface: the accordion, the table, the data table, the
calendar, the command list, the chart frame, the tab panel, the carousel, the resizable pane group, the
scroll area, the collapsible. A consuming app drops a `DataTable` on a page and gets a card; it does not
wrap it in one, and the corners of that card are this package's problem rather than the app's. Single
controls and inline marks own nothing: buttons, badges, inputs, labels, switches, checkboxes, separators,
skeletons, avatars.

A container that lands inside a surface a parent already provides must not paint a second one, because the
rule is two levels and never three. `nestedSurfaceReset` in `src/lib/language.ts` handles that: it drops the
fill, border, shadow and blur whenever the component sits inside a card, a popover, a dialog, a sheet, a
drawer, a dropdown menu, a sidebar or a data table. The selector list lives once, as the `nested-surface`
custom variant at the top of `theme.css`. A recessed card is deliberately excluded from it, because a
recessed surface is a background for the components placed on it rather than a panel of its own.

When a component cannot always own an elevated surface, the way out is a prop on the component, never a
class the application cancels from outside. `Card` carries `flat` for exactly this: a consumer writing
`className="shadow-none ring-0"` is undoing the design language by hand, and every consumer that does it
lands on a slightly different answer. The same reasoning produced `Collapsible` standing down to a
behaviour primitive and `FloatingSheet` dropping its dividers. So the rule for the next component with this
problem is: expose the axis, name it after what it removes rather than after where it is used, keep the
default where it is so nothing existing moves, and assert the new state in a test. `flatSurface` in
`src/lib/language.ts` is the one definition of what dropping elevation means, so a second component
answering the same question reuses it rather than inventing a second escape hatch.

## 3. The 600/400 rule

`--primary` does not point at the palette's step 500, the color most people would call "the" brand color at
a glance. It points at step 600 in light mode and step 400 in dark mode:

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

Measured, not estimated: step 600 against the near-white foreground is **5.84:1**; step 400 against the
near-black ink `oklch(0.161 0.027 294)` is **6.54:1**. Both clear WCAG AA (4.5:1) for normal text with real
margin. Step 500 does not reliably clear it in both color schemes at once, which is why it never fills that
role (see the warning at the end of this page). Building a preset means picking your own ramp's step 600 for
light and step 400 for dark, or, if you construct the pair by some other means, verifying it against the
same 4.5:1 threshold yourself.

## 4. Building a ramp for a new brand

The palette is not hand-picked per color. It is derived from a Tailwind v4 ramp by a fixed procedure, and
the Akira ramp itself is the first example of it.

1. **Convert the brand color to OKLCH** and note its lightness, chroma, and hue.
2. **Find the closest Tailwind ramp by hue.** Compare the brand hue against the hue of each Tailwind v4 ramp
   at its step 500. For Akira's hue of 288, the candidates cluster like this:

   | Ramp | Step 500 hue | Distance from 288 |
   | --- | --- | --- |
   | indigo | 277.117 | 10.9 |
   | **violet** | **292.717** | **4.7** |
   | purple | 303.9 | 15.9 |
   | fuchsia | 322.15 | 34.2 |

   Violet is nearest, so violet is the source curve.
3. **Keep the source ramp's lightness and chroma, step by step.** Read all eleven `L` and `C` values off
   the source ramp; do not touch them yet. The hue is about to be discarded and replaced, but the shape of
   the curve, how lightness falls and chroma rises toward the middle of the scale, is exactly what makes the
   result read as a coherent ramp rather than eleven unrelated colors.
4. **Shift every step to the brand hue.** Replace each step's hue with the fixed brand hue. Akira's ramp is
   hue 288 at every one of its eleven steps; this is why `tests/theme-ramp.test.ts` asserts a single hue
   across the whole ramp.
5. **Scale the chroma so step 500 lands exactly on the brand color.** Compute
   `chromaScale = brandChroma / sourceChroma[500]` and multiply every step's chroma by it. For Akira,
   `0.212 / 0.25 = 0.848`.
6. **Shift the lightness so step 500 lands exactly on the brand color.** Compute
   `lightnessShift = brandLightness - sourceLightness[500]` and add it to every step. For Akira,
   `0.588 - 0.606 = -0.018`.
7. **Verify every step is in gamut.** Convert each of the eleven results to sRGB and confirm every channel
   falls inside `[0, 1]`. A step that clips renders as a different color than the token claims. This is
   exactly what `tests/theme-ramp.test.ts` checks (see below); run it against your own ramp before shipping.

### The worked example: Akira

Akira's brand color is `#7c5cf0`, the purple from the brand banner: `oklch(0.588 0.212 288)`. Violet is the
nearest Tailwind v4 ramp by hue. Applying `hue = 288`, `chroma × 0.848`, `lightness − 0.018` to violet's
eleven steps reproduces the ramp shipped in `theme.css` exactly:

| Step | Tailwind `violet` (source) | Akira (hue 288, ×0.848 chroma, −0.018 lightness) | Hex |
| --- | --- | --- | --- |
| 50 | `oklch(96.9% 0.016 293.756)` | `oklch(0.951 0.014 288)` | `#eeeef8` |
| 100 | `oklch(94.3% 0.029 294.588)` | `oklch(0.925 0.025 288)` | `#e5e4f7` |
| 200 | `oklch(89.4% 0.057 293.283)` | `oklch(0.876 0.048 288)` | `#d4d2f5` |
| 300 | `oklch(81.1% 0.111 293.571)` | `oklch(0.793 0.094 288)` | `#b8b2f5` |
| 400 | `oklch(70.2% 0.183 293.541)` | `oklch(0.684 0.155 288)` | `#9687f3` |
| 500 | `oklch(60.6% 0.25 292.717)` | `oklch(0.588 0.212 288)` | `#7c5cf0` |
| 600 | `oklch(54.1% 0.281 293.009)` | `oklch(0.523 0.238 288)` | `#6c3ce7` |
| 700 | `oklch(49.1% 0.27 292.581)` | `oklch(0.473 0.229 288)` | `#5f2dd1` |
| 800 | `oklch(43.2% 0.232 292.759)` | `oklch(0.414 0.197 288)` | `#4e26ad` |
| 900 | `oklch(38% 0.189 293.745)` | `oklch(0.362 0.16 288)` | `#3f238a` |
| 950 | `oklch(28.3% 0.141 291.089)` | `oklch(0.265 0.12 288)` | `#26125a` |

The right-hand column is read straight out of the `@theme` block of `theme.css`; the ramp is not a
hypothetical, it is the same eleven values the package ships.

You do not need to build a full replacement ramp to ship a brand preset. The procedure above is how the
*default* Akira palette was derived, and it is here so the mechanism is not a black box. Every preset
declares the two derived primary tokens, `--primary` and `--primary-foreground`, for both color schemes;
it may also declare the complete destructive pair in both schemes. You can compute the primary colors by
running steps 1 through 6 above for step 600 and step 400 only, without building all eleven steps or
shipping a new `--color-*` ramp.

## 5. Writing the preset

A preset is a CSS file under `themes/`, one file per brand, with four required primary declarations and four
optional destructive declarations. The minimal valid preset contains only the required primary pair:

```css
[data-brand='<name>'] {
    --primary: oklch(...);
    --primary-foreground: oklch(...);
}

[data-brand='<name>'].dark {
    --primary: oklch(...);
    --primary-foreground: oklch(...);
}
```

Nos Ferry uses all eight declarations, adding the complete destructive pair in both schemes:

```css
[data-brand='nosferry'] {
    --primary: oklch(0.577 0.245 27.325);
    --primary-foreground: oklch(0.985 0 0);
    --destructive: oklch(0.565 0.21 34);
    --destructive-foreground: oklch(0.985 0 0);
}

[data-brand='nosferry'].dark {
    --primary: oklch(0.704 0.191 22.216);
    --primary-foreground: oklch(0.161 0.027 294);
    --destructive: oklch(0.72 0.18 38);
    --destructive-foreground: oklch(0.161 0.027 294);
}
```

- **Filename**: `themes/<name>.css`, kebab-case, matching the `data-brand` value exactly. `themes/nosferry.css`
  pairs with `data-brand="nosferry"`.
- **Selectors**: `[data-brand='<name>']` for light mode, `[data-brand='<name>'].dark` for dark mode. Nothing
  else in the file; no other selector, and no tokens outside the required primary pair and optional complete
  destructive pair.
- **Values**: literal `oklch(...)` colors. Never a `var()` reference. A preset states its own color; it
  cannot point at another token, including another preset's.
- **Pairs**: `--primary` and `--primary-foreground` are required in both schemes. `--destructive` and
  `--destructive-foreground` are optional, but all-or-nothing and present in both schemes when used. Every
  declared foreground/background pair must clear WCAG AA (4.5:1).
- **Import order**: `theme.css` first, the preset second.

  ```css
  @import '@akira-io/ui/theme.css';
  @import '@akira-io/ui/themes/<name>.css';
  ```

  `theme.css` declares `--primary` on `:root` and `.dark`. The preset declares the same property on
  `[data-brand='<name>']` and `[data-brand='<name>'].dark`, both of which have the same specificity as
  `:root`. When both rules apply to the same element (an `<html>` carrying `data-brand`), the one that
  appears later in the cascade wins, which is why the preset has to load after `theme.css`, not before it.

### Why `[data-brand]` and not `:root`

The preset is scoped to an attribute selector, not `:root`, so the brand is a runtime switch instead of a
build-time one. `:root` applies unconditionally the moment the stylesheet loads; an attribute selector only
applies while that attribute is present. Ship every preset a project needs in the same CSS bundle, and
switching brands becomes setting `data-brand` on `<html>`, no rebuild, no separate bundle per tenant, no
reload required beyond whatever sets the attribute. Forgetting to set the attribute is exactly as silent as
that implies: the CSS loads, matches nothing, and the page renders Akira purple with no error anywhere (see
[Installation](01-installation.md) and the migration notes in [Adoption Guide](05-adoption-guide.md)).

### Tokens you get for free

Three more tokens change automatically once `--primary` and `--primary-foreground` are set, because they are
declared in `theme.css` as `var()` references rather than their own colors:

| Token | Declaration in `theme.css` | Effect |
| --- | --- | --- |
| `--ring` | `var(--primary)` | Every focus ring picks up the brand color. |
| `--sidebar-primary` | `var(--primary)` | The sidebar's active/primary accent follows the brand. |
| `--sidebar-primary-foreground` | `var(--primary-foreground)` | Text on `--sidebar-primary` stays legible. |

A preset never declares these three directly; setting the two brand tokens is what moves them.

## 6. Shipping it

A preset lives in one of two places, depending on who the brand is for:

- **A brand shared across the org** ships inside the package, as a new file under `themes/`, added by a
  pull request against this repository. `themes/nosferry.css` is the existing example: every consuming app
  imports it the same way, from `@akira-io/ui/themes/nosferry.css`.
- **A brand specific to one consuming app** does not need a change here at all. Write the same required
  primary declarations, plus the optional complete destructive declarations when needed, directly in that
  app's own stylesheet, under whatever `data-brand` value the app wants, after the
  `@import '@akira-io/ui/theme.css'` line. App-specific presets follow the same required/optional shape; the
  package never needs to know about them.

Either way, the shape of the file is identical: the light and dark selectors, four required primary
declarations, zero or four destructive declarations, and literal OKLCH values.

## 7. What the tests check

Five suites guard this mechanism. Know them before opening a pull request; they are exactly what will
reject a preset, not a style guideline layered on top.

- **`tests/theme-ramp.test.ts`** guards the palette, not individual presets: every one of the eleven
  `--color-akira-*` steps exists, lightness falls monotonically from step 50 to step 950, every step holds
  the same hue (288), and every step converts to an in-gamut sRGB color. This is the automated version of
  step 7 in the ramp procedure above; if you build a full replacement ramp rather than only the primary
  pair, run the same checks against it by hand, since this suite only
  covers the shipped Akira ramp.
- **`tests/theme-contrast.test.ts`** guards the shipped default palette: the `--primary` /
  `--primary-foreground` pair clears WCAG AA (4.5:1) in both light and dark mode, `--ring` and
  `--sidebar-primary` actually derive from `--primary` (a `var()` reference, not a duplicated literal), and
  the same 4.5:1 floor holds for `--success` and `--destructive`.
- **`tests/design-language.test.ts`** guards the scales in section 2: every radius comes from the five step
  scale, every font weight from the four step scale, and no component invents a focus ring width or a ring
  offset. Shapes that are not surfaces, the two rotated arrow tips and the chart's colour swatches, sit in
  that file's exception list with a one line reason each.
- **`tests/no-literal-surfaces.test.ts`** guards the surface language: no component under `src/` may paint
  a background, border or text colour with a literal (`bg-white`, `bg-zinc-900/95`, `dark:text-white`, and
  the rest of the neutral families), in any variant. Genuine exceptions go in the allow list at the top of
  the file with a one line reason, so every exception is visible; the modal scrim is currently the only one.
- **`tests/theme-presets.test.ts`** is the one that runs against every file you add under `themes/`. For each
  preset it checks, per brand:
  - **The required tokens are present:** `--primary` and `--primary-foreground` appear under both
    `[data-brand='<name>']` and `[data-brand='<name>'].dark`.
  - **Only the allowed optional pair may be added:** `--destructive` and `--destructive-foreground`. That
    pair is all-or-nothing in each scheme and must appear in both schemes when used; any other property fails.
  - **Every value is a literal `oklch(...)` string.** A `var()` reference fails.
  - **Every declared pair clears WCAG AA (4.5:1):** the required primary pair in light and dark, and the
    optional destructive pair in both schemes when present.
  - **`themes/` ships at least the `nosferry` preset**, so the mechanism always has one working example to
    test itself against.

  A preset that fails any of these fails `bun run test`, which is what CI runs before merge; there is no
  path to shipping a preset that gets the required primary pair or optional destructive pair wrong.

## 8. Step 500 is not the brand color

The palette's step 500, `#7c5cf0`, is the exact purple from the brand banner and the color most people would
reach for first. On white, it measures **4.32:1**, below the 4.5:1 floor this package holds every other
text pairing to. That is why it is deliberately not `--primary`: `--primary` uses step 600 in light mode and
step 400 in dark mode specifically because those steps clear AA and step 500 does not, reliably, in both
schemes.

Step 500 remains available as a utility, `bg-akira-500`, for surfaces that carry no text of their own:
a decorative background, a chart segment, a badge dot. It must never sit behind text. If you need a
brand-colored surface with text on it, use `--primary` and `--primary-foreground`, not the palette step
directly.

The same shape shows up in the NosFerry preset, `themes/nosferry.css`, which applies the 600/400 rule to
Tailwind's `red` ramp directly: `--primary` is `red-600` in light mode and `red-400` in dark mode. The light
pair measures **4.56:1**, clearing AA, but only just; it is worth knowing that margin is thin before you
build on top of it, and worth checking your own pair's number rather than assuming a Tailwind step is safe
by default.

---

[← Development & Release](06-development.md) · Next: [Blocks →](08-blocks.md)
