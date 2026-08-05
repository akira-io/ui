# Spinner and Button Loading State Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Resolve GitHub issue #3 by adding an accessible `Spinner`, adding a width-stable loading state to `Button`, and proving both APIs in the real preview-site consumer before starting issue #4.

**Architecture:** `Spinner` is a small root-exported primitive with size variants and no theme-specific colour. `Button` composes it while preserving its child subtree for width and React identity stability. The package is built first, copied into the preview site's installed package by the existing sync script, then documented and exercised through public imports only.

**Tech Stack:** React 18/19, TypeScript 5.9, Tailwind CSS 4 utility classes, class-variance-authority, Lucide React, Vitest 4, jsdom, Astro 5, Bun.

## Global Constraints

- Work only on issue #3 until its package and site preview have been approved by both Codex and the user.
- The preview site must import `Spinner` and `Button` only from `@akira-io/ui`; it must not import source files from the sibling package checkout.
- `Spinner` and `Button` must carry `data-slot` attributes.
- `Spinner` must inherit `currentColor`, expose `role="status"`, and include an overridable visually hidden label that defaults to `Loading`.
- The spinner animation must stop under `prefers-reduced-motion` by using Tailwind's `motion-reduce:animate-none` path.
- `Button loading` must set `disabled` and `aria-busy`, preserve its child subtree between states, and keep the button's measured content footprint stable.
- Loading behaviour must work with all six variants and all six sizes, including `icon`, `icon-sm`, and `icon-lg`.
- Existing `Button` behaviour and the `asChild` path must remain backward compatible when `loading` is false.
- An approved issue is recorded in one traceable commit per changed repository before work starts on issue #4.

---

## File map

### Package repository: `/Users/kid/akira-io/akira-ui`

- Create `src/components/ui/spinner.tsx`: `Spinner`, `SpinnerProps`, size variants, accessible label, and reduced-motion animation.
- Create `src/components/ui/spinner.test.tsx`: DOM-level Spinner accessibility, sizing, colour inheritance, and reduced-motion tests.
- Modify `src/components/ui/button.tsx`: named `ButtonProps`, loading state, stable content wrapper, and Spinner composition.
- Create `src/components/ui/button.test.tsx`: DOM-level disabled, busy, size/variant, width-preserving structure, and child identity tests.
- Modify `src/index.ts`: root export for the Spinner primitive.
- Modify `package.json` and `bun.lock`: jsdom development dependency for DOM-level Vitest tests.
- Modify `README.md`: update the root-entry component count from 55 to 56.
- Modify `docs/00-index.md`: update the component catalog count from 55 to 56.
- Modify `docs/03-components.md`: add Spinner to the feedback catalog and document Button loading behaviour.

### Preview repository: `/Users/kid/akira-io/ui`

- Create `src/demos/components/spinner/default.tsx`: bare accessible Spinner usage.
- Create `src/demos/components/spinner/sizes.tsx`: all Spinner size variants with visible labels.
- Create `src/demos/components/spinner/showcase.tsx`: realistic loading panel used by the gallery.
- Create `src/demos/components/button/loading-states.tsx`: submit action shown idle, loading, and completed.
- Modify `src/demos/components/button/showcase.tsx`: make the gallery preview include the loading-aware API in a realistic action surface.
- Modify `src/lib/descriptions.ts`: add the Spinner page description.
- Modify `src/lib/overview.ts`: document Spinner semantics and extend Button's overview/accessibility notes.

---

### Task 1: Add the accessible Spinner primitive

**Files:**

- Create: `src/components/ui/spinner.test.tsx`
- Create: `src/components/ui/spinner.tsx`
- Modify: `src/index.ts`
- Modify: `package.json`
- Modify: `bun.lock`

**Interfaces:**

- Consumes: `cn(...inputs)` from `@/lib/utils`, `cva` and `VariantProps` from `class-variance-authority`, and `LoaderCircle` from `lucide-react`.
- Produces: `Spinner(props: SpinnerProps): React.ReactElement`, where `SpinnerProps` forwards `React.ComponentProps<'span'>` and adds `size?: 'sm' | 'default' | 'lg'` plus `label?: string`.

