/** @vitest-environment jsdom */

import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it } from 'vitest';

import { PasskeyRegisterButton } from './register-button';

afterEach(cleanup);

function nameInput(): HTMLInputElement {
    return screen.getByLabelText('Passkey name');
}

async function openForm() {
    await userEvent.click(screen.getByRole('button', { name: 'Add passkey' }));
}

describe('the passkey register button', () => {
    it('asks for a name before it registers anything', async () => {
        const registered: string[] = [];

        render(
            <PasskeyRegisterButton
                defaultName=""
                onRegister={(name) => void registered.push(name)}
            />,
        );

        await openForm();

        expect(
            screen.getByRole('button', { name: 'Register passkey' }),
        ).toHaveProperty('disabled', true);
        expect(registered).toEqual([]);
    });

    it('registers the trimmed name and closes the form', async () => {
        const registered: string[] = [];

        render(
            <PasskeyRegisterButton
                defaultName=""
                onRegister={(name) => void registered.push(name)}
            />,
        );

        await openForm();
        await userEvent.type(nameInput(), '  Work laptop  ');
        await userEvent.click(
            screen.getByRole('button', { name: 'Register passkey' }),
        );

        expect(registered).toEqual(['Work laptop']);
        await waitFor(() =>
            expect(screen.queryByLabelText('Passkey name')).toBeNull(),
        );
    });

    it('keeps the form open with the name when the ceremony fails', async () => {
        render(
            <PasskeyRegisterButton
                defaultName="Work laptop"
                onRegister={() => Promise.reject(new Error('cancelled'))}
            />,
        );

        await openForm();
        await userEvent.click(
            screen.getByRole('button', { name: 'Register passkey' }),
        );

        await waitFor(() =>
            expect(
                screen.getByText('That did not work. Try again.'),
            ).not.toBeNull(),
        );
        expect(nameInput().value).toBe('Work laptop');
    });

    it('prefers the error the ceremony reported over the fallback', async () => {
        render(
            <PasskeyRegisterButton
                onRegister={() => {}}
                error="This passkey is already registered."
            />,
        );

        await openForm();

        expect(
            screen.getByText('This passkey is already registered.'),
        ).not.toBeNull();
    });

    it('stays disabled while the app reports the ceremony running', async () => {
        render(
            <PasskeyRegisterButton
                defaultName="Work laptop"
                processing
                onRegister={() => {}}
            />,
        );

        await openForm();

        expect(
            screen.getByRole('button', { name: /Register passkey/ }),
        ).toHaveProperty('disabled', true);
    });

    it('closes without registering when cancelled', async () => {
        const registered: string[] = [];

        render(
            <PasskeyRegisterButton
                onRegister={(name) => void registered.push(name)}
            />,
        );

        await openForm();
        await userEvent.click(screen.getByRole('button', { name: 'Cancel' }));

        expect(screen.queryByLabelText('Passkey name')).toBeNull();
        expect(registered).toEqual([]);
    });

    it('says so where the browser cannot run the ceremony', () => {
        render(
            <PasskeyRegisterButton supported={false} onRegister={() => {}} />,
        );

        expect(
            screen.getByText('Passkeys are not supported in this browser.'),
        ).not.toBeNull();
        expect(screen.queryByRole('button')).toBeNull();
    });
});
