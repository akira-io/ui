// @vitest-environment jsdom

import { act, cleanup, render } from '@testing-library/react';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';

import { MenuLens } from '@/lib/motion/menu-lens';

afterEach(cleanup);

function layout(
    element: HTMLElement,
    top: number,
    height: number,
    parent: HTMLElement | null,
) {
    Object.defineProperties(element, {
        offsetTop: { configurable: true, get: () => top },
        offsetLeft: { configurable: true, get: () => 4 },
        offsetWidth: { configurable: true, get: () => 200 },
        offsetHeight: { configurable: true, get: () => height },
        offsetParent: { configurable: true, get: () => parent },
    });
}

function menu() {
    const view = render(
        <div data-testid="host">
            <MenuLens />
            <div role="menuitem">Due on receipt</div>
            <div role="menuitem">Net 15 days</div>
        </div>,
    );
    const host = view.getByTestId('host');
    const [first, second] =
        host.querySelectorAll<HTMLElement>('[role=menuitem]');
    const lens = host.querySelector<HTMLElement>('[data-slot="menu-lens"]')!;

    layout(lens, 0, 0, host);
    layout(first!, 4, 36, host);
    layout(second!, 40, 36, host);
    host.getBoundingClientRect = () => {
        throw new Error('the lens must not measure through transforms');
    };

    return { host, first: first!, second: second!, lens };
}

async function flush() {
    await act(async () => {
        await Promise.resolve();
    });
}

describe('the menu lens', () => {
    it('stays hidden while no item is highlighted', () => {
        const { lens } = menu();

        expect(lens.style.opacity).toBe('0');
    });

    it('covers the whole highlighted item from its layout box, untouched by the opening scale', async () => {
        const { lens, second } = menu();

        second.setAttribute('data-highlighted', '');
        await flush();

        expect(lens.style.opacity).toBe('1');
        expect(lens.style.transform).toBe('translate(4px, 40px)');
        expect(lens.style.height).toBe('36px');
        expect(lens.style.width).toBe('200px');
        expect(lens.className).toContain('glass-button');
    });

    it('follows the highlight from item to item', async () => {
        const { lens, first, second } = menu();

        first.setAttribute('data-highlighted', '');
        await flush();
        first.removeAttribute('data-highlighted');
        second.setAttribute('data-highlighted', '');
        await flush();

        expect(lens.style.transform).toBe('translate(4px, 40px)');
    });

    it('follows the selected option of a command list too', async () => {
        const { lens, first } = menu();

        first.setAttribute('data-selected', 'true');
        await flush();

        expect(lens.style.transform).toBe('translate(4px, 4px)');
    });

    it('hides again once the pointer leaves every item', async () => {
        const { lens, first } = menu();

        first.setAttribute('data-highlighted', '');
        await flush();
        first.removeAttribute('data-highlighted');
        await flush();

        expect(lens.style.opacity).toBe('0');
    });
});

describe('a menu with a lens', () => {
    it('leaves the highlighted item without a fill of its own, the lens draws it', () => {
        const css = readFileSync(resolve(process.cwd(), 'glass.css'), 'utf8');

        expect(css).toMatch(
            /\[data-menu-lens\][^{]*\[data-highlighted\][^{]*\{[^}]*background-color:\s*transparent/,
        );
    });
});