- [ ] **Step 1: Install the DOM test environment**

Run:

```bash
cd /Users/kid/akira-io/akira-ui
bun add --dev jsdom
```

Expected: `package.json` gains `jsdom` under `devDependencies`, `bun.lock` changes, and no runtime dependency is added.

- [ ] **Step 2: Write the failing Spinner tests**

Create `src/components/ui/spinner.test.tsx` with a jsdom Vitest environment and this behaviour:

```tsx
/** @vitest-environment jsdom */

import { act } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, describe, expect, it } from 'vitest';

import { Spinner } from './spinner';

(globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT: boolean })
    .IS_REACT_ACT_ENVIRONMENT = true;

let root: Root | undefined;
let container: HTMLDivElement | undefined;

function renderSpinner(element: React.ReactNode) {
    container = document.createElement('div');
    document.body.append(container);
    root = createRoot(container);

    act(() => root!.render(element));

    return container;
}

afterEach(() => {
    act(() => root?.unmount());
    container?.remove();
    root = undefined;
    container = undefined;
});

describe('Spinner', () => {
    it('announces a visually hidden default label', () => {
        const view = renderSpinner(<Spinner />);
        const status = view.querySelector('[data-slot="spinner"]');

        expect(status?.getAttribute('role')).toBe('status');
        expect(status?.textContent).toBe('Loading');
        expect(status?.querySelector('.sr-only')?.textContent).toBe('Loading');
    });

    it('accepts an accessible label and the three control-aligned sizes', () => {
        const view = renderSpinner(<Spinner label="Saving" size="lg" />);
        const status = view.querySelector('[data-slot="spinner"]');

        expect(status?.textContent).toBe('Saving');
        expect(status?.getAttribute('data-size')).toBe('lg');
        expect(status?.className).toContain('size-5');
    });

    it('inherits text colour and stops animation for reduced motion', () => {
        const view = renderSpinner(<Spinner />);
        const icon = view.querySelector('[data-slot="spinner"] svg');

        expect(icon?.getAttribute('class')).toContain('text-current');
        expect(icon?.getAttribute('class')).toContain('animate-spin');
        expect(icon?.getAttribute('class')).toContain(
            'motion-reduce:animate-none',
        );
    });
});
```

- [ ] **Step 3: Run the focused test and confirm the red state**

Run:

```bash
bun run test -- src/components/ui/spinner.test.tsx
```

Expected: FAIL because `./spinner` does not exist.

- [ ] **Step 4: Implement the smallest Spinner that satisfies the contract**

Create `src/components/ui/spinner.tsx` with this public structure:

```tsx
import { cva, type VariantProps } from 'class-variance-authority';
import { LoaderCircle } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/lib/utils';

const spinnerVariants = cva('inline-flex shrink-0', {
    variants: {
        size: {
            sm: 'size-3.5',
            default: 'size-4',
            lg: 'size-5',
        },
    },
    defaultVariants: {
        size: 'default',
    },
});

interface SpinnerProps
    extends React.ComponentProps<'span'>,
        VariantProps<typeof spinnerVariants> {
    label?: string;
}

function Spinner({
    className,
    label = 'Loading',
    size = 'default',
    ...props
}: SpinnerProps) {
    return (
        <span
            {...props}
            data-slot="spinner"
            data-size={size}
            role="status"
            className={cn(spinnerVariants({ size }), className)}
        >
            <LoaderCircle
                aria-hidden="true"
                className="size-full animate-spin text-current motion-reduce:animate-none"
            />
            <span className="sr-only">{label}</span>
        </span>
    );
}

export { Spinner, spinnerVariants, type SpinnerProps };
```

Add the root export to `src/index.ts` immediately after the Skeleton export:

```ts
export * from '@/components/ui/spinner';
```

- [ ] **Step 5: Run focused and structural package tests**

Run:

```bash
bun run test -- src/components/ui/spinner.test.tsx tests/data-slots.test.ts tests/design-language.test.ts
```

Expected: all selected tests PASS, including automatic `data-slot` discovery for `spinner.tsx`.

