# Components

Almost every component is a named export from the package root:

```tsx
import { Button, Card, CardHeader, CardTitle, cn } from '@akira-io/ui';
```

`cn` (the `clsx` + `tailwind-merge` helper) is exported too. All 73 entries below share the same import
path, `@akira-io/ui`, except the families whose dependencies are optional peers, which ship from their own
subpath so an app that never uses them never installs them:

| Subpath | Exports | Needs |
| --- | --- | --- |
| `@akira-io/ui/charts` | `AreaChart`, `BarChart`, `LineChart`, `DonutChart`, `ChartContainer` and its helpers, `CHART_PALETTE` | `recharts` |
| `@akira-io/ui/data-table` | `DataTable`, `FacetedFilter`, `ServerFacetedFilter`, `RowActionsMenu`, and the `Column`, `ColumnDef`, `FilterFn`, `Row`, `TableInstance` types | `@tanstack/react-table` |
| `@akira-io/ui/form` | `Form`, `FormField`, `FormItem`, `FormLabel`, `FormControl`, `FormDescription`, `FormMessage`, `useFormField` | `react-hook-form` |
| `@akira-io/ui/code` | `json-viewer` | `shiki` |

There is no per-component subpath beyond the family subpaths named here.

Two families are kept off the root. The code family, `Code`, `CodeBlock` and `JsonViewer`, ships from
`@akira-io/ui/code` so its optional Shiki import never reaches an app that does not display code: `Code` and
`CodeBlock` are listed in [Code](10-code.md) rather than in the table below, while `json-viewer` also appears
under Data because that is where a JSON viewer is looked for. The editor ships from `@akira-io/ui/editor` and
is listed in [Editor](09-editor.md).

## Preview site

The "Preview" column links to hosted component demos as they are published. Entries without a demo yet read
**Pending**.

## Catalog

The full shadcn/ui (New York) set, plus a few additions kept alongside it.

### Primitives & layout (35)

| Component | Preview |
| --- | --- |
| `accordion` | Pending |
| `alert` | Pending |
| `alert-dialog` | Pending |
| `appearance-toggle` | Pending |
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
| `floating-sheet` | Pending |
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
| `status-badge` | Pending |
| `tabs` | Pending |
| `text-link` | Pending |
| `tooltip` | Pending |

### Forms (20)

| Component | Preview |
| --- | --- |
| `calendar` | Pending |
| `checkbox` | Pending |
| `combobox` | Pending |
| `date-picker` | Pending |
| `date-range-filter` | Pending |
| `dropzone` | Pending |
| `field` | Pending |
| `field-error` | Pending |
| `form` | Pending |
| `input` | Pending |
| `input-otp` | Pending |
| `label` | Pending |
| `password-input` | Pending |
| `radio-group` | Pending |
| `select` | Pending |
| `slider` | Pending |
| `switch` | Pending |
| `textarea` | Pending |
| `toggle` | Pending |
| `toggle-group` | Pending |

### Data (10)

| Component | Preview |
| --- | --- |
| `area-chart` | Pending |
| `bar-chart` | Pending |
| `chart` | Pending |
| `data-table` | Pending |
| `data-table-faceted-filter` | Pending |
| `data-table-row-actions` | Pending |
| `donut-chart` | Pending |
| `json-viewer` | Pending |
| `line-chart` | Pending |
| `table` | Pending |

### Feedback & misc (8)

| Component | Preview |
| --- | --- |
| `command` | Pending |
| `confirm-dialog` | Pending |
| `copy-button` | Pending |
| `empty-state` | Pending |
| `save-status` | Pending |
| `sonner` (toasts) | Pending |
| `spinner` | https://ui.akira-io.com/components/spinner/ |
| `toast` | Pending |

## Slot names

Every component renders `data-slot` on the element it owns, and every component takes a `slotName` prop that
renames it. The attribute is written after the component spreads its props, which is what makes the name
belong to the component rather than to whoever wraps it: Radix wrappers such as `DialogTrigger asChild`,
`PopoverTrigger asChild` and `FieldControl` push their own props into the child, and a slot arriving that way
is discarded on purpose.

```tsx
<Combobox />                          // data-slot="combobox"
<Combobox slotName="holder-picker" /> // data-slot="holder-picker"
```

A component that composes another names the element it is responsible for. `Combobox` renders a `Button` and
passes `slotName="combobox"`, so the trigger reads as a combobox rather than as a button.

Elements a component renders inside itself, which no caller can reach, keep a literal: `button-content`,
`checkbox-indicator`, `code-block-gutter`. Those are parts, not the component, and nothing wraps them.

`FieldControl` is the exception that proves the rule. It renders no element of its own, so it claims no slot
and marks its child with `data-field-control="true"` instead.

## Notable customizations

