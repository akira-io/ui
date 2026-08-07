import { TwoFactorRecoveryCodes } from '@/blocks/two-factor/recovery-codes';
import { TwoFactorScanStep } from '@/blocks/two-factor/scan-step';
import {
    resolveLabels,
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
}: TwoFactorSetupDialogProps) {
    const text = resolveLabels(labels);
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

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                data-slot="two-factor-setup-dialog"
                data-step={step}
                className={cn('max-w-md p-0', className)}
            >
                <DialogHeader className="p-6 md:p-8">
                    <DialogTitle>{heading}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>

                <div className="gap-5 p-6 md:p-8 pt-0 md:pt-0 flex flex-col">
                    {step === 'scan' &&
                        (ready ? (
                            <>
                                <TwoFactorScanStep
                                    qrCode={qrCode}
                                    qrCodeSvg={qrCodeSvg}
                                    manualSetupKey={manualSetupKey}
                                    labels={labels}
                                />
                                <Button
                                    type="button"
                                    onClick={() => setStep('confirm')}
                                >
                                    {text.continueLabel}
                                </Button>
                            </>
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
                        <>
                            <TwoFactorRecoveryCodes
                                codes={codes}
                                defaultRevealed
                                showHeading={false}
                                labels={labels}
                                onRegenerate={onRegenerateRecoveryCodes}
                            />
                            <Button type="button" onClick={finish}>
                                {text.doneLabel}
                            </Button>
                        </>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
