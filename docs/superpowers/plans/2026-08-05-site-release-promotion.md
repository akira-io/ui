# Release-Gated UI Site Promotion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make unreleased UI examples accumulate safely on the site `next` branch and promote them to the public Vercel site only after the exact package release is available in npm and all site gates pass.

**Architecture:** Package releases resolve an npm dist-tag, publish, verify registry availability, and dispatch the exact version to the site. The site validates unreleased examples on `next` against a tarball built from package `main`; after a release, a promotion workflow pins the released version, validates a clean registry install, and fast-forwards site `main`. Vercel ignores every non-production branch.

**Tech Stack:** GitHub Actions, Bun, npm registry trusted publishing, Node.js ESM scripts, Vitest, Astro, Vercel `ignoreCommand`, Git.

## Global Constraints

- Package work happens in `/Users/kid/akira-io/ui/.worktrees/akira-ui`; site work happens in `/Users/kid/akira-io/ui/.worktrees/ui`.
- Fetch before branch creation; package branches start at package `origin/main`, and site issue work starts at site `origin/next`.
- Site `main` contains only released APIs; site `next` contains approved unreleased examples.
- Do not manually replace `node_modules/@akira-io/ui`.
- Do not commit a temporary local tarball installation or its lockfile changes.
- Prereleases use their prerelease dist-tag (`beta`, `rc`, and so on) and never move an existing stable `latest`.
- The site pins the exact released package version during promotion.
- Vercel builds only production deployments from site `main`.
- Conflicts and failed gates stop promotion before site `main` changes.
- Before enabling automatic promotion, perform a dry run against disposable remote branches.

---

### Task 1: Make package publication prerelease-safe and dispatch successful releases

**Files:**
- Create: `scripts/release-dist-tag.mjs`
- Create: `tests/release-dist-tag.test.ts`
- Modify: `.github/workflows/release.yml`

**Interfaces:**
- Consumes: tag version from `GITHUB_REF_NAME` and current `@akira-io/ui@latest` version from npm.
- Produces: `resolveDistTag(version, currentLatest): string`; repository dispatch event `ui-package-released` with `{ version: string, source_sha: string }`.

- [ ] **Step 1: Write failing dist-tag unit tests**

```ts
import { describe, expect, it } from 'vitest';
import { resolveDistTag } from '../scripts/release-dist-tag.mjs';

describe('resolveDistTag', () => {
  it('uses latest for a stable release', () => {
    expect(resolveDistTag('1.1.0', '1.0.0')).toBe('latest');
  });

  it('uses beta without replacing an existing stable latest', () => {
    expect(resolveDistTag('1.1.0-beta.1', '1.0.0')).toBe('beta');
  });

  it('uses the first prerelease identifier as the dist-tag', () => {
    expect(resolveDistTag('2.0.0-rc.2', '1.0.0')).toBe('rc');
  });

  it.each(['1.1', 'v1.1.0', '1.1.0-', 'latest'])('rejects invalid version %s', (version) => {
    expect(() => resolveDistTag(version, '1.0.0')).toThrow(/valid semantic version/i);
  });
});
```

- [ ] **Step 2: Run the focused test and confirm RED**

Run: `npm test -- --run tests/release-dist-tag.test.ts`

Expected: FAIL because `scripts/release-dist-tag.mjs` does not exist.

- [ ] **Step 3: Implement the dist-tag resolver and CLI**

