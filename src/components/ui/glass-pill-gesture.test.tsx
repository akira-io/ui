// @vitest-environment jsdom

import {
    cleanup,
    fireEvent,
    render,
    screen,
    waitFor,
} from '@testing-library/react';
import {
    afterAll,
    afterEach,
    beforeAll,
    describe,
    expect,
    it,
    vi,
} from 'vitest';

import {
    GlassPillAction,
    GlassPillGroup,
    GlassToolbar,
} from '@/components/ui/glass-toolbar';

const lefts: Record<string, number> = { Archive: 4, Move: 48, Flag: 92 };
const restore: [string, PropertyDescriptor | undefined][] = [];
const originalRect = HTMLElement.prototype.getBoundingClientRect;

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
    define(
        'offsetLeft',
        (el) => lefts[el.getAttribute('aria-label') ?? ''] ?? 0,
    );
    define('offsetTop', (el) => (el.getAttribute('aria-label') ? 4 : 0));
    define('offsetWidth', (el) => (el.getAttribute('aria-label') ? 44 : 0));
    define('offsetHeight', (el) => (el.getAttribute('aria-label') ? 44 : 0));
    HTMLElement.prototype.getBoundingClientRect = function () {
        return this.dataset.slot === 'glass-pill-group'
            ? ({
                  left: 100,
                  top: 500,
                  right: 240,
                  bottom: 552,
                  width: 140,
                  height: 52,
              } as DOMRect)
            : originalRect.call(this);
    };
});

