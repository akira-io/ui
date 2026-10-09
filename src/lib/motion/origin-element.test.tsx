// @vitest-environment jsdom

import { afterEach, describe, expect, it } from 'vitest';

import { takeOrigin, trackOrigin } from '@/lib/motion/origin-element';

afterEach(() => {
    document.body.innerHTML = '';
});

function press(element: Element) {
    element.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
}

describe('the dialog origin', () => {
    it('is the interactive element pressed just before opening', () => {
        trackOrigin();
        document.body.innerHTML =
            '<button id="open"><span>Open</span></button>';

        press(document.querySelector('span')!);

        expect(takeOrigin()?.id).toBe('open');
    });

    it('falls back to the focused element for the keyboard', () => {
        trackOrigin();
        document.body.innerHTML = '<a id="link" href="#">Open</a>';
        press(document.body);
        document.getElementById('link')!.focus();

        expect(takeOrigin()?.id).toBe('link');
    });

    it('is missing when nothing was pressed or focused', () => {
        trackOrigin();
        document.body.innerHTML = '<p>Nothing</p>';
        press(document.querySelector('p')!);

        expect(takeOrigin()).toBeNull();
    });
});
