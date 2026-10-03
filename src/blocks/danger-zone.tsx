import { Button } from '@/components/ui/button';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import { FieldError } from '@/components/ui/field-error';
import { Label } from '@/components/ui/label';
import { PasswordInput } from '@/components/ui/password-input';
import { elevatedSurface, nestedSurfaceReset } from '@/lib/language';
import { cn } from '@/lib/utils';
import { useUiLabels } from '@/locales/context';
import type { SlotNameProps } from '@/types';
import { TriangleAlert } from 'lucide-react';
import { useEffect, useId, useRef, useState, type ReactNode } from 'react';

export interface DangerZoneLabels {
    title: string;
    description: string;
    actionLabel: string;
    confirmTitle: string;
    confirmDescription: string;
    confirmText: string;
    cancelText: string;
    requiredValueLabel: string;
    passwordLabel: string;
    passwordPlaceholder: string;
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
    passwordLabel: 'Current password',
    passwordPlaceholder: 'Password',
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
    requirePassword?: boolean;
    error?: string;
    disabled?: boolean;
    onConfirm: (password?: string) => void | Promise<void>;
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
    const copy = useUiLabels('dangerZone', dangerZoneLabels, labels);
    const [activeId, setActiveId] = useState<string | null>(null);
    const active = actions.find((action) => action.id === activeId) ?? null;
    const requirePassword = active?.requirePassword === true;
    const [password, setPassword] = useState('');
    const [pending, setPending] = useState(false);
    const [failure, setFailure] = useState<string | null>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const passwordId = useId();
    const passwordErrorId = useId();
    const passwordError = failure ?? active?.error;

    useEffect(() => {
        if (requirePassword && !pending && passwordError) {
            passwordRef.current?.focus();
        }
    }, [requirePassword, pending, passwordError]);

    const close = () => {
        setActiveId(null);
        setPassword('');
        setFailure(null);
    };

    const confirmWithPassword = async (action: DangerZoneAction) => {
        if (pending || processing || password === '') {
            return;
        }

        setPending(true);
        setFailure(null);

        try {
            await action.onConfirm(password);
            close();
        } catch (error) {
            setFailure(error instanceof Error ? error.message : '');
        } finally {
            setPending(false);
        }
    };

    const confirm = () => {
        if (!active) {
            return;
        }

        if (active.requirePassword) {
            void confirmWithPassword(active);
            return;
        }

        void active.onConfirm();
    };

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
                    if (!open && !pending) {
                        close();
                    }
                }}
                variant="destructive"
                processing={processing || pending}
                closeOnConfirm={!requirePassword}
                confirmDisabled={requirePassword && password === ''}
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
                onConfirm={confirm}
            >
                {requirePassword && (
                    <div
                        data-slot="danger-zone-password"
                        className="gap-2 px-6 md:px-8 flex flex-col"
                    >
                        <Label htmlFor={passwordId}>{copy.passwordLabel}</Label>
                        <PasswordInput
                            ref={passwordRef}
                            id={passwordId}
                            name="password"
                            value={password}
                            placeholder={copy.passwordPlaceholder}
                            autoComplete="current-password"
                            disabled={processing || pending}
                            aria-invalid={passwordError ? true : undefined}
                            aria-describedby={
                                passwordError ? passwordErrorId : undefined
                            }
                            onChange={(event) => {
                                setPassword(event.target.value);
                                setFailure(null);
                            }}
                            onKeyDown={(event) => {
                                if (event.key === 'Enter') {
                                    event.preventDefault();
                                    confirm();
                                }
                            }}
                        />
                        <FieldError
                            id={passwordErrorId}
                            message={passwordError}
                        />
                    </div>
                )}
            </ConfirmDialog>
        </section>
    );
}
