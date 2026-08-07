// @vitest-environment jsdom

import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { TwoFactorDisableButton } from '@/blocks/two-factor/disable-button';
import { TwoFactorRecoveryCodes } from '@/blocks/two-factor/recovery-codes';

import {
    stubClipboard,
    type ClipboardStub,
} from '../../../tests/fixtures/clipboard';

let clipboard: ClipboardStub | undefined;

afterEach(() => {
    cleanup();
    clipboard?.restore();
    clipboard = undefined;
});

const codes = ['AAAA-1111', 'BBBB-2222', 'CCCC-3333'];

describe('the recovery codes panel', () => {
    it('keeps the codes hidden until the reader asks for them', async () => {
        const user = userEvent.setup();

        render(<TwoFactorRecoveryCodes codes={codes} />);

        expect(screen.queryByText('AAAA-1111')).toBeNull();

        await user.click(screen.getByRole('button', { name: /show codes/i }));

        for (const code of codes) {
            expect(screen.getByText(code)).not.toBeNull();
        }
    });

    it('copies every code in one go', async () => {
        const user = userEvent.setup();

        clipboard = stubClipboard();
        render(<TwoFactorRecoveryCodes codes={codes} defaultRevealed />);

        await user.click(screen.getByRole('button', { name: /copy/i }));

        await waitFor(() =>
            expect(clipboard?.writes).toEqual([codes.join('\n')]),
        );
        await waitFor(() =>
            expect(
                document
                    .querySelector('[data-slot="copy-button"]')
                    ?.getAttribute('data-copied'),
            ).toBe('true'),
        );
    });

    it('says so instead of throwing where the clipboard is unavailable', async () => {
        const user = userEvent.setup();

        clipboard = stubClipboard({ unavailable: true });
        render(<TwoFactorRecoveryCodes codes={codes} defaultRevealed />);

        await user.click(screen.getByRole('button', { name: /copy/i }));

        expect(
            await screen.findByText(/copying is unavailable here/i),
        ).not.toBeNull();
    });

    it('offers regeneration only when the app can handle it', async () => {
        const user = userEvent.setup();
        const onRegenerate = vi.fn().mockResolvedValue(undefined);

        const view = render(<TwoFactorRecoveryCodes codes={codes} />);

        expect(
            screen.queryByRole('button', { name: /regenerate/i }),
        ).toBeNull();

        view.rerender(
            <TwoFactorRecoveryCodes
                codes={codes}
                onRegenerate={onRegenerate}
            />,
        );

        await user.click(screen.getByRole('button', { name: /regenerate/i }));

        await waitFor(() => expect(onRegenerate).toHaveBeenCalledTimes(1));
    });
});

describe('the disable control', () => {
    it('asks for confirmation before it disables anything', async () => {
        const user = userEvent.setup();
        const onDisable = vi.fn().mockResolvedValue(undefined);

        render(<TwoFactorDisableButton onDisable={onDisable} />);

        await user.click(
            screen.getByRole('button', { name: /disable two-factor/i }),
        );

        expect(onDisable).not.toHaveBeenCalled();
        expect(
            document.querySelector('[data-slot="confirm-dialog"]'),
        ).not.toBeNull();

        await user.click(screen.getByRole('button', { name: /^disable$/i }));

        await waitFor(() => expect(onDisable).toHaveBeenCalledTimes(1));
    });

    it('leaves two factor alone when the confirmation is dismissed', async () => {
        const user = userEvent.setup();
        const onDisable = vi.fn();

        render(<TwoFactorDisableButton onDisable={onDisable} />);

        await user.click(
            screen.getByRole('button', { name: /disable two-factor/i }),
        );
        await user.click(screen.getByRole('button', { name: /keep it on/i }));

        await waitFor(() =>
            expect(
                document.querySelector('[data-slot="confirm-dialog"]'),
            ).toBeNull(),
        );
        expect(onDisable).not.toHaveBeenCalled();
    });
});
