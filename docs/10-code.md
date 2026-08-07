# Code

The code family displays source and payloads. It ships from its own subpath and nothing in it is
re-exported from the package root:

```tsx
import { Code, CodeBlock, JsonViewer } from '@akira-io/ui/code';
```

The subpath exists so the dynamic Shiki import never reaches the bundle of an app that does not display
code.

## Code

An inline `<code>` for a symbol, a path or a command inside a sentence. It carries the compact radius and
the control fill, and depends on no highlighter.

```tsx
Run <Code>bun add @akira-io/ui</Code> to install it.
```

## CodeBlock

A block of source, optionally highlighted, with a copy control, a gutter, tinted lines and a height cap.

```tsx
<CodeBlock
    code={source}
    language="ts"
    filename="totals.ts"
    lineNumbers
    highlightLines="1,4-6"
    maxHeight={320}
/>
```

| Prop | Type | Default | What it does |
| --- | --- | --- | --- |
| `code` | `string` | required | The source. This is what the copy control puts on the clipboard. |
| `language` | `string` | none | The language passed to the highlighter, and the label in the header. Without it no highlighter is loaded. |
| `html` | `string` | none | Markup highlighted upstream. When present, no highlighter is imported at all. |
| `filename` | `string` | none | Renders the header, with a file icon, the language label and the copy control. |
| `lineNumbers` | `boolean` | `false` | Renders a non-selectable gutter. |
| `highlightLines` | `string \| number[]` | none | `'1,4-6'` or `[1, 4, 5, 6]`. Tints the matching rows across the full width. |
| `maxHeight` | `number \| string` | none | Clips the body behind a fade with an expand control. The control is absent when the content fits. |
| `copyLabel` | `string` | `'Copy'` | |
| `copiedLabel` | `string` | `'Copied'` | |
| `expandLabel` | `string` | `'Expand'` | |
| `collapseLabel` | `string` | `'Collapse'` | |

### Highlighting is optional

`shiki` is an optional peer dependency. Install it only if you want client-side highlighting:

```bash
bun add shiki
```

Three paths, in the order the component takes them:

1. **`html` is passed.** The component renders it and imports nothing. Highlight upstream when the source is
   known at build time or on the server; it is the cheapest path.
2. **`language` is passed and Shiki is installed.** `import('shiki')` runs on first render, the plain source
   shows until it resolves, and the highlighted markup replaces it row by row, so nothing moves.
3. **Shiki is not installed, or highlighting fails.** The component renders the plain source. It never
   throws, and no error reaches the console.

Highlighting uses Shiki's dual-theme output (`github-light` and `github-dark` with `defaultColor: false`),
so a theme change repaints through the `--shiki-light` and `--shiki-dark` custom properties that `theme.css`
maps, with no remount and no second render.

One caveat worth knowing: the dynamic import names `shiki` statically, so a bundler code-splits it into its
own chunk rather than the main bundle. A bundler configured to fail on an unresolved import will still fail
at build time if the package is absent, because it resolves the specifier before the runtime fallback can
apply. Pass `html`, or install `shiki`, in that setup.

## JsonViewer

A collapsible view of an already parsed value. It takes the value, not a string.

```tsx
<JsonViewer value={payload} initialDepth={2} maxHeight={480} />
```

| Prop | Type | Default | What it does |
| --- | --- | --- | --- |
| `value` | `unknown` | required | The parsed payload. Objects, arrays, strings, numbers, booleans and null. |
| `initialDepth` | `number` | `1` | How many levels open on first render. Everything below opens on demand. |
| `maxHeight` | `number \| string` | none | Caps the body height and scrolls inside it. |
| `copyLabel` | `string` | `'Copy'` | |
| `copiedLabel` | `string` | `'Copied'` | |
| `expandLabel` | `string` | `'Expand'` | Accessible name of a collapsed toggle. |
| `collapseLabel` | `string` | `'Collapse'` | Accessible name of an open toggle. |
| `circularLabel` | `string` | `'Circular reference'` | Marker rendered in place of a value that points back at one of its own ancestors. |
| `entriesLabel` | `(count: number) => string` | `'3 entries'` | The count shown on a collapsed object or array. |

The defaults are exported as `jsonViewerLabels`, so a translation can be built from the same shape.

Keys, strings, numbers, booleans and null each read from a different semantic token, never a fixed colour,
so the palette follows the theme and any brand preset. A node holds its own open state and renders its
children only while open: expanding one branch of a large payload does not re-render the rest of it.

A circular reference renders the marker instead of throwing, and the copy control still yields valid JSON,
with `"[Circular]"` in the place the cycle would have been.

## What the consumer owns

Both blocks own an elevated surface, like every other container in the package, and stand down to a flat
panel inside a card, a dialog or a sheet. Position and width stay yours: pass `className` for layout.

---

[← Contributing](09-contributing.md)
