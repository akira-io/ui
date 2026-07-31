# Installation

## 1. Install the package

`@akira-io/ui` is public on npm. No registry configuration, no token, no `.npmrc`.

```bash
bun add @akira-io/ui
```

```bash
# npm
npm install @akira-io/ui

# pnpm
pnpm add @akira-io/ui

# yarn
yarn add @akira-io/ui
```

### Peer dependencies

| Peer | Required? | Why |
| --- | --- | --- |
| `react`, `react-dom` (18 or 19) | Always | the components themselves. |
| `tailwindcss-animate` | Always | generates the `animate-in` / `fade-in` / `zoom-in` utility classes several components use for enter and exit transitions (dialogs, dropdowns, tooltips). |
| `@inertiajs/react` | Only if you import from `@akira-io/ui/inertia` | that entry point imports `Link` and `usePage` directly. |
| `react-hook-form` | Only if you use `<Form>` | the form primitives wrap it. |

## 2. Wire Tailwind v4

The package ships its own utility classes inside the compiled components, so Tailwind in the consuming app
has to scan them, otherwise they get purged. In your app's main CSS (e.g. `app.css`):

```css
@import 'tailwindcss';
@plugin 'tailwindcss-animate';
@import '@akira-io/ui/theme.css';
@source '../../node_modules/@akira-io/ui/dist';
```

- `@import '@akira-io/ui/theme.css'` brings in the design tokens (see [Theme & Tokens](02-theme-and-tokens.md)).
- `@source '...dist'` tells Tailwind to scan the package's compiled output for class names. The relative path
  is from the CSS file to `node_modules`; adjust the number of `../` for your project layout.

If the app previously kept its own `@theme`, `:root`, and `.dark` token blocks, remove them: they now live in
`theme.css`. Keep any app-only `@layer utilities` / `@utility` rules.

No further configuration is required to get the default Akira purple palette. `theme.css` sets `--primary`
from the Akira ramp in both light and dark mode.

## 3. Choose a brand (optional)

Every color a component renders comes from a token in `theme.css`, and `--primary` is the one token a brand
preset is allowed to change. Omitting a brand entirely renders Akira purple: nothing extra to configure.

To use a shipped preset, import it after `theme.css` and set `data-brand` on `<html>`:

```css
@import '@akira-io/ui/theme.css';
@import '@akira-io/ui/themes/nosferry.css';
```

```html
<html data-brand="nosferry"></html>
```

Forgetting the `data-brand` attribute is silent: the CSS is scoped to `[data-brand='nosferry']`, so without
the attribute the page renders Akira purple even with the preset imported. There is no build-time warning for
this; it is the first thing to check if a brand preset does not seem to apply.

## 4. Dedupe React (Vite apps)

Add to the app's `vite.config.ts`:

```ts
export default defineConfig({
    // ...
    resolve: {
        dedupe: ['react', 'react-dom'],
    },
});
```

Without this, Vite can pre-bundle the library against a second copy of React and the app crashes at runtime
with **"Invalid hook call: you might have more than one copy of React"** (typically surfacing in
`SidebarProvider`). If it still happens after adding the dedupe, clear the cache: `rm -rf node_modules/.vite`,
then restart the dev server. Next.js dedupes React itself; this step is Vite-only.

## 5. Use it

```tsx
import { Button, Card, cn } from '@akira-io/ui';
```

If a class from a library component is missing in the browser, the `@source` line is wrong or absent: that
is the first thing to check.

---

[← Index](00-index.md) · Next: [Theme & Tokens →](02-theme-and-tokens.md)
