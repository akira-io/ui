/** @vitest-environment jsdom */

import { router } from '@inertiajs/react';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import * as blocksEntry from '@/blocks';
import * as inertiaEntry from '@/inertia';
import {
    InertiaPasskeyList,
    InertiaPasskeyRegisterButton,
    InertiaPasskeySignInButton,
} from '@/inertia-passkeys';

const webAuthn = globalThis as { PublicKeyCredential?: unknown };

beforeEach(() => {
    webAuthn.PublicKeyCredential = class {};
});

afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    delete webAuthn.PublicKeyCredential;
});

const laptop = { id: 7, name: 'Work laptop', createdAt: '3 days ago' };

describe('the Inertia passkey bindings', () => {
    it('ship from their own entry, so an Inertia app without passkeys never installs the client', () => {
        expect(inertiaEntry).not.toHaveProperty('InertiaPasskeySignInButton');
        expect(blocksEntry).not.toHaveProperty('InertiaPasskeySignInButton');
    });

    it('offer the sign-in button where the browser runs WebAuthn', () => {
        render(<InertiaPasskeySignInButton />);

        expect(
            screen.getByRole('button', { name: 'Sign in with a passkey' }),
        ).not.toBeNull();
    });

    it('hide the sign-in button where it does not', () => {
        delete webAuthn.PublicKeyCredential;

        const { container } = render(<InertiaPasskeySignInButton />);

        expect(container.innerHTML).toBe('');
    });

    it('say registration is unsupported where the browser cannot run it', () => {
        delete webAuthn.PublicKeyCredential;

        render(<InertiaPasskeyRegisterButton />);

        expect(
            screen.getByText('Passkeys are not supported in this browser.'),
        ).not.toBeNull();
    });

    it('remove a passkey through a DELETE visit to the url the app names', async () => {
        const remove = vi
            .spyOn(router, 'delete')
            .mockImplementation((_, options) =>
                options?.onFinish?.({} as never),
            );

        render(
            <InertiaPasskeyList
                passkeys={[laptop]}
                destroyUrl={(passkey) => `/user/passkeys/${passkey.id}`}
            />,
        );

        await userEvent.click(
            screen.getByRole('button', { name: 'Remove Work laptop' }),
        );
        await userEvent.click(
            screen.getByRole('button', { name: 'Remove passkey' }),
        );

        await waitFor(() =>
            expect(remove).toHaveBeenCalledWith(
                '/user/passkeys/7',
                expect.objectContaining({ preserveScroll: true }),
            ),
        );
    });

    it('accept a Wayfinder route object as the url', async () => {
        const remove = vi
            .spyOn(router, 'delete')
            .mockImplementation((_, options) =>
                options?.onFinish?.({} as never),
            );

        render(
            <InertiaPasskeyList
                passkeys={[laptop]}
                destroyUrl={(passkey) => ({
                    url: `/user/passkeys/${passkey.id}`,
                    method: 'delete',
                })}
            />,
        );

        await userEvent.click(
            screen.getByRole('button', { name: 'Remove Work laptop' }),
        );
        await userEvent.click(
            screen.getByRole('button', { name: 'Remove passkey' }),
        );

        await waitFor(() =>
            expect(remove.mock.calls[0]?.[0]).toBe('/user/passkeys/7'),
        );
    });
});
