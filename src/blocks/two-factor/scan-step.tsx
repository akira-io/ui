import {
    resolveLabels,
    type TwoFactorLabelProps,
    type TwoFactorQrProps,
} from '@/blocks/two-factor/types';
import { Button } from '@/components/ui/button';
import { CopyButton } from '@/components/ui/copy-button';
import { compactRadius, controlRadius, recessedSurface } from '@/lib/language';
import { cn } from '@/lib/utils';
import type { SlotNameProps } from '@/types';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

export interface TwoFactorScanStepProps
    extends TwoFactorLabelProps, TwoFactorQrProps {
    manualSetupKey?: string | null;
    className?: string;
}

export function TwoFactorScanStep({
    qrCode,
    qrCodeSvg,
    manualSetupKey,
    labels,
    className,
    slotName = 'two-factor-scan-step',
}: TwoFactorScanStepProps & SlotNameProps) {
    const text = resolveLabels(labels);
    const [revealed, setRevealed] = useState(false);

    return (
        <div
            className={cn('gap-5 flex w-full flex-col', className)}
            data-slot={slotName}
        >
            <div
                data-slot="two-factor-qr"
                className={cn(
                    recessedSurface,
                    'p-4 flex items-center justify-center [&_svg]:size-full [&_svg]:h-auto',
                )}
            >
                {qrCode ??
                    (qrCodeSvg ? (
                        <div
                            data-slot="two-factor-qr-markup"
                            className={cn(controlRadius, 'p-3 bg-card')}
                            dangerouslySetInnerHTML={{ __html: qrCodeSvg }}
                        />
                    ) : (
                        <p className="text-sm font-medium text-muted-foreground">
                            {text.qrFallbackLabel}
                        </p>
                    ))}
            </div>

            {manualSetupKey && (
                <div
                    data-slot="two-factor-setup-key"
                    className="gap-2 flex flex-col"
                >
                    <p className="text-sm font-semibold text-foreground">
                        {text.manualKeyLabel}
                    </p>
                    <p className="text-xs font-medium text-muted-foreground">
                        {text.manualKeyDescription}
                    </p>

                    <div className="gap-2 flex flex-wrap items-center">
                        <code
                            data-slot="two-factor-setup-key-value"
                            className={cn(
                                compactRadius,
                                'px-3 py-2 text-sm font-medium font-mono bg-muted break-all text-foreground',
                            )}
                        >
                            {revealed
                                ? manualSetupKey
                                : '•'.repeat(manualSetupKey.length)}
                        </code>

                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            aria-pressed={revealed}
                            onClick={() => setRevealed(!revealed)}
                        >
                            {revealed ? <EyeOff /> : <Eye />}
                            {revealed
                                ? text.manualKeyHideLabel
                                : text.manualKeyRevealLabel}
                        </Button>

                        <CopyButton
                            value={manualSetupKey}
                            copyLabel={text.copyLabel}
                            copiedLabel={text.copiedLabel}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
