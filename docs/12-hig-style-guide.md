# HIG Style Guide

`@akira-io/ui` follows the Apple Human Interface Guidelines and the interface conventions of SwiftUI. The rules
live in the components and the tokens, so an app gets them by default instead of restating them with classes.
This page is the reference for anyone adding or changing a component, people and coding agents alike.

Today the tokens, the scale test, the card and every component icon follow this guide. The other components move
to it in steps (navigation, containers, forms and data), and the pending list in `tests/hig-scale.test.ts` shows
which files still have to. Rules marked *target* describe where those steps take the library; treat every rule here as the standard
for new and changed code.

## 1. Sources

Read the guideline before choosing a layout, a spacing or an icon, and quote the rule you follow. The HIG pages
render with JavaScript; the same content is published as JSON, which also works without a browser:

```bash
curl -sL https://developer.apple.com/tutorials/data/design/human-interface-guidelines/layout.json
```

The pages this library leans on: `layout`, `typography`, `sf-symbols`, `sidebars`, `toolbars`, `buttons`,
`lists-and-tables` and `materials`. The text of each page sits under `primaryContentSections`.

## 2. Platforms

The library follows macOS where there is a pointer and iOS on touch screens, the way iPadOS and Mac Catalyst
adapt. The switch is `@media (pointer: coarse)`: on touch, groups breathe more, containers keep a slimmer margin
and every control reaches the 44 pt hit target the HIG asks for.

| | Pointer (macOS) | Touch (iOS) |
| --- | --- | --- |
| Body text | 13 to 14 px (`text-sm`) | 16 to 17 px (`text-base`) |
| Minimum control size (*target*: controls adopt `min-h-target` in the icons and forms steps) | 28 px | 44 px |
| Container margin | 20 px | 16 px |
| Space between groups | 20 px | 24 px |

## 3. Tokens

Spacing and sizes come from role-named tokens in `hig.css`. Use the role, never a number.

| Token | Classes | Role | Pointer | Touch |
| --- | --- | --- | --- | --- |
| `--space-tight` | `gap-tight`, `p-tight` | A title and its subtitle, a label and its value | 4px | 4px |
| `--space-item` | `gap-item`, `p-item` | Items inside one group | 8px | 8px |
| `--space-group` | `gap-group`, `mt-group` | One group or section and the next | 20px | 24px |
| `--space-inset` | `p-inset`, `px-inset`, `py-inset` | The margin inside a container | 20px | 16px |
| `--target-min` | `min-h-target`, `min-w-target` | The smallest size of a control | 28px | 44px |
| `--icon-sm` | `size-icon-sm` | A small icon | 1em | 1em |
| `--icon` | `size-icon` | An icon beside text | 1.25em | 1.25em |
| `--icon-lg` | `size-icon-lg` | An emphasised icon | 1.5em | 1.5em |
| `--icon-stroke` | `stroke-icon` | The stroke of an outline icon | 1.75 | 1.75 |

```tsx
<section className="p-inset flex flex-col gap-group">
  <header className="flex flex-col gap-tight">
    <h2 className="text-xl font-semibold">Billing</h2>
    <p className="text-sm text-muted-foreground">Your plan and invoices.</p>
  </header>
  <div className="flex flex-col gap-item">…</div>
</section>
```

A theme or a component can redefine any of these variables, and everything below it follows. `0`, `px` and `0.5`
stay available for optical adjustments, and negative values for optical offsets. `tests/hig-scale.test.ts` fails
on any other numeric padding, margin, gap or space class, and in every file on an icon size written by hand,
whether through an svg selector such as `[&_svg]:size-4`, on a Lucide icon itself, or on an icon passed in as a
component (`<Icon>`, `<item.icon>`), with `size-*` or with `h-*` and `w-*`. `size-2` and `size-2.5` stay
for decorative dots, and `size-6` and up for illustrations. Files that predate the spacing scale sit on its pending
list until they migrate, and a limit on the list keeps it from growing.

## 4. Layout

