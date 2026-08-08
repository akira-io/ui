/** @vitest-environment jsdom */

import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { UiLocaleProvider } from '@/locales/context';
import { loginFormLabelsPt } from '@/locales/pt';

import { LoginFormPassword, LoginFormRoot } from './parts';

afterEach(cleanup);

function renderPasswordField() {
    return render(
        <UiLocaleProvider labels={{ loginForm: loginFormLabelsPt }}>
            <LoginFormRoot>
                <LoginFormPassword forgotPasswordHref="/forgot" />
            </LoginFormRoot>
        </UiLocaleProvider>,
    );
}

describe('the forgot-password link', () => {
    it('follows the password input rather than crowding the label', () => {
        renderPasswordField();

        const input = screen.getByPlaceholderText(
            loginFormLabelsPt.passwordPlaceholder,
        );
        const link = screen.getByRole('link', {
            name: loginFormLabelsPt.forgotPasswordLabel,
        });

        expect(
            input.compareDocumentPosition(link) &
                Node.DOCUMENT_POSITION_FOLLOWING,
        ).toBeTruthy();
    });

    it('leaves the label alone, with nothing sharing its row', () => {
        renderPasswordField();

        const label = screen.getByText(loginFormLabelsPt.passwordLabel);
        const link = screen.getByRole('link', {
            name: loginFormLabelsPt.forgotPasswordLabel,
        });

        expect(label.contains(link)).toBe(false);
        expect(
            label.compareDocumentPosition(link) &
                Node.DOCUMENT_POSITION_FOLLOWING,
        ).toBeTruthy();
    });

    it('renders both strings whole, in document order, with nothing truncated', () => {
        renderPasswordField();

        const label = screen.getByText(loginFormLabelsPt.passwordLabel);
        const link = screen.getByRole('link', {
            name: loginFormLabelsPt.forgotPasswordLabel,
        });

        expect(label.textContent).toBe(loginFormLabelsPt.passwordLabel);
        expect(link.textContent).toBe(loginFormLabelsPt.forgotPasswordLabel);
    });

    it('keeps the label and the link out of the same flex row, so they cannot crowd and break mid-word', () => {
        renderPasswordField();

        const label = screen.getByText(loginFormLabelsPt.passwordLabel);
        const link = screen.getByRole('link', {
            name: loginFormLabelsPt.forgotPasswordLabel,
        });

        const field = link.closest('[data-orientation]');

        expect(field).not.toBeNull();
        expect(field?.getAttribute('data-orientation')).toBe('vertical');
        expect(label.parentElement).toBe(field);
        expect(link.parentElement).toBe(field);
    });
});
