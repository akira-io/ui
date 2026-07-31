# Theme & Tokens

All design tokens live in one file (`theme.css`) shipped by the package and imported by every app. This is
the single source of truth that replaced the per-app copies that had drifted apart.

## What `theme.css` contains

- `@custom-variant dark`: the dark-mode variant.
- `@theme { ... }`: the Tailwind theme: font, radius scale, and the `--color-*` mappings.
- `:root { ... }`: light-mode token values (OKLCH).
- `.dark { ... }`: dark-mode token values.
- A base layer that applies the border color and background/foreground to `body`.

## Token reference

Colors use the OKLCH color space. Key tokens:

| Token | Light | Role |
| --- | --- | --- |
| `--primary` | `oklch(0.577 0.245 27.325)` | NosFerry red, the brand color. |
| `--primary-foreground` | `oklch(0.985 0 0)` | Text on primary. |
| `--background` / `--foreground` | white / near-black | Page surface and text. |
| `--card`, `--popover` | white | Raised surfaces. |
| `--muted`, `--accent`, `--secondary` | `oklch(0.97 0 0)` | Subtle surfaces. |
| `--destructive` | red | Dangerous actions. |
| `--border`, `--input`, `--ring` | grays | Lines and focus rings. |
| `--sidebar*` | N/A | Sidebar surface, text, accent, border, ring. |
| `--radius` | `0.625rem` | Base radius; `--radius-sm/md/lg` derive from it. |

Use them through Tailwind classes: `bg-primary`, `text-muted-foreground`, `border-border`, `bg-sidebar`, etc.
Do not hardcode hex values; reach for the token.

## Dark mode

Toggle the `dark` class on `<html>`. The `useAppearance` hook and `initializeTheme` helper (exported from
`@akira-io/nosferry-ui/shells`) manage this with `light | dark | system`, persisting to `localStorage` and a
cookie for SSR.

```tsx
import { useAppearance } from '@akira-io/nosferry-ui/shells';

const { appearance, updateAppearance } = useAppearance();
updateAppearance('dark');
```

## Changing a token

Edit `theme.css` in the library, bump the version, publish, and bump the dependency in the apps. Because every
app reads the same file, the change lands everywhere: no per-app edits. `STYLE_GUIDE.md` at the NosFerry root
is documentation only; `theme.css` is the source of truth.

---

[← Installation](01-installation.md) · Next: [Components →](03-components.md)
