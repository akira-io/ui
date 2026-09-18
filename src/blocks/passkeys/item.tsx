import {
    passkeyLabels,
    type Passkey,
    type PasskeyLabelProps,
} from '@/blocks/passkeys/types';
import { Button } from '@/components/ui/button';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import { cn } from '@/lib/utils';
import { useUiLabels } from '@/locales/context';
import type { SlotNameProps } from '@/types';
import { KeyRound, Trash2 } from 'lucide-react';
import { useState } from 'react';

export interface PasskeyItemProps extends PasskeyLabelProps {
    passkey: Passkey;
    onDelete: (passkey: Passkey) => void | Promise<void>;
    className?: string;
}

export function PasskeyItem({
    passkey,
    onDelete,
    labels,
    className,
    slotName = 'passkey-item',
}: PasskeyItemProps & SlotNameProps) {
    const text = useUiLabels('passkeys', passkeyLabels, labels);
    const [open, setOpen] = useState(false);
    const [processing, setProcessing] = useState(false);

    const handleConfirm = async () => {
        setProcessing(true);

        try {
            await onDelete(passkey);
            setOpen(false);
        } finally {
            setProcessing(false);
        }
    };

    return (
        <li
            className={cn(
                'gap-4 p-4 flex items-center justify-between',
                className,
            )}
            data-slot={slotName}
        >
            <div className="gap-4 min-w-0 flex items-center">
                <span className="size-10 rounded-xl flex shrink-0 items-center justify-center bg-muted">
                    <KeyRound className="size-5 text-muted-foreground" />
                </span>
                <div className="gap-1 min-w-0 grid">
                    <div className="gap-2.5 flex flex-wrap items-center">
                        <p className="font-medium tracking-tight truncate">
                            {passkey.name}
                        </p>
                        {passkey.authenticator ? (
                            <span className="px-2 py-0.5 font-medium tracking-wide inline-flex items-center rounded-md border border-border bg-muted text-[11px] text-muted-foreground uppercase">
                                {passkey.authenticator}
                            </span>
                        ) : null}
                    </div>
                    <p className="gap-x-2 text-sm flex flex-wrap text-muted-foreground">
                        <span>{text.createdLabel(passkey.createdAt)}</span>
                        {passkey.lastUsedAt ? (
                            <span>
                                {text.lastUsedLabel(passkey.lastUsedAt)}
                            </span>
                        ) : null}
                    </p>
                </div>
            </div>

            <Button
                type="button"
                variant="ghost"
                size="icon"
                className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                aria-label={text.deleteLabel(passkey.name)}
                onClick={() => setOpen(true)}
            >
                <Trash2 />
            </Button>

            <ConfirmDialog
                open={open}
                onOpenChange={setOpen}
                title={text.deleteTitle}
                description={text.deleteDescription(passkey.name)}
                confirmText={text.deleteConfirmLabel}
                cancelText={text.deleteCancelLabel}
                processing={processing}
                onConfirm={handleConfirm}
            />
        </li>
    );
}