---

### Task 2: Add the width-stable Button loading state

**Files:**

- Create: `src/components/ui/button.test.tsx`
- Modify: `src/components/ui/button.tsx`

**Interfaces:**

- Consumes: `Spinner` and `SpinnerProps['size']` from `@/components/ui/spinner`.
- Produces: `Button(props: ButtonProps): React.ReactElement`; `ButtonProps` retains all current button, CVA, and `asChild` props and adds `loading?: boolean` and `loadingLabel?: string`.

- [ ] **Step 1: Write failing Button loading tests**

Create `src/components/ui/button.test.tsx` with the same jsdom `createRoot` setup as the Spinner test. The test body must cover the acceptance criteria explicitly:

```tsx
/** @vitest-environment jsdom */

import { act, useEffect } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { Button } from './button';

(globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT: boolean })
    .IS_REACT_ACT_ENVIRONMENT = true;

let root: Root | undefined;
let container: HTMLDivElement | undefined;

function renderButton(element: React.ReactNode) {
    container ??= document.createElement('div');
    if (!container.isConnected) document.body.append(container);
    root ??= createRoot(container);
    act(() => root!.render(element));
    return container;
}

afterEach(() => {
    act(() => root?.unmount());
    container?.remove();
    root = undefined;
    container = undefined;
});

describe('Button loading state', () => {
    it('is disabled and busy while loading', () => {
        const view = renderButton(<Button loading>Save</Button>);
        const button = view.querySelector('button');

        expect(button?.hasAttribute('disabled')).toBe(true);
        expect(button?.getAttribute('aria-busy')).toBe('true');
        expect(button?.querySelector('[data-slot="spinner"]')).not.toBeNull();
    });

    it.each(['default', 'sm', 'lg', 'icon', 'icon-sm', 'icon-lg'] as const)(
        'maps the %s button size to a spinner size',
        (size) => {
            const view = renderButton(
                <Button loading size={size} aria-label="Save" />,
            );
            const spinner = view.querySelector('[data-slot="spinner"]');

            expect(spinner?.getAttribute('data-size')).toBe(
                size === 'sm' || size === 'icon-sm'
                    ? 'sm'
                    : size === 'lg' || size === 'icon-lg'
                      ? 'lg'
                      : 'default',
            );
        },
    );

    it.each([
        'default',
        'destructive',
        'outline',
        'secondary',
        'ghost',
        'link',
    ] as const)('keeps the %s variant while loading', (variant) => {
        const view = renderButton(
            <Button loading variant={variant}>
                Save
            </Button>,
        );
        const button = view.querySelector('button');

        expect(button?.getAttribute('data-variant')).toBe(variant);
        expect(button?.querySelector('[data-slot="spinner"]')).not.toBeNull();
    });

    it('keeps the label subtree mounted when loading changes', () => {
        const mounted = vi.fn();

        function Label() {
            useEffect(() => {
                mounted();
            }, []);

            return <span data-testid="label">Save changes</span>;
        }

        const view = renderButton(
            <Button loading={false}>
                <svg data-testid="leading-icon" />
                <Label />
            </Button>,
        );
        const label = view.querySelector('[data-testid="label"]');

        expect(view.querySelector('[data-testid="leading-icon"]')).not.toBeNull();

        renderButton(
            <Button loading>
                <svg data-testid="leading-icon" />
                <Label />
            </Button>,
        );

        expect(view.querySelector('[data-testid="label"]')).toBe(label);
        expect(mounted).toHaveBeenCalledTimes(1);
        expect(view.querySelector('[data-testid="leading-icon"]')).toBeNull();
        expect(
            view.querySelector('[data-slot="button-leading"] [data-slot="spinner"]'),
        ).not.toBeNull();
    });
});
```

- [ ] **Step 2: Run the focused Button test and confirm the red state**

Run:

```bash
bun run test -- src/components/ui/button.test.tsx
```

Expected: FAIL because `Button` does not accept `loading` and renders no Spinner.

- [ ] **Step 3: Introduce the public `ButtonProps` and Spinner size mapping**

