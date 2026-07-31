# Components

Every component is a named export from the package root:

```tsx
import { Button, Card, CardHeader, CardTitle, DataTable, cn } from '@akira-io/ui';
```

`cn` (the `clsx` + `tailwind-merge` helper) is exported too. All 55 entries below share the same import
path; there is no per-component subpath.

## Preview site

A hosted preview site with a live demo per component is planned but does not exist yet. The "Preview" column
below is a placeholder: every entry reads **Pending** until that site ships and each component gets its own
page there.

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
| `button` | Pending |
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

### Feedback & misc (3)

| Component | Preview |
| --- | --- |
| `command` | Pending |
| `confirm-dialog` | Pending |
| `sonner` (toasts) | Pending |

## Notable customizations

- **`button`**: pill radius (`rounded-2xl`), a lifted shadow, and a hover/active scale on the `default`
  variant. Variants: `default`, `destructive`, `outline`, `secondary`, `ghost`, `link`. Sizes: `default`,
  `sm`, `lg`, `icon`, `icon-sm`, `icon-lg`. The `link` variant reads its color from `--primary`, so it follows
  a brand preset. The `default` variant currently ships with a fixed red accent (`bg-red-600` in light mode,
  `dark:bg-red-500` in dark mode) rather than the `--primary` token, so it does not change color when you set
  `data-brand`; the same is true of a handful of other components' accent or focus states (`checkbox`,
  `switch`, `input`, `select`, `textarea`, `dropdown-menu`, `sidebar`, `confirm-dialog`,
  `data-table-row-actions`). Most of the catalog reads `--primary` directly; these are the exceptions to
  check if a brand preset does not look right everywhere you expect.
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
