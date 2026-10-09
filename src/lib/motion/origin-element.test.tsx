// @vitest-environment jsdom

import { afterEach, describe, expect, it, vi } from 'vitest';

import { takeOrigin, trackOrigin } from '@/lib/motion/origin-element';

afterEach(() => {
    vi.useRealTimers();
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

    it('ignores a focused field, so a shortcut typed in it grows from the centre', () => {
        trackOrigin();
        document.body.innerHTML = '<input id="search" />';
        press(document.body);
        document.getElementById('search')!.focus();

        expect(takeOrigin()).toBeNull();
    });

    it('forgets a press older than a second', () => {
        vi.useFakeTimers({ toFake: ['performance'] });
        trackOrigin();
        document.body.innerHTML = '<button id="old">Old</button>';
        press(document.getElementById('old')!);

        vi.advanceTimersByTime(1500);

        expect(takeOrigin()).toBeNull();
    });

    it('forgets a pressed element that left the page', () => {
        trackOrigin();
        document.body.innerHTML = '<button id="gone">Gone</button>';
        press(document.getElementById('gone')!);
        document.body.innerHTML = '';

        expect(takeOrigin()).toBeNull();
    });
});
