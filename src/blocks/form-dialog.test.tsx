// @vitest-environment jsdom

import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';

import {
    FormDialogFixture,
    overlayDialog,
} from '../../tests/fixtures/form-overlays';

afterEach(cleanup);

async function openDialog(user: ReturnType<typeof userEvent.setup>) {
    await user.click(screen.getByRole('button', { name: 'New fare' }));

    await waitFor(() => expect(overlayDialog()).not.toBeNull());
}

describe('the form dialog', () => {
    it('saves through the footer control', async () => {
        const user = userEvent.setup();
        const onSave = vi.fn();
        render(<FormDialogFixture onSave={onSave} />);

        await openDialog(user);
        await user.click(screen.getByRole('button', { name: 'Save' }));

        expect(onSave).toHaveBeenCalledTimes(1);
    });

    it('saves when a field takes the enter key', async () => {
        const user = userEvent.setup();
        const onSave = vi.fn();
        render(<FormDialogFixture onSave={onSave} />);

        await openDialog(user);
        await user.type(screen.getByLabelText('Amount'), '{Enter}');

        expect(onSave).toHaveBeenCalledTimes(1);
    });

    it('closes and reports the cancel', async () => {
        const user = userEvent.setup();
        const onCancel = vi.fn();
        render(<FormDialogFixture onSave={vi.fn()} onCancel={onCancel} />);

        await openDialog(user);
        await user.click(screen.getByRole('button', { name: 'Cancel' }));

        expect(onCancel).toHaveBeenCalledTimes(1);
        await waitFor(() => expect(overlayDialog()).toBeNull());
    });

    it('disables both controls and names the save control for the pending state', async () => {
        const user = userEvent.setup();
        render(<FormDialogFixture processing onSave={vi.fn()} />);

        await openDialog(user);

        const cancel = screen.getByRole<HTMLButtonElement>('button', {
            name: 'Cancel',
        });
        const save = screen.getByRole<HTMLButtonElement>('button', {
            name: 'Saving...',
        });

        expect(cancel.disabled).toBe(true);
        expect(save.disabled).toBe(true);
        expect(save.textContent).toContain('Saving...');
    });

    it('refuses to dismiss on escape while it is processing', async () => {
        const user = userEvent.setup();
        render(<FormDialogFixture processing onSave={vi.fn()} />);

        await openDialog(user);
        await user.keyboard('{Escape}');

        expect(overlayDialog()).not.toBeNull();
    });

    it('refuses to dismiss on an outside click while it is processing', async () => {
        const user = userEvent.setup();
        render(<FormDialogFixture processing onSave={vi.fn()} />);

        await openDialog(user);

        const overlay = document.querySelector<HTMLElement>(
            '[data-slot="dialog-overlay"]',
        );

        expect(overlay).not.toBeNull();
        await user.click(overlay as HTMLElement);

        expect(overlayDialog()).not.toBeNull();
    });

    it('dismisses on escape once it is no longer processing', async () => {
        const user = userEvent.setup();
        render(<FormDialogFixture onSave={vi.fn()} />);

        await openDialog(user);
        await user.keyboard('{Escape}');

        await waitFor(() => expect(overlayDialog()).toBeNull());
    });

    it('puts the focus on the first field rather than the close control', async () => {
        const user = userEvent.setup();
        render(<FormDialogFixture onSave={vi.fn()} />);

        await openDialog(user);

        await waitFor(() =>
            expect(document.activeElement).toBe(
                screen.getByLabelText('Amount'),
            ),
        );
    });
});
