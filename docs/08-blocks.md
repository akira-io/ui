# Blocks

Blocks are the layer above the primitives: they combine several shadcn components into one thing an app
composes directly, rather than every app rebuilding the same pattern. All fourteen live in `src/blocks/` and
import from `@akira-io/ui/blocks`:

```tsx
import { StatCard, CommandPalette, DateFilter } from '@akira-io/ui/blocks';
```

Every block reads its colors from the same tokens as the primitives (see [Theme & Tokens](02-theme-and-tokens.md)),
so a brand preset recolors them along with everything else.

## Command palette

`⌘K`/`Ctrl+K` search dialog built on the `Command` primitive. The block owns the keyboard shortcut and open
state; the caller supplies the groups and what happens on selection.

```tsx
import { CommandPalette, useCommandPalette } from '@akira-io/ui/blocks';

const { open, setOpen } = useCommandPalette();

<CommandPalette
    open={open}
    onOpenChange={setOpen}
    groups={[{ heading: 'Pages', items: [{ id: 'settings', label: 'Settings' }] }]}
    onSelect={(item) => router.visit(item.value ?? item.id)}
/>;
```

| Export | What it is |
| --- | --- |
| `CommandPalette` | The dialog component. |
| `useCommandPalette(initialOpen?)` | Owns `open` state and binds `⌘K`/`Ctrl+K` to toggle it. Returns `{ open, setOpen, toggle }`. |

`CommandPaletteProps`:

| Prop | Type | Required | Notes |
| --- | --- | --- | --- |
| `open` | `boolean` | Yes | |
| `onOpenChange` | `(open: boolean) => void` | Yes | |
| `groups` | `CommandPaletteGroup[]` | Yes | `{ heading: string; items: CommandPaletteItem[] }`. |
| `onSelect` | `(item: CommandPaletteItem) => void` | Yes | `CommandPaletteItem` is `{ id, label, icon?, value?, hint? }`. |
| `query` / `onQueryChange` | `string` / `(query: string) => void` | No | Controlled search input; omit for uncontrolled. |
| `placeholder` | `string` | No | Defaults to a Portuguese placeholder (`Pesquisar...`); pass your own for other locales. |
| `emptyState` | `ReactNode` | No | Replaces the default "no results" state. |
| `className` | `string` | No | |

## Date filter

A popover-driven date filter with three modes: an "all time" option, a set of named presets, and two
sub-panels for a fixed range or a relative range ("last 3 months"). State lives in a context internal to the
block; the parts (`DateFilterTrigger`, `DateFilterContent`, `DateFilterPresets`, and so on) can be composed
directly if the default layout does not fit.

```tsx
import { DateFilter, encodeDateFilter, type DateFilterValue } from '@akira-io/ui/blocks';

const [value, setValue] = useState<DateFilterValue>({ mode: 'all' });

<DateFilter value={value} onChange={setValue} />;
// encodeDateFilter(value) -> query-string-ready representation for a server request
```

`DateFilterProps`:

| Prop | Type | Required | Notes |
| --- | --- | --- | --- |
| `value` | `DateFilterValue` | Yes | `{ mode: 'all' \| 'preset' \| 'fixed' \| 'relative', ... }`. |
| `onChange` | `(value: DateFilterValue) => void` | Yes | Called once a selection commits. |
| `presets` | `DateFilterOption[]` | No | Defaults to eight Portuguese presets (today, yesterday, last 7 days, ...). |
| `operators` | `DateFilterOption[]` | No | For the fixed panel: between / before / on / after. |
| `units` | `DateFilterOption[]` | No | For the relative panel: day / week / month / quarter / year. |
| `labels` | `Partial<DateFilterLabels>` | No | Overrides any of the built-in Portuguese strings. |
| `children` | `ReactNode` | No | Replaces the default trigger + panel layout entirely. |

`encodeDateFilter` and `decodeDateFilter` are exact inverses, so a page can put the filter in the query
string and read its own url back on the next request:

```tsx
import { decodeDateFilter, encodeDateFilter } from '@akira-io/ui/blocks';

const encoded = encodeDateFilter({ mode: 'relative', amount: 3, unit: 'month' });
// 'previous:3:month'
decodeDateFilter(encoded); // { mode: 'relative', amount: 3, unit: 'month' }
decodeDateFilter(new URLSearchParams(location.search).get('created_at'));
```