- **Reading order.** People read from top to bottom and from the leading to the trailing side. Put the most
  important content near the top and the leading edge.
- **Leading alignment.** Align content to the leading edge so it is easy to scan. Centre only what has a reason
  to be centred, such as an empty state.
- **Indentation shows hierarchy.** An indented item reads as subordinate to the one above it.
- **Group with space.** Use more space between groups than inside a group (`gap-group` against `gap-item`), or a
  container or a separator when space alone is not enough.
- **Equal margins.** A container keeps the same margin on all four sides (`p-inset`). Never add padding inside
  a component that already brings its own.

## 5. Typography

The HIG text styles map to these classes (*target*: existing components move to them in the containers step).
Pointer sizes follow macOS, touch sizes follow iOS.

| HIG style | Classes |
| --- | --- |
| Large Title | `text-3xl font-semibold` |
| Title 1 | `text-2xl font-semibold` |
| Title 2 and 3 | `text-xl font-semibold` |
| Headline | `text-base font-semibold` |
| Body | `text-sm` with a pointer, `text-base` on touch |
| Callout and Subheadline | `text-sm` |
| Footnote and Caption | `text-xs` |

Use `tabular-nums` wherever numbers line up or change in place.

## 6. Icons

The icons follow the rules of SF Symbols, drawn with Lucide.

- **Scale with the text.** `size-icon-sm`, `size-icon` and `size-icon-lg` are relative to the font size, like
  the three symbol scales relative to the cap height. An icon beside text uses `size-icon`.
- **Weight with the text.** The stroke follows the weight of the adjacent text: 1.75 for regular, 2 for medium,
  2.25 for semibold. Every svg inside a component draws with `--icon-stroke`; `icon-weight-medium` and
  `icon-weight-semibold` set it on a container whose text is heavier. Buttons and badges use semibold, sidebar
  items, toggles and tab triggers medium, and the active tab or sidebar row semibold like its label.
  `tests/icon-weight-states.test.ts` holds every class string that sets icon weights to this rule. To change the
  stroke of one icon, give it a `stroke-*` class or a weight utility; the `strokeWidth` prop of a Lucide icon is a
  presentation attribute, and the stroke rule overrides it inside a component.
- **Outline beside text.** Toolbars, lists and menus use outline icons; filled variants mark a selected state.
- **Accent in the sidebar.** The leading symbol of a sidebar row uses the accent color, which follows the theme;
  disclosure chevrons keep the color of the row.
- **Animate with purpose.** When an icon animates, it uses one of the symbol effects the HIG describes: bounce
  for an action that happened, scale for a selection, pulse or breathe for ongoing activity, replace for a
  change of state, wiggle for a call to attention, rotate for progress, draw on and draw off for a path. Keep
  animations rare, and play none under reduced motion beyond a fade.

## 7. Navigation

- **Sidebar** (*target*, navigation step). Two levels of hierarchy at most. Deeper data goes into a list between the sidebar and the
  detail, not into a third level. Group labels are short.
- **Top bar.** With `sticky`, the default, the header has no strip of its own: its controls float on glass capsules and the content scrolls
  under them.
- **Tab bar and toolbars.** Floating glass, with the selection sliding between items.

## 8. Materials

Glass is for what floats or navigates over content; content is solid. `glass-bar` for bars and capsules,
`glass-panel` for dialogs, sheets, popovers and menus, `glass-sidebar` for the floating sidebar. Cards, tables
and the controls inside them carry no blur. All three glass layers turn opaque under reduced transparency.

## 9. Checklist for a new component

1. Read the HIG page for the component and note the rule it follows.
2. Space and size it with the tokens only; `tests/hig-scale.test.ts` must pass without adding it to the
   pending list.
3. Align content to the leading edge and keep equal margins inside containers.
4. Size icons with `size-icon*`, outline beside text.
5. Measure the padding and the alignment in the browser, in light and dark mode, with a pointer and with touch
   emulated.
6. Respect reduced motion and reduced transparency.

---

[← Contributing](11-contributing.md)