In `src/components/ui/button.tsx`, import Spinner and define the exact public additions:

```tsx
import {
    Spinner,
    spinnerVariants,
    type SpinnerProps,
} from '@/components/ui/spinner';

type ButtonSize = NonNullable<VariantProps<typeof buttonVariants>['size']>;

interface ButtonProps
    extends React.ComponentProps<'button'>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean;
    loading?: boolean;
    loadingLabel?: string;
}

function spinnerSize(size: ButtonSize): SpinnerProps['size'] {
    if (size === 'sm' || size === 'icon-sm') return 'sm';
    if (size === 'lg' || size === 'icon-lg') return 'lg';
    return 'default';
}

function loadingPadding(size: ButtonSize): string | undefined {
    if (size === 'sm') return 'px-2.5';
    if (size === 'lg') return 'px-5';
    if (size === 'default') return 'px-3';
    return undefined;
}
```

Export `ButtonProps` with the existing exports:

```ts
export { Button, buttonVariants, type ButtonProps };
```

- [ ] **Step 4: Compose the loading content without replacing the child subtree**

Keep the current rendering unchanged when the `loading` prop is omitted. For a loading-aware native button, use stable leading, label, and optional balance slots so toggling `loading` changes only the leading slot and never replaces the label subtree or its measured footprint:

```tsx
function Button({
    className,
    variant = 'default',
    size = 'default',
    asChild = false,
    loading,
    loadingLabel = 'Loading',
    disabled,
    children,
    ...props
}: ButtonProps) {
    const isLoading = loading === true;
    const resolvedSize: ButtonSize = size ?? 'default';
    const classes = cn(
        buttonVariants({ variant, size: resolvedSize, className }),
    );

    if (asChild) {
        return (
            <Slot
                {...props}
                data-slot="button"
                data-variant={variant}
                data-size={resolvedSize}
                className={classes}
                aria-busy={isLoading || undefined}
                aria-disabled={isLoading || disabled || undefined}
            >
                {children}
            </Slot>
        );
    }

    if (loading === undefined) {
        return (
            <button
                {...props}
                data-slot="button"
                data-variant={variant}
                data-size={resolvedSize}
                className={classes}
                disabled={disabled}
            >
                {children}
            </button>
        );
    }

    const items = React.Children.toArray(children);
    const first = items[0];
    const iconOnly = resolvedSize.startsWith('icon');
    const hasLeadingVisual =
        React.isValidElement(first) && (items.length > 1 || iconOnly);
    const leadingVisual = hasLeadingVisual ? first : undefined;
    const label = hasLeadingVisual ? items.slice(1) : items;
    const mappedSpinnerSize = spinnerSize(resolvedSize);

    return (
        <button
            {...props}
            data-slot="button"
            data-variant={variant}
            data-size={resolvedSize}
            data-loading={isLoading || undefined}
            className={cn(classes, loadingPadding(resolvedSize))}
            disabled={disabled || isLoading}
            aria-busy={isLoading || undefined}
        >
            <span
                data-slot="button-content"
                className="inline-flex items-center gap-[inherit]"
            >
                <span
                    data-slot="button-leading"
                    className={cn(
                        'inline-grid shrink-0 place-items-center',
                        spinnerVariants({ size: mappedSpinnerSize }),
                    )}
                >
                    {isLoading ? (
                        <Spinner
                            size={mappedSpinnerSize}
                            label={loadingLabel}
                            className="size-full"
                        />
                    ) : (
                        leadingVisual
                    )}
                </span>
                <span data-slot="button-label">{label}</span>
                {!hasLeadingVisual && !iconOnly && (
                    <span
                        aria-hidden="true"
                        data-slot="button-balance"
                        className={spinnerVariants({
                            size: mappedSpinnerSize,
                        })}
                    />
                )}
            </span>
        </button>
    );
}
```

The permanent leading slot swaps an existing leading element for Spinner without moving the label. A loading-aware text-only button reserves an equal trailing balance slot, keeping its label centred and its width identical before and during loading. Icon-only sizes use only the leading slot. The label span and its child subtree remain mounted across the state change.

