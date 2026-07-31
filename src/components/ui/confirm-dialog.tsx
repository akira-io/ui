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

interface ConfirmDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title?: string;
    description?: string | ReactNode;
    confirmText?: string;
    cancelText?: string;
    variant?: 'destructive' | 'default';
    processing?: boolean;
    onConfirm: () => void;
    onCancel?: () => void;
}

export function ConfirmDialog({
    open,
    onOpenChange,
    title = 'Confirmar Ação',
    description = 'Tem a certeza que pretende continuar? Esta ação não pode ser desfeita.',
    confirmText = 'Confirmar',
    cancelText = 'Cancelar',
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
                                    ? 'from-red-600 to-rose-600 shadow-red-500/20 bg-gradient-to-br'
                                    : 'bg-red-600 dark:bg-red-500 shadow-red-500/20',
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
                                    ? 'from-red-600 to-rose-600 shadow-red-500/20 bg-gradient-to-r'
                                    : 'bg-red-600 dark:bg-red-500 shadow-red-500/20',
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
