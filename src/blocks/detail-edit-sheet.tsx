import * as React from 'react';

import {
    FormOverlayActions,
    type FormOverlayIntent,
    type FormOverlayLabels,
} from '@/blocks/form-overlay';
import {
    FloatingSheet,
    FloatingSheetBody,
    FloatingSheetFooter,
} from '@/components/ui/floating-sheet';

export interface DetailEditSheetProps {
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

export function DetailEditSheet({
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
}: DetailEditSheetProps) {
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

    return (
        <FloatingSheet
            open={open}
            onOpenChange={onOpenChange}
            title={title}
            description={description}
            persistent
            className={className}
        >
            <form
                data-slot="detail-edit-sheet"
                onSubmit={handleSubmit}
                className="min-h-0 flex flex-1 flex-col"
            >
                <FloatingSheetBody>{children}</FloatingSheetBody>

                <FloatingSheetFooter>
                    <FormOverlayActions
                        submit
                        labels={labels}
                        processing={processing}
                        intent={intent}
                        onCancel={handleCancel}
                    />
                </FloatingSheetFooter>
            </form>
        </FloatingSheet>
    );
}
