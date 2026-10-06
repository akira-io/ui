// @vitest-environment jsdom

import { cleanup, render } from '@testing-library/react';
import { act, type ReactElement } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { renderToString } from 'react-dom/server';
import { afterEach, beforeAll, describe, expect, it } from 'vitest';

import { Sidebar, SidebarProvider, useSidebar } from '@/components/ui/sidebar';
import { AppShell } from '@/shells/app-shell';
import { AppSidebar } from '@/shells/app-sidebar';

import { installMatchMedia } from '../../../tests/fixtures/match-media';

Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true });

beforeAll(() => {
    installMatchMedia();
});

afterEach(() => {
    cleanup();
    document.body.innerHTML = '';
    document.cookie = 'sidebar_state=; max-age=0; path=/';
});

function sidebarState(): string | null {
    return (
        document
            .querySelector('[data-slot="sidebar"]')
            ?.getAttribute('data-state') ?? null
    );
}

function StateText() {
    return <output>{useSidebar().state}</output>;
}

function shell(): ReactElement {
    return (
        <AppShell variant="sidebar">
            <StateText />
            <AppSidebar
                logo={<span>logo</span>}
                logoHref="/"
                groups={[{ items: [{ title: 'Docs', href: '/docs' }] }]}
            />
        </AppShell>
    );
}

describe('a sidebar remembered as collapsed', () => {
    it('opens collapsed on the next page', () => {
        document.cookie = 'sidebar_state=false; path=/';

        render(
            <SidebarProvider>
                <Sidebar collapsible="icon">nav</Sidebar>
            </SidebarProvider>,
        );

        expect(sidebarState()).toBe('collapsed');
    });

    it('hydrates server markup without a mismatch, then collapses', async () => {
        const html = renderToString(shell());
        document.cookie = 'sidebar_state=false; path=/';

        const container = document.createElement('div');
        container.innerHTML = html;
        document.body.appendChild(container);

        const recoverableErrors: unknown[] = [];

        await act(async () => {
            hydrateRoot(container, shell(), {
                onRecoverableError: (error) => {
                    recoverableErrors.push(error);
                },
            });
        });

        expect(recoverableErrors).toEqual([]);
        expect(sidebarState()).toBe('collapsed');
        expect(container.querySelector('output')?.textContent).toBe(
            'collapsed',
        );
    });
});

describe('a sidebar with nothing remembered', () => {
    it('follows defaultOpen', () => {
        render(
            <SidebarProvider defaultOpen={false}>
                <Sidebar collapsible="icon">nav</Sidebar>
            </SidebarProvider>,
        );

        expect(sidebarState()).toBe('collapsed');
    });
});

describe('a controlled sidebar', () => {
    it('ignores the cookie', () => {
        document.cookie = 'sidebar_state=false; path=/';

        render(
            <SidebarProvider open onOpenChange={() => {}}>
                <Sidebar collapsible="icon">nav</Sidebar>
            </SidebarProvider>,
        );

        expect(sidebarState()).toBe('expanded');
    });
});
