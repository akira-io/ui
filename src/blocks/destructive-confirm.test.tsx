// @vitest-environment jsdom

import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it } from 'vitest';

import { PasskeyItem } from '@/blocks/passkeys/item';
import { TwoFactorDisableButton } from '@/blocks/two-factor/disable-button';

afterEach(cleanup);

const confirmButton = () =>
    document.querySelectorAll<HTMLButtonElement>(
        '[data-slot="confirm-dialog"] [data-slot="dialog-footer"] button',
    )[1];

describe('blocks that confirm a destructive action', () => {
    it('asks for the destructive colour before removing a passkey', async () => {
        const user = userEvent.setup();
        render(
            <PasskeyItem
                passkey={{ id: '1', name: 'MacBook', createdAt: '2026-10-01' }}
                onDelete={() => {}}
            />,
        );

        await user.click(screen.getByRole('button'));

        expect(confirmButton()?.getAttribute('data-variant')).toBe(
            'destructive',
        );
    });

    it('asks for the destructive colour before disabling two factor', async () => {
        const user = userEvent.setup();
        render(<TwoFactorDisableButton onDisable={() => {}} />);

        await user.click(screen.getByRole('button'));

        expect(confirmButton()?.getAttribute('data-variant')).toBe(
            'destructive',
        );
    });
});
