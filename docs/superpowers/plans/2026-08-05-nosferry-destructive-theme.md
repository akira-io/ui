# Nos Ferry Destructive Theme Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make destructive actions use an accessible vermillion pair under the official Nos Ferry preset while leaving Akira and the Button API unchanged.

**Architecture:** Expand the generic preset contract from one required semantic pair to one required pair plus one optional all-or-nothing pair. Put the Nos Ferry colors in the shipped preset, keep components token-driven, mirror the package documentation into the site repository, and validate the installed package through the real Button preview.

**Tech Stack:** CSS custom properties with OKLCH, TypeScript, Vitest, Astro, React, Bun, npm, GitHub.

## Global Constraints

- `--primary` and `--primary-foreground` remain required in every preset, in light and dark mode.
- `--destructive` and `--destructive-foreground` are optional but must be declared together in both schemes.
- Presets may not declare any other semantic token.
- Every declared foreground/background pair must use literal `oklch(...)` values and clear WCAG AA at `4.5:1` or higher.
- Nos Ferry light destructive is `oklch(0.565 0.21 34)` over `oklch(0.985 0 0)`.
- Nos Ferry dark destructive is `oklch(0.72 0.18 38)` over `oklch(0.161 0.027 294)`.
- Do not change the Button API, Button variants, Akira's default destructive pair, or introduce warning tokens.
- Keep design, package implementation, package documentation, site synchronization, and review fixes in separate commits.
- Do not open PRs until package gates, site gates, browser validation, and joint user approval all pass.

---

## File map

### Package worktree: `/Users/kid/akira-io/ui/.worktrees/akira-ui`

- `tests/theme-presets.test.ts`: defines and enforces the generic preset contract.
- `themes/nosferry.css`: provides the official Nos Ferry semantic overrides.
- `docs/00-index.md`: summarizes the preset capability.
- `docs/02-theme-and-tokens.md`: documents the concise token contract and semantic reference.
- `docs/03-components.md`: explains how destructive component variants follow preset semantics.
- `docs/06-development.md`: describes the preset test suite.
- `docs/07-theming.md`: provides the full preset-authoring contract and example.
- `docs/09-contributing.md`: states when fixed semantic tokens may be overridden by a preset.

### Site worktree: `/Users/kid/akira-io/ui/.worktrees/ui`

- `src/content/docs/{00-index,02-theme-and-tokens,03-components,06-development,07-theming,09-contributing}.md`: exact consumer-facing mirrors of the package docs.
- `node_modules/@akira-io/ui/themes/nosferry.css`: temporary prototype only; `npm run sync:lib` must replace it with the package build and no direct edit is committed.

---

### Task 1: Enforce the optional semantic pair and ship Nos Ferry Vermillion

**Files:**
- Modify: `tests/theme-presets.test.ts`
- Modify: `themes/nosferry.css`

**Interfaces:**
- Consumes: `declarationsIn(css, selector): Record<string, string>`, `parseOklch(value)`, and `contrastRatio(a, b)` from the existing test helpers.
- Produces: a generic preset contract where the primary pair is required and the destructive pair is optional, complete, literal, and contrast-tested.

- [ ] **Step 1: Write the failing Nos Ferry behavior test**

In `tests/theme-presets.test.ts`, add exact assertions before changing the preset:

```ts
describe('the nosferry destructive palette', () => {
    const css = readStylesheet('themes/nosferry.css');
    const light = declarationsIn(css, "[data-brand='nosferry']");
    const dark = declarationsIn(css, "[data-brand='nosferry'].dark");

    it('uses the approved vermillion pair in light mode', () => {
        expect(light['--destructive']).toBe('oklch(0.565 0.21 34)');
        expect(light['--destructive-foreground']).toBe('oklch(0.985 0 0)');
    });

    it('uses the approved vermillion pair in dark mode', () => {
        expect(dark['--destructive']).toBe('oklch(0.72 0.18 38)');
        expect(dark['--destructive-foreground']).toBe(
            'oklch(0.161 0.027 294)',
        );
    });
});
```

