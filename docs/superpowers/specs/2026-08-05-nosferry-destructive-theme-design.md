# Nos Ferry destructive theme design

## Goal

Make destructive actions visually distinct from primary actions when consumers use the official Nos Ferry brand preset. Nos Ferry keeps its existing red primary action; destructive actions use an approved vermillion pair in light and dark mode.

## Scope

- Extend the official brand-preset contract so a preset may optionally override the complete destructive color pair.
- Add the approved destructive pair to `themes/nosferry.css`.
- Update package documentation and the preview site's synced documentation.
- Validate the result in the preview site as a real package consumer, in Nos Ferry light and dark mode.

The Button API and variant implementation do not change. Akira's default destructive colors do not change. No warning token or warning component is introduced.

## Preset contract

Every brand preset continues to require these tokens in light and dark mode:

- `--primary`
- `--primary-foreground`

A preset may additionally declare the following pair:

- `--destructive`
- `--destructive-foreground`

The destructive override is all-or-nothing: if either token appears, both must appear under the preset's light and dark selectors. Presets may not declare other semantic tokens. Every declared foreground/background pair must use literal OKLCH colors and clear WCAG AA contrast of at least 4.5:1.

This keeps the preset mechanism generic instead of special-casing Nos Ferry in the test suite.

## Nos Ferry colors

The approved values are:

| Scheme | Destructive | Foreground |
| --- | --- | --- |
| Light | `oklch(0.565 0.21 34)` | `oklch(0.985 0 0)` |
| Dark | `oklch(0.72 0.18 38)` | `oklch(0.161 0.027 294)` |

The light pair has a measured contrast ratio above 4.8:1; the dark pair is above 7.2:1. The hue remains close enough to red to communicate danger while separating the destructive surface from Nos Ferry's red primary surface.

## Documentation

Theme documentation must stop describing destructive colors as fixed across all brands. It will instead explain that destructive remains global by default and can be overridden by a shipped preset only as a complete, contrast-tested pair.

The preset authoring documentation and development test matrix must describe the optional pair and its all-or-nothing rule. The site documentation is synced from the package source following the existing consumer workflow.

## Testing

Implementation follows test-driven development:

1. Update preset-contract tests first and confirm they fail against the current two-token-only contract.
2. Cover required primary tokens, optional complete destructive pairs, rejection of partial pairs, rejection of unknown tokens, literal OKLCH values, and WCAG AA contrast for every declared pair.
3. Add the Nos Ferry tokens and make the focused tests pass.
4. Run the complete package gates.
5. Sync the built package into the preview site, run the site gates, and inspect the Button variants in Nos Ferry light and dark mode with an empty browser console.

## Delivery

Keep design, package implementation, documentation/site sync, and any review fixes in separate commits. Open a Pull Request only after package and consumer gates pass and both sides have validated the final site preview.