- **`button`**: pill radius (`rounded-2xl`), a lifted shadow, and a hover/active scale on the `default`
  variant. Variants: `default`, `destructive`, `outline`, `secondary`, `ghost`, `link`. Sizes: `default`,
  `sm`, `lg`, `icon`, `icon-sm`, `icon-lg`. Without a `tone` every variant reads its color from a fixed
  token: `default` and `link` from `--primary`, `destructive` from `--destructive`. See
  [Button tones](#button-tones) for the prop that changes which token a variant reads. The same is true across the catalog: `checkbox`,
  `switch`, `input`, `select`, `textarea`, `dropdown-menu`, `sidebar`, `confirm-dialog` and
  `data-table-row-actions` all follow `--primary` for their brand-colored surfaces, hover tints and focus
  rings, so setting `data-brand` recolors them along with everything else. The pale hover/focus tint used by
  `dropdown-menu` and `sidebar` is `bg-primary/10` with `text-primary` rather than a dedicated ramp step, since
  the token system does not expose one; it still carries the brand hue at any preset. Danger and negative
  states (the `destructive` button variant, `confirm-dialog`'s destructive variant, the row action marked
  `variant: 'destructive'`, `localized-fields` validation errors, and `stat-card`'s negative trend) read
  `--destructive` instead. Destructive states read `--destructive`; they use the package default unless the
  active preset supplies a complete destructive pair, as Nos Ferry does. `loading`
  disables the native button, sets `aria-busy`, keeps the original content mounted to preserve width, and
  overlays a Spinner sized to the current Button size. `loadingLabel` overrides the Spinner's accessible
  "Loading" label. `slotName` renames the rendered `data-slot`, which is how a component built on `Button`
  labels its own element: `Combobox` passes `slotName="combobox"`, `DateRangeFilter` passes
  `slotName="date-range-filter"`. A `data-slot` prop handed to `Button` is ignored on purpose, because Radix
  `Slot` wrappers such as `DialogTrigger asChild` push their own `data-slot` onto the child, and a button
  inside one of those is still a button.
- **`spinner`**: sizes are `sm`, `default`, and `lg`; it inherits current text colour, exposes a polite
  status label, and stops rotating when reduced motion is requested.
- **`date-picker`**: the single-date sibling of `date-range-filter`. The trigger carries the same field
  surface, height and focus ring as `Input`, so a form does not show two field designs side by side. It takes
  `value` for a controlled field and `defaultValue` for an uncontrolled one, reports through
  `onChange(date | undefined)`, and closes the popover as soon as a day is picked. `minDate`, `maxDate` and
  the `disabledDays` predicate render the days they exclude as disabled buttons, so an out-of-range day
  cannot be picked. A value clears through the explicit clear control rather than by picking the same day
  twice; pass `clearable={false}` for a required field. `placeholder`, `clearLabel` and `dateFormat` are
  overridable labels with English defaults (`datePickerLabelsPt` ships the Portuguese set), and `formatDate`
  replaces the formatter outright for a locale `date-fns` patterns cannot express. Both it and
  `date-range-filter` render the same `Calendar` inside the same popover mechanics, and both format their
  trigger with the `dateLocale` of `UiLocaleProvider`.
- **`calendar`**: takes its `locale` from the prop, then from the `dateLocale` of `UiLocaleProvider`
  (`useUiDateLocale()` reads it back), and falls back to English. The month dropdown of
  `captionLayout="dropdown"` names the months in that locale, never in the browser's language.
- **`appearance-toggle`**: light, dark and system in one control, reading and writing through the same
  `useAppearance` hook the shells export, so there is no second source of truth for the theme. `variant`
  selects the presentation: `segmented` (the default, a `ToggleGroup` for settings pages, with arrow-key
  selection) or `menu` (a `DropdownMenu` radio group for headers and user menus). Each option carries a
  visible text label next to its icon, and the four strings are overridable through `labels`
  (`appearanceToggleDefaultLabels` in English, `appearanceToggleLabelsPt` from `@akira-io/ui/locales/pt`,
  `appearanceToggleLabelsFr` from `@akira-io/ui/locales/fr`, `appearanceToggleLabelsEs` from `@akira-io/ui/locales/es`).
  The system option follows `prefers-color-scheme` live: the hook subscribes to the media query and
  reapplies the class when the operating system flips.
- **`text-link`**: the inline text link, foreground colour with a `--border` underline that comes up to the
  current colour on hover. `asChild` slots any router's link component in, the same escape hatch `Button`
  uses, so the core entry point never imports a router. Variants: `default` and `muted`.
- **`status-badge`**: `Badge` with semantic state variants rather than domain words:
  `neutral | info | success | warning | danger`. Each reads a token pair at a tint (`bg-success/10` with
  `text-success`, and so on), so every state is legible in both colour schemes and the app never maps its
  own states onto literal colours. `dot` adds the small leading indicator tables usually carry; it is
  `aria-hidden`, so the badge's accessible name is always its text.
- **`alert`**: four variants, chosen by how much the reader has to do about it. `default` is neutral
  information the page would still make sense without. `info` is something worth knowing that changes
  nothing the reader must act on, an announcement or a hint. `warning` is a caution: the action ahead will
  work, but it has a consequence worth reading first, a sailing that leaves earlier than usual or a quota
  running low. `destructive` is for something already wrong or about to be lost, and it is the wrong choice
  for anything that is merely a caution. `warning` and `info` read `--warning` and `--info` at the same tint
  the rest of the catalog uses, `bg-warning/10` with `text-warning` and the ring at `/20`, so a caution never
  needs a literal colour in an application. Both name themselves for a screen reader, so the severity does
  not live in the colour alone: `alertDefaultLabels` carries the English pair and `alertLabelsPt` the
  Portuguese one, `labels` overrides a single string, and an `aria-label` from the caller wins over both.
- **`card`**: three axes that compose. `variant` sets how opaque the fill is (`default`, `subtle`, `solid`),
  `inset` recesses the surface instead of raising it, and `flat` keeps the fill and the radius while dropping
  the ring and the shadow. Reach for `flat` when the card lands inside a surface that is already elevated, a
  `FloatingSheet`, a `Dialog` or another card, where a default card reads as a second raised plane. `flat`
  alongside `inset` is allowed and does nothing extra: a recessed surface already carries neither ring nor
  shadow, so `inset` decides the fill and the radius and `flat` is a no-op beside it.
- **`floating-sheet`**: the header and the footer draw no divider. A sheet whose body is a single card
  delimits itself, and the hairlines read as a second frame around it. Compose a `Separator` where a rule
  earns its place, typically between a scrolling body and a pinned row of actions:

  ```tsx
  <FloatingSheet title="Edit passenger">
      <FloatingSheetBody>{fields}</FloatingSheetBody>
      <Separator />
      <FloatingSheetFooter>{actions}</FloatingSheetFooter>
  </FloatingSheet>
  ```

  The panel carries no padding of its own, so the separator spans edge to edge while the header, body and
  footer keep their own `p-5`. `DetailEditSheet` composes one already, since its actions sit below content
  that scrolls.

  `FloatingSheetBody` carries its own scroll shadows: the header gains a shadow once the body scrolls away
  from the top, and the footer gains one while there is more content below the fold. Both fade in and out
  with a transition rather than snapping, and a sheet whose content fits without scrolling shows neither.
  The mechanism is a pair of zero-height sentinels at the start and end of the body's content, watched with
  an `IntersectionObserver` rooted on the body itself — no scroll listener, so a long list stays smooth on a
  phone. This also means the shadows notice content that grows after mount, an accordion expanding inside
  the body for example, without any extra wiring: the observer recomputes on layout changes, not only on
  scroll. A `FloatingSheet` rendered without a `FloatingSheetBody` simply shows neither shadow.
- **`data-table`**: built on TanStack Table, with `data-table-faceted-filter` and `data-table-row-actions`
  alongside it. `flat` carries the same axis `Card` does, and for the same reason: the table keeps its fill,
  its radius and its `p-5` while dropping the ring and the shadow, so a table dropped inside a surface that
  is already elevated does not read as a second raised plane. The pairing this exists for is a table inside
  a tab panel, where `TabsContent padding="none"` gives up the padding and `DataTable flat` gives up the
  surface, and the two read as one continuous card:

  ```tsx
  <TabsContent value="invoices" padding="none">
      <DataTable flat columns={columns} data={invoices} />
  </TabsContent>
  ```

  Its last column is pinned to the right edge, see [Pinned action column](#pinned-action-column).
- **`tabs`**: `TabsContent` takes `padding`, `default` or `none`. The panel always keeps its surface; `none`
  drops only the `p-5`, for the case where the single child already owns the spacing, a `DataTable flat`
  most of all. It is the other half of one decision, so reach for it in that pair rather than alone: a panel
  with no padding and a child with no surface leaves the content unframed.
- **`combobox`**: searches with cmdk's fuzzy scorer, which accepts scattered letters in order. On long lists
  of structured values, such as IANA time zones, pass `filter` with cmdk's signature
  `(value, search, keywords?) => number` to match differently. It receives the option `label`, the text
  cmdk sees, and `onChange` still reports the original `option.value`, casing and underscores included.

  ```tsx
  <Combobox
      value={timezone}
      options={timezones.map((zone) => ({ value: zone, label: zone.replaceAll('_', ' ') }))}
      onChange={setTimezone}
      filter={(label, search) => (label.toLowerCase().includes(search.toLowerCase()) ? 1 : 0)}
  />
  ```
- **`confirm-dialog`**, **`combobox`**, **`field`**, **`field-error`**, **`password-input`**: additions to the
  stock shadcn/ui set, kept because enough consuming apps needed them.

## Table bleed

A table inside a `Card` sits inside the card's horizontal padding, so its rows stop short of the card edges
and its first column does not line up with the card title. `bleed` fixes both at once.

```tsx
<Card>
    <CardHeader>
        <CardTitle>Recent customers</CardTitle>
    </CardHeader>
    <CardContent>
        <Table bleed>{rows}</Table>
    </CardContent>
</Card>
```

- **The rows reach the card edges, the content does not.** The table pulls itself out by the padding a card
  gives its children and puts that padding back on the first and last cell, so a separator runs the full
  width while the first column starts where the title starts.
- **It drops its own surface.** A bleeding table is inside a card that already draws one, so it renders
  without the radius, the shadow, the ring and the fill it uses when it stands alone, scroller included.
  Inside an ordinary `Card` most of that was already neutral; inside a `Card inset`, where the card paints a
  recessed surface, it is what stops a card-colored band with rounded corners sitting on top of it.
- **`data-bleed` marks it**, next to `data-inset` and `data-flat` on `Card`, for a consumer that needs to
  style around it.

The padding it assumes is the one `CardHeader`, `CardContent` and `CardFooter` use, and it is assumed, not
measured. A container with different horizontal padding needs its own margins rather than this prop:
`DataTable`, which pads its own shell by a different amount, is one of those and does not use `bleed`.

## Pinned action column

The last column of a `DataTable` stays pinned to the right edge while the table scrolls sideways, so the row
menu is reachable on a narrow screen without scrolling to the end of the row. There is no prop for it: it is
what a `DataTable` does.

- **The cell, not the row.** Only `th:last-child` and `td:last-child` are positioned; `TableRow` is untouched.
  Giving the row an opaque fill from outside would cancel the `hover:bg-muted/50` it already carries, and
  leaving the pinned cell transparent lets the other columns scroll straight under the menu button.
- **The pinned cell repaints the row's states.** It is painted over the row, so the row's own hover never
  shows through it. It reads `--sticky-cell` at rest, then `--sticky-cell-hover`,
  `--sticky-cell-selected` and `--sticky-cell-active` for the three states `TableRow` carries. The hover value
  is `color-mix(in srgb, var(--muted) 50%, var(--card))`, the same sRGB compositing `bg-muted/50` does over
  the card fill, and it is what makes the cell and the row read as one hover rather than two.
- **It transitions on the same timing `TableRow` does.** Without a transition on the cell the row fades while
  the cell snaps, and the two read as separate hovers.
- **The shadow only while something is hidden.** The cell casts `--scroll-shadow-start` over the columns
  behind it, and only then: `useHorizontalOverflow` watches the table's scroll container with a scroll
  listener and a `ResizeObserver`, so the shadow fades out at the end of the scroll, never shows on a table
  that fits, and notices a table that grows after mount.
- **Custom rows are covered.** The selectors live on the `<table>` element, so a `renderRow` that builds its
  own `TableRow` gets the pinned column without passing anything.
- **A cell that spans columns is never pinned.** The selectors exclude `[colspan]`, so the empty state, a
  detail row a `renderRow` opens under a record and a spanning footer cell all scroll with the rest. Pinning
  one of those would slide a full-width cell around under the scroll.
- **A row that opts out of hover still lights its pinned cell.** The states are read from the row's own
  `:hover`, `data-state` and `data-active`, so a `renderRow` that renders `hover:bg-transparent` gets a
  pinned cell that highlights alone. Give such a row `data-active` or leave the hover in place.

`Table` takes `scrollRef` for the same reason a `DataTable` needs it: the ref lands on the element that owns
`overflow-x-auto`, which is the only place the hidden width can be measured. On its own the prop changes
nothing.

## Capping column width

`truncateCells` caps every column except the pinned one at `18rem` and ellipsizes what does not fit. The cap
holds even for a single unbreakable token, a URL or a hash, which would otherwise widen its column without
limit.

```tsx
<DataTable truncateCells columns={columns} data={requests} />
```

It is off by default, because a table that reflows its text is the right answer more often than one that
hides it. Reach for it where one free-text column would otherwise push every other column, the pinned one
included, out of a narrow screen.

## Button tones

A variant decides the shape of a button: filled, outlined, quiet. A tone decides which token it reads. Until
now the two were welded together, so `default` was always primary and only `destructive` could be red.

```tsx
<Button tone="success">Approve</Button>
<Button variant="outline" tone="warning">Archive</Button>
<Button variant="ghost" tone="destructive">Remove</Button>
```

`tone` takes `primary`, `destructive`, `success`, `warning` or `info`, and works on every variant:
`default`, `destructive`, `outline`, `secondary`, `ghost` and `link`. The element carries it as
`data-tone`, next to `data-variant` and `data-size`. `CopyButton` takes it too and passes it down.

- **One variable, every variant.** The tone sets `--btn` and `--btn-foreground` on the element, pointing at
  that token pair, and the variants paint from those: a solid fill, a 30 percent ring with a 10 percent hover
  wash, a 14 percent tinted surface, a bare hover tint. The focus ring follows the tone too.
- **The tokens, not the Tailwind theme layer.** `--btn` reads `--success` rather than `--color-success`,
  because Tailwind drops a theme variable no utility class mentions, and an inline style is not a class it can
  see. Reading the semantic token directly means a tone cannot vanish depending on what else the app happens
  to use.
- **Untoned buttons are untouched.** Without `tone` every variant renders the classes it rendered before, so
  nothing in an existing app moves.
- **It is `tone`, not `color`.** React already declares a `color` attribute on `<button>`, and a component
  prop of that name breaks every caller that spreads button props into a `Button`, our own `calendar` among
  them.

## Field family

`Field` pairs a label, a description, an error and a control, and owns the ids that tie them together. The
control is whatever the caller puts inside `FieldControl`: `Input`, `Textarea`, `PasswordInput`, `Switch`,
`Checkbox`, `RadioGroup`, `InputOTP`, `DatePicker`, `Combobox`, `DateRangeFilter` or anything else that takes
`id`, `aria-describedby`, `aria-invalid` and `required`. For a select, wrap `SelectTrigger` rather than
`Select`: the root renders no element of its own, so props handed to it never reach the trigger.

`FieldControl` renders no element of its own either, so it marks the control it wraps with
`data-field-control="true"` rather than a `data-slot`. The control keeps the slot it owns: an `Input` inside a
field is still `data-slot="input"`, a `Combobox` is still `data-slot="combobox"`.

```tsx
import { Field, FieldControl, FieldDescription, FieldGroup, FieldLabel, Input, Switch } from '@akira-io/ui';

<FieldGroup>
    <Field required error={errors.name}>
        <FieldLabel>Display name</FieldLabel>
        <FieldDescription>Shown on your public profile.</FieldDescription>
        <FieldControl>
            <Input name="name" />
        </FieldControl>
    </Field>

    <Field orientation="horizontal">
        <FieldLabel>Weekly digest</FieldLabel>
        <FieldDescription>One email every Monday.</FieldDescription>
        <FieldControl>
            <Switch name="digest" />
        </FieldControl>
    </Field>
</FieldGroup>
```

- **Ids.** `Field` generates the control id, or takes one through its own `id` prop. `FieldLabel` points at
  it, and `FieldControl` receives it. A control must not carry an id of its own, since the label follows the
  field rather than the control.
- **Description.** `aria-describedby` names the description only while one is rendered, and adds the error
  once the field is invalid.
- **Invalid.** `error` sets `aria-invalid` on the control, colours the label and renders `FieldError` at the
  end of the field. `invalid` sets the same state without a message, for the case where the message lives
  elsewhere. On a control that carries its own `invalid` prop (`DatePicker`, `Combobox`), an explicit
  `aria-invalid` from the caller wins: `invalid` only fills the gap when none was given.
- **Required.** `required` sets the control's `required` attribute and marks the label with an asterisk,
  named for screen readers by `requiredLabel` on `FieldLabel`. That name resolves through the English default
  (`fieldLabels`, `Required`), then the `field` section of `UiLocaleProvider`, then the `requiredLabel` prop,
  so an app wrapped in `ptLabels`, `frLabels` or `esLabels` translates it with everything else. Controls whose element is
  a `button` (`DatePicker`, `Combobox`) carry `aria-required` instead, since `required` is not an attribute a
  button has.
- **Slider.** `Slider` is not part of this set. Its accessible element is the thumb, and the props land on the
  root, so a field wrapping it would look wired without being announced. Label it directly.
- **Orientation.** `orientation="horizontal"` puts the label and description beside the control, which is the
  arrangement a switch or checkbox row wants.
- **Rhythm.** `FieldGroup` carries the vertical spacing between fields, so a form does not hand-space itself.
- **Surface.** The family paints none. A settings card is composed by the caller, as everywhere else.

`FieldError` is unchanged for existing callers: given a `message` it renders, given nothing it renders
nothing. Inside a `Field` it also picks up the id the field describes the control with.

## Password input

`PasswordInput` is an `Input` with a reveal control. It forwards every `Input` prop and renders the same
field surface, so a password manager sees a real `input` with the caller's `name` and `autoComplete`.

```tsx
import { PasswordInput } from '@akira-io/ui';

<PasswordInput name="password" autoComplete="current-password" />
```

- The control toggles the input between `password` and `text` on the same element, so the value, the caret
  and the focus survive the toggle.
- Its accessible name follows the state, `Show password` or `Hide password`, overridable through `showLabel`
  and `hideLabel`, and the state is exposed through `aria-pressed`.
- `revealable={false}` drops the control for callers who do not want revealing.
- There is no strength meter and no validation rule here; both are the application's policy.

## Dropzone

`Dropzone` replaces `Input type="file"`, which renders the browser's own control inside the library's box:
Chrome writes "Choose File No file chosen" in its own font, in English, and none of it can be styled. The
drop area, the trigger, the chosen file's name and size, the error and the progress bar are all the library's.

```tsx
import { Dropzone } from '@akira-io/ui';

<Dropzone
    accept={{ 'application/pdf': ['.pdf'] }}
    maxSize={5 * 1024 * 1024}
    error={errors.invoice}
    progress={progress?.percentage}
    onFilesChange={([invoice]) => setData('invoice', invoice ?? null)}
/>
```

- **One file by default.** `multiple` takes many and appends each drop to the list; without it a drop
  replaces what was there. `onFilesChange` always receives the whole list, so the two cases read alike.
- **Controlled or not.** Given `files` the component renders that list and nothing else; without it, it keeps
  its own and still reports every change.
- **The full single-file state stops inviting.** With one file chosen and no `multiple`, the drop area, its
  label and its trigger are not rendered: what is left is the file, its size and the control that removes it,
  and replacing means removing first. Under `multiple` the area stays, because another file still fits. The
  error and the progress bar show in both.
- **It never uploads.** Whoever owns the request owns the percentage: pass `progress` and it renders the bar
  labelled for a screen reader. With Inertia that is `useForm`, which reports it while the file is being sent.
- **Rejections.** `accept`, `maxSize` and `maxFiles` are checked before the file reaches `onFilesChange`; the
  first rejection becomes the error message and `onRejected` receives all of them. An `error` prop from the
  server outranks it.
- **Disabled** takes neither a click, a drop nor the drag highlight.
- **No form field.** A dropped file never lands in the hidden `input`, so the component reports through
  `onFilesChange` and the caller sends it; there is no `name` to submit with a plain HTML form.
- **The drag itself** is `react-dropzone`: `dragenter` and `dragleave` fire on children too, so a
  hand-rolled zone flickers or sticks when the pointer crosses the text inside it.

## Charts

`ChartContainer` and its tooltip, legend and style helpers stay the recharts primitives, with one change:
`ChartStyle` normalizes a series key into a name a custom property can carry, and drops a color value that
would escape the style element. On top of them the library ships four components that cover the charts an
application actually draws, so a dashboard declares its data instead of wiring axes.

```tsx
import { AreaChart, BarChart, DonutChart, LineChart } from '@akira-io/ui/charts';

<AreaChart
    data={traffic}
    series={['visitors', 'signups']}
    xKey="date"
    xScale="time"
    xFormat={{ month: 'short', day: 'numeric' }}
    legend
/>;
```

`AreaChart`, `BarChart` and `LineChart` share one prop set, minus the props that belong to one shape:
`curve` and `dots` are line and area only, `barSize`, `barRadius`, `horizontal` and `variant` are
bar only, `valueLabels` is bar and line only, `fill` is area only, and each component's type omits the
ones it does not use.

| Prop | Type | Required | Notes |
| --- | --- | --- | --- |
| `data` | `Record<string, unknown>[]` | Yes | One entry per point on the category axis. |
| `series` | `(string \| ChartSeries)[]` | Yes | A key, or `{ key, label, color, stackId }`. |
| `xKey` | `string` | Yes | The field the category axis reads. |
| `config` | `ChartConfig` | No | The recharts config; labels and colors set here win over the palette. |
| `curve` | `'smooth' \| 'linear' \| 'step'` | No | Line and area only. Defaults to `smooth`. |
| `stacked` | `boolean` | No | Stacks every series that has no `stackId` of its own. A bar stack puts positive values above zero and negative ones below it. |
| `grid` / `legend` / `tooltip` | `boolean` | No | Grid and tooltip are on, the legend is off. |
| `xAxis` / `yAxis` | `boolean` | No | Both on. |
| `xScale` | `'categorical' \| 'linear' \| 'time'` | No | Picks the formatter `xFormat` feeds. It does not change the axis itself, which stays categorical: points are drawn evenly spaced whatever their values. |
| `xFormat` / `yFormat` | Intl options | No | `Intl.DateTimeFormatOptions` on a time axis, `Intl.NumberFormatOptions` otherwise. Without `xFormat` a time axis abbreviates the month: `5 jan`, or `jan 2026` when every date opens a month. `yFormat` shapes the value axis as given, compact notation included; the tooltip prints an exact version of it (see `tooltipFormat`). |
| `locale` | `string` | No | The locale every formatter uses, the tooltip included. |
| `tooltipFormat` | `Intl.NumberFormatOptions` | No | The tooltip values. Defaults to the exact version of `yFormat`: no compact notation, the `style`, `currency`, `currencyDisplay` and `unit` kept, and no decimals for currencies and counts, so a `102,6 M CVE` axis shows `102 600 000 CVE` in the tooltip. A percent (`style: 'percent'` or `unit: 'percent'`) keeps the decimals of `yFormat`. |
| `tooltipDetail` | `(datum) => ReactNode` | No | Extra content under the tooltip values, from the hovered row. |
| `yDomain` | `[number \| 'auto', number \| 'auto'] \| 'symmetric'` | No | The bounds of the value axis. With two numbers, or `'symmetric'`, the axis gets rounded ticks: steps of 1, 2, 2.5 or 5 times a power of ten, about five of them, with 0 among them when the domain crosses it. `'symmetric'` centres the axis on zero, from minus to plus the largest absolute value rounded up (a stack adds up each side of zero on its own). Omitted or `'auto'` leaves the bounds and ticks to the data; a log scale keeps its own ticks. |
| `yScale` | `'linear' \| 'log'` | No | Defaults to `linear`. A log scale starts at the smallest positive value when its lower bound is `auto` or not above zero. |
| `referenceLines` | `{ x?, y?, label? }[]` | No | Dashed lines: `y` at a value, `x` at a category. A value line outside the data widens the domain to stay in view. |
| `valueLabels` | `boolean \| Intl.NumberFormatOptions` | No | Bar and line only. Prints each value on its mark. With `true` the labels use a short compact notation (`103 M`) that keeps a percent or a unit from `yFormat` but not its currency, which the axis already shows; an options object is used as given. A value of `0`, `null`, `undefined` or `NaN` gets no label. In a stack the label sits inside its segment and is left out when the segment is shorter than a line of text (16px) or narrower than the text, estimated at 0.6 of the 12px label size per character. A vertical bar outside a stack drops its label when the text is wider than the bar, so labels of neighbouring columns never overlap. Horizontal bars reserve a right margin as wide as the longest label, so it is never cut. |
| `variant` | `'bar' \| 'lollipop'` | No | Bar only. A lollipop draws a stem and a dot, with `colorBy` and `horizontal`. |
| `fill` | `'solid' \| 'gradient'` | No | Area only. A gradient fades from the series color. |
| `horizontal` | `boolean` | No | Swaps the axes, so bars run sideways. |
| `barSize` / `barRadius` | `number` | No | Bar only. In a stack, each side of the bar (above and below zero) is clipped as a whole, so the segments stay square and only the ends of that side are rounded, with a radius of at most a sixth of the bar's thickness and half of that side's length. A bar outside a stack keeps the full `barRadius`. |
| `dots` | `boolean` | No | Line and area only. |
| `colorBy` | `'series' \| 'category' \| (datum, index) => string` | No | Bar only. Defaults to `series`. See below. |
| `animate` | `boolean` | No | Off. Marks are painted on the first render. |

A bar chart with one series paints every bar the same color, which is right for a trend and wrong for a
ranking, a value per route or a figure per departure time. `colorBy` moves the color from the series to the
row:

- `'series'` keeps one color per series, as every chart did before the prop existed.
- `'category'` gives row `n` of `data` the palette color `n`, cycling through `--chart-1` to `--chart-8`.
- A function receives each row and its index and returns any CSS color, so a chart can color by sign or by
  state with the theme tokens: `var(--chart-3)`, `var(--destructive)`, `var(--muted-foreground)`.

```tsx
<BarChart
    data={revenueByRoute}
    series={[{ key: 'revenue', label: 'Revenue' }]}
    xKey="route"
    colorBy="category"
    horizontal
    legend
/>;

<BarChart
    data={balanceByRoute}
    series={[{ key: 'value', label: 'Balance' }]}
    xKey="route"
    colorBy={(d) => (Number(d.value) < 0 ? 'var(--destructive)' : 'var(--chart-1)')}
/>;
```

Once the color belongs to the row, the tooltip indicator takes the color of the hovered bar and the legend
lists the categories, labelled like the category axis, instead of the series. With several series every bar
of a row shares that row's color, stacked or side by side, so the series are told apart by the tooltip
rather than by color: keep `'series'` when the series are what the reader compares.

The value axis takes its bounds, scale and reference lines from the chart:

```tsx
<BarChart data={north} series={['sailings']} xKey="month" yDomain={[0, 400]} />;
<BarChart data={south} series={['sailings']} xKey="month" yDomain={[0, 400]} />;

<LineChart
    data={occupancy}
    series={['rate']}
    xKey="week"
    yDomain={[0, 100]}
    yFormat={{ style: 'unit', unit: 'percent' }}
    referenceLines={[{ y: 85, label: 'Target' }]}
/>;

<BarChart
    data={balanceByMonth}
    series={['balance']}
    xKey="month"
    yDomain={[-500, 500]}
    referenceLines={[{ y: 0 }]}
    colorBy={(d) => (Number(d.balance) < 0 ? 'var(--destructive)' : 'var(--chart-1)')}
/>;

<BarChart
    data={flowsByMonth}
    series={['income', 'costs']}
    xKey="month"
    stacked
/>;
```

A balance that swings both ways reads best around a centred zero. `'symmetric'` finds the largest absolute
value, rounds it up and mirrors it, so a peak of 25 296 gives an axis from -30 000 to 30 000 with ticks every
10 000:

```tsx
<BarChart
    data={balanceByMonth}
    series={['balance']}
    xKey="month"
    yDomain="symmetric"
    referenceLines={[{ y: 0 }]}
    colorBy={(d) => (Number(d.balance) < 0 ? 'var(--destructive)' : 'var(--chart-1)')}
/>;
```

The tooltip formats its values like the value axis, with the same `locale`, and `tooltipDetail` adds context
the series cannot carry:

```tsx
<BarChart
    data={ticketsByTeam}
    series={['open']}
    xKey="team"
    locale="pt-PT"
    tooltipFormat={{ maximumFractionDigits: 0 }}
    tooltipDetail={(d) => `${d.open} of ${d.total} tickets`}
/>;
```

Rankings read better as lollipops with the value printed on each one, and a trend area can fade instead of
filling flat:

```tsx
<BarChart
    data={revenueByRoute}
    series={['revenue']}
    xKey="route"
    variant="lollipop"
    colorBy="category"
    horizontal
    valueLabels={{ style: 'currency', currency: 'EUR', notation: 'compact' }}
/>;

<AreaChart data={traffic} series={['visitors']} xKey="date" xScale="time" fill="gradient" />;
```

`DonutChart` takes a flat list and renders the ring, the center figure and the legend as one component:

```tsx
<DonutChart
    data={[
        { label: 'Subscriptions', value: 61440 },
        { label: 'Services', value: 30720 },
    ]}
    label="Total revenue"
    format={{ style: 'currency', currency: 'USD', notation: 'compact' }}
/>;
```

| Prop | Type | Required | Notes |
| --- | --- | --- | --- |
| `data` | `Record<string, unknown>[]` | Yes | One entry per slice. |
| `valueKey` / `labelKey` | `string` | No | Default to `value` and `label`. |
| `config` | `ChartConfig` | No | Keyed by slice label. |
| `innerRadius` | `number \| string` | No | Defaults to `65%`. |
| `legend` | `false \| 'right' \| 'bottom'` | No | Defaults to `right`. |
| `legendValue` | `'percentage' \| 'value' \| 'none'` | No | What each legend row states. |
| `label` / `value` | `ReactNode` | No | The center caption and figure. Without `value` the slices are summed. |
| `children` | `ReactNode` | No | Replaces the center entirely. |
| `cornerRadius` / `paddingAngle` | `number` | No | The rounding and the gap between slices. |
| `format` | `Intl.NumberFormatOptions` | No | Applied to the center figure and the legend values. The tooltip prints its exact version, as `tooltipFormat` does for the cartesian charts. |
| `locale` | `string` | No | The locale that formatting uses. |
| `tooltip` | `boolean` | No | On. |
| `animate` | `boolean` | No | Off, for the reason below. |
| `slotName` | `string` | No | Renames the rendered `data-slot`. |

- **Colors come from the palette.** A series or slice with no color in the `ChartConfig` takes
  `--chart-1` through `--chart-8` in order, so two charts on a page agree without a shared constant. See
  [Theme and tokens](02-theme-and-tokens.md).
- **Two keys that read alike stay apart.** A key becomes a custom property name, so `new signups` and
  `new-signups`, or two slices labelled the same, would collide; the second one is suffixed instead of
  taking the first one's color.
- **A donut reads negative values as zero.** A ring cannot show a share below nothing, and a mixed sign
  total makes every percentage meaningless. Chart signed data with a bar chart instead.
- **Nothing animates in by default.** recharts drives its entry animation from `requestAnimationFrame`,
  which a browser freezes in a background tab, and a donut in that state paints no ring at all: the sector
  groups mount and stay empty. That costs a screenshot, a prerender or a test the whole chart, so the charts
  render their final state immediately. `animate` turns the entry animation back on.
- **recharts is an optional peer.** Install it in the app; only `@akira-io/ui/charts` imports it.

## Command dialog

`CommandDialog` wraps a cmdk `Command` in a `Dialog`. Its own props go to the `Dialog`; `commandProps` goes to
the `Command` inside, so the palette can take cmdk's `shouldFilter`, `filter`, `value`, `onValueChange` or
`loop`. A `className` there is added to the dialog's own item spacing rather than replacing it.

When the items come from a server search that already matched the query, turn cmdk's fuzzy filter off so it
neither hides results nor keeps unrelated static entries, and the first item stays selected for Enter:

```tsx
import { CommandDialog, CommandInput, CommandItem, CommandList } from '@akira-io/ui';

<CommandDialog open={open} onOpenChange={setOpen} commandProps={{ shouldFilter: false }}>
    <CommandInput value={query} onValueChange={setQuery} />
    <CommandList>
        {results.map((result) => (
            <CommandItem key={result.id} value={result.id} onSelect={() => visit(result.url)}>
                {result.label}
            </CommandItem>
        ))}
    </CommandList>
</CommandDialog>;
```

## Empty state

The one empty state for anything with nothing to show: a list before a user has populated it, a filtered
table, a search that matched nothing, a not-found page body. The icon sits in the same circular treatment
`CommandEmpty` uses, so the two read as one design rather than two.

It paints no surface of its own and fills the height of whatever contains it, so the same component works as
a page body, inside a `Card`, and inside a table body. `DataTable` renders it, compact, for its own empty
body; pass `emptyLabel` there to change the title.

```tsx
import { Button, EmptyState } from '@akira-io/ui';
import { Inbox } from 'lucide-react';

<EmptyState
    icon={Inbox}
    title="No invoices yet"
    description="Invoices you issue will appear here."
    actions={<Button onClick={createInvoice}>New invoice</Button>}
/>;
```

`EmptyStateProps`:

| Prop | Type | Required | Notes |
| --- | --- | --- | --- |
| `icon` | `LucideIcon` | No | Defaults to `SearchX`, the icon `CommandEmpty` uses. |
| `title` | `string` | No | Outranks the `emptyState` section of `UiLocaleProvider`, then `emptyStateLabels.title` (`Nothing to show`). |
| `description` | `string` | No | |
| `actions` | `ReactNode` | No | Buttons, including an `asChild` link. The component never sets their variant. |
| `compact` | `boolean` | No | The smaller density, for table bodies and small panels. |
| `className` | `string` | No | |

`emptyStateLabels` carries the English default title. `ptLabels`, `frLabels` and `esLabels` translate it through the
`emptyState` section, so an app wrapped in `UiLocaleProvider` passes no title to get its own language.

## Toasts

`Toaster` mounts once, near the root, and every toast is raised through `toast`, which wraps sonner's own
function: the variants, `toast.promise`, `toast.dismiss` and the rest behave as sonner documents them. What
the library adds is the action next to the message.

`toast` replaces the re-export the package used to make of sonner's own function. Everything sonner
documents still works, `toast.promise`, `toast.custom` and `toast.dismiss` included, and every toast now
carries an id of its own, so an id read back from a call is a string rather than a number.

```tsx
import { Toaster, toast } from '@akira-io/ui';

<Toaster position="bottom-right" />;

toast.success('Changes saved.', {
    action: { label: 'Undo', onClick: () => restore(snapshot) },
});
```

An action is `{ label, onClick, onError, href, target, rel, dismiss, className }`; `cancel` takes the same shape and
renders quieter, for the choice that declines. Pass a React element instead and it is rendered untouched.

- **The handler may return anything.** A promise is awaited; anything else is ignored, so raising another
  toast from inside an action stays a single expression.
- **A handler that returns a promise is awaited.** The action shows a spinner and refuses further clicks
  until it settles, and only then does the toast close. A second click that lands before the first render is
  refused too, so an action does not run twice. If the promise rejects, the toast stays open and the
  spinner stops so the action can be tried again. The rejection goes to the descriptor's `onError`; without
  one it is dropped, because a component that lets it escape turns every failed click into an unhandled
  rejection.
- **A long action outlives its toast unless you say so.** The toast keeps counting down while the handler
  runs, so an action slower than `duration` closes under its own spinner. Pass `duration: Infinity` for a
  toast whose action takes real time, and dismiss it when the work ends.
- **A link action does not wait.** The anchor navigates, so `href` and a slow `onClick` do not belong
  together: the handler is fired and the toast dismissed without awaiting anything.
- **`dismiss: false` keeps the toast open** once the handler has run, for an action the user may repeat or
  one that raises its own toast afterwards.
- **`href` renders an anchor**, so a middle click, a modifier click and "open in new tab" behave as the
  browser intends. It is a link, not a button wired to `location`. Any target other than the current
  document gets `rel="noreferrer"`, named targets included, and a scheme that is not `http`, `https`,
  `mailto` or `tel` is refused: a URL that arrives from an API cannot turn an action into script.
- **The close button is on by default.** `<Toaster closeButton={false} />` turns it off.

## Form component

`<Form>` integrates with `react-hook-form`. Install `react-hook-form` in the app (it is an optional peer)
when you use it:

```tsx
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@akira-io/ui/form';
```

## Primitive labels

The shadcn primitives name their controls for screen readers, and those names read from
`UiLocaleProvider` like every other label in the library. An app wrapped in `ptLabels`, `frLabels` or `esLabels` hears
its own language with no prop at all. The English defaults are the text the primitives always carried.

| Section | Component | Labels | Override |
| --- | --- | --- | --- |
| `dialog` | `DialogContent` | `closeLabel` | `closeLabel` prop |
| `sheet` | `SheetContent` | `closeLabel` | `closeLabel` prop |
| `pagination` | `Pagination`, `PaginationPrevious`, `PaginationNext`, `PaginationEllipsis` | `navigationLabel`, `previousLabel`, `previousPageLabel`, `nextLabel`, `nextPageLabel`, `morePagesLabel` | `aria-label` on each part; `label` on `PaginationPrevious`, `PaginationNext` and `PaginationEllipsis` |
| `breadcrumb` | `Breadcrumb`, `BreadcrumbEllipsis` | `navigationLabel`, `moreLabel` | `aria-label` on `Breadcrumb`; `label` on `BreadcrumbEllipsis` |
| `sidebar` | `SidebarTrigger`, `SidebarRail` | `toggleLabel` | `label` on either |
| `carousel` | `Carousel`, `CarouselItem`, `CarouselPrevious`, `CarouselNext` | `carouselLabel`, `slideLabel`, `previousLabel`, `nextLabel` | `aria-roledescription` on the root and items; `label` on the buttons |

Each section's type (`DialogLabels`, `SheetLabels`, `PaginationLabels`, `BreadcrumbLabels`,
`SidebarLabels`, `CarouselLabels`) and its English defaults (`dialogDefaultLabels` and so on) ship from
`@akira-io/ui`.

```tsx
<SheetContent closeLabel="Descartar alterações">…</SheetContent>
<PaginationNext href={next} label="Mais antigos" />
```

## What is not included

`country-select` was dropped: it depended on an app-specific `useCountries` hook and is not a generic
primitive. Keep that one local to the app that needs it.

---

[← Theme & Tokens](02-theme-and-tokens.md) · Next: [Shells →](04-shells.md)
