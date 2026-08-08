/** @vitest-environment jsdom */

import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import {
    LoginFormEmail,
    LoginFormPassword,
    LoginFormRemember,
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

        expect(screen.getByLabelText('Email address').tagName).toBe('INPUT');
        expect(screen.getByLabelText('Password').tagName).toBe('INPUT');
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
        const button = screen.getByRole('button');

        expect(button.hasAttribute('disabled')).toBe(true);
        expect(button.textContent).toContain('Signing in');
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

    it('names the remember checkbox', () => {
        render(
            <LoginFormRoot>
                <LoginFormRemember />
            </LoginFormRoot>,
        );

        expect(screen.getByLabelText('Remember me')).not.toBeNull();
    });

    it('works standalone, with no root above it', () => {
        render(<LoginFormEmail error="Required." label="E-mail" />);

        expect(screen.getByLabelText('E-mail')).not.toBeNull();
        expect(screen.getByText('Required.')).not.toBeNull();
    });

    it('lets explicit props win over the root', () => {
        render(
            <LoginFormRoot
                errors={{ email: 'From the root' }}
                labels={{ emailLabel: 'From the root' }}
            >
                <LoginFormEmail error="From the prop" label="From the prop" />
            </LoginFormRoot>,
        );

        expect(screen.getByLabelText('From the prop')).not.toBeNull();
        expect(
            screen.getByText('From the prop', { selector: 'p' }),
        ).not.toBeNull();
        expect(screen.queryByText('From the root')).toBeNull();
    });
});
