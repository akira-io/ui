/** @vitest-environment jsdom */

import { UiLocaleProvider } from '@/locales/context';
import { passkeyLabelsPt, ptLabels } from '@/locales/pt';
import {
    cleanup,
    render,
    screen,
    waitFor,
    within,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it } from 'vitest';

import { PasskeyList } from './list';
import type { Passkey } from './types';

afterEach(cleanup);

const laptop: Passkey = {
    id: 7,
    name: 'Work laptop',
    authenticator: 'iCloud Keychain',
    createdAt: '3 days ago',
    lastUsedAt: 'yesterday',
};

const phone: Passkey = {
    id: 9,
    name: 'Phone',
    createdAt: 'last week',
};

function frame(): HTMLElement {
    return document.querySelector<HTMLElement>(
        '[data-slot="passkey-list-frame"]',
    )!;
}

describe('the passkey list', () => {
    it('shows each passkey with its authenticator and when it was added and last used', () => {
        render(<PasskeyList passkeys={[laptop, phone]} onDelete={() => {}} />);

        const rows = within(frame()).getAllByRole('listitem');

        expect(rows).toHaveLength(2);
        expect(rows[0].textContent).toContain('Work laptop');
        expect(rows[0].textContent).toContain('iCloud Keychain');
        expect(rows[0].textContent).toContain('Added 3 days ago');
        expect(rows[0].textContent).toContain('Last used yesterday');
        expect(rows[1].textContent).not.toContain('Last used');
    });

    it('removes a passkey only after the confirmation', async () => {
        const removed: Passkey[] = [];

        render(
            <PasskeyList
                passkeys={[laptop]}
                onDelete={(passkey) => void removed.push(passkey)}
            />,
        );

        await userEvent.click(
            screen.getByRole('button', { name: 'Remove Work laptop' }),
        );

        expect(removed).toEqual([]);

        await userEvent.click(
            screen.getByRole('button', { name: 'Remove passkey' }),
        );

        await waitFor(() => expect(removed).toEqual([laptop]));
    });

    it('keeps the confirmation open when the removal fails', async () => {
        render(
            <PasskeyList
                passkeys={[laptop]}
                onDelete={() => Promise.reject(new Error('refused'))}
            />,
        );

        await userEvent.click(
            screen.getByRole('button', { name: 'Remove Work laptop' }),
        );
        await userEvent.click(
            screen.getByRole('button', { name: 'Remove passkey' }),
        );

        await waitFor(() =>
            expect(
                screen.getByRole('button', { name: 'Remove passkey' }),
            ).toHaveProperty('disabled', false),
        );
        expect(screen.getByRole('dialog')).not.toBeNull();
    });

    it('frames an empty state, and keeps the action below and outside the frame', () => {
        render(
            <PasskeyList passkeys={[]} onDelete={() => {}}>
                <button type="button">Add passkey</button>
            </PasskeyList>,
        );

        expect(frame().textContent).toContain('No passkeys yet');
        expect(frame().textContent).toContain(
            'Add a passkey to sign in without a password.',
        );
        expect(
            within(frame()).queryByRole('button', { name: 'Add passkey' }),
        ).toBeNull();
        expect(
            screen.getByRole('button', { name: 'Add passkey' }),
        ).not.toBeNull();
    });

    it('reads the empty state from the locale provider', () => {
        render(
            <UiLocaleProvider labels={ptLabels}>
                <PasskeyList passkeys={[]} onDelete={() => {}} />
            </UiLocaleProvider>,
        );

        expect(frame().textContent).toContain(passkeyLabelsPt.emptyTitle);
    });
});