`decodeDateFilter` accepts `string | null | undefined`. A missing, empty or malformed value returns
`{ mode: 'all' }` rather than throwing, so a hand-edited url degrades to the unfiltered state. A plain token
that is neither an ISO date nor a relative expression reads as a preset key, which is exactly what the
encoder writes for `{ mode: 'preset' }`.

Also exported: `encodeDateFilter` (value to a plain, serializable shape), `decodeDateFilter` (the same string
back to a value), `resolveRelativeRange` and `formatRangePreview` (turn a relative value into concrete dates
and a display string), and `summariseDateFilter` (the text shown on the trigger button).

## Detail edit sheet

An edit form inside a `FloatingSheet`: header with the title and optional description, a scrolling body of
fields, and a footer holding cancel and save. The body and the footer sit inside a real `form`, so Enter
saves and the browser's own validation runs.

```tsx
import { DetailEditSheet } from '@akira-io/ui/blocks';

<DetailEditSheet
    open={open}
    onOpenChange={setOpen}
    title="Edit driver"
    description={`Driver #${driver.id}`}
    processing={form.processing}
    onSave={save}
>
    {fields}
</DetailEditSheet>;
```

The panel is `persistent`: an outside click or Escape leaves it open, because it holds unsaved work. The
close control and cancel still dismiss it. While `processing`, save shows the pending label and both
controls are disabled.

`DetailEditSheetProps`:

| Prop | Type | Required | Notes |
| --- | --- | --- | --- |
| `open` | `boolean` | Yes | |
| `onOpenChange` | `(open: boolean) => void` | Yes | |
| `title` | `ReactNode` | Yes | |
| `description` | `ReactNode` | No | |
| `children` | `ReactNode` | Yes | The fields. |
| `onSave` | `() => void` | Yes | Fired by the save control and by Enter inside a field. |
| `onCancel` | `() => void` | No | Fired before the sheet closes on cancel. |
| `processing` | `boolean` | No | Disables both controls and shows the pending label. |
| `intent` | `'default' \| 'destructive'` | No | Paints the save control, for a destructive form. |
| `labels` | `FormOverlayLabels` | No | `{ cancelLabel, saveLabel, savingLabel }`, English by default. `formOverlayLabelsPt` carries the Portuguese bundle. |
| `className` | `string` | No | |

It must be rendered inside a `FloatingSheetStack`, like any floating sheet.

## Form dialog

The same contract over `Dialog`, for the cases that belong in the centre of the screen rather than in a
side panel. Header, scrolling body, footer with cancel and save, all inside a real `form`. Focus lands on
the first field rather than on the close control.

```tsx
import { FormDialog } from '@akira-io/ui/blocks';

<FormDialog
    open={open}
    onOpenChange={setOpen}
    title="New fare"
    description="Applies to every route"
    processing={form.processing}
    onSave={save}
>
    {fields}
</FormDialog>;
```

While `processing`, the dialog refuses to dismiss on Escape, on an outside click, and from the close
control, so a submit in flight cannot be abandoned halfway. It takes the same props as `DetailEditSheet`.

## Info field

A read-only label/value row with an icon, for detail and profile views. `InfoFieldGroup` stacks several with
consistent spacing.

```tsx
import { InfoField, InfoFieldGroup } from '@akira-io/ui/blocks';
import { Mail } from 'lucide-react';

<InfoFieldGroup>
    <InfoField icon={Mail} label="Email" value="user@example.com" />
</InfoFieldGroup>;
```

`InfoFieldProps`: `icon: LucideIcon`, `label: string`, `value: ReactNode`, `iconClassName?: string`,
`className?: string`.

`InfoFieldGroupProps`: `children: ReactNode`, `className?: string`.

## Localized fields

A tabbed form section for editing the same set of fields across multiple locales (`en`, `pt`, ...), one tab
per locale. Built on the `Tabs` primitive; supports plain text inputs and multi-line textareas per field.

```tsx
import { LocalizedFields } from '@akira-io/ui/blocks';

<LocalizedFields
    locales={['en', 'pt']}
    fields={[{ name: 'title', label: 'Title' }, { name: 'body', label: 'Body', type: 'textarea', rows: 6 }]}
    values={values}
    onChange={(field, locale, value) => setValues(/* ... */)}
    errors={errors}
