# Shells

Shells are the larger application-layout pieces: the sidebar, the header, the settings layout. They are
**presentational and props-driven**: they never import an app's routes or hardcode a router. Navigation links go
through a `linkComponent` prop, so the same shell works in Inertia, Next.js, or plain React.

Three entry points:

- `@akira-io/ui/shells`: generic, you pass `linkComponent` and resolved `href`s.
- `@akira-io/ui/inertia`: the same shells with the Inertia `Link` and `usePage().url` pre-bound.
- `@akira-io/ui/shells/server`: `readSidebarState` and `SIDEBAR_COOKIE_NAME`, without the client directive.

## Exports

`AppShell`, `AppContent`, `AppSidebar`, `AppSidebarHeader`, `AuthShell`, `Breadcrumbs`, `NavMain`,
`NavFooter`, `NavUser`, `UserInfo`, `UserMenuContent`, `SettingsLayout`, `Heading`, plus the types (`NavItem`, `NavGroup`,
`BreadcrumbItem`, `SharedUser`, `LinkComponent`, `UrlLike`, `IconComponent`, `AppSidebarProps` and its parts
`AppSidebarBaseProps`, `AppSidebarAccountProps`, `AppSidebarUserProps`, `AppSidebarWithoutUserProps`,
`AppSidebarCollapsible`), hooks (`useInitials`, `useIsMobile`, `useAppearance`, `initializeTheme`,
`useCollapsedGroup`) and the storage keys `SIDEBAR_COLLAPSED_GROUPS_KEY` and `SIDEBAR_EXPANDED_GROUPS_KEY`.

