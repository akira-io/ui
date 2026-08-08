/** @vitest-environment jsdom */

import { act, useEffect } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { Button, buttonVariants } from './button';

(
    globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT: boolean }
).IS_REACT_ACT_ENVIRONMENT = true;

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

    it('preserves caller padding when controlled loading is false', () => {
        const view = renderButton(
            <Button loading={false} className="px-8">
                Save
            </Button>,
        );
        const button = view.querySelector('button');

        expect(button?.classList.contains('px-8')).toBe(true);
        expect(button?.classList.contains('px-3')).toBe(false);
    });

    it('preserves caller aria-busy when controlled loading is false', () => {
        const view = renderButton(
            <Button loading={false} aria-busy="false">
                Save
            </Button>,
        );
        const button = view.querySelector('button');

        expect(button?.getAttribute('aria-busy')).toBe('false');
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

        expect(
            view.querySelector('[data-testid="leading-icon"]'),
        ).not.toBeNull();

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
            view.querySelector(
                '[data-slot="button-leading"] [data-slot="spinner"]',
            ),
        ).not.toBeNull();
    });

    it('preserves disabled and caller ARIA state for an asChild button', () => {
        const view = renderButton(
            <Button asChild disabled aria-busy="false" aria-disabled="false">
                <button type="button">Save</button>
            </Button>,
        );
        const button = view.querySelector('button');

        expect(button?.hasAttribute('disabled')).toBe(true);
        expect(button?.getAttribute('aria-busy')).toBe('false');
        expect(button?.getAttribute('aria-disabled')).toBe('false');
    });

    it('forces busy and disabled ARIA state while loading an asChild control', () => {
        const view = renderButton(
            <Button
                asChild
                loading
                loadingLabel="Saving profile"
                aria-busy="false"
                aria-disabled="false"
            >
                <a href="/save">Save</a>
            </Button>,
        );
        const link = view.querySelector('a');

        expect(link?.getAttribute('aria-busy')).toBe('true');
        expect(link?.getAttribute('aria-disabled')).toBe('true');
        expect(link?.querySelector('[data-slot="spinner"]')).not.toBeNull();
        expect(link?.textContent).toContain('Saving profile');
    });

    it('disables a slotted native button while loading', () => {
        const view = renderButton(
            <Button asChild loading>
                <button type="button">Save</button>
            </Button>,
        );
        const button = view.querySelector('button');

        expect(button?.disabled).toBe(true);
    });

    it('replaces a slotted anchor leading icon with a spinner while retaining its label', () => {
        const view = renderButton(
            <Button asChild loading={false}>
                <a href="/save">
                    <svg data-testid="leading-icon" />
                    <span data-testid="label">Save</span>
                </a>
            </Button>,
        );

        const label = view.querySelector('[data-testid="label"]');

        expect(
            view.querySelector(
                '[data-slot="button-leading"] [data-testid="leading-icon"]',
            ),
        ).not.toBeNull();
        expect(view.querySelector('[data-slot="spinner"]')).toBeNull();
        expect(
            view.querySelector('[data-slot="button-label"]')?.textContent,
        ).toBe('Save');
        expect(view.querySelector('[data-slot="button-balance"]')).toBeNull();

        renderButton(
            <Button asChild loading>
                <a href="/save">
                    <svg data-testid="leading-icon" />
                    <span data-testid="label">Save</span>
                </a>
            </Button>,
        );

        expect(view.querySelector('[data-testid="leading-icon"]')).toBeNull();
        expect(view.querySelector('[data-testid="label"]')).toBe(label);
        expect(
            view.querySelector(
                '[data-slot="button-leading"] [data-slot="spinner"]',
            ),
        ).not.toBeNull();
        expect(
            view.querySelector('[data-slot="button-label"]')?.textContent,
        ).toBe('Save');
        expect(view.querySelector('[data-slot="button-balance"]')).toBeNull();
    });

    it('keeps a text-only slotted label mounted while loading changes', () => {
        const mounted = vi.fn();

        function Label() {
            useEffect(() => {
                mounted();
            }, []);

            return <span data-testid="label">Save</span>;
        }

        const view = renderButton(
            <Button asChild loading={false}>
                <button type="button">
                    <Label />
                </button>
            </Button>,
        );
        const label = view.querySelector('[data-testid="label"]');

        expect(
            view.querySelector('[data-slot="button-content"]'),
        ).not.toBeNull();
        expect(view.querySelector('[data-slot="spinner"]')).toBeNull();
        expect(
            view.querySelector('[data-slot="button-label"]')?.textContent,
        ).toBe('Save');
        expect(
            view.querySelector('[data-slot="button-balance"]'),
        ).not.toBeNull();

        renderButton(
            <Button asChild loading>
                <button type="button">
                    <Label />
                </button>
            </Button>,
        );

        expect(view.querySelector('[data-testid="label"]')).toBe(label);
        expect(mounted).toHaveBeenCalledTimes(1);
        expect(
            view.querySelector(
                '[data-slot="button-leading"] [data-slot="spinner"]',
            ),
        ).not.toBeNull();
        expect(
            view.querySelector('[data-slot="button-label"]')?.textContent,
        ).toBe('Save');
        expect(
            view.querySelector('[data-slot="button-balance"]'),
        ).not.toBeNull();
    });

    it('uses the compact spinner without a balance for an icon-only slotted button', () => {
        const view = renderButton(
            <Button asChild loading size="icon-sm" aria-label="Save">
                <button type="button">
                    <svg data-testid="leading-icon" />
                </button>
            </Button>,
        );

        expect(view.querySelector('[data-testid="leading-icon"]')).toBeNull();
        expect(
            view
                .querySelector(
                    '[data-slot="button-leading"] [data-slot="spinner"]',
                )
                ?.getAttribute('data-size'),
        ).toBe('sm');
        expect(view.querySelector('[data-slot="button-balance"]')).toBeNull();
    });

    it('uses loading padding when a slotted button receives loading false', () => {
        const view = renderButton(
            <Button asChild loading={false}>
                <a href="/save">Save</a>
            </Button>,
        );
        const link = view.querySelector('a');

        expect(link?.classList.contains('px-4')).toBe(false);
        expect(link?.classList.contains('px-3')).toBe(true);
    });

    it('preserves caller padding when controlled slotted loading is false', () => {
        const view = renderButton(
            <Button asChild loading={false} className="px-8">
                <a href="/save">Save</a>
            </Button>,
        );
        const link = view.querySelector('a');

        expect(link?.classList.contains('px-8')).toBe(true);
        expect(link?.classList.contains('px-3')).toBe(false);
    });

    it('keeps legacy slotted markup and padding when loading is undefined', () => {
        const view = renderButton(
            <Button asChild>
                <a href="/save">Save</a>
            </Button>,
        );
        const link = view.querySelector('a');

        expect(view.querySelector('[data-slot="button-content"]')).toBeNull();
        expect(link?.classList.contains('px-4')).toBe(true);
        expect(link?.classList.contains('px-3')).toBe(false);
    });

    it('suppresses a slotted anchor activation while loading', () => {
        const onClick = vi.fn();
        const view = renderButton(
            <Button asChild loading>
                <a href="/save" onClick={onClick}>
                    Save
                </a>
            </Button>,
        );
        const link = view.querySelector('a');

        act(() => {
            link?.dispatchEvent(
                new MouseEvent('click', { bubbles: true, cancelable: true }),
            );
        });

        expect(onClick).not.toHaveBeenCalled();
    });
});

describe('a button carrying an icon', () => {
    const PAIRS = [
        ['default', 'has-[>svg]:gap-3', 'has-[>svg]:px-3'],
        ['sm', 'has-[>svg]:gap-2.5', 'has-[>svg]:px-2.5'],
        ['lg', 'has-[>svg]:gap-4', 'has-[>svg]:px-4'],
    ] as const;

    it.each(PAIRS)(
        'spaces the %s size by one step on both edges and between icon and label',
        (size, gap, padding) => {
            const classes = buttonVariants({ size }).split(/\s+/);

            expect(classes).toContain(gap);
            expect(classes).toContain(padding);
        },
    );

    it('leaves the icon-only sizes alone, since they have no label to separate', () => {
        for (const size of ['icon', 'icon-sm', 'icon-lg'] as const) {
            const classes = buttonVariants({ size });

            expect(classes).not.toContain('has-[>svg]:');
        }
    });
});
