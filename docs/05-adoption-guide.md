# Adoption Guide

How to bring `@akira-io/ui` into an existing React app, one piece at a time, without breaking it. The second
half of this page is a migration guide for apps already running on the private `@akira-io/nosferry-ui` fork
this package was built from.

## Order of operations

1. **Add the dependency.**
2. **Wire Tailwind and the theme**: single source of tokens.
3. **Dedupe React** in the Vite config, or the app crashes at runtime.
4. **Wire the shells**: sidebar + header from the library.
5. **Swap the primitives**: replace local `@/components/ui/*` with the package, delete the local copies.
6. **Build and smoke-test.**

Do them in this order so each step is verifiable on its own.

## 1. Dependency

`@akira-io/ui` is public on npm. No registry configuration, no token, no `.npmrc`.

```bash
bun add @akira-io/ui
```

## 2. Theme (done first, lowest risk)

Replace any duplicated token block in the app's main CSS with the shared import plus `@source` (see
[Installation](01-installation.md) for the full wiring). Keep app-only `@layer utilities`. Run `bun run build`:
a successful CSS build with the app's own colors intact confirms the Tailwind v4 cross-package scan works.

## 3. Dedupe React (Vite)

Add `resolve: { dedupe: ['react', 'react-dom'] }` to `vite.config.ts`. Without it the app crashes at runtime
with "Invalid hook call: more than one copy of React". If it persists, `rm -rf node_modules/.vite` and restart
dev. Next.js does not need this.

## 4. Shells

A typical wiring:

- The app's own `app-sidebar.tsx` keeps the **nav config** (menu items and routes, the app logo) and renders
  the library `AppSidebar` from `/inertia`, passing `groups`, `user`, `settingsHref`, `logoutHref`, `onLogout`.
- The app's sidebar layout uses `AppShell` + `AppContent` from `/shells` and `AppSidebarHeader` from
  `/inertia`, wiring the app's own sidebar-open store to `open` / `onOpenChange` and its own command-menu
  store to `onSearchClick`.

The local `app-shell`, `app-content`, `app-sidebar-header`, `nav-main`, `nav-footer`, `nav-user`, `user-info`,
`user-menu-content`, `breadcrumbs`, and `heading` files can then be deleted: the library supplies them. See
[Shells](04-shells.md) for the full prop reference.

## 5. Primitives

Replace imports across the app:

```diff
- import { Button } from '@/components/ui/button';
+ import { Button } from '@akira-io/ui';
```

Bulk-apply across the source tree:

```bash
grep -rl "@/components/ui/" resources/js | while read -r f; do
  perl -pi -e 's{\@/components/ui/[A-Za-z0-9-]+}{\@akira-io/ui}g' "$f"
done
```

Then delete `resources/js/components/ui/`: the package provides those. Watch for:

- **`country-select`** is not in the package: it depended on an app-specific `useCountries` hook and was not a
  generic primitive. Keep it local.
- Components the app had customized against older dependency versions may already be fixed in the library
  version; prefer the package over the local copy where the behavior matches.

## 6. Verify

```bash
bun run build          # vite build, must succeed, zero resolve errors
bun run typecheck       # tsc, introduce zero NEW errors (pre-existing app errors don't count)
```

Then open the app and check both light and dark mode: button, input, select, data-table, the sidebar (exactly
one active item), and the settings pages. If a React-duplicate crash appears, re-check step 3.

## Iterating on an unpublished library change

