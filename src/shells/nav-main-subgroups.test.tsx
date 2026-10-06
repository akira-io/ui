// @vitest-environment jsdom

import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeAll, beforeEach, describe, expect, it } from 'vitest';

import { Sidebar, SidebarProvider } from '@/components/ui/sidebar';
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

function formsUnder(parent: string): NavGroup {
    return {
        label: 'Forms',
        defaultOpen: false,
        items: [
            {
                title: `${parent} input`,
                href: `/${parent.toLowerCase()}/forms/input`,
            },
        ],
    };
}

function renderNav(currentUrl: string, open = true) {
    render(
        <SidebarProvider defaultOpen={open}>
            <Sidebar collapsible="icon">
                <NavMain
                    label="Components"
                    collapsible
                    currentUrl={currentUrl}
                    items={[
                        { title: 'Overview', href: '/components/overview' },
                    ]}
                    groups={[formsUnder('Components')]}
                />
                <NavMain
                    label="Blocks"
                    collapsible
                    currentUrl={currentUrl}
                    items={[
                        { title: 'Blocks overview', href: '/blocks/overview' },
                    ]}
                    groups={[formsUnder('Blocks')]}
                />
            </Sidebar>
        </SidebarProvider>,
    );
}

function subgroupTrigger(index: number): HTMLElement {
    return screen.getAllByRole('button', { name: 'Forms' })[index];
}

function activeLinks(): string[] {
    return screen
        .getAllByRole('link')
        .filter((link) => link.closest('[data-active="true"]'))
        .map((link) => link.textContent ?? '');
}

describe('a subgroup', () => {
    it('lights only the item of the current route', () => {
        renderNav('/components/forms/input');

        expect(activeLinks()).toEqual(['Components input']);
    });

    it('opens on its own when it holds the current route', () => {
        renderNav('/components/forms/input');

        expect(subgroupTrigger(0).getAttribute('aria-expanded')).toBe('true');
        expect(subgroupTrigger(1).getAttribute('aria-expanded')).toBe('false');
    });

    it('keeps its parent group open when it holds the current route', () => {
        window.localStorage.setItem(
            'akira-ui:collapsed-nav-groups',
            JSON.stringify(['Components']),
        );
        renderNav('/components/forms/input');

        expect(
            screen
                .getByRole('button', { name: 'Components' })
                .getAttribute('aria-expanded'),
        ).toBe('true');
    });

    it('collapses apart from a same-named subgroup elsewhere', () => {
        renderNav('/elsewhere');

        fireEvent.click(subgroupTrigger(0));

        expect(subgroupTrigger(0).getAttribute('aria-expanded')).toBe('true');
        expect(subgroupTrigger(1).getAttribute('aria-expanded')).toBe('false');
        expect(
            JSON.parse(
                window.localStorage.getItem(SIDEBAR_EXPANDED_GROUPS_KEY) ??
                    '[]',
            ),
        ).toEqual(['Components/Forms']);
    });

    it('is indented under its group', () => {
        renderNav('/components/forms/input');

        const link = screen.getByRole('link', { name: 'Components input' });

        expect(link.closest('[data-sidebar="menu-sub"]')).not.toBeNull();
    });
});

describe('subgroups on the icon rail', () => {
    it('show their items flat, so the rail can reach them', () => {
        renderNav('/elsewhere', false);

        const link = screen.getByRole('link', { name: 'Components input' });

        expect(link.closest('[data-sidebar="menu-sub"]')).toBeNull();
    });
});

describe('a subgroup of a group that cannot collapse', () => {
    it('shows its label as a heading over items that stay open', () => {
        render(
            <SidebarProvider>
                <NavMain
                    label="Components"
                    items={[]}
                    groups={[formsUnder('Components')]}
                />
            </SidebarProvider>,
        );

        expect(screen.queryByRole('button', { name: 'Forms' })).toBeNull();
        expect(screen.getByText('Forms')).toBeTruthy();
        expect(
            screen
                .getByRole('link', { name: 'Components input' })
                .closest('[data-sidebar="menu-sub"]'),
        ).not.toBeNull();
    });
});

describe('a controlled subgroup', () => {
    it('reports its path as the collapse key', () => {
        const reported: string[][] = [];

        render(
            <SidebarProvider>
                <NavMain
                    label="Components"
                    collapsible
                    items={[]}
                    groups={[formsUnder('Components')]}
                    collapsedGroups={[]}
                    onCollapsedChange={(next) => reported.push(next)}
                />
            </SidebarProvider>,
        );

        fireEvent.click(screen.getByRole('button', { name: 'Forms' }));

        expect(reported).toEqual([['Components/Forms']]);
    });
});