/>;
```

`LocalizedFieldsProps`:

| Prop | Type | Required | Notes |
| --- | --- | --- | --- |
| `locales` | `string[]` | Yes | Tab order. |
| `fields` | `LocalizedField[]` | Yes | `{ name, label, type?: 'text' \| 'textarea', rows? }`. |
| `values` | `Record<string, Record<string, string>>` | Yes | Keyed `values[field.name][locale]`. |
| `onChange` | `(field: string, locale: string, value: string) => void` | Yes | |
| `errors` | `Record<string, string>` | No | Keyed `"field.locale"`; rendered under the matching input in `--destructive`. |
| `defaultLocale` | `string` | No | Defaults to `locales[0]`. |
| `localeLabels` | `Record<string, string>` | No | Tab label per locale; defaults to the uppercased locale code. |
| `className` | `string` | No | |

## Section header

A title, optional description, optional leading icon, and an optional trailing control, laid out to wrap
on narrow screens. Used at the top of a settings section or a page region.

```tsx
import { SectionHeader } from '@akira-io/ui/blocks';

<SectionHeader
    title="Notifications"
    description="Choose what you hear about."
    control={<Button size="sm">Save</Button>}
/>;
```

`SectionHeaderProps`: `title: string`, `description?: string`, `icon?: ReactNode`, `control?: ReactNode`,
`className?: string`.

## Settings card

The card shell used across settings pages: an icon, title, description, an optional header control, and a
body. `SettingsPanel` is the smaller, nested variant for grouping related rows inside a card. `ToggleRow` is
a label/description/switch row built for exactly that grouping.

```tsx
import { SettingsCard, SettingsPanel, ToggleRow } from '@akira-io/ui/blocks';
import { Bell } from 'lucide-react';

<SettingsCard icon={Bell} title="Notifications" description="Choose what you hear about.">
    <SettingsPanel title="Email">
        <ToggleRow id="marketing" label="Marketing emails" checked={marketing} onChange={setMarketing} />
    </SettingsPanel>
</SettingsCard>;
```

| Export | Key props | Notes |
| --- | --- | --- |
| `SettingsCard` | `icon: LucideIcon`, `title: string`, `description: string`, `control?: ReactNode`, `children: ReactNode`, `inset?: boolean`, `iconClassName?`, `className?` | The outer card. |
| `SettingsPanel` | `title?: string`, `description?: string`, `children: ReactNode`, `inset?: boolean` (default `true`), `className?` | The recessed level of the surface language, for grouping rows inside a card. |
| `ToggleRow` | `id: string`, `label: string`, `description?: string`, `checked: boolean`, `onChange: (checked: boolean) => void`, `disabled?: boolean` | One labeled switch row. |

## Settings fields

The four labeled controls a settings screen needs beside `ToggleRow`, in the spacing `SettingsCard` and
`SettingsPanel` expect. Each one pairs a label, a control, an optional description and an error, and each is
controlled: it takes a value and reports a change, so it composes with `useAutosave` or with any form
library.

```tsx
import { NumberField, SelectField, SettingsCard, TextField } from '@akira-io/ui/blocks';
import { SaveStatus, useAutosave } from '@akira-io/ui';
import { Ship } from 'lucide-react';

const [values, setValues] = useState({ name: 'Cascais', seats: 40, route: 'luanda' });
const { status, error } = useAutosave(values, (next) => form.patch(url, { data: next }));

<SettingsCard
    icon={Ship}
    title="Vessel"
    description="Saved as you type."
    control={<SaveStatus status={status} message={error} showIdle />}
>
    <TextField
        label="Name"
        description="Shown on every ticket."
        value={values.name}
        onChange={(name) => setValues((current) => ({ ...current, name }))}
    />
    <NumberField
        label="Seats"
        min={1}
        value={values.seats}
        onChange={(seats) => setValues((current) => ({ ...current, seats }))}
    />
