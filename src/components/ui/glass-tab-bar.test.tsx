// @vitest-environment jsdom

import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

beforeAll(() => {
    Object.defineProperty(HTMLElement.prototype, 'offsetLeft', {
        configurable: true,
        get() {
            return lefts[(this as HTMLElement).dataset.value ?? ''] ?? 0;
        },
    });
});

afterAll(() => {
    delete (HTMLElement.prototype as unknown as Record<string, unknown>)
        .offsetLeft;
});

afterEach(cleanup);

function Bar({
    onValueChange = () => {},
    value,
}: {
    onValueChange?: (value: string) => void;
    value?: string;
}) {
    return (
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
            <GlassTabBarItem
                value="inbox"
                icon={<span>I</span>}
                label="Inbox"
            />
        </GlassTabBar>
    );
}

const item = (name: string) => screen.getByRole('button', { name });

describe('GlassTabBar', () => {
    it('marks the active destination for assistive tech and styling', () => {
        render(<Bar />);

        expect(screen.getByRole('navigation', { name: 'Main' })).toBeTruthy();
        expect(item('Home').getAttribute('aria-current')).toBe('page');
        expect(item('Home').dataset.state).toBe('active');
        expect(item('Inbox').getAttribute('aria-current')).toBeNull();
        expect(item('Inbox').dataset.state).toBe('inactive');
    });

    it('chooses a destination on tap, owned or controlled', async () => {
        const user = userEvent.setup();
        const onValueChange = vi.fn();
        const { rerender } = render(<Bar onValueChange={onValueChange} />);

        await user.click(item('Inbox'));

        expect(onValueChange).toHaveBeenCalledWith('inbox');
        expect(item('Inbox').getAttribute('aria-current')).toBe('page');

        rerender(<Bar onValueChange={onValueChange} value="home" />);
        await user.click(item('Inbox'));

        expect(item('Home').getAttribute('aria-current')).toBe('page');
    });

    it('renders a link through asChild with the same state', () => {
        render(
            <GlassTabBar label="Main" defaultValue="home">
                <GlassTabBarItem
                    value="home"
                    icon={<span>H</span>}
                    label="Home"
                    asChild
                >
                    <a href="/home" />
                </GlassTabBarItem>
            </GlassTabBar>,
        );

        const link = screen.getByRole('link', { name: 'Home' });

        expect(link.getAttribute('href')).toBe('/home');
        expect(link.getAttribute('aria-current')).toBe('page');
        expect(link.dataset.slot).toBe('glass-tab-bar-item');
    });

    it('moves focus with the arrows, home and end, skipping disabled destinations', async () => {
        const user = userEvent.setup();
        render(<Bar />);

        expect(item('Home').tabIndex).toBe(0);
        expect(item('Inbox').tabIndex).toBe(-1);

        item('Home').focus();
        await user.keyboard('{ArrowRight}');
        expect(document.activeElement).toBe(item('Inbox'));
        await user.keyboard('{ArrowRight}');
        expect(document.activeElement).toBe(item('Home'));
        await user.keyboard('{End}');
        expect(document.activeElement).toBe(item('Inbox'));
        await user.keyboard('{Home}');
        expect(document.activeElement).toBe(item('Home'));
    });

    it('keeps a glass lens behind the active destination', () => {
        render(<Bar />);

        const lens = document.querySelector<HTMLElement>(
            '[data-slot="glass-tab-bar-lens"]',
        );

        expect(lens?.getAttribute('aria-hidden')).toBe('true');
        expect(lens?.style.transform).toContain('translateX(8px)');
    });
});
