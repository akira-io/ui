// @vitest-environment jsdom

import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { CopyButton } from '@/components/ui/copy-button';
import {
    stubClipboard,
    type ClipboardStub,
} from '../../../tests/fixtures/clipboard';

let clipboard: ClipboardStub | undefined;

afterEach(() => {
    cleanup();
    clipboard?.restore();
    clipboard = undefined;
    vi.restoreAllMocks();
});

function resting() {
    return screen.getByRole('button', { name: 'Copy' });
}

describe('the copy button', () => {
    it('writes the value to the clipboard', async () => {
        const user = userEvent.setup();
        clipboard = stubClipboard();

        render(<CopyButton value="26894" />);
        await user.click(resting());

        await waitFor(() => expect(clipboard?.writes).toEqual(['26894']));
    });

    it('acknowledges the copy', async () => {
        const user = userEvent.setup();
        clipboard = stubClipboard();

        render(<CopyButton value="26894" acknowledgementDuration={600_000} />);
        await user.click(resting());

        const acknowledged = await screen.findByRole('button', {
            name: 'Copied',
        });

        expect(acknowledged.getAttribute('data-copied')).toBe('true');
        expect(
            acknowledged.querySelector('[data-slot="copy-button-status"]')
                ?.textContent,
        ).toBe('Copied');
    });

    it('returns to its resting state once the acknowledgement elapses', async () => {
        const user = userEvent.setup();
        clipboard = stubClipboard();
        const onCopied = vi.fn();

        render(
            <CopyButton
                value="26894"
                acknowledgementDuration={20}
                onCopied={onCopied}
            />,
        );
        await user.click(resting());

        await waitFor(() => expect(onCopied).toHaveBeenCalledTimes(1));

        await waitFor(() =>
            expect(screen.getByRole('button').getAttribute('aria-label')).toBe(
                'Copy',
            ),
        );
        expect(screen.getByRole('button').hasAttribute('data-copied')).toBe(
            false,
        );
    });

    it('is reachable and operable from the keyboard', async () => {
        const user = userEvent.setup();
        clipboard = stubClipboard();

        render(<CopyButton value="26894" />);
        await user.tab();

        expect(document.activeElement).toBe(resting());

        await user.keyboard('{Enter}');

        await waitFor(() => expect(clipboard?.writes).toEqual(['26894']));
    });

    it('reports a rejected write instead of showing a false confirmation', async () => {
        const reason = new Error('denied');
        const user = userEvent.setup();
        clipboard = stubClipboard({ rejectWith: reason });
        const onCopyFailed = vi.fn();
        const onCopied = vi.fn();

        render(
            <CopyButton
                value="26894"
                onCopied={onCopied}
                onCopyFailed={onCopyFailed}
            />,
        );
        await user.click(resting());

        await waitFor(() => expect(onCopyFailed).toHaveBeenCalledWith(reason));
        expect(onCopied).not.toHaveBeenCalled();
        expect(screen.getByRole('button', { name: 'Copy' })).toBeDefined();
    });

    it('reports an unavailable clipboard instead of showing a false confirmation', async () => {
        const user = userEvent.setup();
        clipboard = stubClipboard({ unavailable: true });
        const onCopyFailed = vi.fn();

        render(<CopyButton value="26894" onCopyFailed={onCopyFailed} />);
        await user.click(resting());

        await waitFor(() => expect(onCopyFailed).toHaveBeenCalledTimes(1));
        expect(screen.getByRole('button', { name: 'Copy' })).toBeDefined();
    });

    it('reports the copied value so an app can raise its own toast', async () => {
        const user = userEvent.setup();
        clipboard = stubClipboard();
        const onCopied = vi.fn();

        render(<CopyButton value="26894" onCopied={onCopied} />);
        await user.click(resting());

        await waitFor(() => expect(onCopied).toHaveBeenCalledWith('26894'));
    });

    it('cancels the pending acknowledgement when it unmounts', async () => {
        const user = userEvent.setup();
        clipboard = stubClipboard();
        const scheduled = vi.spyOn(globalThis, 'setTimeout');
        const cancelled = vi.spyOn(globalThis, 'clearTimeout');

        const view = render(
            <CopyButton value="26894" acknowledgementDuration={9876} />,
        );
        await user.click(resting());
        await screen.findByRole('button', { name: 'Copied' });

        const call = scheduled.mock.calls.findIndex(
            ([, delay]) => delay === 9876,
        );

        expect(call).toBeGreaterThanOrEqual(0);

        const timer = scheduled.mock.results[call].value;

        view.unmount();

        expect(cancelled.mock.calls.some(([id]) => id === timer)).toBe(true);
    });

    it('names the control with the labels the caller provides', async () => {
        const user = userEvent.setup();
        clipboard = stubClipboard();

        render(
            <CopyButton
                value="26894"
                copyLabel="Copiar"
                copiedLabel="Copiado"
            />,
        );
        await user.click(screen.getByRole('button', { name: 'Copiar' }));

        expect(
            await screen.findByRole('button', { name: 'Copiado' }),
        ).toBeDefined();
    });
});
