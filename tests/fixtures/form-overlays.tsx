import * as React from 'react';

import { DetailEditSheet } from '@/blocks/detail-edit-sheet';
import { FormDialog } from '@/blocks/form-dialog';
import type { FormOverlayLabels } from '@/blocks/form-overlay';
import { FloatingSheetStack } from '@/components/ui/floating-sheet';
import { Input } from '@/components/ui/input';

export interface OverlayFixtureProps {
    processing?: boolean;
    labels?: FormOverlayLabels;
    onSave: () => void;
    onCancel?: () => void;
}

export function EditSheetFixture({
    processing = false,
    labels,
    onSave,
    onCancel,
}: OverlayFixtureProps) {
    const [open, setOpen] = React.useState(false);

    return (
        <FloatingSheetStack>
            <button type="button" onClick={() => setOpen(true)}>
                Edit driver
            </button>

            <DetailEditSheet
                open={open}
                onOpenChange={setOpen}
                title="Edit driver"
                description="Driver #17"
                processing={processing}
                labels={labels}
                onSave={onSave}
                onCancel={onCancel}
            >
                <Input aria-label="Name" defaultValue="Ana" />
            </DetailEditSheet>
        </FloatingSheetStack>
    );
}

export function FormDialogFixture({
    processing = false,
    labels,
    onSave,
    onCancel,
}: OverlayFixtureProps) {
    const [open, setOpen] = React.useState(false);

    return (
        <>
            <button type="button" onClick={() => setOpen(true)}>
                New fare
            </button>

            <FormDialog
                open={open}
                onOpenChange={setOpen}
                title="New fare"
                description="Applies to every route"
                processing={processing}
                labels={labels}
                onSave={onSave}
                onCancel={onCancel}
            >
                <Input aria-label="Amount" defaultValue="500" />
            </FormDialog>
        </>
    );
}

export function overlayPanel(): HTMLElement | null {
    return document.querySelector<HTMLElement>('[data-slot="floating-sheet"]');
}

export function overlayDialog(): HTMLElement | null {
    return document.querySelector<HTMLElement>('[data-slot="form-dialog"]');
}
