import {
    LoginFormProvider,
    useLoginFormContext,
} from '@/blocks/login-form/context';
import {
    fieldError,
    type LoginFormErrors,
    type LoginFormLabels,
} from '@/blocks/login-form/types';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { FieldError } from '@/components/ui/field-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PasswordInput } from '@/components/ui/password-input';
import { resolveLink } from '@/lib/href';
import { cn } from '@/lib/utils';
import type { LinkComponent, SlotNameProps, UrlLike } from '@/types';
import { LoaderCircle } from 'lucide-react';
import type { ReactNode } from 'react';

export interface LoginFormRootProps {
    errors?: LoginFormErrors;
    processing?: boolean;
    linkComponent?: LinkComponent;
    labels?: Partial<LoginFormLabels>;
    children: ReactNode;
    className?: string;
}

export function LoginFormRoot({
    errors,
    processing,
    linkComponent,
    labels,
    children,
    className,
    slotName = 'login-form',
}: LoginFormRootProps & SlotNameProps) {
    return (
        <LoginFormProvider
            errors={errors}
            processing={processing}
            linkComponent={linkComponent}
            labels={labels}
        >
            <div data-slot={slotName} className={cn('gap-6 grid', className)}>
                {children}
            </div>
        </LoginFormProvider>
    );
}

export interface LoginFormStatusProps {
    message?: string;
}

export function LoginFormStatus({
    message,
    slotName = 'login-form-status',
}: LoginFormStatusProps & SlotNameProps) {
    if (!message) {
        return null;
    }

    return (
        <Alert slotName={slotName}>
            <AlertDescription>{message}</AlertDescription>
        </Alert>
    );
}

export interface LoginFormEmailProps {
    id?: string;
    name?: string;
    label?: string;
    placeholder?: string;
    error?: string;
    tabIndex?: number;
}

export function LoginFormEmail({
    id = 'email',
    name = 'email',
    label,
    placeholder,
    error,
    tabIndex,
    slotName = 'login-form-email',
}: LoginFormEmailProps & SlotNameProps) {
    const { errors, labels } = useLoginFormContext();
    const message = error ?? fieldError(errors, name);

    return (
        <div data-slot={slotName} className="gap-2 grid">
            <Label htmlFor={id}>{label ?? labels.emailLabel}</Label>
            <Input
                id={id}
                name={name}
                type="email"
                required
                autoFocus
                autoComplete="email"
                tabIndex={tabIndex}
                placeholder={placeholder ?? labels.emailPlaceholder}
            />
            <FieldError message={message} />
        </div>
    );
}

export interface LoginFormPasswordProps {
    id?: string;
    name?: string;
    label?: string;
    placeholder?: string;
    error?: string;
    tabIndex?: number;
    forgotPasswordHref?: UrlLike;
    forgotPasswordLabel?: string;
    linkComponent?: LinkComponent;
}

export function LoginFormPassword({
    id = 'password',
    name = 'password',
    label,
    placeholder,
    error,
    tabIndex,
    forgotPasswordHref,
    forgotPasswordLabel,
    linkComponent,
    slotName = 'login-form-password',
}: LoginFormPasswordProps & SlotNameProps) {
    const context = useLoginFormContext();
    const message = error ?? fieldError(context.errors, name);
    const Link = resolveLink(linkComponent ?? context.linkComponent);

    return (
        <div data-slot={slotName} className="gap-2 grid">
            <div className="flex items-center">
                <Label htmlFor={id}>
                    {label ?? context.labels.passwordLabel}
                </Label>
                {forgotPasswordHref && (
                    <Link
                        href={forgotPasswordHref}
                        className="text-sm ml-auto underline-offset-4 hover:underline"
                    >
                        {forgotPasswordLabel ??
                            context.labels.forgotPasswordLabel}
                    </Link>
                )}
            </div>
            <PasswordInput
                id={id}
                name={name}
                required
                autoComplete="current-password"
                tabIndex={tabIndex}
                placeholder={placeholder ?? context.labels.passwordPlaceholder}
            />
            <FieldError message={message} />
        </div>
    );
}

export interface LoginFormRememberProps {
    id?: string;
    name?: string;
    label?: string;
    tabIndex?: number;
}

export function LoginFormRemember({
    id = 'remember',
    name = 'remember',
    label,
    tabIndex,
    slotName = 'login-form-remember',
}: LoginFormRememberProps & SlotNameProps) {
    const { labels } = useLoginFormContext();

    return (
        <div data-slot={slotName} className="gap-3 flex items-center">
            <Checkbox id={id} name={name} tabIndex={tabIndex} />
            <Label htmlFor={id}>{label ?? labels.rememberLabel}</Label>
        </div>
    );
}

export interface LoginFormSubmitProps {
    label?: string;
    submittingLabel?: string;
    processing?: boolean;
    tabIndex?: number;
}

export function LoginFormSubmit({
    label,
    submittingLabel,
    processing,
    tabIndex,
    slotName = 'login-form-submit',
}: LoginFormSubmitProps & SlotNameProps) {
    const context = useLoginFormContext();
    const pending = processing ?? context.processing;

    return (
        <Button
            slotName={slotName}
            type="submit"
            className="w-full"
            tabIndex={tabIndex}
            disabled={pending}
        >
            {pending && <LoaderCircle className="size-4 animate-spin" />}
            {pending
                ? (submittingLabel ?? context.labels.submittingLabel)
                : (label ?? context.labels.submitLabel)}
        </Button>
    );
}
