/** @vitest-environment jsdom */

import { PasswordInput } from '@/components/ui/password-input';
import { UiLocaleProvider } from '@/locales/context';
import { loginFormLabelsPt, ptLabels } from '@/locales/pt';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import {
    LoginFormEmail,
    LoginFormPassword,
    LoginFormRemember,
    LoginFormRoot,
    LoginFormSubmit,
} from './parts';

afterEach(cleanup);

describe('the login form labels', () => {
    it('names the remember checkbox', () => {
        render(
            <LoginFormRoot>
                <LoginFormRemember />
            </LoginFormRoot>,
        );

        expect(screen.getByLabelText('Remember me')).not.toBeNull();
    });

    it('works standalone, with no root above it', () => {
        render(<LoginFormEmail error="Required." label="E-mail" />);

        expect(
            screen.getByLabelText('E-mail', { exact: false }),
        ).not.toBeNull();
        expect(screen.getByText('Required.')).not.toBeNull();
    });

    it('reaches a standalone part with no root above it, from the locale provider', () => {
        render(
            <UiLocaleProvider labels={ptLabels}>
                <form>
                    <LoginFormEmail />
                    <PasswordInput />
                </form>
            </UiLocaleProvider>,
        );

        expect(
            screen.getByLabelText(loginFormLabelsPt.emailLabel, {
                exact: false,
            }),
        ).not.toBeNull();
        expect(screen.queryByLabelText(/^Email address/)).toBeNull();
        expect(
            screen.getByRole('button', {
                name: ptLabels.passwordInput?.showLabel,
            }),
        ).not.toBeNull();
    });

    it('lets explicit props win over the root', () => {
        render(
            <LoginFormRoot
                errors={{ email: 'From the root' }}
                labels={{ emailLabel: 'From the root' }}
            >
                <LoginFormEmail error="From the prop" label="From the prop" />
            </LoginFormRoot>,
        );

        expect(
            screen.getByLabelText('From the prop', { exact: false }),
        ).not.toBeNull();
        expect(
            screen.getByText('From the prop', { selector: 'p' }),
        ).not.toBeNull();
        expect(screen.queryByText('From the root')).toBeNull();
    });

    it('reaches the parts with a translation from the locale provider', () => {
        render(
            <UiLocaleProvider labels={{ loginForm: loginFormLabelsPt }}>
                <LoginFormRoot>
                    <LoginFormEmail />
                    <LoginFormPassword />
                    <LoginFormRemember />
                    <LoginFormSubmit />
                </LoginFormRoot>
            </UiLocaleProvider>,
        );

        expect(
            screen.getByLabelText(loginFormLabelsPt.emailLabel, {
                exact: false,
            }),
        ).not.toBeNull();
        expect(
            screen.getByLabelText(loginFormLabelsPt.passwordLabel, {
                exact: false,
            }),
        ).not.toBeNull();
        expect(
            screen.getByLabelText(loginFormLabelsPt.rememberLabel),
        ).not.toBeNull();
        expect(
            screen.getByRole('button', {
                name: loginFormLabelsPt.submitLabel,
            }),
        ).not.toBeNull();

        expect(screen.queryByLabelText(/^Email address/)).toBeNull();
    });

    it('keeps the english required label when no one translates it', () => {
        render(
            <LoginFormRoot>
                <LoginFormEmail />
                <LoginFormPassword />
            </LoginFormRoot>,
        );

        expect(screen.getAllByText('Required')).toHaveLength(2);
    });

    it('translates the required label from the labels the root takes', () => {
        render(
            <LoginFormRoot labels={{ requiredLabel: 'Obrigatório' }}>
                <LoginFormEmail />
                <LoginFormPassword />
            </LoginFormRoot>,
        );

        expect(screen.getAllByText('Obrigatório')).toHaveLength(2);
        expect(screen.queryByText('Required')).toBeNull();
    });

    it('translates the required label from the locale provider', () => {
        render(
            <UiLocaleProvider labels={ptLabels}>
                <LoginFormRoot>
                    <LoginFormEmail />
                    <LoginFormPassword />
                </LoginFormRoot>
            </UiLocaleProvider>,
        );

        expect(screen.getAllByText('Obrigatório')).toHaveLength(2);
        expect(screen.queryByText('Required')).toBeNull();
    });

    it('still lets the root override the locale provider translation', () => {
        render(
            <UiLocaleProvider labels={{ loginForm: loginFormLabelsPt }}>
                <LoginFormRoot labels={{ emailLabel: 'From the root' }}>
                    <LoginFormEmail />
                </LoginFormRoot>
            </UiLocaleProvider>,
        );

        expect(
            screen.getByLabelText('From the root', { exact: false }),
        ).not.toBeNull();
        expect(
            screen.queryByLabelText(loginFormLabelsPt.emailLabel),
        ).toBeNull();
    });

    it('still lets an explicit prop win over both the provider and the root', () => {
        render(
            <UiLocaleProvider labels={{ loginForm: loginFormLabelsPt }}>
                <LoginFormRoot labels={{ emailLabel: 'From the root' }}>
                    <LoginFormEmail label="From the prop" />
                </LoginFormRoot>
            </UiLocaleProvider>,
        );

        expect(
            screen.getByLabelText('From the prop', { exact: false }),
        ).not.toBeNull();
        expect(screen.queryByLabelText('From the root')).toBeNull();
        expect(
            screen.queryByLabelText(loginFormLabelsPt.emailLabel),
        ).toBeNull();
    });
});