- [ ] **Step 5: Run the focused component tests**

Run:

```bash
bun run test -- src/components/ui/button.test.tsx src/components/ui/spinner.test.tsx
```

Expected: both test files PASS with no React `act` warnings.

- [ ] **Step 6: Run package regression checks for shared Button consumers**

Run:

```bash
bun run test
bun run typecheck
bun run format:check
bun run build
```

Expected: every command exits 0; `dist/index.d.ts` exports `ButtonProps`, `Spinner`, and `SpinnerProps`; existing components that compose Button still typecheck.

---

### Task 3: Update the package documentation and catalog

**Files:**

- Modify: `README.md`
- Modify: `docs/00-index.md`
- Modify: `docs/03-components.md`

**Interfaces:**

- Consumes: the root `Spinner` export and `ButtonProps` implemented in Tasks 1 and 2.
- Produces: package documentation that describes the 56-component root entry and the new loading API without claiming that the preview is pending.

- [ ] **Step 1: Update catalog counts and the Spinner entry**

Apply these exact documentation changes:

```text
README.md: change “55 shadcn/ui components” to “56 React components”.
docs/00-index.md: change “55-component catalog” to “56-component catalog”.
docs/03-components.md: change “All 55 entries” to “All 56 entries”.
docs/03-components.md: change “Feedback & misc (3)” to “Feedback & misc (4)”.
docs/03-components.md: add `spinner` to that table with preview URL https://ui.akira-io.com/components/spinner/.
docs/03-components.md: change the `button` preview from Pending to https://ui.akira-io.com/components/button/.
```

- [ ] **Step 2: Document the Button loading contract**

Extend the existing `button` customization paragraph in `docs/03-components.md` with these facts:

```text
`loading` disables the native button, sets `aria-busy`, keeps the original content mounted to preserve width, and overlays a Spinner sized to the current Button size. `loadingLabel` overrides the Spinner's accessible “Loading” label.
```

Add a `spinner` customization paragraph stating:

```text
Spinner sizes are `sm`, `default`, and `lg`; it inherits current text colour, exposes a polite status label, and stops rotating when reduced motion is requested.
```

- [ ] **Step 3: Verify documentation contains no stale count for the active catalog**

Run:

```bash
rg -n "55-component catalog|All 55 entries|Feedback & misc \(3\)" README.md docs
```

Expected: no matches outside historical design and plan documents under `docs/superpowers/`.

- [ ] **Step 4: Re-run the complete package gate**

Run:

```bash
bun run test && bun run typecheck && bun run format:check && bun run build
```

Expected: all commands exit 0.

---

### Task 4: Consume Spinner and Button loading from the preview site

**Files:**

- Create: `/Users/kid/akira-io/ui/src/demos/components/spinner/default.tsx`
- Create: `/Users/kid/akira-io/ui/src/demos/components/spinner/sizes.tsx`
- Create: `/Users/kid/akira-io/ui/src/demos/components/spinner/showcase.tsx`
- Create: `/Users/kid/akira-io/ui/src/demos/components/button/loading-states.tsx`
- Modify: `/Users/kid/akira-io/ui/src/demos/components/button/showcase.tsx`
- Modify: `/Users/kid/akira-io/ui/src/lib/descriptions.ts`
- Modify: `/Users/kid/akira-io/ui/src/lib/overview.ts`

**Interfaces:**

- Consumes: `Spinner`, `SpinnerProps`, `Button`, `Card`, and related primitives only from `@akira-io/ui`.
- Produces: `/components/spinner/`, the updated `/components/button/`, and a Spinner gallery tile, all rendered from the synchronized package build.

- [ ] **Step 1: Synchronize the newly built package and prove the missing-demo red state**

Run:

```bash
cd /Users/kid/akira-io/ui
bun run sync:lib
bun run test -- tests/component-demo-coverage.test.ts
```

Expected: `sync:lib ok`, followed by a FAIL reporting `spinner` as a component missing a demo.

- [ ] **Step 2: Add the Spinner default demo**

Create `src/demos/components/spinner/default.tsx`:

