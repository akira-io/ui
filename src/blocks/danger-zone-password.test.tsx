/** @vitest-environment jsdom */

import { act } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import {
    click,
    confirmButton,
    dialog,
    passwordField,
    render,
    trigger,
    type,
    unmountRendered,
} from '../../tests/fixtures/danger-zone';
import { DangerZone } from './danger-zone';

afterEach(unmountRendered);

describe('DangerZone with a password', () => {
    it('asks for no password unless the action requires one', () => {
        render(
            <DangerZone
                actions={[
                    {
                        id: 'delete',
                        title: 'Delete account',
                        onConfirm: vi.fn(),
                    },
                ]}
            />,
        );

        click(trigger('delete'));

        expect(passwordField()).toBeNull();
        expect(confirmButton()?.disabled).toBe(false);
    });

    it('holds the confirmation shut until the current password is typed', () => {
        const onConfirm = vi.fn();
        render(
            <DangerZone
                actions={[
                    {
                        id: 'delete',
                        title: 'Delete account',
                        requirePassword: true,
                        onConfirm,
                    },
                ]}
            />,
        );

        click(trigger('delete'));

        const field = passwordField()!;

        expect(field.type).toBe('password');
        expect(field.autocomplete).toBe('current-password');
        expect(field.placeholder).toBe('Password');
        expect(
            dialog()?.querySelector(`label[for="${field.id}"]`)?.textContent,
        ).toBe('Current password');
        expect(confirmButton()?.disabled).toBe(true);

        click(confirmButton());

        expect(onConfirm).not.toHaveBeenCalled();

        type(field, 'secret');

        expect(confirmButton()?.disabled).toBe(false);
    });

    it('hands the typed password to the action and closes once it resolves', async () => {
        let settle: () => void = () => {};
        const onConfirm = vi.fn(
            () =>
                new Promise<void>((resolve) => {
                    settle = resolve;
                }),
        );
        render(
            <DangerZone
                actions={[
                    {
                        id: 'delete',
                        title: 'Delete account',
                        requirePassword: true,
                        onConfirm,
                    },
                ]}
            />,
        );

        click(trigger('delete'));
        type(passwordField()!, 'secret');
        click(confirmButton());

        expect(onConfirm).toHaveBeenCalledWith('secret');
        expect(dialog()).not.toBeNull();
        expect(confirmButton()?.disabled).toBe(true);
        expect(passwordField()?.disabled).toBe(true);

        await act(async () => settle());

        expect(dialog()).toBeNull();

        click(trigger('delete'));

        expect(passwordField()?.value).toBe('');
    });

    it('stays open with the reason and the field focused when the action rejects', async () => {
        const onConfirm = vi.fn(() =>
            Promise.reject(new Error('The password is incorrect.')),
        );
        render(
            <DangerZone
                actions={[
                    {
                        id: 'delete',
                        title: 'Delete account',
                        requirePassword: true,
                        onConfirm,
                    },
                ]}
            />,
        );

        click(trigger('delete'));
        type(passwordField()!, 'wrong');

        await act(async () => {
            confirmButton()?.dispatchEvent(
                new MouseEvent('click', { bubbles: true }),
            );
        });

        const field = passwordField()!;
        const error = dialog()?.querySelector('[data-slot="field-error"]');

        expect(dialog()).not.toBeNull();
        expect(error?.textContent).toBe('The password is incorrect.');
        expect(field.getAttribute('aria-invalid')).toBe('true');
        expect(field.getAttribute('aria-describedby')).toBe(error?.id);
        expect(document.activeElement).toBe(field);
        expect(confirmButton()?.disabled).toBe(false);
    });

    it('shows a server error the page passes for the password', () => {
        render(
            <DangerZone
                actions={[
                    {
                        id: 'delete',
                        title: 'Delete account',
                        requirePassword: true,
                        error: 'The provided password was incorrect.',
                        onConfirm: vi.fn(),
                    },
                ]}
            />,
        );

        click(trigger('delete'));

        expect(
            dialog()?.querySelector('[data-slot="field-error"]')?.textContent,
        ).toBe('The provided password was incorrect.');
    });
});
