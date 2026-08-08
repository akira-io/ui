/** @vitest-environment jsdom */

import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { LoginFormPreset } from './preset';

afterEach(cleanup);

describe('the login form preset', () => {
    it('renders the ordinary screen from one element', () => {
        render(<LoginFormPreset />);

        expect(screen.getByLabelText('Email address')).not.toBeNull();
        expect(screen.getByLabelText('Password')).not.toBeNull();
        expect(screen.getByLabelText('Remember me')).not.toBeNull();
        expect(screen.getByRole('button', { name: 'Log in' })).not.toBeNull();
    });

    it('accepts a slotName override, like every other markup-rendering part', () => {
        const { container } = render(<LoginFormPreset slotName="my-login" />);

        expect(
            container.querySelector('[data-slot="my-login"]'),
        ).not.toBeNull();
        expect(container.querySelector('[data-slot="login-form"]')).toBeNull();
    });

    it('omits the forgot password link when the app cannot reset', () => {
        render(<LoginFormPreset />);

        expect(screen.queryByRole('link')).toBeNull();
    });

    it('shows the forgot password link when given a target', () => {
        render(<LoginFormPreset forgotPasswordHref="/forgot" />);

        expect(
            screen.getByRole('link', { name: 'Forgot your password?' }),
        ).not.toBeNull();
    });

    it('passes the errors and the pending state down to the parts', () => {
        render(
            <LoginFormPreset
                errors={{ email: 'These credentials do not match.' }}
                processing
            />,
        );

        expect(
            screen.getByText('These credentials do not match.'),
        ).not.toBeNull();
        expect(
            screen
                .getByRole('button', { name: 'Signing in' })
                .hasAttribute('disabled'),
        ).toBe(true);
    });
});
