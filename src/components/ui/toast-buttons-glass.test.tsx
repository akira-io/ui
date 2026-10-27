// @vitest-environment jsdom

import { act, cleanup, render, screen, waitFor } from '@testing-library/react';
import { toast as sonner } from 'sonner';
import { afterEach, describe, expect, it } from 'vitest';

import { Toaster } from '@/components/ui/sonner';
import { toast } from '@/components/ui/toast';

afterEach(() => {
    act(() => sonner.dismiss());
    cleanup();
});

describe('the buttons inside a glass toast', () => {
    it('draws the action as a glass bubble, not an opaque secondary fill', async () => {
        render(<Toaster />);
        act(() => {
            toast.success('Changes saved.', {
                action: { label: 'Undo', onClick: () => undefined },
            });
        });

        const action = (
            await screen.findByRole('button', { name: 'Undo' })
        ).className.split(' ');

        expect(action).toContain('glass-button');
        expect(action).not.toContain('bg-secondary');
    });

    it('draws the close button as a glass bubble, not an opaque popover', async () => {
        render(<Toaster closeButton />);
        act(() => {
            sonner('Ticket issued');
        });

        const toastElement = (await screen.findByText('Ticket issued')).closest(
            '[data-sonner-toast]',
        );
        const close = await waitFor(() => {
            const button = toastElement?.querySelector<HTMLElement>(
                '[data-close-button]',
            );
            expect(button).toBeTruthy();
            return button!;
        });
        const classes = close.className.split(' ');

        expect(classes).toContain('glass-button');
        expect(classes).toContain('border-0!');
        expect(classes).not.toContain('bg-popover');
    });
});