afterAll(() => {
    HTMLElement.prototype.getBoundingClientRect = originalRect;
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

const handlers = () => ({ archive: vi.fn(), move: vi.fn(), flag: vi.fn() });

function Toolbar({ on }: { on: ReturnType<typeof handlers> }) {
    return (
        <GlassToolbar label="Actions">
            <GlassPillGroup>
                <GlassPillAction
                    icon={<span>A</span>}
                    label="Archive"
                    onClick={on.archive}
                />
                <GlassPillAction
                    icon={<span>M</span>}
                    label="Move"
                    onClick={on.move}
                    disabled
                />
                <GlassPillAction
                    icon={<span>F</span>}
                    label="Flag"
                    onClick={on.flag}
                />
            </GlassPillGroup>
        </GlassToolbar>
    );
}

const action = (name: string) => screen.getByRole('button', { name });
const highlight = () =>
    document.querySelector<HTMLElement>('[data-slot="glass-pill-highlight"]')!;
const at = (x: number, y = 526) => ({
    pointerId: 1,
    button: 0,
    buttons: 1,
    clientX: x,
    clientY: y,
});

function slide(
    from: string,
    toX: number,
    end: 'up' | 'cancel' = 'up',
    toY = 526,
) {
    fireEvent.pointerDown(action(from), at(126));
    fireEvent.pointerMove(window, at(toX, toY));

    if (end === 'cancel') {
        fireEvent.pointerCancel(window, at(toX, toY));

        return;
    }

    fireEvent.pointerUp(window, at(toX, toY));
}

describe('pressing across a glass pill group', () => {
    it('shows the highlight under the pressed action', () => {
        render(<Toolbar on={handlers()} />);

        fireEvent.pointerDown(action('Archive'), at(126));

        expect(highlight().style.transform).toContain('translateX(4px)');
        expect(action('Archive').hasAttribute('data-pressed')).toBe(true);
        fireEvent.pointerUp(window, at(126));
    });

    it('runs the action the finger is released over, not the one it started on', () => {
        const on = handlers();
        render(<Toolbar on={on} />);

        slide('Archive', 214);

        expect(on.flag).toHaveBeenCalledTimes(1);
        fireEvent.click(action('Archive'), { detail: 1 });
        expect(on.archive).not.toHaveBeenCalled();
    });

    it('runs nothing when released outside the capsule', () => {
        const on = handlers();
        render(<Toolbar on={on} />);

        slide('Archive', 214, 'up', 700);
        fireEvent.click(action('Archive'), { detail: 1 });

        expect(on.flag).not.toHaveBeenCalled();
        expect(on.archive).not.toHaveBeenCalled();
        expect(action('Flag').hasAttribute('data-pressed')).toBe(false);
    });

    it('never marks or runs a disabled action', () => {
        const on = handlers();
        render(<Toolbar on={on} />);

        fireEvent.pointerDown(action('Archive'), at(126));
        fireEvent.pointerMove(window, at(170));

        expect(action('Move').hasAttribute('data-pressed')).toBe(false);
        fireEvent.pointerUp(window, at(170));
        expect(on.move).not.toHaveBeenCalled();
    });

    it('runs nothing when the gesture is cancelled', () => {
        const on = handlers();
        render(<Toolbar on={on} />);

        slide('Archive', 214, 'cancel');

        expect(on.flag).not.toHaveBeenCalled();
        expect(action('Flag').hasAttribute('data-pressed')).toBe(false);
    });

    it('ignores a second finger and lets go of the window on unmount', () => {
        const on = handlers();
        const { unmount } = render(<Toolbar on={on} />);

        fireEvent.pointerDown(action('Archive'), at(126));
        fireEvent.pointerDown(action('Flag'), { ...at(214), pointerId: 2 });
        fireEvent.pointerMove(window, at(214));
        unmount();

        expect(() => fireEvent.pointerUp(window, at(214))).not.toThrow();
        expect(on.flag).not.toHaveBeenCalled();
    });

    it('slides the highlight to the action under the finger', async () => {
        render(<Toolbar on={handlers()} />);

        fireEvent.pointerDown(action('Archive'), at(126));
        fireEvent.pointerMove(window, at(214));

        await waitFor(() =>
            expect(highlight().style.transform).toContain('translateX(92px)'),
        );
        expect(action('Flag').hasAttribute('data-pressed')).toBe(true);
        fireEvent.pointerUp(window, at(214));
    });

    it('leaves the start action to its own native click, so it runs once with its modifiers', () => {
        const on = handlers();
        render(<Toolbar on={on} />);

        fireEvent.pointerDown(action('Archive'), at(126));
        fireEvent.pointerMove(window, at(214));
        fireEvent.pointerMove(window, at(126));
        fireEvent.pointerUp(window, at(126));

        expect(on.archive).not.toHaveBeenCalled();
        fireEvent.click(action('Archive'), { detail: 1 });
        expect(on.archive).toHaveBeenCalledTimes(1);
    });

    it('keeps the first finger in charge when a second one presses', () => {
        render(<Toolbar on={handlers()} />);

        fireEvent.pointerDown(action('Archive'), at(126));
        fireEvent.pointerDown(action('Flag'), { ...at(214), pointerId: 2 });

        expect(action('Archive').hasAttribute('data-pressed')).toBe(true);
        expect(action('Flag').hasAttribute('data-pressed')).toBe(false);
        fireEvent.pointerUp(window, at(126));
    });

    it('runs a link action released over and keeps links from native dragging', () => {
        const onLink = vi.fn((event: Event) => event.preventDefault());
        render(
            <GlassToolbar label="Actions">
                <GlassPillGroup>
                    <GlassPillAction icon={<span>A</span>} label="Archive" />
                    <GlassPillAction icon={<span>F</span>} label="Flag" asChild>
                        <a
                            href="/flag"
                            onClick={(event) => onLink(event.nativeEvent)}
                        />
                    </GlassPillAction>
                </GlassPillGroup>
            </GlassToolbar>,
        );

        const link = screen.getByRole('link', { name: 'Flag' });

        expect(link.getAttribute('draggable')).toBe('false');
        fireEvent.pointerDown(action('Archive'), at(126));
        fireEvent.pointerMove(window, at(214));
        fireEvent.pointerUp(window, at(214));

        expect(onLink).toHaveBeenCalledTimes(1);
    });

    it('does not run an action that turned disabled during the press', () => {
        const on = handlers();
        const { rerender } = render(<Toolbar on={on} />);

        fireEvent.pointerDown(action('Archive'), at(126));
        fireEvent.pointerMove(window, at(214));
        rerender(
            <GlassToolbar label="Actions">
                <GlassPillGroup>
                    <GlassPillAction
                        icon={<span>A</span>}
                        label="Archive"
                        onClick={on.archive}
                    />
                    <GlassPillAction
                        icon={<span>M</span>}
                        label="Move"
                        onClick={on.move}
                        disabled
                    />
                    <GlassPillAction
                        icon={<span>F</span>}
                        label="Flag"
                        onClick={on.flag}
                        disabled
                    />
                </GlassPillGroup>
            </GlassToolbar>,
        );
        fireEvent.pointerUp(window, at(214));

        expect(on.flag).not.toHaveBeenCalled();
    });

    it('keeps blocking the native click of a slide until the next press, however late it arrives', async () => {
        const on = handlers();
        render(<Toolbar on={on} />);

        slide('Archive', 214);
        await new Promise((resolve) => setTimeout(resolve, 50));
        fireEvent.click(action('Archive'), { detail: 1 });

        expect(on.flag).toHaveBeenCalledTimes(1);
        expect(on.archive).not.toHaveBeenCalled();
    });

    it('lets keyboard clicks through after a slide', () => {
        const on = handlers();
        render(<Toolbar on={on} />);

        slide('Archive', 214);
        fireEvent.click(action('Archive'), { detail: 0 });

        expect(on.archive).toHaveBeenCalledTimes(1);
    });

    it('follows a hovering mouse with a lighter highlight and fades when it leaves', async () => {
        render(<Toolbar on={handlers()} />);

        const group = document.querySelector<HTMLElement>(
            '[data-slot="glass-pill-group"]',
        )!;
        const hover = (x: number) => ({
            pointerId: 1,
            pointerType: 'mouse',
            clientX: x,
            clientY: 526,
        });

        fireEvent.pointerMove(group, hover(126));
        expect(action('Archive').hasAttribute('data-hovered')).toBe(true);
        expect(highlight().style.transform).toContain('translateX(4px)');

        fireEvent.pointerMove(group, hover(214));
        expect(action('Archive').hasAttribute('data-hovered')).toBe(false);
        expect(action('Flag').hasAttribute('data-hovered')).toBe(true);
        await waitFor(() =>
            expect(highlight().style.transform).toContain('translateX(92px)'),
        );

        fireEvent.pointerLeave(group, hover(400));
        expect(action('Flag').hasAttribute('data-hovered')).toBe(false);
        await waitFor(() => expect(highlight().style.opacity).toBe('0'));
    });

    it('does not hover for touch or over a disabled action', () => {
        render(<Toolbar on={handlers()} />);

        const group = document.querySelector<HTMLElement>(
            '[data-slot="glass-pill-group"]',
        )!;

        fireEvent.pointerMove(group, {
            pointerId: 1,
            pointerType: 'touch',
            clientX: 126,
            clientY: 526,
        });
        expect(action('Archive').hasAttribute('data-hovered')).toBe(false);

        fireEvent.pointerMove(group, {
            pointerId: 1,
            pointerType: 'mouse',
            clientX: 170,
            clientY: 526,
        });
        expect(action('Move').hasAttribute('data-hovered')).toBe(false);
    });
});
