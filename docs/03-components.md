# Components

Every component is a named export from the package root and is already styled with the NosFerry theme.

```tsx
import { Button, Card, CardHeader, CardTitle, DataTable, cn } from '@akira-io/nosferry-ui';
```

`cn` (the `clsx` + `tailwind-merge` helper) is exported too.

## Catalog

The full shadcn/ui (New York) set plus NosFerry additions:

**Primitives & layout**: `accordion`, `alert`, `alert-dialog`, `aspect-ratio`, `avatar`, `badge`,
`breadcrumb`, `button`, `card`, `carousel`, `collapsible`, `dialog`, `drawer`, `hover-card`, `menubar`,
`navigation-menu`, `pagination`, `popover`, `progress`, `resizable`, `scroll-area`, `separator`, `sheet`,
`sidebar`, `skeleton`, `tabs`, `tooltip`, `context-menu`, `dropdown-menu`.

**Forms**: `checkbox`, `combobox`, `form`, `field-error`, `input`, `input-otp`, `label`, `radio-group`,
`select`, `slider`, `switch`, `textarea`, `toggle`, `toggle-group`, `calendar`, `date-range-filter`.

**Data**: `table`, `data-table`, `data-table-faceted-filter`, `data-table-row-actions`, `chart`.

**Feedback & misc**: `command`, `confirm-dialog`, `sonner` (toasts), `icon`, `placeholder-pattern`.

## Notable NosFerry customizations

- **`button`**: default variant is brand red with a lifted shadow and hover/active scale; pill radius
  (`rounded-2xl`); `cursor-pointer`. Variants: `default`, `destructive`, `outline`, `secondary`, `ghost`,
  `link`. Sizes: `default`, `sm`, `lg`, `icon`, `icon-sm`, `icon-lg`.
- **`data-table`**: built on TanStack Table with faceted filters and row actions.
- **`confirm-dialog`**, **`combobox`**, **`field-error`**: NosFerry app additions kept in the set.

## Form component

`<Form>` integrates with `react-hook-form`. Install `react-hook-form` in the app (it is an optional peer) when
you use it:

```tsx
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@akira-io/nosferry-ui';
```

## What is not included

`country-select` was dropped: it depended on an app-specific `useCountries` hook and is not a generic
primitive. Keep that one local to the app that needs it.

---

[← Theme & Tokens](02-theme-and-tokens.md) · Next: [Shells →](04-shells.md)
