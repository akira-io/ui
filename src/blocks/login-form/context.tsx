import {
    resolveLoginFormLabels,
    type LoginFormErrors,
    type LoginFormLabels,
} from '@/blocks/login-form/types';
import type { LinkComponent } from '@/types';
import { createContext, useContext, type ReactNode } from 'react';

export interface LoginFormContextValue {
    errors: LoginFormErrors;
    processing: boolean;
    linkComponent?: LinkComponent;
    labels: LoginFormLabels;
}

const LoginFormContext = createContext<LoginFormContextValue>({
    errors: {},
    processing: false,
    labels: resolveLoginFormLabels(),
});

export function useLoginFormContext(): LoginFormContextValue {
    return useContext(LoginFormContext);
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
                labels: resolveLoginFormLabels(labels),
            }}
        >
            {children}
        </LoginFormContext.Provider>
    );
}
