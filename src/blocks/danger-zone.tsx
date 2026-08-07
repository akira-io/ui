import { Button } from '@/components/ui/button';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import { elevatedSurface, nestedSurfaceReset } from '@/lib/language';
import { cn } from '@/lib/utils';
import type { SlotNameProps } from '@/types';
import { TriangleAlert } from 'lucide-react';
import { useState, type ReactNode } from 'react';

export interface DangerZoneLabels {
    title: string;
    description: string;
    actionLabel: string;
    confirmTitle: string;
    confirmDescription: string;
    confirmText: string;
    cancelText: string;
    requiredValueLabel: string;
}

export const dangerZoneLabels: DangerZoneLabels = {
    title: 'Danger zone',
    description: 'These actions are permanent and cannot be undone.',
    actionLabel: 'Delete',
    confirmTitle: 'Confirm Action',
    confirmDescription:
        'Are you sure you want to continue? This action cannot be undone.',
    confirmText: 'Confirm',
    cancelText: 'Cancel',
    requiredValueLabel: 'Type {{value}} to confirm',
};

export interface DangerZoneAction {
    id: string;
    title: string;
    description?: string;
    actionLabel?: string;
    confirmTitle?: string;
    confirmDescription?: string;
    confirmText?: string;
    cancelText?: string;
    requiredValue?: string;
    requiredValueLabel?: string;
    disabled?: boolean;
    onConfirm: () => void;
}

export interface DangerZoneProps {
    title?: string;
    description?: string;
    actions: DangerZoneAction[];
    processing?: boolean;
    labels?: Partial<DangerZoneLabels>;
    footer?: ReactNode;
    className?: string;
}

export function DangerZone({
    title,
    description,
    actions,
    processing = false,
    labels,
    footer,
    className,
    slotName = 'danger-zone',
}: DangerZoneProps & SlotNameProps) {
    const copy = { ...dangerZoneLabels, ...labels };
    const [activeId, setActiveId] = useState<string | null>(null);
    const active = actions.find((action) => action.id === activeId) ?? null;

    return (
        <section
            className={cn(
                elevatedSurface,
                nestedSurfaceReset,
                'gap-6 p-6 flex flex-col bg-destructive/5 ring-destructive/30',
                className,
            )}
            data-slot={slotName}
        >
            <div data-slot="danger-zone-header" className="gap-3 flex">
                <span className="size-11 rounded-2xl flex shrink-0 items-center justify-center bg-destructive/10 text-destructive">
                    <TriangleAlert className="size-5" />
                </span>
                <div>
                    <h2 className="text-lg font-bold text-destructive">
                        {title ?? copy.title}
                    </h2>
                    <p className="text-sm font-medium text-muted-foreground">
                        {description ?? copy.description}
                    </p>
                </div>
            </div>

            <ul data-slot="danger-zone-actions" className="gap-4 flex flex-col">
                {actions.map((action) => (
                    <li
                        key={action.id}
                        data-slot="danger-zone-action"
                        data-action-id={action.id}
                        className="gap-4 sm:flex-row sm:items-center sm:justify-between flex flex-col"
                    >
                        <div className="min-w-0">
                            <p className="text-sm font-semibold text-foreground">
                                {action.title}
                            </p>
                            {action.description && (
                                <p className="text-sm font-medium text-muted-foreground">
                                    {action.description}
                                </p>
                            )}
                        </div>
                        <Button
                            type="button"
                            variant="destructive"
                            disabled={processing || action.disabled}
                            onClick={() => setActiveId(action.id)}
                            className="sm:w-auto w-full"
                        >
                            {action.actionLabel ?? copy.actionLabel}
                        </Button>
                    </li>
                ))}
            </ul>

            {footer}

            <ConfirmDialog
                open={active !== null}
                onOpenChange={(open) => {
                    if (!open) {
                        setActiveId(null);
                    }
                }}
                variant="destructive"
                processing={processing}
                title={active?.confirmTitle ?? copy.confirmTitle}
                description={
                    active?.confirmDescription ?? copy.confirmDescription
                }
                confirmText={active?.confirmText ?? copy.confirmText}
                cancelText={active?.cancelText ?? copy.cancelText}
                requiredValue={active?.requiredValue}
                requiredValueLabel={
                    active?.requiredValueLabel ?? copy.requiredValueLabel
                }
                onConfirm={() => active?.onConfirm()}
            />
        </section>
    );
}
