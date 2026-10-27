// @vitest-environment jsdom

import { act, cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeAll, describe, expect, it } from 'vitest';

import { SidebarProvider } from '@/components/ui/sidebar';

import { installMatchMedia } from '../../tests/fixtures/match-media';
import { AppSidebarHeader } from './app-sidebar-header';

beforeAll(() => {
    installMatchMedia();
});

afterEach(cleanup);

function header(sticky?: boolean): HTMLElement {
    render(
        <SidebarProvider>
            <AppSidebarHeader sticky={sticky} />
        </SidebarProvider>,
    );

    return document.querySelector('header') as HTMLElement;
}

function searchButton(): HTMLElement {
    return document.querySelector(
        'button[aria-label="Search..."]',
    ) as HTMLElement;
}

function trigger(): HTMLElement {
    return document.querySelector('[data-sidebar="trigger"]') as HTMLElement;
}

describe('the app header', () => {
    it('sticks to the top of the content and stays clear until the content scrolls under it', () => {
        const classes = header().className.split(' ');

        expect(classes).toContain('sticky');
        expect(classes).toContain('top-0');
        expect(classes).not.toContain('glass-bar');
        expect(classes).toContain('border-transparent');
        expect(classes).toContain('data-[scrolled]:glass-bar');
        expect(classes).toContain('data-[scrolled]:border-sidebar-border/50');
        expect(
            document.querySelector('header')?.hasAttribute('data-scrolled'),
        ).toBe(false);
    });

    it('turns into a glass bar with a hairline once the content scrolls under it', () => {
        render(
            <div data-testid="pane" style={{ overflowY: 'auto' }}>
                <SidebarProvider>
                    <AppSidebarHeader />
                </SidebarProvider>
            </div>,
        );
        const pane = screen.getByTestId('pane');

        act(() => {
            pane.scrollTop = 30;
            pane.dispatchEvent(new Event('scroll'));
        });

        expect(
            document.querySelector('header')?.hasAttribute('data-scrolled'),
        ).toBe(true);
    });

    it('is 64 pixels tall in both sidebar states', () => {
        const classes = header().className.split(' ');

        expect(classes).toContain('h-16');
        expect(classes.join(' ')).not.toContain(':h-12');
    });

    it('draws its controls on the bar, not on capsules of their own', () => {
        render(
            <SidebarProvider>
                <AppSidebarHeader onSearchClick={() => {}} />
            </SidebarProvider>,
        );

        expect(trigger().classList).not.toContain('glass-bar');
        expect(searchButton().classList).not.toContain('glass-bar');
        expect(searchButton().classList).toContain('bg-(--field-fill)');
    });

    it('stays a static bordered strip when sticky is off', () => {
        const classes = header(false).className.split(' ');

        expect(classes).not.toContain('sticky');
        expect(classes.join(' ')).not.toContain('glass-bar');
        expect(classes).toContain('border-b');
        expect(classes).not.toContain('border-transparent');
    });
});
