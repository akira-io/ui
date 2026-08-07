// @vitest-environment jsdom

import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it } from 'vitest';

import { PasswordInput } from '@/components/ui/password-input';

afterEach(cleanup);

function field(): HTMLInputElement {
    return document.querySelector('input') as HTMLInputElement;
}

describe('the password input', () => {
    it('hides the value until the reveal control is used', async () => {
        const user = userEvent.setup();
        render(<PasswordInput defaultValue="hunter2" />);

        expect(field().type).toBe('password');

        await user.click(screen.getByRole('button', { name: 'Show password' }));

        expect(field().type).toBe('text');

        await user.click(screen.getByRole('button', { name: 'Hide password' }));

        expect(field().type).toBe('password');
    });

    it('renames the control and reports its state as it toggles', async () => {
        const user = userEvent.setup();
        render(<PasswordInput />);

        const toggle = screen.getByRole('button', { name: 'Show password' });

        expect(toggle.getAttribute('aria-pressed')).toBe('false');

        await user.click(toggle);

        expect(
            screen.getByRole('button', { name: 'Hide password' }),
        ).toBeDefined();
        expect(toggle.getAttribute('aria-pressed')).toBe('true');
    });

    it('takes translated names for both states', async () => {
        const user = userEvent.setup();
        render(
            <PasswordInput
                showLabel="Mostrar palavra-passe"
                hideLabel="Ocultar palavra-passe"
            />,
        );

        await user.click(
            screen.getByRole('button', { name: 'Mostrar palavra-passe' }),
        );

        expect(
            screen.getByRole('button', { name: 'Ocultar palavra-passe' }),
        ).toBeDefined();
    });

    it('keeps the value, the caret and the focus across a toggle', async () => {
        const user = userEvent.setup();
        render(<PasswordInput defaultValue="hunter2" />);

        const input = field();
        input.focus();
        input.setSelectionRange(3, 3);

        await user.click(screen.getByRole('button', { name: 'Show password' }));

        expect(field()).toBe(input);
        expect(input.value).toBe('hunter2');
        expect(input.selectionStart).toBe(3);
        expect(document.activeElement).toBe(input);
    });

    it('drops the reveal control when the caller turns it off', () => {
        render(<PasswordInput revealable={false} defaultValue="hunter2" />);

        expect(screen.queryByRole('button')).toBeNull();
        expect(field().type).toBe('password');
    });

    it('stays a real input a password manager can fill', () => {
        render(
            <PasswordInput name="password" autoComplete="current-password" />,
        );

        expect(field().tagName).toBe('INPUT');
        expect(field().name).toBe('password');
        expect(field().autocomplete).toBe('current-password');
    });

    it('holds typed text clear of the reveal control', () => {
        render(<PasswordInput />);

        expect(field().className).toContain('pr-12');
    });
});
