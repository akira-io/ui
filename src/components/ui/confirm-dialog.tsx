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
            <DialogContent className="max-w-md p-0 overflow-hidden">
                <DialogHeader className="p-6 md:p-8">
                    <div className="mb-6 flex justify-center">
                        <div
                            className={cn(
                                'h-16 w-16 rounded-2xl shadow-xl flex items-center justify-center',
                                variant === 'destructive'
                                    ? 'bg-gradient-to-br from-destructive to-destructive/70 shadow-destructive/20'
                                    : 'bg-primary shadow-primary/20',
                            )}
                        >
                            <AlertCircle className="h-8 w-8 text-white" />
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
                            className="h-14 rounded-2xl font-bold text-zinc-500 hover:bg-zinc-100 dark:hover:bg-white/5"
                        >
                            {cancelText}
                        </Button>
                        <Button
                            disabled={processing}
                            onClick={handleConfirm}
                            className={cn(
                                'h-14 rounded-2xl text-lg font-bold text-white shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98]',
                                variant === 'destructive'
                                    ? 'bg-gradient-to-r from-destructive to-destructive/70 shadow-destructive/20'
                                    : 'bg-primary shadow-primary/20',
                            )}
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
