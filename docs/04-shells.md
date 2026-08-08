# Shells

Shells are the larger application-layout pieces: the sidebar, the header, the settings layout. They are
**presentational and props-driven**: they never import an app's routes or hardcode a router. Navigation links go
through a `linkComponent` prop, so the same shell works in Inertia, Next.js, or plain React.

Two entry points:

- `@akira-io/ui/shells`: generic, you pass `linkComponent` and resolved `href`s.
- `@akira-io/ui/inertia`: the same shells with the Inertia `Link` and `usePage().url` pre-bound.

## Exports

`AppShell`, `AppContent`, `AppSidebar`, `AppSidebarHeader`, `AuthShell`, `Breadcrumbs`, `NavMain`,
`NavFooter`, `NavUser`, `UserInfo`, `UserMenuContent`, `SettingsLayout`, `Heading`, plus the types (`NavItem`, `NavGroup`,
`BreadcrumbItem`, `SharedUser`, `LinkComponent`, `UrlLike`, `IconComponent`) and hooks (`useInitials`,
`useIsMobile`, `useAppearance`, `initializeTheme`).

## Generic usage

```tsx
import { AppShell, AppContent, AppSidebar, AppSidebarHeader } from '@akira-io/ui/shells';
import { Link } from '@inertiajs/react';

<AppShell variant="sidebar" open={open} onOpenChange={setOpen}>
    <AppSidebar
        logo={<Logo />}
        logoHref="/dashboard"
        groups={[
            { items: mainNavItems },
            { label: 'Reports', items: reportNavItems },
        ]}
        user={user}
        settingsHref="/settings/profile"
        logoutHref="/logout"
        currentUrl={currentUrl}
        linkComponent={Link}
        onLogout={() => router.flushAll()}
    />
    <AppContent variant="sidebar">
        <AppSidebarHeader breadcrumbs={breadcrumbs} linkComponent={Link} onSearchClick={openCommandMenu} />
        {children}
    </AppContent>
</AppShell>
```

### Key props

- **`AppShell`**: `variant: 'header' | 'sidebar'`; for `sidebar`, controlled `open` / `onOpenChange` (wire your
  own persisted store) or `defaultOpen`. No global store baked in.
- **`AppSidebar`**: `logo`, `logoHref`, `groups: NavGroup[]`, optional `footerItems`, `user`, `settingsHref`,
  `logoutHref`, `currentUrl` (active state), `linkComponent`, `onLogout`, `onSettingsClick`. Only the single
  most-specific item (longest matching `href` across all groups) is highlighted, so overlapping paths like
  `/tickets` and `/tickets/create` never both light up. Do not pre-set `isActive` on items: it's computed.
- **`AppSidebarHeader`**: `breadcrumbs`, `linkComponent`, optional `onSearchClick` (renders the search button
  only when provided), `searchLabel`.
- **`NavMain`**: `items: NavItem[]`, `label`, `currentUrl`, `linkComponent`, `collapsible`, `defaultOpen`, and
  the controlled pair `collapsedGroups` / `onCollapsedChange`.
- **`SettingsLayout`**: `items: NavItem[]`, `linkComponent`, `currentPath`, `title`, `description`.

## Collapsible group memory

Pass `collapsibleGroups` to `AppSidebar` (or `collapsible` to a bare `NavMain`) and every labelled group gets a
label that toggles it. The collapsed set is remembered, so an operator who closes the groups they never use does
not reopen them on the next page load.

Uncontrolled is the default: the labels of the collapsed groups are stored as a JSON string array in
`localStorage` under **`akira-ui:collapsed-nav-groups`**, exported as `SIDEBAR_COLLAPSED_GROUPS_KEY`. Groups are
keyed by their label, so keep labels stable and unique.

```tsx
<AppSidebar collapsibleGroups /* ...the usual props */ />
```

To keep the state somewhere else, an app store or a per-user column on the server, pass both `collapsedGroups`
and `onCollapsedChange`. In that mode the shell reads and writes nothing in `localStorage`:

```tsx
const [collapsedGroups, setCollapsedGroups] = useState<string[]>(user.collapsedNavGroups);

<AppSidebar
    collapsibleGroups
    collapsedGroups={collapsedGroups}
    onCollapsedChange={(next) => {
        setCollapsedGroups(next);
        router.patch('/settings/sidebar', { collapsedGroups: next });
    }}
    /* ...the usual props */
/>
```

