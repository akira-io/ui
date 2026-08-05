# Release-gated UI site promotion

## Status

Approved design for automating how unreleased Akira UI component examples move from the package development cycle into the public site.

## Problem

The site currently declares the last public `@akira-io/ui` version in `package.json`, but local development replaced the installed package with a build from the package worktree. That made local checks pass while GitHub Actions and Vercel installed the public registry version and failed on unreleased APIs.

The site must remain the first real consumer of each component, but it must not publish examples for APIs that do not yet exist in an official package release.

## Branch contract

- `main` in `kidiatoliny/ui` represents the latest released, deployable site.
- `next` in `kidiatoliny/ui` accumulates examples and documentation for package work that has been approved locally but not released.
- Only `main` may produce a Vercel deployment.
- After a successful promotion, `main` and `next` point to the same validated commit.
- Component work remains sequential: before each new issue, the package branch starts from the latest `origin/main`, and the site work starts from the latest `origin/next`.

## Development flow

For each component issue:

1. Create the package branch from the latest package `origin/main`.
2. Create or update the site worktree from the latest site `origin/next`.
3. Build the package locally and install its tarball temporarily into the site without changing the committed package version or lockfile.
4. Implement and validate the examples through the public package API.
5. Obtain joint approval in the real local site.
6. Merge the package PR when its remote checks are green.
7. Commit the approved site examples to `next`; do not publish them to `main` and do not deploy them through Vercel.

The temporary local package overlay is created through one documented script shared by local development and CI. Direct manual replacement of `node_modules/@akira-io/ui` is forbidden.

## CI behavior

### `main`

CI runs a frozen clean install from the committed lockfile, then format, Astro type checks, tests, and build. It consumes only the released package version declared by the site.

### `next`

CI checks out `akira-io/ui` at package `main`, installs and builds it, creates the same package tarball a registry consumer receives, and temporarily installs that tarball in the site. It then runs format, Astro type checks, tests, and build.

The package checkout must actively feed the site installation. A checkout used only by coverage or parity tests is insufficient.

## Release and promotion flow

Akira UI follows the existing Node SISP and Payable release convention:

- prerelease tags publish with their prerelease dist-tag, such as `beta`;
- stable tags publish with `latest`;
- a prerelease never moves an existing stable `latest` tag.

The package release workflow gains a promotion job that depends on successful npm publication. It verifies the exact version in the registry, then dispatches a `ui-package-released` event to `kidiatoliny/ui` containing the exact version and source commit.

The site promotion workflow:

1. validates the dispatch payload;
2. confirms the exact package version exists in the registry;
3. checks out `next` with full history and fetches `main`;
4. merges current `main` into `next` without silently resolving conflicts;
5. updates `@akira-io/ui` to the exact released version and regenerates `bun.lock`;
6. performs a frozen clean install;
7. runs format, Astro check, tests, and build;
8. commits the version and lockfile update on `next` when needed;
9. pushes `next` and fast-forwards `main` to the same validated commit.

Any conflict, missing registry version, failed check, failed test, or failed build stops the workflow before `main` changes.

## Vercel behavior

Vercel deploys only the site `main` branch. `next` and issue branches are ignored. The public deployment therefore starts only after registry publication and successful site promotion.

After Vercel reports success, the released component routes are opened and validated against the deployed URL. Deployment success is a completion gate, not an informational check.

## Current-state migration

- Close site PR `kidiatoliny/ui#1` because it was opened before a consumable release existed.
- Preserve its approved example and documentation commits on site branch `next`.
- Remove the failed preview deployment from the completion path; it is evidence of the old invalid flow.
- Do not publish a stable package release merely to repair the preview.
- The next intentional package release promotes all accumulated, approved `next` content automatically.

## Testing and safeguards

- Test dist-tag selection for stable and prerelease versions.
- Test dispatch payload validation and rejection of missing registry versions.
- Test that package checkout/build output is the artifact consumed by `next` CI.
- Test that promotion does not update `main` when merge or validation fails.
- Test that the site dependency is pinned to the exact dispatched version.
- Run the complete package and site gates before enabling the workflows.
- Perform one dry-run promotion against disposable branches before allowing the workflow to update site `main`.

## Success criteria

- Local, GitHub Actions, and the promoted site use the same package artifact contract.
- Unreleased component examples are preserved safely on `next` but never deployed publicly.
- A successful package release automatically updates, validates, and publishes the site.
- A failed package publication or site validation leaves the public site unchanged.
