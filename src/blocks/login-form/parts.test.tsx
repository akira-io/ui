/** @vitest-environment jsdom */

import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import {
    LoginFormEmail,
    LoginFormPassword,
    LoginFormRoot,
    LoginFormStatus,
    LoginFormSubmit,
} from './parts';

afterEach(cleanup);

describe('the login form parts', () => {
    it('binds each label to its input', () => {
        render(
            <LoginFormRoot>
                <LoginFormEmail />
                <LoginFormPassword />
            </LoginFormRoot>,
        );

        expect(screen.getByLabelText(/^Email address/).tagName).toBe('INPUT');
        expect(screen.getByLabelText(/^Password/).tagName).toBe('INPUT');
    });

    it('gives both credential fields the autoComplete a password manager reads, so it can offer and save credentials', () => {
        render(
            <LoginFormRoot>
                <LoginFormEmail />
                <LoginFormPassword />
            </LoginFormRoot>,
        );

        expect(
            screen
                .getByLabelText(/^Email address/)
                .getAttribute('autocomplete'),
        ).toBe('email');
        expect(
            screen.getByLabelText(/^Password/).getAttribute('autocomplete'),
        ).toBe('current-password');
    });

    it('shows the error the root carries for a field', () => {
        render(
            <LoginFormRoot
                errors={{ email: 'These credentials do not match.' }}
            >
                <LoginFormEmail />
            </LoginFormRoot>,
        );

        expect(
            screen.getByText('These credentials do not match.'),
        ).not.toBeNull();
    });

    it('takes the first message when a field carries several', () => {
        render(
            <LoginFormRoot errors={{ email: ['Required.', 'Too short.'] }}>
                <LoginFormEmail />
            </LoginFormRoot>,
        );

        expect(screen.getByText('Required.')).not.toBeNull();
        expect(screen.queryByText('Too short.')).toBeNull();
    });

    it('disables the submit and names the pending state while processing', () => {
        render(
            <LoginFormRoot processing>
                <LoginFormSubmit />
            </LoginFormRoot>,
        );
        const button = screen.getByRole('button', { name: 'Signing in' });

        expect(button.hasAttribute('disabled')).toBe(true);
    });

    it('marks the required email and password fields for a screen reader and sighted user, not just the browser', () => {
        render(
            <LoginFormRoot>
                <LoginFormEmail />
                <LoginFormPassword />
            </LoginFormRoot>,
        );

        expect(
            document.querySelectorAll('[data-slot="field-required"]'),
        ).toHaveLength(2);
    });

    it('gives the idle submit button the same loading-aware markup as the pending one, so it does not jump sideways on click', () => {
        render(
            <LoginFormRoot>
                <LoginFormSubmit />
            </LoginFormRoot>,
        );
        const button = screen.getByRole('button', { name: 'Log in' });

        expect(
            button.querySelector('[data-slot="button-content"]'),
        ).not.toBeNull();
        expect(
            button.querySelector('[data-slot="button-balance"]'),
        ).not.toBeNull();
    });

    it('renders the forgot password link only when given a target', () => {
        render(
            <LoginFormRoot>
                <LoginFormPassword forgotPasswordHref="/forgot" />
            </LoginFormRoot>,
        );

        expect(
            screen.getByRole('link', { name: 'Forgot your password?' }),
        ).not.toBeNull();

        cleanup();

        render(
            <LoginFormRoot>
                <LoginFormPassword />
            </LoginFormRoot>,
        );

        expect(screen.queryByRole('link')).toBeNull();
    });

    it('renders the status message only when there is one', () => {
        render(
            <LoginFormRoot>
                <LoginFormStatus message="Your password has been reset." />
            </LoginFormRoot>,
        );

        expect(
            screen.getByText('Your password has been reset.'),
        ).not.toBeNull();

        cleanup();

        render(
            <LoginFormRoot>
                <LoginFormStatus />
            </LoginFormRoot>,
        );

        expect(
            document.querySelector('[data-slot="login-form-status"]'),
        ).toBeNull();
    });

    it('marks the input invalid only when it has an error', () => {
        render(
            <LoginFormRoot errors={{ email: 'Required.' }}>
                <LoginFormEmail />
            </LoginFormRoot>,
        );

        expect(
            screen
                .getByLabelText(/^Email address/)
                .getAttribute('aria-invalid'),
        ).toBe('true');

        cleanup();

        render(
            <LoginFormRoot>
                <LoginFormEmail />
            </LoginFormRoot>,
        );

        expect(
            screen
                .getByLabelText(/^Email address/)
                .hasAttribute('aria-invalid'),
        ).toBe(false);
    });

    it('describes the input with the element that actually holds the error text', () => {
        render(
            <LoginFormRoot errors={{ email: 'Required.' }}>
                <LoginFormEmail />
            </LoginFormRoot>,
        );

        const input = screen.getByLabelText(/^Email address/);
        const describedBy = input.getAttribute('aria-describedby');

        expect(describedBy).not.toBeNull();

        const describedElement = document.getElementById(describedBy ?? '');

        expect(describedElement?.textContent).toBe('Required.');
    });

    it('marks the password input invalid only when it has an error', () => {
        render(
            <LoginFormRoot errors={{ password: 'Required.' }}>
                <LoginFormPassword />
            </LoginFormRoot>,
        );

        expect(
            screen.getByLabelText(/^Password/).getAttribute('aria-invalid'),
        ).toBe('true');

        cleanup();

        render(
            <LoginFormRoot>
                <LoginFormPassword />
            </LoginFormRoot>,
        );

        expect(
            screen.getByLabelText(/^Password/).hasAttribute('aria-invalid'),
        ).toBe(false);
    });

    it('describes the password input with the element that actually holds the error text', () => {
        render(
            <LoginFormRoot errors={{ password: 'Required.' }}>
                <LoginFormPassword />
            </LoginFormRoot>,
        );

        const input = screen.getByLabelText(/^Password/);
        const describedBy = input.getAttribute('aria-describedby');

        expect(describedBy).not.toBeNull();

        const describedElement = document.getElementById(describedBy ?? '');

        expect(describedElement?.textContent).toBe('Required.');
    });

    it('marks the submit button busy while processing', () => {
        render(
            <LoginFormRoot processing>
                <LoginFormSubmit />
            </LoginFormRoot>,
        );

        expect(screen.getByRole('button').getAttribute('aria-busy')).toBe(
            'true',
        );
    });

    it('lets a consumer relax autoFocus and required on the email field', () => {
        render(<LoginFormEmail autoFocus={false} required={false} />);

        const input = screen.getByLabelText(/^Email address/);

        expect(document.activeElement).not.toBe(input);
        expect(input.hasAttribute('required')).toBe(false);
    });

    it('still focuses and requires the email field by default', () => {
        render(<LoginFormEmail />);

        const input = screen.getByLabelText(/^Email address/);

        expect(document.activeElement).toBe(input);
        expect(input.hasAttribute('required')).toBe(true);
    });

    it('lets a consumer relax required on the password field and grant it autoFocus', () => {
        render(<LoginFormPassword required={false} autoFocus />);

        const input = screen.getByLabelText(/^Password/);

        expect(document.activeElement).toBe(input);
        expect(input.hasAttribute('required')).toBe(false);
    });

    it('requires the password field by default and does not steal focus from the email field', () => {
        render(<LoginFormPassword />);

        const input = screen.getByLabelText(/^Password/);

        expect(document.activeElement).not.toBe(input);
        expect(input.hasAttribute('required')).toBe(true);
    });
});
