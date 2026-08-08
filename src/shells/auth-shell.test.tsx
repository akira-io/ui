/** @vitest-environment jsdom */

import { act } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, describe, expect, it } from 'vitest';

import {
    AuthShell,
    AuthShellBody,
    AuthShellHeading,
    AuthShellLogo,
    AuthShellMain,
    AuthShellPanel,
    AuthShellRoot,
    AuthShellSurface,
} from './auth-shell';

(
    globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT: boolean }
).IS_REACT_ACT_ENVIRONMENT = true;

let root: Root | undefined;
let container: HTMLDivElement | undefined;

function render(element: React.ReactNode) {
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

describe('AuthShell', () => {
    it('puts the branding, heading and form inside the main landmark when centred', () => {
        const view = render(
            <AuthShell
                logo={<span data-testid="logo">Nos Ferry</span>}
                title="Sign in"
                description="Use your work account"
            >
                <form data-testid="form" />
            </AuthShell>,
        );
        const main = view.querySelector('main');

        expect(
            view
                .querySelector('[data-slot="auth-shell"]')
                ?.getAttribute('data-arrangement'),
        ).toBe('centred');
        expect(main?.querySelector('[data-testid="logo"]')).not.toBeNull();
        expect(main?.querySelector('h1')?.textContent).toBe('Sign in');
        expect(main?.textContent).toContain('Use your work account');
        expect(main?.querySelector('[data-testid="form"]')).not.toBeNull();
        expect(view.querySelector('[data-slot="auth-shell-panel"]')).toBeNull();
    });

    it('keeps the branding, heading and form in the main landmark when split', () => {
        const view = render(
            <AuthShell
                arrangement="split"
                logo={<span data-testid="logo">Nos Ferry</span>}
                title="Sign in"
                panel={<p data-testid="panel">Move freight by sea</p>}
            >
                <form data-testid="form" />
            </AuthShell>,
        );
        const main = view.querySelector('main');
        const panel = view.querySelector('[data-slot="auth-shell-panel"]');

        expect(
            view
                .querySelector('[data-slot="auth-shell"]')
                ?.getAttribute('data-arrangement'),
        ).toBe('split');
        expect(main?.querySelector('[data-testid="logo"]')).not.toBeNull();
        expect(main?.querySelector('h1')?.textContent).toBe('Sign in');
        expect(main?.querySelector('[data-testid="form"]')).not.toBeNull();
        expect(panel?.tagName).toBe('ASIDE');
        expect(panel?.querySelector('[data-testid="panel"]')).not.toBeNull();
        expect(main?.querySelector('[data-testid="panel"]')).toBeNull();
    });

    it('hides the decorative panel from assistive technology', () => {
        const view = render(
            <AuthShell arrangement="split" title="Sign in" panel={<p>Art</p>}>
                <form />
            </AuthShell>,
        );

        expect(
            view
                .querySelector('[data-slot="auth-shell-panel"]')
                ?.getAttribute('aria-hidden'),
        ).toBe('true');
    });

    it('exposes the panel to assistive technology when it carries meaning', () => {
        const view = render(
            <AuthShell
                arrangement="split"
                title="Sign in"
                panel={<p>Support: +244 900 000 000</p>}
                panelDecorative={false}
            >
                <form />
            </AuthShell>,
        );

        expect(
            view
                .querySelector('[data-slot="auth-shell-panel"]')
                ?.getAttribute('aria-hidden'),
        ).toBeNull();
    });

    it('collapses the split arrangement to one column below the large breakpoint', () => {
        const view = render(
            <AuthShell arrangement="split" title="Sign in" panel={<p>Art</p>}>
                <form />
            </AuthShell>,
        );
        const shell = view.querySelector('[data-slot="auth-shell"]');
        const panel = view.querySelector('[data-slot="auth-shell-panel"]');

        expect(shell?.classList.contains('lg:grid')).toBe(true);
        expect(shell?.classList.contains('lg:grid-cols-2')).toBe(true);
        expect(panel?.classList.contains('hidden')).toBe(true);
        expect(panel?.classList.contains('lg:flex')).toBe(true);
    });

    it('caps the width of the form column so fields do not stretch', () => {
        const view = render(
            <AuthShell title="Sign in">
                <form />
            </AuthShell>,
        );

        expect(
            view
                .querySelector('[data-slot="auth-shell-form"]')
                ?.classList.contains('max-w-md'),
        ).toBe(true);
    });

    it('renders the form on a card by default and bare on request', () => {
        const view = render(
            <AuthShell title="Sign in">
                <form />
            </AuthShell>,
        );

        expect(view.querySelector('[data-slot="card"]')).not.toBeNull();

        render(
            <AuthShell title="Sign in" surface={false}>
                <form />
            </AuthShell>,
        );

        expect(view.querySelector('[data-slot="card"]')).toBeNull();
        expect(
            view.querySelector('[data-slot="auth-shell-body"]'),
        ).not.toBeNull();
    });

    it('renders the secondary links in a footer and the appearance control on request', () => {
        const view = render(
            <AuthShell
                title="Sign in"
                footer={<a href="/forgot">Forgot your password?</a>}
                appearanceControl={<button type="button">Theme</button>}
            >
                <form />
            </AuthShell>,
        );

        expect(
            view.querySelector('[data-slot="auth-shell-footer"]')?.tagName,
        ).toBe('FOOTER');
        expect(view.querySelector('footer a')?.getAttribute('href')).toBe(
            '/forgot',
        );
        expect(
            view.querySelector('[data-slot="auth-shell-appearance"]')
                ?.textContent,
        ).toBe('Theme');
    });

    it('omits the footer and the appearance control when a page gives neither', () => {
        const view = render(
            <AuthShell title="Sign in">
                <form />
            </AuthShell>,
        );

        expect(
            view.querySelector('[data-slot="auth-shell-footer"]'),
        ).toBeNull();
        expect(
            view.querySelector('[data-slot="auth-shell-appearance"]'),
        ).toBeNull();
    });
});

describe('AuthShell parts', () => {
    it('places the logo and heading inside the card when nested in the surface', () => {
        const view = render(
            <AuthShellRoot>
                <AuthShellMain>
                    <AuthShellSurface>
                        <AuthShellLogo>
                            <span data-testid="logo">Mark</span>
                        </AuthShellLogo>
                        <AuthShellHeading title="Login" align="center" />
                        <AuthShellBody>
                            <form data-testid="form" />
                        </AuthShellBody>
                    </AuthShellSurface>
                </AuthShellMain>
            </AuthShellRoot>,
        );
        const card = view.querySelector('[data-slot="card"]');

        expect(card?.querySelector('[data-testid="logo"]')).not.toBeNull();
        expect(card?.querySelector('h1')?.textContent).toBe('Login');
        expect(card?.querySelector('[data-testid="form"]')).not.toBeNull();
    });

    it('centres the heading on request and starts it otherwise', () => {
        const view = render(
            <AuthShellRoot>
                <AuthShellHeading title="Login" align="center" />
            </AuthShellRoot>,
        );

        expect(
            view
                .querySelector('[data-slot="auth-shell-heading"]')
                ?.classList.contains('text-center'),
        ).toBe(true);

        render(
            <AuthShellRoot>
                <AuthShellHeading title="Login" />
            </AuthShellRoot>,
        );

        expect(
            view
                .querySelector('[data-slot="auth-shell-heading"]')
                ?.classList.contains('text-center'),
        ).toBe(false);
    });

    it('renders the panel only when the root is split', () => {
        const view = render(
            <AuthShellRoot>
                <AuthShellPanel>
                    <p data-testid="panel">Art</p>
                </AuthShellPanel>
            </AuthShellRoot>,
        );

        expect(view.querySelector('[data-testid="panel"]')).toBeNull();

        render(
            <AuthShellRoot arrangement="split">
                <AuthShellPanel>
                    <p data-testid="panel">Art</p>
                </AuthShellPanel>
            </AuthShellRoot>,
        );

        expect(view.querySelector('[data-testid="panel"]')).not.toBeNull();
    });

    it('renders a panel returned by a component of the consumer', () => {
        function BrandPanel() {
            return (
                <AuthShellPanel>
                    <p data-testid="panel">Art</p>
                </AuthShellPanel>
            );
        }

        const view = render(
            <AuthShellRoot arrangement="split">
                <BrandPanel />
                <AuthShellMain>
                    <form />
                </AuthShellMain>
            </AuthShellRoot>,
        );

        expect(
            view.querySelector('[data-slot="auth-shell-panel"]'),
        ).not.toBeNull();
        expect(view.querySelector('[data-testid="panel"]')).not.toBeNull();
    });
});
