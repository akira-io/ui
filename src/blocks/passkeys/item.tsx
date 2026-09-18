import {
    passkeyLabels,
    type Passkey,
    type PasskeyLabelProps,
} from '@/blocks/passkeys/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import { compactRadius } from '@/lib/language';
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
        } catch {
            setOpen(true);
        } finally {
            setProcessing(false);
        }
    };

    return (
        <li
            className={cn(
                compactRadius,
                'gap-3 px-3 py-3 flex items-center justify-between',
                className,
            )}
            data-slot={slotName}
        >
            <div className="gap-3 min-w-0 flex items-center">
                <span className="size-11 flex shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <KeyRound className="size-5" />
                </span>
                <div className="gap-0.5 min-w-0 flex flex-col">
                    <div className="gap-2 flex flex-wrap items-center">
                        <p className="font-bold truncate text-foreground">
                            {passkey.name}
                        </p>
                        {passkey.authenticator ? (
                            <Badge variant="outline">
                                {passkey.authenticator}
                            </Badge>
                        ) : null}
                    </div>
                    <p className="text-sm font-medium text-muted-foreground">
                        {text.createdLabel(passkey.createdAt)}
                        {passkey.lastUsedAt ? (
                            <>
                                <span aria-hidden="true" className="mx-1.5">
                                    ·
                                </span>
                                {text.lastUsedLabel(passkey.lastUsedAt)}
                            </>
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
