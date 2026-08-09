import {
    loginFormLabels,
    type LoginFormErrors,
    type LoginFormLabels,
} from '@/blocks/login-form/types';
import { useUiLabels } from '@/locales/context';
import type { LinkComponent } from '@/types';
import { createContext, useContext, type ReactNode } from 'react';

export interface LoginFormContextValue {
    errors: LoginFormErrors;
    processing: boolean;
    linkComponent?: LinkComponent;
    labels?: Partial<LoginFormLabels>;
}

const LoginFormContext = createContext<LoginFormContextValue>({
    errors: {},
    processing: false,
});

export function useLoginFormContext(): LoginFormContextValue & {
    labels: LoginFormLabels;
} {
    const context = useContext(LoginFormContext);
    const labels = useUiLabels('loginForm', loginFormLabels, context.labels);

    return { ...context, labels };
}

export function LoginFormProvider({
    errors = {},
    processing = false,
    linkComponent,
    labels,
    children,
}: {
    errors?: LoginFormErrors;
    processing?: boolean;
    linkComponent?: LinkComponent;
    labels?: Partial<LoginFormLabels>;
    children: ReactNode;
}) {
    return (
        <LoginFormContext.Provider
            value={{
                errors,
                processing,
                linkComponent,
                labels,
            }}
        >
            {children}
        </LoginFormContext.Provider>
    );
}
