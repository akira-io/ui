# @akira-io/ui Documentation

`@akira-io/ui` is an open-source React component library: the full shadcn/ui (New York) set on an OKLCH
design-token system, plus a handful of higher-level blocks and application shells built on top of it. The
default palette is Akira purple. Swap it for your own brand with a single CSS import and a `data-brand`
attribute, no component code changes required.

## Contents

1. [Installation](01-installation.md): install the package and wire Tailwind v4.
2. [Theme & Tokens](02-theme-and-tokens.md): the OKLCH ramp, the semantic token table, dark mode, and what a
   brand preset may override.
3. [Components](03-components.md): the 56-component catalog and how to import it.
4. [Shells](04-shells.md): app shell, sidebar, nav, settings layout, and the Inertia preset.
5. [Adoption Guide](05-adoption-guide.md): adopt the library in a React app, including migrating an app off
   an internal fork.
6. [Development & Release](06-development.md): local setup, tests, adding a component, and the release flow.
7. [Theming](07-theming.md): the token model in depth, and a worked procedure for building your own brand
   preset.
8. [Blocks](08-blocks.md): the eight higher-level blocks built on the primitives.
9. [Contributing](09-contributing.md): how to add a component, the review checklist, and the commit
   convention.

## At a glance

- **Distribution:** public on npm as `@akira-io/ui`. No registry configuration, no token, no `.npmrc`.
- **Package manager:** bun (`bun add @akira-io/ui`); npm, pnpm and yarn also work for consumers.
- **Stack:** React 18 or 19, Tailwind v4, Radix UI primitives, Lucide icons, shadcn/ui (New York).
- **Theme:** Akira purple by default. Brand presets under `themes/*.css` override the required primary pair
  (`--primary`, `--primary-foreground`) behind a `data-brand` attribute and may optionally override the
  complete destructive pair (`--destructive`, `--destructive-foreground`). Brand presets always override the
  primary pair and may optionally override the complete destructive pair.
- **Framework-agnostic core:** the primitives and the tokens work in any React app (Inertia, Next.js, plain
  Vite). Only the application shells need a router, and they take it as a prop rather than importing one.

---

Next: [Installation →](01-installation.md)
