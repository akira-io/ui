// @vitest-environment jsdom

import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';

import { Toaster } from '@/components/ui/sonner';
import { toast } from '@/components/ui/toast';

beforeAll(() => {
    Object.assign(window.HTMLElement.prototype, {
        hasPointerCapture: () => false,
        setPointerCapture: () => undefined,
        releasePointerCapture: () => undefined,
    });
});

afterEach(() => {
    toast.dismiss();
    cleanup();
});

function renderToaster() {
    return render(<Toaster />);
}

describe('a toast with an action', () => {
    it('runs the handler when the action is clicked', async () => {
        const undo = vi.fn();
        renderToaster();

        toast.success('Changes saved.', {
            action: { label: 'Undo', onClick: undo },
        });

        await userEvent.click(
            await screen.findByRole('button', { name: 'Undo' }),
        );

        expect(undo).toHaveBeenCalledOnce();
    });

    it('dismisses the toast once the handler has run', async () => {
        renderToaster();

        toast.success('Changes saved.', {
            action: { label: 'Undo', onClick: vi.fn() },
        });

        await userEvent.click(
            await screen.findByRole('button', { name: 'Undo' }),
        );

        await waitFor(() => {
            expect(screen.queryByText('Changes saved.')).toBeNull();
        });
    });

    it('keeps the toast open when the action says not to dismiss', async () => {
        renderToaster();

        toast.success('Changes saved.', {
            action: { label: 'Undo', onClick: vi.fn(), dismiss: false },
        });

        await userEvent.click(
            await screen.findByRole('button', { name: 'Undo' }),
        );

        expect(screen.getByText('Changes saved.')).toBeTruthy();
    });

    it('waits for a handler that returns a promise, and says it is working', async () => {
        let settle = () => {};
        const pending = new Promise<void>((resolve) => {
            settle = resolve;
        });

        renderToaster();

        toast.success('Changes saved.', {
            action: { label: 'Undo', onClick: () => pending },
        });

        const action = await screen.findByRole('button', { name: 'Undo' });

        await userEvent.click(action);

        expect(action.getAttribute('disabled')).not.toBeNull();
        expect(screen.getByText('Changes saved.')).toBeTruthy();

        settle();

        await waitFor(() => {
            expect(screen.queryByText('Changes saved.')).toBeNull();
        });
    });
});

describe('an action whose handler returns something', () => {
    it('accepts a handler that returns a value, so raising another toast is one expression', async () => {
        renderToaster();

        toast.warning('Delete this invoice?', {
            action: {
                label: 'Delete',
                onClick: () => toast.success('Invoice deleted.'),
            },
        });

        await userEvent.click(
            await screen.findByRole('button', { name: 'Delete' }),
        );

        expect(await screen.findByText('Invoice deleted.')).toBeTruthy();
    });
});

describe('an action that is a link', () => {
    it('renders an anchor, so the browser keeps its own behaviour', async () => {
        renderToaster();

        toast.info('Invoice ready.', {
            action: { label: 'Open', href: '/invoices/1' },
        });

        const link = await screen.findByRole('link', { name: 'Open' });

        expect(link.getAttribute('href')).toBe('/invoices/1');
    });

    it('names a referrer policy when it opens a new tab', async () => {
        renderToaster();

        toast.info('Invoice ready.', {
            action: { label: 'Open', href: '/invoices/1', target: '_blank' },
        });

        const link = await screen.findByRole('link', { name: 'Open' });

        expect(link.getAttribute('rel')).toBe('noreferrer');
    });
});

describe('a toast with a cancel action', () => {
    it('renders it alongside the action', async () => {
        const keep = vi.fn();
        renderToaster();

        toast.warning('Delete this invoice?', {
            action: { label: 'Delete', onClick: vi.fn() },
            cancel: { label: 'Keep', onClick: keep },
        });

        await userEvent.click(
            await screen.findByRole('button', { name: 'Keep' }),
        );

        expect(keep).toHaveBeenCalledOnce();
    });
});

describe('the toaster', () => {
    it('shows a close button without being asked', async () => {
        renderToaster();

        toast.message('Saved.');

        expect(
            await screen.findByRole('button', { name: /close/i }),
        ).toBeTruthy();
    });
});
