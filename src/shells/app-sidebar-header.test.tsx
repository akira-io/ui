// @vitest-environment jsdom

import { cleanup, render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';
import { afterEach, beforeAll, describe, expect, it } from 'vitest';

import { SidebarProvider } from '@/components/ui/sidebar';

import { installMatchMedia } from '../../tests/fixtures/match-media';
import { AppSidebarHeader } from './app-sidebar-header';

beforeAll(() => {
    installMatchMedia();
});

afterEach(cleanup);

function renderHeader(props: {
    actions?: ReactNode;
    onSearchClick?: () => void;
}) {
    render(
        <SidebarProvider>
            <AppSidebarHeader {...props} />
        </SidebarProvider>,
    );
}

function actionsContainer(): HTMLElement {
    const container = document.querySelector<HTMLElement>(
        '[data-slot="app-sidebar-header-actions"]',
    );

    expect(container).not.toBeNull();

    return container as HTMLElement;
}

const bell = <button type="button">Notifications</button>;

describe('the header actions', () => {
    it('renders what the app passes', () => {
        renderHeader({ actions: bell });

        expect(
            actionsContainer().contains(
                screen.getByRole('button', { name: 'Notifications' }),
            ),
        ).toBe(true);
    });

    it('lays the actions out in a row', () => {
        renderHeader({ actions: bell });

        expect(actionsContainer().className.split(' ')).toEqual(
            expect.arrayContaining(['flex', 'items-center', 'gap-2']),
        );
    });

    it('come after the search button', () => {
        renderHeader({ actions: bell, onSearchClick: () => {} });

        const search = screen.getByRole('button', { name: /Search/ });

        expect(
            search.compareDocumentPosition(actionsContainer()) &
                Node.DOCUMENT_POSITION_FOLLOWING,
        ).toBeTruthy();
    });

    it('leave the push to the right to the search button when it exists', () => {
        renderHeader({ actions: bell, onSearchClick: () => {} });

        expect(actionsContainer().className.split(' ')).not.toContain(
            'ml-auto',
        );
    });

    it('push themselves to the right when there is no search button', () => {
        renderHeader({ actions: bell });

        expect(actionsContainer().className.split(' ')).toContain('ml-auto');
    });

    it('leave no empty container behind when none are passed', () => {
        renderHeader({ onSearchClick: () => {} });

        expect(
            document.querySelector('[data-slot="app-sidebar-header-actions"]'),
        ).toBeNull();
    });
});
