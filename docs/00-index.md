# NosFerry UI Documentation

`@akira-io/nosferry-ui` is the shared component library for every NosFerry app. It ships the full
shadcn/ui (New York) catalog themed for NosFerry, a single source of truth for the design tokens, and
framework-agnostic application shells. One place to maintain, every app consumes it.

## Contents

1. [Installation](01-installation.md): install the package and wire Tailwind v4.
2. [Theme & Tokens](02-theme-and-tokens.md): the OKLCH design tokens, dark mode, the one `theme.css`.
3. [Components](03-components.md): the component catalog and how to import it.
4. [Shells](04-shells.md): app shell, sidebar, nav, settings layout, and the Inertia preset.
5. [Adoption Guide](05-adoption-guide.md): migrate an existing app, with the front-office recipe.
6. [Development & Release](06-development.md): add components, build, version, publish.

## At a glance

- **Distribution:** published privately to GitHub Packages (`npm.pkg.github.com`) under the `@akira-io` scope.
- **Package manager:** bun.
- **Stack:** React 19, Tailwind v4, Radix UI, Lucide, shadcn/ui (New York).
- **Framework-agnostic core:** primitives + tokens work in Inertia, Next.js, or plain React. Only the shells
  need a router, and they take it as a prop.

---

Next: [Installation →](01-installation.md)
