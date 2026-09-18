/** @vitest-environment jsdom */

import { UiLocaleProvider } from '@/locales/context';
import { ptLabels, twoFactorLabelsPt } from '@/locales/pt';
import { cleanup, render, screen } from '@testing-library/react';
import type { ReactElement } from 'react';
import { afterEach, describe, expect, it } from 'vitest';

import { TwoFactorChallenge } from './challenge';
import { TwoFactorDisableButton } from './disable-button';
import { TwoFactorRecoveryCodes } from './recovery-codes';
import { TwoFactorScanStep } from './scan-step';
import { TwoFactorSetupDialog } from './setup-dialog';
import { TwoFactorVerifyForm } from './verify-form';

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

const noop = () => undefined;

const blocks: [string, ReactElement, string][] = [
    [
        'TwoFactorChallenge',
        <TwoFactorChallenge onSubmit={noop} />,
        twoFactorLabelsPt.challengeTitle,
    ],
    [
        'TwoFactorDisableButton',
        <TwoFactorDisableButton onDisable={noop} />,
        twoFactorLabelsPt.disableLabel,
    ],
    [
        'TwoFactorRecoveryCodes',
        <TwoFactorRecoveryCodes codes={['a1b2-c3d4']} />,
        twoFactorLabelsPt.recoveryTitle,
    ],
    [
        'TwoFactorScanStep',
        <TwoFactorScanStep manualSetupKey="JBSWY3DPEHPK3PXP" />,
        twoFactorLabelsPt.manualKeyLabel,
    ],
    [
        'TwoFactorSetupDialog',
        <TwoFactorSetupDialog open onOpenChange={noop} onConfirm={noop} />,
        twoFactorLabelsPt.scanTitle,
    ],
    [
        'TwoFactorVerifyForm',
        <TwoFactorVerifyForm onSubmit={noop} />,
        twoFactorLabelsPt.verifyLabel,
    ],
];

describe('the two-factor blocks under a locale provider', () => {
    it.each(blocks)(
        '%s reads its labels from the provider',
        (_, block, expected) => {
            render(
                <UiLocaleProvider labels={ptLabels}>{block}</UiLocaleProvider>,
            );

            expect(screen.getAllByText(expected).length).toBeGreaterThan(0);
        },
    );

    it('let an explicit label win over the provider', () => {
        render(
            <UiLocaleProvider labels={ptLabels}>
                <TwoFactorDisableButton
                    onDisable={noop}
                    labels={{ disableLabel: 'Turn it off' }}
                />
            </UiLocaleProvider>,
        );

        expect(screen.getByText('Turn it off')).not.toBeNull();
    });
});