To test a not-yet-released library change without publishing, install a packed tarball: a real copy, more
faithful than a `file:` symlink (a symlink breaks the package's `@inertiajs/react` peer resolution because the
linked folder sits outside the app's `node_modules`):

```bash
# in the library
bun pm pack                       # -> akira-io-ui-X.Y.Z.tgz

# in the app
bun add /abs/path/to/akira-io-ui-X.Y.Z.tgz
```

Re-pack and re-add after each change. Normal consumption is `bun add @akira-io/ui` from npm.

---

## Migrating from `@akira-io/nosferry-ui`

`@akira-io/ui` is the public successor to the private `@akira-io/nosferry-ui` fork. The steps below move an
app off that fork. Read all five before starting: step 4 is the one that fails silently. Skip it and the app
still builds, still runs, and simply renders in Akira purple instead of your brand, with nothing in the build
output or the browser console to say why.

### 1. Swap the dependency

```bash
bun remove @akira-io/nosferry-ui && bun add @akira-io/ui
```

Remove the GitHub Packages line from the app's `.npmrc`:

```diff
- @akira-io:registry=https://npm.pkg.github.com
```

`@akira-io/ui` is public on npm; it needs no registry override and no token.

### 2. Update every import specifier

Replace `@akira-io/nosferry-ui` with `@akira-io/ui` everywhere it appears, including the `/blocks`, `/shells`,
and `/inertia` subpaths:

```diff
- import { Button } from '@akira-io/nosferry-ui';
+ import { Button } from '@akira-io/ui';

- import { AppShell } from '@akira-io/nosferry-ui/shells';
+ import { AppShell } from '@akira-io/ui/shells';

- import { AppSidebar } from '@akira-io/nosferry-ui/inertia';
+ import { AppSidebar } from '@akira-io/ui/inertia';

- import { StatCard } from '@akira-io/nosferry-ui/blocks';
+ import { StatCard } from '@akira-io/ui/blocks';
```

Bulk-apply the same way as a fresh primitive swap (step 5 above), pointed at the old specifier instead:

```bash
grep -rl "@akira-io/nosferry-ui" resources/js | while read -r f; do
  perl -pi -e 's{\@akira-io/nosferry-ui}{\@akira-io/ui}g' "$f"
done
```

The subpath suffix survives the replacement untouched, since only the package name changes.

### 3. Point the stylesheet at the new package

```css
@import '@akira-io/ui/theme.css';
@import '@akira-io/ui/themes/nosferry.css';
@source '../../node_modules/@akira-io/ui/dist';
```

Update the `@source` line, not only the `@import` lines. This is the step most likely to be missed, and the
one hardest to diagnose when it is: `@source` is what tells Tailwind to scan the package's compiled output for
class names. If it still points at `node_modules/@akira-io/nosferry-ui`, or is dropped during the edit,
Tailwind never sees the component classes and purges every one of them as unused. The build succeeds, the app
boots, and every button, input, and card renders with no border, no color, no radius, no shadow. Nothing
fails loudly. If the app looks unstyled after this migration, check `@source` before anything else.

### 4. Set the brand attribute

Set `data-brand="nosferry"` on the same `<html>` element that already carries the `dark` class:

```html
<html data-brand="nosferry">
```

This is the step to not skip. The NosFerry preset's CSS is scoped to `[data-brand='nosferry']`; without the
attribute, the page renders the default Akira purple palette instead. There is no build error, no runtime
warning, and no failing test for this: the app looks like it shipped an unintended rebrand, and the only way
to catch it is to look at the rendered page.

### 5. Wrap the app in the locale provider

Component text defaults to English, because a public package should not put one company's language in
everyone's product. An app in a single language declares that language once, at the root:

```tsx
import { UiLocaleProvider } from '@akira-io/ui';
import { ptLabels } from '@akira-io/ui/locales/pt';

<UiLocaleProvider labels={ptLabels}>
    <App />
</UiLocaleProvider>;
```

`ptLabels` carries every section the library reads: `DataTable`, `DateFilter`, `DateRangeFilter`,
`DatePicker`, `Combobox`, `FacetedFilter`, `ServerFacetedFilter`, `ConfirmDialog` (including the dialogs
`useConfirmDialog` opens), `CommandPalette`, `FloatingSheet`, `SaveStatus`, `SettingsSection`, `Tour`,
`CopyButton`, `CodeBlock`, `JsonViewer`, `LoginForm` and `PasswordInput`. No call site passes labels any
more, including a `LoginForm` part composed with no `Root` above it.

`@akira-io/ui/locales/fr` ships the same shape as `frLabels`:

```tsx
import { UiLocaleProvider } from '@akira-io/ui';
import { frLabels } from '@akira-io/ui/locales/fr';

<UiLocaleProvider labels={frLabels}>
    <App />
</UiLocaleProvider>;
```

A prop still wins over the provider, so one screen can differ:

```tsx
<DataTable createLabel="Nova reserva" columns={columns} data={rows} />
```

The same shape covers a language the package does not ship, or one screen's vocabulary:

```tsx
<UiLocaleProvider labels={{ dataTable: { createLabel: 'Nova reserva' } }}>
```

An app with no provider keeps the English defaults, so nothing changes for it. Skipping this step is visible
rather than silent: the search box, the empty state, the create button, the clear-filters button and the
pagination line stay in English.

### 6. Install `recharts`, if the app renders a chart

`ChartContainer` takes recharts primitives as children, so the app and the package must share one copy of
recharts. It is an optional peer dependency rather than something bundled inside the package, because two
copies never connect and the chart then renders nothing at all, with no error:

```bash
bun add recharts
```

An app that renders no chart needs nothing here.

### 7. Rename the tour popover class, if the app has one

Only relevant if the app's own CSS targets `.nosferry-tour` (some apps added overrides beyond what `theme.css`
covers): rename the selector to `.akira-tour`. The package's own `.driver-popover.akira-tour` rules in
`theme.css` already use the new name; an app with no such override has nothing to change here.

## Expected visual changes

Migrating changes what a handful of components look like, on purpose. None of these are regressions to file
as bugs:

- **The focus ring** changes from a neutral dark gray to the brand color, across every input and button. In
  `@akira-io/ui`, `--ring` derives from `--primary` (see [Theme & Tokens](02-theme-and-tokens.md)); the app's
  own pre-migration tokens did not tie the two together.
- **Dark mode `--primary`** is now `red-400` where the app's own token used to repeat `red-600` in both color
  schemes. It reads lighter, and it now clears WCAG AA with real margin instead of borrowing the light-mode
  value.
- **Pale hover backgrounds** (dropdown menu items, sidebar hover and active states) move from a fixed
  `red-50` to `primary/10`. Same idea, no longer a hardcoded step.
- **Light mode on the main components is all but identical**, because the NosFerry preset sets `--primary` to
  exactly the `red-600` those components used to hardcode. The base color of a default button, an active
  sidebar item, or a focused input in light mode should look unchanged.
- **`stat-card`'s positive trend indicator** moves to the new `--success` token, which is `emerald-700` in
  light mode rather than `emerald-500`. It is darker on purpose: `emerald-500` reached only 3.51:1 contrast on
  white, which fails WCAG AA for text that small. `emerald-700` clears it.

---

[← Shells](04-shells.md) · Next: [Development & Release →](06-development.md)
