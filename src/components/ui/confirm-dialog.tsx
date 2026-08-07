import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { useUiLabels } from '@/locales/context';
import type { SlotNameProps } from '@/types';
import { AlertCircle, ChevronRight } from 'lucide-react';
import { ReactNode, useEffect, useId, useState } from 'react';

export interface ConfirmDialogLabels {
    title: string;
    description: string;
    confirmText: string;
    cancelText: string;
}

export const confirmDialogDefaultLabels: ConfirmDialogLabels = {
    title: 'Confirm Action',
    description:
        'Are you sure you want to continue? This action cannot be undone.',
    confirmText: 'Confirm',
    cancelText: 'Cancel',
};

interface ConfirmDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title?: ConfirmDialogLabels['title'];
    description?: ConfirmDialogLabels['description'] | ReactNode;
    confirmText?: ConfirmDialogLabels['confirmText'];
    cancelText?: ConfirmDialogLabels['cancelText'];
    variant?: 'destructive' | 'default';
    processing?: boolean;
    requiredValue?: string;
    requiredValueLabel?: string;
    onConfirm: () => void;
    onCancel?: () => void;
}

export function ConfirmDialog({
    open,
    onOpenChange,
    title,
    description,
    confirmText,
    cancelText,
    variant = 'destructive',
    processing = false,
    requiredValue,
    requiredValueLabel = 'Type {{value}} to confirm',
    onConfirm,
    onCancel,
    slotName = 'confirm-dialog',
}: ConfirmDialogProps & SlotNameProps) {
    const labels = useUiLabels('confirmDialog', confirmDialogDefaultLabels, {
        title,
        confirmText,
        cancelText,
    });
    const resolvedDescription = description ?? labels.description;
    const inputId = useId();
    const [typedValue, setTypedValue] = useState('');
    const unlocked =
        requiredValue === undefined || typedValue === requiredValue;

    useEffect(() => {
        if (!open) {
            setTypedValue('');
        }
    }, [open]);

    const handleConfirm = () => {
        if (processing || !unlocked) {
            return;
        }
        onConfirm();
        onOpenChange(false);
    };

    const handleCancel = () => {
        if (processing) {
            return;
        }
        onCancel?.();
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md p-0" slotName={slotName}>
                <DialogHeader className="p-6 md:p-8">
                    <div className="mb-6 flex justify-center">
                        <div
                            className={cn(
                                'size-16 rounded-3xl shadow-xl flex items-center justify-center',
                                variant === 'destructive'
                                    ? 'bg-destructive text-destructive-foreground shadow-destructive/20'
                                    : 'bg-primary text-primary-foreground shadow-primary/20',
                            )}
                        >
                            <AlertCircle className="h-8 w-8" />
                        </div>
                    </div>
                    <DialogTitle>{labels.title}</DialogTitle>
                    <DialogDescription>{resolvedDescription}</DialogDescription>
                </DialogHeader>

                {requiredValue !== undefined && (
                    <div
                        data-slot="confirm-dialog-gate"
                        className="gap-2 px-6 md:px-8 flex flex-col"
                    >
                        <Label htmlFor={inputId}>
                            {requiredValueLabel.replace(
                                '{{value}}',
                                requiredValue,
                            )}
                        </Label>
                        <Input
                            id={inputId}
                            value={typedValue}
                            autoComplete="off"
                            disabled={processing}
                            onChange={(event) =>
                                setTypedValue(event.target.value)
                            }
                        />
                    </div>
                )}

                <DialogFooter className="p-6 md:p-8">
                    <div className="gap-4 sm:grid-cols-2 grid w-full">
                        <Button
                            type="button"
                            variant="ghost"
                            disabled={processing}
                            onClick={handleCancel}
                            className="text-muted-foreground"
                        >
                            {labels.cancelText}
                        </Button>
                        <Button
                            variant={variant}
                            disabled={processing || !unlocked}
                            onClick={handleConfirm}
                        >
                            {labels.confirmText}
                            <ChevronRight className="ml-2 h-5 w-5" />
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
