import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import { useCallback, useRef, useState, type ReactNode } from 'react';

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

    const latest = useRef({
        isOpen,
        options,
        handleConfirm,
        handleCancel,
    });

    latest.current = { isOpen, options, handleConfirm, handleCancel };

    const ConfirmDialogComponent = useCallback(() => {
        const current = latest.current;

        return (
            <ConfirmDialog
                open={current.isOpen}
                onOpenChange={setIsOpen}
                onConfirm={current.handleConfirm}
                onCancel={current.handleCancel}
                {...current.options}
            />
        );
    }, []);

    return { confirm, ConfirmDialog: ConfirmDialogComponent };
}
