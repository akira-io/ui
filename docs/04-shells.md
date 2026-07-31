# Shells

Shells are the larger application-layout pieces: the sidebar, the header, the settings layout. They are
**presentational and props-driven**: they never import an app's routes or hardcode a router. Navigation links go
through a `linkComponent` prop, so the same shell works in Inertia, Next.js, or plain React.

Two entry points:

- `@akira-io/ui/shells`: generic, you pass `linkComponent` and resolved `href`s.
- `@akira-io/ui/inertia`: the same shells with the Inertia `Link` and `usePage().url` pre-bound.

## Exports

`AppShell`, `AppContent`, `AppSidebar`, `AppSidebarHeader`, `Breadcrumbs`, `NavMain`, `NavFooter`, `NavUser`,
`UserInfo`, `UserMenuContent`, `SettingsLayout`, `Heading`, plus the types (`NavItem`, `NavGroup`,
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
- **`SettingsLayout`**: `items: NavItem[]`, `linkComponent`, `currentPath`, `title`, `description`.

## Inertia preset

Skip the wiring. `Link` and the current URL are bound for you:

```tsx
import { AppSidebar, AppSidebarHeader, SettingsLayout } from '@akira-io/ui/inertia';

<AppSidebar logo={<Logo />} logoHref="/dashboard" groups={groups} user={user}
    settingsHref="/settings/profile" logoutHref="/logout" onLogout={() => router.flushAll()} />
```

The app still owns its navigation **config**: the menu items, routes, and logo. The library owns the
**structure**. See the [Adoption Guide](05-adoption-guide.md) for a worked wiring.

## Using in Next.js or plain React

Import from `/shells` and pass your own link:

```tsx
import Link from 'next/link';
<AppSidebar /* ... */ linkComponent={Link} currentUrl={pathname} />
```

When no `linkComponent` is given, shells fall back to a plain `<a>`.

---

[← Components](03-components.md) · Next: [Adoption Guide →](05-adoption-guide.md)
