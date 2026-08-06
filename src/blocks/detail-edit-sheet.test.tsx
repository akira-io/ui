// @vitest-environment jsdom

import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';

import {
    EditSheetFixture,
    overlayPanel,
} from '../../tests/fixtures/form-overlays';

afterEach(cleanup);

async function openSheet(user: ReturnType<typeof userEvent.setup>) {
    await user.click(screen.getByRole('button', { name: 'Edit driver' }));

    await waitFor(() => expect(overlayPanel()).not.toBeNull());
}

describe('the detail edit sheet', () => {
    it('saves through the footer control', async () => {
        const user = userEvent.setup();
        const onSave = vi.fn();
        render(<EditSheetFixture onSave={onSave} />);

        await openSheet(user);
        await user.click(screen.getByRole('button', { name: 'Save' }));

        expect(onSave).toHaveBeenCalledTimes(1);
    });

    it('saves when a field takes the enter key, because the footer submits a form', async () => {
        const user = userEvent.setup();
        const onSave = vi.fn();
        render(<EditSheetFixture onSave={onSave} />);

        await openSheet(user);
        await user.type(screen.getByLabelText('Name'), '{Enter}');

        expect(onSave).toHaveBeenCalledTimes(1);
    });

    it('closes and reports the cancel', async () => {
        const user = userEvent.setup();
        const onCancel = vi.fn();
        render(<EditSheetFixture onSave={vi.fn()} onCancel={onCancel} />);

        await openSheet(user);
        await user.click(screen.getByRole('button', { name: 'Cancel' }));

        expect(onCancel).toHaveBeenCalledTimes(1);
        await waitFor(() => expect(overlayPanel()).toBeNull());
    });

    it('disables both controls and names the save control for the pending state', async () => {
        const user = userEvent.setup();
        render(<EditSheetFixture processing onSave={vi.fn()} />);

        await openSheet(user);

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

    it('does not save while it is already processing', async () => {
        const user = userEvent.setup();
        const onSave = vi.fn();
        render(<EditSheetFixture processing onSave={onSave} />);

        await openSheet(user);
        await user.type(screen.getByLabelText('Name'), '{Enter}');

        expect(onSave).not.toHaveBeenCalled();
    });

    it('stays open when the scrim outside the panel is clicked', async () => {
        const user = userEvent.setup();
        render(<EditSheetFixture onSave={vi.fn()} />);

        await openSheet(user);

        const overlay = document.querySelector<HTMLElement>(
            '[data-slot="floating-sheet-overlay"]',
        );

        expect(overlay).not.toBeNull();
        await user.click(overlay as HTMLElement);

        expect(overlayPanel()).not.toBeNull();
    });

    it('stays open on escape', async () => {
        const user = userEvent.setup();
        render(<EditSheetFixture onSave={vi.fn()} />);

        await openSheet(user);
        await user.keyboard('{Escape}');

        expect(overlayPanel()).not.toBeNull();
    });

    it('still closes from the close control', async () => {
        const user = userEvent.setup();
        render(<EditSheetFixture onSave={vi.fn()} />);

        await openSheet(user);
        await user.click(screen.getByRole('button', { name: 'Close' }));

        await waitFor(() => expect(overlayPanel()).toBeNull());
    });

    it('takes its labels from the caller', async () => {
        const user = userEvent.setup();
        render(
            <EditSheetFixture
                onSave={vi.fn()}
                labels={{
                    cancelLabel: 'Cancelar',
                    saveLabel: 'Guardar',
                    savingLabel: 'A guardar...',
                }}
            />,
        );

        await openSheet(user);

        expect(screen.getByRole('button', { name: 'Guardar' })).not.toBeNull();
        expect(screen.getByRole('button', { name: 'Cancelar' })).not.toBeNull();
    });
});