```tsx
import { Spinner } from '@akira-io/ui';

export default function SpinnerDefault() {
    return <Spinner label="Loading account" />;
}
```

- [ ] **Step 3: Add the Spinner size demo**

Create `src/demos/components/spinner/sizes.tsx`:

```tsx
import { Spinner, type SpinnerProps } from '@akira-io/ui';

const sizes: NonNullable<SpinnerProps['size']>[] = ['sm', 'default', 'lg'];

export default function SpinnerSizes() {
    return (
        <div className="flex items-end gap-6">
            {sizes.map((size) => (
                <div key={size} className="flex flex-col items-center gap-2">
                    <Spinner size={size} label={`Loading, ${size} size`} />
                    <span className="text-xs text-muted-foreground">{size}</span>
                </div>
            ))}
        </div>
    );
}
```

- [ ] **Step 4: Add the realistic Spinner showcase**

Create `src/demos/components/spinner/showcase.tsx`:

```tsx
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    Spinner,
} from '@akira-io/ui';

export default function SpinnerShowcase() {
    return (
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle>Preparing your workspace</CardTitle>
                <CardDescription>This usually takes a few seconds.</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center gap-3 text-sm text-muted-foreground">
                <Spinner label="Preparing workspace" />
                Loading account settings…
            </CardContent>
        </Card>
    );
}
```

- [ ] **Step 5: Add the Button three-state demo**

Create `src/demos/components/button/loading-states.tsx` with one submit action rendered in idle, loading, and completed states:

```tsx
import { Check, Save } from 'lucide-react';

import { Button } from '@akira-io/ui';

export default function ButtonLoadingStates() {
    return (
        <div className="flex flex-wrap items-center gap-3">
            <Button>
                <Save />
                Save changes
            </Button>
            <Button loading loadingLabel="Saving changes">
                <Save />
                Save changes
            </Button>
            <Button variant="secondary">
                <Check />
                Changes saved
            </Button>
        </div>
    );
}
```

- [ ] **Step 6: Make the Button gallery showcase exercise loading interactively**

Replace `src/demos/components/button/showcase.tsx` with:

```tsx
import { useEffect, useRef, useState } from 'react';

import {
    Button,
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@akira-io/ui';

export default function ButtonShowcase() {
    const [loading, setLoading] = useState(false);
    const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

    useEffect(() => () => clearTimeout(timer.current), []);

    function upgrade() {
        setLoading(true);
        clearTimeout(timer.current);
        timer.current = setTimeout(() => setLoading(false), 1600);
    }

    return (
        <Card className="w-full max-w-md">
            <CardHeader>
                <CardTitle>Growth plan</CardTitle>
                <CardDescription>$480 per month, billed yearly</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground">
                    Renews on 12 August. Downgrading takes effect at the end of
                    the current period.
                </p>
            </CardContent>
            <CardFooter className="gap-2">
                <Button
                    type="button"
                    loading={loading}
                    loadingLabel="Updating plan"
                    onClick={upgrade}
                >
                    Upgrade plan
                </Button>
                <Button type="button" variant="outline" disabled={loading}>
                    Compare plans
                </Button>
            </CardFooter>
        </Card>
    );
}
```

- [ ] **Step 7: Add site description and API guidance**

Add to `COMPONENT_DESCRIPTIONS` in `src/lib/descriptions.ts`:

```ts
spinner: 'Shows that work is in progress without reporting a percentage.',
```

Add to `COMPONENT_OVERVIEWS` in `src/lib/overview.ts`:

