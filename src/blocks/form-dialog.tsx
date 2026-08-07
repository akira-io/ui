import * as React from 'react';

import {
    FormOverlayActions,
    type FormOverlayIntent,
    type FormOverlayLabels,
} from '@/blocks/form-overlay';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import type { SlotNameProps } from '@/types';

export interface FormDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title: React.ReactNode;
    description?: React.ReactNode;
    processing?: boolean;
    intent?: FormOverlayIntent;
    labels?: FormOverlayLabels;
    className?: string;
    children: React.ReactNode;
    onSave: () => void;
    onCancel?: () => void;
}

export function FormDialog({
    open,
    onOpenChange,
    title,
    description,
    processing = false,
    intent,
    labels,
    className,
    children,
    onSave,
    onCancel,
    slotName = 'form-dialog',
}: FormDialogProps & SlotNameProps) {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (processing) {
            return;
        }

        onSave();
    };

    const handleCancel = () => {
        if (processing) {
            return;
        }

        onCancel?.();
        onOpenChange(false);
    };

    const blockWhileProcessing = (event: Event | KeyboardEvent) => {
        if (processing) {
            event.preventDefault();
        }
    };

    return (
        <Dialog
            open={open}
            onOpenChange={(next) => {
                if (processing && !next) {
                    return;
                }

                onOpenChange(next);
            }}
        >
            <DialogContent
                {...(description ? {} : { 'aria-describedby': undefined })}
                className={cn('gap-0 p-0', className)}
                onEscapeKeyDown={blockWhileProcessing}
                onInteractOutside={blockWhileProcessing}
                slotName={slotName}
            >
                <form
                    data-slot="form-dialog-form"
                    onSubmit={handleSubmit}
                    className="grid max-h-[calc(100dvh-8rem)] grid-rows-[auto_minmax(0,1fr)_auto]"
                >
                    <DialogHeader className="text-left">
                        <DialogTitle>{title}</DialogTitle>
                        {description ? (
                            <DialogDescription>{description}</DialogDescription>
                        ) : null}
                    </DialogHeader>

                    <div
                        data-slot="form-dialog-body"
                        className="gap-4 px-6 pb-6 md:px-8 flex flex-col overflow-y-auto"
                    >
                        {children}
                    </div>

                    <DialogFooter>
                        <FormOverlayActions
                            submit
                            labels={labels}
                            processing={processing}
                            intent={intent}
                            onCancel={handleCancel}
                            className="w-full"
                        />
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
