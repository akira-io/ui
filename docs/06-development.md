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
| `bun run typecheck` | `tsc --noEmit`. |
| `bun run format` | Prettier write. |
| `bun run format:check` | Prettier check. |

## Project layout

```
src/
  index.ts            # primitives + cn barrel (framework-agnostic)
  shells.ts           # generic shells barrel
  inertia.ts          # Inertia-bound shell preset
  components/ui/      # the shadcn component set
  shells/             # app shell, sidebar, nav, settings layout
  hooks/              # use-mobile, use-initials, use-appearance
  lib/                # cn(), href helpers
  types.ts            # NavItem, LinkComponent, etc.
theme.css             # design tokens (the source of truth)
```

## Adding or updating a component

shadcn is preconfigured (New York, neutral) in `components.json`:

```bash
bunx --bun shadcn@latest add <component>
```

- It writes into `src/components/ui/` and installs any Radix dependency.
- When it offers to overwrite an existing NosFerry-customized component (e.g. `button`), **decline**: those are
  canonical here.
- Export the new component from `src/index.ts`.
- `bun run typecheck && bun run build`.

## How dependencies are bundled

- `react`, `react-dom`, `@inertiajs/react`, `react-hook-form` are **external**: never bundled.
- Radix, Lucide, TanStack Table, etc. are dependencies, imported (not inlined) by the output.
- Interactive components are client components. (Next.js RSC `"use client"` preservation is a known follow-up;
  see the TODO in `tsup.config.ts`.)

## Versioning & publishing

Semver, **tag-driven**, published privately to **GitHub Packages** (`npm.pkg.github.com`) under `@akira-io`.
`package.json` stays at `0.0.0`: the published version comes from the tag, so you never edit the version by
hand. To release:

```bash
git tag -a vX.Y.Z -m vX.Y.Z   # annotated, or git push --follow-tags won't send it
git push origin main
git push origin vX.Y.Z
```

On a `vX.Y.Z` tag the `release.yml` workflow runs two jobs:

- **release**: git-cliff regenerates `CHANGELOG.md` and commits it to the default branch, creates the GitHub
  Release, and posts to Discord (`DISCORD` repo secret).
- **publish**: `bun install --frozen-lockfile`, then syncs `package.json` version from the tag, typechecks,
  builds, and `bun publish` to GitHub Packages (auth via the workflow's `GITHUB_TOKEN`).

Hard rules learned from the org rulesets. Keep them or the run fails before any step:

- **Pin every GitHub Action to a full commit SHA** (`uses: actions/checkout@<sha> # v4`), never a moving tag.
  Refresh a SHA with `gh api repos/<owner>/<repo>/commits/<ref> --jq .sha`.
- The frozen install MUST run **before** the version-sync step, or it aborts with "lockfile had changes".
- **Tags are protected**: they can't be force-moved or deleted. A botched release means bumping to a new
  version, not reusing the tag.

Consumers pick up a new version with `bun update @akira-io/nosferry-ui` (a `^` range allows minors/patches).

---

[← Adoption Guide](05-adoption-guide.md) · [Index](00-index.md)
