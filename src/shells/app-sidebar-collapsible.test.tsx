// @vitest-environment jsdom

import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeAll, describe, expect, it } from 'vitest';

import { SidebarProvider } from '@/components/ui/sidebar';

import { installMatchMedia } from '../../tests/fixtures/match-media';
import { AppSidebar, type AppSidebarCollapsible } from './app-sidebar';

beforeAll(() => {
    installMatchMedia();
});

afterEach(cleanup);

function renderCollapsed(collapsible?: AppSidebarCollapsible) {
    render(
        <SidebarProvider defaultOpen={false}>
            <AppSidebar
                logo={<span>logo</span>}
                logoHref="/"
                groups={[{ items: [{ title: 'Docs', href: '/docs' }] }]}
                collapsible={collapsible}
            />
        </SidebarProvider>,
    );

    return document.querySelector('[data-slot="sidebar"]');
}

describe('the collapse mode of AppSidebar', () => {
    it('keeps the icon rail by default', () => {
        expect(renderCollapsed()?.getAttribute('data-collapsible')).toBe(
            'icon',
        );
    });

    it('slides off canvas for items without icons', () => {
        expect(
            renderCollapsed('offcanvas')?.getAttribute('data-collapsible'),
        ).toBe('offcanvas');
    });

    it('stays drawn when it cannot collapse', () => {
        const sidebar = renderCollapsed('none');

        expect(sidebar).not.toBeNull();
        expect(sidebar?.hasAttribute('data-state')).toBe(false);
        expect(screen.getByRole('link', { name: 'Docs' })).toBeTruthy();
    });
});

describe.each<AppSidebarCollapsible>(['none', 'offcanvas'])(
    'a sidebar without an icon rail (%s), with the provider closed',
    (collapsible) => {
        it('keeps its subgroups and group toggles', () => {
            render(
                <SidebarProvider defaultOpen={false}>
                    <AppSidebar
                        logo={<span>logo</span>}
                        logoHref="/"
                        collapsible={collapsible}
                        collapsibleGroups
                        groups={[
                            {
                                label: 'Components',
                                items: [],
                                groups: [
                                    {
                                        label: 'Forms',
                                        items: [
                                            { title: 'Input', href: '/input' },
                                        ],
                                    },
                                ],
                            },
                        ]}
                    />
                </SidebarProvider>,
            );

            expect(
                screen
                    .getByRole('link', { name: 'Input' })
                    .closest('[data-sidebar="menu-sub"]'),
            ).not.toBeNull();
            expect(
                screen
                    .getByRole('button', { name: 'Components' })
                    .getAttribute('tabindex'),
            ).toBeNull();
        });
    },
);
