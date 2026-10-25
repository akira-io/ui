/** @vitest-environment jsdom */

import { act, fireEvent, render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Switch } from './switch';

function setup() {
    const onCheckedChange = vi.fn();
    const { container } = render(<Switch onCheckedChange={onCheckedChange} />);
    const root = container.querySelector('button')!;

    root.getBoundingClientRect = () =>
        ({
            left: 0,
            width: 32,
            top: 0,
            height: 18,
            right: 32,
            bottom: 18,
        }) as DOMRect;

    return { root, onCheckedChange };
}

const pointer = (type: string, clientX: number) =>
    new PointerEvent(type, { bubbles: true, pointerId: 1, button: 0, clientX });

describe('Switch drag', () => {
    it('drops its window listeners when unmounted mid drag', () => {
        const removed = vi.spyOn(window, 'removeEventListener');
        const onCheckedChange = vi.fn();
        const { container, unmount } = render(
            <Switch onCheckedChange={onCheckedChange} />,
        );
        const root = container.querySelector('button')!;

        root.dispatchEvent(pointer('pointerdown', 4));
        window.dispatchEvent(pointer('pointermove', 26));
        unmount();

        const names = removed.mock.calls.map(([name]) => name);

        expect(names).toContain('pointermove');
        expect(names).toContain('pointerup');
        expect(names).toContain('pointercancel');
        removed.mockRestore();
    });

    it('turns on when released past the middle', () => {
        const { root, onCheckedChange } = setup();

        root.dispatchEvent(pointer('pointerdown', 4));
        expect(root.hasAttribute('data-pressed')).toBe(true);
        window.dispatchEvent(pointer('pointermove', 26));
        act(() => {
            window.dispatchEvent(pointer('pointerup', 26));
        });

        expect(onCheckedChange).toHaveBeenCalledWith(true);
        expect(root.hasAttribute('data-pressed')).toBe(false);
    });

    it('stays off when released on the side it started', () => {
        const { root, onCheckedChange } = setup();

        root.dispatchEvent(pointer('pointerdown', 4));
        window.dispatchEvent(pointer('pointermove', 12));
        window.dispatchEvent(pointer('pointerup', 12));
        fireEvent.click(root, { detail: 1 });

        expect(onCheckedChange).not.toHaveBeenCalled();
    });

    it('still toggles on a plain click', () => {
        const { root, onCheckedChange } = setup();

        fireEvent.click(root);

        expect(onCheckedChange).toHaveBeenCalledWith(true);
    });

    it('turns the thumb to glass while it is held', () => {
        const { root } = setup();
        const thumb = root.querySelector('[data-slot="switch-thumb"]')!;

        expect(thumb.className).toContain(
            'group-data-[pressed]/switch:glass-thumb',
        );
    });
});
