// @vitest-environment jsdom

import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeAll, describe, expect, it } from 'vitest';

import { SidebarProvider } from '@/components/ui/sidebar';
import type { NavGroup } from '@/types';

import { AppSidebar } from './app-sidebar';

beforeAll(() => {
    window.matchMedia ??= ((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addEventListener: () => {},
        removeEventListener: () => {},
        addListener: () => {},
        removeListener: () => {},
        dispatchEvent: () => false,
    })) as unknown as typeof window.matchMedia;
});

afterEach(cleanup);

const groups: NavGroup[] = [
    { items: [{ title: 'Vender', href: '/sale' }] },
    { items: [{ title: 'Bilhetes', href: '/tickets' }] },
];

function renderAt(currentUrl: string) {
    render(
        <SidebarProvider>
            <AppSidebar
                logo={<span>logo</span>}
                logoHref="/"
                groups={groups}
                currentUrl={currentUrl}
                user={{ name: 'Ana', email: 'ana@example.test', avatar: '' }}
                settingsHref="/settings"
                logoutHref="/logout"
            />
        </SidebarProvider>,
    );
}

function activeTitles(): string[] {
    return screen
        .getAllByRole('link')
        .filter((link) => link.closest('[data-active="true"]') !== null)
        .map((link) => link.textContent ?? '');
}

describe('the active sidebar item', () => {
    it('ignores the query string when matching', () => {
        renderAt('/sale?departure_date=2026-09-07&route_id=2');

        expect(activeTitles()).toEqual(['Vender']);
    });

    it('ignores the fragment when matching', () => {
        renderAt('/sale#top');

        expect(activeTitles()).toEqual(['Vender']);
    });

    it('marks a section from one of its pages', () => {
        renderAt('/tickets/4821');

        expect(activeTitles()).toEqual(['Bilhetes']);
    });

    it('does not treat the root as the parent of every page', () => {
        render(
            <SidebarProvider>
                <AppSidebar
                    logo={<span>logo</span>}
                    logoHref="/"
                    groups={[{ items: [{ title: 'Início', href: '/' }] }]}
                    currentUrl="/sale?route_id=2"
                    user={{
                        name: 'Ana',
                        email: 'ana@example.test',
                        avatar: '',
                    }}
                    settingsHref="/settings"
                    logoutHref="/logout"
                />
            </SidebarProvider>,
        );

        expect(activeTitles()).toEqual([]);
    });

    it('marks nothing outside the listed sections', () => {
        renderAt('/dashboard');

        expect(activeTitles()).toEqual([]);
    });
});

describe('the active item inside a subgroup', () => {
    it('beats a shorter match in another group', () => {
        render(
            <SidebarProvider>
                <AppSidebar
                    logo={<span>logo</span>}
                    logoHref="/"
                    collapsibleGroups
                    currentUrl="/components/forms/input"
                    groups={[
                        {
                            label: 'Start',
                            items: [
                                { title: 'Components', href: '/components' },
                            ],
                        },
                        {
                            label: 'Library',
                            items: [],
                            groups: [
                                {
                                    label: 'Forms',
                                    defaultOpen: false,
                                    items: [
                                        {
                                            title: 'Input',
                                            href: '/components/forms/input',
                                        },
                                    ],
                                },
                            ],
                        },
                    ]}
                />
            </SidebarProvider>,
        );

        expect(activeTitles()).toEqual(['Input']);
    });

    it('starts a group closed when it declares defaultOpen false', () => {
        render(
            <SidebarProvider>
                <AppSidebar
                    logo={<span>logo</span>}
                    logoHref="/"
                    collapsibleGroups
                    currentUrl="/"
                    groups={[
                        {
                            label: 'Guides',
                            defaultOpen: false,
                            items: [{ title: 'Setup', href: '/setup' }],
                        },
                    ]}
                />
            </SidebarProvider>,
        );

        expect(
            screen
                .getByRole('button', { name: 'Guides' })
                .getAttribute('aria-expanded'),
        ).toBe('false');
    });
});
