/** @vitest-environment jsdom */

import { act } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { ConfirmDialog } from './confirm-dialog';

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
}

afterEach(() => {
    act(() => root?.unmount());
    container?.remove();
    root = undefined;
    container = undefined;
});

function confirmButton() {
    return document.querySelectorAll<HTMLButtonElement>(
        '[data-slot="confirm-dialog"] [data-slot="dialog-footer"] button',
    )[1];
}

function click(element: Element | undefined) {
    act(() => {
        element?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
}

describe('ConfirmDialog', () => {
    it('confirms in the primary colour unless told the action is destructive', () => {
        render(
            <ConfirmDialog open onOpenChange={() => {}} onConfirm={() => {}} />,
        );

        expect(confirmButton()?.getAttribute('data-variant')).toBe('default');

        render(
            <ConfirmDialog
                open
                variant="destructive"
                onOpenChange={() => {}}
                onConfirm={() => {}}
            />,
        );

        expect(confirmButton()?.getAttribute('data-variant')).toBe(
            'destructive',
        );
    });

    it('closes itself once confirmed by default', () => {
        const onConfirm = vi.fn();
        const onOpenChange = vi.fn();
        render(
            <ConfirmDialog
                open
                onOpenChange={onOpenChange}
                onConfirm={onConfirm}
            />,
        );

        click(confirmButton());

        expect(onConfirm).toHaveBeenCalledTimes(1);
        expect(onOpenChange).toHaveBeenCalledWith(false);
    });

    it('leaves closing to the caller when closeOnConfirm is off', () => {
        const onConfirm = vi.fn();
        const onOpenChange = vi.fn();
        render(
            <ConfirmDialog
                open
                closeOnConfirm={false}
                onOpenChange={onOpenChange}
                onConfirm={onConfirm}
            />,
        );

        click(confirmButton());

        expect(onConfirm).toHaveBeenCalledTimes(1);
        expect(onOpenChange).not.toHaveBeenCalled();
    });

    it('renders its children and keeps confirm disabled on request', () => {
        const onConfirm = vi.fn();
        render(
            <ConfirmDialog
                open
                confirmDisabled
                onOpenChange={vi.fn()}
                onConfirm={onConfirm}
            >
                <p data-testid="extra">Extra field</p>
            </ConfirmDialog>,
        );

        expect(
            document.querySelector('[data-testid="extra"]')?.textContent,
        ).toBe('Extra field');
        expect(confirmButton()?.disabled).toBe(true);

        click(confirmButton());

        expect(onConfirm).not.toHaveBeenCalled();
    });
});
