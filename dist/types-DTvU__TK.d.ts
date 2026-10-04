import { ReactNode } from 'react';

interface LoginFormLabels {
    emailLabel: string;
    emailPlaceholder: string;
    passwordLabel: string;
    passwordPlaceholder: string;
    forgotPasswordLabel: string;
    rememberLabel: string;
    submitLabel: string;
    submittingLabel: string;
    requiredLabel?: string;
}
declare const loginFormLabels: LoginFormLabels;
type LoginFormErrors = Record<string, string | string[] | undefined>;
declare function fieldError(errors: LoginFormErrors, field: string): string | undefined;

type TourBreakpoint = 'mobile' | 'desktop';
type TourOutcome = 'completed' | 'skipped' | 'dismissed';
interface TourStep {
    target: string;
    title: string;
    description: string;
    breakpoints?: TourBreakpoint[];
}
interface TourDefinition {
    id: string;
    version: number;
    steps: TourStep[];
}
interface TourProgress {
    tour: string;
    version: number;
    lastStep: number;
    outcome: TourOutcome;
}
interface TourLabels {
    next: string;
    previous: string;
    done: string;
    progress: string;
}
declare const DEFAULT_TOUR_LABELS: TourLabels;

type TwoFactorSetupStep = 'pending' | 'scan' | 'confirm' | 'recovery';
type TwoFactorCodeMode = 'code' | 'recovery';
interface TwoFactorLabels {
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
    enableLabel: string;
    qrCodeErrorLabel: string;
    setupKeyErrorLabel: string;
    recoveryCodesErrorLabel: string;
}
declare const twoFactorLabels: TwoFactorLabels;
interface TwoFactorLabelProps {
    labels?: Partial<TwoFactorLabels>;
}
interface TwoFactorQrProps {
    qrCode?: ReactNode;
    qrCodeSvg?: string;
}

export { DEFAULT_TOUR_LABELS as D, type LoginFormErrors as L, type TourStep as T, type LoginFormLabels as a, type TourDefinition as b, type TourBreakpoint as c, type TourProgress as d, type TourLabels as e, type TwoFactorLabelProps as f, type TwoFactorCodeMode as g, type TwoFactorQrProps as h, type TourOutcome as i, type TwoFactorLabels as j, type TwoFactorSetupStep as k, fieldError as l, loginFormLabels as m, twoFactorLabels as t };