`@akira-io/ui/shells/server` carries `readSidebarState` and `SIDEBAR_COOKIE_NAME` without the client directive, so
a React Server Component, an Astro frontmatter or a Node SSR handler can call them (see
[Persisted sidebar state](#persisted-sidebar-state)).

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
        <AppSidebarHeader
            breadcrumbs={breadcrumbs}
            linkComponent={Link}
            onSearchClick={openCommandMenu}
            actions={<NotificationBell />}
        />
        {children}
    </AppContent>
</AppShell>
```

### Key props

- **`AppShell`**: `variant: 'header' | 'sidebar'`; for `sidebar`, controlled `open` / `onOpenChange` (wire your
  own persisted store) or `defaultOpen`. Uncontrolled, it restores the `sidebar_state` cookie it writes on every
  toggle (see [Persisted sidebar state](#persisted-sidebar-state)).
- **`AppSidebar`**: `logo`, `logoHref`, `groups: NavGroup[]`, optional `footerItems`, `footer`, `user`,
  `settingsHref`, `logoutHref`, `currentUrl` (active state), `linkComponent`, `collapsible`, `onLogout`,
  `onSettingsClick`. `user`, `settingsHref` and `logoutHref` go together or not at all: without them there is
  no user menu, for a site nobody signs in to (see [Sidebar without a user](#sidebar-without-a-user)).
  `footer: ReactNode` renders in the sidebar footer, between `footerItems` and the user menu.
  `collapsible` picks how the sidebar collapses: `'icon'` (the default) keeps an icon rail, `'offcanvas'` slides
  it away, for items without icons, and `'none'` keeps it drawn. Only the single
  most-specific item (longest matching `href` across all groups and subgroups) is highlighted, so overlapping paths like
  `/tickets` and `/tickets/create` never both light up. Do not pre-set `isActive` on items: it's computed.
  `userMenuLabels: Partial<UserMenuLabels>` (`{ settingsLabel, logoutLabel }`) names the entries of the user
  menu; it outranks the `userMenu` section of `UiLocaleProvider`, which outranks the English defaults.
  `userMenuLabelsPt`, `userMenuLabelsFr` and `userMenuLabelsEs` ship with `ptLabels`, `frLabels` and `esLabels`.
  `NavUser` and `UserMenuContent` take the same object as `labels`; on `UserMenuContent` the single
  `settingsLabel` and `logoutLabel` props outrank it.
  `extraItems: UserMenuItem[]` adds entries to the user menu (`AppSidebar`, `NavUser` and `UserMenuContent`
  all take it): `{ title, href, icon?, external?, visible?, position? }`. `position: 'before'` places an item
  above Settings, `'after'` (the default) below it, in array order; `visible: false` hides it; `external: true`
  renders a plain anchor opening in a new tab with `rel="noreferrer"`. Every entry of the menu clears the
  `pointer-events` the dropdown leaves on `body` before calling `onSettingsClick` or `onLogout`, so apps need no
  local hook for it.
- **`AppSidebarHeader`**: `breadcrumbs`, `linkComponent`, optional `onSearchClick` (renders the search button
  only when provided), `searchLabel`, and optional `actions`, rendered at the right edge after the search
  button, for a notifications bell or a user menu. It sticks to the top on the bar glass, so content scrolls
  under it; pass `sticky={false}` for a static header. Its props type ships as `AppSidebarHeaderProps`.
  Below `sm` the search button shrinks to its icon, keeping `searchLabel` as its accessible name, and the
  breadcrumbs render with `collapseBelowSm`, so the header never scrolls sideways on a phone.
- **`Breadcrumbs`**: `breadcrumbs: BreadcrumbItem[]`, `linkComponent`, and optional `collapseBelowSm`
  (default `false`). Without it the trail shows every crumb and wraps. With it the trail stays on one line,
  every crumb truncates with its full title on hover, and below `sm` only the last crumb shows.
- **`NavMain`**: `items: NavItem[]`, `groups: NavGroup[]` (subgroups, see [Nested groups](#nested-groups)),
  `label`, `currentUrl`, `linkComponent`, `collapsible`, `defaultOpen`, `iconRail`, and
  the controlled pair `collapsedGroups` / `onCollapsedChange`. `iconRail` (default `true`) says whether a closed
  sidebar shows this group as an icon rail; `AppSidebar` sets it from its own `collapsible`, so a sidebar that
  cannot collapse keeps its groups and subgroups when the provider is closed. Without `label` the group renders no title and
  cannot collapse. Items without an explicit `isActive` light up by the longest matching path, so
  `/reports/sales/operators` does not also light `/reports/sales`. On the icon rail a collapsed group shows its
  items, and the stored collapsed state is kept for when the sidebar expands again.
- **`SettingsLayout`**: `items: NavItem[]`, `linkComponent`, `currentPath`, `title`, `description`. Without
  `title` and `description` the heading reads the `settingsLayout` section of `UiLocaleProvider`
  (`SettingsLayoutLabels`, `{ title, description }`), then the English defaults in
  `settingsLayoutDefaultLabels`; `ptLabels`, `frLabels` and `esLabels` carry it.
- **`NavItem`**: `title`, `href`, optional `icon`, `isActive`, plus `badge` and `badgeLabel` (see
  [Item badges](#item-badges)).
- **`NavGroup`**: `items`, optional `label`, `groups` (subgroups) and `defaultOpen`, the state a collapsible group
  starts in before anyone toggles it. In controlled mode (`collapsedGroups` / `onCollapsedChange`) the app owns
  that state and neither `NavGroup.defaultOpen` nor the `defaultOpen` of `NavMain` is read: seed
  `collapsedGroups` with the keys of the groups that start closed.

## Sidebar without a user

A documentation site or a marketing app has nobody signed in. Leave out `user`, `settingsHref` and `logoutHref`
and the sidebar draws no user menu; put what belongs at the bottom in `footer`:

```tsx
<AppShell variant="sidebar">
    <AppSidebar
        logo={<Logo />}
        logoHref="/"
        groups={docsGroups}
        currentUrl={currentUrl}
        collapsible="offcanvas"
        footer={<a href="https://github.com/akira-io/ui">GitHub</a>}
    />
    <AppContent variant="sidebar">{children}</AppContent>
</AppShell>
```

The props type is `AppSidebarBaseProps & AppSidebarAccountProps`, where the account part is either
`AppSidebarUserProps` or `AppSidebarWithoutUserProps`, so a `user` without `settingsHref` fails to compile. A
wrapper that removes props should `Omit` from `AppSidebarBaseProps` and add `AppSidebarAccountProps` back, as the
`/inertia` entry does: `Omit` over the union would lose the pairing.

## Nested groups

A group can hold subgroups, drawn indented under a left border inside it:

```tsx
const docsGroups: NavGroup[] = [
    { label: 'Getting started', items: startItems },
    {
        label: 'Components',
        items: [{ title: 'Overview', href: '/components' }],
        groups: [
            { label: 'Forms', defaultOpen: false, items: formItems },
            { label: 'Data display', defaultOpen: false, items: dataItems },
        ],
    },
];
```

Subgroups follow `collapsibleGroups` (or `collapsible` on `NavMain`); when the groups cannot collapse, a subgroup
label is a plain heading over items that stay open. A subgroup without a label lists its items indented, with no
heading and no toggle. Subgroup items take `badge` and `badgeLabel` like any other item. The active item is the most specific
`href` at any depth, and a group or subgroup holding it renders open, together with every group above it. On the
icon rail the items of the subgroups are listed flat under their group, since the rail has no room for the
indentation.

## Item badges

A sidebar item can carry a count, so an operator sees pending work without opening the page. Set `badge` on the
item and `NavMain` renders it right-aligned inside the row:

```tsx
const mainNavItems: NavItem[] = [
    { title: 'Dashboard', href: '/dashboard', icon: LayoutGrid },
    {
        title: 'Refunds',
        href: '/refunds',
        icon: Receipt,
        badge: openRefundsCount,
        badgeLabel: `${openRefundsCount} refunds awaiting review`,
    },
];
```

`badge` takes a `ReactNode`, so a caller that needs something other than a count (a short word, an icon) can
pass it instead. The rules:

| Value | What renders |
| --- | --- |
| absent, `null`, `undefined`, `false`, `true` | nothing |
| `0`, a negative number, a number below `1`, `NaN`, `Infinity` | nothing, so a quiet queue leaves the row clean |
| `1` to `99` | the number, fractions floored (`7.9` shows `7`) |
| above `99` | `99+` |
| an empty or blank string | nothing |
| an empty array | nothing, so `items.filter(...)` returning none leaves the row clean |
| any other node | the node, untouched |

The badge sits on the primary colour, so it stays legible on the active row, which has its own tinted
background. The row reserves the space the badge occupies, so a long title truncates beside the count instead of
running under it.

Collapse the sidebar to the icon rail and the row label goes with it, so the badge would have nowhere to sit. It
is replaced by a dot on the icon, whatever the badge holds, and the count moves into the tooltip that the
collapsed rail already shows: `Refunds (7 refunds awaiting review)`. A row that paints no badge gets no dot and
its tooltip stays the bare title, even when `badgeLabel` is set, which it usually is when the app computes both
fields in one go.

A bare number does not say what it counts, so pass `badgeLabel`. It becomes the row's accessible name
(`Refunds, 7 refunds awaiting review`) and the visible number is hidden from assistive technology to avoid
reading the figure twice. Without `badgeLabel` the number is left readable on its own, and the tooltip falls back
to it (`Refunds (99+)`).

The badge keeps the `sidebar-menu-badge` slot of the primitive it is built on, so styling that already targets
`[data-slot="sidebar-menu-badge"]` reaches it. The collapsed dot is `[data-slot="nav-badge-dot"]`.

`badge` is ignored by `NavFooter`, whose items are external links, and by `SettingsLayout`.

## Collapsible group memory

Pass `collapsibleGroups` to `AppSidebar` (or `collapsible` to a bare `NavMain`) and every labelled group gets a
label that toggles it. The collapsed set is remembered, so an operator who closes the groups they never use does
not reopen them on the next page load.

Uncontrolled is the default: the keys of the collapsed groups are stored as a JSON string array in
`localStorage` under **`akira-ui:collapsed-nav-groups`**, exported as `SIDEBAR_COLLAPSED_GROUPS_KEY`, and the keys
of the groups someone opened under **`akira-ui:expanded-nav-groups`** (`SIDEBAR_EXPANDED_GROUPS_KEY`). A group
in neither list starts as its `defaultOpen` says, so collapsing one group never opens another that starts
closed. A top-level group is keyed by its label; a subgroup by the path of labels down to it, such as
`Components/Forms`, so two `Forms` subgroups under differently labelled groups keep separate states. A
missing label adds nothing to the path: subgroups of an unlabelled group are keyed as if it were not there, so
`Pickers` inside an unlabelled subgroup of `Components` is `Components/Pickers`, and siblings with the same label
share one state. Keep labels stable and unique among siblings. In controlled mode `onCollapsedChange` receives the same keys.

With server-rendered or static HTML, the first render on the client follows `defaultOpen`, exactly like the
server did, and the stored state applies right after hydration, so React reports no mismatch.

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
hidden behind a closed group. On the icon rail every group shows its items, since the rail has no labels to
reopen them; the stored state applies again once the sidebar expands.

## Persisted sidebar state

Every toggle of an uncontrolled `AppShell` (or `SidebarProvider`) writes `sidebar_state=true|false` to a cookie,
and the next page restores it. The first render follows `defaultOpen`, like the server, and the cookie applies in
a layout effect, before the browser paints the hydrated page. A controlled `open` ignores the cookie.

Static HTML is painted before any script runs, so a page that rendered the sidebar open shows it open until the
island hydrates. With Astro, `transition:persist` on the shell keeps it mounted between pages, so the cookie only
matters on the first load. An app that renders on the server can read the cookie there and pass `defaultOpen`:

```astro
---
import { readSidebarState } from '@akira-io/ui/shells/server';

const sidebarOpen = readSidebarState(Astro.request.headers.get('cookie')) ?? true;
---
<Shell client:load defaultOpen={sidebarOpen} />
```

With Inertia, share it from Laravel (`'sidebarOpen' => $request->cookie('sidebar_state') !== 'false'`) and pass
`defaultOpen={sidebarOpen}` to `AppShell`. The cookie is written by the browser, so exclude it from encryption in
`bootstrap/app.php` (`$middleware->encryptCookies(except: ['sidebar_state'])`), or Laravel reads it as `null`. A
Node SSR handler can call `readSidebarState(request.headers.cookie)`.

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

| Component | Prop | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `AuthShellPanel` | `decorative` | `boolean` | `true` | Marks the panel `aria-hidden`. Pass `false` when it carries content a screen reader should read. |
| | `arrangement` | `'centred' \| 'split'` | context | Overrides the arrangement the panel reads from `AuthShellRoot`, for a panel rendered outside one or against a different arrangement than the rest of the page. |
| | `children` | `ReactNode` | — | Required. Rendered only when the resolved arrangement is `split`. |
| | `slotName` | `string` | `'auth-shell-panel'` | |

Every part takes `slotName`, for a `data-slot` override where a test or a style needs to target one part
specifically. `AuthShellHeading` also takes `align: 'start' | 'center'`, defaulting to `start`. One
exception: `AuthShellSurface` defaults its `data-slot` to `"card"`, not `"auth-shell-surface"`, to keep the
markup this preset already ships byte-identical. A selector built on the `auth-shell-*` naming pattern, such
as `[data-slot^="auth-shell"]`, will not match the surface; target `[data-slot="card"]` or pass an explicit
`slotName` instead.

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
import { DataTable } from '@akira-io/ui/data-table';
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
