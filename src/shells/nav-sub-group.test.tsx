// @vitest-environment jsdom

import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeAll, beforeEach, describe, expect, it } from 'vitest';

import { SidebarProvider } from '@/components/ui/sidebar';
import { SIDEBAR_EXPANDED_GROUPS_KEY } from '@/hooks/use-collapsed-groups';
import type { NavGroup } from '@/types';

import { installMatchMedia } from '../../tests/fixtures/match-media';
import { NavMain } from './nav-main';

beforeAll(() => {
    installMatchMedia();
});

beforeEach(() => {
    window.localStorage.clear();
});

afterEach(cleanup);

const pickers: NavGroup = {
    label: 'Components',
    items: [],
    groups: [
        {
            label: 'Forms',
            items: [],
            groups: [
                {
                    label: 'Pickers',
                    defaultOpen: false,
                    items: [{ title: 'Date', href: '/forms/pickers/date' }],
                },
            ],
        },
    ],
};

function renderTree(currentUrl: string, collapsible = true) {
    render(
        <SidebarProvider>
            <NavMain
                label={pickers.label}
                collapsible={collapsible}
                currentUrl={currentUrl}
                items={pickers.items}
                groups={pickers.groups}
            />
        </SidebarProvider>,
    );
}

describe('a subgroup two levels down', () => {
    it('opens every group above it when it holds the current route', () => {
        window.localStorage.setItem(
            'akira-ui:collapsed-nav-groups',
            JSON.stringify(['Components/Forms']),
        );
        renderTree('/forms/pickers/date');

        expect(
            screen
                .getByRole('button', { name: 'Forms' })
                .getAttribute('aria-expanded'),
        ).toBe('true');
        expect(
            screen
                .getByRole('button', { name: 'Pickers' })
                .getAttribute('aria-expanded'),
        ).toBe('true');
    });

    it('is keyed by its full path', () => {
        renderTree('/elsewhere');

        fireEvent.click(screen.getByRole('button', { name: 'Pickers' }));

        expect(
            JSON.parse(
                window.localStorage.getItem(SIDEBAR_EXPANDED_GROUPS_KEY) ??
                    '[]',
            ),
        ).toEqual(['Components/Forms/Pickers']);
    });

    it('starts open when it declares no defaultOpen', () => {
        renderTree('/elsewhere');

        expect(
            screen
                .getByRole('button', { name: 'Forms' })
                .getAttribute('aria-expanded'),
        ).toBe('true');
    });

    it('stays a heading when the groups cannot collapse', () => {
        renderTree('/elsewhere', false);

        expect(screen.queryByRole('button')).toBeNull();
        expect(screen.getByText('Pickers')).toBeTruthy();
        expect(screen.getByRole('link', { name: 'Date' })).toBeTruthy();
    });

    it('keeps the heading as tall as a menu row', () => {
        renderTree('/elsewhere', false);

        expect(
            document
                .querySelector('[data-slot="nav-sub-group-label"]')
                ?.className.split(' '),
        ).toContain('h-8');
    });
});

describe('a subgroup without a label', () => {
    it('lists its items with no empty heading or nameless toggle', () => {
        render(
            <SidebarProvider>
                <NavMain
                    label="Components"
                    collapsible
                    items={[]}
                    groups={[{ items: [{ title: 'Loose', href: '/loose' }] }]}
                />
            </SidebarProvider>,
        );

        expect(
            screen
                .getAllByRole('button')
                .map((button) => button.textContent?.trim()),
        ).toEqual(['Components']);
        expect(
            document.querySelector('[data-slot="nav-sub-group-label"]'),
        ).toBeNull();
        expect(screen.getByRole('link', { name: 'Loose' })).toBeTruthy();
    });
});

describe('a subgroup item with a badge', () => {
    it('shows the count and names it', () => {
        render(
            <SidebarProvider>
                <NavMain
                    label="Components"
                    items={[]}
                    groups={[
                        {
                            label: 'Queue',
                            items: [
                                {
                                    title: 'Refunds',
                                    href: '/refunds',
                                    badge: 7,
                                    badgeLabel: '7 refunds awaiting review',
                                },
                            ],
                        },
                    ]}
                />
            </SidebarProvider>,
        );

        const link = screen.getByRole('link', {
            name: 'Refunds, 7 refunds awaiting review',
        });
        const badge = link
            .closest('[data-sidebar="menu-sub-item"]')
            ?.querySelector('[data-slot="nav-sub-badge"]');

        expect(badge?.textContent).toBe('7');
        expect(badge?.getAttribute('aria-hidden')).toBe('true');
    });
});

describe('a subgroup item with a badge and no badge label', () => {
    it('keeps the title as the link name', () => {
        render(
            <SidebarProvider>
                <NavMain
                    label="Components"
                    items={[]}
                    groups={[
                        {
                            label: 'Queue',
                            items: [
                                {
                                    title: 'Refunds',
                                    href: '/refunds',
                                    badge: 7,
                                },
                            ],
                        },
                    ]}
                />
            </SidebarProvider>,
        );

        const link = screen.getByRole('link', { name: 'Refunds' });

        expect(
            link
                .closest('[data-sidebar="menu-sub-item"]')
                ?.querySelector('[data-slot="nav-sub-badge"]')?.textContent,
        ).toBe('7');
    });
});

describe('a subgroup without a label, when groups cannot collapse', () => {
    it('lists its items with no empty heading', () => {
        render(
            <SidebarProvider>
                <NavMain
                    label="Components"
                    items={[]}
                    groups={[{ items: [{ title: 'Loose', href: '/loose' }] }]}
                />
            </SidebarProvider>,
        );

        expect(
            document.querySelector('[data-slot="nav-sub-group-label"]'),
        ).toBeNull();
        expect(screen.getByRole('link', { name: 'Loose' })).toBeTruthy();
    });
});

describe('a subgroup inside an unlabelled subgroup', () => {
    it('is keyed past the missing label', () => {
        render(
            <SidebarProvider>
                <NavMain
                    label="Components"
                    collapsible
                    items={[]}
                    groups={[
                        {
                            items: [],
                            groups: [
                                {
                                    label: 'Pickers',
                                    defaultOpen: false,
                                    items: [{ title: 'Date', href: '/date' }],
                                },
                            ],
                        },
                    ]}
                />
            </SidebarProvider>,
        );

        fireEvent.click(screen.getByRole('button', { name: 'Pickers' }));

        expect(
            JSON.parse(
                window.localStorage.getItem(SIDEBAR_EXPANDED_GROUPS_KEY) ??
                    '[]',
            ),
        ).toEqual(['Components/Pickers']);
    });
});
