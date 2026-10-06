// @vitest-environment jsdom

import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeAll, describe, expect, it } from 'vitest';

import { SidebarProvider } from '@/components/ui/sidebar';

import { installMatchMedia } from '../../tests/fixtures/match-media';
import { AppSidebar } from './app-sidebar';

beforeAll(() => {
    installMatchMedia();
});

afterEach(cleanup);

const groups = [{ items: [{ title: 'Docs', href: '/docs' }] }];

describe('a sidebar without a user', () => {
    it('draws no user menu', () => {
        render(
            <SidebarProvider>
                <AppSidebar
                    logo={<span>logo</span>}
                    logoHref="/"
                    groups={groups}
                />
            </SidebarProvider>,
        );

        expect(
            document.querySelector('[data-slot="nav-user-chevron"]'),
        ).toBeNull();
        expect(screen.getByRole('link', { name: 'Docs' })).toBeTruthy();
    });

    it('draws the footer slot', () => {
        render(
            <SidebarProvider>
                <AppSidebar
                    logo={<span>logo</span>}
                    logoHref="/"
                    groups={groups}
                    footer={<a href="https://github.com/akira-io/ui">GitHub</a>}
                />
            </SidebarProvider>,
        );

        const footer = screen.getByRole('link', { name: 'GitHub' });

        expect(footer.closest('[data-sidebar="footer"]')).not.toBeNull();
    });
});

describe('a sidebar given a null user from untyped code', () => {
    it('draws no user menu', () => {
        const guest = { user: null } as unknown as { user: undefined };

        render(
            <SidebarProvider>
                <AppSidebar
                    logo={<span>logo</span>}
                    logoHref="/"
                    groups={groups}
                    {...guest}
                />
            </SidebarProvider>,
        );

        expect(
            document.querySelector('[data-slot="nav-user-chevron"]'),
        ).toBeNull();
    });
});

describe('a sidebar with a user', () => {
    it('draws the footer slot above the user menu', () => {
        render(
            <SidebarProvider>
                <AppSidebar
                    logo={<span>logo</span>}
                    logoHref="/"
                    groups={groups}
                    footer={<span>v3.2.0</span>}
                    user={{ name: 'Ana', email: 'ana@example.test' }}
                    settingsHref="/settings"
                    logoutHref="/logout"
                />
            </SidebarProvider>,
        );

        const version = screen.getByText('v3.2.0');
        const userName = screen.getByText('Ana');

        expect(
            version.compareDocumentPosition(userName) &
                Node.DOCUMENT_POSITION_FOLLOWING,
        ).toBeTruthy();
    });
});
