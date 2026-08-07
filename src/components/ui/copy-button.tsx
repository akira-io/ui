import { type VariantProps } from 'class-variance-authority';
import { Check, Copy } from 'lucide-react';
import * as React from 'react';

import { Button, buttonVariants } from '@/components/ui/button';
import { useUiLabels } from '@/locales/context';

export interface CopyButtonLabels {
    copyLabel: string;
    copiedLabel: string;
}

export const copyButtonLabels: CopyButtonLabels = {
    copyLabel: 'Copy',
    copiedLabel: 'Copied',
};

interface CopyButtonProps
    extends
        Omit<React.ComponentProps<'button'>, 'value' | 'onCopy' | 'onError'>,
        VariantProps<typeof buttonVariants> {
    value: string;
    copyLabel?: CopyButtonLabels['copyLabel'];
    copiedLabel?: CopyButtonLabels['copiedLabel'];
    acknowledgementDuration?: number;
    onCopied?: (value: string) => void;
    onCopyFailed?: (reason: unknown) => void;
}

async function writeToClipboard(value: string): Promise<void> {
    const clipboard = globalThis.navigator?.clipboard;

    if (typeof clipboard?.writeText !== 'function') {
        throw new Error('The clipboard is not available in this context.');
    }

    await clipboard.writeText(value);
}

function CopyButton({
    value,
    copyLabel,
    copiedLabel,
    acknowledgementDuration = 2000,
    onCopied,
    onCopyFailed,
    onClick,
    variant = 'ghost',
    size = 'icon-sm',
    className,
    ...props
}: CopyButtonProps) {
    const labels = useUiLabels('copyButton', copyButtonLabels, {
        copyLabel,
        copiedLabel,
    });
    const [copied, setCopied] = React.useState(false);
    const timer = React.useRef<ReturnType<typeof setTimeout>>(undefined);

    React.useEffect(() => () => clearTimeout(timer.current), []);

    async function copy(event: React.MouseEvent<HTMLButtonElement>) {
        onClick?.(event);

        try {
            await writeToClipboard(value);
        } catch (reason) {
            onCopyFailed?.(reason);

            return;
        }

        setCopied(true);
        onCopied?.(value);

        clearTimeout(timer.current);
        timer.current = setTimeout(
            () => setCopied(false),
            acknowledgementDuration,
        );
    }

    return (
        <Button asChild variant={variant} size={size} className={className}>
            <button
                {...props}
                type="button"
                data-slot="copy-button"
                data-copied={copied || undefined}
                aria-label={copied ? labels.copiedLabel : labels.copyLabel}
                onClick={copy}
            >
                {copied ? (
                    <Check aria-hidden="true" />
                ) : (
                    <Copy aria-hidden="true" />
                )}
                <span
                    data-slot="copy-button-status"
                    role="status"
                    aria-live="polite"
                    className="sr-only"
                >
                    {copied ? labels.copiedLabel : ''}
                </span>
            </button>
        </Button>
    );
}

export { CopyButton, type CopyButtonProps };
