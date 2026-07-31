# Adoption Guide

How to move an existing NosFerry app onto the shared library, incrementally and without breaking it. The
front-office migration is the worked example.

## Order of operations

1. **Add the dependency** (GitHub Packages auth + install).
2. **Switch the theme**: single source of tokens.
3. **Dedupe React** in the Vite config, or the app crashes at runtime.
4. **Wire the shells**: sidebar + header from the library.
5. **Swap the primitives**: replace local `@/components/ui/*` with the package, delete the local copies.
6. **Build and smoke-test.**

Do them in this order so each step is verifiable on its own.

## 1. Dependency

The package is private on GitHub Packages. Add an `.npmrc` at the repo root, then install (see
[Installation](01-installation.md) for the token details):

```
@akira-io:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}
```

```bash
bun add @akira-io/nosferry-ui
```

## 2. Theme (done first, lowest risk)

Replace the duplicated token block in `resources/css/app.css` with the shared import + `@source` (see
[Installation](01-installation.md)). Keep app-only `@layer utilities`. Run `bun run build`: a successful CSS
build with the brand red intact confirms the Tailwind v4 cross-package scan works.

## 3. Dedupe React (Vite)

Add `resolve: { dedupe: ['react', 'react-dom'] }` to `vite.config.ts`. Without it the app crashes at runtime
with "Invalid hook call: more than one copy of React". If it persists, `rm -rf node_modules/.vite` and restart
dev. Next.js does not need this.

## 4. Shells

Front-office wiring:

- `resources/js/components/app-sidebar.tsx` keeps the **nav config** (menu items with Wayfinder routes, the
  `AppLogo`) and renders the library `AppSidebar` from `/inertia`, passing `groups`, `user`, `settingsHref`,
  `logoutHref`, `onLogout`.
- `resources/js/layouts/app/app-sidebar-layout.tsx` uses `AppShell` + `AppContent` from `/shells` and
  `AppSidebarHeader` from `/inertia`, wiring the app's `useSidebarStore` to `open`/`onOpenChange` and
  `useCommandStore` to `onSearchClick`.

The local `app-shell`, `app-content`, `app-sidebar-header`, `nav-main`, `nav-footer`, `nav-user`, `user-info`,
`user-menu-content`, `breadcrumbs`, and `heading` files can then be deleted: the library supplies them.

## 5. Primitives

Replace imports across the app:

```diff
- import { Button } from '@/components/ui/button';
+ import { Button } from '@akira-io/nosferry-ui';
```

Bulk-apply across the source tree:

```bash
grep -rl "@/components/ui/" resources/js | while read -r f; do
  perl -pi -e 's{\@/components/ui/[A-Za-z0-9-]+}{\@akira-io/nosferry-ui}g' "$f"
done
```

Then delete `resources/js/components/ui/`: the package provides those. Watch for:

- **`country-select`** is not in the package. Keep it local.
- Components the app had that were broken against current dependency versions (front-office's local
  `calendar.tsx` and `country-select.tsx`) are already fixed in the library version; prefer the package.

## 6. Verify

```bash
bun run build          # vite build — must succeed, zero resolve errors
bun run test:types     # tsc — introduce zero NEW errors (pre-existing app errors don't count)
```

The local `calendar` / `country-select` errors typically disappear: the library ships fixed versions. Then
open the app via Herd and check both light and dark mode: button, input, select, data-table, the sidebar
(exactly one active item), and the settings pages. If a React-duplicate crash appears, re-check step 3.

## Iterating on an unpublished library change

To test a not-yet-released library change without publishing, install a packed tarball: a real copy, more
faithful than a `file:` symlink (a symlink breaks the package's `@inertiajs/react` peer resolution because the
linked folder sits outside the app's `node_modules`):

```bash
# in the library
bun pm pack                       # -> akira-io-nosferry-ui-X.Y.Z.tgz

# in the app
bun add /abs/path/to/akira-io-nosferry-ui-X.Y.Z.tgz
```

Re-pack and re-add after each change. Normal consumption is `bun add @akira-io/nosferry-ui` from GitHub Packages.

## Status of the front-office migration

Complete: installed from GitHub Packages, theme switched to the shared `theme.css`, `resolve.dedupe` added, all
`@/components/ui/*` imports swapped to the package, local `components/ui/` and the dead local shells deleted, and
the sidebar layout wired to the shared shells. The app builds and runs. Optional follow-ups: migrate the
settings/header-variant layouts to the shared shells, and drop `initialFocus` from the date pickers (a
pre-existing react-day-picker v10 issue).

---

[← Shells](04-shells.md) · Next: [Development & Release →](06-development.md)