</SettingsCard>;
```

| Export | Value type | Extra props |
| --- | --- | --- |
| `TextField` | `string` | `type?: 'text' \| 'email' \| 'url' \| 'tel' \| 'password'` |
| `NumberField` | `number \| ''` (empty when the control is cleared) | `min?`, `max?`, `step?` |
| `DateField` | `string` (`yyyy-MM-dd`) | `min?`, `max?` |
| `SelectField` | `string` | `options: SelectFieldOption[]` |
| `SettingsField` | render prop | The shell the four share: `children: (fieldId: string) => ReactNode` |

Every field takes `label`, `description?`, `error?`, `required?`, `disabled?`, `placeholder?`, `id?` and
`className?`. Leaving `id` out generates one, so the label and the control stay tied together either way.
An `error` marks the control `aria-invalid` and renders through `FieldError`.

### Autosave

`useAutosave` is headless and lives in the root entry, so the library never depends on Inertia: it takes the
values, a callback, and returns the status a `SaveStatus` line consumes.

```tsx
const { status, error, flush, reset } = useAutosave(values, onSave, { delay: 700 });
```

| Option | Default | Notes |
| --- | --- | --- |
| `delay` | `700` | The debounce window, in milliseconds. |
| `enabled` | `true` | Set to `false` to hold every save, for a form that is not ready yet. |
| `isEqual` | shallow equality | How a real change is told apart from a re-render. |

It never fires on mount, coalesces a burst of edits into one call per window, and a save that is overtaken
by a newer one can no longer resolve into a stale status. A rejected callback leaves `status` at `'error'`
and carries the message on `error`; the next real change tries again. `flush()` saves the pending change
immediately, `reset()` puts the line back to rest.

## Stat card

A dashboard tile: icon, title, a large value, and an optional trend indicator that colors itself from
`--success` (positive), `--destructive` (negative), or a neutral gray (flat, within 0.05 of zero).
`StatsGrid` arranges several in a responsive one/two/four-column grid.

```tsx
import { StatCard, StatsGrid } from '@akira-io/ui/blocks';
import { Users } from 'lucide-react';

<StatsGrid>
    <StatCard title="Active users" value="1,204" icon={Users} trend={4.2} comparisonLabel="vs last month" />
</StatsGrid>;
```

`StatCardProps`: `title: string`, `value: ReactNode`, `icon: LucideIcon`, `trend?: number` (a percentage;
values under 0.05 in magnitude render as flat), `comparisonLabel?: string`, `inset?: boolean` (renders the
recessed level of the surface language; see [Theming](07-theming.md)), `iconClassName?` (defaults to
`bg-muted text-muted-foreground`), `className?`.

`StatsGridProps`: `children: ReactNode`, `className?: string`.

## Tour

An onboarding tour built on `driver.js`: a provider that owns the active tour instance, a hook that starts a
tour on mount, and a gate that decides whether a tour should run at all for a given user and breakpoint.

```tsx
import { TourProvider, useTour, type TourDefinition } from '@akira-io/ui/blocks';

<TourProvider seen={seenVersions} onProgress={reportProgress}>
    <Page />
</TourProvider>;

// inside a component rendered under the provider:
const definition: TourDefinition = {
    id: 'dashboard',
    version: 1,
    steps: [{ target: '#stat-cards', title: 'Your stats', description: 'Live numbers, updated hourly.' }],
};

useTour(definition);
```

| Export | Signature | Notes |
| --- | --- | --- |
| `TourProvider` | `{ seen, onProgress, labels? }` | `seen` maps tour id to the last version the user has finished or dismissed. `onProgress` fires once per tour end with `{ tour, version, lastStep, outcome }`. |
| `useTour(definition, options?)` | returns `{ restart }` | Starts the tour on mount if the gate allows it; `options.enabled` (default `true`) can hold it off; `restart()` force-starts it, ignoring `seen`. |
| `useTourController()` | returns `{ startTour }` | Lower-level access to the provider, for a caller that starts a tour outside the `useTour` mount effect. |
| `shouldStartTour`, `stepsForBreakpoint`, `resolveSteps` | pure functions | The gate logic: which steps apply at `'mobile'` vs `'desktop'` (a step can restrict itself via `breakpoints`), and whether a tour with the given `seen` record and step count should start at all. |

The popover itself is styled by `.driver-popover.akira-tour` in `theme.css`, using the same tokens as
everything else, so it matches whatever brand is active. An app that needs to restyle the popover beyond
what the token set covers targets the **`akira-tour`** class, passed to `driver.js` as `popoverClass`; it is
present on every tour popover this block renders. See the migration note in
[Adoption Guide](05-adoption-guide.md) for the older `nosferry-tour` class name this replaced.

## Two-factor

A headless two-factor family: the setup dialog and its steps, the code form used at sign in, the recovery
codes panel, and the disable control. The package owns the flow, the layout and the states. It never
generates a secret, never draws a QR code and never decides whether a code is correct; the app's server does
all three and passes the results down.

```tsx
import {
    TwoFactorSetupDialog,
    TwoFactorChallenge,
    TwoFactorRecoveryCodes,
    TwoFactorDisableButton,
} from '@akira-io/ui/blocks';

