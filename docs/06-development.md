# Development & Release

## Setup

```bash
bun install
```

Bun only: `esbuild-plugin-preserve-directives`, a dev dependency used to keep `'use client'` in the tsup
build, declares a peer on `esbuild@^0.21.0` while the project installs `esbuild@0.27.7`. Bun installs
across that mismatch without complaint; npm 7+ fails the install with `ERESOLVE`. Use bun.

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
| `tests/theme-presets.test.ts` | The preset contract: every file under `themes/` declares the required `--primary` / `--primary-foreground` pair under both `[data-brand='<name>']` and `[data-brand='<name>'].dark`. It may add `--destructive` / `--destructive-foreground` only as a complete pair in both schemes. All values are literal `oklch(...)` colors, and every declared pair clears WCAG AA (4.5:1). See [Theming](02-theme-and-tokens.md) for what a preset may and may not override. |
| `tests/no-brand-literals.test.ts` | No file under `src/` hardcodes a Tailwind palette hue (`red-500`, `emerald-700`, and so on) in a class name. A component must read a token instead. On failure it names the offending file, line, and class. |
| `src/blocks/date-filter/date-filter.test.ts` | The date filter's encoding, its relative-range resolution, and the trigger summary in both locales. |
| `src/blocks/date-filter/decode.test.ts` | `decodeDateFilter` inverts `encodeDateFilter` for every filter shape, including the relative units and the offset, and falls back to the unfiltered state on a malformed value instead of throwing. |
| `src/inertia-table-filters.test.ts` | The table filters hook: rapid typing collapses into one visit, the visit asks only for the declared props and preserves state and scroll, a cleared filter leaves the query instead of going out blank, the state round trips through the url, and the timer is cleared on unmount. |
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
- A new component ships with a live demo in the [hosted preview](https://ui.akira-io.com/components/) as part
  of the same change, not as a follow-up.
- `bun run test && bun run typecheck && bun run build`.

## How dependencies are bundled

- `react`, `react-dom`, `@inertiajs/react`, `react-hook-form`, `recharts`, `@tanstack/react-table` are **external**: never bundled.
- A component that imports an optional peer ships from its own entry point (`charts`, `data-table`, `form`), never from `src/index.ts`, `src/blocks.ts` or `src/shells.ts`; `tests/optional-peer-entries.test.ts` fails otherwise.
- Radix, Lucide, and the rest are dependencies, imported (not inlined) by the output.
- Interactive components are client components. (Next.js RSC `"use client"` preservation is a known follow-up;
  see the TODO in `tsup.config.ts`.)

## Versioning & publishing

Semver, **tag-driven**, published publicly to **npm** as `@akira-io/ui`. `package.json` carries the current
released version. A release is cut as `release/X.Y.Z` from `main` and bumps it there in its own commit,
`chore(release): vX.Y.Z`. The tag goes on the tip of that branch, so the tagged commit and the published
tarball carry the same version and nothing merged to `main` after the cut ships with it; never bump it
mid-development.

**Before you pick `X.Y.Z`: a breaking commit gets its own changelog section, and the workflow checks your tag
against the commits.** `cliff.toml`'s `commit_parsers` puts any `fix(scope)!`, `feat(scope)!`, or a
`BREAKING CHANGE:` footer in its own `Breaking Changes` group instead of folding it into an ordinary Bug
Fixes/Features entry, so `git-cliff --unreleased` (or a glance at the last few commits) already tells you
whether the next release is a major bump. On a plain `vX.Y.Z` tag (not a `-` pre-release), the `guard` job
re-derives the version itself from the commit history with `git-cliff --bumped-version` and **rejects the tag
if it disagrees**, printing the version you should have used. So: tag what you believe is right, and if you
guessed wrong the workflow run's log tells you the number to re-tag as — you do not have to compute the bump
by hand before pushing. A `vX.Y.Z-*` pre-release tag skips this check, since there is no single "next version"
to compute for one.

```bash
git checkout -b release/X.Y.Z --no-track origin/main
# commit chore(release): vX.Y.Z, which sets package.json to X.Y.Z
git push -u origin release/X.Y.Z   # open the pull request into main, do not merge it yet
git tag -a vX.Y.Z -m vX.Y.Z        # annotated, on the tip of release/X.Y.Z
git push origin vX.Y.Z
# once the workflow has published, merge the pull request into main with a merge commit
```

On a `vX.Y.Z` (or `vX.Y.Z-*`) tag, `release.yml` runs a `guard` job first: it refuses a tag that isn't the
tip of `release/X.Y.Z` (a pre-release `vX.Y.Z-rc.1` belongs to `release/X.Y.Z` too), refuses one whose
version `package.json` does not carry at that commit, and (skipping pre-releases) rejects one that disagrees
with the version `git-cliff` computes from the commits, as described above. Once `guard` passes, `release`
and `build` run, and `publish` follows `build`:

- **release**: git-cliff regenerates `CHANGELOG.md` from the conventional-commit history and commits it back
  to `release/X.Y.Z`, creates the GitHub Release from the same notes, and posts them to Discord through
  `scripts/release-discord-notes.mjs`, which keeps the text of markdown links but drops their targets and
  defuses `@everyone`, `@here` and user, role or channel mentions written into commit messages. The changelog
  reaches `main` with the release pull request, whose merge also rebuilds `main-dist`.

Merge the release pull request with a merge commit, never a squash or a rebase, and before the next release
is cut. The next tag's version and changelog are computed from the tags reachable from it, so `vX.Y.Z` has
to be an ancestor of `main` by then. Keep `release/X.Y.Z` until the workflow has published and the pull
request is merged: the guard needs it to re-run a failed job. Once the release job has committed the
changelog, the branch is one commit past the tag, and the guard still passes a re-run as long as that commit
is the only one: its parent is the tag, its subject is `chore(release): vX.Y.Z`, it touches only
`CHANGELOG.md` and `package.json`, and `package.json` changes in nothing but `version`. A re-run of the release
job then finds the same changelog on the branch and pushes nothing. Anything else pushed to `release/X.Y.Z`
after the tag makes the guard refuse, and the fix is a new version.
- **build**: `bun install --frozen-lockfile`, syncs `package.json`'s version from the tag, typechecks, builds
  with bun, and packs the tarball with `npm pack --ignore-scripts`, uploaded as the `package` artifact. This
  job has no `id-token` permission, so nothing the install or the build runs can ask for an npm credential.
- **publish**: downloads that tarball and publishes it with
  `npm publish --provenance --access public --ignore-scripts`. It installs no dependencies and runs no build,
  and `--ignore-scripts` keeps `prepublishOnly` from rebuilding inside the job that holds the OIDC token. npm
  is used only here, because trusted publishing needs npm 11.5.1 or later to exchange the OIDC token and Node 22
  ships npm 10, so the job installs an exact npm version. Bump it deliberately, never to `latest`.

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

[← Adoption Guide](05-adoption-guide.md) · Next: [Theming →](07-theming.md)
