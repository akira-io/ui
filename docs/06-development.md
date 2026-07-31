# Development & Release

## Setup

```bash
bun install
```

## Scripts

| Script | Does |
| --- | --- |
| `bun run build` | Build ESM + type declarations to `dist/` with tsup. |
| `bun run dev` | Rebuild on change (`tsup --watch`). |
| `bun run test` | Run the vitest suite. |
| `bun run typecheck` | `tsc --noEmit`. |
| `bun run format` | Prettier write, covering `src/`, `tests/`, and `theme.css`. |
| `bun run format:check` | Prettier check, same scope. |

Run `bun run format` before committing: it is the fastest way to avoid a diff full of formatting noise.

## Project layout

```
src/
  index.ts            # primitives + cn barrel (framework-agnostic)
  blocks.ts            # blocks barrel
  shells.ts            # generic shells barrel
  inertia.ts            # Inertia-bound shell preset
  components/ui/      # the shadcn component set
  blocks/               # the higher-level blocks (stat-card, tour, date-filter, ...)
  shells/               # app shell, sidebar, nav, settings layout
  hooks/               # use-mobile, use-initials, use-appearance
  lib/                 # cn(), href helpers
  types.ts             # NavItem, LinkComponent, etc.
theme.css              # design tokens (the source of truth)
themes/                # brand presets (nosferry.css and any others)
tests/                 # the suites below
```

## Tests

```bash
bun run test
```

Eight files today, each guarding a specific thing:

| File | Guards |
| --- | --- |
| `tests/helpers/color.test.ts` | The OKLCH parsing and contrast-ratio helpers the other suites are built on. |
| `tests/theme-ramp.test.ts` | The eleven `--color-akira-*` steps exist, lightness falls monotonically from 50 to 950, and every step converts to an in-gamut sRGB color. A step that clips silently renders as a different color than the token claims. |
| `tests/theme-contrast.test.ts` | The shipped `--primary` / `--primary-foreground` pair, in both light and dark, clears WCAG AA (4.5:1), plus the same check for `--success` and `--destructive`. |
| `tests/theme-presets.test.ts` | The preset contract: every file under `themes/` declares only `--primary` and `--primary-foreground`, under both `[data-brand='<name>']` and `[data-brand='<name>'].dark`, as literal `oklch(...)` values, and the pair clears WCAG AA. See [Theming](02-theme-and-tokens.md) for what a preset may and may not override. |
| `tests/no-brand-literals.test.ts` | No file under `src/` hardcodes a Tailwind palette hue (`red-500`, `emerald-700`, and so on) in a class name. A component must read a token instead. On failure it names the offending file, line, and class. |
| `src/blocks/date-filter/date-filter.test.ts` | The date filter's encode/decode round-trip and relative-range resolution. |
| `src/blocks/tour/gate.test.ts` | The tour gate: which steps apply at a given breakpoint, and whether a tour should start given what the user has already seen. |
| `tests/inertia-tour-progress.test.ts` | The Inertia tour-progress reporter posts to the given URL with the right method, credentials, and XSRF header, and maps its payload to snake_case. |

The last two are colocated with the code they cover (`src/blocks/...`); the rest live in `tests/` because they
read the shipped CSS from disk rather than exercising a module. `vitest.config.ts` includes both locations.

## Adding or updating a component

shadcn is preconfigured (New York, neutral) in `components.json`:

```bash
bunx --bun shadcn@latest add <component>
```

- It writes into `src/components/ui/` and installs any Radix dependency.
- When it offers to overwrite a component this package has customized (e.g. `button`), **decline**: those
  customizations are canonical here, not the stock shadcn output.
- Export the new component from `src/index.ts`.
- A hosted preview site with a live demo per component is planned but does not exist yet (see
  [Components](03-components.md)); once it does, a new component ships with a demo there as part of the same
  change, not as a follow-up.
- `bun run test && bun run typecheck && bun run build`.

## How dependencies are bundled

- `react`, `react-dom`, `@inertiajs/react`, `react-hook-form` are **external**: never bundled.
- Radix, Lucide, TanStack Table, and the rest are dependencies, imported (not inlined) by the output.
- Interactive components are client components. (Next.js RSC `"use client"` preservation is a known follow-up;
  see the TODO in `tsup.config.ts`.)

## Versioning & publishing

Semver, **tag-driven**, published publicly to **npm** as `@akira-io/ui`. `package.json` carries the current
released version; a release only ever bumps it through the tag, never by hand mid-development. To release:

```bash
git tag -a vX.Y.Z -m vX.Y.Z   # annotated, or git push --follow-tags won't send it
git push origin main
git push origin vX.Y.Z
```

On a `vX.Y.Z` (or `vX.Y.Z-*`) tag, `release.yml` runs two jobs:

- **release**: git-cliff regenerates `CHANGELOG.md` from the conventional-commit history and commits it back
  to the default branch, creates the GitHub Release from the same notes, and posts to Discord.
- **publish**: `bun install --frozen-lockfile`, syncs `package.json`'s version from the tag, typechecks,
  builds with bun, then publishes to npm with `npm publish --provenance --access public`. Build and typecheck
  stay on bun; npm is used only for the publish call, because trusted publishing needs a recent npm to exchange
  the OIDC token.

No token is stored in the repository for this. The workflow authenticates to npm through **trusted
publishing**: npm exchanges the workflow's OIDC identity (declared with `permissions: id-token: write`) for a
short-lived publish credential, scoped to this exact repository and workflow file. This has to be bound once,
by hand, before the first tag can publish anything:

1. **First publish is manual.** Trusted publishing cannot bootstrap itself: the package has to exist on npm
   before the npm registry has anything to bind the repository to. From the repo root:
   ```bash
   npm publish --access public
   ```
2. **Bind trusted publishing.** On npmjs.com, in the package's settings, add a trusted publisher: GitHub
   Actions, this repository, workflow `release.yml`.

Every release after that is tag-driven, exactly as described above.

Hard rules learned from the org's rulesets. Keep them or the run fails before any step:

- **Pin every GitHub Action to a full commit SHA** (`uses: actions/checkout@<sha> # v4`), never a moving tag.
  Refresh a SHA with `gh api repos/<owner>/<repo>/commits/<ref> --jq .sha`.
- The frozen install MUST run **before** the version-sync step, or it aborts with "lockfile had changes".
- **Tags are protected**: they can't be force-moved or deleted. A botched release means bumping to a new
  version, not reusing the tag.

Consumers pick up a new version with `bun update @akira-io/ui` (a `^` range allows minors and patches).

---

[← Adoption Guide](05-adoption-guide.md) · [Index](00-index.md)
