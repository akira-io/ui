import {
    resolveLabels,
    type TwoFactorLabelProps,
} from '@/blocks/two-factor/types';
import { Button } from '@/components/ui/button';
import { CopyButton } from '@/components/ui/copy-button';
import { compactRadius, recessedSurface } from '@/lib/language';
import { cn } from '@/lib/utils';
import { Eye, EyeOff, RefreshCw } from 'lucide-react';
import { useState } from 'react';

export interface TwoFactorRecoveryCodesProps extends TwoFactorLabelProps {
    codes: string[];
    defaultRevealed?: boolean;
    onRegenerate?: () => void | Promise<void>;
    showHeading?: boolean;
    className?: string;
}

export function TwoFactorRecoveryCodes({
    codes,
    defaultRevealed = false,
    onRegenerate,
    showHeading = true,
    labels,
    className,
}: TwoFactorRecoveryCodesProps) {
    const text = resolveLabels(labels);
    const [revealed, setRevealed] = useState(defaultRevealed);
    const [copyFailed, setCopyFailed] = useState(false);
    const [regenerating, setRegenerating] = useState(false);

    const handleRegenerate = async () => {
        if (!onRegenerate || regenerating) {
            return;
        }

        setRegenerating(true);

        try {
            await onRegenerate();
        } finally {
            setRegenerating(false);
        }
    };

    return (
        <div
            data-slot="two-factor-recovery-codes"
            data-revealed={revealed || undefined}
            className={cn('gap-4 flex w-full flex-col', className)}
        >
            {showHeading && (
                <div className="gap-1 flex flex-col">
                    <p className="text-sm font-semibold text-foreground">
                        {text.recoveryTitle}
                    </p>
                    <p className="text-xs font-medium text-muted-foreground">
                        {text.recoveryDescription} {text.recoveryWarning}
                    </p>
                </div>
            )}

            {revealed && (
                <ul
                    data-slot="two-factor-recovery-list"
                    className={cn(
                        recessedSurface,
                        'gap-2 p-4 sm:grid-cols-2 grid',
                    )}
                >
                    {codes.map((code) => (
                        <li
                            key={code}
                            data-slot="two-factor-recovery-code"
                            className={cn(
                                compactRadius,
                                'px-2 py-1 text-sm font-medium font-mono break-all text-foreground',
                            )}
                        >
                            {code}
                        </li>
                    ))}
                </ul>
            )}

            <div className="gap-2 flex flex-wrap items-center">
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    aria-pressed={revealed}
                    onClick={() => setRevealed(!revealed)}
                >
                    {revealed ? <EyeOff /> : <Eye />}
                    {revealed ? text.hideLabel : text.revealLabel}
                </Button>

                <CopyButton
                    value={codes.join('\n')}
                    copyLabel={text.copyLabel}
                    copiedLabel={text.copiedLabel}
                    onCopied={() => setCopyFailed(false)}
                    onCopyFailed={() => setCopyFailed(true)}
                />

                {onRegenerate && (
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        loading={regenerating}
                        loadingLabel={text.regenerateLabel}
                        onClick={handleRegenerate}
                    >
                        <RefreshCw />
                        {text.regenerateLabel}
                    </Button>
                )}
            </div>

            {copyFailed && (
                <p
                    data-slot="two-factor-copy-failed"
                    className="text-xs font-medium text-muted-foreground"
                >
                    {text.copyFailedLabel}
                </p>
            )}
        </div>
    );
}