```js
const VERSION_PATTERN = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-([0-9A-Za-z-]+)(?:\.[0-9A-Za-z-]+)*)?$/;

export function resolveDistTag(version, currentLatest = '') {
  const match = VERSION_PATTERN.exec(version);
  if (!match) throw new Error(`${version} is not a valid semantic version`);
  return match[4] ?? 'latest';
}

if (import.meta.url === `file://${process.argv[1]}`) {
  process.stdout.write(resolveDistTag(process.argv[2] ?? '', process.argv[3] ?? ''));
}
```

- [ ] **Step 4: Run the focused test and confirm GREEN**

Run: `npm test -- --run tests/release-dist-tag.test.ts`

Expected: all resolver tests pass.

- [ ] **Step 5: Update the package release workflow**

In `.github/workflows/release.yml`, give the publish job an output and replace the unconditional publish command with:

```yaml
      - name: Resolve npm dist-tag
        id: package
        shell: bash
        run: |
          VERSION="${GITHUB_REF_NAME#v}"
          CURRENT_LATEST="$(npm view @akira-io/ui@latest version 2>/dev/null || true)"
          DIST_TAG="$(node scripts/release-dist-tag.mjs "$VERSION" "$CURRENT_LATEST")"
          echo "version=$VERSION" >> "$GITHUB_OUTPUT"
          echo "dist_tag=$DIST_TAG" >> "$GITHUB_OUTPUT"

      - name: Publish to npm
        run: npm publish --provenance --access public --tag "${{ steps.package.outputs.dist_tag }}"

      - name: Verify npm publication
        shell: bash
        run: |
          VERSION="${{ steps.package.outputs.version }}"
          for attempt in 1 2 3 4 5 6; do
            if [ "$(npm view "@akira-io/ui@$VERSION" version 2>/dev/null || true)" = "$VERSION" ]; then
              exit 0
            fi
            sleep 10
          done
          echo "@akira-io/ui@$VERSION is not available in npm" >&2
          exit 1
```

Expose the version from `publish`, then add a dependent dispatch job:

```yaml
  dispatch-site:
    needs: publish
    runs-on: ubuntu-latest
    permissions:
      contents: read
    steps:
      - name: Dispatch released version to the site
        env:
          GH_TOKEN: ${{ secrets.PAYABLE_DOCS_TOKEN }}
          VERSION: ${{ needs.publish.outputs.version }}
          SOURCE_SHA: ${{ github.sha }}
        run: |
          gh api --method POST repos/kidiatoliny/ui/dispatches \
            -f event_type=ui-package-released \
            -F "client_payload[version]=$VERSION" \
            -F "client_payload[source_sha]=$SOURCE_SHA"
```

The `publish` job must declare:

```yaml
    outputs:
      version: ${{ steps.package.outputs.version }}
```

- [ ] **Step 6: Add workflow contract assertions**

Extend `tests/release-dist-tag.test.ts` to read `.github/workflows/release.yml` and assert that `dispatch-site` contains `needs: publish`, the event name is `ui-package-released`, and `npm publish` uses `--tag`.

- [ ] **Step 7: Run package verification**

Run: `npm test -- --run && npm run typecheck && npm run format:check && npm run build`

Expected: all package tests and build gates pass.

- [ ] **Step 8: Commit Task 1**

```bash
git add scripts/release-dist-tag.mjs tests/release-dist-tag.test.ts .github/workflows/release.yml
git commit -m "ci(release): dispatch published UI versions"
```

---

### Task 2: Give site `next` a reproducible local-package overlay

**Files:**
- Create: `scripts/install-local-ui.mjs`
- Create: `tests/local-ui-install.test.ts`
- Modify: `package.json`
- Modify: `.github/workflows/ci.yml`

**Interfaces:**
- Consumes: absolute package checkout path through `AKIRA_UI_DIR`.
- Produces: `bun run ui:local`; a temporary installed npm tarball with the committed site `package.json` and `bun.lock` restored unchanged.

- [ ] **Step 1: Write failing validation tests for the installer**

```ts
import { describe, expect, it } from 'vitest';
import { resolve } from 'node:path';
import { validatePackageDirectory } from '../scripts/install-local-ui.mjs';

describe('validatePackageDirectory', () => {
  it('rejects a directory without the Akira UI package', async () => {
    await expect(validatePackageDirectory(resolve('tests'))).rejects.toThrow(/@akira-io\/ui/);
  });
});
```

- [ ] **Step 2: Run the focused test and confirm RED**

Run: `bun run test -- --run tests/local-ui-install.test.ts`

Expected: FAIL because `scripts/install-local-ui.mjs` does not exist.

- [ ] **Step 3: Implement one local artifact installer**

Implement `scripts/install-local-ui.mjs` so that it:

1. resolves `AKIRA_UI_DIR` or its first CLI argument;
2. verifies that the target package name is exactly `@akira-io/ui`;
3. runs `bun install --frozen-lockfile` and `bun run build` inside that package;
4. runs `npm pack --json --pack-destination <temporary-directory>`;
5. saves the site's `package.json` and `bun.lock` bytes;
6. runs `bun add --no-save <absolute-tarball-path>` in the site;
7. restores the two saved files in a `finally` block;
8. exits nonzero if either committed file differs from its saved bytes.

Use `mkdtemp(join(tmpdir(), 'akira-ui-pack-'))` for the tarball directory and `spawnSync` with `stdio: 'inherit'`; do not shell-interpolate paths.

- [ ] **Step 4: Add the site command**

Add to `package.json`:

```json
"ui:local": "node scripts/install-local-ui.mjs"
```

- [ ] **Step 5: Update CI so the package checkout is consumed**

Keep the existing site checkout. For pushes to `next` and pull requests targeting `next`, checkout `akira-io/ui` at `main`, then run:

```yaml
      - name: Install site dependencies
        working-directory: ui
        run: bun install --frozen-lockfile

      - name: Install package main artifact for next
        if: github.ref_name == 'next' || github.base_ref == 'next'
        working-directory: ui
        env:
          AKIRA_UI_DIR: ${{ github.workspace }}/akira-ui
        run: bun run ui:local
