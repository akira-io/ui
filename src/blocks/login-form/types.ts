export interface LoginFormLabels {
    emailLabel: string;
    emailPlaceholder: string;
    passwordLabel: string;
    passwordPlaceholder: string;
    forgotPasswordLabel: string;
    rememberLabel: string;
    submitLabel: string;
    submittingLabel: string;
}

export const loginFormLabels: LoginFormLabels = {
    emailLabel: 'Email address',
    emailPlaceholder: 'email@example.com',
    passwordLabel: 'Password',
    passwordPlaceholder: 'Password',
    forgotPasswordLabel: 'Forgot your password?',
    rememberLabel: 'Remember me',
    submitLabel: 'Log in',
    submittingLabel: 'Signing in',
};

export function resolveLoginFormLabels(
    labels?: Partial<LoginFormLabels>,
): LoginFormLabels {
    return labels ? { ...loginFormLabels, ...labels } : loginFormLabels;
}

export type LoginFormErrors = Record<string, string | string[] | undefined>;

export function fieldError(
    errors: LoginFormErrors,
    field: string,
): string | undefined {
    const value = errors[field];

    if (!value) {
        return undefined;
    }

    return Array.isArray(value) ? value[0] : value;
}
