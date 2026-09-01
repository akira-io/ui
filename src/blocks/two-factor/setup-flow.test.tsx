// @vitest-environment jsdom

import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { TwoFactorSetupDialog } from '@/blocks/two-factor/setup-dialog';
import { TwoFactorVerifyForm } from '@/blocks/two-factor/verify-form';

import { stubClipboard } from '../../../tests/fixtures/clipboard';
import { drainInputOtpTimersSurvivingUnmount } from '../../../tests/fixtures/input-otp';

afterEach(async () => {
    cleanup();
    await drainInputOtpTimersSurvivingUnmount();
});

class ResizeObserverStub {
    observe() {}
    unobserve() {}
    disconnect() {}
}

globalThis.ResizeObserver ??=
    ResizeObserverStub as unknown as typeof ResizeObserver;

document.elementFromPoint ??= () => null;

const codes = ['AAAA-1111', 'BBBB-2222'];

function dialog(): HTMLElement | null {
    return document.querySelector('[data-slot="two-factor-setup-dialog"]');
}

function step(): string | undefined {
    return dialog()?.dataset.step;
}

function submitButton(): HTMLButtonElement {
    return screen.getByRole('button', { name: /verify/i }) as HTMLButtonElement;
}

async function enterCode(
    user: ReturnType<typeof userEvent.setup>,
    value: string,
) {
    const input = document.querySelector(
        '[data-slot="two-factor-code-input"]',
    ) as HTMLInputElement;

    await user.click(input);
    await user.paste(value);
}

function Harness({
    onConfirm,
    recoveryCodes,
}: {
    onConfirm: (code: string) => Promise<void>;
    recoveryCodes?: string[];
}) {
    const [open, setOpen] = useState(true);

    return (
        <TwoFactorSetupDialog
            open={open}
            onOpenChange={setOpen}
            qrCodeSvg="<svg role='img' aria-label='qr'></svg>"
            manualSetupKey="JBSWY3DPEHPK3PXP"
            recoveryCodes={recoveryCodes}
            onConfirm={onConfirm}
        />
    );
}

