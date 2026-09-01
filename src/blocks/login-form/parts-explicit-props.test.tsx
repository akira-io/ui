/** @vitest-environment jsdom */

import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import type { LinkComponent } from '@/types';

import {
    LoginFormEmail,
    LoginFormPassword,
    LoginFormRemember,
    LoginFormRoot,
    LoginFormSubmit,
} from './parts';
import { LoginFormPreset } from './preset';

afterEach(cleanup);

class ResizeObserverStub {
    observe() {}
    unobserve() {}
    disconnect() {}
}

globalThis.ResizeObserver ??=
    ResizeObserverStub as unknown as typeof ResizeObserver;

const RootLink: LinkComponent = ({ href, children, ...props }) => (
    <a href={String(href)} data-link-source="root" {...props}>
        {children}
    </a>
);

const FieldLink: LinkComponent = ({ href, children, ...props }) => (
    <a href={String(href)} data-link-source="field" {...props}>
        {children}
    </a>
);

describe('the login form parts under explicit props', () => {
    it('gives every field the id the caller asks for, so two login forms can share one page', () => {
        render(
            <form>
                <LoginFormRoot>
                    <LoginFormEmail id="signin-email" />
                    <LoginFormPassword id="signin-password" />
                    <LoginFormRemember id="signin-remember" />
                </LoginFormRoot>
            </form>,
        );

        expect(screen.getByLabelText(/^Email address/).id).toBe('signin-email');
        expect(screen.getByLabelText(/^Password/).id).toBe('signin-password');
        expect(screen.getByLabelText('Remember me').id).toBe('signin-remember');
    });

    it('submits every field under the name the caller asks for rather than the default', () => {
        render(
            <form>
                <LoginFormRoot>
                    <LoginFormEmail name="login" />
                    <LoginFormPassword name="secret" />
                    <LoginFormRemember name="stay_signed_in" />
                </LoginFormRoot>
            </form>,
        );

        expect(
            screen.getByLabelText(/^Email address/).getAttribute('name'),
        ).toBe('login');
        expect(screen.getByLabelText(/^Password/).getAttribute('name')).toBe(
            'secret',
        );
        expect(
            document.querySelector('input[name="stay_signed_in"]'),
        ).not.toBeNull();
    });

    it('reads the error off the renamed field, so a custom name still shows the server message', () => {
        render(
            <LoginFormRoot errors={{ login: 'Unknown account.' }}>
                <LoginFormEmail name="login" />
            </LoginFormRoot>,
        );

        expect(screen.getByText('Unknown account.')).not.toBeNull();
    });

    it('shows the placeholder the caller passes on both credential fields', () => {
        render(
            <LoginFormRoot>
                <LoginFormEmail placeholder="you@work.example" />
                <LoginFormPassword placeholder="Your secret" />
            </LoginFormRoot>,
        );

        expect(
            screen.getByLabelText(/^Email address/).getAttribute('placeholder'),
        ).toBe('you@work.example');
        expect(
            screen.getByLabelText(/^Password/).getAttribute('placeholder'),
        ).toBe('Your secret');
    });

    it('lets an explicit label and error win over the root on the password field', () => {
        render(
            <LoginFormRoot
                errors={{ password: 'From the root' }}
                labels={{ passwordLabel: 'From the root' }}
            >
                <LoginFormPassword
                    label="Passphrase"
                    error="Too short, from the prop"
                />
            </LoginFormRoot>,
        );

        expect(
            screen.getByLabelText('Passphrase', { exact: false }),
        ).not.toBeNull();
        expect(screen.getByText('Too short, from the prop')).not.toBeNull();
        expect(screen.queryByText('From the root')).toBeNull();
    });

    it('labels the forgot-password link with the wording the caller passes', () => {
        render(
            <LoginFormRoot>
                <LoginFormPassword
                    forgotPasswordHref="/forgot"
                    forgotPasswordLabel="Reset it here"
                />
            </LoginFormRoot>,
        );

        expect(
            screen.getByRole('link', { name: 'Reset it here' }),
        ).not.toBeNull();
        expect(screen.queryByRole('link', { name: /Forgot/ })).toBeNull();
    });

    it('renders the forgot-password link with the field link component in place of the root one', () => {
        render(
            <LoginFormRoot linkComponent={RootLink}>
                <LoginFormPassword
                    forgotPasswordHref="/forgot"
                    linkComponent={FieldLink}
                />
            </LoginFormRoot>,
        );

        expect(screen.getByRole('link').getAttribute('data-link-source')).toBe(
            'field',
        );
    });

    it('names and labels the remember checkbox from its own props', () => {
        render(
            <form>
                <LoginFormRoot>
                    <LoginFormRemember
                        name="stay_signed_in"
                        label="Keep me here"
                    />
                </LoginFormRoot>
            </form>,
        );

        expect(screen.getByLabelText('Keep me here')).not.toBeNull();
        expect(screen.queryByLabelText('Remember me')).toBeNull();
        expect(
            document.querySelector('input[name="stay_signed_in"]'),
        ).not.toBeNull();
    });

    it('shows the submit labels the caller passes, idle and pending', () => {
        render(
            <LoginFormRoot labels={{ submitLabel: 'From the root' }}>
                <LoginFormSubmit label="Enter" />
            </LoginFormRoot>,
        );

        expect(screen.getByRole('button', { name: 'Enter' })).not.toBeNull();

        cleanup();

        render(
            <LoginFormRoot
                processing
                labels={{ submittingLabel: 'From the root' }}
            >
                <LoginFormSubmit submittingLabel="Working" />
            </LoginFormRoot>,
        );

        expect(screen.getByRole('button', { name: 'Working' })).not.toBeNull();
    });

    it('lets the submit button carry its own processing state, with no root driving it', () => {
        render(
            <LoginFormRoot>
                <LoginFormSubmit processing submittingLabel="Working" />
            </LoginFormRoot>,
        );

        const button = screen.getByRole('button', { name: 'Working' });

        expect(button.hasAttribute('disabled')).toBe(true);
        expect(button.getAttribute('aria-busy')).toBe('true');
    });

    it('adds the caller class to the root and to the preset, alongside the layout classes they own', () => {
        render(
            <LoginFormRoot className="max-w-sm">
                <LoginFormEmail />
            </LoginFormRoot>,
        );

        const root = document.querySelector('[data-slot="login-form"]');

        expect(root?.classList.contains('max-w-sm')).toBe(true);
        expect(root?.classList.contains('grid')).toBe(true);

        cleanup();

        render(<LoginFormPreset className="max-w-md" />);

        const preset = document.querySelector('[data-slot="login-form"]');

        expect(preset?.classList.contains('max-w-md')).toBe(true);
        expect(preset?.classList.contains('grid')).toBe(true);
    });
});
