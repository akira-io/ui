import { act } from 'react';
import { createRoot, type Root } from 'react-dom/client';

(
    globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT: boolean }
).IS_REACT_ACT_ENVIRONMENT = true;

let root: Root | undefined;
let container: HTMLDivElement | undefined;

export function render(element: React.ReactNode) {
    container ??= document.createElement('div');
    if (!container.isConnected) document.body.append(container);
    root ??= createRoot(container);
    act(() => root!.render(element));
    return container;
}

export function unmountRendered() {
    act(() => root?.unmount());
    container?.remove();
    root = undefined;
    container = undefined;
}

export function click(element: Element | null | undefined) {
    act(() => {
        element?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
}

export function type(input: HTMLInputElement, value: string) {
    const setter = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        'value',
    )?.set;

    act(() => {
        setter?.call(input, value);
        input.dispatchEvent(new Event('input', { bubbles: true }));
    });
}

export function dialog() {
    return document.querySelector('[data-slot="confirm-dialog"]');
}

export function trigger(id: string) {
    return document.querySelector(
        `[data-action-id="${id}"] button`,
    ) as HTMLButtonElement | null;
}

export function passwordField() {
    return dialog()?.querySelector<HTMLInputElement>(
        '[data-slot="danger-zone-password"] input',
    );
}

export function footerButtons() {
    return dialog()?.querySelectorAll<HTMLButtonElement>(
        '[data-slot="dialog-footer"] button',
    );
}

export function confirmButton() {
    return footerButtons()?.[1];
}

export function cancelButton() {
    return footerButtons()?.[0];
}
