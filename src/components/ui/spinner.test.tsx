/** @vitest-environment jsdom */

import { act } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, describe, expect, it } from 'vitest';

import { Spinner } from './spinner';

(
    globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT: boolean }
).IS_REACT_ACT_ENVIRONMENT = true;

let root: Root | undefined;
let container: HTMLDivElement | undefined;

function renderSpinner(element: React.ReactNode) {
    container = document.createElement('div');
    document.body.append(container);
    root = createRoot(container);

    act(() => root!.render(element));

    return container;
}

afterEach(() => {
    act(() => root?.unmount());
    container?.remove();
    root = undefined;
    container = undefined;
});

describe('Spinner', () => {
    it('announces a visually hidden default label', () => {
        const view = renderSpinner(<Spinner />);
        const status = view.querySelector('[data-slot="spinner"]');

        expect(status?.getAttribute('role')).toBe('status');
        expect(status?.textContent).toBe('Loading');
        expect(status?.querySelector('.sr-only')?.textContent).toBe('Loading');
    });

    it('accepts an accessible label and the three control-aligned sizes', () => {
        const view = renderSpinner(<Spinner label="Saving" size="lg" />);
        const status = view.querySelector('[data-slot="spinner"]');

        expect(status?.textContent).toBe('Saving');
        expect(status?.getAttribute('data-size')).toBe('lg');
        expect(status?.className).toContain('size-5');
    });

    it('inherits text colour and stops animation for reduced motion', () => {
        const view = renderSpinner(<Spinner />);
        const icon = view.querySelector('[data-slot="spinner"] svg');

        expect(icon?.getAttribute('class')).toContain('text-current');
        expect(icon?.getAttribute('class')).toContain('animate-spin');
        expect(icon?.getAttribute('class')).toContain(
            'motion-reduce:animate-none',
        );
    });
});
