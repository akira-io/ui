import type { ReactNode } from 'react';

export type TwoFactorSetupStep = 'pending' | 'scan' | 'confirm' | 'recovery';

export type TwoFactorCodeMode = 'code' | 'recovery';

export interface TwoFactorLabels {
    setupTitle: string;
    setupDescription: string;
    pendingLabel: string;
    scanTitle: string;
    scanDescription: string;
    qrFallbackLabel: string;
    manualKeyLabel: string;
    manualKeyDescription: string;
    manualKeyRevealLabel: string;
    manualKeyHideLabel: string;
    continueLabel: string;
    confirmTitle: string;
    confirmDescription: string;
    codeLabel: string;
    recoveryCodeLabel: string;
    recoveryCodePlaceholder: string;
    useRecoveryCodeLabel: string;
    useCodeLabel: string;
    verifyLabel: string;
    verifyingLabel: string;
    errorFallbackLabel: string;
    cancelLabel: string;
    challengeTitle: string;
    challengeDescription: string;
    recoveryTitle: string;
    recoveryDescription: string;
    recoveryWarning: string;
    revealLabel: string;
    hideLabel: string;
    copyLabel: string;
    copiedLabel: string;
    copyFailedLabel: string;
    regenerateLabel: string;
    doneLabel: string;
    disableLabel: string;
    disableTitle: string;
    disableDescription: string;
    disableConfirmLabel: string;
    disableCancelLabel: string;
}

export const twoFactorLabels: TwoFactorLabels = {
    setupTitle: 'Two-factor authentication',
    setupDescription:
        'Add a second step to your sign in with an authenticator app.',
    pendingLabel: 'Preparing your setup key',
    scanTitle: 'Scan the code',
    scanDescription:
        'Open your authenticator app and scan the code below to add this account.',
    qrFallbackLabel: 'The QR code is not available yet.',
    manualKeyLabel: 'Setup key',
    manualKeyDescription:
        'Enter this key by hand if your app cannot scan the code.',
    manualKeyRevealLabel: 'Show setup key',
    manualKeyHideLabel: 'Hide setup key',
    continueLabel: 'Continue',
    confirmTitle: 'Confirm the code',
    confirmDescription:
        'Enter the six digit code your authenticator app is showing.',
    codeLabel: 'Authentication code',
    recoveryCodeLabel: 'Recovery code',
    recoveryCodePlaceholder: 'Enter a recovery code',
    useRecoveryCodeLabel: 'Use a recovery code',
    useCodeLabel: 'Use an authentication code',
    verifyLabel: 'Verify',
    verifyingLabel: 'Verifying',
    errorFallbackLabel: 'That did not work. Try again.',
    cancelLabel: 'Cancel',
    challengeTitle: 'Two-factor confirmation',
    challengeDescription:
        'Confirm access to your account with the code from your authenticator app.',
    recoveryTitle: 'Recovery codes',
    recoveryDescription:
        'Store these codes somewhere safe. Each one signs you in once if you lose your device.',
    recoveryWarning: 'They are shown once and cannot be read again afterwards.',
    revealLabel: 'Show codes',
    hideLabel: 'Hide codes',
    copyLabel: 'Copy',
    copiedLabel: 'Copied',
    copyFailedLabel: 'Copying is unavailable here. Select the codes manually.',
    regenerateLabel: 'Regenerate codes',
    doneLabel: 'Done',
    disableLabel: 'Disable two-factor authentication',
    disableTitle: 'Disable two-factor authentication',
    disableDescription:
        'Your account will be protected by your password alone. Recovery codes stop working.',
    disableConfirmLabel: 'Disable',
    disableCancelLabel: 'Keep it on',
};

export interface TwoFactorLabelProps {
    labels?: Partial<TwoFactorLabels>;
}

export function resolveLabels(
    labels?: Partial<TwoFactorLabels>,
): TwoFactorLabels {
    return labels ? { ...twoFactorLabels, ...labels } : twoFactorLabels;
}

export function messageList(errors?: string | string[] | null): string[] {
    if (!errors) {
        return [];
    }

    return (Array.isArray(errors) ? errors : [errors]).filter(
        (message) => message.length > 0,
    );
}

export interface TwoFactorQrProps {
    qrCode?: ReactNode;
    qrCodeSvg?: string;
}
