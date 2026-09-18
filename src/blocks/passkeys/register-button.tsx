import { suggestPasskeyName } from '@/blocks/passkeys/device-name';
import { passkeyLabels, type PasskeyLabelProps } from '@/blocks/passkeys/types';
import { Button } from '@/components/ui/button';
import { FieldError } from '@/components/ui/field-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { recessedSurface } from '@/lib/language';
import { cn } from '@/lib/utils';
import { useUiLabels } from '@/locales/context';
import type { SlotNameProps } from '@/types';
import { Plus } from 'lucide-react';
import { useId, useState, type FormEvent } from 'react';

export interface PasskeyRegisterButtonProps extends PasskeyLabelProps {
    onRegister: (name: string) => void | Promise<void>;
    supported?: boolean;
    processing?: boolean;
    error?: string | null;
    defaultName?: string;
    className?: string;
}

function browserUserAgent(): string {
    return typeof navigator === 'undefined' ? '' : navigator.userAgent;
}

export function PasskeyRegisterButton({
    onRegister,
    supported = true,
    processing = false,
    error,
    defaultName,
    labels,
    className,
    slotName = 'passkey-register',
}: PasskeyRegisterButtonProps & SlotNameProps) {
    const text = useUiLabels('passkeys', passkeyLabels, labels);
    const inputId = useId();
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [running, setRunning] = useState(false);
    const [failed, setFailed] = useState(false);

    if (!supported) {
        return (
            <p
                className={cn(
                    'text-sm font-medium text-muted-foreground',
                    className,
                )}
                data-slot={slotName}
            >
                {text.unsupportedLabel}
            </p>
        );
    }

    const busy = processing || running;
    const trimmed = name.trim();
    const message = error ?? (failed ? text.errorFallbackLabel : null);

    const openForm = () => {
        setName(
            defaultName ??
                suggestPasskeyName(browserUserAgent(), text.deviceNameLabel),
        );
        setFailed(false);
        setOpen(true);
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        if (!trimmed) {
            return;
        }

        setRunning(true);
        setFailed(false);

        try {
            await onRegister(trimmed);
            setOpen(false);
        } catch {
            setFailed(true);
        } finally {
            setRunning(false);
        }
    };

    if (!open) {
        return (
            <div className={className} data-slot={slotName}>
                <Button type="button" variant="outline" onClick={openForm}>
                    <Plus />
                    {text.addLabel}
                </Button>
            </div>
        );
    }

    return (
        <form
            onSubmit={handleSubmit}
            className={cn(
                recessedSurface,
                'gap-4 p-4 flex flex-col',
                className,
            )}
            data-slot={slotName}
            data-open
        >
            <div className="gap-2 flex flex-col">
                <Label htmlFor={inputId}>{text.nameLabel}</Label>
                <Input
                    id={inputId}
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder={text.namePlaceholder}
                    autoFocus
                />
                <p className="text-xs font-medium text-muted-foreground">
                    {text.nameDescription}
                </p>
            </div>

            {message ? <FieldError message={message} className="ml-0" /> : null}

            <div className="gap-2 flex flex-wrap items-center">
                <Button
                    type="submit"
                    loading={busy}
                    loadingLabel={text.registeringLabel}
                    disabled={busy || !trimmed}
                >
                    {text.registerLabel}
                </Button>
                <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setOpen(false)}
                >
                    {text.cancelLabel}
                </Button>
            </div>
        </form>
    );
}
