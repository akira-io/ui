# Contributing

This page is the practical companion to [CONTRIBUTING.md](../CONTRIBUTING.md) at the repo root: what to do,
in order, to add or change something here, and what a review actually checks before merging it.

## Adding a component

shadcn is preconfigured (New York style, neutral base color) in `components.json`.

1. **Generate it.**

   ```bash
   bunx --bun shadcn@latest add <component>
   ```

   This writes into `src/components/ui/` and installs any Radix dependency it needs.

2. **Decline overwrites of customized components.** If the CLI offers to overwrite something this package
   has already customized (`button` is the clearest example: pill radius, a lifted shadow, hover/active
   scale), say no. The customization here is canonical, not the stock shadcn output; see
   [Components](03-components.md) for the current list of what has been customized and why.

3. **Read from tokens, never a literal palette class.** Every color a component renders has to come from a
   semantic token (`bg-primary`, `text-muted-foreground`, `border-border`, and so on), not a hardcoded
   Tailwind palette class like `bg-red-500` or `text-emerald-700`. This is not a style preference: it is
   enforced by `tests/no-brand-literals.test.ts`, which scans every `.tsx` file under `src/` for a Tailwind
   hue class name (`red`, `violet`, `emerald`, and fourteen others, at any shade, with or without an opacity
   modifier) and fails the build if it finds one, naming the exact file, line, and class in the failure
   message. A component that needs a semantic color for a destructive action, for instance, uses
   `--destructive`, which is itself a token, never the literal Tailwind class it resolves to. Preset-level
   overrides are allowed only by the documented contract: the required primary pair and, optionally, the
   complete destructive pair in both schemes.

4. **Export it.** Add the new component to `src/index.ts`.

5. **Ship a demo with it.** A new component's live demo goes out in the same change at the
   [hosted preview](https://ui.akira-io.com/components/), not as a follow-up PR.

6. **Verify before pushing.**

   ```bash
   bun run test && bun run typecheck && bun run build
   ```

See [Development & Release](06-development.md) for the full script reference and project layout.

## Comment policy

Code should be self-documenting through naming; comments are for the cases naming cannot cover.

- No narrative or "what this does" comments on obvious code. A prop destructure, a `map`, a ternary that
  reads naturally does not get a comment above it.
- No docblocks restating a function or component's name in prose.
- No "why we changed this" history in comments; that belongs in the commit message.
- A short `// TODO:` or `// FIXME:` line is fine when it flags real, specific follow-up work.
- The one case worth a comment: logic that is genuinely non-obvious and would mislead an experienced reader
  without one. Keep it to a line, next to the code it explains.

When in doubt, leave the comment out.

## Formatting

Prettier is the formatter of record, with `prettier-plugin-organize-imports` and
`prettier-plugin-tailwindcss` (which also sorts and dedupes utility classes against `theme.css` as the
Tailwind stylesheet).

```bash
bun run format         # write
bun run format:check   # check only, what CI runs
```

Run `format` before opening a PR. A diff full of formatting noise makes the actual change harder to review,
and `format:check` blocks a PR that skips it.

## Commit convention

Commits follow [Conventional Commits](https://www.conventionalcommits.org/) with a scope:
`<type>(<scope>): <description>`, for example `fix(theme): make components read the brand tokens` or
`feat(tour)!: rename the popover class to akira-tour` for a breaking change.

This is not a style preference either: `cliff.toml` drives git-cliff, and git-cliff parses exactly this
format to build `CHANGELOG.md` on release (see [Development & Release](06-development.md)). A commit that
does not match a recognized type (`feat`, `fix`, `perf`, `refactor`, `docs`, `style`, `test`, `ci`, `chore`)
either gets filtered out of the changelog entirely or lands in an `Other` bucket with no scope grouping.
Include the scope; it is what makes the generated changelog readable by area (`theme`, `tour`, `package`,
and so on) instead of one flat list.

## What a review checks

- **Tests exist for the change**, and `bun run test` passes. A new component that introduces a brand-facing
  color goes through `tests/no-brand-literals.test.ts` automatically just by living under `src/`; a new
  token or preset goes through `tests/theme-ramp.test.ts`, `tests/theme-contrast.test.ts`, or
  `tests/theme-presets.test.ts` depending on what it touches (see [Theming](07-theming.md) for what each of
  those actually asserts).
- **`bun run typecheck` introduces zero new errors.**
- **`bun run build` succeeds.**
- **`bun run format:check` passes**, so the diff is only the actual change.
- **The diff is focused.** Refactors, feature work, and dependency bumps stay in separate PRs; a feature PR
  is not the place for a drive-by rewrite of a file it happens to touch.
- **No emojis**, in code, copy, commit messages, or the PR description.
- **A customized primitive was not silently reverted** by re-running the shadcn CLI and accepting its
  overwrite prompt.

---

[← Blocks](08-blocks.md) · Next: [Code →](10-code.md)