- [ ] **Step 2: Run the focused test and verify RED**

Run:

```bash
bun run test tests/theme-presets.test.ts
```

Expected: the two new tests fail because `--destructive` and `--destructive-foreground` are `undefined` in both selectors.

- [ ] **Step 3: Generalize the preset contract test**

Replace the two-token equality check with required, allowed, and paired declarations:

```ts
const REQUIRED = ['--primary', '--primary-foreground'] as const;
const DESTRUCTIVE_PAIR = [
    '--destructive',
    '--destructive-foreground',
] as const;
const ALLOWED = new Set<string>([...REQUIRED, ...DESTRUCTIVE_PAIR]);

function expectTokenContract(scope: Record<string, string>): void {
    expect(REQUIRED.filter((token) => !(token in scope))).toEqual([]);
    expect(Object.keys(scope).filter((token) => !ALLOWED.has(token))).toEqual(
        [],
    );

    const destructiveCount = DESTRUCTIVE_PAIR.filter(
        (token) => token in scope,
    ).length;
    expect([0, DESTRUCTIVE_PAIR.length]).toContain(destructiveCount);
}

function expectReadablePair(
    scope: Record<string, string>,
    background: string,
    foreground: string,
): void {
    expect(
        contrastRatio(
            parseOklch(scope[background]),
            parseOklch(scope[foreground]),
        ),
    ).toBeGreaterThanOrEqual(4.5);
}
```

For each light and dark scope:

- Call `expectTokenContract(scope)`.
- Check every value starts with `oklch(`.
- Call `expectReadablePair(scope, '--primary', '--primary-foreground')`.
- If `--destructive` exists, call `expectReadablePair(scope, '--destructive', '--destructive-foreground')`.

This structure rejects missing primary tokens, unknown tokens, partial destructive pairs, variables, and insufficient contrast when any preset changes later.

- [ ] **Step 4: Add the minimal official preset implementation**

Update `themes/nosferry.css` to exactly:

```css
[data-brand='nosferry'] {
    --primary: oklch(0.577 0.245 27.325); /* red-600 */
    --primary-foreground: oklch(0.985 0 0);
    --destructive: oklch(0.565 0.21 34);
    --destructive-foreground: oklch(0.985 0 0);
}

[data-brand='nosferry'].dark {
    --primary: oklch(0.704 0.191 22.216); /* red-400 */
    --primary-foreground: oklch(0.161 0.027 294);
    --destructive: oklch(0.72 0.18 38);
    --destructive-foreground: oklch(0.161 0.027 294);
}
```

- [ ] **Step 5: Run focused verification and verify GREEN**

Run:

```bash
bun run test tests/theme-presets.test.ts
```

Expected: every preset-contract and Nos Ferry palette test passes. Record the measured light and dark contrast ratios from the helper if a failure occurs; do not lower the `4.5` threshold.

- [ ] **Step 6: Run complete package gates**

Run separately:

```bash
bun run test
bun run typecheck
bun run format:check
bun run build
```

Expected: all commands pass with no test, type, or formatting failures.

- [ ] **Step 7: Commit the package behavior**

```bash
git add tests/theme-presets.test.ts themes/nosferry.css
git commit -m "feat(theme): distinguish Nos Ferry destructive actions"
```

---

### Task 2: Document the expanded package contract

**Files:**
- Modify: `docs/00-index.md`
- Modify: `docs/02-theme-and-tokens.md`
- Modify: `docs/03-components.md`
- Modify: `docs/06-development.md`
- Modify: `docs/07-theming.md`
- Modify: `docs/09-contributing.md`

**Interfaces:**
- Consumes: the tested contract and exact values from Task 1.
- Produces: canonical package documentation that the site mirrors verbatim.

- [ ] **Step 1: Update the concise theme documentation**

Make these statements explicit in `docs/00-index.md` and `docs/02-theme-and-tokens.md`:

