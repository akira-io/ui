import {
    LoginFormEmail,
    LoginFormPassword,
    LoginFormRemember,
    LoginFormRoot,
    LoginFormStatus,
    LoginFormSubmit,
} from '@/blocks/login-form/parts';
import type {
    LoginFormErrors,
    LoginFormLabels,
} from '@/blocks/login-form/types';
import type { LinkComponent, SlotNameProps, UrlLike } from '@/types';

export interface LoginFormPresetProps {
    errors?: LoginFormErrors;
    processing?: boolean;
    linkComponent?: LinkComponent;
    labels?: Partial<LoginFormLabels>;
    status?: string;
    forgotPasswordHref?: UrlLike;
    className?: string;
}

export function LoginFormPreset({
    errors,
    processing,
    linkComponent,
    labels,
    status,
    forgotPasswordHref,
    className,
    slotName = 'login-form',
}: LoginFormPresetProps & SlotNameProps) {
    return (
        <LoginFormRoot
            errors={errors}
            processing={processing}
            linkComponent={linkComponent}
            labels={labels}
            className={className}
            slotName={slotName}
        >
            <LoginFormStatus message={status} />
            <LoginFormEmail />
            <LoginFormPassword forgotPasswordHref={forgotPasswordHref} />
            <LoginFormRemember />
            <LoginFormSubmit />
        </LoginFormRoot>
    );
}
