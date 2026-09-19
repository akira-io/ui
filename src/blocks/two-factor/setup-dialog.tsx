import { TwoFactorRecoveryCodes } from '@/blocks/two-factor/recovery-codes';
import { TwoFactorScanStep } from '@/blocks/two-factor/scan-step';
import {
    twoFactorLabels,
    type TwoFactorLabelProps,
    type TwoFactorQrProps,
    type TwoFactorSetupStep,
} from '@/blocks/two-factor/types';
import { TwoFactorVerifyForm } from '@/blocks/two-factor/verify-form';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Spinner } from '@/components/ui/spinner';
import { cn } from '@/lib/utils';
import { useUiLabels } from '@/locales/context';
import type { SlotNameProps } from '@/types';
import { useEffect, useRef, useState } from 'react';

export interface TwoFactorSetupDialogProps
    extends TwoFactorLabelProps, TwoFactorQrProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    enabled?: boolean;
    manualSetupKey?: string | null;
    recoveryCodes?: string[];
    errors?: string | string[] | null;
    onConfirm: (code: string) => void | Promise<void>;
    onRequestSetupData?: () => void | Promise<void>;
    onRegenerateRecoveryCodes?: () => void | Promise<void>;
    onCompleted?: () => void;
    className?: string;
}

export function TwoFactorSetupDialog({
    open,
    onOpenChange,
    enabled = false,
    qrCode,
    qrCodeSvg,
    manualSetupKey,
    recoveryCodes,
    errors,
    onConfirm,
    onRequestSetupData,
    onRegenerateRecoveryCodes,
    onCompleted,
    labels,
    className,
    slotName = 'two-factor-setup-dialog',
}: TwoFactorSetupDialogProps & SlotNameProps) {
    const text = useUiLabels('twoFactor', twoFactorLabels, labels);
    const [step, setStep] = useState<TwoFactorSetupStep>(
        enabled ? 'recovery' : 'scan',
    );

    const requestSetupData = useRef(onRequestSetupData);
    const openedBefore = useRef(false);

    useEffect(() => {
        requestSetupData.current = onRequestSetupData;
    }, [onRequestSetupData]);

    useEffect(() => {
        if (!open) {
            openedBefore.current = false;

            return;
        }

        if (openedBefore.current) {
            return;
        }

        openedBefore.current = true;
        setStep(enabled ? 'recovery' : 'scan');

        if (!enabled) {
            void requestSetupData.current?.();
        }
    }, [open, enabled]);

    const ready = Boolean(qrCode || qrCodeSvg || manualSetupKey);
    const codes = recoveryCodes ?? [];

    const handleConfirm = async (code: string) => {
        await onConfirm(code);
        setStep('recovery');
    };

    const finish = () => {
        onOpenChange(false);
        onCompleted?.();
    };

    const heading = {
        pending: text.setupTitle,
        scan: text.scanTitle,
        confirm: text.confirmTitle,
        recovery: text.recoveryTitle,
    }[step];

    const description = {
        pending: text.setupDescription,
        scan: text.scanDescription,
        confirm: text.confirmDescription,
        recovery: `${text.recoveryDescription} ${text.recoveryWarning}`,
    }[step];

    const action = {
        pending: null,
        scan: ready
            ? { label: text.continueLabel, onClick: () => setStep('confirm') }
            : null,
        confirm: null,
        recovery: { label: text.doneLabel, onClick: finish },
    }[step];

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                data-step={step}
                className={cn(
                    'max-w-md p-0 gap-0 flex max-h-[calc(100dvh-2rem)] flex-col',
                    className,
                )}
                slotName={slotName}
            >
                <DialogHeader className="shrink-0">
                    <DialogTitle>{heading}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>

                <div
                    data-slot="two-factor-setup-body"
                    className={cn(
                        'gap-5 px-6 md:px-8 min-h-0 flex flex-1 flex-col overflow-y-auto',
                        action ? 'pb-5' : 'pb-6 md:pb-8',
                    )}
                >
                    {step === 'scan' &&
                        (ready ? (
                            <TwoFactorScanStep
                                qrCode={qrCode}
                                qrCodeSvg={qrCodeSvg}
                                manualSetupKey={manualSetupKey}
                                labels={labels}
                            />
                        ) : (
                            <div
                                data-slot="two-factor-pending"
                                className="gap-3 py-6 text-sm font-medium flex items-center justify-center text-muted-foreground"
                            >
                                <Spinner label={text.pendingLabel} />
                                {text.pendingLabel}
                            </div>
                        ))}

                    {step === 'confirm' && (
                        <TwoFactorVerifyForm
                            autoFocus
                            errors={errors}
                            labels={labels}
                            onSubmit={handleConfirm}
                            footer={
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setStep('scan')}
                                >
                                    {text.cancelLabel}
                                </Button>
                            }
                        />
                    )}

                    {step === 'recovery' && (
                        <TwoFactorRecoveryCodes
                            codes={codes}
                            defaultRevealed
                            showHeading={false}
                            labels={labels}
                            onRegenerate={onRegenerateRecoveryCodes}
                        />
                    )}
                </div>

                {action && (
                    <div
                        data-slot="two-factor-setup-footer"
                        className="px-6 pb-6 md:px-8 md:pb-8 flex shrink-0 flex-col"
                    >
                        <Button type="button" onClick={action.onClick}>
                            {action.label}
                        </Button>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}
