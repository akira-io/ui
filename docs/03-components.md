# Components

Every component is a named export from the package root:

```tsx
import { Button, Card, CardHeader, CardTitle, DataTable, cn } from '@akira-io/ui';
```

`cn` (the `clsx` + `tailwind-merge` helper) is exported too. All 56 entries below share the same import
path; there is no per-component subpath.

## Preview site

The "Preview" column links to hosted component demos as they are published. Entries without a demo yet read
**Pending**.

## Catalog

The full shadcn/ui (New York) set, plus a few additions kept alongside it.

### Primitives & layout (31)

| Component | Preview |
| --- | --- |
| `accordion` | Pending |
| `alert` | Pending |
| `alert-dialog` | Pending |
| `aspect-ratio` | Pending |
| `avatar` | Pending |
| `badge` | Pending |
| `breadcrumb` | Pending |
| `button` | https://ui.akira-io.com/components/button/ |
| `card` | Pending |
| `carousel` | Pending |
| `collapsible` | Pending |
| `context-menu` | Pending |
| `dialog` | Pending |
| `drawer` | Pending |
| `dropdown-menu` | Pending |
| `hover-card` | Pending |
| `icon` | Pending |
| `menubar` | Pending |
| `navigation-menu` | Pending |
| `pagination` | Pending |
| `placeholder-pattern` | Pending |
| `popover` | Pending |
| `progress` | Pending |
| `resizable` | Pending |
| `scroll-area` | Pending |
| `separator` | Pending |
| `sheet` | Pending |
| `sidebar` | Pending |
| `skeleton` | Pending |
| `tabs` | Pending |
| `tooltip` | Pending |

### Forms (16)

| Component | Preview |
| --- | --- |
| `calendar` | Pending |
| `checkbox` | Pending |
| `combobox` | Pending |
| `date-range-filter` | Pending |
| `field-error` | Pending |
| `form` | Pending |
| `input` | Pending |
| `input-otp` | Pending |
| `label` | Pending |
| `radio-group` | Pending |
| `select` | Pending |
| `slider` | Pending |
| `switch` | Pending |
| `textarea` | Pending |
| `toggle` | Pending |
| `toggle-group` | Pending |

### Data (5)

| Component | Preview |
| --- | --- |
| `chart` | Pending |
| `data-table` | Pending |
| `data-table-faceted-filter` | Pending |
| `data-table-row-actions` | Pending |
| `table` | Pending |

### Feedback & misc (4)

| Component | Preview |
| --- | --- |
| `command` | Pending |
| `confirm-dialog` | Pending |
| `sonner` (toasts) | Pending |
| `spinner` | https://ui.akira-io.com/components/spinner/ |

## Notable customizations

- **`button`**: pill radius (`rounded-2xl`), a lifted shadow, and a hover/active scale on the `default`
  variant. Variants: `default`, `destructive`, `outline`, `secondary`, `ghost`, `link`. Sizes: `default`,
  `sm`, `lg`, `icon`, `icon-sm`, `icon-lg`. Every variant reads its color from a token: `default` and `link`
  from `--primary`, `destructive` from `--destructive`. The same is true across the catalog: `checkbox`,
  `switch`, `input`, `select`, `textarea`, `dropdown-menu`, `sidebar`, `confirm-dialog` and
  `data-table-row-actions` all follow `--primary` for their brand-colored surfaces, hover tints and focus
  rings, so setting `data-brand` recolors them along with everything else. The pale hover/focus tint used by
  `dropdown-menu` and `sidebar` is `bg-primary/10` with `text-primary` rather than a dedicated ramp step, since
  the token system does not expose one; it still carries the brand hue at any preset. Danger and negative
  states (the `destructive` button variant, `confirm-dialog`'s destructive variant, the row action marked
  `variant: 'destructive'`, `localized-fields` validation errors, and `stat-card`'s negative trend) read
  `--destructive` instead, so they stay red under every brand preset rather than following it. `loading`
  disables the native button, sets `aria-busy`, keeps the original content mounted to preserve width, and
  overlays a Spinner sized to the current Button size. `loadingLabel` overrides the Spinner's accessible
  "Loading" label.
- **`spinner`**: sizes are `sm`, `default`, and `lg`; it inherits current text colour, exposes a polite
  status label, and stops rotating when reduced motion is requested.
- **`data-table`**: built on TanStack Table, with `data-table-faceted-filter` and `data-table-row-actions`
  alongside it.
- **`confirm-dialog`**, **`combobox`**, **`field-error`**: additions to the stock shadcn/ui set, kept because
  enough consuming apps needed them.

## Form component

`<Form>` integrates with `react-hook-form`. Install `react-hook-form` in the app (it is an optional peer)
when you use it:

```tsx
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@akira-io/ui';
```

## What is not included

`country-select` was dropped: it depended on an app-specific `useCountries` hook and is not a generic
primitive. Keep that one local to the app that needs it.

---

[← Theme & Tokens](02-theme-and-tokens.md) · Next: [Shells →](04-shells.md)
