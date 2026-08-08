/** @vitest-environment jsdom */

import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { UiLocaleProvider } from '@/locales/context';
import { loginFormLabelsPt } from '@/locales/pt';

import { LoginFormPassword, LoginFormRoot } from './parts';

afterEach(cleanup);

describe('the password label and forgot-password link', () => {
    it('renders the long Portuguese label and link as two whole, unbroken strings', () => {
        render(
            <UiLocaleProvider labels={{ loginForm: loginFormLabelsPt }}>
                <LoginFormRoot>
                    <LoginFormPassword forgotPasswordHref="/forgot" />
                </LoginFormRoot>
            </UiLocaleProvider>,
        );

        const label = screen.getByText(loginFormLabelsPt.passwordLabel);
        const link = screen.getByRole('link', {
            name: loginFormLabelsPt.forgotPasswordLabel,
        });

        expect(label.textContent).toBe(loginFormLabelsPt.passwordLabel);
        expect(link.textContent).toBe(loginFormLabelsPt.forgotPasswordLabel);
        expect(label.parentElement).toBe(link.parentElement);
        expect(Array.from(label.parentElement?.classList ?? [])).toEqual(
            expect.arrayContaining(['flex-wrap', 'justify-between']),
        );
        expect(link.className).not.toContain('ml-auto');
    });
});
