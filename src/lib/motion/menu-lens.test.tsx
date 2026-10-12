// @vitest-environment jsdom

import { act, cleanup, render } from '@testing-library/react';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';

import { MenuLens } from '@/lib/motion/menu-lens';

afterEach(cleanup);

function rectAt(top: number, height: number): DOMRect {
    return {
        top,
        left: 4,
        width: 200,
        height,
        right: 204,
        bottom: top + height,
        x: 4,
        y: top,
        toJSON: () => ({}),
    } as DOMRect;
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

    host.getBoundingClientRect = () => rectAt(0, 100);
    first!.getBoundingClientRect = () => rectAt(4, 36);
    second!.getBoundingClientRect = () => rectAt(40, 36);

    return {
        host,
        first: first!,
        second: second!,
        lens: host.querySelector<HTMLElement>('[data-slot="menu-lens"]')!,
    };
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

    it('sits under the highlighted item, glass on glass', async () => {
        const { lens, second } = menu();

        second.setAttribute('data-highlighted', '');
        await flush();

        expect(lens.style.opacity).toBe('1');
        expect(lens.style.transform).toBe('translate(0px, 40px)');
        expect(lens.style.height).toBe('36px');
        expect(lens.className).toContain('glass-button');
    });

    it('follows the highlight from item to item', async () => {
        const { lens, first, second } = menu();

        first.setAttribute('data-highlighted', '');
        await flush();
        first.removeAttribute('data-highlighted');
        second.setAttribute('data-highlighted', '');
        await flush();

        expect(lens.style.transform).toBe('translate(0px, 40px)');
    });

    it('follows the selected option of a command list too', async () => {
        const { lens, first } = menu();

        first.setAttribute('data-selected', 'true');
        await flush();

        expect(lens.style.transform).toBe('translate(0px, 4px)');
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
