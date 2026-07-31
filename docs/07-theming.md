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
  actually reads (`bg-primary`, `border-border`, `text-muted-foreground`). Of the roughly thirty semantic
  tokens, exactly two, `--primary` and `--primary-foreground`, are allowed to change per brand. Everything
  else, including the destructive and success colors, is fixed across every preset.

A brand preset therefore never touches the palette. It sets two semantic tokens, and the palette stays
exactly as shipped so the rest of the design stays put while the brand color changes underneath it.

## 2. The 600/400 rule

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

## 3. Building a ramp for a new brand

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
*default* Akira palette was derived, and it is here so the mechanism is not a black box. What a preset
actually declares (next section) is just the two derived tokens, `--primary` and `--primary-foreground`,
for both color schemes; you can compute those two colors by running steps 1 through 6 above for step 600
and step 400 only, without building all eleven steps or shipping a new `--color-*` ramp.

## 4. Writing the preset

A preset is a CSS file under `themes/`, one file per brand, containing exactly four declarations:

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

- **Filename**: `themes/<name>.css`, kebab-case, matching the `data-brand` value exactly. `themes/nosferry.css`
  pairs with `data-brand="nosferry"`.
- **Selectors**: `[data-brand='<name>']` for light mode, `[data-brand='<name>'].dark` for dark mode. Nothing
  else in the file; no other selector, no other token.
- **Values**: literal `oklch(...)` colors. Never a `var()` reference. A preset states its own color; it
  cannot point at another token, including another preset's.
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

## 5. Shipping it

A preset lives in one of two places, depending on who the brand is for:

- **A brand shared across the org** ships inside the package, as a new file under `themes/`, added by a
  pull request against this repository. `themes/nosferry.css` is the existing example: every consuming app
  imports it the same way, from `@akira-io/ui/themes/nosferry.css`.
- **A brand specific to one consuming app** does not need a change here at all. Write the same four
  declarations directly in that app's own stylesheet, under whatever `data-brand` value the app wants, after
  the `@import '@akira-io/ui/theme.css'` line. The package never needs to know about it.

Either way, the shape of the file is identical: two selectors, four declarations, literal OKLCH values.

## 6. What the tests check

Three suites guard this mechanism. Know them before opening a pull request; they are exactly what will
reject a preset, not a style guideline layered on top.

- **`tests/theme-ramp.test.ts`** guards the palette, not individual presets: every one of the eleven
  `--color-akira-*` steps exists, lightness falls monotonically from step 50 to step 950, every step holds
  the same hue (288), and every step converts to an in-gamut sRGB color. This is the automated version of
  step 7 in the ramp procedure above; if you build a full replacement ramp rather than only the two
  `--primary`/`--primary-foreground` values, run the same checks against it by hand, since this suite only
  covers the shipped Akira ramp.
- **`tests/theme-contrast.test.ts`** guards the shipped default palette: the `--primary` /
  `--primary-foreground` pair clears WCAG AA (4.5:1) in both light and dark mode, `--ring` and
  `--sidebar-primary` actually derive from `--primary` (a `var()` reference, not a duplicated literal), and
  the same 4.5:1 floor holds for `--success` and `--destructive`.
- **`tests/theme-presets.test.ts`** is the one that runs against every file you add under `themes/`. For each
  preset it checks, per brand:
  - **Only `--primary` and `--primary-foreground` appear**, under both `[data-brand='<name>']` and
    `[data-brand='<name>'].dark`. Declare a third property, or a different one, and the test fails.
  - **Every value is a literal `oklch(...)` string.** A `var()` reference fails.
  - **The pair clears WCAG AA (4.5:1)** between `--primary` and `--primary-foreground`, checked separately
    for the light and dark block.
  - **`themes/` ships at least the `nosferry` preset**, so the mechanism always has one working example to
    test itself against.

  A preset that fails any of these fails `bun run test`, which is what CI runs before merge; there is no
  path to shipping a preset that only sets two tokens but gets one of them wrong.

## 7. Step 500 is not the brand color

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
