# Agent rules for @akira-io/ui

Read these before changing a component. The full reference is [docs/12-hig-style-guide.md](docs/12-hig-style-guide.md).

- Follow the Apple Human Interface Guidelines and the SwiftUI conventions. Read the HIG page for what you are
  building first; the content is at
  `https://developer.apple.com/tutorials/data/design/human-interface-guidelines/<page>.json`.
- Space and size with the HIG tokens only: `gap-tight`, `gap-item`, `gap-group`, `p-inset`, `min-h-target`,
  `size-icon-sm`, `size-icon`, `size-icon-lg`. `tests/hig-scale.test.ts` rejects numeric padding, margin and
  gap classes and svg icon sizes written by hand.
- Align content to the leading edge, keep equal margins inside containers, and use more space between groups
  than inside a group.
- Glass for what floats or navigates (`glass-bar`, `glass-panel`, `glass-sidebar`); solid surfaces for content.
- The library serves any React app: links go through `asChild`, never a specific router.
- Measure padding and alignment in the browser, in light and dark mode, with a pointer and with touch emulated,
  before calling a change done.
- Respect reduced motion and reduced transparency.
- No narrative comments; names explain the code.
