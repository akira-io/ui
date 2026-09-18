/** @vitest-environment jsdom */

import { UiLocaleProvider } from '@/locales/context';
import { passkeyLabelsPt, ptLabels } from '@/locales/pt';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it } from 'vitest';

import { PasskeySignInButton } from './sign-in-button';

afterEach(cleanup);

describe('the passkey sign-in button', () => {
    it('starts the ceremony when pressed', async () => {
        let started = 0;

        render(<PasskeySignInButton onSignIn={() => void started++} />);

        await userEvent.click(
            screen.getByRole('button', { name: 'Sign in with a passkey' }),
        );

        expect(started).toBe(1);
    });

    it('renders nothing where the browser cannot run the ceremony', () => {
        const { container } = render(
            <PasskeySignInButton supported={false} onSignIn={() => {}} />,
        );

        expect(container.innerHTML).toBe('');
    });

    it('stays disabled while the ceremony runs, so a second press cannot start another', async () => {
        let finish: () => void = () => {};

        render(
            <PasskeySignInButton
                onSignIn={() => new Promise<void>((done) => (finish = done))}
            />,
        );

        const button = screen.getByRole('button');

        await userEvent.click(button);

        expect(button).toHaveProperty('disabled', true);
        expect(button.textContent).toContain('Signing in');

        finish();

        await waitFor(() => expect(button).toHaveProperty('disabled', false));
    });

    it('shows the error the ceremony reported', () => {
        render(
            <PasskeySignInButton
                onSignIn={() => {}}
                error="The passkey was not recognised."
            />,
        );

        expect(
            screen.getByText('The passkey was not recognised.'),
        ).not.toBeNull();
    });

    it('reads its labels from the locale provider', () => {
        render(
            <UiLocaleProvider labels={ptLabels}>
                <PasskeySignInButton onSignIn={() => {}} />
            </UiLocaleProvider>,
        );

        expect(
            screen.getByRole('button', { name: passkeyLabelsPt.signInLabel }),
        ).not.toBeNull();
    });
});
