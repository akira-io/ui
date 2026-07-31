# @akira-io/nosferry-ui

The shared NosFerry UI library: the full shadcn/ui (New York) set themed for NosFerry, plus a single source
of truth for the design tokens. Framework-agnostic core: works in any React 19 app (Inertia, Next.js, plain Vite).

Full documentation in [`docs/`](docs/00-index.md): [Installation](docs/01-installation.md) ·
[Theme & Tokens](docs/02-theme-and-tokens.md) · [Components](docs/03-components.md) ·
[Shells](docs/04-shells.md) · [Adoption Guide](docs/05-adoption-guide.md) ·
[Development & Release](docs/06-development.md).

## Install

The package is **private on GitHub Packages**. Add an `.npmrc` at the repo root:

```
@akira-io:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}
```

Set `NODE_AUTH_TOKEN` to a GitHub PAT with `read:packages` (on Laravel Forge, use the npm credential UI). Then:

```bash
bun add @akira-io/nosferry-ui
```

Peer deps: `react`, `react-dom`, `@inertiajs/react` (required: the `/inertia` entry imports it). Optional:
`react-hook-form` (only if you use `<Form>`).

## Theme (Tailwind v4)

In your app's main CSS, import Tailwind, then the NosFerry tokens, then point Tailwind at the package so the
utility classes used inside the components are generated (not purged):

```css
@import 'tailwindcss';
@plugin 'tailwindcss-animate';
@import '@akira-io/nosferry-ui/theme.css';
@source '../../node_modules/@akira-io/nosferry-ui/dist';
```

`theme.css` is the one place the OKLCH tokens (red brand `--primary`, radius, sidebar, light/dark) live. Do not
redefine them per app.

## Dedupe React (Vite apps)

Add `resolve: { dedupe: ['react', 'react-dom'] }` to `vite.config.ts`, or the app crashes at runtime with
"Invalid hook call: more than one copy of React". See [Installation](docs/01-installation.md#3-dedupe-react-mandatory-for-vite-apps).

## Use components

```tsx
import { Button, Card, DataTable, cn } from '@akira-io/nosferry-ui';

export function Example() {
    return (
        <Card>
            <Button>Reservar</Button>
        </Card>
    );
}
```

## Subpath exports

| Import | Contents |
| --- | --- |
| `@akira-io/nosferry-ui` | All primitives + `cn` (zero framework coupling) |
| `@akira-io/nosferry-ui/shells` | App shell / sidebar / nav / settings layout: take a polymorphic `linkComponent` prop |
| `@akira-io/nosferry-ui/inertia` | Same shells with the Inertia `Link` + `usePage().url` pre-bound |
| `@akira-io/nosferry-ui/theme.css` | Design tokens |

### Shells

Generic shells take a `linkComponent` and resolved `href`s, so they work in any router:

```tsx
import { AppShell, AppContent, AppSidebar, AppSidebarHeader } from '@akira-io/nosferry-ui/shells';
import { Link } from '@inertiajs/react';

<AppShell variant="sidebar">
    <AppSidebar
        logo={<Logo />}
        logoHref="/dashboard"
        groups={[{ items: mainNavItems }, { label: 'Entidades', items: entityNavItems }]}
        user={auth.user}
        settingsHref="/settings/profile"
        logoutHref="/logout"
        currentUrl={page.url}
        linkComponent={Link}
        onLogout={() => router.flushAll()}
    />
    <AppContent variant="sidebar">
        <AppSidebarHeader breadcrumbs={breadcrumbs} linkComponent={Link} />
        {children}
    </AppContent>
</AppShell>
```

Inertia apps can skip the wiring. Import from `/inertia` and `Link` + active state are bound automatically:

```tsx
import { AppSidebar, SettingsLayout } from '@akira-io/nosferry-ui/inertia';

<AppSidebar logo={<Logo />} logoHref="/dashboard" groups={groups} user={user} settingsHref="/settings/profile" logoutHref="/logout" />
```

## Develop

```bash
bun install
bun run typecheck
bun run build
```

Add or update a component with the shadcn CLI (New York / neutral is preconfigured in `components.json`):

```bash
bunx --bun shadcn@latest add <component>
```

NosFerry-customized components (e.g. `button`) are kept canonical here. Decline overwrites for those.

## Release

Tag-driven. Push a `vX.Y.Z` tag and the workflow regenerates `CHANGELOG.md` (git-cliff), creates the GitHub
Release, notifies Discord, and publishes to GitHub Packages. The published version comes from the tag.
`package.json` stays at `0.0.0`. See [Development & Release](docs/06-development.md).