```ts
spinner: {
    intro: `Spinner is an indeterminate status indicator for work whose progress cannot be measured. Its three sizes align with Button's compact, default, and large controls, and its colour always follows the surrounding text.`,
    accessibility: [
        `The root uses role="status" and includes a visually hidden label that defaults to “Loading”; pass label to describe the specific operation. Its rotation stops when the user requests reduced motion.`,
    ],
},
```

Extend Button's overview to mention `loading`, `loadingLabel`, disabled/busy semantics, and width stability.

- [ ] **Step 8: Run the focused site coverage tests**

Run:

```bash
bun run test -- tests/component-demo-coverage.test.ts tests/docs-coverage.test.ts tests/api-reference.test.ts tests/imports.test.ts tests/showcase.test.ts
```

Expected: all selected tests PASS. The automatic API reference must discover both `SpinnerProps` and the new Button props from the synchronized `dist/index.d.ts`.

---

### Task 5: Run the issue gate and obtain joint preview approval

**Files:**

- Verify only; modify Task 1–4 files if a check or preview finding requires a correction.

**Interfaces:**

- Consumes: complete issue #3 implementation from both repositories.
- Produces: a jointly approved package and consumer checkpoint, followed by one issue-linked commit in each changed repository.

- [ ] **Step 1: Run the final package verification from a clean build**

Run:

```bash
cd /Users/kid/akira-io/akira-ui
bun run test
bun run typecheck
bun run format:check
bun run build
```

Expected: four zero exit codes and generated declarations containing the new exports.

- [ ] **Step 2: Re-sync and run the final site verification**

Run:

```bash
cd /Users/kid/akira-io/ui
bun run sync:lib
bun run test
bun run check
bun run format:check
bun run build
```

Expected: `sync:lib ok`; every test and check passes; Astro builds `/components/spinner/`, `/components/button/`, and the components gallery.

- [ ] **Step 3: Start the real site preview**

Run from `/Users/kid/akira-io/ui`:

```bash
bun run dev -- --host 127.0.0.1
```

Expected: Astro prints a reachable local URL. Keep this process alive for the joint validation checkpoint.

- [ ] **Step 4: Perform Codex visual and interaction inspection**

Open these routes in the browser:

```text
/components/spinner/
/components/button/
/components/
```

Verify all of the following before presenting the checkpoint:

```text
- Spinner default, sizes, and gallery showcase render without layout shift.
- The Button page shows idle, loading, and completed submit states.
- Activating the interactive showcase disables the Button, shows Spinner, and returns to idle.
- Text and icon buttons do not change outer width when loading toggles.
- The loading label remains represented in the accessibility tree.
- Light and dark appearances both use inherited package colours.
- At narrow width, demos wrap without clipping or horizontal page overflow.
- With reduced-motion emulation, the spinner does not rotate.
- Keyboard activation works and the disabled loading button cannot be re-triggered.
- The browser console stays free of runtime errors and hydration warnings.
```

If any item fails, return to the owning task, correct it test-first when applicable, and repeat Tasks 5.1–5.4.

- [ ] **Step 5: Hand the exact preview routes to the user and pause**

Report the local preview URL and direct Spinner and Button routes. Ask the user to inspect both pages and explicitly approve issue #3. Do not begin issue #4 while approval is pending.

- [ ] **Step 6: Commit the approved issue in the package repository**

After user approval only, run:

```bash
cd /Users/kid/akira-io/akira-ui
git add package.json bun.lock src/components/ui/spinner.tsx src/components/ui/spinner.test.tsx src/components/ui/button.tsx src/components/ui/button.test.tsx src/index.ts README.md docs/00-index.md docs/03-components.md docs/superpowers/plans/2026-08-04-spinner-button-loading.md
git commit -m "feat: add spinner and button loading state (#3)"
```

Expected: one package commit containing only issue #3 and its approved plan.

- [ ] **Step 7: Commit the approved consumer preview**

After user approval only, run:

```bash
cd /Users/kid/akira-io/ui
git add src/demos/components/spinner src/demos/components/button/loading-states.tsx src/demos/components/button/showcase.tsx src/lib/descriptions.ts src/lib/overview.ts
git commit -m "docs: preview spinner and button loading state (#3)"
```

Expected: one site commit containing only the public-package demos and documentation for issue #3.

- [ ] **Step 8: Confirm both worktrees are clean and stop at the issue boundary**

Run:

```bash
git -C /Users/kid/akira-io/akira-ui status --short --branch
git -C /Users/kid/akira-io/ui status --short --branch
```

Expected: both show no uncommitted issue #3 files. Report issue #3 complete and wait for the user's instruction before creating the issue #4 implementation plan.