describe('the two factor setup flow', () => {
    it('asks the app for setup data once the dialog opens', () => {
        const onRequestSetupData = vi.fn();

        render(
            <TwoFactorSetupDialog
                open
                onOpenChange={() => {}}
                manualSetupKey="JBSWY3DPEHPK3PXP"
                onConfirm={() => {}}
                onRequestSetupData={onRequestSetupData}
            />,
        );

        expect(onRequestSetupData).toHaveBeenCalledTimes(1);
        expect(step()).toBe('scan');
    });

    it('waits on the app rather than generating a code of its own', () => {
        render(
            <TwoFactorSetupDialog
                open
                onOpenChange={() => {}}
                onConfirm={() => {}}
            />,
        );

        expect(
            document.querySelector('[data-slot="two-factor-pending"]'),
        ).not.toBeNull();
    });

    it('renders the qr markup the app supplies and keeps the key masked', async () => {
        const user = userEvent.setup();

        render(<Harness onConfirm={async () => {}} />);

        const key = document.querySelector(
            '[data-slot="two-factor-setup-key-value"]',
        );

        expect(
            document.querySelector('[data-slot="two-factor-qr"] svg'),
        ).not.toBeNull();
        expect(key?.textContent).not.toContain('JBSWY3DPEHPK3PXP');

        await user.click(
            screen.getByRole('button', { name: /show setup key/i }),
        );

        expect(
            document.querySelector('[data-slot="two-factor-setup-key-value"]')
                ?.textContent,
        ).toBe('JBSWY3DPEHPK3PXP');
    });

    it('copies the setup key through the package copy button', async () => {
        const user = userEvent.setup();
        const clipboard = stubClipboard();

        render(<Harness onConfirm={async () => {}} />);

        await user.click(screen.getByRole('button', { name: /^copy$/i }));

        await waitFor(() =>
            expect(clipboard.writes).toEqual(['JBSWY3DPEHPK3PXP']),
        );

        clipboard.restore();
    });

    it('surfaces the error the server returned and keeps the user on the code step', async () => {
        const user = userEvent.setup();
        const onConfirm = vi
            .fn()
            .mockRejectedValue(new Error('The provided code was invalid.'));

        render(<Harness onConfirm={onConfirm} />);

        await user.click(screen.getByRole('button', { name: /continue/i }));
        await enterCode(user, '111111');
        await user.click(submitButton());

        expect(
            await screen.findByText('The provided code was invalid.'),
        ).not.toBeNull();
        expect(step()).toBe('confirm');
        expect(
            document.querySelector('[data-slot="two-factor-code-input"]'),
        ).not.toBeNull();
    });

    it('advances to the recovery codes once the app accepts the code', async () => {
        const user = userEvent.setup();
        const onConfirm = vi.fn().mockResolvedValue(undefined);

        render(<Harness onConfirm={onConfirm} recoveryCodes={codes} />);

        await user.click(screen.getByRole('button', { name: /continue/i }));
        await enterCode(user, '123456');
        await user.click(submitButton());

        await waitFor(() => expect(step()).toBe('recovery'));

        expect(onConfirm).toHaveBeenCalledWith('123456');
        expect(screen.getByText('AAAA-1111')).not.toBeNull();
        expect(screen.getByText('BBBB-2222')).not.toBeNull();
    });

    it('holds the flow and disables the control while the app is still working', async () => {
        const user = userEvent.setup();
        let release: (() => void) | undefined;
        const onConfirm = vi.fn().mockImplementation(
            () =>
                new Promise<void>((resolve) => {
                    release = () => resolve();
                }),
        );

        render(<Harness onConfirm={onConfirm} recoveryCodes={codes} />);

        await user.click(screen.getByRole('button', { name: /continue/i }));
        await enterCode(user, '123456');
        await user.click(submitButton());

        await waitFor(() =>
            expect(
                document
                    .querySelector('[data-slot="two-factor-verify-form"]')
                    ?.getAttribute('data-pending'),
            ).toBe('true'),
        );

        expect(step()).toBe('confirm');
        expect(
            document.querySelector<HTMLButtonElement>(
                '[data-slot="two-factor-verify-form"] button[type="submit"]',
            )?.disabled,
        ).toBe(true);

        release?.();

        await waitFor(() => expect(step()).toBe('recovery'));
    });
});

describe('the two factor verify form', () => {
    it('keeps the submit control out of reach until the code is complete', async () => {
        const user = userEvent.setup();
        const onSubmit = vi.fn();

        render(<TwoFactorVerifyForm onSubmit={onSubmit} />);

        expect(submitButton().disabled).toBe(true);

        await enterCode(user, '1234');

        expect(submitButton().disabled).toBe(true);

        await enterCode(user, '56');

        expect(submitButton().disabled).toBe(false);
    });

    it('takes a recovery code at sign in and reports which kind it was', async () => {
        const user = userEvent.setup();
        const onSubmit = vi.fn();

        render(<TwoFactorVerifyForm allowRecoveryCode onSubmit={onSubmit} />);

        await user.click(
            screen.getByRole('button', { name: /use a recovery code/i }),
        );
        await user.type(
            screen.getByRole('textbox', { name: /recovery code/i }),
            'AAAA-1111',
        );
        await user.click(submitButton());

        await waitFor(() =>
            expect(onSubmit).toHaveBeenCalledWith('AAAA-1111', 'recovery'),
        );
    });

    it('renders the errors the app passes down', () => {
        render(
            <TwoFactorVerifyForm
                onSubmit={() => {}}
                errors={['Code expired.', 'Try the next one.']}
            />,
        );

        expect(screen.getByText('Code expired.')).not.toBeNull();
        expect(screen.getByText('Try the next one.')).not.toBeNull();
    });
});
