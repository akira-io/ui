// @vitest-environment jsdom

import {
    act,
    cleanup,
    fireEvent,
    render,
    screen,
    waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { MouseEvent } from 'react';
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
    define('offsetTop', (el) => (el.dataset.value ? 6 : 0));
    define('offsetWidth', (el) =>
        el.dataset.value
            ? 72
            : el.dataset.slot === 'glass-tab-bar-track'
              ? 248
              : 0,
    );
    define('offsetHeight', (el) => (el.dataset.value ? 48 : 0));
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

const lens = () =>
    document.querySelector<HTMLElement>('[data-slot="glass-tab-bar-lens"]')!;
const track = () =>
    document.querySelector<HTMLElement>('[data-slot="glass-tab-bar-track"]')!;

function press(target: Element, dx: number, end: 'up' | 'cancel' = 'up') {
    fireEvent.pointerDown(target, {
        pointerId: 1,
        button: 0,
        clientX: 40,
        clientY: 20,
    });
    fireEvent.pointerMove(window, {
        pointerId: 1,
        buttons: 1,
        clientX: 40 + dx,
        clientY: 20,
    });

    if (end === 'cancel') {
        fireEvent.pointerCancel(window, { pointerId: 1 });

        return;
    }

    fireEvent.pointerUp(window, {
        pointerId: 1,
        clientX: 40 + dx,
        clientY: 20,
    });
}

const bar = (onValueChange = vi.fn(), value?: string) => (
    <GlassTabBar
        label="Main"
        defaultValue="home"
        value={value}
        onValueChange={onValueChange}
    >
        <GlassTabBarItem value="home" icon={<span>H</span>} label="Home" />
        <GlassTabBarItem
            value="search"
            icon={<span>S</span>}
            label="Search"
            disabled
        />
        <GlassTabBarItem value="inbox" icon={<span>I</span>} label="Inbox" />
    </GlassTabBar>
);

describe('the glass tab bar on awkward input', () => {
    it('chooses a link destination even when the link prevents the default', async () => {
        const user = userEvent.setup();
        const onValueChange = vi.fn();
        render(
            <GlassTabBar
                label="Main"
                defaultValue="home"
                onValueChange={onValueChange}
            >
                <GlassTabBarItem
                    value="home"
                    icon={<span>H</span>}
                    label="Home"
                />
                <GlassTabBarItem
                    value="inbox"
                    icon={<span>I</span>}
                    label="Inbox"
                    asChild
                >
                    <a
                        href="/inbox"
                        onClick={(event) => event.preventDefault()}
                    />
                </GlassTabBarItem>
            </GlassTabBar>,
        );

        await user.click(screen.getByRole('link', { name: 'Inbox' }));

        expect(onValueChange).toHaveBeenCalledWith('inbox');
    });

    it('keeps a disabled link from navigating or being chosen', () => {
        const onValueChange = vi.fn();
        const onLinkClick = vi.fn();
        render(
            <GlassTabBar
                label="Main"
                defaultValue="home"
                onValueChange={onValueChange}
            >
                <GlassTabBarItem
                    value="home"
                    icon={<span>H</span>}
                    label="Home"
                />
                <GlassTabBarItem
                    value="inbox"
                    icon={<span>I</span>}
                    label="Inbox"
                    asChild
                    disabled
                >
                    <a href="/inbox" onClick={onLinkClick} />
                </GlassTabBarItem>
            </GlassTabBar>,
        );

        const link = screen.getByRole('link', { name: 'Inbox' });

        fireEvent.click(link);

        expect(onLinkClick).not.toHaveBeenCalled();
        expect(onValueChange).not.toHaveBeenCalled();
        expect(link.className).toContain('data-[disabled]:pointer-events-none');
    });

    it('leaves vertical page scrolling to the browser and keeps horizontal drags', () => {
        render(bar());

        expect(track().className).toContain('touch-pan-y');
    });

    it('settles the lens back on the active destination when the drag is cancelled', async () => {
        render(bar());

        press(screen.getByRole('button', { name: 'Home' }), 120, 'cancel');

        await waitFor(
            () => expect(lens().style.transform).toMatch(/translateX\(8px\)/),
            {
                timeout: 1500,
            },
        );
    });

    it('settles the lens back when the owner keeps the old value', async () => {
        const onValueChange = vi.fn();
        render(bar(onValueChange, 'home'));

        press(screen.getByRole('button', { name: 'Home' }), 160);

        expect(onValueChange).toHaveBeenCalledWith('inbox');
        await waitFor(
            () => expect(lens().style.transform).toMatch(/translateX\(8px\)/),
            {
                timeout: 1500,
            },
        );
    });

    it('keeps the lens on its row while it is dragged', () => {
        render(bar());

        fireEvent.pointerDown(screen.getByRole('button', { name: 'Home' }), {
            pointerId: 1,
            button: 0,
            clientX: 40,
            clientY: 20,
        });
        fireEvent.pointerMove(window, {
            pointerId: 1,
            buttons: 1,
            clientX: 100,
            clientY: 20,
        });

        expect(lens().style.transform).toContain('translateY(6px)');
        fireEvent.pointerUp(window, {
            pointerId: 1,
            clientX: 100,
            clientY: 20,
        });
    });

    it('lands on the nearest enabled destination when dropped on a disabled one', () => {
        const onValueChange = vi.fn();
        render(bar(onValueChange));

        press(screen.getByRole('button', { name: 'Home' }), 86);

        expect(onValueChange).toHaveBeenCalledWith('inbox');
    });

    it('marks the destination under the lens while dragging', () => {
        render(bar());

        fireEvent.pointerDown(screen.getByRole('button', { name: 'Home' }), {
            pointerId: 1,
            button: 0,
            clientX: 40,
            clientY: 20,
        });
        fireEvent.pointerMove(window, {
            pointerId: 1,
            buttons: 1,
            clientX: 200,
            clientY: 20,
        });

        expect(
            screen
                .getByRole('button', { name: 'Inbox' })
                .hasAttribute('data-hovered'),
        ).toBe(true);
        fireEvent.pointerUp(window, {
            pointerId: 1,
            clientX: 200,
            clientY: 20,
        });
        expect(
            screen
                .getByRole('button', { name: 'Inbox' })
                .hasAttribute('data-hovered'),
        ).toBe(false);
    });

    it('ignores a second finger while one drag runs', () => {
        const onValueChange = vi.fn();
        render(bar(onValueChange));

        const home = screen.getByRole('button', { name: 'Home' });

        fireEvent.pointerDown(home, {
            pointerId: 1,
            button: 0,
            clientX: 40,
            clientY: 20,
        });
        fireEvent.pointerDown(home, {
            pointerId: 2,
            button: 0,
            clientX: 60,
            clientY: 20,
        });
        fireEvent.pointerMove(window, {
            pointerId: 1,
            buttons: 1,
            clientX: 200,
            clientY: 20,
        });
        fireEvent.pointerUp(window, {
            pointerId: 1,
            clientX: 200,
            clientY: 20,
        });

        expect(onValueChange).toHaveBeenCalledTimes(1);
    });

    it('keeps one destination in the tab order when none is active', () => {
        render(
            <GlassTabBar label="Main">
                <GlassTabBarItem
                    value="home"
                    icon={<span>H</span>}
                    label="Home"
                />
                <GlassTabBarItem
                    value="inbox"
                    icon={<span>I</span>}
                    label="Inbox"
                />
            </GlassTabBar>,
        );

        const tabbable = screen
            .getAllByRole('button')
            .filter((item) => item.tabIndex === 0);

        expect(tabbable).toHaveLength(1);
    });

    it('keeps its own state attributes over a consumer attribute', () => {
        render(
            <GlassTabBar label="Main" defaultValue="home">
                <GlassTabBarItem
                    value="home"
                    icon={<span>H</span>}
                    label="Home"
                    data-state="custom"
                />
            </GlassTabBar>,
        );

        expect(screen.getByRole('button', { name: 'Home' }).dataset.state).toBe(
            'active',
        );
    });

    it('chooses the focused destination with Enter', async () => {
        const user = userEvent.setup();
        const onValueChange = vi.fn();
        render(bar(onValueChange));

        screen.getByRole('button', { name: 'Home' }).focus();
        await user.keyboard('{ArrowRight}{Enter}');

        expect(onValueChange).toHaveBeenCalledWith('inbox');
        act(() => undefined);
    });

    it('keeps a single tab stop after the first choice when none was active', async () => {
        const user = userEvent.setup();
        render(
            <GlassTabBar label="Main">
                <GlassTabBarItem
                    value="home"
                    icon={<span>H</span>}
                    label="Home"
                />
                <GlassTabBarItem
                    value="inbox"
                    icon={<span>I</span>}
                    label="Inbox"
                />
            </GlassTabBar>,
        );

        await user.click(screen.getByRole('button', { name: 'Inbox' }));

        const tabbable = screen
            .getAllByRole('button')
            .filter((item) => item.tabIndex === 0);

        expect(tabbable).toEqual([
            screen.getByRole('button', { name: 'Inbox' }),
        ]);
    });

    it('lets a consumer capture handler cancel the choice', async () => {
        const user = userEvent.setup();
        const onValueChange = vi.fn();
        const onClickCapture = vi.fn((event: MouseEvent) =>
            event.preventDefault(),
        );
        render(
            <GlassTabBar
                label="Main"
                defaultValue="home"
                onValueChange={onValueChange}
            >
                <GlassTabBarItem
                    value="home"
                    icon={<span>H</span>}
                    label="Home"
                />
                <GlassTabBarItem
                    value="inbox"
                    icon={<span>I</span>}
                    label="Inbox"
                    onClickCapture={onClickCapture}
                />
            </GlassTabBar>,
        );

        await user.click(screen.getByRole('button', { name: 'Inbox' }));

        expect(onClickCapture).toHaveBeenCalledTimes(1);
        expect(onValueChange).not.toHaveBeenCalled();
    });
});
