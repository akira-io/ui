// @vitest-environment jsdom

import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it } from 'vitest';

import { DangerZone } from '@/blocks/danger-zone';
import { PasskeyItem } from '@/blocks/passkeys/item';
import { TwoFactorDisableButton } from '@/blocks/two-factor/disable-button';
import {
    useConfirmDialog,
    type UseConfirmDialogOptions,
} from '@/hooks/use-confirm-dialog';

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

    it('asks for the destructive colour before a danger zone action', async () => {
        const user = userEvent.setup();
        render(
            <DangerZone
                actions={[
                    {
                        id: 'delete',
                        title: 'Delete account',
                        onConfirm: () => {},
                    },
                ]}
            />,
        );

        await user.click(screen.getByRole('button', { name: 'Delete' }));

        expect(confirmButton()?.getAttribute('data-variant')).toBe(
            'destructive',
        );
    });
});

function Confirming({ options }: { options: UseConfirmDialogOptions }) {
    const { confirm, ConfirmDialog } = useConfirmDialog();

    return (
        <>
            <button onClick={() => confirm(() => {}, options)}>Ask</button>
            <ConfirmDialog />
        </>
    );
}

describe('a confirm dialog opened from code', () => {
    it('confirms in the primary colour unless told the action is destructive', async () => {
        const user = userEvent.setup();
        const { unmount } = render(<Confirming options={{}} />);

        await user.click(screen.getByText('Ask'));

        expect(confirmButton()?.getAttribute('data-variant')).toBe('default');

        unmount();
        render(<Confirming options={{ variant: 'destructive' }} />);
        await user.click(screen.getByText('Ask'));

        expect(confirmButton()?.getAttribute('data-variant')).toBe(
            'destructive',
        );
    });
});