```

For `main`, do not overlay the registry package. Rename the package checkout step so its purpose is explicit and guard it with the same `if` expression.

- [ ] **Step 6: Run focused and full site gates with the overlay**

Run:

```bash
bun run test -- --run tests/local-ui-install.test.ts
AKIRA_UI_DIR=/Users/kid/akira-io/ui/.worktrees/akira-ui bun run ui:local
bunx prettier --check "src/**/*.{ts,tsx,astro}" "tests/**/*.ts"
bunx astro check
bun run test
bun run build
git diff --exit-code -- package.json bun.lock
```

Expected: the installer test and all site gates pass; `package.json` and `bun.lock` remain unchanged.

- [ ] **Step 7: Commit Task 2 in the site repository**

```bash
git add scripts/install-local-ui.mjs tests/local-ui-install.test.ts package.json .github/workflows/ci.yml
git commit -m "ci(site): validate next against package main"
```

---

### Task 3: Add atomic release promotion to the site

**Files:**
- Create: `scripts/validate-ui-release.mjs`
- Create: `tests/ui-release-promotion.test.ts`
- Create: `.github/workflows/promote-ui-release.yml`

**Interfaces:**
- Consumes: `repository_dispatch.client_payload.version` and `.source_sha`.
- Produces: validated fast-forward of site `main` to site `next`, with exact `@akira-io/ui` version and regenerated `bun.lock`.

- [ ] **Step 1: Write failing payload/version tests**

```ts
import { describe, expect, it } from 'vitest';
import { validateReleasePayload } from '../scripts/validate-ui-release.mjs';

describe('validateReleasePayload', () => {
  it('accepts an exact semantic version and forty-character source SHA', () => {
    expect(validateReleasePayload('1.1.0-beta.1', 'a'.repeat(40))).toEqual({
      version: '1.1.0-beta.1',
      sourceSha: 'a'.repeat(40),
    });
  });

  it.each([
    ['', 'a'.repeat(40)],
    ['latest', 'a'.repeat(40)],
    ['1.1', 'a'.repeat(40)],
    ['1.1.0', 'short'],
  ])('rejects invalid payload %s %s', (version, sha) => {
    expect(() => validateReleasePayload(version, sha)).toThrow();
  });
});
```

- [ ] **Step 2: Run the focused test and confirm RED**

Run: `bun run test -- --run tests/ui-release-promotion.test.ts`

Expected: FAIL because the validation module does not exist.

- [ ] **Step 3: Implement payload validation**

Export `validateReleasePayload(version, sourceSha)` using the same semantic-version pattern as Task 1 and `/^[0-9a-f]{40}$/`. Its CLI form writes normalized JSON to stdout and exits nonzero on invalid input.

- [ ] **Step 4: Create the promotion workflow**

Use:

```yaml
name: promote released UI package

on:
  repository_dispatch:
    types: [ui-package-released]
  workflow_dispatch:
    inputs:
      version:
        description: Exact published @akira-io/ui version
        required: true
      source_sha:
        description: Package release commit SHA
        required: true
      dry_run:
        description: Validate promotion without pushing production refs
        type: boolean
        required: true
        default: true
      main_ref:
        description: Disposable main-equivalent ref used only for a dry run
        required: true
        default: automation-dry-run-main
      next_ref:
        description: Disposable next-equivalent ref used only for a dry run
        required: true
        default: automation-dry-run-next

