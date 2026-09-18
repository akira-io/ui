import { passkeyLabels, type PasskeyLabelProps } from '@/blocks/passkeys/types';
import { Button } from '@/components/ui/button';
import { FieldError } from '@/components/ui/field-error';
import { cn } from '@/lib/utils';
import { useUiLabels } from '@/locales/context';
import type { SlotNameProps } from '@/types';
import { KeyRound } from 'lucide-react';
import { useState } from 'react';

export interface PasskeySignInButtonProps extends PasskeyLabelProps {
    onSignIn: () => void | Promise<void>;
    supported?: boolean;
    processing?: boolean;
    error?: string | null;
    className?: string;
}

export function PasskeySignInButton({
    onSignIn,
    supported = true,
    processing = false,
    error,
    labels,
    className,
    slotName = 'passkey-sign-in',
}: PasskeySignInButtonProps & SlotNameProps) {
    const text = useUiLabels('passkeys', passkeyLabels, labels);
    const [running, setRunning] = useState(false);

    if (!supported) {
        return null;
    }

    const busy = processing || running;

    const handleClick = async () => {
        setRunning(true);

        try {
            await onSignIn();
        } finally {
            setRunning(false);
        }
    };

    return (
        <div
            className={cn('gap-2 flex flex-col', className)}
            data-slot={slotName}
        >
            <Button
                type="button"
                variant="outline"
                className="w-full"
                loading={busy}
                loadingLabel={text.signingInLabel}
                disabled={busy}
                onClick={handleClick}
            >
                <KeyRound />
                {text.signInLabel}
            </Button>
            {error ? (
                <FieldError message={error} className="ml-0 text-center" />
            ) : null}
        </div>
    );
}
