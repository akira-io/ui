import {
    twoFactorLabels,
    type TwoFactorLabelProps,
    type TwoFactorQrProps,
} from '@/blocks/two-factor/types';
import { Button } from '@/components/ui/button';
import { CopyButton } from '@/components/ui/copy-button';
import {
    Field,
    FieldControl,
    FieldDescription,
    FieldLabel,
} from '@/components/ui/field';
import { controlRadius, fieldSurface, recessedSurface } from '@/lib/language';
import { cn } from '@/lib/utils';
import { useUiLabels } from '@/locales/context';
import type { SlotNameProps } from '@/types';
import { Eye, EyeOff } from 'lucide-react';
import { useId, useState } from 'react';

export interface TwoFactorScanStepProps
    extends TwoFactorLabelProps, TwoFactorQrProps {
    manualSetupKey?: string | null;
    className?: string;
}

const qrFrame = cn(
    controlRadius,
    'size-44 p-3 bg-white flex shrink-0 items-center justify-center [&_:is(svg,img,canvas)]:h-auto [&_:is(svg,img,canvas)]:max-h-full [&_:is(svg,img,canvas)]:max-w-full',
);

export function TwoFactorScanStep({
    qrCode,
    qrCodeSvg,
    manualSetupKey,
    labels,
    className,
    slotName = 'two-factor-scan-step',
}: TwoFactorScanStepProps & SlotNameProps) {
    const text = useUiLabels('twoFactor', twoFactorLabels, labels);
    const [revealed, setRevealed] = useState(false);
    const keyLabelId = useId();

    const qrContent =
        qrCode ??
        (qrCodeSvg ? (
            <div
                data-slot="two-factor-qr-markup"
                className="flex size-full items-center justify-center"
                dangerouslySetInnerHTML={{ __html: qrCodeSvg }}
            />
        ) : null);

    return (
        <div
            className={cn('gap-5 flex w-full flex-col', className)}
            data-slot={slotName}
        >
            <div
                data-slot="two-factor-qr"
                className={cn(
                    recessedSurface,
                    'p-4 flex items-center justify-center',
                )}
            >
                {qrContent ? (
                    <div data-slot="two-factor-qr-frame" className={qrFrame}>
                        {qrContent}
                    </div>
                ) : (
                    <p className="text-sm font-medium text-muted-foreground">
                        {text.qrFallbackLabel}
                    </p>
                )}
            </div>

            {manualSetupKey && (
                <Field slotName="two-factor-setup-key">
                    <FieldLabel id={keyLabelId}>
                        {text.manualKeyLabel}
                    </FieldLabel>
                    <FieldDescription>
                        {text.manualKeyDescription}
                    </FieldDescription>

                    <FieldControl role="group" aria-labelledby={keyLabelId}>
                        <div
                            data-slot="two-factor-setup-key-field"
                            className={cn(
                                fieldSurface,
                                'min-h-11 py-1 pl-4 pr-1 gap-1 flex w-full items-center',
                            )}
                        >
                            <code
                                data-slot="two-factor-setup-key-value"
                                className={cn(
                                    'min-w-0 font-medium font-mono flex-1',
                                    revealed ? 'break-all' : 'truncate',
                                )}
                            >
                                {revealed
                                    ? manualSetupKey
                                    : '•'.repeat(manualSetupKey.length)}
                            </code>

                            <Button
                                type="button"
                                variant="ghost"
                                size="icon-sm"
                                aria-pressed={revealed}
                                aria-label={
                                    revealed
                                        ? text.manualKeyHideLabel
                                        : text.manualKeyRevealLabel
                                }
                                onClick={() => setRevealed(!revealed)}
                            >
                                {revealed ? <EyeOff /> : <Eye />}
                            </Button>

                            <CopyButton
                                value={manualSetupKey}
                                copyLabel={text.copyLabel}
                                copiedLabel={text.copiedLabel}
                            />
                        </div>
                    </FieldControl>
                </Field>
            )}
        </div>
    );
}