permissions:
  contents: write

concurrency:
  group: ui-site-promotion
  cancel-in-progress: false
```

The single promotion job must:

1. derive `DRY_RUN`, `MAIN_REF`, and `NEXT_REF`: repository dispatch always means `false`, `main`, and `next`; manual dispatch requires `dry_run=true` and disposable refs whose names start with `automation-dry-run-`;
2. reject a manual dispatch with `dry_run=false` or refs outside the disposable prefix;
3. check out `NEXT_REF` with `fetch-depth: 0` and `token: ${{ secrets.PAYABLE_DOCS_TOKEN }}`;
4. validate the payload with `node scripts/validate-ui-release.mjs`;
5. verify `npm view "@akira-io/ui@$VERSION" version` equals the exact version;
6. configure the existing bot identity;
7. fetch `origin "$MAIN_REF" "$NEXT_REF"` and run `git merge --no-edit "origin/$MAIN_REF"`;
8. run `bun add --exact "@akira-io/ui@$VERSION"`;
9. remove `node_modules`, then run `bun install --frozen-lockfile`;
10. run format, Astro check, tests, and build;
11. commit `package.json bun.lock` when changed using `chore(site): use @akira-io/ui@$VERSION`;
12. when `DRY_RUN=true`, print the candidate SHA and stop without pushing any ref;
13. otherwise push `HEAD:next`, verify `git merge-base --is-ancestor origin/main HEAD`, and push the exact same `HEAD:main` as a fast-forward.

No step may use `--force`, conflict auto-resolution, or `continue-on-error`.

- [ ] **Step 5: Add workflow contract assertions**

Extend `tests/ui-release-promotion.test.ts` to assert that the workflow contains:

- `types: [ui-package-released]`;
- `concurrency` with `cancel-in-progress: false`;
- exact-version installation with `--exact`;
- frozen reinstall after deleting `node_modules`;
- all four gates before `HEAD:main`;
- manual dispatch rejection unless `dry_run=true` and both target refs start with `automation-dry-run-`;
- no occurrence of `--force` or `continue-on-error`.

- [ ] **Step 6: Run focused and full site gates**

Run: `bun run test -- --run tests/ui-release-promotion.test.ts && bunx astro check && bun run test && bun run build`

Expected: all site gates pass.

- [ ] **Step 7: Commit Task 3 in the site repository**

```bash
git add scripts/validate-ui-release.mjs tests/ui-release-promotion.test.ts .github/workflows/promote-ui-release.yml
git commit -m "ci(site): promote released UI versions"
```

---

### Task 4: Restrict Vercel to released site `main`

**Files:**
- Create: `scripts/vercel-ignore-build.mjs`
- Create: `tests/vercel-ignore-build.test.ts`
- Modify: `vercel.json`

**Interfaces:**
- Consumes: `VERCEL_ENV` and `VERCEL_GIT_COMMIT_REF`.
- Produces: exit code `1` to build only production `main`; exit code `0` to skip all other deployments.

- [ ] **Step 1: Write failing decision tests**

```ts
import { describe, expect, it } from 'vitest';
import { shouldBuild } from '../scripts/vercel-ignore-build.mjs';

describe('shouldBuild', () => {
  it('builds production main', () => {
    expect(shouldBuild({ VERCEL_ENV: 'production', VERCEL_GIT_COMMIT_REF: 'main' })).toBe(true);
  });

  it.each([
    ['preview', 'next'],
    ['preview', 'akira/issue-4'],
    ['production', 'next'],
  ])('skips %s deployment for %s', (environment, ref) => {
    expect(shouldBuild({ VERCEL_ENV: environment, VERCEL_GIT_COMMIT_REF: ref })).toBe(false);
  });
});
```

- [ ] **Step 2: Run the focused test and confirm RED**

Run: `bun run test -- --run tests/vercel-ignore-build.test.ts`

Expected: FAIL because the ignore script does not exist.

- [ ] **Step 3: Implement the ignore command**

```js
export function shouldBuild(environment) {
  return environment.VERCEL_ENV === 'production' && environment.VERCEL_GIT_COMMIT_REF === 'main';
}

