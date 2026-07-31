import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import { useState, type ReactNode } from 'react';

export interface UseConfirmDialogOptions {
    title?: string;
    description?: string | ReactNode;
    confirmText?: string;
    cancelText?: string;
    variant?: 'destructive' | 'default';
}

export function useConfirmDialog() {
    const [isOpen, setIsOpen] = useState(false);
    const [options, setOptions] = useState<UseConfirmDialogOptions>({});
    const [onConfirmCallback, setOnConfirmCallback] = useState<
        (() => void) | null
    >(null);
    const [onCancelCallback, setOnCancelCallback] = useState<
        (() => void) | null
    >(null);

    const confirm = (
        onConfirm: () => void,
        confirmOptions?: UseConfirmDialogOptions,
        onCancel?: () => void,
    ) => {
        setOptions(confirmOptions || {});
        setOnConfirmCallback(() => onConfirm);
        setOnCancelCallback(() => onCancel ?? null);
        setIsOpen(true);
    };

    const handleConfirm = () => {
        onConfirmCallback?.();
        setIsOpen(false);
    };

    const handleCancel = () => {
        onCancelCallback?.();
        setIsOpen(false);
    };

    const ConfirmDialogComponent = () => (
        <ConfirmDialog
            open={isOpen}
            onOpenChange={setIsOpen}
            onConfirm={handleConfirm}
            onCancel={handleCancel}
            {...options}
        />
    );

    return { confirm, ConfirmDialog: ConfirmDialogComponent };
}