```md
Brand presets always override the primary pair and may optionally override the complete destructive pair.
```

In the semantic token table, describe destructive as global by default and preset-overridable only as a complete foreground/background pair. Replace “exactly two tokens” with the required primary pair plus the optional destructive pair, including the all-or-nothing, literal OKLCH, and `4.5:1` rules. Describe `themes/nosferry.css` as eight declarations total across its two selectors.

- [ ] **Step 2: Update component and contributor semantics**

In `docs/03-components.md`, replace “stay red under every brand preset” with:

```md
Destructive states read `--destructive`; they use the package default unless the active preset supplies a complete destructive pair, as Nos Ferry does.
```

In `docs/09-contributing.md`, retain the rule that components use semantic tokens rather than literals, and state that preset-level overrides are allowed only by the documented contract.

- [ ] **Step 3: Update the deep authoring guide and development matrix**

In `docs/07-theming.md`:

- Replace “exactly four declarations” with four required primary declarations plus four optional destructive declarations.
- Show both the minimal four-declaration preset and the eight-declaration Nos Ferry example.
- State that app-specific presets follow the same required/optional shape.
- Update the `tests/theme-presets.test.ts` bullets to list required tokens, allowed optional pair, pair completeness, literal values, and contrast checks.

In `docs/06-development.md`, update the preset-test row to the same contract.

- [ ] **Step 4: Scan for contradictory current-contract wording**

Run:

```bash
rg -n "exactly two|only the two|exactly four|two selectors, four|fixed across every preset|stay red under every brand" docs/00-index.md docs/02-theme-and-tokens.md docs/03-components.md docs/06-development.md docs/07-theming.md docs/09-contributing.md
```

Expected: no stale claim remains. Do not edit historical files under `docs/superpowers/specs/2026-07-31-*` or `docs/superpowers/plans/2026-07-31-*`; they record earlier decisions.

- [ ] **Step 5: Re-run package gates affected by docs and packaging**

Run:

```bash
bun run test
bun run typecheck
bun run format:check
bun run build
```

Expected: all commands pass and the build still packages `themes/nosferry.css`.

- [ ] **Step 6: Commit package documentation separately**

```bash
git add docs/00-index.md docs/02-theme-and-tokens.md docs/03-components.md docs/06-development.md docs/07-theming.md docs/09-contributing.md
git commit -m "docs(theme): document semantic preset overrides"
```

---

### Task 3: Sync the package into the real site consumer

**Files:**
- Modify: `src/content/docs/00-index.md`
- Modify: `src/content/docs/02-theme-and-tokens.md`
- Modify: `src/content/docs/03-components.md`
- Modify: `src/content/docs/06-development.md`
- Modify: `src/content/docs/07-theming.md`
- Modify: `src/content/docs/09-contributing.md`
- Replace locally, do not commit: `node_modules/@akira-io/ui/dist`, `node_modules/@akira-io/ui/themes`, `node_modules/@akira-io/ui/theme.css`

**Interfaces:**
- Consumes: package build and canonical docs from Tasks 1–2.
- Produces: a consumer site whose installed package and documentation exactly match the package worktree.

- [ ] **Step 1: Sync the built library**

From `/Users/kid/akira-io/ui/.worktrees/ui`, run:

```bash
npm run sync:lib
```

Expected: `sync:lib ok`. This must overwrite the temporary prototype in `node_modules/@akira-io/ui/themes/nosferry.css` with the official package file.

- [ ] **Step 2: Mirror the six canonical docs with `apply_patch`**

Update each following site document so its contents exactly match the package document with the same filename under `/Users/kid/akira-io/ui/.worktrees/akira-ui/docs/`:

```text
00-index.md
02-theme-and-tokens.md
03-components.md
06-development.md
07-theming.md
09-contributing.md
```

Do not change unrelated site copy or demos.

- [ ] **Step 3: Verify package and docs synchronization**

Run:

