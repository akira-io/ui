import {
    messageList,
    resolveLabels,
    type TwoFactorCodeMode,
    type TwoFactorLabelProps,
} from '@/blocks/two-factor/types';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from '@/components/ui/input-otp';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { AlertCircle } from 'lucide-react';
import { useId, useState, type FormEvent, type ReactNode } from 'react';

export interface TwoFactorVerifyFormProps extends TwoFactorLabelProps {
    onSubmit: (code: string, mode: TwoFactorCodeMode) => void | Promise<void>;
    errors?: string | string[] | null;
    allowRecoveryCode?: boolean;
    length?: number;
    autoFocus?: boolean;
    submitLabel?: string;
    footer?: ReactNode;
    className?: string;
}

function errorMessage(reason: unknown, fallback: string): string {
    return reason instanceof Error && reason.message
        ? reason.message
        : fallback;
}

export function TwoFactorVerifyForm({
    onSubmit,
    errors,
    allowRecoveryCode = false,
    length = 6,
    autoFocus = false,
    submitLabel,
    footer,
    labels,
    className,
}: TwoFactorVerifyFormProps) {
    const text = resolveLabels(labels);
    const fieldId = useId();
    const [mode, setMode] = useState<TwoFactorCodeMode>('code');
    const [value, setValue] = useState('');
    const [pending, setPending] = useState(false);
    const [failure, setFailure] = useState<string | null>(null);

    const messages = [...messageList(errors), ...messageList(failure)];
    const complete =
        mode === 'code' ? value.length === length : value.length > 0;

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (pending || !complete) {
            return;
        }

        setFailure(null);
        setPending(true);

        try {
            await onSubmit(value, mode);
        } catch (reason) {
            setFailure(errorMessage(reason, text.errorFallbackLabel));
        } finally {
            setPending(false);
        }
    };

    const switchMode = () => {
        setMode(mode === 'code' ? 'recovery' : 'code');
        setValue('');
        setFailure(null);
    };

    return (
        <form
            data-slot="two-factor-verify-form"
            data-mode={mode}
            data-pending={pending || undefined}
            onSubmit={handleSubmit}
            className={cn('gap-5 flex w-full flex-col', className)}
        >
            <div className="gap-2 flex flex-col">
                <Label htmlFor={fieldId}>
                    {mode === 'code' ? text.codeLabel : text.recoveryCodeLabel}
                </Label>

                {mode === 'code' ? (
                    <InputOTP
                        id={fieldId}
                        data-slot="two-factor-code-input"
                        maxLength={length}
                        value={value}
                        autoFocus={autoFocus}
                        disabled={pending}
                        onChange={setValue}
                        aria-label={text.codeLabel}
                    >
                        <InputOTPGroup>
                            {Array.from({ length }, (_, index) => (
                                <InputOTPSlot key={index} index={index} />
                            ))}
                        </InputOTPGroup>
                    </InputOTP>
                ) : (
                    <Input
                        id={fieldId}
                        data-slot="two-factor-recovery-input"
                        value={value}
                        autoComplete="one-time-code"
                        spellCheck={false}
                        disabled={pending}
                        placeholder={text.recoveryCodePlaceholder}
                        aria-label={text.recoveryCodeLabel}
                        onChange={(event) => setValue(event.target.value)}
                    />
                )}
            </div>

            {messages.length > 0 && (
                <Alert variant="destructive" data-slot="two-factor-error">
                    <AlertCircle />
                    <AlertDescription>
                        {messages.map((message) => (
                            <p key={message}>{message}</p>
                        ))}
                    </AlertDescription>
                </Alert>
            )}

            <div className="gap-3 flex flex-col">
                <Button
                    type="submit"
                    loading={pending}
                    loadingLabel={text.verifyingLabel}
                    disabled={!complete}
                >
                    {submitLabel ?? text.verifyLabel}
                </Button>

                {allowRecoveryCode && (
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        disabled={pending}
                        onClick={switchMode}
                    >
                        {mode === 'code'
                            ? text.useRecoveryCodeLabel
                            : text.useCodeLabel}
                    </Button>
                )}

                {footer}
            </div>
        </form>
    );
}
