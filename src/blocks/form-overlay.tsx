import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { SlotNameProps } from '@/types';

export interface FormOverlayLabels {
    cancelLabel: string;
    saveLabel: string;
    savingLabel: string;
}

export const formOverlayDefaultLabels: FormOverlayLabels = {
    cancelLabel: 'Cancel',
    saveLabel: 'Save',
    savingLabel: 'Saving...',
};

export type FormOverlayIntent = 'default' | 'destructive';

export interface FormOverlayActionsProps {
    labels?: FormOverlayLabels;
    processing?: boolean;
    intent?: FormOverlayIntent;
    submit?: boolean;
    className?: string;
    onCancel: () => void;
    onSave?: () => void;
}

export function FormOverlayActions({
    labels = formOverlayDefaultLabels,
    processing = false,
    intent = 'default',
    submit = false,
    className,
    onCancel,
    onSave,
    slotName = 'form-overlay-actions',
}: FormOverlayActionsProps & SlotNameProps) {
    return (
        <div
            className={cn('gap-2 flex items-center justify-end', className)}
            data-slot={slotName}
        >
            <Button
                type="button"
                variant="ghost"
                disabled={processing}
                onClick={onCancel}
            >
                {labels.cancelLabel}
            </Button>

            <Button
                type={submit ? 'submit' : 'button'}
                aria-label={processing ? labels.savingLabel : undefined}
                variant={intent}
                loading={processing}
                loadingLabel={labels.savingLabel}
                onClick={onSave}
            >
                {processing ? labels.savingLabel : labels.saveLabel}
            </Button>
        </div>
    );
}
