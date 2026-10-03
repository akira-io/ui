// @vitest-environment jsdom

import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import type { ComponentProps } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import {
    DropdownMenu,
    DropdownMenuContent,
} from '@/components/ui/dropdown-menu';
import { AppSidebar as InertiaAppSidebar } from '@/inertia';
import { hrefToString } from '@/lib/href';
import { UserMenuContent } from '@/shells/user-menu-content';
import type { LinkProps, UserMenuItem } from '@/types';
import { installMatchMedia } from '../../tests/fixtures/match-media';

beforeEach(() => installMatchMedia());

afterEach(() => {
    cleanup();
    document.body.style.removeProperty('pointer-events');
});

function ButtonLink({
    href,
    children,
    prefetch: _prefetch,
    as: _as,
    ...props
}: LinkProps) {
    return (
        <button type="button" data-href={hrefToString(href)} {...props}>
            {children}
        </button>
    );
}

function renderMenu(
    props: Partial<ComponentProps<typeof UserMenuContent>> = {},
) {
    return render(
        <DropdownMenu open>
            <DropdownMenuContent>
                <UserMenuContent
                    user={{ name: 'Ana', email: 'ana@example.test' }}
                    settingsHref="/settings"
                    logoutHref="/logout"
                    linkComponent={ButtonLink}
                    {...props}
                />
            </DropdownMenuContent>
        </DropdownMenu>,
    );
}

function entryTitles(): string[] {
    return screen
        .getAllByRole('menuitem')
        .map((entry) => entry.textContent ?? '');
}

describe('the extra user menu items', () => {
    it('places each item before or after Settings in the order given', () => {
        renderMenu({
            extraItems: [
                { title: 'Billing', href: '/billing' },
                { title: 'Profile', href: '/profile', position: 'before' },
                { title: 'Help', href: '/help', position: 'after' },
                { title: 'Team', href: '/team', position: 'before' },
            ],
        });

        expect(entryTitles()).toEqual([
            'Profile',
            'Team',
            'Settings',
            'Billing',
            'Help',
            'Log out',
        ]);
    });

    it('leaves out an item marked as not visible', () => {
        renderMenu({
            extraItems: [
                { title: 'Admin', href: '/admin', visible: false },
                { title: 'Help', href: '/help', visible: true },
            ],
        });

        expect(screen.queryByText('Admin')).toBeNull();
        expect(entryTitles()).toEqual(['Settings', 'Help', 'Log out']);
    });

    it('routes an internal item through the link component', () => {
        renderMenu({ extraItems: [{ title: 'Help', href: { url: '/help' } }] });

        const entry = screen.getByRole('menuitem', { name: 'Help' });

        expect(entry.tagName).toBe('BUTTON');
        expect(entry.getAttribute('data-href')).toBe('/help');
    });

    it('opens an external item in a new tab without a referrer', () => {
        renderMenu({
            extraItems: [
                {
                    title: 'Docs',
                    href: { url: 'https://docs.example.test' },
                    external: true,
                },
            ],
        });

        const entry = screen.getByRole('menuitem', { name: 'Docs' });

        expect(entry.tagName).toBe('A');
        expect(entry.getAttribute('href')).toBe('https://docs.example.test');
        expect(entry.getAttribute('target')).toBe('_blank');
        expect(entry.getAttribute('rel')).toBe('noreferrer');
    });
});

describe('an extra item whose link is not navigable', () => {
    it.each(['javascript:alert(1)', ' \tjavascript:alert(1)'])(
        'leaves out internal and external items pointing at %j',
        (href) => {
            renderMenu({
                extraItems: [
                    { title: 'Internal', href },
                    { title: 'External', href: { url: href }, external: true },
                    {
                        title: 'Docs',
                        href: 'https://docs.example.test',
                        external: true,
                    },
                ],
            });

            expect(screen.queryByText('Internal')).toBeNull();
            expect(screen.queryByText('External')).toBeNull();
            expect(entryTitles()).toEqual(['Settings', 'Docs', 'Log out']);
        },
    );
});

describe('a user menu entry being chosen', () => {
    it.each([
        ['Settings', 'onSettingsClick'],
        ['Log out', 'onLogout'],
    ] as const)(
        'frees the page pointer events before %s calls the app',
        (title, callbackName) => {
            const seen: string[] = [];
            const callback = vi.fn(() => {
                seen.push(document.body.style.pointerEvents);
            });
            renderMenu({ [callbackName]: callback });
            document.body.style.pointerEvents = 'none';

            fireEvent.click(screen.getByRole('menuitem', { name: title }));

            expect(callback).toHaveBeenCalledOnce();
            expect(seen).toEqual(['']);
        },
    );

    it('frees the page pointer events for an extra item', () => {
        renderMenu({ extraItems: [{ title: 'Help', href: '/help' }] });
        document.body.style.pointerEvents = 'none';

        fireEvent.click(screen.getByRole('menuitem', { name: 'Help' }));

        expect(document.body.style.pointerEvents).toBe('');
    });
});

describe('the Inertia sidebar props', () => {
    it('accepts the extra items and user menu labels of the base sidebar', () => {
        const extraItems: UserMenuItem[] = [{ title: 'Help', href: '/help' }];
        const props: ComponentProps<typeof InertiaAppSidebar> = {
            logo: null,
            logoHref: '/',
            groups: [],
            user: { name: 'Ana', email: 'ana@example.test' },
            settingsHref: '/settings',
            logoutHref: '/logout',
            extraItems,
            userMenuLabels: { settingsLabel: 'Definições' },
        };

        expect(props.extraItems).toBe(extraItems);
        expect(props.userMenuLabels?.settingsLabel).toBe('Definições');
    });
});
