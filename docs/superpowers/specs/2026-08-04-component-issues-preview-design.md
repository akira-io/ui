# Component issues and consumer preview design

## Objective

Resolve all sixteen open issues in `akira-io/ui`, including the Inertia hooks in issues #11 and #12, while treating the preview site as the first real consumer of every public API. An issue is complete only after the package implementation and the consuming site have both passed automated and joint visual validation.

## Repositories and responsibilities

### Package: `akira-ui`

`/Users/kid/akira-io/akira-ui` is the source of `@akira-io/ui`. It owns component and hook implementations, public entry points, TypeScript declarations, theme integration, accessibility behaviour, package tests, build configuration, and the documentation shipped with the package.

The acceptance criteria in each GitHub issue define the required public contract. Implementations must follow the package's established conventions, including theme tokens, composable APIs, `data-slot` attributes, optional peer dependency boundaries, locale support, and subpath exports.

### Consumer: `ui`

`/Users/kid/akira-io/ui` is the documentation and preview site. It consumes the package only through public `@akira-io/ui` exports. It must not import package source files or otherwise bypass the distribution boundary.

For each issue, the site owns the relevant documentation page, realistic component demos, preview routes, and any replacement of equivalent site-local components required by the issue. The preview is the evidence that the package API works as a customer would use it.

## Execution model

Work proceeds as a strict vertical slice, one GitHub issue at a time. No implementation for the next issue begins before the current issue completes its package, consumer, automated verification, and joint preview gate.

The agreed order is:

1. #3 — Spinner and Button loading state
2. #4 — CopyButton
3. #5 — EmptyState and DataTable adoption
4. #7 — AppearanceToggle
5. #9 — Field family
6. #8 — PasswordInput
7. #6 — DatePicker
8. #1 — Code and CodeBlock
9. #14 — JsonViewer
10. #2 — composable rich text editor
11. #10 — FormDialog
12. #11 — Inertia table filters and `decodeDateFilter`
13. #12 — SaveStatus and Inertia autosave
14. #13 — EditModeActions and `useEditMode`
15. #15 — AuthShell
16. #16 — DangerZone

This sequence brings shared primitives forward and respects the explicit issue dependencies: #4 before #1; #1 and #4 before #14; #3 before #12, #13, and #16; #7 before #15; and #9 before the form-oriented blocks that demonstrate it.

## Per-issue delivery contract

Every issue follows the same gate:

1. Convert the GitHub acceptance criteria into focused automated tests and confirm the new tests fail for the expected reason.
2. Implement the smallest public API that satisfies the criteria while following existing package patterns.
3. Verify package tests, type checking, formatting, and build output, including the intended export boundary.
4. Update the package documentation associated with the new API.
5. Synchronize the locally built package into the preview site through the site's supported sync workflow.
6. Add or update site documentation and realistic demos for required states, variants, and compositions.
7. Verify site tests, type checking, formatting, and production build.
8. Run the site preview and inspect the component's route for interaction, layout, responsive behaviour, light theme, dark theme, keyboard access, and the issue-specific acceptance criteria.
9. Provide the preview route to the user. The issue remains active until both Codex and the user approve the preview.
10. Record the approved issue in its own traceable commit before starting the next issue.

Corrections discovered at any stage stay within the current issue and repeat the relevant verification steps. They do not open work on a later issue.

## Preview requirements

The preview site acts as a real application rather than a showcase coupled to internals. Demos use only public package entry points and should present realistic content and interaction instead of isolated decorative snapshots.

Each visual component receives at least a default demo and a gallery or showcase treatment consistent with the site's current component structure. Additional demos are added when an issue explicitly requires multiple presentations or states.

For issue #11 and the Inertia hook portion of issue #12, the site provides an interactive consumer-facing demonstration of the hook's returned contract or state transitions. Automated tests remain the authority for router cancellation, debounce timing, mount guards, and out-of-order completion behaviour that cannot be proven by visual inspection alone.

The preview gate covers:

- the documented route loads from the synchronized package build;
- all required states and variants are reachable;
- interactive controls behave correctly with pointer and keyboard input;
- layouts remain usable at narrow and wide widths;
- light and dark themes use package tokens correctly;
- accessible names, live regions, focus behaviour, and disabled states match the issue;
- no browser console or runtime errors occur during the demonstrated flows.

## Public API and dependency boundaries

Root exports, `blocks`, `shells`, `inertia`, `code`, and `editor` subpaths follow the scope stated in each issue. Code and editor APIs remain outside the root entry point. Optional heavy dependencies such as Shiki and Tiptap must not leak into consumers that do not import their subpaths.

Where an issue requires fallback behaviour for an absent optional dependency, tests cover both the installed and absent cases. Build inspection confirms that optional subpath dependencies do not enter unrelated bundles.

Shared infrastructure is introduced by the first approved issue that needs it. Later issues may consume approved primitives, but the project will not pre-build incomplete components merely to reduce future edits.

## Testing and failure handling

The current test suites remain regression protection. Every issue adds tests derived from its own acceptance criteria without weakening existing coverage or adding new exceptions to the preview site's demo coverage baseline.

An issue cannot reach the user preview gate while any relevant test, typecheck, formatting check, build, export check, or local visual inspection is failing. A preview finding returns the issue to implementation and triggers the full affected verification cycle again.

Optional-dependency loading failures must degrade only as specified by the issue and must not crash unrelated entry points. Timers, asynchronous work, media-query listeners, and in-flight visits must be cleaned up on unmount where required. User-facing failures must be represented accurately rather than producing false success states.

## Completion criteria

The overall project is complete when all sixteen issues have individually passed their package and consumer checks, joint preview approval, and traceable commit; both repositories pass their complete verification suites; all new public exports appear in the built declarations and expected entry points; and the preview site contains no undocumented or uncovered new package entries.