A group holding the current route renders open whatever the stored state says, so the active page is never
hidden behind a closed group. Collapsing the sidebar itself to the icon rail is unaffected.

## Auth shell

`AuthShell` is the frame for the pages outside the application interior: sign in, registration, password
reset, email verification, two-factor confirmation. One component covers both arrangements an application
needs.

```tsx
import { AuthShell } from '@akira-io/ui/shells';

<AuthShell
    arrangement="split"
    logo={<Logo />}
    title="Sign in"
    description="Use your work account to continue."
    panel={<BrandArtwork />}
    footer={<a href="/forgot-password">Forgot your password?</a>}
    appearanceControl={<AppearanceToggle />}
>
    <SignInForm />
</AuthShell>;
```

`centred` puts the form alone on the page. `split` adds a branded panel beside it. Below the `lg`
breakpoint the split arrangement becomes the centred one: the panel is hidden rather than stacked above the
form, because a decorative panel pushed on top of a sign-in form only costs a scroll. The panel is
`aria-hidden` by default for the same reason; pass `panelDecorative={false}` when it carries content a
screen reader should read.

The heading is a real `<h1>` and the form sits inside the `<main>` landmark, so a sign-in page has a correct
outline. The form column is capped at `max-w-md` so fields do not stretch across a wide display.

| Prop | Type | Required | Notes |
| --- | --- | --- | --- |
| `title` | `string` | Yes | Rendered as the page `<h1>`. |
| `children` | `ReactNode` | Yes | The form. |
| `logo` | `ReactNode` | No | Rendered above the heading, inside `<main>`. |
| `description` | `string` | No | Sits under the heading. |
| `arrangement` | `'centred' \| 'split'` | No | Defaults to `centred`. |
| `panel` | `ReactNode` | No | The branded panel; rendered only in the `split` arrangement. |
| `panelDecorative` | `boolean` | No | Defaults to `true`, which marks the panel `aria-hidden`. |
| `footer` | `ReactNode` | No | Secondary links, such as recovering a password or returning to the site. |
| `appearanceControl` | `ReactNode` | No | These pages sit outside the application chrome that normally carries it, so the shell renders it in the corner when a page passes one. |
| `surface` | `boolean` | No | Defaults to `true`, which puts the form on a `Card`. Pass `false` for a form on the page itself. |
| `className` | `string` | No | |

`AuthShell` adds no card styling of its own: the surface is the library's `Card`, and the panel takes its
fill from `--primary`.

### Composing the shell

`AuthShell` is the props-based composition of `AuthShellRoot`, `AuthShellMain`, `AuthShellPanel`,
`AuthShellSurface`, `AuthShellLogo`, `AuthShellHeading`, `AuthShellBody` and `AuthShellFooter`, so an existing
page passing `title`, `panel`, `footer` and the rest needs no change. Reach for the parts directly when a page
needs to reorder them, drop one, or wrap one in something of its own.

```tsx
import { AkiraMark } from '@akira-io/ui';
import {
    AuthShellBody,
    AuthShellHeading,
    AuthShellLogo,
    AuthShellMain,
    AuthShellRoot,
    AuthShellSurface,
} from '@akira-io/ui/shells';

<AuthShellRoot>
    <AuthShellMain>
        <AuthShellSurface>
            <AuthShellLogo>
                <AkiraMark className="size-8" />
            </AuthShellLogo>
            <AuthShellHeading title="Login" align="center" />
            <AuthShellBody>{children}</AuthShellBody>
        </AuthShellSurface>
    </AuthShellMain>
</AuthShellRoot>;
```

Placing `AuthShellLogo` and `AuthShellHeading` inside `AuthShellSurface`, as above, puts them on the card.
Leaving them outside it, next to `AuthShellSurface` rather than inside it, keeps them above the card instead.

`AuthShellRoot` never inspects its children: it just provides the arrangement to `useAuthArrangement` and
renders whatever it is given. `AuthShellPanel` reads that arrangement and renders itself away outside a
`split` root, which is what lets a panel wrapped in a consumer's own component still work correctly in the
`centred` arrangement — there is no children-walking that a wrapper component would defeat.

