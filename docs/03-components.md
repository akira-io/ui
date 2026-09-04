# Components

Every component is a named export from the package root:

```tsx
import { Button, Card, CardHeader, CardTitle, DataTable, cn } from '@akira-io/ui';
```

`cn` (the `clsx` + `tailwind-merge` helper) is exported too. All 67 entries below share the same import
path; there is no per-component subpath. The one family kept off the root is the code family, `Code`,
`CodeBlock` and `JsonViewer`, which ships from `@akira-io/ui/code` so its optional Shiki
import never reaches an app that does not display code. See [Code](10-code.md).

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

### Data (5)

| Component | Preview |
| --- | --- |
| `chart` | Pending |
| `data-table` | Pending |
| `data-table-faceted-filter` | Pending |
| `data-table-row-actions` | Pending |
| `table` | Pending |

### Feedback & misc (7)

| Component | Preview |
| --- | --- |
| `command` | Pending |
| `confirm-dialog` | Pending |
| `copy-button` | Pending |
| `empty-state` | Pending |
| `save-status` | Pending |
| `sonner` (toasts) | Pending |
| `spinner` | https://ui.akira-io.com/components/spinner/ |

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
  `sm`, `lg`, `icon`, `icon-sm`, `icon-lg`. Every variant reads its color from a token: `default` and `link`
  from `--primary`, `destructive` from `--destructive`. The same is true across the catalog: `checkbox`,
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
  `date-range-filter` render the same `Calendar` inside the same popover mechanics.
- **`appearance-toggle`**: light, dark and system in one control, reading and writing through the same
  `useAppearance` hook the shells export, so there is no second source of truth for the theme. `variant`
  selects the presentation: `segmented` (the default, a `ToggleGroup` for settings pages, with arrow-key
  selection) or `menu` (a `DropdownMenu` radio group for headers and user menus). Each option carries a
  visible text label next to its icon, and the four strings are overridable through `labels`
  (`appearanceToggleDefaultLabels` in English, `appearanceToggleLabelsPt` from `@akira-io/ui/locales/pt`,
  `appearanceToggleLabelsFr` from `@akira-io/ui/locales/fr`).
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
- **`tabs`**: `TabsContent` takes `padding`, `default` or `none`. The panel always keeps its surface; `none`
  drops only the `p-5`, for the case where the single child already owns the spacing, a `DataTable flat`
  most of all. It is the other half of one decision, so reach for it in that pair rather than alone: a panel
  with no padding and a child with no surface leaves the content unframed.
- **`confirm-dialog`**, **`combobox`**, **`field`**, **`field-error`**, **`password-input`**: additions to the
  stock shadcn/ui set, kept because enough consuming apps needed them.

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
  named for screen readers by `requiredLabel` on `FieldLabel` (default `Required`). Controls whose element is
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
| `title` | `string` | No | Defaults to `emptyStateLabels.title` (`Nothing to show`). |
| `description` | `string` | No | |
| `actions` | `ReactNode` | No | Buttons, including an `asChild` link. The component never sets their variant. |
| `compact` | `boolean` | No | The smaller density, for table bodies and small panels. |
| `className` | `string` | No | |

`emptyStateLabels` carries the English default title, so an app translating the library overrides one
object rather than every call site.

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
