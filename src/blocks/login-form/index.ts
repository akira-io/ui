import {
    LoginFormEmail,
    LoginFormPassword,
    LoginFormRemember,
    LoginFormRoot,
    LoginFormStatus,
    LoginFormSubmit,
} from '@/blocks/login-form/parts';

export const LoginForm = {
    Root: LoginFormRoot,
    Status: LoginFormStatus,
    Email: LoginFormEmail,
    Password: LoginFormPassword,
    Remember: LoginFormRemember,
    Submit: LoginFormSubmit,
};

export {
    LoginFormProvider,
    useLoginFormContext,
    type LoginFormContextValue,
} from '@/blocks/login-form/context';
export {
    LoginFormEmail,
    LoginFormPassword,
    LoginFormRemember,
    LoginFormRoot,
    LoginFormStatus,
    LoginFormSubmit,
    type LoginFormEmailProps,
    type LoginFormPasswordProps,
    type LoginFormRememberProps,
    type LoginFormRootProps,
    type LoginFormStatusProps,
    type LoginFormSubmitProps,
} from '@/blocks/login-form/parts';
export {
    LoginFormPreset,
    type LoginFormPresetProps,
} from '@/blocks/login-form/preset';
export {
    loginFormLabels,
    type LoginFormErrors,
    type LoginFormLabels,
} from '@/blocks/login-form/types';