<TwoFactorSetupDialog
    open={open}
    onOpenChange={setOpen}
    qrCodeSvg={qrCodeSvg}
    manualSetupKey={setupKey}
    recoveryCodes={recoveryCodes}
    errors={errors.code}
    onRequestSetupData={loadSetupData}
    onConfirm={(code) => confirmTwoFactor(code)}
/>;
```

### How the QR code arrives

The block renders whatever the app hands it, and there is no QR dependency in the package.

| Prop | Type | Use it when |
| --- | --- | --- |
| `qrCode` | `ReactNode` | The app renders its own node: an `<img src={dataUri} />`, a component from a QR library, anything. Takes precedence over `qrCodeSvg`. |
| `qrCodeSvg` | `string` | The server returns SVG markup, as Fortify's `two_factor_qr_code_svg` does. It is injected as markup, so it must come from your own server and never from user input. |

Neither prop is required. Until one of them or `manualSetupKey` arrives, the dialog holds a pending state, so
`onRequestSetupData` can fetch in the background.

The otpauth secret is never written to a URL, a log line or an input value. The setup key is masked until the
reader asks for it, and the recovery codes are hidden until revealed.

### The flow

`scan` (QR plus the manual key) to `confirm` (the code form) to `recovery` (the codes, once). `onConfirm` may
return a promise: while it is pending the submit control is disabled and the dialog stays on `confirm`. A
rejected promise renders its `Error.message`, so a server rejection keeps the user in the flow with the
reason on screen. Errors passed down through `errors` render the same way, one line each.

| Export | Key props | Notes |
| --- | --- | --- |
| `TwoFactorSetupDialog` | `open`, `onOpenChange`, `enabled?`, `qrCode?`, `qrCodeSvg?`, `manualSetupKey?`, `recoveryCodes?`, `errors?`, `onConfirm`, `onRequestSetupData?`, `onRegenerateRecoveryCodes?`, `onCompleted?`, `labels?` | Owns the step machine. `enabled` opens straight on the recovery step for an account that already has two-factor on. |
| `TwoFactorScanStep` | `qrCode?`, `qrCodeSvg?`, `manualSetupKey?`, `labels?` | The QR panel plus the manual entry key with reveal and copy. |
| `TwoFactorVerifyForm` | `onSubmit(code, mode)`, `errors?`, `allowRecoveryCode?`, `length?` (default `6`), `autoFocus?`, `submitLabel?`, `footer?`, `labels?` | Built on the package's `InputOTP`; there is no second OTP input. With `allowRecoveryCode` it switches to a plain field and reports `mode` as `'recovery'`. |
| `TwoFactorChallenge` | `onSubmit(code, mode)`, `errors?`, `allowRecoveryCode?` (default `true`), `title?`, `description?`, `footer?`, `labels?` | The sign-in form: a heading and the verify form. |
| `TwoFactorRecoveryCodes` | `codes`, `defaultRevealed?`, `onRegenerate?`, `showHeading?`, `labels?` | Hidden until revealed, copies every code in one go, offers regeneration only when `onRegenerate` is given. |
| `TwoFactorDisableButton` | `onDisable`, `disabled?`, `variant?`, `size?`, `labels?` | Routes through `ConfirmDialog`; `onDisable` runs only after the confirmation. |

### Copying

The family ships no copy affordance of its own. The setup key and the recovery codes are copied with the
package's `CopyButton`, driven with `copyLabel` and `copiedLabel` from `TwoFactorLabels`. Where
`navigator.clipboard` is absent, as on an insecure origin, `CopyButton` reports through `onCopyFailed` and
`TwoFactorRecoveryCodes` renders `copyFailedLabel` so the reader can select the codes by hand.

### Labels

Every string is in `TwoFactorLabels`, exported with its English defaults as `twoFactorLabels`. Each component
takes `labels?: Partial<TwoFactorLabels>` and merges it over the defaults, so a consumer overrides only what
it needs. `twoFactorLabelsPt` in `@akira-io/ui/locales/pt` is the shipped Portuguese set.

```tsx
<TwoFactorChallenge onSubmit={verify} labels={twoFactorLabelsPt} />;
```

---

[← Theming](07-theming.md) · Next: [Contributing →](09-contributing.md)
