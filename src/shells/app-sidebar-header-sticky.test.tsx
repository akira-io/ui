// @vitest-environment jsdom

import { cleanup, render } from '@testing-library/react';
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
    it('sticks to the top of the content as a glass bar with a hairline below', () => {
        const classes = header().className.split(' ');

        expect(classes).toContain('sticky');
        expect(classes).toContain('top-0');
        expect(classes).toContain('glass-bar');
        expect(classes).toContain('border-b');
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
        expect(searchButton().classList).toContain('border');
    });

    it('stays a static bordered strip when sticky is off', () => {
        const classes = header(false).className.split(' ');

        expect(classes).not.toContain('sticky');
        expect(classes).not.toContain('glass-bar');
        expect(classes).toContain('border-b');
    });
});
