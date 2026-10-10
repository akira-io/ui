// @vitest-environment jsdom

import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import {
    afterAll,
    afterEach,
    beforeAll,
    describe,
    expect,
    it,
    vi,
} from 'vitest';

import { GlassTabBar, GlassTabBarItem } from '@/components/ui/glass-tab-bar';

const lefts: Record<string, number> = { home: 8, search: 88, inbox: 168 };
const restore: [string, PropertyDescriptor | undefined][] = [];

function define(name: string, read: (el: HTMLElement) => number) {
    restore.push([
        name,
        Object.getOwnPropertyDescriptor(HTMLElement.prototype, name),
    ]);
    Object.defineProperty(HTMLElement.prototype, name, {
        configurable: true,
        get() {
            return read(this as HTMLElement);
        },
    });
}

beforeAll(() => {
    define('offsetLeft', (el) => lefts[el.dataset.value ?? ''] ?? 0);
    define('offsetWidth', (el) =>
        el.dataset.value
            ? 72
            : el.dataset.slot === 'glass-tab-bar-track'
              ? 248
              : 0,
    );
});

afterAll(() => {
    for (const [name, descriptor] of restore) {
        if (descriptor) {
            Object.defineProperty(HTMLElement.prototype, name, descriptor);
        }
    }
});

afterEach(async () => {
    cleanup();
    await new Promise((resolve) => setTimeout(resolve, 0));
});

function Bar({ onValueChange }: { onValueChange: (value: string) => void }) {
    return (
        <GlassTabBar
            label="Main"
            defaultValue="home"
            onValueChange={onValueChange}
        >
            <GlassTabBarItem value="home" icon={<span>H</span>} label="Home" />
            <GlassTabBarItem
                value="search"
                icon={<span>S</span>}
                label="Search"
                disabled
            />
            <GlassTabBarItem
                value="inbox"
                icon={<span>I</span>}
                label="Inbox"
            />
        </GlassTabBar>
    );
}

const item = (name: string) => screen.getByRole('button', { name });

function drag(from: Element, dx: number) {
    fireEvent.pointerDown(from, {
        pointerId: 1,
        button: 0,
        clientX: 40,
        clientY: 20,
    });
    fireEvent.pointerMove(window, {
        pointerId: 1,
        buttons: 1,
        clientX: 40 + dx / 2,
        clientY: 20,
    });
    fireEvent.pointerMove(window, {
        pointerId: 1,
        buttons: 1,
        clientX: 40 + dx,
        clientY: 20,
    });
    fireEvent.pointerUp(window, {
        pointerId: 1,
        clientX: 40 + dx,
        clientY: 20,
    });
}

describe('dragging the glass lens', () => {
    it('chooses the destination the lens is dropped on', () => {
        const onValueChange = vi.fn();
        render(<Bar onValueChange={onValueChange} />);

        drag(item('Home'), 160);

        expect(onValueChange).toHaveBeenCalledWith('inbox');
        expect(onValueChange).toHaveBeenCalledTimes(1);
    });

    it('does nothing for a press that barely moves', () => {
        const onValueChange = vi.fn();
        render(<Bar onValueChange={onValueChange} />);

        drag(item('Home'), 3);

        expect(onValueChange).not.toHaveBeenCalled();
    });

    it('never lands on a disabled destination', () => {
        const onValueChange = vi.fn();
        render(<Bar onValueChange={onValueChange} />);

        drag(item('Home'), 90);

        expect(onValueChange).not.toHaveBeenCalledWith('search');
    });

    it('lands on the nearest destination when dropped past the end', () => {
        const onValueChange = vi.fn();
        render(<Bar onValueChange={onValueChange} />);

        drag(item('Home'), 900);

        expect(onValueChange).toHaveBeenCalledWith('inbox');
    });

    it('swallows the click that ends a drag', () => {
        const onValueChange = vi.fn();
        render(<Bar onValueChange={onValueChange} />);

        drag(item('Home'), 160);
        fireEvent.click(item('Home'));

        expect(onValueChange).toHaveBeenCalledTimes(1);
    });

    it('starts only from the active destination', () => {
        const onValueChange = vi.fn();
        render(<Bar onValueChange={onValueChange} />);

        drag(item('Inbox'), -160);

        expect(onValueChange).not.toHaveBeenCalled();
    });

    it('lets go of the window when it unmounts mid-drag', () => {
        const onValueChange = vi.fn();
        const { unmount } = render(<Bar onValueChange={onValueChange} />);

        fireEvent.pointerDown(item('Home'), {
            pointerId: 1,
            button: 0,
            clientX: 40,
            clientY: 20,
        });
        fireEvent.pointerMove(window, {
            pointerId: 1,
            buttons: 1,
            clientX: 120,
            clientY: 20,
        });
        unmount();

        expect(() =>
            fireEvent.pointerUp(window, {
                pointerId: 1,
                clientX: 200,
                clientY: 20,
            }),
        ).not.toThrow();
        expect(onValueChange).not.toHaveBeenCalled();
    });
});