```bash
shasum -a 256 ../akira-ui/dist/index.js node_modules/@akira-io/ui/dist/index.js
diff -q ../akira-ui/themes/nosferry.css node_modules/@akira-io/ui/themes/nosferry.css
diff -q ../akira-ui/docs/00-index.md src/content/docs/00-index.md
diff -q ../akira-ui/docs/02-theme-and-tokens.md src/content/docs/02-theme-and-tokens.md
diff -q ../akira-ui/docs/03-components.md src/content/docs/03-components.md
diff -q ../akira-ui/docs/06-development.md src/content/docs/06-development.md
diff -q ../akira-ui/docs/07-theming.md src/content/docs/07-theming.md
diff -q ../akira-ui/docs/09-contributing.md src/content/docs/09-contributing.md
```

Expected: the two hashes are identical and every `diff -q` exits `0` without output.

- [ ] **Step 4: Run complete site gates**

Run separately:

```bash
npm run format:check
npm test
npm run check
npm run build
```

Expected: format passes, every Vitest suite passes, Astro reports zero diagnostics, and the static build completes.

- [ ] **Step 5: Commit the site mirror separately**

```bash
git add src/content/docs/00-index.md src/content/docs/02-theme-and-tokens.md src/content/docs/03-components.md src/content/docs/06-development.md src/content/docs/07-theming.md src/content/docs/09-contributing.md
git commit -m "docs(site): sync destructive preset guidance"
```

---

### Task 4: Validate the real preview and publish coordinated PRs

**Files:**
- No planned source changes.
- If preview validation reveals a defect, return to a failing test and make the smallest fix in a separate commit before repeating this task.

**Interfaces:**
- Consumes: installed official package and site docs from Task 3.
- Produces: joint visual approval and two coordinated PRs, one per Git repository.

- [ ] **Step 1: Start a clean site preview**

Stop the existing process on port `4321` and run:

```bash
npm run dev -- --host 127.0.0.1 --port 4321
```

Expected: Astro reports `http://127.0.0.1:4321/` ready with no startup error.

- [ ] **Step 2: Validate Nos Ferry light mode in the in-app browser**

Open:

```text
http://127.0.0.1:4321/components/button/#demo-variants
```

Use the site's Brand palette control to select `NosFerry`. Verify computed values:

```text
--primary: oklch(0.577 0.245 27.325)
--destructive: oklch(0.565 0.21 34)
```

Confirm Default and Destructive are visibly distinct, labels remain readable, hover/focus styling still derives from the correct tokens, and the console has no errors or warnings.

- [ ] **Step 3: Validate Nos Ferry dark mode**

Use the site's theme control to switch to dark. Verify computed values:

```text
--primary: oklch(0.704 0.191 22.216)
--destructive: oklch(0.72 0.18 38)
```

Confirm the two variants remain distinct and readable and the console stays empty.

- [ ] **Step 4: Obtain joint user approval**

Leave the real Button preview visible. Report the exact package/site gates and light/dark token values. Do not push or open PRs until the user explicitly approves this final preview.

- [ ] **Step 5: Review final diffs and repository state**

Package commands:

```bash
git status --short
git diff origin/main...HEAD --stat
```

Site commands:

```bash
git status --short
git diff origin/main...HEAD --stat
```

Expected: both worktrees are clean; only scoped issue #3, theme, and mirrored site changes appear.

- [ ] **Step 6: Push the package branch and open its PR**

Package repository: `akira-io/ui`, branch `akira/issue-3-spinner`.

Use the GitHub publishing workflow to push and open a ready PR summarizing Spinner, Button loading, the Nos Ferry destructive preset, package tests, and real consumer validation. Link issue #3 and mention the coordinated site PR.

- [ ] **Step 7: Push the site branch and open its PR**

Site repository: `kidiatoliny/ui`, branch `akira/issue-3-preview`.

Push and open a ready PR summarizing Spinner/Button previews, responsive fix, synced theme documentation, site gates, and joint browser validation. Link the package PR.
