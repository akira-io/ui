import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { AlertCircle, ChevronRight } from 'lucide-react';
import { ReactNode } from 'react';

export interface ConfirmDialogLabels {
    title: string;
    description: string;
    confirmText: string;
    cancelText: string;
}

interface ConfirmDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title?: ConfirmDialogLabels['title'];
    description?: ConfirmDialogLabels['description'] | ReactNode;
    confirmText?: ConfirmDialogLabels['confirmText'];
    cancelText?: ConfirmDialogLabels['cancelText'];
    variant?: 'destructive' | 'default';
    processing?: boolean;
    onConfirm: () => void;
    onCancel?: () => void;
}

export function ConfirmDialog({
    open,
    onOpenChange,
    title = 'Confirm Action',
    description = 'Are you sure you want to continue? This action cannot be undone.',
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    variant = 'destructive',
    processing = false,
    onConfirm,
    onCancel,
}: ConfirmDialogProps) {
    const handleConfirm = () => {
        if (processing) {
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
            <DialogContent className="max-w-md p-0">
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
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>

                <DialogFooter className="p-6 md:p-8">
                    <div className="gap-4 sm:grid-cols-2 grid w-full">
                        <Button
                            type="button"
                            variant="ghost"
                            disabled={processing}
                            onClick={handleCancel}
                            className="text-muted-foreground"
                        >
                            {cancelText}
                        </Button>
                        <Button
                            variant={variant}
                            disabled={processing}
                            onClick={handleConfirm}
                        >
                            {confirmText}
                            <ChevronRight className="ml-2 h-5 w-5" />
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
