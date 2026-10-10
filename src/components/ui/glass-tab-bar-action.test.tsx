// @vitest-environment jsdom

import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it } from 'vitest';

import {
    GlassTabBar,
    GlassTabBarAction,
    GlassTabBarItem,
} from '@/components/ui/glass-tab-bar';
import { UiLocaleProvider } from '@/locales/context';
import { ptLabels } from '@/locales/pt';

afterEach(cleanup);

const bar = (
    <GlassTabBar
        label="Main"
        defaultValue="home"
        action={
            <GlassTabBarAction icon={<span>S</span>} label="Search">
                {({ close }) => (
                    <>
                        <input aria-label="Search the app" />
                        <button onClick={close}>Done</button>
                    </>
                )}
            </GlassTabBarAction>
        }
    >
        <GlassTabBarItem value="home" icon={<span>H</span>} label="Home" />
        <GlassTabBarItem value="inbox" icon={<span>I</span>} label="Inbox" />
    </GlassTabBar>
);

const nav = () => screen.getByRole('navigation', { name: 'Main' });

describe('the glass tab bar action', () => {
    it('sits beside the bar as a named circle', () => {
        render(bar);

        const circle = screen.getByRole('button', { name: 'Search' });

        expect(circle.getAttribute('aria-expanded')).toBe('false');
        expect(nav().contains(circle)).toBe(true);
    });

    it('grows into its content, focuses the field and folds the bar to the active destination', async () => {
        const user = userEvent.setup();
        render(bar);

        await user.click(screen.getByRole('button', { name: 'Search' }));

        expect(document.activeElement).toBe(
            screen.getByLabelText('Search the app'),
        );
        expect(nav().dataset.expanded).toBe('true');
        expect(
            screen.getByRole('button', { name: 'Inbox' }).className,
        ).toContain(
            'group-data-[expanded]/glass-tab-bar:data-[state=inactive]:hidden',
        );
    });

    it('closes from its close control, from escape and from the content, handing focus back', async () => {
        const user = userEvent.setup();
        render(bar);

        await user.click(screen.getByRole('button', { name: 'Search' }));
        await user.click(screen.getByRole('button', { name: 'Close' }));
        expect(document.activeElement).toBe(
            screen.getByRole('button', { name: 'Search' }),
        );
        expect(nav().dataset.expanded).toBeUndefined();

        await user.click(screen.getByRole('button', { name: 'Search' }));
        await user.keyboard('{Escape}');
        expect(screen.queryByLabelText('Search the app')).toBeNull();

        await user.click(screen.getByRole('button', { name: 'Search' }));
        await user.click(screen.getByText('Done'));
        expect(screen.queryByLabelText('Search the app')).toBeNull();
    });

    it('names its close control from the locale provider', async () => {
        const user = userEvent.setup();
        render(<UiLocaleProvider labels={ptLabels}>{bar}</UiLocaleProvider>);

        await user.click(screen.getByRole('button', { name: 'Search' }));

        expect(screen.getByRole('button', { name: 'Fechar' })).toBeTruthy();
    });
});

describe('the glass tab bar action on awkward input', () => {
    it('closes on a press outside it', async () => {
        const user = userEvent.setup();
        render(
            <>
                {bar}
                <button>Elsewhere</button>
            </>,
        );

        await user.click(screen.getByRole('button', { name: 'Search' }));
        await user.click(screen.getByText('Elsewhere'));

        expect(screen.queryByLabelText('Search the app')).toBeNull();
        expect(nav().dataset.expanded).toBeUndefined();
    });

    it('unfolds the bar when the open action goes away', async () => {
        const user = userEvent.setup();
        const withAction = (action: boolean) => (
            <GlassTabBar
                label="Main"
                defaultValue="home"
                action={
                    action ? (
                        <GlassTabBarAction icon={<span>S</span>} label="Search">
                            {() => <input aria-label="Search the app" />}
                        </GlassTabBarAction>
                    ) : undefined
                }
            >
                <GlassTabBarItem
                    value="home"
                    icon={<span>H</span>}
                    label="Home"
                />
            </GlassTabBar>
        );
        const { rerender } = render(withAction(true));

        await user.click(screen.getByRole('button', { name: 'Search' }));
        rerender(withAction(false));

        expect(nav().dataset.expanded).toBeUndefined();
    });

    it('keeps arrow keys on the visible destination while folded', async () => {
        const user = userEvent.setup();
        render(bar);

        await user.click(screen.getByRole('button', { name: 'Search' }));
        screen.getByRole('button', { name: 'Home' }).focus();
        await user.keyboard('{ArrowRight}');

        expect(document.activeElement).toBe(
            screen.getByRole('button', { name: 'Home' }),
        );
    });
});
