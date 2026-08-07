/** @vitest-environment jsdom */

import { act } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { DangerZone } from './danger-zone';

(
    globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT: boolean }
).IS_REACT_ACT_ENVIRONMENT = true;

let root: Root | undefined;
let container: HTMLDivElement | undefined;

function render(element: React.ReactNode) {
    container ??= document.createElement('div');
    if (!container.isConnected) document.body.append(container);
    root ??= createRoot(container);
    act(() => root!.render(element));
    return container;
}

afterEach(() => {
    act(() => root?.unmount());
    container?.remove();
    root = undefined;
    container = undefined;
});

function click(element: Element | null | undefined) {
    act(() => {
        element?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
}

function type(input: HTMLInputElement, value: string) {
    const setter = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        'value',
    )?.set;

    act(() => {
        setter?.call(input, value);
        input.dispatchEvent(new Event('input', { bubbles: true }));
    });
}

function dialog() {
    return document.querySelector('[data-slot="confirm-dialog"]');
}

function trigger(id: string) {
    return document.querySelector(
        `[data-action-id="${id}"] button`,
    ) as HTMLButtonElement | null;
}

function footerButtons() {
    return dialog()?.querySelectorAll<HTMLButtonElement>(
        '[data-slot="dialog-footer"] button',
    );
}

function confirmButton() {
    return footerButtons()?.[1];
}

function cancelButton() {
    return footerButtons()?.[0];
}

describe('DangerZone', () => {
    it('renders one region holding every destructive action', () => {
        const view = render(
            <DangerZone
                actions={[
                    {
                        id: 'revoke',
                        title: 'Revoke all sessions',
                        description: 'Signs every device out.',
                        actionLabel: 'Revoke',
                        onConfirm: vi.fn(),
                    },
                    {
                        id: 'delete',
                        title: 'Delete account',
                        onConfirm: vi.fn(),
                    },
                ]}
            />,
        );

        expect(view.querySelectorAll('[data-slot="danger-zone"]')).toHaveLength(
            1,
        );
        expect(
            view.querySelectorAll('[data-slot="danger-zone-action"]'),
        ).toHaveLength(2);
        expect(view.textContent).toContain('Revoke all sessions');
        expect(view.textContent).toContain('Signs every device out.');
        expect(trigger('revoke')?.textContent).toBe('Revoke');
        expect(trigger('delete')?.textContent).toBe('Delete');
    });

    it('never fires an action on the first click', () => {
        const onConfirm = vi.fn();
        render(
            <DangerZone
                actions={[{ id: 'delete', title: 'Delete account', onConfirm }]}
            />,
        );

        expect(dialog()).toBeNull();

        click(trigger('delete'));

        expect(onConfirm).not.toHaveBeenCalled();
        expect(dialog()).not.toBeNull();
    });

    it('fires the action once the confirmation is confirmed', () => {
        const onConfirm = vi.fn();
        render(
            <DangerZone
                actions={[
                    {
                        id: 'delete',
                        title: 'Delete account',
                        confirmTitle: 'Delete this account?',
                        onConfirm,
                    },
                ]}
            />,
        );

        click(trigger('delete'));

        expect(dialog()?.textContent).toContain('Delete this account?');

        click(confirmButton());

        expect(onConfirm).toHaveBeenCalledTimes(1);
    });

    it('does nothing when the confirmation is cancelled', () => {
        const onConfirm = vi.fn();
        render(
            <DangerZone
                actions={[{ id: 'delete', title: 'Delete account', onConfirm }]}
            />,
        );

        click(trigger('delete'));
        click(cancelButton());

        expect(onConfirm).not.toHaveBeenCalled();
        expect(dialog()).toBeNull();
    });

    it('confirms only the action whose trigger was pressed', () => {
        const revoke = vi.fn();
        const remove = vi.fn();
        render(
            <DangerZone
                actions={[
                    {
                        id: 'revoke',
                        title: 'Revoke sessions',
                        onConfirm: revoke,
                    },
                    {
                        id: 'delete',
                        title: 'Delete account',
                        onConfirm: remove,
                    },
                ]}
            />,
        );

        click(trigger('delete'));
        click(confirmButton());

        expect(remove).toHaveBeenCalledTimes(1);
        expect(revoke).not.toHaveBeenCalled();
    });

    it('holds the confirmation shut until the required value is typed', () => {
        const onConfirm = vi.fn();
        render(
            <DangerZone
                actions={[
                    {
                        id: 'delete',
                        title: 'Delete workspace',
                        requiredValue: 'Nos Ferry',
                        onConfirm,
                    },
                ]}
            />,
        );

        click(trigger('delete'));

        const gate = dialog()?.querySelector(
            '[data-slot="confirm-dialog-gate"] input',
        ) as HTMLInputElement;

        expect(gate).not.toBeNull();
        expect(dialog()?.textContent).toContain('Type Nos Ferry to confirm');
        expect(confirmButton()?.disabled).toBe(true);

        type(gate, 'nos ferry');
        click(confirmButton());

        expect(onConfirm).not.toHaveBeenCalled();

        type(gate, 'Nos Ferry');

        expect(confirmButton()?.disabled).toBe(false);

        click(confirmButton());

        expect(onConfirm).toHaveBeenCalledTimes(1);
    });

    it('disables every trigger while an action is running', () => {
        render(
            <DangerZone
                processing
                actions={[
                    {
                        id: 'revoke',
                        title: 'Revoke sessions',
                        onConfirm: vi.fn(),
                    },
                    {
                        id: 'delete',
                        title: 'Delete account',
                        onConfirm: vi.fn(),
                    },
                ]}
            />,
        );

        expect(trigger('revoke')?.disabled).toBe(true);
        expect(trigger('delete')?.disabled).toBe(true);
    });

    it('disables a single action a page marks as unavailable', () => {
        render(
            <DangerZone
                actions={[
                    {
                        id: 'revoke',
                        title: 'Revoke sessions',
                        onConfirm: vi.fn(),
                    },
                    {
                        id: 'delete',
                        title: 'Delete account',
                        disabled: true,
                        onConfirm: vi.fn(),
                    },
                ]}
            />,
        );

        expect(trigger('revoke')?.disabled).toBe(false);
        expect(trigger('delete')?.disabled).toBe(true);
    });

    it('takes translated labels over its English defaults', () => {
        const view = render(
            <DangerZone
                labels={{
                    title: 'Zona de perigo',
                    description: 'Estas ações são permanentes.',
                    actionLabel: 'Eliminar',
                }}
                actions={[
                    { id: 'delete', title: 'Apagar conta', onConfirm: vi.fn() },
                ]}
            />,
        );

        expect(view.querySelector('h2')?.textContent).toBe('Zona de perigo');
        expect(view.textContent).toContain('Estas ações são permanentes.');
        expect(trigger('delete')?.textContent).toBe('Eliminar');
    });
});
