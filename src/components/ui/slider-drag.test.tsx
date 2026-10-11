/** @vitest-environment jsdom */

import { act, render } from '@testing-library/react';
import { beforeAll, describe, expect, it } from 'vitest';

import { Slider } from './slider';

beforeAll(() => {
    globalThis.ResizeObserver ??= class {
        observe() {}
        unobserve() {}
        disconnect() {}
    };
    Element.prototype.setPointerCapture ??= () => {};
    Element.prototype.hasPointerCapture ??= () => false;
    Element.prototype.releasePointerCapture ??= () => {};
});

describe('Slider drag state', () => {
    it('marks the root while a thumb is held and clears it on release', () => {
        const { container } = render(<Slider defaultValue={[40]} />);
        const root = container.querySelector('[data-slot="slider"]')!;

        act(() => {
            root.dispatchEvent(
                new PointerEvent('pointerdown', {
                    bubbles: true,
                    pointerId: 1,
                    button: 0,
                }),
            );
        });
        expect(root.hasAttribute('data-dragging')).toBe(true);

        act(() => {
            window.dispatchEvent(
                new PointerEvent('pointerup', { bubbles: true, pointerId: 1 }),
            );
        });
        expect(root.hasAttribute('data-dragging')).toBe(false);
    });

    it('draws the thumb as a capsule that turns to glass while dragging', () => {
        const { container } = render(<Slider defaultValue={[40]} />);
        const thumb = container.querySelector('[data-slot="slider-thumb"]')!;

        expect(thumb.className).toContain('rounded-full');
        expect(thumb.className).toContain('w-7');
        expect(thumb.className).toContain(
            'group-data-[dragging]/slider:glass-thumb',
        );
    });
});