if (import.meta.url === `file://${process.argv[1]}`) {
  process.exit(shouldBuild(process.env) ? 1 : 0);
}
```

Vercel defines exit code `0` as “ignore this build” and exit code `1` as “continue the build”.

- [ ] **Step 4: Version the Vercel rule in the repository**

Add to `vercel.json`:

```json
"ignoreCommand": "node scripts/vercel-ignore-build.mjs"
```

Confirm Vercel project settings expose System Environment Variables so `VERCEL_ENV` and `VERCEL_GIT_COMMIT_REF` are available to the command.

- [ ] **Step 5: Run focused and full site verification**

Run:

```bash
bun run test -- --run tests/vercel-ignore-build.test.ts
VERCEL_ENV=preview VERCEL_GIT_COMMIT_REF=next node scripts/vercel-ignore-build.mjs
test "$?" -eq 0
VERCEL_ENV=production VERCEL_GIT_COMMIT_REF=main node scripts/vercel-ignore-build.mjs; test "$?" -eq 1
bunx astro check
bun run test
bun run build
```

Expected: decision tests pass, `next` exits `0`, production `main` exits `1`, and site gates pass.

- [ ] **Step 6: Commit Task 4 in the site repository**

```bash
git add scripts/vercel-ignore-build.mjs tests/vercel-ignore-build.test.ts vercel.json
git commit -m "ci(vercel): deploy released site main only"
```

---

### Task 5: Migrate approved examples to `next` and dry-run promotion

**Files:**
- No new production files; this task performs branch migration, remote PR state changes, and workflow validation.
- Verify: package `.github/workflows/release.yml`; site `.github/workflows/ci.yml`, `.github/workflows/promote-ui-release.yml`, `vercel.json`.

**Interfaces:**
- Consumes: approved site commit `07b3b4e`, current site `origin/main`, and Tasks 1–4.
- Produces: remote site `next` containing the approved examples and automation; closed site PR #1; disposable dry-run branches proving atomic promotion.

- [ ] **Step 1: Fetch both remotes and verify bases**

Run in each worktree: `git fetch origin --prune && git status -sb`.

Expected: no local changes; package automation branch descends from latest package `origin/main`; site migration starts from latest site `origin/main`.

- [ ] **Step 2: Create site `next` from released site main**

Create `next` from current `origin/main`, then cherry-pick the approved site example commits in order:

```bash
git switch -c next origin/main
git cherry-pick f930baa 17bd63e b7550fc 4d41ffd e8f1b86 07b3b4e
```

If any SHA was already integrated or no longer resolves after remote updates, stop and recompute the exact unique commit range with `git cherry origin/main origin/akira/issue-3-preview`; do not skip or resolve blindly.

- [ ] **Step 3: Add Tasks 2–4 site commits to `next` and run all site gates**

Run: `bunx prettier --check "src/**/*.{ts,tsx,astro}" "tests/**/*.ts" && bunx astro check && bun run test && bun run build`.

Expected: all gates pass with the local package overlay; committed registry dependency remains the last released version.

- [ ] **Step 4: Push `next` and close the premature site PR**

Push `next` normally. Close `kidiatoliny/ui#1` with a comment explaining that its approved content moved to `next` and will be promoted automatically after a package release. Preserve the old issue branch until `next` is verified remotely.

- [ ] **Step 5: Publish the package automation PR only after rebasing**

Fetch package `origin/main`, rebase `akira/site-release-promotion`, rerun package gates, push, and open a ready PR. Do not tag or publish a release as part of this implementation.

- [ ] **Step 6: Dry-run the site promotion without touching `main`**

Create disposable remote branches `automation-dry-run-main` and `automation-dry-run-next` from the current site refs. Invoke a workflow-dispatch variant that accepts explicit target refs only when `dry_run=true`; it must perform merge, exact package verification, clean install, and all gates, but finish before either production ref push.

Expected: the dry run reports the would-be promoted commit and leaves real `main` and `next` unchanged.

- [ ] **Step 7: Verify remote CI and Vercel behavior**

- Site `next` CI is green using the package-main tarball.
- Vercel records the `next` build as skipped by `ignoreCommand`.
- Package automation PR checks are green.
- No new public site deployment exists.

- [ ] **Step 8: Final review and commit bookkeeping**

Run `git diff --check`, confirm both worktrees are clean, and review the complete diffs against their latest `origin/main`/`origin/next`. Record the dry-run URLs and outcomes in the package PR body.
