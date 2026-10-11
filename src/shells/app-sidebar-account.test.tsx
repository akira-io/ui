// @vitest-environment jsdom

import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { BookOpen } from 'lucide-react';
import { afterEach, beforeAll, describe, expect, it } from 'vitest';

import { SidebarProvider } from '@/components/ui/sidebar';

import { installMatchMedia } from '../../tests/fixtures/match-media';
import { AppSidebar } from './app-sidebar';

beforeAll(() => {
    installMatchMedia();
});

afterEach(cleanup);

const groups = [{ items: [{ title: 'Dashboard', href: '/dashboard' }] }];
const user = { name: 'Ana Lopes', email: 'ana@example.com' };

function renderSidebar(withUser = true) {
    render(
        <SidebarProvider>
            {withUser ? (
                <AppSidebar
                    logo={<span>logo</span>}
                    logoHref="/"
                    groups={groups}
                    footerItems={[
                        {
                            title: 'Documentation',
                            href: '/docs',
                            icon: BookOpen,
                        },
                    ]}
                    user={user}
                    settingsHref="/settings"
                    logoutHref="/logout"
                />
            ) : (
                <AppSidebar
                    logo={<span>logo</span>}
                    logoHref="/"
                    groups={groups}
                />
            )}
        </SidebarProvider>,
    );
}

const region = (name: 'header' | 'footer') =>
    document.querySelector(`[data-sidebar="${name}"]`) as HTMLElement;

const accountButton = () =>
    document
        .querySelector('[data-slot="nav-user-chevron"]')
        ?.closest('button') as HTMLElement;

describe('the account in the sidebar', () => {
    it('sits in the footer, below the secondary links', () => {
        renderSidebar();

        expect(region('footer').contains(accountButton())).toBe(true);
        expect(region('header').contains(accountButton())).toBe(false);
    });

    it('keeps the secondary links in the footer', () => {
        renderSidebar();

        expect(
            screen
                .getByRole('link', { name: 'Documentation' })
                .closest('[data-sidebar="footer"]'),
        ).not.toBeNull();
    });

    it('keeps the header to the logo when nobody signed in', () => {
        renderSidebar(false);

        expect(region('header').querySelectorAll('button')).toHaveLength(0);
        expect(screen.getByText('logo')).toBeTruthy();
    });
});

describe('showing and hiding the sidebar', () => {
    it('starts open', () => {
        renderSidebar();

        expect(
            document
                .querySelector('[data-slot="sidebar"]')
                ?.getAttribute('data-state'),
        ).toBe('expanded');
    });

    it('toggles with Command B', () => {
        renderSidebar();

        fireEvent.keyDown(window, { key: 'b', metaKey: true });

        expect(
            document
                .querySelector('[data-slot="sidebar"]')
                ?.getAttribute('data-state'),
        ).toBe('collapsed');
    });
});
