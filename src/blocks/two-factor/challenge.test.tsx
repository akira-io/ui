// @vitest-environment jsdom

import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it } from 'vitest';

import { TwoFactorChallenge } from '@/blocks/two-factor/challenge';
import { twoFactorLabels } from '@/blocks/two-factor/types';

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

function recoveryInput(container: HTMLElement): HTMLInputElement {
    const input = container.querySelector<HTMLInputElement>(
        '[data-slot="two-factor-recovery-input"]',
    );

    if (!input) {
        throw new Error('The recovery input is missing.');
    }

    return input;
}

function header(container: HTMLElement): HTMLElement {
    const element = container.querySelector<HTMLElement>(
        '[data-slot="two-factor-challenge-header"]',
    );

    if (!element) {
        throw new Error('The challenge header is missing.');
    }

    return element;
}

describe('the two-factor challenge', () => {
    it('centres the heading over the code field', () => {
        const { container } = render(
            <TwoFactorChallenge onSubmit={() => {}} />,
        );

        expect(header(container).className).toContain('text-center');
    });

    it('describes the recovery code once the reader switches to it', async () => {
        const user = userEvent.setup();

        render(<TwoFactorChallenge onSubmit={() => {}} />);

        await user.click(
            screen.getByRole('button', { name: /use a recovery code/i }),
        );

        expect(
            screen.getByText(twoFactorLabels.recoveryChallengeDescription),
        ).not.toBeNull();
        expect(screen.queryByText(twoFactorLabels.challengeDescription)).toBe(
            null,
        );

        await user.click(
            screen.getByRole('button', { name: /use an authentication code/i }),
        );

        expect(
            screen.getByText(twoFactorLabels.challengeDescription),
        ).not.toBeNull();
    });

    it('keeps an explicit description in both modes', async () => {
        const user = userEvent.setup();

        render(
            <TwoFactorChallenge
                description="Prove it is you."
                onSubmit={() => {}}
            />,
        );

        await user.click(
            screen.getByRole('button', { name: /use a recovery code/i }),
        );

        expect(screen.getByText('Prove it is you.')).not.toBeNull();
    });

    it('hides the error of the previous mode while the recovery code is checked', async () => {
        const user = userEvent.setup();

        const { container } = render(
            <TwoFactorChallenge
                errors="The code is invalid."
                onSubmit={() => new Promise<void>(() => {})}
            />,
        );

        expect(screen.getByText('The code is invalid.')).not.toBeNull();

        await user.click(
            screen.getByRole('button', { name: /use a recovery code/i }),
        );

        expect(screen.queryByText('The code is invalid.')).toBeNull();

        await user.type(recoveryInput(container), 'AAAA-1111');
        await user.click(screen.getByRole('button', { name: /^verify$/i }));

        expect(screen.queryByText('The code is invalid.')).toBeNull();
    });

    it('shows an error that arrives after the switch', async () => {
        const user = userEvent.setup();

        const { rerender } = render(
            <TwoFactorChallenge
                errors="The code is invalid."
                onSubmit={() => {}}
            />,
        );

        await user.click(
            screen.getByRole('button', { name: /use a recovery code/i }),
        );

        rerender(
            <TwoFactorChallenge
                errors="The recovery code is invalid."
                onSubmit={() => {}}
            />,
        );

        expect(
            screen.getByText('The recovery code is invalid.'),
        ).not.toBeNull();
    });

    it('keeps the old error hidden when the reader switches back', async () => {
        const user = userEvent.setup();

        render(
            <TwoFactorChallenge
                errors="The code is invalid."
                onSubmit={() => {}}
            />,
        );

        await user.click(
            screen.getByRole('button', { name: /use a recovery code/i }),
        );
        await user.click(
            screen.getByRole('button', { name: /use an authentication code/i }),
        );

        expect(screen.queryByText('The code is invalid.')).toBeNull();
    });

    it('shows the same message again once it was cleared and comes back', async () => {
        const user = userEvent.setup();

        const { rerender } = render(
            <TwoFactorChallenge
                errors="The code is invalid."
                onSubmit={() => {}}
            />,
        );

        await user.click(
            screen.getByRole('button', { name: /use a recovery code/i }),
        );

        rerender(<TwoFactorChallenge errors={null} onSubmit={() => {}} />);
        rerender(
            <TwoFactorChallenge
                errors="The code is invalid."
                onSubmit={() => {}}
            />,
        );

        expect(screen.getByText('The code is invalid.')).not.toBeNull();
    });

    it('describes the recovery mode in english by default', async () => {
        const user = userEvent.setup();

        render(<TwoFactorChallenge onSubmit={() => {}} />);

        await user.click(
            screen.getByRole('button', { name: /use a recovery code/i }),
        );

        expect(
            screen.getByText(
                'Confirm access to your account with one of your recovery codes.',
            ),
        ).not.toBeNull();
    });
});
