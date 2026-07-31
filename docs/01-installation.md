# Installation

## 1. Install the package

The package is **private on GitHub Packages**, so the app needs an `.npmrc` at its root pointing the `@akira-io`
scope at that registry:

```
@akira-io:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}
```

Commit that file: it holds no secret, only the registry mapping. The token comes from the environment:
`NODE_AUTH_TOKEN` must be a GitHub PAT with `read:packages`. On Laravel Forge, set it through the built-in npm
credential UI (registry `npm.pkg.github.com`, the PAT, scope `@akira-io`) instead of a server `.npmrc`. Then:

```bash
bun add @akira-io/nosferry-ui
```

A `401` on install means the token is missing or lacks `read:packages`.

### Peer dependencies

| Peer | When it is needed |
| --- | --- |
| `react`, `react-dom` | Always. |
| `@inertiajs/react` | Always installed by the Inertia apps; required because the `/inertia` entry imports it. |
| `react-hook-form` | Only if you use the `<Form>` component. Optional. |

NosFerry apps already have all of these.

## 2. Wire Tailwind v4

The package ships its own utility classes inside the compiled components, so Tailwind in the consuming app
has to scan them, otherwise they get purged. In your main CSS (e.g. `resources/css/app.css`):

```css
@import 'tailwindcss';
@plugin 'tailwindcss-animate';
@import '@akira-io/nosferry-ui/theme.css';
@source '../../node_modules/@akira-io/nosferry-ui/dist';
```

- `@import '@akira-io/nosferry-ui/theme.css'` brings in the design tokens (see [Theme & Tokens](02-theme-and-tokens.md)).
- `@source '...dist'` tells Tailwind to scan the package's compiled output for class names. The relative path
  is from the CSS file to `node_modules`; adjust the number of `../` for your project layout.

Remove any local `@theme`, `:root`, and `.dark` token blocks from the app: they now live in `theme.css`.
Keep app-only `@layer utilities` / `@utility` rules.

## 3. Dedupe React (mandatory for Vite apps)

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
then restart the dev server. Next.js dedupes React itself. This step is Vite-only.

## 4. Use it

```tsx
import { Button, Card, cn } from '@akira-io/nosferry-ui';
```

If a class from a library component is missing in the browser, the `@source` line is wrong or absent: that is
the first thing to check.

---

[← Index](00-index.md) · Next: [Theme & Tokens →](02-theme-and-tokens.md)
