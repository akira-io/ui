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
import type { LinkComponent, UrlLike } from '@/types';

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
}: LoginFormPresetProps) {
    return (
        <LoginFormRoot
            errors={errors}
            processing={processing}
            linkComponent={linkComponent}
            labels={labels}
            className={className}
        >
            <LoginFormStatus message={status} />
            <LoginFormEmail tabIndex={1} />
            <LoginFormPassword
                tabIndex={2}
                forgotPasswordHref={forgotPasswordHref}
            />
            <LoginFormRemember tabIndex={3} />
            <LoginFormSubmit tabIndex={4} />
        </LoginFormRoot>
    );
}