Every part takes `slotName`, for a `data-slot` override where a test or a style needs to target one part
specifically. `AuthShellHeading` also takes `align: 'start' | 'center'`, defaulting to `start`.

## Inertia preset

Skip the wiring. `Link` and the current URL are bound for you:

```tsx
import { AppSidebar, AppSidebarHeader, SettingsLayout } from '@akira-io/ui/inertia';

<AppSidebar logo={<Logo />} logoHref="/dashboard" groups={groups} user={user}
    settingsHref="/settings/profile" logoutHref="/logout" onLogout={() => router.flushAll()} />
```

The app still owns its navigation **config**: the menu items, routes, and logo. The library owns the
**structure**. See the [Adoption Guide](05-adoption-guide.md) for a worked wiring.

## Table filters

`useTableFilters` drives a server-rendered `DataTable`: it holds the search box, debounces it, merges the
filters, and issues one Inertia visit. It renders nothing, and its return value plugs straight into the
table.

```tsx
import { DataTable } from '@akira-io/ui';
import { useTableFilters } from '@akira-io/ui/inertia';

const table = useTableFilters({
    url: '/admin/tickets',
    filters: props.filters,
    only: ['tickets', 'filters'],
});

<DataTable
    columns={columns}
    data={props.tickets.data}
    serverFilters={serverFilters}
    searchValue={table.search}
    onSearchChange={table.setSearch}
    filterValues={table.filterValues}
    onFilterChange={table.setFilter}
    onClearFilters={table.clearFilters}
    onPageChange={table.setPage}
    manualPagination
    pageCount={props.tickets.last_page}
    pageIndex={props.tickets.current_page - 1}
    total={props.tickets.total}
/>;
```

### Options

| Option | Type | Required | Notes |
| --- | --- | --- | --- |
| `url` | `string` | Yes | The index route the visit targets. |
| `filters` | `Record<string, string \| string[] \| number \| null \| undefined>` | Yes | The filter values the server rendered. Each change merges on top of them. |
| `only` | `string[]` | No | Partial-reload props. Without it the whole page reloads. |
| `searchKey` | `string` | No | Query key for the search box. Defaults to `search`. |
| `pageKey` | `string` | No | Query key for the page. Defaults to `page`. |
| `debounce` | `number` | No | Milliseconds before a typed search visits. Defaults to `300`. |

### Returns

| Member | Type | Notes |
| --- | --- | --- |
| `search` | `string` | Seeded from `filters[searchKey]`, updated on every keystroke. |
| `setSearch` | `(value: string) => void` | Debounced: rapid typing produces one visit. |
| `filterValues` | `Record<string, string[]>` | The non-empty filters, without the search and page keys. |
| `setFilter` | `(key: string, values: string[]) => void` | Visits immediately. |
| `clearFilters` | `() => void` | Empties the search and drops every filter from the query. |
| `setPage` | `(pageIndex: number) => void` | Takes the table's zero-based index and sends a one-based page. |
| `apply` | `(changes: Record<string, TableFilterValue>) => void` | Several changes in one visit, for a date filter or a custom control. |

Every visit sets `preserveState`, `preserveScroll` and `replace`, so filtering keeps the scroll position and
does not fill the back stack. Empty strings and empty arrays are dropped from the query, so a cleared filter
leaves a clean url. Any change other than the page resets the page. A pending visit is cancelled when a newer
one starts, so fast typing cannot land results out of order, and the debounce timer is cleared on unmount.

Pair it with the date filter: `apply({ created_at: encodeDateFilter(value) })` writes the filter to the url,
and `decodeDateFilter(props.filters.created_at)` reads it back. See [Blocks](08-blocks.md).

### Without Inertia

The hook lives in the `/inertia` entry, so an app that does not use Inertia never loads it. The logic itself
takes the router as an argument: `createTableFiltersHook(router)` accepts anything with a
`visit(url, options)` method and returns the hook. That is how `@akira-io/ui/inertia` binds the real Inertia
router, and how the tests bind a fake one.

## Using in Next.js or plain React

Import from `/shells` and pass your own link:

```tsx
import Link from 'next/link';
<AppSidebar /* ... */ linkComponent={Link} currentUrl={pathname} />
```

When no `linkComponent` is given, shells fall back to a plain `<a>`.

---

[← Components](03-components.md) · Next: [Adoption Guide →](05-adoption-guide.md)
