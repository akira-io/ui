import {
    resolveLabels,
    type TwoFactorLabelProps,
} from '@/blocks/two-factor/types';
import { Button } from '@/components/ui/button';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import { cn } from '@/lib/utils';
import type { SlotNameProps } from '@/types';
import { ShieldOff } from 'lucide-react';
import { useState, type ComponentProps } from 'react';

export interface TwoFactorDisableButtonProps extends TwoFactorLabelProps {
    onDisable: () => void | Promise<void>;
    disabled?: boolean;
    variant?: ComponentProps<typeof Button>['variant'];
    size?: ComponentProps<typeof Button>['size'];
    className?: string;
}

export function TwoFactorDisableButton({
    onDisable,
    disabled = false,
    variant = 'destructive',
    size = 'default',
    labels,
    className,
    slotName = 'two-factor-disable',
}: TwoFactorDisableButtonProps & SlotNameProps) {
    const text = resolveLabels(labels);
    const [open, setOpen] = useState(false);
    const [processing, setProcessing] = useState(false);

    const handleConfirm = async () => {
        setProcessing(true);

        try {
            await onDisable();
        } finally {
            setProcessing(false);
        }
    };

    return (
        <span
            data-open={open || undefined}
            className={cn('inline-flex', className)}
            data-slot={slotName}
        >
            <Button
                type="button"
                variant={variant}
                size={size}
                disabled={disabled || processing}
                onClick={() => setOpen(true)}
            >
                <ShieldOff />
                {text.disableLabel}
            </Button>

            <ConfirmDialog
                open={open}
                onOpenChange={setOpen}
                title={text.disableTitle}
                description={text.disableDescription}
                confirmText={text.disableConfirmLabel}
                cancelText={text.disableCancelLabel}
                processing={processing}
                onConfirm={handleConfirm}
            />
        </span>
    );
}
